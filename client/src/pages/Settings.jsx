export default function Settings() {
  return (
    <div className="bg-[#FAF9F6] text-on-background font-body-md selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      {/* TopNavBar */}
      <header className="bg-[#FAF9F6] dark:bg-stone-950 border-b border-[#E8E4DC] dark:border-stone-800 sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-10 py-4 max-w-[1440px] mx-auto">
          <a
            href="/"
            className="text-2xl font-serif font-bold text-[#1F3A2E] dark:text-emerald-400"
          >
            ProofBuddy
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <TopNavLink label="Dashboard" href="/educator" />
            <TopNavLink label="Library" href="/student/documents" />
            <TopNavLink label="Reports" href="/educator/review-report" />
            <TopNavLink label="Support" href="#support" />
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="/educator/submissions/intake"
              className="px-5 py-2 text-[#1F3A2E] border border-[#E8E4DC] font-medium hover:bg-stone-100 transition-all active:scale-95"
            >
              Upload
            </a>

            <div className="h-8 w-8 rounded-full bg-stone-200 overflow-hidden border border-[#E8E4DC]">
              <img
                alt="User Profile"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDouybLEVd2H39wkg64NFuLVLTsuBS1SE64PAxn80SodM4FgrF0u7J7te0g2xtUmoV-j9ePxI0F2XovJESb-EzCvZlDQ8PJsnuAUm4Cf5hfwTb78SKO0xR9IZ7EymD-ViHsxPh0rjDlO9UDAOyhaSE_hPKhfAEmj3H-bIZ1X3iCAo0OLtix7GPgfxhRZr4z_ZMXkpXe3WMjBjvoTFH1fI2cdZKlCq3A53kToyNJdpMMsWLiljrV3v9y-HmYBATw4V1dPtFax_ZRGJc"
              />
            </div>
          </div>
        </div>
      </header>

      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full w-[240px] border-r border-[#E8E4DC] dark:border-stone-800 bg-[#FAF9F6] dark:bg-stone-950 flex-col py-6 hidden lg:flex">
        <div className="px-6 mb-10">
          <a
            href="/"
            className="text-xl font-serif font-black text-[#1F3A2E] dark:text-emerald-400 block"
          >
            ProofBuddy
          </a>

          <div className="text-xs uppercase tracking-widest text-stone-400 mt-1">
            Academic Integrity
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          <SideNavLink icon="description" label="All Documents" href="/student/documents" />
          <SideNavLink icon="folder" label="Folders" />
          <SideNavLink icon="label" label="Tags" />
          <SideNavLink icon="group" label="Shared" />
          <SideNavLink icon="archive" label="Archive" />
        </nav>

        <div className="px-6 mt-auto">
          <a
            href="/student/documents/new"
            className="w-full bg-primary text-on-primary py-3 rounded-lg font-medium shadow-sm hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            New Document
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-[#E8E4DC] dark:border-stone-800">
          <a
            className="text-[#1F3A2E] dark:text-emerald-400 font-bold bg-stone-100 dark:bg-stone-900 rounded-r-full px-4 py-2 flex items-center gap-3"
            href="/settings"
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="font-sans text-sm">Settings</span>
          </a>

          <SideNavLink icon="help_outline" label="Help" />
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="lg:ml-[240px] px-gutter py-stack_lg">
        <div className="max-w-[800px] mx-auto">
          {/* Breadcrumbs */}
          <div className="mb-stack_sm flex items-center gap-2 text-label-caps font-label-caps text-stone-400">
            <span>SETTINGS</span>
            <span className="material-symbols-outlined text-[10px]">
              chevron_right
            </span>
            <span className="text-primary font-bold">PRIVACY</span>
          </div>

          {/* Header */}
          <header className="mb-stack_lg">
            <h1 className="font-h1 text-h1 text-primary mb-2">
              Privacy & Security
            </h1>

            <p className="font-body-md text-stone-500 max-w-lg">
              Manage your intellectual footprint, data retention schedules, and
              account portability.
            </p>
          </header>

          {/* Horizontal Sub-Tabs */}
          <div className="flex border-b border-[#E8E4DC] mb-stack_md overflow-x-auto whitespace-nowrap scrollbar-hide">
            <SettingsTab label="Account" />
            <SettingsTab label="Notifications" />
            <SettingsTab label="Billing" />
            <SettingsTab label="Privacy" active />
            <SettingsTab label="Integrations" />
          </div>

          {/* Privacy Sections */}
          <div className="space-y-stack_lg">
            {/* Process Log Retention */}
            <section className="bg-surface-container-lowest border border-[#E8E4DC] rounded-xl p-container_padding shadow-[0_4px_20px_rgba(26,26,26,0.02)]">
              <div className="flex items-start justify-between mb-stack_md">
                <div>
                  <h2 className="font-h2 text-h2 text-primary mb-1">
                    Process Log Retention
                  </h2>

                  <p className="font-body-md text-stone-500">
                    How long should we keep your document analysis metadata?
                  </p>
                </div>

                <span className="material-symbols-outlined text-primary-fixed-dim">
                  history
                </span>
              </div>

              <div className="space-y-4">
                <RetentionOption
                  name="retention"
                  title="Standard (30 Days)"
                  description="Logs are automatically purged after one month of inactivity."
                  defaultChecked
                />

                <RetentionOption
                  name="retention"
                  title="Academic Term (6 Months)"
                  description="Retain metadata for the duration of a typical semester."
                />

                <RetentionOption
                  name="retention"
                  title="Strict Privacy (End of Session)"
                  description="Delete all processing artifacts immediately after PDF generation."
                />
              </div>

              <div className="mt-6 flex justify-end">
                <button className="bg-primary text-on-primary px-6 py-2 rounded font-medium text-sm hover:opacity-90 transition-all">
                  Save Retention Policy
                </button>
              </div>
            </section>

            {/* Data Export Bento */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack_md">
              <section className="bg-surface-container-lowest border border-[#E8E4DC] rounded-xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-secondary">
                      download_for_offline
                    </span>

                    <h3 className="font-h3 text-h3 text-primary">
                      Data Export
                    </h3>
                  </div>

                  <p className="font-body-md text-stone-500 text-sm mb-6">
                    Download a comprehensive archive of your scholarly activity,
                    including reports, feedback, and original uploads in .JSON
                    and .PDF format.
                  </p>
                </div>

                <button className="w-full py-3 border border-[#E8E4DC] text-primary font-medium rounded hover:bg-stone-50 transition-colors flex items-center justify-center gap-2">
                  Request Archive
                </button>
              </section>

              <section className="bg-surface-container-lowest border border-[#E8E4DC] rounded-xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-secondary">
                      visibility
                    </span>

                    <h3 className="font-h3 text-h3 text-primary">
                      Global Visibility
                    </h3>
                  </div>

                  <p className="font-body-md text-stone-500 text-sm mb-6">
                    Control how your anonymized document snippets contribute to
                    our integrity database used by global educators.
                  </p>
                </div>

                <div className="flex items-center justify-between p-2 bg-surface-container-low rounded">
                  <span className="text-xs font-label-caps text-stone-600">
                    ANONYMIZED SHARING
                  </span>

                  <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input
                      defaultChecked
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-[#E8E4DC] appearance-none cursor-pointer checked:right-0 checked:border-primary-container"
                      id="toggle"
                      name="toggle"
                      type="checkbox"
                    />

                    <label
                      className="toggle-label block overflow-hidden h-6 rounded-full bg-stone-200 cursor-pointer"
                      htmlFor="toggle"
                    ></label>
                  </div>
                </div>
              </section>
            </div>

            {/* Danger Zone */}
            <section className="border border-error/20 rounded-xl overflow-hidden">
              <div className="bg-error-container/20 px-6 py-4 border-b border-error/10">
                <h3 className="font-label-caps text-error tracking-widest">
                  DANGER ZONE
                </h3>
              </div>

              <div className="bg-white p-container_padding">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-h2 text-h3 text-primary mb-1">
                      Delete Account
                    </h2>

                    <p className="font-body-md text-stone-500 text-sm">
                      Once deleted, your library and all associated reports will
                      be permanently removed. This action cannot be undone.
                    </p>
                  </div>

                  <button className="px-6 py-3 text-error border border-error/30 font-medium rounded hover:bg-error/5 transition-all active:scale-95 whitespace-nowrap">
                    Permanently Delete
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        id="support"
        className="bg-[#FAF9F6] dark:bg-stone-950 border-t border-[#E8E4DC] dark:border-stone-800 mt-20"
      >
        <div className="w-full max-w-[800px] mx-auto py-12 flex flex-col items-center gap-4 text-center">
          <div className="flex gap-8 mb-4">
            <FooterLink label="About" />
            <FooterLink label="Privacy" />
            <FooterLink label="Contact" />
            <FooterLink label="Terms" />
          </div>

          <p className="font-sans text-xs uppercase tracking-widest text-stone-400">
            © 2024 ProofBuddy. Built for Scholarly Excellence.
          </p>
        </div>
      </footer>
    </div>
  );
}

function TopNavLink({ label, href }) {
  return (
    <a
      className="text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors font-serif tracking-tight"
      href={href}
    >
      {label}
    </a>
  );
}

function SideNavLink({ icon, label, href = "#" }) {
  return (
    <a
      className="text-stone-500 dark:text-stone-400 px-4 py-2 flex items-center gap-3 hover:bg-stone-50 dark:hover:bg-stone-900/50 transition-transform duration-150 active:scale-95"
      href={href}
    >
      <span className="material-symbols-outlined">{icon}</span>
      <span className="font-sans text-sm font-medium">{label}</span>
    </a>
  );
}

function SettingsTab({ label, active = false }) {
  return (
    <a
      className={`px-6 py-3 font-sans text-sm ${
        active
          ? "text-primary font-bold border-b-2 border-primary"
          : "text-stone-400 hover:text-stone-600"
      }`}
      href="#"
    >
      {label}
    </a>
  );
}

function RetentionOption({ name, title, description, defaultChecked = false }) {
  return (
    <label className="flex items-center p-4 border border-[#E8E4DC] rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors">
      <input
        defaultChecked={defaultChecked}
        className="text-primary focus:ring-primary h-4 w-4"
        name={name}
        type="radio"
      />

      <div className="ml-4">
        <span className="block font-medium text-primary">{title}</span>
        <span className="text-sm text-stone-500 italic">{description}</span>
      </div>
    </label>
  );
}

function FooterLink({ label }) {
  return (
    <a
      className="font-sans text-xs uppercase tracking-widest text-stone-400 hover:text-[#1F3A2E] dark:hover:text-emerald-400 transition-colors underline-offset-4 hover:underline"
      href="#"
    >
      {label}
    </a>
  );
}