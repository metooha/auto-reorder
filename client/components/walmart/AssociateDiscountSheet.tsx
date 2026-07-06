import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/Button';
import { RadioGroup, Radio } from '@/components/ui/radio-group';
import { TextField } from '@/components/ui/TextField';
import { Link } from '@/components/ui/Link';
import { ChevronDown } from '@/components/icons/ChevronDown';
import { ChevronUp } from '@/components/icons/ChevronUp';
import styles from './AssociateDiscountSheet.module.css';

export interface AssociateDiscountSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue?: () => void;
}

type PromoState = 'collapsed' | 'expanded' | 'applied';

export function AssociateDiscountSheet({ isOpen, onClose, onContinue }: AssociateDiscountSheetProps) {
  const [selected, setSelected] = useState<'yes' | 'no'>('yes');
  const [promoState, setPromoState] = useState<PromoState>('collapsed');
  const [promoCode, setPromoCode] = useState('');
  const [appliedCode, setAppliedCode] = useState('');
  const [isExiting, setIsExiting] = useState(false);
  const portalRef = useRef<HTMLDivElement | null>(null);
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    const el = document.createElement('div');
    el.setAttribute('data-associate-discount-portal', '');
    document.body.appendChild(el);
    portalRef.current = el;
    setPortalReady(true);
    return () => {
      if (portalRef.current) {
        document.body.removeChild(portalRef.current);
        portalRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsExiting(false);
      // Reset promo state on open
      setPromoState('collapsed');
      setPromoCode('');
      setAppliedCode('');
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      onClose();
    }, 220);
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) handleClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, handleClose]);

  const handleTogglePolicy = () => {
    setPromoState((s) => (s === 'collapsed' ? 'expanded' : s === 'expanded' ? 'collapsed' : s));
  };

  const handleApply = () => {
    if (promoCode.trim()) {
      setAppliedCode(promoCode.trim());
      setPromoState('applied');
    }
  };

  const handleRemove = () => {
    setAppliedCode('');
    setPromoCode('');
    setPromoState('expanded');
  };

  if (!isOpen || !portalReady || !portalRef.current) return null;

  const overlayClass = [styles.overlay, isExiting ? styles.exiting : ''].filter(Boolean).join(' ');
  const isExpanded = promoState === 'expanded';
  const isApplied = promoState === 'applied';

  return createPortal(
    <div
      className={overlayClass}
      role="dialog"
      aria-modal="true"
      aria-label="Add your associate discount"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div className={styles.sheet}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Add your associate discount</h2>
          <button type="button" className={styles.closeBtn} onClick={handleClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M11.7803 13.0788L18 19.2985L19.0607 18.2378L12.841 12.0181L19.0607 5.79845L18 4.73779L11.7803 10.9575L5.56066 4.73779L4.5 5.79845L10.7197 12.0181L4.5 18.2378L5.56066 19.2985L11.7803 13.0788Z" fill="currentColor"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Radio options */}
          <RadioGroup
            value={selected}
            onValueChange={(v) => setSelected(v as 'yes' | 'no')}
            className={styles.options}
          >
            <Radio value="yes" label="Yes, use associate discount on eligible items in all orders" />
            <Radio value="no" label="Don't apply associate discount to any orders" />
          </RadioGroup>

          {/* Divider */}
          <hr className={styles.divider} />

          {/* Policy / promo section */}
          {isApplied ? (
            /* Applied state */
            <div className={styles.appliedSection}>
              <div className={styles.appliedRow}>
                <span className={styles.appliedCode}>{appliedCode} promo code</span>
                <button type="button" className={styles.removeBtn} onClick={handleRemove}>
                  Remove
                </button>
              </div>
              <div className={styles.viewDetailsRow}>
                <Link href="#" variant="default">View details</Link>
              </div>
            </div>
          ) : (
            /* Collapsed / Expanded states */
            <>
              <button
                type="button"
                className={styles.policyRow}
                onClick={handleTogglePolicy}
                aria-expanded={isExpanded}
              >
                <span>View discount card policy</span>
                {isExpanded
                  ? <ChevronUp aria-hidden="true" />
                  : <ChevronDown aria-hidden="true" />
                }
              </button>

              {isExpanded && (
                <div className={styles.promoSection}>
                  <div className={styles.promoField}>
                    <TextField
                      label="Promo code"
                      size="small"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleApply(); }}
                      placeholder=""
                    />
                    <Button
                      variant="secondary"
                      size="small"
                      onClick={handleApply}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Divider above footer */}
        <hr className={styles.footerDivider} />

        {/* Footer */}
        <div className={styles.footer}>
          <Button
            variant="primary"
            size="medium"
            isFullWidth
            strokeOn
            onClick={() => {
              handleClose();
              onContinue?.();
            }}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>,
    portalRef.current,
  );
}
