import { useState } from "react";
import axios from "axios";
import "./index.css";

const API_URL = "http://localhost:5000/api/analyze";

function App() {
  const [formData, setFormData] = useState({
    assignmentPrompt: "",
    studentSubmission: "",
    previousSample: "",
    aiPolicy: "AI allowed with disclosure",
    rubric: "",
  });

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleAnalyze(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setReport(null);

    try {
      const response = await axios.post(API_URL, formData);
      setReport(response.data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
          "Unable to analyze the submission. Please check that the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">ProofBuddy</h1>
            <p className="text-sm text-slate-500">
              AI Hybrid written work reviewer for educators
            </p>
          </div>

          <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            Hackathon MVP
          </span>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-8 lg:grid-cols-2">
        <section className="rounded-2xl bg-white p-6 shadow-sm border">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Review a Submission</h2>
            <p className="mt-1 text-sm text-slate-500">
              Paste an assignment, student response, and optional previous sample.
              ProofBuddy combines writing metrics with an educator-safe AI review.
            </p>
          </div>

          <form onSubmit={handleAnalyze} className="space-y-5">
            <TextArea
              label="Assignment Prompt"
              name="assignmentPrompt"
              value={formData.assignmentPrompt}
              onChange={handleChange}
              placeholder="Paste the assignment instructions here..."
              required
            />

            <TextArea
              label="Student Submission"
              name="studentSubmission"
              value={formData.studentSubmission}
              onChange={handleChange}
              placeholder="Paste the student's written work here..."
              required
            />

            <TextArea
              label="Previous Writing Sample"
              name="previousSample"
              value={formData.previousSample}
              onChange={handleChange}
              placeholder="Optional: paste a previous writing sample for comparison..."
            />

            <div>
              <label className="mb-2 block text-sm font-medium">
                Course AI Policy
              </label>
              <select
                name="aiPolicy"
                value={formData.aiPolicy}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option>AI not allowed</option>
                <option>AI allowed for brainstorming only</option>
                <option>AI allowed for editing only</option>
                <option>AI allowed with disclosure</option>
                <option>AI fully allowed if cited</option>
              </select>
            </div>

            <TextArea
              label="Rubric or Grading Criteria"
              name="rubric"
              value={formData.rubric}
              onChange={handleChange}
              placeholder="Optional: paste rubric criteria..."
            />

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              {loading ? "Analyzing..." : "Generate Hybrid Review"}
            </button>
          </form>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm border">
          {!report && !loading && <EmptyReport />}

          {loading && (
            <div className="flex h-full min-h-[500px] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
                <p className="font-medium">Analyzing submission...</p>
                <p className="mt-1 text-sm text-slate-500">
                  Calculating writing metrics and generating review guidance.
                </p>
              </div>
            </div>
          )}

          {report && <ReportDashboard report={report} />}
        </section>
      </main>
    </div>
  );
}

function TextArea({ label, name, value, onChange, placeholder, required }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={5}
        required={required}
        className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}

function EmptyReport() {
  return (
    <div className="flex h-full min-h-[500px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
      <div>
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">
          📄
        </div>
        <h3 className="text-lg font-semibold">No report yet</h3>
        <p className="mt-2 max-w-sm text-sm text-slate-500">
          Submit a student essay to generate a metrics-backed educator review.
        </p>
      </div>
    </div>
  );
}

function ReportDashboard({ report }) {
  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Hybrid Review Report</h2>
          <p className="mt-1 text-sm text-slate-500">
            Metrics + LLM review. Not proof of misconduct.
          </p>
        </div>

        <span className={getReviewBadgeClass(report.reviewLevel)}>
          {report.reviewLevel} Review
        </span>
      </div>

      <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <strong>Important:</strong> ProofBuddy does not determine whether a student cheated.
        It highlights review signals and fair follow-up steps.
      </div>

      {report.metrics && <MetricsCard metrics={report.metrics} />}

      <ReportSection title="Summary" items={[report.summary]} />
      <ReportSection title="Prompt Alignment" items={report.promptAlignment} />
      <ReportSection title="Writing Consistency" items={report.writingConsistency} />
      <ReportSection title="Citation Audit" items={report.citationAudit} />
      <ReportSection
        title="Possible AI-Assistance Signals"
        items={report.possibleAiAssistanceSignals}
      />
      <ReportSection
        title="Alternative Explanations"
        items={report.alternativeExplanations}
      />
      <ReportSection
        title="Suggested Follow-Up Questions"
        items={report.followUpQuestions}
      />
      <ReportSection
        title="Recommended Next Steps"
        items={report.recommendedNextSteps}
      />
    </div>
  );
}

function MetricsCard({ metrics }) {
  const current = metrics.current;
  const previous = metrics.previous;
  const comparison = metrics.comparison;

  return (
    <div className="mb-5 rounded-xl border bg-slate-50 p-4">
      <h3 className="mb-3 font-semibold">Writing Metrics</h3>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <Metric label="Current Word Count" value={current.wordCount} />
        <Metric label="Current Avg. Sentence" value={`${current.averageSentenceLength} words`} />
        <Metric label="Current Lexical Diversity" value={current.lexicalDiversity} />
        <Metric label="Current Avg. Word Length" value={`${current.averageWordLength} chars`} />

        {previous.wordCount > 0 && (
          <>
            <Metric label="Previous Word Count" value={previous.wordCount} />
            <Metric label="Previous Avg. Sentence" value={`${previous.averageSentenceLength} words`} />
            <Metric
              label="Sentence Length Change"
              value={`${comparison.averageSentenceLengthChange} words`}
            />
            <Metric
              label="Lexical Diversity Change"
              value={comparison.lexicalDiversityChange}
            />
          </>
        )}
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-lg border bg-white p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}

function ReportSection({ title, items }) {
  return (
    <div className="mb-5 rounded-xl border bg-white p-4">
      <h3 className="mb-3 font-semibold">{title}</h3>
      <ul className="space-y-2">
        {items?.map((item, index) => (
          <li key={index} className="flex gap-2 text-sm text-slate-700">
            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function getReviewBadgeClass(level) {
  const base = "rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap ";

  if (level === "High") {
    return base + "bg-red-50 text-red-700";
  }

  if (level === "Medium") {
    return base + "bg-amber-50 text-amber-700";
  }

  return base + "bg-green-50 text-green-700";
}

export default App;