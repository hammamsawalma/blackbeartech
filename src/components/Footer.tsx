"use client";

import { MessageCircle, Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    const whatsappNumber = "+1234567890"; // Replace with actual number
    const whatsappMessage = encodeURIComponent("Hello Black Bear Tech, I would like to discuss a project.");
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return (
        <footer className="bg-brand-primary relative overflow-hidden border-t border-white/10 pt-20 pb-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[200px] bg-brand-accent/5 blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="lg:col-span-2">
                        <h4 className="text-2xl font-bold font-space-grotesk tracking-tight mb-4 flex items-center gap-2">
                            <span className="w-4 h-4 rounded-sm bg-brand-accent" />
                            Black Bear Tech
                        </h4>
                        <p className="text-brand-muted max-w-sm mb-8">
                            Engineering the future of digital business. Enterprise software, artificial intelligence, and robust web infrastructure.
                        </p>
                        <Link
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-all"
                        >
                            <MessageCircle className="w-5 h-5 text-brand-accent" />
                            Chat on WhatsApp
                        </Link>
                    </div>

                    <div>
                        <h5 className="font-bold text-white mb-6 font-space-grotesk uppercase tracking-wider text-sm">Capabilities</h5>
                        <ul className="space-y-4 text-brand-muted">
                            <li><Link href="#" className="hover:text-brand-accent transition-colors">AI Solutions</Link></li>
                            <li><Link href="#" className="hover:text-brand-accent transition-colors">Web & App Dev</Link></li>
                            <li><Link href="#" className="hover:text-brand-accent transition-colors">SaaS Platforms</Link></li>
                            <li><Link href="#" className="hover:text-brand-accent transition-colors">Fintech Architecture</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-bold text-white mb-6 font-space-grotesk uppercase tracking-wider text-sm">Connect</h5>
                        <div className="flex gap-4">
                            <Link href="#" className="p-2 glass rounded-lg hover:border-brand-accent/30 text-brand-muted hover:text-white transition-all">
                                <Github className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="p-2 glass rounded-lg hover:border-brand-accent/30 text-brand-muted hover:text-white transition-all">
                                <Twitter className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="p-2 glass rounded-lg hover:border-brand-accent/30 text-brand-muted hover:text-white transition-all">
                                <Linkedin className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-brand-muted">
                    <p>© {new Date().getFullYear()} Black Bear Tech. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
