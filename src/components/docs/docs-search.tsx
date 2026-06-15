"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { docsNav } from "@/data/docs";

export function DocsSearch() {
  const [query, setQuery] = useState("");

  const allPages = useMemo(
    () =>
      docsNav.flatMap((group) =>
        group.items.map((item) => ({
          title: item.title,
          href: item.slug ? `/docs/${item.slug}` : "/docs",
          group: group.title,
        }))
      ),
    []
  );

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allPages.filter(
      (p) => p.title.toLowerCase().includes(q) || p.group.toLowerCase().includes(q)
    );
  }, [query, allPages]);

  return (
    <div className="relative mb-8">
      <Search className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-white/30" />
      <input
        type="search"
        placeholder="Search documentation..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border border-white/10 bg-white/[0.03] py-2.5 pr-4 pl-9 font-mono text-xs text-white placeholder:text-white/30 outline-none transition-colors focus:border-white/25"
      />
      {results.length > 0 && (
        <div className="absolute top-full right-0 left-0 z-20 mt-1 max-h-48 overflow-y-auto border border-white/10 bg-black">
          {results.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              onClick={() => setQuery("")}
              className="block border-b border-white/5 px-4 py-2.5 transition-colors last:border-0 hover:bg-white/[0.03]"
            >
              <span className="font-mono text-xs text-white">{r.title}</span>
              <span className="ml-2 font-mono text-[9px] text-white/30">{r.group}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
