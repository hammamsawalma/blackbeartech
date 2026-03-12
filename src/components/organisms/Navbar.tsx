'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, usePathname } from '@/i18n/navigation';
import { useState, useEffect, useCallback } from 'react';
import LanguageSwitcher from '../LanguageSwitcher';
import { Button } from '@/components/atoms';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const isRTL = locale === 'ar';
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      if (pathname === path || pathname === `${path}/`) {
        e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setMenuOpen(false);
        }
      }
    }
  };

  // Scroll detection
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // ESC to close mobile menu
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const sectionIds = ['hero', 'services', 'about', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const navLinks = [
    { href: '/#hero', section: 'hero', label: t('home') },
    { href: '/#services', section: 'services', label: t('services') },
    { href: '/#about', section: 'about', label: t('about') },
    { href: '/#contact', section: 'contact', label: t('contact') },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 transition-all duration-500 will-change-transform ${
        scrolled
          ? 'bg-black/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-2xl shadow-black/50'
          : 'bg-transparent'
      }`}
      style={{ zIndex: 'var(--z-nav)' }}
    >
      <nav
        className="container mx-auto px-6 h-16 flex items-center justify-between"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <motion.div
            whileHover={{ scale: 1.05, rotate: [-2, 2, 0] }}
            transition={{ duration: 0.4 }}
            className="w-8 h-8 flex items-center justify-center relative drop-shadow-md group-hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.5)] transition-all"
          >
            <img src="/logo-icon.png" alt="Black Bear Tech Logo" className="w-full h-full object-contain" />
          </motion.div>
          <span className="font-bold text-white text-sm tracking-tight">
            {isRTL ? 'بلاك بير تك' : 'Black Bear Tech'}
          </span>
        </Link>

        {/* Desktop Links with active indicator */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300
                ${activeSection === link.section
                  ? 'text-white bg-white/5'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
            >
              {link.label}
              {/* Active cyan dot indicator */}
              {activeSection === link.section && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-primary"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />

          <Button
            as={Link}
            href="/#contact"
            // @ts-ignore — Link onClick type mismatch
            onClick={(e: any) => handleNavClick(e, '/#contact')}
            variant="primary"
            size="sm"
            className="hidden md:flex items-center gap-2"
          >
            {t('cta')}
            <span className={isRTL ? 'rotate-180' : ''}>→</span>
          </Button>

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

      {/* ═══════════════════════════════════════
          Full-Screen Mobile Menu Overlay
      ═══════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-16 bg-black/95 backdrop-blur-2xl md:hidden flex flex-col"
            style={{ zIndex: 'var(--z-overlay)' }}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {/* Nav Links — Large & Touch-friendly */}
            <div className="flex-1 flex flex-col items-center justify-center gap-2 px-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className="w-full"
                >
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      handleNavClick(e, link.href);
                      if (!e.defaultPrevented) setMenuOpen(false);
                    }}
                    className={`block text-center py-4 text-2xl font-bold rounded-2xl transition-all
                      ${activeSection === link.section
                        ? 'text-white bg-white/5 border border-white/10'
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    {link.label}
                    {activeSection === link.section && (
                      <span className="inline-block w-2 h-2 rounded-full bg-accent-primary ml-3 mb-0.5" />
                    )}
                  </Link>
                </motion.div>
              ))}

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.06, duration: 0.3 }}
                className="w-full mt-6"
              >
                <Link
                  href="/#contact"
                  onClick={(e) => {
                    handleNavClick(e, '/#contact');
                    if (!e.defaultPrevented) setMenuOpen(false);
                  }}
                  className="block text-center w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-accent-primary to-accent-primary/80 hover:opacity-90 transition-all text-lg"
                >
                  {t('cta')} <span className={isRTL ? 'rotate-180 inline-block' : ''}>→</span>
                </Link>
              </motion.div>
            </div>

            {/* Language Switcher at bottom */}
            <div className="pb-10 flex justify-center">
              <LanguageSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
