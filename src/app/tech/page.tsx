import AboutUs from "@/components/AboutUs";
import CoreServices from "@/components/CoreServices";
import Footer from "@/components/Footer";

export default function TechPage() {
    return (
        <main className="min-h-screen bg-brand-primary">
            <div className="pt-32 pb-16 text-center border-b border-white/5">
                <h1 className="text-4xl md:text-6xl font-bold font-space-grotesk text-white mb-4">
                    Black Bear <span className="text-brand-accent">Tech</span>
                </h1>
                <p className="text-brand-muted max-w-2xl mx-auto">
                    Advanced Technology & Engineering Services
                </p>
            </div>
            <AboutUs />
            <CoreServices />
            <Footer />
        </main>
    );
}
