"use client";

import { motion } from "framer-motion";
import { MessageCircle, Github, Twitter, Linkedin } from "lucide-react";
import { Icon } from "@/components/atoms";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function Footer() {
    const t = useTranslations("footer");
    const locale = useLocale();
    const isRTL = locale === "ar";

    const whatsappNumber = "+966500000000";
    const whatsappMessage = encodeURIComponent(
        isRTL
            ? "مرحباً بلاك بير تك، أريد مناقشة مشروع."
            : "Hello Black Bear Tech, I would like to discuss a project."
    );
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return (
        <footer className="bg-black relative overflow-hidden border-t border-white/[0.06] pt-20 pb-10">
            {/* Section divider image */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[2px] bg-gradient-to-r from-transparent via-[#00D4FF]/30 to-transparent" />

            {/* Subtle glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[200px] bg-[#00D4FF]/[0.03] blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10" dir={isRTL ? "rtl" : "ltr"}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Logo & Tagline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-2"
                    >
                        <motion.h4
                            whileInView={{ scale: [0.95, 1] }}
                            viewport={{ once: true }}
                            className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2"
                        >
                            <span className="w-4 h-4 rounded-sm bg-white" />
                            {isRTL ? "بلاك بير تك" : "Black Bear Tech"}
                        </motion.h4>
                        <p className="text-white/40 max-w-sm mb-8">
                            {t("description")}
                        </p>

                        {/* WhatsApp CTA */}
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#00D4FF] to-[#00A3CC] hover:opacity-90 transition-all shadow-lg shadow-[#00D4FF]/10"
                        >
                            <Icon icon={MessageCircle} size="sm" />
                            {isRTL ? "تواصل عبر واتساب" : "Contact on WhatsApp"}
                        </a>
                    </motion.div>

                    {/* Navigation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h5 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">
                            {t("nav")}
                        </h5>
                        <ul className="space-y-4 text-white/40">
                            <li><Link href={`/${locale}`} className="hover:text-white transition-colors">{isRTL ? "الرئيسية" : "Home"}</Link></li>
                            <li><Link href={`/${locale}#services`} className="hover:text-white transition-colors">{isRTL ? "الخدمات" : "Services"}</Link></li>
                            <li><Link href={`/${locale}#about`} className="hover:text-white transition-colors">{isRTL ? "عنا" : "About"}</Link></li>
                            <li><Link href={`/${locale}#contact`} className="hover:text-white transition-colors">{isRTL ? "تواصل معنا" : "Contact"}</Link></li>
                        </ul>
                    </motion.div>

                    {/* Social */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h5 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">
                            {t("social")}
                        </h5>
                        <div className="flex gap-4">
                            {[
                                { icon: Github, href: "#" },
                                { icon: Twitter, href: "#" },
                                { icon: Linkedin, href: "#" },
                            ].map((social, i) => (
                                <Link
                                    key={i}
                                    href={social.href}
                                    className="p-2.5 bg-white/5 border border-white/[0.06] rounded-lg hover:border-[#00D4FF]/30 text-white/40 hover:text-white hover:shadow-lg hover:shadow-[#00D4FF]/5 transition-all duration-300"
                                >
                                    <Icon icon={social.icon} size="md" />
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Separator & Copyright */}
                <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-white/30">
                    <p>© {new Date().getFullYear()} {isRTL ? "بلاك بير تك" : "Black Bear Tech"}. {t("rights")}.</p>
                </div>
            </div>
        </footer>
    );
}
