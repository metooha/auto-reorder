import React, { useEffect } from 'react';
import styles from './BottomSheet.module.css';

export interface BottomSheetProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  actions?: React.ReactNode;
  showActions?: boolean;
  adjustHeight?: 'content' | 'fixed';
  className?: string;
  UNSAFE_className?: string;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  children,
  isOpen,
  onClose,
  title,
  actions,
  showActions = true,
  adjustHeight = 'content',
  className,
  UNSAFE_className,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const classNames = [styles.bottomSheet, UNSAFE_className, className].filter(Boolean).join(' ');

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50 }}>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={onClose} />
      <div
        className={classNames}
        role="dialog"
        aria-modal="true"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'var(--ld-semantic-color-fill-surface-primary, #fff)',
          borderRadius: '16px 16px 0 0',
          maxHeight: adjustHeight === 'fixed' ? '80vh' : undefined,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 -4px 24px rgba(0,0,0,0.15)',
        }}
      >
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
          <div style={{ width: 48, height: 4, background: 'var(--ld-semantic-color-fill-subtle, #e0e0e0)', borderRadius: 2 }} />
        </div>

        {/* Header */}
        {title && (
          <div style={{ padding: '8px 24px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-primary, #2E2F32)', margin: 0 }}>{title}</h2>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: 'var(--ld-semantic-color-text-secondary, #515357)' }} aria-label="Close">&times;</button>
          </div>
        )}

        {/* Content */}
        <div style={{ padding: '0 24px', flex: 1, overflow: adjustHeight === 'fixed' ? 'auto' : undefined }}>
          {children}
        </div>

        {/* Actions */}
        {showActions && actions && (
          <div style={{ padding: '16px 24px 24px', display: 'flex', justifyContent: 'flex-end' }}>
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default BottomSheet;
