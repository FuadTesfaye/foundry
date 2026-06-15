import type { DocBlock, DocSection } from "@/data/docs";

function DocBlockRenderer({ block }: { block: DocBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p className="font-mono text-sm leading-relaxed text-white/70">{block.text}</p>;
    case "heading":
      if (block.level === 2) {
        return (
          <h2
            id={block.text.toLowerCase().replace(/\s+/g, "-")}
            className="mt-10 mb-4 font-mono text-lg font-bold tracking-wider text-white first:mt-0"
          >
            {block.text}
          </h2>
        );
      }
      return (
        <h3 className="mt-6 mb-3 font-mono text-sm font-bold text-white/90">{block.text}</h3>
      );
    case "code":
      return (
        <pre className="overflow-x-auto border border-white/10 bg-white/[0.02] p-4 font-mono text-[11px] leading-relaxed text-white/80">
          <code>{block.code}</code>
        </pre>
      );
    case "list":
      return (
        <ul className="space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 font-mono text-sm text-white/70">
              <span className="text-white/30">→</span>
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
              <tr className="border-b border-white/10">
                {block.headers.map((h) => (
                  <th
                    key={h}
                    className="px-4 py-2 text-left font-mono text-[10px] tracking-wider text-white/40"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white/[0.02]" : ""}>
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-2 font-mono text-xs text-white/70">
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
    <section id={section.slug} className="scroll-mt-24">
      <div className="mb-4 flex items-center gap-2 opacity-60">
        <div className="h-px w-6 bg-white/40" />
        <h2 className="font-mono text-xs font-bold tracking-wider text-white">
          {section.title.toUpperCase()}
        </h2>
      </div>
      <div className="space-y-4">
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
}: {
  title: string;
  description: string;
  sections: DocSection[];
}) {
  return (
    <article className="max-w-3xl">
      <header className="mb-12 border-b border-white/10 pb-8">
        <p className="mb-2 font-mono text-[10px] tracking-wider text-white/40">DOCUMENTATION</p>
        <h1
          className="mb-4 font-mono text-3xl font-bold tracking-wider text-white lg:text-4xl"
          style={{ letterSpacing: "0.06em" }}
        >
          {title.toUpperCase()}
        </h1>
        <p className="font-mono text-sm text-white/60">{description}</p>
      </header>

      <div className="space-y-12">
        {sections.map((section) => (
          <DocSectionRenderer key={section.slug} section={section} />
        ))}
      </div>

      {sections.length > 1 && (
        <nav className="mt-16 border-t border-white/10 pt-8">
          <p className="mb-4 font-mono text-[10px] tracking-wider text-white/40">ON THIS PAGE</p>
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
    </article>
  );
}
