import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Services, ServicesFill, UserCircle, UserCircleFill } from '@/components/icons';
import { SparkyAnimation, GlassShop, GlassShopFill } from '@/components/icons-custom';
import { useLayoutSettings, type PlatformMode } from '@/contexts/LayoutSettingsContext';
import styles from './BottomNav.module.css';

interface BottomNavProps {
  activeTab?: 'shop' | 'heart' | 'user';
  onTabChange?: (tab: 'shop' | 'heart' | 'user') => void;
  /** Renders in-flow (not fixed) for use inside a patterns/documentation page */
  contained?: boolean;
}

const TAB_X: Record<string, string> = {
  shop: '-72px',
  heart: '0px',
  user: '72px',
};

const NAV_PATHS: Record<string, string | undefined> = {
  shop: '/walmart',
  heart: undefined,
  user: '/walmart/purchase-history',
};

export function BottomNav({ activeTab = 'shop', onTabChange, contained = false }: BottomNavProps) {
  const navigate = useNavigate();
  const { platform } = useLayoutSettings();
  // Visual tab drives the indicator position — decoupled from prop so we can
  // animate first, then trigger the page navigation after the slide completes.
  const [visualTab, setVisualTab] = useState<'shop' | 'heart' | 'user'>(activeTab);
  const [isMoving, setIsMoving] = useState(false);
  const navTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const moveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep visualTab in sync if parent changes activeTab (e.g. on initial mount of a new page).
  useEffect(() => {
    setVisualTab(activeTab);
  }, [activeTab]);

  const handleTabClick = (tab: 'shop' | 'heart' | 'user') => {
    if (tab === visualTab) return;

    // Clear any in-flight navigation/movement timers
    if (navTimerRef.current) clearTimeout(navTimerRef.current);
    if (moveTimerRef.current) clearTimeout(moveTimerRef.current);

    // Move indicator immediately — CSS transition handles the slide
    setVisualTab(tab);
    setIsMoving(true);
    onTabChange?.(tab);

    // Clear the "moving" state once the spring has settled (~400ms)
    moveTimerRef.current = setTimeout(() => setIsMoving(false), 400);

    // Navigate only after the slide animation plays (~320ms)
    const path = NAV_PATHS[tab];
    if (path) {
      navTimerRef.current = setTimeout(() => navigate(path), 320);
    }
  };

  const indicatorX = TAB_X[visualTab];

  const navEl = (
    <div className={[
        styles.nav,
        contained ? styles.navContained : '',
    ].filter(Boolean).join(' ')}>
      <div className={styles.navInner}>
        <div className={styles.tabBar}>
            <div
              className={`${styles.indicator} ${isMoving ? styles.indicatorMoving : ''}`}
              style={{ transform: `translateX(${indicatorX})` }}
            />

            <button
              className={styles.tab}
              onClick={() => handleTabClick('shop')}
              aria-label="Shop"
            >
              {visualTab === 'shop'
                ? <GlassShopFill className={`${styles.tabIcon} ${styles.tabIconActive}`} />
                : <GlassShop className={`${styles.tabIcon} ${styles.tabIconInactive}`} />}
            </button>

            <button
              className={styles.tab}
              onClick={() => handleTabClick('heart')}
              aria-label="Services"
            >
              {visualTab === 'heart'
                ? <ServicesFill className={`${styles.tabIcon} ${styles.tabIconActive}`} />
                : <Services className={`${styles.tabIcon} ${styles.tabIconInactive}`} />}
            </button>

            <button
              className={styles.tab}
              onClick={() => handleTabClick('user')}
              aria-label="Account"
            >
              {visualTab === 'user'
                ? <UserCircleFill className={`${styles.tabIcon} ${styles.tabIconActive}`} />
                : <UserCircle className={`${styles.tabIcon} ${styles.tabIconInactive}`} />}
            </button>
          </div>

        <button className={styles.sparkyButton} aria-label="Ask Sparky">
            <div className={styles.sparkyIcon}>
              <SparkyAnimation />
            </div>
          </button>
      </div>

      {platform === 'ios' && <div className={styles.homeIndicator} />}
      {platform === 'android' && <div className={styles.androidNavBar}>
        <div className={styles.androidGestureBar} />
      </div>}
    </div>
  );

  if (contained) {
    return (
      <div className={styles.containedWrapper}>
        <div className={styles.fadeOverlayContained} />
        {navEl}
      </div>
    );
  }

  return (
    <>
      <div className={styles.fadeOverlay} />
      {navEl}
    </>
  );
}
