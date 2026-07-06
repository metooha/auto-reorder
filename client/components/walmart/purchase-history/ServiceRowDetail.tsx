import React from 'react';
import { ProgressTracker, type ProgressTrackerStatus } from '@/components/ui/ProgressTracker';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { ServiceType } from './ServiceTypeIcon';
import { type ServiceStatus } from './ServiceRow';
import type { ServiceEntryDetail } from './ServicesCard';
import styles from './ServiceRowDetail.module.css';

/* ── Tracking steps per service type ─────────────────────────────────────── */

const STEPS: Record<ServiceType, string[]> = {
  PHARMACY: ['Submitted', 'Filling', 'Ready', 'Picked up'],
  AUTO:     ['Scheduled', 'Checked in', 'In progress', 'Complete'],
  OPTICAL:  ['Ordered', 'Lab processing', 'Ready', 'Picked up'],
  BAKERY:   ['Ordered', 'Decorating', 'Ready', 'Picked up'],
};

const STATUS_TO_STEP: Record<ServiceType, Record<ServiceStatus, number>> = {
  PHARMACY: {
    READY_FOR_PICKUP: 2,
    IN_PROGRESS:      1,
    PROCESSING:       1,
    SCHEDULED:        0,
    CANCELLED:        0,
    OTHER:            0,
  },
  AUTO: {
    READY_FOR_PICKUP: 3,
    IN_PROGRESS:      2,
    PROCESSING:       1,
    SCHEDULED:        0,
    CANCELLED:        0,
    OTHER:            0,
  },
  OPTICAL: {
    READY_FOR_PICKUP: 2,
    IN_PROGRESS:      1,
    PROCESSING:       1,
    SCHEDULED:        0,
    CANCELLED:        0,
    OTHER:            0,
  },
  BAKERY: {
    READY_FOR_PICKUP: 2,
    IN_PROGRESS:      1,
    PROCESSING:       1,
    SCHEDULED:        0,
    CANCELLED:        0,
    OTHER:            0,
  },
};

function getTrackerStatus(status: ServiceStatus): ProgressTrackerStatus {
  switch (status) {
    case 'READY_FOR_PICKUP': return 'success';
    case 'CANCELLED':        return 'error';
    default:                 return 'info';
  }
}

function getPrimaryAction(serviceType: ServiceType, status: ServiceStatus): string {
  if (status === 'READY_FOR_PICKUP') return 'Pick up';
  if (serviceType === 'AUTO' && status === 'SCHEDULED') return 'Check in';
  return 'View details';
}

/* ── Detail row helper ───────────────────────────────────────────────────── */

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.detailRow}>
      <span className={styles.detailLabel}>{label}</span>
      <span className={styles.detailValue}>{value}</span>
    </div>
  );
}

/* ── Component ───────────────────────────────────────────────────────────── */

export interface ServiceRowDetailProps {
  serviceType: ServiceType;
  status: ServiceStatus;
  activeStep?: number;
  pickupLocation?: string;
  pickupDate?: string;
  detail?: ServiceEntryDetail;
  actions?: Array<{
    label: string;
    variant: 'primary' | 'secondary';
    onClick?: () => void;
  }>;
}

export function ServiceRowDetail({
  serviceType,
  status,
  activeStep,
  pickupLocation,
  pickupDate,
  detail,
  actions,
}: ServiceRowDetailProps) {
  const steps = STEPS[serviceType];
  const step = activeStep ?? STATUS_TO_STEP[serviceType][status];
  const trackerStatus = getTrackerStatus(status);

  const defaultPrimaryLabel = getPrimaryAction(serviceType, status);
  const defaultShowSecondary = defaultPrimaryLabel !== 'View details';

  const resolvedActions = actions ?? [
    { label: defaultPrimaryLabel, variant: 'primary' as const },
    ...(defaultShowSecondary
      ? [{ label: 'View details', variant: 'secondary' as const }]
      : []),
  ];

  const hasLocationOrDate = pickupLocation || pickupDate;
  const hasDetail = detail && Object.values(detail).some(Boolean);

  return (
    <div className={styles.panel}>
      <ProgressTracker
        steps={steps}
        activeStep={step}
        status={trackerStatus}
        className={styles.tracker}
      />

      {/* Contextual details */}
      {(hasLocationOrDate || hasDetail) && (
        <div className={styles.details}>
          {pickupLocation && (
            <DetailRow label="Location" value={pickupLocation} />
          )}
          {detail?.scheduledTime && (
            <DetailRow label="Scheduled" value={detail.scheduledTime} />
          )}
          {detail?.pickupWindow && (
            <DetailRow label="Pickup window" value={detail.pickupWindow} />
          )}
          {!detail?.scheduledTime && !detail?.pickupWindow && pickupDate && (
            <DetailRow label="Date" value={pickupDate} />
          )}
          {detail?.referenceId && (
            <DetailRow label="Reference" value={detail.referenceId} />
          )}
          {detail?.provider && (
            <DetailRow label="Provider" value={detail.provider} />
          )}
          {detail?.plan && (
            <DetailRow label="Plan" value={detail.plan} />
          )}
          {detail?.vehicle && (
            <DetailRow label="Vehicle" value={detail.vehicle} />
          )}
          {detail?.note && (
            <p className={styles.note}>{detail.note}</p>
          )}
        </div>
      )}

      <ButtonGroup UNSAFE_className={styles.actions}>
        {resolvedActions.map((action) => (
          <Button
            key={action.label}
            variant={action.variant}
            size="small"
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}
