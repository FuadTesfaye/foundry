"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNav } from "@/data/docs";
import { cn } from "@/lib/utils";

export function DocsMobileNav() {
  const pathname = usePathname();

  return (
    <div className="mb-6 lg:hidden">
      <div className="flex gap-4 overflow-x-auto border-b border-white/10 pb-3">
        {docsNav.map((group) => (
          <div key={group.title} className="shrink-0">
            <p className="mb-2 font-mono text-[8px] tracking-wider text-white/25">
              {group.title.toUpperCase()}
            </p>
            <div className="flex gap-1.5">
              {group.items.map((item) => {
                const href = item.slug ? `/docs/${item.slug}` : "/docs";
                const isActive = pathname === href;
                return (
                  <Link
                    key={item.slug}
                    href={href}
                    className={cn(
                      "shrink-0 border px-2.5 py-1 font-mono text-[9px] transition-colors",
                      isActive
                        ? "border-white bg-white text-black"
                        : "border-white/15 text-white/50"
                    )}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
