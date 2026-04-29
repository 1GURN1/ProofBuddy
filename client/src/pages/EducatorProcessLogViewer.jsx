export default function EducatorProcessLogViewer() {
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col font-body-md">
      {/* TopNavBar */}
      <header className="bg-[#FAF9F6] dark:bg-stone-950 border-b border-[#E8E4DC] dark:border-stone-800 sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-10 py-4 max-w-[1440px] mx-auto">
          <div className="flex items-center gap-8">
            <a
              href="/"
              className="text-2xl font-serif font-bold text-[#1F3A2E] dark:text-emerald-400"
            >
              ProofBuddy
            </a>

            <nav className="hidden md:flex gap-6 items-center">
              <a
                className="text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors font-serif tracking-tight"
                href="/educator"
              >
                Dashboard
              </a>

              <a
                className="text-[#1F3A2E] dark:text-emerald-400 font-semibold border-b-2 border-[#1F3A2E] dark:border-emerald-500 pb-1 font-serif tracking-tight"
                href="/educator/review-report"
              >
                Reports
              </a>

              <a
                className="text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors font-serif tracking-tight"
                href="/educator/submissions/intake"
              >
                Library
              </a>

              <a
                className="text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors font-serif tracking-tight"
                href="#support"
              >
                Support
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/signup"
              className="px-4 py-2 text-sm font-medium text-on-surface border border-outline-variant rounded hover:bg-surface-container transition-all"
            >
              Login
            </a>

            <a
              href="/educator/submissions/intake"
              className="px-4 py-2 text-sm font-medium bg-primary-container text-on-primary-container rounded hover:opacity-80 transition-all"
            >
              Upload
            </a>
          </div>
        </div>
      </header>

      {/* Educator Read-Only Banner */}
      <div className="bg-primary-container text-on-primary-container px-6 py-3 flex items-center justify-between border-b border-[#E8E4DC]/10">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-xl">visibility</span>
          <span className="font-medium">
            Shared by <strong>Julian V. Aris</strong> • Read-only access.
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-label-caps uppercase tracking-wider opacity-70">
            Process Log ID: #PB-9921-X
          </span>

          <button className="bg-on-primary-container text-primary-container px-3 py-1 rounded text-xs font-bold hover:bg-white transition-colors">
            Add note about this review
          </button>
        </div>
      </div>

      <main className="flex-1 flex flex-col md:flex-row overflow-hidden max-w-[1440px] mx-auto w-full">
        {/* Left Sidebar: Authenticity Metrics */}
        <aside className="w-full md:w-[320px] bg-surface-container-low border-r border-[#E8E4DC] p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
          <div>
            <h3 className="font-h3 text-primary mb-1">
              Authenticity Score
            </h3>

            <div className="flex items-end gap-2">
              <span className="text-display-lg text-primary font-bold">
                98
              </span>
              <span className="text-body-md text-outline mb-2">/100</span>
            </div>

            <div className="w-full h-1 bg-[#E8E4DC] mt-2">
              <div className="h-full bg-primary-container w-[98%]"></div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-label-caps text-outline uppercase">
              Evidence Indicators
            </label>

            <EvidenceCard
              accentClass="bg-emerald-500"
              badgeClass="bg-emerald-50 text-emerald-700"
              badge="NATURAL RHYTHM"
              icon="verified_user"
              iconClass="text-emerald-600"
              quote="The nuanced shift in the author's tone suggests..."
              meta="BURSTINESS: HIGH • EDITING TIME: 14M"
            />

            <EvidenceCard
              accentClass="bg-amber-500"
              badgeClass="bg-amber-50 text-amber-700"
              badge="REVISION SPIKE"
              icon="history"
              iconClass="text-amber-600"
              quote="Contrary to popular belief, the architectural..."
              meta="DELETIONS: 42 • PAUSE DURATION: 124S"
            />
          </div>

          <div className="mt-auto pt-6 border-t border-[#E8E4DC]">
            <div className="flex items-center gap-3 mb-4">
              <img
                alt="Julian Aris profile"
                className="w-10 h-10 rounded-full object-cover grayscale"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC5Oc9GInogMKlbtGBhJ1YK5SumuZZCJsS5VT7R6Sih4eI0Kf-BNGUioHCNF44RRXCjMkNQmPyiVzTKMa1-hztQFjADXaf9xrge2f6ogBS4NdFfscyfAJ91VlZSXsStGrL-rR-u8bMZuhFol6IYxDt3FHkumMI-hqxcvUzIGAaRrR6XFTEOlwc2O34wzH0ibhcxp3pU8MrYRg7uDt58MKKUFFpZp7A6-McPopgS52qGkZrZOBKBF6YI6flNq0BdF0PTe52qVg_4fg"
              />

              <div>
                <p className="font-bold text-sm text-primary">
                  Julian V. Aris
                </p>
                <p className="text-xs text-outline">
                  Undergraduate Humanities
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <MiniMetric label="Total Time" value="04:12:08" />
              <MiniMetric label="Keystrokes" value="12,492" />
            </div>
          </div>
        </aside>

        {/* Main Content: Replay Viewer */}
        <section className="flex-1 flex flex-col bg-white overflow-hidden">
          {/* Playback Controls */}
          <div className="p-4 border-b border-[#E8E4DC] flex items-center justify-between bg-surface-container-lowest">
            <div className="flex items-center gap-4">
              <button className="material-symbols-outlined text-on-surface hover:text-primary transition-colors">
                fast_rewind
              </button>

              <button className="w-10 h-10 flex items-center justify-center bg-primary-container text-on-primary-container rounded-full hover:opacity-90 transition-all">
                <span className="material-symbols-outlined">play_arrow</span>
              </button>

              <button className="material-symbols-outlined text-on-surface hover:text-primary transition-colors">
                fast_forward
              </button>

              <div className="h-4 w-[1px] bg-[#E8E4DC]"></div>

              <span className="font-code text-sm text-outline">
                02:45 / 04:12
              </span>
            </div>

            <div className="flex items-center gap-6 flex-1 max-w-md mx-10">
              <div className="relative w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                <div className="absolute left-0 top-0 h-full bg-primary-container w-[65%]"></div>
                <div className="absolute left-[65%] top-1/2 -translate-y-1/2 w-3 h-3 bg-primary border-2 border-white rounded-full"></div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <select className="bg-transparent border-none text-xs font-label-caps text-outline focus:ring-0">
                <option>1.0x Speed</option>
                <option>2.0x Speed</option>
                <option>5.0x Speed</option>
              </select>

              <button className="material-symbols-outlined text-on-surface">
                fullscreen
              </button>
            </div>
          </div>

          {/* Document Text Canvas */}
          <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-[#FAF9F6]">
            <article className="max-w-content_max_width mx-auto bg-white p-12 shadow-sm border border-[#E8E4DC] min-h-screen">
              <h1 className="font-h1 text-primary text-4xl mb-8">
                The Linguistic Evolution of Scholarly Integrity
              </h1>

              <div className="font-editor-text text-on-surface space-y-6">
                <p>
                  In the digital era, the boundaries of authorship have become
                  increasingly porous. As we navigate the complex intersection of
                  human creativity and machine-assisted composition, the
                  traditional metrics of "originality" are being redefined. The
                  scholarly process, once a linear trajectory from research to
                  manuscript, is now a multi-dimensional weave of synthesis and
                  citation.
                </p>

                <p className="bg-emerald-50 border-l-4 border-emerald-500 py-1 px-4 -mx-4">
                  The shift towards{" "}
                  <span className="border-b-2 border-emerald-300">
                    collaborative intelligence
                  </span>{" "}
                  does not necessarily diminish individual contribution; rather,
                  it highlights the importance of transparency in the drafting
                  process. When we examine the keystroke-level evolution of a
                  paper, we see the true labor of thought—the pauses, the
                  revisions, and the meticulous refinement of ideas.
                </p>

                <p>
                  Previous studies have focused primarily on the final
                  artifact—the published paper. However, ProofBuddy shifts the
                  focus back to the <em>process</em>. By capturing the temporal
                  data of writing, educators can gain a visceral understanding of
                  how a student engages with complex subject matter. Is the
                  writing fluid, or is it punctuated by long periods of research?
                  Are technical terms integrated naturally, or do they appear as
                  abrupt blocks of copied text?
                </p>

                <p className="animate-pulse border-r-2 border-primary-container inline-block w-1 h-5 align-middle"></p>
              </div>
            </article>
          </div>
        </section>

        {/* Right Sidebar: Educator Insights */}
        <aside className="w-full md:w-[320px] bg-white border-l border-[#E8E4DC] flex flex-col">
          <div className="p-6 border-b border-[#E8E4DC]">
            <h3 className="font-h3 text-primary mb-4">Educator Notes</h3>

            <div className="space-y-4">
              <div className="p-4 bg-surface-container-low rounded border border-[#E8E4DC]/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-label-caps text-outline">
                    PROF. STERLING • 2M AGO
                  </span>

                  <button className="material-symbols-outlined text-xs text-outline">
                    more_vert
                  </button>
                </div>

                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Revision spike around the 2:15 mark shows genuine grappling
                  with the definition of "collaborative intelligence." Consistent
                  with Julian's verbal explanations in class.
                </p>
              </div>

              <button className="w-full py-3 px-4 border-2 border-dashed border-[#E8E4DC] text-outline text-xs font-medium hover:border-primary-container hover:text-primary transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">
                  add_comment
                </span>
                Add note at this timestamp
              </button>
            </div>
          </div>

          <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
            <h3 className="font-h3 text-primary mb-4">Activity Timeline</h3>

            <div className="relative pl-4 space-y-8 border-l border-[#E8E4DC]">
              <TimelineItem
                time="00:00:00"
                title="Session Started"
                description="Device: MacBook Air (Safari)"
                dotClass="bg-primary-container"
                titleClass="text-primary"
              />

              <TimelineItem
                time="01:14:22"
                title="High Velocity Typing"
                description="Introductory paragraphs completed."
                dotClass="bg-emerald-500"
                titleClass="text-primary"
              />

              <TimelineItem
                time="02:30:15"
                title="Extended Research Pause"
                description="12 minute break in activity."
                dotClass="bg-amber-500"
                titleClass="text-primary"
              />

              <TimelineItem
                time="04:12:08"
                title="Submission Finalized"
                dotClass="bg-primary-container opacity-40"
                titleClass="text-outline"
              />
            </div>
          </div>

          <div className="p-6 bg-surface-container-highest">
            <button className="w-full bg-primary text-white py-4 rounded-lg font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-all">
              <span className="material-symbols-outlined">verified</span>
              Mark as Verified
            </button>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer
        id="support"
        className="bg-[#FAF9F6] dark:bg-stone-950 border-t border-[#E8E4DC] dark:border-stone-800"
      >
        <div className="w-full max-w-[800px] mx-auto py-12 flex flex-col items-center gap-4 text-center">
          <nav className="flex gap-8">
            <FooterLink label="About" />
            <FooterLink label="Privacy" />
            <FooterLink label="Contact" />
            <FooterLink label="Terms" />
          </nav>

          <p className="font-sans text-xs uppercase tracking-widest text-stone-400">
            © 2024 ProofBuddy. Built for Scholarly Excellence.
          </p>
        </div>
      </footer>
    </div>
  );
}

function EvidenceCard({
  accentClass,
  badgeClass,
  badge,
  icon,
  iconClass,
  quote,
  meta,
}) {
  return (
    <div className="bg-white border border-[#E8E4DC] p-4 relative overflow-hidden">
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${accentClass}`}></div>

      <div className="flex justify-between items-start mb-2">
        <span
          className={`text-[10px] font-label-caps px-2 py-0.5 rounded-full ${badgeClass}`}
        >
          {badge}
        </span>

        <span className={`material-symbols-outlined text-sm ${iconClass}`}>
          {icon}
        </span>
      </div>

      <p className="font-editor-text text-sm italic text-on-surface-variant mb-2">
        "{quote}"
      </p>

      <div className="text-[10px] text-outline font-medium">{meta}</div>
    </div>
  );
}

function MiniMetric({ label, value }) {
  return (
    <div className="p-3 bg-white border border-[#E8E4DC] rounded">
      <p className="text-[10px] font-label-caps text-outline uppercase mb-1">
        {label}
      </p>

      <p className="font-code text-sm font-bold">{value}</p>
    </div>
  );
}

function TimelineItem({ time, title, description, dotClass, titleClass }) {
  return (
    <div className="relative">
      <div
        className={`absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full ring-4 ring-white ${dotClass}`}
      ></div>

      <p className="text-[10px] font-label-caps text-outline uppercase">
        {time}
      </p>

      <p className={`text-sm font-medium ${titleClass}`}>{title}</p>

      {description && <p className="text-xs text-outline">{description}</p>}
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