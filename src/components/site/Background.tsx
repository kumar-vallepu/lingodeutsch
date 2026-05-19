import { motion } from "motion/react";

export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-hero" />
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60" />
      {/* Floating particles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute size-1 rounded-full bg-neon"
          style={{
            left: `${(i * 73) % 100}%`,
            top: `${(i * 47) % 100}%`,
            opacity: 0.35,
            filter: "blur(1px)",
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.15, 0.6, 0.15],
          }}
          transition={{
            duration: 6 + (i % 5),
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Ambient glow blobs */}
      <div className="absolute -top-32 left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-neon/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 size-[500px] rounded-full bg-cyan/10 blur-[120px]" />
    </div>
  );
}
