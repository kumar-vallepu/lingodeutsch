import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className="relative grid size-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-[0_0_20px_oklch(0.86_0.22_145/0.5)]">
        <span className="font-display text-sm font-bold text-primary-foreground">L</span>
      </div>
      <span className="font-display text-lg font-semibold tracking-tight">
        Lingua<span className="text-gradient-neon">Buddy</span>
      </span>
    </Link>
  );
}
