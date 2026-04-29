export default function StudentReportPanel() {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex overflow-hidden">
      {/* Sidebar Navigation */}
      <nav className="fixed left-0 top-0 h-full flex flex-col py-6 bg-[#FAF9F6] border-r border-[#E8E4DC] w-[240px] z-50">
        <div className="px-6 mb-8 flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-container rounded flex items-center justify-center">
            <span
              className="material-symbols-outlined text-on-primary-container"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              school
            </span>
          </div>

          <div>
            <h1 className="text-xl font-serif font-black text-[#1F3A2E]">
              ProofBuddy
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-stone-500">
              Academic Integrity
            </p>
          </div>
        </div>

        <div className="flex-1 space-y-1">
          <a
            className="flex items-center gap-3 px-6 py-3 text-[#1F3A2E] font-bold bg-stone-100 rounded-r-full"
            href="/student/documents"
          >
            <span className="material-symbols-outlined">description</span>
            <span>All Documents</span>
          </a>

          <SidebarLink icon="folder" label="Folders" />
          <SidebarLink icon="label" label="Tags" />
          <SidebarLink icon="group" label="Shared" />
          <SidebarLink icon="archive" label="Archive" />
        </div>

        <div className="px-6 mb-6">
          <a
            href="/student/documents/new"
            className="w-full py-3 bg-[#1F3A2E] text-white rounded font-medium flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            New Document
          </a>
        </div>

        <div className="border-t border-[#E8E4DC] pt-4">
          <SidebarLink icon="settings" label="Settings" href="/settings" />
          <SidebarLink icon="help_outline" label="Help" />
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 ml-[240px] mr-[400px] bg-white relative overflow-y-auto p-12">
        <header className="max-w-[800px] mx-auto mb-12 flex justify-between items-end border-b border-stone-100 pb-6">
          <div>
            <span className="font-label-caps text-stone-400 uppercase tracking-widest block mb-2">
              Academic Essay / Philosophy 101
            </span>

            <h1 className="font-h1 text-on-surface">
              The Ethics of Artificial Intelligence in Modern Pedagogy
            </h1>
          </div>

          <div className="flex gap-2">
            <button className="p-2 border border-[#E8E4DC] rounded-lg hover:bg-stone-50">
              <span className="material-symbols-outlined">file_download</span>
            </button>

            <button className="p-2 border border-[#E8E4DC] rounded-lg hover:bg-stone-50">
              <span className="material-symbols-outlined">share</span>
            </button>
          </div>
        </header>

        <article className="max-w-[800px] mx-auto font-editor-text text-stone-800 leading-loose">
          <p className="mb-8">
            The integration of artificial intelligence into educational
            frameworks has sparked a profound debate regarding the nature of
            academic authorship and the preservation of critical thinking skills.
            As students increasingly leverage large language models to supplement
            their research and drafting processes, the traditional metrics of
            scholarly excellence are being called into question.
          </p>

          <p className="mb-8 bg-on-tertiary-container/10 border-b-2 border-on-tertiary-container px-1">
            It is essential to consider that the algorithmic generation of text
            does not equate to the organic synthesis of knowledge. While a
            machine can parse vast datasets and produce grammatically impeccable
            prose, it lacks the lived experience and ethical weight that
            characterizes human inquiry.
          </p>

          <p className="mb-8">
            Furthermore, the "black box" nature of deep learning systems
            introduces a layer of opacity into the research process. When a
            student relies on an AI to summarize a complex philosophical
            treatise, they are not merely outsourcing the labor of reading; they
            are outsourcing the act of interpretation itself.
          </p>
        </article>
      </main>

      {/* Right Sidebar: Report Panel */}
      <aside className="fixed right-0 top-0 h-full w-[400px] bg-[#FAF9F6] border-l border-[#E8E4DC] flex flex-col overflow-hidden shadow-sm">
        {/* Header: Score & Quick Status */}
        <div className="p-8 pb-6 border-b border-[#E8E4DC] bg-white">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-h2 text-[#1F3A2E]">Analysis Report</h2>
            <span className="font-label-caps text-stone-400">
              LAST SYNC: 2M AGO
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full circular-progress flex items-center justify-center mb-6 relative">
              <div className="text-center">
                <span className="block font-h1 text-4xl leading-none text-[#1F3A2E]">
                  88
                </span>
                <span className="font-label-caps text-[10px] text-stone-500 uppercase tracking-tighter">
                  Readiness
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <StatusDot label="GRAM" color="bg-emerald-500" />
              <StatusDot label="STYLE" color="bg-emerald-500" />
              <StatusDot label="AI" color="bg-yellow-500" />
              <StatusDot label="STRUC" color="bg-emerald-500" />
              <StatusDot label="CITE" color="bg-stone-300" />
            </div>
          </div>
        </div>

        {/* Scrollable Sections */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* AI Detection Risk Accordion */}
          <section className="bg-white border border-[#E8E4DC] rounded-xl overflow-hidden">
            <button className="w-full p-4 flex items-center justify-between hover:bg-stone-50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-stone-400">
                  robot_2
                </span>
                <span className="font-h3 text-base">AI Detection Risk</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-100 uppercase">
                  Low
                </span>
                <span className="font-h3 text-base text-stone-400">34</span>
                <span className="material-symbols-outlined text-stone-400">
                  expand_more
                </span>
              </div>
            </button>

            <div className="px-4 pb-4">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-stone-50 rounded">
                  <span className="font-label-caps text-[10px] text-stone-400 block mb-1">
                    BURSTINESS
                  </span>

                  <div className="flex items-end gap-1 h-6">
                    <div className="w-1 h-3 bg-stone-200"></div>
                    <div className="w-1 h-5 bg-stone-200"></div>
                    <div className="w-1 h-2 bg-stone-200"></div>
                    <div className="w-1 h-6 bg-[#1F3A2E]"></div>
                    <div className="w-1 h-4 bg-stone-200"></div>
                  </div>
                </div>

                <div className="p-3 bg-stone-50 rounded">
                  <span className="font-label-caps text-[10px] text-stone-400 block mb-1">
                    PERPLEXITY
                  </span>
                  <span className="font-code text-xs font-bold text-[#1F3A2E]">
                    124.8
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center text-[11px] text-stone-500 pt-2 border-t border-stone-100">
                <span>Predictability Index</span>
                <span className="font-medium text-on-surface">
                  12% High Risk
                </span>
              </div>
            </div>
          </section>

          {/* Grammar Issues */}
          <section className="bg-white border border-[#E8E4DC] rounded-xl overflow-hidden">
            <button className="w-full p-4 flex items-center justify-between bg-stone-50/50">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-stone-400">
                  spellcheck
                </span>
                <span className="font-h3 text-base">Grammar</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-h3 text-base text-stone-400">2</span>
                <span className="material-symbols-outlined text-stone-400">
                  expand_less
                </span>
              </div>
            </button>

            <div className="p-3 space-y-3">
              <IssueCard
                severityClass="bg-yellow-500"
                label="Subject-Verb Agreement"
                labelClass="text-yellow-700"
                textPrefix='...the generation of text '
                highlighted="do not equate"
                highlightClass="bg-yellow-100 border-b border-yellow-500"
                textSuffix=" to the..."
                suggestion="does not equate"
              />

              <IssueCard
                severityClass="bg-red-500"
                label="Punctuation Error"
                labelClass="text-red-700"
                textPrefix="...modern pedagogy"
                highlighted=". The"
                highlightClass="bg-red-100 border-b border-red-500"
                textSuffix=" integration..."
                suggestion="; the"
              />
            </div>
          </section>

          {/* Style Accordion */}
          <section className="bg-white border border-[#E8E4DC] rounded-xl overflow-hidden">
            <button className="w-full p-4 flex items-center justify-between hover:bg-stone-50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-stone-400">
                  auto_fix_high
                </span>
                <span className="font-h3 text-base">Style</span>
              </div>

              <div className="flex items-center gap-3 text-stone-400">
                <span className="font-h3 text-base">0</span>
                <span className="material-symbols-outlined">check_circle</span>
              </div>
            </button>
          </section>

          {/* Structure Accordion */}
          <section className="bg-white border border-[#E8E4DC] rounded-xl overflow-hidden">
            <button className="w-full p-4 flex items-center justify-between hover:bg-stone-50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-stone-400">
                  account_tree
                </span>
                <span className="font-h3 text-base">Structure</span>
              </div>

              <span className="material-symbols-outlined text-stone-400">
                expand_more
              </span>
            </button>

            <div className="px-4 pb-4 space-y-3">
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-stone-100 text-stone-600 text-[10px] rounded border border-stone-200">
                  INTRODUCTORY HOOK
                </span>
                <span className="px-2 py-1 bg-stone-100 text-stone-600 text-[10px] rounded border border-stone-200">
                  CONTEXTUAL BRIDGE
                </span>
              </div>

              <div className="p-3 border border-emerald-100 bg-emerald-50/30 rounded">
                <span className="font-label-caps text-[9px] text-emerald-700 block mb-1">
                  THESIS ALIGNMENT
                </span>

                <p className="text-[11px] text-stone-700 leading-relaxed">
                  Strong alignment detected in paragraph 2. Supports primary
                  claim about human inquiry vs machine labor.
                </p>
              </div>
            </div>
          </section>

          {/* Citations Accordion */}
          <section className="bg-white border border-[#E8E4DC] rounded-xl overflow-hidden">
            <button className="w-full p-4 flex items-center justify-between hover:bg-stone-50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-stone-400">
                  format_quote
                </span>
                <span className="font-h3 text-base">Citations</span>
              </div>

              <div className="flex items-center gap-3 text-red-500">
                <span className="font-h3 text-base">1</span>
                <span className="material-symbols-outlined">error</span>
              </div>
            </button>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-white border-t border-[#E8E4DC]">
          <button className="w-full py-4 bg-[#1F3A2E] text-white font-semibold rounded shadow-lg flex items-center justify-center gap-3 hover:opacity-90 transition-all active:scale-95">
            <span className="material-symbols-outlined">refresh</span>
            Re-analyze Document
          </button>

          <p className="text-[10px] text-center text-stone-400 mt-4 uppercase tracking-widest">
            Powered by ProofBuddy Engine v4.2
          </p>
        </div>
      </aside>
    </div>
  );
}

function SidebarLink({ icon, label, href = "#" }) {
  return (
    <a
      className="flex items-center gap-3 px-6 py-3 text-stone-500 hover:bg-stone-50 transition-colors"
      href={href}
    >
      <span className="material-symbols-outlined">{icon}</span>
      <span>{label}</span>
    </a>
  );
}

function StatusDot({ label, color }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-2.5 h-2.5 rounded-full ${color}`}></div>
      <span className="font-label-caps text-[9px] text-stone-500">
        {label}
      </span>
    </div>
  );
}

function IssueCard({
  severityClass,
  label,
  labelClass,
  textPrefix,
  highlighted,
  highlightClass,
  textSuffix,
  suggestion,
}) {
  return (
    <div className="relative bg-white border border-[#E8E4DC] p-4 pl-6 rounded shadow-sm hover:shadow-md transition-shadow">
      <div className={`issue-card-severity ${severityClass}`}></div>

      <span
        className={`font-label-caps text-[10px] block mb-2 uppercase ${labelClass}`}
      >
        {label}
      </span>

      <p className="font-editor-text text-sm italic text-stone-600 mb-2">
        {textPrefix}
        <span
          className={`${highlightClass} text-on-background px-0.5`}
        >
          {highlighted}
        </span>
        {textSuffix}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-stone-400">
          Suggestion:{" "}
          <span className="text-emerald-600 font-bold">{suggestion}</span>
        </span>

        <button className="text-xs font-bold text-[#1F3A2E] hover:underline">
          Apply
        </button>
      </div>
    </div>
  );
}