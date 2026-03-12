"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function AltBrands() {
    const t = useTranslations("brands");
    const locale = useLocale();
    const isRTL = locale === "ar";

    const brands = [
        {
            name: isRTL ? "بلاك بير تك" : "Black Bear Tech",
            tagline: isRTL ? "حلول تقنية متقدمة وبرمجيات" : "Advanced Tech Solutions & Software",
            website: `/${locale}/tech`,
            color: "from-[#00D4FF]/15 to-transparent",
        },
        {
            name: isRTL ? "بير ديناميكس" : "Bear Dynamics",
            tagline: isRTL ? "روبوتات وأتمتة الجيل القادم" : "Next-Gen Robotics & Automation",
            website: "#",
            color: "from-white/10 to-transparent",
        },
        {
            name: isRTL ? "أورسوس للأمن" : "Ursus Security",
            tagline: isRTL ? "حماية سيبرانية بمستوى المؤسسات" : "Enterprise Grade Cyber Defense",
            website: "#",
            color: "from-[#FF6B9D]/10 to-transparent",
        },
        {
            name: isRTL ? "غريزلي أناليتكس" : "Grizzly Analytics",
            tagline: isRTL ? "حلول البيانات الضخمة التنبؤية" : "Predictive Big Data Solutions",
            website: "#",
            color: "from-[#4ADE80]/10 to-transparent",
        },
        {
            name: isRTL ? "بولار كلاود" : "Polar Cloud",
            tagline: isRTL ? "بنية تحتية سحابية قابلة للتوسع" : "Scalable Cloud Infrastructure",
            website: "#",
            color: "from-[#00D4FF]/10 to-transparent",
        },
        {
            name: isRTL ? "كودياك للابتكار" : "Kodiak Innovations",
            tagline: isRTL ? "أبحاث الذكاء الاصطناعي المتقدمة" : "Advanced AI Research",
            website: "#",
            color: "from-[#FFD700]/10 to-transparent",
        },
    ];

    return (
        <section className="py-24 relative overflow-hidden border-t border-white/[0.06] bg-bg-primary">
            <div className="container mx-auto px-6" dir={isRTL ? "rtl" : "ltr"}>
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                    <div className="max-w-xl">
                        <motion.h2
                            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
                        >
                            {t("title").split(" ").slice(0, -1).join(" ")}{" "}
                            <span className="text-accent-gradient">
                                {t("title").split(" ").slice(-1)}
                            </span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-text-muted"
                        >
                            {t("subtitle")}
                        </motion.p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {brands.map((brand, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="card-cheerful p-8 relative overflow-hidden group"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${brand.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/[0.08] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <span className="text-xl font-bold text-white">{brand.name.charAt(0)}</span>
                                </div>

                                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-white transition-colors">
                                    {brand.name}
                                </h3>

                                <p className="text-text-muted text-sm flex-grow mb-8">
                                    {brand.tagline}
                                </p>

                                <Link
                                    href={brand.website}
                                    className="inline-flex items-center gap-2 text-sm font-medium text-white/50 hover:text-[#00D4FF] transition-colors w-fit"
                                >
                                    {isRTL ? "زيارة الموقع" : "Visit Website"}
                                    <ExternalLink className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
