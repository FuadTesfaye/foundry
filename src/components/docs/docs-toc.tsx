"use client";

import { useEffect, useState } from "react";
import type { DocSection } from "@/data/docs";
import { cn } from "@/lib/utils";

export function DocsToc({ sections }: { sections: DocSection[] }) {
  const [active, setActive] = useState(sections[0]?.slug ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const el = document.getElementById(section.slug);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(section.slug);
        },
        { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  if (sections.length < 2) return null;

  return (
    <aside className="hidden w-52 shrink-0 xl:block">
      <div className="sticky top-14">
        <p className="mb-4 font-mono text-[9px] tracking-[0.2em] text-white/30">ON THIS PAGE</p>
        <ul className="space-y-1 border-l border-white/10">
          {sections.map((section) => (
            <li key={section.slug}>
              <a
                href={`#${section.slug}`}
                className={cn(
                  "block border-l-2 py-1.5 pl-3 font-mono text-[10px] leading-snug transition-colors",
                  active === section.slug
                    ? "border-white text-white"
                    : "border-transparent text-white/40 hover:border-white/20 hover:text-white/65"
                )}
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
