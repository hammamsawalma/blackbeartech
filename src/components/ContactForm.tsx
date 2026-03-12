"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
    const t = useTranslations("contact_page.form");
    const locale = useLocale();
    const isRTL = locale === "ar";
    
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");
        
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        
        try {
            const res = await fetch("/api/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            
            if (!res.ok) throw new Error("Failed to submit");
            
            setStatus("success");
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">{t("name")}</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-colors"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">{t("phone")}</label>
                    <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        required 
                        dir="ltr"
                        className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-colors ${isRTL ? 'text-right' : ''}`}
                    />
                </div>
            </div>
            
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">{t("email")}</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    dir="ltr"
                    className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-colors ${isRTL ? 'text-right' : ''}`}
                />
            </div>
            
            <div>
                <label htmlFor="service" className="block text-sm font-medium text-white mb-2">{t("service")}</label>
                <select 
                    id="service" 
                    name="service" 
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-colors appearance-none"
                >
                    <option value="automation">{isRTL ? 'أتمتة الأعمال' : 'Business Automation'}</option>
                    <option value="web">{isRTL ? 'تطوير مواقع وتطبيقات' : 'Web & App Development'}</option>
                    <option value="saas">{isRTL ? 'أنظمة سحابية' : 'Cloud Systems (SaaS)'}</option>
                    <option value="consulting">{isRTL ? 'استشارات تقنية' : 'Tech Consulting'}</option>
                    <option value="other">{isRTL ? 'أخرى' : 'Other'}</option>
                </select>
            </div>
            
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">{t("message")}</label>
                <textarea 
                    id="message" 
                    name="message" 
                    rows={4} 
                    required 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-colors resize-none"
                ></textarea>
            </div>
            
            {/* Honeypot field for spam prevention */}
            <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />
            
            <button 
                type="submit" 
                disabled={status === "loading" || status === "success"}
                className="w-full btn-primary flex justify-center items-center gap-2 py-4"
            >
                {status === "loading" ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : status === "success" ? (
                    <>
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <span>{t("success")}</span>
                    </>
                ) : (
                    <>
                        <Send className="w-5 h-5" />
                        <span>{t("submit")}</span>
                    </>
                )}
            </button>
            
            {status === "error" && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-xl text-sm"
                >
                    <AlertCircle className="w-5 h-5" />
                    <p>{t("error")}</p>
                </motion.div>
            )}
        </form>
    );
}
