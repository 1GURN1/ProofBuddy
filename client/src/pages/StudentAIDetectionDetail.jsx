import { useNavigate } from "react-router-dom";

const FLAGGED_PASSAGES = [
  {
    id: 1,
    text: "The syntactic uniformity of this paragraph exceeds typical human variance thresholds, with a calculated perplexity score of 12.3 — well below the median human-generated text score of 45–80.",
    risk: 94,
    signals: ["Low perplexity", "Uniform sentence length", "Passive voice concentration"],
  },
  {
    id: 2,
    text: "Contemporary scholarship increasingly recognizes the multifaceted nature of post-modern architectural discourse within literary frameworks.",
    risk: 78,
    signals: ["High burstiness drop", "Lexical hedging pattern", "Formulaic opener"],
  },
  {
    id: 3,
    text: "Gothic motifs served as both aesthetic choice and ideological statement in the Victorian literary imagination.",
    risk: 41,
    signals: ["Stylistic shift from baseline"],
  },
];

const SCORE = 31;

export default function StudentAIDetectionDetail() {
  const navigate = useNavigate();

  return (
    <div className="bg-pb-bg min-h-screen text-pb-text">
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
            AI Detection Analysis
          </h1>
          <p className="text-xs text-pb-muted">
            Gothic Architecture — ENG 402
          </p>
        </div>
        <button
          onClick={() => navigate("/student/editor")}
          className="text-sm font-medium text-pb-muted hover:text-pb-text transition-colors"
        >
          Back to Editor
        </button>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Overall risk score */}
        <div className="bg-pb-surface border border-pb-border rounded-card p-8 mb-8 flex flex-col md:flex-row items-center gap-8">
          <div className="shrink-0 text-center">
            <div
              className="w-28 h-28 rounded-full mx-auto flex items-center justify-center"
              style={{
                background: `conic-gradient(${SCORE > 70 ? "#B54848" : SCORE > 40 ? "#C28A2C" : "#5A8A6E"} ${SCORE * 3.6}deg, #E8E4DC 0deg)`,
              }}
            >
              <div className="w-20 h-20 bg-pb-surface rounded-full flex items-center justify-center">
                <span className="font-mono text-2xl font-bold text-pb-text">{SCORE}%</span>
              </div>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-pb-muted mt-3">
              AI Risk Score
            </p>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-pb-success-light text-pb-success text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-chip">
                Low Risk
              </span>
            </div>
            <h2 className="font-fraunces text-xl font-semibold text-pb-text mb-2">
              Likely human-authored with some elevated-risk passages
            </h2>
            <p className="text-sm text-pb-muted leading-relaxed">
              ProofBuddy's analysis identified 3 passages with elevated AI-likelihood signals.
              The overall perplexity and burstiness profile is consistent with human writing,
              but 2 paragraphs warrant closer review.
            </p>
          </div>
        </div>

        {/* Methodology note */}
        <div className="bg-pb-info-light border border-pb-info/20 rounded-card px-5 py-4 mb-8 flex gap-3">
          <span className="material-symbols-outlined text-pb-info shrink-0">info</span>
          <div className="text-sm text-pb-info leading-relaxed">
            <strong>Methodology:</strong> ProofBuddy uses perplexity scoring, burstiness analysis,
            and stylometric comparison against your baseline writing sample. These are probabilistic
            signals — not proof. Always review with context.
          </div>
        </div>

        {/* Signal metrics */}
        <h2 className="font-fraunces text-lg font-semibold text-pb-text mb-4">Signal Breakdown</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <MetricCard label="Perplexity Score" value="18.4" note="Human avg: 45–80" risk="high" />
          <MetricCard label="Burstiness" value="0.31" note="Human avg: 0.6–1.2" risk="medium" />
          <MetricCard label="Lexical Diversity" value="0.72" note="Normal range" risk="low" />
          <MetricCard label="Baseline Match" value="64%" note="Similar to prior work" risk="low" />
        </div>

        {/* Flagged passages */}
        <h2 className="font-fraunces text-lg font-semibold text-pb-text mb-4">
          Flagged Passages ({FLAGGED_PASSAGES.length})
        </h2>
        <div className="space-y-4">
          {FLAGGED_PASSAGES.map((p) => (
            <FlaggedPassage key={p.id} passage={p} />
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-pb-border flex items-center justify-between">
          <button
            onClick={() => navigate("/student/report")}
            className="text-sm font-semibold text-pb-student hover:underline underline-offset-4"
          >
            ← Full Report
          </button>
          <button
            onClick={() => navigate("/student/replay")}
            className="flex items-center gap-2 bg-pb-student text-white text-sm font-semibold px-5 py-2.5 rounded-btn hover:bg-pb-student/90 transition-all"
          >
            <span className="material-symbols-outlined text-base">play_circle</span>
            View Writing Replay
          </button>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, note, risk }) {
  const riskColor = {
    high: "text-pb-error bg-pb-error-light",
    medium: "text-pb-warning bg-pb-warning-light",
    low: "text-pb-success bg-pb-success-light",
  }[risk];

  return (
    <div className="bg-pb-surface border border-pb-border rounded-card p-4">
      <p className="text-xs text-pb-muted uppercase tracking-wider mb-2">{label}</p>
      <p className={`font-mono text-2xl font-bold mb-1 ${riskColor.split(" ")[0]}`}>{value}</p>
      <p className="text-xs text-pb-muted">{note}</p>
    </div>
  );
}

function FlaggedPassage({ passage }) {
  const riskColor =
    passage.risk >= 70
      ? "bg-pb-error-light border-pb-error/20 text-pb-error"
      : passage.risk >= 40
      ? "bg-pb-warning-light border-pb-warning/20 text-pb-warning"
      : "bg-pb-success-light border-pb-success/20 text-pb-success";

  return (
    <div className="bg-pb-surface border border-pb-border rounded-card p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2">
          {passage.signals.map((s) => (
            <span key={s} className="text-xs bg-pb-bg border border-pb-border rounded-chip px-2 py-0.5 text-pb-muted">
              {s}
            </span>
          ))}
        </div>
        <span className={`font-mono text-sm font-bold px-2 py-0.5 rounded-chip border ${riskColor}`}>
          {passage.risk}% risk
        </span>
      </div>
      <blockquote className="text-sm text-pb-text leading-relaxed italic border-l-2 border-pb-border pl-4 font-source-serif">
        "{passage.text}"
      </blockquote>
    </div>
  );
}
