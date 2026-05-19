import { motion } from "motion/react";

export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base hero gradient */}
      <div className="absolute inset-0 bg-hero" />

      {/* Futuristic grid */}
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-[0.55]" />

      {/* Aurora blobs */}
      <motion.div
        className="absolute -top-40 left-1/2 size-[720px] -translate-x-1/2 rounded-full bg-neon/[0.10] blur-[140px] animate-aurora"
      />
      <motion.div
        className="absolute -bottom-32 -right-32 size-[600px] rounded-full bg-cyan/[0.10] blur-[140px] animate-aurora"
        style={{ animationDelay: "-6s" }}
      />
      <motion.div
        className="absolute top-1/3 -left-32 size-[460px] rounded-full bg-[oklch(0.70_0.18_290_/_0.08)] blur-[140px] animate-aurora"
        style={{ animationDelay: "-12s" }}
      />

      {/* Floating particles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-neon"
          style={{
            width: i % 5 === 0 ? 3 : 1.5,
            height: i % 5 === 0 ? 3 : 1.5,
            left: `${(i * 53) % 100}%`,
            top: `${(i * 37) % 100}%`,
            filter: "blur(.6px)",
            boxShadow: "0 0 12px oklch(0.86 0.22 145 / 0.7)",
          }}
          animate={{
            y: [0, -28, 0],
            opacity: [0.12, 0.55, 0.12],
          }}
          transition={{
            duration: 7 + (i % 5),
            repeat: Infinity,
            delay: i * 0.35,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle noise */}
      <div className="absolute inset-0 bg-noise opacity-[0.35] mix-blend-overlay" />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,oklch(0.10_0.01_250/0.6)_100%)]" />
    </div>
  );
}
