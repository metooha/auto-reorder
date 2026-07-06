import React from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { Tag } from '@/components/ui/Tag';
import { AccountDropdown } from '@/components/walmart/AccountDropdown';
import { DepartmentsDropdown } from '@/components/walmart/DepartmentsDropdown';
import { ReorderDropdown } from '@/components/walmart/ReorderDropdown';
import { MoreLinksDropdown } from '@/components/walmart/MoreLinksDropdown';
import { ServicesDropdown } from '@/components/walmart/ServicesDropdown';
import styles from './HomePageWidgets.module.css';

function DropdownPreviewRow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: 'flex',
      gap: '24px',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      padding: '24px',
      background: 'var(--ld-semantic-color-surface, #fff)',
      minHeight: '64px',
    }}>
      {children}
    </div>
  );
}

export default function DropdownsPage() {
  return (
    <ComponentPageLayout
      section="WCP Components"
      title="Dropdowns"
      description="Navigation and utility dropdown menus used in the Desktop Header and Sub Nav. Each dropdown manages its own open/close state, keyboard navigation, and outside-click dismissal."
    >

      {/* ── AccountDropdown ───────────────────────────────────── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Account Dropdown</h2>
        <p className={styles.sectionDesc}>
          Triggered by the Account button in the desktop header. Opens a panel with links to Purchase History, Walmart+, Account, Subscriptions, Walmart Cash, Language selector, and Sign Out.
        </p>
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>AccountDropdown</span>
          <Tag variant="info">Desktop Header</Tag>
          <p className={styles.metaDesc}>
            Accepts an optional <code>userName</code> prop (default: <code>"Hi, Mi H"</code>). Closes on outside click or <kbd>Escape</kbd>. Uses <code>role="menu"</code> with <code>role="menuitem"</code> for each row.
          </p>
        </div>
        <div className={styles.frame}>
          <DropdownPreviewRow>
            <AccountDropdown userName="Hi, Amy" />
          </DropdownPreviewRow>
        </div>
      </div>

      {/* ── DepartmentsDropdown ───────────────────────────────── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Departments Dropdown</h2>
        <p className={styles.sectionDesc}>
          Shows a list of top-level department categories. Used as the first item in both the desktop SubNav and the mobile SubNav row.
        </p>
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>DepartmentsDropdown</span>
          <Tag variant="info">SubNav</Tag>
          <Tag variant="success">Mobile + Desktop</Tag>
          <p className={styles.metaDesc}>
            Accepts an optional <code>leadingIcon</code> prop. Uses Radix <code>DropdownMenu</code> internally. Department list is hardcoded — update the <code>departments</code> array inside the component to change items.
          </p>
        </div>
        <div className={styles.frame}>
          <DropdownPreviewRow>
            <DepartmentsDropdown />
          </DropdownPreviewRow>
        </div>
      </div>

      {/* ── ServicesDropdown ──────────────────────────────────── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Services Dropdown</h2>
        <p className={styles.sectionDesc}>
          Shows Walmart's service verticals (Pharmacy, Auto Care, Vision, etc.). Rendered next to Departments in the SubNav.
        </p>
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>ServicesDropdown</span>
          <Tag variant="info">SubNav</Tag>
          <Tag variant="neutral">No props</Tag>
        </div>
        <div className={styles.frame}>
          <DropdownPreviewRow>
            <ServicesDropdown />
          </DropdownPreviewRow>
        </div>
      </div>

      {/* ── ReorderDropdown ───────────────────────────────────── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Reorder Dropdown</h2>
        <p className={styles.sectionDesc}>
          Heart/Reorder icon button in the desktop header that opens a panel with Reorder, Lists, and Registries options.
        </p>
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>ReorderDropdown</span>
          <Tag variant="info">Desktop Header</Tag>
          <Tag variant="neutral">No props</Tag>
          <p className={styles.metaDesc}>
            Closes on outside click or <kbd>Escape</kbd>. The three menu items navigate to stub routes that can be replaced with real paths.
          </p>
        </div>
        <div className={styles.frame}>
          <DropdownPreviewRow>
            <ReorderDropdown />
          </DropdownPreviewRow>
        </div>
      </div>

      {/* ── MoreLinksDropdown ─────────────────────────────────── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>More Links Dropdown</h2>
        <p className={styles.sectionDesc}>
          A "More" overflow button at the end of the SubNav that reveals additional navigation links that didn't fit in the main row.
        </p>
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>MoreLinksDropdown</span>
          <Tag variant="info">SubNav</Tag>
          <Tag variant="neutral">No props</Tag>
        </div>
        <div className={styles.frame}>
          <DropdownPreviewRow>
            <MoreLinksDropdown />
          </DropdownPreviewRow>
        </div>
      </div>

      {/* ── Import Reference ──────────────────────────────────── */}
      <div className={styles.usageSection}>
        <h2 className={styles.usageTitle}>Import Reference</h2>
        <div className={styles.usageTable}>
          <div className={styles.usageRowHeader}>
            <span>Component</span>
            <span>Snippet</span>
            <span>Import path</span>
          </div>
          {[
            {
              name: 'AccountDropdown',
              tag: 'Header',
              tagVariant: 'info' as const,
              code: '<AccountDropdown userName="Hi, Amy" />',
              path: '@/components/walmart/AccountDropdown',
            },
            {
              name: 'DepartmentsDropdown',
              tag: 'SubNav',
              tagVariant: 'neutral' as const,
              code: '<DepartmentsDropdown />',
              path: '@/components/walmart/DepartmentsDropdown',
            },
            {
              name: 'ServicesDropdown',
              tag: 'SubNav',
              tagVariant: 'neutral' as const,
              code: '<ServicesDropdown />',
              path: '@/components/walmart/ServicesDropdown',
            },
            {
              name: 'ReorderDropdown',
              tag: 'Header',
              tagVariant: 'info' as const,
              code: '<ReorderDropdown />',
              path: '@/components/walmart/ReorderDropdown',
            },
            {
              name: 'MoreLinksDropdown',
              tag: 'SubNav',
              tagVariant: 'neutral' as const,
              code: '<MoreLinksDropdown />',
              path: '@/components/walmart/MoreLinksDropdown',
            },
          ].map((row) => (
            <div key={row.name} className={styles.usageRow}>
              <div className={styles.usageCell}>
                <span className={styles.usageName}>{row.name}</span>
                <Tag variant={row.tagVariant}>{row.tag}</Tag>
              </div>
              <div className={styles.usageCell}>
                <code className={styles.usageCode}>{row.code}</code>
              </div>
              <div className={styles.usageCell}>
                <span className={styles.usageImport}>{row.path}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ComponentPageLayout>
  );
}
