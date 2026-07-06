import React, { useState } from 'react';
import styles from './MagicBox.module.css';

export interface MagicBoxProps {
  children?: React.ReactNode;
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  disabled?: boolean;
  loading?: boolean;
  active?: boolean;
  state?: string;
  className?: string;
  UNSAFE_className?: string;
}

export const MagicBox: React.FC<MagicBoxProps> = ({
  children,
  placeholder = 'Ask me anything...',
  value: controlledValue,
  onValueChange,
  onSubmit,
  disabled = false,
  loading = false,
  className,
  UNSAFE_className,
}) => {
  const [internalValue, setInternalValue] = useState('');
  const value = controlledValue ?? internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInternalValue(e.target.value);
    onValueChange?.(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled && !loading) {
        onSubmit?.(value);
      }
    }
  };

  const classNames = [styles.magicBox, UNSAFE_className, className].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      <textarea
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled || loading}
        rows={1}
        style={{
          width: '100%',
          padding: '12px 16px',
          border: '2px solid var(--ld-semantic-color-field-border-magic, #0053E2)',
          borderRadius: 8,
          resize: 'none',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          fontSize: 14,
          outline: 'none',
          background: 'var(--ld-semantic-color-fill-surface-primary, #fff)',
        }}
      />
      {children}
    </div>
  );
};

export default MagicBox;
