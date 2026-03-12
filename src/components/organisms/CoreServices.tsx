"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Search } from "lucide-react";
import { Card } from "@/components/molecules/Card";

// Map to custom isometric icon images
const serviceIconMap: Record<string, string> = {
    ai: "/images/services/ai-icon.png",
    web: "/images/services/web-icon.png",
    saas: "/images/services/saas-icon.png",
    consulting: "/images/services/consulting-icon.png",
    fintech: "/images/services/fintech-icon.png",
    support: "/images/services/support-icon.png",
    hosting: "/images/services/hosting-icon.png",
};

export default function CoreServices() {
    const t = useTranslations("services");
    const locale = useLocale();
    const isRTL = locale === "ar";
    const [searchQuery, setSearchQuery] = useState("");

    const services = [
        { key: "ai", accent: "#00D4FF" },
        { key: "web", accent: "#FF6B9D" },
        { key: "saas", accent: "#4ADE80" },
        { key: "consulting", accent: "#A78BFA" },
        { key: "fintech", accent: "#FFD700" },
        { key: "support", accent: "#00D4FF" },
        { key: "hosting", accent: "#FF6B9D" },
    ];

    const filteredServices = useMemo(() => {
        if (!searchQuery.trim()) return services;
        const q = searchQuery.toLowerCase();
        return services.filter((s) => {
            const title = t(`${s.key}.title`).toLowerCase();
            const desc = t(`${s.key}.description`).toLowerCase();
            return title.includes(q) || desc.includes(q);
        });
    }, [searchQuery, t]);

    return (
        <section id="services" className="py-24 relative overflow-hidden bg-black border-t border-white/[0.06]">
            <div className="container mx-auto px-6 relative z-10" dir={isRTL ? "rtl" : "ltr"}>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
                    >
                        {t("title").split(" ").slice(0, -1).join(" ")}{" "}
                        <span className="text-accent-gradient">
                            {t("title").split(" ").pop()}
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-white/50 text-lg mb-8"
                    >
                        {t("subtitle")}
                    </motion.p>

                    {/* Search Input */}
                    <div className="relative max-w-md mx-auto">
                        <Search className="absolute top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" style={{ [isRTL ? 'right' : 'left']: '1rem' }} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={isRTL ? "ابحث عن خدمة..." : "Search services..."}
                            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl py-3 text-sm text-white placeholder:text-white/30 focus:border-accent-primary/40 focus:ring-1 focus:ring-accent-primary/20 focus:outline-none transition-all"
                            style={{ [isRTL ? 'paddingRight' : 'paddingLeft']: '3rem', [isRTL ? 'paddingLeft' : 'paddingRight']: '1rem' }}
                        />
                    </div>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredServices.map((service) => (
                            <motion.div
                                key={service.key}
                                layout
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5, delay: filteredServices.indexOf(service) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                            >
                                    <Card variant="interactive" glow glowColor={service.accent}>
                                    <motion.div 
                                        className="mb-6 w-16 h-16 rounded-xl bg-white/5 border border-white/[0.08] flex items-center justify-center overflow-hidden"
                                        whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0] }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <img
                                            src={serviceIconMap[service.key]}
                                            alt=""
                                            className="w-12 h-12 object-contain"
                                            loading="lazy"
                                        />
                                    </motion.div>
                                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-accent-primary transition-colors">
                                        {t(`${service.key}.title`)}
                                    </h3>
                                    <p className="text-white/40 text-sm leading-relaxed">
                                        {t(`${service.key}.description`)}
                                    </p>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty state */}
                {filteredServices.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <img src="/images/states/empty-state.png" alt="" className="w-24 h-24 mx-auto mb-4 opacity-50" />
                        <p className="text-white/40 text-lg">
                            {isRTL ? "لا توجد خدمات مطابقة" : "No matching services"}
                        </p>
                    </motion.div>
                )}
            </div>

            {/* Subtle glow */}
            <div className="absolute top-1/2 left-0 w-full h-[500px] bg-accent-primary/[0.03] blur-[150px] -translate-y-1/2 pointer-events-none" />
        </section>
    );
}
