import { getTranslations } from "next-intl/server";
import HeroSection from "@/components/organisms/HeroSection";
import TrustBar from "@/components/organisms/TrustBar";
import CoreServices from "@/components/organisms/CoreServices";
import DiagnosticWizard from "@/components/organisms/DiagnosticWizard";
import AboutUs from "@/components/organisms/AboutUs";
import Industries from "@/components/organisms/Industries";
import ContactForm from "@/components/organisms/ContactForm";
import Footer from "@/components/organisms/Footer";
import PageLayout from "@/components/templates/PageLayout";

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
    <PageLayout>
      <HeroSection />
      <TrustBar />
      <CoreServices />
      <DiagnosticWizard />
      <AboutUs />
      <Industries />
      <div id="contact"><ContactForm /></div>
      <Footer />
    </PageLayout>
  );
}
