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

const features = [
  {
    icon: Terminal,
    title: "CLI + Web Wizard",
    description:
      "npx create-foundry scaffolds your stack. /setup tests every connection live.",
    span: "col-span-1 row-span-2",
    large: true,
  },
  {
    icon: Shield,
    title: "Auth.js v5",
    description: "5 login layouts, 2FA, passkeys, SSO. Swap to Clerk in one config line.",
    span: "col-span-1",
    large: false,
  },
  {
    icon: CreditCard,
    title: "Stripe Billing",
    description: "Checkout, portal, metered usage, dunning emails — all connected.",
    span: "col-span-1",
    large: false,
  },
  {
    icon: Bot,
    title: "AI Workflows",
    description: "Visual builder with Vercel AI SDK. Multi-provider routing built in.",
    span: "col-span-1 row-span-2",
    large: true,
  },
  {
    icon: Layers,
    title: "Module Marketplace",
    description: "Enable blog, CRM, helpdesk at runtime. No redeploy needed.",
    span: "col-span-1",
    large: false,
  },
  {
    icon: Zap,
    title: "Background Jobs",
    description: "Inngest + BullMQ with admin panel, dead-letter queue, and retry.",
    span: "col-span-1",
    large: false,
  },
  {
    icon: Database,
    title: "Drizzle + Neon",
    description: "Type-safe ORM, migrations, DB branch per PR, pre-deploy snapshots.",
    span: "col-span-1",
    large: false,
  },
  {
    icon: Webhook,
    title: "Webhook Inspector",
    description: "Full payload logging with replay button for every incoming webhook.",
    span: "col-span-1",
    large: false,
  },
  {
    icon: BarChart3,
    title: "Business Metrics",
    description: "MRR, churn, cohorts, trial-to-paid — from your own Postgres data.",
    span: "col-span-1",
    large: false,
  },
  {
    icon: Globe,
    title: "Deploy Anywhere",
    description: "Vercel, Railway, Fly.io, Render, or Docker VPS — configs included.",
    span: "col-span-1",
    large: false,
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="relative border-t border-white/10 bg-black py-24">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="mb-16 max-w-2xl">
          <div className="mb-3 flex items-center gap-2 opacity-60">
            <div className="h-px w-8 bg-white" />
            <span className="font-mono text-[10px] tracking-wider text-white">002</span>
            <div className="h-px flex-1 bg-white" />
          </div>
          <h2
            className="mb-4 font-mono text-2xl font-bold tracking-wider text-white lg:text-4xl"
            style={{ letterSpacing: "0.08em" }}
          >
            EVERYTHING CONNECTED
          </h2>
          <p className="font-mono text-sm leading-relaxed text-white/60">
            Not a template with 40 env variables. Every integration tested and wired before you
            write business logic.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`group relative bg-black p-6 transition-colors hover:bg-white/[0.02] lg:p-8 ${feature.span} ${feature.large ? "lg:row-span-2" : ""}`}
            >
              <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-white/0 transition-colors group-hover:border-white/30" />
              <feature.icon className="mb-4 h-5 w-5 text-white/50" strokeWidth={1.5} />
              <h3 className="mb-2 font-mono text-sm font-bold tracking-wider text-white">
                {feature.title}
              </h3>
              <p className="font-mono text-xs leading-relaxed text-white/50">
                {feature.description}
              </p>
              {feature.large && (
                <div className="mt-6 hidden gap-1 opacity-20 lg:flex">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="h-0.5 w-0.5 rounded-full bg-white" />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
