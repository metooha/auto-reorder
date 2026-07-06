import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  ChevronRight, Store, CreditCard, Printer, Phone, Clock,
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

interface BakeryOrderDetailModalProps {
  open: boolean;
  onClose: () => void;
  orderRef?: string;
  cakeType?: string;
  location?: string;
  pickupDate?: string;
}

const BAKERY_STEPS = ['Ordered', 'Decorating', 'Ready', 'Picked up'];

export function BakeryOrderDetailModal({
  open, onClose, orderRef, cakeType, location, pickupDate,
}: BakeryOrderDetailModalProps) {
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

  const refId = orderRef || 'Order #BK-40091';
  const cake = cakeType || 'Custom Cake';
  const storeName = location ? location.replace(/ at .*/, '').replace(/ ·.*/, '') : 'Carrollton Supercenter';
  const storeAddr = location && location.includes(' at ')
    ? location.replace(/^.* at /, '')
    : '1213 E Trinity Mills Rd, Carrollton, TX 75006';
  const sidebarAddr = storeAddr.includes(',') ? storeAddr : `${storeAddr}, Carrollton, TX 75006`;

  return createPortal(
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="bakery-detail-title">
      <ResponsiveLayout maxWidth="full" mobileActiveTab="user">
        <div className={styles.page}>
          <div className={styles.breadcrumbRow}>
            <Breadcrumb aria-label="Bakery order details navigation">
              <BreadcrumbItem onClick={(e: React.MouseEvent) => { e.preventDefault(); onClose(); }}>
                Account
              </BreadcrumbItem>
              <BreadcrumbItem onClick={(e: React.MouseEvent) => { e.preventDefault(); onClose(); }}>
                Purchase history
              </BreadcrumbItem>
              <BreadcrumbItem isCurrent>Bakery order details</BreadcrumbItem>
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
                    <h1 id="bakery-detail-title" className={styles.orderDate}>Bakery order</h1>
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
                        <img src="/illustrations/spot-illustration/CakesCustom.svg" alt="" aria-hidden="true" width={36} height={36} />
                        <div className={styles.fulfillmentText}>
                          <span className={styles.fulfillmentLabel}>Walmart Bakery</span>
                          <span className={styles.fulfillmentSub}>{storeName}</span>
                        </div>
                      </div>
                      <h2 className={styles.apptHeading}>Decorating in progress</h2>
                      <ProgressTracker steps={BAKERY_STEPS} activeStep={1} status="info" className={styles.apptProgress} />
                      {pickupDate && (
                        <p style={{ fontSize: 14, color: 'var(--ld-semantic-color-text-subtle)', margin: 0 }}>
                          Pickup: {pickupDate}
                        </p>
                      )}
                      <div className={styles.apptActions}>
                        <Button variant="primary" size="small" onClick={onClose}>Modify order</Button>
                      </div>
                    </section>

                    {/* Cake details */}
                    <section className={styles.card}>
                      <h3 className={styles.sectionTitle}>Cake details</h3>
                      <div className={styles.vehicleRow}>
                        <span className={styles.vehicleName}>{cake}</span>
                      </div>
                      <Divider />
                      <ul className={styles.serviceList}>
                        <li className={styles.serviceItem}>Size: 8" round (serves 10–12)</li>
                        <li className={styles.serviceItem}>Layers: 2</li>
                        <li className={styles.serviceItem}>Cake flavor: Chocolate</li>
                        <li className={styles.serviceItem}>Filling: Bavarian cream</li>
                        <li className={styles.serviceItem}>Frosting: White buttercream</li>
                        <li className={styles.serviceItem}>Inscription: "Happy Birthday Amy"</li>
                        <li className={styles.serviceItem}>Decoration: Floral border, pastel colors</li>
                      </ul>
                    </section>

                    {/* Bakery info */}
                    <section className={styles.card}>
                      <h3 className={styles.sectionTitle}>Bakery information</h3>
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
                            <span className={styles.apptDetailLabel}>Bakery phone</span>
                            <span className={styles.apptDetailValue}>(972) 466-2225</span>
                          </div>
                        </div>
                        <div className={styles.apptDetailRow}>
                          <Clock style={{ width: 18, height: 18, flexShrink: 0, color: 'var(--ld-semantic-color-text-subtle)' }} />
                          <div className={styles.apptDetailContent}>
                            <span className={styles.apptDetailLabel}>Bakery hours</span>
                            <span className={styles.apptDetailValue}>Mon–Sun 7am–9pm</span>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Help */}
                    <section className={styles.card}>
                      <h3 className={styles.sectionTitle}>How can we help?</h3>
                      <div className={styles.helpList}>
                        <button className={styles.helpRow}>
                          <span>Cancel order</span>
                          <ChevronRight style={{ width: 18, height: 18, flexShrink: 0, color: 'var(--ld-semantic-color-text-subtle)' }} />
                        </button>
                        <button className={styles.helpRow}>
                          <span>Contact bakery</span>
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
                      <Tag variant="secondary" color="brand" style={{ alignSelf: 'flex-start' }}>Custom Cake</Tag>

                      <div className={styles.sideSection}>
                        <h4 className={styles.sideSectionTitle}>Store location</h4>
                        <div className={styles.sideSectionContent}>
                          <Store style={{ width: 16, height: 16, flexShrink: 0, marginTop: 2 }} />
                          <div>
                            <p className={styles.sideText}>{storeName}</p>
                            <p className={styles.sideTextSub}>{sidebarAddr}</p>
                          </div>
                        </div>
                      </div>

                      <div className={styles.sideSection}>
                        <h4 className={styles.sideSectionTitle}>Payment</h4>
                        <div className={styles.sideSectionContent}>
                          <CreditCard style={{ width: 16, height: 16, flexShrink: 0 }} />
                          <p className={styles.sideText}>ending in 4821</p>
                        </div>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className={styles.sideCard}>
                      <div className={styles.pricingLines}>
                        <div className={styles.priceLine}>
                          <span className={styles.priceLineLabel}>8" round cake</span>
                          <span className={styles.priceLineValue}>$24.98</span>
                        </div>
                        <div className={styles.priceLine}>
                          <span className={styles.priceLineLabel}>Bavarian cream filling</span>
                          <span className={styles.priceLineValue}>$5.00</span>
                        </div>
                        <div className={styles.priceLine}>
                          <span className={styles.priceLineLabel}>Custom decoration</span>
                          <span className={styles.priceLineValue}>$3.00</span>
                        </div>
                        <div className={styles.priceLine}>
                          <span className={styles.priceLineLabel}>Taxes</span>
                          <span className={styles.priceLineValue}>$2.01</span>
                        </div>
                      </div>
                      <div className={styles.priceTotal}>
                        <span className={styles.priceTotalLabel}>Total</span>
                        <span className={styles.priceTotalValue}>$34.99</span>
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
