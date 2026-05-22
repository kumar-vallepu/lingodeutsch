import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { AuthLayout, Field, GoogleButton } from "@/components/auth/AuthLayout";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
  head: () => ({ meta: [{ title: "Sign up — LingoDeutsch" }, { name: "description", content: "Create your LingoDeutsch account and start learning German with AI." }] }),
});

function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

const [password, setPassword] = useState("");

const [loading, setLoading] = useState(false);

const [error, setError] = useState("");

const [success, setSuccess] = useState("");

const signup = async () => {

  setLoading(true);

  setError("");

  setSuccess("");

  const { error } = await supabase.auth.signUp({
  email,
  password,

  options: {
    data: {
      full_name: fullName,
    },
  },
});

  if (error) {

    setError(error.message);

    setLoading(false);

    return;
  }

  setSuccess(
    "Account created successfully. You can now log in."
  );
setTimeout(() => {
  window.location.href = "/login";
}, 2000);
  setLoading(false);
};
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start learning German with an AI tutor in under a minute."
      footer={<>Already have an account? <Link to="/login" className="text-neon hover:underline">Log in</Link></>}
    >
      <form
  className="space-y-4"
  onSubmit={(e) => {
    e.preventDefault();
    signup();
  }}
>
        <Field
  label="Full name"
  placeholder="Anna Müller"
  value={fullName}
  onChange={(e) =>
    setFullName(e.target.value)
  }
/>
        <Field
  label="Email"
  type="email"
  placeholder="you@example.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
        <Field
  label="Password"
  type="password"
  placeholder="At least 8 characters"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
{error && (
  <p className="text-sm text-red-500">
    {error}
  </p>
)}

{success && (
  <p className="text-sm text-green-500">
    {success}
  </p>
)}
        <button
  type="submit"
  disabled={loading}
  className="btn-primary-glow w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01] active:scale-[0.99]"
>
  {loading
    ? "Creating account..."
    : "Create account"}
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
