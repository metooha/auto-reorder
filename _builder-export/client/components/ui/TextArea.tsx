import React from 'react';
import styles from './TextArea.module.css';

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'className' | 'style'> {
  label?: string;
  error?: boolean | string;
  errorMessage?: string;
  helperText?: string;
  size?: 'small' | 'large';
  isMagic?: boolean;
  textAreaProps?: Record<string, any>;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
  className?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, errorMessage, helperText, size = 'large', UNSAFE_className, UNSAFE_style, className, ...props }, ref) => {
    const classNames = [styles.textarea, error && styles.error, UNSAFE_className, className].filter(Boolean).join(' ');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {label && <label style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--ld-semantic-font-family-sans)' }}>{label}</label>}
        <textarea ref={ref} className={classNames} style={UNSAFE_style} {...props} />
        {error && errorMessage && <span style={{ fontSize: 12, color: 'var(--ld-semantic-color-text-negative, #ea1100)' }}>{errorMessage}</span>}
        {!error && helperText && <span style={{ fontSize: 12, color: 'var(--ld-semantic-color-text-secondary, #515357)' }}>{helperText}</span>}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
export default TextArea;
