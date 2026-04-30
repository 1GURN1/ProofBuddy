import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentLandingPage() {
  const navigate = useNavigate();

  function openStudentExperience() {
    const token = localStorage.getItem("proofbuddyToken");
    const role = localStorage.getItem("proofbuddyRole");
    if (token && role === "student") {
      navigate("/student");
      return;
    }
    navigate("/auth?role=student");
  }

  useEffect(() => {
    const token = localStorage.getItem("proofbuddyToken");
    const role = localStorage.getItem("proofbuddyRole");
    if (token && role === "student") navigate("/student", { replace: true });
  }, [navigate]);

  return (
    <div className="bg-pb-bg min-h-screen text-pb-text">
      <header className="sticky top-0 z-50 bg-pb-bg border-b border-pb-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="font-fraunces text-2xl font-semibold text-pb-text">
            ProofBuddy
          </button>
          <div className="flex items-center gap-5 text-sm">
            <button onClick={() => navigate("/educators")} className="text-pb-muted hover:text-pb-text transition-colors">
              Educator homepage
            </button>
            <button onClick={() => navigate("/auth?role=student")} className="text-pb-student font-medium hover:underline underline-offset-4 transition-all">
              Student Sign In
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
          <div>
            <p className="text-xs font-bold tracking-widest text-pb-student uppercase mb-5">
              For Students
            </p>
            <h1 className="font-fraunces text-5xl md:text-6xl font-semibold leading-tight mb-6">
              Catch integrity issues
              <br />
              before your instructor does.
            </h1>
            <p className="text-pb-muted text-lg max-w-2xl leading-relaxed mb-8">
              ProofBuddy helps you draft transparently, review citation quality, and preserve a credible writing trail while you work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={openStudentExperience} className="bg-pb-student text-white px-6 py-3 rounded-btn shadow-card hover:bg-pb-student/90 transition-all">
                Start as a student
              </button>
              <button onClick={openStudentExperience} className="border border-pb-border bg-pb-surface text-pb-text px-6 py-3 rounded-btn hover:border-pb-student hover:text-pb-student transition-all">
                Open student workspace
              </button>
            </div>
          </div>

          <div className="rounded-card border border-pb-border bg-pb-surface p-6 shadow-card">
            <p className="text-xs font-bold tracking-widest uppercase text-pb-muted mb-4">Student Workflow</p>
            <div className="space-y-4">
              <StudentPoint icon="description" title="Build your document library" text="Keep drafts, notes, and reports in one place." />
              <StudentPoint icon="edit_note" title="Write with process logging" text="Record a defensible trail of how your work was created." />
              <StudentPoint icon="analytics" title="Review your integrity report" text="Check AI-use signals, citations, and writing consistency before submission." />
            </div>
          </div>
        </section>

        <section className="border-y border-pb-border bg-white/60">
          <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
            <StudentFeature title="Pre-submit feedback" description="See risk signals early enough to fix them, not after grading starts." />
            <StudentFeature title="Citations with context" description="Spot missing attribution and questionable references before they become disputes." />
            <StudentFeature title="Share process when needed" description="Approve educator requests for process logs on your terms." />
          </div>
        </section>
      </main>
    </div>
  );
}

function StudentPoint({ icon, title, text }) {
  return (
    <div className="flex gap-4">
      <span className="material-symbols-outlined text-pb-student text-2xl">{icon}</span>
      <div>
        <h2 className="font-fraunces text-xl font-semibold mb-1">{title}</h2>
        <p className="text-sm text-pb-muted leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function StudentFeature({ title, description }) {
  return (
    <div className="rounded-card border border-pb-border bg-pb-bg p-6">
      <h2 className="font-fraunces text-xl font-semibold mb-2">{title}</h2>
      <p className="text-sm text-pb-muted leading-relaxed">{description}</p>
    </div>
  );
}
