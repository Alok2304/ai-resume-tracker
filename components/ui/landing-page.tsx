import { Footer } from "@/components/ui/footer";
import { LandingCta } from "@/components/ui/landing-cta";
import { LandingDashboard } from "@/components/ui/landing-dashboard";
import { LandingFeatures } from "@/components/ui/landing-features";
import { LandingHero } from "@/components/ui/landing-hero";
import { LandingStats } from "@/components/ui/landing-stats";
import { LandingTestimonials } from "@/components/ui/landing-testimonials";
import { LandingWorkflow } from "@/components/ui/landing-workflow";

export function LandingPage() {
  return (
    <main className="flex-1">
      {/* Compose the public landing journey from hero proof points through conversion CTA. */}
      <LandingHero />
      <LandingStats />
      <LandingFeatures />
      <LandingWorkflow />
      <LandingDashboard />
      <LandingTestimonials />
      <LandingCta />
      <Footer />
    </main>
  );
}
