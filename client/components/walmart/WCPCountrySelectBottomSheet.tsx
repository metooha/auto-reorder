import React from 'react';
import { Button } from '@/components/ui/Button';
import styles from './WCPCountrySelectBottomSheet.module.css';

export interface WCPCountry {
  code: string;        // ISO 2-letter code, e.g. 'US'
  abbr: string;        // Display abbreviation, e.g. 'US'
  name: string;        // Display name, e.g. 'United States'
  dialCode: string;    // e.g. '+1'
  flagUrl: string;     // Image URL
}

export const WCP_DEFAULT_COUNTRIES: WCPCountry[] = [
  {
    code: 'CA-NQ',
    abbr: 'CA',
    name: 'Canada (Not Quebec)',
    dialCode: '+1',
    flagUrl: 'https://flagcdn.com/w40/ca.png',
  },
  {
    code: 'CA-QC',
    abbr: 'CA',
    name: 'Canada (Quebec)',
    dialCode: '+1',
    flagUrl: 'https://flagcdn.com/w40/ca.png',
  },
  {
    code: 'CL',
    abbr: 'CL',
    name: 'Chile',
    dialCode: '+56',
    flagUrl: 'https://flagcdn.com/w40/cl.png',
  },
  {
    code: 'CO',
    abbr: 'CO',
    name: 'Colombia',
    dialCode: '+57',
    flagUrl: 'https://flagcdn.com/w40/co.png',
  },
  {
    code: 'MX',
    abbr: 'MX',
    name: 'Mexico',
    dialCode: '+52',
    flagUrl: 'https://flagcdn.com/w40/mx.png',
  },
  {
    code: 'US',
    abbr: 'US',
    name: 'United States',
    dialCode: '+1',
    flagUrl: 'https://flagcdn.com/w40/us.png',
  },
];

export interface WCPCountrySelectBottomSheetProps {
  /** List of countries to display */
  countries?: WCPCountry[];
  /** Currently selected country code */
  value?: string;
  /** Called when a country is selected */
  onSelect?: (country: WCPCountry) => void;
  /** Whether to show country dial codes (+1, +56…) */
  showDialCode?: boolean;
  /** Whether to use card-slot style rows (with elevation shadow) vs flat rows */
  variant?: 'flat' | 'slot';
  /** Title in the sheet header */
  title?: string;
  /** Label for the confirm action button */
  actionLabel?: string;
  /** Called when the confirm button is clicked */
  onConfirm?: (selected: WCPCountry | undefined) => void;
  /** Called when the sheet is dismissed (X or backdrop) */
  onClose?: () => void;
  /** Whether the sheet is open */
  open: boolean;
}

export function WCPCountrySelectBottomSheet({
  countries = WCP_DEFAULT_COUNTRIES,
  value,
  onSelect,
  showDialCode = false,
  variant = 'flat',
  title = 'Select country/region',
  actionLabel = 'Confirm',
  onConfirm,
  onClose,
  open,
}: WCPCountrySelectBottomSheetProps) {
  const [selected, setSelected] = React.useState<string | undefined>(value ?? 'US');

  React.useEffect(() => {
    if (value !== undefined) setSelected(value);
  }, [value]);

  const handleSelect = (country: WCPCountry) => {
    setSelected(country.code);
    onSelect?.(country);
  };

  const handleConfirm = () => {
    const selectedCountry = countries.find(c => c.code === selected);
    onConfirm?.(selectedCountry);
    onClose?.();
  };

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose} aria-modal="true" role="dialog" aria-label={title}>
      <div className={styles.sheet} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerInner}>
            <h2 className={styles.title}>{title}</h2>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.7803 13.0787L18 19.2983L19.0607 18.2377L12.841 12.018L19.0607 5.79833L18 4.73767L11.7803 10.9573L5.56066 4.73767L4.5 5.79833L10.7197 12.018L4.5 18.2377L5.56066 19.2983L11.7803 13.0787Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Country List */}
        <div className={styles.content}>
          <ul
            className={variant === 'slot' ? styles.listSlot : styles.listFlat}
            role="radiogroup"
            aria-label={title}
          >
            {countries.map(country => {
              const isSelected = selected === country.code;
              return (
                <li key={country.code}>
                  <button
                    className={[
                      styles.countryRow,
                      variant === 'slot' ? styles.countryRowSlot : styles.countryRowFlat,
                      isSelected ? styles.countryRowSelected : '',
                    ].filter(Boolean).join(' ')}
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
                    <span className={[styles.countryName, isSelected ? styles.countryNameSelected : ''].filter(Boolean).join(' ')}>
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
        </div>

        {/* Footer Action */}
        <div className={styles.footer}>
          <div className={styles.divider} />
          <div className={styles.footerInner}>
            <Button variant="primary" isFullWidth onClick={handleConfirm}>
              {actionLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
