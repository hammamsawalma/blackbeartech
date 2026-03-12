import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Icon } from "@/components/atoms";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  success?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, success, className = '', disabled, value, onChange, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const selectedOption = options.find(opt => opt.value === value);
    const hasValue = !!selectedOption;
    const isFloating = isOpen || hasValue;

    let borderClass = 'border-white/10';
    let bgClass = 'bg-white/5';
    let ringClass = isOpen ? 'ring-2 ring-accent-primary/50' : '';

    if (error) {
      borderClass = 'border-state-danger';
      bgClass = 'bg-state-danger/5';
      ringClass = isOpen ? 'ring-2 ring-state-danger/50' : '';
    } else if (success) {
      borderClass = 'border-state-success';
    } else if (isOpen) {
      borderClass = 'border-accent-primary';
    }

    if (disabled) {
      borderClass = 'border-white/5 cursor-not-allowed';
      bgClass = 'bg-white/3';
    }

    return (
      <div className={`relative w-full ${className} ${disabled ? 'opacity-50' : ''}`}>
        {/* Hidden native select for form serialization */}
        <select
          ref={ref}
          className="hidden"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          {...props}
        >
          <option value="" disabled>{label}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        {/* Custom UI */}
        <div className="relative">
          <div 
            onClick={() => !disabled && setIsOpen(!isOpen)}
            className={`relative flex items-center justify-between w-full min-h-[56px] px-4 rounded-xl border transition-all duration-300 cursor-pointer ${borderClass} ${bgClass} ${ringClass} ${disabled ? 'cursor-not-allowed' : ''}`}
          >
            <div className="relative flex-1 h-full pt-4 pb-1">
              <motion.label
                initial={false}
                animate={{
                  y: isFloating ? -12 : 0,
                  scale: isFloating ? 0.85 : 1,
                  color: error 
                    ? 'var(--color-state-danger)'
                    : isOpen 
                      ? 'var(--color-accent-primary)' 
                      : 'var(--color-text-muted)'
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`absolute left-0 top-3 origin-top-left pointer-events-none text-base`}
                style={{
                  top: isFloating ? '16px' : '50%',
                  translateY: isFloating ? '0' : '-50%'
                }}
              >
                {label}
              </motion.label>
              
              <div className="w-full text-text-primary truncate">
                {selectedOption ? selectedOption.label : ''}
              </div>
            </div>
            
            <div className="flex-shrink-0 ml-3 text-text-muted flex items-center gap-2">
              {success && !error && (
                <div className="text-state-success">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                <Icon icon={ChevronDown} size="md"  />
              </motion.div>
            </div>
          </div>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isOpen && !disabled && (
              <>
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setIsOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 right-0 mt-2 py-2 bg-bg-surface/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-50 overflow-hidden"
                >
                  <div className="max-h-60 overflow-y-auto custom-scrollbar">
                    {options.map((opt) => (
                      <div
                        key={opt.value}
                        onClick={() => {
                          onChange?.(opt.value);
                          setIsOpen(false);
                        }}
                        className={`px-4 py-3 cursor-pointer transition-colors ${
                          value === opt.value 
                            ? 'bg-accent-primary/10 text-accent-primary' 
                            : 'text-text-primary hover:bg-white/5'
                        }`}
                      >
                        {opt.label}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
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

Select.displayName = 'Select';
export default Select;
