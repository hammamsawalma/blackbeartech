"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import dynamic from "next/dynamic";

// Load the heavy Three.js scene client-side only (no SSR)
const BearScene = dynamic(() => import("./BearScene"), {
    ssr: false,
    loading: () => (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="flex flex-col items-center gap-4 relative z-10">
                <div className="w-12 h-12 border-2 border-accent-primary/40 border-t-accent-primary rounded-full animate-spin" />
                <span className="font-mono text-accent-primary/60 text-xs tracking-widest">
                    INITIALIZING BB_CORE...
                </span>
            </div>
        </div>
    ),
});

export default function HeroSection() {
    const t = useTranslations("hero");
    const locale = useLocale();
    const isRTL = locale === "ar";
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoverState, setHoverState] = useState<"idle" | "cta">("idle");

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Text fades out and moves up as you scroll
    const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const textY = useTransform(scrollYProgress, [0, 0.4], [0, -100]);

    // 3D scene fades + scales on scroll
    const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
    const sceneOpacity = useTransform(scrollYProgress, [0.6, 1], [1, 0]);

    const whatsappNumber = "+966500000000";
    const whatsappMessage = encodeURIComponent(
        isRTL
            ? "مرحباً بلاك بير تك، أنا مهتم بخدماتكم."
            : "Hello Black Bear Tech, I am interested in your services."
    );
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return (
        <section ref={containerRef} className="relative h-[150vh] bg-black">
            {/* Sticky viewport container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex flex-col items-center justify-center">
                
                {/* Background grid overlay behind everything */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.02] z-0"
                    style={{
                        backgroundImage: `
                        linear-gradient(rgba(0,212,255,1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)
                        `,
                        backgroundSize: "60px 60px",
                    }}
                />

                <div 
                    className="container mx-auto px-6 h-full w-full flex flex-col md:flex-row items-center justify-between relative z-10"
                    dir={isRTL ? "rtl" : "ltr"}
                >
                    {/* ── Hero Text Side (55%) ── */}
                    <motion.div
                        style={{ opacity: textOpacity, y: textY }}
                        className="w-full md:w-[55%] flex flex-col justify-center pt-24 md:pt-0 pointer-events-none items-start"
                    >
                        <div className="w-full text-start">

                        {/* Status badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00D4FF]/20 bg-[#00D4FF]/5 mb-6 pointer-events-auto backdrop-blur-md"
                        >
                            <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse shadow-[0_0_8px_#00D4FF]" />
                            <span className="text-xs font-bold tracking-widest text-[#00D4FF]">
                                {t("badge")}
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white leading-[1.1]"
                            style={{ textShadow: "0 10px 30px rgba(0,0,0,0.8)" }}
                        >
                            {t("headline")}
                            <br className="hidden md:block" />
                            <span className="text-accent-gradient">
                                {" "}{t("headlineAccent")}
                            </span>
                        </motion.h1>

                        {/* Subtext */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg md:text-xl text-gray-300/90 mb-10 max-w-2xl mx-auto leading-relaxed font-light"
                            style={{ textShadow: "0 4px 12px rgba(0,0,0,0.8)" }}
                        >
                            {t("subtext")}
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pointer-events-auto mt-6"
                        >
                            <Link
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={() => setHoverState("cta")}
                                onMouseLeave={() => setHoverState("idle")}
                                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#00D4FF] text-black rounded-xl font-bold overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(0,212,255,0.4)]"
                            >
                                <div className="absolute inset-0 bg-white/40 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                <MessageCircle className="w-5 h-5 relative z-10" />
                                <span className="relative z-10 tracking-wide">{t("ctaPrimary")}</span>
                            </Link>

                            <button
                                onClick={() =>
                                    window.scrollTo({
                                        top: window.innerHeight * 1.5,
                                        behavior: "smooth",
                                    })
                                }
                                onMouseEnter={() => setHoverState("cta")}
                                onMouseLeave={() => setHoverState("idle")}
                                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-medium border border-white/20 bg-black/40 backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/30"
                            >
                                {t("ctaSecondary")}
                                <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'ml-2'}`} />
                            </button>
                        </motion.div>
                        </div>
                    </motion.div>

                    {/* ── 3D Bear Scene Side (45%) ── */}
                    <motion.div
                        className="w-full md:w-[45%] h-[50vh] md:h-full relative pointer-events-auto flex items-center justify-center mt-8 md:mt-0"
                        style={{ scale: sceneScale, opacity: sceneOpacity }}
                    >
                        {/* Radial gradient behind the bear for depth */}
                        <div className="absolute inset-0 bg-radial from-[#00D4FF]/5 via-transparent to-transparent opacity-50 pointer-events-none" />
                        
                        <div className="absolute inset-0 w-full h-full">
                            <BearScene hoverState={hoverState} />
                        </div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    style={{ opacity: textOpacity }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-[#00D4FF]/50 pointer-events-none z-20"
                >
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
                        {t("scrollHint")}
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="w-[2px] h-10 bg-gradient-to-b from-[#00D4FF] to-transparent rounded-full"
                    />
                </motion.div>
            </div>
        </section>
    );
}
