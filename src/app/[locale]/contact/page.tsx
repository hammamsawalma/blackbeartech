"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
    const t = useTranslations("contact_page");
    const locale = useLocale();
    const isRTL = locale === "ar";
    
    // We get individual sub-keys for the info section
    const tInfo = useTranslations("contact_page.info");

    return (
        <main className="min-h-screen bg-bg-primary pt-24 pb-16" dir={isRTL ? "rtl" : "ltr"}>
            <div className="container mx-auto px-6">
                
                {/* Hero section */}
                <div className="text-center max-w-3xl mx-auto mb-16 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">{t("title")}</h1>
                        <p className="text-lg md:text-xl text-text-muted leading-relaxed">
                            {t("subtitle")}
                        </p>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    
                    {/* Left side: Contact Info + Image */}
                    <motion.div
                        initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="w-full h-[250px] md:h-[300px] rounded-3xl overflow-hidden relative mb-12 border border-white/10">
                            <Image
                                src="/images/contact_bw.png"
                                alt="Contact Black Bear Tech"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/50 to-transparent" />
                        </div>

                        <div className="card-cheerful p-8 border border-white/10">
                            <h2 className="text-2xl font-bold mb-8 text-white">{tInfo("title")}</h2>
                            
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-accent-primary/10 flex items-center justify-center text-accent-primary border border-accent-primary/20">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-text-muted mb-1">{tInfo("email")}</p>
                                        <a href="mailto:hello@blackbeartech.com" className="text-white hover:text-accent-primary transition-colors font-medium">
                                            hello@blackbeartech.com
                                        </a>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-accent-warm/10 flex items-center justify-center text-accent-warm border border-accent-warm/20">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-text-muted mb-1">{tInfo("phone")}</p>
                                        <a href="tel:+966500000000" className="text-white hover:text-accent-warm transition-colors font-medium" dir="ltr">
                                            +966 50 000 0000
                                        </a>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-text-muted mb-1">{tInfo("address")}</p>
                                        <p className="text-white font-medium">{tInfo("addressValue")}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 mt-8 pt-8 border-t border-white/5">
                                    <div className="w-12 h-12 rounded-full bg-[#00D4FF]/10 flex items-center justify-center text-[#00D4FF] border border-[#00D4FF]/20">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">{isRTL ? "نرد خلال ساعتين" : "We reply within 2 hours"}</p>
                                        <p className="text-sm text-text-muted mt-1">{isRTL ? "متاحون 24/7 للحالات الطارئة" : "Available 24/7 for emergencies"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right side: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="card-cheerful p-8 md:p-10 border border-white/10 relative overflow-hidden"
                    >
                        {/* Glow effect inside form */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/10 blur-[100px] rounded-full pointer-events-none" />
                        
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold mb-8 text-white">{isRTL ? "أرسل لنا رسالة" : "Send us a message"}</h2>
                            <ContactForm />
                        </div>
                    </motion.div>

                </div>
            </div>
        </main>
    );
}
