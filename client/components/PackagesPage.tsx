import TravelCard from "@/components/TravelCard";
import { travelPackages } from "@/constants/travelPackages";

export default function PackagesPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Heading */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Tour Packages</h1>
        <p className="text-gray-500 mb-8">
          {travelPackages.length} packages found — starting from{" "}
          <span className="font-semibold text-blue-500">
            INR{" "}
            {new Intl.NumberFormat("en-IN").format(
              Math.min(...travelPackages.map((p) => p.discountedPrice))
            )}
          </span>
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {travelPackages.map((pkg) => (
            <TravelCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </main>
  );
}
