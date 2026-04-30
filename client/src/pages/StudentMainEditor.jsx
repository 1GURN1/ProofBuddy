import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:3001";

function getIntegrityScore(report) {
  if (!report?.metrics?.signals) return 0;
  const signals = report.metrics.signals;
  const penalty =
    signals.aiTellWordDensity * 5 +
    signals.genericTransitionDensity * 8 +
    signals.passiveVoiceDensity * 3 +
    Math.max(0, 8 - signals.sentenceLengthVariance) * 4;

  return Math.max(0, Math.min(100, Math.round(100 - penalty)));
}

function getChangeSegments(previousText, nextText) {
  let prefix = 0;
  while (
    prefix < previousText.length &&
    prefix < nextText.length &&
    previousText[prefix] === nextText[prefix]
  ) {
    prefix += 1;
  }

  let suffix = 0;
  while (
    suffix < previousText.length - prefix &&
    suffix < nextText.length - prefix &&
    previousText[previousText.length - 1 - suffix] === nextText[nextText.length - 1 - suffix]
  ) {
    suffix += 1;
  }

  return {
    removedText: previousText.slice(prefix, previousText.length - suffix),
    addedText: nextText.slice(prefix, nextText.length - suffix),
  };
}

export default function StudentMainEditor() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("Untitled Document");
  const [reportOpen, setReportOpen] = useState(true);
  const [words, setWords] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState(null);
  const docIdRef = useRef(localStorage.getItem("proofbuddyDocId"));
  const queuedEventsRef = useRef([]);
  const lastContentRef = useRef("");
  const analyzeTimeoutRef = useRef(null);

  function authHeaders() {
    const token = localStorage.getItem("proofbuddyToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  useEffect(() => {
    const token = localStorage.getItem("proofbuddyToken");
    const role = localStorage.getItem("proofbuddyRole");
    if (!token) {
      navigate("/auth", { replace: true });
      return;
    }
    if (role !== "student") {
      navigate("/educator", { replace: true });
      return;
    }

    const docId = docIdRef.current;
    if (!docId) {
      navigate("/student/setup", { replace: true });
      return;
    }

    async function loadDocument() {
      try {
        const res = await fetch(`${API}/api/student/documents/${docId}`, {
          headers: authHeaders(),
        });
        if (res.status === 401 || res.status === 403) {
          navigate("/auth", { replace: true });
          return;
        }
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load document.");
        const nextContent = data.document.content || "";
        setTitle(data.document.title || "Untitled Document");
        setContent(nextContent);
        setWords(nextContent.trim().split(/\s+/).filter(Boolean).length);
        lastContentRef.current = nextContent;
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadDocument();
  }, [navigate]);

  useEffect(() => {
    async function flushQueuedEvents() {
      const docId = docIdRef.current;
      const events = queuedEventsRef.current;
      if (!docId || events.length === 0) return;

      queuedEventsRef.current = [];
      try {
        const res = await fetch(`${API}/api/student/documents/${docId}/process-log/events`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...authHeaders(),
          },
          body: JSON.stringify({ events }),
        });
        if (!res.ok) {
          queuedEventsRef.current = [...events, ...queuedEventsRef.current];
        }
      } catch {
        queuedEventsRef.current = [...events, ...queuedEventsRef.current];
      }
    }

    const interval = setInterval(() => {
      flushQueuedEvents();
    }, 10000);

    return () => {
      clearInterval(interval);
      flushQueuedEvents();
    };
  }, []);

  async function flushProcessLog() {
    const docId = docIdRef.current;
    const events = queuedEventsRef.current;
    if (!docId || events.length === 0) return;

    queuedEventsRef.current = [];
    try {
      const res = await fetch(`${API}/api/student/documents/${docId}/process-log/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
        body: JSON.stringify({ events }),
      });
      if (!res.ok) {
        queuedEventsRef.current = [...events, ...queuedEventsRef.current];
      }
    } catch {
      queuedEventsRef.current = [...events, ...queuedEventsRef.current];
    }
  }

  function queueEvent(type, data = {}) {
    queuedEventsRef.current.push({
      type,
      timestamp: Date.now(),
      data,
    });
  }

  async function handleSave() {
    const docId = docIdRef.current;
    if (!docId) return;

    setSaving(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/student/documents/${docId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save document.");

      await fetch(`${API}/api/student/documents/${docId}/versions`, {
        method: "POST",
        headers: authHeaders(),
      });

      lastContentRef.current = content;
      await flushProcessLog();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  const runAnalysis = useCallback(async () => {
    const docId = docIdRef.current;
    if (!docId) return;

    setAnalyzing(true);
    try {
      const res = await fetch(`${API}/api/student/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
        body: JSON.stringify({
          content,
          documentId: docId,
          isEsl: false,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to analyze document.");

      const nextReport = data.report;
      setReport(nextReport);
      localStorage.setItem("proofbuddyStudentReport", JSON.stringify(nextReport));
      setScore(getIntegrityScore(nextReport));
    } catch (err) {
      setError(err.message);
    } finally {
      setAnalyzing(false);
    }
  }, [content]);

  useEffect(() => {
    if (loading) return;

    if (analyzeTimeoutRef.current) {
      clearTimeout(analyzeTimeoutRef.current);
    }

    const hasEnoughWords = content.trim().split(/\s+/).filter(Boolean).length >= 30;
    if (!hasEnoughWords) {
      localStorage.removeItem("proofbuddyStudentReport");
      return;
    }

    analyzeTimeoutRef.current = setTimeout(() => {
      runAnalysis();
    }, 1200);

    return () => {
      if (analyzeTimeoutRef.current) {
        clearTimeout(analyzeTimeoutRef.current);
      }
    };
  }, [content, loading, runAnalysis]);

  function handleChange(e) {
    const val = e.target.value;
    const prev = lastContentRef.current;
    const { removedText, addedText } = getChangeSegments(prev, val);

    if (removedText) {
      queueEvent("delete", { count: removedText.length, removedText });
    }
    if (addedText) {
      queueEvent(addedText.length > 20 ? "paste" : "insert", {
        content: addedText,
      });
    }
    if (!removedText && !addedText) {
      queueEvent("edit", { length: val.length });
    }

    setContent(val);
    setWords(val.trim().split(/\s+/).filter(Boolean).length);
    lastContentRef.current = val;
  }

  const hasEnoughWords = words >= 30;
  const displayReport = hasEnoughWords ? report : null;
  const displayScore = hasEnoughWords ? score : 0;

  return (
    <div className="bg-pb-bg min-h-screen flex flex-col text-pb-text">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-pb-surface border-b border-pb-border px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/student")}
            className="text-pb-muted hover:text-pb-text transition-colors"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
          </button>
          <div>
            <span className="font-fraunces text-sm font-semibold text-pb-text">
              {title}
            </span>
            <span className="text-xs text-pb-muted ml-3">ENG 402 · {words} words</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-pb-muted">Integrity Score</span>
            <span
              className={`font-mono text-sm font-bold ${
                displayScore >= 80
                  ? "text-pb-success"
                  : displayScore >= 60
                  ? "text-pb-warning"
                  : "text-pb-error"
              }`}
            >
              {displayScore ? `${displayScore}%` : "—"}
            </span>
          </div>
          <button
            onClick={() => setReportOpen((v) => !v)}
            className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-btn transition-all border ${
              reportOpen
                ? "bg-pb-student-light text-pb-student border-pb-student/20"
                : "border-pb-border text-pb-muted hover:text-pb-text"
            }`}
          >
            <span className="material-symbols-outlined text-base">analytics</span>
            Report
          </button>
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="bg-pb-student text-white text-xs font-semibold px-4 py-1.5 rounded-btn hover:bg-pb-student/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* Icon sidebar */}
        <aside className="w-12 shrink-0 border-r border-pb-border bg-pb-surface flex flex-col items-center py-4 gap-3">
          <SideIcon icon="library_books" onClick={() => navigate("/student")} title="Library" />
          <SideIcon icon="analytics" onClick={() => navigate("/student/report")} title="Report" />
          <SideIcon icon="history" onClick={() => navigate("/student/replay")} title="Replay" />
          <SideIcon icon="share" onClick={() => navigate("/student/share-requests")} title="Shares" />
          <div className="flex-1" />
          <SideIcon icon="settings" onClick={() => navigate("/settings")} title="Settings" />
        </aside>

        {/* Editor */}
        <main className={`flex-1 flex flex-col p-8 transition-all ${reportOpen ? "max-w-3xl" : ""}`}>
          {error && (
            <div className="mb-4 rounded-btn border border-pb-error/20 bg-pb-error-light px-4 py-3 text-sm text-pb-error">
              {error}
            </div>
          )}
          {loading ? (
            <div className="text-sm text-pb-muted">Loading document…</div>
          ) : (
          <textarea
            value={content}
            onChange={handleChange}
            spellCheck
            className="flex-1 w-full bg-transparent text-pb-text text-base leading-8 font-source-serif resize-none outline-none scrollbar-thin placeholder-pb-muted min-h-[70vh]"
            placeholder="Start writing…"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          />
          )}
        </main>

        {/* Report Panel */}
        {reportOpen && (
          <aside className="w-80 shrink-0 border-l border-pb-border bg-pb-surface flex flex-col">
            <div className="px-5 py-4 border-b border-pb-border flex items-center justify-between">
              <span className="font-fraunces text-sm font-semibold text-pb-text">Live Report</span>
              {analyzing && <span className="text-xs text-pb-muted">Analyzing…</span>}
              <button
                onClick={() => setReportOpen(false)}
                className="text-pb-muted hover:text-pb-text transition-colors"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            {/* Score ring */}
            <div className="px-5 py-5 border-b border-pb-border text-center">
              <div
                className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center"
                style={{
                  background: `conic-gradient(${displayScore >= 80 ? "#5A8A6E" : displayScore >= 60 ? "#C28A2C" : "#B54848"} ${displayScore * 3.6}deg, #E8E4DC 0deg)`,
                }}
              >
                <div className="w-14 h-14 bg-pb-surface rounded-full flex items-center justify-center">
                  <span className="font-mono text-lg font-bold text-pb-text">{displayScore || "—"}</span>
                </div>
              </div>
              <p className="text-xs text-pb-muted font-medium uppercase tracking-wider">
                Integrity Score
              </p>
            </div>

            {/* Issues */}
            <div className="flex-1 overflow-y-auto scrollbar-thin">
              <div className="px-5 py-3">
                <p className="text-xs font-bold uppercase tracking-widest text-pb-muted mb-3">
                  Issues ({displayReport?.mechanical?.issues?.length || 0})
                </p>
                {displayReport ? (
                  <div className="space-y-2">
                    {displayReport.mechanical.issues.slice(0, 5).map((issue, index) => (
                      <IssueCard key={`${issue.excerpt}-${index}`} issue={issue} navigate={navigate} />
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-pb-muted leading-relaxed">
                    Keep typing to generate a live report. Analysis starts after roughly 30 words.
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="px-5 py-4 border-t border-pb-border space-y-2">
              <button
                onClick={() => navigate("/student/report")}
                className="w-full text-sm font-semibold text-pb-student hover:underline underline-offset-4"
              >
                View Full Report →
              </button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

function SideIcon({ icon, onClick, title }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="w-8 h-8 flex items-center justify-center rounded text-pb-muted hover:text-pb-student hover:bg-pb-student-light transition-all"
    >
      <span className="material-symbols-outlined text-base">{icon}</span>
    </button>
  );
}

function IssueCard({ issue, navigate }) {
  const severityBars = {
    high: "issue-bar-error",
    medium: "issue-bar-warning",
    low: "issue-bar-info",
  };

  return (
    <div className="relative bg-pb-bg rounded-card border border-pb-border p-3 pl-4 overflow-hidden">
      <div className={severityBars[issue.severity] || "issue-bar-info"} />
      <p className="text-xs font-semibold text-pb-text mb-1 capitalize">{issue.category}</p>
      <p className="text-xs text-pb-muted leading-snug line-clamp-2">{issue.excerpt}</p>
      <button
        onClick={() => navigate("/student/ai-detail")}
        className="mt-2 text-xs font-semibold text-pb-student hover:underline underline-offset-2"
      >
        Review →
      </button>
    </div>
  );
}
