import * as React from 'react';
import styles from './Callout.module.css';

/* ─── Standalone Callout position (8 nubbins) ─────────────────── */
export type CalloutPosition =
  | 'bottomCenter'
  | 'bottomLeft'
  | 'bottomRight'
  | 'topCenter'
  | 'topLeft'
  | 'topRight'
  | 'left'
  | 'right';

/* ─── Highlight / anchored position (12 nubbins) ──────────────── */
export type HighlightPosition =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

export interface CalloutProps {
  /**
   * Callout body content (standalone mode) **or** the anchor element
   * (anchored / Highlight mode when `anchor` contains the element to
   * wrap and `message` supplies the callout text).
   */
  children: React.ReactNode;

  /**
   * Position of the nubbin (arrow pointer).
   * Accepts both the 8-position standalone set **and** the 12-position
   * anchored set so both Callout and Highlight usages are covered.
   * @default 'bottomCenter'
   */
  position?: CalloutPosition | HighlightPosition;

  /** Whether the close button is shown in standalone mode. @default true */
  closable?: boolean;

  /** Callback fired when the close button is activated. */
  onClose?: () => void;

  /** Accessible description of the callout content. */
  a11yContentLabel?: string;

  // ── Anchored / Highlight mode ──────────────────────────────────

  /**
   * When provided, switches the component to **anchored mode**:
   * `children` becomes the anchor element and the callout floats beside it.
   * In standalone mode this prop is unused.
   *
   * Equivalent to the former `Highlight` component's `children` prop.
   */
  anchor?: React.ReactNode;

  /**
   * Callout message text (used in anchored / Highlight mode).
   * In standalone mode the message is passed via `children`.
   */
  message?: string;

  /**
   * Optional leading icon rendered inside the anchored callout.
   */
  icon?: React.ReactNode;

  /** Label for an optional action link inside the anchored callout. */
  actionLabel?: string;

  /** Callback fired when the action link is clicked. */
  onAction?: () => void;

  /**
   * Controlled open state (anchored mode). When `undefined` the component
   * uses internal state controlled by `defaultOpen`.
   */
  open?: boolean;

  /**
   * Initial open state for uncontrolled anchored mode.
   * @default true
   */
  defaultOpen?: boolean;

  /** Additional CSS class name. */
  UNSAFE_className?: string;

  /** Additional inline styles. */
  UNSAFE_style?: React.CSSProperties;
}

/**
 * Callout — LD 3.5 coaching/onboarding callout.
 *
 * Supports two modes:
 *
 * **Standalone mode** (default):
 * Pass callout text as `children`. The callout floats freely and is
 * positioned with `position` (`bottomCenter`, `topRight`, etc.).
 *
 * **Anchored mode** (formerly `Highlight`):
 * Pass the anchor element as `anchor` and the callout text as `message`.
 * The callout wraps the anchor and floats beside it using the extended
 * 12-position set (`bottom`, `bottom-start`, `top-end`, `right`, etc.).
 * Supports optional `icon`, `actionLabel`/`onAction`, and `open`/`defaultOpen`
 * for controlled open state.
 *
 * @example Standalone
 * ```tsx
 * <Callout position="topRight" onClose={() => setOpen(false)}>
 *   Create a project to organize your work.
 * </Callout>
 * ```
 *
 * @example Anchored (Highlight)
 * ```tsx
 * <Callout
 *   anchor={<GICButton />}
 *   message="Is this the right location?"
 *   position="bottom-start"
 *   actionLabel="Update"
 *   onAction={() => openGIC()}
 *   onClose={() => dismiss()}
 *   icon={<img src="/pin.svg" alt="" />}
 * />
 * ```
 */
export const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(
  (
    {
      children,
      position = 'bottomCenter',
      closable = true,
      onClose,
      a11yContentLabel,
      // anchored mode
      anchor,
      message,
      icon,
      actionLabel,
      onAction,
      open: controlledOpen,
      defaultOpen = true,
      UNSAFE_className,
      UNSAFE_style,
    },
    ref,
  ) => {
    // ── Anchored / Highlight mode ─────────────────────────────────
    if (anchor !== undefined) {
      const isControlled = controlledOpen !== undefined;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
      const isOpen = isControlled ? controlledOpen : internalOpen;

      const handleClose = () => {
        if (!isControlled) setInternalOpen(false);
        onClose?.();
      };

      const wrapperClass = [styles.highlightWrapper, UNSAFE_className]
        .filter(Boolean)
        .join(' ');

      const calloutClass = [
        styles.highlightCallout,
        styles[`highlight--${position}`],
      ]
        .filter(Boolean)
        .join(' ');

      return (
        <div ref={ref} className={wrapperClass} style={UNSAFE_style}>
          {anchor}
          {isOpen && (
            <div className={calloutClass} role="status" aria-live="polite">
              <span className={styles.highlightNubbin} aria-hidden="true" />
              {icon && (
                <span className={styles.highlightIcon} aria-hidden="true">
                  {icon}
                </span>
              )}
              {message && <span className={styles.highlightMessage}>{message}</span>}
              {actionLabel && (
                <button
                  type="button"
                  className={styles.highlightAction}
                  onClick={() => onAction?.()}
                >
                  {actionLabel}
                </button>
              )}
              <button
                type="button"
                className={styles.highlightClose}
                onClick={handleClose}
                aria-label="Dismiss"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M1 1L11 11M11 1L1 11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      );
    }

    // ── Standalone mode ───────────────────────────────────────────
    const className = [
      styles.callout,
      styles[`callout--${position}`],
      UNSAFE_className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={className}
        style={UNSAFE_style}
        role="status"
        aria-live="polite"
        aria-label={a11yContentLabel}
      >
        <span className={styles.callout__nubbin} aria-hidden="true" />
        <div className={styles.callout__body}>
          <div className={styles.callout__text}>{children}</div>
          {closable && (
            <button
              type="button"
              className={styles.callout__close}
              onClick={onClose}
              aria-label="Close callout"
            >
              Close
            </button>
          )}
        </div>
      </div>
    );
  },
);

Callout.displayName = 'Callout';

/* ─── Highlight alias ──────────────────────────────────────────── */

/**
 * Highlight — anchored callout that wraps a UI element.
 * @deprecated Use `<Callout anchor={...} message={...} />` instead.
 */
export const Highlight = React.forwardRef<
  HTMLDivElement,
  Omit<CalloutProps, 'children'> & { children: React.ReactNode }
>((props, ref) => {
  const { children, ...rest } = props;
  return <Callout ref={ref} anchor={children} {...rest} />;
});

Highlight.displayName = 'Highlight';

/** @deprecated Use CalloutProps */
export type HighlightProps = Omit<CalloutProps, 'children'> & { children: React.ReactNode };
