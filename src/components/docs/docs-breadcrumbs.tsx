"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { docsNav } from "@/data/docs";

function getBreadcrumbs(pathname: string) {
  const crumbs = [{ label: "Docs", href: "/docs" }];

  for (const group of docsNav) {
    for (const item of group.items) {
      const href = item.slug ? `/docs/${item.slug}` : "/docs";
      if (pathname === href && item.slug !== "") {
        crumbs.push({ label: item.title, href });
        return crumbs;
      }
    }
  }
  return crumbs;
}

export function DocsBreadcrumbs() {
  const pathname = usePathname();
  const crumbs = getBreadcrumbs(pathname);

  if (crumbs.length <= 1 && pathname === "/docs") return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-1.5 font-mono text-[10px]">
      <Link href="/" className="text-white/35 transition-colors hover:text-white/60">
        <Home className="h-3 w-3" />
      </Link>
      {crumbs.map((crumb, i) => (
        <span key={crumb.href} className="flex items-center gap-1.5">
          <ChevronRight className="h-3 w-3 text-white/20" />
          {i === crumbs.length - 1 ? (
            <span className="text-white/70">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="text-white/40 transition-colors hover:text-white/70">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
