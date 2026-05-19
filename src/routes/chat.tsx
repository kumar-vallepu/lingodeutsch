import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Background } from "@/components/site/Background";
import { Logo } from "@/components/site/Logo";
import { Mic, Send, Volume2, Plus, MessageSquare, Sparkles, Settings } from "lucide-react";

export const Route = createFileRoute("/chat")({
  component: ChatPage,
  head: () => ({ meta: [{ title: "AI Tutor Chat — LinguaBuddy" }, { name: "description", content: "Chat with your German AI tutor. Voice, text, instant corrections and translations." }] }),
});

type Msg = { role: "user" | "ai"; content: any };

const initial: Msg[] = [
  { role: "user", content: "I want to learn German." },
  { role: "ai", content: { de: "Ich möchte Deutsch lernen.", en: "I want to learn German." } },
  { role: "user", content: "Ich gehen Schule" },
  { role: "ai", content: { correction: "Ich gehe zur Schule.", en: "I am going to school.", tip: '"gehen" → "gehe" (ich form). Add "zur" before destinations.' } },
];

const histories = [
  { id: 1, title: "Daily greetings", time: "Today" },
  { id: 2, title: "At the bakery", time: "Today" },
  { id: 3, title: "Dative practice", time: "Yesterday" },
  { id: 4, title: "Travel scenarios", time: "Yesterday" },
  { id: 5, title: "Modal verbs deep-dive", time: "Mon" },
  { id: 6, title: "Job interview prep", time: "Sun" },
];

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>(initial);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const text = input.trim();
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { role: "ai", content: { de: "Sehr gut! Versuchen wir es nochmal.", en: "Very good! Let's try again." } },
      ]);
    }, 800);
  };

  return (
    <div className="relative min-h-screen">
      <Background />
      <div className="relative mx-auto flex h-screen max-w-[1400px] gap-4 p-4">
        {/* Sidebar */}
        <aside className="glass-strong hidden w-72 shrink-0 flex-col rounded-3xl p-4 md:flex">
          <Logo />
          <button className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_0_24px_-6px_oklch(0.86_0.22_145/0.7)]">
            <Plus className="size-4" /> New conversation
          </button>
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">History</p>
          <div className="mt-2 flex-1 space-y-1 overflow-y-auto pr-1">
            {histories.map((h) => (
              <button
                key={h.id}
                className="group flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-white/[0.04]"
              >
                <MessageSquare className="size-4 text-muted-foreground group-hover:text-neon" />
                <div className="min-w-0 flex-1">
                  <p className="truncate">{h.title}</p>
                  <p className="text-[10px] text-muted-foreground">{h.time}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="glass mt-4 rounded-2xl p-3">
            <div className="flex items-center gap-2">
              <div className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground text-xs font-bold">A</div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium">Anna Müller</p>
                <p className="text-[10px] text-muted-foreground">B1 · 14 day streak</p>
              </div>
              <Settings className="size-4 text-muted-foreground" />
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="glass-strong flex flex-1 flex-col rounded-3xl">
          <header className="flex items-center justify-between border-b border-glass-border p-4">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground font-display text-sm font-bold">
                  AI
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-neon ring-2 ring-card animate-pulse" />
              </div>
              <div>
                <p className="text-sm font-semibold">Lukas · German Tutor</p>
                <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Sparkles className="size-3 text-neon" /> Adaptive · B1 level
                </p>
              </div>
            </div>
            <button className="glass grid size-9 place-items-center rounded-xl text-neon hover:bg-white/5">
              <Volume2 className="size-4" />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto p-5">
            {messages.map((m, i) => (
              <ChatMsg key={i} msg={m} />
            ))}
          </div>

          <div className="border-t border-glass-border p-4">
            <div className="flex items-center gap-2 rounded-2xl border border-glass-border bg-white/[0.02] p-2">
              <button className="relative grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground animate-pulse-ring">
                <Mic className="size-4" />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Schreib auf Deutsch oder Englisch…"
                className="flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-muted-foreground/70"
              />
              <button
                onClick={send}
                className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                <Send className="size-4" />
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              LinguaBuddy uses AI. Verify important translations.
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
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
          isUser ? "bg-primary/90 text-primary-foreground" : "glass text-foreground"
        }`}
      >
        {typeof msg.content === "string" ? (
          msg.content
        ) : (
          <div className="space-y-2">
            {msg.content.correction && (
              <div>
                <p className="text-[10px] uppercase tracking-wider text-neon">Correction</p>
                <p className="font-medium">{msg.content.correction}</p>
              </div>
            )}
            {msg.content.de && (
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">German</p>
                <p className="font-medium">{msg.content.de}</p>
              </div>
            )}
            {msg.content.en && (
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">English</p>
                <p className="text-foreground/80">{msg.content.en}</p>
              </div>
            )}
            {msg.content.tip && (
              <p className="rounded-lg bg-white/[0.03] px-2.5 py-1.5 text-[11px] text-muted-foreground">
                {msg.content.tip}
              </p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
