import React from 'react';
import { ChevronRight, ChevronDown, ChevronUp } from '@/components/icons';
import { Tag } from '@/components/ui/Tag';
import { ServiceTypeIcon, ServiceType } from './ServiceTypeIcon';
import { ServiceRowDetail } from './ServiceRowDetail';
import type { ServiceEntryDetail } from './ServicesCard';
import styles from './ServiceRow.module.css';

export type ServiceStatus =
  | 'READY_FOR_PICKUP'
  | 'IN_PROGRESS'
  | 'PROCESSING'
  | 'SCHEDULED'
  | 'CANCELLED'
  | 'OTHER';

interface StatusConfig {
  label: string;
  color: 'positive' | 'info' | 'gray' | 'negative';
}

const STATUS_CONFIG: Record<ServiceStatus, StatusConfig> = {
  READY_FOR_PICKUP: { label: 'Ready',       color: 'positive' },
  IN_PROGRESS:      { label: 'In Progress', color: 'info'     },
  PROCESSING:       { label: 'Processing',  color: 'info'     },
  SCHEDULED:        { label: 'Scheduled',   color: 'gray'     },
  CANCELLED:        { label: 'Canceled',    color: 'negative' },
  OTHER:            { label: 'See details', color: 'gray'     },
};

export interface ServiceRowProps {
  serviceType: ServiceType;
  serviceLabel: string;
  status: ServiceStatus;
  microcopy?: string;
  onTap?: () => void;
  /** Expandable row props */
  isExpanded?: boolean;
  onToggle?: () => void;
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

export function ServiceRow({
  serviceType,
  serviceLabel,
  status,
  microcopy,
  onTap,
  isExpanded,
  onToggle,
  activeStep,
  pickupLocation,
  pickupDate,
  detail,
  actions,
}: ServiceRowProps) {
  const { label, color } = STATUS_CONFIG[status];

  const isExpandable = !!onToggle;

  const rowContent = (
    <>
      <ServiceTypeIcon type={serviceType} size={32} />

      <div className={styles.info}>
        <span className={styles.serviceLabel}>{serviceLabel}</span>
        {microcopy && (
          <span className={styles.microcopy}>{microcopy}</span>
        )}
      </div>

      <Tag variant="tertiary" color={color}>
        {label}
      </Tag>

      {isExpandable ? (
        isExpanded ? (
          <ChevronUp aria-hidden="true" className={styles.chevron} />
        ) : (
          <ChevronDown aria-hidden="true" className={styles.chevron} />
        )
      ) : onTap ? (
        <ChevronRight aria-hidden="true" className={styles.chevron} />
      ) : null}
    </>
  );

  /* Expandable accordion row */
  if (isExpandable) {
    return (
      <div className={styles.expandableWrapper}>
        <button
          className={`${styles.row} ${styles.rowExpandable}`}
          onClick={onToggle}
          aria-expanded={isExpanded}
          aria-label={`${serviceLabel}, ${label}`}
        >
          {rowContent}
        </button>

        {isExpanded && (
          <ServiceRowDetail
            serviceType={serviceType}
            status={status}
            activeStep={activeStep}
            pickupLocation={pickupLocation}
            pickupDate={pickupDate}
            detail={detail}
            actions={actions}
          />
        )}
      </div>
    );
  }

  /* Tappable navigation row */
  if (onTap) {
    return (
      <button
        className={`${styles.row} ${styles.rowInteractive}`}
        onClick={onTap}
        aria-label={`${serviceLabel}, ${label}`}
      >
        {rowContent}
      </button>
    );
  }

  /* Static row */
  return (
    <div className={styles.row} aria-label={`${serviceLabel}, ${label}`}>
      {rowContent}
    </div>
  );
}
