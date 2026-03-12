'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin accent-colored bar at the very top showing scroll position.
 * Uses Framer Motion useScroll + useSpring for smooth tracking.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0%' }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00D4FF] to-[#00A3CC] z-[100]"
    />
  );
}
