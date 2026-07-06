import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Globe, X } from '@/components/icons';
import { WalmartPlusLogoIcon } from '@/components/icons-custom';
import { Divider } from '@/components/ui/Divider';
import styles from './MobileMenuPanel.module.css';

interface MenuLinkItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
  hasChevron?: boolean;
}

const accountLinks: MenuLinkItem[] = [
  { label: 'Walmart+', path: '/walmart' },
  { label: 'Purchase History', path: '/walmart/purchase-history' },
  { label: 'My Items', path: '/walmart/purchase-history' },
  { label: 'Subscriptions', path: '/walmart' },
  { label: 'Account', path: '/walmart/purchase-history' },
];

const supportLinks: MenuLinkItem[] = [
  { label: 'Help', path: '/walmart' },
];

const listLinks: MenuLinkItem[] = [
  { label: 'Lists', path: '/walmart' },
  { label: 'Registries', path: '/walmart' },
];

const browseLinks: MenuLinkItem[] = [
  { label: 'Departments', path: '/departments', hasChevron: true },
  { label: 'Services', path: '/services', hasChevron: true },
];

const feedbackLinks: MenuLinkItem[] = [
  { label: 'Give Feedback', path: '/feedback' },
];

interface MobileMenuPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenuPanel({ isOpen, onClose }: MobileMenuPanelProps) {
  const navigate = useNavigate();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleNav = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        ref={panelRef}
        className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}
        aria-label="Main menu"
        aria-hidden={!isOpen}
      >
        <div className={styles.panelContent}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerRow}>
              <WalmartPlusLogoIcon width={32} height={24} aria-hidden="true" />
              <span className={styles.greeting}>Hi, Emilia</span>
            </div>
            <button className={styles.closeButton} onClick={onClose} aria-label="Close menu">
              <X width={24} height={24} />
            </button>
          </div>

          {/* Language */}
          <button className={styles.menuItem} onClick={() => handleNav('/settings/language')}>
            <Globe width={20} height={20} className={styles.menuItemIcon} />
            <span className={styles.menuItemLabel}>Language | English</span>
            <ChevronRight width={20} height={20} className={styles.menuItemChevron} />
          </button>

          <Divider />

          {/* Walmart Cash CTA */}
          <div className={styles.cashBanner}>
            <button className={styles.cashButton} onClick={() => handleNav('/walmart-cash')}>
              <span className={styles.cashIcon}>$</span>
              <span className={styles.cashLabel}>Get Walmart Cash</span>
              <ChevronRight width={20} height={20} className={styles.cashChevron} />
            </button>
          </div>

          <Divider />

          {/* Account links */}
          <nav className={styles.menuSection}>
            {accountLinks.map((item) => (
              <MenuItem key={item.label} item={item} onNavigate={handleNav} />
            ))}
          </nav>

          <Divider />

          {/* Help */}
          <nav className={styles.menuSection}>
            {supportLinks.map((item) => (
              <MenuItem key={item.label} item={item} onNavigate={handleNav} />
            ))}
          </nav>

          <Divider />

          {/* Lists / Registries */}
          <nav className={styles.menuSection}>
            {listLinks.map((item) => (
              <MenuItem key={item.label} item={item} onNavigate={handleNav} />
            ))}
          </nav>

          <Divider />

          {/* Departments / Services */}
          <nav className={styles.menuSection}>
            {browseLinks.map((item) => (
              <MenuItem key={item.label} item={item} onNavigate={handleNav} />
            ))}
          </nav>

          <Divider />

          {/* Give Feedback */}
          <nav className={styles.menuSection}>
            {feedbackLinks.map((item) => (
              <MenuItem key={item.label} item={item} onNavigate={handleNav} />
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}

function MenuItem({ item, onNavigate }: { item: MenuLinkItem; onNavigate: (path: string) => void }) {
  return (
    <button className={styles.menuItem} onClick={() => onNavigate(item.path)}>
      {item.icon && <span className={styles.menuItemIcon}>{item.icon}</span>}
      <span className={styles.menuItemLabel}>{item.label}</span>
      {item.hasChevron && <ChevronRight width={20} height={20} className={styles.menuItemChevron} />}
    </button>
  );
}
