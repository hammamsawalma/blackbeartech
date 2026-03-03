"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
    const whatsappNumber = "+1234567890"; // Replace with actual number
    const whatsappMessage = encodeURIComponent("Hello Black Bear Tech, I am interested in your services.");
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-accent/20 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full blur-[150px] mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-brand-accent/30 mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                    <span className="text-sm font-medium text-brand-accent/90 tracking-wide font-space-grotesk">
                        Advanced Tech Solutions
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-bold mb-8 tracking-tight font-space-grotesk text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/50"
                >
                    Engineering the Future
                    <br className="hidden md:block" />
                    <span className="text-brand-accent"> Without Limits.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-brand-muted mb-12 max-w-2xl mx-auto leading-relaxed"
                >
                    From cutting-edge AI implementations and Fintech architectures to bespoke web apps and robust hosting. We build the digital backbone for ambitious brands.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <Link
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-brand-accent text-brand-primary rounded-xl font-semibold overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(56,189,248,0.5)] glow"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        <MessageCircle className="w-5 h-5 relative z-10" />
                        <span className="relative z-10">Start a Project</span>
                    </Link>

                    <Link
                        href="#services"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-medium glass transition-all hover:bg-white/5"
                    >
                        Explore Services
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
