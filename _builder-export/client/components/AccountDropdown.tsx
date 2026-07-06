import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon } from '@/components/icons';
import { PurchaseHistoryIcon } from '@/components/icons/PurchaseHistoryIcon';
import { WalmartPlusLogoIcon } from '@/components/icons/WalmartPlusLogoIcon';
import { SubscriptionLogoIcon } from '@/components/icons/SubscriptionLogoIcon';
import { WalmartCashLogoIcon } from '@/components/icons/WalmartCashLogoIcon';
import { GlobeIcon } from '@/components/icons/GlobeIcon';
import { SignOutIcon } from '@/components/icons/SignOutIcon';
import styles from './AccountDropdown.module.css';

interface AccountDropdownProps {
  userName?: string;
}

export function AccountDropdown({ userName = 'Hi, Mi H' }: AccountDropdownProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
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

  // Close on Escape
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
    // TODO: implement sign out
  };

  return (
    <div ref={containerRef} className={styles.root}>
      {/* Trigger */}
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <UserIcon className={styles.triggerIcon} aria-hidden="true" />
        <div className={styles.triggerContent}>
          <div className={styles.triggerSubtext}>Hi, {userName.replace('Hi, ', '')}</div>
          <div className={styles.triggerLabel}>Account</div>
        </div>
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div className={styles.panel} role="menu" aria-label="Account navigation">

          {/* Group 1 */}
          <button type="button" role="menuitem" className={styles.item} onClick={() => handleNav('/purchase-history')}>
            <PurchaseHistoryIcon className={styles.itemIcon} aria-hidden="true" />
            <span className={styles.itemLabel}>Purchase History</span>
          </button>

          <button type="button" role="menuitem" className={styles.item} onClick={() => handleNav('/walmart-plus')}>
            <WalmartPlusLogoIcon className={styles.itemIcon} aria-hidden="true" />
            <span className={styles.itemLabel}>Walmart+</span>
          </button>

          <button type="button" role="menuitem" className={styles.item} onClick={() => handleNav('/account')}>
            <UserIcon className={styles.itemIcon} aria-hidden="true" />
            <span className={styles.itemLabel}>Account</span>
          </button>

          <button type="button" role="menuitem" className={styles.item} onClick={() => handleNav('/subscriptions')}>
            <SubscriptionLogoIcon className={styles.itemIcon} aria-hidden="true" />
            <span className={styles.itemLabel}>Subscriptions</span>
          </button>

          <button type="button" role="menuitem" className={styles.item} onClick={() => handleNav('/cash')}>
            <WalmartCashLogoIcon className={styles.itemIcon} aria-hidden="true" />
            <span className={styles.itemLabel}>Get Walmart Cash</span>
          </button>

          {/* Separator */}
          <div className={styles.separator} role="separator" />

          {/* Group 2 */}
          <button type="button" role="menuitem" className={styles.item} onClick={() => handleNav('/language')}>
            <GlobeIcon className={styles.itemIcon} aria-hidden="true" />
            <span className={styles.itemLabel}>Language | English</span>
          </button>

          {/* Separator */}
          <div className={styles.separator} role="separator" />

          {/* Sign Out */}
          <button type="button" role="menuitem" className={styles.item} onClick={handleSignOut}>
            <SignOutIcon className={styles.itemIcon} aria-hidden="true" />
            <span className={styles.itemLabel}>Sign Out</span>
          </button>

          {/* Component Library Link */}
          <div className={styles.separator} role="separator" />
          <button type="button" role="menuitem" className={styles.item} onClick={() => navigate('/component-library')}>
            <span className={styles.itemLabel}>Component Library</span>
          </button>

        </div>
      )}
    </div>
  );
}
