const documents = [
  {
    title: "The Impact of Gothic Architecture on 19th Century Literature",
    date: "Oct 12, 2023",
    words: "2,450 words",
    ready: "Ready: 94/100",
    risk: "AI Risk: Low",
    accent: "bg-[#486457]",
    readyClass: "bg-primary-fixed text-on-primary-fixed-variant",
    riskClass: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  },
  {
    title: "Cognitive Dissonance in Modern Social Media Algorithms",
    date: "Oct 09, 2023",
    words: "1,200 words",
    ready: "Ready: 42/100",
    risk: "AI Risk: High",
    accent: "bg-[#ba1a1a]",
    readyClass: "bg-surface-container-highest text-outline",
    riskClass: "bg-tertiary-container text-tertiary-fixed",
  },
  {
    title: "Historical Perspective on Industrial Labor Movements",
    date: "Sep 28, 2023",
    words: "3,800 words",
    ready: "Ready: 78/100",
    risk: "AI Risk: None",
    accent: "bg-[#525d80]",
    readyClass: "bg-secondary-container text-on-secondary-container",
    riskClass: "bg-stone-100 text-outline",
  },
];

export default function StudentDocumentLibrary() {
  return (
    <div className="font-body-md text-on-surface bg-background min-h-screen flex overflow-hidden">
      {/* Left Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-[240px] flex flex-col py-6 bg-[#FAF9F6] border-r border-[#E8E4DC] z-30">
        <div className="px-6 mb-10">
          <a href="/" className="block">
            <h1 className="text-xl font-serif font-black text-[#1F3A2E]">
              ProofBuddy
            </h1>
          </a>
          <p className="font-label-caps text-[10px] text-primary mt-1 opacity-60">
            STUDENT EDITION
          </p>
        </div>

        <div className="px-4 mb-8">
          <a
            href="/student/documents/new"
            className="w-full flex items-center justify-center gap-2 bg-primary-container text-on-primary py-3 rounded hover:opacity-90 transition-all font-medium"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            New Document
          </a>
        </div>

        <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
          <div className="px-4 mb-4">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-outline text-sm">
                search
              </span>
              <input
                className="w-full pl-8 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-sm focus:ring-1 focus:ring-primary-container focus:border-primary-container outline-none transition-all"
                placeholder="Search"
                type="text"
              />
            </div>
          </div>

          <div className="space-y-1">
            <a
              className="text-[#1F3A2E] font-bold bg-stone-100 rounded-r-full px-4 py-2 flex items-center gap-3 transition-transform duration-150 active:scale-95"
              href="/student/documents"
            >
              <span className="material-symbols-outlined">description</span>
              <span className="font-sans text-sm font-medium">
                All Documents
              </span>
            </a>

            <div className="pt-4 pb-2 px-4">
              <span className="font-label-caps text-outline text-[10px] uppercase">
                Folders
              </span>
            </div>

            <SidebarLink icon="folder" label="ENGL 102" />
            <SidebarLink icon="folder" label="PSYC 240" />
            <SidebarLink icon="folder" label="HIST 110" />
          </div>

          <div className="pt-6 pb-2 px-4">
            <span className="font-label-caps text-outline text-[10px] uppercase">
              Tags
            </span>
          </div>

          <div className="px-4 flex flex-wrap gap-2">
            <Tag label="Final Draft" />
            <Tag label="Research" />
            <Tag label="In Progress" />
          </div>
        </nav>

        <div className="mt-auto px-4 space-y-1">
          <SidebarLink icon="settings" label="Settings" href="/settings" />
          <SidebarLink icon="help_outline" label="Help" />
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="ml-[240px] mr-[320px] flex-1 min-h-screen overflow-y-auto px-10 py-12">
        <div className="max-w-[800px] mx-auto">
          {/* Header Section */}
          <header className="mb-10 flex justify-between items-end">
            <div>
              <h2 className="font-h1 text-h1 text-primary">My Documents</h2>
              <p className="text-outline font-body-md mt-1">
                Refining academic excellence across 12 files.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1 text-sm font-medium text-stone-600 px-3 py-1.5 border border-outline-variant rounded hover:bg-stone-50 transition-colors">
                <span className="material-symbols-outlined text-sm">
                  filter_list
                </span>
                Sort by Recent
              </button>

              <button className="flex items-center gap-1 text-sm font-medium text-stone-600 px-3 py-1.5 border border-outline-variant rounded hover:bg-stone-50 transition-colors">
                <span className="material-symbols-outlined text-sm">
                  grid_view
                </span>
              </button>
            </div>
          </header>

          {/* Document Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {documents.map((doc) => (
              <DocumentCard key={doc.title} document={doc} />
            ))}

            {/* Empty State/New Doc Template */}
            <a
              href="/student/documents/new"
              className="group border-2 border-dashed border-[#E8E4DC] p-5 rounded-lg flex flex-col items-center justify-center text-center py-10 hover:border-primary-container transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-4xl text-outline-variant mb-2 group-hover:text-primary-container transition-colors">
                note_add
              </span>
              <p className="font-h3 text-primary opacity-50 group-hover:opacity-100">
                Start a new analysis
              </p>
              <p className="text-xs text-outline font-label-caps mt-1">
                DRAG & DROP OR BROWSE
              </p>
            </a>
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="fixed right-0 top-0 h-full w-[320px] bg-white border-l border-[#E8E4DC] flex flex-col z-30">
        <div className="p-6 border-b border-[#E8E4DC]">
          <h4 className="font-h2 text-h2 text-primary">Scholarly Insights</h4>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Activity Feed */}
          <section>
            <span className="font-label-caps text-[10px] text-outline uppercase block mb-4">
              Recent Activity
            </span>

            <div className="space-y-6">
              <ActivityItem
                icon="check_circle"
                iconClass="bg-primary-fixed text-on-primary-fixed"
                title="Final Report Exported"
                description="ENGL 102: Gothic Lit... was exported as PDF."
                time="2 HOURS AGO"
              />

              <ActivityItem
                icon="edit"
                iconClass="bg-secondary-fixed text-on-secondary-fixed"
                title="Citation Updated"
                description="Updated APA format for 'Cognitive Dissonance'."
                time="5 HOURS AGO"
              />
            </div>
          </section>

          {/* Tips Card */}
          <section className="bg-primary-container rounded-lg p-5 text-on-primary relative overflow-hidden">
            <div className="relative z-10">
              <span className="material-symbols-outlined text-primary-fixed-dim mb-3">
                lightbulb
              </span>

              <h5 className="font-h3 text-lg mb-2">Academic Tip</h5>

              <p className="font-body-md text-sm text-on-primary-container leading-relaxed">
                Studies show that peer-reviewing your own work after a 24-hour
                break increases "readiness score" by an average of 15%.
              </p>

              <button className="mt-4 text-xs font-bold uppercase tracking-widest text-primary-fixed hover:text-white transition-colors">
                Learn More →
              </button>
            </div>

            <div className="absolute -bottom-4 -right-4 opacity-10">
              <span className="material-symbols-outlined text-9xl">school</span>
            </div>
          </section>

          {/* Progress Card */}
          <section className="bg-background rounded-lg border border-[#E8E4DC] p-5">
            <span className="font-label-caps text-[10px] text-outline uppercase block mb-3">
              Goal Progress
            </span>

            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-primary">
                Midterm Submissions
              </span>
              <span className="text-xs font-bold text-primary">3 / 5</span>
            </div>

            <div className="h-1 bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-primary-container w-[60%]"></div>
            </div>

            <p className="text-[10px] text-outline mt-2 italic">
              You're 2 documents away from your weekly goal.
            </p>
          </section>
        </div>

        <div className="p-6 border-t border-[#E8E4DC] bg-surface-container-low">
          <div className="flex items-center gap-3">
            <img
              alt="User Avatar"
              className="w-10 h-10 rounded-full border border-outline-variant"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRetQcbx8AKCY8DXqvVfusGkqt07qNZe3VZjRQiFe-IjNC1H3dNiin_6W8IJYxJD6yrvjdTMuXLY7EHA8KegLzsq6zz1A8Lif3vrO5EkLgDrOqQm24l60U-TFz8jUA1yD5DaVO5SvFLg0F3Egjgf9nhIbzaSPkZOaXNOH7geg7MQvQTkE-1Q6W1B36hR11CDQJBHJRARnutaPNVqTCQAE9IH88t6yYK8z1lPJLoUYRzCH41Z2GJz03X1g2Nf6r3vgnWnsQ6N8NCP0"
            />

            <div>
              <p className="text-sm font-bold text-primary">
                Elena Rodriguez
              </p>
              <p className="text-xs text-outline">Standard Plan</p>
            </div>

            <button className="ml-auto material-symbols-outlined text-outline">
              logout
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

function SidebarLink({ icon, label, href = "#" }) {
  return (
    <a
      className="text-stone-500 hover:bg-stone-50 px-4 py-2 flex items-center gap-3 transition-colors"
      href={href}
    >
      <span className="material-symbols-outlined">{icon}</span>
      <span className="font-sans text-sm font-medium">{label}</span>
    </a>
  );
}

function Tag({ label }) {
  return (
    <span className="px-2 py-1 bg-stone-100 border border-outline-variant text-[10px] rounded uppercase font-semibold text-outline">
      {label}
    </span>
  );
}

function DocumentCard({ document }) {
  return (
    <a
      href="/student/editor"
      className="group bg-white border border-[#E8E4DC] p-5 rounded-lg hover:shadow-md transition-all cursor-pointer relative overflow-hidden"
    >
      <div className={`absolute top-0 left-0 w-1 h-full ${document.accent}`}></div>

      <div className="flex justify-between items-start mb-4">
        <h3 className="font-h3 text-h3 text-primary leading-tight group-hover:text-primary-container transition-colors">
          {document.title}
        </h3>

        <span className="material-symbols-outlined text-outline opacity-40">
          more_vert
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-4 text-xs font-label-caps text-outline">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">
              calendar_today
            </span>
            {document.date}
          </span>

          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">
              article
            </span>
            {document.words}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${document.readyClass}`}
          >
            {document.ready}
          </span>

          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${document.riskClass}`}
          >
            {document.risk}
          </span>
        </div>
      </div>
    </a>
  );
}

function ActivityItem({ icon, iconClass, title, description, time }) {
  return (
    <div className="flex gap-4">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${iconClass}`}
      >
        <span className="material-symbols-outlined text-sm">{icon}</span>
      </div>

      <div>
        <p className="text-sm font-medium text-primary">{title}</p>
        <p className="text-xs text-outline mt-0.5">{description}</p>
        <p className="text-[10px] text-outline-variant font-label-caps mt-1">
          {time}
        </p>
      </div>
    </div>
  );
}