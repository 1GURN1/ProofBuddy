import { useState } from "react";

const essayTypes = [
  {
    title: "Argumentative",
    subtitle: "Persuasive Focus",
    icon: "edit_note",
  },
  {
    title: "Analytical",
    subtitle: "Evidence & Critique",
    icon: "analytics",
  },
  {
    title: "Expository",
    subtitle: "Neutral Investigation",
    icon: "compare",
  },
  {
    title: "Narrative",
    subtitle: "Personal Account",
    icon: "menu_book",
  },
  {
    title: "Critical Review",
    subtitle: "Scholarly Response",
    icon: "search_check",
  },
  {
    title: "Lab Report",
    subtitle: "Methodology Focus",
    icon: "science",
  },
];

export default function StudentNewDocumentSetup() {
  const [selectedType, setSelectedType] = useState("Argumentative");

  function handleContinue() {
    localStorage.setItem("proofbuddyEssayType", selectedType);
    window.location.href = "/student/editor";
  }

  return (
    <div className="bg-background text-on-surface min-h-screen flex items-center justify-center p-6">
      {/* TopNavBar */}
      <header className="bg-[#FAF9F6] border-b border-[#E8E4DC] fixed top-0 left-0 w-full z-50">
        <div className="flex justify-between items-center w-full px-10 py-4 max-w-[1440px] mx-auto">
          <a href="/" className="text-2xl font-serif font-bold text-[#1F3A2E]">
            ProofBuddy
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <a
              className="text-stone-500 hover:text-stone-800 transition-colors font-sans text-sm font-medium"
              href="/student/documents"
            >
              Dashboard
            </a>

            <a
              className="text-[#1F3A2E] font-semibold border-b-2 border-[#1F3A2E] pb-1 font-sans text-sm"
              href="/student/documents"
            >
              Library
            </a>

            <a
              className="text-stone-500 hover:text-stone-800 transition-colors font-sans text-sm font-medium"
              href="/student/report"
            >
              Reports
            </a>

            <a
              className="text-stone-500 hover:text-stone-800 transition-colors font-sans text-sm font-medium"
              href="#support"
            >
              Support
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="/signup"
              className="px-4 py-2 border border-[#E8E4DC] text-[#1F3A2E] font-sans text-sm font-medium rounded-lg hover:bg-stone-50 transition-all"
            >
              Login
            </a>

            <a
              href="/student/documents/new"
              className="px-4 py-2 bg-primary-container text-on-primary font-sans text-sm font-medium rounded-lg hover:opacity-90 transition-all"
            >
              Upload
            </a>
          </div>
        </div>
      </header>

      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-[#1a1c1b]/20 backdrop-blur-sm flex items-center justify-center z-[60]">
        {/* New Document Setup Modal */}
        <main className="w-full max-w-[600px] bg-surface-container-lowest border border-[#E8E4DC] shadow-[0_4px_20px_rgba(26,26,26,0.04)] flex flex-col overflow-hidden">
          {/* Header Section */}
          <div className="px-container_padding pt-container_padding pb-stack_sm">
            <div className="flex justify-between items-end mb-6">
              <div>
                <span className="font-label-caps text-label-caps text-outline uppercase tracking-widest mb-1 block">
                  Scholarly Workspace
                </span>

                <h1 className="font-h1 text-h1 text-primary">
                  New Document Setup
                </h1>
              </div>

              <div className="text-right">
                <span className="font-label-caps text-label-caps text-outline">
                  Step 1 of 4
                </span>
              </div>
            </div>

            {/* 4-Step Progress Bar */}
            <div className="flex gap-2 h-1 w-full bg-[#E8E4DC] mb-stack_lg">
              <div className="w-1/4 h-full bg-primary-container"></div>
              <div className="w-1/4 h-full bg-[#E8E4DC]"></div>
              <div className="w-1/4 h-full bg-[#E8E4DC]"></div>
              <div className="w-1/4 h-full bg-[#E8E4DC]"></div>
            </div>
          </div>

          {/* Content Area */}
          <div className="px-container_padding pb-container_padding custom-scrollbar overflow-y-auto max-h-[614px]">
            {/* Step 1: Essay Type Grid */}
            <section className="space-y-stack_md">
              <div className="border-b border-[#E8E4DC] pb-2">
                <h2 className="font-h2 text-h2 text-on-surface">
                  Choose Essay Type
                </h2>

                <p className="font-body-md text-body-md text-outline">
                  Select the structural foundation for your academic work.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {essayTypes.map((type) => (
                  <EssayTypeCard
                    key={type.title}
                    type={type}
                    selected={selectedType === type.title}
                    onSelect={() => setSelectedType(type.title)}
                  />
                ))}
              </div>
            </section>

            {/* Footer-style Navigation Buttons */}
            <div className="flex items-center justify-between mt-stack_lg pt-stack_md border-t border-[#E8E4DC]">
              <a
                href="/student/documents"
                className="font-body-md text-outline hover:text-primary transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">
                  arrow_back
                </span>
                Back
              </a>

              <div className="flex gap-4">
                <button
                  type="button"
                  className="font-body-md px-6 py-2 border border-[#E8E4DC] text-primary hover:bg-stone-50 transition-all"
                >
                  Save Draft
                </button>

                <button
                  type="button"
                  onClick={handleContinue}
                  className="font-body-md px-8 py-2 bg-primary-container text-on-primary hover:bg-primary transition-all"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] bg-[#1F3A2E]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full blur-[100px] bg-[#86A494]"></div>
      </div>

      {/* Footer */}
      <footer
        id="support"
        className="fixed bottom-0 left-0 w-full bg-[#FAF9F6] border-t border-[#E8E4DC]"
      >
        <div className="w-full max-w-[800px] mx-auto py-6 flex flex-col items-center gap-2 text-center">
          <span className="font-sans text-xs uppercase tracking-widest text-stone-400">
            © 2024 ProofBuddy. Built for Scholarly Excellence.
          </span>

          <div className="flex gap-6">
            <FooterLink label="Privacy" />
            <FooterLink label="Terms" />
            <FooterLink label="Contact" />
          </div>
        </div>
      </footer>
    </div>
  );
}

function EssayTypeCard({ type, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex flex-col items-start p-4 text-left transition-all ${
        selected
          ? "border-2 border-primary bg-surface-container-low text-primary"
          : "border border-[#E8E4DC] hover:border-outline-variant text-on-surface"
      }`}
    >
      <span
        className={`material-symbols-outlined mb-2 ${
          selected ? "text-primary" : "text-outline"
        }`}
      >
        {type.icon}
      </span>

      <span
        className={`font-body-md font-semibold ${
          selected ? "text-primary" : "text-on-surface"
        }`}
      >
        {type.title}
      </span>

      <span className="font-label-caps text-[10px] text-outline mt-1 uppercase">
        {type.subtitle}
      </span>
    </button>
  );
}

function FooterLink({ label }) {
  return (
    <a
      className="font-sans text-xs uppercase tracking-widest text-stone-400 hover:text-[#1F3A2E] underline-offset-4 hover:underline"
      href="#"
    >
      {label}
    </a>
  );
}