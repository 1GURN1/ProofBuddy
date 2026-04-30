const detectionItems = [
  {
    label: "UNIFORMITY",
    score: "Low",
    scoreClass: "text-emerald-600",
    status: "ok",
    detail: "Your sentence structures vary naturally. Paragraph lengths fluctuate in a way consistent with human writing patterns.",
  },
  {
    label: "BURSTINESS",
    score: "38.4",
    scoreClass: "text-emerald-600",
    status: "ok",
    detail: "Burstiness measures rhythm variety. A score above 30 strongly suggests natural human composition.",
  },
  {
    label: "LEXICAL DENSITY",
    score: "0.71",
    scoreClass: "text-blue-600",
    status: "neutral",
    detail: "Slightly elevated compared to your earlier work (0.65). This can reflect a more formal register or careful word choice — not necessarily AI-generated.",
  },
  {
    label: "PASTE CORRELATION",
    score: "Moderate",
    scoreClass: "text-amber-600",
    status: "warn",
    detail: "2 paste events detected. The pasted segments align with phrases in your bibliography — likely self-quotation or copied notes. Review to confirm attribution.",
  },
  {
    label: "CORPUS MATCH",
    score: "None",
    scoreClass: "text-emerald-600",
    status: "ok",
    detail: "No direct overlap found with known GPT output corpora or common AI-generated phrase banks.",
  },
];

const statusIcon = { ok: { icon: "check_circle", cls: "text-emerald-500" }, warn: { icon: "warning", cls: "text-amber-500" }, neutral: { icon: "info", cls: "text-blue-500" } };

export default function StudentAIDetectionDetail() {
  return (
    <div className="font-body-md text-on-surface bg-background min-h-screen">
      <header className="bg-[#FAF9F6] border-b border-[#E8E4DC] sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-3 max-w-[1200px] mx-auto">
          <div className="flex items-center gap-4">
            <a href="/student/report" className="text-stone-400 hover:text-stone-700 transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
            </a>
            <div>
              <p className="font-medium text-sm text-on-surface leading-tight">AI Detection Detail</p>
              <p className="font-label-caps text-[10px] text-stone-400">THESIS DRAFT V2 • ENGL 102</p>
            </div>
          </div>
          <a href="/student/report" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">bar_chart</span> Back to Report
          </a>
        </div>
      </header>

      <main className="max-w-[800px] mx-auto px-gutter py-stack_lg">
        <header className="mb-stack_lg">
          <p className="font-label-caps text-stone-400 mb-1">DETAILED ANALYSIS</p>
          <h1 className="font-h1 text-primary mb-2">AI-Assistance Signals</h1>
          <p className="font-body-md text-stone-500">A breakdown of every signal ProofBuddy analyzed in your submission.</p>
        </header>

        <div className="bg-secondary-container/30 border-l-4 border-secondary p-4 rounded-r-lg flex gap-3 items-start mb-stack_lg">
          <span className="material-symbols-outlined text-secondary">info</span>
          <div>
            <h4 className="font-label-caps text-secondary mb-1">REMEMBER</h4>
            <p className="text-sm text-on-secondary-container leading-relaxed">These signals are statistical — they are not proof of anything. A high signal in any category can have perfectly legitimate explanations. Only your educator and context can make a final judgment.</p>
          </div>
        </div>

        <div className="space-y-4 mb-stack_lg">
          {detectionItems.map(item => {
            const { icon, cls } = statusIcon[item.status];
            return (
              <div key={item.label} className="bg-white border border-outline-variant rounded-xl p-stack_md shadow-sm flex gap-4">
                <span className={`material-symbols-outlined text-[28px] mt-1 ${cls}`} style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                <div className="flex-1">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="font-label-caps text-[11px] text-stone-400">{item.label}</span>
                    <span className={`font-h2 text-xl leading-none ${item.scoreClass}`}>{item.score}</span>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{item.detail}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white border border-outline-variant rounded-xl p-stack_md">
          <h2 className="font-h2 text-h2 text-on-surface mb-3">Overall Assessment</h2>
          <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <span className="material-symbols-outlined text-emerald-600 text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            <div>
              <p className="font-bold text-emerald-800 text-sm">Consistent with human authorship</p>
              <p className="text-xs text-emerald-700 mt-0.5">No strong indicators of AI generation detected. The paste events warrant a brief review but are contextually explainable.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
