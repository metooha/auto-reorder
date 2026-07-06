import { useState } from 'react';
import { WCPTimerView, TimerViewVariant } from '@/components/walmart/WCPTimerView';
import { Warning } from '@/components/icons/Warning';
import { X } from '@/components/icons/X';
import { ChevronRight } from '@/components/icons/ChevronRight';
import styles from './WCPQueueBanner.module.css';

export type QueueBannerVariant = 'lineJoined' | 'warning' | 'checkout' | 'error';

export interface WCPQueueBannerProps {
  /** Banner variant */
  variant: QueueBannerVariant;
  /** Timer display string, e.g. "59mins" or "01:03" */
  timeDisplay?: string;
  /** Text shown next to or below the timer */
  message?: string;
  /** Optional snackbar text shown above the banner bar */
  snackbarText?: string;
  /** Product image URL (lineJoined / warning only) */
  productImage?: string;
  /** Callback when "View" link is clicked */
  onView?: () => void;
  /** Callback when "Leave" link is clicked */
  onLeave?: () => void;
  /** Callback when close/dismiss is clicked */
  onClose?: () => void;
  /** Callback when the CTA chevron button is clicked */
  onAction?: () => void;

  /* ── Backward-compat aliases (used by old demo pages) ──── */
  /** Countdown end time — auto-formats the timer display */
  endTime?: Date | number | string;
  /** Alias for message (lineJoined) */
  reservationText?: string;
  /** Link row text below the card */
  linkText?: string;
  /** Callback for link row click */
  onLink?: () => void;
  /** Alias for message (checkout) */
  queueMessage?: string;
  /** Alias for onClose */
  onDismiss?: () => void;
  /** Alias for message (error) */
  errorMessage?: string;
  /** Render inline (no fixed positioning) */
  inline?: boolean;
}

const TIMER_VARIANT_MAP: Record<string, TimerViewVariant> = {
  lineJoined: 'waiting',
  warning: 'warning',
  checkout: 'warning',
  error: 'expiring',
};

export function WCPQueueBanner(props: WCPQueueBannerProps) {
  const {
    variant,
    timeDisplay,
    snackbarText,
    productImage,
    onView,
    onLeave,
    onAction,
    endTime,
    linkText,
    onLink,
    inline: _inline,
  } = props;

  // Resolve message from various alias props
  const message =
    props.message ??
    props.reservationText ??
    props.queueMessage ??
    props.errorMessage ??
    '';

  const onClose = props.onClose ?? props.onDismiss;

  const [snackbarVisible, setSnackbarVisible] = useState(!!snackbarText);

  if (variant === 'error') {
    return <ErrorBanner message={message} />;
  }

  if (variant === 'checkout') {
    return (
      <CheckoutBanner
        timeDisplay={timeDisplay}
        endTime={endTime}
        message={message}
        onClose={onClose}
      />
    );
  }

  return (
    <div className={styles.wrapper}>
      {/* Snackbar */}
      {snackbarVisible && snackbarText && (
        <div className={styles.snackbar}>
          <div className={styles.snackbarContent}>
            <span className={styles.snackbarText}>{snackbarText}</span>
          </div>
          <div className={styles.snackbarActions}>
            <button
              className={styles.snackbarActionBtn}
              onClick={onAction}
              type="button"
            >
              Action Button
            </button>
            <button
              className={styles.snackbarCloseBtn}
              onClick={() => setSnackbarVisible(false)}
              type="button"
              aria-label="Close notification"
            >
              <X width={16} height={16} />
            </button>
          </div>
        </div>
      )}

      {/* Banner bar */}
      <div className={styles.bannerContainer}>
        <div className={styles.bannerBar}>
          <div className={styles.barContents}>
            <div className={styles.infoGroup}>
              {productImage && (
                <img
                  src={productImage}
                  alt=""
                  className={styles.productThumb}
                />
              )}
              {(timeDisplay || endTime) && (
                <WCPTimerView
                  timeDisplay={timeDisplay}
                  endTime={endTime}
                  variant={TIMER_VARIANT_MAP[variant]}
                  size="medium"
                />
              )}
              <span className={styles.reservationText}>{message}</span>
            </div>

            <div className={styles.actionGroup}>
              <div className={styles.linkGroup}>
                {onView && (
                  <button
                    className={styles.linkBtn}
                    onClick={onView}
                    type="button"
                  >
                    View
                  </button>
                )}
                {onLeave && (
                  <>
                    <span className={styles.divider} />
                    <button
                      className={styles.linkBtn}
                      onClick={onLeave}
                      type="button"
                    >
                      Leave
                    </button>
                  </>
                )}
              </div>
              {(onAction || onLink) && (
                <button
                  className={styles.chevronBtn}
                  onClick={onAction ?? onLink}
                  type="button"
                  aria-label="View details"
                >
                  <ChevronRight width={16} height={16} />
                </button>
              )}
            </div>
          </div>

          {/* Link row (backward-compat) */}
          {linkText && (
            <div className={styles.linkRow}>
              <button
                className={styles.linkRowBtn}
                onClick={onLink}
                type="button"
              >
                {linkText}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────────── */

function CheckoutBanner({
  timeDisplay,
  endTime,
  message,
  onClose,
}: {
  timeDisplay?: string;
  endTime?: Date | number | string;
  message: string;
  onClose?: () => void;
}) {
  return (
    <div className={styles.checkoutBanner}>
      <div className={styles.checkoutContent}>
        <div className={styles.checkoutInfo}>
          <WCPTimerView
            timeDisplay={timeDisplay}
            endTime={endTime}
            variant="warning"
            size="medium"
          />
          <span className={styles.checkoutMessage}>{message}</span>
        </div>
        {onClose && (
          <button
            className={styles.checkoutCloseBtn}
            onClick={onClose}
            type="button"
            aria-label="Dismiss"
          >
            <X width={16} height={16} />
          </button>
        )}
      </div>
    </div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className={styles.errorBanner}>
      <Warning
        width={24}
        height={24}
        className={styles.errorIcon}
      />
      <span className={styles.errorMessage}>{message}</span>
    </div>
  );
}
