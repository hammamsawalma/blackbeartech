"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { MessageCircle, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { businessTypes, challenges, recommendations } from "@/data/diagnostic-tree";

type WizardStep = "step1" | "step2" | "result";

export default function DiagnosticWizard() {
    const t = useTranslations("wizard");
    const locale = useLocale() as "ar" | "en";
    const isRTL = locale === "ar";
    const [step, setStep] = useState<WizardStep>("step1");
    const [bizType, setBizType] = useState("");
    const [challenge, setChallenge] = useState("");

    const recommendation = recommendations[challenge];
    const bizLabel = businessTypes.find((b) => b.id === bizType)?.label[locale] ?? "";
    const whatsappMsg = recommendation?.whatsappMessage[locale].replace("{businessType}", bizLabel);
    const whatsappLink = `https://wa.me/+966500000000?text=${encodeURIComponent(whatsappMsg ?? "")}`;

    const slideDir = isRTL ? -1 : 1;

    return (
        <section className="py-24 relative overflow-hidden bg-bg-primary border-t border-white/[0.06]" dir={isRTL ? "rtl" : "ltr"}>
            <div className="container mx-auto px-6 max-w-2xl relative z-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00D4FF]/20 bg-[#00D4FF]/5 mb-6">
                        <Sparkles className="w-4 h-4 text-[#00D4FF]" />
                        <span className="text-sm text-[#00D4FF] font-medium">
                            {isRTL ? "المعالج التشخيصي" : "Diagnostic Wizard"}
                        </span>
                    </div>
                </motion.div>

                {/* Progress dots */}
                <div className="flex items-center justify-center gap-2 mb-10">
                    {(["step1", "step2", "result"] as const).map((s) => (
                        <div
                            key={s}
                            className={`h-2 rounded-full transition-all duration-500 ${
                                step === s ? "w-8 bg-[#00D4FF]" : "w-2 bg-white/20"
                            }`}
                        />
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {/* STEP 1: Business type */}
                    {step === "step1" && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: slideDir * 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: slideDir * -40 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">
                                {t("step1Title")}
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {businessTypes.map((biz) => (
                                    <button
                                        key={biz.id}
                                        onClick={() => { setBizType(biz.id); setStep("step2"); }}
                                        className="card-cheerful p-6 text-start hover:border-[#00D4FF]/30 transition-all group"
                                    >
                                        <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform">
                                            {biz.icon}
                                        </span>
                                        <span className="font-medium text-white text-sm">
                                            {biz.label[locale]}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2: Challenge */}
                    {step === "step2" && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: slideDir * 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: slideDir * -40 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">
                                {t("step2Title")}
                            </h2>
                            <div className="space-y-3">
                                {challenges.map((c) => (
                                    <button
                                        key={c.id}
                                        onClick={() => { setChallenge(c.id); setStep("result"); }}
                                        className="w-full card-cheerful p-5 text-start hover:border-[#00D4FF]/30 transition-all flex items-center gap-4 group"
                                    >
                                        <span className="text-2xl group-hover:scale-110 transition-transform">
                                            {c.icon}
                                        </span>
                                        <span className="font-medium text-white">
                                            {c.label[locale]}
                                        </span>
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setStep("step1")}
                                className="mt-6 flex items-center gap-2 text-text-muted text-sm hover:text-white transition-colors"
                            >
                                {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                                {t("back")}
                            </button>
                        </motion.div>
                    )}

                    {/* RESULT */}
                    {step === "result" && recommendation && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="card-cheerful p-10 text-center border border-[#00D4FF]/20 relative overflow-hidden">
                                {/* Glow background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/5 to-transparent pointer-events-none" />

                                <div className="relative z-10">
                                    <div className="w-16 h-16 rounded-2xl bg-[#00D4FF]/10 border border-[#00D4FF]/20 flex items-center justify-center mx-auto mb-6 text-3xl">
                                        {recommendation.icon}
                                    </div>

                                    <p className="text-sm text-[#00D4FF] mb-2">
                                        {t("step3Title")}
                                    </p>

                                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                                        {recommendation.title[locale]}
                                    </h2>

                                    <p className="text-text-muted mb-8 max-w-md mx-auto">
                                        {recommendation.description[locale]}
                                    </p>

                                    <a
                                        href={whatsappLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-primary inline-flex items-center gap-3 text-lg"
                                    >
                                        <MessageCircle className="w-5 h-5" />
                                        {t("ctaResult")}
                                    </a>

                                    <p className="text-text-muted text-xs mt-4">
                                        {t("freeNote")}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => { setStep("step1"); setChallenge(""); setBizType(""); }}
                                className="mt-6 flex items-center gap-2 text-text-muted text-sm hover:text-white transition-colors mx-auto"
                            >
                                {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                                {t("back")}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Subtle glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[300px] bg-[#00D4FF]/3 blur-[120px] pointer-events-none" />
        </section>
    );
}
