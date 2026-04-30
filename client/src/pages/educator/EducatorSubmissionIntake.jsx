import { useState } from "react";

const BASE_URL = "http://localhost:3001";

export default function EducatorSubmissionIntake() {
  const [submissionText, setSubmissionText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleAnalyze(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const token = localStorage.getItem("proofbuddyToken");

    try {
      const res = await fetch(`${BASE_URL}/api/educator/analyze-submission`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ submissionText }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("proofbuddyToken");
          window.location.href = "/signup";
          return;
        }
        setError(data.error || "Analysis failed.");
        return;
      }

      setResult(data.report);
    } catch (err) {
      setError("Network error. Make sure the server is running.");
    } finally {
      setLoading(false);
    }
  }

  function getAttentionBadge(level) {
    const map = {
      several_signals: { label: "HIGH RISK", cls: "bg-red-50 text-red-700 border border-red-200" },
      some_signals: { label: "MEDIUM RISK", cls: "bg-[#FFF4E5] text-[#B45309] border border-[#FCD34D]" },
      routine: { label: "LOW RISK", cls: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
    };
    return map[level] || { label: level?.toUpperCase() || "UNKNOWN", cls: "bg-stone-100 text-stone-600" };
  }

  return (
    <div className="font-body-md text-on-surface bg-background min-h-screen">
      <header className="bg-[#FAF9F6] border-b border-[#E8E4DC] sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-10 py-4 max-w-[1440px] mx-auto">
          <a href="/" className="text-2xl font-h1 font-bold text-[#1F3A2E]">ProofBuddy</a>
          <nav className="hidden md:flex gap-8 items-center">
            {[["Dashboard","/educator"],["Library","/educator/submissions/intake",true],["Reports","/educator/review-report"],["Support","#support"]].map(([l,h,active]) => (
              <a key={l} className={`font-h1 tracking-tight ${active ? "text-[#1F3A2E] font-semibold border-b-2 border-[#1F3A2E] pb-1" : "text-stone-500 hover:text-stone-800 transition-colors"}`} href={h}>{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a href="/signup" className="px-4 py-2 text-label-caps font-bold text-stone-700 hover:bg-stone-100 transition-all">Login</a>
            <a href="/educator/assignments/new" className="px-6 py-2 bg-secondary text-on-secondary rounded-lg font-bold transition-all active:scale-95">New Assignment</a>
          </div>
        </div>
      </header>

      <main className="max-w-[900px] mx-auto px-gutter py-stack_lg">
        <header className="mb-stack_lg">
          <p className="font-label-caps text-stone-400 mb-2">EDUCATOR TOOLS</p>
          <h1 className="font-h1 text-primary mb-2">Analyze Submission</h1>
          <p className="font-body-md text-stone-500">Paste a student's submission to run an AI-assisted integrity review.</p>
        </header>

        <form onSubmit={handleAnalyze} className="mb-stack_lg">
          <div className="bg-white border border-outline-variant rounded-xl p-stack_md shadow-sm mb-4">
            <label className="font-label-caps text-stone-400 text-[11px] uppercase tracking-widest block mb-3">Student Submission Text</label>
            <textarea
              className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 font-editor-text text-editor-text outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary resize-none transition-all"
              rows={14}
              placeholder="Paste the full text of the student's submission here..."
              value={submissionText}
              onChange={e => setSubmissionText(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || !submissionText.trim()}
              className="bg-secondary text-on-secondary px-8 py-3 rounded-lg font-bold transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
            >
              {loading
                ? <><span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span> Analyzing...</>
                : <><span className="material-symbols-outlined text-[20px]">psychology</span> Run Analysis</>}
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-error-container/20 border border-error/20 text-error rounded-xl p-stack_md mb-stack_lg flex items-start gap-3">
            <span className="material-symbols-outlined">error</span>
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-stack_md">
            <div className="flex items-center justify-between border-b border-outline-variant pb-4">
              <h2 className="font-h2 text-h2 text-on-surface">Analysis Results</h2>
              {result.attentionLevel && (() => {
                const badge = getAttentionBadge(result.attentionLevel);
                return (
                  <span className={`px-3 py-1 rounded-full font-label-caps text-sm flex items-center gap-1 ${badge.cls}`}>
                    <span className="material-symbols-outlined text-[16px]">visibility</span> {badge.label}
                  </span>
                );
              })()}
            </div>

            {result.summary && (
              <div className="bg-white border border-outline-variant rounded-xl p-stack_md shadow-sm">
                <h3 className="font-h3 text-h3 mb-3">Summary</h3>
                <p className="font-editor-text text-editor-text italic text-on-surface-variant leading-relaxed bg-surface-container-low p-4 rounded-lg border border-outline-variant">"{result.summary}"</p>
              </div>
            )}

            {result.possibleSignals?.length > 0 && (
              <div className="bg-white border border-outline-variant rounded-xl p-stack_md shadow-sm">
                <h3 className="font-h3 text-h3 mb-4">Signals Detected</h3>
                <div className="space-y-4">
                  {result.possibleSignals.map((signal, i) => (
                    <div key={i} className="border border-outline-variant rounded-lg p-4">
                      <p className="font-medium text-on-surface mb-2">{signal.observation}</p>
                      {signal.alternativeExplanations?.length > 0 && (
                        <div className="mt-2">
                          <p className="font-label-caps text-stone-400 text-[11px] mb-1">ALTERNATIVE EXPLANATIONS</p>
                          <ul className="space-y-1">
                            {signal.alternativeExplanations.map((exp, j) => (
                              <li key={j} className="text-sm text-stone-500 flex gap-2"><span>•</span>{exp}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.suggestedQuestions?.length > 0 && (
              <div className="bg-white border border-outline-variant rounded-xl p-stack_md shadow-sm">
                <h3 className="font-h3 text-h3 mb-4">Suggested Follow-up Questions</h3>
                <ul className="space-y-3">
                  {result.suggestedQuestions.map((q, i) => (
                    <li key={i} className="flex gap-3 text-sm text-on-surface-variant border-b border-surface-variant pb-2">
                      <span className="font-bold text-secondary">{i + 1}.</span>"{q}"
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.disclaimer && (
              <div className="bg-secondary-container/30 border-l-4 border-secondary p-4 rounded-r-lg flex gap-3 items-start">
                <span className="material-symbols-outlined text-secondary">info</span>
                <p className="text-sm text-on-secondary-container">{result.disclaimer}</p>
              </div>
            )}

            <div className="flex justify-center pt-4">
              <a href="/educator/review-report" className="bg-secondary text-on-secondary px-8 py-3 rounded-lg font-bold transition-all active:scale-95 flex items-center gap-2">
                <span className="material-symbols-outlined">description</span> View Full Review Report
              </a>
            </div>
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
