import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import styles from './DeliveryTracking.module.css';

const PRODUCT_IMAGES = [
  'https://api.builder.io/api/v1/image/assets/TEMP/b51dd5bfdd829c527ccd523010b4777539b96ed5?width=148',
  'https://api.builder.io/api/v1/image/assets/TEMP/f90a4291d980826c53b0e25525a837aa111d1907?width=148',
  'https://api.builder.io/api/v1/image/assets/TEMP/a15638b996aa4fd57e7951252d2463ad3dfa5e17?width=148',
  'https://api.builder.io/api/v1/image/assets/TEMP/c53096b98e20990908a4308a20107170e54e1845?width=148',
  'https://api.builder.io/api/v1/image/assets/TEMP/8ded24e41f31729df5de979560ad4f18e7b409cd?width=148',
];

const INITIAL_SECONDS = 300; // 5 minutes

interface DeliveryTrackingProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateHome?: () => void;
}

export function DeliveryTracking({ isOpen, onClose, onNavigateHome }: DeliveryTrackingProps) {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS);
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      onClose();
    }, 280);
  }, [onClose]);

  // Countdown timer
  useEffect(() => {
    if (!isOpen) return;
    setSecondsLeft(INITIAL_SECONDS);
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  // Escape key — stop propagation so IOSHomeScreen's handler doesn't also fire
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopImmediatePropagation();
        handleClose();
      }
    };
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const minutesLeft = Math.ceil(secondsLeft / 60);
  const progress = secondsLeft / INITIAL_SECONDS; // 1 → 0

  const screenClass = [styles.screen, isExiting ? styles.exiting : ''].filter(Boolean).join(' ');

  return createPortal(
    <div className={screenClass} role="dialog" aria-modal="true" aria-label="Delivery tracking" onClick={(e) => e.stopPropagation()}>
      {/* Top Nav */}
      <TopNav onClose={handleClose} />

      {/* Map */}
      <div className={styles.mapSection}>
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/92e7f1a28b67c9c8616981b2d734ba21b12f2487?width=750"
          alt="Delivery map"
          className={styles.mapImage}
        />
      </div>

      {/* Ring — overlaps map bottom and card top */}
      <div className={styles.ringWrapper}>
        <ProgressRing minutes={minutesLeft} progress={progress} />
      </div>

      {/* Card */}
      <div className={styles.card}>
        {/* Address */}
        <div className={styles.addressBlock}>
          <div className={styles.addressTitle}>Your delivery is on the way</div>
          <div className={styles.addressRow}>
            <LocationIcon />
            <span className={styles.addressText}>3743 Park Ln, Dallas, TX 75220</span>
          </div>
        </div>

        {/* Products */}
        <div className={styles.productsSection} onClick={() => { navigate('/'); onNavigateHome ? onNavigateHome() : onClose(); }} style={{ cursor: 'pointer' }}>
          <div className={styles.productsTitle}>Your order</div>
          <div className={styles.productTiles}>
            {PRODUCT_IMAGES.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Product ${i + 1}`}
                className={styles.productTile}
              />
            ))}
          </div>
        </div>

        {/* Payment */}
        <div className={styles.paymentRow}>
          <span className={styles.paymentLabel}>Payment details</span>
          <VisaLogo />
          <span className={styles.paymentCard}>···· 1234</span>
        </div>
      </div>

      {/* Home indicator */}
      <div className={styles.homeIndicator} />
    </div>,
    document.body
  );
}

/* ---- Sub-components ---- */

function TopNav({ onClose }: { onClose: () => void }) {
  return (
    <div className={styles.topNav}>
      <div className={styles.navHeader}>
        <div className={styles.navLeft}>
          <button
            className={styles.floatingBtn}
            onClick={onClose}
            aria-label="Close"
            type="button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M11.7803 13.0793L18 19.2989L19.0607 18.2383L12.841 12.0186L19.0607 5.79894L18 4.73828L11.7803 10.958L5.56066 4.73828L4.5 5.79894L10.7197 12.0186L4.5 18.2383L5.56066 19.2989L11.7803 13.0793Z"
                fill="#2E2F32"
              />
            </svg>
          </button>
          <span className={styles.navTitle}>Delivery tracking</span>
        </div>
        <button
          className={styles.floatingBtn}
          onClick={onClose}
          aria-label="Go back"
          type="button"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6.24897 12.5652L15.4624 21L16.5 19.8695L7.90402 12L16.5 4.13049L15.4624 3L6.24897 11.4348C6.09033 11.58 6 11.7851 6 12C6 12.2149 6.09033 12.42 6.24897 12.5652Z"
              fill="#2E2F32"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

interface ProgressRingProps {
  minutes: number;
  progress: number; // 1 = full, 0 = empty
}

function ProgressRing({ minutes, progress }: ProgressRingProps) {
  const radius = 77;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);
  const [angle, setAngle] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let start: number | null = null;
    const speed = 20; // degrees per second
    const tick = (ts: number) => {
      if (start === null) start = ts;
      setAngle((360 - ((ts - start) * speed / 1000) % 360) % 360);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className={styles.progressRing}>
      <svg className={styles.ringSvg} viewBox="0 0 202 202">
        <defs>
          <linearGradient
            id="magicRingGradient"
            gradientTransform={`rotate(${angle}, 0.5, 0.5)`}
          >
            <stop offset="0%" className={styles.ringGradientStop1} />
            <stop offset="50%" className={styles.ringGradientStop2} />
            <stop offset="100%" className={styles.ringGradientStop3} />
          </linearGradient>
        </defs>
        {/* White background circle */}
        <circle cx="101" cy="101" r="101" className={styles.ringBg} />
        {/* Background track (unfilled) */}
        <circle
          cx="101"
          cy="101"
          r={radius}
          className={styles.ringTrack}
        />
        {/* Progress arc with animated magic gradient */}
        <circle
          cx="101"
          cy="101"
          r={radius}
          className={styles.ringStroke}
          stroke="url(#magicRingGradient)"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
      </svg>
      <div className={styles.ringCenter}>
        <div className={styles.ringTime}>{minutes} min</div>
        <div className={styles.ringLabel}>until delivered</div>
      </div>
    </div>
  );
}

function VisaLogo() {
  return (
    <svg width="48" height="16" viewBox="0 0 48 16" fill="none" aria-label="Visa" role="img">
      <path d="M19.614 15.186h-3.907L18.11.9h3.908l-2.404 14.286zM13.31.9L9.585 10.567l-.44-2.245L7.77 2.19S7.615.9 6.014.9H.067L0 1.178s1.795.372 3.895 1.633L7.27 15.186h4.07L17.54.9H13.31zM43.66 15.186H47.1L44.086.9h-3.15c-1.378 0-1.722.952-1.722.952l-5.833 13.334h4.07l.808-2.23h4.97l.43 2.23zm-4.317-5.3l2.056-5.66 1.148 5.66H39.343zM34.478 3.983l.557-3.225S33.424.1 31.713.1c-1.852 0-6.252.81-6.252 4.758 0 3.72 5.183 3.765 5.183 5.72 0 1.955-4.648 1.603-6.182.372l-.58 3.373s1.634.798 4.134.798c2.5 0 6.32-1.296 6.32-4.92 0-3.744-5.228-4.09-5.228-5.72 0-1.63 3.644-1.421 5.37-.498z" fill="#1A1F71"/>
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="21" height="24" viewBox="0 0 21 24" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.9375 10.2458C3.96856 8.29107 4.67705 6.43027 5.90743 5.07193C7.13781 3.71359 8.78953 2.96871 10.5 3.00083C12.2105 2.96871 13.8622 3.71359 15.0926 5.07193C16.3229 6.43027 17.0314 8.29107 17.0625 10.2458C16.8566 12.5572 15.9623 14.7177 14.5294 16.3658C13.3159 17.9377 11.9996 19.4019 10.5919 20.7458L10.5 20.8358L10.4081 20.7458C9.00041 19.4019 7.68412 17.9377 6.47062 16.3658C5.03768 14.7177 4.14345 12.5572 3.9375 10.2458ZM10.5 1.50083C8.44145 1.46876 6.45593 2.37169 4.97941 4.01132C3.5029 5.65095 2.65611 7.89325 2.625 10.2458C2.625 15.0158 7.21876 19.5608 9.54188 21.8708L9.9225 22.2608C10.0852 22.4142 10.2891 22.4989 10.5 22.5008C10.7109 22.4989 10.9148 22.4142 11.0775 22.2608L11.4581 21.8708C13.7812 19.5008 18.375 15.0008 18.375 10.2458C18.3439 7.89325 17.4971 5.65095 16.0206 4.01132C14.5441 2.37169 12.5585 1.46876 10.5 1.50083ZM8.53125 10.5008C8.53125 9.90409 8.73868 9.33179 9.10789 8.90983C9.4771 8.48788 9.97786 8.25083 10.5 8.25083V6.75083C9.62976 6.75083 8.79517 7.14591 8.17981 7.84917C7.56446 8.55244 7.21875 9.50626 7.21875 10.5008C7.21875 11.4954 7.56446 12.4492 8.17981 13.1525C8.79517 13.8557 9.62976 14.2508 10.5 14.2508C11.3702 14.2508 12.2048 13.8557 12.8202 13.1525C13.4355 12.4492 13.7812 11.4954 13.7812 10.5008H12.4688C12.4688 11.0976 12.2613 11.6699 11.8921 12.0918C11.5229 12.5138 11.0221 12.7508 10.5 12.7508C9.97786 12.7508 9.4771 12.5138 9.10789 12.0918C8.73868 11.6699 8.53125 11.0976 8.53125 10.5008Z"
        fill="#2E2F32"
      />
    </svg>
  );
}
