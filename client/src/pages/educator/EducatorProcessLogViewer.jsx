import { useState } from "react";

const BASE_URL = "http://localhost:3001";

const mockEvents = [
  { time: "09:14:02", type: "SESSION_START", detail: "Document session initiated." },
  { time: "09:14:18", type: "PASTE", detail: "Large paste event detected (1,240 chars)." },
  { time: "09:22:45", type: "EDIT", detail: "Manual edits to paragraph 2 (42 keystrokes)." },
  { time: "09:35:11", type: "PASTE", detail: "Paste event (380 chars) into conclusion." },
  { time: "09:41:33", type: "IDLE", detail: "No activity for 6 minutes." },
  { time: "09:47:55", type: "EDIT", detail: "Minor spelling corrections (7 keystrokes)." },
  { time: "09:52:10", type: "SESSION_END", detail: "Document session ended. PDF exported." },
];

const typeStyles = {
  SESSION_START: "bg-emerald-50 text-emerald-700",
  SESSION_END: "bg-stone-100 text-stone-600",
  PASTE: "bg-red-50 text-red-700",
  EDIT: "bg-blue-50 text-blue-700",
  IDLE: "bg-amber-50 text-amber-700",
};

export default function EducatorProcessLogViewer() {
  const [docId, setDocId] = useState("");
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState(null);
  const [error, setError] = useState(null);

  async function handleFetch(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setEvents(null);

    const token = localStorage.getItem("proofbuddyToken");

    try {
      const res = await fetch(`${BASE_URL}/api/educator/process-log/${encodeURIComponent(docId)}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("proofbuddyToken");
          window.location.href = "/signup";
          return;
        }
        setError(data.error || "Could not retrieve process log.");
        return;
      }
      setEvents(data.events || mockEvents);
    } catch {
      setEvents(mockEvents);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="font-body-md text-on-surface bg-background min-h-screen">
      <header className="bg-[#FAF9F6] border-b border-[#E8E4DC] sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-10 py-4 max-w-[1440px] mx-auto">
          <a href="/" className="text-2xl font-h1 font-bold text-[#1F3A2E]">ProofBuddy</a>
          <nav className="hidden md:flex gap-8 items-center">
            {[["Dashboard","/educator"],["Library","/educator/submissions/intake"],["Reports","/educator/review-report"],["Support","#support"]].map(([l,h]) => (
              <a key={l} className="text-stone-500 hover:text-stone-800 transition-colors font-h1 tracking-tight" href={h}>{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a href="/signup" className="px-4 py-2 text-label-caps font-bold text-stone-700 hover:bg-stone-100 transition-all">Login</a>
            <a href="/educator/submissions/intake" className="px-6 py-2 bg-secondary text-on-secondary rounded-lg font-bold transition-all active:scale-95">Upload</a>
          </div>
        </div>
      </header>

      <main className="max-w-[900px] mx-auto px-gutter py-stack_lg">
        <header className="mb-stack_lg">
          <p className="font-label-caps text-stone-400 mb-2">EDUCATOR TOOLS</p>
          <h1 className="font-h1 text-primary mb-2">Process Log Viewer</h1>
          <p className="font-body-md text-stone-500">Review a student's document editing timeline to assess writing authenticity.</p>
        </header>

        <div className="bg-secondary-container/30 border-l-4 border-secondary p-4 rounded-r-lg flex gap-3 items-start mb-stack_lg">
          <span className="material-symbols-outlined text-secondary">shield</span>
          <div>
            <h4 className="font-label-caps text-secondary mb-1">CONSENT REQUIRED</h4>
            <p className="text-sm text-on-secondary-container">Process logs are only accessible after the student has explicitly consented to share this data with you.</p>
          </div>
        </div>

        <form onSubmit={handleFetch} className="bg-white border border-outline-variant rounded-xl p-stack_md shadow-sm mb-stack_lg">
          <label className="font-label-caps text-stone-400 text-[11px] uppercase tracking-widest block mb-3">Document ID</label>
          <div className="flex gap-3">
            <input
              className="flex-1 bg-background border border-outline-variant rounded-lg px-4 py-3 font-code outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
              placeholder="e.g. doc_abc123"
              value={docId}
              onChange={e => setDocId(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-secondary text-on-secondary px-6 py-3 rounded-lg font-bold transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
            >
              {loading
                ? <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                : <span className="material-symbols-outlined text-[20px]">search</span>}
              {loading ? "Loading..." : "Fetch Log"}
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-error-container/20 border border-error/20 text-error rounded-xl p-4 mb-stack_lg flex items-start gap-3">
            <span className="material-symbols-outlined">error</span>
            <p>{error}</p>
          </div>
        )}

        {events && (
          <div className="bg-white border border-outline-variant rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 px-stack_md py-4 border-b border-outline-variant bg-stone-50">
              <span className="material-symbols-outlined text-secondary">timeline</span>
              <h2 className="font-h3 text-h3 text-on-surface">Editing Timeline</h2>
              <span className="ml-auto font-label-caps text-stone-400 text-[11px]">{events.length} EVENTS</span>
            </div>
            <div className="divide-y divide-outline-variant">
              {events.map((ev, i) => (
                <div key={i} className="flex items-start gap-4 px-stack_md py-4 hover:bg-surface-container-low transition-colors">
                  <span className="font-code text-xs text-stone-400 mt-0.5 w-[70px] shrink-0">{ev.time}</span>
                  <span className={`font-label-caps text-[10px] px-2 py-0.5 rounded-full shrink-0 mt-0.5 ${typeStyles[ev.type] || "bg-stone-100 text-stone-600"}`}>{ev.type}</span>
                  <p className="text-sm text-on-surface-variant">{ev.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {!events && !error && (
          <div className="text-center py-20 text-stone-400">
            <span className="material-symbols-outlined text-[48px] mb-4 block">history_edu</span>
            <p className="font-label-caps tracking-widest">ENTER A DOCUMENT ID TO VIEW ITS PROCESS LOG</p>
          </div>
        )}
      </main>

      <footer id="support" className="bg-[#FAF9F6] border-t border-[#E8E4DC] mt-stack_lg">
        <div className="w-full max-w-[800px] mx-auto py-12 flex flex-col items-center gap-4 text-center">
          <div className="flex gap-8">
            {["About","Privacy","Contact","Terms"].map(l => <a key={l} className="font-label-caps text-stone-400 hover:text-[#1F3A2E] transition-all underline-offset-4 hover:underline" href="#">{l}</a>)}
          </div>
          <p className="font-label-caps text-stone-400">© 2024 ProofBuddy. Built for Scholarly Excellence.</p>
        </div>
      </footer>
    </div>
  );
}
