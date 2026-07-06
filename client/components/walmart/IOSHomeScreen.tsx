import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './IOSHomeScreen.module.css';

interface IOSHomeScreenProps {
  isOpen: boolean;
  onClose: () => void;
  onNotificationTap: () => void;
}

export function IOSHomeScreen({ isOpen, onClose, onNotificationTap }: IOSHomeScreenProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      onClose();
    }, 300);
  }, [onClose]);

  if (!isOpen) return null;

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  const displayHours = hours % 12 || 12;
  const timeStr = `${displayHours}:${minutes}`;

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dateStr = `${days[currentTime.getDay()]}, ${months[currentTime.getMonth()]} ${currentTime.getDate()}`;

  const screenClass = [styles.screen, isExiting ? styles.exiting : ''].filter(Boolean).join(' ');

  return createPortal(
    <div className={screenClass} role="dialog" aria-modal="true" aria-label="iOS Lock Screen">
      {/* Dynamic Island */}
      <div className={styles.dynamicIsland} />

      {/* Status Bar */}
      <IOSLockStatusBar />

      {/* Date & Time */}
      <div className={styles.dateTimeArea}>
        <div className={styles.date}>{dateStr}</div>
        <div className={styles.time}>{timeStr}</div>
      </div>

      {/* Widgets */}
      <div className={styles.widgets}>
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/6f7ad3a17656dea5248ba4d158887df53295a8db?width=112"
          alt="Weather widget"
          className={styles.widgetImg}
        />
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/6e78c11fed70d1d77be9a06470e9a45b90df5e95?width=112"
          alt="Activity widget"
          className={styles.widgetImg}
        />
      </div>

      <div className={styles.spacer} />

      {/* Walmart Notification */}
      <WalmartNotification onTap={onNotificationTap} />

      {/* Bottom Actions */}
      <div className={styles.bottomActions}>
        <FlashlightButton />
        <CameraButton />
      </div>

      {/* Home Indicator */}
      <div className={styles.homeIndicator} />
    </div>,
    document.body
  );
}

/* ---- Sub-components ---- */

function IOSLockStatusBar() {
  return (
    <div className={styles.statusBar}>
      <div className={styles.statusBarLeft}>T-Mobile Wifi</div>
      <div className={styles.statusBarCenter} />
      <div className={styles.statusBarRight}>
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none" aria-hidden="true">
          <rect x="0" y="9" width="3" height="3" rx="0.5" fill="currentColor" />
          <rect x="4.5" y="6" width="3" height="6" rx="0.5" fill="currentColor" />
          <rect x="9" y="3" width="3" height="9" rx="0.5" fill="currentColor" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="currentColor" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
          <path d="M8 3.6C9.98 3.6 11.78 4.36 13.12 5.62L14.4 4.2C12.72 2.62 10.48 1.6 8 1.6C5.52 1.6 3.28 2.62 1.6 4.2L2.88 5.62C4.22 4.36 6.02 3.6 8 3.6Z" fill="currentColor" />
          <path d="M4.64 7.38L5.92 8.8C6.48 8.28 7.2 7.96 8 7.96C8.8 7.96 9.52 8.28 10.08 8.8L11.36 7.38C10.48 6.54 9.3 6 8 6C6.7 6 5.52 6.54 4.64 7.38Z" fill="currentColor" />
          <circle cx="8" cy="11" r="1.2" fill="currentColor" />
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none" aria-hidden="true">
          <rect opacity="0.35" x="0.527" y="0.527" width="21.946" height="11.946" rx="2.473" stroke="white" strokeWidth="1.055" />
          <path opacity="0.4" d="M24 5v4.22c.849-.357 1.401-1.189 1.401-2.11C25.401 6.189 24.849 5.357 24 5Z" fill="white" />
          <rect x="2" y="2" width="19" height="9" rx="1" fill="white" />
        </svg>
      </div>
    </div>
  );
}

interface WalmartNotificationProps {
  onTap: () => void;
}

function WalmartNotification({ onTap }: WalmartNotificationProps) {
  const [hasBeenTapped, setHasBeenTapped] = useState(false);

  const handleTap = () => {
    setHasBeenTapped(true);
    onTap();
  };

  return (
    <div
      className={styles.notification}
      onClick={handleTap}
      role="button"
      tabIndex={0}
      aria-label="Walmart delivery notification - tap to view tracking"
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleTap(); }}
    >
      <div className={styles.notifContent}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F071f75c7f44f44da9ec21b2af26d5719?format=webp&width=800&height=1200"
          alt="Walmart Groceries"
          className={styles.notifIcon}
        />
        <div className={styles.notifBody}>
          <div className={styles.notifTitleRow}>
            <div className={styles.notifLogo}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F654563cb4f1d4e37b78d60082ee2d864?format=webp&width=800&height=1200"
                alt="Walmart"
                className={styles.notifLogoImg}
              />
            </div>
            <span className={styles.notifTime}>now</span>
          </div>
          <div className={styles.notifTextBlock}>
            <div className={styles.notifHeadline}>Your delivery is 5 min away</div>
            <div className={styles.notifSubtitle}>Arrives by 4:12pm</div>
          </div>
          <DeliveryProgressTracker animate={!hasBeenTapped} />
        </div>
      </div>
    </div>
  );
}

function DeliveryProgressTracker({ animate }: { animate: boolean }) {
  const [animating, setAnimating] = useState(false);
  const [truckArrived, setTruckArrived] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!animate) {
      setAnimating(false);
      setTruckArrived(false);
      return;
    }
    timerRef.current = setTimeout(() => setAnimating(true), 2000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [animate]);

  const handleTruckAnimationEnd = useCallback(() => {
    setTruckArrived(true);
  }, []);

  return (
    <div className={styles.progressTracker}>
      {/* Track background */}
      <div className={styles.progressTrackBg} />
      {/* Active fill — animates with the truck */}
      <div className={[styles.progressTrackFill, animating ? styles.trackFillAnimating : ''].filter(Boolean).join(' ')} />

      {/* Stops */}
      <div className={styles.progressStops}>
        <div className={styles.progressStop}>
          <div className={`${styles.progressStopDot} ${styles.progressStopDotActive}`} />
        </div>
        <div className={styles.progressStop}>
          <div className={`${styles.progressStopDot} ${truckArrived ? styles.progressStopDotActive : styles.progressStopDotInactive}`} />
        </div>
        <div className={styles.progressStop}>
          <div className={`${styles.progressStopDot} ${styles.progressStopDotInactive}`} />
        </div>
      </div>

      {/* Animated truck */}
      <div
        className={[styles.truckWrap, animating ? styles.truckAnimating : ''].filter(Boolean).join(' ')}
        onAnimationEnd={handleTruckAnimationEnd}
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F167162e363d44fcdb32ae1c6295cbc96?format=webp&width=800&height=1200"
          alt="Delivery truck"
          className={styles.truckImg}
        />
      </div>
    </div>
  );
}

function FlashlightButton() {
  return (
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" aria-label="Flashlight">
      <rect width="50" height="50" rx="25" fill="#151515" fillOpacity="0.35" />
      <path d="M20.3086 16.3994H30.6855V15.9072C30.6855 14.6152 30.0498 14 28.8193 14H22.1748C20.9443 14 20.3086 14.6152 20.3086 15.9072V16.3994ZM24.2666 36.9585H26.7275C27.958 36.9585 28.5835 36.3433 28.5835 35.0513V24.1616C28.5835 23.085 28.8398 22.3057 29.2295 21.7109L29.896 20.7266C30.3677 19.9985 30.6855 19.3115 30.6855 18.4399V17.5991H20.3086V18.4399C20.3086 19.3115 20.6265 19.9985 21.0981 20.7266L21.7544 21.7109C22.1543 22.3057 22.4004 23.085 22.4004 24.1616V35.0513C22.4004 36.3433 23.0361 36.9585 24.2666 36.9585ZM25.4971 29.0732C24.6562 29.0732 24.1128 28.458 24.1128 27.5967V24.7871C24.1128 23.9155 24.6562 23.3311 25.4971 23.3516C26.3276 23.3618 26.8813 23.9463 26.8813 24.7871V27.5967C26.8813 28.458 26.3276 29.0732 25.4971 29.0732ZM25.4971 28.3452C25.9482 28.3452 26.3379 27.9658 26.3379 27.5044C26.3379 27.043 25.9482 26.6533 25.4971 26.6533C25.0356 26.6533 24.646 27.043 24.646 27.5044C24.646 27.9658 25.0356 28.3452 25.4971 28.3452Z" fill="white" />
    </svg>
  );
}

function CameraButton() {
  return (
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" aria-label="Camera">
      <rect width="50" height="50" rx="25" fill="#151515" fillOpacity="0.35" />
      <path d="M15.4142 35H34.5857C36.7671 35 37.8788 33.9093 37.8788 31.7488V20.7682C37.8788 18.6078 36.7671 17.5275 34.5857 17.5275H31.5862C30.7577 17.5275 30.506 17.3597 30.034 16.8353L29.195 15.8915C28.6706 15.3146 28.1358 15 27.0555 15H22.871C21.7907 15 21.2559 15.3146 20.7315 15.8915L19.8925 16.8353C19.4205 17.3492 19.1583 17.5275 18.3403 17.5275H15.4142C13.2223 17.5275 12.1211 18.6078 12.1211 20.7682V31.7488C12.1211 33.9093 13.2223 35 15.4142 35ZM25 31.9061C21.8222 31.9061 19.2737 29.3681 19.2737 26.1694C19.2737 22.9811 21.8222 20.4431 25 20.4431C28.1777 20.4431 30.7157 22.9811 30.7157 26.1694C30.7157 29.3681 28.1672 31.9061 25 31.9061ZM31.4184 22.3099C31.4184 21.5967 32.0477 20.9675 32.7818 20.9675C33.5055 20.9675 34.1242 21.5967 34.1242 22.3099C34.1242 23.0545 33.5055 23.6523 32.7818 23.6628C32.0477 23.6628 31.4184 23.065 31.4184 22.3099ZM25 30.312C27.2863 30.312 29.1321 28.4767 29.1321 26.1694C29.1321 23.8726 27.2863 22.0267 25 22.0267C22.7136 22.0267 20.8573 23.8726 20.8573 26.1694C20.8573 28.4767 22.7241 30.312 25 30.312Z" fill="white" />
    </svg>
  );
}
