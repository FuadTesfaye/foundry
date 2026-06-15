"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteNav } from "@/components/landing/site-nav";
import { useUnicornStudio } from "@/hooks/use-unicorn-studio";

export function HeroAscii() {
  useUnicornStudio();

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* UnicornStudio — Vitruvian animation (desktop/tablet) */}
      <div className="absolute inset-0 hidden md:block">
        <div
          data-us-project="whwOGlfJ5Rz2rHaEUgHl"
          className="h-full w-full"
          style={{ minHeight: "100vh" }}
        />
      </div>

      {/* Mobile starfield */}
      <div className="stars-bg absolute inset-0 md:hidden" />

      {/* Readability overlays — preserve animation visibility on right */}
      <div className="hero-vignette absolute inset-0 z-[1]" />
      <div className="noise-overlay absolute inset-0 z-[2]" />

      <SiteNav variant="hero" />

      {/* In-hero header (visible before scroll nav appears) */}
      <div className="absolute top-0 right-0 left-0 z-20 border-b border-white/10">
        <div className="container mx-auto flex items-center justify-between px-4 py-3 lg:px-8 lg:py-4">
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="-skew-x-12 transform font-mono text-xl font-bold tracking-[0.2em] text-white italic lg:text-2xl">
              FOUNDRY
            </div>
            <div className="h-3 w-px bg-white/30 lg:h-4" />
            <span className="font-mono text-[8px] tracking-wider text-white/50 lg:text-[10px]">
              EST. 2025
            </span>
          </div>

          <div className="hidden items-center gap-3 font-mono text-[10px] text-white/40 lg:flex">
            <span>LAT 37.7749°</span>
            <div className="h-1 w-1 rounded-full bg-white/30" />
            <span>LONG 122.4194°</span>
          </div>
        </div>
      </div>

      {/* Corner frame accents */}
      <div className="pointer-events-none absolute top-0 left-0 z-20 h-8 w-8 border-t-2 border-l-2 border-white/25 lg:h-12 lg:w-12" />
      <div className="pointer-events-none absolute top-0 right-0 z-20 h-8 w-8 border-t-2 border-r-2 border-white/25 lg:h-12 lg:w-12" />
      <div
        className="pointer-events-none absolute left-0 z-20 h-8 w-8 border-b-2 border-l-2 border-white/25 lg:h-12 lg:w-12"
        style={{ bottom: "5vh" }}
      />
      <div
        className="pointer-events-none absolute right-0 z-20 h-8 w-8 border-b-2 border-r-2 border-white/25 lg:h-12 lg:w-12"
        style={{ bottom: "5vh" }}
      />

      {/* Hero content */}
      <div
        className="relative z-10 flex min-h-screen items-center pt-20 lg:pt-0"
        style={{ marginTop: "4vh" }}
      >
        <div className="container mx-auto px-6 lg:ml-[8%] lg:px-16">
          <div className="relative max-w-xl">
            <div className="mb-4 flex items-center gap-2 opacity-50">
              <div className="h-px w-8 bg-white/70" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-white">001</span>
              <div className="h-px flex-1 max-w-32 bg-white/30" />
            </div>

            <div className="relative">
              <div className="dither-pattern absolute top-0 bottom-0 -left-3 hidden w-1 opacity-30 lg:block" />
              <h1 className="mb-4 font-mono text-3xl leading-[1.1] font-bold tracking-[0.14em] text-white lg:text-6xl">
                SHIP YOUR
                <span className="mt-2 block text-white/90">SAAS IN DAYS</span>
              </h1>
            </div>

            <div className="mb-4 hidden gap-1 opacity-30 lg:flex">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="h-0.5 w-0.5 rounded-full bg-white" />
              ))}
            </div>

            <p className="mb-8 max-w-md text-sm leading-relaxed text-white/65 lg:text-base">
              Where infrastructure meets velocity — auth, payments, AI workflows, and background
              jobs wired from day one. Enterprise-grade. Zero guesswork.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button asChild className="group relative">
                <Link href="#picker">
                  <span className="absolute -top-1 -left-1 hidden h-2 w-2 border-t border-l border-white opacity-0 transition-opacity group-hover:opacity-100 lg:block" />
                  <span className="absolute -right-1 -bottom-1 hidden h-2 w-2 border-r border-b border-white opacity-0 transition-opacity group-hover:opacity-100 lg:block" />
                  GET STARTED
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/docs">READ DOCS</Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-white/10 pt-6">
              <div>
                <p className="font-mono text-2xl font-bold text-white">15min</p>
                <p className="font-mono text-[9px] tracking-wider text-white/40">AVG SETUP</p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <p className="font-mono text-2xl font-bold text-white">32+</p>
                <p className="font-mono text-[9px] tracking-wider text-white/40">INTEGRATIONS</p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <p className="font-mono text-2xl font-bold text-white">∞</p>
                <p className="font-mono text-[9px] tracking-wider text-white/40">MODULES</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom status bar */}
      <div
        className="absolute right-0 left-0 z-20 border-t border-white/10 bg-black/50 backdrop-blur-md"
        style={{ bottom: "5vh" }}
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-2.5 lg:px-8 lg:py-3">
          <div className="flex items-center gap-3 font-mono text-[8px] text-white/45 lg:gap-6 lg:text-[9px]">
            <span className="hidden lg:inline">SYSTEM.ACTIVE</span>
            <span className="lg:hidden">SYS.ACT</span>
            <div className="hidden gap-1 lg:flex">
              {[8, 12, 6, 14, 9, 11, 7, 13].map((h, i) => (
                <div key={i} className="w-1 bg-white/25" style={{ height: `${h}px` }} />
              ))}
            </div>
            <span>V1.0.0</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[8px] text-white/45 lg:gap-4 lg:text-[9px]">
            <span className="hidden lg:inline">◐ RENDERING</span>
            <div className="flex gap-1">
              <div className="h-1 w-1 animate-pulse rounded-full bg-white/50" />
              <div
                className="h-1 w-1 animate-pulse rounded-full bg-white/35"
                style={{ animationDelay: "0.2s" }}
              />
              <div
                className="h-1 w-1 animate-pulse rounded-full bg-white/20"
                style={{ animationDelay: "0.4s" }}
              />
            </div>
            <span className="hidden lg:inline">FRAME: ∞</span>
          </div>
        </div>
      </div>
    </section>
  );
}
