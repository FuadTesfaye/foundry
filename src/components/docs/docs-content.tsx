"use client";

import { useState } from "react";
import type { DocBlock, DocSection } from "@/data/docs";
import { DocsPagination } from "@/components/docs/docs-pagination";
import { DocsToc } from "@/components/docs/docs-toc";
import { DocsBreadcrumbs } from "@/components/docs/docs-breadcrumbs";
import { Copy, Check, AlertTriangle, Info, Lightbulb, Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative overflow-hidden rounded-sm border border-white/12 bg-[#080808]">
      {language && (
        <div className="flex items-center justify-between border-b border-white/8 px-4 py-2">
          <span className="font-mono text-[9px] tracking-wider text-white/30 uppercase">
            {language}
          </span>
          <button
            type="button"
            onClick={copy}
            className="flex items-center gap-1.5 font-mono text-[9px] text-white/40 transition-colors hover:text-white/70"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" /> Copy
              </>
            )}
          </button>
        </div>
      )}
      {!language && (
        <button
          type="button"
          onClick={copy}
          className="absolute top-3 right-3 z-10 flex items-center gap-1 border border-white/10 bg-black/90 px-2 py-1 font-mono text-[9px] text-white/40 opacity-0 transition-opacity group-hover:opacity-100 hover:text-white/70"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        </button>
      )}
      <pre className="overflow-x-auto p-5 font-mono text-[12px] leading-[1.7] text-white/80">
        <code>{code}</code>
      </pre>
    </div>
  );
}

const calloutStyles = {
  tip: { icon: Lightbulb, border: "border-emerald-500/30", bg: "bg-emerald-500/5", text: "text-emerald-400/90" },
  note: { icon: Info, border: "border-blue-500/30", bg: "bg-blue-500/5", text: "text-blue-400/90" },
  warning: { icon: AlertTriangle, border: "border-amber-500/30", bg: "bg-amber-500/5", text: "text-amber-400/90" },
  important: { icon: Zap, border: "border-purple-500/30", bg: "bg-purple-500/5", text: "text-purple-400/90" },
};

function DocBlockRenderer({ block }: { block: DocBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p className="text-[15px] leading-[1.75] text-white/70">{block.text}</p>;

    case "heading":
      if (block.level === 2) {
        return (
          <h3 className="mt-8 mb-3 text-[15px] font-semibold text-white/90 first:mt-0">
            {block.text}
          </h3>
        );
      }
      return <h4 className="mt-5 mb-2 text-sm font-medium text-white/80">{block.text}</h4>;

    case "code":
      return <CodeBlock code={block.code} language={block.language} />;

    case "list":
      return (
        <ul className="space-y-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-white/70">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/50" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "table":
      return (
        <div className="overflow-x-auto rounded-sm border border-white/10">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                {block.headers.map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 font-mono text-[10px] tracking-wider text-white/45 uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b border-white/5 last:border-0 even:bg-white/[0.015]">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3 text-sm text-white/70">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "callout": {
      const style = calloutStyles[block.variant];
      const Icon = style.icon;
      return (
        <div className={cn("rounded-sm border p-4", style.border, style.bg)}>
          <div className="flex gap-3">
            <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", style.text)} />
            <div>
              {block.title && (
                <p className={cn("mb-1 font-mono text-[10px] font-bold tracking-wider uppercase", style.text)}>
                  {block.title}
                </p>
              )}
              <p className="text-sm leading-relaxed text-white/70">{block.text}</p>
            </div>
          </div>
        </div>
      );
    }

    case "steps":
      return (
        <ol className="space-y-0">
          {block.items.map((step, i) => (
            <li key={i} className="relative flex gap-5 pb-8 last:pb-0">
              {i < block.items.length - 1 && (
                <div className="absolute top-8 left-[15px] h-[calc(100%-2rem)] w-px bg-white/10" />
              )}
              <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center border border-white/20 bg-black font-mono text-[10px] text-white/70">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="min-w-0 flex-1 pt-1">
                <p className="mb-1.5 font-mono text-xs font-bold tracking-wider text-white">
                  {step.title.toUpperCase()}
                </p>
                <p className="text-sm leading-relaxed text-white/65">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      );

    case "links":
      return (
        <div className="grid gap-2 sm:grid-cols-2">
          {block.items.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-white/20 hover:bg-white/[0.04]"
            >
              <p className="font-mono text-xs text-white group-hover:text-white">{link.title}</p>
              <p className="mt-1 text-[11px] leading-relaxed text-white/45">{link.description}</p>
            </Link>
          ))}
        </div>
      );

    default:
      return null;
  }
}

function DocSectionRenderer({ section }: { section: DocSection }) {
  return (
    <section id={section.slug} className="scroll-mt-28">
      <div className="mb-6 flex items-center gap-3">
        <div className="h-px w-8 bg-white/25" />
        <h2 className="font-mono text-xs font-bold tracking-[0.15em] text-white">
          {section.title.toUpperCase()}
        </h2>
      </div>
      {section.description && (
        <p className="mb-5 text-sm leading-relaxed text-white/55">{section.description}</p>
      )}
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
  showOverview = false,
  overview,
}: {
  title: string;
  description: string;
  sections: DocSection[];
  slug?: string;
  showOverview?: boolean;
  overview?: React.ReactNode;
}) {
  return (
    <div className="flex gap-12 xl:gap-16">
      <article className="min-w-0 flex-1 max-w-3xl">
        <DocsBreadcrumbs />

        {showOverview && overview}

        {!showOverview && (
          <header className="mb-12 border-b border-white/10 pb-10">
            <p className="mb-3 font-mono text-[10px] tracking-[0.2em] text-white/35">GUIDE</p>
            <h1 className="mb-4 font-mono text-2xl font-bold tracking-[0.08em] text-white lg:text-3xl">
              {title.toUpperCase()}
            </h1>
            <p className="text-base leading-relaxed text-white/60">{description}</p>
          </header>
        )}

        {showOverview && sections.length > 0 && (
          <header className="mb-10 border-b border-white/10 pb-8">
            <h2 className="mb-3 font-mono text-lg font-bold tracking-wider text-white">OVERVIEW</h2>
            <p className="text-sm leading-relaxed text-white/55">{description}</p>
          </header>
        )}

        <div className="space-y-14">
          {sections.map((section) => (
            <DocSectionRenderer key={section.slug} section={section} />
          ))}
        </div>

        <DocsPagination slug={slug} />
      </article>

      <DocsToc sections={sections} />
    </div>
  );
}
