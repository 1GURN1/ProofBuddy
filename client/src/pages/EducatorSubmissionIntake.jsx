import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:3001";
const STEPS = ["Course Context", "Student Submission", "Writing Samples", "Confirm"];

export default function EducatorSubmissionIntake() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    course: "ENG 402: Modernist Poetry",
    assignment: "Final Research Thesis",
    assignmentPrompt: "",
    rubric: "",
    studentSubmission: "",
    previousSample: "",
    aiPolicy: "AI allowed with disclosure",
    confirmed: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((p) => ({ ...p, [field]: value }));
  }

  function canAdvance() {
    if (step === 0) return !!form.assignmentPrompt;
    if (step === 1) return !!form.studentSubmission;
    if (step === 3) return form.confirmed;
    return true;
  }

  async function handleSubmit() {
    if (!form.confirmed) { setError("Please confirm the policy checkbox."); return; }
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("proofbuddyToken");
      const res = await fetch(`${API}/api/educator/analyze-submission`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          submissionText: form.studentSubmission,
          assignmentPrompt: form.assignmentPrompt,
          previousSample: form.previousSample,
          aiPolicy: form.aiPolicy,
          rubric: form.rubric,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");
      localStorage.setItem("proofbuddyReport", JSON.stringify(data.report));
      if (data.educatorReviewId) {
        localStorage.setItem("proofbuddyReviewId", data.educatorReviewId);
      }
      navigate("/educator/report");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

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
          <EduNavItem icon="upload_file" label="New Submission" active />
          <EduNavItem icon="fact_check" label="Reports" onClick={() => navigate("/educator/report")} />
          <EduNavItem icon="timeline" label="Process Logs" onClick={() => navigate("/educator/process-log")} />
        </nav>
        <div className="border-t border-white/10 pt-4">
          <EduNavItem icon="settings" label="Settings" onClick={() => navigate("/settings")} />
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-40 bg-pb-bg border-b border-pb-border px-8 py-5">
          <div className="flex items-center gap-2 text-sm text-pb-muted mb-3">
            <button onClick={() => navigate("/educator")} className="hover:text-pb-text transition-colors">Dashboard</button>
            <span>›</span>
            <span className="text-pb-text font-medium">New Submission</span>
          </div>
          <h1 className="font-fraunces text-2xl font-semibold text-pb-text">Submission Intake</h1>
          <p className="text-sm text-pb-muted mt-1">Submit student writing for integrity analysis.</p>
        </header>

        <main className="flex-1 p-8 max-w-2xl">
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-10">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <button
                  onClick={() => i < step && setStep(i)}
                  className="flex items-center gap-2"
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i < step ? "bg-pb-success text-white" : i === step ? "bg-pb-edu text-white" : "bg-pb-border text-pb-muted"}`}>
                    {i < step ? <span className="material-symbols-outlined text-xs">check</span> : i + 1}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${i === step ? "text-pb-edu font-semibold" : "text-pb-muted"}`}>
                    {s}
                  </span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className={`h-px w-8 mx-1 ${i < step ? "bg-pb-success" : "bg-pb-border"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 0: Course Context */}
          {step === 0 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-fraunces text-xl font-semibold text-pb-text mb-1">Course Context</h2>
                <p className="text-sm text-pb-muted">Select the course and paste the assignment prompt.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Course">
                  <select value={form.course} onChange={(e) => update("course", e.target.value)} className={inputClass}>
                    <option>ENG 402: Modernist Poetry</option>
                    <option>HIS 210: Post-War Europe</option>
                    <option>PHI 101: Introduction to Logic</option>
                    <option>CP 468: Artificial Intelligence</option>
                  </select>
                </Field>
                <Field label="Assignment">
                  <select value={form.assignment} onChange={(e) => update("assignment", e.target.value)} className={inputClass}>
                    <option>Final Research Thesis</option>
                    <option>Midterm Comparative Essay</option>
                    <option>Weekly Reflection #4</option>
                    <option>AI Ethics Response Paper</option>
                  </select>
                </Field>
              </div>
              <Field label="Assignment Prompt" required>
                <textarea value={form.assignmentPrompt} onChange={(e) => update("assignmentPrompt", e.target.value)} rows={5} placeholder="Paste the full assignment instructions…" required className={`w-full resize-y ${inputClass}`} />
              </Field>
              <Field label="Rubric / Grading Criteria (Optional)">
                <textarea value={form.rubric} onChange={(e) => update("rubric", e.target.value)} rows={3} placeholder="Optional rubric or grading criteria…" className={`w-full resize-y ${inputClass}`} />
              </Field>
            </div>
          )}

          {/* Step 1: Student Submission */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-fraunces text-xl font-semibold text-pb-text mb-1">Student Submission</h2>
                <p className="text-sm text-pb-muted">Paste the student's written work for analysis.</p>
              </div>
              <Field label="Student Submission" required>
                <textarea value={form.studentSubmission} onChange={(e) => update("studentSubmission", e.target.value)} rows={14} placeholder="Paste the student's essay, response, or written work here…" required className={`w-full resize-y ${inputClass}`} />
              </Field>
            </div>
          )}

          {/* Step 2: Writing Samples */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-fraunces text-xl font-semibold text-pb-text mb-1">Writing Samples</h2>
                <p className="text-sm text-pb-muted">
                  A previous writing sample helps compare stylistic patterns. Optional but recommended when the submission looks different from the student's baseline.
                </p>
              </div>
              <div className="bg-pb-info-light border border-pb-info/20 rounded-card px-4 py-3 flex gap-3 text-sm text-pb-info">
                <span className="material-symbols-outlined shrink-0">info</span>
                Recommended when a student's current submission appears very different from their previous work.
              </div>
              <Field label="Previous Writing Sample (Optional)">
                <textarea value={form.previousSample} onChange={(e) => update("previousSample", e.target.value)} rows={8} placeholder="Paste an older piece of writing from the same student…" className={`w-full resize-y ${inputClass}`} />
              </Field>
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-fraunces text-xl font-semibold text-pb-text mb-1">Confirm & Analyse</h2>
                <p className="text-sm text-pb-muted">Review settings and confirm before running the analysis.</p>
              </div>

              <div className="bg-pb-surface border border-pb-border rounded-card divide-y divide-pb-border">
                <SummaryRow label="Course" value={form.course} />
                <SummaryRow label="Assignment" value={form.assignment} />
                <SummaryRow label="AI Policy" value={form.aiPolicy} />
                <SummaryRow label="Submission" value={`${form.studentSubmission.trim().split(/\s+/).filter(Boolean).length} words`} />
                <SummaryRow label="Writing Sample" value={form.previousSample ? "Included" : "Not included"} />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-pb-muted">AI Policy</label>
                <select value={form.aiPolicy} onChange={(e) => update("aiPolicy", e.target.value)} className={inputClass}>
                  <option>AI not allowed</option>
                  <option>AI allowed for brainstorming only</option>
                  <option>AI allowed for editing only</option>
                  <option>AI allowed with disclosure</option>
                  <option>AI fully allowed if cited</option>
                </select>
              </div>

              <div className="flex items-start gap-3 bg-pb-surface border border-pb-border rounded-card p-4">
                <input
                  type="checkbox"
                  id="confirmed"
                  checked={form.confirmed}
                  onChange={(e) => update("confirmed", e.target.checked)}
                  className="mt-0.5 accent-pb-edu"
                />
                <label htmlFor="confirmed" className="text-sm text-pb-muted leading-relaxed cursor-pointer">
                  I confirm this submission complies with institutional policy and I have the necessary permissions to process it through ProofBuddy.
                </label>
              </div>

              {error && (
                <p className="text-sm text-pb-error bg-pb-error-light border border-pb-error/20 rounded-btn px-3 py-2">
                  {error}
                </p>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-pb-border">
            <button
              type="button"
              onClick={() => step === 0 ? navigate("/educator") : setStep((s) => s - 1)}
              className="text-sm font-medium text-pb-muted hover:text-pb-text transition-colors"
            >
              {step === 0 ? "Cancel" : "← Back"}
            </button>
            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                disabled={!canAdvance()}
                className="bg-pb-edu text-white text-sm font-semibold px-6 py-2.5 rounded-btn hover:bg-pb-edu/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading || !form.confirmed}
                className="bg-pb-edu text-white text-sm font-semibold px-6 py-2.5 rounded-btn hover:bg-pb-edu/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined text-base animate-spin">refresh</span>
                    Analyzing…
                  </>
                ) : (
                  "Generate Report →"
                )}
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

const inputClass =
  "w-full border border-pb-border rounded-btn px-3 py-2.5 text-sm bg-pb-surface text-pb-text placeholder-pb-muted focus:outline-none focus:ring-2 focus:ring-pb-edu/30 focus:border-pb-edu transition-all";

function Field({ label, required, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold uppercase tracking-widest text-pb-muted">
        {label}{required && <span className="text-pb-error ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="px-4 py-3 flex items-center justify-between text-sm">
      <span className="text-pb-muted">{label}</span>
      <span className="font-medium text-pb-text">{value}</span>
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
