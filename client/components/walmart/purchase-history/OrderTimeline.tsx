import styles from './OrderTimeline.module.css';

export type TimelineStep = 'placed' | 'preparing' | 'on-the-way' | 'delivered';

const STEPS: { key: TimelineStep; label: string }[] = [
  { key: 'placed', label: 'Placed' },
  { key: 'preparing', label: 'Preparing' },
  { key: 'on-the-way', label: 'On the way' },
  { key: 'delivered', label: 'Delivered' },
];

// For pickup orders
const PICKUP_STEPS: { key: TimelineStep; label: string }[] = [
  { key: 'placed', label: 'Placed' },
  { key: 'preparing', label: 'Preparing' },
  { key: 'on-the-way', label: 'Ready' },
  { key: 'delivered', label: 'Picked up' },
];

interface OrderTimelineProps {
  currentStep: TimelineStep;
  variant?: 'delivery' | 'pickup';
  isDelayed?: boolean;
}

export function OrderTimeline({ currentStep, variant = 'delivery', isDelayed = false }: OrderTimelineProps) {
  const steps = variant === 'pickup' ? PICKUP_STEPS : STEPS;
  const currentIndex = steps.findIndex((s) => s.key === currentStep);

  return (
    <div className={styles.timeline} aria-label="Order status timeline">
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isActive = isCompleted || isCurrent;

        return (
          <div key={step.key} className={styles.stepWrapper}>
            {/* Connector line before (except first) */}
            {index > 0 && (
              <div className={`${styles.connector} ${isCompleted ? styles.connectorActive : ''} ${isDelayed && isCurrent ? styles.connectorDelayed : ''}`} />
            )}
            <div className={styles.step}>
              <div
                className={`${styles.dot} ${isActive ? styles.dotActive : ''} ${isCurrent && isDelayed ? styles.dotDelayed : ''}`}
              />
              <span className={`${styles.label} ${isCurrent ? styles.labelCurrent : ''}`}>
                {step.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
