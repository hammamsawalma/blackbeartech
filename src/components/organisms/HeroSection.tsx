"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Button, Badge, Icon } from "@/components/atoms";

export default function HeroSection() {
    const t = useTranslations("hero");
    const locale = useLocale();
    const isRTL = locale === "ar";
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Text fades out and moves up as you scroll
    const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const textY = useTransform(scrollYProgress, [0, 0.4], [0, -100]);

    // Logo side fades + scales on scroll
    const logoScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
    const logoOpacity = useTransform(scrollYProgress, [0.6, 1], [1, 0]);

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
                <div className="absolute inset-0 bg-radial from-accent-primary/[0.06] via-transparent to-transparent pointer-events-none z-0" />

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
                            >
                                {t("ctaSecondary")}
                            </Button>
                        </motion.div>
                        </div>
                    </motion.div>

                    {/* ── Logo Showcase Side (45%) ── */}
                    <motion.div
                        className="w-full md:w-[45%] h-[50vh] md:h-[75vh] relative mt-8 md:mt-0 flex items-center justify-center"
                        style={{ scale: logoScale, opacity: logoOpacity }}
                    >
                        {/* Pulsing glow behind the logo */}
                        <motion.div
                            className="absolute w-[70%] h-[70%] rounded-full"
                            style={{
                                background: "radial-gradient(circle, rgba(0,212,255,0.15) 0%, rgba(255,107,157,0.08) 50%, transparent 70%)",
                                filter: "blur(60px)",
                            }}
                            animate={{
                                scale: [1, 1.15, 1],
                                opacity: [0.6, 1, 0.6],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />

                        {/* Secondary rotating glow ring */}
                        <motion.div
                            className="absolute w-[65%] h-[65%] rounded-full border border-accent-primary/10"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            style={{
                                boxShadow: "0 0 40px rgba(0,212,255,0.08), inset 0 0 40px rgba(0,212,255,0.05)",
                            }}
                        />

                        {/* The Logo */}
                        <motion.img
                            src="/logo.png"
                            alt="Black Bear Tech"
                            className="relative z-10 w-auto h-[55%] md:h-[65%] object-contain drop-shadow-[0_0_40px_rgba(0,212,255,0.25)]"
                            initial={{ opacity: 0, scale: 0.8, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                            whileHover={{ scale: 1.03 }}
                        />

                        {/* Subtle floating animation wrapper */}
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            {/* Decorative corner accents */}
                            <div className="absolute top-[15%] left-[15%] w-8 h-8 border-t border-l border-accent-primary/20 rounded-tl-lg" />
                            <div className="absolute top-[15%] right-[15%] w-8 h-8 border-t border-r border-accent-primary/20 rounded-tr-lg" />
                            <div className="absolute bottom-[15%] left-[15%] w-8 h-8 border-b border-l border-accent-warm/20 rounded-bl-lg" />
                            <div className="absolute bottom-[15%] right-[15%] w-8 h-8 border-b border-r border-accent-warm/20 rounded-br-lg" />
                        </motion.div>
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
