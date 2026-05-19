import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { DashboardPreview } from "@/components/site/DashboardPreview";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
  head: () => ({ meta: [{ title: "Dashboard — LinguaBuddy" }, { name: "description", content: "Track your German fluency, streaks, XP, vocabulary and progress." }] }),
});

function DashboardPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-6 pt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neon">Your Dashboard</p>
        <h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">
          Guten Tag, <span className="text-gradient-neon">Anna</span>.
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Here's where your fluency stands today. Keep your streak alive with a quick session.
        </p>
      </section>
      <DashboardPreview />
    </SiteShell>
  );
}
