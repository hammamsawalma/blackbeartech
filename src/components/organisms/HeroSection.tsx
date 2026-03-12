"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import dynamic from "next/dynamic";
import { Button, Badge, Icon } from "@/components/atoms";

// Load the heavy Three.js scene client-side only (no SSR)
const BearScene = dynamic(() => import("../BearScene"), {
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
        <section id="hero" ref={containerRef} className="relative h-[150vh] bg-black">
            {/* Sticky viewport container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex flex-col items-center justify-center">
                
                {/* Layer 1: Background illustration */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <img
                        src="/images/hero/hero-illustration.png"
                        alt=""
                        className="w-full h-full object-cover opacity-25"
                        loading="eager"
                    />
                    {/* Darken bottom edge for smooth blend */}
                    <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black to-transparent" />
                </div>

                {/* Layer 2: Ambient cyan glow */}
                <div className="absolute inset-0 bg-radial from-[#00D4FF]/[0.06] via-transparent to-transparent pointer-events-none z-0" />

                {/* Layer 3: Grid overlay */}
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
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mb-6 inline-block pointer-events-auto"
                        >
                            <Badge variant="accent" dot>
                                {t("badge")}
                            </Badge>
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
                            className="flex flex-col sm:flex-row gap-4 pointer-events-auto mt-6"
                        >
                            <Button 
                                as={Link} 
                                href={whatsappLink}
                                variant="primary"
                                size="lg"
                                icon={<Icon icon={MessageCircle} size="md"  />}
                                iconPosition={isRTL ? "left" : "right"}
                                onMouseEnter={() => setHoverState("cta")}
                                onMouseLeave={() => setHoverState("idle")}
                            >
                                {t("ctaPrimary")}
                            </Button>

                            <Button 
                                as={Link} 
                                href={`/${locale}#services`}
                                variant="secondary"
                                size="lg"
                                icon={<ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />}
                                iconPosition={isRTL ? "left" : "right"}
                                onMouseEnter={() => setHoverState("cta")}
                                onMouseLeave={() => setHoverState("idle")}
                            >
                                {t("ctaSecondary")}
                            </Button>
                        </motion.div>
                        </div>
                    </motion.div>

                    {/* ── 3D Bear Scene Side (45%) ── */}
                    <motion.div
                        className="w-full md:w-[45%] h-[50vh] md:h-full relative pointer-events-auto flex items-center justify-center mt-8 md:mt-0"
                        style={{ scale: sceneScale, opacity: sceneOpacity }}
                    >
                        {/* Radial gradient behind the bear for depth */}
                        <div className="absolute inset-0 bg-radial from-accent-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />
                        
                        <div className="absolute inset-0 w-full h-full">
                            <BearScene hoverState={hoverState} />
                        </div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    style={{ opacity: textOpacity }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-accent-primary/50 pointer-events-none z-20"
                >
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
                        {t("scrollHint")}
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="w-[2px] h-10 bg-gradient-to-b from-accent-primary to-transparent rounded-full"
                    />
                </motion.div>
            </div>
        </section>
    );
}
