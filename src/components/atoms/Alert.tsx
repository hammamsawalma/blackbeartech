import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react';

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const variantConfig = {
  info: {
    icon: Info,
    border: 'border-state-info/30',
    bg: 'bg-state-info/5',
    text: 'text-state-info',
  },
  success: {
    icon: CheckCircle2,
    border: 'border-state-success/30',
    bg: 'bg-state-success/5',
    text: 'text-state-success',
  },
  warning: {
    icon: AlertTriangle,
    border: 'border-state-warning/30',
    bg: 'bg-state-warning/5',
    text: 'text-state-warning',
  },
  danger: {
    icon: AlertCircle,
    border: 'border-state-danger/30',
    bg: 'bg-state-danger/5',
    text: 'text-state-danger',
  },
};

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const config = variantConfig[variant];
  const IconComponent = config.icon;

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) setTimeout(onDismiss, 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={`relative flex items-start p-4 rounded-xl border ${config.border} ${config.bg} ${className}`}
          role="alert"
        >
          <div className={`flex-shrink-0 mr-3 mt-0.5 ${config.text}`}>
            <IconComponent className="w-5 h-5" />
          </div>
          
          <div className="flex-1 mr-4">
            {title && <h5 className={`text-sm font-semibold mb-1 ${config.text}`}>{title}</h5>}
            <div className={`text-sm ${title ? 'text-text-muted mt-1' : config.text}`}>
              {children}
            </div>
          </div>

          {dismissible && (
            <button
              onClick={handleDismiss}
              className={`flex-shrink-0 p-1.5 -m-1.5 rounded-lg opacity-70 hover:opacity-100 hover:bg-black/20 transition-all ${config.text}`}
              aria-label="Dismiss alert"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;
