import React from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { Tag } from '@/components/ui/Tag';
import { SkylineBanner } from '@/components/walmart/SkylineBanner';
import styles from './HomePageWidgets.module.css';

const CDN = 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F';

const GEICO_LOGO = `${CDN}e49854d53dde4904a3644e06872e21b1?format=webp&width=400`;
const GEICO_PRODUCT = `${CDN}b7ecbf94d42b4e7aafd823d851677509?format=webp&width=400`;
const TANYE_LOGO = 'https://api.builder.io/api/v1/image/assets/TEMP/b1a26e66a9f2b9c467e29b2c6bb339ed58cbcd54?width=154';
const TANYE_PRODUCT = `${CDN}b9a1addd35da48df88f41a3052039cd0?format=webp&width=400`;

export default function PromoBannersPage() {
  return (
    <ComponentPageLayout
      section="WCP Patterns"
      title="Promotions & Banners"
      description="Sponsored and promotional banner components used across search results, purchase history, and home pages. SkylineBanner is the primary sponsored ad unit; PromoBanner is a full-bleed image link."
    >

      {/* ── SkylineBanner ─────────────────────────────────────── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Skyline Banner</h2>
        <p className={styles.sectionDesc}>
          A compact sponsored ad unit rendered between order cards on the Purchase History page and inside search results. Shows a brand logo, headline, subtext, a "Sponsored" label, and a product image on the right.
        </p>

        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>SkylineBanner</span>
          <Tag variant="neutral">Sponsored</Tag>
          <Tag variant="info">Purchase History</Tag>
          <p className={styles.metaDesc}>
            All six props are required. The banner fills its container's width at 64px height. The <code>subtext</code> is hidden on small screens via a responsive CSS breakpoint.
          </p>
        </div>

        {/* Variant 1: Insurance */}
        <div className={styles.frame}>
          <div style={{ padding: '16px', background: 'var(--ld-semantic-color-surface, #fff)' }}>
            <SkylineBanner
              logoSrc={GEICO_LOGO}
              logoAlt="GEICO"
              headline="15 minutes could save you on car insurance."
              subtext="Really. Get a free quote today."
              imageSrc={GEICO_PRODUCT}
              imageAlt="GEICO gecko"
            />
          </div>
        </div>

        {/* Variant 2: Kitchen */}
        <div className={styles.frame}>
          <div style={{ padding: '16px', background: 'var(--ld-semantic-color-surface, #fff)' }}>
            <SkylineBanner
              logoSrc={TANYE_LOGO}
              logoAlt="TANYÉ"
              headline="Enhance your kitchen with top tools"
              subtext="Cook like a pro with the best equipment."
              imageSrc={TANYE_PRODUCT}
              imageAlt="TANYÉ product"
            />
          </div>
        </div>
      </div>

      {/* ── PromoBanner ───────────────────────────────────────── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Promo Banner</h2>
        <p className={styles.sectionDesc}>
          A full-bleed image link banner shown on the desktop home page. The visual is provided entirely via CSS (background-image in <code>PromoBanner.module.css</code>) — swap the image there to change the creative. No props required.
        </p>

        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>PromoBanner</span>
          <Tag variant="info">{'≥ 1024px'}</Tag>
          <Tag variant="neutral">No props</Tag>
          <p className={styles.metaDesc}>
            Hidden on mobile via <code>display: none</code>. The entire clickable surface is an accessible <code>&lt;a&gt;</code> tag with <code>aria-label</code> and a visually-hidden span for screen readers. Update the background-image in <code>PromoBanner.module.css</code> to change the creative.
          </p>
        </div>

        <div className={styles.frame}>
          <div style={{ background: 'var(--ld-semantic-color-surface, #fff)', padding: '16px' }}>
            <div style={{
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              fontSize: '13px',
              color: 'var(--ld-semantic-color-text-subtle, #6d6e72)',
              padding: '24px',
              background: 'var(--ld-semantic-color-background-subtle, #f8f8f8)',
              borderRadius: '8px',
              textAlign: 'center',
            }}>
              PromoBanner renders a full-bleed image link visible only at ≥ 1024px.<br />
              Open <strong>/walmart</strong> on a desktop-sized window to see it live.
            </div>
          </div>
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
              name: 'SkylineBanner',
              tag: 'Sponsored',
              tagVariant: 'neutral' as const,
              code: '<SkylineBanner logoSrc="..." logoAlt="..." headline="..." subtext="..." imageSrc="..." imageAlt="..." />',
              path: '@/components/walmart/SkylineBanner',
            },
            {
              name: 'PromoBanner',
              tag: 'Desktop only',
              tagVariant: 'info' as const,
              code: '<PromoBanner />',
              path: '@/components/walmart/PromoBanner',
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
