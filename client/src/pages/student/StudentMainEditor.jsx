import { useState, useRef } from "react";

const BASE_URL = "http://localhost:3001";

export default function StudentMainEditor() {
  const [content, setContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [showToolbar, setShowToolbar] = useState(false);
  const saveTimer = useRef(null);

  function handleChange(e) {
    const val = e.target.value;
    setContent(val);
    setWordCount(val.trim() ? val.trim().split(/\s+/).length : 0);

    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      setSaving(true);
      setTimeout(() => {
        setSaving(false);
        setLastSaved(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      }, 600);
    }, 1200);
  }

  return (
    <div className="font-body-md text-on-surface bg-[#FAF9F6] min-h-screen flex flex-col">
      <header className="bg-white border-b border-[#E8E4DC] sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-3 max-w-[1200px] mx-auto">
          <div className="flex items-center gap-4">
            <a href="/student/documents" className="text-stone-400 hover:text-stone-700 transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
            </a>
            <div>
              <p className="font-medium text-sm text-on-surface leading-tight">Thesis Draft V2</p>
              <p className="font-label-caps text-[10px] text-stone-400">ENGL 102</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {saving && (
              <span className="font-label-caps text-[11px] text-stone-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] animate-spin">progress_activity</span> Saving...
              </span>
            )}
            {!saving && lastSaved && (
              <span className="font-label-caps text-[11px] text-stone-400">Saved {lastSaved}</span>
            )}
            <button
              type="button"
              onClick={() => setShowToolbar(p => !p)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${showToolbar ? "bg-primary/10 text-primary" : "text-stone-500 hover:bg-stone-100"}`}
            >
              <span className="material-symbols-outlined text-[18px]">format_paint</span> Format
            </button>
            <a href="/student/report" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-on-primary text-sm font-bold transition-all active:scale-95 hover:opacity-90">
              <span className="material-symbols-outlined text-[18px]">analytics</span> View Report
            </a>
          </div>
        </div>

        {showToolbar && (
          <div className="flex items-center gap-1 px-6 py-2 border-t border-[#E8E4DC] bg-stone-50/80">
            {["format_bold","format_italic","format_underlined","format_list_bulleted","format_list_numbered","format_quote"].map(icon => (
              <button key={icon} type="button" className="p-1.5 rounded hover:bg-stone-200 transition-colors text-stone-600">
                <span className="material-symbols-outlined text-[18px]">{icon}</span>
              </button>
            ))}
            <div className="w-px h-5 bg-stone-200 mx-1" />
            <select className="text-xs border border-stone-200 rounded px-2 py-1 text-stone-600 bg-white outline-none">
              <option>Body Text</option>
              <option>Heading 1</option>
              <option>Heading 2</option>
            </select>
          </div>
        )}
      </header>

      <div className="flex flex-1 max-w-[1200px] mx-auto w-full">
        <main className="flex-1 flex flex-col items-center py-12 px-6">
          <div className="w-full max-w-[680px]">
            <div className="mb-6">
              <input
                className="w-full text-3xl font-h1 text-primary bg-transparent border-none outline-none placeholder:text-stone-300"
                placeholder="Document title..."
                defaultValue="Thesis Draft V2"
              />
              <p className="font-label-caps text-[11px] text-stone-400 mt-1">ENGL 102 • Started Oct 14, 2024</p>
            </div>

            <textarea
              className="w-full min-h-[70vh] bg-transparent border-none outline-none font-editor-text text-editor-text leading-loose resize-none placeholder:text-stone-300"
              placeholder="Begin writing here. ProofBuddy tracks your process automatically..."
              value={content}
              onChange={handleChange}
              autoFocus
            />
          </div>
        </main>

        <aside className="w-[220px] border-l border-[#E8E4DC] py-8 px-5 space-y-8 hidden lg:block">
          <div>
            <p className="font-label-caps text-[10px] text-stone-400 mb-3 tracking-widest">STATS</p>
            <div className="space-y-3">
              {[["WORDS", wordCount],["CHARACTERS", content.length],["PARAGRAPHS", content.split(/\n\n+/).filter(Boolean).length || 0]].map(([l,v]) => (
                <div key={l}>
                  <p className="font-label-caps text-[9px] text-stone-400">{l}</p>
                  <p className="font-h2 text-secondary text-xl">{v}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-label-caps text-[10px] text-stone-400 mb-3 tracking-widest">PROCESS LOG</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-stone-500">Recording</span>
            </div>
            <a href="/student/process-replay" className="mt-3 text-xs text-primary font-medium hover:underline flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">timeline</span> View replay
            </a>
          </div>

          <div>
            <p className="font-label-caps text-[10px] text-stone-400 mb-3 tracking-widest">INTEGRITY</p>
            <a href="/student/report" className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">analytics</span> View report
            </a>
            <a href="/student/ai-detection-detail" className="mt-2 text-xs text-stone-500 hover:underline flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">psychology</span> AI signals
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
