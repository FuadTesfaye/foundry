"use client";

import { useState } from "react";
import type { DocBlock, DocSection } from "@/data/docs";
import { DocsPagination } from "@/components/docs/docs-pagination";
import { Copy, Check } from "lucide-react";

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative overflow-hidden border border-white/10 bg-[#0a0a0a]">
      <button
        type="button"
        onClick={copy}
        className="absolute top-3 right-3 border border-white/10 bg-black/80 p-1.5 opacity-0 transition-opacity group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="h-3 w-3 text-white/70" />
        ) : (
          <Copy className="h-3 w-3 text-white/50" />
        )}
      </button>
      <pre className="overflow-x-auto p-5 font-mono text-[11px] leading-relaxed text-white/75">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function DocBlockRenderer({ block }: { block: DocBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p className="text-sm leading-relaxed text-white/65 lg:text-base">{block.text}</p>;
    case "heading":
      if (block.level === 2) {
        return (
          <h2
            id={block.text.toLowerCase().replace(/\s+/g, "-")}
            className="mt-10 mb-4 font-mono text-base font-bold tracking-wider text-white first:mt-0 lg:text-lg"
          >
            {block.text}
          </h2>
        );
      }
      return <h3 className="mt-6 mb-3 text-sm font-semibold text-white/90">{block.text}</h3>;
    case "code":
      return <CodeBlock code={block.code} />;
    case "list":
      return (
        <ul className="space-y-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-white/65">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/40" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="overflow-x-auto border border-white/10">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                {block.headers.map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-mono text-[10px] tracking-wider text-white/40"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b border-white/5 last:border-0">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3 text-xs text-white/65">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

function DocSectionRenderer({ section }: { section: DocSection }) {
  return (
    <section id={section.slug} className="scroll-mt-28">
      <div className="mb-5 flex items-center gap-3">
        <div className="h-px w-6 bg-white/30" />
        <h2 className="font-mono text-xs font-bold tracking-[0.15em] text-white/80">
          {section.title.toUpperCase()}
        </h2>
      </div>
      <div className="space-y-5">
        {section.content.map((block, i) => (
          <DocBlockRenderer key={i} block={block} />
        ))}
      </div>
    </section>
  );
}

export function DocsContent({
  title,
  description,
  sections,
  slug = "",
}: {
  title: string;
  description: string;
  sections: DocSection[];
  slug?: string;
}) {
  return (
    <article className="max-w-3xl">
      <header className="mb-12 border-b border-white/10 pb-10">
        <p className="mb-3 font-mono text-[10px] tracking-[0.2em] text-white/35">DOCUMENTATION</p>
        <h1 className="mb-4 font-mono text-3xl font-bold tracking-[0.1em] text-white lg:text-4xl">
          {title.toUpperCase()}
        </h1>
        <p className="text-sm leading-relaxed text-white/55 lg:text-base">{description}</p>
      </header>

      <div className="space-y-14">
        {sections.map((section) => (
          <DocSectionRenderer key={section.slug} section={section} />
        ))}
      </div>

      {sections.length > 1 && (
        <nav className="mt-14 rounded border border-white/10 bg-white/[0.02] p-6">
          <p className="mb-4 font-mono text-[9px] tracking-[0.2em] text-white/35">ON THIS PAGE</p>
          <ul className="space-y-2">
            {sections.map((s) => (
              <li key={s.slug}>
                <a
                  href={`#${s.slug}`}
                  className="font-mono text-[11px] text-white/50 transition-colors hover:text-white"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <DocsPagination slug={slug} />
    </article>
  );
}
