import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsContent } from "@/components/docs/docs-content";
import { getAllDocSlugs, getDocBySlug } from "@/data/docs";
import { platform } from "@/lib/config";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllDocSlugs()
    .filter((slug) => slug !== "")
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  if (!doc) return { title: "Not Found" };

  return {
    title: doc.title,
    description: doc.description,
  };
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);

  if (!doc) notFound();

  return <DocsContent title={doc.title} description={doc.description} sections={doc.sections} />;
}
