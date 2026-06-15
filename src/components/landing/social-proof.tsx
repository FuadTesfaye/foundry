const metrics = [
  { value: "10,000+", label: "STARTUPS LAUNCHED" },
  { value: "32", label: "INTEGRATIONS WIRED" },
  { value: "15min", label: "AVG SETUP TIME" },
  { value: "4.9", label: "DEVELOPER RATING" },
];

const testimonials = [
  {
    quote:
      "I spent two weeks on auth and Stripe with my last starter. NexLaunch had everything running in 15 minutes.",
    author: "Sarah Chen",
    role: "Indie Hacker",
    company: "ShipFast Tools",
  },
  {
    quote:
      "The /setup wizard that actually tests connections saved us days of debugging. Every integration just works.",
    author: "Marcus Webb",
    role: "CTO",
    company: "AgencyStack",
  },
  {
    quote:
      "White-label mode + module marketplace means we ship client SaaS products in a week instead of a quarter.",
    author: "Elena Rodriguez",
    role: "Founder",
    company: "LaunchPad Studio",
  },
];

export function SocialProof() {
  return (
    <section className="relative border-t border-white/10 bg-black py-24">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="mb-16 grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="bg-black p-8 text-center">
              <p className="font-mono text-3xl font-bold text-white lg:text-4xl">
                {metric.value}
              </p>
              <p className="mt-2 font-mono text-[9px] tracking-wider text-white/40">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-3 flex items-center gap-2 opacity-60">
          <div className="h-px w-8 bg-white" />
          <span className="font-mono text-[10px] tracking-wider text-white">006</span>
          <div className="h-px flex-1 bg-white" />
        </div>

        <div className="grid gap-px bg-white/10 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.author} className="bg-black p-8">
              <p className="font-mono text-sm leading-relaxed text-white/70">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="font-mono text-xs font-bold text-white">{t.author}</p>
                <p className="mt-1 font-mono text-[10px] text-white/40">
                  {t.role} · {t.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
