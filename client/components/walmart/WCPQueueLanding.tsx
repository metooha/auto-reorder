import { WCPTimerView, TimerViewVariant } from '@/components/walmart/WCPTimerView';
import { Button } from '@/components/ui/Button';
import styles from './WCPQueueLanding.module.css';

export type QueueLandingVariant = 'authenticated' | 'unauthenticated';

export interface QueueLandingProduct {
  /** Product image URL */
  image: string;
  /** Product description */
  description: string;
  /** Current price, e.g. "$499.99" */
  price: string;
  /** Strikethrough original price */
  originalPrice?: string;
}

export interface WCPQueueLandingProps {
  /** Authenticated or unauthenticated view */
  variant?: QueueLandingVariant;
  /** Product to display */
  product: QueueLandingProduct;
  /** Timer display string (authenticated only) */
  timeDisplay?: string;
  /** Timer variant (authenticated only) */
  timerVariant?: TimerViewVariant;
  /** Callback when "Sign in" button is clicked (unauthenticated only) */
  onSignIn?: () => void;
}

export function WCPQueueLanding({
  variant = 'authenticated',
  product,
  timeDisplay = '59mins',
  timerVariant = 'waiting',
  onSignIn,
}: WCPQueueLandingProps) {
  if (variant === 'unauthenticated') {
    return (
      <UnauthenticatedLanding
        product={product}
        onSignIn={onSignIn}
      />
    );
  }

  return (
    <AuthenticatedLanding
      product={product}
      timeDisplay={timeDisplay}
      timerVariant={timerVariant}
    />
  );
}

/* ── Authenticated landing ─────────────────────────────────── */

function AuthenticatedLanding({
  product,
  timeDisplay,
  timerVariant,
}: {
  product: QueueLandingProduct;
  timeDisplay: string;
  timerVariant: TimerViewVariant;
}) {
  return (
    <div className={styles.landing}>
      <div className={styles.heroSection}>
        {/* Hourglass illustration */}
        <div className={styles.illustrationWrap}>
          <HourglassIllustration />
        </div>

        <div className={styles.titleBlock}>
          <span className={styles.heroTitle}>You're in line</span>
          <span className={styles.heroSubtext}>
            This item is in high demand right now. We'll hold your spot in line
            until it's your turn.
          </span>
        </div>
      </div>

      {/* Product card */}
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <div className={styles.waitSection}>
            <div className={styles.waitGroup}>
              <span className={styles.waitLabel}>Estimated wait</span>
              <WCPTimerView
                timeDisplay={timeDisplay}
                variant={timerVariant}
                size="medium"
              />
            </div>
            <span className={styles.disclaimer}>
              *Time is subject to change
            </span>
          </div>

          <ProductInfo product={product} />
        </div>
      </div>
    </div>
  );
}

/* ── Unauthenticated landing ───────────────────────────────── */

function UnauthenticatedLanding({
  product,
  onSignIn,
}: {
  product: QueueLandingProduct;
  onSignIn?: () => void;
}) {
  return (
    <div className={styles.landing}>
      <div className={styles.unauthHero}>
        <div className={styles.titleBlock}>
          <span className={styles.unauthTitle}>Sign in to join the line</span>
          <span className={styles.heroSubtext}>
            Once you're in line, we'll hold your spot and let you know when it's
            your turn.
          </span>
        </div>

        <Button variant="secondary" size="medium" onClick={onSignIn}>
          Sign in to join the line
        </Button>

        {/* Product card */}
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <ProductInfo product={product} />
          </div>
        </div>
      </div>

      <div className={styles.accountLink}>
        <span className={styles.accountText}>Don't have an account?</span>
        <button className={styles.createLink} type="button">
          Create account
        </button>
      </div>
    </div>
  );
}

/* ── Shared product info row ───────────────────────────────── */

function ProductInfo({ product }: { product: QueueLandingProduct }) {
  return (
    <div className={styles.productRow}>
      <img
        src={product.image}
        alt={product.description}
        className={styles.productImage}
      />
      <div className={styles.productDetails}>
        <span className={styles.productDescription}>
          {product.description}
        </span>
        <div className={styles.productPricing}>
          <span className={styles.productPrice}>{product.price}</span>
          {product.originalPrice && (
            <span className={styles.productOriginal}>
              {product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Hourglass SVG illustration ─────────────────────────────── */

function HourglassIllustration() {
  return (
    <svg
      width="75"
      height="75"
      viewBox="0 0 75 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="75" height="75" rx="37.5" fill="#ACC8FB" />
      <path
        d="M23.625 11.906C23.625 11.13 24.254 10.5 25.031 10.5H49.969C50.746 10.5 51.375 11.13 51.375 11.906V14.855H23.625V11.906Z"
        fill="#0E002E"
      />
      <path
        d="M51.375 63.094C51.375 63.871 50.746 64.5 49.969 64.5H25.031C24.254 64.5 23.625 63.871 23.625 63.094V60.145H51.375V63.094Z"
        fill="#0E002E"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.227 14.855H48.773V21.678C48.773 25.396 47.301 28.963 44.677 31.598L38.801 37.5H36.199L30.323 31.598C27.699 28.963 26.227 25.396 26.227 21.678V14.855Z"
        fill="#E3E4E5"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.094 23.565H47.906C47.34 26.125 46.057 28.47 44.207 30.328L38.994 35.564C38.17 36.392 36.83 36.392 36.006 35.564L30.793 30.328C28.943 28.47 27.66 26.125 27.094 23.565Z"
        fill="#FFC220"
      />
      <path
        opacity="0.6"
        d="M33.164 14.855H26.227V23.887C26.227 26.191 27.139 28.4 28.764 30.033L36.199 37.5H37.5L34.161 29.452C33.503 27.865 33.164 26.164 33.164 24.446V14.855Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48.773 60.145H26.227V53.322C26.227 49.604 27.699 46.037 30.323 43.402L36.199 37.5H38.801L44.677 43.402C47.301 46.037 48.773 49.604 48.773 53.322V60.145Z"
        fill="#E3E4E5"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M47.906 60.145H27.094L36.188 52.915C36.956 52.304 38.044 52.304 38.813 52.915L47.906 60.145Z"
        fill="#FFC220"
      />
      <path
        opacity="0.6"
        d="M33.164 60.145H26.227V51.113C26.227 48.809 27.139 46.6 28.764 44.967L36.199 37.5H37.5L34.161 45.548C33.503 47.135 33.164 48.836 33.164 50.554V60.145Z"
        fill="white"
      />
    </svg>
  );
}
