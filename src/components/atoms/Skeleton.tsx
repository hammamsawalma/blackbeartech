import React from 'react';

export interface SkeletonProps {
  variant?: 'text' | 'card' | 'image' | 'avatar' | 'table-row';
  width?: string;
  height?: string;
  lines?: number;
  className?: string;
}

const variantDefaults: Record<string, { width: string; height: string; radius: string }> = {
  text: { width: '100%', height: '16px', radius: '6px' },
  card: { width: '100%', height: '200px', radius: '16px' },
  image: { width: '100%', height: '300px', radius: '12px' },
  avatar: { width: '48px', height: '48px', radius: '9999px' },
  'table-row': { width: '100%', height: '44px', radius: '6px' },
};

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  lines = 1,
  className = '',
}) => {
  const defaults = variantDefaults[variant];

  const shimmerStyle: React.CSSProperties = {
    width: width || defaults.width,
    height: height || defaults.height,
    borderRadius: defaults.radius,
    background: `linear-gradient(
      90deg,
      rgba(255,255,255,0.03) 0%,
      rgba(255,255,255,0.08) 40%,
      rgba(255,255,255,0.03) 60%,
      rgba(255,255,255,0.03) 100%
    )`,
    backgroundSize: '200% 100%',
    animation: 'skeleton-shimmer 2s infinite ease-in-out',
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            style={{
              ...shimmerStyle,
              width: i === lines - 1 ? '70%' : '100%',
            }}
          />
        ))}
      </div>
    );
  }

  return <div style={shimmerStyle} className={className} />;
};

export default Skeleton;
