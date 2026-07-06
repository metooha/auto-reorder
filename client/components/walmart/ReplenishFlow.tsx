import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/Button';
import { CondensedItemTile } from './CondensedItemTile';
import { StepAnimation, STEP_TOTAL_DURATION } from './StepAnimation';
import { NativeStatusBar } from './NativeStatusBar';
import { IOSHomeScreen } from './IOSHomeScreen';
import { DeliveryTracking } from './DeliveryTracking';
import { CartArrow, MagicFill } from '@/components/icons';
import { ChevronLeft } from '@/components/icons/ChevronLeft';
import { ChevronRight } from '@/components/icons/ChevronRight';
import { Calendar } from '@/components/icons/Calendar';
import { Refresh } from '@/components/icons/Refresh';
import { Location } from '@/components/icons/Location';
import { IconButton } from '@/components/ui/IconButton';
import { Checkbox } from '@/components/ui/Checkbox';
import { Link } from '@/components/ui/Link';
import { LinkButton } from '@/components/ui/LinkButton';
import { Alert } from '@/components/ui/Alert';
import { Tag } from '@/components/ui/Tag';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { TextField } from '@/components/ui/TextField';
import { useLayoutSettings } from '@/contexts/LayoutSettingsContext';
import { useWalmartScenario, isErrorActive } from '@/contexts/WalmartScenarioContext';
import { snackbar } from '@/hooks/use-snackbar';
import { AssociateDiscountSheet } from './AssociateDiscountSheet';
import { SmartDeliverySheet } from './SmartDeliverySheet';
import { ViewOrderBottomSheet } from './ViewOrderBottomSheet';
import { PaymentCarouselSheet, PAYMENT_CARDS, type PaymentCardId } from './PaymentCarouselSheet';
import { DriverTipSheet } from './DriverTipSheet';
import { OutOfStockSheet } from './OutOfStockSheet';
import { ExclamationCircle } from '@/components/icons/ExclamationCircle';
import { WALMART_BASKET_ITEMS } from '@/data/walmartBasket';
import styles from './ReplenishFlow.module.css';

// ─── Demo data ────────────────────────────────────────────────────────────────

interface ReplenishItem {
  id: string;
  image: string;
  price: string;
  cents: string;
  tag: string;
  name: string;
  quantity: number;
}

// Mirror the LOC basket so the suggested items in the replenish flow match the
// user's actual basket shown in `ReplenishmentBasket`.
const REPLENISH_ITEMS: ReplenishItem[] = WALMART_BASKET_ITEMS.map((it) => ({
  id: it.id,
  image: it.image,
  price: it.price,
  cents: it.cents,
  tag: it.tag ?? it.unitPrice ?? '',
  name: it.name,
  quantity: it.quantity,
}));

// ─── NeedAnythingElse data ────────────────────────────────────────────────────

interface NeedAnythingCategoryItem {
  image: string;
  price: string;
  cents: string;
  tag: string;
  name?: string;
  lastBought?: string;
  originalPrice?: string;
  lowInStock?: boolean;
}

interface NeedAnythingCategory {
  id: string;
  headline: string;
  bgColor: string;
  headlineColor: string;
  bgImage: string;
  items: NeedAnythingCategoryItem[];
}

const NEED_ANYTHING_CATEGORIES: NeedAnythingCategory[] = [
  {
    id: 'cleaning',
    headline: 'Start spring cleaning early',
    bgColor: 'rgba(190, 230, 205, 0.8)',
    headlineColor: '#0A3D1A',
    bgImage: '',
    items: [
      {
        image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fc4898f852f7943649ef09692a0a725f2?format=webp&width=800&height=1200',
        price: '11', cents: '01', tag: '6 ct',
        name: 'Bounty Essentials Select-A-Size Paper Towels, 6 ct',
        lastBought: 'Last bought Feb 4',
      },
      {
        image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fe78b93f3464646998206565c5f127ca8?format=webp&width=800&height=1200',
        price: '17', cents: '99', tag: '100 loads',
        name: 'Tide Laundry Detergent Liquid with Bleach, 100 loads',
        originalPrice: '$19.94',
        lowInStock: true,
      },
      {
        image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F561b18f6d791459e8ca1eb54ba06282e?format=webp&width=800&height=1200',
        price: '9', cents: '97', tag: '105 ct',
        name: 'Great Value Disinfecting Wipes, 105 ct',
        lastBought: 'Last bought Feb 1',
      },
    ],
  },
  {
    id: 'groceries',
    headline: 'Other groceries you might need',
    bgColor: 'rgba(190, 230, 205, 0.8)',
    headlineColor: '#0A3D1A',
    bgImage: '',
    items: [
      {
        image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fa15cb75189e0433a8216488ded94874b?format=webp&width=800&height=1200',
        price: '0', cents: '60', tag: 'Each',
        name: 'Fresh Hass Avocados, Each',
        lastBought: 'Last bought Feb 2',
      },
      {
        image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fdfededc09f3546199a234b885368a8e9?format=webp&width=800&height=1200',
        price: '2', cents: '14', tag: '12 oz',
        name: 'Marketside Classic Iceberg Salad, 12 oz',
        lastBought: 'Last bought Feb 3',
      },
      {
        image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F470a5f27fde54ed8a748b20eb9ad4e41?format=webp&width=800&height=1200',
        price: '3', cents: '24', tag: '3 lb',
        name: 'Fresh Yellow Onions, 3 lb',
        lastBought: 'Last bought Feb 5',
      },
    ],
  },
  {
    id: 'pet',
    headline: 'Luna might be running low',
    bgColor: 'rgba(220, 200, 170, 0.8)',
    headlineColor: '#3D2A0A',
    bgImage: '',
    items: [
      {
        image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F55182c4f52c349cb8ea33d2889645e00?format=webp&width=800&height=1200',
        price: '13', cents: '97', tag: '15 lb',
        name: 'Pure Balance Chicken & Brown Rice Recipe Dry Dog Food, 15 lb',
        lastBought: 'Last bought Jan 22',
      },
      {
        image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F1990c19807814f649684462af7abb59b?format=webp&width=800&height=1200',
        price: '7', cents: '65', tag: '5 oz',
        name: 'Pet Treats, 5 oz',
        lastBought: 'Last bought Jan 28',
      },
    ],
  },
];

type ReplenishScreen = 'loading' | 'overview' | 'edit' | 'needAnythingElse' | 'deliveryDetails';
type NaTransition = 'idle' | 'entering' | 'exiting';

// ─── Sub-components ────────────────────────────────────────────────────────────

interface ReplenishHeaderProps {
  onClose: () => void;
}

function ReplenishHeader({ onClose }: ReplenishHeaderProps) {
  return (
    <div className={styles.headerWrap}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <div className={styles.headerTitle}>
            <MagicFill className={styles.headerMagicIcon} />
            Review items for this week
          </div>
          <div className={styles.headerSubtitle}>
            Items can change in each delivery. We use your history to determine which items you need most.
          </div>
        </div>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
          type="button"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.85355 8.72082L12 12.8673L12.7071 12.1602L8.56066 8.01371L12.7071 3.86726L12 3.16016L7.85355 7.3066L3.70711 3.16016L3 3.86726L7.14645 8.01371L3 12.1602L3.70711 12.8673L7.85355 8.72082Z"
              fill="#2E2F32"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}


// ─── Loading Screen ───────────────────────────────────────────────────────────

function LoadingScreen() {
  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <div className={styles.headerTitle}>Get your own delivery day and time with smart recurring deliveries</div>
          <div className={styles.headerSubtitle}>
            Get it by <span>Friday, 4pm</span>
          </div>
        </div>
      </div>

      <div className={styles.screenContent}>
        <div className={styles.productCard}>
          <div className={styles.condensedGrid}>
            {REPLENISH_ITEMS.map((item) => (
              <CondensedItemTile
                key={item.id}
                image={item.image}
                price={item.price}
                cents={item.cents}
                tag={item.tag}
                variant="tertiary"
                loading
              />
            ))}
          </div>

          <div className={styles.stepAnimationWrap}>
            <StepAnimation />
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.skeletonPill}>
            <div className={styles.skeletonBar} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Screen (Overview + Edit unified with animation) ─────────────────────

interface MainScreenProps {
  items: ReplenishItem[];
  quantityOverrides?: Record<string, number>;
  onQuantityChange?: (id: string, qty: number) => void;
  onClose: () => void;
  onContinue: () => void;
  onViewOtherItems: () => void;
}

function MainScreen({ items, quantityOverrides = {}, onQuantityChange, onClose, onContinue, onViewOtherItems }: MainScreenProps) {

  const effectiveItems = items.map((item) => ({
    ...item,
    quantity: quantityOverrides[item.id] !== undefined ? quantityOverrides[item.id] : item.quantity,
  })).filter((item) => item.quantity > 0);

  const total = effectiveItems.reduce(
    (sum, item) => sum + (parseInt(item.price) * 100 + parseInt(item.cents)) * item.quantity,
    0
  );
  const totalQty = effectiveItems.reduce((sum, item) => sum + item.quantity, 0);
  const dollars = Math.floor(total / 100);
  const centsStr = (total % 100).toString().padStart(2, '0');

  return (
    <div className={styles.section}>
      <ReplenishHeader onClose={onClose} />

      <div className={styles.screenContent}>
        <div className={styles.productCard}>
          <div className={styles.cardScroll}>
            <div className={styles.deliveryBanner}>
              <CartArrow className={styles.deliveryBannerIcon} aria-hidden="true" />
              <span className={styles.deliveryBannerText}>You'll have more time to add or edit later.</span>
            </div>
            <div className={styles.condensedGrid}>
              {effectiveItems.map((item, idx) => (
                <CondensedItemTile
                  key={item.id}
                  image={item.image}
                  price={item.price}
                  cents={item.cents}
                  tag={item.tag}
                  name={item.name}
                  variant="tertiary"
                  quantity={item.quantity}
                  itemIndex={idx}
                  onAddToCart={(q) => onQuantityChange?.(item.id, q)}
                />
              ))}
            </div>
          </div>
          <div className={styles.cardScrollFade} />
        </div>

        <div className={styles.viewOtherItemsSection}>
          <button type="button" className={styles.viewOtherItemsRow} onClick={onViewOtherItems}>
            <span className={styles.viewOtherItemsLabel}>View other items you might need</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M17.751 12.5648L8.53762 20.9995L7.5 19.869L16.096 11.9995L7.5 4.13L8.53762 2.99951L17.751 11.4343C17.9097 11.5795 18 11.7846 18 11.9995C18 12.2144 17.9097 12.4195 17.751 12.5648Z" fill="currentColor"/>
            </svg>
          </button>
        </div>

        <div className={styles.footerArea}>
          <div className={styles.footer}>
            <div className={styles.footerBar}>
              <div className={styles.footerSummaryRow}>
                <span className={styles.footerItemCount}>{totalQty} items</span>
                <span className={styles.footerSubtotal}>Subtotal: ${dollars}.{centsStr}</span>
              </div>
              <div className={styles.footerActions}>
                <Button variant="primary" size="medium" isFullWidth strokeOn onClick={onContinue}>
                  Continue
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Delivery Details Screen ──────────────────────────────────────────────────

interface DeliveryDetailsScreenProps {
  onClose: () => void;
  phoneNumber: string;
  onPhoneNumberChange: (n: string) => void;
  addedItemCount?: number;
  addedItemTotalCents?: number;
  onBack: () => void;
  onStartRecurring: () => void;
  transition?: NaTransition;
  isAssociateDiscountFlow?: boolean;
}

function DeliveryDetailsScreen({ onClose, onBack, onStartRecurring, transition = 'entering', isAssociateDiscountFlow = false, phoneNumber, onPhoneNumberChange, addedItemCount = 0, addedItemTotalCents = 0 }: DeliveryDetailsScreenProps) {
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [textUpdates, setTextUpdates] = useState(true);
  const [showPhoneSheet, setShowPhoneSheet] = useState(false);
  const [phoneDraft, setPhoneDraft] = useState('');
  const [showPrefsSheet, setShowPrefsSheet] = useState(false);
  const [selectedFrequency, setSelectedFrequency] = useState<string>('weekly');
  const FREQ_LABELS: Record<string, string> = {
    weekly: 'Weekly',
    biweekly: 'Every 2 weeks',
    monthly: 'Every 4 weeks',
  };
  const [showPaymentSheet, setShowPaymentSheet] = useState(false);
  const [showTipSheet, setShowTipSheet] = useState(false);
  const [driverTip, setDriverTip] = useState('10%');
  const [selectedCardId, setSelectedCardId] = useState<PaymentCardId>('visa');
  const selectedCard = PAYMENT_CARDS.find((c) => c.id === selectedCardId) ?? PAYMENT_CARDS[0];
  const { prefsMode, errorState, setErrorState } = useWalmartScenario();
  const [inhomeApplied, setInhomeApplied] = useState(prefsMode === 'member-inhome');
  const [showOosSheet, setShowOosSheet] = useState(false);
  const [oosResolved, setOosResolved] = useState(false);
  const slotError = isErrorActive(errorState, 'slot-unavailable');
  const addressError = isErrorActive(errorState, 'missing-address');
  const paymentMissing = isErrorActive(errorState, 'missing-payment');
  const methodError = isErrorActive(errorState, 'method-error');
  const cvvError = isErrorActive(errorState, 'missing-cvv');
  const isMultiple = errorState === 'multiple';
  const oosActive = errorState === 'oos';
  const hasAnyError = slotError || addressError || paymentMissing || methodError || cvvError;
  const termsRef = useRef<HTMLDivElement>(null);

  // ── Summary computations ──
  const OOS_REMOVED = oosResolved ? 1 : 0;
  const OOS_REMOVED_CENTS = oosResolved ? 527 : 0;
  const BASE_ITEM_COUNT = 14 - OOS_REMOVED;
  const BASE_SUBTOTAL_CENTS = 5733 - OOS_REMOVED_CENTS; // $57.33
  const SAVINGS_CENTS = 174; // -$1.74
  const DELIVERY_CENTS = 995;
  const TAX_CENTS = 400;
  const TIP_CENTS = 300;
  const ASSOCIATE_DISCOUNT_CENTS = isAssociateDiscountFlow ? 400 : 0;

  const summaryItemCount = BASE_ITEM_COUNT + addedItemCount;
  const summarySubtotalCents = BASE_SUBTOTAL_CENTS + addedItemTotalCents;
  const afterSavingsCents = summarySubtotalCents - SAVINGS_CENTS;
  const estimatedTotalCents = afterSavingsCents - ASSOCIATE_DISCOUNT_CENTS + DELIVERY_CENTS + TAX_CENTS + TIP_CENTS;
  const adjustedTotalCents = Math.round(estimatedTotalCents * 1.04);

  const fmtMoney = (cents: number) => `$${(cents / 100).toFixed(2)}`;
  const fmtNeg = (cents: number) => `-$${(cents / 100).toFixed(2)}`;

  const formatPhone = (digits: string): string => {
    const d = digits.replace(/\D/g, '').slice(0, 10);
    if (d.length === 0) return '';
    if (d.length <= 3) return `(${d}`;
    if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  };

  const sectionClass = [
    styles.naSection,
    styles.ddSection,
    transition === 'exiting' ? styles.naSectionExiting : '',
  ].filter(Boolean).join(' ');

  return (
    <>
    <div className={sectionClass}>
      {/* Header */}
      <div className={styles.ddHeader}>
        <IconButton
          aria-label="Go back"
          variant="ghost"
          size="medium"
          shape="rounded"
          onClick={onBack}
          UNSAFE_className={styles.naBackBtn}
        >
          <ChevronLeft />
        </IconButton>
        <div className={styles.ddHeaderText}>
          <div className={styles.ddHeaderTitle}>Start recurring deliveries</div>
          <div className={styles.ddHeaderSubtitle}>
            {isAssociateDiscountFlow ? 'Includes your associate discount.' : 'These are your usual settings.'}
          </div>
        </div>
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M7.85355 8.72082L12 12.8673L12.7071 12.1602L8.56066 8.01371L12.7071 3.86726L12 3.16016L7.85355 7.3066L3.70711 3.16016L3 3.86726L7.14645 8.01371L3 12.1602L3.70711 12.8673L7.85355 8.72082Z" fill="#2E2F32" />
          </svg>
        </button>
      </div>

      {/* Scrollable body */}
      <div className={styles.ddBody}>
        {/* Error alert */}
        {hasAnyError && (
          <div className={styles.ddErrorAlert}>
            <Alert variant="error">
              {isMultiple ? (
                <>Fix the errors on the page to continue receiving recurring deliveries.</>
              ) : slotError ? (
                <>
                  Your selected delivery day and time is no longer available. Please select another one.
                  <br />
                  <Link
                    href="#"
                    variant="default"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPrefsSheet(true);
                    }}
                  >
                    Reserve a delivery time
                  </Link>
                </>
              ) : addressError ? (
                <>
                  Your selected delivery address is no longer available. Please select another one.
                  <br />
                  <Link
                    href="#"
                    variant="default"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPrefsSheet(true);
                    }}
                  >
                    Add/choose an address
                  </Link>
                </>
              ) : paymentMissing ? (
                <>
                  Your payment method is missing. Please choose one or add a new one.
                  <br />
                  <Link
                    href="#"
                    variant="default"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPaymentSheet(true);
                    }}
                  >
                    Select or add a payment method
                  </Link>
                </>
              ) : methodError ? (
                <>
                  Your payment method can&apos;t be used. Choose another one for recurring deliveries.
                  <br />
                  <Link
                    href="#"
                    variant="default"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPaymentSheet(true);
                    }}
                  >
                    Select or add a payment method
                  </Link>
                </>
              ) : cvvError ? (
                <>
                  Update your payment info to get recurring deliveries.
                  <br />
                  <Link
                    href="#"
                    variant="default"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPaymentSheet(true);
                    }}
                  >
                    Enter your CVV
                  </Link>
                </>
              ) : null}
            </Alert>
          </div>
        )}

        {oosActive && !oosResolved && (
          <div className={styles.ddErrorAlert}>
            <Alert variant="warning">
              An item in your basket is unavailable.{' '}
              <Link
                href="#"
                variant="default"
                onClick={(e) => {
                  e.preventDefault();
                  setShowOosSheet(true);
                }}
              >
                View
              </Link>
            </Alert>
          </div>
        )}

        {/* Delivery banner */}
        <div className={styles.ddBanner}>
          <CartArrow className={styles.ddBannerIcon} aria-hidden="true" />
          <span className={styles.ddBannerText}>
            Starts an order that you can add or edit until a few hours before delivery.
          </span>
        </div>

        {/* Delivery preferences */}
        <div className={styles.ddCard}>
          <button
            type="button"
            className={styles.ddCardTitleRow}
            onClick={() => setShowPrefsSheet(true)}
            aria-label="Edit delivery preferences"
          >
            <span className={styles.ddCardTitle}>Delivery preferences</span>
            <ChevronRight className={styles.ddChevron} aria-hidden="true" />
          </button>
          <div className={styles.ddPrefRow}>
            <div className={styles.ddPrefRows}>
              <div className={styles.ddPrefItem}>
                {inhomeApplied ? (
                  <svg
                    className={styles.ddInhomeIcon}
                    width="24"
                    height="24"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.498 24.5001H6.99805V19.975L13.998 12.975L20.998 19.975V24.5001H17.498V22.7501C17.498 22.1784 17.3409 21.3598 16.8182 20.6338C16.2313 19.8186 15.2684 19.2501 13.998 19.2501C12.7277 19.2501 11.7648 19.8186 11.1779 20.6338C10.6552 21.3598 10.498 22.1784 10.498 22.7501V24.5001ZM6.12305 26.2501H11.373C11.8563 26.2501 12.248 25.8584 12.248 25.3751V22.7501C12.248 22.1668 12.598 21.0001 13.998 21.0001C15.398 21.0001 15.748 22.1668 15.748 22.7501V25.3751C15.748 25.8584 16.1398 26.2501 16.623 26.2501H21.873C22.3563 26.2501 22.748 25.8584 22.748 25.3751V19.6125C22.748 19.3805 22.6559 19.1579 22.4918 18.9938L14.6168 11.1188C14.2751 10.7771 13.721 10.7771 13.3793 11.1188L5.50433 18.9938C5.34023 19.1579 5.24805 19.3805 5.24805 19.6125V25.3751C5.24805 25.8584 5.6398 26.2501 6.12305 26.2501Z" fill="#0053E2" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.987 1.75C13.0573 1.75 12.319 2.26953 12.319 2.89844L12.8932 9.31055C12.9479 9.69336 13.4265 9.99414 13.987 9.99414C14.5612 9.99414 15.0397 9.69336 15.1081 9.31055L15.6686 2.89844C15.6686 2.26953 14.9304 1.75 13.987 1.75Z" fill="#FFC220" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.22322 7C4.67635 6.68555 3.85603 7.06836 3.39119 7.875C2.91267 8.68164 2.99471 9.58398 3.55525 9.89844L9.37947 12.6191C9.74861 12.7422 10.2408 12.4824 10.5279 11.9902C10.815 11.498 10.7877 10.9375 10.4869 10.6914L5.22322 7Z" fill="#FFC220" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M24.4459 9.89844C24.9927 9.58398 25.0748 8.68164 24.6099 7.875C24.1314 7.06836 23.3111 6.68555 22.7642 7L17.5006 10.6914C17.1998 10.9375 17.1724 11.498 17.4595 11.9902C17.7467 12.4824 18.2388 12.7422 18.608 12.6191L24.4459 9.89844Z" fill="#FFC220" />
                  </svg>
                ) : (
                  <Calendar className={styles.ddPrefIcon} aria-hidden="true" />
                )}
                <div className={styles.ddPrefText}>
                  <span className={styles.ddPrefLabel}>
                    {slotError ? 'Fridays' : 'Every Friday, 2pm\u20134pm'}
                  </span>
                  {slotError ? (
                    <span className={styles.ddPrefError}>
                      <ExclamationCircle width={14} height={14} aria-hidden="true" />
                      Reserve a delivery time
                    </span>
                  ) : (
                    <>
                      {inhomeApplied && (
                        <span className={styles.ddPrefSub}>InHome delivery</span>
                      )}
                      <span className={styles.ddPrefSub}>First delivery: March 20</span>
                    </>
                  )}
                </div>
              </div>
              <div className={styles.ddPrefItem}>
                <Refresh className={styles.ddPrefIcon} aria-hidden="true" />
                <div className={styles.ddPrefText}>
                  <span className={styles.ddPrefLabel}>{FREQ_LABELS[selectedFrequency] ?? 'Weekly'}</span>
                  <span className={styles.ddPrefSub}>Some items may change based on history.</span>
                </div>
              </div>
              <div className={styles.ddPrefItem}>
                <Location className={styles.ddPrefIcon} aria-hidden="true" />
                <div className={styles.ddPrefText}>
                  {addressError ? (
                    <>
                      <span className={styles.ddPrefLabel}>Missing address</span>
                      <span className={styles.ddPrefError}>
                        <ExclamationCircle width={14} height={14} aria-hidden="true" />
                        Add a delivery address
                      </span>
                    </>
                  ) : (
                    <span className={styles.ddPrefLabel}>3743 Park Lane, Dallas, TX</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment settings */}
        <div className={styles.ddCard}>
          <div className={styles.ddCardTitle}>Payment settings</div>
          <button
            type="button"
            className={styles.ddPayRow}
            onClick={() => setShowPaymentSheet(true)}
            aria-label="Change payment method"
          >
            <div className={styles.ddPayLeft}>
              {paymentMissing ? (
                <>
                  <span className={styles.ddPayCardLabel}>Add a payment method</span>
                  <span className={styles.ddPrefError}>
                    <ExclamationCircle width={14} height={14} aria-hidden="true" />
                    Missing payment method
                  </span>
                </>
              ) : (
                <>
                  <div className={styles.ddPayCard}>
                    <img
                      className={styles.ddVisaLogo}
                      src={selectedCard.smallIcon}
                      alt={selectedCard.brand}
                    />
                    <span className={styles.ddPayCardLabel}>Ending in {selectedCard.last4}</span>
                  </div>
                  {methodError ? (
                    <span className={styles.ddPrefError}>
                      <ExclamationCircle width={14} height={14} aria-hidden="true" />
                      Update payment method
                    </span>
                  ) : cvvError ? (
                    <span className={styles.ddPrefError}>
                      <ExclamationCircle width={14} height={14} aria-hidden="true" />
                      Update payment info to get recurring deliveries
                    </span>
                  ) : (
                    <span className={styles.ddPaySub}>
                      If this doesn&apos;t work, we&apos;ll charge another on file.
                    </span>
                  )}
                </>
              )}
            </div>
            <ChevronRight className={styles.ddChevron} aria-hidden="true" />
          </button>
          <div className={styles.ddDivider} />
          {inhomeApplied ? (
            <button type="button" className={styles.ddPayRow}>
              <div className={styles.ddPayLeft}>
                <div className={styles.ddPayCard}>
                  <svg
                    className={styles.ddInhomeIcon}
                    width="24"
                    height="24"
                    viewBox="0 0 34 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M11.9975 6.77372C11.6949 6.21788 11.8907 5.52212 12.4388 5.20568C12.9947 4.88469 13.7056 5.07325 14.0293 5.6276L19.1527 14.3999C19.2393 14.5481 19.4293 14.5985 19.5779 14.5127C19.7239 14.4284 19.7764 14.2433 19.6965 14.0949L15.8419 6.93464C15.5402 6.37417 15.7386 5.67538 16.2898 5.35712C16.8482 5.03477 17.5619 5.22147 17.8909 5.77592L22.2678 13.1528L23.6876 15.013C23.8152 15.1802 24.0824 15.1066 24.1084 14.8979C24.2995 13.3674 24.5713 11.8549 24.9467 11.0676C25.8842 9.1014 27.27 10.0717 27.27 10.0717L27.27 20.7935C27.3803 22.2935 26.6563 23.8116 25.2424 24.6279L20.8694 27.1527C18.9199 28.2782 16.4271 27.6103 15.3015 25.6607L11.5434 19.1514L11.5459 19.15L8.61844 13.4032C8.38247 12.94 8.55041 12.3731 9.00063 12.1131C9.46085 11.8474 10.049 11.9981 10.3248 12.4524L13.4626 17.6214C13.568 17.7951 13.7929 17.8527 13.9688 17.7511C14.1452 17.6492 14.2075 17.4248 14.1088 17.2465L10.2005 10.1911C9.89333 9.6366 10.0871 8.93828 10.636 8.62135C11.1873 8.30308 11.892 8.48745 12.2168 9.0349L16.3667 16.0304C16.449 16.1692 16.6277 16.216 16.7675 16.1353C16.9059 16.0554 16.9554 15.8796 16.8789 15.7392L11.9975 6.77372Z" fill="#E6A31D" />
                    <path d="M22.8138 15.6369C22.8138 15.6369 20.4207 16.0888 19.4304 18.239C18.44 20.3892 20.1902 22.9679 20.1902 22.9679" stroke="#F8E6A5" strokeWidth="0.466616" strokeLinecap="round" />
                    <path d="M6.71349 16.7524C6.71349 16.7524 6.86558 18.416 8.18443 20.2173C9.50328 22.0186 11.0433 22.6661 11.0433 22.6661" stroke="#041E42" strokeWidth="0.75" strokeLinecap="round" />
                    <path d="M4.71995 19.5441C4.71995 19.5441 4.83294 20.7745 5.80862 22.1071C6.78429 23.4397 7.92312 23.9191 7.92312 23.9191" stroke="#041E42" strokeWidth="0.75" strokeLinecap="round" />
                    <path d="M20.2032 3.91896C20.2032 3.91896 21.5679 4.8825 22.4685 6.9253C23.369 8.96811 23.1598 10.6255 23.1598 10.6255" stroke="#041E42" strokeWidth="0.75" strokeLinecap="round" />
                    <path d="M23.4395 3.67879C23.4395 3.67879 24.3759 4.48483 24.895 6.05274C25.4141 7.62064 25.1435 8.82626 25.1435 8.82626" stroke="#041E42" strokeWidth="0.75" strokeLinecap="round" />
                  </svg>
                  <span className={styles.ddPayCardLabel}>InHome — Tip free delivery</span>
                </div>
              </div>
              <ChevronRight className={styles.ddChevron} aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              className={styles.ddPayRow}
              onClick={() => setShowTipSheet(true)}
              aria-label="Edit driver tip"
            >
              <div className={styles.ddPayLeft}>
                <div className={styles.ddPayCard}>
                  <span className={styles.ddTipEmoji} aria-hidden="true">👋</span>
                  <span className={styles.ddPayCardLabel}>Driver tip: {driverTip}</span>
                </div>
                <span className={styles.ddPaySub}>Charged each delivery—edit or remove anytime.</span>
              </div>
              <ChevronRight className={styles.ddChevron} aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Terms & conditions */}
        <div className={styles.ddCard}>
          <div className={styles.ddCardTitle}>Terms &amp; conditions</div>
          <p className={styles.ddTermsBody}>
            By selecting &ldquo;I agree&rdquo; you agree to receive orders that are automatically fulfilled
            and delivered on a recurring basis, at the chosen frequency on your scheduled day and time.
            Your payment method will be charged at delivery. If your payment method is ineligible,
            we&apos;ll charge any on file. Unless you add or edit the order, the total of an order won&apos;t
            exceed $100, excluding driver tip, taxes and fees.
          </p>
          <p className={styles.ddTermsBody}>
            To avoid charges, at least 3 hours before delivery, in your account, tap the upcoming order,
            click Need to make a change &gt; Cancel order. Applicable delivery fees are non-refundable;
            item refunds use Walmart&apos;s return policy. To cancel future orders, go to Account &gt; Recurring deliveries.
          </p>
          <Link href="#" variant="default">Learn more</Link>
          <div ref={termsRef}>
            {termsError && (
              <div className={styles.ddTermsErrorBanner}>
                <Alert variant="error">
                  Please check the box to continue.
                </Alert>
              </div>
            )}
            <div className={styles.ddTermsCheck}>
              <Checkbox
                id="dd-terms"
                label="I agree to the terms (required)"
                checked={termsAgreed}
                onCheckedChange={(checked) => {
                  const val = checked === true;
                  setTermsAgreed(val);
                  if (val) setTermsError(false);
                }}
              />
            </div>
          </div>
        </div>

        {/* Text updates */}
        <div className={styles.ddCard}>
          <div className={styles.ddCardTitle}>Get text updates</div>
          <div className={styles.ddCardSubtitle}>We&apos;ll notify you 4 days before delivery</div>
          <div
            className={[
              styles.ddTextRow,
              phoneNumber !== '5678' ? styles.ddTextRowChanged : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <Checkbox
              id="dd-text"
              label={`Send to (xxx) xxx-${phoneNumber}`}
              checked={textUpdates}
              onCheckedChange={(checked) => setTextUpdates(checked === true)}
            />
            <LinkButton
              size="small"
              color="default"
              onClick={() => {
                setPhoneDraft('');
                setShowPhoneSheet(true);
              }}
            >
              Change
            </LinkButton>
          </div>
          <p className={styles.ddLegal}>
            If you uncheck the box above, you acknowledge that you&apos;re only opting out of text updates
            for this order, unless you save the preference. Number and frequency of automated texts may vary
            based on your order. Consent not required for purchase. Message and data rates may apply. By
            continuing, you agree to our{' '}
            <Link href="#" variant="subtle">Mobile Alert Terms</Link>.
          </p>
        </div>

        {/* Order summary */}
        <div className={styles.ddSummaryCard}>
          <div className={styles.ddSummaryRow}>
            <span className={styles.ddSummaryLabel}><strong>Subtotal</strong> ({summaryItemCount} items)</span>
            <span className={isAssociateDiscountFlow ? styles.ddSummaryStrike : styles.ddSummaryValue}>{fmtMoney(summarySubtotalCents)}</span>
          </div>
          <div className={styles.ddSummaryRow}>
            <span className={styles.ddSummaryLabel}>Savings</span>
            <Tag variant="tertiary" color="positive">{fmtNeg(SAVINGS_CENTS)}</Tag>
          </div>
          <div className={[styles.ddSummaryRow, styles.ddSummarySubtotalRow].join(' ')}>
            <span />
            <span className={styles.ddSummarySubtotal}>{fmtMoney(afterSavingsCents)}</span>
          </div>
          <div className={styles.ddDivider} />
          {isAssociateDiscountFlow && (
            <>
              <div className={styles.ddSummaryRow}>
                <span className={styles.ddSummaryLabel}>Associate discount</span>
                <span className={styles.ddSummarySavings}>{fmtNeg(ASSOCIATE_DISCOUNT_CENTS)}</span>
              </div>
              <div className={styles.ddDivider} />
            </>
          )}
          <div className={styles.ddSummaryRow}>
            <span className={styles.ddSummaryLabel}>Delivery from store</span>
            <span className={styles.ddSummaryValue}>{fmtMoney(DELIVERY_CENTS)}</span>
          </div>
          <div className={styles.ddSummaryRow}>
            <span className={styles.ddSummaryLabel}>Estimated taxes</span>
            <span className={styles.ddSummaryValue}>{fmtMoney(TAX_CENTS)}</span>
          </div>
          <div className={styles.ddDivider} />
          <div className={styles.ddSummaryRow}>
            <div>
              <div className={styles.ddSummaryLabel}>Driver tip</div>
              <div className={styles.ddSummaryMeta}>(charged separately after delivery)</div>
            </div>
            <span className={styles.ddSummaryValue}>{fmtMoney(TIP_CENTS)}</span>
          </div>
          <div className={styles.ddDivider} />
          <div className={[styles.ddSummaryRow, styles.ddSummaryTotalRow].join(' ')}>
            <span className={styles.ddSummaryTotal}>Estimated total</span>
            <span className={styles.ddSummaryTotal}>{fmtMoney(estimatedTotalCents)}</span>
          </div>
          <div className={styles.ddDivider} />
          <div className={styles.ddSummaryRow}>
            <span className={styles.ddSummaryLabel}>Temporary adjusted total</span>
            <div className={styles.ddInfoRow}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-label="Info">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 7v5M8 5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className={styles.ddSummaryValue}>{fmtMoney(adjustedTotalCents)}</span>
            </div>
          </div>
          <p className={styles.ddAdjustedNote}>
            This covers adjustments to your final order total for items that are priced by weight or
            potentially substituted, and state bag fees where applicable. After your final order total is
            confirmed, <strong>we&apos;ll refund any amount that&apos;s left over</strong>.
          </p>
          <p className={styles.ddAdjustedNote}>
            If needed, your credit or debit card will be used to cover any cost differences that may
            exceed the adjustment charge amount.
          </p>
        </div>
      </div>

    </div>

      {/* Sticky footer — rendered outside the animated section so it stays in place */}
      <div className={styles.ddFooter} data-replenish-floating-footer>
        <div className={styles.ddFooterBar}>
          <Button
            variant="primary"
            size="medium"
            isFullWidth
            strokeOn
            onClick={() => {
              if (!termsAgreed) {
                setTermsError(true);
                termsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
              }
              onStartRecurring();
            }}
          >
            Start recurring deliveries
          </Button>
          <p className={styles.ddFooterLegal}>
            You&apos;ll only be charged when you receive the items. By starting recurring deliveries, you
            are placing this order and confirming you agree to our{' '}
            <Link href="#" variant="default">Privacy Policy</Link> and{' '}
            <Link href="#" variant="default">Terms of Use</Link>.
          </p>
        </div>
      </div>

      <ViewOrderBottomSheet
        isOpen={showPrefsSheet}
        onClose={() => setShowPrefsSheet(false)}
        initialView="schedule"
        selectedFrequency={selectedFrequency}
        onFrequencyChange={setSelectedFrequency}
        customerName="Emilia Garcia"
        customerAddress="3743 Park Ln, Dallas, TX 75220"
        deliveryDay="Friday"
        deliveryTime="2pm"
        showSlotError={slotError}
        onSlotChanged={() => {
          if (errorState === 'slot-unavailable') setErrorState('none');
        }}
        onSaved={() => {
          setInhomeApplied(prefsMode === 'member-inhome');
          snackbar({
            message: 'Your preferences have been updated.',
            position: 'bottom-center',
            duration: 4000,
          });
        }}
      />

      <BottomSheet
        isOpen={showPhoneSheet}
        onClose={() => setShowPhoneSheet(false)}
        title="Change phone number"
        actions={
          <Button
            variant="primary"
            size="medium"
            isFullWidth
            strokeOn
            onClick={() => {
              const digits = phoneDraft.replace(/\D/g, '');
              if (digits.length >= 4) {
                onPhoneNumberChange(digits.slice(-4));
              }
              setShowPhoneSheet(false);
            }}
          >
            Save
          </Button>
        }
      >
        <p className={styles.ddSheetBody}>
          We&apos;ll send delivery updates to this phone number.
        </p>
        <TextField
          label="Phone number"
          type="tel"
          value={formatPhone(phoneDraft)}
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
            setPhoneDraft(digits);
          }}
          placeholder="(555) 555-1234"
        />
      </BottomSheet>

      <PaymentCarouselSheet
        isOpen={showPaymentSheet}
        onClose={() => setShowPaymentSheet(false)}
        selectedCardId={selectedCardId}
        methodError={methodError}
        cvvRequired={cvvError}
        missingPayment={paymentMissing}
        onSave={(id) => {
          setSelectedCardId(id);
          const card = PAYMENT_CARDS.find((c) => c.id === id);
          snackbar({
            message: `Payment updated to ${card?.brand} ending in ${card?.last4}.`,
            position: 'bottom-center',
            duration: 4000,
          });
        }}
      />

      <OutOfStockSheet
        isOpen={showOosSheet}
        onClose={() => {
          setShowOosSheet(false);
          setOosResolved(true);
        }}
      />

      <DriverTipSheet
        isOpen={showTipSheet}
        onClose={() => setShowTipSheet(false)}
        initialTip={driverTip}
        onSave={(tip) => {
          setDriverTip(tip);
          snackbar({
            message: `Driver tip updated to ${tip}.`,
            position: 'bottom-center',
            duration: 4000,
          });
        }}
      />
    </>
  );
}

// ─── Need Anything Else Screen (Smart Recurring Deliveries Opt-in) ───────────

interface NeedAnythingCommittedItem {
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

interface NeedAnythingElseScreenProps {
  onClose: () => void;
  onContinue?: () => void;
  transition?: NaTransition;
  onAddedTotalsChange?: (count: number, totalCents: number) => void;
  onItemsCommitted?: (items: NeedAnythingCommittedItem[]) => void;
  baseItemCount?: number;
  baseTotalCents?: number;
}

function NeedAnythingElseScreen({ onClose, onContinue, transition = 'entering', onAddedTotalsChange, onItemsCommitted, baseItemCount, baseTotalCents }: NeedAnythingElseScreenProps) {
  const sectionClass = [
    styles.naSection,
    styles.naSectionPage,
    transition === 'exiting' ? styles.naSectionExiting : '',
  ].filter(Boolean).join(' ');

  // Baseline — use values passed from the main review screen, falling back to REPLENISH_ITEMS data
  const BASE_ITEM_COUNT = baseItemCount ?? REPLENISH_ITEMS.reduce((s, i) => s + i.quantity, 0);
  const BASE_TOTAL_CENTS = baseTotalCents ?? REPLENISH_ITEMS.reduce(
    (s, i) => s + (parseInt(i.price) * 100 + parseInt(i.cents)) * i.quantity, 0
  );

  // Track per-tile quantities by `${catId}-${itemIndex}` key
  const [addedQuantities, setAddedQuantities] = useState<Record<string, number>>({});

  // Compute added totals
  const addedItemCount = Object.values(addedQuantities).reduce((sum, q) => sum + q, 0);
  const addedTotalCents = NEED_ANYTHING_CATEGORIES.reduce((sum, cat) => {
    return cat.items.reduce((s, item, idx) => {
      const q = addedQuantities[`${cat.id}-${idx}`] ?? 0;
      const cents = parseInt(item.price, 10) * 100 + parseInt(item.cents, 10);
      return s + cents * q;
    }, sum);
  }, 0);

  // Notify parent when totals change
  useEffect(() => {
    onAddedTotalsChange?.(addedItemCount, addedTotalCents);
  }, [addedItemCount, addedTotalCents, onAddedTotalsChange]);

  const commitItems = () => {
    const items: NeedAnythingCommittedItem[] = [];
    NEED_ANYTHING_CATEGORIES.forEach((cat) => {
      cat.items.forEach((item, idx) => {
        const q = addedQuantities[`${cat.id}-${idx}`] ?? 0;
        if (q > 0) {
          items.push({
            id: `na-${cat.id}-${idx}`,
            image: item.image,
            name: item.name ?? item.tag,
            price: parseInt(item.price, 10) + parseInt(item.cents, 10) / 100,
            quantity: q,
          });
        }
      });
    });
    onItemsCommitted?.(items);
  };

  const totalItems = BASE_ITEM_COUNT + addedItemCount;
  const totalCents = BASE_TOTAL_CENTS + addedTotalCents;
  const subtotalDollars = Math.floor(totalCents / 100);
  const subtotalCents = (totalCents % 100).toString().padStart(2, '0');

  return (
    <div className={sectionClass}>
      {/* Header — back button on left */}
      <div className={styles.naPageHeader}>
        <IconButton
          aria-label="Go back"
          variant="ghost"
          size="medium"
          shape="rounded"
          onClick={() => { commitItems(); onClose(); }}
          UNSAFE_className={styles.naBackBtn}
        >
          <ChevronLeft />
        </IconButton>
        <div className={styles.naPageHeaderText}>
          <div className={styles.naPageTitle}>Want to get these this week?</div>
          <div className={styles.naPageSubtitle}>
            Based on what you usually buy and how often.
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className={styles.naPageContent}>
        <div className={styles.naGroupCard}>
        {NEED_ANYTHING_CATEGORIES.map((cat) => (
          <section key={cat.id} className={styles.naCategory}>
            <h3 className={styles.naCategoryTitle}>{cat.headline}</h3>
            <div className={styles.naCategoryScroll}>
              {cat.items.map((item, i) => (
                <div className={styles.naCategoryItem} key={i}>
                  <CondensedItemTile
                    image={item.image}
                    price={item.price}
                    cents={item.cents}
                    name={item.name}
                    variant="primary"
                    onAddToCart={(count) => {
                      setAddedQuantities((prev) => ({ ...prev, [`${cat.id}-${i}`]: count }));
                    }}
                  />
                  {item.originalPrice && (
                    <div className={styles.naOriginalPrice}>{item.originalPrice}</div>
                  )}
                  {item.lastBought && (
                    <div className={styles.naLastBought}>{item.lastBought}</div>
                  )}
                  {item.lowInStock && (
                    <div className={styles.naLowStock}>Low in stock</div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
        </div>
      </div>

      {/* Footer */}
      <div className={styles.naPageFooterArea}>
        <div className={styles.footer}>
          <div className={styles.footerBar}>
            <div className={styles.footerSummaryRow}>
              <span className={styles.footerItemCount}>{totalItems} items</span>
              <span className={styles.footerSubtotal}>
                Subtotal: ${subtotalDollars}.{subtotalCents}
              </span>
            </div>
            <div className={styles.footerActions}>
              <Button
                variant="primary"
                size="medium"
                isFullWidth
                strokeOn
                onClick={() => { commitItems(); onContinue ? onContinue() : onClose(); }}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main ReplenishFlow ────────────────────────────────────────────────────────

interface ReplenishFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onFlowComplete?: () => void;
  /** Open directly to a specific screen. Defaults to 'overview'. */
  initialScreen?: ReplenishScreen;
}

export function ReplenishFlow({ isOpen, onClose, onFlowComplete, initialScreen = 'overview' }: ReplenishFlowProps) {
  const [screen, setScreen] = useState<ReplenishScreen>(initialScreen);
  const [isExiting, setIsExiting] = useState(false);
  const [naTransition, setNaTransition] = useState<NaTransition>('idle');
  const [items, setItems] = useState<ReplenishItem[]>(REPLENISH_ITEMS);
  const [quantityOverrides, setQuantityOverrides] = useState<Record<string, number>>({});

  const effectiveBaseItems = items.map((item) => ({
    ...item,
    quantity: quantityOverrides[item.id] !== undefined ? quantityOverrides[item.id] : item.quantity,
  })).filter((item) => item.quantity > 0);
  const baseTotalQty = effectiveBaseItems.reduce((s, i) => s + i.quantity, 0);
  const baseTotalCents = effectiveBaseItems.reduce(
    (s, i) => s + (parseInt(i.price) * 100 + parseInt(i.cents)) * i.quantity, 0
  );
  const [showIOSHome, setShowIOSHome] = useState(false);
  const [showDeliveryTracking, setShowDeliveryTracking] = useState(false);
  const [showAssociateDiscount, setShowAssociateDiscount] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('5678');
  const [addedItemCount, setAddedItemCount] = useState(0);
  const [addedItemTotalCents, setAddedItemTotalCents] = useState(0);
  const { scenario, setDeliveryItemQuantity } = useWalmartScenario();
  const loadingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragStartY = useRef<number | null>(null);
  const portalContainerRef = useRef<HTMLDivElement | null>(null);
  const [portalReady, setPortalReady] = useState(false);

  // Create a stable, dedicated portal container so React always owns
  // a single DOM node — avoids `removeChild` reconciliation errors
  // that occur when portaling directly into document.body.
  useEffect(() => {
    const el = document.createElement('div');
    el.setAttribute('data-replenish-portal', '');
    document.body.appendChild(el);
    portalContainerRef.current = el;
    setPortalReady(true);
    return () => {
      document.body.removeChild(el);
      portalContainerRef.current = null;
    };
  }, []);
  const { platform } = useLayoutSettings();
  const isNative = platform === 'ios' || platform === 'android';

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setScreen(initialScreen);
      setIsExiting(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, initialScreen]);

  useEffect(() => {
    if (screen !== 'loading') return;
    loadingTimerRef.current = setTimeout(() => {
      setScreen('overview');
    }, STEP_TOTAL_DURATION);
    return () => {
      if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
    };
  }, [screen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      onClose();
    }, 250);
  }, [onClose]);

  // Drag-up gesture on the home indicator to show iOS Home Screen
  const handleIndicatorPointerDown = useCallback((e: React.PointerEvent) => {
    dragStartY.current = e.clientY;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handleIndicatorPointerMove = useCallback((e: React.PointerEvent) => {
    if (dragStartY.current === null) return;
    const delta = dragStartY.current - e.clientY;
    if (delta > 60) {
      dragStartY.current = null;
      // Exit ReplenishFlow and show iOS Home Screen
      setIsExiting(true);
      setTimeout(() => {
        setIsExiting(false);
        setShowIOSHome(true);
      }, 250);
    }
  }, []);

  const handleIndicatorPointerUp = useCallback(() => {
    dragStartY.current = null;
  }, []);

  // NeedAnythingElse close → slide back right then return to overview
  const handleNeedAnythingClose = useCallback(() => {
    setNaTransition('exiting');
    setTimeout(() => {
      setNaTransition('idle');
      setScreen('overview');
    }, 320);
  }, []);

  // Navigate to NeedAnythingElse with slide-in animation
  const handleViewOtherItems = useCallback(() => {
    setNaTransition('entering');
    setScreen('needAnythingElse');
  }, []);

  // From NeedAnythingElse "Continue" → go to Start recurring deliveries
  const handleNeedAnythingContinue = useCallback(() => {
    setNaTransition('entering');
    setScreen('deliveryDetails');
  }, []);

  // Continue → AssociateDiscountSheet (associate-discount) or directly to Delivery Details
  const handleContinue = useCallback(() => {
    if (scenario === 'associate-discount') {
      setShowAssociateDiscount(true);
    } else {
      setNaTransition('entering');
      setScreen('deliveryDetails');
    }
  }, [scenario]);

  // Delivery Details back → overview
  const handleDeliveryDetailsBack = useCallback(() => {
    setNaTransition('exiting');
    setTimeout(() => {
      setNaTransition('idle');
      setScreen('overview');
    }, 320);
  }, []);

  const handleStartRecurring = useCallback(() => {
    onFlowComplete?.();
    handleClose();
  }, [onFlowComplete, handleClose]);

  const handleAssociateDiscountClose = useCallback(() => {
    setShowAssociateDiscount(false);
  }, []);

  const handleAssociateDiscountContinue = useCallback(() => {
    setShowAssociateDiscount(false);
    setNaTransition('entering');
    setScreen('deliveryDetails');
  }, []);

  const handleNotificationTap = useCallback(() => {
    setShowDeliveryTracking(true);
  }, []);

  const handleCloseDeliveryTracking = useCallback(() => {
    setShowDeliveryTracking(false);
  }, []);

  const handleCloseIOSHome = useCallback(() => {
    setShowIOSHome(false);
    setShowDeliveryTracking(false);
    onClose();
    onFlowComplete?.();
  }, [onClose, onFlowComplete]);

  if (!isOpen && !showIOSHome && !showDeliveryTracking) return null;

  const overlayClass = [styles.overlay, isExiting ? styles.exiting : ''].filter(Boolean).join(' ');

  const showOverlay = isOpen && !showIOSHome;

  const overlayPortal = (showOverlay && portalReady && portalContainerRef.current) ? createPortal(
    <div
      className={overlayClass}
      role="dialog"
      aria-modal="true"
      aria-label="Your replenishment basket"
    >
      {isNative && (
        <div className={styles.statusBarWrap}>
          <NativeStatusBar
            platform={platform as 'ios' | 'android'}
            color="var(--ld-semantic-color-text, #2E2F32)"
          />
        </div>
      )}

      {screen === 'loading' && <LoadingScreen />}

      {(screen === 'overview' || screen === 'edit') && (
        <MainScreen
          items={items}
          quantityOverrides={quantityOverrides}
          onQuantityChange={(id, qty) => setQuantityOverrides((prev) => ({ ...prev, [id]: qty }))}
          onClose={handleClose}
          onContinue={handleContinue}
          onViewOtherItems={handleViewOtherItems}
        />
      )}

      {screen === 'needAnythingElse' && (
        <NeedAnythingElseScreen
          onClose={handleNeedAnythingClose}
          onContinue={handleNeedAnythingContinue}
          transition={naTransition}
          baseItemCount={baseTotalQty}
          baseTotalCents={baseTotalCents}
          onAddedTotalsChange={(count, totalCents) => {
            setAddedItemCount(count);
            setAddedItemTotalCents(totalCents);
          }}
          onItemsCommitted={(committed) => {
            // Push to global delivery context (appears first in LOC basket)
            committed.forEach((item) =>
              setDeliveryItemQuantity(
                { id: item.id, image: item.image, name: item.name, price: item.price },
                item.quantity,
              )
            );
            // Merge into local ReplenishFlow items so MainScreen shows them
            if (committed.length > 0) {
              setItems((prev) => {
                const next = [...prev];
                committed.forEach((item) => {
                  const dollars = Math.floor(item.price);
                  const cents = Math.round((item.price - dollars) * 100).toString().padStart(2, '0');
                  const existing = next.findIndex((i) => i.id === item.id);
                  if (existing !== -1) {
                    next[existing] = { ...next[existing], quantity: item.quantity };
                  } else {
                    next.unshift({
                      id: item.id,
                      image: item.image,
                      name: item.name,
                      price: String(dollars),
                      cents,
                      tag: '',
                      quantity: item.quantity,
                    });
                  }
                });
                return next;
              });
            }
          }}
        />
      )}

      {screen === 'deliveryDetails' && (
        <DeliveryDetailsScreen
          onClose={handleClose}
          onBack={handleDeliveryDetailsBack}
          onStartRecurring={handleStartRecurring}
          transition={naTransition}
          isAssociateDiscountFlow={scenario === 'associate-discount'}
          phoneNumber={phoneNumber}
          onPhoneNumberChange={setPhoneNumber}
          addedItemCount={addedItemCount}
          addedItemTotalCents={addedItemTotalCents}
        />
      )}

      {platform === 'ios' && (
        <div
          className={styles.homeIndicator}
          onPointerDown={handleIndicatorPointerDown}
          onPointerMove={handleIndicatorPointerMove}
          onPointerUp={handleIndicatorPointerUp}
          onPointerCancel={handleIndicatorPointerUp}
          style={{ touchAction: 'none', cursor: 'grab' }}
        />
      )}
      {platform === 'android' && <div className={styles.androidNavBar}><div className={styles.androidGestureBar} /></div>}
    </div>,
    portalContainerRef.current
  ) : null;

  return (
    <>
      {overlayPortal}
      <IOSHomeScreen
        isOpen={showIOSHome}
        onClose={handleCloseIOSHome}
        onNotificationTap={handleNotificationTap}
      />
      <DeliveryTracking
        isOpen={showDeliveryTracking}
        onClose={handleCloseDeliveryTracking}
        onNavigateHome={handleCloseIOSHome}
      />
      <AssociateDiscountSheet
        isOpen={showAssociateDiscount}
        onClose={handleAssociateDiscountClose}
        onContinue={handleAssociateDiscountContinue}
      />
    </>
  );
}
