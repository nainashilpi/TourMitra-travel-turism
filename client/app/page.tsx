import Hero from "@/components/Hero";
import PackagesPage from "@/components/PackagesPage";
import TripPlanner from "@/components/Tripplanner";
import TrendingDestinations from "@/components/TrendingDestinations";
import WhyBookWithUs from "@/components/WhyBookWithUs";
import LiveToursCounter from "@/components/LiveToursCounter";
import TravelSupport from "@/components/TravelSupport";
import ScrollToTop from "@/components/ScrollToTop";
import PageLoader from "@/components/PageLoader";

export default function Home() {
  return (
    <>
      <PageLoader /> 
      <ScrollToTop />
      <Hero />
      <PackagesPage />
      <TripPlanner />
      <TrendingDestinations />
      <WhyBookWithUs />
      <LiveToursCounter />
      <TravelSupport />
    </>
  );
}
