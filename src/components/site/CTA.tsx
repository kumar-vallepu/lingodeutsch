import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTA() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-strong border-gradient relative overflow-hidden rounded-3xl p-10 text-center sm:p-16"
      >
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-40" />
        <div className="pointer-events-none absolute -top-32 left-1/2 size-[480px] -translate-x-1/2 rounded-full bg-neon/[0.18] blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 right-0 size-[420px] rounded-full bg-cyan/[0.12] blur-[120px]" />

        <div className="relative">
          <div className="glass mx-auto inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs">
            <Sparkles className="size-3.5 text-neon" />
            <span className="text-muted-foreground">Limited beta access</span>
          </div>
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            Start your German journey with <span className="text-gradient-neon">AI</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Join thousands of learners building real fluency with a tutor that never sleeps.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/signup"
              className="group btn-primary-glow inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Launch App
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/signup"
              className="glass glass-hover inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium"
            >
              Join Beta
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
