import { getTranslations } from "next-intl/server";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import CoreServices from "@/components/CoreServices";
import DiagnosticWizard from "@/components/DiagnosticWizard";
import AltBrands from "@/components/AltBrands";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `https://blackbeartech.com/${locale}`,
      languages: {
        ar: "https://blackbeartech.com/ar",
        en: "https://blackbeartech.com/en",
        "x-default": "https://blackbeartech.com/ar",
      },
    },
  };
}

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <HeroSection />
      <TrustBar />
      <CoreServices />
      <DiagnosticWizard />
      <AltBrands />
      <Footer />
    </main>
  );
}
