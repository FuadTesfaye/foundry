import { HeroAscii } from "@/components/landing/hero-ascii";
import { LogoStrip } from "@/components/landing/logo-strip";
import { WorkflowTimeline } from "@/components/landing/workflow-timeline";
import { FeatureGrid } from "@/components/landing/feature-grid";
import { ComponentPicker } from "@/components/landing/component-picker";
import { ComparisonTable } from "@/components/landing/comparison-table";
import { Pricing } from "@/components/landing/pricing";
import { SocialProof } from "@/components/landing/social-proof";
import { FAQ } from "@/components/landing/faq";
import { CTABanner } from "@/components/landing/cta-banner";
import { Footer } from "@/components/landing/footer";
import { SiteNav } from "@/components/landing/site-nav";

export default function HomePage() {
  return (
    <main className="relative">
      <div className="noise-overlay pointer-events-none fixed inset-0 z-50 opacity-50" />
      <HeroAscii />
      <LogoStrip />
      <WorkflowTimeline />
      <FeatureGrid />
      <ComponentPicker />
      <ComparisonTable />
      <Pricing />
      <SocialProof />
      <FAQ />
      <CTABanner />
      <Footer />
      <SiteNav variant="hero" />
    </main>
  );
}
