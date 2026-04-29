export default function LandingPage() {
  return (
    <div className="bg-background text-on-background min-h-screen selection:bg-primary-fixed">
      {/* TopNavBar */}
      <header className="bg-[#FAF9F6] dark:bg-stone-950 border-b border-[#E8E4DC] dark:border-stone-800 sticky top-0 z-50">
        <nav className="flex justify-between items-center w-full px-10 py-4 max-w-[1440px] mx-auto">
          <div className="flex items-center gap-8">
            <span className="text-2xl font-h1 font-bold text-[#1F3A2E] dark:text-emerald-400">
              ProofBuddy
            </span>

            <div className="hidden md:flex gap-6">
              <a
                className="text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors font-body-md"
                href="/educator"
              >
                Dashboard
              </a>
              <a
                className="text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors font-body-md"
                href="/student/documents"
              >
                Library
              </a>
              <a
                className="text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors font-body-md"
                href="/educator/review-report"
              >
                Reports
              </a>
              <a
                className="text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors font-body-md"
                href="#support"
              >
                Support
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/signup"
              className="px-5 py-2 text-stone-700 font-body-md hover:bg-stone-100 transition-colors rounded-lg"
            >
              Login
            </a>

            <a
              href="/educator/submissions/intake"
              className="px-5 py-2 bg-primary text-on-primary font-body-md rounded-lg shadow-sm active:opacity-80 transition-all duration-200"
            >
              Upload
            </a>
          </div>
        </nav>
      </header>

      <main className="w-full">
        {/* Hero Section */}
        <section className="pt-24 pb-32 px-gutter flex flex-col items-center text-center max-w-content_max_width mx-auto">
          <div className="mb-8">
            <span className="font-h2 text-[36px] text-[#1F3A2E] block mb-6">
              ProofBuddy
            </span>

            <h1 className="font-h1 text-[56px] leading-[1.1] text-primary tracking-tight mb-8">
              Academic integrity, done right.
            </h1>

            <p className="font-body-lg text-outline max-w-[600px] mx-auto">
              The first platform built for both sides of the classroom.
              Transparency for students, forensic clarity for educators, and a
              bridge of trust for institutions.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/signup"
              className="bg-primary text-on-primary px-8 py-3 rounded-lg font-body-md font-semibold"
            >
              Join ProofBuddy
            </a>

            <a
              href="#methodology"
              className="bg-surface border border-outline-variant px-8 py-3 rounded-lg font-body-md font-semibold"
            >
              Learn our Methodology
            </a>
          </div>
        </section>

        {/* CTA Cards Section */}
        <section className="max-w-[1200px] mx-auto px-gutter pb-32 grid grid-cols-1 md:grid-cols-2 gap-stack_md">
          {/* Student Card */}
          <div className="bg-white border border-[#E8E4DC] p-container_padding rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col h-full">
              <span className="font-label-caps text-on-surface-variant mb-4">
                FOR LEARNERS
              </span>

              <h2 className="font-h2 text-primary mb-4">I'm a Student</h2>

              <p className="font-body-md text-outline mb-8 flex-grow">
                Pre-submission analysis that identifies accidental citations,
                structural issues, and originality gaps before you hit turn-in.
              </p>

              <a
                href="/student/editor"
                className="w-full py-4 bg-[#1F3A2E] text-white rounded-lg font-body-md font-semibold flex items-center justify-center gap-2"
              >
                Get started{" "}
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>

          {/* Educator Card */}
          <div className="bg-white border border-[#E8E4DC] p-container_padding rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col h-full">
              <span className="font-label-caps text-on-surface-variant mb-4">
                FOR ACADEMICS
              </span>

              <h2 className="font-h2 text-[#1E2A4A] mb-4">I'm an Educator</h2>

              <p className="font-body-md text-outline mb-8 flex-grow">
                Evidence-based review reports that provide granular insights
                into the writing process, not just a similarity percentage.
              </p>

              <a
                href="/educator"
                className="w-full py-4 bg-[#1E2A4A] text-white rounded-lg font-body-md font-semibold flex items-center justify-center gap-2"
              >
                Set up your courses{" "}
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section id="methodology" className="bg-surface-container-low py-32">
          <div className="max-w-[1000px] mx-auto px-gutter space-y-32">
            {/* Feature 1 */}
            <div className="flex flex-col md:flex-row items-center gap-stack_lg">
              <div className="flex-1 space-y-4">
                <span className="font-label-caps text-[#1F3A2E]">
                  FORENSIC ANALYSIS
                </span>

                <h3 className="font-h2 text-primary">Deep Originality Check</h3>

                <p className="font-body-md text-outline">
                  Our algorithm goes beyond keyword matching. It understands
                  linguistic style, structural cadence, and semantic consistency
                  to ensure every claim is truly yours.
                </p>
              </div>

              <div className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-[#E8E4DC]">
                <img
                  alt="Analysis Interface"
                  className="rounded-lg w-full aspect-video object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9jwR_6YH6QrE6oeFhVVdF7GZ1uBOIPlI_qcASK2iA-PmkLgn46MthmV_AvjkWb41LZ_oNnJfjS5wz0PBS4bQkjs9wgji_cvEYL2VpXsIo8FgObIvbdiPf4NOJlKaH5q0dcT3ZhHwUU0OMpF37-wxkiVG3RhH4SC0XMCEel5ZPeyWx2H12lQqLstOLjA64t9VXjheIjb-5xMb1YzazusxMf_LexybVSwJ9dFvGVyVE89qAVj4TVKAOnZwcWvZ4_Vsnf0nfdQaC7kU"
                />
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-stack_lg">
              <div className="flex-1 space-y-4">
                <span className="font-label-caps text-[#1E2A4A]">
                  TRANSPARENCY
                </span>

                <h3 className="font-h2 text-primary">Evidence-Based Review</h3>

                <p className="font-body-md text-outline">
                  Educators receive a full timeline of the document's evolution.
                  See how ideas grew from rough notes to polished conclusions,
                  validating the genuine intellectual effort.
                </p>
              </div>

              <div className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-[#E8E4DC]">
                <img
                  alt="Review Process"
                  className="rounded-lg w-full aspect-video object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_mLk4EdV6p5blGyAtjRhdw9suw1K-9gy18_fPUxWxMBp99U4YXap2wTk8-bzw88Oit8_5a2ZAM7YAtLGjs2MCbtK2CfwXx2E4g6c3djT-_04fM0s_69gbjDBDaU_BoUsnIxVqV4SBHg0vZuYS20dOph0OQ61Fyl2pZyXDa4YAMXjQ64yjweBPqzxggW0xFb9wfCCC0NKBLossRV7CK1SZXKaeCJ7KoynMfT_SumUWDgxc6avzs3MfWWJTKzZOYdoE0G8-hZlR_hw"
                />
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col md:flex-row items-center gap-stack_lg">
              <div className="flex-1 space-y-4">
                <span className="font-label-caps text-secondary">
                  INTEGRITY BRIDGE
                </span>

                <h3 className="font-h2 text-primary">The Process Log</h3>

                <p className="font-body-md text-outline">
                  A unique cryptographic log that bridges the gap between draft
                  and final submission. It’s the definitive proof of work that
                  protects honest students and empowers fair grading.
                </p>
              </div>

              <div className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-[#E8E4DC]">
                <img
                  alt="Log Bridge"
                  className="rounded-lg w-full aspect-video object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAC2aKEobtYuwTNq1IFx1OFevjkgkcl5CIb837TrdZlnTgFxlY_OWkIM3tIzxNdaJUjDRLGjNo1-9gCk9tB9qBk58DxcjWif10WIe1ISI70aFywWVgNBRRxy276QytyoH3i5vTne42SnnTGfa6ObeVTHvnJd0FUcYHIdQ4ommOfFeaNn0YTH_WX--5KPi3nLGv0eOwbbyKaMtnMVAiRIDH2JEe5UU2YW8X94dQJxiTs8JYK6NiGADUTHwdW1fZ4oPlKfhPVsl_6S4"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 bg-white border-y border-[#E8E4DC]">
          <div className="max-w-content_max_width mx-auto px-gutter text-center space-y-stack_md">
            <h2 className="font-h1 text-primary">
              Ready for Scholarly Excellence?
            </h2>

            <p className="font-body-lg text-outline">
              Join over 200 institutions bridging the integrity gap.
            </p>

            <div className="pt-4">
              <a
                href="/signup"
                className="inline-block bg-primary text-on-primary px-10 py-4 rounded-lg font-body-md font-semibold text-lg hover:opacity-90 transition-opacity"
              >
                Create Free Account
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        id="support"
        className="bg-[#FAF9F6] dark:bg-stone-950 border-t border-[#E8E4DC] dark:border-stone-800"
      >
        <div className="w-full max-w-[800px] mx-auto py-12 flex flex-col items-center gap-4 text-center">
          <div className="flex gap-8 mb-4">
            <a
              className="font-label-caps text-stone-400 hover:text-[#1F3A2E] dark:hover:text-emerald-400 transition-colors underline-offset-4 hover:underline"
              href="#"
            >
              About
            </a>
            <a
              className="font-label-caps text-stone-400 hover:text-[#1F3A2E] dark:hover:text-emerald-400 transition-colors underline-offset-4 hover:underline"
              href="#"
            >
              Privacy
            </a>
            <a
              className="font-label-caps text-stone-400 hover:text-[#1F3A2E] dark:hover:text-emerald-400 transition-colors underline-offset-4 hover:underline"
              href="#"
            >
              Contact
            </a>
            <a
              className="font-label-caps text-stone-400 hover:text-[#1F3A2E] dark:hover:text-emerald-400 transition-colors underline-offset-4 hover:underline"
              href="#"
            >
              Terms
            </a>
          </div>

          <p className="font-label-caps text-stone-400">
            © 2024 ProofBuddy. Built for Scholarly Excellence.
          </p>
        </div>
      </footer>
    </div>
  );
}