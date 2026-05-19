import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout, Field } from "@/components/auth/AuthLayout";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPage,
  head: () => ({ meta: [{ title: "Reset password — LinguaBuddy" }] }),
});

function ForgotPage() {
  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email and we'll send a reset link."
      footer={<>Remembered it? <Link to="/login" className="text-neon hover:underline">Back to login</Link></>}
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Field label="Email" type="email" placeholder="you@example.com" />
        <button
          type="submit"
          className="btn-primary-glow w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01] active:scale-[0.99]"
        >
          Send reset link
        </button>
      </form>
    </AuthLayout>
  );
}
