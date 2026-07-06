import React, { useState, useCallback, useRef, useEffect } from 'react';
import { RotateCcw } from '@/components/icons/RotateCcw';
import { ChevronDown } from '@/components/icons/ChevronDown';
import {
  PRIMITIVE_COLOR_FAMILIES,
  ALL_PRIMITIVE_COLOR_TOKENS,
  parsePrimitiveVar,
  toPrimitiveVar,
  type PrimitiveColorToken,
} from './primitiveColorTokens';
import styles from './TokenColorRow.module.css';

interface TokenColorRowProps {
  /** CSS custom property name, e.g. "--ld-semantic-color-action-fill-primary" */
  token: string;
  /** Human-readable label shown to users */
  label: string;
  /** Whether this token has been overridden */
  isOverridden: boolean;
  /**
   * Current override value string (e.g. "var(--ld-primitive-color-blue-100)").
   * undefined = no override.
   */
  overrideValue?: string;
  /** Called when user picks a primitive token */
  onSet: (token: string, value: string) => void;
  /** Called when user resets to theme default */
  onReset: (token: string) => void;
  /** Read the current live computed value for this token (returns hex string) */
  getCurrentValue: (token: string) => string;
}

/**
 * A single editable token row.
 * Overrides must be chosen from the primitive color palette — no arbitrary hex.
 * The UI shows:
 *   [live color swatch] [label + token name] [selected primitive or "Theme default"] [reset button]
 * Clicking the picker area opens a popover showing all primitive color families.
 */
export function TokenColorRow({
  token,
  label,
  isOverridden,
  overrideValue,
  onSet,
  onReset,
  getCurrentValue,
}: TokenColorRowProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Resolve which primitive token is currently selected (if any)
  const selectedPrimitiveName = overrideValue ? parsePrimitiveVar(overrideValue) : null;
  const selectedPrimitive = selectedPrimitiveName
    ? ALL_PRIMITIVE_COLOR_TOKENS.find(t => t.name === selectedPrimitiveName)
    : null;

  // Live computed color of this semantic token
  const liveHex = resolveToHex(getCurrentValue(token));

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    function onMouseDown(e: MouseEvent) {
      if (
        popoverRef.current && !popoverRef.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setSearch('');
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') { setOpen(false); setSearch(''); triggerRef.current?.focus(); }
    }
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const handleSelect = useCallback((primitiveToken: PrimitiveColorToken) => {
    onSet(token, toPrimitiveVar(primitiveToken.name));
    setOpen(false);
    setSearch('');
  }, [token, onSet]);

  const handleReset = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onReset(token);
  }, [token, onReset]);

  // Filter families/tokens by search
  const lowerSearch = search.toLowerCase();
  const filteredFamilies = search
    ? PRIMITIVE_COLOR_FAMILIES.map(family => ({
        ...family,
        tokens: family.tokens.filter(t =>
          t.shortName.includes(lowerSearch) ||
          t.family.includes(lowerSearch) ||
          t.hex.includes(lowerSearch)
        ),
      })).filter(f => f.tokens.length > 0)
    : PRIMITIVE_COLOR_FAMILIES;

  return (
    <div className={`${styles.row} ${isOverridden ? styles.overridden : ''}`}>
      {/* Live color swatch — read-only, reflects current cascade value */}
      <div
        className={styles.swatch}
        style={{ backgroundColor: liveHex || 'transparent' }}
        aria-hidden="true"
      />

      {/* Label + token name */}
      <div className={styles.labelGroup}>
        <span className={styles.label}>{label}</span>
        <span className={styles.tokenName}>{token}</span>
      </div>

      {/* Primitive token picker trigger */}
      <div className={styles.pickerWrap}>
        <button
          ref={triggerRef}
          type="button"
          className={`${styles.pickerTrigger} ${open ? styles.pickerTriggerOpen : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={`Choose primitive token for ${label}`}
        >
          {selectedPrimitive ? (
            <>
              <span
                className={styles.pickerSwatch}
                style={{ backgroundColor: selectedPrimitive.hex }}
                aria-hidden="true"
              />
              <span className={styles.pickerLabel}>{selectedPrimitive.shortName}</span>
            </>
          ) : (
            <span className={styles.pickerPlaceholder}>Theme default</span>
          )}
          <ChevronDown width={12} height={12} className={styles.pickerChevron} />
        </button>

        {/* Popover */}
        {open && (
          <div ref={popoverRef} className={styles.popover} role="listbox" aria-label={`Primitive color picker for ${label}`}>
            {/* Search */}
            <div className={styles.popoverSearch}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search (e.g. blue-100, #fff200)"
                value={search}
                onChange={e => setSearch(e.target.value)}
                autoFocus
                aria-label="Search primitive tokens"
              />
            </div>

            {/* Color families */}
            <div className={styles.familyList}>
              {filteredFamilies.map(family => (
                <div key={family.family} className={styles.familyGroup}>
                  <span className={styles.familyLabel}>{family.label}</span>
                  <div className={styles.chipRow}>
                    {family.tokens.map(pToken => {
                      const isSelected = pToken.name === selectedPrimitiveName;
                      return (
                        <button
                          key={pToken.name}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          title={`${pToken.shortName} — ${pToken.hex}`}
                          className={`${styles.chip} ${isSelected ? styles.chipSelected : ''}`}
                          style={{ backgroundColor: pToken.hex }}
                          onClick={() => handleSelect(pToken)}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}

              {filteredFamilies.length === 0 && (
                <p className={styles.noResults}>No tokens match "{search}"</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Reset button */}
      <button
        type="button"
        className={`${styles.resetBtn} ${isOverridden ? styles.resetBtnVisible : ''}`}
        onClick={handleReset}
        aria-label={`Reset ${label} to theme default`}
        title="Reset to theme default"
        tabIndex={isOverridden ? 0 : -1}
      >
        <RotateCcw width={14} height={14} />
      </button>
    </div>
  );
}

/**
 * Convert a computed CSS color value to a hex string for the live swatch.
 * Handles rgb(), rgba(), and hex strings. Returns empty string on failure.
 */
function resolveToHex(value: string): string {
  if (!value) return '';
  const trimmed = value.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(trimmed)) return trimmed;
  if (/^#[0-9a-fA-F]{3}$/.test(trimmed)) {
    const [, r, g, b] = trimmed.match(/^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/)!;
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  const m = trimmed.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (m) {
    return `#${(+m[1]).toString(16).padStart(2, '0')}${(+m[2]).toString(16).padStart(2, '0')}${(+m[3]).toString(16).padStart(2, '0')}`;
  }
  return '';
}
