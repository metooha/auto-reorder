import React, { useState } from 'react';
import styles from './Toggle.module.css';

export interface ToggleProps {
  children?: React.ReactNode;
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  children,
  pressed: controlledPressed,
  defaultPressed = false,
  onPressedChange,
  variant = 'default',
  size = 'default',
  disabled = false,
  className,
  'aria-label': ariaLabel,
}) => {
  const [internalPressed, setInternalPressed] = useState(defaultPressed);
  const pressed = controlledPressed ?? internalPressed;

  const handleClick = () => {
    if (disabled) return;
    const next = !pressed;
    setInternalPressed(next);
    onPressedChange?.(next);
  };

  const classNames = [styles.toggle, pressed && styles.pressed, className].filter(Boolean).join(' ');

  return (
    <button
      className={classNames}
      aria-pressed={pressed}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={handleClick}
      data-state={pressed ? 'on' : 'off'}
      style={{
        padding: size === 'sm' ? '6px 8px' : size === 'lg' ? '12px 16px' : '8px 12px',
        border: variant === 'outline' ? '1px solid var(--ld-semantic-color-border-subtle, #e6e6e8)' : 'none',
        borderRadius: 4,
        background: pressed ? 'var(--ld-semantic-color-fill-subtle, #f1f1f2)' : 'transparent',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        fontFamily: 'var(--ld-semantic-font-family-sans)',
        fontSize: 14,
      }}
    >
      {children}
    </button>
  );
};

// ToggleGroup for component library compatibility
export interface ToggleGroupProps {
  type?: 'single' | 'multiple';
  value?: string | string[];
  defaultValue?: string | string[];
  variant?: string;
  onValueChange?: (value: string | string[]) => void;
  children?: React.ReactNode;
  className?: string;
}

export const ToggleGroup: React.FC<ToggleGroupProps> = ({ children, className }) => (
  <div className={className} style={{ display: 'flex', gap: 4 }}>{children}</div>
);

export interface ToggleGroupItemProps {
  value: string;
  children?: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

export const ToggleGroupItem: React.FC<ToggleGroupItemProps> = ({ children, className, 'aria-label': ariaLabel }) => (
  <Toggle className={className} aria-label={ariaLabel}>{children}</Toggle>
);

export default Toggle;
