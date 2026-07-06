/**
 * [WCP] Rich Media Sheet
 *
 * A slot-driven, themeable bottom sheet for media-rich experiences.
 * Distinct from the LD BottomSheet — designed for product-level WCP use cases
 * with multiple header layouts, surface theming, and desktop centered behavior.
 *
 * - Mobile (0-899px): Full-width, slides up from bottom
 * - Desktop (900px+): Centered modal, max-width 560px, all-corner radius
 */

import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import styles from './WCPRichMediaSheet.module.css';
import { X } from '@/components/icons';

// ── Types ──────────────────────────────────────────────────────────────────

export type WCPRichMediaSheetHeaderVariant =
  | 'title'
  | 'title-subtitle'
  | 'logo-left'
  | 'logo-center'
  | 'inverse'
  | 'none';

export type WCPRichMediaSheetSurfaceVariant = 'default' | 'brand' | 'brand-bold' | 'brand-gradient' | 'media';

export interface WCPRichMediaSheetProps {
  /** Whether the sheet is open. */
  isOpen: boolean;
  /** Called when the sheet should close. */
  onClose: () => void;

  // ── Header ──────────────────────────────────────────────────────────────
  /**
   * Header layout variant.
   * - `title`: 1-line centered title + drag handle + close button
   * - `title-subtitle`: 2-line title + subtitle + drag handle + divider + close button
   * - `logo-left`: left-aligned logo slot + drag handle + close button
   * - `logo-center`: centered logo slot + drag handle + close button
   * - `inverse`: brand-blue bg, white title, white close button
   * - `none`: only close button in top-right corner
   * @default 'title'
   */
  headerVariant?: WCPRichMediaSheetHeaderVariant;

  /** Title text — used with: title, title-subtitle, inverse */
  title?: string;
  /** Subtitle text — used with: title-subtitle */
  subtitle?: string;
  /** Logo/image slot — used with: logo-left, logo-center */
  logoSlot?: React.ReactNode;

  // ── Surface ─────────────────────────────────────────────────────────────
  /**
   * Sheet background color theme.
   * - `default`: white surface overlay
   * - `brand`: light brand-blue (#F0F5FF)
   * - `brand-bold`: full brand-blue (#0071DC) — chrome elements auto-inverse
   * - `media`: transparent — content provides full-bleed color
   * @default 'default'
   */
  surfaceVariant?: WCPRichMediaSheetSurfaceVariant;

  // ── Content ─────────────────────────────────────────────────────────────
  /** Main slottable content — NO internal padding; consumer owns layout. */
  children: React.ReactNode;

  // ── Footer ──────────────────────────────────────────────────────────────
  /**
   * Optional action buttons rendered in the fixed footer.
   * Pass a Button or ButtonGroup.
   */
  actions?: React.ReactNode;
  /**
   * Whether to show a divider above the footer actions.
   * @default true when actions are provided
   */
  showFooterDivider?: boolean;

  // ── Behavior ────────────────────────────────────────────────────────────
  /**
   * Height mode:
   * - `fixed`: 80vh
   * - `content`: grows with content (default)
   */
  adjustHeight?: 'fixed' | 'content';
  /** Whether background scales when sheet is open. */
  shouldScaleBackground?: boolean;
  /** Accessible label for the sheet dialog. */
  ariaLabel?: string;
}

// ── Close Button ──────────────────────────────────────────────────────────

interface CloseButtonProps {
  onClose: () => void;
  inverse?: boolean;
}

function CloseButton({ onClose, inverse = false }: CloseButtonProps) {
  return (
    <button
      type="button"
      onClick={onClose}
      className={[styles.closeButton, inverse ? styles.closeButtonInverse : ''].filter(Boolean).join(' ')}
      aria-label="Close"
    >
      <X />
    </button>
  );
}

// ── Drag Handle ───────────────────────────────────────────────────────────

function DragHandle({ inverse = false }: { inverse?: boolean }) {
  return (
    <div className={[styles.grabber, inverse ? styles.grabberInverse : ''].filter(Boolean).join(' ')} />
  );
}

// ── Header ────────────────────────────────────────────────────────────────

interface HeaderProps {
  variant: WCPRichMediaSheetHeaderVariant;
  title?: string;
  subtitle?: string;
  logoSlot?: React.ReactNode;
  onClose: () => void;
  /** When true, forces drag handle and close button to use inverse (white) styles. */
  forceInverseChrome?: boolean;
}

function SheetHeader({ variant, title, subtitle, logoSlot, onClose, forceInverseChrome = false }: HeaderProps) {
  if (variant === 'none') {
    return (
      <div className={styles.headerNone}>
        {/* Visually hidden title required for Radix/vaul Dialog accessibility */}
        <DrawerPrimitive.Title className={styles.srOnly}>
          {title ?? 'Dialog'}
        </DrawerPrimitive.Title>
        <DragHandle inverse={forceInverseChrome} />
        <div className={styles.headerNoneRow}>
          <CloseButton onClose={onClose} inverse={forceInverseChrome} />
        </div>
      </div>
    );
  }

  if (variant === 'inverse') {
    return (
      <div className={styles.headerInverse}>
        <DragHandle inverse />
        <div className={styles.headerRow}>
          <div className={styles.headerTitleFrame}>
            <DrawerPrimitive.Title className={styles.headerTitleInverse}>
              {title}
            </DrawerPrimitive.Title>
          </div>
          <CloseButton onClose={onClose} inverse />
        </div>
        <div className={styles.headerDividerInverse} />
      </div>
    );
  }

  if (variant === 'title-subtitle') {
    return (
      <div className={[styles.header, forceInverseChrome ? styles.headerBrandBold : ''].filter(Boolean).join(' ')}>
        <DragHandle inverse={forceInverseChrome} />
        <div className={styles.headerRow}>
          <div className={styles.headerTitleFrame}>
            <DrawerPrimitive.Title className={[styles.headerTitle, forceInverseChrome ? styles.headerTitleBoldSurface : ''].filter(Boolean).join(' ')}>
              {title}
            </DrawerPrimitive.Title>
            {subtitle && (
              <p className={[styles.headerSubtitle, forceInverseChrome ? styles.headerSubtitleBoldSurface : ''].filter(Boolean).join(' ')}>{subtitle}</p>
            )}
          </div>
          <CloseButton onClose={onClose} inverse={forceInverseChrome} />
        </div>
      </div>
    );
  }

  if (variant === 'logo-left') {
    return (
      <div className={[styles.header, forceInverseChrome ? styles.headerBrandBold : ''].filter(Boolean).join(' ')}>
        {/* Visually hidden title required for Radix/vaul Dialog accessibility */}
        <DrawerPrimitive.Title className={styles.srOnly}>
          {title ?? 'Dialog'}
        </DrawerPrimitive.Title>
        <DragHandle inverse={forceInverseChrome} />
        <div className={styles.headerRow}>
          <div className={styles.headerLogoLeft}>
            {logoSlot}
          </div>
          <CloseButton onClose={onClose} inverse={forceInverseChrome} />
        </div>
      </div>
    );
  }

  if (variant === 'logo-center') {
    return (
      <div className={[styles.header, forceInverseChrome ? styles.headerBrandBold : ''].filter(Boolean).join(' ')}>
        {/* Visually hidden title required for Radix/vaul Dialog accessibility */}
        <DrawerPrimitive.Title className={styles.srOnly}>
          {title ?? 'Dialog'}
        </DrawerPrimitive.Title>
        <DragHandle inverse={forceInverseChrome} />
        <div className={styles.headerRow}>
          <div className={styles.headerLogoCenter}>
            {logoSlot}
          </div>
          <CloseButton onClose={onClose} inverse={forceInverseChrome} />
        </div>
      </div>
    );
  }

  // Default: 'title'
  return (
    <div className={[styles.header, forceInverseChrome ? styles.headerBrandBold : ''].filter(Boolean).join(' ')}>
      <DragHandle inverse={forceInverseChrome} />
      <div className={styles.headerRow}>
        <div className={styles.headerTitleFrame}>
          <DrawerPrimitive.Title className={[styles.headerTitle, forceInverseChrome ? styles.headerTitleBoldSurface : ''].filter(Boolean).join(' ')}>
            {title}
          </DrawerPrimitive.Title>
        </div>
        <CloseButton onClose={onClose} inverse={forceInverseChrome} />
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────

export function WCPRichMediaSheet({
  isOpen,
  onClose,
  headerVariant = 'title',
  title,
  subtitle,
  logoSlot,
  surfaceVariant = 'default',
  children,
  actions,
  showFooterDivider,
  adjustHeight = 'content',
  shouldScaleBackground = false,
  ariaLabel,
}: WCPRichMediaSheetProps) {
  const showFooter = actions != null;
  const showDivider = showFooterDivider ?? showFooter;

  // On brand-bold the sheet background is dark, so chrome elements must be inverse
  const isBoldSurface = surfaceVariant === 'brand-bold';

  const sheetClassName = [
    styles.sheet,
    adjustHeight === 'fixed' ? styles.sheetFixed : styles.sheetContent,
    styles[`surface--${surfaceVariant}`],
  ].filter(Boolean).join(' ');

  return (
    <DrawerPrimitive.Root
      open={isOpen}
      onOpenChange={(open) => { if (!open) onClose(); }}
      shouldScaleBackground={shouldScaleBackground}
    >
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay className={styles.overlay} />
        <DrawerPrimitive.Content
          className={sheetClassName}
          aria-label={ariaLabel}
        >
          {/* Header */}
          <SheetHeader
            variant={headerVariant}
            title={title}
            subtitle={subtitle}
            logoSlot={logoSlot}
            onClose={onClose}
            forceInverseChrome={isBoldSurface}
          />

          {/* Content — no internal padding */}
          <div className={[
            styles.contentArea,
            adjustHeight === 'fixed' ? styles.contentAreaFixed : '',
          ].filter(Boolean).join(' ')}>
            {children}
          </div>

          {/* Footer */}
          {showFooter && (
            <div className={[styles.footer, styles[`footer--${surfaceVariant}`]].filter(Boolean).join(' ')}>
              {showDivider && <div className={styles.footerDivider} />}
              <div className={styles.footerActions}>
                {actions}
              </div>
            </div>
          )}
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  );
}
