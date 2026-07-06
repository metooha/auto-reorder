import type React from 'react';
import styles from './SubNavButton.module.css';

interface SubNavButtonProps {
  label: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  leadingIcon?: React.ReactNode;
  disabled?: boolean;
}

export function SubNavButton({ label, href, onClick, leadingIcon, disabled }: SubNavButtonProps) {
  const className = styles.subNavButton;

  if (href && !disabled) {
    return (
      <a href={href} onClick={onClick} className={className}>
        {leadingIcon && <span className={styles.leadingIcon}>{leadingIcon}</span>}
        {label}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {leadingIcon && <span className={styles.leadingIcon}>{leadingIcon}</span>}
      {label}
    </button>
  );
}
