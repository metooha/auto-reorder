import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from '@/components/icons';
import { Link } from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { Alert } from '@/components/ui/Alert';
import { ServiceRow, ServiceStatus } from './ServiceRow';
import { ServiceType } from './ServiceTypeIcon';
import styles from './ServicesCard.module.css';

export interface ServiceEntryDetail {
  /** e.g. "Sat, Mar 7, 10:00am–11:00am" */
  scheduledTime?: string;
  /** e.g. "Today, 12:00pm–1:00pm" */
  pickupWindow?: string;
  /** e.g. "Rx #4428710" or "Order #123456" */
  referenceId?: string;
  /** e.g. "Dr. Sarah Chen" */
  provider?: string;
  /** e.g. "Walmart+ InHome" or "Walmart Health" */
  plan?: string;
  /** e.g. "2019 Toyota Camry" */
  vehicle?: string;
  /** Any extra note shown at the bottom */
  note?: string;
}

export interface ServiceEntry {
  id: string;
  serviceType: ServiceType;
  serviceLabel: string;
  status: ServiceStatus;
  microcopy?: string;
  orderDetailPath?: string;
  pickupDate?: string;
  pickupLocation?: string;
  /** Override the ProgressTracker active step (useful for demos) */
  activeStep?: number;
  /** Extra contextual details shown in the expanded panel */
  detail?: ServiceEntryDetail;
  /** Custom action buttons for the expanded panel (overrides default) */
  actions?: Array<{
    label: string;
    variant: 'primary' | 'secondary';
    onClick?: () => void;
  }>;
}

interface ServicesCardProps {
  services: ServiceEntry[];
  onViewAll?: () => void;
  defaultExpanded?: boolean;
  /** Pre-expand a specific service row by id */
  defaultExpandedRowId?: string;
}

const PRIORITY: Record<ServiceStatus, number> = {
  READY_FOR_PICKUP: 0,
  IN_PROGRESS:      1,
  PROCESSING:       2,
  SCHEDULED:        3,
  CANCELLED:        4,
  OTHER:            5,
};

function parsePickupDate(dateStr?: string): number {
  if (!dateStr) return Infinity;
  const parsed = Date.parse(dateStr);
  return isNaN(parsed) ? Infinity : parsed;
}

export function ServicesCard({
  services,
  onViewAll,
  defaultExpanded = false,
  defaultExpandedRowId,
}: ServicesCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [expandedRowId, setExpandedRowId] = useState<string | null>(
    defaultExpandedRowId ?? null
  );

  const activeCount = services.filter(s => s.status !== 'CANCELLED').length;

  const sorted = [...services].sort((a, b) => {
    const priorityDiff = PRIORITY[a.status] - PRIORITY[b.status];
    if (priorityDiff !== 0) return priorityDiff;
    return parsePickupDate(a.pickupDate) - parsePickupDate(b.pickupDate);
  });

  const displayed = isExpanded ? sorted : sorted.slice(0, 2);
  const showViewAll = sorted.length > 2 && !isExpanded;
  const showToggle = sorted.length > 2;

  const readyServices = displayed.filter(
    s => s.status === 'READY_FOR_PICKUP' && s.pickupLocation
  );

  return (
    <article className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>
          Your Services
          <span className={styles.activeCount}>
            {' '}({activeCount} Active)
          </span>
        </h3>

        {showToggle && (
          <Button
            variant="tertiary"
            size="small"
            onClick={() => setIsExpanded(prev => !prev)}
            aria-expanded={isExpanded}
            aria-controls="services-list"
            trailing={
              isExpanded
                ? <ChevronUp aria-hidden="true" style={{ width: 16, height: 16 }} />
                : <ChevronDown aria-hidden="true" style={{ width: 16, height: 16 }} />
            }
          >
            {isExpanded ? 'Show less' : 'Show all'}
          </Button>
        )}
      </div>

      {/* Urgency alert for ready-for-pickup services */}
      {readyServices.length > 0 && (
        <div className={styles.alertSection}>
          {readyServices.map(s => (
            <Alert key={s.id} variant="success">
              {s.serviceLabel} ready for pickup at {s.pickupLocation}
            </Alert>
          ))}
        </div>
      )}

      {/* Service rows */}
      <div id="services-list">
        {displayed.map((entry, i) => (
          <React.Fragment key={entry.id}>
            {i > 0 && <Divider />}
            <ServiceRow
              serviceType={entry.serviceType}
              serviceLabel={entry.serviceLabel}
              status={entry.status}
              microcopy={entry.microcopy}
              isExpanded={expandedRowId === entry.id}
              onToggle={() =>
                setExpandedRowId(prev =>
                  prev === entry.id ? null : entry.id
                )
              }
              activeStep={entry.activeStep}
              pickupLocation={entry.pickupLocation}
              pickupDate={entry.pickupDate}
              detail={entry.detail}
              actions={entry.actions}
            />
          </React.Fragment>
        ))}
      </div>

      {/* View All footer link */}
      {showViewAll && (
        <>
          <Divider />
          <div className={styles.viewAllRow}>
            <Link href="#" underline onClick={e => { e.preventDefault(); onViewAll?.(); }}>
              View all services
            </Link>
          </div>
        </>
      )}
    </article>
  );
}
