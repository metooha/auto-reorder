import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { Tag } from '@/components/ui/Tag';
import { SearchResultsHeader } from '@/components/walmart/SearchResultsHeader';
import { SearchFilterBar } from '@/components/walmart/SearchFilterBar';
import { ProductCardList } from '@/components/walmart/ProductCardList';
import { ProductCardGrid } from '@/components/walmart/ProductCardGrid';
import styles from './SearchResults.module.css';

const CDN = 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F';

// Sample data: list-view (cereal search)
const LIST_CHIPS = ['In-store', 'EBT eligible', 'Brand', 'Flavor', 'Price', 'Special offers'] as const;

const LIST_PRODUCTS = [
  {
    name: "Kellogg's Frosted Flakes, Breakfast Cereal, Original, Family Size, 13.5 oz",
    price: '3', cents: '68', unitPrice: '$4.36/lb',
    flag: 'Best seller', flagVariant: 'default' as const,
    rating: 4.7, ratingCount: '12,234',
    image: `${CDN}783f38e6d773461b95706408b1a14434?format=webp&width=400`,
    pickup: '2 pm', ebt: true,
  },
  {
    name: "General Mills Cheerios Heart Healthy Cereal, Gluten Free, 8.9 oz",
    price: '3', cents: '98', unitPrice: '$7.15/lb',
    rating: 4.6, ratingCount: '8,901',
    image: `${CDN}783f38e6d773461b95706408b1a14434?format=webp&width=400`,
    pickup: '2 pm', ebt: true,
  },
  {
    name: "Post Honey Bunches of Oats with Almonds Cereal, 18 oz",
    price: '3', cents: '48', unitPrice: '$3.09/lb',
    flag: 'Rollback', flagVariant: 'red' as const, wasPrice: '$4.28',
    rating: 4.5, ratingCount: '6,442',
    image: `${CDN}783f38e6d773461b95706408b1a14434?format=webp&width=400`,
    pickup: 'Tomorrow', ebt: true,
  },
];

// Sample data: grid-view (dresses search)
const GRID_CHIPS = ['In-store', 'Size', 'Color', 'Brand', 'Price', 'Customer rating'] as const;

const GRID_PRODUCTS = [
  {
    name: "Time and Tru Women's Sleeveless Tiered Maxi Dress",
    price: '18', cents: '98', rating: 4.4, ratingCount: '1,247',
    image: `${CDN}4b7f2d27b5e7432fa6f5c9c16e80e3b2?format=webp&width=400`,
    pickup: 'Tomorrow',
  },
  {
    name: "Sofia Jeans Women's Knit Midi Dress with Flutter Sleeves",
    price: '24', cents: '98',
    flag: 'Best seller', flagVariant: 'default' as const,
    rating: 4.6, ratingCount: '3,892',
    image: `${CDN}4b7f2d27b5e7432fa6f5c9c16e80e3b2?format=webp&width=400`,
    pickup: '2 pm',
  },
  {
    name: "Scoop Women's Printed Mesh Maxi Dress",
    price: '34', cents: '00', wasPrice: '$48.00',
    flag: 'Rollback', flagVariant: 'red' as const,
    rating: 4.2, ratingCount: '856',
    image: `${CDN}4b7f2d27b5e7432fa6f5c9c16e80e3b2?format=webp&width=400`,
  },
  {
    name: "Free Assembly Women's Square Neck Mini Dress",
    price: '22', cents: '00', rating: 4.1, ratingCount: '421',
    image: `${CDN}4b7f2d27b5e7432fa6f5c9c16e80e3b2?format=webp&width=400`,
    pickup: '2 pm',
  },
];

type ViewMode = 'list' | 'grid';

export default function SearchResultsPatternPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  return (
    <ComponentPageLayout
      section="WCP Patterns"
      title="Search Results"
      description="The search results page combines three layers — a sticky header with back navigation, a scrollable filter chip bar, and a product list or grid. Toggle between list and grid views below."
    >

      {/* ── A. Results Header ─────────────────────────────────── */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Results Header</h2>
          <Tag variant="neutral">Sticky</Tag>
        </div>
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>SearchResultsHeader</span>
          <Tag variant="info">Mweb</Tag>
          <p className={styles.metaDesc}>
            Sticky header with a back chevron and an inline search bar showing the current query. The Sparky AI sparkle icon appears on the left of the query text.
          </p>
        </div>
        <div className={styles.frame}>
          <div className={styles.mobileFrame}>
            <SearchResultsHeader query="cereal" onBack={() => navigate('/walmart/search/cereal')} />
          </div>
        </div>
      </div>

      {/* ── B. Filter Bar ─────────────────────────────────────── */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Filter Bar</h2>
          <Tag variant="neutral">Interactive</Tag>
        </div>
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>SearchFilterBar</span>
          <Tag variant="info">Mweb</Tag>
          <p className={styles.metaDesc}>
            Horizontally scrollable chip rail with a Filter icon button, a Sort button, a Grid-view toggle, and category-specific filter chips. Chips toggle between active and inactive states on tap.
          </p>
        </div>
        <div className={styles.frame}>
          <div className={styles.mobileFrame}>
            <SearchFilterBar chips={LIST_CHIPS} />
          </div>
        </div>
      </div>

      {/* ── C/D. Product Cards ────────────────────────────────── */}
      <div className={styles.section}>
        <div className={styles.switcher}>
          <div>
            <h2 className={styles.sectionTitle}>Product Results</h2>
            <p className={styles.sectionDesc}>Toggle to preview list vs. grid layout</p>
          </div>
          <ButtonGroup>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setViewMode('list')}
            >
              List view
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setViewMode('grid')}
            >
              Grid view
            </Button>
          </ButtonGroup>
        </div>

        {viewMode === 'list' && (
          <>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>ProductCardList</span>
              <Tag variant="success">Grocery / Staples</Tag>
              <p className={styles.metaDesc}>
                Full-width row card with a tall product image on the left, price, name, rating, EBT eligibility, and pickup time on the right. Includes a heart-favourite button and an "Add to cart" CTA.
              </p>
            </div>
            <div className={styles.frame}>
              <div className={styles.mobileFrame}>
                {LIST_PRODUCTS.map((p, i) => (
                  <ProductCardList key={i} {...p} />
                ))}
              </div>
            </div>
          </>
        )}

        {viewMode === 'grid' && (
          <>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>ProductCardGrid</span>
              <Tag variant="success">Apparel / Fashion</Tag>
              <p className={styles.metaDesc}>
                Two-column image-first grid tile. Large image area, price, product name, rating and pickup info, with a full-width "Add to cart" button. Best for visual categories like clothing or home décor.
              </p>
            </div>
            <div className={styles.frame}>
              <div className={styles.mobileFrame}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', padding: '12px' }}>
                  {GRID_PRODUCTS.map((p, i) => (
                    <ProductCardGrid key={i} {...p} />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── E. Full Composition ───────────────────────────────── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Full Composition</h2>
        <p className={styles.sectionDesc}>
          Header + Filter Bar + Product List stacked — mirrors the structure of the live <code>/walmart/search/cereal</code> page. The header is sticky within this preview frame.
        </p>
        <div className={styles.frame}>
          <div className={styles.compositionFrame}>
            <SearchResultsHeader query="cereal" onBack={() => navigate('/walmart/search/cereal')} />
            <SearchFilterBar chips={LIST_CHIPS} />
            <div style={{ padding: '8px 0 4px', borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)' }}>
              <p style={{ margin: '0 12px', fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle, #6d6e72)' }}>
                1,000+ results for "cereal"
              </p>
            </div>
            {LIST_PRODUCTS.map((p, i) => (
              <ProductCardList key={i} {...p} />
            ))}
            <div style={{ padding: '12px', borderTop: '1px solid var(--ld-semantic-color-separator, #e3e4e5)' }}>
              <Button variant="secondary" size="medium" isFullWidth>Load more results</Button>
            </div>
          </div>
        </div>

        <div className={styles.noteBox}>
          <strong>Live preview:</strong> Visit{' '}
          <Button variant="tertiary" size="small" onClick={() => navigate('/walmart/search/cereal')}>
            /walmart/search/cereal
          </Button>{' '}
          for the list layout or{' '}
          <Button variant="tertiary" size="small" onClick={() => navigate('/walmart/search/dresses')}>
            /walmart/search/dresses
          </Button>{' '}
          for the grid layout.
        </div>
      </div>

      {/* ── F. Import Reference ───────────────────────────────── */}
      <div className={styles.usageSection}>
        <h2 className={styles.usageTitle}>Import Reference</h2>
        <div className={styles.usageTable}>
          <div className={styles.usageRowHeader}>
            <span>Component</span>
            <span>Usage</span>
            <span>Import path</span>
          </div>
          {[
            {
              name: 'SearchResultsHeader',
              tag: 'Sticky header',
              tagVariant: 'neutral' as const,
              code: '<SearchResultsHeader query="..." onBack={fn} />',
              path: '@/components/walmart/SearchResultsHeader',
            },
            {
              name: 'SearchFilterBar',
              tag: 'Filter chips',
              tagVariant: 'neutral' as const,
              code: '<SearchFilterBar chips={[...]} />',
              path: '@/components/walmart/SearchFilterBar',
            },
            {
              name: 'ProductCardList',
              tag: 'List layout',
              tagVariant: 'info' as const,
              code: '<ProductCardList image="..." name="..." price="..." />',
              path: '@/components/walmart/ProductCardList',
            },
            {
              name: 'ProductCardGrid',
              tag: 'Grid layout',
              tagVariant: 'success' as const,
              code: '<ProductCardGrid image="..." name="..." price="..." />',
              path: '@/components/walmart/ProductCardGrid',
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
