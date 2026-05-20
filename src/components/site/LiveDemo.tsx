import { motion } from "motion/react";
import { Mic, Volume2 } from "lucide-react";

export function LiveDemo() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neon">Live AI Demo</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
            Conversations that actually <span className="text-gradient-neon">teach you</span>.
          </h2>
          <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
            LingoDeutsch listens, corrects, translates, and explains — in real time. No flashcards. Just real, productive dialogue.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {[
              "Speak or type — your tutor adapts to both.",
              "Every mistake becomes a 10-second lesson.",
              "Native-quality voice with phoneme-level feedback.",
            ].map((x) => (
              <li key={x} className="flex items-start gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-neon shadow-[0_0_8px_oklch(0.86_0.22_145)]" />
                <span className="text-foreground/80">{x}</span>
              </li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-strong border-gradient shadow-elegant relative overflow-hidden rounded-3xl p-5"
        >
          <div className="flex items-center justify-between border-b border-glass-border pb-3">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground font-display text-sm font-bold">
                  AI
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-neon ring-2 ring-card" />
              </div>
              <div>
                <p className="text-sm font-semibold">Conversation · Daily Practice</p>
                <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-neon animate-pulse" /> Tutor is listening
                </p>
              </div>
            </div>
            <button className="glass grid size-9 place-items-center rounded-xl text-neon hover:bg-white/5">
              <Volume2 className="size-4" />
            </button>
          </div>

          <div className="mt-4 max-h-[420px] space-y-3 overflow-hidden">
            <Msg role="user" delay={0}>I want to learn German.</Msg>
            <Msg role="ai" delay={0.3}>
              <Row label="German">Ich möchte Deutsch lernen.</Row>
              <Row label="English" muted>I want to learn German.</Row>
            </Msg>
            <Msg role="user" delay={0.6}>Ich gehen Schule</Msg>
            <Msg role="ai" delay={0.9}>
              <Row label="Correction" accent>Ich gehe zur Schule.</Row>
              <Row label="English" muted>I am going to school.</Row>
              <p className="mt-2 rounded-lg bg-white/[0.03] px-2.5 py-1.5 text-[11px] text-muted-foreground">
                Tip: <span className="text-foreground/90">"gehen"</span> → <span className="text-neon">"gehe"</span> (ich form). Add <span className="text-neon">"zur"</span> before destinations.
              </p>
            </Msg>
            <Msg role="user" delay={1.2}>Wie sagt man "thank you"?</Msg>
            <Msg role="ai" delay={1.5}>
              <Row label="German">Danke. (or formally: Danke schön.)</Row>
            </Msg>
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-glass-border bg-white/[0.02] p-2.5">
            <button className="relative grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground animate-pulse-ring">
              <Mic className="size-4" />
            </button>
            <div className="flex flex-1 items-center gap-0.5 px-2">
              {Array.from({ length: 32 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="block w-0.5 origin-center rounded-full bg-neon/70"
                  style={{ height: 18 + ((i * 11) % 16) }}
                  animate={{ scaleY: [0.4, 1, 0.4] }}
                  transition={{ duration: 1 + (i % 4) * 0.15, repeat: Infinity, delay: i * 0.04 }}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">Tap to speak</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Msg({ role, children, delay }: { role: "user" | "ai"; children: React.ReactNode; delay: number }) {
  const isUser = role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
          isUser ? "bg-primary/90 text-primary-foreground" : "glass text-foreground"
        }`}
      >
        {children}
      </div>
    </motion.div>
  );
}

function Row({
  label, children, accent, muted,
}: { label: string; children: React.ReactNode; accent?: boolean; muted?: boolean }) {
  return (
    <div className="mb-1 last:mb-0">
      <p className={`text-[10px] uppercase tracking-wider ${accent ? "text-neon" : "text-muted-foreground"}`}>{label}</p>
      <p className={`text-sm ${muted ? "text-foreground/70" : "font-medium"}`}>{children}</p>
    </div>
  );
}
