import { useWCPTimer } from '@/hooks/use-wcp-timer';
import styles from './WCPTimerView.module.css';

export type TimerViewVariant = 'waiting' | 'warning' | 'expiring' | 'badge';
export type TimerViewSize = 'medium' | 'small';

/** Backward-compat alias used by WCPQueueItemCard / ProductCard* */
export type WCPTimerBadgeColor = 'blue' | 'spark' | 'negative';

export interface WCPTimerViewProps {
  /** Time display string, e.g. "57mins" or "01:03" */
  timeDisplay?: string;
  /** Color variant based on urgency */
  variant?: TimerViewVariant;
  /** Size of the timer pill */
  size?: TimerViewSize;
  /** Countdown end time — when provided, the timer counts down automatically */
  endTime?: Date | number | string;
  /** Badge color when variant="badge" */
  badgeColor?: WCPTimerBadgeColor;
  /** Optional label next to the timer (not rendered inside the pill) */
  label?: string;
  /** Whether to show the label */
  showLabel?: boolean;
}

const VARIANT_CLASS: Record<string, string> = {
  waiting: styles.waiting,
  warning: styles.warning,
  expiring: styles.expiring,
};

const BADGE_COLOR_TO_VARIANT: Record<WCPTimerBadgeColor, TimerViewVariant> = {
  blue: 'waiting',
  spark: 'warning',
  negative: 'expiring',
};

export function WCPTimerView({
  timeDisplay,
  variant = 'waiting',
  size = 'medium',
  endTime,
  badgeColor,
  label,
  showLabel = true,
}: WCPTimerViewProps) {
  // When endTime is provided, compute the display from countdown
  const timer = useWCPTimer(endTime ?? 0);
  const hasEndTime = endTime !== undefined;

  const display = hasEndTime ? timer.formatted : (timeDisplay ?? '');

  // Resolve variant: badge + badgeColor → semantic variant, or auto from urgency
  let resolvedVariant: string;
  if (variant === 'badge' && badgeColor) {
    resolvedVariant = BADGE_COLOR_TO_VARIANT[badgeColor] ?? 'waiting';
  } else if (variant === 'badge') {
    // Auto-resolve from timer urgency
    resolvedVariant =
      timer.urgency === 'critical' ? 'expiring' : timer.urgency === 'warning' ? 'warning' : 'waiting';
  } else if (hasEndTime && variant === 'waiting') {
    // Auto-resolve from timer urgency when using endTime with default variant
    resolvedVariant =
      timer.urgency === 'critical' ? 'expiring' : timer.urgency === 'warning' ? 'warning' : 'waiting';
  } else {
    resolvedVariant = variant;
  }

  const cls = [
    styles.timer,
    VARIANT_CLASS[resolvedVariant] ?? styles.waiting,
    size === 'small' ? styles.small : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <span className={cls}>{display}</span>
      {label && showLabel && <span className={styles.label}>{label}</span>}
    </>
  );
}
