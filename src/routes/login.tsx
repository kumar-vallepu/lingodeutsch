import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout, Field, GoogleButton } from "@/components/auth/AuthLayout";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "Login — LingoDeutsch" }, { name: "description", content: "Log in to your LingoDeutsch German AI tutor account." }] }),
});

function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Continue your German learning journey."
      footer={<>Don't have an account? <Link to="/signup" className="text-neon hover:underline">Sign up</Link></>}
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Field label="Email" type="email" placeholder="you@example.com" name="email" />
        <Field label="Password" type="password" placeholder="••••••••" name="password" />
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-xs text-muted-foreground hover:text-neon">
            Forgot password?
          </Link>
        </div>
        <button
          type="submit"
          className="btn-primary-glow w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01] active:scale-[0.99]"
        >
          Log in
        </button>
        <div className="flex items-center gap-3 py-1">
          <div className="h-px flex-1 bg-glass-border" />
          <span className="text-[11px] text-muted-foreground">OR</span>
          <div className="h-px flex-1 bg-glass-border" />
        </div>
        <GoogleButton />
      </form>
    </AuthLayout>
  );
}
