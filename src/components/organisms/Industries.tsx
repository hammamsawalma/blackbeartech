"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Icon } from "@/components/atoms";
import { ShoppingCart, ShieldCheck, Activity, Truck, CheckCircle2 } from "lucide-react";
import Image from "next/image";

type IndustryKey = "ecommerce" | "fintech" | "healthcare" | "logistics";

export default function Industries() {
    const t = useTranslations("industries");
    const locale = useLocale();
    const isRTL = locale === "ar";
    const [activeTab, setActiveTab] = useState<IndustryKey>("ecommerce");

    const industries: { id: IndustryKey; icon: any; imagePos: string }[] = [
        { id: "ecommerce", icon: ShoppingCart, imagePos: "object-center" },
        { id: "fintech", icon: ShieldCheck, imagePos: "object-center" },
        { id: "healthcare", icon: Activity, imagePos: "object-center" },
        { id: "logistics", icon: Truck, imagePos: "object-center" },
    ];

    return (
        <section className="py-24 relative overflow-hidden border-t border-white/[0.06] bg-bg-primary">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-accent-primary/5 blur-[120px] pointer-events-none rounded-full" />

            <div className="container mx-auto px-6 relative z-10" dir={isRTL ? "rtl" : "ltr"}>
                
                {/* Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
                    >
                        {t("title")}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-text-muted"
                    >
                        {t("subtitle")}
                    </motion.p>
                </div>

                {/* Main Content Area */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                    
                    {/* Tabs Navigation (Left/Top) */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-3">
                        {industries.map((ind, index) => {
                            const isActive = activeTab === ind.id;
                            return (
                                <motion.button
                                    key={ind.id}
                                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => setActiveTab(ind.id)}
                                    className={`relative flex items-center gap-4 p-5 rounded-2xl text-start transition-all duration-300 border ${
                                        isActive 
                                            ? "bg-accent-primary/10 border-accent-primary/30 shadow-[0_0_30px_rgba(0,212,255,0.1)]" 
                                            : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
                                    }`}
                                >
                                    <div className={`p-3 rounded-xl transition-colors duration-300 ${isActive ? "bg-accent-primary text-black" : "bg-white/10 text-white"}`}>
                                        <Icon icon={ind.icon} size="sm" />
                                    </div>
                                    <span className={`font-bold text-lg transition-colors duration-300 ${isActive ? "text-white" : "text-text-muted"}`}>
                                        {t(`${ind.id}.tab`)}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Content Display (Right/Bottom) */}
                    <div className="w-full lg:w-2/3 min-h-[500px] relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="w-full h-full flex flex-col"
                            >
                                <div className="card-cheerful p-8 md:p-10 flex-grow border border-white/10 relative overflow-hidden group">
                                    
                                    {/* Image Background */}
                                    <div className="absolute inset-0 z-0">
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-[#0A0C10]/90 to-transparent z-10" />
                                        <div className={`absolute inset-0 bg-gradient-to-${isRTL ? "l" : "r"} from-[#0A0C10] via-[#0A0C10]/80 to-transparent z-10`} />
                                        <Image
                                            src={`/images/industries/${activeTab}.png`}
                                            alt={t(`${activeTab}.tab`)}
                                            fill
                                            className={`object-cover opacity-40 mix-blend-screen transition-transform duration-1000 group-hover:scale-105 ${
                                                industries.find(i => i.id === activeTab)?.imagePos || "object-center"
                                            }`}
                                        />
                                    </div>

                                    {/* Text Content */}
                                    <div className="relative z-20 flex flex-col h-full justify-end max-w-xl pt-32">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent-primary/20 bg-accent-primary/10 mb-6 w-fit">
                                            <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
                                            <span className="text-xs text-accent-primary font-bold uppercase tracking-wider">
                                                {t(`${activeTab}.tab`)}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                                            {t(`${activeTab}.headline`)}
                                        </h3>
                                        
                                        <p className="text-text-muted text-lg mb-8 leading-relaxed">
                                            {t(`${activeTab}.description`)}
                                        </p>

                                        <ul className="space-y-4">
                                            {[1, 2, 3].map((num) => (
                                                <li key={num} className="flex items-center gap-3 text-white/80 font-medium">
                                                    <Icon icon={CheckCircle2} size="sm" className="text-accent-primary shrink-0" />
                                                    {t(`${activeTab}.feature${num}`)}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
}
