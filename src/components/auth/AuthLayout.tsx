import { ReactNode, ChangeEvent } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Background } from "@/components/site/Background";
import { Logo } from "@/components/site/Logo";

export function AuthLayout({
  title, subtitle, children, footer,
}: { title: string; subtitle: string; children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <Background />
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 py-12">
        <Link to="/" className="mb-9"><Logo /></Link>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="glass-strong border-gradient shadow-elegant relative w-full overflow-hidden rounded-3xl p-8"
        >
          <div className="pointer-events-none absolute -top-24 -right-16 size-56 rounded-full bg-neon/15 blur-3xl" />
          <div className="relative">
            <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-[26px]">{title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
            <div className="mt-7">{children}</div>
          </div>
        </motion.div>
        {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
      </div>
    </div>
  );
}

export function Field({
  label,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
}: {
  label: string;

  type?: string;

  placeholder?: string;

  name?: string;

  value?: string;

  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-xl border border-glass-border bg-white/[0.025] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/55 outline-none transition-all duration-200 hover:bg-white/[0.04] focus:border-neon/60 focus:bg-white/[0.05] focus:ring-4 focus:ring-neon/15 focus:shadow-[0_0_0_1px_oklch(0.86_0.22_145/0.4),0_8px_28px_-12px_oklch(0.86_0.22_145/0.35)]"
      />
    </label>
  );
}

export function GoogleButton() {
  return (
    <button
      type="button"
      className="glass flex w-full items-center justify-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-white/5"
    >
      <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden>
        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.3 6.5 29.4 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.3-.4-3.5z"/>
        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.3 6.5 29.4 4.5 24 4.5 16.1 4.5 9.3 9 6.3 14.7z"/>
        <path fill="#4CAF50" d="M24 43.5c5.3 0 10.1-2 13.7-5.3l-6.3-5.3c-2 1.4-4.5 2.2-7.4 2.2-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.2 39 16 43.5 24 43.5z"/>
        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.3 5.3C41 35 43.5 30 43.5 24c0-1.2-.1-2.3-.4-3.5z"/>
      </svg>
      Continue with Google
    </button>
  );
}
