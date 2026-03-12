"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Users, Clock, Headphones, Shield, Zap } from "lucide-react";
import { Icon } from "@/components/atoms";

export default function TrustBar() {
    const t = useTranslations("trust");
    const locale = useLocale();
    const isRTL = locale === "ar";

    const stats = [
        { icon: <Icon icon={Users} size="md"  />,      value: t("clients"),      color: "#00D4FF" },
        { icon: <Icon icon={Clock} size="md"  />,       value: t("uptime"),       color: "#4ADE80" },
        { icon: <Icon icon={Headphones} size="md"  />,  value: t("support"),      color: "#FF6B9D" },
        { icon: <Icon icon={Zap} size="md"  />,         value: t("response"),     color: "#FFD700" },
    ];

    return (
        <section className="py-12 bg-black border-y border-white/[0.06]">
            <div className="container mx-auto px-6" dir={isRTL ? "rtl" : "ltr"}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
                >
                    {stats.map((stat, i) => (
                        <div key={i} className="flex items-center gap-3 text-white/70">
                            <div style={{ color: stat.color }}>{stat.icon}</div>
                            <span className="text-sm font-medium whitespace-nowrap">{stat.value}</span>
                        </div>
                    ))}
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-center text-text-muted text-xs mt-6"
                >
                    {t("consultation")}
                </motion.p>
            </div>
        </section>
    );
}
