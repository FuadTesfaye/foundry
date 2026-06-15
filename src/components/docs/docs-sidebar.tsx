"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNav } from "@/data/docs";
import { DocsSearch } from "@/components/docs/docs-search";
import { cn } from "@/lib/utils";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-72 shrink-0 flex-col overflow-y-auto border-r border-white/10 bg-black">
      <div className="border-b border-white/10 p-6">
        <Link
          href="/"
          className="-skew-x-12 transform font-mono text-sm font-bold tracking-[0.2em] text-white italic"
        >
          FOUNDRY
        </Link>
        <p className="mt-1 font-mono text-[9px] tracking-wider text-white/30">DOCUMENTATION</p>
        <Link
          href="/"
          className="mt-3 inline-block font-mono text-[10px] text-white/40 transition-colors hover:text-white"
        >
          ← Back to site
        </Link>
      </div>

      <div className="p-4">
        <DocsSearch />
      </div>

      <nav className="flex-1 space-y-8 px-4 pb-8">
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
                        "block border-l-2 py-2 pr-2 pl-3 font-mono text-[11px] transition-all",
                        isActive
                          ? "border-white bg-white/[0.04] text-white"
                          : "border-transparent text-white/45 hover:border-white/20 hover:text-white/75"
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
    </aside>
  );
}
