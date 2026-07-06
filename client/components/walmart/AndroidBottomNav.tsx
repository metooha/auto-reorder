import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, HeartFill, Services, ServicesFill, User, UserCircleFill } from '@/components/icons';
import { SparkyAnimation } from '@/components/icons-custom';
import { GlassShop } from '@/components/icons-custom/GlassShop';
import { GlassShopFill } from '@/components/icons-custom/GlassShopFill';
import styles from './AndroidBottomNav.module.css';

type AndroidTab = 'shop' | 'heart' | 'search' | 'services' | 'account';

interface AndroidBottomNavProps {
  activeTab?: AndroidTab;
  onTabChange?: (tab: AndroidTab) => void;
  contained?: boolean;
}

const NAV_PATHS: Record<AndroidTab, string | undefined> = {
  shop: '/walmart',
  heart: undefined,
  search: undefined,
  services: undefined,
  account: '/walmart/purchase-history',
};

const TABS: { id: AndroidTab; label: string }[] = [
  { id: 'shop', label: 'Shop' },
  { id: 'heart', label: 'My Items' },
  { id: 'search', label: 'Ask Sparky' },
  { id: 'services', label: 'Services' },
  { id: 'account', label: 'Account' },
];

function TabIcon({ id, active }: { id: AndroidTab; active: boolean }) {
  const cls = active ? styles.iconActive : styles.iconInactive;
  switch (id) {
    case 'shop':
      return active
        ? <GlassShopFill className={cls} />
        : <GlassShop className={cls} />;
    case 'heart':
      return active ? <HeartFill className={cls} /> : <Heart className={cls} />;
    case 'search':
      return (
        <div className={[styles.sparkyWrap, active ? styles.sparkyWrapActive : ''].filter(Boolean).join(' ')}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F2e40439211e14461aa4aa2ac4ac201d0?format=webp&width=800&height=1200"
            alt="Ask Sparky"
            width={24}
            height={24}
          />
        </div>
      );
    case 'services':
      return active ? <ServicesFill className={cls} /> : <Services className={cls} />;
    case 'account':
      return active ? <UserCircleFill className={cls} /> : <User className={cls} />;
  }
}

export function AndroidBottomNav({ activeTab = 'shop', onTabChange, contained = false }: AndroidBottomNavProps) {
  const navigate = useNavigate();
  const [visualTab, setVisualTab] = useState<AndroidTab>(activeTab);
  const [isVisible, setIsVisible] = useState(true);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressActivated = useRef(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    setVisualTab(activeTab);
  }, [activeTab]);

  // Bottom nav stays visible while scrolling — no hide-on-scroll behavior.

  const handleTabClick = (tab: AndroidTab) => {
    setVisualTab(tab);
    onTabChange?.(tab);
    const path = NAV_PATHS[tab];
    if (path) navigate(path);
  };

  const handleAccountPressStart = (e: React.PointerEvent) => {
    e.preventDefault();
    longPressActivated.current = false;
    longPressTimer.current = setTimeout(() => {
      longPressActivated.current = true;
      document.dispatchEvent(new CustomEvent('walmart:toggle-devtools'));
    }, 3000);
  };

  const handleAccountPressCancel = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    longPressActivated.current = false;
  };

  const handleAccountPressEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    if (!longPressActivated.current) {
      setVisualTab('account');
      onTabChange?.('account');
      const path = NAV_PATHS['account'];
      if (path) navigate(path);
    }
    longPressActivated.current = false;
  };

  return (
    <div className={[
      styles.nav,
      !contained && !isVisible ? styles.navHidden : '',
      contained ? styles.navContained : '',
    ].filter(Boolean).join(' ')}>
      <div className={styles.tabBar}>
        {TABS.map(({ id, label }) => {
          const isActive = visualTab === id;
          return (
            <button
              key={id}
              className={[styles.tab, isActive ? styles.tabActive : ''].filter(Boolean).join(' ')}
              onClick={id !== 'account' ? () => handleTabClick(id) : undefined}
              onPointerDown={id === 'account' ? handleAccountPressStart : undefined}
              onPointerUp={id === 'account' ? handleAccountPressEnd : undefined}
              onPointerLeave={id === 'account' ? handleAccountPressCancel : undefined}
              aria-label={label}
            >
              <div className={styles.iconWrap}>
                <TabIcon id={id} active={isActive} />
              </div>
              <span className={[styles.label, isActive ? styles.labelActive : styles.labelInactive].join(' ')}>
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Android gesture bar */}
      <div className={styles.gestureBar}>
        <div className={styles.gestureBarPill} />
      </div>
    </div>
  );
}
