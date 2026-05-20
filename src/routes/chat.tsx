import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Background } from "@/components/site/Background";
import { Logo } from "@/components/site/Logo";
import { Mic, Send, Volume2, Plus, MessageSquare, Sparkles, Settings, Languages, BookOpen } from "lucide-react";

export const Route = createFileRoute("/chat")({
  component: ChatPage,
  head: () => ({ meta: [{ title: "AI Tutor Chat — LingoDeutsch" }, { name: "description", content: "Chat with your German AI tutor. Voice, text, instant corrections and translations." }] }),
});

type Msg = { role: "user" | "ai"; content: any };

const initial: Msg[] = [
  { role: "user", content: "I want to learn German." },
  { role: "ai", content: { de: "Ich möchte Deutsch lernen.", en: "I want to learn German." } },
  { role: "user", content: "Ich gehen Schule" },
  { role: "ai", content: { correction: "Ich gehe zur Schule.", en: "I am going to school.", tip: '"gehen" → "gehe" (ich form). Add "zur" before destinations.' } },
];

const histories = [
  { id: 1, title: "Daily greetings", time: "Today", active: true },
  { id: 2, title: "At the bakery", time: "Today" },
  { id: 3, title: "Dative practice", time: "Yesterday" },
  { id: 4, title: "Travel scenarios", time: "Yesterday" },
  { id: 5, title: "Modal verbs deep-dive", time: "Mon" },
  { id: 6, title: "Job interview prep", time: "Sun" },
];

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>(initial);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = () => {
    if (!input.trim()) return;
    const text = input.trim();
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        { role: "ai", content: { de: "Sehr gut! Versuchen wir es nochmal.", en: "Very good! Let's try again." } },
      ]);
    }, 1100);
  };

  return (
    <div className="relative min-h-screen">
      <Background />
      <div className="relative mx-auto flex h-screen max-w-[1480px] gap-4 p-3 sm:p-4">
        {/* Sidebar */}
        <aside className="glass-strong border-gradient hidden w-72 shrink-0 flex-col rounded-3xl p-4 md:flex">
          <Logo />
          <button className="btn-primary-glow mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01] active:scale-[0.99]">
            <Plus className="size-4" /> New conversation
          </button>
          <p className="mt-7 px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">History</p>
          <div className="mt-2 flex-1 space-y-1 overflow-y-auto pr-1">
            {histories.map((h) => (
              <button
                key={h.id}
                className={`group flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm transition-all ${
                  h.active ? "bg-white/[0.06] ring-1 ring-glass-border" : "hover:bg-white/[0.04]"
                }`}
              >
                <MessageSquare className={`size-4 ${h.active ? "text-neon" : "text-muted-foreground group-hover:text-neon"}`} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{h.title}</p>
                  <p className="text-[10px] text-muted-foreground">{h.time}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="glass mt-4 rounded-2xl p-3">
            <div className="flex items-center gap-2.5">
              <div className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground text-xs font-bold ring-1 ring-white/20">A</div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-semibold">Anna Müller</p>
                <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-neon animate-pulse" /> B1 · 14 day streak
                </p>
              </div>
              <button className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-white/5 hover:text-foreground">
                <Settings className="size-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="glass-strong border-gradient relative flex flex-1 flex-col overflow-hidden rounded-3xl">
          <div className="pointer-events-none absolute -top-32 left-1/2 size-[420px] -translate-x-1/2 rounded-full bg-neon/[0.08] blur-[100px]" />

          <header className="relative flex items-center justify-between border-b border-glass-border px-4 py-3.5 sm:px-5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground font-display text-sm font-bold ring-1 ring-white/20 shadow-[0_0_20px_-4px_oklch(0.86_0.22_145/0.6)]">
                  AI
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-neon ring-2 ring-card animate-pulse" />
              </div>
              <div>
                <p className="font-display text-sm font-semibold tracking-tight">Lukas · German Tutor</p>
                <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Sparkles className="size-3 text-neon" /> Adaptive · B1 level · Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="glass glass-hover hidden size-9 place-items-center rounded-xl text-muted-foreground sm:grid">
                <Languages className="size-4" />
              </button>
              <button className="glass glass-hover hidden size-9 place-items-center rounded-xl text-muted-foreground sm:grid">
                <BookOpen className="size-4" />
              </button>
              <button className="glass glass-hover grid size-9 place-items-center rounded-xl text-neon">
                <Volume2 className="size-4" />
              </button>
            </div>
          </header>

          <div ref={scrollRef} className="relative flex-1 space-y-4 overflow-y-auto px-4 py-6 sm:px-6">
            {messages.map((m, i) => (
              <ChatMsg key={i} msg={m} />
            ))}
            <AnimatePresence>
              {typing && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-start"
                >
                  <div className="glass flex items-center gap-1.5 rounded-2xl px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="size-1.5 rounded-full bg-neon"
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative border-t border-glass-border p-3 sm:p-4">
            <div className="group flex items-center gap-2 rounded-2xl border border-glass-border bg-white/[0.025] p-2 transition-all focus-within:border-neon/40 focus-within:bg-white/[0.04] focus-within:shadow-[0_0_0_4px_oklch(0.86_0.22_145/0.10)]">
              <button className="relative grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground animate-pulse-ring transition-transform active:scale-95">
                <Mic className="size-4" />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Schreib auf Deutsch oder Englisch…"
                className="flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-muted-foreground/60"
              />
              <button
                onClick={send}
                disabled={!input.trim()}
                className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground transition-all hover:scale-[1.05] active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
              >
                <Send className="size-4" />
              </button>
            </div>
            <p className="mt-2.5 text-center text-[11px] text-muted-foreground">
              LingoDeutsch uses AI. Verify important translations.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

function ChatMsg({ msg }: { msg: Msg }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm shadow-card sm:max-w-[70%] ${
          isUser
            ? "bg-gradient-to-br from-primary to-[oklch(0.78_0.20_155)] text-primary-foreground shadow-[0_8px_24px_-8px_oklch(0.86_0.22_145/0.45)]"
            : "glass text-foreground"
        }`}
      >
        {typeof msg.content === "string" ? (
          <p className="leading-relaxed">{msg.content}</p>
        ) : (
          <div className="space-y-2.5">
            {msg.content.correction && (
              <div>
                <p className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-neon">
                  <span className="size-1 rounded-full bg-neon" /> Correction
                </p>
                <p className="font-display text-[15px] font-medium leading-snug">{msg.content.correction}</p>
              </div>
            )}
            {msg.content.de && (
              <div>
                <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">German</p>
                <p className="font-display text-[15px] font-medium leading-snug">{msg.content.de}</p>
              </div>
            )}
            {msg.content.en && (
              <div>
                <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">English</p>
                <p className="text-foreground/75">{msg.content.en}</p>
              </div>
            )}
            {msg.content.tip && (
              <p className="mt-2 rounded-lg border border-glass-border bg-white/[0.03] px-2.5 py-2 text-[11px] leading-relaxed text-muted-foreground">
                💡 {msg.content.tip}
              </p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
