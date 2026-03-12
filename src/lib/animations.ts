/**
 * Shared Framer Motion animation variants
 * Used across all organism components for consistent motion design.
 */

import type { Variants } from 'framer-motion';

/** Fade + slide up — default section entry animation */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Scale from 95% — for modals, cards, tooltips */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Fade in from left (for LTR content) */
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Fade in from right (for RTL content or secondary panels) */
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Stagger container — parent of staggered children */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

/** Stagger item — child of staggerContainer */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Smooth spring config for interactive elements */
export const springConfig = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
};

/** Standard easing curve across the project */
export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1];

/** Viewport options for whileInView */
export const viewportOnce = { once: true, margin: '-80px' };
