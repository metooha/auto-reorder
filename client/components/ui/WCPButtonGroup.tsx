import * as React from 'react';
import { Button } from './Button';
import { LinkButton } from './LinkButton';
import styles from './WCPButtonGroup.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * Inline: buttons sit side-by-side on one row.
 * Stacked: buttons are stacked vertically, full-width.
 */
export type WCPButtonGroupLayout = 'inline' | 'stacked';

/**
 * The button combination pattern.
 *
 * - `primary-secondary`  : Primary (preferred) + Secondary (alternate)
 * - `primary-tertiary`   : Primary (preferred) + Link/tertiary (alternate)
 * - `secondary-tertiary` : Secondary (preferred) + Link/tertiary (alternate)
 * - `tertiary-tertiary`  : Two link buttons
 * - `three-options`      : Primary + Secondary inline, then a link below (stacked only)
 */
export type WCPButtonGroupPattern =
  | 'primary-secondary'
  | 'primary-tertiary'
  | 'secondary-tertiary'
  | 'tertiary-tertiary'
  | 'three-options';

export interface WCPButtonGroupProps {
  /** Layout direction. @default 'inline' */
  layout?: WCPButtonGroupLayout;

  /** Button pattern / combination. @default 'primary-secondary' */
  pattern?: WCPButtonGroupPattern;

  /**
   * Label for the "Preferred" (primary CTA) button.
   * @default 'Preferred'
   */
  preferredLabel?: string;

  /**
   * Label for the "Alternate" (secondary action) button.
   * @default 'Alternate'
   */
  alternateLabel?: string;

  /**
   * Label for a third link action (used only with `three-options`).
   * @default 'Alternate'
   */
  thirdLabel?: string;

  /**
   * Inline only: when true the preferred (CTA) button sits on the right.
   * When false it sits on the left.
   * @default true
   */
  preferredRight?: boolean;

  /**
   * Inline `primary-secondary` / `tertiary-tertiary`: whether both buttons
   * expand to fill the available width equally.
   * @default true
   */
  fullWidth?: boolean;

  /** Click handler for the preferred button. */
  onPreferred?: React.MouseEventHandler<HTMLButtonElement>;

  /** Click handler for the alternate button. */
  onAlternate?: React.MouseEventHandler<HTMLButtonElement>;

  /** Click handler for the third button (`three-options` only). */
  onThird?: React.MouseEventHandler<HTMLButtonElement>;

  /** Extra props forwarded to the preferred button element. */
  preferredButtonProps?: Omit<
    React.ComponentPropsWithoutRef<'button'>,
    'onClick' | 'children'
  >;

  /** Extra props forwarded to the alternate button element. */
  alternateButtonProps?: Omit<
    React.ComponentPropsWithoutRef<'button'>,
    'onClick' | 'children'
  >;

  /** Extra props forwarded to the third button element (`three-options` only). */
  thirdButtonProps?: Omit<
    React.ComponentPropsWithoutRef<'button'>,
    'onClick' | 'children'
  >;

  /** Additional CSS class. */
  className?: string;
}

// ─── Sub-renderers ────────────────────────────────────────────────────────────

function PreferredPrimary({
  label,
  fullWidth,
  onClick,
  buttonProps,
}: {
  label: string;
  fullWidth?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  buttonProps?: WCPButtonGroupProps['preferredButtonProps'];
}) {
  return (
    <Button
      variant="primary"
      size="medium"
      isFullWidth={fullWidth}
      onClick={onClick}
      {...buttonProps}
    >
      {label}
    </Button>
  );
}

function PreferredSecondary({
  label,
  fullWidth,
  onClick,
  buttonProps,
}: {
  label: string;
  fullWidth?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  buttonProps?: WCPButtonGroupProps['preferredButtonProps'];
}) {
  return (
    <Button
      variant="secondary"
      size="medium"
      isFullWidth={fullWidth}
      onClick={onClick}
      {...buttonProps}
    >
      {label}
    </Button>
  );
}

function AlternateSecondary({
  label,
  fullWidth,
  onClick,
  buttonProps,
}: {
  label: string;
  fullWidth?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  buttonProps?: WCPButtonGroupProps['alternateButtonProps'];
}) {
  return (
    <Button
      variant="secondary"
      size="medium"
      isFullWidth={fullWidth}
      onClick={onClick}
      {...buttonProps}
    >
      {label}
    </Button>
  );
}

function TertiaryLink({
  label,
  onClick,
  buttonProps,
}: {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  buttonProps?:
    | WCPButtonGroupProps['alternateButtonProps']
    | WCPButtonGroupProps['thirdButtonProps'];
}) {
  return (
    <LinkButton size="medium" onClick={onClick} {...(buttonProps as object)}>
      {label}
    </LinkButton>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

/**
 * WCPButtonGroup — WCP (Walmart Component Platform) button group patterns.
 *
 * Implements all standard WCP button group combinations from the design system:
 *
 * **Inline patterns** (`layout="inline"`):
 * - `primary-secondary`  — Secondary (Alternate) + Primary (Preferred)
 * - `primary-tertiary`   — Link (Alternate) + Primary (Preferred)
 * - `secondary-tertiary` — Link (Alternate) + Secondary (Preferred), position swappable
 * - `tertiary-tertiary`  — Two link buttons
 *
 * **Stacked patterns** (`layout="stacked"`):
 * - `primary-secondary`  — Primary full-width, Secondary full-width below
 * - `primary-tertiary`   — Primary full-width, Link below
 * - `secondary-tertiary` — Secondary full-width, Link below
 * - `three-options`      — Primary+Secondary inline, Link below
 *
 * @example
 * // Most common: primary + secondary stacked
 * <WCPButtonGroup
 *   layout="stacked"
 *   pattern="primary-secondary"
 *   preferredLabel="Add to cart"
 *   alternateLabel="Save for later"
 *   onPreferred={handleAddToCart}
 *   onAlternate={handleSave}
 * />
 *
 * @example
 * // Inline: link on left, primary on right
 * <WCPButtonGroup
 *   layout="inline"
 *   pattern="primary-tertiary"
 *   preferredLabel="Join Walmart+"
 *   alternateLabel="No thanks"
 *   onPreferred={handleJoin}
 *   onAlternate={handleDecline}
 * />
 */
export const WCPButtonGroup = React.forwardRef<
  HTMLDivElement,
  WCPButtonGroupProps
>(
  (
    {
      layout = 'inline',
      pattern = 'primary-secondary',
      preferredLabel = 'Preferred',
      alternateLabel = 'Alternate',
      thirdLabel = 'Alternate',
      preferredRight = true,
      fullWidth = true,
      onPreferred,
      onAlternate,
      onThird,
      preferredButtonProps,
      alternateButtonProps,
      thirdButtonProps,
      className,
    },
    ref
  ) => {
    const isStacked = layout === 'stacked';

    // ── stacked/three-options ────────────────────────────────────────────────
    if (isStacked && pattern === 'three-options') {
      return (
        <div
          ref={ref}
          className={[styles.group, styles['group--stacked'], className]
            .filter(Boolean)
            .join(' ')}
        >
          {/* top row: inline primary-secondary */}
          <div className={styles.inlineRow}>
            <AlternateSecondary
              label={alternateLabel}
              fullWidth
              onClick={onAlternate}
              buttonProps={alternateButtonProps}
            />
            <PreferredPrimary
              label={preferredLabel}
              fullWidth
              onClick={onPreferred}
              buttonProps={preferredButtonProps}
            />
          </div>
          {/* bottom: link */}
          <TertiaryLink
            label={thirdLabel}
            onClick={onThird}
            buttonProps={thirdButtonProps}
          />
        </div>
      );
    }

    // ── stacked ──────────────────────────────────────────────────────────────
    if (isStacked) {
      return (
        <div
          ref={ref}
          className={[styles.group, styles['group--stacked'], className]
            .filter(Boolean)
            .join(' ')}
        >
          {renderStackedPreferred()}
          {renderStackedAlternate()}
        </div>
      );
    }

    // ── inline ───────────────────────────────────────────────────────────────
    return (
      <div
        ref={ref}
        className={[
          styles.group,
          styles['group--inline'],
          fullWidth && styles['group--inline-fullWidth'],
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {renderInlineContent()}
      </div>
    );

    // ── Stacked renderers ────────────────────────────────────────────────────
    function renderStackedPreferred() {
      if (pattern === 'primary-secondary' || pattern === 'primary-tertiary') {
        return (
          <PreferredPrimary
            label={preferredLabel}
            fullWidth
            onClick={onPreferred}
            buttonProps={preferredButtonProps}
          />
        );
      }
      // secondary-tertiary
      return (
        <PreferredSecondary
          label={preferredLabel}
          fullWidth
          onClick={onPreferred}
          buttonProps={preferredButtonProps}
        />
      );
    }

    function renderStackedAlternate() {
      if (pattern === 'primary-secondary') {
        return (
          <AlternateSecondary
            label={alternateLabel}
            fullWidth
            onClick={onAlternate}
            buttonProps={alternateButtonProps}
          />
        );
      }
      // primary-tertiary or secondary-tertiary
      return (
        <TertiaryLink
          label={alternateLabel}
          onClick={onAlternate}
          buttonProps={alternateButtonProps}
        />
      );
    }

    // ── Inline renderers ─────────────────────────────────────────────────────
    function renderInlineContent() {
      switch (pattern) {
        case 'primary-secondary': {
          const alternate = (
            <AlternateSecondary
              label={alternateLabel}
              fullWidth={fullWidth}
              onClick={onAlternate}
              buttonProps={alternateButtonProps}
            />
          );
          const preferred = (
            <PreferredPrimary
              label={preferredLabel}
              fullWidth={fullWidth}
              onClick={onPreferred}
              buttonProps={preferredButtonProps}
            />
          );
          return preferredRight ? (
            <>
              {alternate}
              {preferred}
            </>
          ) : (
            <>
              {preferred}
              {alternate}
            </>
          );
        }

        case 'primary-tertiary': {
          const link = (
            <TertiaryLink
              label={alternateLabel}
              onClick={onAlternate}
              buttonProps={alternateButtonProps}
            />
          );
          const primary = (
            <PreferredPrimary
              label={preferredLabel}
              fullWidth={false}
              onClick={onPreferred}
              buttonProps={preferredButtonProps}
            />
          );
          return preferredRight ? (
            <>
              {link}
              {primary}
            </>
          ) : (
            <>
              {primary}
              {link}
            </>
          );
        }

        case 'secondary-tertiary': {
          const link = (
            <TertiaryLink
              label={alternateLabel}
              onClick={onAlternate}
              buttonProps={alternateButtonProps}
            />
          );
          const secondary = (
            <PreferredSecondary
              label={preferredLabel}
              fullWidth={false}
              onClick={onPreferred}
              buttonProps={preferredButtonProps}
            />
          );
          return preferredRight ? (
            <>
              {link}
              {secondary}
            </>
          ) : (
            <>
              {secondary}
              {link}
            </>
          );
        }

        case 'tertiary-tertiary': {
          return (
            <>
              <TertiaryLink
                label={alternateLabel}
                onClick={onAlternate}
                buttonProps={alternateButtonProps}
              />
              <TertiaryLink
                label={preferredLabel}
                onClick={onPreferred}
                buttonProps={preferredButtonProps}
              />
            </>
          );
        }

        default:
          return null;
      }
    }
  }
);

WCPButtonGroup.displayName = 'WCPButtonGroup';
