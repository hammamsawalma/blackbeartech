import React, { ElementType, useCallback, useRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'gradient' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  as?: ElementType;
  href?: string;
  className?: string;
}

const variants = {
  primary: 'bg-accent-primary text-text-inverse shadow-[0_0_20px_rgba(0,212,255,0.1)] hover:shadow-[0_0_25px_rgba(0,212,255,0.25)] hover:brightness-105',
  secondary: 'bg-transparent text-text-primary border border-white/15 hover:border-accent-primary hover:bg-accent-primary/5',
  ghost: 'bg-transparent text-text-muted hover:text-white hover:bg-white/5',
  gradient: 'bg-gradient-to-r from-accent-primary to-accent-warm text-white hover:brightness-110 shadow-[0_0_20px_rgba(0,212,255,0.15)]',
  danger: 'bg-state-danger text-white hover:brightness-110 shadow-[0_0_15px_rgba(239,68,68,0.2)]',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-base font-medium',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      icon,
      iconPosition = 'left',
      loading = false,
      disabled = false,
      fullWidth = false,
      as: Component = 'button',
      className = '',
      onClick,
      ...props
    },
    ref
  ) => {
    const rippleRef = useRef<HTMLSpanElement>(null);

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        // Ripple effect
        const btn = (e.currentTarget as HTMLElement);
        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
          position: absolute; border-radius: 50%; pointer-events: none;
          width: ${size}px; height: ${size}px; left: ${x}px; top: ${y}px;
          background: rgba(255,255,255,0.2); transform: scale(0);
          animation: btn-ripple 0.5s ease-out forwards;
        `;
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);

        // Call original onClick
        if (onClick) (onClick as any)(e);
      },
      [onClick]
    );

    const baseStyles = 'relative inline-flex items-center justify-center gap-2 rounded-xl overflow-hidden transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary focus-visible:ring-accent-primary';
    
    const combinedClasses = [
      baseStyles,
      variants[variant],
      sizes[size],
      fullWidth ? 'w-full' : '',
      disabled || loading ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
      className,
    ].filter(Boolean).join(' ');

    const MotionComponent = motion(Component as any);

    return (
      <MotionComponent
        ref={ref}
        className={combinedClasses}
        whileHover={!disabled && !loading ? { y: -2 } : {}}
        whileTap={!disabled && !loading ? { scale: 0.97 } : {}}
        disabled={disabled || loading}
        onClick={!disabled && !loading ? handleClick : undefined}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!loading && icon && iconPosition === 'left' && icon}
        <span className="relative z-[1]">{children}</span>
        {!loading && icon && iconPosition === 'right' && icon}
      </MotionComponent>
    );
  }
);

Button.displayName = 'Button';
export default Button;

