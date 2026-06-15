import Link from "next/link";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { DocsMobileNav } from "@/components/docs/docs-mobile-nav";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="noise-overlay pointer-events-none fixed inset-0 z-50 opacity-40" />
      <div className="grid-bg-fine pointer-events-none fixed inset-0 opacity-20" />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/85 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between px-4 py-3.5">
          <Link
            href="/"
            className="-skew-x-12 transform font-mono text-sm font-bold tracking-[0.2em] italic"
          >
            FOUNDRY
          </Link>
          <Link href="/docs" className="font-mono text-[10px] tracking-wider text-white/50">
            DOCS
          </Link>
        </div>
      </header>

      <div className="relative flex">
        <div className="hidden lg:block">
          <DocsSidebar />
        </div>
        <main className="flex-1 px-6 py-10 lg:px-16 lg:py-14">
          <DocsMobileNav />
          {children}
        </main>
      </div>
    </div>
  );
}
