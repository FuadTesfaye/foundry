"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNav } from "@/data/docs";

export function DocsMobileNav() {
  const pathname = usePathname();

  const allItems = docsNav.flatMap((g) => [...g.items]);

  return (
    <div className="mb-8 overflow-x-auto border-b border-white/10 pb-4 lg:hidden">
      <div className="flex gap-2">
        {allItems.map((item) => {
          const href = item.slug ? `/docs/${item.slug}` : "/docs";
          const isActive = pathname === href;
          return (
            <Link
              key={item.slug}
              href={href}
              className={`shrink-0 border px-3 py-1.5 font-mono text-[10px] transition-colors ${
                isActive
                  ? "border-white bg-white text-black"
                  : "border-white/20 text-white/50"
              }`}
            >
              {item.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
