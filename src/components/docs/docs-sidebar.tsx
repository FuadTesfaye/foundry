"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNav } from "@/data/docs";
import { cn } from "@/lib/utils";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 h-screen w-64 shrink-0 overflow-y-auto border-r border-white/10 bg-black py-8">
      <div className="px-6">
        <Link
          href="/docs"
          className="-skew-x-12 transform font-mono text-sm font-bold tracking-widest text-white italic"
        >
          DOCS
        </Link>
        <Link
          href="/"
          className="mt-2 block font-mono text-[10px] text-white/40 transition-colors hover:text-white"
        >
          ← Back to site
        </Link>
      </div>

      <nav className="mt-8 space-y-8 px-4">
        {docsNav.map((group) => (
          <div key={group.title}>
            <h3 className="mb-3 px-2 font-mono text-[9px] tracking-wider text-white/30">
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
                        "block border-l-2 px-3 py-1.5 font-mono text-[11px] transition-colors",
                        isActive
                          ? "border-white text-white"
                          : "border-transparent text-white/50 hover:border-white/30 hover:text-white/80"
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
