import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/landing/fade-in";

export function CTABanner() {
  return (
    <section className="relative border-t border-white/10 bg-black py-24">
      <div className="section-glow pointer-events-none absolute inset-0" />

      <div className="container relative mx-auto px-6 lg:px-16">
        <FadeIn>
          <div className="relative overflow-hidden border border-white/15 p-12 lg:p-20">
            <div className="grid-bg-fine pointer-events-none absolute inset-0 opacity-40" />
            <div className="pointer-events-none absolute top-0 left-0 h-5 w-5 border-t-2 border-l-2 border-white/30" />
            <div className="pointer-events-none absolute top-0 right-0 h-5 w-5 border-t-2 border-r-2 border-white/30" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-white/30" />
            <div className="pointer-events-none absolute right-0 bottom-0 h-5 w-5 border-b-2 border-r-2 border-white/30" />

            <div className="relative mx-auto max-w-2xl text-center">
              <p className="mb-4 font-mono text-[10px] tracking-[0.25em] text-white/40">
                READY TO SHIP?
              </p>
              <h2 className="mb-4 font-mono text-2xl font-bold tracking-[0.12em] text-white lg:text-4xl">
                STOP WIRING. START BUILDING.
              </h2>
              <p className="mb-10 text-sm leading-relaxed text-white/55 lg:text-base">
                Clone the repo. Run one command. Answer five questions. Your SaaS ships in days,
                not months.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild variant="solid" size="lg">
                  <Link href="#picker">npx create-foundry@latest</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/docs">READ THE DOCS</Link>
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
