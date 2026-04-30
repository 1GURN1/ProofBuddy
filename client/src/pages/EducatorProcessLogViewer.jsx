import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EVENTS = [
  { id: 1, time: "0:00", type: "session_start", detail: "Writing session started", duration: null },
  { id: 2, time: "0:12", type: "type", detail: "Typed 47 words in introduction", duration: "48s" },
  { id: 3, time: "1:00", type: "paste", detail: 'Pasted 183 words — paragraph starting "The syntactic uniformity…"', duration: null, flagged: true },
  { id: 4, time: "1:05", type: "type", detail: "Typed 12 words after paste", duration: "20s" },
  { id: 5, time: "2:30", type: "delete", detail: "Deleted 34 words (backspace)", duration: "25s" },
  { id: 6, time: "3:10", type: "type", detail: "Typed 89 words in section 2", duration: "3m 12s" },
  { id: 7, time: "6:22", type: "paste", detail: "Pasted 67 words — conclusion paragraph", duration: null, flagged: true },
  { id: 8, time: "6:40", type: "type", detail: "Minor edits, 8 words changed", duration: "1m" },
  { id: 9, time: "7:40", type: "session_end", detail: "Writing session ended", duration: null },
];

const EVENT_ICONS = {
  session_start: { icon: "play_circle", color: "text-pb-success bg-pb-success-light" },
  session_end: { icon: "stop_circle", color: "text-pb-muted bg-pb-border" },
  type: { icon: "keyboard", color: "text-pb-info bg-pb-info-light" },
  paste: { icon: "content_paste", color: "text-pb-warning bg-pb-warning-light" },
  delete: { icon: "backspace", color: "text-pb-error bg-pb-error-light" },
};

export default function EducatorProcessLogViewer() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all"
    ? EVENTS
    : filter === "flagged"
    ? EVENTS.filter((e) => e.flagged)
    : EVENTS.filter((e) => e.type === filter);

  const pasteCount = EVENTS.filter((e) => e.type === "paste").length;
  const flaggedCount = EVENTS.filter((e) => e.flagged).length;

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
          <EduNavItem icon="dashboard" label="Dashboard" onClick={() => navigate("/educator")} />
          <EduNavItem icon="school" label="Course Setup" onClick={() => navigate("/educator/course-setup")} />
          <EduNavItem icon="upload_file" label="New Submission" onClick={() => navigate("/educator/intake")} />
          <EduNavItem icon="fact_check" label="Reports" onClick={() => navigate("/educator/report")} />
          <EduNavItem icon="timeline" label="Process Logs" active />
        </nav>
        <div className="border-t border-white/10 pt-4">
          <EduNavItem icon="settings" label="Settings" onClick={() => navigate("/settings")} />
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-pb-bg border-b border-pb-border px-8 py-5 flex items-center justify-between">
          <div>
            <button onClick={() => navigate("/educator/report")} className="flex items-center gap-2 text-sm text-pb-muted hover:text-pb-text mb-2 transition-colors">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Report
            </button>
            <h1 className="font-fraunces text-2xl font-semibold text-pb-text">Process Log Viewer</h1>
            <p className="text-xs text-pb-muted mt-0.5">Gothic Architecture — Alex Kim · Shared 2 hours ago</p>
          </div>
          <button className="flex items-center gap-2 border border-pb-border text-sm font-medium text-pb-muted px-4 py-2 rounded-btn hover:text-pb-text transition-all">
            <span className="material-symbols-outlined text-base">download</span>
            Export
          </button>
        </header>

        {/* Due process banner */}
        <div className="bg-pb-info-light border-b border-pb-info/20 px-8 py-3 flex items-center gap-3 text-sm text-pb-info">
          <span className="material-symbols-outlined text-base shrink-0">gavel</span>
          <span>
            <strong>Due process reminder:</strong> This log supports investigation — it does not
            constitute proof. Paste events may have legitimate explanations. Discuss findings with
            the student before any formal action.
          </span>
        </div>

        <main className="flex-1 p-8 max-w-3xl">
          {/* Summary cards */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <SummaryCard label="Total Events" value={String(EVENTS.length)} icon="timeline" />
            <SummaryCard label="Paste Events" value={String(pasteCount)} icon="content_paste" color={pasteCount > 0 ? "text-pb-warning" : undefined} />
            <SummaryCard label="Flagged" value={String(flaggedCount)} icon="flag" color={flaggedCount > 0 ? "text-pb-error" : undefined} />
          </div>

          {/* Filter */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {["all", "flagged", "type", "paste", "delete"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-chip capitalize transition-all ${
                  filter === f
                    ? "bg-pb-edu text-white"
                    : "border border-pb-border text-pb-muted hover:text-pb-text"
                }`}
              >
                {f === "flagged" ? "⚑ Flagged" : f}
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-[18px] top-0 bottom-0 w-px bg-pb-border" />
            <div className="space-y-3">
              {filtered.map((event) => {
                const style = EVENT_ICONS[event.type] || EVENT_ICONS.type;
                return (
                  <div
                    key={event.id}
                    className={`relative flex gap-4 ${event.flagged ? "bg-pb-warning-light/50 rounded-card border border-pb-warning/20 p-3 -ml-2" : ""}`}
                  >
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 z-10 ${style.color}`}>
                      <span className="material-symbols-outlined text-base">{style.icon}</span>
                    </div>
                    <div className="flex-1 pt-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-pb-muted">{event.time}</span>
                          {event.flagged && (
                            <span className="text-xs font-bold text-pb-warning bg-pb-warning-light px-1.5 py-0.5 rounded-chip">
                              Flagged
                            </span>
                          )}
                        </div>
                        {event.duration && (
                          <span className="text-xs text-pb-muted">{event.duration}</span>
                        )}
                      </div>
                      <p className="text-sm text-pb-text mt-0.5">{event.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, icon, color }) {
  return (
    <div className="bg-pb-surface border border-pb-border rounded-card p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold uppercase tracking-widest text-pb-muted">{label}</span>
        <span className="material-symbols-outlined text-pb-muted text-base">{icon}</span>
      </div>
      <p className={`font-fraunces text-2xl font-semibold ${color || "text-pb-text"}`}>{value}</p>
    </div>
  );
}

function EduNavItem({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-3 w-full px-2 py-2 rounded text-sm font-medium transition-all ${active ? "bg-white/15 text-white" : "text-white/60 hover:text-white hover:bg-white/10"}`}>
      <span className="material-symbols-outlined text-base">{icon}</span>
      {label}
    </button>
  );
}
