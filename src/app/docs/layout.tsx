import Link from "next/link";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { DocsMobileNav } from "@/components/docs/docs-mobile-nav";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="noise-overlay pointer-events-none fixed inset-0 z-[1] opacity-30" />
      <div className="grid-bg-fine pointer-events-none fixed inset-0 z-[1] opacity-15" />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/90 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between px-4 py-3.5">
          <Link
            href="/"
            className="-skew-x-12 transform font-mono text-sm font-bold tracking-[0.2em] italic"
          >
            FOUNDRY
          </Link>
          <Link
            href="/docs"
            className="font-mono text-[10px] tracking-wider text-white/50"
          >
            DOCS
          </Link>
        </div>
      </header>

      <div className="relative z-10 flex">
        <div className="hidden lg:block">
          <DocsSidebar />
        </div>
        <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-12 lg:py-12 xl:px-16">
          <DocsMobileNav />
          {children}
        </main>
      </div>
    </div>
  );
}
