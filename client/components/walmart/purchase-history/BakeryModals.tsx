import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Check, X } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { Scrim } from '@/components/ui/Scrim';
import { BakeryOrderDetailModal } from './BakeryOrderDetailModal';
import styles from './AutoCareModals.module.css';

export type BakeryModalType = 'pickup' | 'modify' | 'reorder' | 'viewDetails' | null;

function useModalEffects(open: boolean, onClose: () => void) {
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
}

// ── Pickup Confirmation Modal ─────────────────────────────────────────────────
function PickupModal({
  open, onClose, orderRef, cakeType, location,
}: {
  open: boolean; onClose: () => void;
  orderRef?: string; cakeType?: string; location?: string;
}) {
  const [confirmed, setConfirmed] = useState(false);
  useModalEffects(open, onClose);
  if (!open) return null;

  const handleDone = () => { setConfirmed(false); onClose(); };

  return createPortal(
    <>
      <Scrim onClick={onClose} style={{ zIndex: 100 }} />
      <div className={styles.modalWrap} role="dialog" aria-modal="true" aria-labelledby="bakery-pickup-title">
        {confirmed ? (
          <div className={styles.confirmedBody}>
            <div className={styles.closeBtnWrap}>
              <IconButton aria-label="Close" variant="ghost" size="small" onClick={handleDone}>
                <X style={{ width: 20, height: 20 }} />
              </IconButton>
            </div>
            <div className={styles.successIcon}>
              <Check style={{ width: 32, height: 32, color: 'var(--ld-semantic-color-text-inverse)' }} />
            </div>
            <h2 className={styles.confirmedTitle}>Order picked up!</h2>
            <p className={styles.confirmedText}>
              Your {cakeType || 'custom cake'} has been picked up. Enjoy!
            </p>
            <Button variant="primary" onClick={handleDone} UNSAFE_className={styles.fullWidthBtn}>Done</Button>
          </div>
        ) : (
          <>
            <div className={styles.modalHeader}>
              <h2 id="bakery-pickup-title" className={styles.modalTitle}>Pick up bakery order</h2>
              <IconButton aria-label="Close" variant="ghost" size="small" onClick={onClose}>
                <X style={{ width: 20, height: 20 }} />
              </IconButton>
            </div>
            <div className={styles.checkInBody}>
              <div className={styles.detailCard}>
                <img src="/illustrations/spot-illustration/CakesCustom.svg" alt="" aria-hidden="true" width={56} height={56} />
                <div className={styles.detailInfo}>
                  <p className={styles.detailHeading}>{cakeType || 'Custom Cake'}</p>
                  {orderRef && <p className={styles.detailSub}>{orderRef}</p>}
                  {location && <p className={styles.detailSub}>{location}</p>}
                </div>
              </div>
              <p className={styles.checkInNote}>
                Head to the Bakery department to pick up your order. Please check the decoration before leaving the store.
              </p>
            </div>
            <div className={styles.modalFooter}>
              <Button variant="secondary" onClick={onClose} UNSAFE_className={styles.halfWidthBtn}>Not yet</Button>
              <Button variant="primary" onClick={() => setConfirmed(true)} UNSAFE_className={styles.halfWidthBtn}>Confirm pickup</Button>
            </div>
          </>
        )}
      </div>
    </>,
    document.body
  );
}

// ── Modify Order Modal ────────────────────────────────────────────────────────
function ModifyOrderModal({
  open, onClose, orderRef, cakeType, pickupDate,
}: {
  open: boolean; onClose: () => void;
  orderRef?: string; cakeType?: string; pickupDate?: string;
}) {
  const [requested, setRequested] = useState(false);
  useModalEffects(open, onClose);
  if (!open) return null;

  const handleDone = () => { setRequested(false); onClose(); };

  return createPortal(
    <>
      <Scrim onClick={onClose} style={{ zIndex: 100 }} />
      <div className={styles.modalWrap} role="dialog" aria-modal="true" aria-labelledby="bakery-modify-title">
        {requested ? (
          <div className={styles.confirmedBody}>
            <div className={styles.closeBtnWrap}>
              <IconButton aria-label="Close" variant="ghost" size="small" onClick={handleDone}>
                <X style={{ width: 20, height: 20 }} />
              </IconButton>
            </div>
            <div className={styles.successIcon}>
              <Check style={{ width: 32, height: 32, color: 'var(--ld-semantic-color-text-inverse)' }} />
            </div>
            <h2 className={styles.confirmedTitle}>Modification requested!</h2>
            <p className={styles.confirmedText}>
              Your bakery team will review the changes. You'll receive a confirmation within 24 hours.
            </p>
            <Button variant="primary" onClick={handleDone} UNSAFE_className={styles.fullWidthBtn}>Done</Button>
          </div>
        ) : (
          <>
            <div className={styles.modalHeader}>
              <h2 id="bakery-modify-title" className={styles.modalTitle}>Modify order</h2>
              <IconButton aria-label="Close" variant="ghost" size="small" onClick={onClose}>
                <X style={{ width: 20, height: 20 }} />
              </IconButton>
            </div>
            <div className={styles.checkInBody}>
              <div className={styles.detailCard}>
                <img src="/illustrations/spot-illustration/CakesCustom.svg" alt="" aria-hidden="true" width={56} height={56} />
                <div className={styles.detailInfo}>
                  <p className={styles.detailHeading}>{cakeType || 'Custom Cake'}</p>
                  {orderRef && <p className={styles.detailSub}>{orderRef}</p>}
                  {pickupDate && <p className={styles.detailSub}>Pickup: {pickupDate}</p>}
                </div>
              </div>
              <div className={styles.apptFieldGroup}>
                <span className={styles.apptFieldLabel}>Current order</span>
                <div className={styles.apptFieldValueStatic}>
                  8" round, chocolate, white buttercream, "Happy Birthday Amy"
                </div>
              </div>
              <p className={styles.checkInNote}>
                Modifications must be requested at least 48 hours before pickup. Changes to size or flavor may affect pricing.
              </p>
            </div>
            <div className={styles.modalFooter}>
              <Button variant="secondary" onClick={onClose} UNSAFE_className={styles.halfWidthBtn}>Cancel</Button>
              <Button variant="primary" onClick={() => setRequested(true)} UNSAFE_className={styles.halfWidthBtn}>Request changes</Button>
            </div>
          </>
        )}
      </div>
    </>,
    document.body
  );
}

// ── Reorder Modal ─────────────────────────────────────────────────────────────
function ReorderModal({
  open, onClose, orderRef, cakeType,
}: {
  open: boolean; onClose: () => void;
  orderRef?: string; cakeType?: string;
}) {
  const [reordered, setReordered] = useState(false);
  useModalEffects(open, onClose);
  if (!open) return null;

  const handleDone = () => { setReordered(false); onClose(); };

  return createPortal(
    <>
      <Scrim onClick={onClose} style={{ zIndex: 100 }} />
      <div className={styles.modalWrap} role="dialog" aria-modal="true" aria-labelledby="bakery-reorder-title">
        {reordered ? (
          <div className={styles.confirmedBody}>
            <div className={styles.closeBtnWrap}>
              <IconButton aria-label="Close" variant="ghost" size="small" onClick={handleDone}>
                <X style={{ width: 20, height: 20 }} />
              </IconButton>
            </div>
            <div className={styles.successIcon}>
              <Check style={{ width: 32, height: 32, color: 'var(--ld-semantic-color-text-inverse)' }} />
            </div>
            <h2 className={styles.confirmedTitle}>Order placed!</h2>
            <p className={styles.confirmedText}>
              Your {cakeType || 'custom cake'} has been reordered. You'll receive a confirmation with pickup details.
            </p>
            <Button variant="primary" onClick={handleDone} UNSAFE_className={styles.fullWidthBtn}>Done</Button>
          </div>
        ) : (
          <>
            <div className={styles.modalHeader}>
              <h2 id="bakery-reorder-title" className={styles.modalTitle}>Reorder cake</h2>
              <IconButton aria-label="Close" variant="ghost" size="small" onClick={onClose}>
                <X style={{ width: 20, height: 20 }} />
              </IconButton>
            </div>
            <div className={styles.checkInBody}>
              <div className={styles.detailCard}>
                <img src="/illustrations/spot-illustration/CakesCustom.svg" alt="" aria-hidden="true" width={56} height={56} />
                <div className={styles.detailInfo}>
                  <p className={styles.detailHeading}>{cakeType || 'Custom Cake'}</p>
                  {orderRef && <p className={styles.detailSub}>Previous: {orderRef}</p>}
                  <p className={styles.detailSub}>8" round, chocolate, white buttercream</p>
                </div>
              </div>
              <p className={styles.checkInNote}>
                Reorder the same cake? Your bakery team will contact you to confirm the pickup date and any decoration details.
              </p>
            </div>
            <div className={styles.modalFooter}>
              <Button variant="secondary" onClick={onClose} UNSAFE_className={styles.halfWidthBtn}>Cancel</Button>
              <Button variant="primary" onClick={() => setReordered(true)} UNSAFE_className={styles.halfWidthBtn}>Reorder</Button>
            </div>
          </>
        )}
      </div>
    </>,
    document.body
  );
}

// ── Exported orchestrator ─────────────────────────────────────────────────────
export interface BakeryModalsProps {
  openModal: BakeryModalType;
  onClose: () => void;
  orderRef?: string;
  cakeType?: string;
  location?: string;
  pickupDate?: string;
}

export function BakeryModals({
  openModal, onClose, orderRef, cakeType, location, pickupDate,
}: BakeryModalsProps) {
  return (
    <>
      <BakeryOrderDetailModal
        open={openModal === 'viewDetails'}
        onClose={onClose}
        orderRef={orderRef}
        cakeType={cakeType}
        location={location}
        pickupDate={pickupDate}
      />
      <PickupModal
        open={openModal === 'pickup'}
        onClose={onClose}
        orderRef={orderRef}
        cakeType={cakeType}
        location={location}
      />
      <ModifyOrderModal
        open={openModal === 'modify'}
        onClose={onClose}
        orderRef={orderRef}
        cakeType={cakeType}
        pickupDate={pickupDate}
      />
      <ReorderModal
        open={openModal === 'reorder'}
        onClose={onClose}
        orderRef={orderRef}
        cakeType={cakeType}
      />
    </>
  );
}
