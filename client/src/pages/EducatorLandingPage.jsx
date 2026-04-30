import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EducatorLandingPage() {
  const navigate = useNavigate();

  function openEducatorExperience() {
    const token = localStorage.getItem("proofbuddyToken");
    const role = localStorage.getItem("proofbuddyRole");
    if (token && role === "educator") {
      navigate("/educator");
      return;
    }
    navigate("/auth?role=educator");
  }

  useEffect(() => {
    const token = localStorage.getItem("proofbuddyToken");
    const role = localStorage.getItem("proofbuddyRole");
    if (token && role === "educator") navigate("/educator", { replace: true });
  }, [navigate]);

  return (
    <div className="bg-pb-bg min-h-screen text-pb-text">
      <header className="sticky top-0 z-50 bg-pb-bg border-b border-pb-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="font-fraunces text-2xl font-semibold text-pb-text">
            ProofBuddy
          </button>
          <div className="flex items-center gap-5 text-sm">
            <button onClick={() => navigate("/students")} className="text-pb-muted hover:text-pb-text transition-colors">
              Student homepage
            </button>
            <button onClick={() => navigate("/auth?role=educator")} className="text-pb-edu font-medium hover:underline underline-offset-4 transition-all">
              Educator Sign In
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div>
            <p className="text-xs font-bold tracking-widest text-pb-edu uppercase mb-5">
              For Educators
            </p>
            <h1 className="font-fraunces text-5xl md:text-6xl font-semibold leading-tight mb-6">
              Review student work
              <br />
              with evidence, not suspicion.
            </h1>
            <p className="text-pb-muted text-lg max-w-2xl leading-relaxed mb-8">
              ProofBuddy gives you structured integrity signals, citation checks, and optional process-log requests so you can investigate fairly and document decisions clearly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={openEducatorExperience} className="bg-pb-edu text-white px-6 py-3 rounded-btn shadow-card hover:bg-pb-edu/90 transition-all">
                Start as an educator
              </button>
              <button onClick={openEducatorExperience} className="border border-pb-border bg-pb-surface text-pb-text px-6 py-3 rounded-btn hover:border-pb-edu hover:text-pb-edu transition-all">
                Open educator workspace
              </button>
            </div>
          </div>

          <div className="rounded-card border border-pb-border bg-pb-surface p-6 shadow-card">
            <p className="text-xs font-bold tracking-widest uppercase text-pb-muted mb-4">Educator Workflow</p>
            <div className="space-y-4">
              <EducatorPoint icon="assignment" title="Submit writing for review" text="Paste the work, prompt, and optional prior sample into a structured intake." />
              <EducatorPoint icon="fact_check" title="Inspect report findings" text="Review severity-ranked signals instead of a single opaque AI score." />
              <EducatorPoint icon="timeline" title="Request process evidence" text="Ask students to share process logs when additional context is warranted." />
            </div>
          </div>
        </section>

        <section className="border-y border-pb-border bg-white/60">
          <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
            <EducatorFeature title="Citation audits" description="Flag malformed or unverifiable sources with report-ready notes." />
            <EducatorFeature title="Prompt alignment checks" description="Compare the student submission against the stated assignment and rubric context." />
            <EducatorFeature title="Due-process workflow" description="Document follow-up questions and evidence requests before escalating concerns." />
          </div>
        </section>
      </main>
    </div>
  );
}

function EducatorPoint({ icon, title, text }) {
  return (
    <div className="flex gap-4">
      <span className="material-symbols-outlined text-pb-edu text-2xl">{icon}</span>
      <div>
        <h2 className="font-fraunces text-xl font-semibold mb-1">{title}</h2>
        <p className="text-sm text-pb-muted leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function EducatorFeature({ title, description }) {
  return (
    <div className="rounded-card border border-pb-border bg-pb-bg p-6">
      <h2 className="font-fraunces text-xl font-semibold mb-2">{title}</h2>
      <p className="text-sm text-pb-muted leading-relaxed">{description}</p>
    </div>
  );
}
