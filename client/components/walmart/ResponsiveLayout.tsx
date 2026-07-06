import { ReactNode } from 'react';
import { AndroidBottomNav } from './AndroidBottomNav';
import { DesktopHeader } from './DesktopHeader';
import { DesktopFooter } from './DesktopFooter';
import { MwebFooter } from './MwebFooter';
import { MobileTopNav } from './MobileTopNav';
import { MobileHeader } from './MobileHeader';
import { SubNav } from './SubNav';
import { PromoBanner } from './PromoBanner';
import { OrderStatusBanner } from './OrderStatusBanner';
import { useLayoutSettings } from '@/contexts/LayoutSettingsContext';
import { NativeStatusBar } from './NativeStatusBar';
import styles from './ResponsiveLayout.module.css';

interface ResponsiveLayoutProps {
  children: ReactNode;
  showMobileNav?: boolean;
  showMobileTopNav?: boolean;
  showDesktopHeader?: boolean;
  showOrderStatusBanner?: boolean;
  showHomeExtras?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  mobileActiveTab?: 'shop' | 'heart' | 'user';
  nativeStatusBarVariant?: 'blue' | 'white';
  mobileTopNavTitle?: string;
}

const maxWidthClassMap: Record<string, string> = {
  sm: styles.maxWidthSm,
  md: styles.maxWidthMd,
  lg: styles.maxWidthLg,
  xl: styles.maxWidthXl,
  '2xl': styles.maxWidth2xl,
  full: styles.maxWidthFull,
};

export function ResponsiveLayout({
  children,
  showMobileNav = true,
  showMobileTopNav = true,
  showDesktopHeader = true,
  showOrderStatusBanner = false,
  showHomeExtras = false,
  maxWidth = '2xl',
  mobileActiveTab = 'shop',
  nativeStatusBarVariant = 'blue',
  mobileTopNavTitle,
}: ResponsiveLayoutProps) {
  const maxWidthClass = maxWidthClassMap[maxWidth] || styles.maxWidth2xl;
  const { mobileFooter, mobileTopNav, platform } = useLayoutSettings();
  const isNative = platform === 'ios' || platform === 'android';

  return (
    <div className={styles.root}>
      {/* Native status bar + top nav wrapped together to prevent sub-pixel gap */}
      {showMobileNav && isNative && mobileTopNav === 'native' && (
        <div className={[styles.nativeNavWrapper, nativeStatusBarVariant === 'white' ? styles.nativeNavWrapperWhite : ''].filter(Boolean).join(' ')}>
          <NativeStatusBar platform={platform as 'ios' | 'android'} />
          {showMobileTopNav && <MobileTopNav showHomeExtras={showHomeExtras} pageTitle={mobileTopNavTitle} />}
        </div>
      )}
      {showMobileNav && isNative && mobileTopNav !== 'native' && <NativeStatusBar platform={platform as 'ios' | 'android'} />}
      {showMobileNav && showMobileTopNav && mobileTopNav === 'native' && !isNative && <MobileTopNav showHomeExtras={showHomeExtras} pageTitle={mobileTopNavTitle} />}
      {showMobileNav && showMobileTopNav && mobileTopNav === 'mweb' && <MobileHeader />}
      {/* Desktop header — hidden on mobile via CSS */}
      {showDesktopHeader && <DesktopHeader />}
      {showDesktopHeader && <SubNav />}
      {showDesktopHeader && <PromoBanner />}

      <main className={styles.main}>
        <div className={`${styles.contentContainer} ${maxWidthClass}`}>
          {showOrderStatusBanner && <OrderStatusBanner />}
          {children}
        </div>
      </main>

      {/* Mobile footer/nav — swapped by project-level mobileFooter setting */}
      {showMobileNav && mobileFooter === 'native' && (
        <AndroidBottomNav activeTab={mobileActiveTab === 'heart' ? 'heart' : mobileActiveTab === 'user' ? 'account' : 'shop'} />
      )}
      {showMobileNav && mobileFooter === 'mweb' && <MwebFooter />}

      <DesktopFooter />
    </div>
  );
}

export function MobileOnlyLayout({ children }: { children: ReactNode }) {
  return (
    <ResponsiveLayout showDesktopHeader={false} showMobileNav={true} maxWidth="full">
      {children}
    </ResponsiveLayout>
  );
}

export function DesktopOnlyLayout({ children }: { children: ReactNode }) {
  return (
    <ResponsiveLayout showDesktopHeader={true} showMobileNav={false} maxWidth="2xl">
      {children}
    </ResponsiveLayout>
  );
}
