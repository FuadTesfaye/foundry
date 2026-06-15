import Link from "next/link";
import { ArrowRight, BookOpen, Terminal, Rocket, Layers } from "lucide-react";
import { docsNav } from "@/data/docs";

const learningPath = [
  {
    step: "01",
    title: "Install",
    description: "Scaffold your project with the CLI wizard in under 5 minutes.",
    href: "/docs/quick-start",
    icon: Terminal,
  },
  {
    step: "02",
    title: "Configure",
    description: "Connect Stripe, Neon, Resend, and AI providers via /setup.",
    href: "/docs/setup",
    icon: Layers,
  },
  {
    step: "03",
    title: "Ship",
    description: "Deploy to Vercel, Railway, or VPS with pre-built configs.",
    href: "/docs/deployment",
    icon: Rocket,
  },
];

const popular = [
  { title: "CLI Reference", href: "/docs/cli", description: "Terminal & web wizard" },
  { title: "Environment Variables", href: "/docs/setup#env-variables", description: "Every key explained" },
  { title: "platform.config.ts", href: "/docs/configuration", description: "Single source of truth" },
  { title: "Stripe Setup", href: "/docs/billing", description: "Checkout, webhooks, metering" },
];

export function DocsOverview() {
  return (
    <div className="mb-16">
      <div className="mb-10 border-b border-white/10 pb-10">
        <div className="mb-4 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-white/40" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-white/40">DOCUMENTATION</span>
        </div>
        <h1 className="mb-4 font-mono text-3xl font-bold tracking-[0.08em] text-white lg:text-4xl">
          FOUNDRY DOCS
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-white/60">
          Everything you need to scaffold, configure, and ship a production SaaS — from first{" "}
          <code className="border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-xs text-white/80">
            npx create-foundry
          </code>{" "}
          to your first paying customer.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="mb-6 font-mono text-[10px] tracking-[0.2em] text-white/40">LEARNING PATH</h2>
        <div className="grid gap-px bg-white/10 md:grid-cols-3">
          {learningPath.map((item) => (
            <Link
              key={item.step}
              href={item.href}
              className="group bg-black p-6 transition-colors hover:bg-white/[0.03] lg:p-8"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[10px] text-white/30">{item.step}</span>
                <item.icon className="h-4 w-4 text-white/30 transition-colors group-hover:text-white/60" />
              </div>
              <h3 className="mb-2 font-mono text-sm font-bold tracking-wider text-white">
                {item.title.toUpperCase()}
              </h3>
              <p className="text-xs leading-relaxed text-white/50">{item.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 font-mono text-[10px] text-white/40 transition-colors group-hover:text-white">
                Read guide <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="mb-6 font-mono text-[10px] tracking-[0.2em] text-white/40">POPULAR GUIDES</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {popular.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center justify-between border border-white/10 bg-white/[0.02] px-5 py-4 transition-colors hover:border-white/20 hover:bg-white/[0.04]"
            >
              <div>
                <p className="font-mono text-xs text-white">{item.title}</p>
                <p className="mt-0.5 text-[11px] text-white/45">{item.description}</p>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-white/25 transition-colors group-hover:text-white/60" />
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-6 font-mono text-[10px] tracking-[0.2em] text-white/40">ALL SECTIONS</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {docsNav.map((group) => (
            <div key={group.title}>
              <h3 className="mb-3 font-mono text-[9px] tracking-[0.15em] text-white/30">
                {group.title.toUpperCase()}
              </h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={item.slug ? `/docs/${item.slug}` : "/docs"}
                      className="text-sm text-white/55 transition-colors hover:text-white"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
