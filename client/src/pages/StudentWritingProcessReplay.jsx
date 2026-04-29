export default function StudentWritingProcessReplay() {
  return (
    <div className="min-h-screen flex flex-col font-body-md text-on-surface bg-[#F4F3EF]">
      {/* TopNavBar */}
      <header className="bg-[#FAF9F6] dark:bg-stone-950 border-b border-[#E8E4DC] dark:border-stone-800 z-50">
        <div className="flex justify-between items-center w-full px-10 py-4 max-w-[1440px] mx-auto">
          <a
            href="/"
            className="text-2xl font-h1 font-bold text-[#1F3A2E] dark:text-emerald-400"
          >
            ProofBuddy
          </a>

          <nav className="hidden md:flex gap-8 items-center">
            <a
              className="text-[#1F3A2E] dark:text-emerald-400 font-semibold border-b-2 border-[#1F3A2E] dark:border-emerald-500 pb-1 font-serif tracking-tight"
              href="/student/documents"
            >
              Dashboard
            </a>

            <a
              className="text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors font-serif tracking-tight"
              href="/student/documents"
            >
              Library
            </a>

            <a
              className="text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors font-serif tracking-tight"
              href="/student/report"
            >
              Reports
            </a>

            <a
              className="text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors font-serif tracking-tight"
              href="#support"
            >
              Support
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="/signup"
              className="px-4 py-2 border border-[#E8E4DC] text-[#1F3A2E] font-medium hover:bg-stone-50 transition-all active:scale-95"
            >
              Login
            </a>

            <a
              href="/student/documents/new"
              className="px-6 py-2 bg-primary-container text-on-primary font-medium shadow-sm hover:opacity-90 transition-all active:scale-95"
            >
              Upload
            </a>
          </div>
        </div>
      </header>

      <main className="flex-grow flex h-[calc(100vh-140px)] overflow-hidden">
        {/* Replay Canvas */}
        <section className="flex-grow flex flex-col items-center bg-surface-container-low relative">
          {/* Playback Controls Bar */}
          <div className="w-full bg-surface-container-high border-b border-outline-variant px-8 py-3 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-6">
              <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-variant transition-colors">
                <span className="material-symbols-outlined text-primary text-3xl">
                  play_arrow
                </span>
              </button>

              <div className="flex flex-col">
                <span className="font-code text-xs text-outline">
                  04:12 / 12:45
                </span>

                <div className="w-64 h-1 bg-outline-variant rounded-full mt-1 relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-1/3 bg-primary"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center bg-surface-container px-3 py-1 rounded border border-outline-variant">
                <span className="font-label-caps text-outline mr-2">
                  SPEED
                </span>
                <span className="font-code text-primary font-bold">1.5x</span>
                <span className="material-symbols-outlined text-primary ml-1 text-sm">
                  expand_more
                </span>
              </div>

              <div className="h-6 w-px bg-outline-variant"></div>

              <div className="flex items-center text-outline">
                <span className="material-symbols-outlined mr-1">
                  schedule
                </span>
                <span className="font-code text-sm">Oct 24, 2:14 PM</span>
              </div>
            </div>
          </div>

          {/* Document Canvas */}
          <div className="flex-grow w-full overflow-y-auto flex justify-center py-12 px-6">
            <div className="max-w-[800px] w-full bg-surface shadow-[0_4px_20px_rgba(26,26,26,0.04)] border border-[#E8E4DC] p-16 min-h-screen">
              <h1 className="font-h1 text-h1 text-primary mb-12">
                The Impact of Algorithmic Bias on Modern Sociological Frameworks
              </h1>

              <div className="font-editor-text text-editor-text text-on-surface space-y-6">
                <p>
                  In the contemporary digital landscape, the intersection of
                  sociology and computer science has birthed a critical area of
                  inquiry: algorithmic bias. As we delegate increasing amounts of
                  social governance to automated systems, we must ask if these
                  tools are neutral observers or active participants in the
                  reinforcement of existing power dynamics.
                </p>

                <p>
                  During the research phase, it became evident that{" "}
                  <span className="amber-highlight">
                    "data is never raw; it is cooked by the cultural biases of
                    its collection environment"
                  </span>{" "}
                  (Gitelman, 2013). This observation serves as the foundation for
                  my analysis of search engine heuristics.
                </p>

                <p>
                  To understand the trajectory of these systems, one must look at
                  the historical precedent of redlining—a practice that has been
                  digitally reconstituted through zip-code-based predictive
                  modeling. The transition from physical barriers to digital
                  filters represents a shift in methodology, not intent.
                </p>

                <div className="w-1 h-6 bg-primary animate-pulse inline-block align-middle ml-1"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Sidebar */}
        <aside className="w-[320px] bg-[#FAF9F6] border-l border-[#E8E4DC] flex flex-col p-6 overflow-y-auto">
          <div className="mb-8">
            <div className="font-label-caps text-outline mb-2">
              VERIFICATION STATUS
            </div>

            <div className="inline-flex items-center px-3 py-1 bg-primary-container/10 text-primary border border-primary/20 rounded-full">
              <span
                className="material-symbols-outlined text-sm mr-2"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              <span className="font-label-caps">
                Authentic writing pattern
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-surface border border-outline-variant rounded-lg">
              <div className="font-label-caps text-outline mb-1">
                AUTHENTICITY SCORE
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-display-lg font-h1 text-primary">
                  87
                </span>
                <span className="text-h3 font-h1 text-outline">/100</span>
              </div>

              <div className="w-full h-1 bg-outline-variant rounded-full mt-4">
                <div className="h-full bg-primary w-[87%]"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <ReplayStat
                icon="timer"
                label="Total time"
                value="12:45:02"
              />

              <ReplayStat
                icon="bolt"
                label="Active writing"
                value="08:22:15"
              />

              <div className="flex justify-between items-center py-3 border-b border-outline-variant">
                <div className="flex items-center gap-3 text-tertiary">
                  <span className="material-symbols-outlined">
                    content_paste
                  </span>
                  <span className="font-body-md">Paste events</span>
                </div>
                <span className="font-code font-bold">12</span>
              </div>
            </div>

            <div className="mt-8">
              <div className="font-label-caps text-outline mb-4">
                EVENT TIMELINE
              </div>

              <div className="relative pl-6 border-l border-outline-variant space-y-6">
                <TimelineItem
                  time="00:00:15"
                  title="Session Started"
                  dotClass="bg-primary"
                  titleClass="text-primary"
                />

                <TimelineItem
                  time="00:04:12"
                  title="External Quote Pasted"
                  description="Source matched: Gitelman (2013)"
                  dotClass="bg-tertiary"
                  titleClass="text-tertiary italic"
                />

                <TimelineItem
                  time="00:08:44"
                  title="Drafting Conclusion"
                  dotClass="bg-outline-variant"
                  titleClass="text-on-surface-variant"
                  muted
                />
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Bottom Action Bar */}
      <footer
        id="support"
        className="h-20 bg-surface border-t border-outline-variant flex items-center justify-center px-10"
      >
        <div className="w-full max-w-[1440px] flex justify-between items-center">
          <div className="flex items-center gap-4 text-outline">
            <span className="font-label-caps text-[10px]">
              EVIDENCE LOG ID: PB-992-AXL
            </span>
            <span className="w-1 h-1 bg-outline-variant rounded-full"></span>
            <span className="font-label-caps text-[10px]">
              ENCRYPTED WITH SHA-256
            </span>
          </div>

          <button className="flex items-center gap-2 px-8 py-3 bg-primary text-on-primary rounded font-body-md font-semibold hover:opacity-90 transition-all active:scale-95 shadow-md">
            <span className="material-symbols-outlined">picture_as_pdf</span>
            Export Process Log as PDF
          </button>

          <div className="flex gap-6">
            <span className="material-symbols-outlined text-outline cursor-pointer hover:text-primary transition-colors">
              share
            </span>
            <span className="material-symbols-outlined text-outline cursor-pointer hover:text-primary transition-colors">
              flag
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ReplayStat({ icon, label, value }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-outline-variant">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-outline">{icon}</span>
        <span className="font-body-md text-on-surface-variant">{label}</span>
      </div>

      <span className="font-code text-primary font-bold">{value}</span>
    </div>
  );
}

function TimelineItem({
  time,
  title,
  description,
  dotClass,
  titleClass,
  muted = false,
}) {
  return (
    <div className={`relative ${muted ? "opacity-50" : ""}`}>
      <div
        className={`absolute -left-[31px] top-1 w-3 h-3 rounded-full border-2 border-surface ${dotClass}`}
      ></div>

      <div className="text-xs font-code text-outline">{time}</div>

      <div className={`font-body-md font-medium ${titleClass}`}>{title}</div>

      {description && (
        <div className="text-xs text-outline mt-1 leading-relaxed">
          {description}
        </div>
      )}
    </div>
  );
}