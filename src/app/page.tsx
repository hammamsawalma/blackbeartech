import HeroSection from "@/components/HeroSection";
import AboutUs from "@/components/AboutUs";
import CoreServices from "@/components/CoreServices";
import AltBrands from "@/components/AltBrands";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-primary">
      <HeroSection />
      <AboutUs />
      <CoreServices />
      <AltBrands />
      <Footer />
    </main>
  );
}
