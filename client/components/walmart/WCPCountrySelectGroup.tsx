import React from 'react';
import { WCPCountry, WCP_DEFAULT_COUNTRIES } from './WCPCountrySelectBottomSheet';
import styles from './WCPCountrySelectGroup.module.css';

export interface WCPCountrySelectGroupProps {
  /** Countries to display */
  countries?: WCPCountry[];
  /** Selected country code */
  value?: string;
  /** Called when a country is selected */
  onChange?: (country: WCPCountry) => void;
  /** Description text above the list */
  description?: string;
  /** Optional footer/disclaimer text */
  footerText?: string;
  /** Whether to show dial codes */
  showDialCode?: boolean;
}

export function WCPCountrySelectGroup({
  countries = WCP_DEFAULT_COUNTRIES,
  value,
  onChange,
  description = 'Select the country you want to ship to.',
  footerText,
  showDialCode = false,
}: WCPCountrySelectGroupProps) {
  const [selected, setSelected] = React.useState<string>(value ?? 'US');

  React.useEffect(() => {
    if (value !== undefined) setSelected(value);
  }, [value]);

  const handleSelect = (country: WCPCountry) => {
    setSelected(country.code);
    onChange?.(country);
  };

  return (
    <div className={styles.root}>
      {description && (
        <p className={styles.description}>{description}</p>
      )}

      <ul className={styles.list} role="radiogroup" aria-label={description}>
        {countries.map(country => {
          const isSelected = selected === country.code;
          return (
            <li key={country.code}>
              <button
                className={[styles.row, isSelected ? styles.rowSelected : ''].filter(Boolean).join(' ')}
                role="radio"
                aria-checked={isSelected}
                onClick={() => handleSelect(country)}
              >
                {/* Radio */}
                <span className={styles.radio} aria-hidden="true">
                  {isSelected ? (
                    <span className={styles.radioSelected}>
                      <span className={styles.radioDot} />
                    </span>
                  ) : (
                    <span className={styles.radioEmpty} />
                  )}
                </span>

                {/* Flag */}
                <img
                  src={country.flagUrl}
                  alt={country.name}
                  className={styles.flag}
                  width={24}
                  height={16}
                />

                {/* Name */}
                <span className={[styles.name, isSelected ? styles.nameSelected : ''].filter(Boolean).join(' ')}>
                  {country.name}
                </span>

                {/* Dial code */}
                {showDialCode && (
                  <span className={styles.dialCode}>{country.dialCode}</span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {footerText && (
        <p className={styles.footer}>{footerText}</p>
      )}
    </div>
  );
}
