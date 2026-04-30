export default function Settings() {
  return (
    <div className="bg-[#FAF9F6] text-on-background font-body-md selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <header className="bg-[#FAF9F6] dark:bg-stone-950 border-b border-[#E8E4DC] dark:border-stone-800 sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-10 py-4 max-w-[1440px] mx-auto">
          <a href="/" className="text-2xl font-serif font-bold text-[#1F3A2E] dark:text-emerald-400">ProofBuddy</a>
          <nav className="hidden md:flex items-center gap-8">
            {[["Dashboard","/educator"],["Library","/student/documents"],["Reports","/educator/review-report"],["Support","#support"]].map(([l,h]) => (
              <a key={l} className="text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors font-serif tracking-tight" href={h}>{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a href="/educator/submissions/intake" className="px-5 py-2 text-[#1F3A2E] border border-[#E8E4DC] font-medium hover:bg-stone-100 transition-all active:scale-95">Upload</a>
          </div>
        </div>
      </header>

      <aside className="fixed left-0 top-0 h-full w-[240px] border-r border-[#E8E4DC] dark:border-stone-800 bg-[#FAF9F6] dark:bg-stone-950 flex-col py-6 hidden lg:flex">
        <div className="px-6 mb-10">
          <a href="/" className="text-xl font-serif font-black text-[#1F3A2E] dark:text-emerald-400 block">ProofBuddy</a>
          <div className="text-xs uppercase tracking-widest text-stone-400 mt-1">Academic Integrity</div>
        </div>
        <nav className="flex-1 space-y-1">
          {[["description","All Documents","/student/documents"],["folder","Folders","#"],["label","Tags","#"],["group","Shared","#"],["archive","Archive","#"]].map(([icon,label,href]) => (
            <a key={label} className="text-stone-500 dark:text-stone-400 px-4 py-2 flex items-center gap-3 hover:bg-stone-50 dark:hover:bg-stone-900/50 transition-transform duration-150 active:scale-95" href={href}>
              <span className="material-symbols-outlined">{icon}</span>
              <span className="font-sans text-sm font-medium">{label}</span>
            </a>
          ))}
        </nav>
        <div className="px-6 mt-auto">
          <a href="/student/documents/new" className="w-full bg-primary text-on-primary py-3 rounded-lg font-medium shadow-sm hover:opacity-90 transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">add</span> New Document
          </a>
        </div>
        <div className="mt-8 pt-6 border-t border-[#E8E4DC] dark:border-stone-800">
          <a className="text-[#1F3A2E] dark:text-emerald-400 font-bold bg-stone-100 dark:bg-stone-900 rounded-r-full px-4 py-2 flex items-center gap-3" href="/settings">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-sans text-sm">Settings</span>
          </a>
        </div>
      </aside>

      <main className="lg:ml-[240px] px-gutter py-stack_lg">
        <div className="max-w-[800px] mx-auto">
          <div className="mb-stack_sm flex items-center gap-2 text-label-caps font-label-caps text-stone-400">
            <span>SETTINGS</span>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="text-primary font-bold">PRIVACY</span>
          </div>

          <header className="mb-stack_lg">
            <h1 className="font-h1 text-h1 text-primary mb-2">Privacy & Security</h1>
            <p className="font-body-md text-stone-500 max-w-lg">Manage your intellectual footprint, data retention schedules, and account portability.</p>
          </header>

          <div className="flex border-b border-[#E8E4DC] mb-stack_md overflow-x-auto whitespace-nowrap scrollbar-hide">
            {["Account","Notifications","Billing","Privacy","Integrations"].map(l => (
              <a key={l} className={`px-6 py-3 font-sans text-sm ${l === "Privacy" ? "text-primary font-bold border-b-2 border-primary" : "text-stone-400 hover:text-stone-600"}`} href="#">{l}</a>
            ))}
          </div>

          <div className="space-y-stack_lg">
            <section className="bg-surface-container-lowest border border-[#E8E4DC] rounded-xl p-container_padding shadow-[0_4px_20px_rgba(26,26,26,0.02)]">
              <div className="flex items-start justify-between mb-stack_md">
                <div>
                  <h2 className="font-h2 text-h2 text-primary mb-1">Process Log Retention</h2>
                  <p className="font-body-md text-stone-500">How long should we keep your document analysis metadata?</p>
                </div>
                <span className="material-symbols-outlined text-primary-fixed-dim">history</span>
              </div>
              <div className="space-y-4">
                {[
                  ["Standard (30 Days)", "Logs are automatically purged after one month of inactivity.", true],
                  ["Academic Term (6 Months)", "Retain metadata for the duration of a typical semester.", false],
                  ["Strict Privacy (End of Session)", "Delete all processing artifacts immediately after PDF generation.", false],
                ].map(([title, desc, checked]) => (
                  <label key={title} className="flex items-center p-4 border border-[#E8E4DC] rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors">
                    <input defaultChecked={checked} className="text-primary focus:ring-primary h-4 w-4" name="retention" type="radio" />
                    <div className="ml-4">
                      <span className="block font-medium text-primary">{title}</span>
                      <span className="text-sm text-stone-500 italic">{desc}</span>
                    </div>
                  </label>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <button className="bg-primary text-on-primary px-6 py-2 rounded font-medium text-sm hover:opacity-90 transition-all">Save Retention Policy</button>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack_md">
              <section className="bg-surface-container-lowest border border-[#E8E4DC] rounded-xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-secondary">download_for_offline</span>
                    <h3 className="font-h3 text-h3 text-primary">Data Export</h3>
                  </div>
                  <p className="font-body-md text-stone-500 text-sm mb-6">Download a comprehensive archive of your scholarly activity.</p>
                </div>
                <button className="w-full py-3 border border-[#E8E4DC] text-primary font-medium rounded hover:bg-stone-50 transition-colors flex items-center justify-center gap-2">Request Archive</button>
              </section>

              <section className="bg-surface-container-lowest border border-[#E8E4DC] rounded-xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-secondary">visibility</span>
                    <h3 className="font-h3 text-h3 text-primary">Global Visibility</h3>
                  </div>
                  <p className="font-body-md text-stone-500 text-sm mb-6">Control how your anonymized document snippets contribute to our integrity database.</p>
                </div>
                <div className="flex items-center justify-between p-2 bg-surface-container-low rounded">
                  <span className="text-xs font-label-caps text-stone-600">ANONYMIZED SHARING</span>
                  <input defaultChecked className="h-5 w-10" type="checkbox" />
                </div>
              </section>
            </div>

            <section className="border border-error/20 rounded-xl overflow-hidden">
              <div className="bg-error-container/20 px-6 py-4 border-b border-error/10">
                <h3 className="font-label-caps text-error tracking-widest">DANGER ZONE</h3>
              </div>
              <div className="bg-white p-container_padding">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-h2 text-h3 text-primary mb-1">Delete Account</h2>
                    <p className="font-body-md text-stone-500 text-sm">Once deleted, your library and all associated reports will be permanently removed.</p>
                  </div>
                  <button className="px-6 py-3 text-error border border-error/30 font-medium rounded hover:bg-error/5 transition-all active:scale-95 whitespace-nowrap">Permanently Delete</button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer id="support" className="bg-[#FAF9F6] dark:bg-stone-950 border-t border-[#E8E4DC] dark:border-stone-800 mt-20">
        <div className="w-full max-w-[800px] mx-auto py-12 flex flex-col items-center gap-4 text-center">
          <div className="flex gap-8 mb-4">
            {["About","Privacy","Contact","Terms"].map(l => (
              <a key={l} className="font-sans text-xs uppercase tracking-widest text-stone-400 hover:text-[#1F3A2E] dark:hover:text-emerald-400 transition-colors underline-offset-4 hover:underline" href="#">{l}</a>
            ))}
          </div>
          <p className="font-sans text-xs uppercase tracking-widest text-stone-400">© 2024 ProofBuddy. Built for Scholarly Excellence.</p>
        </div>
      </footer>
    </div>
  );
}
