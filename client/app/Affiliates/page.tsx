import HeroSection from "./section/HeroSection";
import WhyPartnerSection from "./section/WhyPartnerSection";
import MarqueeSection from "./section/MarqueeSection";
import PartnerTypeSection from "./section/PartnerTypeSection";
import JoinFormSection from "./section/JoinFormSection";
import DashboardPreviewSection from "./section/DashboardPreviewSection";

export default function PartnersPage() {
  return (
    <div className="space-y-16">
      <HeroSection />
      <WhyPartnerSection />
      <MarqueeSection />
      <PartnerTypeSection />
      <JoinFormSection />
      <DashboardPreviewSection />
    </div>
  );
}