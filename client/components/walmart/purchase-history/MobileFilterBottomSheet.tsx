import { useEffect, useRef } from 'react';
import { X } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { Link } from '@/components/ui/Link';
import styles from './MobileFilterBottomSheet.module.css';

interface MobileFilterBottomSheetProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onClear: () => void;
  onApply: () => void;
  children: React.ReactNode;
}

export function MobileFilterBottomSheet({
  open,
  title,
  onClose,
  onClear,
  onApply,
  children,
}: MobileFilterBottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose} aria-modal="true" role="dialog">
      <div
        ref={sheetRef}
        className={styles.sheet}
        onClick={e => e.stopPropagation()}
        aria-label={title}
      >
        {/* Drag handle */}
        <div className={styles.handle} aria-hidden="true" />

        {/* Header */}
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
          <button
            type="button"
            className={styles.closeBtn}
            aria-label="Close"
            onClick={onClose}
          >
            <X width={20} height={20} />
          </button>
        </div>

        {/* Options content */}
        <div className={styles.body}>
          {children}
        </div>

        {/* Footer actions */}
        <div className={styles.footer}>
          <Button variant="primary" size="medium" isFullWidth onClick={onApply}>
            View results
          </Button>
          <Link
            href="#"
            variant="subtle"
            onClick={e => { e.preventDefault(); onClear(); }}
          >
            Clear
          </Link>
        </div>
      </div>
    </div>
  );
}
