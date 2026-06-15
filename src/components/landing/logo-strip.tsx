const logos = [
  "VERCEL",
  "STRIPE",
  "NEON",
  "AUTH.JS",
  "INNGEST",
  "DRIZZLE",
  "OPENAI",
  "RESEND",
  "TRPC",
  "HONO",
];

export function LogoStrip() {
  const items = [...logos, ...logos];

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-black py-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />

      <p className="mb-6 text-center font-mono text-[9px] tracking-[0.25em] text-white/30">
        BUILT ON PRODUCTION-GRADE INFRASTRUCTURE
      </p>

      <div className="flex w-max animate-marquee gap-16 px-8">
        {items.map((logo, i) => (
          <span
            key={`${logo}-${i}`}
            className="shrink-0 font-mono text-xs tracking-[0.2em] text-white/25 transition-colors hover:text-white/50"
          >
            {logo}
          </span>
        ))}
      </div>
    </section>
  );
}
