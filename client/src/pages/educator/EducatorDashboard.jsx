export default function EducatorDashboard() {
  return (
    <div className="font-body-md text-on-surface">
      <div className="flex min-h-screen">
        <aside className="fixed left-0 top-0 h-full w-[240px] flex flex-col py-6 bg-[#FAF9F6] border-r border-[#E8E4DC] z-50">
          <div className="px-6 mb-8">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl font-serif font-black text-secondary">ProofBuddy</span>
            </div>
            <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-label-caps text-[10px] uppercase tracking-wider">Educator</div>
          </div>

          <div className="px-4 mb-8">
            <a href="/educator/submissions/intake" className="w-full flex items-center justify-center gap-2 bg-secondary text-on-primary py-3 rounded-xl font-body-md font-semibold transition-transform duration-150 active:scale-95 shadow-sm">
              <span className="material-symbols-outlined text-sm">add</span> New Submission
            </a>
          </div>

          <nav className="flex-1 space-y-1">
            <div className="px-6 py-2"><span className="font-label-caps text-stone-400 uppercase text-[10px]">Main Navigation</span></div>
            <a className="text-secondary font-bold bg-stone-100 rounded-r-full px-4 py-2 flex items-center gap-3 transition-colors" href="/educator">
              <span className="material-symbols-outlined">dashboard</span> Dashboard
            </a>
            <a className="text-stone-500 hover:bg-stone-50 px-4 py-2 flex items-center gap-3 transition-colors" href="/educator/submissions/intake">
              <span className="material-symbols-outlined">description</span> All Documents
            </a>
            <div className="px-6 py-6 mt-4"><span className="font-label-caps text-stone-400 uppercase text-[10px]">Course List</span></div>
            {[["school","ENGL 102"],["psychology","PSYC 240"],["folder","Folders"]].map(([icon,label]) => (
              <a key={label} className="text-stone-500 hover:bg-stone-50 px-4 py-2 flex items-center gap-3 transition-colors" href="#">
                <span className="material-symbols-outlined">{icon}</span> {label}
              </a>
            ))}
          </nav>

          <div className="mt-auto px-4 pt-4 border-t border-[#E8E4DC]">
            {[["settings","Settings","/settings"],["help_outline","Help","#"]].map(([icon,label,href]) => (
              <a key={label} className="text-stone-500 hover:bg-stone-50 px-4 py-2 flex items-center gap-3 transition-colors" href={href}>
                <span className="material-symbols-outlined">{icon}</span> {label}
              </a>
            ))}
          </div>
        </aside>

        <main className="flex-1 ml-[240px] flex bg-[#FAF9F6]">
          <div className="flex-1 max-w-[800px] mx-auto px-10 py-12">
            <header className="mb-12">
              <p className="font-label-caps text-stone-400 mb-2">MONDAY, OCTOBER 14</p>
              <h1 className="font-h1 text-primary">Welcome back, Dr. Chen</h1>
              <p className="font-body-lg text-stone-500 mt-2">You have 12 submissions awaiting your review this morning.</p>
            </header>

            <div className="grid grid-cols-4 gap-4 mb-12">
              {[["REVIEWS THIS WEEK","42"],["PENDING LOGS","08"],["AWAITING","12"],["POLICIES","03"]].map(([label,value]) => (
                <div key={label} className="bg-white border border-[#E8E4DC] p-4 rounded-xl">
                  <span className="font-label-caps text-stone-400 text-[10px]">{label}</span>
                  <p className="font-h2 text-secondary mt-1">{value}</p>
                </div>
              ))}
            </div>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-h3 text-primary">Recent Reviews</h2>
                <button className="text-secondary font-label-caps text-[11px] hover:underline">VIEW ALL</button>
              </div>

              <div className="bg-white border border-[#E8E4DC] rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-50/50 border-b border-[#E8E4DC]">
                      {["STUDENT ID","ASSIGNMENT","REVIEW","STATUS"].map(h => (
                        <th key={h} className="px-6 py-4 font-label-caps text-stone-400 text-[10px]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E4DC]">
                    <tr className="hover:bg-stone-50/30 transition-colors">
                      <td className="px-6 py-4 font-code text-stone-600">#88219</td>
                      <td className="px-6 py-4"><p className="font-medium text-stone-900">Thesis Draft V2</p><p className="text-[11px] text-stone-400">ENGL 102</p></td>
                      <td className="px-6 py-4"><span className="inline-flex items-center px-2 py-0.5 rounded-full font-label-caps text-[10px] bg-orange-50 text-orange-700">MEDIUM</span></td>
                      <td className="px-6 py-4"><div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div><span className="text-xs text-stone-600">Completed</span></div></td>
                    </tr>
                    <tr className="hover:bg-stone-50/30 transition-colors">
                      <td className="px-6 py-4 font-code text-stone-600">#90122</td>
                      <td className="px-6 py-4"><p className="font-medium text-stone-900">Lab Analysis</p><p className="text-[11px] text-stone-400">PSYC 240</p></td>
                      <td className="px-6 py-4"><span className="inline-flex items-center px-2 py-0.5 rounded-full font-label-caps text-[10px] bg-red-50 text-red-700">HIGH</span></td>
                      <td className="px-6 py-4"><div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500"></div><span className="text-xs text-stone-600">Flagged</span></div></td>
                    </tr>
                    <tr className="hover:bg-stone-50/30 transition-colors">
                      <td className="px-6 py-4 font-code text-stone-600">#77631</td>
                      <td className="px-6 py-4"><p className="font-medium text-stone-900">Ethics Essay</p><p className="text-[11px] text-stone-400">ENGL 102</p></td>
                      <td className="px-6 py-4"><span className="inline-flex items-center px-2 py-0.5 rounded-full font-label-caps text-[10px] bg-emerald-50 text-emerald-700">LOW</span></td>
                      <td className="px-6 py-4"><div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-stone-300"></div><span className="text-xs text-stone-600">Pending</span></div></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <aside className="w-[320px] bg-stone-50/50 border-l border-[#E8E4DC] p-8 space-y-10">
            <section>
              <h3 className="font-label-caps text-stone-400 text-[11px] mb-6 tracking-widest">LOG REQUESTS</h3>
              <div className="space-y-4">
                {[["bg-secondary","LOG #4492","2H AGO",'"Requesting access to integrity report for Assignment 4..."'],
                  ["bg-stone-300","LOG #4488","5H AGO",'"Data export request for ENGL 102 semester analytics."']].map(([accent,id,time,text]) => (
                  <div key={id} className="bg-white p-4 rounded-xl border border-[#E8E4DC] relative overflow-hidden">
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${accent}`}></div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-code text-[11px] text-stone-400">{id}</span>
                      <span className="text-[10px] font-label-caps text-stone-500">{time}</span>
                    </div>
                    <p className="font-serif italic text-stone-800 text-sm mb-3">{text}</p>
                    <div className="flex gap-2">
                      <button className="flex-1 text-[11px] font-semibold py-2 rounded-lg bg-secondary text-white">Approve</button>
                      <button className="flex-1 text-[11px] font-semibold py-2 rounded-lg border border-[#E8E4DC] text-stone-600">Deny</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </main>
      </div>
    </div>
  );
}
