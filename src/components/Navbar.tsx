'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/tech`, label: t('solutions') },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-2xl shadow-black/50'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="container mx-auto px-6 h-16 flex items-center justify-between"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Logo — B&W with cyan accent */}
        <Link href={`/${locale}`} className="flex items-center gap-2.5 group">
          <motion.span
            whileHover={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 0.4 }}
            className="w-8 h-8 rounded-xl bg-white 
              flex items-center justify-center text-black font-bold text-sm
              shadow-lg shadow-white/10 group-hover:shadow-white/20 transition-shadow"
          >
            B
          </motion.span>
          <span className="font-bold text-white text-sm tracking-tight">
            {isRTL ? 'بلاك بير تك' : 'Black Bear Tech'}
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-text-muted hover:text-white 
                transition-colors text-sm font-medium rounded-xl
                hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />

          <Link
            href={`/${locale}/tech`}
            className="hidden md:flex items-center gap-2 px-5 py-2 
              btn-primary text-sm"
          >
            {t('cta')}
            <span className={isRTL ? 'rotate-180' : ''}>→</span>
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-white/5 transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <div className="w-5 flex flex-col gap-1">
              <span className={`block h-0.5 w-full bg-white rounded-full transition-transform duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-0.5 w-full bg-white rounded-full transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-full bg-white rounded-full transition-transform duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-16 bg-black/70 backdrop-blur-sm md:hidden z-40"
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
              className="absolute top-16 inset-x-0 mx-4 md:hidden z-50 
                bg-bg-surface/95 backdrop-blur-2xl border border-white/[0.06] 
                rounded-2xl shadow-2xl shadow-black/50 p-4 space-y-1"
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block text-text-muted hover:text-white py-3 px-4 
                      text-sm rounded-xl hover:bg-white/5 transition-all"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="pt-2"
              >
                <Link
                  href={`/${locale}/tech`}
                  onClick={() => setMenuOpen(false)}
                  className="block text-center btn-primary px-5 py-3 text-sm w-full"
                >
                  {t('cta')}
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
