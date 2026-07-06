import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  ChevronRight, Store, CreditCard, Printer, Phone, Clock, CardUser,
} from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { LinkButton } from '@/components/ui/LinkButton';
import { Tag } from '@/components/ui/Tag';
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/Breadcrumb';
import { Divider } from '@/components/ui/Divider';
import { ResponsiveLayout } from '@/components/walmart/ResponsiveLayout';
import { AccountSideNav } from '@/components/walmart/AccountSideNav';
import { ProgressTracker } from '@/components/ui/ProgressTracker';
import styles from './AutoCareOrderDetailModal.module.css';

interface PharmacyOrderDetailModalProps {
  open: boolean;
  onClose: () => void;
  rxName?: string;
  rxNumber?: string;
  location?: string;
  pickupWindow?: string;
  provider?: string;
  plan?: string;
}

const RX_STEPS = ['Submitted', 'Filling', 'Ready', 'Picked up'];

export function PharmacyOrderDetailModal({
  open, onClose, rxName, rxNumber, location, pickupWindow, provider, plan,
}: PharmacyOrderDetailModalProps) {
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

  const medication = rxName || 'Amoxicillin 500mg';
  const refId = rxNumber || 'Rx #4428710';
  const storeName = location ? location.replace(/ at .*/, '').replace(/ ·.*/, '') : 'Oak Lawn Supercenter';
  const storeAddr = location && location.includes(' at ')
    ? location.replace(/^.* at /, '')
    : '1234 W Illinois Ave, Dallas, TX 75224';
  const sidebarAddr = storeAddr.includes(',') ? storeAddr : `${storeAddr}, Dallas, TX 75224`;

  return createPortal(
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="rx-detail-title">
      <ResponsiveLayout maxWidth="full" mobileActiveTab="user">
        <div className={styles.page}>
          <div className={styles.breadcrumbRow}>
            <Breadcrumb aria-label="Prescription details navigation">
              <BreadcrumbItem onClick={(e: React.MouseEvent) => { e.preventDefault(); onClose(); }}>
                Account
              </BreadcrumbItem>
              <BreadcrumbItem onClick={(e: React.MouseEvent) => { e.preventDefault(); onClose(); }}>
                Purchase history
              </BreadcrumbItem>
              <BreadcrumbItem isCurrent>Prescription details</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <Divider />

          <div className={styles.body}>
            <AccountSideNav />
            <main className={styles.main}>
              <div className={styles.content}>

                {/* Header */}
                <div className={styles.orderHeader}>
                  <div className={styles.orderHeaderLeft}>
                    <h1 id="rx-detail-title" className={styles.orderDate}>Prescription details</h1>
                    <span className={styles.orderNumHeader}>
                      <span className={styles.orderNumPipe} aria-hidden="true">|</span>{' '}{refId}
                    </span>
                  </div>
                  <span className={styles.printBtn}>
                    <LinkButton
                      leading={<Printer style={{ width: 16, height: 16 }} />}
                      size="small" color="subtle" onClick={() => window.print()}
                    >
                      Print
                    </LinkButton>
                  </span>
                </div>

                <div className={styles.columns}>
                  {/* LEFT column */}
                  <div className={styles.mainCol}>

                    {/* Status card */}
                    <section className={styles.card}>
                      <div className={styles.fulfillmentRow}>
                        <img src="/illustrations/spot-illustration/Pharmacy.svg" alt="" aria-hidden="true" width={36} height={36} />
                        <div className={styles.fulfillmentText}>
                          <span className={styles.fulfillmentLabel}>Walmart Pharmacy</span>
                          <span className={styles.fulfillmentSub}>{storeName}</span>
                        </div>
                      </div>
                      <h2 className={styles.apptHeading}>Ready for pickup</h2>
                      <ProgressTracker steps={RX_STEPS} activeStep={2} status="success" className={styles.apptProgress} />
                      {pickupWindow && (
                        <p style={{ fontSize: 14, color: 'var(--ld-semantic-color-text-subtle)', margin: 0 }}>
                          Pickup window: {pickupWindow}
                        </p>
                      )}
                      <div className={styles.apptActions}>
                        <Button variant="primary" size="small" onClick={onClose}>Pick up</Button>
                      </div>
                    </section>

                    {/* Prescription details */}
                    <section className={styles.card}>
                      <h3 className={styles.sectionTitle}>Prescription details</h3>
                      <div className={styles.vehicleRow}>
                        <span className={styles.vehicleName}>{medication}</span>
                      </div>
                      <Divider />
                      <ul className={styles.serviceList}>
                        <li className={styles.serviceItem}>Dosage: 500mg</li>
                        <li className={styles.serviceItem}>Quantity: 30 capsules</li>
                        <li className={styles.serviceItem}>Refills remaining: 2</li>
                        <li className={styles.serviceItem}>Days supply: 10</li>
                      </ul>
                    </section>

                    {/* Pharmacy info */}
                    <section className={styles.card}>
                      <h3 className={styles.sectionTitle}>Pharmacy information</h3>
                      <div className={styles.apptDetailsList}>
                        <div className={styles.apptDetailRow}>
                          <Store style={{ width: 18, height: 18, flexShrink: 0, color: 'var(--ld-semantic-color-text-subtle)' }} />
                          <div className={styles.apptDetailContent}>
                            <span className={styles.apptDetailLabel}>Location</span>
                            <span className={styles.apptDetailValue}>{storeName}</span>
                            <span className={styles.apptDetailSub}>{sidebarAddr}</span>
                          </div>
                        </div>
                        <div className={styles.apptDetailRow}>
                          <Phone style={{ width: 18, height: 18, flexShrink: 0, color: 'var(--ld-semantic-color-text-subtle)' }} />
                          <div className={styles.apptDetailContent}>
                            <span className={styles.apptDetailLabel}>Pharmacy phone</span>
                            <span className={styles.apptDetailValue}>(214) 339-4480</span>
                          </div>
                        </div>
                        <div className={styles.apptDetailRow}>
                          <Clock style={{ width: 18, height: 18, flexShrink: 0, color: 'var(--ld-semantic-color-text-subtle)' }} />
                          <div className={styles.apptDetailContent}>
                            <span className={styles.apptDetailLabel}>Pharmacy hours</span>
                            <span className={styles.apptDetailValue}>Mon–Fri 9am–9pm, Sat 9am–7pm, Sun 10am–6pm</span>
                          </div>
                        </div>
                        {provider && (
                          <div className={styles.apptDetailRow}>
                            <CardUser style={{ width: 18, height: 18, flexShrink: 0, color: 'var(--ld-semantic-color-text-subtle)' }} />
                            <div className={styles.apptDetailContent}>
                              <span className={styles.apptDetailLabel}>Prescriber</span>
                              <span className={styles.apptDetailValue}>{provider}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </section>

                    {/* Help */}
                    <section className={styles.card}>
                      <h3 className={styles.sectionTitle}>How can we help?</h3>
                      <div className={styles.helpList}>
                        <button className={styles.helpRow}>
                          <span>Transfer prescription</span>
                          <ChevronRight style={{ width: 18, height: 18, flexShrink: 0, color: 'var(--ld-semantic-color-text-subtle)' }} />
                        </button>
                        <button className={styles.helpRow}>
                          <span>Request refill</span>
                          <ChevronRight style={{ width: 18, height: 18, flexShrink: 0, color: 'var(--ld-semantic-color-text-subtle)' }} />
                        </button>
                        <button className={styles.helpRow}>
                          <span>Contact pharmacy</span>
                          <ChevronRight style={{ width: 18, height: 18, flexShrink: 0, color: 'var(--ld-semantic-color-text-subtle)' }} />
                        </button>
                      </div>
                    </section>
                  </div>

                  {/* RIGHT sidebar */}
                  <aside className={styles.sidebar}>
                    <div className={styles.sideCard}>
                      <Tag variant="secondary" color="brand" style={{ alignSelf: 'flex-start' }}>Prescription</Tag>

                      <div className={styles.sideSection}>
                        <h4 className={styles.sideSectionTitle}>Pharmacy location</h4>
                        <div className={styles.sideSectionContent}>
                          <Store style={{ width: 16, height: 16, flexShrink: 0, marginTop: 2 }} />
                          <div>
                            <p className={styles.sideText}>{storeName}</p>
                            <p className={styles.sideTextSub}>{sidebarAddr}</p>
                          </div>
                        </div>
                      </div>

                      {provider && (
                        <div className={styles.sideSection}>
                          <h4 className={styles.sideSectionTitle}>Prescriber</h4>
                          <p className={styles.sideText}>{provider}</p>
                        </div>
                      )}

                      {plan && (
                        <div className={styles.sideSection}>
                          <h4 className={styles.sideSectionTitle}>Insurance</h4>
                          <p className={styles.sideText}>{plan}</p>
                        </div>
                      )}

                      <div className={styles.sideSection}>
                        <h4 className={styles.sideSectionTitle}>Payment</h4>
                        <div className={styles.sideSectionContent}>
                          <CreditCard style={{ width: 16, height: 16, flexShrink: 0 }} />
                          <p className={styles.sideText}>ending in 7725</p>
                        </div>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className={styles.sideCard}>
                      <div className={styles.pricingLines}>
                        <div className={styles.priceLine}>
                          <span className={styles.priceLineLabel}>{medication}</span>
                          <span className={styles.priceLineValue}>$54.00</span>
                        </div>
                        <div className={styles.priceLine}>
                          <span className={styles.priceLineLabel}>Insurance covered</span>
                          <span className={styles.priceLineValue}>−$42.00</span>
                        </div>
                      </div>
                      <div className={styles.priceTotal}>
                        <span className={styles.priceTotalLabel}>Copay</span>
                        <span className={styles.priceTotalValue}>$12.00</span>
                      </div>
                    </div>

                    {/* Order number + barcode */}
                    <div className={styles.sideCard}>
                      <p className={styles.orderNumSide}>{refId}</p>
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
