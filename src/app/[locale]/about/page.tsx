"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Star, Shield, Zap } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
    const t = useTranslations("about_page");
    const locale = useLocale();
    const isRTL = locale === "ar";

    return (
        <main className="min-h-screen bg-bg-primary pt-24 pb-16" dir={isRTL ? "rtl" : "ltr"}>
            <div className="container mx-auto px-6">
                
                {/* Hero section */}
                <div className="text-center max-w-3xl mx-auto mb-20 relative">
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

                {/* Main banner image */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden relative mb-24 border border-white/10"
                >
                    <Image
                        src="/images/about_bw.png"
                        alt="Black Bear Tech Team"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-80" />
                </motion.div>

                {/* Mission Section */}
                <div className="grid md:grid-cols-2 gap-16 mb-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-6 text-white border-l-4 border-accent-primary pl-4 rtl:border-l-0 rtl:border-r-4 rtl:pr-4 rtl:pl-0">
                            {t("missionTitle")}
                        </h2>
                        <p className="text-text-muted text-lg leading-relaxed">
                            {t("missionText")}
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative h-64 md:h-full min-h-[300px] rounded-2xl overflow-hidden border border-white/5 bg-white/5"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-primary/20 via-transparent to-transparent opacity-50" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Star className="w-24 h-24 text-accent-primary opacity-20" />
                        </div>
                    </motion.div>
                </div>

                {/* Values Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold mb-12 text-center text-white">{t("valuesTitle")}</h2>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { key: "simplicity", icon: <Zap className="w-8 h-8" /> },
                            { key: "reliability", icon: <Shield className="w-8 h-8" /> },
                            { key: "partnership", icon: <Star className="w-8 h-8" /> }
                        ].map((v, i) => (
                            <motion.div
                                key={v.key}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="card-cheerful p-8 border border-white/10 hover:border-accent-primary/50 transition-colors"
                            >
                                <div className="text-accent-primary mb-6 bg-accent-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center">
                                    {v.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-white">{t(`values.${v.key}.title`)}</h3>
                                <p className="text-text-muted leading-relaxed">{t(`values.${v.key}.desc`)}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </main>
    );
}
