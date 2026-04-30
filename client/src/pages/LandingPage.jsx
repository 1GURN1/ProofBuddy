import { useNavigate } from "react-router-dom";

export default function LandingPage() {
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

  function openEducatorExperience() {
    const token = localStorage.getItem("proofbuddyToken");
    const role = localStorage.getItem("proofbuddyRole");
    if (token && role === "educator") {
      navigate("/educator");
      return;
    }
    navigate("/auth?role=educator");
  }

  return (
    <div className="bg-pb-bg min-h-screen text-pb-text">
      <header className="sticky top-0 z-50 bg-pb-bg border-b border-pb-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="font-fraunces text-2xl font-semibold text-pb-text hover:opacity-80 transition-opacity">
            ProofBuddy
          </button>
          <button
            onClick={() => navigate("/auth")}
            className="text-sm font-medium text-pb-student hover:underline underline-offset-4 transition-all"
          >
            Sign In →
          </button>
        </div>
      </header>

      <main>
        <section className="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
          <p className="text-xs font-bold tracking-widest text-pb-muted uppercase mb-6">
            Academic Integrity Software
          </p>
          <h1 className="font-fraunces text-5xl md:text-6xl font-semibold text-pb-text leading-tight mb-6">
            Choose the ProofBuddy
            <br />
            experience built for you.
          </h1>
          <p className="text-pb-muted text-lg max-w-2xl mx-auto leading-relaxed mb-12">
            Students and educators now have separate homepages. Pick the experience you need and continue into the right workflow from the start.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <button
              onClick={openStudentExperience}
              className="group bg-pb-student text-white rounded-card px-8 py-7 text-left hover:bg-pb-student/90 transition-all shadow-card"
            >
              <span className="block text-xs font-bold tracking-widest uppercase mb-3 opacity-70">
                For Students
              </span>
              <span className="block font-fraunces text-2xl font-semibold mb-2">
                Student Homepage →
              </span>
              <span className="block text-sm opacity-75">
                Draft, review, and understand your writing process before you submit.
              </span>
            </button>

            <button
              onClick={openEducatorExperience}
              className="group bg-pb-edu text-white rounded-card px-8 py-7 text-left hover:bg-pb-edu/90 transition-all shadow-card"
            >
              <span className="block text-xs font-bold tracking-widest uppercase mb-3 opacity-70">
                For Educators
              </span>
              <span className="block font-fraunces text-2xl font-semibold mb-2">
                Educator Homepage →
              </span>
              <span className="block text-sm opacity-75">
                Review submissions, request evidence, and inspect integrity signals with context.
              </span>
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-pb-border bg-pb-bg">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <button onClick={() => navigate("/")} className="font-fraunces text-lg text-pb-text hover:opacity-80 transition-opacity">
            ProofBuddy
          </button>
          <div className="flex items-center gap-6 text-xs text-pb-muted uppercase tracking-widest">
            <a href="#" className="hover:text-pb-text transition-colors">Privacy</a>
            <a href="#" className="hover:text-pb-text transition-colors">Terms</a>
            <a href="#" className="hover:text-pb-text transition-colors">Contact</a>
          </div>
          <span className="text-xs text-pb-muted">© 2024 ProofBuddy</span>
        </div>
      </footer>
    </div>
  );
}
