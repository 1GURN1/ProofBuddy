export default function StudentMainEditor() {
  return (
    <div className="bg-background text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed">
      <div className="flex h-screen overflow-hidden">
        {/* SideNavBar */}
        <aside className="fixed left-0 top-0 h-full flex flex-col py-6 bg-[#FAF9F6] border-r border-[#E8E4DC] w-[240px] z-50">
          <div className="px-6 mb-8">
            <a href="/">
              <h1 className="text-xl font-serif font-black text-[#1F3A2E]">
                ProofBuddy
              </h1>
            </a>

            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-stone-400 mt-1">
              Academic Integrity
            </p>
          </div>

          <div className="px-4 mb-6">
            <a
              href="/student/documents/new"
              className="w-full bg-[#1F3A2E] text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium hover:opacity-90 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              <span>New Document</span>
            </a>
          </div>

          <nav className="flex-1 space-y-1">
            <SidebarItem active icon="description" label="All Documents" href="/student/documents" />
            <SidebarItem icon="folder" label="Folders" />
            <SidebarItem icon="label" label="Tags" />
            <SidebarItem icon="group" label="Shared" />
            <SidebarItem icon="archive" label="Archive" />
          </nav>

          <div className="mt-auto border-t border-[#E8E4DC] pt-6">
            <SidebarItem icon="settings" label="Settings" href="/settings" />
            <SidebarItem icon="help_outline" label="Help" />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-row ml-[240px]">
          {/* Editor Column */}
          <section className="flex-1 bg-white border-r border-[#E8E4DC] flex flex-col relative">
            {/* Editor Toolbar */}
            <div className="h-16 border-b border-[#E8E4DC] flex items-center justify-between px-10 bg-white/80 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-stone-400">
                  <span className="material-symbols-outlined text-sm">
                    history
                  </span>
                  <span className="font-label-caps text-label-caps">
                    SAVED 2M AGO
                  </span>
                </div>

                <div className="h-4 w-px bg-stone-200"></div>

                <div className="flex items-center gap-2 text-stone-400">
                  <span className="material-symbols-outlined text-sm">
                    menu_book
                  </span>
                  <span className="font-label-caps text-label-caps uppercase">
                    MLA 9TH EDITION
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-stone-400 bg-stone-50 px-3 py-1 rounded-full border border-stone-200">
                  <span className="font-label-caps text-label-caps">
                    1,248 WORDS
                  </span>
                </div>
              </div>
            </div>

            {/* Scrollable Canvas */}
            <div className="flex-1 overflow-y-auto pt-20 pb-40 editor-canvas">
              <article className="max-w-[800px] mx-auto px-10">
                <header className="mb-12">
                  <textarea
                    className="w-full font-h1 text-display-lg text-primary border-none focus:ring-0 p-0 resize-none bg-transparent placeholder:text-stone-200 leading-tight"
                    placeholder="Untitled Thesis Paper"
                    rows={2}
                    defaultValue="The Ethical Paradox of Algorithmic Governance in Higher Education"
                  />

                  <div className="mt-4 flex items-center gap-4">
                    <span className="bg-secondary-container/30 text-secondary px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border border-secondary-container/50">
                      Ethics & Policy
                    </span>

                    <span className="text-stone-400 font-label-caps text-label-caps">
                      DRAFT 4 • UPDATED OCT 24
                    </span>
                  </div>
                </header>

                <div className="font-editor-text text-editor-text text-on-surface-variant leading-relaxed">
                  <p className="mb-8">
                    As academic institutions increasingly pivot toward
                    data-driven decision-making, the intersection of student
                    privacy and institutional oversight has become a primary
                    field of ethical inquiry. The implementation of predictive
                    analytics and automated integrity monitoring represents a
                    fundamental shift in the pedagogical contract between teacher
                    and student.
                  </p>

                  <p className="mb-8">
                    One must consider the philosophical implications of
                    "surveillance pedagogy." When the primary interface of
                    learning is mediated by software that prioritizes detection
                    over development, the scholarly atmosphere risks becoming
                    one of suspicion rather than inquiry. This paper explores how
                    ProofBuddy's approach to academic integrity differs by
                    focusing on formative rather than punitive feedback.
                  </p>

                  <p className="mb-8 italic text-stone-500 border-l-2 border-stone-200 pl-6 my-12">
                    "The measure of a successful education is not the absence of
                    errors, but the presence of critical reflection upon them." —
                    Dr. Elena Vance, Digital Pedagogy Today.
                  </p>

                  <p className="mb-8">
                    Traditional methods of plagiarism detection often rely on
                    static database comparisons that fail to account for the
                    nuances of modern collaborative research. By contrast, an
                    integrated integrity workflow allows students to visualize
                    their source mapping in real-time, effectively turning a
                    "check" into a "learning moment."
                  </p>

                  <div className="bg-surface-container-low p-8 border border-[#E8E4DC] mb-8 relative group">
                    <div className="absolute -left-1 top-0 bottom-0 w-1 bg-primary"></div>

                    <p className="text-stone-400 font-label-caps text-label-caps mb-4">
                      SUGGESTED INSERTION
                    </p>

                    <p>
                      The transition from a gatekeeping model to a scaffolding
                      model requires a redesign of the user interface to
                      prioritize cognitive ease. In this context, Scholarly
                      Minimalism serves as the visual bridge between technical
                      rigor and human-centered design.
                    </p>
                  </div>

                  <p className="mb-8">
                    To conclude the introductory argument, it is necessary to
                    establish that technology in the classroom is never neutral.
                    It carries the biases of its creators and the intentions of
                    its implementers.
                  </p>
                </div>
              </article>
            </div>

            {/* Floating FAB */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
              <a
                href="/student/report"
                className="bg-[#1F3A2E] text-white px-8 py-4 rounded-full flex items-center gap-3 shadow-xl hover:scale-105 transition-transform active:scale-95 group"
              >
                <span className="font-label-caps text-sm font-bold tracking-widest uppercase">
                  Analyze
                </span>

                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </a>
            </div>
          </section>

          {/* Analysis Sidebar */}
          <aside className="w-[400px] bg-background flex flex-col h-full">
            {/* Tab Switcher */}
            <div className="grid grid-cols-4 border-b border-[#E8E4DC]">
              <TabButton active label="REPORT" />
              <TabButton label="OUTLINE" />
              <TabButton label="SOURCES" />
              <TabButton label="BRAINSTORM" />
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-h3 text-h3 text-primary">
                  Integrity Analysis
                </h3>

                <div className="flex flex-col items-end">
                  <span className="text-2xl font-serif font-bold text-primary">
                    12%
                  </span>
                  <span className="font-label-caps text-[9px] text-stone-400">
                    SIMILARITY SCORE
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-1 w-full bg-[#E8E4DC] rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[12%]"></div>
              </div>

              {/* Issue Cards */}
              <div className="space-y-4">
                <IssueCard
                  accentClass="bg-amber-400"
                  badgeClass="bg-amber-50 text-amber-700"
                  badge="MISSING CITATION"
                  excerpt='...intersection of student privacy and institutional oversight has become a primary field...'
                  description="This phrase shows strong similarity to research published in the 'Journal of Ethics (2022)'. Consider adding a citation."
                  showActions
                />

                <IssueCard
                  accentClass="bg-emerald-500"
                  badgeClass="bg-emerald-50 text-emerald-700"
                  badge="REPHRASING TIP"
                  excerpt='...pivot toward data-driven decision-making...'
                  description="You've used 'data-driven' three times in this section. Try 'empirical' or 'algorithmic'."
                />

                <IssueCard
                  accentClass="bg-stone-300"
                  badgeClass="bg-stone-50 text-stone-500"
                  badge="SOURCE MATCHED"
                  excerpt='"The measure of a successful education is not the absence of errors..."'
                  description="Properly attributed to Dr. Elena Vance."
                  muted
                  icon="check_circle"
                />
              </div>

              {/* Insight Card */}
              <div className="mt-12 p-6 bg-[#1F3A2E] text-white rounded-xl relative overflow-hidden">
                <div className="relative z-10">
                  <span className="material-symbols-outlined text-emerald-400 mb-2">
                    lightbulb
                  </span>

                  <h4 className="font-h3 text-lg mb-2">Writing Flow</h4>

                  <p className="text-emerald-100/70 text-xs leading-relaxed mb-4">
                    Your current sentence length average is 24 words, which is
                    perfect for complex academic arguments. Keep it up!
                  </p>

                  <a
                    href="/student/ai-detection-detail"
                    className="text-[10px] font-bold uppercase tracking-widest text-white border-b border-white/30 pb-1"
                  >
                    View Metrics
                  </a>
                </div>

                <div className="absolute -right-4 -bottom-4 opacity-10">
                  <span className="material-symbols-outlined text-[120px]">
                    auto_awesome
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="mt-auto py-6 flex flex-col items-center gap-2 text-center border-t border-[#E8E4DC]">
              <p className="font-sans text-[9px] uppercase tracking-widest text-stone-400">
                © 2024 ProofBuddy. Scholarly Excellence.
              </p>

              <div className="flex gap-4">
                <a
                  className="font-sans text-[9px] uppercase tracking-widest text-stone-400 hover:text-[#1F3A2E] transition-colors"
                  href="#"
                >
                  Terms
                </a>

                <a
                  className="font-sans text-[9px] uppercase tracking-widest text-stone-400 hover:text-[#1F3A2E] transition-colors"
                  href="#"
                >
                  Privacy
                </a>
              </div>
            </footer>
          </aside>
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active = false, href = "#" }) {
  const className = active
    ? "text-[#1F3A2E] font-bold bg-stone-100 rounded-r-full flex items-center gap-3 px-6 py-3 font-sans text-sm"
    : "text-stone-500 px-6 py-3 flex items-center gap-3 font-sans text-sm hover:bg-stone-50 transition-colors";

  return (
    <a href={href} className={className}>
      <span className="material-symbols-outlined">{icon}</span>
      <span>{label}</span>
    </a>
  );
}

function TabButton({ label, active = false }) {
  return (
    <button
      className={`py-4 font-label-caps text-[10px] tracking-tighter transition-colors ${
        active
          ? "text-primary font-bold border-b-2 border-primary bg-white"
          : "text-stone-400 hover:text-stone-600"
      }`}
    >
      {label}
    </button>
  );
}

function IssueCard({
  accentClass,
  badgeClass,
  badge,
  excerpt,
  description,
  showActions = false,
  muted = false,
  icon = "more_horiz",
}) {
  return (
    <div
      className={`bg-white border border-[#E8E4DC] p-5 relative overflow-hidden group hover:border-primary transition-colors cursor-pointer ${
        muted ? "opacity-60" : ""
      }`}
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${accentClass}`}></div>

      <div className="flex items-center justify-between mb-3">
        <span
          className={`${badgeClass} px-2 py-0.5 rounded-full font-label-caps text-[9px] font-bold`}
        >
          {badge}
        </span>

        <span className="material-symbols-outlined text-stone-300 text-sm">
          {icon}
        </span>
      </div>

      <p
        className={`font-editor-text text-sm italic mb-3 ${
          muted ? "text-stone-400" : "text-stone-600"
        }`}
      >
        {excerpt}
      </p>

      <p
        className={`text-xs leading-relaxed ${
          muted ? "text-stone-400" : "text-stone-500"
        }`}
      >
        {description}
      </p>

      {showActions && (
        <div className="mt-4 flex gap-2">
          <button className="flex-1 py-2 text-[10px] font-bold uppercase tracking-widest border border-[#E8E4DC] rounded hover:bg-stone-50 transition-colors">
            Ignore
          </button>

          <button className="flex-1 py-2 text-[10px] font-bold uppercase tracking-widest bg-primary text-white rounded hover:opacity-90 transition-all">
            Fix Now
          </button>
        </div>
      )}
    </div>
  );
}