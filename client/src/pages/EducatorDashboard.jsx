export default function EducatorDashboard() {
  return (
    <div className="font-body-md text-on-surface">
      <div className="flex min-h-screen">
        {/* SideNavBar */}
        <aside className="fixed left-0 top-0 h-full w-[240px] flex flex-col py-6 bg-[#FAF9F6] border-r border-[#E8E4DC] z-50">
          <div className="px-6 mb-8">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl font-serif font-black text-secondary">
                ProofBuddy
              </span>
            </div>

            <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-label-caps text-[10px] uppercase tracking-wider">
              Educator
            </div>
          </div>

          <div className="px-4 mb-8">
            <a
              href="/educator/submissions/intake"
              className="w-full flex items-center justify-center gap-2 bg-secondary text-on-primary py-3 rounded-xl font-body-md font-semibold transition-transform duration-150 active:scale-95 shadow-sm"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              New Submission
            </a>
          </div>

          <nav className="flex-1 space-y-1">
            <div className="px-6 py-2">
              <span className="font-label-caps text-stone-400 uppercase text-[10px]">
                Main Navigation
              </span>
            </div>

            <a
              className="text-secondary font-bold bg-stone-100 rounded-r-full px-4 py-2 flex items-center gap-3 transition-colors"
              href="/educator"
            >
              <span className="material-symbols-outlined">dashboard</span>
              Dashboard
            </a>

            <a
              className="text-stone-500 hover:bg-stone-50 px-4 py-2 flex items-center gap-3 transition-colors"
              href="/educator/submissions/intake"
            >
              <span className="material-symbols-outlined">description</span>
              All Documents
            </a>

            <div className="px-6 py-6 mt-4">
              <span className="font-label-caps text-stone-400 uppercase text-[10px]">
                Course List
              </span>
            </div>

            <a
              className="text-stone-500 hover:bg-stone-50 px-4 py-2 flex items-center gap-3 transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">school</span>
              ENGL 102
            </a>

            <a
              className="text-stone-500 hover:bg-stone-50 px-4 py-2 flex items-center gap-3 transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">psychology</span>
              PSYC 240
            </a>

            <a
              className="text-stone-500 hover:bg-stone-50 px-4 py-2 flex items-center gap-3 transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">folder</span>
              Folders
            </a>
          </nav>

          <div className="mt-auto px-4 pt-4 border-t border-[#E8E4DC]">
            <a
              className="text-stone-500 hover:bg-stone-50 px-4 py-2 flex items-center gap-3 transition-colors"
              href="/settings"
            >
              <span className="material-symbols-outlined">settings</span>
              Settings
            </a>

            <a
              className="text-stone-500 hover:bg-stone-50 px-4 py-2 flex items-center gap-3 transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">help_outline</span>
              Help
            </a>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 ml-[240px] flex bg-[#FAF9F6]">
          {/* Center Column */}
          <div className="flex-1 max-w-[800px] mx-auto px-10 py-12">
            <header className="mb-12">
              <p className="font-label-caps text-stone-400 mb-2">
                MONDAY, OCTOBER 14
              </p>

              <h1 className="font-h1 text-primary">Welcome back, Dr. Chen</h1>

              <p className="font-body-lg text-stone-500 mt-2">
                You have 12 submissions awaiting your review this morning.
              </p>
            </header>

            {/* Stat Strip */}
            <div className="grid grid-cols-4 gap-4 mb-12">
              <StatCard label="REVIEWS THIS WEEK" value="42" />
              <StatCard label="PENDING LOGS" value="08" />
              <StatCard label="AWAITING" value="12" />
              <StatCard label="POLICIES" value="03" />
            </div>

            {/* Recent Reviews Table */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-h3 text-primary">Recent Reviews</h2>

                <button className="text-secondary font-label-caps text-[11px] hover:underline">
                  VIEW ALL
                </button>
              </div>

              <div className="bg-white border border-[#E8E4DC] rounded-xl overflow-hidden editorial-shadow">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-50/50 border-b border-[#E8E4DC]">
                      <th className="px-6 py-4 font-label-caps text-stone-400 text-[10px]">
                        STUDENT ID
                      </th>
                      <th className="px-6 py-4 font-label-caps text-stone-400 text-[10px]">
                        ASSIGNMENT
                      </th>
                      <th className="px-6 py-4 font-label-caps text-stone-400 text-[10px]">
                        REVIEW
                      </th>
                      <th className="px-6 py-4 font-label-caps text-stone-400 text-[10px]">
                        STATUS
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#E8E4DC]">
                    <ReviewRow
                      studentId="#88219"
                      assignment="Thesis Draft V2"
                      course="ENGL 102"
                      level="MEDIUM"
                      levelClass="bg-orange-50 text-orange-700"
                      status="Completed"
                      dotClass="bg-emerald-500"
                    />

                    <ReviewRow
                      studentId="#90122"
                      assignment="Lab Analysis"
                      course="PSYC 240"
                      level="HIGH"
                      levelClass="bg-red-50 text-red-700"
                      status="Flagged"
                      dotClass="bg-amber-500"
                    />

                    <ReviewRow
                      studentId="#77631"
                      assignment="Ethics Essay"
                      course="ENGL 102"
                      level="LOW"
                      levelClass="bg-emerald-50 text-emerald-700"
                      status="Pending"
                      dotClass="bg-stone-300"
                    />
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <aside className="w-[320px] bg-stone-50/50 border-l border-[#E8E4DC] p-8 space-y-10">
            {/* Pending Log Requests */}
            <section>
              <h3 className="font-label-caps text-stone-400 text-[11px] mb-6 tracking-widest">
                LOG REQUESTS
              </h3>

              <div className="space-y-4">
                <LogRequestCard
                  accentClass="bg-secondary"
                  logId="LOG #4492"
                  time="2H AGO"
                  text='"Requesting access to integrity report for Assignment 4..."'
                />

                <LogRequestCard
                  accentClass="bg-stone-300"
                  logId="LOG #4488"
                  time="5H AGO"
                  text='"Data export request for ENGL 102 semester analytics."'
                />
              </div>
            </section>

            {/* Recent Activity */}
            <section>
              <h3 className="font-label-caps text-stone-400 text-[11px] mb-6 tracking-widest">
                RECENT ACTIVITY
              </h3>

              <div className="relative pl-6 space-y-8 before:content-[''] before:absolute before:left-[3px] before:top-2 before:bottom-0 before:w-[1px] before:bg-[#E8E4DC]">
                <ActivityItem
                  active
                  title="System integrity check completed for ENGL 102"
                  time="Oct 14, 08:30 AM"
                />

                <ActivityItem
                  title="New submission from User #88219"
                  time="Oct 14, 07:15 AM"
                />

                <ActivityItem
                  title='Course Policy "Academic Integrity v4" updated'
                  time="Oct 13, 04:45 PM"
                />
              </div>
            </section>

            {/* Activity Visualization Card */}
            <section className="pt-6">
              <div className="rounded-xl overflow-hidden border border-[#E8E4DC] bg-white editorial-shadow">
                <img
                  alt="Activity Trends"
                  className="w-full h-32 object-cover grayscale opacity-80"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIIccahxvh-HMykTGNQ6HWcy1NadFqSxn2XjqAFW4oAKQfMC804WcRrabzWAtjbNMfO76uT7e3ajSlBlbMHEbCgMDKrmfFwUQ6B53m5864PmKPQxUAGglx_Y5slVb_xo7glzrj-BwtBhBxc2vmd8n92sPqo2soKFTNiV7b7VHzU5Dy0S7nNCLJ70lZaDZORv0evWaBytWUv0BlqwzNYDN-T3cWS8yllGRA6VM6f51OaySZqdMkZeKcSmvXsr3r50343yxXtpvNTJw"
                />

                <div className="p-4">
                  <p className="font-label-caps text-stone-400 text-[9px] mb-1">
                    WEEKLY VOLUME TREND
                  </p>

                  <p className="text-xs text-stone-600 italic">
                    Submissions are up 14% compared to last semester.
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </main>
      </div>

      {/* Minimal Footer */}
      <footer className="ml-[240px] bg-[#FAF9F6]">
        <div className="w-full max-w-[800px] mx-auto py-12 flex flex-col items-center gap-4 text-center">
          <div className="flex gap-6">
            <a
              className="font-sans text-xs uppercase tracking-widest text-stone-400 hover:text-secondary underline-offset-4 hover:underline transition-colors"
              href="#"
            >
              About
            </a>
            <a
              className="font-sans text-xs uppercase tracking-widest text-stone-400 hover:text-secondary underline-offset-4 hover:underline transition-colors"
              href="#"
            >
              Privacy
            </a>
            <a
              className="font-sans text-xs uppercase tracking-widest text-stone-400 hover:text-secondary underline-offset-4 hover:underline transition-colors"
              href="#"
            >
              Contact
            </a>
            <a
              className="font-sans text-xs uppercase tracking-widest text-stone-400 hover:text-secondary underline-offset-4 hover:underline transition-colors"
              href="#"
            >
              Terms
            </a>
          </div>

          <p className="font-sans text-xs uppercase tracking-widest text-stone-400">
            © 2024 ProofBuddy. Built for Scholarly Excellence.
          </p>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white border border-[#E8E4DC] p-4 rounded-xl editorial-shadow">
      <span className="font-label-caps text-stone-400 text-[10px]">
        {label}
      </span>
      <p className="font-h2 text-secondary mt-1">{value}</p>
    </div>
  );
}

function ReviewRow({
  studentId,
  assignment,
  course,
  level,
  levelClass,
  status,
  dotClass,
}) {
  return (
    <tr className="hover:bg-stone-50/30 transition-colors">
      <td className="px-6 py-4 font-code text-stone-600">{studentId}</td>

      <td className="px-6 py-4">
        <p className="font-medium text-stone-900">{assignment}</p>
        <p className="text-[11px] text-stone-400">{course}</p>
      </td>

      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full font-label-caps text-[10px] ${levelClass}`}
        >
          {level}
        </span>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${dotClass}`}></div>
          <span className="text-xs text-stone-600">{status}</span>
        </div>
      </td>
    </tr>
  );
}

function LogRequestCard({ accentClass, logId, time, text }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-[#E8E4DC] relative overflow-hidden editorial-shadow">
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${accentClass}`}></div>

      <div className="flex justify-between items-start mb-2">
        <span className="font-code text-[11px] text-stone-400">{logId}</span>
        <span className="text-[10px] font-label-caps text-stone-500">
          {time}
        </span>
      </div>

      <p className="font-serif italic text-stone-800 text-sm mb-3">{text}</p>

      <div className="flex gap-2">
        <button className="flex-1 text-[11px] font-semibold py-2 rounded-lg bg-secondary text-white">
          Approve
        </button>

        <button className="flex-1 text-[11px] font-semibold py-2 rounded-lg border border-[#E8E4DC] text-stone-600">
          Deny
        </button>
      </div>
    </div>
  );
}

function ActivityItem({ title, time, active = false }) {
  return (
    <div className="relative">
      <div
        className={`absolute -left-[27px] top-1 w-2 h-2 rounded-full ring-4 ring-[#FAF9F6] ${
          active ? "bg-secondary" : "bg-stone-300"
        }`}
      ></div>

      <p className="text-sm font-medium text-stone-900 leading-tight">
        {title}
      </p>

      <p className="text-xs text-stone-400 mt-1">{time}</p>
    </div>
  );
}