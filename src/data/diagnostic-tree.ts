// src/data/diagnostic-tree.ts
// Decision tree data for the DiagnosticWizard component

export const businessTypes = [
    { id: "retail",      icon: "🏪", label: { ar: "تجارة / محلات",        en: "Retail / Shops" } },
    { id: "contracting", icon: "🏗️", label: { ar: "مقاولات / مشاريع",    en: "Contracting / Projects" } },
    { id: "services",    icon: "💼", label: { ar: "خدمات / شركة",         en: "Services / Company" } },
    { id: "ecommerce",   icon: "🛒", label: { ar: "أريد أبيع أونلاين",   en: "Want to Sell Online" } },
    { id: "manufacturing", icon: "🏭", label: { ar: "تصنيع / إنتاج",      en: "Manufacturing" } },
    { id: "other",       icon: "❓", label: { ar: "غير ذلك",              en: "Other" } },
];

export const challenges = [
    { id: "manual",    icon: "📋", label: { ar: "أعمال يدوية كثيرة تأخذ وقتي",     en: "Too much manual work eating my time" } },
    { id: "data",      icon: "📊", label: { ar: "ما أعرف أرقام عملي بوضوح",         en: "Can't clearly track my business numbers" } },
    { id: "online",    icon: "🌐", label: { ar: "أريد أوصل لعملاء أكثر أونلاين",     en: "Need to reach more customers online" } },
    { id: "security",  icon: "🔒", label: { ar: "بياناتي غير محمية وقلقان",          en: "My data isn't secure and I'm worried" } },
    { id: "team",      icon: "🤝", label: { ar: "صعب أنسق مع فريقي الموزع",         en: "Hard to coordinate with my distributed team" } },
];

export const recommendations: Record<string, {
    icon: string;
    title: { ar: string; en: string };
    description: { ar: string; en: string };
    whatsappMessage: { ar: string; en: string };
}> = {
    manual: {
        icon: "🤖",
        title:       { ar: "نظام الأتمتة الذكية",              en: "Smart Automation System" },
        description: { ar: "نربط مهامك اليدوية ببعض حتى تشتغل تلقائياً، ونوفر لك 15+ ساعة أسبوعياً.", en: "We connect your manual tasks so they run automatically, saving you 15+ hours per week." },
        whatsappMessage: { ar: "مرحباً بلاك بير تك، أدير {businessType} وعندي أعمال يدوية كثيرة. أبي أعرف كيف تساعدوني بالأتمتة.", en: "Hi Black Bear Tech, I run a {businessType} business and have too much manual work. I'd love to learn about your automation solutions." },
    },
    data: {
        icon: "📊",
        title:       { ar: "لوحة تحكم ذكية لعملك",             en: "Smart Business Dashboard" },
        description: { ar: "لوحة واحدة تجمع كل أرقامك — مبيعات، مصاريف، أداء — بلمحة واحدة.", en: "One dashboard that combines all your numbers — sales, expenses, performance — at a glance." },
        whatsappMessage: { ar: "مرحباً بلاك بير تك، أدير {businessType} وما أقدر أتابع أرقام عملي. أبي لوحة تحكم.", en: "Hi Black Bear Tech, I run a {businessType} and can't track my business data. I need a dashboard solution." },
    },
    online: {
        icon: "🌐",
        title:       { ar: "موقع أو متجر إلكتروني يجيبلك عملاء", en: "A Website or Store That Brings You Customers" },
        description: { ar: "وجود رقمي احترافي يشتغل لك على مدار الساعة — يجذب العملاء ويبيع بدون ما تتدخل.", en: "A professional digital presence that works 24/7 — attracting customers and selling without you lifting a finger." },
        whatsappMessage: { ar: "مرحباً بلاك بير تك، أدير {businessType} وأبي أوصل لعملاء أكثر أونلاين. ممكن تساعدوني؟", en: "Hi Black Bear Tech, I run a {businessType} and want to reach more customers online. Can you help?" },
    },
    security: {
        icon: "🔒",
        title:       { ar: "حماية بيانات عملك بالكامل",          en: "Complete Business Data Protection" },
        description: { ar: "نؤمّن بياناتك، نعمل نسخ احتياطية تلقائية، ونراقب الأمان على مدار الساعة.", en: "We secure your data, set up automatic backups, and monitor security 24/7." },
        whatsappMessage: { ar: "مرحباً بلاك بير تك، أدير {businessType} وقلقان على أمان بياناتي. أبي حل أمني شامل.", en: "Hi Black Bear Tech, I run a {businessType} and I'm worried about data security. I need a comprehensive security solution." },
    },
    team: {
        icon: "🤝",
        title:       { ar: "نظام يجمع فريقك في مكان واحد",      en: "A System That Unites Your Team" },
        description: { ar: "برنامج سحابي يربط فريقك أينما كانوا — مهام، محادثات، ملفات، في مكان واحد.", en: "Cloud software that connects your team wherever they are — tasks, chats, files, all in one place." },
        whatsappMessage: { ar: "مرحباً بلاك بير تك، أدير {businessType} وفريقي موزع وصعب ننسق. أبي نظام تعاون.", en: "Hi Black Bear Tech, I run a {businessType} and my team is distributed. I need a collaboration system." },
    },
};
