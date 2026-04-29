export default function SignupPage() {
  return (
    <div className="bg-background text-on-background min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Modal Container */}
      <main className="w-full max-w-[480px] bg-white border border-outline-variant shadow-[0_4px_20px_rgba(26,26,26,0.04)] p-8 md:p-12 flex flex-col gap-8 rounded-lg">
        {/* Header & Logo */}
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container text-3xl">
              auto_stories
            </span>
            <span className="font-h1 text-h2 text-primary-container">
              ProofBuddy
            </span>
          </div>

          <h1 className="font-h1 text-display-lg tracking-tight text-on-surface">
            Create your account
          </h1>

          <p className="font-body-md text-on-surface-variant max-w-[320px]">
            Join the community of scholars maintaining excellence in academic
            integrity.
          </p>
        </div>

        {/* Segmented Control Toggle */}
        <div className="bg-surface-container-low p-1 rounded-lg flex w-full">
          <button
            type="button"
            className="flex-1 py-2 px-4 font-label-caps text-label-caps rounded-md bg-white text-primary-container segmented-control-active transition-all"
          >
            Student
          </button>

          <button
            type="button"
            className="flex-1 py-2 px-4 font-label-caps text-label-caps rounded-md text-on-surface-variant hover:text-on-surface transition-all"
          >
            Educator
          </button>
        </div>

        {/* Auth Form */}
        <form className="flex flex-col gap-6">
          {/* Email Input Group */}
          <div className="flex flex-col gap-2">
            <label
              className="font-label-caps text-label-caps text-on-surface-variant uppercase"
              htmlFor="email"
            >
              Email Address
            </label>

            <div className="relative">
              <input
                className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-surface focus:ring-2 focus:ring-primary-container/10 focus:border-primary-container outline-none transition-all placeholder:text-outline-variant"
                id="email"
                placeholder="name@university.edu"
                type="email"
              />
            </div>

            <div className="flex items-center gap-1 text-on-tertiary-fixed-variant">
              <span className="material-symbols-outlined text-[14px]">
                info
              </span>
              <span className="font-body-md text-[12px]">
                .edu email required for educators
              </span>
            </div>
          </div>

          {/* Password Input Group */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label
                className="font-label-caps text-label-caps text-on-surface-variant uppercase"
                htmlFor="password"
              >
                Password
              </label>
            </div>

            <div className="relative">
              <input
                className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-surface focus:ring-2 focus:ring-primary-container/10 focus:border-primary-container outline-none transition-all placeholder:text-outline-variant"
                id="password"
                placeholder="••••••••"
                type="password"
              />
            </div>
          </div>

          {/* Primary CTA */}
          <button
            className="w-full bg-primary-container text-on-primary font-body-md font-semibold py-4 rounded-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-sm mt-2"
            type="submit"
          >
            Create account
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center gap-4 py-2">
          <div className="flex-grow border-t border-outline-variant"></div>
          <span className="font-label-caps text-label-caps text-outline uppercase">
            OR
          </span>
          <div className="flex-grow border-t border-outline-variant"></div>
        </div>

        {/* Magic Link Info & Footer */}
        <div className="flex flex-col gap-6 text-center">
          <button
            type="button"
            className="flex items-center justify-center gap-3 border border-outline-variant py-3 rounded-lg font-body-md text-on-surface hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined">magic_button</span>
            Sign up with a magic link
          </button>

          <div className="flex flex-col gap-2">
            <p className="font-body-md text-on-surface-variant">
              Already have an account?{" "}
              <a
                className="text-primary-container font-semibold hover:underline"
                href="#"
              >
                Sign in
              </a>
            </p>

            <p className="font-body-md text-[12px] text-outline leading-relaxed max-w-[340px] mx-auto">
              By creating an account, you agree to our{" "}
              <a className="underline" href="#">
                Terms of Service
              </a>{" "}
              and{" "}
              <a className="underline" href="#">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </main>

      {/* Footer Component */}
      <footer className="fixed bottom-0 left-0 w-full">
        <div className="w-full max-w-[800px] mx-auto py-8 flex flex-col items-center gap-4 text-center">
          <p className="font-label-caps text-label-caps text-outline tracking-widest uppercase">
            © 2024 ProofBuddy. Built for Scholarly Excellence.
          </p>

          <nav className="flex gap-6">
            <a
              className="font-label-caps text-label-caps text-outline hover:text-primary-container transition-colors underline-offset-4 hover:underline"
              href="#"
            >
              About
            </a>
            <a
              className="font-label-caps text-label-caps text-outline hover:text-primary-container transition-colors underline-offset-4 hover:underline"
              href="#"
            >
              Privacy
            </a>
            <a
              className="font-label-caps text-label-caps text-outline hover:text-primary-container transition-colors underline-offset-4 hover:underline"
              href="#"
            >
              Contact
            </a>
            <a
              className="font-label-caps text-label-caps text-outline hover:text-primary-container transition-colors underline-offset-4 hover:underline"
              href="#"
            >
              Terms
            </a>
          </nav>
        </div>
      </footer>

      {/* Abstract Decorative Elements */}
      <div className="fixed top-0 left-0 -z-10 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-primary-fixed rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-secondary-fixed rounded-full blur-[160px]"></div>
      </div>
    </div>
  );
}