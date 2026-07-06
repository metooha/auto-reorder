import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { X } from '@/components/icons/X';
import { Calendar } from '@/components/icons/Calendar';
import { Pencil } from '@/components/icons/Pencil';
import { MagicFill } from '@/components/icons/MagicFill';
import { ChevronRight } from '@/components/icons/ChevronRight';
import styles from './SmartDeliverySheet.module.css';

export interface SmartDeliverySheetProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * "Smart Recurring Deliveries" confirmation bottom sheet shown after
 * the Associate Discount flow Continue press.
 */
export function SmartDeliverySheet({ isOpen, onClose }: SmartDeliverySheetProps) {
  const [isExiting, setIsExiting] = useState(false);
  const portalRef = useRef<HTMLDivElement | null>(null);
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    const el = document.createElement('div');
    el.setAttribute('data-smart-delivery-portal', '');
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

  if (!isOpen || !portalReady || !portalRef.current) return null;

  const overlayClass = [styles.overlay, isExiting ? styles.exiting : '']
    .filter(Boolean)
    .join(' ');

  return createPortal(
    <div
      className={overlayClass}
      role="dialog"
      aria-modal="true"
      aria-label="Smart recurring deliveries"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div className={styles.sheet}>

        {/* Dark arch at top */}
        <div className={styles.sunriseWrap}>
          <svg width="375" height="119" viewBox="0 0 375 119" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMin slice">
            <path d="M375 17.9705V118.437H0V17.9705C56.2425 6.48158 119.974 0 187.5 0C255.026 0 318.758 6.48158 375 17.9705Z" fill="#002E99"/>
          </svg>
        </div>

        {/* Close button */}
        <div className={styles.closeRow}>
          <IconButton
            variant="ghost"
            size="medium"
            shape="rounded"
            aria-label="Close"
            onClick={handleClose}
          >
            <X />
          </IconButton>
        </div>

        {/* Scrollable content */}
        <div className={styles.content}>

          {/* Heading */}
          <h2 className={styles.heading}>
            Get your own delivery day and time with smart recurring deliveries
          </h2>

          {/* Product images */}
          <div className={styles.imagesRow} aria-hidden="true">
            <img
              className={styles.imgLeft}
              src="https://api.builder.io/api/v1/image/assets/TEMP/6281cc0ec358311fec7baaf52da07189dae73fec?width=212"
              alt=""
            />
            <img
              className={styles.imgCenter}
              src="https://api.builder.io/api/v1/image/assets/TEMP/43860c2e249827ed8466fa569244b04e08554b64?width=248"
              alt=""
            />
            <img
              className={styles.imgInner}
              src="https://api.builder.io/api/v1/image/assets/TEMP/dbd72c99729845c8c96d6cb96cb674b31ae98670?width=163"
              alt=""
            />
            <img
              className={styles.imgRight}
              src="https://api.builder.io/api/v1/image/assets/TEMP/f9e3a31a40303878f6b08c810979ed725a0f4fa6?width=192"
              alt=""
            />
          </div>

          {/* Feature card */}
          <div className={styles.featureCard}>
            <div className={styles.featureTop}>
              <div className={styles.featureRow}>
                <div className={styles.featureIcon} aria-hidden="true">
                  <Calendar />
                </div>
                <span className={styles.featureText}>Reminds you 4 days before delivery.</span>
              </div>
              <div className={styles.featureRow}>
                <div className={styles.featureIcon} aria-hidden="true">
                  <Pencil />
                </div>
                <span className={styles.featureText}>Add, edit or skip until 3 hours before.</span>
              </div>
              <div className={styles.featureRow}>
                <div className={styles.featureIcon} aria-hidden="true">
                  <MagicFill />
                </div>
                <span className={styles.featureText}>Uses your history to decide items needed.</span>
              </div>
            </div>
            <button type="button" className={styles.featureBottom} aria-label="Change delivery schedule: Every Friday, 2pm–4pm">
              <div className={styles.featureBottomText}>
                <span className={styles.featureBottomTitle}>Every Friday, 2pm–4pm</span>
                <span className={styles.featureBottomSub}>Recommended for you. Change it anytime.</span>
              </div>
              <ChevronRight className={styles.featureBottomChevron} aria-hidden="true" />
            </button>
          </div>

          {/* CTA */}
          <div className={styles.cta}>
            <Button
              variant="primary"
              size="medium"
              isFullWidth
              strokeOn
              onClick={handleClose}
            >
              Review items you need
            </Button>
          </div>
        </div>

        {/* iOS home bar */}
        <div className={styles.homeIndicator} aria-hidden="true">
          <div className={styles.homeBar} />
        </div>
      </div>
    </div>,
    portalRef.current,
  );
}
