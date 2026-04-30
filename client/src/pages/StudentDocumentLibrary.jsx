import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:3001";

function authHeaders() {
  const token = localStorage.getItem("proofbuddyToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export default function StudentDocumentLibrary() {
  const navigate = useNavigate();
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("proofbuddyToken");
    const role = localStorage.getItem("proofbuddyRole");
    if (!token) { navigate("/auth", { replace: true }); return; }
    if (role !== "student") { navigate("/educator", { replace: true }); return; }
  }, [navigate]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API}/api/student/documents`, { headers: authHeaders() });
        if (res.status === 401 || res.status === 403) { navigate("/auth"); return; }
        const data = await res.json();
        setDocs(data.documents || []);
      } catch {
        setDocs([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [navigate]);

  const filtered = docs.filter((d) =>
    d.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-pb-bg min-h-screen text-pb-text flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-pb-border bg-pb-surface flex flex-col py-6 px-4 sticky top-0 h-screen">
        <button
          onClick={() => navigate("/")}
          className="font-fraunces text-xl font-semibold text-pb-text mb-8 px-2 text-left hover:opacity-80 transition-opacity"
        >
          ProofBuddy
        </button>
        <nav className="flex flex-col gap-1 flex-1">
          <NavItem icon="library_books" label="My Documents" active />
          <NavItem icon="analytics" label="Reports" onClick={() => navigate("/student/report")} />
          <NavItem icon="history" label="Process Log" onClick={() => navigate("/student/replay")} />
          <NavItem icon="share" label="Share Requests" onClick={() => navigate("/student/share-requests")} />
        </nav>
        <div className="border-t border-pb-border pt-4">
          <NavItem icon="settings" label="Settings" onClick={() => navigate("/settings")} />
          <button
            onClick={() => { localStorage.clear(); navigate("/auth"); }}
            className="flex items-center gap-3 w-full px-2 py-2 rounded text-sm text-pb-muted hover:text-pb-text hover:bg-pb-student-light transition-all"
          >
            <span className="material-symbols-outlined text-base">logout</span>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-pb-bg border-b border-pb-border px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-fraunces text-2xl font-semibold text-pb-text">My Documents</h1>
            <p className="text-sm text-pb-muted mt-0.5">{docs.length} documents</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-pb-muted text-base">
                search
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search documents…"
                className="pl-9 pr-4 py-2 text-sm border border-pb-border rounded-btn bg-pb-surface text-pb-text placeholder-pb-muted focus:outline-none focus:ring-2 focus:ring-pb-student/30 w-60"
              />
            </div>
            <button
              onClick={() => navigate("/student/setup")}
              className="flex items-center gap-2 bg-pb-student text-white text-sm font-semibold px-4 py-2 rounded-btn hover:bg-pb-student/90 transition-all"
            >
              <span className="material-symbols-outlined text-base">add</span>
              New Document
            </button>
          </div>
        </header>

        {/* Document Grid */}
        <main className="flex-1 p-8">
          {loading ? (
            <div className="text-center py-24 text-pb-muted">
              <span className="material-symbols-outlined text-5xl mb-4 block animate-spin">refresh</span>
              <p className="text-sm">Loading documents…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-pb-muted">
              <span className="material-symbols-outlined text-5xl mb-4 block">search_off</span>
              <p>No documents match "{search}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((doc) => (
                <DocumentCard key={doc.id} doc={doc} navigate={navigate} />
              ))}
              {/* New document card */}
              <button
                onClick={() => navigate("/student/setup")}
                className="border-2 border-dashed border-pb-border rounded-card p-6 text-left hover:border-pb-student hover:bg-pb-student-light/50 transition-all flex flex-col items-center justify-center gap-3 min-h-[200px]"
              >
                <span className="material-symbols-outlined text-4xl text-pb-muted">add_circle</span>
                <span className="text-sm font-medium text-pb-muted">New Document</span>
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function DocumentCard({ doc, navigate }) {
  const relativeTime = (isoDate) => {
    return new Date(isoDate).toLocaleDateString();
  };

  return (
    <button
      onClick={() => { localStorage.setItem("proofbuddyDocId", doc.id); navigate("/student/editor"); }}
      className="bg-pb-surface border border-pb-border rounded-card p-5 text-left hover:shadow-card transition-all hover:border-pb-student/30 group"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-chip bg-pb-student-light text-pb-student">
          Document
        </span>
      </div>
      <h3 className="font-fraunces text-base font-semibold text-pb-text leading-snug mb-2 group-hover:text-pb-student transition-colors line-clamp-2">
        {doc.title}
      </h3>
      <div className="flex items-center justify-between text-xs text-pb-muted border-t border-pb-border pt-3 mt-4">
        <span>{(doc.word_count || 0).toLocaleString()} words</span>
        <span>{relativeTime(doc.updated_at)}</span>
      </div>
    </button>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-2 py-2 rounded text-sm font-medium transition-all ${
        active
          ? "bg-pb-student-light text-pb-student"
          : "text-pb-muted hover:text-pb-text hover:bg-pb-student-light/60"
      }`}
    >
      <span className="material-symbols-outlined text-base">{icon}</span>
      {label}
    </button>
  );
}
