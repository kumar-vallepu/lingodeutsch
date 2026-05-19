import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { Mic, Sparkles, ArrowRight, Play } from "lucide-react";

export function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pt-12 pb-24 md:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs"
          >
            <Sparkles className="size-3.5 text-neon" />
            <span className="text-muted-foreground">AI-powered German tutoring</span>
            <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-neon/15 px-2 py-0.5 text-[10px] font-medium text-neon">
              Beta
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Master <span className="text-gradient-neon">German</span> with Your AI Tutor.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground"
          >
            Practice conversations, improve grammar, and build fluency using intelligent AI-powered learning — at your pace, your level, your voice.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/signup"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_40px_-8px_oklch(0.86_0.22_145/0.7)] transition-transform hover:scale-[1.02]"
            >
              Start Learning
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/chat"
              className="glass inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-colors hover:bg-white/5"
            >
              <Play className="size-4 text-neon" />
              Try Live Demo
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex items-center gap-6 text-xs text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-neon animate-pulse" />
              12,000+ active learners
            </div>
            <div className="hidden sm:block">·</div>
            <div className="hidden sm:block">A1 → C1 levels</div>
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

      <div className="glass-strong shadow-elegant relative overflow-hidden rounded-3xl p-5">
        <div className="flex items-center justify-between border-b border-glass-border pb-3">
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
