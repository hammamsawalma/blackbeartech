import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface IconProps {
  icon: LucideIcon;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string; // Tailwind color class or inherit
  className?: string;
  label?: string; // aria-label for standalone icons
}

const sizeMap = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

export const Icon: React.FC<IconProps> = ({
  icon: LucideComponent,
  size = 'md',
  color,
  className = '',
  label,
}) => {
  return (
    <LucideComponent
      size={sizeMap[size]}
      className={`${color ? color : ''} ${className}`}
      aria-hidden={!label ? 'true' : undefined}
      aria-label={label}
      role={label ? 'img' : undefined}
    />
  );
};

export default Icon;
