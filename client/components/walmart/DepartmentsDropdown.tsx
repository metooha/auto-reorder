import { useState, useRef, useEffect } from 'react';
import type React from 'react';
import { ChevronDown } from '@/components/icons';
import { MegaNav } from '@/components/walmart/MegaNav';
import styles from './DepartmentsDropdown.module.css';

interface DepartmentsDropdownProps {
  leadingIcon?: React.ReactNode;
  /** Icon-only mode: hides label and chevron, shows only the leadingIcon */
  iconOnly?: boolean;
  /** Use overlay mode instead of dropdown panel (for native) */
  overlayMode?: boolean;
}

export function DepartmentsDropdown({ leadingIcon, iconOnly = false, overlayMode = false }: DepartmentsDropdownProps = {}) {
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
        className={[styles.trigger, iconOnly ? styles.triggerIconOnly : ''].filter(Boolean).join(' ')}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={() => setIsOpen((v) => !v)}
      >
        {leadingIcon && <span className={iconOnly ? styles.leadingIconOnly : styles.leadingIcon}>{leadingIcon}</span>}
        {!iconOnly && <>Departments<ChevronDown className={[styles.icon, isOpen ? styles.iconOpen : ''].filter(Boolean).join(' ')} aria-hidden="true" /></>}
      </button>

      <MegaNav
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        initialTab="departments"
        mode={overlayMode ? 'overlay' : 'panel'}
      />
    </div>
  );
}
