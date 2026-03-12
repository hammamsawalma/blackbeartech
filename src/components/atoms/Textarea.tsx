import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  success?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, success, className = '', disabled, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    
    const hasValue = props.value !== undefined && props.value !== '' 
      || props.defaultValue !== undefined && props.defaultValue !== '';
      
    const isFloating = isFocused || hasValue || props.placeholder;

    let borderClass = 'border-white/10';
    let bgClass = 'bg-white/5';
    let ringClass = 'focus-within:ring-2 focus-within:ring-accent-primary/50';

    if (error) {
      borderClass = 'border-state-danger';
      bgClass = 'bg-state-danger/5';
      ringClass = 'focus-within:ring-state-danger/50';
    } else if (success) {
      borderClass = 'border-state-success';
    } else if (isFocused) {
      borderClass = 'border-accent-primary';
    }

    if (disabled) {
      borderClass = 'border-white/5 cursor-not-allowed';
      bgClass = 'bg-white/3';
    }

    return (
      <div className={`relative w-full ${className} ${disabled ? 'opacity-50' : ''}`}>
        <div 
          className={`relative flex items-start w-full min-h-[120px] px-4 rounded-xl border transition-all duration-300 ${borderClass} ${bgClass} ${ringClass}`}
        >
          <div className="relative flex-1 h-full pt-4 pb-1">
            <motion.label
              initial={false}
              animate={{
                y: isFloating ? -12 : 0,
                scale: isFloating ? 0.85 : 1,
                color: error 
                  ? 'var(--color-state-danger)'
                  : isFocused 
                    ? 'var(--color-accent-primary)' 
                    : 'var(--color-text-muted)'
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`absolute left-0 top-3 origin-top-left pointer-events-none text-base`}
              style={{
                top: isFloating ? '16px' : '24px',
                translateY: isFloating ? '0' : '0'
              }}
            >
              {label}
            </motion.label>
            
            <textarea
              ref={ref}
              disabled={disabled}
              className={`w-full min-h-[90px] mt-3 bg-transparent outline-none text-text-primary resize-y ${disabled ? 'cursor-not-allowed' : ''} placeholder:text-transparent focus:placeholder:text-text-muted/50 custom-scrollbar`}
              onFocus={(e) => {
                setIsFocused(true);
                props.onFocus?.(e);
              }}
              onBlur={(e) => {
                setIsFocused(false);
                props.onBlur?.(e);
              }}
              {...props}
            />
          </div>
          
          {success && !error && (
            <div className="flex-shrink-0 ml-3 mt-4 text-state-success">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>
        
        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1.5 text-xs text-state-danger px-1 font-medium"
          >
            {error}
          </motion.div>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
export default Textarea;
