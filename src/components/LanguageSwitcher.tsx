'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggle = () => {
    const nextLocale = locale === 'ar' ? 'en' : 'ar';
    const segments = pathname.split('/');
    segments[1] = nextLocale;
    const newPath = segments.join('/') || `/${nextLocale}`;
    router.push(newPath);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggle}
      className="px-3 py-1.5 text-xs font-bold rounded-xl 
        bg-white/5 border border-white/10 text-white/60
        hover:text-white hover:border-white/20 
        transition-all duration-200 backdrop-blur-md"
      aria-label={locale === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
    >
      {locale === 'ar' ? 'EN' : 'عربي'}
    </motion.button>
  );
}
