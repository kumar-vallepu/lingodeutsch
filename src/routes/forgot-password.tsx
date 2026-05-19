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
          className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_-8px_oklch(0.86_0.22_145/0.7)] transition-transform hover:scale-[1.01]"
        >
          Send reset link
        </button>
      </form>
    </AuthLayout>
  );
}
