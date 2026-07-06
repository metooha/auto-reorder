import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { ProgressTracker } from '@/components/ui/ProgressTracker';
import { OrderTypeIcon } from '@/components/icons-custom/OrderTypeIcon';
import { AutoCareModals, AutoCareModalType } from './AutoCareModals';
import { GetItNowModal } from './GetItNowModal';
import type { OrderCardProps } from './OrderCard';
import styles from './CombinedOrderCard.module.css';

const ORDER_TYPE_LABELS: Record<string, string> = {
  delivery: 'Delivery from store',
  curbside: 'Curbside pickup',
  auto: 'Auto Care Center',
};

const DELIVERY_STEPS = ['Placed', 'Preparing', 'On the way', 'Delivered'];
const PICKUP_STEPS  = ['Placed', 'Preparing', 'Ready', 'Picked up'];
const STEP_INDEX: Record<string, number> = {
  placed: 0, preparing: 1, 'on-the-way': 2, delivered: 3,
};

const AUTO_STEPS = ['Scheduled', 'Ready to service', 'Serviced'];

interface CombinedOrderCardProps {
  autoCare: OrderCardProps;
  delivery: OrderCardProps;
  autoCareAppointmentDate?: Date;
}

export function CombinedOrderCard({ autoCare, delivery, autoCareAppointmentDate }: CombinedOrderCardProps) {
  const [openModal, setOpenModal] = useState<AutoCareModalType>(null);
  const [showGetItNow, setShowGetItNow] = useState(false);

  const autoCareActions = autoCare.actions?.map(a => {
    if (a.label === 'Check in')     return { ...a, onClick: () => setOpenModal('checkIn') };
    if (a.label === 'Reschedule')   return { ...a, onClick: () => setOpenModal('reschedule') };
    if (a.label === 'View details') return { ...a, onClick: () => setOpenModal('viewDetails') };
    return a;
  }) ?? [];

  const deliveryActions = (delivery.actions ?? []).map(a =>
    a.label === 'Get it now' ? { ...a, onClick: () => setShowGetItNow(true) } : a
  );

  const parsePrice = (s?: string) => parseFloat((s ?? '0').replace(/[^0-9.]/g, '')) || 0;
  const bundleTotal = `$${(parsePrice(autoCare.orderTotal) + parsePrice(delivery.orderTotal)).toFixed(2)}`;

  const activeStep = delivery.timelineStep ? STEP_INDEX[delivery.timelineStep] : undefined;
  const rightLabel = ORDER_TYPE_LABELS[delivery.orderType] ?? ORDER_TYPE_LABELS.delivery;
  const rightSteps = delivery.timelineVariant === 'pickup' ? PICKUP_STEPS : DELIVERY_STEPS;
  const rightTrackerStatus = delivery.timelineStep === 'delivered' ? 'success' : 'info';

  return (
    <>
      <article className={styles.card}>
        {/* Two-column body */}
        <div className={styles.body}>

          {/* ── Left: Auto Care ── */}
          <div className={styles.section}>
            <div className={styles.orderMeta}>
              <OrderTypeIcon type="auto" width={48} height={48} className={styles.typeIcon} />
              <div className={styles.metaText}>
                <span className={styles.eyebrow}>{ORDER_TYPE_LABELS.auto}</span>
                {autoCare.location && (
                  <span className={styles.location}>{autoCare.location}</span>
                )}
                <h3 className={styles.statusHeading}>{autoCare.statusHeading}</h3>
              </div>
            </div>

            {/* Auto care progress tracker */}
            <ProgressTracker
              steps={AUTO_STEPS}
              activeStep={autoCare.serviceDetails?.appointmentStep ?? 0}
              status="info"
              className={styles.tracker}
            />

            {autoCare.serviceDetails && (
              <div className={styles.serviceDetails}>
                <span className={styles.vehicleLabel}>{autoCare.serviceDetails.vehicle}</span>
                <ul className={styles.serviceList}>
                  {autoCare.serviceDetails.services.map((s, i) => (
                    <li key={i} className={styles.serviceItem}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className={styles.actions}>
              {autoCareActions.map(a => (
                <Button
                  key={a.label}
                  variant={a.variant}
                  size="small"
                  onClick={a.onClick}
                  UNSAFE_className={styles.actionBtn}
                >
                  {a.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Vertical divider */}
          <div className={styles.verticalDivider} aria-hidden="true" />

          {/* ── Right: Delivery / Curbside ── */}
          <div className={styles.section}>
            <div className={styles.orderMeta} style={{ marginBottom: 1 }}>
              <OrderTypeIcon type={delivery.orderType} width={48} height={48} className={styles.typeIcon} />
              <div className={styles.metaText}>
                <span className={styles.eyebrow}>{rightLabel}</span>
                {delivery.location && (
                  <span className={styles.location}>{delivery.location}</span>
                )}
                <h3 className={styles.statusHeading}>{delivery.statusHeading}</h3>
              </div>
            </div>

            {delivery.timelineStep && activeStep !== undefined && (
              <ProgressTracker
                steps={rightSteps}
                activeStep={activeStep}
                status={rightTrackerStatus}
                className={styles.tracker}
              />
            )}

            {delivery.products.length > 0 && (
              <div className={styles.products}>
                {delivery.products.slice(0, 5).map((p, i) => (
                  <img key={i} src={p.src} alt={p.alt} className={styles.productImg} />
                ))}
              </div>
            )}

            <div className={styles.actions}>
              {deliveryActions.map(a => (
                <Button
                  key={a.label}
                  variant={a.variant}
                  size="small"
                  onClick={a.onClick}
                  UNSAFE_className={styles.actionBtn}
                >
                  {a.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <Divider />
        <div className={styles.footer}>
          <div className={styles.footerItem}>
            <span className={styles.footerLabel}>Auto Care</span>
            <span className={styles.orderTotal}>Order total {autoCare.orderTotal}</span>
          </div>
          <span className={styles.footerDivider} aria-hidden="true" />
          <div className={styles.footerItem}>
            <span className={styles.footerLabel}>{rightLabel}</span>
            <span className={styles.orderTotal}>Order total {delivery.orderTotal}</span>
          </div>
        </div>

        {/* Bundle total row */}
        <div className={styles.bundleRow}>
          <span className={styles.bundleLabel}>Bundle total</span>
          <span className={styles.bundleTotal}>{bundleTotal}</span>
        </div>
      </article>

      <GetItNowModal
        open={showGetItNow}
        onClose={() => setShowGetItNow(false)}
        location={delivery.location}
        orderTotal={delivery.orderTotal}
      />

      <AutoCareModals
        openModal={openModal}
        onClose={() => setOpenModal(null)}
        onSwitchToCheckIn={() => setOpenModal('checkIn')}
        onSwitchToReschedule={() => setOpenModal('reschedule')}
        serviceDetails={autoCare.serviceDetails}
        location={autoCare.location}
        statusHeading={autoCare.statusHeading}
        orderTotal={autoCare.orderTotal}
        appointmentDate={autoCareAppointmentDate}
      />
    </>
  );
}
