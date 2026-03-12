"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import CoreServices from "@/components/CoreServices";

export default function SolutionsPage() {
    const t = useTranslations("solutions_page");
    const locale = useLocale();
    const isRTL = locale === "ar";

    return (
        <main className="min-h-screen bg-bg-primary pt-24 pb-16" dir={isRTL ? "rtl" : "ltr"}>
            <div className="container mx-auto px-6">
                
                {/* Hero section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">{t("title")}</h1>
                        <p className="text-lg md:text-xl text-text-muted leading-relaxed">
                            {t("subtitle")}
                        </p>
                    </motion.div>
                </div>

                {/* Secondary banner image for solutions */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden relative mb-24 border border-white/10"
                >
                    <Image
                        src="/images/solutions_bw.png"
                        alt="Black Bear Tech Solutions"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/50 to-transparent" />
                </motion.div>
            </div>

            {/* We can re-use the CoreServices component here as it's our main solutions list */}
            <CoreServices />
            
        </main>
    );
}
