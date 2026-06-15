const competitors = [
  { feature: "CLI installer", makerKit: false, supastarter: false, foundry: true },
  { feature: "Web /setup wizard", makerKit: false, supastarter: false, foundry: true },
  { feature: "5 login layouts", makerKit: false, supastarter: false, foundry: true },
  { feature: "AI workflow builder", makerKit: false, supastarter: false, foundry: true },
  { feature: "Service health dashboard", makerKit: false, supastarter: false, foundry: true },
  { feature: "Webhook inspector + replay", makerKit: false, supastarter: false, foundry: true },
  { feature: "Module marketplace", makerKit: false, supastarter: false, foundry: true },
  { feature: "White-label mode", makerKit: false, supastarter: false, foundry: true },
  { feature: "CLI code generator", makerKit: false, supastarter: false, foundry: true },
  { feature: "A/B testing framework", makerKit: false, supastarter: false, foundry: true },
  { feature: "GDPR toolkit", makerKit: false, supastarter: false, foundry: true },
  { feature: "Auth + Teams + Stripe", makerKit: true, supastarter: true, foundry: true },
];

function Cell({ value }: { value: boolean }) {
  return (
    <td className="px-4 py-3 text-center font-mono text-xs">
      {value ? (
        <span className="text-white">✓</span>
      ) : (
        <span className="text-white/20">—</span>
      )}
    </td>
  );
}

export function ComparisonTable() {
  return (
    <section className="relative border-t border-white/10 bg-black py-24">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="mb-12 max-w-2xl">
          <div className="mb-3 flex items-center gap-2 opacity-60">
            <div className="h-px w-8 bg-white" />
            <span className="font-mono text-[10px] tracking-wider text-white">005</span>
            <div className="h-px flex-1 bg-white" />
          </div>
          <h2
            className="mb-4 font-mono text-2xl font-bold tracking-wider text-white lg:text-4xl"
            style={{ letterSpacing: "0.08em" }}
          >
            WHY FOUNDRY
          </h2>
          <p className="font-mono text-sm text-white/60">
            Same price range as MakerKit and Supastarter — with 3× the integrations wired and
            tested.
          </p>
        </div>

        <div className="overflow-x-auto border border-white/10">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3 text-left font-mono text-[10px] tracking-wider text-white/40">
                  FEATURE
                </th>
                <th className="px-4 py-3 text-center font-mono text-[10px] tracking-wider text-white/40">
                  MAKERKIT
                </th>
                <th className="px-4 py-3 text-center font-mono text-[10px] tracking-wider text-white/40">
                  SUPASTARTER
                </th>
                <th className="px-4 py-3 text-center font-mono text-[10px] tracking-wider text-white">
                  FOUNDRY
                </th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((row, i) => (
                <tr
                  key={row.feature}
                  className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-black"}
                >
                  <td className="px-4 py-3 font-mono text-xs text-white/70">{row.feature}</td>
                  <Cell value={row.makerKit} />
                  <Cell value={row.supastarter} />
                  <Cell value={row.foundry} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
