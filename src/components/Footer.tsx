"use client";

import { MessageCircle, Github, Twitter, Linkedin } from "lucide-react";
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
            {/* Subtle glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[200px] bg-[#00D4FF]/3 blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10" dir={isRTL ? "rtl" : "ltr"}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="lg:col-span-2">
                        <h4 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
                            <span className="w-4 h-4 rounded-sm bg-white" />
                            {isRTL ? "بلاك بير تك" : "Black Bear Tech"}
                        </h4>
                        <p className="text-text-muted max-w-sm mb-8">
                            {t("description")}
                        </p>
                        <Link
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/[0.08] rounded-xl text-white font-medium transition-all"
                        >
                            <MessageCircle className="w-5 h-5 text-[#00D4FF]" />
                            {isRTL ? "تحدث عبر واتساب" : "Chat on WhatsApp"}
                        </Link>
                    </div>

                    <div>
                        <h5 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">
                            {t("nav")}
                        </h5>
                        <ul className="space-y-4 text-text-muted">
                            <li><Link href={`/${locale}`} className="hover:text-white transition-colors">{isRTL ? "الرئيسية" : "Home"}</Link></li>
                            <li><Link href={`/${locale}/tech`} className="hover:text-white transition-colors">{isRTL ? "الحلول" : "Solutions"}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">
                            {t("social")}
                        </h5>
                        <div className="flex gap-4">
                            <Link href="#" className="p-2 bg-white/5 border border-white/[0.06] rounded-lg hover:border-[#00D4FF]/30 text-text-muted hover:text-white transition-all">
                                <Github className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="p-2 bg-white/5 border border-white/[0.06] rounded-lg hover:border-[#00D4FF]/30 text-text-muted hover:text-white transition-all">
                                <Twitter className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="p-2 bg-white/5 border border-white/[0.06] rounded-lg hover:border-[#00D4FF]/30 text-text-muted hover:text-white transition-all">
                                <Linkedin className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-text-muted">
                    <p>© {new Date().getFullYear()} {isRTL ? "بلاك بير تك" : "Black Bear Tech"}. {t("rights")}.</p>
                </div>
            </div>
        </footer>
    );
}
