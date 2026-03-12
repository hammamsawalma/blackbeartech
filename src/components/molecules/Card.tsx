'use client';

import React, { useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

export interface CardProps {
  variant?: 'default' | 'interactive' | 'featured';
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  glowColor?: string;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  children,
  className = '',
  glow = false,
  glowColor = '#00D4FF',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!glow || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      cardRef.current.style.setProperty('--mouse-x', `${x}%`);
      cardRef.current.style.setProperty('--mouse-y', `${y}%`);
    },
    [glow]
  );

  const baseClasses = 'relative rounded-2xl border overflow-hidden';

  const variantClasses = {
    default: 'bg-white/[0.03] border-white/[0.06] p-6 transition-all duration-300',
    interactive: 'bg-white/[0.03] border-white/[0.06] p-6 hover:border-white/[0.12] hover:bg-white/[0.05] cursor-pointer group transition-all duration-300',
    featured: 'bg-gradient-to-br from-white/[0.06] to-white/[0.02] border-white/[0.1] p-8 ring-1 ring-white/[0.04] transition-all duration-300',
  };

  return (
    <motion.div
      ref={cardRef}
      whileHover={variant === 'interactive' ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* Glow effect — follows cursor */}
      {glow && (
        <div
          className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}15, transparent 60%)`,
          }}
        />
      )}

      {/* Surface sheen — sweep animation */}
      {variant === 'interactive' && (
        <div className="surface-sheen absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}

      {/* Subtle top border highlight */}
      {variant === 'interactive' && (
        <div 
          className="absolute top-0 left-[10%] right-[10%] h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, ${glowColor}40, transparent)` }}
        />
      )}

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default Card;

