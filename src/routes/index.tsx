import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Hero } from "@/components/site/Hero";
import { LiveDemo } from "@/components/site/LiveDemo";
import { Features } from "@/components/site/Features";
import { DashboardPreview } from "@/components/site/DashboardPreview";
import { CTA } from "@/components/site/CTA";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <SiteShell>
      <Hero />
      <LiveDemo />
      <Features />
      <DashboardPreview />
      <CTA />
    </SiteShell>
  );
}
