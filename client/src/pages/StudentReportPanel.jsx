import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:3001";

function authHeaders() {
  const token = localStorage.getItem("proofbuddyToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export default function StudentShareRequests() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [selectedDocumentId, setSelectedDocumentId] = useState(localStorage.getItem("proofbuddyDocId") || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirming, setConfirming] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API}/api/student/process-log-requests`, {
          headers: authHeaders(),
        });
        if (res.status === 401 || res.status === 403) {
          navigate("/auth");
          return;
        }
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load");
        setRequests(data.shareRequests || []);

        const docsRes = await fetch(`${API}/api/student/documents`, {
          headers: authHeaders(),
        });
        const docsData = await docsRes.json();
        if (docsRes.ok) {
          const nextDocs = docsData.documents || [];
          setDocuments(nextDocs);
          setSelectedDocumentId((current) => current || nextDocs[0]?.id || "");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [navigate]);

  async function respond(shareId, action) {
    if (action === "approve" && !confirming) {
      setConfirming(shareId);
      return;
    }
    try {
      if (action === "approve" && !selectedDocumentId) {
        throw new Error("Select a document to share before approving this request.");
      }
      const endpoint = action === "approve" ? "approve" : "decline";
      const body = action === "approve" ? { documentId: selectedDocumentId } : {};
      const res = await fetch(`${API}/api/student/process-log-requests/${shareId}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Action failed");
      setRequests((prev) =>
        prev.map((r) =>
          r.id === shareId ? { ...r, status: action === "approve" ? "approved" : "declined" } : r
        )
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setConfirming(null);
    }
  }

  async function revoke(shareId) {
    try {
      const res = await fetch(`${API}/api/student/process-log-requests/${shareId}/revoke`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Revoke failed");
      setRequests((prev) =>
        prev.map((r) => r.id === shareId ? { ...r, status: "revoked" } : r)
      );
    } catch (err) {
      setError(err.message);
    }
  }

  const pending = requests.filter((r) => r.status === "pending");
  const resolved = requests.filter((r) => r.status !== "pending");

  return (
    <div className="bg-pb-bg min-h-screen flex text-pb-text">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-pb-border bg-pb-surface flex flex-col py-6 px-4 sticky top-0 h-screen">
        <button
          onClick={() => navigate("/")}
          className="font-fraunces text-xl font-semibold text-pb-text mb-8 px-2 text-left hover:opacity-80 transition-opacity"
        >
          ProofBuddy
        </button>
        <nav className="flex flex-col gap-1 flex-1">
          <NavItem icon="library_books" label="My Documents" onClick={() => navigate("/student")} />
          <NavItem icon="analytics" label="Reports" onClick={() => navigate("/student/report")} />
          <NavItem icon="history" label="Process Log" onClick={() => navigate("/student/replay")} />
          <NavItem icon="share" label="Share Requests" active />
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

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-pb-bg border-b border-pb-border px-8 py-5">
          <h1 className="font-fraunces text-2xl font-semibold text-pb-text">
            Process Log Share Requests
          </h1>
          <p className="text-sm text-pb-muted mt-1">
            Educators can request to view your writing process log. You control access.
          </p>
        </header>

        <main className="flex-1 px-8 py-8 max-w-3xl">
          {/* Info banner */}
          <div className="bg-pb-info-light border border-pb-info/20 rounded-card px-5 py-4 mb-8 flex gap-3">
            <span className="material-symbols-outlined text-pb-info shrink-0 mt-0.5">lock</span>
            <div className="text-sm text-pb-info leading-relaxed">
              <strong>Your data, your choice.</strong> Sharing your process log is always voluntary
              unless required by your institution's policy.
            </div>
          </div>

          {error && (
            <div className="bg-pb-error-light border border-pb-error/20 rounded-card px-5 py-4 mb-6 text-sm text-pb-error">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-20 text-pb-muted">
              <span className="material-symbols-outlined text-5xl mb-4 block animate-spin">refresh</span>
              <p className="text-sm">Loading requests…</p>
            </div>
          ) : (
            <>
              {/* Pending requests */}
              {pending.length > 0 && (
                <section className="mb-10">
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className="font-fraunces text-lg font-semibold text-pb-text">Pending Requests</h2>
                    <span className="bg-pb-warning-light text-pb-warning text-xs font-bold px-2 py-0.5 rounded-chip">{pending.length}</span>
                  </div>
                  <div className="space-y-4">
                    {pending.map((req) => (
                      <RequestCard
                        key={req.id}
                        req={req}
                        confirming={confirming === req.id}
                        documents={documents}
                        selectedDocumentId={selectedDocumentId}
                        onSelectDocument={setSelectedDocumentId}
                        onApprove={() => respond(req.id, "approve")}
                        onDeny={() => respond(req.id, "decline")}
                        onCancelConfirm={() => setConfirming(null)}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Resolved */}
              {resolved.length > 0 && (
                <section>
                  <h2 className="font-fraunces text-lg font-semibold text-pb-text mb-4">Past Requests</h2>
                  <div className="space-y-3">
                    {resolved.map((req) => (
                      <div key={req.id} className="bg-pb-surface border border-pb-border rounded-card px-5 py-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-pb-text">
                            {req.requester?.email || "Unknown educator"}
                          </p>
                          <p className="text-xs text-pb-muted">
                            {req.requester?.institutionName || ""} · {new Date(req.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          {req.status === "approved" && (
                            <button
                              onClick={() => revoke(req.id)}
                              className="text-xs text-pb-muted hover:text-pb-error transition-colors"
                            >
                              Revoke
                            </button>
                          )}
                          <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-chip ${
                            req.status === "approved" ? "bg-pb-success-light text-pb-success" :
                            req.status === "declined" ? "bg-pb-error-light text-pb-error" :
                            "bg-pb-border text-pb-muted"
                          }`}>
                            {req.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {pending.length === 0 && resolved.length === 0 && (
                <div className="text-center py-20 text-pb-muted">
                  <span className="material-symbols-outlined text-5xl mb-4 block">share</span>
                  <p className="text-sm">No share requests yet.</p>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

function RequestCard({ req, confirming, documents, selectedDocumentId, onSelectDocument, onApprove, onDeny, onCancelConfirm }) {
  const educatorEmail = req.requester?.email || req.student_email || "An educator";
  const institution = req.requester?.institutionName;
  const assignmentPreview = req.educator_reviews?.assignment_prompt?.slice(0, 100) || "";

  return (
    <div className="bg-pb-surface border border-pb-border rounded-card p-5">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <p className="text-sm font-semibold text-pb-text">{educatorEmail}</p>
          <p className="text-xs text-pb-muted">
            {institution && `${institution} · `}
            {new Date(req.created_at).toLocaleDateString()}
            {req.expires_at && ` · Expires ${new Date(req.expires_at).toLocaleDateString()}`}
          </p>
        </div>
        <span className="text-xs bg-pb-warning-light text-pb-warning font-bold uppercase tracking-wider px-2 py-0.5 rounded-chip shrink-0">
          Pending
        </span>
      </div>

      {assignmentPreview && (
        <div className="bg-pb-bg rounded-btn px-4 py-3 text-sm text-pb-muted italic mb-4 border border-pb-border">
          Assignment: "{assignmentPreview}{assignmentPreview.length >= 100 ? "…" : ""}"
        </div>
      )}

      {confirming ? (
        <div className="bg-pb-warning-light border border-pb-warning/20 rounded-btn px-4 py-3">
          <p className="text-sm font-semibold text-pb-warning mb-3">
            Share your process log with {educatorEmail}?
          </p>
          <p className="text-xs text-pb-muted mb-4">
            They will see your full keystroke history including paste events and edit patterns.
          </p>
          <div className="mb-4">
            <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-pb-muted">
              Document to Share
            </label>
            <select
              value={selectedDocumentId}
              onChange={(e) => onSelectDocument(e.target.value)}
              className="w-full rounded-btn border border-pb-border bg-white px-3 py-2 text-sm text-pb-text"
            >
              <option value="">Select a document</option>
              {documents.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-3">
            <button onClick={onApprove} disabled={!selectedDocumentId} className="flex-1 bg-pb-student text-white text-sm font-semibold py-2 rounded-btn hover:bg-pb-student/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
              Yes, Share
            </button>
            <button onClick={onCancelConfirm} className="flex-1 border border-pb-border text-sm font-medium text-pb-muted py-2 rounded-btn hover:text-pb-text transition-all">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-3">
          <button onClick={onApprove} className="flex items-center gap-2 bg-pb-student text-white text-sm font-semibold px-5 py-2 rounded-btn hover:bg-pb-student/90 transition-all">
            <span className="material-symbols-outlined text-base">check</span>
            Approve
          </button>
          <button onClick={onDeny} className="flex items-center gap-2 border border-pb-border text-sm font-medium text-pb-muted px-5 py-2 rounded-btn hover:text-pb-text hover:border-pb-text/20 transition-all">
            <span className="material-symbols-outlined text-base">close</span>
            Deny
          </button>
        </div>
      )}
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-3 w-full px-2 py-2 rounded text-sm font-medium transition-all ${active ? "bg-pb-student-light text-pb-student" : "text-pb-muted hover:text-pb-text hover:bg-pb-student-light/60"}`}>
      <span className="material-symbols-outlined text-base">{icon}</span>
      {label}
    </button>
  );
}
