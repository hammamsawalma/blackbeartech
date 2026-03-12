import React, { ElementType } from 'react';
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
      ...props
    },
    ref
  ) => {
    const baseStyles = 'relative inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary focus-visible:ring-accent-primary z-10';
    
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
        whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!loading && icon && iconPosition === 'left' && icon}
        <span>{children}</span>
        {!loading && icon && iconPosition === 'right' && icon}
      </MotionComponent>
    );
  }
);

Button.displayName = 'Button';
export default Button;
