import React from 'react';

export interface BadgeProps {
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'danger';
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
}

const variants = {
  default: 'bg-white/5 border-white/10 text-white shadow-[0_4px_24px_rgba(0,0,0,0.3)] backdrop-blur-md',
  accent: 'bg-accent-primary/10 border-accent-primary/30 text-accent-primary shadow-[0_0_20px_rgba(0,212,255,0.15)]',
  success: 'bg-state-success/10 border-state-success/30 text-state-success',
  warning: 'bg-state-warning/10 border-state-warning/30 text-state-warning',
  danger: 'bg-state-danger/10 border-state-danger/30 text-state-danger',
};

const dotColors = {
  default: 'bg-white',
  accent: 'bg-accent-primary',
  success: 'bg-state-success',
  warning: 'bg-state-warning',
  danger: 'bg-state-danger',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  children,
  dot = false,
  className = '',
}) => {
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold uppercase tracking-widest ${variants[variant]} ${className}`}>
      {dot && (
        <span className="relative flex w-2 h-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColors[variant]}`}></span>
          <span className={`relative inline-flex rounded-full w-2 h-2 ${dotColors[variant]}`}></span>
        </span>
      )}
      {children}
    </div>
  );
};

export default Badge;
