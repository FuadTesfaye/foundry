"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroAscii() {
  useEffect(() => {
    const embedScript = document.createElement("script");
    embedScript.type = "text/javascript";
    embedScript.textContent = `
      !function(){
        if(!window.UnicornStudio){
          window.UnicornStudio={isInitialized:!1};
          var i=document.createElement("script");
          i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js";
          i.onload=function(){
            window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)
          };
          (document.head || document.body).appendChild(i)
        }
      }();
    `;
    document.head.appendChild(embedScript);

    const style = document.createElement("style");
    style.textContent = `
      [data-us-project] {
        position: relative !important;
        overflow: hidden !important;
      }
      [data-us-project] canvas {
        clip-path: inset(0 0 10% 0) !important;
      }
      [data-us-project] * {
        pointer-events: none !important;
      }
      [data-us-project] a[href*="unicorn"],
      [data-us-project] button[title*="unicorn"],
      [data-us-project] div[title*="Made with"],
      [data-us-project] .unicorn-brand,
      [data-us-project] [class*="brand"],
      [data-us-project] [class*="credit"],
      [data-us-project] [class*="watermark"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
      }
    `;
    document.head.appendChild(style);

    const hideBranding = () => {
      const projectDiv = document.querySelector("[data-us-project]");
      if (projectDiv) {
        projectDiv.querySelectorAll("*").forEach((el) => {
          const text = (el.textContent || "").toLowerCase();
          if (text.includes("made with") || text.includes("unicorn")) {
            el.remove();
          }
        });
      }
    };

    hideBranding();
    const interval = setInterval(hideBranding, 100);
    const t1 = setTimeout(hideBranding, 1000);
    const t2 = setTimeout(hideBranding, 3000);
    const t3 = setTimeout(hideBranding, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      embedScript.remove();
      style.remove();
    };
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 hidden h-full w-full lg:block">
        <div
          data-us-project="whwOGlfJ5Rz2rHaEUgHl"
          style={{ width: "100%", height: "100%", minHeight: "100vh" }}
        />
      </div>

      <div className="stars-bg absolute inset-0 h-full w-full lg:hidden" />

      <div className="absolute top-0 right-0 left-0 z-20 border-b border-white/20">
        <div className="container mx-auto flex items-center justify-between px-4 py-3 lg:px-8 lg:py-4">
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="-skew-x-12 transform font-mono text-xl font-bold tracking-widest text-white italic lg:text-2xl">
              NEXLAUNCH
            </div>
            <div className="h-3 w-px bg-white/40 lg:h-4" />
            <span className="font-mono text-[8px] text-white/60 lg:text-[10px]">EST. 2025</span>
          </div>

          <nav className="hidden items-center gap-6 font-mono text-[10px] text-white/60 lg:flex">
            <Link href="#features" className="transition-colors hover:text-white">
              FEATURES
            </Link>
            <Link href="#picker" className="transition-colors hover:text-white">
              CONFIGURE
            </Link>
            <Link href="/docs" className="transition-colors hover:text-white">
              DOCS
            </Link>
            <span>LAT: 37.7749°</span>
            <div className="h-1 w-1 rounded-full bg-white/40" />
            <span>LONG: 122.4194°</span>
          </nav>
        </div>
      </div>

      <div className="absolute top-0 left-0 z-20 h-8 w-8 border-t-2 border-l-2 border-white/30 lg:h-12 lg:w-12" />
      <div className="absolute top-0 right-0 z-20 h-8 w-8 border-t-2 border-r-2 border-white/30 lg:h-12 lg:w-12" />
      <div
        className="absolute left-0 z-20 h-8 w-8 border-b-2 border-l-2 border-white/30 lg:h-12 lg:w-12"
        style={{ bottom: "5vh" }}
      />
      <div
        className="absolute right-0 z-20 h-8 w-8 border-b-2 border-r-2 border-white/30 lg:h-12 lg:w-12"
        style={{ bottom: "5vh" }}
      />

      <div
        className="relative z-10 flex min-h-screen items-center pt-16 lg:pt-0"
        style={{ marginTop: "5vh" }}
      >
        <div className="container mx-auto px-6 lg:ml-[10%] lg:px-16">
          <div className="relative max-w-xl">
            <div className="mb-3 flex items-center gap-2 opacity-60">
              <div className="h-px w-8 bg-white" />
              <span className="font-mono text-[10px] tracking-wider text-white">001</span>
              <div className="h-px flex-1 bg-white" />
            </div>

            <div className="relative">
              <div className="dither-pattern absolute top-0 bottom-0 -left-3 hidden w-1 opacity-40 lg:block" />
              <h1
                className="mb-3 font-mono text-2xl leading-tight font-bold tracking-wider text-white lg:mb-4 lg:text-5xl"
                style={{ letterSpacing: "0.1em" }}
              >
                SHIP YOUR
                <span className="mt-1 block text-white opacity-90 lg:mt-2">SAAS IN DAYS</span>
              </h1>
            </div>

            <div className="mb-3 hidden gap-1 opacity-40 lg:flex">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="h-0.5 w-0.5 rounded-full bg-white" />
              ))}
            </div>

            <div className="relative">
              <p className="mb-5 font-mono text-xs leading-relaxed text-gray-300 opacity-80 lg:mb-6 lg:text-base">
                Where infrastructure meets velocity — the complete Next.js SaaS starter with
                auth, payments, AI, and jobs wired from day one.
              </p>
              <div
                className="absolute top-1/2 -right-4 hidden h-3 w-3 border border-white opacity-30 lg:block"
                style={{ transform: "translateY(-50%)" }}
              >
                <div
                  className="absolute top-1/2 left-1/2 h-1 w-1 bg-white"
                  style={{ transform: "translate(-50%, -50%)" }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:gap-4">
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

            <div className="mt-6 hidden items-center gap-2 opacity-40 lg:flex">
              <span className="font-mono text-[9px] text-white">∞</span>
              <div className="h-px flex-1 bg-white" />
              <span className="font-mono text-[9px] text-white">NEXLAUNCH</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute right-0 left-0 z-20 border-t border-white/20 bg-black/40 backdrop-blur-sm"
        style={{ bottom: "5vh" }}
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-2 lg:px-8 lg:py-3">
          <div className="flex items-center gap-3 font-mono text-[8px] text-white/50 lg:gap-6 lg:text-[9px]">
            <span className="hidden lg:inline">SYSTEM.ACTIVE</span>
            <span className="lg:hidden">SYS.ACT</span>
            <div className="hidden gap-1 lg:flex">
              {[8, 12, 6, 14, 9, 11, 7, 13].map((h, i) => (
                <div key={i} className="w-1 bg-white/30" style={{ height: `${h}px` }} />
              ))}
            </div>
            <span>V1.0.0</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[8px] text-white/50 lg:gap-4 lg:text-[9px]">
            <span className="hidden lg:inline">◐ RENDERING</span>
            <div className="flex gap-1">
              <div className="h-1 w-1 animate-pulse rounded-full bg-white/60" />
              <div
                className="h-1 w-1 animate-pulse rounded-full bg-white/40"
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

declare global {
  interface Window {
    UnicornStudio?: { isInitialized: boolean };
  }
}
