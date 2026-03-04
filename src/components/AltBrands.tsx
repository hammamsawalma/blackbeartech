"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AltBrands() {
    const brands = [
        {
            name: "Black Bear Tech",
            tagline: "Advanced Tech Solutions & Software",
            website: "/tech",
            color: "from-blue-500/20 to-indigo-500/5",
        },
        {
            name: "Bear Dynamics",
            tagline: "Next-Gen Robotics & Automation",
            website: "#",
            color: "from-cyan-500/20 to-blue-500/5",
        },
        {
            name: "Ursus Security",
            tagline: "Enterprise Grade Cyber Defense",
            website: "#",
            color: "from-red-500/20 to-orange-500/5",
        },
        {
            name: "Grizzly Analytics",
            tagline: "Predictive Big Data Solutions",
            website: "#",
            color: "from-emerald-500/20 to-teal-500/5",
        },
        {
            name: "Polar Cloud",
            tagline: "Scalable Cloud Infrastructure",
            website: "#",
            color: "from-sky-500/20 to-cyan-500/5",
        },
        {
            name: "Kodiak Innovations",
            tagline: "Advanced AI Research",
            website: "#",
            color: "from-purple-500/20 to-fuchsia-500/5",
        },
    ];

    return (
        <section className="py-24 relative overflow-hidden border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                    <div className="max-w-xl">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold font-space-grotesk tracking-tight mb-4"
                        >
                            The Black Bear <span className="text-brand-accent">Ecosystem.</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-brand-muted"
                        >
                            A family of specialized tech brands dedicated to pushing the boundaries of what's possible in their respective domains.
                        </motion.p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {brands.map((brand, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className={`glass rounded-3xl p-8 relative overflow-hidden group hover:border-white/20 transition-all duration-500`}
                        >
                            {/* Dynamic Gradient Background for each brand card */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${brand.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10 flex flex-col h-full">
                                {/* Dummy Logo Placeholder */}
                                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <span className="text-2xl font-bold font-space-grotesk">{brand.name.charAt(0)}</span>
                                </div>

                                <h3 className="text-2xl font-bold mb-2 font-space-grotesk group-hover:text-white transition-colors">
                                    {brand.name}
                                </h3>

                                <p className="text-brand-muted text-sm flex-grow mb-8">
                                    {brand.tagline}
                                </p>

                                <Link
                                    href={brand.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-brand-accent transition-colors w-fit"
                                >
                                    Visit Website
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
