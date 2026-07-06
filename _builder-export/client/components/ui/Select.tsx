import React, { useState, useRef, useEffect, useCallback, createContext, useContext } from 'react';
import styles from './Select.module.css';

// ── Context ──
interface SelectContextValue {
  value: string;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  disabled?: boolean;
  size: 'small' | 'large';
}
const SelectContext = createContext<SelectContextValue | null>(null);
function useSelectContext() {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error('Select sub-components must be used within <Select>');
  return ctx;
}

// ── Select ──
export interface SelectProps {
  children: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  size?: 'small' | 'large';
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  required?: boolean;
  isMagic?: boolean;
  borderless?: boolean;
  className?: string;
  UNSAFE_className?: string;
}

export const Select: React.FC<SelectProps> = ({
  children,
  value: controlledValue,
  defaultValue = '',
  onValueChange,
  disabled = false,
  placeholder = 'Select an option',
  label,
  size = 'small',
  error = false,
  errorMessage,
  helperText,
  required = false,
  isMagic = false,
  borderless = false,
  className,
  UNSAFE_className,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const handleValueChange = useCallback((v: string) => {
    setInternalValue(v);
    onValueChange?.(v);
    setOpen(false);
  }, [onValueChange]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
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
  }, [open]);

  // Find selected label from children
  const selectedLabel = findSelectedLabel(children, value);

  const triggerClasses = [
    styles.trigger,
    styles[`trigger--size-${size}`],
    error && styles['trigger--error'],
    isMagic && styles['trigger--magic'],
    borderless && styles['trigger--borderless'],
    disabled && styles['trigger--disabled'],
  ].filter(Boolean).join(' ');

  const containerClasses = [styles.select, UNSAFE_className, className].filter(Boolean).join(' ');

  return (
    <SelectContext.Provider value={{ value, onValueChange: handleValueChange, open, setOpen, disabled, size }}>
      <div ref={containerRef} className={containerClasses}>
        {label && (
          <div className={styles.labelContainer}>
            <label className={`${styles.label} ${styles[`label--size-${size}`]} ${disabled ? styles['label--disabled'] : ''}`}>
              {label}
              {required && <span className={styles.required}>*</span>}
            </label>
          </div>
        )}

        <button
          type="button"
          className={triggerClasses}
          data-state={open ? 'open' : 'closed'}
          data-disabled={disabled || undefined}
          onClick={() => !disabled && setOpen(!open)}
          aria-expanded={open}
          aria-haspopup="listbox"
          disabled={disabled}
        >
          <span className={styles.valueContainer}>
            {selectedLabel ? (
              <span>{selectedLabel}</span>
            ) : (
              <span className={styles.placeholder}>{placeholder}</span>
            )}
          </span>
          <svg className={styles.chevron} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {open && (
          <div ref={contentRef} className={styles.content} role="listbox">
            <div className={styles.viewport}>
              {children}
            </div>
          </div>
        )}

        {error && errorMessage && (
          <div className={styles.errorContainer}>
            <svg className={styles.errorIcon} viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 4.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="8" cy="11" r="0.75" fill="currentColor" />
            </svg>
            <span className={styles.errorText}>{errorMessage}</span>
          </div>
        )}

        {!error && helperText && (
          <span className={styles.helperText}>{helperText}</span>
        )}
      </div>
    </SelectContext.Provider>
  );
};

// ── SelectItem ──
export interface SelectItemProps {
  children: React.ReactNode;
  value: string;
  disabled?: boolean;
}

export const SelectItem: React.FC<SelectItemProps> = ({ children, value: itemValue, disabled = false }) => {
  const { value, onValueChange } = useSelectContext();
  const isSelected = value === itemValue;

  return (
    <div
      className={styles.item}
      role="option"
      aria-selected={isSelected}
      data-state={isSelected ? 'checked' : 'unchecked'}
      data-disabled={disabled || undefined}
      onClick={() => !disabled && onValueChange(itemValue)}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!disabled) onValueChange(itemValue);
        }
      }}
    >
      {children}
      {isSelected && (
        <span className={styles.itemIndicator}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8.5l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </div>
  );
};

// ── SelectGroup ──
export interface SelectGroupProps {
  children: React.ReactNode;
}
export const SelectGroup: React.FC<SelectGroupProps> = ({ children }) => (
  <div role="group">{children}</div>
);

// ── SelectLabel ──
export interface SelectLabelProps {
  children: React.ReactNode;
}
export const SelectLabel: React.FC<SelectLabelProps> = ({ children }) => (
  <div className={styles.groupLabel}>{children}</div>
);

// ── SelectSeparator ──
export const SelectSeparator: React.FC = () => (
  <div className={styles.separator} role="separator" />
);

// Helper: recursively find selected label
function findSelectedLabel(children: React.ReactNode, value: string): React.ReactNode | null {
  let found: React.ReactNode | null = null;
  React.Children.forEach(children, (child) => {
    if (found) return;
    if (React.isValidElement(child)) {
      if ((child.type as any) === SelectItem && (child.props as any).value === value) {
        found = (child.props as any).children;
      } else if ((child.props as any)?.children) {
        found = findSelectedLabel((child.props as any).children, value);
      }
    }
  });
  return found;
}

// Backward-compatible aliases for shadcn-style imports
export const SelectTrigger: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className }) => <div className={className}>{children}</div>;
export const SelectContent: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className }) => <div className={className}>{children}</div>;
export const SelectValue: React.FC<{ placeholder?: string }> = ({ placeholder }) => <span>{placeholder}</span>;

export default Select;
