import { SectionHeader } from "@/components/landing/section-header";
import { FadeIn } from "@/components/landing/fade-in";

const metrics = [
  { value: "10,000+", label: "STARTUPS LAUNCHED" },
  { value: "32", label: "INTEGRATIONS WIRED" },
  { value: "15min", label: "AVG SETUP TIME" },
  { value: "4.9", label: "DEVELOPER RATING" },
];

const testimonials = [
  {
    quote:
      "I spent two weeks on auth and Stripe with my last starter. Foundry had everything running in 15 minutes.",
    author: "Sarah Chen",
    role: "Indie Hacker",
    company: "ShipFast Tools",
    initials: "SC",
  },
  {
    quote:
      "The /setup wizard that actually tests connections saved us days of debugging. Every integration just works.",
    author: "Marcus Webb",
    role: "CTO",
    company: "AgencyStack",
    initials: "MW",
  },
  {
    quote:
      "White-label mode + module marketplace means we ship client SaaS products in a week instead of a quarter.",
    author: "Elena Rodriguez",
    role: "Founder",
    company: "LaunchPad Studio",
    initials: "ER",
  },
];

export function SocialProof() {
  return (
    <section className="relative border-t border-white/10 bg-black py-24">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="mb-16 grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <FadeIn key={metric.label} delay={i * 0.05}>
              <div className="bg-black p-8 text-center lg:p-10">
                <p className="font-mono text-3xl font-bold text-white lg:text-5xl">
                  {metric.value}
                </p>
                <p className="mt-3 font-mono text-[9px] tracking-[0.2em] text-white/35">
                  {metric.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <SectionHeader index="007" title="TRUSTED BY BUILDERS" className="mb-12" />
        </FadeIn>

        <div className="grid gap-px bg-white/10 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <FadeIn key={t.author} delay={i * 0.1}>
              <div className="group relative h-full bg-black p-8 lg:p-10">
                <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-white/0 transition-colors group-hover:border-white/30" />
                <p className="text-sm leading-relaxed text-white/65">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
                  <div className="flex h-9 w-9 items-center justify-center border border-white/15 bg-white/5 font-mono text-[10px] text-white/70">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-mono text-xs font-bold text-white">{t.author}</p>
                    <p className="mt-0.5 font-mono text-[10px] text-white/40">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
