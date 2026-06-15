import Link from "next/link";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { DocsMobileNav } from "@/components/docs/docs-mobile-nav";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/90 backdrop-blur-sm lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="-skew-x-12 transform font-mono text-sm font-bold tracking-widest italic"
          >
            FOUNDRY
          </Link>
          <Link href="/docs" className="font-mono text-[10px] text-white/60">
            DOCS
          </Link>
        </div>
      </header>

      <div className="flex">
        <div className="hidden lg:block">
          <DocsSidebar />
        </div>
        <main className="flex-1 px-6 py-12 lg:px-16">
          <DocsMobileNav />
          {children}
        </main>
      </div>
    </div>
  );
}
