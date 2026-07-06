import { useEffect, useRef, useState } from 'react';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { Button } from '@/components/ui/Button';
import { Link } from '@/components/ui/Link';
import { CreditCard } from '@/components/icons';
import { Alert } from '@/components/ui/Alert';
import { TextField } from '@/components/ui/TextField';
import styles from './PaymentCarouselSheet.module.css';

export type PaymentCardId = 'visa' | 'mastercard' | 'amex' | 'discover';

export interface PaymentCard {
  id: PaymentCardId;
  brand: string;
  last4: string;
  cardholder: string;
  expiry: string;
  largeImage: string;
  smallIcon: string;
}

export const PAYMENT_CARDS: PaymentCard[] = [
  {
    id: 'visa',
    brand: 'Visa',
    last4: '7725',
    cardholder: 'Emilia Garcia',
    expiry: '12/25',
    largeImage:
      'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fa1a3f9bf79a74205aeb7f9502ad42d9d?format=webp&width=800&height=1200',
    smallIcon:
      'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F238c72ec070b4a08baba337c9404c8bf?format=webp&width=200',
  },
  {
    id: 'mastercard',
    brand: 'Mastercard',
    last4: '1011',
    cardholder: 'Emilia Garcia',
    expiry: '12/25',
    largeImage:
      'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F8003e42c11ca4452a2c7c6c4ccc1bd71?format=webp&width=800&height=1200',
    smallIcon:
      'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F87885bbbf6f542f0be2b9029cbe010d9?format=webp&width=200',
  },
  {
    id: 'amex',
    brand: 'American Express',
    last4: '2222',
    cardholder: 'Emilia Garcia',
    expiry: '12/25',
    largeImage:
      'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fd828941fc3304ed7a8777b902fb84c3d?format=webp&width=800&height=1200',
    smallIcon:
      'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fc773378bed0f42628e0936a56c68b417?format=webp&width=200',
  },
  {
    id: 'discover',
    brand: 'Discover',
    last4: '3335',
    cardholder: 'Emilia Garcia',
    expiry: '12/25',
    largeImage:
      'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Ff323e662e3824425abef6fda5d9166e3?format=webp&width=800&height=1200',
    smallIcon:
      'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fcf5c24c612f843968a4a9b46ed4923d4?format=webp&width=200',
  },
];

export interface PaymentCarouselSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCardId: PaymentCardId;
  onSave: (cardId: PaymentCardId) => void;
  /** Show "Unable to process" badge on the active card and an error alert. */
  methodError?: boolean;
  /** Require the user to enter a CVV; show invalid CVV error. */
  cvvRequired?: boolean;
  /** Show "missing payment method" alert. */
  missingPayment?: boolean;
}

export function PaymentCarouselSheet({
  isOpen,
  onClose,
  selectedCardId,
  onSave,
  methodError = false,
  cvvRequired = false,
  missingPayment = false,
}: PaymentCarouselSheetProps) {
  const [cvvDraft, setCvvDraft] = useState('');
  const cvvInvalid = cvvRequired && cvvDraft.length > 0 && cvvDraft.length < 3;
  const [draftId, setDraftId] = useState<PaymentCardId>(selectedCardId);
  const [activeIndex, setActiveIndex] = useState<number>(
    Math.max(0, PAYMENT_CARDS.findIndex((c) => c.id === selectedCardId)),
  );
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      setDraftId(selectedCardId);
      const idx = Math.max(0, PAYMENT_CARDS.findIndex((c) => c.id === selectedCardId));
      setActiveIndex(idx);
      requestAnimationFrame(() => {
        const slide = slideRefs.current[idx];
        if (slide && trackRef.current) {
          slide.scrollIntoView({ block: 'nearest', inline: 'center' });
        }
      });
    }
  }, [isOpen, selectedCardId]);

  useEffect(() => {
    if (!isOpen) return;
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const trackRect = track.getBoundingClientRect();
      const trackCenter = trackRect.left + trackRect.width / 2;
      let closestIdx = 0;
      let closestDist = Infinity;
      slideRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const dist = Math.abs(cardCenter - trackCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = idx;
        }
      });
      setActiveIndex(closestIdx);
      setDraftId(PAYMENT_CARDS[closestIdx].id);
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, [isOpen]);

  const goToIndex = (idx: number) => {
    setActiveIndex(idx);
    const slide = slideRefs.current[idx];
    if (slide) {
      slide.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    }
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Wallet"
      shouldScaleBackground={false}
      actions={
        <Button
          variant="primary"
          size="medium"
          isFullWidth
          strokeOn
          onClick={() => {
            onSave(draftId);
            onClose();
          }}
        >
          Save
        </Button>
      }
    >
      <div className={styles.sheetBody} data-payment-carousel-sheet>
        {methodError && (
          <Alert variant="error">
            Your payment method can&apos;t be used. Use a different one or check the card number,
            security code and expiration date and try again.
          </Alert>
        )}
        {cvvRequired && (
          <Alert variant="error">Please enter your payment method&apos;s CVV.</Alert>
        )}
        {missingPayment && !methodError && !cvvRequired && (
          <Alert variant="error">Choose a payment method or add a new one.</Alert>
        )}
        <p className={styles.sectionLabel}>Credit &amp; debit cards</p>

        <div className={styles.carouselGroup}>
        {/* Carousel track */}
        <div className={styles.carouselOuter}>
          <div className={styles.carousel} ref={trackRef}>
            {PAYMENT_CARDS.map((card, idx) => {
              const isActive = idx === activeIndex;
              const isSelected = card.id === draftId;
              return (
                <button
                  key={card.id}
                  type="button"
                  ref={(el) => (slideRefs.current[idx] = el)}
                  data-idx={idx}
                  className={`${styles.slide} ${isActive ? styles.slideActive : styles.slideInactive}`}
                  onClick={() => {
                    setDraftId(card.id);
                    setActiveIndex(idx);
                    requestAnimationFrame(() => goToIndex(idx));
                  }}
                  aria-pressed={isSelected}
                  aria-label={`${card.brand} ending in ${card.last4}`}
                >
                  <img
                    src={card.largeImage}
                    alt={card.brand}
                    className={styles.slideBg}
                  />
                  {/* Only show radio — card image already has the text baked in */}
                  <div className={styles.radioOverlay} aria-hidden="true">
                    <span className={styles.radio}>
                      <span
                        className={`${styles.radioInner} ${
                          isSelected ? styles.radioInnerSelected : ''
                        }`}
                      />
                    </span>
                  </div>
                  {methodError && isActive && (
                    <span className={styles.unableBadge} aria-hidden="true">
                      Unable to process
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dot indicators */}
        <div className={styles.dots} role="tablist" aria-label="Payment cards">
          {PAYMENT_CARDS.map((card, idx) => (
            <button
              key={card.id}
              type="button"
              role="tab"
              aria-selected={idx === activeIndex}
              aria-label={`Go to ${card.brand}`}
              className={`${styles.dot} ${idx === activeIndex ? styles.dotActive : ''}`}
              onClick={() => goToIndex(idx)}
            />
          ))}
        </div>
      </div>

        {cvvRequired && (
          <div className={styles.cvvWrap}>
            <p className={styles.cvvLabel}>Please enter the CVV for the card.</p>
            <TextField
              label="CVV"
              size="small"
              value={cvvDraft}
              onChange={(e) => setCvvDraft(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="•••"
              error={cvvInvalid ? 'Invalid CVV' : undefined}
            />
          </div>
        )}

        <Button
          variant="secondary"
          size="medium"
          isFullWidth
          onClick={() => {}}
        >
          <span className={styles.addCardContent}>
            <CreditCard />
            Add credit or debit card
          </span>
        </Button>

        <p className={styles.learnMore}>
          Learn more about <Link href="#" variant="default">payment methods</Link> we accept.
        </p>
      </div>
    </BottomSheet>
  );
}
