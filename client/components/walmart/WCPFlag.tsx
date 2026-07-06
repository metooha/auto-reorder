import React from 'react';
import styles from './WCPFlag.module.css';

// ─── Types ───────────────────────────────────────────────────────────────────

/**
 * WCP Flag visual variants (12 total).
 *
 * Token strategy:
 *   - All variants use --wcp-semantic-color-fill-* for background
 *   - All variants use --wcp-semantic-color-text-on-fill-* for text/icon color
 *   - Exception: `brand-subtle` intentionally uses LD brand tokens so it
 *     tracks brand-theme overrides (e.g. Bodega green, Walmart blue)
 */
export type WCPFlagVariant =
  | 'holiday-restricted'
  | 'brand-subtle'
  | 'scarcity'
  | 'savings-bold'
  | 'savings-subtle'
  | 'confidence-subtle'
  | 'confidence-bold'
  | 'confidence-alt'
  | 'confidence'
  | 'holiday-member'
  | 'social'
  | 'urgent';

export interface WCPFlagProps {
  /** Display label inside the flag */
  label?: string;
  /** Visual color variant */
  variant?: WCPFlagVariant;
  /** Optional leading icon (left side) */
  leadingIcon?: React.ReactNode;
  /** Optional trailing icon (right side) */
  trailingIcon?: React.ReactNode;
  /** Additional class names */
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function WCPFlag({
  label = 'Flag name',
  variant = 'brand-subtle',
  leadingIcon,
  trailingIcon,
  className,
}: WCPFlagProps) {
  return (
    <span
      className={[styles.flag, styles[variant], className].filter(Boolean).join(' ')}
      data-variant={variant}
    >
      {leadingIcon && (
        <span className={styles.iconWrap}>{leadingIcon}</span>
      )}
      <span className={styles.label}>{label}</span>
      {trailingIcon && (
        <span className={styles.iconWrap}>{trailingIcon}</span>
      )}
    </span>
  );
}

// ─── Variant metadata (useful for docs) ──────────────────────────────────────

export const WCP_FLAG_VARIANTS: Array<{ variant: WCPFlagVariant; label: string; description: string }> = [
  {
    variant: 'holiday-restricted',
    label: 'Holiday Restricted',
    description: 'Light gray fill — items restricted/unavailable during holiday period',
  },
  {
    variant: 'brand-subtle',
    label: 'Brand Subtle',
    description: 'Subtle brand tint — tracks brand theme (LD exception: blue → Bodega green)',
  },
  {
    variant: 'scarcity',
    label: 'Scarcity',
    description: 'Light amber tint — low stock / limited availability indicator',
  },
  {
    variant: 'savings-bold',
    label: 'Savings Bold',
    description: 'Solid red fill — promotional savings / clearance (high emphasis)',
  },
  {
    variant: 'savings-subtle',
    label: 'Savings Subtle',
    description: 'White fill, dark red border + text — savings outlined (low emphasis)',
  },
  {
    variant: 'confidence-subtle',
    label: 'Confidence Subtle',
    description: 'Light blue tint — soft confidence / info badge',
  },
  {
    variant: 'confidence-bold',
    label: 'Confidence Bold',
    description: 'Darkest navy fill — highest-emphasis confidence badge',
  },
  {
    variant: 'confidence-alt',
    label: 'Confidence Alt',
    description: 'Deep navy fill, white text, spark yellow icons — confidence badge (alternative style)',
  },
  {
    variant: 'confidence',
    label: 'Confidence',
    description: 'Deep navy fill — confidence badge (standard emphasis)',
  },
  {
    variant: 'holiday-member',
    label: 'Holiday Member',
    description: 'Spark yellow fill, very dark navy text — Walmart+ member holiday badge',
  },
  {
    variant: 'social',
    label: 'Social',
    description: 'White fill, brand-blue border + text — social proof indicator (views, interest, popularity)',
  },
  {
    variant: 'urgent',
    label: 'Urgent',
    description: 'Bright yellow fill, dark gray text — urgency / time-sensitive',
  },
];
