import {
  Terminal,
  Shield,
  CreditCard,
  Bot,
  Layers,
  Zap,
  Database,
  Webhook,
  BarChart3,
  Globe,
} from "lucide-react";
import { SectionHeader } from "@/components/landing/section-header";
import { FadeIn } from "@/components/landing/fade-in";

const features = [
  {
    icon: Terminal,
    title: "CLI + Web Wizard",
    description:
      "npx create-foundry scaffolds your stack. /setup tests every connection live.",
    span: "lg:col-span-2 lg:row-span-2",
    highlight: true,
  },
  {
    icon: Shield,
    title: "Auth.js v5",
    description: "5 login layouts, 2FA, passkeys, SSO. Swap to Clerk in one config line.",
    span: "",
    highlight: false,
  },
  {
    icon: CreditCard,
    title: "Stripe Billing",
    description: "Checkout, portal, metered usage, dunning emails — all connected.",
    span: "",
    highlight: false,
  },
  {
    icon: Bot,
    title: "AI Workflows",
    description: "Visual builder with Vercel AI SDK. Multi-provider routing built in.",
    span: "lg:col-span-2 lg:row-span-2",
    highlight: true,
  },
  {
    icon: Layers,
    title: "Module Marketplace",
    description: "Enable blog, CRM, helpdesk at runtime. No redeploy needed.",
    span: "",
    highlight: false,
  },
  {
    icon: Zap,
    title: "Background Jobs",
    description: "Inngest + BullMQ with admin panel, dead-letter queue, and retry.",
    span: "",
    highlight: false,
  },
  {
    icon: Database,
    title: "Drizzle + Neon",
    description: "Type-safe ORM, migrations, DB branch per PR, pre-deploy snapshots.",
    span: "",
    highlight: false,
  },
  {
    icon: Webhook,
    title: "Webhook Inspector",
    description: "Full payload logging with replay button for every incoming webhook.",
    span: "",
    highlight: false,
  },
  {
    icon: BarChart3,
    title: "Business Metrics",
    description: "MRR, churn, cohorts, trial-to-paid — from your own Postgres data.",
    span: "",
    highlight: false,
  },
  {
    icon: Globe,
    title: "Deploy Anywhere",
    description: "Vercel, Railway, Fly.io, Render, or Docker VPS — configs included.",
    span: "",
    highlight: false,
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="relative border-t border-white/10 bg-black py-24">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-30" />

      <div className="container relative mx-auto px-6 lg:px-16">
        <FadeIn>
          <SectionHeader
            index="003"
            title="EVERYTHING CONNECTED"
            description="Not a template with 40 env variables. Every integration tested and wired before you write business logic."
            className="mb-16"
          />
        </FadeIn>

        <div className="grid grid-cols-1 gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <FadeIn key={feature.title} delay={i * 0.05} className={feature.span}>
              <div
                className={`group relative h-full bg-black p-6 transition-all duration-300 hover:bg-white/[0.03] lg:p-8 ${feature.highlight ? "min-h-[220px]" : ""}`}
              >
                <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-white/0 transition-colors group-hover:border-white/40" />
                <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-white/0 transition-colors group-hover:border-white/40" />
                <feature.icon
                  className="mb-4 h-5 w-5 text-white/40 transition-colors group-hover:text-white/70"
                  strokeWidth={1.5}
                />
                <h3 className="mb-2 font-mono text-sm font-bold tracking-wider text-white">
                  {feature.title}
                </h3>
                <p className="text-xs leading-relaxed text-white/50">{feature.description}</p>
                {feature.highlight && (
                  <div className="mt-6 flex gap-1 opacity-20">
                    {Array.from({ length: 32 }).map((_, j) => (
                      <div key={j} className="h-0.5 w-0.5 rounded-full bg-white" />
                    ))}
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
