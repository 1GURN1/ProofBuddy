const docs = [
  { id: "doc_001", title: "Thesis Draft V2", course: "ENGL 102", updated: "Oct 14, 2024", status: "In Progress", risk: null },
  { id: "doc_002", title: "Ethics Essay", course: "PHIL 302", updated: "Oct 11, 2024", status: "Submitted", risk: "low" },
  { id: "doc_003", title: "Lab Analysis Report", course: "PSYC 240", updated: "Oct 8, 2024", status: "Reviewed", risk: "medium" },
];

const statusStyles = {
  "In Progress": "bg-blue-50 text-blue-700",
  "Submitted": "bg-emerald-50 text-emerald-700",
  "Reviewed": "bg-purple-50 text-purple-700",
};

const riskStyles = {
  low: "bg-emerald-50 text-emerald-700",
  medium: "bg-[#FFF4E5] text-[#B45309]",
  high: "bg-red-50 text-red-700",
};

export default function StudentDocumentLibrary() {
  return (
    <div className="font-body-md text-on-surface min-h-screen bg-[#FAF9F6]">
      <div className="flex min-h-screen">
        <aside className="fixed left-0 top-0 h-full w-[240px] flex flex-col py-6 bg-[#FAF9F6] border-r border-[#E8E4DC] z-50">
          <div className="px-6 mb-8">
            <a href="/" className="text-xl font-serif font-black text-[#1F3A2E] block">ProofBuddy</a>
            <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary/10 text-primary font-label-caps text-[10px] uppercase tracking-wider mt-1">Student</div>
          </div>
          <div className="px-4 mb-8">
            <a href="/student/documents/new" className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary py-3 rounded-xl font-body-md font-semibold transition-transform duration-150 active:scale-95 shadow-sm">
              <span className="material-symbols-outlined text-sm">add</span> New Document
            </a>
          </div>
          <nav className="flex-1 space-y-1">
            <div className="px-6 py-2"><span className="font-label-caps text-stone-400 uppercase text-[10px]">Library</span></div>
            <a className="text-primary font-bold bg-stone-100 rounded-r-full px-4 py-2 flex items-center gap-3 transition-colors" href="/student/documents">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>description</span> All Documents
            </a>
            <a className="text-stone-500 hover:bg-stone-50 px-4 py-2 flex items-center gap-3 transition-colors" href="#">
              <span className="material-symbols-outlined">folder</span> Folders
            </a>
            <a className="text-stone-500 hover:bg-stone-50 px-4 py-2 flex items-center gap-3 transition-colors" href="#">
              <span className="material-symbols-outlined">label</span> Tags
            </a>
            <a className="text-stone-500 hover:bg-stone-50 px-4 py-2 flex items-center gap-3 transition-colors" href="#">
              <span className="material-symbols-outlined">archive</span> Archive
            </a>
          </nav>
          <div className="mt-auto px-4 pt-4 border-t border-[#E8E4DC] space-y-1">
            <a className="text-stone-500 hover:bg-stone-50 px-4 py-2 flex items-center gap-3 transition-colors" href="/settings">
              <span className="material-symbols-outlined">settings</span> Settings
            </a>
            <a className="text-stone-500 hover:bg-stone-50 px-4 py-2 flex items-center gap-3 transition-colors" href="#">
              <span className="material-symbols-outlined">help_outline</span> Help
            </a>
          </div>
        </aside>

        <main className="flex-1 ml-[240px] px-10 py-12">
          <div className="max-w-[800px] mx-auto">
            <header className="mb-8">
              <p className="font-label-caps text-stone-400 mb-2">DOCUMENT LIBRARY</p>
              <h1 className="font-h1 text-primary">My Documents</h1>
              <p className="font-body-md text-stone-500 mt-1">All your academic writing in one place.</p>
            </header>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 flex items-center gap-2 bg-white border border-[#E8E4DC] rounded-lg px-4 py-2">
                <span className="material-symbols-outlined text-stone-400">search</span>
                <input className="flex-1 outline-none text-sm text-on-surface bg-transparent placeholder:text-stone-400" placeholder="Search documents..." />
              </div>
              <button className="flex items-center gap-2 border border-[#E8E4DC] bg-white px-4 py-2 rounded-lg text-sm text-stone-600 hover:bg-stone-50 transition-colors">
                <span className="material-symbols-outlined text-[18px]">filter_list</span> Filter
              </button>
            </div>

            <div className="bg-white border border-[#E8E4DC] rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50/50 border-b border-[#E8E4DC]">
                    {["TITLE","COURSE","LAST UPDATED","STATUS","INTEGRITY"].map(h => (
                      <th key={h} className="px-6 py-4 font-label-caps text-stone-400 text-[10px]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E4DC]">
                  {docs.map(doc => (
                    <tr key={doc.id} className="hover:bg-stone-50/30 transition-colors cursor-pointer" onClick={() => window.location.href = "/student/editor"}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-stone-400 text-[20px]">description</span>
                          <span className="font-medium text-stone-900">{doc.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-stone-500">{doc.course}</td>
                      <td className="px-6 py-4 text-sm text-stone-500">{doc.updated}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-label-caps text-[10px] ${statusStyles[doc.status]}`}>{doc.status.toUpperCase()}</span>
                      </td>
                      <td className="px-6 py-4">
                        {doc.risk
                          ? <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-label-caps text-[10px] ${riskStyles[doc.risk]}`}>{doc.risk.toUpperCase()}</span>
                          : <span className="text-stone-300 text-xs">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 text-center">
              <a href="/student/documents/new" className="inline-flex items-center gap-2 text-primary font-medium hover:underline text-sm">
                <span className="material-symbols-outlined text-[18px]">add_circle</span> Start a new document
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
