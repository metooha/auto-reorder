import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, Gear, SignOut, User } from '@/components/icons';
import { SpotIcon } from '@/components/ui/SpotIcon';
import { WalmartPlusLogoIcon } from '@/components/icons-custom';
import { SideNavigation, SideNavigationItem } from '@/components/ui/SideNavigation';
import { Divider } from '@/components/ui/Divider';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { Tag } from '@/components/ui/Tag';
import styles from './AccountSideNav.module.css';

interface NavItem {
  label: string;
  path: string;
  tag?: string;
  tagColor?: 'warning' | 'info';
}

const accountItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Purchase history', path: '/walmart/purchase-history' },
  { label: 'Walmart+', path: '/walmart-plus' },
  { label: 'My savings', path: '/savings' },
  { label: 'Walmart Cash', path: '/walmart-cash' },
  { label: 'Messages', path: '/messages' },
];

const myItemsItems: NavItem[] = [
  { label: 'Reorder', path: '/reorder' },
  { label: 'Shop With Friends', path: '/shop-with-friends', tag: 'New', tagColor: 'warning' },
  { label: 'Lists', path: '/lists' },
  { label: 'Subscriptions', path: '/subscriptions' },
  { label: 'Registry', path: '/registry' },
  { label: 'Protection plans', path: '/protection-plans' },
];

const myProfileItems: NavItem[] = [
  { label: 'Reviews', path: '/reviews', tag: '6 items to review', tagColor: 'warning' },
  { label: 'Pets', path: '/pets' },
  { label: 'Vehicles', path: '/vehicles' },
  { label: 'Recipes', path: '/recipes' },
];

const otherAccountsItems: NavItem[] = [
  { label: 'Pharmacy', path: '/pharmacy' },
  { label: 'Photos', path: '/photos' },
  { label: 'eBooks', path: '/ebooks' },
];

function NavItemContent({ item }: { item: NavItem }) {
  return (
    <span className={styles.navItemInner}>
      <span className={styles.navItemLabel}>{item.label}</span>
      {item.tag && <Tag variant="primary" color={item.tagColor ?? 'warning'}>{item.tag}</Tag>}
    </span>
  );
}

interface NavGroupProps {
  title: string;
  items: NavItem[];
  currentPath: string;
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, path: string) => void;
}

function NavGroup({ title, items, currentPath, onNavigate }: NavGroupProps) {
  return (
    <>
      <div className={styles.groupTitle}>{title}</div>
      <SideNavigation aria-label={title}>
        {items.map((item) => (
          <SideNavigationItem
            key={item.path}
            href={item.path}
            isCurrent={currentPath === item.path}
            onClick={(e) => onNavigate(e, item.path)}
          >
            <NavItemContent item={item} />
          </SideNavigationItem>
        ))}
      </SideNavigation>
    </>
  );
}

/** Shared inner layout for all three section rows: icon + label + optional chevron */
interface SectionRowProps {
  icon: React.ReactNode;
  label: string;
  labelClassName?: string;
  showChevron?: boolean;
}

function SectionRow({ icon, label, labelClassName, showChevron }: SectionRowProps) {
  return (
    <>
      <div className={styles.collapsibleHeaderLeft}>
        <SpotIcon icon={icon} size="small" color="brand" />
        <span className={labelClassName ?? styles.sectionTitleText}>{label}</span>
      </div>
      {showChevron && (
        <span className={styles.chevronIcon}>
          <ChevronDown width={16} height={16} />
        </span>
      )}
    </>
  );
}

interface AccountSideNavProps {
  openSection?: 'settings';
  onSectionChange?: (section: 'settings' | null) => void;
}

export function AccountSideNav({ openSection, onSectionChange }: AccountSideNavProps = {}) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <aside className={styles.nav} aria-label="Account navigation">
      {/* User Header */}
      <div className={styles.userHeader}>
        <div className={styles.userHeaderTop}>
          <WalmartPlusLogoIcon width={32} height={24} aria-hidden="true" />
          <span className={styles.greeting}>Hi, Emilia</span>
        </div>
        <p className={styles.memberSince}>Member since 2023</p>
      </div>

      {/* Account Section (collapsible) */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className={styles.collapsibleHeader}>
          <SectionRow icon={<User />} label="Account" showChevron />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SideNavigation aria-label="Account">
            {accountItems.map((item) => (
              <SideNavigationItem
                key={item.path}
                href={item.path}
                isCurrent={location.pathname === item.path}
                onClick={(e) => handleNav(e, item.path)}
              >
                <NavItemContent item={item} />
              </SideNavigationItem>
            ))}
          </SideNavigation>
          <NavGroup title="My items" items={myItemsItems} currentPath={location.pathname} onNavigate={handleNav} />
          <NavGroup title="My profile" items={myProfileItems} currentPath={location.pathname} onNavigate={handleNav} />
          <NavGroup title="Other accounts" items={otherAccountsItems} currentPath={location.pathname} onNavigate={handleNav} />
        </CollapsibleContent>
      </Collapsible>

      <Divider />

      {/* Settings Section (collapsible) */}
      <Collapsible
        open={openSection === 'settings' ? true : undefined}
        onOpenChange={(open) => { if (!open) onSectionChange?.(null); }}
      >
        <CollapsibleTrigger className={styles.collapsibleHeader}>
          <SectionRow icon={<Gear />} label="Settings" showChevron />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SideNavigation aria-label="Settings">
            <SideNavigationItem href="/" isCurrent={location.pathname === '/'} onClick={(e) => handleNav(e, '/')}>
              Home
            </SideNavigationItem>
          </SideNavigation>
          <NavGroup
            title="Personal information"
            currentPath={location.pathname}
            onNavigate={handleNav}
            items={[
              { label: 'Contact info and password', path: '/settings/contact' },
              { label: 'Passkeys', path: '/settings/passkeys' },
              { label: 'Addresses', path: '/settings/addresses' },
              { label: 'Wallet', path: '/settings/wallet' },
            ]}
          />
          <NavGroup
            title="Communications and privacy"
            currentPath={location.pathname}
            onNavigate={handleNav}
            items={[
              { label: 'Communication preferences', path: '/settings/communication' },
              { label: 'Privacy', path: '/settings/privacy' },
            ]}
          />
          <NavGroup
            title="Shopping settings"
            currentPath={location.pathname}
            onNavigate={handleNav}
            items={[
              { label: 'Language settings', path: '/settings/language' },
            ]}
          />
        </CollapsibleContent>
      </Collapsible>

      <Divider />

      {/* Sign Out — same collapsibleHeader layout, no chevron */}
      <button className={styles.collapsibleHeader} onClick={() => navigate('/sign-out')}>
        <SectionRow icon={<SignOut />} label="Sign Out" />
      </button>
    </aside>
  );
}
