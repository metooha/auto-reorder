import React, { useState, useRef, useEffect, createContext, useContext, useCallback } from 'react';
import styles from './Menu.module.css';

// ── Context ──
interface MenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  position: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
}
const MenuContext = createContext<MenuContextValue | null>(null);
function useMenuContext() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error('Menu sub-components must be used within <Menu>');
  return ctx;
}

// ── Menu ──
export interface MenuProps {
  children: React.ReactNode;
  trigger?: React.ReactElement;
  open?: boolean;
  /** Alias for open */
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Alias: called when menu should close */
  onClose?: () => void;
  position?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
  footer?: React.ReactNode;
  className?: string;
  UNSAFE_className?: string;
}

export const Menu: React.FC<MenuProps> = ({
  children,
  trigger,
  open: controlledOpen,
  isOpen,
  onOpenChange,
  onClose,
  position = 'bottomLeft',
  footer,
  className,
  UNSAFE_className,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const resolvedControlled = controlledOpen !== undefined ? controlledOpen : isOpen;
  const open = resolvedControlled !== undefined ? resolvedControlled : internalOpen;
  const triggerRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const setOpen = useCallback((value: boolean) => {
    setInternalOpen(value);
    onOpenChange?.(value);
    if (!value) onClose?.();
  }, [onOpenChange, onClose]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', escHandler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', escHandler);
    };
  }, [open, setOpen]);

  if (!trigger) {
    // Render menu items directly when no trigger is provided (externally controlled)
    if (!open) return null;
    const menuClasses = [
      styles.menu,
      styles[`menu--position-${position}`],
      UNSAFE_className,
      className,
    ].filter(Boolean).join(' ');
    return (
      <div className={menuClasses} role="menu">
        <div className={styles.menu__items}>{children}</div>
        {footer && <div className={styles.menu__footer}>{footer}</div>}
      </div>
    );
  }

  const clonedTrigger = React.cloneElement(trigger, {
    ref: triggerRef,
    onClick: (e: React.MouseEvent) => {
      (trigger.props as any).onClick?.(e);
      setOpen(!open);
    },
    'aria-expanded': open,
    'aria-haspopup': 'menu',
  });

  const menuClasses = [
    styles.menu,
    styles[`menu--position-${position}`],
    UNSAFE_className,
    className,
  ].filter(Boolean).join(' ');

  return (
    <MenuContext.Provider value={{ open, setOpen, triggerRef, position }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {clonedTrigger}
        {open && (
          <div
            ref={menuRef}
            className={menuClasses}
            role="menu"
            style={{
              position: 'absolute',
              ...(position.includes('bottom') ? { top: '100%', marginTop: 4 } : { bottom: '100%', marginBottom: 4 }),
              ...(position.includes('Right') ? { right: 0 } : { left: 0 }),
            }}
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
        )}
      </div>
    </MenuContext.Provider>
  );
};

export default Menu;
