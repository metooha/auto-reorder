import { useState } from 'react';
import { ChevronRight } from '@/components/icons';
import { WCPRating } from '@/components/walmart/WCPRating';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { Alert } from '@/components/ui/Alert';
import { Link } from '@/components/ui/Link';
import { ProgressTracker } from '@/components/ui/ProgressTracker';
import { OrderTypeIcon } from '@/components/icons-custom/OrderTypeIcon';
import { AmendsBanner } from './AmendsBanner';
import styles from './OrderCard.module.css';

export type OrderType = 'curbside' | 'delivery' | 'shipping' | 'store' | 'auto';
export type TimelineStep = 'placed' | 'preparing' | 'on-the-way' | 'delivered';

export interface OrderAction {
  label: string;
  variant: 'primary' | 'secondary';
  onClick?: () => void;
}

export interface OrderProduct {
  src: string;
  alt: string;
}

export interface ServiceItem {
  name: string;
  variant?: string;       // e.g. "Full-synthetic premium oil - Castrol"
  price?: string;         // e.g. "$54.99"
  capacity?: string;      // e.g. "Up to 5 qts."
  notes?: string[];       // e.g. ["Additional charges may apply…"]
  imageSrc?: string;
}

export interface ServiceDetails {
  vehicle: string;
  services: string[];         // kept for backward compat (simple list)
  serviceItems?: ServiceItem[]; // rich per-service data
  appointmentContact?: string; // e.g. "Emilia Garcia"
  storePhone?: string;        // e.g. "(972) 466-2228"
  storeHours?: string;        // e.g. "Hours: 7am to 7pm"
  serviceInstructions?: string; // free-text note from customer
  appointmentStep?: number;     // 0=Scheduled, 1=Ready to service, 2=Serviced
}

export interface OrderCardProps {
  orderType: OrderType;
  location?: string;
  seller?: string;
  fulfilledBy?: string;
  statusHeading: string;
  timelineStep?: TimelineStep;
  timelineVariant?: 'delivery' | 'pickup';
  isDelayed?: boolean;
  products: OrderProduct[];
  orderTotal?: string;
  actions?: OrderAction[];
  showStartReturn?: boolean;
  returnNotice?: string;
  returnDeadline?: string;
  addItemsBanner?: string;
  serviceDetails?: ServiceDetails;
}

const ORDER_TYPE_LABELS: Record<OrderType, string> = {
  curbside: 'Curbside pickup',
  delivery: 'Delivery from store',
  shipping: 'Shipping',
  store: 'Store purchase',
  auto: 'Auto Care Center',
};

const EXPERIENCE_LABELS: Record<OrderType, string> = {
  curbside: 'pickup',
  delivery: 'delivery',
  shipping: 'shipping',
  store: 'in-store',
  auto: 'Auto Care',
};

const DELIVERY_STEPS = ['Placed', 'Preparing', 'On the way', 'Delivered'];
const PICKUP_STEPS = ['Placed', 'Preparing', 'Ready', 'Picked up'];
const AUTO_STEPS = ['Scheduled', 'Ready to service', 'Serviced'];
const STEP_INDEX: Record<TimelineStep, number> = {
  placed: 0,
  preparing: 1,
  'on-the-way': 2,
  delivered: 3,
};

function RatingWidget({ orderType }: { orderType: OrderType }) {
  const [selected, setSelected] = useState(0);

  if (selected > 0) {
    return (
      <div className={styles.ratingSection}>
        <WCPRating
          value={selected}
          size="medium"
          aria-label={`Your rating: ${selected} out of 5 stars`}
        />
        <p className={styles.ratingThankYou}>Thanks for your feedback!</p>
      </div>
    );
  }

  return (
    <div className={styles.ratingSection}>
      <p className={styles.ratingTitle}>How was your {EXPERIENCE_LABELS[orderType]} experience?</p>
      <p className={styles.ratingSubtitle}>Select a rating to begin quick survey.</p>
      <WCPRating
        size="medium"
        defaultValue={0}
        onChange={(v) => setSelected(v)}
        aria-label="Rate your experience"
      />
    </div>
  );
}

export function OrderCard({
  orderType,
  location,
  seller,
  fulfilledBy,
  statusHeading,
  timelineStep,
  timelineVariant = 'delivery',
  isDelayed = false,
  products,
  orderTotal,
  actions = [],
  showStartReturn = false,
  returnNotice,
  returnDeadline,
  addItemsBanner,
  serviceDetails,
}: OrderCardProps) {
  const primaryActions = actions.filter((a) => a.variant === 'primary');
  const secondaryActions = actions.filter((a) => a.variant === 'secondary');

  const steps = timelineVariant === 'pickup' ? PICKUP_STEPS : DELIVERY_STEPS;
  const activeStep = timelineStep ? STEP_INDEX[timelineStep] : undefined;
  const trackerStatus = isDelayed ? 'warning' : timelineStep === 'delivered' ? 'success' : 'info';

  return (
    <article className={styles.card}>
      {/* Amends Banner — custom design per Figma */}
      {addItemsBanner && (
        <AmendsBanner message={addItemsBanner} />
      )}

      <div className={styles.cardBody}>
        {/* Left: order info + timeline + products */}
        <div className={styles.leftCol}>
          {/* Order type + location */}
          <div className={styles.orderMeta}>
            <span className={styles.orderTypeChip}>
              <OrderTypeIcon type={orderType} />
              <span className={styles.orderTypeChipText}>
                <span className={styles.eyebrow}>{ORDER_TYPE_LABELS[orderType]}</span>
                {location && <span className={styles.location}>{location}</span>}
                <h3 className={`${styles.statusHeading} ${isDelayed ? styles.statusHeadingDelayed : ''}`}>
                  {statusHeading}
                </h3>
              </span>
              {/* Mobile-only chevron */}
              <ChevronRight className={styles.mobileChevron} aria-hidden="true" />
            </span>
            {seller && (
              <span className={styles.seller}>
                Sold by{' '}
                <Link href="#" underline>{seller}</Link>
                {fulfilledBy && <> | Fulfilled by {fulfilledBy}</>}
              </span>
            )}
          </div>

          {/* LD ProgressTracker — delivery/pickup */}
          {timelineStep && activeStep !== undefined && (
            <ProgressTracker
              steps={steps}
              activeStep={activeStep}
              status={trackerStatus}
              className={styles.progressTracker}
            />
          )}

          {/* Auto Care appointment tracker */}
          {orderType === 'auto' && serviceDetails?.appointmentStep !== undefined && (
            <ProgressTracker
              steps={AUTO_STEPS}
              activeStep={serviceDetails.appointmentStep}
              status="info"
              className={styles.progressTracker}
            />
          )}

          {/* Return notices — LD Alert (info) */}
          {returnNotice && (
            <div className={styles.returnAlertWrap}>
              <Alert variant="info">
                {returnNotice}
              </Alert>
            </div>
          )}
          {returnDeadline && (
            <div className={styles.returnAlertWrap}>
              <Alert variant="info">
                Return by {returnDeadline}
              </Alert>
            </div>
          )}

          {/* Service details (auto appointments) */}
          {serviceDetails && (
            <div className={styles.serviceDetails}>
              <span className={styles.vehicleLabel}>{serviceDetails.vehicle}</span>
              <ul className={styles.serviceList}>
                {serviceDetails.services.map((s, i) => (
                  <li key={i} className={styles.serviceItem}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Product images */}
          {products.length > 0 && (
            <div className={styles.products}>
              {products.slice(0, 8).map((p, i) => (
                <img key={i} src={p.src} alt={p.alt} className={styles.productImg} />
              ))}
            </div>
          )}
        </div>

        {/* Right: action buttons */}
        {actions.length > 0 && (
          <div className={styles.rightCol}>
            {primaryActions.map((a) => (
              <Button key={a.label} variant="primary" size="small" onClick={a.onClick} UNSAFE_className={styles.actionBtn}>
                {a.label}
              </Button>
            ))}
            {secondaryActions.map((a) => (
              <Button key={a.label} variant="secondary" size="small" onClick={a.onClick} UNSAFE_className={styles.actionBtn}>
                {a.label}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Rating — shown for delivered orders */}
      {timelineStep === 'delivered' && (
        <>
          <Divider />
          <RatingWidget orderType={orderType} />
        </>
      )}

      {/* Footer */}
      <Divider />
      <div className={styles.cardFooter}>
        {showStartReturn && (
          <Link href="/returns" underline>Start a return</Link>
        )}
        <span className={styles.footerSpacer} />
        {orderTotal && (
          <span className={styles.orderTotal}>Order total {orderTotal}</span>
        )}
      </div>
    </article>
  );
}
