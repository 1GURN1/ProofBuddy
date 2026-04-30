import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

function loadReport() {
  try {
    const stored = localStorage.getItem("proofbuddyStudentReport");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function getIntegrityScore(report) {
  if (!report?.metrics?.signals) return 0;
  const signals = report.metrics.signals;
  const penalty =
    signals.aiTellWordDensity * 5 +
    signals.genericTransitionDensity * 8 +
    signals.passiveVoiceDensity * 3 +
    Math.max(0, 8 - signals.sentenceLengthVariance) * 4;

  return Math.max(0, Math.min(100, Math.round(100 - penalty)));
}

export default function StudentReportPage() {
  const navigate = useNavigate();
  const report = loadReport();

  const score = useMemo(() => getIntegrityScore(report), [report]);
  const scoreTone =
    score >= 80
      ? { label: "Strong", color: "text-pb-success bg-pb-success-light" }
      : score >= 60
      ? { label: "Needs review", color: "text-pb-warning bg-pb-warning-light" }
      : { label: "High risk", color: "text-pb-error bg-pb-error-light" };

  if (!report) {
    return (
      <div className="bg-pb-bg min-h-screen text-pb-text px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-fraunces text-3xl font-semibold mb-3">No report yet</h1>
          <p className="text-pb-muted mb-6">
            Open a document and start writing to generate a student analysis report.
          </p>
          <button
            onClick={() => navigate("/student")}
            className="bg-pb-student text-white px-5 py-2.5 rounded-btn hover:bg-pb-student/90 transition-all"
          >
            Back to documents
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-pb-bg min-h-screen text-pb-text">
      <header className="sticky top-0 z-40 bg-pb-surface border-b border-pb-border px-6 py-4 flex items-center justify-between">
        <div>
          <button onClick={() => navigate("/student/editor")} className="text-sm text-pb-muted hover:text-pb-text transition-colors mb-2">
            ← Back to editor
          </button>
          <h1 className="font-fraunces text-2xl font-semibold">Student Report</h1>
          <p className="text-xs text-pb-muted mt-1">
            Generated {new Date(report.analyzedAt).toLocaleString()}
          </p>
        </div>
        <div className={`rounded-chip px-3 py-1 text-xs font-bold uppercase tracking-wider ${scoreTone.color}`}>
          {scoreTone.label}
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="bg-pb-surface border border-pb-border rounded-card p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-pb-muted mb-3">Integrity Score</p>
            <div className="flex items-center gap-5">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{
                  background: `conic-gradient(${score >= 80 ? "#5A8A6E" : score >= 60 ? "#C28A2C" : "#B54848"} ${score * 3.6}deg, #E8E4DC 0deg)`,
                }}
              >
                <div className="w-16 h-16 rounded-full bg-pb-surface flex items-center justify-center">
                  <span className="font-mono text-xl font-bold">{score}</span>
                </div>
              </div>
              <p className="text-sm text-pb-muted leading-relaxed">
                {report.holistic.aiRiskNarrative}
              </p>
            </div>
          </section>

          <section className="bg-pb-surface border border-pb-border rounded-card p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-pb-muted mb-3">Writing Metrics</p>
            <div className="grid grid-cols-2 gap-4">
              <Metric label="Words" value={report.metrics.metrics.wordCount} />
              <Metric label="Sentence Avg" value={report.metrics.metrics.averageSentenceLength} />
              <Metric label="Lexical Diversity" value={report.metrics.metrics.lexicalDiversity} />
              <Metric label="AI-Tell Density" value={report.metrics.signals.aiTellWordDensity} />
            </div>
          </section>
        </div>

        <section className="mt-6 bg-pb-surface border border-pb-border rounded-card p-6">
          <h2 className="font-fraunces text-xl font-semibold mb-4">Top Issues</h2>
          <div className="space-y-3">
            {report.mechanical.issues.length === 0 ? (
              <p className="text-sm text-pb-muted">No significant issues detected.</p>
            ) : (
              report.mechanical.issues.map((issue, index) => (
                <div key={`${issue.excerpt}-${index}`} className="rounded-card border border-pb-border bg-pb-bg p-4">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-sm font-semibold capitalize">{issue.category}</span>
                    <span className={`rounded-chip px-2 py-0.5 text-xs font-bold uppercase tracking-wider ${
                      issue.severity === "high"
                        ? "bg-pb-error-light text-pb-error"
                        : issue.severity === "medium"
                        ? "bg-pb-warning-light text-pb-warning"
                        : "bg-pb-info-light text-pb-info"
                    }`}>
                      {issue.severity}
                    </span>
                  </div>
                  <p className="text-sm italic text-pb-text mb-2">"{issue.excerpt}"</p>
                  <p className="text-sm text-pb-muted mb-1">{issue.explanation}</p>
                  <p className="text-sm font-medium text-pb-student">Suggestion: {issue.suggestion}</p>
                </div>
              ))
            )}
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-2 mt-6">
          <section className="bg-pb-surface border border-pb-border rounded-card p-6">
            <h2 className="font-fraunces text-xl font-semibold mb-4">AI Signal Notes</h2>
            <div className="space-y-3">
              {report.holistic.aiRiskSignals.map((signal, index) => (
                <div key={`${signal.signal}-${index}`} className="rounded-card border border-pb-border bg-pb-bg p-4">
                  <p className="text-sm font-semibold mb-1">{signal.signal}</p>
                  <p className="text-sm text-pb-muted mb-2">{signal.observation}</p>
                  <p className="text-sm text-pb-student">{signal.advice}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-pb-surface border border-pb-border rounded-card p-6">
            <h2 className="font-fraunces text-xl font-semibold mb-4">Structure Review</h2>
            <p className="text-sm text-pb-muted mb-4">{report.holistic.structureSummary}</p>
            <div className="space-y-3">
              <InfoRow label="Thesis Statement" value={report.holistic.thesisStatement} />
              <InfoRow label="Thesis Alignment" value={`${report.holistic.thesisAlignment}: ${report.holistic.thesisAlignmentNote}`} />
              <InfoRow label="Citation Check" value={`${report.citations.verifiedCount} verified, ${report.citations.unverifiedCount} unverified`} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-card border border-pb-border bg-pb-bg p-4">
      <p className="text-xs uppercase tracking-widest text-pb-muted mb-2">{label}</p>
      <p className="font-mono text-2xl font-bold">{value}</p>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="rounded-card border border-pb-border bg-pb-bg p-4">
      <p className="text-xs uppercase tracking-widest text-pb-muted mb-1">{label}</p>
      <p className="text-sm text-pb-text leading-relaxed">{value}</p>
    </div>
  );
}
