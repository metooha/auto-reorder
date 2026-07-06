import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Check, X, FlashFill } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { IconButton } from '@/components/ui/IconButton';
import { Scrim } from '@/components/ui/Scrim';
import { Tag } from '@/components/ui/Tag';
import styles from './GetItNowModal.module.css';

interface GetItNowModalProps {
  open: boolean;
  onClose: () => void;
  location?: string;
  orderTotal?: string;
}

export function GetItNowModal({ open, onClose, location, orderTotal }: GetItNowModalProps) {
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!open) return;
    setConfirmed(false);
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

  const storeName = location
    ? location.replace(/^.* at /, '')
    : '1213 Trinity Mills Rd, Carrollton, TX';

  return createPortal(
    <>
      <Scrim onClick={onClose} style={{ zIndex: 100 }} />
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="get-it-now-title">

        {confirmed ? (
          /* ── Success state ── */
          <div className={styles.successBody}>
            <div className={styles.closeBtnWrap}>
              <IconButton aria-label="Close" variant="ghost" size="small" onClick={onClose}>
                <X style={{ width: 20, height: 20 }} />
              </IconButton>
            </div>
            <div className={styles.successIcon}>
              <Check style={{ width: 32, height: 32, color: 'var(--ld-semantic-color-text-inverse)' }} />
            </div>
            <h2 className={styles.successTitle}>On its way!</h2>
            <p className={styles.successText}>
              Your order has been switched to express delivery. A driver will pick it up shortly and head your way.
            </p>
            <Button variant="primary" onClick={onClose} UNSAFE_className={styles.fullWidthBtn}>
              Done
            </Button>
          </div>
        ) : (
          /* ── Confirmation state ── */
          <>
            <div className={styles.header}>
              <h2 id="get-it-now-title" className={styles.title}>Get it now</h2>
              <IconButton aria-label="Close" variant="ghost" size="small" onClick={onClose}>
                <X style={{ width: 20, height: 20 }} />
              </IconButton>
            </div>

            <div className={styles.body}>
              {/* Speed badge */}
              <Tag
                variant="primary"
                color="brand"
                leading={<FlashFill style={{ width: 14, height: 14, color: 'var(--ld-semantic-color-feedback-caution)' }} />}
                style={{
                  alignSelf: 'flex-start',
                  background: 'var(--ld-semantic-color-fill-brand-bold)',
                  color: 'var(--ld-semantic-color-text-on-fill-brand-bold)',
                }}
              >
                Express delivery
              </Tag>

              <p className={styles.description}>
                Switch your curbside pickup to express delivery and get your order delivered to your door in as little as <strong>1 hour</strong>.
              </p>

              {/* Details */}
              <div className={styles.detailRows}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>From</span>
                  <span className={styles.detailValue}>{storeName}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Est. arrival</span>
                  <span className={styles.detailValue}>Within 1 hour</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Delivery fee</span>
                  <span className={styles.detailValue}>$9.95</span>
                </div>
                <div className={styles.detailRowTotal}>
                  <span className={styles.detailLabel}>New order total</span>
                  <span className={styles.detailValueBold}>
                    {orderTotal
                      ? `$${(parseFloat(orderTotal.replace('$', '')) + 9.95).toFixed(2)}`
                      : '$94.95'}
                  </span>
                </div>
              </div>

              <p className={styles.disclaimer}>
                By confirming, your order status will update from curbside pickup to express delivery. You'll receive a notification when a driver is assigned.
              </p>
            </div>

            <div className={styles.footer}>
              <ButtonGroup UNSAFE_className={styles.footerGroup}>
                <Button variant="secondary" size="small" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="primary" size="small" onClick={() => setConfirmed(true)}>
                  Confirm — get it now
                </Button>
              </ButtonGroup>
            </div>
          </>
        )}
      </div>
    </>,
    document.body
  );
}
