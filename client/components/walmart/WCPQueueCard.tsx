import { WCPTimerView, TimerViewVariant } from '@/components/walmart/WCPTimerView';
import styles from './WCPQueueCard.module.css';

export interface WCPQueueCardProps {
  /** Product image URL */
  image?: string;
  /** Product description text */
  description?: string;
  /** Current price, e.g. "$499.90" */
  price: string;
  /** Strikethrough original price, e.g. "$600.00" */
  originalPrice?: string;
  /** Timer display string, e.g. "57mins" */
  timeDisplay?: string;
  /** Timer variant determines color */
  timerVariant?: TimerViewVariant;
  /** Label next to timer pill */
  timerLabel?: string;

  /* ── Backward-compat aliases (used by old demo page) ──── */
  /** Alias for timerVariant */
  variant?: TimerViewVariant;
  /** Alias for timeDisplay */
  displayTime?: string;
  /** Countdown end time — auto-formats the timer */
  endTime?: Date | number | string;
  /** Alias for image */
  productImage?: string;
  /** Alt text for product image */
  productImageAlt?: string;
  /** Alias for description */
  productName?: string;
  /** Alias for originalPrice */
  wasPrice?: string;
  /** Callback when "Leave" is clicked */
  onLeaveQueue?: () => void;
  /** Callback when "View" is clicked */
  onView?: () => void;
}

export function WCPQueueCard(props: WCPQueueCardProps) {
  const image = props.image ?? props.productImage ?? '';
  const description = props.description ?? props.productName ?? '';
  const originalPrice = props.originalPrice ?? props.wasPrice;
  const timeDisplay = props.timeDisplay ?? props.displayTime;
  const timerVariant = props.timerVariant ?? props.variant ?? 'waiting';
  const endTime = props.endTime;
  const imgAlt = props.productImageAlt ?? description;

  const defaultLabel = timerVariant === 'waiting' ? 'estimated wait' : 'left to buy';
  const label = props.timerLabel ?? defaultLabel;

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        {/* Timer row */}
        <div className={styles.timerRow}>
          <WCPTimerView
            timeDisplay={timeDisplay}
            endTime={endTime}
            variant={timerVariant}
            size="medium"
          />
          <span className={styles.timerLabel}>{label}</span>
        </div>

        {/* Product description row */}
        <div className={styles.productRow}>
          {image && (
            <img
              src={image}
              alt={imgAlt}
              className={styles.productImage}
            />
          )}
          <div className={styles.descriptionBlock}>
            <span className={styles.description}>{description}</span>
          </div>
          <div className={styles.pricing}>
            <span className={styles.price}>{props.price}</span>
            {originalPrice && (
              <span className={styles.originalPrice}>{originalPrice}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
