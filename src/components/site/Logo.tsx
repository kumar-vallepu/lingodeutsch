import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`group flex items-center gap-2.5 ${className}`}>
      <div className="relative grid size-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent ring-1 ring-white/20 shadow-[0_0_24px_-4px_oklch(0.86_0.22_145/0.6)] transition-transform group-hover:scale-105">
        <span className="font-display text-sm font-bold text-primary-foreground">L</span>
        <span className="absolute inset-0 rounded-lg bg-gradient-to-tr from-transparent to-white/30 opacity-60 mix-blend-overlay" />
      </div>
      <span className="font-display text-[17px] font-semibold tracking-tight">
        Lingo<span className="text-gradient-neon">Deutsch</span>
      </span>
    </Link>
  );
}
