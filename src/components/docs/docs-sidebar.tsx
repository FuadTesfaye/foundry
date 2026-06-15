"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNav } from "@/data/docs";
import { DocsSearch } from "@/components/docs/docs-search";
import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col overflow-y-auto border-r border-white/10 bg-black/95 xl:w-72">
      <div className="border-b border-white/10 p-5">
        <Link href="/" className="flex items-center gap-2">
          <span className="-skew-x-12 transform font-mono text-sm font-bold tracking-[0.2em] text-white italic">
            FOUNDRY
          </span>
        </Link>
        <div className="mt-2 flex items-center gap-1.5">
          <BookOpen className="h-3 w-3 text-white/30" />
          <span className="font-mono text-[9px] tracking-[0.15em] text-white/35">DOCUMENTATION</span>
        </div>
        <Link
          href="/"
          className="mt-3 inline-block text-[11px] text-white/40 transition-colors hover:text-white/70"
        >
          ← Back to site
        </Link>
      </div>

      <div className="border-b border-white/10 p-4">
        <DocsSearch />
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        {docsNav.map((group) => (
          <div key={group.title}>
            <h3 className="mb-2 px-2 font-mono text-[9px] tracking-[0.2em] text-white/25">
              {group.title.toUpperCase()}
            </h3>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const href = item.slug ? `/docs/${item.slug}` : "/docs";
                const isActive = pathname === href;

                return (
                  <li key={item.slug}>
                    <Link
                      href={href}
                      className={cn(
                        "block rounded-sm border-l-2 py-2 pr-2 pl-3 text-[13px] transition-all",
                        isActive
                          ? "border-white bg-white/[0.06] font-medium text-white"
                          : "border-transparent text-white/50 hover:border-white/15 hover:bg-white/[0.02] hover:text-white/80"
                      )}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-4">
        <Link
          href="/docs/quick-start"
          className="block border border-white/15 bg-white/[0.03] px-3 py-2.5 text-center font-mono text-[10px] tracking-wider text-white/60 transition-colors hover:border-white/25 hover:text-white"
        >
          START HERE →
        </Link>
      </div>
    </aside>
  );
}
