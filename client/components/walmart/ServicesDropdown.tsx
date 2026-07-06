import { useState, useRef, useEffect } from 'react';
import type React from 'react';
import { ChevronDown } from '@/components/icons';
import { MegaNav } from '@/components/walmart/MegaNav';
import styles from './ServicesDropdown.module.css';

interface ServicesDropdownProps {
  leadingIcon?: React.ReactNode;
}

export function ServicesDropdown({ leadingIcon }: ServicesDropdownProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={() => setIsOpen((v) => !v)}
      >
        {leadingIcon && <span className={styles.leadingIcon}>{leadingIcon}</span>}
        Services
        <ChevronDown className={[styles.icon, isOpen ? styles.iconOpen : ''].filter(Boolean).join(' ')} aria-hidden="true" />
      </button>

      <MegaNav
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        initialTab="services"
        mode="panel"
      />
    </div>
  );
}
