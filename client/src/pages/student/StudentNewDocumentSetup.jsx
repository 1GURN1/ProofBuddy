import { useState } from "react";

export default function StudentNewDocumentSetup() {
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [docType, setDocType] = useState("essay");

  const docTypes = [
    { id: "essay", label: "Essay", icon: "article", desc: "Argumentative or analytical writing." },
    { id: "research", label: "Research Paper", icon: "science", desc: "Citation-heavy academic research." },
    { id: "lab", label: "Lab Report", icon: "biotech", desc: "Empirical findings and methodology." },
    { id: "creative", label: "Creative Writing", icon: "draw", desc: "Fiction, poetry, or narrative work." },
  ];

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex items-center justify-center p-6">
      <main className="w-full max-w-[560px]">
        <div className="mb-8 text-center">
          <a href="/" className="text-2xl font-serif font-bold text-[#1F3A2E]">ProofBuddy</a>
        </div>

        <div className="bg-white border border-outline-variant rounded-xl p-8 shadow-sm">
          <header className="mb-8">
            <h1 className="font-h1 text-h1 text-primary mb-2">New Document</h1>
            <p className="font-body-md text-stone-500">Set up your document so ProofBuddy can track your writing process from the start.</p>
          </header>

          <form
            className="space-y-6"
            onSubmit={e => { e.preventDefault(); window.location.href = "/student/editor"; }}
          >
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-stone-400 text-[11px] uppercase tracking-widest">Document Title</label>
              <input
                className="bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-surface outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                placeholder="e.g. Comparative Analysis of Romantic Poetry"
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-stone-400 text-[11px] uppercase tracking-widest">Course</label>
              <input
                className="bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-surface outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                placeholder="e.g. ENGL 102"
                type="text"
                value={course}
                onChange={e => setCourse(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="font-label-caps text-stone-400 text-[11px] uppercase tracking-widest">Document Type</label>
              <div className="grid grid-cols-2 gap-3">
                {docTypes.map(t => (
                  <label key={t.id} className="cursor-pointer">
                    <input
                      type="radio"
                      name="docType"
                      value={t.id}
                      checked={docType === t.id}
                      onChange={() => setDocType(t.id)}
                      className="sr-only"
                    />
                    <div className={`p-4 border rounded-xl transition-all ${docType === t.id ? "border-primary bg-stone-50" : "border-outline-variant hover:border-stone-300"}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-[20px] text-primary">{t.icon}</span>
                        <span className="font-medium text-sm text-on-surface">{t.label}</span>
                      </div>
                      <p className="text-xs text-stone-400">{t.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-[20px]">history_edu</span>
              <div>
                <p className="text-sm font-medium text-primary">Process log will start immediately</p>
                <p className="text-xs text-stone-500 mt-0.5">All edits, pastes, and idle periods will be timestamped from the moment you begin writing.</p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <a href="/student/documents" className="flex-1 py-3 border border-outline-variant rounded-lg font-medium text-center text-stone-600 hover:bg-stone-50 transition-colors text-sm">Cancel</a>
              <button type="submit" className="flex-1 bg-primary text-on-primary py-3 rounded-lg font-bold text-sm transition-all active:scale-95 hover:opacity-90">Start Writing</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
