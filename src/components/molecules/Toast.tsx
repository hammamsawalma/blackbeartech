import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react';

export type ToastVariant = 'info' | 'success' | 'warning' | 'danger';

export interface ToastData {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastProps extends ToastData {
  onDismiss: (id: string) => void;
}

const variantConfig = {
  info: {
    icon: Info,
    border: 'border-state-info/30',
    bg: 'bg-state-info/5',
    text: 'text-state-info',
    bar: 'bg-state-info',
  },
  success: {
    icon: CheckCircle2,
    border: 'border-state-success/30',
    bg: 'bg-state-success/5',
    text: 'text-state-success',
    bar: 'bg-state-success',
  },
  warning: {
    icon: AlertTriangle,
    border: 'border-state-warning/30',
    bg: 'bg-state-warning/5',
    text: 'text-state-warning',
    bar: 'bg-state-warning',
  },
  danger: {
    icon: AlertCircle,
    border: 'border-state-danger/30',
    bg: 'bg-state-danger/5',
    text: 'text-state-danger',
    bar: 'bg-state-danger',
  },
};

export const Toast: React.FC<ToastProps> = ({
  id,
  variant,
  title,
  description,
  duration = 5000,
  onDismiss,
}) => {
  const config = variantConfig[variant];
  const IconComponent = config.icon;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onDismiss(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`relative flex items-start p-4 w-full max-w-sm rounded-xl border backdrop-blur-xl shadow-2xl ${config.border} bg-bg-surface/95 overflow-hidden`}
      role="alert"
    >
      <div className={`flex-shrink-0 mr-3 mt-0.5 ${config.text}`}>
        <IconComponent className="w-5 h-5" />
      </div>
      
      <div className="flex-1 mr-4">
        <h5 className={`text-sm font-semibold mb-1 ${config.text}`}>{title}</h5>
        {description && (
          <div className="text-sm text-text-muted mt-1">
            {description}
          </div>
        )}
      </div>

      <button
        onClick={() => onDismiss(id)}
        className={`flex-shrink-0 p-1.5 -m-1.5 rounded-lg opacity-70 hover:opacity-100 transition-all ${config.text}`}
      >
        <X className="w-4 h-4" />
      </button>

      {/* Progress Bar */}
      {duration > 0 && (
        <motion.div
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: duration / 1000, ease: "linear" }}
          className={`absolute bottom-0 left-0 h-1 ${config.bar}`}
        />
      )}
    </motion.div>
  );
};
