import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { WhyNexaBridge } from "@/components/sections/WhyNexaBridge";
import { TechStackOrbit } from "@/components/sections/TechStackOrbit";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesOverview />
      <WhyNexaBridge />
      <TechStackOrbit />
      <CTASection />
    </>
  );
}
