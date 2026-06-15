import { SectionHeader } from "@/components/landing/section-header";
import { FadeIn } from "@/components/landing/fade-in";

const steps = [
  {
    step: "01",
    title: "Configure",
    description:
      "Pick modules, auth provider, database, and deploy target. CLI or interactive picker generates your exact stack.",
    code: "npx create-foundry@latest",
  },
  {
    step: "02",
    title: "Connect",
    description:
      "Web wizard at /setup tests every integration live — Stripe, Neon, Resend, OpenAI. Green or exact error.",
    code: "localhost:3000/setup",
  },
  {
    step: "03",
    title: "Ship",
    description:
      "Working dashboard, auth, payments, and jobs on day one. Build product features, not infrastructure.",
    code: "npm run dev → /app",
  },
];

export function WorkflowTimeline() {
  return (
    <section className="relative border-t border-white/10 bg-black py-24">
      <div className="section-glow pointer-events-none absolute inset-0" />
      <div className="grid-bg-fine pointer-events-none absolute inset-0 opacity-40" />

      <div className="container relative mx-auto px-6 lg:px-16">
        <FadeIn>
          <SectionHeader
            index="002"
            title="THREE STEPS TO PRODUCTION"
            description="From zero to shipping — the setup experience that makes Foundry different."
            className="mb-16"
          />
        </FadeIn>

        <div className="grid gap-px bg-white/10 lg:grid-cols-3">
          {steps.map((item, i) => (
            <FadeIn key={item.step} delay={i * 0.1}>
              <div className="group relative h-full bg-black p-8 lg:p-10">
                <div className="absolute top-0 left-0 h-3 w-3 border-t border-l border-white/0 transition-colors group-hover:border-white/40" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-white/30">
                  {item.step}
                </span>
                <h3 className="mt-4 mb-3 font-mono text-lg font-bold tracking-wider text-white">
                  {item.title.toUpperCase()}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-white/55">{item.description}</p>
                <code className="inline-block border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] text-white/60">
                  {item.code}
                </code>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
