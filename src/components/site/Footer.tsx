import { Logo } from "./Logo";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-glass-border">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="glass-strong rounded-3xl p-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <Logo />
              <p className="mt-4 max-w-sm text-sm text-muted-foreground">
                The premium AI tutor that helps you master German through conversation, grammar coaching, and adaptive learning.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Product</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground">Features</a></li>
                <li><a href="/chat" className="hover:text-foreground">AI Tutor</a></li>
                <li><a href="/dashboard" className="hover:text-foreground">Dashboard</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Company</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
                <li>
                  <a href="#" className="inline-flex items-center gap-1.5 hover:text-foreground">
                    <Github className="size-4" /> GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-glass-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
            <p>© {new Date().getFullYear()} LinguaBuddy. Crafted for serious German learners.</p>
            <p className="max-w-md md:text-right">
              AI disclaimer: LinguaBuddy uses generative AI. Responses may contain errors — always verify critical translations.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
