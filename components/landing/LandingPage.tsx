import { Navigation } from "./Navigation";
import { Hero } from "./Hero";
import { SponsorButton } from "@/components/SponsorButton";

interface Feature {
  title: string;
  description: string;
}

interface LandingPageProps {
  heroTitle: string;
  heroSubtitle?: string;
  heroDescription: string;
  ctaLabel?: string;
  ctaHref?: string;
  features: Feature[];
  featuresTitle?: string;
  
  sponsorsTitle?: string;
  brandName?: string;
  footerText?: string;
}

export function LandingPage({
  heroTitle,
  heroSubtitle,
  heroDescription,
  ctaLabel = "Get Started",
  ctaHref = "/home",
  features,
  featuresTitle,
  
  sponsorsTitle,
  brandName = "Perfect Screenshot",
  footerText = "Built with Next.js and Konva.",
}: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation ctaLabel="Editor" ctaHref={ctaHref} />
      <Hero
        title={heroTitle}
        subtitle={heroSubtitle}
        description={heroDescription}
        ctaLabel={ctaLabel}
        ctaHref={ctaHref}
      />
      <SponsorButton variant="floating" />
    </div>
  );
}

