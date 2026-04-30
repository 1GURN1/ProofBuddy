import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:3001";

function authHeaders() {
  const token = localStorage.getItem("proofbuddyToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function normalizeEvents(rawEvents) {
  if (!Array.isArray(rawEvents) || rawEvents.length === 0) return [];
  const start = rawEvents[0]?.timestamp || 0;

  return rawEvents
    .filter((event) => typeof event?.timestamp === "number" && typeof event?.type === "string")
    .map((event) => {
      const time = Math.max(0, event.timestamp - start);
      const content = typeof event.data?.content === "string"
        ? event.data.content
        : typeof event.data?.text === "string"
        ? event.data.text
        : "";
      const count = typeof event.data?.count === "number"
        ? event.data.count
        : typeof event.data?.charsRemoved === "number"
        ? event.data.charsRemoved
        : typeof event.data?.charsAdded === "number"
        ? event.data.charsAdded
        : 0;

      if (event.type === "insert") return { time, type: "type", text: content || "•".repeat(count) };
      if (event.type === "paste") return { time, type: "paste", text: content || "•".repeat(count) };
      if (event.type === "delete") return { time, type: "delete", count: count || content.length };
      return null;
    })
    .filter(Boolean);
}

function buildText(events, upToTime) {
  let text = "";
  for (const ev of events) {
    if (ev.time > upToTime) break;
    if (ev.type === "type") text += ev.text;
    if (ev.type === "paste") text += ev.text;
    if (ev.type === "delete") text = text.slice(0, -ev.count);
  }
  return text;
}

function getPasteRanges(events, upToTime) {
  let pos = 0;
  const ranges = [];
  for (const ev of events) {
    if (ev.time > upToTime) break;
    if (ev.type === "type") pos += ev.text.length;
    if (ev.type === "paste") {
      ranges.push([pos, pos + ev.text.length]);
      pos += ev.text.length;
    }
    if (ev.type === "delete") pos = Math.max(0, pos - ev.count);
  }
  return ranges;
}

export default function StudentWritingProcessReplay() {
  const navigate = useNavigate();
  const docId = localStorage.getItem("proofbuddyDocId");
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("Current Document");
  const [loading, setLoading] = useState(Boolean(docId));
  const [error, setError] = useState(docId ? "" : "No document selected for replay.");
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const intervalRef = useRef(null);
  const totalDuration = events.length > 0 ? Math.max(events[events.length - 1].time, 1000) : 1000;

  useEffect(() => {
    if (!docId) {
      return;
    }

    async function loadReplay() {
      try {
        const [docRes, logRes] = await Promise.all([
          fetch(`${API}/api/student/documents/${docId}`, { headers: authHeaders() }),
          fetch(`${API}/api/student/documents/${docId}/process-log`, { headers: authHeaders() }),
        ]);

        if (docRes.status === 401 || logRes.status === 401 || docRes.status === 403 || logRes.status === 403) {
          navigate("/auth", { replace: true });
          return;
        }

        const docData = await docRes.json();
        const logData = await logRes.json();

        if (!docRes.ok) throw new Error(docData.error || "Failed to load document.");
        if (!logRes.ok) throw new Error(logData.error || "Failed to load process log.");

        setTitle(docData.document?.title || "Current Document");
        setEvents(normalizeEvents(logData.processLog?.events || []));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadReplay();
  }, [docId, navigate]);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((t) => {
          if (t >= totalDuration) {
            setPlaying(false);
            return t;
          }
          return t + 100;
        });
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing, totalDuration]);

  function handleSlider(e) {
    setCurrentTime(Number(e.target.value));
    setPlaying(false);
  }

  function reset() {
    setCurrentTime(0);
    setPlaying(false);
  }

  const text = buildText(events, currentTime);
  const pasteRanges = getPasteRanges(events, currentTime);

  const pasteCount = events.filter((e) => e.type === "paste" && e.time <= currentTime).length;
  const progress = Math.round((currentTime / totalDuration) * 100);

  return (
    <div className="bg-pb-bg min-h-screen flex flex-col text-pb-text">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-pb-surface border-b border-pb-border px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate("/student/editor")}
          className="text-pb-muted hover:text-pb-text transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex-1">
          <h1 className="font-fraunces text-lg font-semibold text-pb-text">
            Writing Process Replay
          </h1>
          <p className="text-xs text-pb-muted">{title}</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-pb-muted">
          {pasteCount > 0 && (
            <span className="flex items-center gap-1.5 bg-pb-warning-light text-pb-warning px-2 py-1 rounded-chip font-semibold">
              <span className="material-symbols-outlined text-xs">content_paste</span>
              {pasteCount} paste event{pasteCount > 1 ? "s" : ""}
            </span>
          )}
        </div>
      </header>

      {/* Legend */}
      <div className="bg-pb-warning-light/50 border-b border-pb-warning/20 px-6 py-3 flex items-center gap-3 text-sm text-pb-warning">
        <span className="material-symbols-outlined text-base">info</span>
        <span>
          <span className="font-semibold">Amber highlight</span> = text pasted in a single action
          (not typed). Paste events are logged for educator review.
        </span>
      </div>

      {/* Stats bar */}
      <div className="bg-pb-surface border-b border-pb-border px-6 py-3 flex items-center gap-8 text-xs text-pb-muted">
        <Stat label="Duration" value={`${(totalDuration / 1000).toFixed(1)}s recorded`} />
        <Stat label="Words typed" value={`${text.trim().split(/\s+/).filter(Boolean).length}`} />
        <Stat label="Paste events" value={String(pasteCount)} highlight={pasteCount > 0} />
        <Stat label="Progress" value={`${progress}%`} />
      </div>

      {/* Editor replay area */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-10">
        {error && (
          <div className="mb-4 rounded-btn border border-pb-error/20 bg-pb-error-light px-4 py-3 text-sm text-pb-error">
            {error}
          </div>
        )}
        <div className="bg-pb-surface border border-pb-border rounded-card p-8 min-h-[300px] font-source-serif text-base leading-8 text-pb-text">
          {loading ? (
            <p className="text-sm text-pb-muted">Loading process log…</p>
          ) : events.length === 0 ? (
            <p className="text-sm text-pb-muted">No process log events recorded for this document yet.</p>
          ) : (
            <>
          <HighlightedText text={text} pasteRanges={pasteRanges} />
          {playing || currentTime < totalDuration ? (
            <span className="inline-block w-0.5 h-5 bg-pb-student animate-pulse ml-0.5 align-middle" />
          ) : null}
            </>
          )}
        </div>
      </main>

      {/* Playback controls */}
      <div className="sticky bottom-0 bg-pb-surface border-t border-pb-border px-6 py-4">
        <div className="max-w-3xl mx-auto">
          {/* Timeline */}
          <div className="mb-4 relative">
            <input
              type="range"
              min={0}
              max={totalDuration}
              value={currentTime}
              onChange={handleSlider}
              disabled={events.length === 0}
              className="w-full accent-pb-student"
            />
            {/* Paste markers */}
            {events.filter((e) => e.type === "paste").map((e, i) => (
              <div
                key={i}
                className="absolute top-0 w-1 h-3 bg-pb-warning rounded-sm -translate-x-0.5"
                style={{ left: `${(e.time / totalDuration) * 100}%` }}
                title="Paste event"
              />
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={reset}
                disabled={events.length === 0}
                className="w-8 h-8 flex items-center justify-center rounded text-pb-muted hover:text-pb-text transition-colors"
              >
                <span className="material-symbols-outlined text-lg">skip_previous</span>
              </button>
              <button
                onClick={() => setPlaying((p) => !p)}
                disabled={events.length === 0}
                className="w-10 h-10 rounded-full bg-pb-student text-white flex items-center justify-center hover:bg-pb-student/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-lg">
                  {playing ? "pause" : "play_arrow"}
                </span>
              </button>
              <span className="text-xs font-mono text-pb-muted">
                {(currentTime / 1000).toFixed(1)}s / {(totalDuration / 1000).toFixed(1)}s
              </span>
            </div>
            <button
              onClick={() => navigate("/student/share-requests")}
              className="flex items-center gap-2 text-sm font-semibold text-pb-muted hover:text-pb-text transition-colors"
            >
              <span className="material-symbols-outlined text-base">share</span>
              Share with Educator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function HighlightedText({ text, pasteRanges }) {
  if (!text) return null;
  const parts = [];
  let lastEnd = 0;

  for (const [start, end] of pasteRanges) {
    if (start > lastEnd) {
      parts.push(<span key={`t-${lastEnd}`}>{text.slice(lastEnd, start)}</span>);
    }
    parts.push(
      <mark key={`p-${start}`} className="paste-highlight rounded-sm">
        {text.slice(start, Math.min(end, text.length))}
      </mark>
    );
    lastEnd = Math.min(end, text.length);
  }
  if (lastEnd < text.length) {
    parts.push(<span key={`t-end`}>{text.slice(lastEnd)}</span>);
  }
  return <>{parts}</>;
}

function Stat({ label, value, highlight }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-pb-muted">{label}:</span>
      <span className={`font-mono font-semibold ${highlight ? "text-pb-warning" : "text-pb-text"}`}>
        {value}
      </span>
    </div>
  );
}
