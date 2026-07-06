import { useState, useEffect, useCallback } from 'react';
import { ChevronRight, FlashFill, X } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { GetItNowModal } from './purchase-history/GetItNowModal';
import { ViewOrderBottomSheet } from './ViewOrderBottomSheet';
import { ReplenishFlow } from './ReplenishFlow';
import { useWalmartScenario } from '@/contexts/WalmartScenarioContext';
import { PRODUCT_IMAGES } from './productImages';
import styles from './ActiveCurbsideCard.module.css';

const INITIAL_SECONDS = 57 * 60 + 23; // 57:23

interface ActiveCurbsideCardProps {
  productImage?: string;
  productName?: string;
  productPrice?: string;
  location?: string;
  orderTotal?: string;
  deliveryDay?: string;
  itemCount?: number;
  deliveryTotal?: string;
  onFlowComplete?: () => void;
}

export function ActiveCurbsideCard({
  productImage = PRODUCT_IMAGES.oatlyOatMilk,
  productName = 'Oatly Oat Milk, Non-Dairy Milk Alternative, 64 fl oz',
  productPrice = '$5.98',
  location = 'Carrollton Supercenter',
  orderTotal = '$85.00',
  deliveryDay = 'Friday',
  itemCount = 14,
  deliveryTotal = '$55.59',
  onFlowComplete,
}: ActiveCurbsideCardProps) {
  const [dismissed, setDismissed] = useState(false);
  const [showGetItNow, setShowGetItNow] = useState(false);
  const [showViewOrder, setShowViewOrder] = useState(false);
  const [showReplenishFlow, setShowReplenishFlow] = useState(false);
  const [replenishInitialScreen, setReplenishInitialScreen] =
    useState<'overview' | 'deliveryDetails'>('overview');
  const [seconds, setSeconds] = useState(INITIAL_SECONDS);
  const { errorState } = useWalmartScenario();

  useEffect(() => {
    if (dismissed || seconds <= 0) return;
    const interval = setInterval(() => {
      setSeconds((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [dismissed, seconds]);

  const formatTime = useCallback((totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }, []);

  if (dismissed) return null;

  // Timer urgency: > 30min = blue, 10-30min = yellow, < 10min = red
  const timerVariant =
    seconds > 30 * 60 ? 'blue' : seconds > 10 * 60 ? 'warning' : 'expiring';

  const timerLabel =
    timerVariant === 'blue' ? 'left to edit' : 'left to edit';

  return (
    <>
      <article className={styles.card}>
        <div className={styles.cardContent}>
          {/* Timer row */}
          <div className={styles.timerRow}>
            <div className={`${styles.timerBadge} ${styles[`timerBadge--${timerVariant}`]}`}>
              <span className={styles.timerText}>{formatTime(seconds)}</span>
            </div>
            <span className={styles.timerLabel}>{timerLabel}</span>
            <IconButton
              aria-label="Dismiss"
              variant="ghost"
              size="small"
              onClick={() => setDismissed(true)}
              UNSAFE_className={styles.dismissBtn}
            >
              <X width={16} height={16} />
            </IconButton>
          </div>

          {/* Delivery summary row */}
          <div className={styles.productRow}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F5ac1c437b00342a0b54f6649d7d6eeb8?width=80"
              alt=""
              className={styles.deliveryIcon}
            />
            <div className={styles.productInfo}>
              <span className={styles.deliveryLabel}>Your upcoming {deliveryDay} delivery</span>
              <span className={styles.deliveryMeta}>{itemCount} items · Est. {deliveryTotal}</span>
            </div>
          </div>

          {/* Actions row */}
          <div className={styles.actionsRow}>
            <Button
              variant="secondary"
              size="small"
              onClick={() => {
                if (errorState !== 'none') {
                  setReplenishInitialScreen('deliveryDetails');
                  setShowReplenishFlow(true);
                } else {
                  setShowViewOrder(true);
                }
              }}
              UNSAFE_className={styles.actionButton}
            >
              View order
            </Button>
            <Button
              variant="primary"
              size="small"
              onClick={() => setShowGetItNow(true)}
              UNSAFE_className={styles.actionButton}
            >
              <FlashFill width={16} height={16} style={{ color: 'var(--ld-semantic-color-feedback-caution, #F5A623)' }} />
              Get it now
            </Button>
          </div>

          {/* Footer — links to purchase history */}
          <button
            type="button"
            className={styles.footer}
            onClick={() => setShowGetItNow(true)}
            aria-label={`View curbside pickup details at ${location}`}
          >
            <span className={styles.footerLocation}>
              Curbside pickup at {location}
            </span>
            <ChevronRight width={16} height={16} className={styles.footerChevron} />
          </button>
        </div>
      </article>

      <ViewOrderBottomSheet
        isOpen={showViewOrder}
        onClose={() => setShowViewOrder(false)}
        deliveryDay={deliveryDay}
        deliveryTime="4pm"
        customerName="Emilia Garcia"
        customerAddress="3743 Park Ln, Dallas, TX 75220"
        onViewUsuals={() => {
          setShowViewOrder(false);
          setReplenishInitialScreen('overview');
          setShowReplenishFlow(true);
        }}
      />

      <GetItNowModal
        open={showGetItNow}
        onClose={() => setShowGetItNow(false)}
        location={location}
        orderTotal={orderTotal}
      />

      <ReplenishFlow
        isOpen={showReplenishFlow}
        onClose={() => setShowReplenishFlow(false)}
        onFlowComplete={onFlowComplete}
        initialScreen={replenishInitialScreen}
      />
    </>
  );
}
