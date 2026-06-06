import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Background } from "@/components/site/Background";
import { Logo } from "@/components/site/Logo";
import { Mic, Send, Volume2, Plus, MessageSquare, Sparkles, Settings, Languages, BookOpen } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const Route = createFileRoute("/chat")({
  component: ChatPage,
  head: () => ({ meta: [{ title: "AI Tutor Chat — LingoDeutsch" }, { name: "description", content: "Chat with your German AI tutor. Voice, text, instant corrections and translations." }] }),
});

type Msg = { role: "user" | "ai"; content: any };

const histories = [
  { id: 1, title: "Daily greetings", time: "Today", active: true },
  { id: 2, title: "At the bakery", time: "Today" },
  { id: 3, title: "Dative practice", time: "Yesterday" },
  { id: 4, title: "Travel scenarios", time: "Yesterday" },
  { id: 5, title: "Modal verbs deep-dive", time: "Mon" },
  { id: 6, title: "Job interview prep", time: "Sun" },
];

function ChatPage() {
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [voiceMode, setVoiceMode] = useState(false);
const recognitionRef = useRef<any>(null);
const [messages, setMessages] = useState<Msg[]>([]);
const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
const [conversations, setConversations] = useState<any[]>([]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);
  useEffect(() => {
  scrollRef.current?.scrollTo({
    top: scrollRef.current.scrollHeight,
    behavior: "smooth"
  });
}, [messages, typing]);

useEffect(() => {
  if (voiceMode) {
    startVoiceConversation();
  } else {
    recognitionRef.current?.stop();
  }
}, [voiceMode]);

useEffect(() => {
  loadConversations();
}, []);



  useEffect(() => {

  const checkUser = async () => {

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {

      window.location.href = "/login";

      return;
    }

    if (session.user.email) {

      const fullName =
  session.user.user_metadata.full_name;

if (fullName) {

  setUsername(fullName);

} else {

  const fallback =
    session.user.email?.split("@")[0] || "User";

  setUsername(fallback);
}
    }
  };

  checkUser();

}, []);

const sendMessage = async (text: string) => {

  if (typing) return;

  setTyping(true);
  if (
  currentConversationId &&
  messages.length === 0
) {
  await supabase
    .from("conversations")
    .update({
      title:
        text.length > 40
          ? text.slice(0, 40) + "..."
          : text,
    })
    .eq("id", currentConversationId);

  loadConversations();
}
if (currentConversationId) {
  await supabase.from("messages").insert([
    {
      conversation_id: currentConversationId,
      role: "user",
      content: text,
    },
  ]);
}

  setMessages((m) => [
    ...m,
    {
      role: "user",
      content: text,
    },
  ]);

  try {

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          messages: messages.map((m) => ({
            role:
              m.role === "ai"
                ? "assistant"
                : "user",

            content:
              typeof m.content === "string"
                ? m.content
                : `GERMAN: ${m.content.de || ""}

ENGLISH: ${m.content.en || ""}`,
          })).concat([
            {
              role: "user",
              content: text,
            },
          ]),
        }),
      }
    );

    const data = await response.json();

    const reply = data.reply;
    const german =
  reply.german || "";

const english =
  reply.english || "";

const correction =
  reply.correction || "";

const questionGerman =
  reply.question_german || "";

const questionEnglish =
  reply.question_english || "";
    
    setMessages((m) => [
  ...m,
  {
    role: "ai",
    content: {
      de: german,
      en: english,
      correction,
      questionGerman,
      questionEnglish,
    },
  },
]);
if (currentConversationId) {
  await supabase.from("messages").insert([
    {
      conversation_id: currentConversationId,
      role: "assistant",
      content: JSON.stringify({
        de: german,
        en: english,
      }),
    },
  ]);
}
    speakText(german);

  } catch (error) {

    console.error(error);

  } finally {

    setTyping(false);
  }
};

const send = async () => {
  if (!input.trim()) return;

  const text = input.trim();

  setInput("");

  await sendMessage(text);
};

  
 const startListening = () => {

  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech Recognition not supported");
    return;
  }

  const recognition = new SpeechRecognition();

  recognitionRef.current = recognition;

  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.continuous = false;
  recognition.maxAlternatives = 1;

  setListening(true);

  recognition.start();

  recognition.onresult = (event: any) => {

    const transcript =
      event.results[0][0].transcript;

    sendMessage(transcript);

    setListening(false);
  };

  recognition.onerror = () => {
    setListening(false);
  };

  recognition.onend = () => {
    setListening(false);
  };
};

const speakText = (
  text: string
) => {

  window.speechSynthesis.cancel();

  const speech =
    new SpeechSynthesisUtterance(text);

  speech.lang = "de-DE";
  speech.rate = 0.95;
  speech.pitch = 1;
  speech.volume = 1;

  speech.onstart = () => {
    recognitionRef.current?.stop();
  };

  speech.onend = () => {

    if (voiceMode) {
      startListening();
    }
  };
speech.onend = () => {
  console.log("AI finished speaking");

  if (voiceMode) {
    console.log("Starting listening again");
    startListening();
  }
};
  window.speechSynthesis.speak(speech);
};

const startVoiceConversation = () => {
  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    toast.error("Speech Recognition not supported");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognitionRef.current = recognition;

 recognition.onresult = async (event: any) => {
  const transcript =
    event.results[event.results.length - 1][0].transcript;

  await sendMessage(transcript);
};

  recognition.start();
};

const createNewConversation = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data, error } = await supabase
    .from("conversations")
    .insert([
      {
        user_id: user.id,
        title: "New Conversation",
      },
    ])
    .select()
    .single();

  if (error) {
    console.error(error);
    return;
  }

  setCurrentConversationId(data.id);
  loadConversations();
  setMessages([]);
};

const loadConversations = async () => {
  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  setConversations(data || []);
};

const loadMessages = async (
  conversationId: string
) => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", {
      ascending: true,
    });

 const formattedMessages: Msg[] = data.map((msg) => ({
  role:
    msg.role === "assistant"
      ? ("ai" as const)
      : ("user" as const),

  content:
    msg.role === "assistant"
      ? (() => {
          try {
            const parsed = JSON.parse(msg.content);

            return {
              de: parsed.german || "",
              en: parsed.english || "",
              correction: parsed.correction || "",
              questionGerman:
                parsed.question_german || "",
              questionEnglish:
                parsed.question_english || "",
            };
          } catch {
            return {
              de: msg.content,
              en: "",
            };
          }
        })()
      : msg.content,
}));

setMessages(formattedMessages);

setCurrentConversationId(
  conversationId
);
};

return (
    <div className="relative min-h-screen">
      <Background />
      <div className="relative mx-auto flex h-screen max-w-[1480px] gap-4 p-3 sm:p-4">
        {/* Sidebar */}
        <aside className="glass-strong border-gradient hidden w-72 shrink-0 flex-col rounded-3xl p-4 md:flex">
          <Logo />
         <button
  onClick={createNewConversation}
  className="btn-primary-glow mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01] active:scale-[0.99]"
>
  <Plus className="size-4" />
  New conversation
</button>
          
          <p className="mt-7 px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">History</p>
          <div className="mt-2 flex-1 space-y-1 overflow-y-auto pr-1">
            {conversations.map((h) => (
              <button
                key={h.id}
                onClick={() =>
  loadMessages(h.id)
}
                className={`group flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm transition-all ${
                  currentConversationId === h.id ? "bg-white/[0.06] ring-1 ring-glass-border" : "hover:bg-white/[0.04]"
                }`}
              >
                <MessageSquare className={`size-4 ${currentConversationId === h.id? "text-neon" : "text-muted-foreground group-hover:text-neon"}`} />
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
                <p className="truncate text-sm font-semibold">
  {username || "User"}
</p>
                <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-neon animate-pulse" /> B1 · 14 day streak
                </p>
              </div>
              <button className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-white/5 hover:text-foreground">
                <Settings className="size-4" />
              </button>
            </div>
           <div className="mt-3 space-y-2">
  
<button
  onClick={() => setVoiceMode(!voiceMode)}
  className={`
    w-full
    rounded-xl
    px-4
    py-2
    text-sm
    font-medium
    transition-all
    duration-300
    ${
      voiceMode
        ? "bg-red-500 text-white shadow-lg shadow-red-500/20"
        : "border border-glass-border bg-white/[0.03] text-muted-foreground hover:bg-white/[0.06] hover:text-white"
    }
  `}
>
  {voiceMode
    ? "🛑 End Voice Mode"
    : "🎙 Conversation Mode"}
</button>
  
  
  
  
  
  
  <button
    onClick={() => {
      window.location.href = "/flashcards";
    }}
    className="w-full rounded-xl border border-glass-border bg-white/[0.03] px-4 py-2 text-sm text-muted-foreground transition hover:bg-white/[0.06] hover:text-white"
  >
    📚 Flashcards
  </button>

  <button
    onClick={async () => {
      await supabase.auth.signOut();
      window.location.href = "/login";
    }}
    className="w-full rounded-xl border border-glass-border bg-white/[0.03] px-4 py-2 text-sm text-muted-foreground transition hover:bg-white/[0.06] hover:text-white"
  >
    Logout
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
                <p className="font-display text-sm font-semibold tracking-tight">LingoDeutsch AI</p>
                <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Sparkles className="size-3 text-neon" /> Personal German Tutor
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
            
            {messages.length === 0 ? (
  <div className="flex h-full items-center justify-center">
    <div className="max-w-xl text-center">
      <h1 className="font-display text-4xl font-bold">
        🇩🇪 Welcome to LingoDeutsch
      </h1>

      <p className="mt-3 text-muted-foreground">
        Practice German through conversations,
        corrections, pronunciation, and vocabulary building.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <button
          onClick={() =>
            setInput("I want to learn German greetings")
          }
          className="glass rounded-xl px-4 py-2 text-sm"
        >
          👋 German Greetings
        </button>

        <button
          onClick={() =>
            setInput("Help me order food in German")
          }
          className="glass rounded-xl px-4 py-2 text-sm"
        >
          🍽 Restaurant Practice
        </button>

        <button
          onClick={() =>
            setInput("Teach me German grammar")
          }
          className="glass rounded-xl px-4 py-2 text-sm"
        >
          📖 Grammar Help
        </button>
      </div>
    </div>
  </div>
) : (
  messages.map((m, i) => (
    <ChatMsg key={i} msg={m} />
  ))
)}
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
             <button
                onClick={startListening}
                className={`relative grid size-10 shrink-0 place-items-center rounded-xl transition-transform active:scale-95 ${
                  listening
                    ? "bg-red-500 text-white animate-pulse"
                    : "bg-primary text-primary-foreground animate-pulse-ring"
                }`}
              >
                <Mic className="size-4`     " />
              </button>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {

                  if (e.key === "Enter") {

                    e.preventDefault();

                    send();
  }
}}
                placeholder="Schreib auf Deutsch oder Englisch…"
                className="flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-muted-foreground/60 disabled:opacity-50"
              />
              <button
                onClick={send}
                disabled={!input.trim() || typing}
                className="rounded-full bg-primary p-3 text-primary-foreground transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
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
const saveFlashcard = async () => {

  if (
    typeof msg.content === "string" ||
    !msg.content.de ||
    !msg.content.en
  ) {
    return;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { error } = await supabase
    .from("vocabulary")
    .insert([
      {
        user_id: user.id,
        german: msg.content.de,
        english: msg.content.en,
      },
    ]);

  if (error) {

    console.error(error);

    toast.error("Failed to save flashcard");

    return;
  }

 toast.success("🇩🇪 Added to Vocabulary", {
  description: "Review it anytime from your flashcards",
});
};

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
  <p className="font-display text-[16px] font-medium leading-relaxed">
    {msg.content.de}
  </p>
)}
{msg.content.en && (
  <>
    <p className="mt-2 text-sm leading-relaxed text-foreground/70">
      {msg.content.en}
    </p>

    <button
  onClick={saveFlashcard}
  className="mt-2 rounded-lg border border-glass-border px-3 py-1.5 text-xs text-muted-foreground hover:bg-white/5"
>
  📚 Add to Vocabulary
</button>
  </>
)}
          </div>
        )}
      </div>
    </motion.div>
  );
}
