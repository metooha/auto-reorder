import * as React from 'react';
import styles from './WCPSearchBar.module.css';

export interface WCPSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  onCancel?: () => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function WCPSearchBar({
  value,
  onChange,
  onClear,
  onCancel,
  placeholder = 'Enter search term(s)',
  disabled = false,
  className,
}: WCPSearchBarProps) {
  const [isFocused, setIsFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const isActivated = isFocused;
  const hasValue = value.length > 0;

  const handleClear = () => {
    onChange('');
    onClear?.();
    inputRef.current?.focus();
  };

  const handleCancel = () => {
    onChange('');
    onCancel?.();
    setIsFocused(false);
    inputRef.current?.blur();
  };

  const handlePillClick = () => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  };

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <div
        className={[
          styles.pill,
          isActivated ? styles.pillActivated : '',
          disabled ? styles.pillDisabled : '',
        ].filter(Boolean).join(' ')}
        onClick={handlePillClick}
      >
        {/* Search icon */}
        <div className={styles.iconWrapper} aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.searchIcon}>
            <path d="M15.2465 16.3073C13.9536 17.3652 12.3009 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5C18 12.301 17.3652 13.9537 16.3072 15.2466L21.5303 20.4697L20.4696 21.5304L15.2465 16.3073ZM16.5 10.5C16.5 7.18629 13.8137 4.5 10.5 4.5C7.18629 4.5 4.5 7.18629 4.5 10.5C4.5 13.8137 7.18629 16.5 10.5 16.5C13.8137 16.5 16.5 13.8137 16.5 10.5Z" fill="currentColor" />
          </svg>
        </div>

        {/* Input area */}
        <div className={styles.inputArea}>
          <input
            ref={inputRef}
            type="search"
            className={styles.input}
            value={value}
            onChange={e => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={isActivated ? placeholder : ''}
            disabled={disabled}
            aria-label={placeholder}
            autoComplete="off"
          />
          {!isActivated && !hasValue && (
            <span className={styles.placeholder} aria-hidden="true">
              {placeholder}
            </span>
          )}
        </div>

        {/* Clear (X) button — only when activated + has value */}
        {isActivated && hasValue && (
          <button
            type="button"
            className={styles.clearBtn}
            onClick={e => { e.stopPropagation(); handleClear(); }}
            aria-label="Clear search"
            tabIndex={0}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M11.7803 13.0788L18 19.2985L19.0607 18.2378L12.841 12.0181L19.0607 5.79845L18 4.73779L11.7803 10.9575L5.56066 4.73779L4.5 5.79845L10.7197 12.0181L4.5 18.2378L5.56066 19.2985L11.7803 13.0788Z" fill="currentColor" />
            </svg>
          </button>
        )}
      </div>

      {/* Cancel link — only when activated and not disabled */}
      {isActivated && !disabled && (
        <button
          type="button"
          className={styles.cancelBtn}
          onMouseDown={e => {
            // Prevent blur from firing before click
            e.preventDefault();
            handleCancel();
          }}
        >
          Cancel
        </button>
      )}
    </div>
  );
}
