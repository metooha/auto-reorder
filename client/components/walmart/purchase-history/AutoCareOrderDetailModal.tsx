import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ChevronRight, InfoCircle, Store, CreditCard, Printer,
  Clock, Phone, CardUser, ChevronDown, ChevronUp,
} from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { LinkButton } from '@/components/ui/LinkButton';
import { Tag } from '@/components/ui/Tag';
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/Breadcrumb';
import { Divider } from '@/components/ui/Divider';
import { ResponsiveLayout } from '@/components/walmart/ResponsiveLayout';
import { AccountSideNav } from '@/components/walmart/AccountSideNav';
import { ProgressTracker } from '@/components/ui/ProgressTracker';
import type { ServiceDetails, ServiceItem } from './OrderCard';
import styles from './AutoCareOrderDetailModal.module.css';

interface AutoCareOrderDetailModalProps {
  open: boolean;
  onClose: () => void;
  onCheckIn: () => void;
  onReschedule: () => void;
  serviceDetails?: ServiceDetails;
  location?: string;
  statusHeading: string;
  orderTotal?: string;
}

// ── Rich service item row ─────────────────────────────────────────────────────
function ServiceItemRow({ item }: { item: ServiceItem }) {
  return (
    <div className={styles.serviceItemRow}>
      {item.imageSrc ? (
        <img
          src={item.imageSrc}
          alt={item.name}
          className={styles.serviceItemImage}
        />
      ) : (
        <div className={styles.serviceItemImagePlaceholder} aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="10"/>
          </svg>
        </div>
      )}
      <div className={styles.serviceItemBody}>
        <p className={styles.serviceItemName}>{item.name}</p>
        {item.variant && (
          <p className={styles.serviceItemVariant}>{item.variant}</p>
        )}
        <div className={styles.serviceItemMeta}>
          {item.price && (
            <span className={styles.serviceItemPrice}>{item.price}</span>
          )}
          {item.capacity && (
            <span className={styles.serviceItemCapacity}>({item.capacity})</span>
          )}
        </div>
        {item.notes && item.notes.length > 0 && (
          <ul className={styles.serviceItemNotes}>
            {item.notes.map((note, i) => (
              <li key={i} className={styles.serviceItemNote}>{note}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function AutoCareOrderDetailModal({
  open,
  onClose,
  onCheckIn,
  onReschedule,
  serviceDetails,
  location,
  statusHeading,
  orderTotal,
}: AutoCareOrderDetailModalProps) {
  const [instructionsOpen, setInstructionsOpen] = useState(false);

  // Scroll lock + Escape key
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  // ── Data derived from props ────────────────────────────────────────────────
  const vehicle             = serviceDetails?.vehicle  ?? '2019 Toyota Camry';
  const services            = serviceDetails?.services ?? ['Oil change'];
  const serviceItems        = serviceDetails?.serviceItems;
  const appointmentContact  = serviceDetails?.appointmentContact;
  const storePhone          = serviceDetails?.storePhone;
  const storeHours          = serviceDetails?.storeHours;
  const serviceInstructions = serviceDetails?.serviceInstructions;
  const appointmentStep     = serviceDetails?.appointmentStep ?? 0;

  const AUTO_STEPS = ['Scheduled', 'Ready to service', 'Serviced'];

  const total     = orderTotal ?? '$89.88';
  const storeName = location
    ? location.replace(/ at .*/, '')
    : 'Carrollton Supercenter';
  const storeAddr = location
    ? location.replace(/^.* at /, '')
    : '1213 E Trinity Mills Rd, Carrollton, TX 75006';
  const sidebarAddr = storeAddr.includes(',')
    ? storeAddr
    : `${storeAddr}, Carrollton, TX 75006`;

  // Compute pricing lines from serviceItems or fall back to hardcoded values
  const pricingLines: { label: string; value: string }[] = serviceItems
    ? serviceItems.filter(s => s.price).map(s => ({ label: s.name, value: s.price! }))
    : [
        { label: services[0] ?? 'Oil change', value: '$54.99' },
        ...(services[1] ? [{ label: services[1], value: '$31.99' }] : []),
      ];
  const taxAmt   = '$2.90';

  const orderDateLabel = statusHeading.replace(/,\s*\d{1,2}:\d{2}.*$/, '').trim();
  const orderNum       = '2000143-50929015';

  return createPortal(
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="order-detail-title">

      <ResponsiveLayout maxWidth="full" mobileActiveTab="user">
        <div className={styles.page}>

          {/* ── Breadcrumb — visible on all screen sizes ─────────────────── */}
          <div className={styles.breadcrumbRow}>
            <Breadcrumb aria-label="Order details navigation">
              <BreadcrumbItem onClick={(e: React.MouseEvent) => { e.preventDefault(); onClose(); }}>
                Account
              </BreadcrumbItem>
              <BreadcrumbItem onClick={(e: React.MouseEvent) => { e.preventDefault(); onClose(); }}>
                Purchase history
              </BreadcrumbItem>
              <BreadcrumbItem isCurrent>Order details</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <Divider />

          {/* ── Body ────────────────────────────────────────────────────── */}
          <div className={styles.body}>
            <AccountSideNav />

            <main className={styles.main}>
              <div className={styles.content}>

                {/* ── Order header ──────────────────────────────────────── */}
                <div className={styles.orderHeader}>
                  <div className={styles.orderHeaderLeft}>
                    <h1 id="order-detail-title" className={styles.orderDate}>
                      {orderDateLabel} order
                    </h1>
                    <span className={styles.orderNumHeader}>
                      <span className={styles.orderNumPipe} aria-hidden="true">|</span>
                      {' '}Order# {orderNum}
                    </span>
                  </div>
                  <span className={styles.printBtn}>
                    <LinkButton
                      leading={<Printer style={{ width: 16, height: 16 }} />}
                      size="small"
                      color="subtle"
                      onClick={() => window.print()}
                    >
                      Print
                    </LinkButton>
                  </span>
                </div>

                {/* ── Two-column layout ─────────────────────────────────── */}
                <div className={styles.columns}>

                  {/* ── LEFT column ───────────────────────────────────── */}
                  <div className={styles.mainCol}>

                    {/* Appointment status card */}
                    <section className={styles.card}>
                      <div className={styles.fulfillmentRow}>
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F26a934c359774221bf674b2fb62d93da"
                          alt=""
                          aria-hidden="true"
                          width={36}
                          height={36}
                        />
                        <div className={styles.fulfillmentText}>
                          <span className={styles.fulfillmentLabel}>Auto Care Center appointment</span>
                          <span className={styles.fulfillmentSub}>{storeName}</span>
                        </div>
                      </div>
                      <h2 className={styles.apptHeading}>{statusHeading}</h2>

                      {/* Auto care progress tracker */}
                      <ProgressTracker
                        steps={AUTO_STEPS}
                        activeStep={appointmentStep}
                        status="info"
                        className={styles.apptProgress}
                      />

                      <div className={styles.apptActions}>
                        <Button variant="primary" size="small" onClick={onCheckIn}>
                          Check in
                        </Button>
                        <Button variant="secondary" size="small" onClick={onReschedule}>
                          Reschedule
                        </Button>
                      </div>
                    </section>

                    {/* ── Auto service card ──────────────────────────── */}
                    <section className={styles.card}>
                      <h3 className={styles.sectionTitle}>Auto service</h3>

                      {/* Vehicle */}
                      <div className={styles.vehicleRow}>
                        <span className={styles.vehicleName}>{vehicle}</span>
                      </div>

                      <Divider />

                      {/* Rich service items (if provided) */}
                      {serviceItems && serviceItems.length > 0 ? (
                        <div className={styles.serviceItemsList}>
                          {serviceItems.map((item, i) => (
                            <ServiceItemRow key={i} item={item} />
                          ))}
                        </div>
                      ) : (
                        /* Fallback: simple list */
                        <ul className={styles.serviceList}>
                          {services.map((s) => (
                            <li key={s} className={styles.serviceItem}>{s}</li>
                          ))}
                        </ul>
                      )}

                      {/* Service instructions — collapsible */}
                      {serviceInstructions && (
                        <>
                          <Divider />
                          <div className={styles.instructionsSection}>
                            <button
                              className={styles.instructionsToggle}
                              onClick={() => setInstructionsOpen(v => !v)}
                              aria-expanded={instructionsOpen}
                            >
                              <span className={styles.instructionsLabel}>Service instructions</span>
                              {instructionsOpen
                                ? <ChevronUp style={{ width: 18, height: 18, flexShrink: 0 }} />
                                : <ChevronDown style={{ width: 18, height: 18, flexShrink: 0 }} />
                              }
                            </button>
                            {instructionsOpen && (
                              <p className={styles.instructionsText}>{serviceInstructions}</p>
                            )}
                          </div>
                        </>
                      )}
                    </section>

                    {/* ── Appointment details card ───────────────────── */}
                    {(appointmentContact || storePhone || storeHours) && (
                      <section className={styles.card}>
                        <h3 className={styles.sectionTitle}>Appointment details</h3>
                        <div className={styles.apptDetailsList}>

                          {/* Store location */}
                          <div className={styles.apptDetailRow}>
                            <Store style={{ width: 18, height: 18, flexShrink: 0, color: 'var(--ld-semantic-color-text-subtle)' }} />
                            <div className={styles.apptDetailContent}>
                              <span className={styles.apptDetailLabel}>Store location</span>
                              <span className={styles.apptDetailValue}>{storeName}</span>
                              <span className={styles.apptDetailSub}>{sidebarAddr}</span>
                            </div>
                          </div>

                          {/* Phone */}
                          {storePhone && (
                            <div className={styles.apptDetailRow}>
                              <Phone style={{ width: 18, height: 18, flexShrink: 0, color: 'var(--ld-semantic-color-text-subtle)' }} />
                              <div className={styles.apptDetailContent}>
                                <span className={styles.apptDetailLabel}>Phone</span>
                                <span className={styles.apptDetailValue}>{storePhone}</span>
                              </div>
                            </div>
                          )}

                          {/* Hours */}
                          {storeHours && (
                            <div className={styles.apptDetailRow}>
                              <Clock style={{ width: 18, height: 18, flexShrink: 0, color: 'var(--ld-semantic-color-text-subtle)' }} />
                              <div className={styles.apptDetailContent}>
                                <span className={styles.apptDetailLabel}>Store hours</span>
                                <span className={styles.apptDetailValue}>{storeHours}</span>
                              </div>
                            </div>
                          )}

                          {/* Appointment contact */}
                          {appointmentContact && (
                            <div className={styles.apptDetailRow}>
                              <CardUser style={{ width: 18, height: 18, flexShrink: 0, color: 'var(--ld-semantic-color-text-subtle)' }} />
                              <div className={styles.apptDetailContent}>
                                <span className={styles.apptDetailLabel}>Appointment contact</span>
                                <span className={styles.apptDetailValue}>{appointmentContact}</span>
                              </div>
                            </div>
                          )}

                        </div>
                      </section>
                    )}

                    {/* How can we help */}
                    <section className={styles.card}>
                      <h3 className={styles.sectionTitle}>How can we help?</h3>
                      <div className={styles.helpList}>
                        <button className={styles.helpRow}>
                          <span>Cancel appointment</span>
                          <ChevronRight style={{ width: 18, height: 18, flexShrink: 0, color: 'var(--ld-semantic-color-text-subtle)' }} />
                        </button>
                        <button className={styles.helpRow}>
                          <span>Contact store</span>
                          <ChevronRight style={{ width: 18, height: 18, flexShrink: 0, color: 'var(--ld-semantic-color-text-subtle)' }} />
                        </button>
                        <button className={styles.helpRow}>
                          <span>
                            Need more help?{' '}
                            <LinkButton size="small" color="subtle" onClick={() => {}}>Visit our help center.</LinkButton>
                          </span>
                          <ChevronRight style={{ width: 18, height: 18, flexShrink: 0, color: 'var(--ld-semantic-color-text-subtle)' }} />
                        </button>
                      </div>
                    </section>

                  </div>

                  {/* ── RIGHT: Sidebar ────────────────────────────────── */}
                  <aside className={styles.sidebar}>

                    {/* Store / vehicle / payment */}
                    <div className={styles.sideCard}>
                      <Tag variant="secondary" color="brand" style={{ alignSelf: 'flex-start' }}>Auto Care</Tag>

                      <div className={styles.sideSection}>
                        <h4 className={styles.sideSectionTitle}>Store location</h4>
                        <div className={styles.sideSectionContent}>
                          <Store style={{ width: 16, height: 16, flexShrink: 0, marginTop: 2 }} />
                          <div>
                            <p className={styles.sideText}>{storeName}</p>
                            <p className={styles.sideTextSub}>{sidebarAddr}</p>
                            {storePhone && (
                              <p className={styles.sideTextSub}>{storePhone}</p>
                            )}
                            {storeHours && (
                              <p className={styles.sideTextSub}>{storeHours}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {appointmentContact && (
                        <div className={styles.sideSection}>
                          <h4 className={styles.sideSectionTitle}>Appointment contact</h4>
                          <div className={styles.sideSectionContent}>
                            <CardUser style={{ width: 16, height: 16, flexShrink: 0 }} />
                            <p className={styles.sideText}>{appointmentContact}</p>
                          </div>
                        </div>
                      )}

                      <div className={styles.sideSection}>
                        <h4 className={styles.sideSectionTitle}>Vehicle</h4>
                        <p className={styles.sideText}>{vehicle}</p>
                      </div>

                      <div className={styles.sideSection}>
                        <h4 className={styles.sideSectionTitle}>Payment method</h4>
                        <div className={styles.sideSectionContent}>
                          <CreditCard style={{ width: 16, height: 16, flexShrink: 0 }} />
                          <p className={styles.sideText}>ending in 7725</p>
                        </div>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className={styles.sideCard}>
                      <div className={styles.pricingLines}>
                        {pricingLines.map(({ label, value }) => (
                          <div key={label} className={styles.priceLine}>
                            <span className={styles.priceLineLabel}>{label}</span>
                            <span className={styles.priceLineValue}>{value}</span>
                          </div>
                        ))}
                        <div className={styles.priceLine}>
                          <span className={styles.priceLineLabel}>Taxes</span>
                          <span className={styles.priceLineValue}>{taxAmt}</span>
                        </div>
                      </div>

                      <div className={styles.priceTotal}>
                        <span className={styles.priceTotalLabel}>Total</span>
                        <span className={styles.priceTotalValue}>{total}</span>
                      </div>

                      <div className={styles.priceAdjusted}>
                        <div className={styles.priceAdjustedRow}>
                          <span className={styles.priceAdjustedLabel}>
                            Temporary hold
                            <InfoCircle style={{ width: 14, height: 14, marginLeft: 4, verticalAlign: 'middle', color: 'var(--ld-semantic-color-text-subtle)' }} />
                          </span>
                          <span className={styles.priceAdjustedValue}>$0.00</span>
                        </div>
                        <p className={styles.priceAdjustedNote}>
                          Additional charges may apply if more oil is needed. Package selections can be changed at the store.
                        </p>
                      </div>

                      <button className={styles.chargeHistoryRow}>
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F26a934c359774221bf674b2fb62d93da"
                          alt=""
                          aria-hidden="true"
                          width={28}
                          height={28}
                        />
                        <div className={styles.chargeHistoryText}>
                          <span className={styles.chargeHistoryTitle}>Charge history</span>
                          <span className={styles.chargeHistorySub}>Your transaction activity for this order</span>
                        </div>
                        <ChevronRight style={{ width: 18, height: 18, flexShrink: 0, color: 'var(--ld-semantic-color-text-subtle)' }} />
                      </button>
                    </div>

                    {/* Order number + barcode */}
                    <div className={styles.sideCard}>
                      <p className={styles.orderNumSide}>Order# {orderNum}</p>
                      <div className={styles.barcode} aria-hidden="true" />
                    </div>

                  </aside>
                </div>

              </div>
            </main>
          </div>
        </div>
      </ResponsiveLayout>
    </div>,
    document.body
  );
}
