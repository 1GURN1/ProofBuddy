import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AI_POLICIES = [
  { id: "none", label: "AI not allowed", description: "No AI tools permitted for any part of the assignment." },
  { id: "brainstorm", label: "AI for brainstorming only", description: "AI may be used to generate ideas but not draft text." },
  { id: "editing", label: "AI for editing only", description: "AI may be used to refine existing student writing." },
  { id: "disclosed", label: "AI allowed with disclosure", description: "AI use is permitted if disclosed in the submission." },
  { id: "full", label: "AI fully allowed if cited", description: "AI may be used freely; all AI-generated content must be cited." },
];

export default function EducatorCourseSetup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    courseName: "",
    section: "",
    term: "Fall 2024",
    assignments: [""],
    aiPolicy: "none",
    rubric: "",
    notes: "",
  });
  const [saved, setSaved] = useState(false);

  function update(field, value) {
    setForm((p) => ({ ...p, [field]: value }));
  }

  function updateAssignment(i, value) {
    setForm((p) => {
      const a = [...p.assignments];
      a[i] = value;
      return { ...p, assignments: a };
    });
  }

  function addAssignment() {
    setForm((p) => ({ ...p, assignments: [...p.assignments, ""] }));
  }

  function removeAssignment(i) {
    setForm((p) => ({ ...p, assignments: p.assignments.filter((_, j) => j !== i) }));
  }

  function handleSave(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => navigate("/educator"), 1200);
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
          <EduNavItem icon="school" label="Course Setup" active />
          <EduNavItem icon="upload_file" label="New Submission" onClick={() => navigate("/educator/intake")} />
          <EduNavItem icon="fact_check" label="Reports" onClick={() => navigate("/educator/report")} />
          <EduNavItem icon="timeline" label="Process Logs" onClick={() => navigate("/educator/process-log")} />
        </nav>
        <div className="border-t border-white/10 pt-4">
          <EduNavItem icon="settings" label="Settings" onClick={() => navigate("/settings")} />
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-40 bg-pb-bg border-b border-pb-border px-8 py-5">
          <button
            onClick={() => navigate("/educator")}
            className="flex items-center gap-2 text-sm text-pb-muted hover:text-pb-text transition-colors mb-3"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Dashboard
          </button>
          <h1 className="font-fraunces text-2xl font-semibold text-pb-text">Course Setup</h1>
          <p className="text-sm text-pb-muted mt-1">Configure courses, assignments, and AI policies.</p>
        </header>

        <main className="flex-1 p-8 max-w-2xl">
          <form onSubmit={handleSave} className="space-y-8">
            {/* Course details */}
            <section className="bg-pb-surface border border-pb-border rounded-card p-6 space-y-5">
              <h2 className="font-fraunces text-base font-semibold text-pb-text">Course Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Course Name" required>
                  <input
                    type="text"
                    required
                    value={form.courseName}
                    onChange={(e) => update("courseName", e.target.value)}
                    placeholder="e.g. ENG 402"
                    className={inputClass}
                  />
                </Field>
                <Field label="Section">
                  <input
                    type="text"
                    value={form.section}
                    onChange={(e) => update("section", e.target.value)}
                    placeholder="e.g. 001"
                    className={inputClass}
                  />
                </Field>
              </div>
              <Field label="Term">
                <select
                  value={form.term}
                  onChange={(e) => update("term", e.target.value)}
                  className={inputClass}
                >
                  <option>Fall 2024</option>
                  <option>Winter 2024</option>
                  <option>Spring 2025</option>
                  <option>Summer 2025</option>
                </select>
              </Field>
            </section>

            {/* Assignments */}
            <section className="bg-pb-surface border border-pb-border rounded-card p-6 space-y-4">
              <h2 className="font-fraunces text-base font-semibold text-pb-text">Assignments</h2>
              {form.assignments.map((a, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={a}
                    onChange={(e) => updateAssignment(i, e.target.value)}
                    placeholder={`Assignment ${i + 1} name`}
                    className={`flex-1 ${inputClass}`}
                  />
                  {form.assignments.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAssignment(i)}
                      className="text-pb-muted hover:text-pb-error transition-colors"
                    >
                      <span className="material-symbols-outlined text-base">remove_circle</span>
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addAssignment}
                className="flex items-center gap-2 text-sm font-semibold text-pb-edu hover:underline underline-offset-4"
              >
                <span className="material-symbols-outlined text-base">add</span>
                Add Assignment
              </button>
            </section>

            {/* AI Policy */}
            <section className="bg-pb-surface border border-pb-border rounded-card p-6 space-y-4">
              <h2 className="font-fraunces text-base font-semibold text-pb-text">AI Use Policy</h2>
              <p className="text-sm text-pb-muted">
                This policy applies to all assignments in this course unless overridden individually.
              </p>
              <div className="space-y-2">
                {AI_POLICIES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => update("aiPolicy", p.id)}
                    className={`w-full text-left p-4 rounded-card border-2 transition-all ${
                      form.aiPolicy === p.id
                        ? "border-pb-edu bg-pb-edu-light"
                        : "border-pb-border hover:border-pb-edu/40 bg-pb-bg"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-3 h-3 rounded-full border-2 shrink-0 flex items-center justify-center ${form.aiPolicy === p.id ? "border-pb-edu bg-pb-edu" : "border-pb-border"}`}>
                        {form.aiPolicy === p.id && <div className="w-1 h-1 rounded-full bg-white" />}
                      </div>
                      <span className="text-sm font-semibold text-pb-text">{p.label}</span>
                    </div>
                    <p className="text-xs text-pb-muted ml-5">{p.description}</p>
                  </button>
                ))}
              </div>
            </section>

            {/* Rubric */}
            <section className="bg-pb-surface border border-pb-border rounded-card p-6 space-y-4">
              <h2 className="font-fraunces text-base font-semibold text-pb-text">Grading Notes</h2>
              <Field label="Default Rubric / Notes (Optional)">
                <textarea
                  value={form.rubric}
                  onChange={(e) => update("rubric", e.target.value)}
                  rows={4}
                  placeholder="Paste rubric, grading criteria, or course-specific notes…"
                  className={`w-full resize-y ${inputClass}`}
                />
              </Field>
            </section>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={saved}
                className="bg-pb-edu text-white text-sm font-semibold px-8 py-3 rounded-btn hover:bg-pb-edu/90 transition-all disabled:opacity-60 flex items-center gap-2"
              >
                {saved ? (
                  <>
                    <span className="material-symbols-outlined text-base">check</span>
                    Saved
                  </>
                ) : (
                  "Save Course"
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate("/educator")}
                className="text-sm font-medium text-pb-muted hover:text-pb-text transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

const inputClass =
  "w-full border border-pb-border rounded-btn px-3 py-2.5 text-sm bg-pb-bg text-pb-text placeholder-pb-muted focus:outline-none focus:ring-2 focus:ring-pb-edu/30 focus:border-pb-edu transition-all";

function Field({ label, required, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold uppercase tracking-widest text-pb-muted">
        {label}
        {required && <span className="text-pb-error ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

function EduNavItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-2 py-2 rounded text-sm font-medium transition-all ${
        active
          ? "bg-white/15 text-white"
          : "text-white/60 hover:text-white hover:bg-white/10"
      }`}
    >
      <span className="material-symbols-outlined text-base">{icon}</span>
      {label}
    </button>
  );
}
