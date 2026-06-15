"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#features", label: "Features" },
  { href: "#picker", label: "Configure" },
  { href: "#pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
];

export function SiteNav({ variant = "default" }: { variant?: "hero" | "default" }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHero = variant === "hero";
  const showBar = isHero ? scrolled : true;

  if (isHero && !showBar) return null;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
          showBar
            ? "border-b border-white/10 bg-black/80 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-3 lg:px-8 lg:py-3.5">
          <Link
            href="/"
            className="-skew-x-12 transform font-mono text-lg font-bold tracking-[0.2em] text-white italic"
          >
            FOUNDRY
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-[10px] tracking-wider text-white/50 transition-colors hover:text-white"
              >
                {link.label.toUpperCase()}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button asChild variant="ghost" size="sm">
              <Link href="/docs">Docs</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="#picker">Get Started</Link>
            </Button>
          </div>

          <button
            type="button"
            className="text-white/70 lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 pt-16 lg:hidden">
          <nav className="flex flex-col gap-1 px-6 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-white/5 py-4 font-mono text-sm tracking-wider text-white/70"
              >
                {link.label.toUpperCase()}
              </Link>
            ))}
            <Button asChild className="mt-6 w-full">
              <Link href="#picker" onClick={() => setMobileOpen(false)}>
                GET STARTED
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </>
  );
}
