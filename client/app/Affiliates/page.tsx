import HeroSection from "./section/HeroSection";
import WhyPartnerSection from "./section/WhyPartnerSection";
import MarqueeSection from "./section/MarqueeSection";
import PartnerTypeSection from "./section/PartnerTypeSection";
import JoinFormSection from "./section/JoinFormSection";
import DashboardPreviewSection from "./section/DashboardPreviewSection";

export default function PartnersPage() {
  return (
    <div  className=" flex flex-col w-full min-h-screen overflow-x-hidden">
      <HeroSection />
      <WhyPartnerSection />
      <MarqueeSection />
      <PartnerTypeSection />
      <JoinFormSection />
      <DashboardPreviewSection />
    </div>
  );
}