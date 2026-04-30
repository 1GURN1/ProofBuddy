import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:3001";

const ESSAY_TYPES = [
  { id: "argumentative", label: "Argumentative Essay", icon: "gavel" },
  { id: "research", label: "Research Paper", icon: "science" },
  { id: "reflective", label: "Reflective Writing", icon: "self_improvement" },
  { id: "lab", label: "Lab Report", icon: "biotech" },
  { id: "literary", label: "Literary Analysis", icon: "menu_book" },
  { id: "other", label: "Other", icon: "more_horiz" },
];

const AI_POLICIES = [
  { id: "none", label: "AI not allowed" },
  { id: "brainstorm", label: "AI allowed for brainstorming only" },
  { id: "editing", label: "AI allowed for editing only" },
  { id: "disclosed", label: "AI allowed with disclosure" },
  { id: "full", label: "AI fully allowed if cited" },
];

const STEPS = ["Essay Type", "Course & Assignment", "AI Policy", "Ready"];

export default function StudentNewDocumentSetup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    essayType: "",
    course: "ENG 402: Modernist Poetry",
    title: "",
    aiPolicy: "none",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((p) => ({ ...p, [field]: value }));
  }

  function canAdvance() {
    if (step === 0) return !!form.essayType;
    if (step === 1) return !!form.title;
    return true;
  }

  async function handleStart() {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("proofbuddyToken");
      const res = await fetch(`${API}/api/student/documents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          title: form.title.trim(),
          content: "",
          is_esl: false,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create document.");

      localStorage.setItem("proofbuddyDocId", data.document.id);
      localStorage.setItem("proofbuddyDocMeta", JSON.stringify(form));
      navigate("/student/editor");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-pb-text/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-pb-surface rounded-modal shadow-modal w-full max-w-xl overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-pb-border">
          <div className="flex items-center justify-between mb-6">
            <span className="font-fraunces text-xl font-semibold text-pb-text">New Document</span>
            <button
              onClick={() => navigate("/student")}
              className="text-pb-muted hover:text-pb-text transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          {/* Step dots */}
          <div className="flex items-center gap-2">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i <= step
                      ? "bg-pb-student text-white"
                      : "bg-pb-border text-pb-muted"
                  }`}
                >
                  {i < step ? (
                    <span className="material-symbols-outlined text-xs">check</span>
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className={`text-xs font-medium hidden sm:block ${
                    i === step ? "text-pb-student" : "text-pb-muted"
                  }`}
                >
                  {s}
                </span>
                {i < STEPS.length - 1 && (
                  <div className={`h-px w-6 ${i < step ? "bg-pb-student" : "bg-pb-border"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-6 min-h-[280px]">
          {step === 0 && (
            <div>
              <h2 className="font-fraunces text-lg font-semibold text-pb-text mb-1">
                What type of essay is this?
              </h2>
              <p className="text-sm text-pb-muted mb-5">
                This helps ProofBuddy tailor its analysis criteria.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {ESSAY_TYPES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => update("essayType", t.id)}
                    className={`flex items-center gap-3 p-3 rounded-card border-2 text-left text-sm font-medium transition-all ${
                      form.essayType === t.id
                        ? "border-pb-student bg-pb-student-light text-pb-student"
                        : "border-pb-border bg-pb-bg text-pb-text hover:border-pb-student/40"
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">{t.icon}</span>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h2 className="font-fraunces text-lg font-semibold text-pb-text mb-1">
                  Course & Assignment
                </h2>
                <p className="text-sm text-pb-muted mb-5">
                  Which course is this for?
                </p>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-pb-muted">
                  Course
                </label>
                <select
                  value={form.course}
                  onChange={(e) => update("course", e.target.value)}
                  className="w-full border border-pb-border rounded-btn px-3 py-2.5 text-sm bg-pb-surface focus:outline-none focus:ring-2 focus:ring-pb-student/30"
                >
                  <option>ENG 402: Modernist Poetry</option>
                  <option>HIS 210: Post-War Europe</option>
                  <option>PHI 101: Introduction to Logic</option>
                  <option>CP 468: Artificial Intelligence</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-pb-muted">
                  Document Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                  placeholder="e.g. Final Research Thesis"
                  className="w-full border border-pb-border rounded-btn px-3 py-2.5 text-sm bg-pb-surface text-pb-text placeholder-pb-muted focus:outline-none focus:ring-2 focus:ring-pb-student/30"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-fraunces text-lg font-semibold text-pb-text mb-1">
                AI Use Policy
              </h2>
              <p className="text-sm text-pb-muted mb-5">
                What is your course's policy on AI assistance?
              </p>
              <div className="space-y-2">
                {AI_POLICIES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => update("aiPolicy", p.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-card border-2 text-left text-sm font-medium transition-all ${
                      form.aiPolicy === p.id
                        ? "border-pb-student bg-pb-student-light text-pb-student"
                        : "border-pb-border bg-pb-bg text-pb-text hover:border-pb-student/40"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        form.aiPolicy === p.id
                          ? "border-pb-student bg-pb-student"
                          : "border-pb-border"
                      }`}
                    >
                      {form.aiPolicy === p.id && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </div>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center justify-center text-center py-8">
              <div className="w-14 h-14 rounded-full bg-pb-student-light flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-pb-student text-3xl">check_circle</span>
              </div>
              <h2 className="font-fraunces text-xl font-semibold text-pb-text mb-2">
                Ready to write
              </h2>
              <p className="text-sm text-pb-muted max-w-xs">
                ProofBuddy will monitor your writing process and give you a real-time integrity score.
              </p>
              {error && (
                <p className="mt-4 text-sm text-pb-error bg-pb-error-light border border-pb-error/20 rounded-btn px-3 py-2">
                  {error}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-pb-border flex items-center justify-between">
          <button
            type="button"
            onClick={() => step === 0 ? navigate("/student") : setStep((s) => s - 1)}
            className="text-sm font-medium text-pb-muted hover:text-pb-text transition-colors"
          >
            {step === 0 ? "Cancel" : "← Back"}
          </button>
          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              disabled={!canAdvance()}
              className="bg-pb-student text-white text-sm font-semibold px-6 py-2.5 rounded-btn hover:bg-pb-student/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleStart}
              disabled={loading}
              className="bg-pb-student text-white text-sm font-semibold px-6 py-2.5 rounded-btn hover:bg-pb-student/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? "Creating…" : "Start Writing →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
