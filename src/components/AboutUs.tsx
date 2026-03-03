"use client";

import { motion } from "framer-motion";
import { Terminal, Cpu, Network } from "lucide-react";

export default function AboutUs() {
    const stats = [
        { value: "50+", label: "Enterprise Clients", icon: <Network className="w-5 h-5" /> },
        { value: "99.9%", label: "Uptime SLA", icon: <Cpu className="w-5 h-5" /> },
        { value: "24/7", label: "Global Support", icon: <Terminal className="w-5 h-5" /> },
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-brand-secondary/20 border-y border-white/5">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                            <span className="w-2 h-2 rounded-full bg-indigo-400" />
                            <span className="text-xs font-medium text-indigo-300 tracking-wider uppercase font-space-grotesk">
                                Who We Are
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold font-space-grotesk tracking-tight mb-6 leading-tight">
                            Architecting the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-brand-accent">
                                Digital Frontier.
                            </span>
                        </h2>

                        <div className="space-y-6 text-brand-muted text-lg leading-relaxed mb-10">
                            <p>
                                Black Bear Tech is the dedicated technology and engineering division of the Black Bear ecosystem. We don't just use tools; we build them.
                            </p>
                            <p>
                                Our mission is to empower ambitious organizations with enterprise-grade software, cutting-edge artificial intelligence, and impenetrable infrastructure. We believe in writing clean code, designing intuitive architectures, and delivering solutions that scale seamlessly from local markets to global operations.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {stats.map((stat, index) => (
                                <div key={index} className="flex flex-col items-start p-4 glass rounded-2xl group border border-white/5 hover:border-brand-accent/30 transition-colors">
                                    <div className="text-brand-accent mb-3 p-2 rounded-lg bg-white/5 group-hover:scale-110 transition-transform duration-300">
                                        {stat.icon}
                                    </div>
                                    <span className="text-3xl font-bold font-space-grotesk text-white mb-1">
                                        {stat.value}
                                    </span>
                                    <span className="text-sm tracking-wide text-brand-muted uppercase font-medium">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 relative min-h-[500px]"
                    >
                        {/* Abstract Tech Illustration Placeholder */}
                        <div className="absolute inset-0 rounded-3xl overflow-hidden glass border border-white/10 flex items-center justify-center p-8 glow">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-brand-accent/5" />
                            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30" />

                            {/* Simulated Code/Terminal block */}
                            <div className="w-full max-w-lg bg-[#0d1117] rounded-xl border border-white/5 p-6 font-mono text-sm relative z-10 shadow-2xl">
                                <div className="flex gap-2 mb-4">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <div className="text-brand-muted space-y-2">
                                    <p><span className="text-brand-accent">~</span>/black-bear-tech$ <span className="text-white">./init_system.sh</span></p>
                                    <p className="text-green-400">→ Core systems online.</p>
                                    <p className="text-green-400">→ Neural networks aligned.</p>
                                    <p className="text-green-400">→ Securing perimeter...</p>
                                    <p className="animate-pulse text-indigo-400 mt-4">_ System ready for deployment.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
