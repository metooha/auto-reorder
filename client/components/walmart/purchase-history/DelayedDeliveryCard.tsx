import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { Tag } from '@/components/ui/Tag';
import { Alert } from '@/components/ui/Alert';
import { ProgressTracker } from '@/components/ui/ProgressTracker';
import { Clock, ChevronRight } from '@/components/icons';
import { OrderTypeIcon } from '@/components/icons-custom/OrderTypeIcon';
import type { OrderProduct } from './OrderCard';
import styles from './DelayedDeliveryCard.module.css';

interface DelayedDeliveryCardProps {
  statusHeading: string;
  delayEstimate: string;
  products: OrderProduct[];
  orderTotal?: string;
  onReschedule?: () => void;
  onPickupInstead?: () => void;
  onViewDetails?: () => void;
  onCancelOrder?: () => void;
}

const DELIVERY_STEPS = ['Placed', 'Preparing', 'On the way', 'Delivered'];

export function DelayedDeliveryCard({
  statusHeading,
  delayEstimate,
  products,
  orderTotal,
  onReschedule,
  onPickupInstead,
  onViewDetails,
  onCancelOrder,
}: DelayedDeliveryCardProps) {
  return (
    <article className={styles.card}>
      {/* ── Warning banner ── */}
      <div className={styles.banner}>
        <div className={styles.bannerLeft}>
          <Clock style={{ width: 18, height: 18, flexShrink: 0 }} />
          <span className={styles.bannerText}>Running late — we're sorry for the wait</span>
        </div>
        <Tag variant="primary" color="warning" style={{ alignSelf: 'center' }}>Delayed</Tag>
      </div>

      {/* ── Main body ── */}
      <div className={styles.body}>

        {/* Left: meta + status + progress + products */}
        <div className={styles.leftCol}>
          <div className={styles.meta}>
            <OrderTypeIcon type="delivery" width={48} height={48} className={styles.typeIcon} />
            <div>
              <span className={styles.eyebrow}>Delivery from store</span>
              <h3 className={styles.statusHeading}>{statusHeading}</h3>
            </div>
          </div>

          <Alert variant="warning">
            <strong>{delayEstimate}</strong>{' '}— We’re working to get your order to you as quickly as possible.
          </Alert>

          <ProgressTracker
            steps={DELIVERY_STEPS}
            activeStep={1}
            status="warning"
            className={styles.tracker}
          />

          {products.length > 0 && (
            <div className={styles.products}>
              {products.slice(0, 5).map((p, i) => (
                <img key={i} src={p.src} alt={p.alt} className={styles.productImg} />
              ))}
            </div>
          )}
        </div>

        {/* Right: actions */}
        <div className={styles.rightCol}>
          <div className={styles.actions}>
            <Button variant="primary" size="small" onClick={onReschedule} UNSAFE_className={styles.actionBtn}>
              Reschedule delivery
            </Button>
            <Button variant="secondary" size="small" onClick={onPickupInstead} UNSAFE_className={styles.actionBtn}>
              Pickup instead
            </Button>
            <Button variant="secondary" size="small" onClick={onViewDetails} UNSAFE_className={styles.actionBtn}>
              View details
            </Button>
            <Button variant="secondary" size="small" onClick={onCancelOrder} UNSAFE_className={styles.actionBtn}>
              Cancel order
            </Button>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className={styles.footer}>
        {orderTotal && (
          <span className={styles.orderTotal}>Order total {orderTotal}</span>
        )}
      </div>
    </article>
  );
}
