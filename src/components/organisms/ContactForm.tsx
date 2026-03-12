"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button, Input, Select, Textarea , Icon} from "@/components/atoms";

export default function ContactForm() {
    const t = useTranslations("contact");
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
        <section className="py-24 relative overflow-hidden bg-black">
            {/* Background decorations */}
            <div className="absolute inset-0 bg-radial from-accent-primary/5 via-transparent to-transparent pointer-events-none opacity-50" />
            
            <div className="container mx-auto px-6 relative z-10" dir={isRTL ? "rtl" : "ltr"}>
                <div className="max-w-3xl mx-auto bg-white/[0.03] border border-white/10 p-8 md:p-14 rounded-[2.5rem] backdrop-blur-xl shadow-2xl relative overflow-hidden">
                    {/* Top gradient highlight inside the card */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-accent-primary to-transparent opacity-70" />
                    
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white tracking-tight">
                            {t("title")}
                        </h2>
                        <p className="text-gray-400 text-lg max-w-xl mx-auto">
                            {t("subtitle")}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <Input 
                                label={t("form.name")}
                                type="text"
                                id="name"
                                name="name"
                                required
                            />
                            <Input 
                                label={t("form.phone")}
                                type="tel"
                                id="phone"
                                name="phone"
                                required
                                dir="ltr"
                            />
                        </div>
                        
                        <Input 
                            label={t("form.email")}
                            type="email"
                            id="email"
                            name="email"
                            required
                            dir="ltr"
                        />
                        
                        <div>
                            <label htmlFor="service" className="block text-sm font-medium text-white mb-2">{t("form.service")}</label>
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
                            <label htmlFor="message" className="block text-sm font-medium text-white mb-2">{t("form.message")}</label>
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
                        
                        <Button 
                            type="submit" 
                            disabled={status === "loading" || status === "success"}
                            variant="primary"
                            size="lg"
                            fullWidth
                            loading={status === "loading"}
                            icon={status === "success" ? <Icon icon={CheckCircle2} size="md" color="text-green-500"  /> : <Icon icon={Send} size="md"  />}
                        >
                            {status === "success" ? t("form.success") : t("form.submit")}
                        </Button>
                        
                        {status === "error" && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }} 
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-xl text-sm justify-center"
                            >
                                <Icon icon={AlertCircle} size="md"  />
                                <p>{t("form.error")}</p>
                            </motion.div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
