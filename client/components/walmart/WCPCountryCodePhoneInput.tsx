import React from 'react';
import { WCPCountry, WCP_DEFAULT_COUNTRIES, WCPCountrySelectBottomSheet } from './WCPCountrySelectBottomSheet';
import styles from './WCPCountryCodePhoneInput.module.css';

export interface WCPCountryCodePhoneInputProps {
  /** Field label */
  label?: string;
  /** Phone number value */
  value?: string;
  /** onChange handler for phone number */
  onChange?: (value: string) => void;
  /** Currently selected country */
  selectedCountry?: WCPCountry;
  /** Called when country changes */
  onCountryChange?: (country: WCPCountry) => void;
  /** Available countries in the picker */
  countries?: WCPCountry[];
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Whether the field is read-only */
  readOnly?: boolean;
  /** Whether to show an error state */
  error?: boolean;
  /** Helper text below the field */
  helperText?: string;
  /** Error message text */
  errorText?: string;
  /** Placeholder for the phone number input */
  placeholder?: string;
  /** HTML id for the input */
  id?: string;
}

export function WCPCountryCodePhoneInput({
  label = 'Phone number*',
  value = '',
  onChange,
  selectedCountry: controlledCountry,
  onCountryChange,
  countries = WCP_DEFAULT_COUNTRIES,
  disabled = false,
  readOnly = false,
  error = false,
  helperText = "We'll contact you in case anything comes up with your order.",
  errorText = 'Please enter a valid number',
  placeholder = '(000) 000-0000',
  id,
}: WCPCountryCodePhoneInputProps) {
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [internalCountry, setInternalCountry] = React.useState<WCPCountry>(
    countries.find(c => c.code === 'US') ?? countries[0]
  );

  const selectedCountry = controlledCountry ?? internalCountry;

  const handleCountryConfirm = (country: WCPCountry | undefined) => {
    if (!country) return;
    setInternalCountry(country);
    onCountryChange?.(country);
  };

  const inputId = id ?? `wcp-phone-${React.useId()}`;

  const containerClass = [
    styles.container,
    error ? styles.containerError : '',
    disabled ? styles.containerDisabled : '',
    readOnly ? styles.containerReadOnly : '',
  ].filter(Boolean).join(' ');

  const labelClass = [
    styles.label,
    disabled ? styles.labelDisabled : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.root}>
      {/* Label */}
      <label htmlFor={inputId} className={labelClass}>{label}</label>

      {/* Input container */}
      <div className={containerClass}>
        {/* Country code trigger */}
        <button
          type="button"
          className={styles.countryTrigger}
          onClick={() => !disabled && !readOnly && setSheetOpen(true)}
          disabled={disabled}
          aria-label={`Select country code. Currently: ${selectedCountry.name} ${selectedCountry.dialCode}`}
          tabIndex={readOnly ? -1 : undefined}
        >
          <img
            src={selectedCountry.flagUrl}
            alt={selectedCountry.name}
            className={styles.triggerFlag}
            width={24}
            height={16}
          />
          <span className={styles.triggerAbbr}>{selectedCountry.abbr}</span>
          <span className={styles.triggerDialCode}>{selectedCountry.dialCode}</span>
          {/* Caret */}
          <svg className={styles.caret} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M7.62372 10.329C7.71866 10.4375 7.85583 10.4998 8.00001 10.4998C8.14419 10.4998 8.28135 10.4375 8.3763 10.329L11.8763 6.32901C12.0055 6.18136 12.0364 5.9718 11.9553 5.79315C11.8743 5.61449 11.6962 5.49976 11.5 5.49976H4.50001C4.30382 5.49976 4.12576 5.61449 4.04469 5.79315C3.96362 5.9718 3.99453 6.18136 4.12372 6.32901L7.62372 10.329Z" fill="currentColor"/>
          </svg>
        </button>

        {/* Vertical divider */}
        <div className={styles.divider} aria-hidden="true" />

        {/* Phone number input */}
        <input
          id={inputId}
          type="tel"
          className={styles.phoneInput}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
        />
      </div>

      {/* Helper / Error text */}
      {error ? (
        <div className={styles.errorRow} id={`${inputId}-error`} role="alert">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={styles.errorIcon}>
            <path d="M8 14.9998C11.866 14.9998 15 11.8657 15 7.99976C15 4.13376 11.866 0.999756 8 0.999756C4.13401 0.999756 1 4.13376 1 7.99976C1 11.8657 4.13401 14.9998 8 14.9998ZM7.36905 9.19587L7.08333 4.11987H8.91667L8.64286 9.19587H7.36905ZM8 11.8719C7.71429 11.8719 7.47619 11.7919 7.28571 11.6319C7.09524 11.4639 7 11.2319 7 10.9359C7 10.6559 7.09524 10.4279 7.28571 10.2519C7.47619 10.0759 7.71429 9.98787 8 9.98787C8.27778 9.98787 8.5119 10.0759 8.70238 10.2519C8.90079 10.4279 9 10.6559 9 10.9359C9 11.2319 8.90079 11.4639 8.70238 11.6319C8.5119 11.7919 8.27778 11.8719 8 11.8719Z" fill="currentColor"/>
          </svg>
          <span className={styles.errorText}>{errorText}</span>
        </div>
      ) : helperText ? (
        <p className={[styles.helperText, disabled ? styles.helperTextDisabled : ''].filter(Boolean).join(' ')} id={`${inputId}-helper`}>
          {helperText}
        </p>
      ) : null}

      {/* Country picker bottom sheet */}
      <WCPCountrySelectBottomSheet
        open={sheetOpen}
        countries={countries}
        value={selectedCountry.code}
        showDialCode
        variant="flat"
        title="Select country/region"
        actionLabel="Confirm"
        onConfirm={handleCountryConfirm}
        onClose={() => setSheetOpen(false)}
      />
    </div>
  );
}
