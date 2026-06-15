import { HeroAscii } from "@/components/landing/hero-ascii";
import { FeatureGrid } from "@/components/landing/feature-grid";
import { ComponentPicker } from "@/components/landing/component-picker";
import { ComparisonTable } from "@/components/landing/comparison-table";
import { Pricing } from "@/components/landing/pricing";
import { SocialProof } from "@/components/landing/social-proof";
import { FAQ } from "@/components/landing/faq";
import { CTABanner } from "@/components/landing/cta-banner";
import { Footer } from "@/components/landing/footer";

export default function HomePage() {
  return (
    <main>
      <HeroAscii />
      <FeatureGrid />
      <ComponentPicker />
      <ComparisonTable />
      <Pricing />
      <SocialProof />
      <FAQ />
      <CTABanner />
      <Footer />
    </main>
  );
}
