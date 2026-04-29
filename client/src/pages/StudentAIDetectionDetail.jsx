export default function StudentAIDetectionDetail() {
  return (
    <div className="bg-surface text-on-surface font-body-md antialiased overflow-x-hidden min-h-screen">
      {/* Header Navigation Shell */}
      <header className="bg-[#FAF9F6] border-b border-[#E8E4DC] fixed top-0 w-full z-50">
        <div className="flex justify-between items-center w-full px-10 py-4 max-w-[1440px] mx-auto">
          <div className="flex items-center gap-4">
            <a
              href="/student/report"
              className="flex items-center text-stone-500 hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </a>

            <div className="font-h2 text-primary">ProofBuddy</div>
          </div>

          <div className="flex items-center gap-8">
            <div className="font-label-caps text-stone-400">
              DOCUMENT ID: PB-8921-X
            </div>

            <button className="bg-primary-container text-on-primary-container px-6 py-2 rounded-lg font-label-caps tracking-widest hover:opacity-80 transition-all">
              EXPORT PDF
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="pt-[80px] min-h-screen max-w-[1440px] mx-auto flex flex-col md:flex-row">
        {/* Left Analysis Pane */}
        <aside className="w-full md:w-[400px] border-r border-[#E8E4DC] p-gutter bg-surface-container-low overflow-y-auto max-h-screen sticky top-[80px]">
          {/* Score Gauge */}
          <div className="flex flex-col items-center justify-center mb-stack_lg">
            <div className="relative w-[180px] h-[180px] flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="90"
                  cy="90"
                  fill="transparent"
                  r="80"
                  stroke="#E8E4DC"
                  strokeWidth="8"
                ></circle>
                <circle
                  cx="90"
                  cy="90"
                  fill="transparent"
                  r="80"
                  stroke="#1F3A2E"
                  strokeDasharray="502.6"
                  strokeDashoffset="331.7"
                  strokeLinecap="round"
                  strokeWidth="8"
                ></circle>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display-lg text-primary">34</span>
                <span className="font-label-caps text-stone-400">OF 100</span>
              </div>
            </div>

            <div className="mt-4 text-center">
              <div className="font-h3 text-primary-container">Low Risk</div>
              <p className="font-body-md text-stone-500">
                Typical academic signature detected.
              </p>
            </div>
          </div>

          {/* Metrics Bento Grid */}
          <div className="grid grid-cols-1 gap-stack_sm">
            <MetricCard title="Burstiness" icon="analytics">
              <div className="h-12 w-full flex items-end gap-1">
                <div className="bg-[#E8E4DC] w-full h-[60%]"></div>
                <div className="bg-[#1F3A2E] w-full h-[100%]"></div>
                <div className="bg-[#E8E4DC] w-full h-[40%]"></div>
                <div className="bg-[#E8E4DC] w-full h-[80%]"></div>
                <div className="bg-[#1F3A2E] w-full h-[20%]"></div>
                <div className="bg-[#E8E4DC] w-full h-[55%]"></div>
              </div>

              <p className="mt-2 text-xs text-stone-500 italic">
                High variation in sentence length suggests human authorship.
              </p>
            </MetricCard>

            <div className="bg-surface-container-lowest p-4 rounded border border-[#E8E4DC] editorial-shadow">
              <div className="flex justify-between items-center mb-1">
                <span className="font-label-caps text-stone-400 uppercase">
                  Perplexity
                </span>
                <span className="font-h3 text-primary">72.4</span>
              </div>

              <div className="w-full bg-[#E8E4DC] h-1 rounded-full">
                <div className="bg-primary-container h-full w-[72%] rounded-full"></div>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-4 rounded border border-[#E8E4DC] editorial-shadow">
              <span className="font-label-caps text-stone-400 uppercase block mb-3">
                Common AI Phrases
              </span>

              <div className="flex flex-wrap gap-2">
                <PhraseTag label="Delve" active />
                <PhraseTag label="Crucial" />
                <PhraseTag label="Landscape" />
                <PhraseTag label="Underscores" active />
              </div>
            </div>

            <div className="bg-surface-container-lowest p-4 rounded border border-[#E8E4DC] editorial-shadow">
              <div className="flex justify-between items-center">
                <span className="font-label-caps text-stone-400 uppercase">
                  Em-Dash Density
                </span>
                <span className="font-code text-primary">1.2 / pg</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Center Document View */}
        <section className="flex-1 bg-white p-container_padding overflow-y-auto">
          <div className="max-w-content_max_width mx-auto">
            <header className="mb-stack_lg border-b border-[#E8E4DC] pb-stack_md">
              <h1 className="font-h1 text-primary mb-2">
                The Ethics of Artificial Intelligence in Modern Pedagogy
              </h1>

              <div className="flex items-center gap-4">
                <span className="font-label-caps text-stone-400">
                  AUTHOR: Jane Doe
                </span>
                <span className="font-label-caps text-stone-400">
                  WORDS: 1,420
                </span>
              </div>
            </header>

            <article className="font-editor-text text-stone-800 space-y-stack_md">
              <div className="severity-low pl-stack_sm">
                <p>
                  The integration of Large Language Models (LLMs) into the
                  academic environment has sparked a profound debate regarding
                  the future of intellectual property and the very nature of
                  learning. While some argue that these tools represent the next
                  logical step in human-computer interaction, others maintain
                  that they threaten to undermine the critical thinking skills
                  that form the bedrock of higher education. This dichotomy
                  underscores a pivotal moment in our technological evolution.
                </p>
              </div>

              <div className="severity-med pl-stack_sm bg-secondary-container/10 p-2 rounded">
                <p>
                  In this digital landscape, it is crucial to delve into the
                  mechanisms by which students engage with these platforms. The
                  inherent complexity of LLMs allows for a seamless generation of
                  content that often mimics the nuances of human prose, yet
                  frequently lacks the authentic voice and lived experience that
                  characterizes genuine scholarly inquiry. This lack of
                  authenticity is what detection systems aim to identify by
                  analyzing patterns of perplexity and burstiness within the
                  text.
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm">
                    info
                  </span>
                  <span className="font-label-caps text-secondary text-[10px]">
                    ELEVATED PREDICTABILITY IN THIS SECTION
                  </span>
                </div>
              </div>

              <div className="severity-low pl-stack_sm">
                <p>
                  Furthermore, the ethical implications extend beyond mere
                  plagiarism. There is a growing concern about the homogenization
                  of thought, as AI models tend to produce outputs based on the
                  most statistically probable sequence of words, rather than
                  challenging existing paradigms. If the academic community
                  begins to rely too heavily on these systems, we risk entering
                  an era of intellectual stagnation where the synthesis of ideas
                  is replaced by the regurgitation of data.
                </p>
              </div>

              <div className="severity-low pl-stack_sm">
                <p>
                  To mitigate these risks, educational institutions must develop
                  robust frameworks that encourage the responsible use of AI
                  while reinforcing the value of independent thought. This
                  requires a multi-faceted approach involving pedagogical shifts,
                  technological safeguards, and a renewed emphasis on the process
                  of writing rather than merely the final product. By focusing on
                  the journey of inquiry, we can ensure that students remain the
                  primary architects of their own intellectual development.
                </p>
              </div>
            </article>

            <footer className="mt-stack_lg pt-stack_md border-t border-[#E8E4DC]">
              <div className="flex items-start gap-4 p-4 bg-secondary-fixed/30 rounded border border-secondary-container">
                <span className="material-symbols-outlined text-secondary">
                  warning
                </span>

                <div className="space-y-1">
                  <p className="font-label-caps text-secondary font-bold">
                    Cautionary Note on Interpretation
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    AI detection is probabilistic, not deterministic. High
                    perplexity scores or detection of specific keywords do not
                    constitute definitive proof of machine generation. Use this
                    analysis as a guide for editorial refinement and academic
                    honesty checks. False positives can occur in highly
                    structured or technical writing.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </section>

        {/* Right Suggestions Sidebar */}
        <aside className="w-full md:w-[320px] bg-surface p-gutter border-l border-[#E8E4DC] overflow-y-auto">
          <h2 className="font-h3 text-primary mb-stack_md">
            Score Optimization
          </h2>

          <div className="space-y-stack_md">
            <div className="space-y-stack_sm">
              <h4 className="font-label-caps text-stone-400">
                LOWER YOUR RISK
              </h4>

              <SuggestionCard
                icon="edit_note"
                title="Vary Sentence Length"
                text='Your second paragraph contains several sentences of identical length. Break them up to increase "Burstiness."'
              />

              <SuggestionCard
                icon="auto_fix"
                title="Replace Buzzwords"
                text='Terms like "Delve" and "Crucial" are high-frequency tokens for AI. Use "Examine" or "Essential" instead.'
              />

              <SuggestionCard
                icon="history_edu"
                title="Inject Personal Voice"
                text="Adding a specific personal anecdote or localized context often disrupts AI pattern matching."
              />
            </div>

            <div className="pt-stack_md">
              <img
                className="w-full h-48 object-cover rounded border border-[#E8E4DC]"
                alt="Fountain pen on academic papers"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmz7FPnGHqdiUklXo0PNM_-tu6Ki609clDcR_EAR_UU4PnBVF2EQ308K84-gcw4mm5vsdju0nbouHZvbJKAwYcU6F_YZZklLLKV-n3dqW0WAlhL0RGMCuRAiFmBhJN6xJ5uxrkdMqFUZimSWAGjfZrQ_YSqtPp1T7jPcPq7ajfUzSrpsboIQ8vjiItgOr7_YWiSsRNFuFAxqOIg1i_lHRQrgCUnetUZgekiFUd_dI7FYMW6BOWv7oh1gh1FTvX8WprfhoLGBw7UNQ"
              />

              <div className="mt-stack_sm p-4 bg-primary-container text-on-primary-container rounded">
                <p className="text-[10px] font-label-caps mb-1">PRO TIP</p>
                <p className="text-xs italic leading-relaxed">
                  “True academic voice is found in the unexpected choice of a
                  verb.” — Scholarly Review Board
                </p>
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Success Toast - hidden by default */}
      <div className="fixed bottom-gutter left-1/2 -translate-x-1/2 bg-on-background text-white px-6 py-3 rounded-full flex items-center gap-3 editorial-shadow z-[100] opacity-0 pointer-events-none">
        <span className="material-symbols-outlined text-emerald-400">
          check_circle
        </span>
        <span className="font-label-caps">Analysis Refresh Complete</span>
      </div>
    </div>
  );
}

function MetricCard({ title, icon, children }) {
  return (
    <div className="bg-surface-container-lowest p-4 rounded border border-[#E8E4DC] editorial-shadow">
      <div className="flex justify-between items-center mb-2">
        <span className="font-label-caps text-stone-400 uppercase">
          {title}
        </span>
        <span className="material-symbols-outlined text-primary-container">
          {icon}
        </span>
      </div>

      {children}
    </div>
  );
}

function PhraseTag({ label, active = false }) {
  return (
    <span
      className={`px-2 py-1 text-[10px] font-semibold rounded uppercase ${
        active
          ? "bg-secondary-container text-on-secondary-container"
          : "bg-surface-container-high text-stone-500"
      }`}
    >
      {label}
    </span>
  );
}

function SuggestionCard({ icon, title, text }) {
  return (
    <div className="group p-4 bg-white border border-[#E8E4DC] rounded editorial-shadow transition-all hover:border-primary-container">
      <div className="flex items-center gap-2 mb-2">
        <span className="material-symbols-outlined text-primary-container text-lg">
          {icon}
        </span>
        <span className="font-body-md font-semibold text-primary">
          {title}
        </span>
      </div>

      <p className="text-xs text-stone-500">{text}</p>
    </div>
  );
}