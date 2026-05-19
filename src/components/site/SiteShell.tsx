import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Background } from "./Background";

export function SiteShell({ children, hideFooter = false }: { children: ReactNode; hideFooter?: boolean }) {
  return (
    <div className="relative min-h-screen">
      <Background />
      <Navbar />
      <main className="pt-24">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
}
