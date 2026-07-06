import React, { useState } from 'react';
import styles from './DateRangePicker.module.css';

export interface DateRange {
  from?: Date;
  to?: Date;
}

export interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  onApply?: (range: DateRange) => void;
  onCancel?: () => void;
  label?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  showWeekNumbers?: boolean;
  weekStartsOn?: number;
  className?: string;
  UNSAFE_className?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  onChange,
  label,
  disabled = false,
  placeholder = 'Select date range',
  className,
  UNSAFE_className,
}) => {
  const [open, setOpen] = useState(false);

  const formatDate = (date?: Date) => {
    if (!date) return '';
    return date.toLocaleDateString();
  };

  const displayValue = value?.from
    ? `${formatDate(value.from)}${value.to ? ` – ${formatDate(value.to)}` : ''}`
    : placeholder;

  const classNames = [styles.dateRangePicker, UNSAFE_className, className].filter(Boolean).join(' ');

  return (
    <div className={classNames} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {label && (
        <label style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--ld-semantic-font-family-sans)' }}>
          {label}
        </label>
      )}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        style={{
          padding: '8px 12px',
          border: '1px solid var(--ld-semantic-color-field-border, #BABBBE)',
          borderRadius: 4,
          background: 'var(--ld-semantic-color-field-fill, #fff)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          textAlign: 'left',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          fontSize: 14,
          color: value?.from ? 'var(--ld-semantic-color-text-primary, #2E2F32)' : 'var(--ld-semantic-color-text-secondary, #74767c)',
        }}
      >
        {displayValue}
      </button>
    </div>
  );
};

export default DateRangePicker;
