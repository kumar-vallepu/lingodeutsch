import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const Route = createFileRoute("/flashcards")({
  component: FlashcardsPage,
});

type Card = {
  id: string;
  german: string;
  english: string;
};

function FlashcardsPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
const [showAnswer, setShowAnswer] = useState(false);
const [search, setSearch] = useState("");
const filteredCards = cards.filter(
  (card) =>
    card.german.toLowerCase().includes(search.toLowerCase()) ||
    card.english.toLowerCase().includes(search.toLowerCase())
);

const currentCard = filteredCards[currentIndex];


const deleteFlashcard = async () => {
  if (!currentCard) return;

  console.log("Current Card:", currentCard);
console.log("Deleting card:", currentCard);
  const { data, error } = await supabase
 
  .from("vocabulary")
  
  .delete()
  
  .eq("id", currentCard.id)
  .select();

console.log("Deleted:", data);
console.log("Error:", error);

console.log("Delete error:", error);

  if (error) {
   console.error(error);

toast.error("Delete Failed", {
  description: "Could not remove flashcard",
});

return;
  }

  setCards((prev) =>
    prev.filter(
      (card) => card.id !== currentCard.id
    )
  );

  setCurrentIndex(0);
  toast.success("🗑 Flashcard Deleted", {
  description: "Removed from your vocabulary",
});
};

const speakGerman = () => {
  if (!currentCard?.german) return;

  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(
    currentCard.german
  );

  speech.lang = "de-DE";
  speech.rate = 0.9;

  window.speechSynthesis.speak(speech);
};

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    const { data, error } = await supabase
      .from("vocabulary")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setCards(data);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">
        📚 My Vocabulary
      </h1>
      <input
  type="text"
  placeholder="🔍 Search vocabulary..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="
    mb-6
    w-full
    rounded-2xl
    border
    border-glass-border
    bg-white/[0.03]
    px-4
    py-3
    outline-none
    focus:border-neon/40
  "
/>
      {cards.length > 0 && (
  <div
  className="
    glass-strong
    mb-8
    rounded-[32px]
    border
    border-neon/20
    p-10
    text-center
    shadow-[0_0_60px_-20px_oklch(0.86_0.22_145/0.25)]
  "
>
    <p className="mb-2 text-sm text-muted-foreground">
      Card {currentIndex + 1} / {cards.length}
    </p>

    <p className="font-display text-3xl font-bold">
      {showAnswer
        ? currentCard?.english
        : currentCard?.german}
    </p>

    <div className="mt-6 flex items-center justify-center gap-3">
      <button
  onClick={deleteFlashcard}
  className="rounded-xl border border-red-500/20 px-4 py-2 text-red-400 hover:bg-red-500/10"
>
  🗑 Delete
</button>
      

  <button
    onClick={() => {
      setCurrentIndex((prev) =>
        prev === 0 ? cards.length - 1 : prev - 1
      );
      setShowAnswer(false);
    }}
    className="rounded-xl border border-glass-border px-4 py-2"
  >
    ← Previous
  </button>
<button
  onClick={speakGerman}
  className="rounded-xl border border-neon/20 px-4 py-2 hover:bg-white/5"
>
  🔊 Listen
</button>

  <button
    onClick={() => setShowAnswer(!showAnswer)}
    className="rounded-xl bg-primary px-5 py-2 text-primary-foreground"
  >
    {showAnswer
      ? "Show German"
      : "Reveal Translation"}
  </button>

  <button
    onClick={() => {
      setCurrentIndex((prev) =>
        prev === cards.length - 1 ? 0 : prev + 1
      );
      setShowAnswer(false);
    }}
    className="rounded-xl border border-glass-border px-4 py-2"
  >
    Next →
  </button>

</div>
  </div>
)}
<div className="mt-6 grid gap-4 md:grid-cols-3">

  <div className="glass rounded-2xl p-5">
    <p className="text-xs uppercase tracking-widest text-neon">
      Saved Cards
    </p>

    <p className="mt-2 text-3xl font-bold">
      {cards.length}
    </p>
  </div>

  <div className="glass rounded-2xl p-5">
    <p className="text-xs uppercase tracking-widest text-neon">
      Current Card
    </p>

    <p className="mt-2 text-3xl font-bold">
      {currentIndex + 1}
    </p>
  </div>

  <div className="glass rounded-2xl p-5">
    <p className="text-xs uppercase tracking-widest text-neon">
      Progress
    </p>

    <p className="mt-2 text-3xl font-bold">
      {cards.length > 0
  ? Math.round(((currentIndex + 1) / cards.length) * 100)
  : 0}%
    </p>
  </div>
  </div>

</div>
);
}