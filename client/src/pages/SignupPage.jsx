import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const API = "http://localhost:3001";

export default function SignupPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get("role") === "educator" ? "educator" : "student";

  const [selectedRole, setSelectedRole] = useState(null);
  const role = selectedRole ?? initialRole;
  const [mode, setMode] = useState("signin"); // signin | signup

  useEffect(() => {
    const token = localStorage.getItem("proofbuddyToken");
    const savedRole = localStorage.getItem("proofbuddyRole");
    const requestedRole = searchParams.get("role");

    if (!token || !savedRole) return;

    if (requestedRole && requestedRole !== savedRole) {
      return;
    }

    if (savedRole === "educator") navigate("/educator", { replace: true });
    else if (savedRole === "student") navigate("/student", { replace: true });
  }, [navigate, searchParams]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const endpoint = mode === "signin" ? "/api/auth/signin" : "/api/auth/signup";
      const res = await fetch(`${API}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Authentication failed");
      if (!data.session?.accessToken) {
        setMode("signin");
        setError(data.message || "Account created. Please sign in.");
        return;
      }
      const token = data.session?.accessToken || data.token;
      const userRole = data.user?.role;

      if (!userRole) {
        throw new Error("Your account role could not be determined. Please try again.");
      }

      localStorage.setItem("proofbuddyToken", token);
      localStorage.setItem("proofbuddyRole", userRole);
      if (userRole === "educator") {
        navigate("/educator");
      } else {
        navigate("/student");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const isStudent = role === "student";
  const accentHex = isStudent ? "#1F3A2E" : "#1E2A4A";

  return (
    <div className="bg-pb-bg min-h-screen flex flex-col items-center justify-center px-4">
      <a
        href="/"
        className="font-fraunces text-2xl font-semibold text-pb-text mb-10 hover:opacity-80 transition-opacity"
      >
        ProofBuddy
      </a>

      <div className="w-full max-w-md bg-pb-surface border border-pb-border rounded-modal shadow-modal p-8">
        {/* Role Toggle */}
        <div className="flex rounded-btn overflow-hidden border border-pb-border mb-8">
          <button
            type="button"
            onClick={() => setSelectedRole("student")}
            className={`flex-1 py-2.5 text-sm font-semibold transition-all ${
              role === "student"
                ? "bg-pb-student text-white"
                : "bg-transparent text-pb-muted hover:text-pb-text"
            }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole("educator")}
            className={`flex-1 py-2.5 text-sm font-semibold transition-all ${
              role === "educator"
                ? "bg-pb-edu text-white"
                : "bg-transparent text-pb-muted hover:text-pb-text"
            }`}
          >
            Educator
          </button>
        </div>

        <h1 className="font-fraunces text-2xl font-semibold text-pb-text mb-1">
          {mode === "signin" ? "Welcome back" : "Create account"}
        </h1>
        <p className="text-sm text-pb-muted mb-8">
          {mode === "signin"
            ? `Sign in as a ${role}`
            : `Sign up as a ${role}`}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-pb-muted">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@university.edu"
              className="w-full border border-pb-border rounded-btn px-4 py-3 text-sm bg-pb-surface text-pb-text placeholder-pb-muted focus:outline-none focus:ring-2 focus:ring-pb-student/30 focus:border-pb-student transition-all"
              style={{ focusBorderColor: accentHex }}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-pb-muted">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-pb-border rounded-btn px-4 py-3 text-sm bg-pb-surface text-pb-text placeholder-pb-muted focus:outline-none focus:ring-2 focus:ring-pb-student/30 focus:border-pb-student transition-all"
            />
          </div>

          {error && (
            <p className="text-sm text-pb-error bg-pb-error-light border border-pb-error/20 rounded-btn px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-btn text-sm font-semibold text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ backgroundColor: accentHex }}
          >
            {loading
              ? "Please wait…"
              : mode === "signin"
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-pb-muted mt-6">
          {mode === "signin" ? "No account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="font-semibold text-pb-text hover:underline underline-offset-4"
          >
            {mode === "signin" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>

      <p className="text-xs text-pb-muted mt-8">
        <a href="/" className="hover:underline underline-offset-4">← Back to home</a>
      </p>
    </div>
  );
}
