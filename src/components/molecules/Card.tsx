'use client';

import React from 'react';
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
  const baseClasses = 'relative rounded-2xl border transition-all duration-300 overflow-hidden';

  const variantClasses = {
    default: 'bg-white/[0.03] border-white/[0.06] p-6',
    interactive: 'bg-white/[0.03] border-white/[0.06] p-6 hover:border-white/[0.12] hover:bg-white/[0.05] cursor-pointer group',
    featured: 'bg-gradient-to-br from-white/[0.06] to-white/[0.02] border-white/[0.1] p-8 ring-1 ring-white/[0.04]',
  };

  return (
    <motion.div
      whileHover={variant === 'interactive' ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.2 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {/* Glow effect */}
      {glow && (
        <div
          className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}15, transparent 60%)`,
          }}
        />
      )}

      {/* Surface sheen */}
      {variant === 'interactive' && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white/[0.04] to-transparent" />
      )}

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default Card;
