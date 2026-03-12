import { getTranslations } from "next-intl/server";
import AboutUs from "@/components/AboutUs";
import CoreServices from "@/components/CoreServices";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: `${locale === "ar" ? "بلاك بير تك | خدماتنا" : "Black Bear Tech | Services"}`,
    description: t("description"),
  };
}

export default function TechPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <div className="pt-32 pb-16 text-center border-b border-white/5">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Black Bear <span className="text-accent-cyan">Tech</span>
        </h1>
        <p className="text-text-muted max-w-2xl mx-auto">
          Advanced Technology & Engineering Services
        </p>
      </div>
      <AboutUs />
      <CoreServices />
      <Footer />
    </main>
  );
}
