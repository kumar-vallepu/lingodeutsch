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
        className="glass-strong relative overflow-hidden rounded-3xl p-10 text-center sm:p-16"
      >
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-50" />
        <div className="pointer-events-none absolute -top-32 left-1/2 size-[400px] -translate-x-1/2 rounded-full bg-neon/20 blur-[100px]" />

        <div className="relative">
          <div className="glass mx-auto inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs">
            <Sparkles className="size-3.5 text-neon" />
            <span className="text-muted-foreground">Limited beta access</span>
          </div>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-semibold sm:text-5xl">
            Start Your German Learning Journey with <span className="text-gradient-neon">AI</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Join thousands of learners building real fluency with a tutor that never sleeps.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/signup"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_40px_-8px_oklch(0.86_0.22_145/0.7)] transition-transform hover:scale-[1.02]"
            >
              Launch App
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/signup"
              className="glass inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium hover:bg-white/5"
            >
              Join Beta
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
