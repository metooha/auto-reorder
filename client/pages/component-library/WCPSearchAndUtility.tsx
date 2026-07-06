import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { SearchBar } from '@/components/walmart/SearchBar';
import { AddToCart } from '@/components/walmart/AddToCart';
import { SubNav } from '@/components/walmart/SubNav';
import { MobileTopNav } from '@/components/walmart/MobileTopNav';
import styles from './HomePageWidgets.module.css';

export default function WCPSearchAndUtilityPage() {
  const navigate = useNavigate();

  return (
    <ComponentPageLayout
      section="WCP Components"
      title="Search & Utility"
      description="Standalone utility components used across Walmart pages — the mobile search bar, the Add to Cart quantity control, the desktop Sub Nav, and the Mobile Top Nav."
    >

      {/* ── SearchBar ─────────────────────────────────────────── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Search Bar</h2>
        <p className={styles.sectionDesc}>
          The mobile-first search input used on the Product Detail page. Features a rainbow gradient border, a Sparky AI icon, camera and microphone action buttons, and a cart icon with count/price.
        </p>
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>SearchBar</span>
          <Tag variant="success">{'< 1024px'}</Tag>
          <p className={styles.metaDesc}>
            Accepts <code>query</code> (placeholder text), <code>showBackButton</code> (renders a chevron-left), <code>onClick</code> (called when the bar is tapped), and <code>cartCount</code>. Clicking activates a solid blue border replacing the rainbow.
          </p>
        </div>
        <div className={styles.frame}>
          <div style={{ maxWidth: 430, margin: '0 auto', background: 'var(--ld-semantic-color-surface,#fff)', padding: '12px' }}>
            <SearchBar query="Search Walmart" cartCount={3} />
          </div>
        </div>
        <div className={styles.frame}>
          <div style={{ maxWidth: 430, margin: '0 auto', background: 'var(--ld-semantic-color-surface,#fff)', padding: '12px' }}>
            <SearchBar query="cereal" showBackButton cartCount={3} />
          </div>
        </div>
      </div>

      {/* ── AddToCart ─────────────────────────────────────────── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Add to Cart</h2>
        <p className={styles.sectionDesc}>
          A three-state quantity control used inside product cards and the carousel. Starts as a round "+" button, expands into a stepper on first tap, then collapses to a count badge after 5 seconds of inactivity.
        </p>
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>AddToCart</span>
          <Tag variant="neutral">3 states</Tag>
          <p className={styles.metaDesc}>
            <strong>Initial</strong> → tap "+" to add 1 and enter <strong>Expanded</strong> stepper mode → auto-collapses to <strong>Collapsed</strong> count badge after 5 s. Tap the badge to re-expand. Set quantity to 0 to return to Initial state. Fires <code>onQuantityChange(qty)</code> on each change.
          </p>
        </div>
        <div className={styles.frame}>
          <div style={{
            display: 'flex',
            gap: '32px',
            alignItems: 'center',
            flexWrap: 'wrap',
            padding: '24px',
            background: 'var(--ld-semantic-color-surface,#fff)',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ld-semantic-color-text-subtle,#6d6e72)' }}>Initial</span>
              <AddToCart />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ld-semantic-color-text-subtle,#6d6e72)' }}>Expanded (tap + first)</span>
              <AddToCart />
            </div>
          </div>
        </div>
      </div>

      {/* ── SubNav ────────────────────────────────────────────── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Sub Nav</h2>
        <p className={styles.sectionDesc}>
          The desktop secondary navigation bar rendered below the main header. Contains Departments and Services dropdowns on the left, followed by a horizontally-scrollable list of category shortcut links, and a "More" overflow dropdown on the right.
        </p>
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>SubNav</span>
          <Tag variant="info">{'≥ 1024px'}</Tag>
          <Tag variant="neutral">No props</Tag>
          <p className={styles.metaDesc}>
            Navigation links are hardcoded in <code>secondaryLinks</code> inside the component. Update that array to change the shortcut labels and paths. Dropdowns are composed from <code>DepartmentsDropdown</code>, <code>ServicesDropdown</code>, and <code>MoreLinksDropdown</code>.
          </p>
        </div>
        <div className={styles.frame}>
          <div style={{ background: 'var(--ld-semantic-color-surface,#fff)' }}>
            <SubNav />
          </div>
        </div>
      </div>

      {/* ── MobileTopNav ──────────────────────────────────────── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Mobile Top Nav</h2>
        <p className={styles.sectionDesc}>
          The complete sticky mobile header — menu icon, Walmart spark logo, search bar, cart icon. When <code>showHomeExtras</code> is true it also shows the fulfillment-method picker (Shipping / Pickup / Delivery) and the horizontal sub-nav chip row.
        </p>
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>MobileTopNav</span>
          <Tag variant="success">{'< 1024px'}</Tag>
          <p className={styles.metaDesc}>
            Pass <code>showHomeExtras=&#123;true&#125;</code> to render the delivery-method picker and mobile sub-nav (used on the home page). Omit or pass <code>false</code> for a minimal header on interior pages.
          </p>
        </div>

        <div className={styles.frame}>
          <div style={{ maxWidth: 430, margin: '0 auto', overflow: 'hidden' }}>
            <div style={{ position: 'relative' }}>
              <MobileTopNav showHomeExtras={false} />
            </div>
          </div>
        </div>

        <p className={styles.sectionDesc} style={{ marginTop: '-8px' }}>
          With <code>showHomeExtras=&#123;true&#125;</code> — includes the delivery-method picker and mobile sub-nav:
        </p>
        <div className={styles.frame}>
          <div style={{ maxWidth: 430, margin: '0 auto', overflow: 'hidden' }}>
            <div style={{ position: 'relative' }}>
              <MobileTopNav showHomeExtras={true} />
            </div>
          </div>
        </div>

        <div style={{
          padding: '16px',
          background: 'var(--ld-semantic-color-fill-brand-subtle, #E9F1FE)',
          borderRadius: '8px',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          fontSize: '14px',
          color: 'var(--ld-semantic-color-text, #2e2f32)',
          lineHeight: 1.5,
        }}>
          <strong>Live preview:</strong> The full mobile nav with home extras is visible at the top of the{' '}
          <Button variant="tertiary" size="small" onClick={() => navigate('/walmart')}>
            Walmart home page →
          </Button>
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
              name: 'SearchBar',
              tag: 'Mobile',
              tagVariant: 'success' as const,
              code: '<SearchBar query="Search Walmart" cartCount={0} showBackButton={false} />',
              path: '@/components/walmart/SearchBar',
            },
            {
              name: 'AddToCart',
              tag: '3 states',
              tagVariant: 'neutral' as const,
              code: '<AddToCart onQuantityChange={(qty) => {}} />',
              path: '@/components/walmart/AddToCart',
            },
            {
              name: 'SubNav',
              tag: 'Desktop',
              tagVariant: 'info' as const,
              code: '<SubNav />',
              path: '@/components/walmart/SubNav',
            },
            {
              name: 'MobileTopNav',
              tag: 'Mobile',
              tagVariant: 'success' as const,
              code: '<MobileTopNav showHomeExtras={false} />',
              path: '@/components/walmart/MobileTopNav',
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
