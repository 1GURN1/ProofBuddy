import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TABS = ["Profile", "Notifications", "AI Defaults", "Privacy", "Account"];

export default function Settings() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("Profile");
  const role = localStorage.getItem("proofbuddyRole") || "student";
  const isEducator = role === "educator";

  const [profile, setProfile] = useState({
    name: isEducator ? "Dr. Sarah Chen" : "Alex Kim",
    email: isEducator ? "s.chen@university.edu" : "alex.kim@university.edu",
    institution: "University of Waterloo",
    department: isEducator ? "Department of English" : "",
  });

  const [notifications, setNotifications] = useState({
    reportReady: true,
    shareRequests: true,
    weeklyDigest: false,
    flaggedAlert: true,
  });

  const [saved, setSaved] = useState(false);

  function handleSave(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="bg-pb-bg min-h-screen text-pb-text flex">
      {/* Sidebar */}
      <aside
        className={`w-60 shrink-0 flex flex-col py-6 px-4 sticky top-0 h-screen ${
          isEducator ? "bg-pb-edu text-white" : "bg-pb-surface border-r border-pb-border"
        }`}
      >
        <button
          onClick={() => navigate("/")}
          className={`font-fraunces text-xl font-semibold mb-10 px-2 text-left hover:opacity-80 transition-opacity ${isEducator ? "text-white" : "text-pb-text"}`}
        >
          ProofBuddy
        </button>
        <nav className="flex flex-col gap-1 flex-1">
          {isEducator ? (
            <>
              <EduNavItem icon="dashboard" label="Dashboard" onClick={() => navigate("/educator")} />
              <EduNavItem icon="upload_file" label="New Submission" onClick={() => navigate("/educator/intake")} />
              <EduNavItem icon="fact_check" label="Reports" onClick={() => navigate("/educator/report")} />
            </>
          ) : (
            <>
              <NavItem icon="library_books" label="My Documents" onClick={() => navigate("/student")} />
              <NavItem icon="analytics" label="Reports" onClick={() => navigate("/student/report")} />
              <NavItem icon="history" label="Process Log" onClick={() => navigate("/student/replay")} />
            </>
          )}
        </nav>
        <div className={`border-t pt-4 ${isEducator ? "border-white/10" : "border-pb-border"}`}>
          <NavItem icon="settings" label="Settings" active isEdu={isEducator} />
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-40 bg-pb-bg border-b border-pb-border px-8 py-5">
          <h1 className="font-fraunces text-2xl font-semibold text-pb-text">Settings</h1>
          <p className="text-sm text-pb-muted mt-1">Manage your account and preferences.</p>
        </header>

        <div className="flex flex-1">
          {/* Tab list */}
          <div className="w-44 shrink-0 border-r border-pb-border py-6 px-3">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`w-full text-left px-3 py-2 rounded text-sm font-medium transition-all mb-0.5 ${
                  tab === t
                    ? isEducator
                      ? "bg-pb-edu-light text-pb-edu"
                      : "bg-pb-student-light text-pb-student"
                    : "text-pb-muted hover:text-pb-text"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <main className="flex-1 p-8 max-w-lg">
            {tab === "Profile" && (
              <form onSubmit={handleSave} className="space-y-5">
                <h2 className="font-fraunces text-lg font-semibold text-pb-text mb-4">Profile</h2>
                <Field label="Full Name">
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                    className={inputClass(isEducator)}
                  />
                </Field>
                <Field label="Email">
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                    className={inputClass(isEducator)}
                  />
                </Field>
                <Field label="Institution">
                  <input
                    type="text"
                    value={profile.institution}
                    onChange={(e) => setProfile((p) => ({ ...p, institution: e.target.value }))}
                    className={inputClass(isEducator)}
                  />
                </Field>
                {isEducator && (
                  <Field label="Department">
                    <input
                      type="text"
                      value={profile.department}
                      onChange={(e) => setProfile((p) => ({ ...p, department: e.target.value }))}
                      className={inputClass(isEducator)}
                    />
                  </Field>
                )}
                <SaveButton saved={saved} isEducator={isEducator} />
              </form>
            )}

            {tab === "Notifications" && (
              <div className="space-y-4">
                <h2 className="font-fraunces text-lg font-semibold text-pb-text mb-4">Notifications</h2>
                {[
                  { key: "reportReady", label: "Report ready", desc: "When an analysis report is complete" },
                  { key: "shareRequests", label: "Share requests", desc: "When someone requests your process log" },
                  { key: "weeklyDigest", label: "Weekly digest", desc: "Weekly summary of your activity" },
                  { key: "flaggedAlert", label: "Flagged submissions", desc: "When a submission is flagged for review" },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between bg-pb-surface border border-pb-border rounded-card px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-pb-text">{label}</p>
                      <p className="text-xs text-pb-muted">{desc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNotifications((p) => ({ ...p, [key]: !p[key] }))}
                      className={`w-10 h-6 rounded-full transition-all relative ${
                        notifications[key]
                          ? isEducator
                            ? "bg-pb-edu"
                            : "bg-pb-student"
                          : "bg-pb-border"
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${
                          notifications[key] ? "left-5" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {(tab === "AI Defaults" || tab === "Privacy" || tab === "Account") && (
              <div className="text-center py-20 text-pb-muted">
                <span className="material-symbols-outlined text-5xl mb-4 block">construction</span>
                <p className="text-sm">{tab} settings coming soon.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function inputClass(isEdu) {
  return `w-full border border-pb-border rounded-btn px-3 py-2.5 text-sm bg-pb-bg text-pb-text placeholder-pb-muted focus:outline-none focus:ring-2 ${isEdu ? "focus:ring-pb-edu/30 focus:border-pb-edu" : "focus:ring-pb-student/30 focus:border-pb-student"} transition-all`;
}

function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold uppercase tracking-widest text-pb-muted">{label}</label>
      {children}
    </div>
  );
}

function SaveButton({ saved, isEducator }) {
  return (
    <button
      type="submit"
      className={`text-sm font-semibold px-6 py-2.5 rounded-btn text-white transition-all ${
        saved
          ? "bg-pb-success"
          : isEducator
          ? "bg-pb-edu hover:bg-pb-edu/90"
          : "bg-pb-student hover:bg-pb-student/90"
      }`}
    >
      {saved ? "Saved ✓" : "Save Changes"}
    </button>
  );
}

function NavItem({ icon, label, active, onClick, isEdu }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-2 py-2 rounded text-sm font-medium transition-all ${
        active
          ? isEdu
            ? "bg-white/15 text-white"
            : "bg-pb-student-light text-pb-student"
          : isEdu
          ? "text-white/60 hover:text-white hover:bg-white/10"
          : "text-pb-muted hover:text-pb-text"
      }`}
    >
      <span className="material-symbols-outlined text-base">{icon}</span>
      {label}
    </button>
  );
}

function EduNavItem({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-3 w-full px-2 py-2 rounded text-sm font-medium transition-all ${active ? "bg-white/15 text-white" : "text-white/60 hover:text-white hover:bg-white/10"}`}>
      <span className="material-symbols-outlined text-base">{icon}</span>
      {label}
    </button>
  );
}
