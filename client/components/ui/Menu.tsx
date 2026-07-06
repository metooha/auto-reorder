import React, { useEffect, useRef, useCallback } from 'react';
import styles from './Menu.module.css';

export interface MenuProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose: (event?: KeyboardEvent | MouseEvent | PointerEvent | TouchEvent) => void;
  position?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
  footer?: React.ReactNode;
}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  ({ children, isOpen = false, onClose, position = 'bottomLeft', footer, ...props }, ref) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const combinedRef = (ref as React.RefObject<HTMLDivElement>) || menuRef;

    // Handle keyboard navigation
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (!isOpen) return;

        const menuItems = combinedRef.current?.querySelectorAll<HTMLButtonElement>(
          'button[role="menuitem"]:not(:disabled)'
        );

        if (!menuItems || menuItems.length === 0) return;

        const currentIndex = Array.from(menuItems).findIndex(
          (item) => item === document.activeElement
        );

        switch (event.key) {
          case 'Escape':
            event.preventDefault();
            onClose();
            break;

          case 'ArrowDown':
            event.preventDefault();
            if (currentIndex < menuItems.length - 1) {
              menuItems[currentIndex + 1].focus();
            } else {
              menuItems[0].focus();
            }
            break;

          case 'ArrowUp':
            event.preventDefault();
            if (currentIndex > 0) {
              menuItems[currentIndex - 1].focus();
            } else {
              menuItems[menuItems.length - 1].focus();
            }
            break;

          case 'Home':
            event.preventDefault();
            menuItems[0].focus();
            break;

          case 'End':
            event.preventDefault();
            menuItems[menuItems.length - 1].focus();
            break;
        }
      },
      [isOpen, onClose, combinedRef]
    );

    // Focus first item when menu opens
    useEffect(() => {
      if (isOpen && combinedRef.current) {
        const firstItem = combinedRef.current.querySelector<HTMLButtonElement>(
          'button[role="menuitem"]:not(:disabled)'
        );
        firstItem?.focus();
      }
    }, [isOpen, combinedRef]);

    if (!isOpen) return null;

    const className = [
      styles.menu,
      styles[`menu--position-${position}`],
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={combinedRef}
        role="menu"
        className={className}
        onKeyDown={handleKeyDown}
        {...props}
      >
        <div className={styles.menu__items}>
          {children}
        </div>
        {footer && (
          <div className={styles.menu__footer}>
            {footer}
          </div>
        )}
      </div>
    );
  }
);

Menu.displayName = 'Menu';
