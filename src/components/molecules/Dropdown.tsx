'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface DropdownItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'start' | 'end';
  onSelect: (value: string) => void;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  align = 'start',
  onSelect,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) setActiveIndex(-1);
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((prev) => {
          let next = prev + 1;
          while (next < items.length && items[next].disabled) next++;
          return next >= items.length ? prev : next;
        });
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) => {
          let next = prev - 1;
          while (next >= 0 && items[next].disabled) next--;
          return next < 0 ? prev : next;
        });
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (activeIndex >= 0 && !items[activeIndex].disabled) {
          onSelect(items[activeIndex].value);
          setIsOpen(false);
        }
        break;
    }
  };

  const alignmentClass = align === 'start' ? 'left-0' : 'right-0';

  return (
    <div
      className={`relative inline-block text-left ${className}`}
      ref={containerRef}
      onKeyDown={handleKeyDown}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
        role="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        tabIndex={0}
      >
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95, transition: { duration: 0.12 } }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 mt-2 w-56 rounded-xl bg-[#0f1117]/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden ${alignmentClass}`}
            role="menu"
          >
            <div className="py-1">
              {items.map((item, index) => (
                <div
                  key={item.value}
                  onClick={() => {
                    if (!item.disabled) {
                      onSelect(item.value);
                      setIsOpen(false);
                    }
                  }}
                  onMouseEnter={() => !item.disabled && setActiveIndex(index)}
                  className={`
                    flex items-center px-4 py-2.5 text-sm transition-colors cursor-pointer
                    ${item.disabled ? 'opacity-40 cursor-not-allowed' : ''}
                    ${item.danger ? 'text-red-400 hover:bg-red-500/10' : 'text-white/90 hover:bg-white/5'}
                    ${activeIndex === index && !item.disabled ? (item.danger ? 'bg-red-500/10' : 'bg-white/5') : ''}
                  `}
                  role="menuitem"
                >
                  {item.icon && <span className="mr-3 text-white/50">{item.icon}</span>}
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
