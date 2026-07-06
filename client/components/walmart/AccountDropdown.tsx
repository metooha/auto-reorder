import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { User, Globe, Grid, SignOut } from '@/components/icons';
import { PurchaseHistoryIcon, WalmartPlusLogoIcon, SubscriptionLogoIcon, WalmartCashLogoIcon } from '@/components/icons-custom';
import { useAuth } from '@/contexts/AuthContext';
import styles from './AccountDropdown.module.css';

export function AccountDropdown() {
  const navigate = useNavigate();
  const { isLoggedIn, userName, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  const handleNav = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleSignOut = () => {
    setIsOpen(false);
    setIsSigningOut(true);
    setTimeout(() => {
      logout();
      navigate('/walmart');
    }, 1500);
  };

  if (isSigningOut) {
    return (
      <div className={styles.signOutOverlay}>
        <Spinner size="large" a11yLabel="Signing out…" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={styles.root}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <User className={styles.triggerIcon} aria-hidden="true" />
        <div className={styles.triggerContent}>
          <div className={styles.triggerSubtext}>{isLoggedIn ? userName : 'Sign In'}</div>
          <div className={styles.triggerLabel}>Account</div>
        </div>
      </button>

      {isOpen && !isLoggedIn && (
        <div className={styles.panel} role="menu" aria-label="Account navigation">
          <div className={styles.signInCta}>
            <Button
              variant="primary"
              size="small"
              isFullWidth
              onClick={() => handleNav('/walmart/signin')}
            >
              Sign in or create account
            </Button>
          </div>

          <div className={styles.separator} role="separator" />

          <button type="button" role="menuitem" className={styles.item} onClick={() => handleNav('/walmart/purchase-history')}>
            <PurchaseHistoryIcon className={styles.itemIcon} aria-hidden="true" />
            <span className={styles.itemLabel}>Purchase History</span>
          </button>

          <button type="button" role="menuitem" className={styles.item} onClick={() => handleNav('/walmart')}>
            <WalmartPlusLogoIcon className={styles.itemIcon} aria-hidden="true" />
            <span className={styles.itemLabel}>Walmart+</span>
          </button>

          <button type="button" role="menuitem" className={styles.item} onClick={() => handleNav('/walmart')}>
            <SubscriptionLogoIcon className={styles.itemIcon} aria-hidden="true" />
            <span className={styles.itemLabel}>Subscriptions</span>
          </button>

          <div className={styles.separator} role="separator" />

          <button type="button" role="menuitem" className={styles.item} onClick={() => handleNav('/walmart')}>
            <Globe className={styles.itemIcon} aria-hidden="true" />
            <span className={styles.itemLabel}>Language | English</span>
          </button>
        </div>
      )}

      {isOpen && isLoggedIn && (
        <div className={styles.panel} role="menu" aria-label="Account navigation">
          <button type="button" role="menuitem" className={styles.item} onClick={() => handleNav('/walmart/purchase-history')}>
            <PurchaseHistoryIcon className={styles.itemIcon} aria-hidden="true" />
            <span className={styles.itemLabel}>Purchase History</span>
          </button>

          <button type="button" role="menuitem" className={styles.item} onClick={() => handleNav('/walmart')}>
            <WalmartPlusLogoIcon className={styles.itemIcon} aria-hidden="true" />
            <span className={styles.itemLabel}>Walmart+</span>
          </button>

          <button type="button" role="menuitem" className={styles.item} onClick={() => handleNav('/walmart')}>
            <User className={styles.itemIcon} aria-hidden="true" />
            <span className={styles.itemLabel}>Account</span>
          </button>

          <button type="button" role="menuitem" className={styles.item} onClick={() => handleNav('/walmart')}>
            <SubscriptionLogoIcon className={styles.itemIcon} aria-hidden="true" />
            <span className={styles.itemLabel}>Subscriptions</span>
          </button>

          <button type="button" role="menuitem" className={styles.item} onClick={() => handleNav('/walmart')}>
            <WalmartCashLogoIcon className={styles.itemIcon} aria-hidden="true" />
            <span className={styles.itemLabel}>Get Walmart Cash</span>
          </button>

          <div className={styles.separator} role="separator" />

          <button type="button" role="menuitem" className={styles.item} onClick={() => handleNav('/walmart')}>
            <Globe className={styles.itemIcon} aria-hidden="true" />
            <span className={styles.itemLabel}>Language | English</span>
          </button>

          <div className={styles.separator} role="separator" />

          <button type="button" role="menuitem" className={styles.item} onClick={handleSignOut}>
            <SignOut className={styles.itemIcon} aria-hidden="true" />
            <span className={styles.itemLabel}>Sign Out</span>
          </button>

          <div className={styles.separator} role="separator" />

          <button type="button" role="menuitem" className={styles.item} onClick={() => handleNav('/component-library')}>
            <Grid className={styles.itemIcon} aria-hidden="true" />
            <span className={styles.itemLabel}>Component Library</span>
          </button>
        </div>
      )}
    </div>
  );
}
