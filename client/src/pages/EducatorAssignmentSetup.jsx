import { useState } from "react";

const aiPolicies = [
  {
    id: "strict",
    title: "Strict Prohibition",
    description:
      "AI generation is not allowed for any part of the writing process. Full integrity scan required.",
    icon: "block",
    iconClass: "bg-red-50 text-red-700",
  },
  {
    id: "editing",
    title: "Editing Only",
    description:
      "AI may be used for grammar and style refinement, but core concepts must be original work.",
    icon: "edit_note",
    iconClass: "bg-blue-50 text-blue-700",
  },
  {
    id: "ideation",
    title: "Ideation Assist",
    description:
      "AI allowed for brainstorming and outlining. All drafted text must be student-written.",
    icon: "psychology",
    iconClass: "bg-emerald-50 text-emerald-700",
  },
  {
    id: "full",
    title: "Full Integration",
    description:
      "Students are encouraged to use AI tools, provided all interactions are cited correctly.",
    icon: "check_circle",
    iconClass: "bg-stone-100 text-stone-700",
  },
];

const concepts = [
  "Literary Archetypes",
  "Sonnets & Structure",
  "Historical Context",
  "Comparative Theory",
];

export default function EducatorAssignmentSetup() {
  const [selectedPolicy, setSelectedPolicy] = useState("strict");
  const [selectedConcepts, setSelectedConcepts] = useState([
    "Literary Archetypes",
    "Sonnets & Structure",
  ]);

  function toggleConcept(concept) {
    setSelectedConcepts((prev) =>
      prev.includes(concept)
        ? prev.filter((item) => item !== concept)
        : [...prev, concept]
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    window.location.href = "/educator";
  }

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen">
      {/* TopNavBar */}
      <header className="bg-[#FAF9F6] border-b border-[#E8E4DC] sticky top-0 z-50">
        <nav className="flex justify-between items-center w-full px-10 py-4 max-w-[1440px] mx-auto">
          <a href="/" className="text-2xl font-serif font-bold text-[#1F3A2E]">
            ProofBuddy
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a
              className="text-stone-500 hover:text-stone-800 transition-colors font-sans text-sm font-medium"
              href="/educator"
            >
              Dashboard
            </a>
            <a
              className="text-stone-500 hover:text-stone-800 transition-colors font-sans text-sm font-medium"
              href="/educator/submissions/intake"
            >
              Library
            </a>
            <a
              className="text-stone-500 hover:text-stone-800 transition-colors font-sans text-sm font-medium"
              href="/educator/review-report"
            >
              Reports
            </a>
            <a
              className="text-stone-500 hover:text-stone-800 transition-colors font-sans text-sm font-medium"
              href="#support"
            >
              Support
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/signup"
              className="px-5 py-2 text-sm font-semibold border border-[#E8E4DC] text-[#1F3A2E] hover:bg-stone-100 transition-all active:scale-95"
            >
              Login
            </a>

            <a
              href="/educator/submissions/intake"
              className="px-5 py-2 text-sm font-semibold bg-primary text-on-primary hover:opacity-90 transition-all active:scale-95"
            >
              Upload
            </a>
          </div>
        </nav>
      </header>

      <main className="max-w-[1440px] mx-auto flex min-h-screen">
        {/* SideNavBar */}
        <aside className="w-[240px] border-r border-[#E8E4DC] flex flex-col py-6 sticky top-[73px] h-[calc(100vh-73px)]">
          <div className="px-6 mb-8">
            <div className="text-xl font-serif font-black text-[#1F3A2E]">
              ProofBuddy
            </div>

            <div className="text-xs uppercase tracking-widest text-stone-400 font-sans mt-1">
              Academic Integrity
            </div>
          </div>

          <a
            href="/educator/assignments/new"
            className="mx-4 mb-8 bg-primary text-on-primary py-3 px-4 flex items-center justify-center gap-2 font-medium text-sm rounded-lg active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined">add</span>
            New Assignment
          </a>

          <nav className="flex-1 space-y-1">
            <SidebarLink icon="description" label="All Documents" href="/educator/submissions/intake" />
            <SidebarLink active icon="folder" label="Folders" />
            <SidebarLink icon="label" label="Tags" />
            <SidebarLink icon="group" label="Shared" />
            <SidebarLink icon="archive" label="Archive" />
          </nav>

          <div className="px-4 mt-auto space-y-1">
            <SidebarSmallLink icon="settings" label="Settings" href="/settings" />
            <SidebarSmallLink icon="help_outline" label="Help" />
          </div>
        </aside>

        {/* Main Content Area */}
        <section className="flex-1 flex flex-col items-center py-12 px-10">
          <div className="w-full max-w-[800px]">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 mb-8 text-label-caps text-stone-400 uppercase tracking-widest">
              <a className="hover:text-primary transition-colors" href="#">
                ENGL 102
              </a>

              <span className="material-symbols-outlined text-[14px]">
                chevron_right
              </span>

              <span className="text-on-surface">New Assignment</span>
            </nav>

            <header className="mb-12">
              <h1 className="font-h1 text-h1 text-primary mb-2">
                Create New Assignment
              </h1>

              <p className="font-body-md text-stone-500">
                Define the parameters, AI guidelines, and evaluation criteria for
                your students' submissions.
              </p>
            </header>

            {/* Assignment Form */}
            <form className="space-y-10" onSubmit={handleSubmit}>
              {/* Basic Information */}
              <div className="grid grid-cols-1 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-label-caps uppercase text-stone-500 text-[11px] tracking-widest">
                    Assignment Title
                  </label>

                  <input
                    className="bg-white border border-[#E8E4DC] focus:ring-2 focus:ring-primary/10 focus:border-primary px-4 py-3 rounded-lg text-body-md transition-all outline-none"
                    placeholder="e.g. Comparative Analysis of Romantic Poetry"
                    type="text"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-label-caps uppercase text-stone-500 text-[11px] tracking-widest">
                    Prompt & Instructions
                  </label>

                  <textarea
                    className="bg-white border border-[#E8E4DC] focus:ring-2 focus:ring-primary/10 focus:border-primary px-4 py-3 rounded-lg font-editor-text text-editor-text transition-all outline-none resize-none"
                    placeholder="Detail the specific task, questions, and expectations for this assignment..."
                    rows={6}
                  />
                </div>
              </div>

              {/* AI Policy Section */}
              <div className="space-y-4">
                <label className="font-label-caps uppercase text-stone-500 text-[11px] tracking-widest">
                  AI & LLM Policy
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aiPolicies.map((policy) => (
                    <PolicyCard
                      key={policy.id}
                      policy={policy}
                      selected={selectedPolicy === policy.id}
                      onSelect={() => setSelectedPolicy(policy.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Required Concepts Checklist */}
              <div className="bg-white border border-[#E8E4DC] p-8 rounded-xl space-y-6">
                <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                  <h3 className="font-h2 text-h2 text-primary">
                    Required Concepts
                  </h3>

                  <button
                    type="button"
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    Add New +
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                  {concepts.map((concept) => (
                    <label
                      key={concept}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        checked={selectedConcepts.includes(concept)}
                        onChange={() => toggleConcept(concept)}
                        className="w-5 h-5 border-[#E8E4DC] text-primary focus:ring-primary/20 rounded"
                        type="checkbox"
                      />

                      <span className="font-body-md text-stone-700">
                        {concept}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rubric & Citation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="font-label-caps uppercase text-stone-500 text-[11px] tracking-widest">
                    Grading Rubric (Text)
                  </label>

                  <textarea
                    className="bg-white border border-[#E8E4DC] focus:ring-2 focus:ring-primary/10 focus:border-primary px-4 py-3 rounded-lg text-sm transition-all outline-none resize-none"
                    placeholder="Paste rubric details or criteria here..."
                    rows={4}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-label-caps uppercase text-stone-500 text-[11px] tracking-widest">
                    Citation Style
                  </label>

                  <select className="bg-white border border-[#E8E4DC] focus:ring-2 focus:ring-primary/10 focus:border-primary px-4 py-3 rounded-lg text-body-md appearance-none transition-all outline-none">
                    <option>MLA 9th Edition</option>
                    <option>APA 7th Edition</option>
                    <option>Chicago/Turabian</option>
                    <option>Harvard</option>
                  </select>

                  <p className="text-[11px] text-stone-400 italic mt-1">
                    Students will be flagged if they deviate from this style.
                  </p>
                </div>
              </div>

              {/* Submission Action */}
              <div className="pt-8 border-t border-stone-200 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-emerald-700">
                      auto_awesome
                    </span>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-primary">
                      AI-Assisted Pre-Scan
                    </p>

                    <p className="text-xs text-stone-500">
                      Assignment prompt will be analyzed for potential
                      weaknesses.
                    </p>
                  </div>
                </div>

                <button
                  className="w-full md:w-auto bg-[#082419] text-white px-10 py-4 font-bold text-lg hover:opacity-95 transition-all shadow-md active:scale-95"
                  type="submit"
                >
                  Create Assignment
                </button>
              </div>
            </form>
          </div>

          {/* Minimal Footer Inside Shell */}
          <footer
            id="support"
            className="w-full max-w-[800px] mx-auto py-12 flex flex-col items-center gap-4 text-center mt-20"
          >
            <div className="font-sans text-xs uppercase tracking-widest text-stone-400">
              © 2024 ProofBuddy. Built for Scholarly Excellence.
            </div>

            <div className="flex gap-6">
              <FooterLink label="About" />
              <FooterLink label="Privacy" />
              <FooterLink label="Contact" />
              <FooterLink label="Terms" />
            </div>
          </footer>
        </section>

        {/* Right Side Utility / Image Accent */}
        <aside className="hidden xl:flex w-[320px] bg-stone-50/50 p-8 flex-col gap-8 border-l border-[#E8E4DC]">
          <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-lg group">
            <img
              alt="Academic Setting"
              className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzVcgTajddCmNvGLCFu9yD_9koqyvs4wq5opXJrj65BuYxq8pHQyLJv4VIWuQ8Z2sXURdgfCBugPm3goVM5hTTIlb7SXem9oNLcTvqi8sdzxGlu73zLFKqG7vNudRbC47aj9UlwpAj29XrBCA_0oFaQnTCkW8CJ0dK83hCKC3zPGR2lGlRVzpiFtld8qnxLt04RcrJXVomwy_R2bKTCUeTAOhGEcw2W294toYkqHF55KvlTcBK_XpET0jq1N4HTvT50dpl4pQh9Bw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <p className="text-white text-sm font-serif italic">
                "Integrity is doing the right thing, even when no one is
                watching."
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-label-caps uppercase text-stone-400 text-[10px] tracking-[0.2em]">
              Assignment Insight
            </h4>

            <div className="p-4 bg-white border border-[#E8E4DC] rounded-lg">
              <p className="text-xs text-stone-600 leading-relaxed">
                By defining a clear AI policy, you help students navigate the
                evolving landscape of academic writing with confidence and
                clarity.
              </p>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

function SidebarLink({ icon, label, href = "#", active = false }) {
  return (
    <a
      className={
        active
          ? "text-[#1F3A2E] font-bold bg-stone-100 rounded-r-full px-6 py-3 flex items-center gap-3 font-sans text-sm transition-colors"
          : "text-stone-500 px-6 py-3 flex items-center gap-3 font-sans text-sm font-medium hover:bg-stone-50 transition-colors"
      }
      href={href}
    >
      <span
        className="material-symbols-outlined"
        style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
      >
        {icon}
      </span>
      {label}
    </a>
  );
}

function SidebarSmallLink({ icon, label, href = "#" }) {
  return (
    <a
      className="text-stone-500 px-2 py-2 flex items-center gap-3 font-sans text-xs font-medium hover:bg-stone-50 transition-colors"
      href={href}
    >
      <span className="material-symbols-outlined">{icon}</span>
      {label}
    </a>
  );
}

function PolicyCard({ policy, selected, onSelect }) {
  return (
    <label className="relative group cursor-pointer">
      <input
        checked={selected}
        onChange={onSelect}
        className="peer sr-only"
        name="ai_policy"
        type="radio"
      />

      <div
        className={`h-full p-5 bg-white border rounded-xl transition-all group-hover:shadow-sm ${
          selected
            ? "border-primary bg-stone-50"
            : "border-[#E8E4DC]"
        }`}
      >
        <div className="flex justify-between items-start mb-2">
          <div className={`${policy.iconClass} p-2 rounded-lg`}>
            <span className="material-symbols-outlined">{policy.icon}</span>
          </div>

          <div
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              selected
                ? "border-primary bg-primary"
                : "border-[#E8E4DC]"
            }`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full bg-white ${
                selected ? "opacity-100" : "opacity-0"
              }`}
            ></div>
          </div>
        </div>

        <h4 className="font-h3 text-h3 text-primary mb-1">{policy.title}</h4>

        <p className="text-xs text-stone-500">{policy.description}</p>
      </div>
    </label>
  );
}

function FooterLink({ label }) {
  return (
    <a
      className="font-sans text-xs uppercase tracking-widest text-stone-400 hover:text-[#1F3A2E] underline-offset-4 hover:underline transition-all"
      href="#"
    >
      {label}
    </a>
  );
}