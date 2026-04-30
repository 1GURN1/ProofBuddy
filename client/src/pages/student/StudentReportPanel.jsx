import { useState } from "react";

const signals = [
  { label: "LEXICAL DIVERSITY", value: "0.71", note: "Within your historical range (0.68–0.74).", ok: true },
  { label: "SENTENCE BURSTINESS", value: "38.4", note: "Natural variance detected. No anomalies.", ok: true },
  { label: "PASTE EVENTS", value: "2", note: "2 paste events logged. Review recommended.", ok: false },
];

export default function StudentReportPanel() {
  const [shareConsent, setShareConsent] = useState(false);
  const [shareRequested, setShareRequested] = useState(false);

  return (
    <div className="font-body-md text-on-surface bg-background min-h-screen">
      <header className="bg-[#FAF9F6] border-b border-[#E8E4DC] sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-3 max-w-[1200px] mx-auto">
          <div className="flex items-center gap-4">
            <a href="/student/editor" className="text-stone-400 hover:text-stone-700 transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
            </a>
            <div>
              <p className="font-medium text-sm text-on-surface leading-tight">Integrity Report</p>
              <p className="font-label-caps text-[10px] text-stone-400">THESIS DRAFT V2 • ENGL 102</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/student/ai-detection-detail" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">psychology</span> AI Detail
            </a>
            <a href="/student/process-replay" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-on-primary text-sm font-bold transition-all active:scale-95">
              <span className="material-symbols-outlined text-[18px]">timeline</span> Process Replay
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-[800px] mx-auto px-gutter py-stack_lg">
        <div className="flex items-start justify-between mb-stack_lg">
          <div>
            <p className="font-label-caps text-stone-400 mb-1">YOUR INTEGRITY OVERVIEW</p>
            <h1 className="font-h1 text-primary">Writing Report</h1>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full">
            <span className="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span>
            <span className="font-label-caps text-emerald-700 text-xs">LOW CONCERN</span>
          </div>
        </div>

        <div className="bg-primary-container text-on-primary p-stack_md rounded-xl shadow-sm mb-stack_lg">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-primary-fixed">auto_awesome</span>
            <h3 className="font-h3 text-h3 text-primary-fixed">Your Writing Summary</h3>
          </div>
          <p className="text-sm text-primary-fixed-dim leading-relaxed">
            "Your writing shows consistent stylistic patterns with your previous submissions. Two paste events were detected — make sure these are properly cited or represent your own notes. Overall, the process log reflects genuine authorship with natural editing rhythms."
          </p>
        </div>

        <section className="mb-stack_lg">
          <h2 className="font-h2 text-h2 text-on-surface mb-4">Writing Signals</h2>
          <div className="space-y-3">
            {signals.map(s => (
              <div key={s.label} className={`flex items-center gap-4 p-4 rounded-xl border ${s.ok ? "bg-white border-outline-variant" : "bg-amber-50/50 border-amber-200"}`}>
                <span className={`material-symbols-outlined text-[22px] ${s.ok ? "text-emerald-500" : "text-amber-500"}`} style={{ fontVariationSettings: "'FILL' 1" }}>{s.ok ? "check_circle" : "warning"}</span>
                <div className="flex-1">
                  <p className="font-label-caps text-[11px] text-stone-400">{s.label}</p>
                  <p className="font-h2 text-primary text-xl leading-tight">{s.value}</p>
                  <p className="text-xs text-stone-500 mt-0.5">{s.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-stack_lg">
          <h2 className="font-h2 text-h2 text-on-surface mb-4">Process Log Summary</h2>
          <div className="bg-white border border-outline-variant rounded-xl p-stack_md grid grid-cols-3 gap-4">
            {[["SESSION DURATION","48 min"],["TOTAL KEYSTROKES","3,812"],["PASTE EVENTS","2"]].map(([l,v]) => (
              <div key={l} className="text-center">
                <p className="font-label-caps text-[10px] text-stone-400 mb-1">{l}</p>
                <p className="font-h2 text-secondary text-2xl">{v}</p>
              </div>
            ))}
          </div>
          <a href="/student/process-replay" className="mt-3 inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline">
            <span className="material-symbols-outlined text-[16px]">play_circle</span> View full writing replay
          </a>
        </section>

        <section className="bg-white border border-outline-variant rounded-xl p-stack_md">
          <h2 className="font-h2 text-h2 text-on-surface mb-2">Share with Educator</h2>
          <p className="text-sm text-stone-500 mb-4">Your educator has requested your ProofBuddy Process Log for this submission. Sharing is voluntary — only you can authorize access.</p>

          {shareRequested ? (
            <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <span className="material-symbols-outlined text-emerald-600" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <p className="text-sm text-emerald-700 font-medium">Log shared successfully. Your educator can now view your process log.</p>
            </div>
          ) : (
            <>
              <label className="flex items-start gap-3 cursor-pointer mb-4">
                <input
                  type="checkbox"
                  checked={shareConsent}
                  onChange={e => setShareConsent(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-stone-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-stone-600">I understand that sharing my process log will give my educator a timestamped view of my editing history for this document only.</span>
              </label>
              <button
                type="button"
                disabled={!shareConsent}
                onClick={() => setShareRequested(true)}
                className="w-full py-3 bg-primary text-on-primary rounded-lg font-bold text-sm transition-all active:scale-95 disabled:opacity-40"
              >
                Share Process Log
              </button>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
