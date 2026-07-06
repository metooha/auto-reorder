import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { OrderStatusCard } from '@/components/walmart/OrderStatusCard';
import { OrderStatusBanner } from '@/components/walmart/OrderStatusBanner';
import { NewArrivalsCarousel } from '@/components/walmart/NewArrivalsCarousel';
import { JumpRightBackIn } from '@/components/walmart/JumpRightBackIn';
import styles from './HomePageWidgets.module.css';

const CDN = 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F';

export default function HomePageWidgetsPage() {
  const navigate = useNavigate();

  return (
    <ComponentPageLayout
      section="WCP Patterns"
      title="Home Page Widgets"
      description="Contextual widgets rendered on the Walmart home page — an order status notification card, a desktop-only order status banner, an auto-playing promotional carousel, and a personalized 'Jump right back in' product shelf."
    >

      {/* ── OrderStatusCard ───────────────────────────────────── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Order Status Card</h2>
        <p className={styles.sectionDesc}>
          A dismissible card shown below the mobile header when the user has an active order. Contains a product thumbnail, a status line, a bold delivery estimate, and a "Track" link.
        </p>
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>OrderStatusCard</span>
          <Tag variant="success">{'< 1024px'}</Tag>
          <Tag variant="neutral">Dismissible</Tag>
          <p className={styles.metaDesc}>
            Hidden on desktop via <code>lg:hidden</code>. Renders <code>null</code> after the user taps the close button. Pass the same CDN image hash used by the order's product.
          </p>
        </div>
        <div className={styles.frame}>
          <div className={styles.mobileFrame}>
            <OrderStatusCard
              image={`${CDN}5f02b529221349099118d275e7e1d748?format=webp&width=80`}
              statusLine="Your order is on the way"
              deliveryLine="Arrives tomorrow by 8pm"
              trackHref="/walmart/purchase-history"
            />
          </div>
        </div>
      </div>

      {/* ── OrderStatusBanner ─────────────────────────────────── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Order Status Banner</h2>
        <p className={styles.sectionDesc}>
          A compact inline banner shown at the top of the desktop home page when there is an active delivery. Includes an icon, status text with a pipe separator, and a "Track" link. Dismissible.
        </p>
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>OrderStatusBanner</span>
          <Tag variant="info">{'≥ 1024px'}</Tag>
          <Tag variant="neutral">Dismissible</Tag>
          <p className={styles.metaDesc}>
            No props required — the banner uses hardcoded demo content. Replace the static strings and image src with dynamic order data in production.
          </p>
        </div>
        <div className={styles.frame}>
          <div className={styles.fullFrame}>
            <OrderStatusBanner />
          </div>
        </div>
      </div>

      {/* ── NewArrivalsCarousel ───────────────────────────────── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>New Arrivals Carousel</h2>
        <p className={styles.sectionDesc}>
          Auto-advancing hero image carousel with a text panel overlay, play/pause control, and prev/next navigation. Advances every 4 seconds. Pauses when the user interacts with the controls.
        </p>
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>NewArrivalsCarousel</span>
          <Tag variant="neutral">Auto-play</Tag>
          <Tag variant="neutral">No props</Tag>
          <p className={styles.metaDesc}>
            Slides are hardcoded inside the component. Swap out the <code>SLIDES</code> array in <code>NewArrivalsCarousel.tsx</code> to change slide content. No props required.
          </p>
        </div>
        <div className={styles.frame}>
          <div className={styles.fullFrame}>
            <NewArrivalsCarousel />
          </div>
        </div>
      </div>

      {/* ── JumpRightBackIn ───────────────────────────────────── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Jump Right Back In</h2>
        <p className={styles.sectionDesc}>
          Horizontally scrollable shelf of recently viewed products. Each tile shows a product image with a heart-save button, an "Add" or "Options" CTA, price (with optional rollback), and a truncated product name.
        </p>
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>JumpRightBackIn</span>
          <Tag variant="neutral">No props</Tag>
          <Tag variant="info">Home page</Tag>
          <p className={styles.metaDesc}>
            Product tiles are hardcoded inside the component. In production, replace the <code>PRODUCTS</code> array with personalised recently-viewed data. No props required.
          </p>
        </div>
        <div className={styles.frame}>
          <div className={styles.fullFrame}>
            <JumpRightBackIn />
          </div>
        </div>
      </div>

      {/* ── Live page link ─────────────────────────────────────── */}
      <div style={{
        padding: '16px',
        background: 'var(--ld-semantic-color-fill-brand-subtle, #E9F1FE)',
        borderRadius: '8px',
        fontFamily: 'var(--ld-semantic-font-family-sans)',
        fontSize: '14px',
        color: 'var(--ld-semantic-color-text, #2e2f32)',
        lineHeight: 1.5,
      }}>
        <strong>Live preview:</strong> All four widgets are rendered together on the{' '}
        <Button variant="tertiary" size="small" onClick={() => navigate('/walmart')}>
          Walmart home page →
        </Button>
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
              name: 'OrderStatusCard',
              tag: 'Mobile only',
              tagVariant: 'success' as const,
              code: '<OrderStatusCard image="..." statusLine="..." deliveryLine="..." trackHref="..." />',
              path: '@/components/walmart/OrderStatusCard',
            },
            {
              name: 'OrderStatusBanner',
              tag: 'Desktop only',
              tagVariant: 'info' as const,
              code: '<OrderStatusBanner />',
              path: '@/components/walmart/OrderStatusBanner',
            },
            {
              name: 'NewArrivalsCarousel',
              tag: 'No props',
              tagVariant: 'neutral' as const,
              code: '<NewArrivalsCarousel />',
              path: '@/components/walmart/NewArrivalsCarousel',
            },
            {
              name: 'JumpRightBackIn',
              tag: 'No props',
              tagVariant: 'neutral' as const,
              code: '<JumpRightBackIn />',
              path: '@/components/walmart/JumpRightBackIn',
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
