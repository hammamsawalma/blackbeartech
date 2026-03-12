"use client";

import { motion } from "framer-motion";
import { Terminal, Cpu, Network } from "lucide-react";
import { Icon, Badge } from "@/components/atoms";
import { useTranslations, useLocale } from "next-intl";

export default function AboutUs() {
    const t = useTranslations("about");
    const locale = useLocale();
    const isRTL = locale === "ar";

    const stats = [
        { value: t("stat1Value"), labelKey: "stat1Label", icon: <Icon icon={Network} size="md" /> },
        { value: t("stat2Value"), labelKey: "stat2Label", icon: <Icon icon={Cpu} size="md" /> },
        { value: t("stat3Value"), labelKey: "stat3Label", icon: <Icon icon={Terminal} size="md" /> },
    ];

    return (
        <section id="about" className="py-24 relative overflow-hidden bg-black border-y border-white/[0.06]" dir={isRTL ? "rtl" : "ltr"}>
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Text Side */}
                    <motion.div
                        initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2"
                    >
                        <Badge variant="accent" dot className="mb-6">
                            {isRTL ? "من نحن" : "Who We Are"}
                        </Badge>

                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                            {t("title")}
                        </h2>

                        <div className="space-y-6 text-white/40 text-lg leading-relaxed mb-10">
                            <p>{t("p1")}</p>
                            <p>{t("p2")}</p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    className="flex flex-col items-start p-4 glass rounded-2xl group border border-white/5 hover:border-accent-primary/30 transition-colors"
                                >
                                    <motion.div 
                                        className="text-accent-primary mb-3 p-2 rounded-lg bg-white/5"
                                        whileHover={{ scale: 1.15, rotate: 5 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                    >
                                        {stat.icon}
                                    </motion.div>
                                    <span className="text-3xl font-bold text-white mb-1">
                                        {stat.value}
                                    </span>
                                    <span className="text-sm tracking-wide text-white/40 uppercase font-medium">
                                        {t(stat.labelKey)}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Illustration Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 relative min-h-[500px]"
                    >
                        <div className="absolute inset-0 rounded-3xl overflow-hidden border border-white/[0.06] flex items-center justify-center">
                            {/* Custom workspace illustration from Phase 12 */}
                            <img
                                src="/images/services/workspace-illustration.png"
                                alt={isRTL ? "مساحة عمل تقنية" : "Tech workspace illustration"}
                                className="w-full h-full object-cover opacity-80"
                                loading="lazy"
                            />
                            
                            {/* Gradient overlay to soften edges */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Subtle glow */}
            <div className="absolute top-1/2 right-0 w-1/3 h-[400px] bg-accent-primary/[0.03] blur-[120px] -translate-y-1/2 pointer-events-none" />
        </section>
    );
}
