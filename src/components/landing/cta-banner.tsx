import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTABanner() {
  return (
    <section className="relative border-t border-white/10 bg-black py-24">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="relative border border-white/20 p-12 lg:p-16">
          <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-white/30" />
          <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-white/30" />
          <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-white/30" />
          <div className="absolute right-0 bottom-0 h-4 w-4 border-r-2 border-b-2 border-white/30" />

          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 font-mono text-[10px] tracking-wider text-white/40">
              READY TO SHIP?
            </p>
            <h2
              className="mb-4 font-mono text-2xl font-bold tracking-wider text-white lg:text-4xl"
              style={{ letterSpacing: "0.08em" }}
            >
              STOP WIRING. START BUILDING.
            </h2>
            <p className="mb-8 font-mono text-sm text-white/60">
              Clone the repo. Run one command. Answer five questions. Your SaaS ships in days,
              not months.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild variant="solid" size="lg">
                <Link href="#picker">npx create-nexlaunch@latest</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/docs">READ THE DOCS</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
