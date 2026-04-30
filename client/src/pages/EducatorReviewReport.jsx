import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RequestProcessLogModal from "../components/RequestProcessLogModal";

const TABS = ["Overview", "AI Signals", "Citations", "Writing Metrics", "Follow-Up"];

export default function EducatorReviewReport() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("Overview");
  const [modalOpen, setModalOpen] = useState(false);

  const report = (() => {
    try {
      const stored = localStorage.getItem("proofbuddyReport");
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  })();

  const educatorReviewId = localStorage.getItem("proofbuddyReviewId");

  // Map attentionLevel to display values
  const attentionMap = {
    routine: { label: "Routine", color: "bg-pb-success-light text-pb-success", border: "border-pb-success/20" },
    some_signals: { label: "Some Signals", color: "bg-pb-warning-light text-pb-warning", border: "border-pb-warning/20" },
    several_signals: { label: "Several Signals", color: "bg-pb-error-light text-pb-error", border: "border-pb-error/20" },
  };
  const attention = attentionMap[report?.attentionLevel] || attentionMap.routine;

  const metrics = report?.metrics?.current?.metrics;
  const signals = report?.metrics?.current?.signals;
  const citations = report?.citations;
  const possibleSignals = report?.possibleSignals || [];

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
          <EduNavItem icon="fact_check" label="Reports" active />
          <EduNavItem icon="timeline" label="Process Logs" onClick={() => navigate("/educator/process-log")} />
        </nav>
        <div className="border-t border-white/10 pt-4">
          <EduNavItem icon="settings" label="Settings" onClick={() => navigate("/settings")} />
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-pb-bg border-b border-pb-border px-8 py-5 flex items-center justify-between">
          <div>
            <button onClick={() => navigate("/educator")} className="flex items-center gap-2 text-sm text-pb-muted hover:text-pb-text mb-2 transition-colors">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Dashboard
            </button>
            <h1 className="font-fraunces text-2xl font-semibold text-pb-text">Review Report</h1>
            {report && (
              <p className="text-xs text-pb-muted mt-0.5">
                {new Date(report.analyzedAt).toLocaleString()} · Policy: {report.aiPolicy}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {educatorReviewId && (
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-2 border border-pb-border text-sm font-medium text-pb-muted px-4 py-2 rounded-btn hover:text-pb-text hover:border-pb-text/20 transition-all"
              >
                <span className="material-symbols-outlined text-base">timeline</span>
                Request Process Log
              </button>
            )}
            <button
              onClick={() => navigate("/educator/intake")}
              className="flex items-center gap-2 bg-pb-edu text-white text-sm font-semibold px-4 py-2 rounded-btn hover:bg-pb-edu/90 transition-all"
            >
              New Analysis
            </button>
          </div>
        </header>

        {/* Educator safety banner */}
        <div className="bg-pb-warning-light border-b border-pb-warning/20 px-8 py-3 flex items-center gap-3 text-sm text-pb-warning">
          <span className="material-symbols-outlined text-base shrink-0">gavel</span>
          <span>
            <strong>Educator guidance:</strong> These findings are probabilistic indicators, not proof.
            Discuss with the student before any formal action. All findings support due process — not replace it.
          </span>
        </div>

        {!report ? (
          <div className="flex-1 flex items-center justify-center text-pb-muted flex-col gap-4">
            <span className="material-symbols-outlined text-5xl">description</span>
            <p className="text-sm">No report loaded. Run an analysis from the intake form.</p>
            <button
              onClick={() => navigate("/educator/intake")}
              className="bg-pb-edu text-white text-sm font-semibold px-5 py-2.5 rounded-btn hover:bg-pb-edu/90"
            >
              Go to Intake →
            </button>
          </div>
        ) : (
          <main className="flex-1 p-8">
            {/* Attention level + summary */}
            <div className={`bg-pb-surface border rounded-card p-6 mb-8 ${attention.border}`}>
              <div className="flex items-start gap-4">
                <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-chip shrink-0 ${attention.color}`}>
                  {attention.label}
                </span>
                <div className="flex-1">
                  <p className="text-sm text-pb-text leading-relaxed">{report.summary}</p>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-pb-info-light border border-pb-info/20 rounded-card px-5 py-3 mb-8 flex gap-3 text-xs text-pb-info">
              <span className="material-symbols-outlined text-sm shrink-0 mt-0.5">info</span>
              <span>{report.disclaimer}</span>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-pb-border mb-6 overflow-x-auto">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-all -mb-px ${
                    tab === t ? "border-pb-edu text-pb-edu" : "border-transparent text-pb-muted hover:text-pb-text"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Overview tab */}
            {tab === "Overview" && (
              <div className="space-y-8">
                {/* Prompt alignment */}
                {report.promptAlignment?.length > 0 && (
                  <Section title="Prompt Alignment">
                    <ul className="space-y-2">
                      {report.promptAlignment.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-pb-text">
                          <span className="material-symbols-outlined text-pb-success text-base mt-0.5 shrink-0">check</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Section>
                )}

                {/* Writing consistency */}
                {report.writingConsistency?.length > 0 && (
                  <Section title="Writing Consistency">
                    <ul className="space-y-2">
                      {report.writingConsistency.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-pb-text">
                          <span className="material-symbols-outlined text-pb-info text-base mt-0.5 shrink-0">info</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Section>
                )}

                {/* Recommended next steps */}
                {report.recommendedNextSteps?.length > 0 && (
                  <Section title="Recommended Next Steps">
                    <ol className="space-y-2">
                      {report.recommendedNextSteps.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-pb-text">
                          <span className="w-5 h-5 rounded-full bg-pb-edu-light text-pb-edu text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ol>
                  </Section>
                )}
              </div>
            )}

            {/* AI Signals tab */}
            {tab === "AI Signals" && (
              <div className="space-y-4">
                {possibleSignals.length === 0 ? (
                  <p className="text-sm text-pb-muted">No notable AI-use signals detected.</p>
                ) : (
                  possibleSignals.map((signal, i) => (
                    <SignalCard key={i} signal={signal} />
                  ))
                )}
              </div>
            )}

            {/* Citations tab */}
            {tab === "Citations" && (
              <div className="space-y-4">
                {citations ? (
                  <>
                    <div className="grid grid-cols-4 gap-4 mb-6">
                      <MetricCard label="DOIs Found" value={citations.doiCount ?? 0} />
                      <MetricCard label="ISBNs Found" value={citations.isbnCount ?? 0} />
                      <MetricCard label="Verified" value={citations.verifiedCount ?? 0} color="text-pb-success" />
                      <MetricCard label="Unverified" value={citations.unverifiedCount ?? 0} color={citations.unverifiedCount > 0 ? "text-pb-error" : "text-pb-success"} />
                    </div>
                    {citations.findings?.length > 0 ? (
                      <div className="space-y-2">
                        {citations.findings.map((f, i) => (
                          <div key={i} className={`flex items-center justify-between border rounded-card px-4 py-3 text-sm ${f.verified ? "bg-pb-surface border-pb-border" : "bg-pb-error-light border-pb-error/20"}`}>
                            <span className="font-mono text-xs text-pb-muted">{f.type?.toUpperCase()}: {f.normalized}</span>
                            <span className={`text-xs font-bold ${f.verified ? "text-pb-success" : "text-pb-error"}`}>
                              {f.verified ? "Verified" : f.error === "not_found" ? "Not found" : "Error"}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-pb-muted">No DOIs or ISBNs detected in the submission.</p>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-pb-muted">No citation data available.</p>
                )}
              </div>
            )}

            {/* Writing Metrics tab */}
            {tab === "Writing Metrics" && (
              <div className="space-y-6">
                {metrics ? (
                  <>
                    <Section title="Basic Metrics">
                      <div className="grid grid-cols-3 gap-4">
                        <MetricCard label="Word Count" value={metrics.wordCount} />
                        <MetricCard label="Sentences" value={metrics.sentenceCount} />
                        <MetricCard label="Paragraphs" value={metrics.paragraphCount} />
                        <MetricCard label="Avg Sentence Length" value={`${metrics.averageSentenceLength} words`} />
                        <MetricCard label="Lexical Diversity" value={metrics.lexicalDiversity} />
                        <MetricCard label="Avg Word Length" value={`${metrics.averageWordLength} chars`} />
                      </div>
                    </Section>
                    {signals && (
                      <Section title="Style Signals">
                        <div className="grid grid-cols-3 gap-4">
                          <MetricCard label="AI-Tell Word Density" value={`${signals.aiTellWordDensity}/100w`} color={signals.aiTellWordDensity > 3 ? "text-pb-warning" : "text-pb-success"} />
                          <MetricCard label="Passive Voice" value={`${signals.passiveVoiceDensity}/100w`} />
                          <MetricCard label="Hedge Words" value={`${signals.hedgeWordDensity}/100w`} />
                          <MetricCard label="Generic Transitions" value={`${signals.genericTransitionDensity}/100w`} />
                          <MetricCard label="Sentence Variance" value={signals.sentenceLengthVariance} />
                          <MetricCard label="Repetitive Openers" value={`${signals.repetitiveSentenceOpeners}%`} color={signals.repetitiveSentenceOpeners > 20 ? "text-pb-warning" : undefined} />
                        </div>
                      </Section>
                    )}
                    {report.metrics?.comparison && (
                      <Section title="Comparison to Previous Sample">
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(report.metrics.comparison).map(([key, val]) => (
                            <MetricCard
                              key={key}
                              label={key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}
                              value={typeof val === 'number' ? (val > 0 ? `+${val}` : String(val)) : String(val)}
                              color={Math.abs(Number(val)) > 5 ? "text-pb-warning" : undefined}
                            />
                          ))}
                        </div>
                      </Section>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-pb-muted">No metric data available.</p>
                )}
              </div>
            )}

            {/* Follow-Up tab */}
            {tab === "Follow-Up" && (
              <div className="space-y-3">
                {report.followUpQuestions?.length > 0 ? (
                  <>
                    <p className="text-sm text-pb-muted mb-4">
                      These questions reference specific content in the submission. Use them in a one-on-one conversation.
                    </p>
                    {report.followUpQuestions.map((q, i) => (
                      <div key={i} className="bg-pb-surface border border-pb-border rounded-card px-5 py-4 flex items-start gap-3">
                        <span className="font-fraunces text-pb-edu font-bold text-lg mt-0.5 shrink-0">Q{i + 1}</span>
                        <p className="text-sm text-pb-text leading-relaxed">{q}</p>
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="text-sm text-pb-muted">No follow-up questions generated.</p>
                )}
              </div>
            )}
          </main>
        )}
      </div>

      <RequestProcessLogModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        educatorReviewId={educatorReviewId}
      />
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h3 className="font-fraunces text-base font-semibold text-pb-text mb-3">{title}</h3>
      {children}
    </div>
  );
}

function MetricCard({ label, value, color }) {
  return (
    <div className="bg-pb-surface border border-pb-border rounded-card p-4">
      <p className="text-xs text-pb-muted uppercase tracking-wider mb-1">{label}</p>
      <p className={`font-mono text-xl font-bold ${color || "text-pb-text"}`}>{value}</p>
    </div>
  );
}

function SignalCard({ signal }) {
  return (
    <div className="relative bg-pb-surface border border-pb-border rounded-card p-5 pl-6 overflow-hidden">
      <div className="issue-bar-warning" />
      <p className="text-sm font-semibold text-pb-text mb-2">{signal.observation}</p>
      {signal.alternativeExplanations?.length > 0 && (
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-pb-muted mb-2">
            Alternative Explanations
          </p>
          <ul className="space-y-1">
            {signal.alternativeExplanations.map((exp, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-pb-muted">
                <span className="material-symbols-outlined text-pb-info text-xs mt-0.5 shrink-0">lightbulb</span>
                {exp}
              </li>
            ))}
          </ul>
        </div>
      )}
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
