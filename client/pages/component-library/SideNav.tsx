import React from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { Tag } from '@/components/ui/Tag';
import { AccountSideNav } from '@/components/walmart/AccountSideNav';
import styles from './SideNav.module.css';

export default function SideNavPage() {
  return (
    <ComponentPageLayout
      section="WCP Patterns"
      title="Side Nav"
      description="Collapsible side navigation patterns used for account management and contextual sub-navigation within Walmart pages."
    >

      {/* ── Account Side Nav Preview ── */}
      <div className={styles.previewSection}>
        <div className={styles.previewHeader}>
          <h2 className={styles.previewTitle}>Account Side Nav</h2>
          <Tag variant="info">Account pages</Tag>
        </div>

        <p className={styles.previewDesc}>
          Used on account-level pages to provide navigation between profile, orders, payments, addresses, and settings. Supports a selected item state and optional icon-only collapsed mode.
        </p>

        <div className={styles.frame}>
          <div className={styles.sideNavFrame}>
            <AccountSideNav />
          </div>
        </div>
      </div>

      {/* ── Pattern guidelines ── */}
      <div className={styles.guidelinesSection}>
        <h2 className={styles.guidelinesTitle}>Pattern Guidelines</h2>
        <div className={styles.guidelinesGrid}>
          <div className={styles.guidelineCard}>
            <h3 className={styles.guidelineCardTitle}>Collapsible sections</h3>
            <p className={styles.guidelineCardDesc}>
              Group related navigation items under collapsible section headers. Sections can be toggled open or closed, and their state is persisted in <code>localStorage</code> so users' preferences are remembered across sessions.
            </p>
          </div>
          <div className={styles.guidelineCard}>
            <h3 className={styles.guidelineCardTitle}>Active item</h3>
            <p className={styles.guidelineCardDesc}>
              The currently active page is highlighted with the primary brand color using the <code>isCurrent</code> prop on <code>SideNavigationItem</code>. Only one item should be active at a time.
            </p>
          </div>
          <div className={styles.guidelineCard}>
            <h3 className={styles.guidelineCardTitle}>Mobile drawer</h3>
            <p className={styles.guidelineCardDesc}>
              On small screens, the side nav is hidden behind a hamburger button and slides in as a full-height drawer with a backdrop overlay. The drawer closes when a link is selected or the backdrop is tapped.
            </p>
          </div>
          <div className={styles.guidelineCard}>
            <h3 className={styles.guidelineCardTitle}>Sticky positioning</h3>
            <p className={styles.guidelineCardDesc}>
              On desktop, the side nav uses <code>position: sticky</code> so it remains visible while the main content area scrolls. The sidebar itself is independently scrollable when its content exceeds the viewport height.
            </p>
          </div>
        </div>
      </div>

      {/* ── Usage table ── */}
      <div className={styles.usageSection}>
        <h2 className={styles.usageTitle}>Import Reference</h2>
        <div className={styles.usageTable}>
          <div className={styles.usageRowHeader}>
            <span>Component</span>
            <span>Usage</span>
            <span>Import path</span>
          </div>
          <div className={styles.usageRow}>
            <div className={styles.usageCell}>
              <span className={styles.usagePlatform}>Account Side Nav</span>
              <Tag variant="info">Account pages</Tag>
            </div>
            <div className={styles.usageCell}>
              <code className={styles.usageCode}>{'<AccountSideNav />'}</code>
            </div>
            <div className={styles.usageCell}>
              <span className={styles.usageImport}>@/components/walmart/AccountSideNav</span>
            </div>
          </div>
          <div className={styles.usageRow}>
            <div className={styles.usageCell}>
              <span className={styles.usagePlatform}>Side Navigation</span>
              <Tag variant="neutral">LD 3.5</Tag>
            </div>
            <div className={styles.usageCell}>
              <code className={styles.usageCode}>{'<SideNavigation>'}</code>
            </div>
            <div className={styles.usageCell}>
              <span className={styles.usageImport}>@/components/ui/SideNavigation</span>
            </div>
          </div>
          <div className={styles.usageRow}>
            <div className={styles.usageCell}>
              <span className={styles.usagePlatform}>Side Nav Item</span>
              <Tag variant="neutral">LD 3.5</Tag>
            </div>
            <div className={styles.usageCell}>
              <code className={styles.usageCode}>{'<SideNavigationItem>'}</code>
            </div>
            <div className={styles.usageCell}>
              <span className={styles.usageImport}>@/components/ui/SideNavigation</span>
            </div>
          </div>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
