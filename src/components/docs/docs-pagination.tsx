import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { docsNav } from "@/data/docs";

function getAdjacentPages(slug: string) {
  const pages = docsNav.flatMap((g) =>
    g.items.map((item) => ({
      title: item.title,
      slug: item.slug,
      href: item.slug ? `/docs/${item.slug}` : "/docs",
    }))
  );

  const currentIndex = pages.findIndex((p) => p.slug === slug);
  return {
    prev: currentIndex > 0 ? pages[currentIndex - 1] : null,
    next: currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null,
  };
}

export function DocsPagination({ slug }: { slug: string }) {
  const { prev, next } = getAdjacentPages(slug);

  if (!prev && !next) return null;

  return (
    <nav className="mt-16 grid gap-px border-t border-white/10 bg-white/10 pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex items-center gap-3 bg-black p-5 transition-colors hover:bg-white/[0.02]"
        >
          <ChevronLeft className="h-4 w-4 text-white/30 transition-colors group-hover:text-white/60" />
          <div>
            <p className="font-mono text-[9px] tracking-wider text-white/30">PREVIOUS</p>
            <p className="mt-1 font-mono text-xs text-white/70 group-hover:text-white">
              {prev.title}
            </p>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex items-center justify-end gap-3 bg-black p-5 text-right transition-colors hover:bg-white/[0.02]"
        >
          <div>
            <p className="font-mono text-[9px] tracking-wider text-white/30">NEXT</p>
            <p className="mt-1 font-mono text-xs text-white/70 group-hover:text-white">
              {next.title}
            </p>
          </div>
          <ChevronRight className="h-4 w-4 text-white/30 transition-colors group-hover:text-white/60" />
        </Link>
      ) : null}
    </nav>
  );
}
