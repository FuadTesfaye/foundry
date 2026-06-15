import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsContent } from "@/components/docs/docs-content";
import { getDocBySlug } from "@/data/docs";
import { platform } from "@/lib/config";

export const metadata: Metadata = {
  title: "Documentation",
  description: `${platform.app.name} documentation — setup, configuration, and API reference.`,
};

export default function DocsIndexPage() {
  const doc = getDocBySlug("");

  if (!doc) notFound();

  return <DocsContent title={doc.title} description={doc.description} sections={doc.sections} />;
}
