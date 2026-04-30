import { useState } from "react";

const API = "http://localhost:3001";

export default function RequestProcessLogModal({ isOpen, onClose, educatorReviewId }) {
  const [studentEmail, setStudentEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  async function handleSend() {
    if (!studentEmail.trim()) { setError("Please enter the student's email."); return; }
    if (!educatorReviewId) { setError("No review linked. Run an analysis first."); return; }
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("proofbuddyToken");
      const res = await fetch(`${API}/api/educator/process-log-requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          educatorReviewId,
          studentEmail: studentEmail.trim(),
          expiresInDays: 14,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setSent(false);
    setStudentEmail("");
    setError("");
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-pb-text/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-pb-surface rounded-modal shadow-modal w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-pb-border flex items-center justify-between">
          <div>
            <h2 className="font-fraunces text-lg font-semibold text-pb-text">
              Request Process Log
            </h2>
            <p className="text-xs text-pb-muted mt-0.5">
              Ask the student to share their writing process log
            </p>
          </div>
          <button onClick={handleClose} className="text-pb-muted hover:text-pb-text transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {sent ? (
          <div className="px-6 py-10 text-center">
            <div className="w-14 h-14 rounded-full bg-pb-success-light flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-pb-success text-3xl">check_circle</span>
            </div>
            <h3 className="font-fraunces text-lg font-semibold text-pb-text mb-2">Request Sent</h3>
            <p className="text-sm text-pb-muted mb-6">
              The student will be notified and can approve or deny the request at any time.
            </p>
            <button
              onClick={handleClose}
              className="bg-pb-edu text-white text-sm font-semibold px-6 py-2.5 rounded-btn hover:bg-pb-edu/90 transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="px-6 py-5 space-y-5">
            {/* Due process note */}
            <div className="bg-pb-info-light border border-pb-info/20 rounded-card px-4 py-3 flex gap-3 text-xs text-pb-info">
              <span className="material-symbols-outlined text-sm shrink-0">info</span>
              The student will see this request and choose to accept or deny it. Sharing is always voluntary unless required by institutional policy.
            </div>

            {/* Student email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-pb-muted">
                Student Email
              </label>
              <input
                type="email"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                placeholder="student@university.edu"
                className="w-full border border-pb-border rounded-btn px-3 py-2.5 text-sm bg-pb-bg text-pb-text placeholder-pb-muted focus:outline-none focus:ring-2 focus:ring-pb-edu/30 focus:border-pb-edu"
              />
            </div>

            {error && (
              <p className="text-sm text-pb-error bg-pb-error-light border border-pb-error/20 rounded-btn px-3 py-2">
                {error}
              </p>
            )}

            <div className="flex gap-3 pt-1">
              <button
                onClick={handleSend}
                disabled={loading}
                className="flex-1 bg-pb-edu text-white text-sm font-semibold py-2.5 rounded-btn hover:bg-pb-edu/90 transition-all disabled:opacity-60"
              >
                {loading ? "Sending…" : "Send Request"}
              </button>
              <button
                onClick={handleClose}
                className="flex-1 border border-pb-border text-sm font-medium text-pb-muted py-2.5 rounded-btn hover:text-pb-text transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
