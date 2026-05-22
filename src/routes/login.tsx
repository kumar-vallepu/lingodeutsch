import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthLayout, Field, GoogleButton } from "@/components/auth/AuthLayout";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "Login — LingoDeutsch" }, { name: "description", content: "Log in to your LingoDeutsch German AI tutor account." }] }),
});

function LoginPage() {
  const navigate = useNavigate();

const [email, setEmail] = useState("");

const [password, setPassword] = useState("");

const [loading, setLoading] = useState(false);

const [error, setError] = useState("");

const login = async () => {

  setLoading(true);

  setError("");

  console.log("LOGIN START");

const response = await supabase.auth.signInWithPassword({
  email,
  password,
});

console.log(response);

const { error } = response;

  if (error) {

    setError(error.message);

    setLoading(false);

    return;
  }

  console.log("LOGIN SUCCESS"); 
  setLoading(false);

window.location.href = "/";
};
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Continue your German learning journey."
      footer={<>Don't have an account? <Link to="/signup" className="text-neon hover:underline">Sign up</Link></>}
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
      >
        <Field
          label="Email"
          type="email"
          placeholder="you@example.com"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Field
          label="Password"
          type="password"
          placeholder="••••••••"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-xs text-muted-foreground hover:text-neon">
            Forgot password?
          </Link>
        </div>
        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
          )}
        <button
          type="submit"
          className="btn-primary-glow w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01] active:scale-[0.99]"
        >
          {loading ? "Logging in..." : "Log in"}
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
