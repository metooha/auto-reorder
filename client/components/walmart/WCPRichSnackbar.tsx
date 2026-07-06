import React, { useEffect, useRef } from 'react';
import { IconButton } from '@/components/ui/IconButton';
import { X } from '@/components/icons/X';
import styles from './WCPRichSnackbar.module.css';

export type WCPRichSnackbarColor = 'primary' | 'secondary' | 'inverse' | 'brand';
export type WCPRichSnackbarContentVariant =
  | 'left-regular'
  | 'left-bold'
  | 'center-regular'
  | 'center-bold';

export interface WCPRichSnackbarProps {
  id?: string;
  open?: boolean;
  color?: WCPRichSnackbarColor;
  contentVariant?: WCPRichSnackbarContentVariant;
  leadingSlot?: React.ReactNode;
  message: string | React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  onClose?: () => void;
  duration?: number;
  position?: 'bottom-left' | 'bottom-center' | 'bottom-right';
  /** Render inline (non-fixed) for use inside docs/demo cards */
  inline?: boolean;
}

const POSITION_CLASS: Record<string, string> = {
  'bottom-left': styles.bottomLeft,
  'bottom-center': styles.bottomCenter,
  'bottom-right': styles.bottomRight,
};

export const WCPRichSnackbar: React.FC<WCPRichSnackbarProps> = ({
  id,
  open = true,
  color = 'primary',
  contentVariant = 'left-regular',
  leadingSlot,
  message,
  actionLabel,
  onAction,
  onClose,
  duration = 4000,
  position = 'bottom-center',
  inline: isInline = false,
}) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (open && duration !== Infinity && onClose) {
      timerRef.current = setTimeout(() => {
        onClose();
      }, duration);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [open, duration, onClose]);

  if (!open && !isInline) return null;

  const isDark = color === 'inverse' || color === 'brand';
  const isBold = contentVariant === 'left-bold' || contentVariant === 'center-bold';
  const isCenter = contentVariant === 'center-regular' || contentVariant === 'center-bold';

  const handleActionClick = () => {
    onAction?.();
    onClose?.();
  };

  const snackbarClass = [
    styles.snackbar,
    styles[color],
    isInline ? styles.inlineMode : (POSITION_CLASS[position] ?? styles.bottomCenter),
    open || isInline ? styles.open : '',
  ]
    .filter(Boolean)
    .join(' ');

  const copyClass = [styles.copy, isCenter ? styles.copyCenter : '']
    .filter(Boolean)
    .join(' ');

  const messageClass = [styles.message, isBold ? styles.messageBold : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div
      id={id}
      className={snackbarClass}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Leading + Message */}
      <div className={copyClass}>
        {leadingSlot && <div className={styles.leading}>{leadingSlot}</div>}
        <div className={messageClass}>{message}</div>
      </div>

      {/* Trailing: action + close */}
      {(actionLabel || onClose) && (
        <div className={styles.trailing}>
          <div className={styles.trailingActions}>
            {actionLabel && (
              <div className={styles.actionWrapper}>
                <button
                  type="button"
                  className={styles.actionBtn}
                  onClick={handleActionClick}
                >
                  {actionLabel}
                </button>
              </div>
            )}
            {onClose && (
              <div className={styles.closeWrapper}>
                <IconButton
                  aria-label="Close notification"
                  variant={isDark ? 'white' : 'ghost'}
                  size="small"
                  shape="rounded"
                  onClick={onClose}
                >
                  <X width={16} height={16} />
                </IconButton>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WCPRichSnackbar;
