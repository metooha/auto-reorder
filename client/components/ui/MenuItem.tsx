import React from 'react';
import styles from './MenuItem.module.css';

export interface MenuItemProps extends Omit<React.ComponentPropsWithoutRef<'button'>, 'className' | 'style'> {
  children: React.ReactNode;
  disabled?: boolean;
  leadingIcon?: React.ReactNode;
  selected?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const MenuItem = React.forwardRef<HTMLButtonElement, MenuItemProps>(
  ({ children, disabled = false, leadingIcon, selected = false, onClick, ...props }, ref) => {
    const className = [
      styles.menuItem,
      selected && styles['menuItem--selected'],
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type="button"
        role="menuitem"
        disabled={disabled}
        aria-disabled={disabled}
        className={className}
        onClick={onClick}
        {...props}
      >
        {leadingIcon && (
          <span className={styles.menuItem__leadingIcon}>
            {leadingIcon}
          </span>
        )}
        <span className={styles.menuItem__content}>
          {children}
        </span>
      </button>
    );
  }
);

MenuItem.displayName = 'MenuItem';
