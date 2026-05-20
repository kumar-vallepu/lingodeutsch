import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { Mic, Sparkles, ArrowRight, Play } from "lucide-react";

export function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pt-10 pb-28 md:pt-20 md:pb-32">
      <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass inline-flex items-center gap-2 rounded-full py-1.5 pl-2 pr-3 text-xs"
          >
            <span className="inline-flex items-center gap-1 rounded-full bg-neon/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neon">
              <Sparkles className="size-3" /> Beta
            </span>
            <span className="text-muted-foreground">AI-Powered German Fluency</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[5rem]"
          >
            <span className="text-gradient">Master </span>
            <span className="text-gradient-neon">German</span>
            <span className="text-gradient"> with your</span>
            <br className="hidden sm:block" />
            <span className="text-gradient"> AI tutor.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Practice conversations, fix grammar, and build real fluency with an adaptive AI tutor — at your pace, your level, your voice.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/signup"
              className="group btn-primary-glow inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Start Learning Free
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/chat"
              className="glass glass-hover inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium"
            >
              <Play className="size-4 text-neon" />
              Try Live Demo
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-neon/60" />
                <span className="relative size-2 rounded-full bg-neon" />
              </span>
              12,000+ active learners
            </div>
            <span className="hidden sm:inline opacity-30">·</span>
            <div>A1 → C1 levels</div>
            <span className="hidden sm:inline opacity-30">·</span>
            <div>No credit card required</div>
          </motion.div>
        </div>

        <HeroPreview />
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="relative"
    >
      {/* Floating accent cards */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="glass absolute -left-4 top-10 z-10 hidden rounded-2xl p-3 sm:block"
      >
        <div className="flex items-center gap-2">
          <div className="grid size-8 place-items-center rounded-lg bg-neon/15">
            <Sparkles className="size-4 text-neon" />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Streak</p>
            <p className="text-sm font-semibold">14 days</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="glass absolute -right-2 bottom-12 z-10 hidden rounded-2xl p-3 sm:block"
      >
        <p className="text-[11px] text-muted-foreground">Fluency</p>
        <p className="text-sm font-semibold">B1 · Intermediate</p>
        <div className="mt-1.5 h-1 w-32 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-primary to-accent" />
        </div>
      </motion.div>

      <div className="glass-strong border-gradient shadow-elegant relative overflow-hidden rounded-3xl p-5">
        {/* inner glow */}
        <div className="pointer-events-none absolute -top-24 right-0 size-64 rounded-full bg-neon/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-12 size-64 rounded-full bg-cyan/15 blur-3xl" />

        <div className="relative flex items-center justify-between border-b border-glass-border pb-3">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
                <span className="font-display text-sm font-bold">AI</span>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-neon ring-2 ring-card" />
            </div>
            <div>
              <p className="text-sm font-semibold">Lukas · German Tutor</p>
              <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span className="size-1.5 rounded-full bg-neon" /> Online
              </p>
            </div>
          </div>
          <span className="rounded-full bg-white/5 px-2 py-1 text-[10px] text-muted-foreground">Lesson · 04</span>
        </div>

        <div className="mt-4 space-y-3">
          <Bubble role="user">I want to learn German.</Bubble>
          <Bubble role="ai">
            <p className="text-xs text-muted-foreground">German</p>
            <p className="font-medium">Ich möchte Deutsch lernen.</p>
            <p className="mt-2 text-xs text-muted-foreground">English</p>
            <p className="text-sm text-foreground/80">I want to learn German.</p>
          </Bubble>
          <Bubble role="user">Ich gehen Schule</Bubble>
          <Bubble role="ai">
            <p className="text-xs text-neon">Correction</p>
            <p className="font-medium">Ich gehe zur Schule.</p>
            <p className="mt-2 text-xs text-muted-foreground">English</p>
            <p className="text-sm text-foreground/80">I am going to school.</p>
          </Bubble>
          <TypingBubble />
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-glass-border bg-white/[0.02] p-2.5">
          <button className="relative grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground animate-pulse-ring">
            <Mic className="size-4" />
          </button>
          <Waveform />
          <span className="text-xs text-muted-foreground">0:04</span>
        </div>
      </div>
    </motion.div>
  );
}

function Bubble({ role, children }: { role: "user" | "ai"; children: React.ReactNode }) {
  const isUser = role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
          isUser
            ? "bg-primary/90 text-primary-foreground"
            : "glass text-foreground"
        }`}
      >
        {children}
      </div>
    </motion.div>
  );
}

function TypingBubble() {
  return (
    <div className="flex justify-start">
      <div className="glass flex items-center gap-1 rounded-2xl px-3.5 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="size-1.5 rounded-full bg-neon"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}

function Waveform() {
  return (
    <div className="flex flex-1 items-center gap-0.5 px-2">
      {Array.from({ length: 28 }).map((_, i) => (
        <motion.span
          key={i}
          className="block w-0.5 origin-center rounded-full bg-neon/70"
          style={{ height: 16 + ((i * 7) % 14) }}
          animate={{ scaleY: [0.4, 1, 0.4] }}
          transition={{ duration: 1 + (i % 3) * 0.2, repeat: Infinity, delay: i * 0.05 }}
        />
      ))}
    </div>
  );
}
