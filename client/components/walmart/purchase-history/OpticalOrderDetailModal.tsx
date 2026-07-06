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

interface OpticalOrderDetailModalProps {
  open: boolean;
  onClose: () => void;
  orderRef?: string;
  location?: string;
  provider?: string;
  pickupWindow?: string;
}

const OPTICAL_STEPS = ['Ordered', 'Lab processing', 'Ready', 'Picked up'];

export function OpticalOrderDetailModal({
  open, onClose, orderRef, location, provider, pickupWindow,
}: OpticalOrderDetailModalProps) {
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

  const refId = orderRef || 'Order #OPT-88214';
  const storeName = location ? location.replace(/ at .*/, '').replace(/ ·.*/, '') : 'Carrollton Supercenter';
  const storeAddr = location && location.includes(' at ')
    ? location.replace(/^.* at /, '')
    : '1213 E Trinity Mills Rd, Carrollton, TX 75006';
  const sidebarAddr = storeAddr.includes(',') ? storeAddr : `${storeAddr}, Carrollton, TX 75006`;

  return createPortal(
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="optical-detail-title">
      <ResponsiveLayout maxWidth="full" mobileActiveTab="user">
        <div className={styles.page}>
          <div className={styles.breadcrumbRow}>
            <Breadcrumb aria-label="Optical order details navigation">
              <BreadcrumbItem onClick={(e: React.MouseEvent) => { e.preventDefault(); onClose(); }}>
                Account
              </BreadcrumbItem>
              <BreadcrumbItem onClick={(e: React.MouseEvent) => { e.preventDefault(); onClose(); }}>
                Purchase history
              </BreadcrumbItem>
              <BreadcrumbItem isCurrent>Optical order details</BreadcrumbItem>
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
                    <h1 id="optical-detail-title" className={styles.orderDate}>Optical order</h1>
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
                        <img src="/illustrations/spot-illustration/Glasses.svg" alt="" aria-hidden="true" width={36} height={36} />
                        <div className={styles.fulfillmentText}>
                          <span className={styles.fulfillmentLabel}>Walmart Vision Center</span>
                          <span className={styles.fulfillmentSub}>{storeName}</span>
                        </div>
                      </div>
                      <h2 className={styles.apptHeading}>In lab processing</h2>
                      <ProgressTracker steps={OPTICAL_STEPS} activeStep={1} status="info" className={styles.apptProgress} />
                      {pickupWindow && (
                        <p style={{ fontSize: 14, color: 'var(--ld-semantic-color-text-subtle)', margin: 0 }}>
                          Est. pickup: {pickupWindow}
                        </p>
                      )}
                      <div className={styles.apptActions}>
                        <Button variant="secondary" size="small" onClick={onClose}>Reschedule</Button>
                      </div>
                    </section>

                    {/* Lens & Frame details */}
                    <section className={styles.card}>
                      <h3 className={styles.sectionTitle}>Lens & frame details</h3>
                      <div className={styles.vehicleRow}>
                        <span className={styles.vehicleName}>Progressive lenses</span>
                      </div>
                      <Divider />
                      <ul className={styles.serviceList}>
                        <li className={styles.serviceItem}>Frame: Ray-Ban RB5154 Clubmaster</li>
                        <li className={styles.serviceItem}>Lens type: Progressive (digital)</li>
                        <li className={styles.serviceItem}>Lens material: Polycarbonate</li>
                        <li className={styles.serviceItem}>Coatings: Anti-reflective, UV protection</li>
                        <li className={styles.serviceItem}>Tint: None</li>
                      </ul>
                    </section>

                    {/* Prescription info */}
                    <section className={styles.card}>
                      <h3 className={styles.sectionTitle}>Prescription</h3>
                      <ul className={styles.serviceList}>
                        <li className={styles.serviceItem}>OD (Right): SPH −2.25, CYL −0.75, Axis 180</li>
                        <li className={styles.serviceItem}>OS (Left): SPH −2.00, CYL −0.50, Axis 175</li>
                        <li className={styles.serviceItem}>ADD: +2.00</li>
                        <li className={styles.serviceItem}>PD: 63mm</li>
                      </ul>
                    </section>

                    {/* Vision Center info */}
                    <section className={styles.card}>
                      <h3 className={styles.sectionTitle}>Vision Center information</h3>
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
                            <span className={styles.apptDetailLabel}>Vision Center phone</span>
                            <span className={styles.apptDetailValue}>(972) 466-2230</span>
                          </div>
                        </div>
                        <div className={styles.apptDetailRow}>
                          <Clock style={{ width: 18, height: 18, flexShrink: 0, color: 'var(--ld-semantic-color-text-subtle)' }} />
                          <div className={styles.apptDetailContent}>
                            <span className={styles.apptDetailLabel}>Hours</span>
                            <span className={styles.apptDetailValue}>Mon–Sat 9am–8pm, Sun 11am–6pm</span>
                          </div>
                        </div>
                        {provider && (
                          <div className={styles.apptDetailRow}>
                            <CardUser style={{ width: 18, height: 18, flexShrink: 0, color: 'var(--ld-semantic-color-text-subtle)' }} />
                            <div className={styles.apptDetailContent}>
                              <span className={styles.apptDetailLabel}>Optometrist</span>
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
                          <span>Reschedule pickup</span>
                          <ChevronRight style={{ width: 18, height: 18, flexShrink: 0, color: 'var(--ld-semantic-color-text-subtle)' }} />
                        </button>
                        <button className={styles.helpRow}>
                          <span>Contact Vision Center</span>
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

                  {/* RIGHT sidebar */}
                  <aside className={styles.sidebar}>
                    <div className={styles.sideCard}>
                      <Tag variant="secondary" color="brand" style={{ alignSelf: 'flex-start' }}>Optical</Tag>

                      <div className={styles.sideSection}>
                        <h4 className={styles.sideSectionTitle}>Vision Center</h4>
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
                          <h4 className={styles.sideSectionTitle}>Optometrist</h4>
                          <p className={styles.sideText}>{provider}</p>
                        </div>
                      )}

                      <div className={styles.sideSection}>
                        <h4 className={styles.sideSectionTitle}>Insurance</h4>
                        <p className={styles.sideText}>VSP Vision Care</p>
                      </div>

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
                          <span className={styles.priceLineLabel}>Frame</span>
                          <span className={styles.priceLineValue}>$180.00</span>
                        </div>
                        <div className={styles.priceLine}>
                          <span className={styles.priceLineLabel}>Lenses</span>
                          <span className={styles.priceLineValue}>$220.00</span>
                        </div>
                        <div className={styles.priceLine}>
                          <span className={styles.priceLineLabel}>Anti-reflective coating</span>
                          <span className={styles.priceLineValue}>$49.00</span>
                        </div>
                        <div className={styles.priceLine}>
                          <span className={styles.priceLineLabel}>Insurance covered</span>
                          <span className={styles.priceLineValue}>−$200.00</span>
                        </div>
                        <div className={styles.priceLine}>
                          <span className={styles.priceLineLabel}>Taxes</span>
                          <span className={styles.priceLineValue}>$18.68</span>
                        </div>
                      </div>
                      <div className={styles.priceTotal}>
                        <span className={styles.priceTotalLabel}>Total</span>
                        <span className={styles.priceTotalValue}>$267.68</span>
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
