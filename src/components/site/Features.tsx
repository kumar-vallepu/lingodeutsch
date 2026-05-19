import { motion } from "motion/react";
import { Mic, ShieldCheck, Sparkles, BookOpen, Flame, Headphones, MessagesSquare, LineChart } from "lucide-react";

const features = [
  { icon: Mic, title: "AI Voice Conversations", desc: "Speak naturally with your tutor. Get instant feedback on pronunciation, pacing, and clarity." },
  { icon: ShieldCheck, title: "Real-Time Grammar Correction", desc: "Every sentence is checked for case, conjugation, and word order — with concise explanations." },
  { icon: BookOpen, title: "Smart Vocabulary Tracking", desc: "We remember every word you learn and resurface it before you forget. Spaced repetition built-in." },
  { icon: Sparkles, title: "Personalized AI Tutor", desc: "Your tutor adapts to your level, goals, and weak points — from beginner basics to C1 nuance." },
  { icon: Flame, title: "Daily Learning Streaks", desc: "Short, focused sessions that fit your day. Build a streak you actually want to keep." },
  { icon: Headphones, title: "Pronunciation Assistance", desc: "Native-quality TTS plus phoneme-level scoring. Sound like a local, not a textbook." },
  { icon: MessagesSquare, title: "German Conversation Practice", desc: "Order coffee, negotiate rent, debate philosophy. Real scenarios. Real fluency." },
  { icon: LineChart, title: "Progress Analytics", desc: "Track fluency, vocabulary, accuracy and time-on-task with a dashboard built for serious learners." },
];

export function Features() {
  return (
    <section id="features" className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neon">Features</p>
        <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
          Everything you need to <span className="text-gradient-neon">actually speak German</span>.
        </h2>
        <p className="mt-5 text-base text-muted-foreground sm:text-lg">
          Not flashcards. Not gamified fluff. A serious AI tutor that meets you where you are.
        </p>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group glass glass-hover relative overflow-hidden rounded-2xl p-6"
          >
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-neon/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/15 text-neon ring-1 ring-glass-border transition-all duration-300 group-hover:ring-neon/40 group-hover:shadow-[0_0_28px_-4px_oklch(0.86_0.22_145/0.5)]">
              <f.icon className="size-5" />
            </div>
            <h3 className="mt-5 font-display text-base font-semibold tracking-tight">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
