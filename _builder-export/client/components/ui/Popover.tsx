import * as React from 'react';
import { useState, useRef, useEffect, useCallback, createContext, useContext } from 'react';
import styles from './Popover.module.css';

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverContext() {
  const ctx = useContext(PopoverContext);
  if (!ctx) throw new Error('Popover components must be used within a <Popover>');
  return ctx;
}

export interface PopoverProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Popover: React.FC<PopoverProps> = ({ children, open: controlledOpen, onOpenChange }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = useCallback((value: boolean) => {
    setInternalOpen(value);
    onOpenChange?.(value);
  }, [onOpenChange]);

  const triggerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (
        contentRef.current && !contentRef.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, setOpen]);

  return (
    <PopoverContext.Provider value={{ open, setOpen, triggerRef, contentRef }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
};

export interface PopoverTriggerProps {
  children: React.ReactElement;
  asChild?: boolean;
}

export const PopoverTrigger: React.FC<PopoverTriggerProps> = ({ children }) => {
  const { open, setOpen, triggerRef } = usePopoverContext();
  return React.cloneElement(children, {
    ref: triggerRef,
    onClick: (e: React.MouseEvent) => {
      children.props.onClick?.(e);
      setOpen(!open);
    },
    'aria-expanded': open,
  });
};

export interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number;
  showArrow?: boolean;
}

export const PopoverContent: React.FC<PopoverContentProps> = ({
  children,
  className,
  align = 'center',
  side = 'bottom',
  sideOffset = 4,
}) => {
  const { open, contentRef } = usePopoverContext();

  if (!open) return null;

  const positionStyles: React.CSSProperties = {
    position: 'absolute',
    zIndex: 50,
  };

  if (side === 'bottom') {
    positionStyles.top = `calc(100% + ${sideOffset}px)`;
  } else if (side === 'top') {
    positionStyles.bottom = `calc(100% + ${sideOffset}px)`;
  }

  if (align === 'start') {
    positionStyles.left = 0;
  } else if (align === 'end') {
    positionStyles.right = 0;
  } else {
    positionStyles.left = '50%';
    positionStyles.transform = 'translateX(-50%)';
  }

  const classNames = [styles.popoverContent, className].filter(Boolean).join(' ');

  return (
    <div
      ref={contentRef}
      className={classNames}
      style={positionStyles}
      data-state="open"
      role="dialog"
    >
      {children}
    </div>
  );
};

export const PopoverArrow: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className} style={{ width: 10, height: 5 }} />
);

export default Popover;
