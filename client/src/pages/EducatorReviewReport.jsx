import { useState } from "react";
import RequestProcessLogModal from "../components/RequestProcessLogModal";

export default function EducatorReviewReport() {
  const [showProcessLogModal, setShowProcessLogModal] = useState(false);

  return (
    <div className="font-body-md text-on-surface bg-background min-h-screen">
      {/* TopNavBar */}
      <header className="bg-[#FAF9F6] border-b border-[#E8E4DC] sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-10 py-4 max-w-[1440px] mx-auto">
          <a href="/" className="text-2xl font-h1 font-bold text-[#1F3A2E]">
            ProofBuddy
          </a>

          <nav className="hidden md:flex gap-8 items-center">
            <a
              className="text-[#1F3A2E] font-semibold border-b-2 border-[#1F3A2E] pb-1 font-h1 tracking-tight"
              href="/educator"
            >
              Dashboard
            </a>

            <a
              className="text-stone-500 hover:text-stone-800 transition-colors font-h1 tracking-tight"
              href="/educator/submissions/intake"
            >
              Library
            </a>

            <a
              className="text-stone-500 hover:text-stone-800 transition-colors font-h1 tracking-tight"
              href="/educator/review-report"
            >
              Reports
            </a>

            <a
              className="text-stone-500 hover:text-stone-800 transition-colors font-h1 tracking-tight"
              href="#support"
            >
              Support
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="/signup"
              className="px-4 py-2 text-label-caps font-bold text-stone-700 hover:bg-stone-100 transition-all"
            >
              Login
            </a>

            <a
              href="/educator/submissions/intake"
              className="px-6 py-2 bg-secondary text-on-secondary rounded-lg font-bold transition-all active:scale-95"
            >
              Upload
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-gutter py-stack_lg">
        {/* Header Section */}
        <section className="mb-stack_lg max-w-content_max_width mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-outline-variant pb-stack_md">
            <div>
              <span className="font-label-caps text-on-secondary-fixed-variant mb-unit block">
                PHIL-302 • ETHICS IN TECH • ID: PB-8829-X
              </span>

              <h1 className="font-h1 text-display-lg text-primary tracking-tight">
                Review Report: Student A1
              </h1>
            </div>

            <div className="flex gap-2">
              <span className="bg-[#FFF4E5] text-[#B45309] px-3 py-1 rounded-full font-label-caps flex items-center gap-1 border border-[#FCD34D]">
                <span className="material-symbols-outlined text-[16px]">
                  visibility
                </span>
                MEDIUM RISK
              </span>

              <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-caps flex items-center gap-1 border border-secondary">
                <span className="material-symbols-outlined text-[16px]">
                  policy
                </span>
                AI POLICY: RESTRICTED
              </span>
            </div>
          </div>
        </section>

        {/* Important Banner */}
        <div className="max-w-content_max_width mx-auto mb-stack_lg">
          <div className="bg-secondary-container/30 border-l-4 border-secondary p-stack_md rounded-r-lg flex gap-4 items-start">
            <span className="material-symbols-outlined text-secondary">
              info
            </span>

            <div>
              <h4 className="font-label-caps text-secondary mb-1">
                EDUCATOR GUIDANCE
              </h4>

              <p className="text-body-md text-on-secondary-container leading-relaxed">
                This is a review assistant meant to support your professional
                judgment. These findings are signals, not definitive proof.
                Discrepancies may arise from legitimate personal growth or
                varied writing environments.
              </p>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <section className="max-w-content_max_width mx-auto mb-stack_lg">
          <h2 className="font-h2 text-h2 mb-stack_sm text-on-surface">
            Executive Summary
          </h2>

          <p className="font-editor-text text-editor-text italic text-on-surface-variant leading-relaxed bg-surface-container-low p-stack_md rounded-xl border border-outline-variant">
            "The submitted document demonstrates a notable shift in lexical
            density compared to previous samples. While thematic alignment with
            the course prompt is high, the sudden disappearance of characteristic
            syntactic errors suggests either significant external editing or the
            intervention of generative tools. However, the conceptual depth
            remains consistent with the student's prior oral contributions."
          </p>
        </section>

        {/* Bento Grid Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-stack_lg">
          {/* Writing Metrics */}
          <div className="lg:col-span-8 bg-white border border-outline-variant rounded-xl p-stack_md shadow-sm">
            <div className="flex justify-between items-center mb-stack_md">
              <h3 className="font-h3 text-h3">Writing Metrics Analysis</h3>

              <span className="font-label-caps text-outline">
                VS. HISTORICAL AVERAGE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-stack_md">
              <MetricBox
                label="LEXICAL DIVERSITY"
                value="0.82"
                change="+14% ↑"
                note="Industry standard: 0.65"
              />

              <MetricBox
                label="AVG SENTENCE LENGTH"
                value="24.1"
                change="+9.4 ↑"
                note="Student historical: 14.7"
              />
            </div>

            <div className="mt-stack_md pt-stack_md border-t border-outline-variant">
              <h4 className="font-label-caps mb-4">
                PREVIOUS COMPARISON (PB-721-A)
              </h4>

              <div className="flex flex-col gap-3">
                <div className="h-2 bg-outline-variant rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-2/3"></div>
                </div>

                <div className="flex justify-between text-xs font-label-caps text-outline">
                  <span>CURRENT: 3,402 WORDS</span>
                  <span>HISTORICAL: 1,200 WORDS AVG</span>
                </div>
              </div>
            </div>
          </div>

          {/* Citation Audit */}
          <div className="lg:col-span-4 bg-white border border-outline-variant rounded-xl p-stack_md shadow-sm">
            <h3 className="font-h3 text-h3 mb-stack_md">Citation Audit</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-primary-container/10 rounded-lg">
                <div className="flex items-center gap-3">
                  <span
                    className="material-symbols-outlined text-primary-container"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>

                  <span className="text-sm font-medium">
                    Crossref Verified
                  </span>
                </div>

                <span className="font-code text-xs">8/8</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-surface-container rounded-lg">
                <div className="flex items-center gap-3 text-stone-400">
                  <span className="material-symbols-outlined">
                    hourglass_empty
                  </span>

                  <span className="text-sm font-medium">DOIs Pending</span>
                </div>

                <span className="font-code text-xs">0</span>
              </div>

              <div className="p-3 bg-surface-container-low border border-outline-variant rounded-lg">
                <p className="text-xs italic text-on-surface-variant leading-tight">
                  "All citations mapped to existing academic papers. No
                  hallucinated sources detected."
                </p>
              </div>
            </div>
          </div>

          {/* Prompt Alignment */}
          <div className="lg:col-span-6 bg-white border border-outline-variant rounded-xl p-stack_md shadow-sm">
            <h3 className="font-h3 text-h3 mb-stack_md">Prompt Alignment</h3>

            <div className="space-y-3">
              <PromptItem checked text="Defined 'Technological Determinism'" />
              <PromptItem checked text="Cited 3+ peer-reviewed sources" />
              <PromptItem text="Integrated class discussion on 'Neuralink'" />
              <PromptItem checked text="Word count within range (3k-4k)" />
            </div>
          </div>

          {/* AI Assistance Signals */}
          <div className="lg:col-span-6 bg-white border border-outline-variant rounded-xl p-stack_md shadow-sm">
            <h3 className="font-h3 text-h3 mb-stack_md">
              AI-Assistance Signals
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <SignalCard
                label="UNIFORMITY"
                text="Unnatural lack of variance in sentence structure."
                danger
              />

              <SignalCard
                label="BURSTINESS"
                text="Extremely low rhythm fluctuation (Score: 12.2)."
                danger
              />

              <SignalCard
                label="PATTERN MATCH"
                text="No direct corpus overlap found with known GPT outputs."
                muted
              />
            </div>
          </div>
        </div>

        {/* Alternative Explanations & Follow-up */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mb-stack_lg">
          <div className="bg-primary-container text-on-primary p-stack_md rounded-xl shadow-md">
            <div className="flex items-center gap-2 mb-stack_sm">
              <span className="material-symbols-outlined text-primary-fixed">
                psychology_alt
              </span>

              <h3 className="font-h3 text-h3 text-primary-fixed">
                Alternative Explanations
              </h3>
            </div>

            <ul className="space-y-3 text-sm text-primary-fixed-dim leading-relaxed">
              <BulletItem text="The student may have utilized professional proofreading or editing services." />
              <BulletItem text="A significant shift in environment, such as a break period, may have allowed for intensive focus." />
              <BulletItem text="Transition from brainstorming to a formal scholarly tone." />
            </ul>
          </div>

          <div className="bg-white border border-outline-variant p-stack_md rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-stack_sm">
              <span className="material-symbols-outlined text-secondary">
                forum
              </span>

              <h3 className="font-h3 text-h3">Follow-up Questions</h3>
            </div>

            <ul className="space-y-3 text-sm text-on-surface-variant">
              <QuestionItem text="Can you explain your decision to use 'Technological Determinism' as the primary lens over 'Constructivism'?" />
              <QuestionItem text="What was the most challenging source you encountered during your research for the fourth paragraph?" />
              <QuestionItem text="How does your conclusion reconcile with the anecdotal evidence we discussed in Week 4?" />
            </ul>
          </div>
        </div>

        {/* Footer Action */}
        <div className="flex flex-col items-center gap-stack_md mt-stack_lg pt-stack_lg border-t border-outline-variant">
          <button
            type="button"
            onClick={() => setShowProcessLogModal(true)}
            className="bg-secondary text-on-secondary px-stack_lg py-4 rounded-lg font-h2 text-h3 transition-transform hover:scale-[1.02] active:scale-95 shadow-lg flex items-center gap-3"
          >
            <span className="material-symbols-outlined">description</span>
            Request student's ProofBuddy Process Log
          </button>

          <p className="text-xs font-label-caps text-outline">
            A process log provides a time-stamped history of the document's
            evolution.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer
        id="support"
        className="bg-[#FAF9F6] border-t border-[#E8E4DC] mt-stack_lg"
      >
        <div className="w-full max-w-[800px] mx-auto py-12 flex flex-col items-center gap-4 text-center">
          <div className="flex gap-8">
            <FooterLink label="About" />
            <FooterLink label="Privacy" />
            <FooterLink label="Contact" />
            <FooterLink label="Terms" />
          </div>

          <p className="font-label-caps text-stone-400">
            © 2024 ProofBuddy. Built for Scholarly Excellence.
          </p>
        </div>
      </footer>

      <RequestProcessLogModal
        isOpen={showProcessLogModal}
        onClose={() => setShowProcessLogModal(false)}
      />
    </div>
  );
}

function MetricBox({ label, value, change, note }) {
  return (
    <div className="p-4 bg-background rounded-lg border border-outline-variant">
      <span className="font-label-caps block mb-2">{label}</span>

      <div className="flex items-end gap-2">
        <span className="text-display-lg font-h1 leading-none text-primary">
          {value}
        </span>

        <span className="text-error font-bold mb-1">{change}</span>
      </div>

      <p className="text-sm mt-2 text-stone-500">{note}</p>
    </div>
  );
}

function PromptItem({ text, checked = false }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`material-symbols-outlined ${
          checked ? "text-primary-container" : "text-outline"
        }`}
      >
        {checked ? "check_box" : "check_box_outline_blank"}
      </span>

      <span className={`text-body-md ${checked ? "" : "text-stone-400"}`}>
        {text}
      </span>
    </div>
  );
}

function SignalCard({ label, text, danger = false, muted = false }) {
  const className = danger
    ? "p-3 bg-error-container/20 border border-error/20 rounded-lg"
    : muted
      ? "p-3 bg-surface-container rounded-lg opacity-60"
      : "p-3 bg-surface-container rounded-lg";

  return (
    <div className={className}>
      <span
        className={`font-label-caps block mb-1 ${
          danger ? "text-error" : "text-outline"
        }`}
      >
        {label}
      </span>

      <p className={`text-xs ${danger ? "text-on-error-container" : ""}`}>
        {text}
      </p>
    </div>
  );
}

function BulletItem({ text }) {
  return (
    <li className="flex gap-2">
      <span className="font-bold">•</span>
      {text}
    </li>
  );
}

function QuestionItem({ text }) {
  return <li className="border-b border-surface-variant pb-2">"{text}"</li>;
}

function FooterLink({ label }) {
  return (
    <a
      className="font-label-caps text-stone-400 hover:text-[#1F3A2E] transition-all underline-offset-4 hover:underline"
      href="#"
    >
      {label}
    </a>
  );
}