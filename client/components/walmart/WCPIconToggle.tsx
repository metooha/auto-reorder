import * as React from 'react';
import styles from './WCPIconSelector.module.css';

export type WCPIconToggleSize = 'small' | 'medium' | 'large';
export type WCPIconToggleShape = 'circle' | 'rounded';
export type WCPIconToggleColor = 'default' | 'white';

export interface WCPIconToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'checked' | 'className' | 'style'> {
  /**
   * Icon to show in the OFF (unchecked) state.
   * Should be an outline / stroke-style icon.
   */
  uncheckedIcon: React.ReactNode;
  /**
   * Icon to show in the ON (checked) state.
   * Should be a filled variant of the same icon.
   */
  checkedIcon: React.ReactNode;
  /** Controlled checked state */
  checked?: boolean;
  /** Uncontrolled initial checked state. @default false */
  defaultChecked?: boolean;
  /** Fired when the toggle state changes */
  onChange?: (checked: boolean) => void;
  /**
   * Button size.
   * small  → 24 × 24 (mobile) / 32 × 32 (desktop)
   * medium → 32 × 32 (mobile) / 40 × 40 (desktop)
   * large  → 40 × 40 (mobile) / 48 × 48 (desktop)
   * @default 'medium'
   */
  size?: WCPIconToggleSize;
  /**
   * Container shape.
   * circle  → fully rounded (pill)
   * rounded → softly rounded square
   * @default 'rounded'
   */
  shape?: WCPIconToggleShape;
  /**
   * Color theme.
   * default → for use on light backgrounds (transparent bg, primary text)
   * white   → for use on dark/colored backgrounds (white icon)
   * @default 'default'
   */
  color?: WCPIconToggleColor;
  /** Disables the button */
  disabled?: boolean;
  /** Accessible label (required) */
  'aria-label': string;
  /** Additional class for the outer button */
  UNSAFE_className?: string;
}

/**
 * WCP Icon Toggle
 *
 * A toggleable icon button used across the Walmart.com consumer experience.
 * Shows an **outline** icon when unchecked and a **filled** icon when checked.
 *
 * Supports 3 sizes × 2 shapes × 2 color themes, all powered by LD semantic tokens.
 * Absorbs the former `WCPIconSelector` — import from here for new code.
 *
 * @example
 * ```tsx
 * <WCPIconToggle
 *   uncheckedIcon={<Heart />}
 *   checkedIcon={<HeartFill />}
 *   aria-label="Save to favorites"
 *   shape="circle"
 *   size="medium"
 * />
 * ```
 */
export const WCPIconToggle = React.forwardRef<HTMLButtonElement, WCPIconToggleProps>(
  (props, ref) => {
    const {
      uncheckedIcon,
      checkedIcon,
      checked: controlledChecked,
      defaultChecked = false,
      onChange,
      size = 'medium',
      shape = 'rounded',
      color = 'default',
      disabled = false,
      'aria-label': ariaLabel,
      UNSAFE_className,
      onClick,
      ...rest
    } = props;

    const isControlled = controlledChecked !== undefined;
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const checked = isControlled ? controlledChecked : internalChecked;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const next = !checked;
      if (!isControlled) setInternalChecked(next);
      onChange?.(next);
      onClick?.(e);
    };

    const className = [
      styles.selector,
      styles[`selector--${size}`],
      styles[`selector--${shape}`],
      styles[`selector--${color}`],
      checked && styles['selector--checked'],
      UNSAFE_className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={checked}
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={handleClick}
        className={className}
        {...rest}
      >
        <span className={styles.iconWrap} aria-hidden="true">
          {checked ? checkedIcon : uncheckedIcon}
        </span>
      </button>
    );
  },
);

WCPIconToggle.displayName = 'WCPIconToggle';

// ─── Backward-compatibility shim ─────────────────────────────────────────────
// WCPIconSelector is kept as a thin alias so existing imports continue to work.
// Migrate new code to WCPIconToggle.

export type WCPIconSelectorSize = WCPIconToggleSize;
export type WCPIconSelectorShape = WCPIconToggleShape;
export type WCPIconSelectorColor = WCPIconToggleColor;

export interface WCPIconSelectorProps
  extends Omit<WCPIconToggleProps, 'uncheckedIcon' | 'checkedIcon'> {
  /** @deprecated Use `uncheckedIcon` */
  outlineIcon: React.ReactNode;
  /** @deprecated Use `checkedIcon` */
  filledIcon: React.ReactNode;
}

/**
 * @deprecated Use `WCPIconToggle` instead. This alias will be removed in a future release.
 */
export const WCPIconSelector = React.forwardRef<HTMLButtonElement, WCPIconSelectorProps>(
  ({ outlineIcon, filledIcon, ...rest }, ref) => (
    <WCPIconToggle
      ref={ref}
      uncheckedIcon={outlineIcon}
      checkedIcon={filledIcon}
      {...rest}
    />
  ),
);

WCPIconSelector.displayName = 'WCPIconSelector';
