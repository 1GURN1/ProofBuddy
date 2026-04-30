import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:3001";

export default function EducatorDashboard() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function authHeaders() {
    const token = localStorage.getItem("proofbuddyToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  useEffect(() => {
    const token = localStorage.getItem("proofbuddyToken");
    const role = localStorage.getItem("proofbuddyRole");
    if (!token) navigate("/auth", { replace: true });
    else if (role !== "educator") navigate("/student", { replace: true });
  }, [navigate]);

  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await fetch(`${API}/api/educator/reviews`, {
          headers: authHeaders(),
        });
        if (res.status === 401 || res.status === 403) {
          navigate("/auth", { replace: true });
          return;
        }
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load educator reviews.");
        setReviews(data.reviews || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadReviews();
  }, [navigate]);

  const rows = reviews.map((review) => {
    const attention = review.report?.attentionLevel || review.attention_level || "routine";
    return {
      id: review.id,
      title: review.assignment_prompt?.slice(0, 90) || "Untitled review",
      submitted: new Date(review.created_at).toLocaleDateString(),
      status:
        attention === "several_signals"
          ? "flagged"
          : attention === "some_signals"
          ? "review"
          : "clear",
      score:
        attention === "several_signals"
          ? 45
          : attention === "some_signals"
          ? 70
          : 92,
      aiRisk:
        attention === "several_signals"
          ? "high"
          : attention === "some_signals"
          ? "medium"
          : "low",
      report: review.report,
      aiPolicy: review.ai_policy,
    };
  });

  const filtered = filter === "all"
    ? rows
    : rows.filter((s) => s.status === filter);

  const stats = [
    { label: "Total Reviews", value: String(rows.length), icon: "description", delta: rows.length ? "Saved analyses" : "No analyses yet" },
    { label: "Flagged", value: String(rows.filter((r) => r.status === "flagged").length), icon: "flag", delta: "Several signals", color: "text-pb-error" },
    { label: "Clear", value: String(rows.filter((r) => r.status === "clear").length), icon: "check_circle", delta: "Routine", color: "text-pb-success" },
    { label: "Review", value: String(rows.filter((r) => r.status === "review").length), icon: "pending", delta: "Some signals", color: "text-pb-warning" },
  ];

  return (
    <div className="bg-pb-bg min-h-screen text-pb-text flex">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-pb-edu text-white flex flex-col py-6 px-4 sticky top-0 h-screen">
        <button
          onClick={() => navigate("/")}
          className="font-fraunces text-xl font-semibold text-white mb-10 px-2 text-left hover:opacity-80 transition-opacity"
        >
          ProofBuddy
        </button>
        <nav className="flex flex-col gap-1 flex-1">
          <EduNavItem icon="dashboard" label="Dashboard" active />
          <EduNavItem icon="school" label="Course Setup" onClick={() => navigate("/educator/course-setup")} />
          <EduNavItem icon="upload_file" label="New Submission" onClick={() => navigate("/educator/intake")} />
          <EduNavItem icon="fact_check" label="Reports" onClick={() => navigate("/educator/report")} />
          <EduNavItem icon="timeline" label="Process Logs" onClick={() => navigate("/educator/process-log")} />
        </nav>
        <div className="border-t border-white/10 pt-4">
          <EduNavItem icon="settings" label="Settings" onClick={() => navigate("/settings")} />
          <button
            onClick={() => { localStorage.clear(); navigate("/auth"); }}
            className="flex items-center gap-3 w-full px-2 py-2 rounded text-sm text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            <span className="material-symbols-outlined text-base">logout</span>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-pb-bg border-b border-pb-border px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="font-fraunces text-2xl font-semibold text-pb-text">Dashboard</h1>
            <p className="text-sm text-pb-muted mt-0.5">
              Welcome back, Dr. Chen · {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </p>
          </div>
          <button
            onClick={() => navigate("/educator/intake")}
            className="flex items-center gap-2 bg-pb-edu text-white text-sm font-semibold px-5 py-2.5 rounded-btn hover:bg-pb-edu/90 transition-all"
          >
            <span className="material-symbols-outlined text-base">add</span>
            New Analysis
          </button>
        </header>

        <main className="flex-1 p-8">
          {error && (
            <div className="mb-6 rounded-btn border border-pb-error/20 bg-pb-error-light px-4 py-3 text-sm text-pb-error">
              {error}
            </div>
          )}
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {stats.map((s) => (
              <div key={s.label} className="bg-pb-surface border border-pb-border rounded-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-pb-muted">
                    {s.label}
                  </span>
                  <span className="material-symbols-outlined text-pb-muted text-base">{s.icon}</span>
                </div>
                <p className={`font-fraunces text-3xl font-semibold mb-1 ${s.color || "text-pb-text"}`}>
                  {s.value}
                </p>
                <p className="text-xs text-pb-muted">{s.delta}</p>
              </div>
            ))}
          </div>

          {/* Submissions table */}
          <div className="bg-pb-surface border border-pb-border rounded-card overflow-hidden">
            <div className="px-6 py-4 border-b border-pb-border flex items-center justify-between">
              <h2 className="font-fraunces text-base font-semibold text-pb-text">
                Recent Submissions
              </h2>
              <div className="flex gap-2">
                {["all", "flagged", "review", "clear"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-chip transition-all capitalize ${
                      filter === f
                        ? "bg-pb-edu text-white"
                        : "text-pb-muted hover:text-pb-text"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-pb-border">
              {loading ? (
                <div className="px-6 py-10 text-center text-pb-muted text-sm">
                  Loading educator reviews…
                </div>
              ) : filtered.map((sub) => (
                <SubmissionRow key={sub.id} sub={sub} navigate={navigate} />
              ))}
              {!loading && filtered.length === 0 && (
                <div className="px-6 py-10 text-center text-pb-muted text-sm">
                  {rows.length === 0 ? "No educator reviews yet. Run an analysis to populate the dashboard." : "No reviews match this filter."}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function SubmissionRow({ sub, navigate }) {
  const statusChip = {
    flagged: "bg-pb-error-light text-pb-error",
    review: "bg-pb-warning-light text-pb-warning",
    clear: "bg-pb-success-light text-pb-success",
  }[sub.status];

  const riskColor = {
    high: "text-pb-error",
    medium: "text-pb-warning",
    low: "text-pb-success",
  }[sub.aiRisk];

  return (
    <button
      onClick={() => {
        localStorage.setItem("proofbuddyReport", JSON.stringify(sub.report));
        navigate("/educator/report");
      }}
      className="w-full px-6 py-4 text-left hover:bg-pb-bg transition-colors grid grid-cols-12 items-center gap-4"
    >
      <div className="col-span-5">
        <p className="text-sm font-semibold text-pb-text line-clamp-1">{sub.title}</p>
        <p className="text-xs text-pb-muted">Policy: {sub.aiPolicy}</p>
      </div>
      <div className="col-span-2 text-xs text-pb-muted">{sub.submitted}</div>
      <div className="col-span-2">
        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-chip ${statusChip}`}>
          {sub.status}
        </span>
      </div>
      <div className={`col-span-1 font-mono text-sm font-bold ${riskColor}`}>
        {sub.score}%
      </div>
      <div className="col-span-2 flex justify-end">
        <span className="text-xs font-semibold text-pb-edu hover:underline underline-offset-4">
          Review →
        </span>
      </div>
    </button>
  );
}

function EduNavItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-2 py-2 rounded text-sm font-medium transition-all ${
        active
          ? "bg-white/15 text-white"
          : "text-white/60 hover:text-white hover:bg-white/10"
      }`}
    >
      <span className="material-symbols-outlined text-base">{icon}</span>
      {label}
    </button>
  );
}
