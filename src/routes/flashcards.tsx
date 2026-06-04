import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

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
const currentCard = cards[currentIndex];

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