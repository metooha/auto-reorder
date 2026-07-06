/**
 * LayoutSettingsContext
 *
 * Stores project-level layout preferences that persist across sessions.
 * Currently tracks `mobileFooter` — which component to render at mobile
 * breakpoints: the native-style BottomNav or the mobile-web MwebFooter.
 */

import React, { createContext, useContext, useState, useCallback } from 'react';

export type MobileFooterMode = 'native' | 'mweb';
export type MobileTopNavMode = 'native' | 'mweb';
export type PlatformMode = 'web' | 'ios' | 'android';

interface LayoutSettingsContextValue {
  /** Which footer/nav renders on mobile breakpoints in the Walmart app */
  mobileFooter: MobileFooterMode;
  setMobileFooter: (mode: MobileFooterMode) => void;
  /** Which top nav renders on mobile breakpoints in the Walmart app */
  mobileTopNav: MobileTopNavMode;
  setMobileTopNav: (mode: MobileTopNavMode) => void;
  /** Platform experience mode: web, iOS native, or Android native */
  platform: PlatformMode;
  setPlatform: (mode: PlatformMode) => void;
  /** Show GIC (Get It Checkout) highlight callout on desktop header */
  showGICHighlight: boolean;
  setShowGICHighlight: (show: boolean) => void;
}

const LayoutSettingsContext = createContext<LayoutSettingsContextValue | undefined>(undefined);

const STORAGE_KEY = 'wcp-mobile-footer-mode';
const TOP_NAV_STORAGE_KEY = 'wcp-mobile-top-nav-mode';
const PLATFORM_STORAGE_KEY = 'wcp-platform-mode';
const GIC_HIGHLIGHT_STORAGE_KEY = 'wcp-show-gic-highlight';

function readStoredMode(): MobileFooterMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'mweb' || stored === 'native') return stored;
  } catch {
    // localStorage unavailable (SSR, private mode, etc.)
  }
  return 'native'; // default: native BottomNav
}

function readStoredTopNavMode(): MobileTopNavMode {
  try {
    const stored = localStorage.getItem(TOP_NAV_STORAGE_KEY);
    if (stored === 'mweb' || stored === 'native') return stored;
  } catch { /* ignore */ }
  return 'native';
}

function readStoredPlatform(): PlatformMode {
  try {
    const stored = localStorage.getItem(PLATFORM_STORAGE_KEY);
    if (stored === 'web' || stored === 'ios' || stored === 'android') return stored;
  } catch { /* ignore */ }
  return 'web';
}

function readStoredGICHighlight(): boolean {
  try {
    const stored = localStorage.getItem(GIC_HIGHLIGHT_STORAGE_KEY);
    if (stored === 'true') return true;
    if (stored === 'false') return false;
  } catch { /* ignore */ }
  return false; // default: hidden
}

export function LayoutSettingsProvider({ children }: { children: React.ReactNode }) {
  const [mobileFooter, setMobileFooterState] = useState<MobileFooterMode>(readStoredMode);
  const [mobileTopNav, setMobileTopNavState] = useState<MobileTopNavMode>(readStoredTopNavMode);
  const [platform, setPlatformState] = useState<PlatformMode>(readStoredPlatform);
  const [showGICHighlight, setShowGICHighlightState] = useState<boolean>(readStoredGICHighlight);

  const setMobileFooter = useCallback((mode: MobileFooterMode) => {
    setMobileFooterState(mode);
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // ignore
    }
  }, []);

  const setMobileTopNav = useCallback((mode: MobileTopNavMode) => {
    setMobileTopNavState(mode);
    setMobileFooterState(mode);
    try {
      localStorage.setItem(TOP_NAV_STORAGE_KEY, mode);
      localStorage.setItem(STORAGE_KEY, mode);
    } catch { /* ignore */ }
  }, []);

  const setPlatform = useCallback((mode: PlatformMode) => {
    setPlatformState(mode);
    try {
      localStorage.setItem(PLATFORM_STORAGE_KEY, mode);
    } catch { /* ignore */ }

    // Sync nav components to match the selected platform
    const navMode = mode === 'web' ? 'mweb' : 'native';
    setMobileFooterState(navMode);
    setMobileTopNavState(navMode);
    try {
      localStorage.setItem(STORAGE_KEY, navMode);
      localStorage.setItem(TOP_NAV_STORAGE_KEY, navMode);
    } catch { /* ignore */ }
  }, []);

  const setShowGICHighlight = useCallback((show: boolean) => {
    setShowGICHighlightState(show);
    try {
      localStorage.setItem(GIC_HIGHLIGHT_STORAGE_KEY, String(show));
    } catch { /* ignore */ }
  }, []);

  return (
    <LayoutSettingsContext.Provider value={{ mobileFooter, setMobileFooter, mobileTopNav, setMobileTopNav, platform, setPlatform, showGICHighlight, setShowGICHighlight }}>
      {children}
    </LayoutSettingsContext.Provider>
  );
}

export function useLayoutSettings(): LayoutSettingsContextValue {
  const ctx = useContext(LayoutSettingsContext);
  if (!ctx) throw new Error('useLayoutSettings must be used inside <LayoutSettingsProvider>');
  return ctx;
}
