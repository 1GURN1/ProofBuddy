import { useState } from "react";
import axios from "axios";
import "./index.css";

const BASE_URL = "http://localhost:3001";

function App() {
  const [token, setToken] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  if (!token) {
    return <LoginPage onLogin={(t, email) => { setToken(t); setUserEmail(email); }} />;
  }

  return <AnalyzePage token={token} userEmail={userEmail} onLogout={() => setToken(null)} />;
}

// ---------------------------------------------------------------------------
// Login Page
// ---------------------------------------------------------------------------

function LoginPage({ onLogin }) {
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [institution, setInstitution] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = mode === "signin" ? "/api/auth/signin" : "/api/auth/signup";
      const body = mode === "signin"
        ? { email, password }
        : { email, password, role: "educator", institutionName: institution };

      const res = await axios.post(`${BASE_URL}${endpoint}`, body);
      onLogin(res.data.session.accessToken, email);
    } catch (err) {
      setError(err.response?.data?.error || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">ProofBuddy</h1>
          <p className="mt-2 text-sm text-slate-500">AI academic integrity assistant for educators</p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm border">
          <div className="mb-6 flex rounded-xl border p-1">
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${mode === "signin" ? "bg-blue-600 text-white" : "text-slate-600 hover:text-slate-900"}`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${mode === "signup" ? "bg-blue-600 text-white" : "text-slate-600 hover:text-slate-900"}`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Institutional Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@university.edu"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {mode === "signup" && (
              <div>
                <label className="mb-1 block text-sm font-medium">Institution Name</label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="University of Waterloo"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            )}

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
              {loading ? "Loading..." : mode === "signin" ? "Sign In" : "Create Educator Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Analyze Page
// ---------------------------------------------------------------------------

function AnalyzePage({ token, userEmail, onLogout }) {
  const [formData, setFormData] = useState({
    assignmentPrompt: "",
    submissionText: "",
    previousSample: "",
    aiPolicy: "AI allowed with disclosure",
    rubric: "",
  });

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleAnalyze(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setReport(null);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/educator/analyze-submission`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReport(response.data.report);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        onLogout();
        return;
      }
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

          <div className="flex items-center gap-4">
            <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              Hackathon MVP
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">{userEmail}</span>
              <button
                onClick={onLogout}
                className="text-sm text-slate-400 hover:text-slate-700 underline"
              >
                Sign out
              </button>
            </div>
          </div>
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
              name="submissionText"
              value={formData.submissionText}
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

// ---------------------------------------------------------------------------
// Shared UI components
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Report Dashboard — updated for new API response shape
// ---------------------------------------------------------------------------

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

        <span className={getAttentionBadgeClass(report.attentionLevel)}>
          {formatAttentionLevel(report.attentionLevel)}
        </span>
      </div>

      {report.disclaimer && (
        <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <strong>Important:</strong> {report.disclaimer}
        </div>
      )}

      {report.metrics && <MetricsCard metrics={report.metrics} />}

      <ReportSection title="Summary" items={[report.summary]} />
      <ReportSection title="Prompt Alignment" items={report.promptAlignment} />
      <ReportSection title="Writing Consistency" items={report.writingConsistency} />

      {report.possibleSignals && report.possibleSignals.length > 0 && (
        <SignalsSection signals={report.possibleSignals} />
      )}

      <ReportSection title="Suggested Follow-Up Questions" items={report.followUpQuestions} />
      <ReportSection title="Recommended Next Steps" items={report.recommendedNextSteps} />
    </div>
  );
}

function SignalsSection({ signals }) {
  return (
    <div className="mb-5 rounded-xl border bg-white p-4">
      <h3 className="mb-3 font-semibold">Possible Signals</h3>
      <div className="space-y-4">
        {signals.map((s, i) => (
          <div key={i} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-sm font-medium text-slate-800">{s.observation}</p>
            {s.alternativeExplanations?.length > 0 && (
              <div className="mt-2">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Alternative Explanations</p>
                <ul className="space-y-1">
                  {s.alternativeExplanations.map((exp, j) => (
                    <li key={j} className="flex gap-2 text-sm text-slate-600">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400"></span>
                      <span>{exp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricsCard({ metrics }) {
  const current = metrics.current?.metrics;
  const previous = metrics.previous?.metrics;
  const comparison = metrics.comparison;

  if (!current) return null;

  return (
    <div className="mb-5 rounded-xl border bg-slate-50 p-4">
      <h3 className="mb-3 font-semibold">Writing Metrics</h3>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <Metric label="Word Count" value={current.wordCount} />
        <Metric label="Avg. Sentence Length" value={`${current.averageSentenceLength} words`} />
        <Metric label="Lexical Diversity" value={current.lexicalDiversity} />
        <Metric label="Avg. Word Length" value={`${current.averageWordLength} chars`} />

        {previous && previous.wordCount > 0 && comparison && (
          <>
            <Metric label="Prev. Word Count" value={previous.wordCount} />
            <Metric label="Prev. Avg. Sentence" value={`${previous.averageSentenceLength} words`} />
            <Metric
              label="Sentence Length Change"
              value={`${comparison.averageSentenceLengthChange > 0 ? "+" : ""}${comparison.averageSentenceLengthChange} words`}
            />
            <Metric
              label="Lexical Diversity Change"
              value={`${comparison.lexicalDiversityChange > 0 ? "+" : ""}${comparison.lexicalDiversityChange}`}
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
  if (!items || items.length === 0) return null;
  return (
    <div className="mb-5 rounded-xl border bg-white p-4">
      <h3 className="mb-3 font-semibold">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex gap-2 text-sm text-slate-700">
            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function formatAttentionLevel(level) {
  if (level === "several_signals") return "Several Signals";
  if (level === "some_signals") return "Some Signals";
  return "Routine";
}

function getAttentionBadgeClass(level) {
  const base = "rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap ";
  if (level === "several_signals") return base + "bg-red-50 text-red-700";
  if (level === "some_signals") return base + "bg-amber-50 text-amber-700";
  return base + "bg-green-50 text-green-700";
}

export default App;
