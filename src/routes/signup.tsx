import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout, Field, GoogleButton } from "@/components/auth/AuthLayout";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
  head: () => ({ meta: [{ title: "Sign up — LinguaBuddy" }, { name: "description", content: "Create your LinguaBuddy account and start learning German with AI." }] }),
});

function SignupPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start learning German with an AI tutor in under a minute."
      footer={<>Already have an account? <Link to="/login" className="text-neon hover:underline">Log in</Link></>}
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Field label="Full name" placeholder="Anna Müller" />
        <Field label="Email" type="email" placeholder="you@example.com" />
        <Field label="Password" type="password" placeholder="At least 8 characters" />
        <button
          type="submit"
          className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_-8px_oklch(0.86_0.22_145/0.7)] transition-transform hover:scale-[1.01]"
        >
          Create account
        </button>
        <div className="flex items-center gap-3 py-1">
          <div className="h-px flex-1 bg-glass-border" />
          <span className="text-[11px] text-muted-foreground">OR</span>
          <div className="h-px flex-1 bg-glass-border" />
        </div>
        <GoogleButton />
        <p className="pt-1 text-center text-[11px] text-muted-foreground">
          By signing up, you agree to our Terms and Privacy Policy.
        </p>
      </form>
    </AuthLayout>
  );
}
