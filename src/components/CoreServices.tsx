"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Code2, CloudCog, ShieldCheck, Banknote, HelpCircle, HardDrive } from "lucide-react";

export default function CoreServices() {
    const services = [
        {
            title: "AI Solutions",
            description: "Custom artificial intelligence models, machine learning integrations, and intelligent automation tailored to your business.",
            icon: <BrainCircuit className="w-8 h-8 text-brand-accent" />,
        },
        {
            title: "Web & App Development",
            description: "Scalable, high-performance web applications and native mobile apps built with cutting-edge frameworks.",
            icon: <Code2 className="w-8 h-8 text-indigo-400" />,
        },
        {
            title: "SaaS Platforms",
            description: "End-to-end software as a service architecture, development, and deployment for recurring revenue models.",
            icon: <CloudCog className="w-8 h-8 text-teal-400" />,
        },
        {
            title: "IT Consulting",
            description: "Strategic technology planning, digital transformation roadmaps, and enterprise architecture guidance.",
            icon: <ShieldCheck className="w-8 h-8 text-purple-400" />,
        },
        {
            title: "Fintech",
            description: "Secure payment gateways, blockchain integration, and financial data processing solutions.",
            icon: <Banknote className="w-8 h-8 text-emerald-400" />,
        },
        {
            title: "Technical Support",
            description: "24/7 dedicated enterprise support, SLA management, and rapid incident response teams.",
            icon: <HelpCircle className="w-8 h-8 text-rose-400" />,
        },
        {
            title: "Premium Hosting",
            description: "High-availability cloud infrastructure, load balancing, and secure data storage solutions.",
            icon: <HardDrive className="w-8 h-8 text-amber-400" />,
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants: any = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    return (
        <section id="services" className="py-24 relative overflow-hidden bg-brand-primary">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-bold font-space-grotesk tracking-tight mb-6"
                    >
                        Engineering <span className="text-brand-accent">Excellence.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-brand-muted text-lg relative"
                    >
                        We don't just write code; we architect solutions that drive growth, scale infinitely, and define industries.
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="glass p-8 rounded-2xl group hover:border-brand-accent/50 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="mb-6 p-4 rounded-xl bg-white/5 inline-block border border-white/5 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                                {service.icon}
                            </div>

                            <h3 className="text-xl font-bold text-white mb-3 font-space-grotesk tracking-wide group-hover:text-brand-accent transition-colors">
                                {service.title}
                            </h3>

                            <p className="text-brand-muted leading-relaxed text-sm">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Decorative gradient */}
            <div className="absolute top-1/2 left-0 w-full h-[500px] bg-indigo-500/5 blur-[150px] -translate-y-1/2 pointer-events-none" />
        </section>
    );
}
