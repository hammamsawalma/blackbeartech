"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Code2, CloudCog, ShieldCheck, Banknote, HelpCircle, HardDrive } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export default function CoreServices() {
    const t = useTranslations("services");
    const locale = useLocale();
    const isRTL = locale === "ar";

    const services = [
        { key: "ai",         icon: <BrainCircuit className="w-7 h-7" />,  accent: "#00D4FF" },
        { key: "web",        icon: <Code2 className="w-7 h-7" />,        accent: "#FF6B9D" },
        { key: "saas",       icon: <CloudCog className="w-7 h-7" />,     accent: "#4ADE80" },
        { key: "consulting", icon: <ShieldCheck className="w-7 h-7" />,  accent: "#A78BFA" },
        { key: "fintech",    icon: <Banknote className="w-7 h-7" />,     accent: "#FFD700" },
        { key: "support",    icon: <HelpCircle className="w-7 h-7" />,   accent: "#00D4FF" },
        { key: "hosting",    icon: <HardDrive className="w-7 h-7" />,    accent: "#FF6B9D" },
    ];

    return (
        <section id="services" className="py-24 relative overflow-hidden bg-bg-primary border-t border-white/[0.06]">
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
                        className="text-text-muted text-lg"
                    >
                        {t("subtitle")}
                    </motion.p>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={service.key}
                            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                            className="card-cheerful p-8 group relative overflow-hidden"
                        >
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ background: `linear-gradient(135deg, ${service.accent}10, transparent)` }}
                            />

                            <div className="relative z-10">
                                <div
                                    className="mb-6 p-4 rounded-xl bg-white/5 border border-white/[0.08] inline-block group-hover:scale-110 transition-transform duration-300"
                                    style={{ color: service.accent }}
                                >
                                    {service.icon}
                                </div>

                                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#00D4FF] transition-colors">
                                    {t(`${service.key}.title`)}
                                </h3>

                                <p className="text-text-muted text-sm leading-relaxed">
                                    {t(`${service.key}.description`)}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Subtle glow */}
            <div className="absolute top-1/2 left-0 w-full h-[500px] bg-[#00D4FF]/3 blur-[150px] -translate-y-1/2 pointer-events-none" />
        </section>
    );
}
