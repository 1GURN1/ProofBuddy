import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/analyze";

export default function EducatorSubmissionIntake() {
  const [formData, setFormData] = useState({
    course: "ENG 402: Modernist Poetry",
    assignment: "Final Research Thesis",
    assignmentPrompt: "",
    studentSubmission: "",
    previousSample: "",
    rubric: "",
    aiPolicy: "AI allowed with disclosure",
    confirmed: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.assignmentPrompt || !formData.studentSubmission) {
      setError("Assignment prompt and student submission are required.");
      setLoading(false);
      return;
    }

    if (!formData.confirmed) {
      setError("Please confirm the institutional policy checkbox before generating a report.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(API_URL, {
        assignmentPrompt: formData.assignmentPrompt,
        studentSubmission: formData.studentSubmission,
        previousSample: formData.previousSample,
        aiPolicy: formData.aiPolicy,
        rubric: formData.rubric,
      });

      localStorage.setItem("proofbuddyReport", JSON.stringify(response.data));
      window.location.href = "/educator/review-report";
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
          "Unable to generate review report. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen">
      {/* TopNavBar */}
      <header className="bg-[#FAF9F6] border-b border-[#E8E4DC] sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-10 py-4 max-w-[1440px] mx-auto">
          <a href="/" className="text-2xl font-serif font-bold text-[#1F3A2E]">
            ProofBuddy
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <a
              className="text-stone-500 hover:text-stone-800 transition-colors font-medium"
              href="/educator"
            >
              Dashboard
            </a>
            <a
              className="text-[#1F3A2E] font-semibold border-b-2 border-[#1F3A2E] pb-1"
              href="/educator/submissions/intake"
            >
              Library
            </a>
            <a
              className="text-stone-500 hover:text-stone-800 transition-colors font-medium"
              href="/educator/review-report"
            >
              Reports
            </a>
            <a
              className="text-stone-500 hover:text-stone-800 transition-colors font-medium"
              href="#support"
            >
              Support
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="bg-[#1F3A2E] text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-all">
              Upload
            </button>

            <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden">
              <img
                alt="User Profile"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8AdXtiH6HP_1TRYYf5tGwQML4Iwap2uP7Ho3YxFX1G165AjkBE14QRapQkniZYcCRR6FS8bqw1U6p1BtI0wSjFfyn8ROzGRoSFtUK--ho3zlUnShP7WR1RUvT_uNAPWHJAUvH796aiwvLZ4Dkkc8cHo27XLSFiJOeRNaUWYclL25Rh7VfCj1CsRJ-fPLji1A2t53knv12oSzIru9PGsscsBobLeqBwTkTVzaykKR116d6zBiZ9_V5fWgtLG9NJXwfPo2qWcMTFjs"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[800px] mx-auto py-16 px-gutter">
        {/* Editorial Header */}
        <div className="mb-12 border-b border-outline-variant pb-8">
          <span className="font-label-caps text-label-caps text-secondary mb-2 block">
            INTAKE MODULE
          </span>

          <h1 className="font-h1 text-display-lg text-primary mb-4">
            Integrity Review Intake
          </h1>

          <p className="font-body-lg text-on-surface-variant max-w-[600px]">
            Submit student writing for metrics-backed review, citation auditing,
            prompt alignment, and educator-safe AI assistance analysis.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-8 mb-12 overflow-x-auto pb-4 scrollbar-hide">
          <StepIndicator number="1" label="COURSE" active />
          <StepIndicator number="2" label="SUBMISSION" />
          <StepIndicator number="3" label="SAMPLES" />
          <StepIndicator number="4" label="CONFIRM" />
        </div>

        <form className="space-y-stack_lg" onSubmit={handleSubmit}>
          {/* Step 1: Course Selection */}
          <section className="space-y-stack_md">
            <div className="flex flex-col gap-2">
              <label className="font-h3 text-h3 text-primary">
                Step 1: Assign Context
              </label>
              <p className="text-on-surface-variant font-body-md">
                Select the course and assignment this submission belongs to.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-secondary">
                  COURSE
                </label>

                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full bg-white border-outline-variant rounded-lg p-3 font-body-md focus:border-primary focus:ring-1 focus:ring-primary/10"
                >
                  <option>ENG 402: Modernist Poetry</option>
                  <option>HIS 210: Post-War Europe</option>
                  <option>PHI 101: Introduction to Logic</option>
                  <option>CP 468: Artificial Intelligence</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-secondary">
                  ASSIGNMENT
                </label>

                <select
                  name="assignment"
                  value={formData.assignment}
                  onChange={handleChange}
                  className="w-full bg-white border-outline-variant rounded-lg p-3 font-body-md focus:border-primary focus:ring-1 focus:ring-primary/10"
                >
                  <option>Final Research Thesis</option>
                  <option>Midterm Comparative Essay</option>
                  <option>Weekly Reflection #4</option>
                  <option>AI Ethics Response Paper</option>
                </select>
              </div>
            </div>

            <TextArea
              label="ASSIGNMENT PROMPT"
              name="assignmentPrompt"
              value={formData.assignmentPrompt}
              onChange={handleChange}
              placeholder="Paste the assignment instructions or prompt here..."
              required
            />

            <TextArea
              label="RUBRIC OR GRADING CRITERIA"
              name="rubric"
              value={formData.rubric}
              onChange={handleChange}
              placeholder="Optional: paste rubric requirements, course concepts, or grading criteria..."
            />
          </section>

          {/* Step 2: Primary Submission */}
          <section className="space-y-stack_md pt-8 border-t border-outline-variant">
            <div className="flex flex-col gap-2">
              <label className="font-h3 text-h3 text-primary">
                Step 2: Student Submission
              </label>

              <p className="text-on-surface-variant font-body-md">
                Paste the primary student writing sample for analysis.
              </p>
            </div>

            <TextArea
              label="STUDENT SUBMISSION"
              name="studentSubmission"
              value={formData.studentSubmission}
              onChange={handleChange}
              placeholder="Paste the student's essay, response, report, or written work here..."
              required
              rows={10}
            />

            <div className="relative border-2 border-dashed border-outline-variant rounded-xl bg-white p-8 text-center group hover:border-primary transition-colors cursor-pointer">
              <input
                accept=".docx,.pdf,.txt"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                type="file"
                disabled
              />

              <div className="flex flex-col items-center gap-4 opacity-70">
                <span className="material-symbols-outlined text-4xl text-outline">
                  cloud_upload
                </span>

                <div className="space-y-1">
                  <p className="font-body-lg text-primary font-medium">
                    File upload placeholder
                  </p>
                  <p className="text-on-surface-variant text-sm">
                    For the hackathon MVP, paste text above. File parsing can be
                    added later.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Step 3: Previous Samples */}
          <section className="space-y-stack_md pt-8 border-t border-outline-variant">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <label className="font-h3 text-h3 text-primary">
                  Step 3: Writing Samples
                </label>

                <span className="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                  Optional
                </span>
              </div>

              <p className="text-on-surface-variant font-body-md">
                A previous writing sample helps ProofBuddy compare stylistic
                patterns such as sentence length, lexical diversity, and tone.
              </p>
            </div>

            <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/30 flex items-start gap-4">
              <span className="material-symbols-outlined text-secondary">
                info
              </span>

              <div className="space-y-4 w-full">
                <p className="text-sm font-medium text-on-secondary-fixed-variant italic">
                  “Recommended when a student’s current submission appears very
                  different from their previous writing.”
                </p>

                <TextArea
                  label="PREVIOUS WRITING SAMPLE"
                  name="previousSample"
                  value={formData.previousSample}
                  onChange={handleChange}
                  placeholder="Optional: paste older writing from the same student..."
                  rows={7}
                />
              </div>
            </div>
          </section>

          {/* Step 4: AI Policy */}
          <section className="space-y-stack_md pt-8 border-t border-outline-variant">
            <div className="flex flex-col gap-2">
              <label className="font-h3 text-h3 text-primary">
                Step 4: Institutional Policy
              </label>

              <p className="text-on-surface-variant font-body-md">
                Select the AI use policy that applies to this assignment.
              </p>
            </div>

            <div className="space-y-2">
              <label className="font-label-caps text-label-caps text-secondary">
                COURSE AI POLICY
              </label>

              <select
                name="aiPolicy"
                value={formData.aiPolicy}
                onChange={handleChange}
                className="w-full bg-white border-outline-variant rounded-lg p-3 font-body-md focus:border-primary focus:ring-1 focus:ring-primary/10"
              >
                <option>AI not allowed</option>
                <option>AI allowed for brainstorming only</option>
                <option>AI allowed for editing only</option>
                <option>AI allowed with disclosure</option>
                <option>AI fully allowed if cited</option>
              </select>
            </div>

            <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-outline-variant">
              <div className="pt-1">
                <input
                  name="confirmed"
                  checked={formData.confirmed}
                  onChange={handleChange}
                  className="rounded border-outline-variant text-[#0D1A39] focus:ring-[#0D1A39]"
                  type="checkbox"
                />
              </div>

              <label className="text-sm text-on-surface-variant leading-relaxed">
                I confirm that this submission complies with the department’s AI
                usage policy and that I have the necessary permissions to process
                this document through ProofBuddy’s review engine.
              </label>
            </div>
          </section>

          {error && (
            <div className="rounded-lg border border-error-container bg-error-container/40 px-4 py-3 text-sm text-error">
              {error}
            </div>
          )}

          {/* Primary Action */}
          <div className="pt-12 flex flex-col items-center gap-6">
            <button
              className="bg-[#0D1A39] text-white w-full max-w-[400px] py-4 rounded-lg font-h3 text-h3 hover:bg-[#1A2A49] transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
              type="submit"
              disabled={loading}
            >
              {loading ? "Generating Report..." : "Generate Review Report"}
            </button>

            <div className="flex items-center gap-2 text-on-surface-variant">
              <span
                className="material-symbols-outlined text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                lock
              </span>

              <span className="font-label-caps text-label-caps">
                SECURE ENCRYPTED PROCESSING
              </span>
            </div>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer
        id="support"
        className="bg-[#FAF9F6] border-t border-[#E8E4DC] mt-24"
      >
        <div className="w-full max-w-[800px] mx-auto py-12 flex flex-col items-center gap-4 text-center">
          <div className="flex gap-8 mb-4">
            <FooterLink label="About" />
            <FooterLink label="Privacy" />
            <FooterLink label="Contact" />
            <FooterLink label="Terms" />
          </div>

          <p className="font-sans text-xs uppercase tracking-widest text-stone-400">
            © 2024 ProofBuddy. Built for Scholarly Excellence.
          </p>
        </div>
      </footer>
    </div>
  );
}

function StepIndicator({ number, label, active = false }) {
  return (
    <div
      className={`flex items-center gap-2 border-b-2 pb-2 shrink-0 ${
        active
          ? "border-primary"
          : "border-outline-variant opacity-50"
      }`}
    >
      <span
        className={`font-code text-code w-6 h-6 flex items-center justify-center rounded-full ${
          active
            ? "bg-primary-container text-on-primary-container"
            : "bg-surface-container-highest text-on-surface-variant"
        }`}
      >
        {number}
      </span>

      <span
        className={`font-label-caps text-label-caps ${
          active ? "text-primary" : "text-on-surface-variant"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function TextArea({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 5,
}) {
  return (
    <div className="space-y-2">
      <label className="font-label-caps text-label-caps text-secondary">
        {label}
        {required && <span className="text-error"> *</span>}
      </label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="w-full bg-white border border-outline-variant rounded-lg p-3 font-body-md focus:border-primary focus:ring-1 focus:ring-primary/10 outline-none resize-y"
      />
    </div>
  );
}

function FooterLink({ label }) {
  return (
    <a
      className="font-sans text-xs uppercase tracking-widest text-stone-400 hover:text-[#1F3A2E] transition-all underline-offset-4 hover:underline"
      href="#"
    >
      {label}
    </a>
  );
}