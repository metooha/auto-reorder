import React from 'react';
import { WCPCountry, WCP_DEFAULT_COUNTRIES } from './WCPCountrySelectBottomSheet';
import styles from './WCPCountrySelectDropdown.module.css';

export interface WCPCountrySelectDropdownProps {
  /** Countries to display */
  countries?: WCPCountry[];
  /** Selection mode: single radio or multi checkbox */
  mode?: 'single' | 'multi';
  /** Selected country code(s) — string for single, string[] for multi */
  value?: string | string[];
  /** Called when selection changes */
  onChange?: (value: string | string[], countries: WCPCountry | WCPCountry[]) => void;
  /** Placeholder shown when nothing selected */
  placeholder?: string;
  /** Whether to show dial codes in the list */
  showDialCode?: boolean;
  /** Label for the confirm button (multi mode) */
  confirmLabel?: string;
  /** Optional label above the trigger */
  label?: string;
  /** Whether the dropdown is disabled */
  disabled?: boolean;
  /** Width of the dropdown trigger */
  triggerWidth?: string | number;
}

export function WCPCountrySelectDropdown({
  countries = WCP_DEFAULT_COUNTRIES,
  mode = 'single',
  value,
  onChange,
  placeholder = 'Select country',
  showDialCode = false,
  confirmLabel = 'Apply',
  label,
  disabled = false,
  triggerWidth = 280,
}: WCPCountrySelectDropdownProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');

  // Internal selection state
  const [singleSelected, setSingleSelected] = React.useState<string>(
    mode === 'single' && typeof value === 'string' ? value : '',
  );
  const [multiSelected, setMultiSelected] = React.useState<string[]>(
    mode === 'multi' && Array.isArray(value) ? value : [],
  );
  // Pending multi selection (applied on confirm)
  const [pendingMulti, setPendingMulti] = React.useState<string[]>(
    mode === 'multi' && Array.isArray(value) ? value : [],
  );

  React.useEffect(() => {
    if (mode === 'single' && typeof value === 'string') setSingleSelected(value);
  }, [value, mode]);

  React.useEffect(() => {
    if (mode === 'multi' && Array.isArray(value)) {
      setMultiSelected(value);
      setPendingMulti(value);
    }
  }, [value, mode]);

  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const searchRef = React.useRef<HTMLInputElement>(null);

  // Close on outside click
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setSearch('');
        if (mode === 'multi') setPendingMulti(multiSelected);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, mode, multiSelected]);

  // Close on Escape
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setSearch('');
        if (mode === 'multi') setPendingMulti(multiSelected);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, mode, multiSelected]);

  // Focus search on open
  React.useEffect(() => {
    if (open) {
      setTimeout(() => searchRef.current?.focus(), 50);
    }
  }, [open]);

  const filtered = search.trim()
    ? countries.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    : countries;

  // ── Single select handler ──
  const handleSingleSelect = (country: WCPCountry) => {
    setSingleSelected(country.code);
    onChange?.(country.code, country);
    setOpen(false);
    setSearch('');
  };

  // ── Multi select handler (toggle pending) ──
  const handleMultiToggle = (country: WCPCountry) => {
    setPendingMulti(prev =>
      prev.includes(country.code)
        ? prev.filter(c => c !== country.code)
        : [...prev, country.code],
    );
  };

  // ── Multi confirm ──
  const handleMultiConfirm = () => {
    setMultiSelected(pendingMulti);
    const selected = countries.filter(c => pendingMulti.includes(c.code));
    onChange?.(pendingMulti, selected);
    setOpen(false);
    setSearch('');
  };

  // ── Trigger label ──
  const triggerLabel = React.useMemo(() => {
    if (mode === 'single') {
      const found = countries.find(c => c.code === singleSelected);
      return found ? { country: found, label: found.name } : null;
    }
    if (mode === 'multi') {
      if (multiSelected.length === 0) return null;
      if (multiSelected.length === 1) {
        const found = countries.find(c => c.code === multiSelected[0]);
        return found ? { country: found, label: found.name } : null;
      }
      return { country: null, label: `${multiSelected.length} countries selected` };
    }
    return null;
  }, [mode, singleSelected, multiSelected, countries]);

  return (
    <div className={styles.root} style={{ width: triggerWidth }}>
      {label && <label className={styles.label}>{label}</label>}

      {/* Trigger button */}
      <button
        ref={triggerRef}
        type="button"
        className={[styles.trigger, open ? styles.triggerOpen : '', disabled ? styles.triggerDisabled : ''].filter(Boolean).join(' ')}
        onClick={() => !disabled && setOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
        style={{ width: '100%' }}
      >
        <span className={styles.triggerContent}>
          {triggerLabel ? (
            <>
              {triggerLabel.country && (
                <img
                  src={triggerLabel.country.flagUrl}
                  alt={triggerLabel.country.name}
                  className={styles.triggerFlag}
                  width={20}
                  height={14}
                />
              )}
              {mode === 'multi' && multiSelected.length > 1 && (
                <span className={styles.multiCountBadge}>{multiSelected.length}</span>
              )}
              <span className={styles.triggerText}>{triggerLabel.label}</span>
            </>
          ) : (
            <span className={styles.triggerPlaceholder}>{placeholder}</span>
          )}
        </span>
        <span className={[styles.chevron, open ? styles.chevronOpen : ''].filter(Boolean).join(' ')} aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 5.5L8 10L12.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
          </svg>
        </span>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div ref={dropdownRef} className={styles.dropdown} role="dialog" aria-label={label || placeholder}>
          {/* Search */}
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon} aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
              </svg>
            </span>
            <input
              ref={searchRef}
              type="text"
              className={styles.searchInput}
              placeholder="Search countries…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search countries"
            />
            {search && (
              <button className={styles.searchClear} onClick={() => setSearch('')} aria-label="Clear search" type="button">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                </svg>
              </button>
            )}
          </div>

          {/* Country list */}
          <ul
            className={styles.list}
            role={mode === 'single' ? 'listbox' : 'group'}
            aria-label={label || placeholder}
          >
            {filtered.length === 0 && (
              <li className={styles.emptyState}>No countries found</li>
            )}
            {filtered.map(country => {
              const isSelected = mode === 'single'
                ? singleSelected === country.code
                : pendingMulti.includes(country.code);

              return (
                <li key={country.code} role={mode === 'single' ? 'option' : undefined} aria-selected={mode === 'single' ? isSelected : undefined}>
                  <button
                    type="button"
                    className={[styles.row, isSelected ? styles.rowSelected : ''].filter(Boolean).join(' ')}
                    onClick={() => mode === 'single' ? handleSingleSelect(country) : handleMultiToggle(country)}
                    role={mode === 'multi' ? 'checkbox' : undefined}
                    aria-checked={mode === 'multi' ? isSelected : undefined}
                  >
                    {/* Checkbox (multi) or Radio (single) */}
                    <span className={styles.selectionControl} aria-hidden="true">
                      {mode === 'single' ? (
                        <span className={[styles.radio, isSelected ? styles.radioSelected : styles.radioEmpty].filter(Boolean).join(' ')}>
                          {isSelected && <span className={styles.radioDot} />}
                        </span>
                      ) : (
                        <span className={[styles.checkbox, isSelected ? styles.checkboxChecked : ''].filter(Boolean).join(' ')}>
                          {isSelected && (
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
                            </svg>
                          )}
                        </span>
                      )}
                    </span>

                    {/* Flag */}
                    <img
                      src={country.flagUrl}
                      alt={country.name}
                      className={styles.flag}
                      width={20}
                      height={14}
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

          {/* Multi mode: confirm footer */}
          {mode === 'multi' && (
            <div className={styles.footer}>
              <button
                type="button"
                className={styles.confirmBtn}
                onClick={handleMultiConfirm}
              >
                {confirmLabel}
                {pendingMulti.length > 0 && (
                  <span className={styles.confirmCount}>{pendingMulti.length}</span>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
