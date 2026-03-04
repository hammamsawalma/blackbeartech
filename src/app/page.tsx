import HeroSection from "@/components/HeroSection";

import AltBrands from "@/components/AltBrands";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-primary">
      <HeroSection />

      <AltBrands />
      <Footer />
    </main>
  );
}
