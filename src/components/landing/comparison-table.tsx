import { SectionHeader } from "@/components/landing/section-header";
import { FadeIn } from "@/components/landing/fade-in";

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
    <td className="px-4 py-3.5 text-center font-mono text-xs">
      {value ? (
        <span className="inline-flex h-5 w-5 items-center justify-center border border-white/20 bg-white/5 text-white">
          ✓
        </span>
      ) : (
        <span className="text-white/15">—</span>
      )}
    </td>
  );
}

export function ComparisonTable() {
  return (
    <section className="relative border-t border-white/10 bg-black py-24">
      <div className="grid-bg-fine pointer-events-none absolute inset-0 opacity-30" />

      <div className="container relative mx-auto px-6 lg:px-16">
        <FadeIn>
          <SectionHeader
            index="005"
            title="WHY FOUNDRY"
            description="Same price range as MakerKit and Supastarter — with 3× the integrations wired and tested."
            className="mb-12"
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="overflow-hidden border border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02]">
                    <th className="px-5 py-4 text-left font-mono text-[10px] tracking-[0.15em] text-white/40">
                      FEATURE
                    </th>
                    <th className="px-4 py-4 text-center font-mono text-[10px] tracking-[0.15em] text-white/40">
                      MAKERKIT
                    </th>
                    <th className="px-4 py-4 text-center font-mono text-[10px] tracking-[0.15em] text-white/40">
                      SUPASTARTER
                    </th>
                    <th className="px-4 py-4 text-center font-mono text-[10px] tracking-[0.15em] text-white">
                      FOUNDRY
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {competitors.map((row, i) => (
                    <tr
                      key={row.feature}
                      className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-3.5 text-sm text-white/70">{row.feature}</td>
                      <Cell value={row.makerKit} />
                      <Cell value={row.supastarter} />
                      <Cell value={row.foundry} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
