import React from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { Tag } from '@/components/ui/Tag';
import { ProductCardList } from '@/components/walmart/ProductCardList';
import { ProductCardGrid } from '@/components/walmart/ProductCardGrid';
import { CarouselProductCard } from '@/components/walmart/CarouselProductCard';
import styles from './ProductCards.module.css';

const CDN = 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F';

// List card samples
const LIST_SAMPLES = [
  {
    name: "Kellogg's Frosted Flakes, Breakfast Cereal, Original, Family Size, 13.5 oz",
    price: '3', cents: '68', unitPrice: '$4.36/lb',
    flag: 'Best seller', flagVariant: 'default' as const,
    rating: 4.7, ratingCount: '12,234',
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

// Grid card samples
const GRID_SAMPLES = [
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
];

// Carousel card samples
const CAROUSEL_SAMPLES = [
  { price: '3', cents: '68', image: `${CDN}783f38e6d773461b95706408b1a14434?format=webp&width=400` },
  { price: '6', cents: '98', image: `${CDN}2e3ad9b09a894c658b053653b52ae341?format=webp&width=400` },
  { price: '4', cents: '48', image: `${CDN}3b1c6c21fa734099a7e94fb02336f7a3?format=webp&width=400` },
];

// ── Shared prop table ─────────────────────────────────────────────────────────
interface PropRow {
  name: string;
  required?: boolean;
  description: string;
}

function PropTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className={styles.propTable}>
      <div className={styles.propRowHeader}>
        <span>Prop</span>
        <span>Required?</span>
        <span>Description</span>
      </div>
      {rows.map((row) => (
        <div key={row.name} className={styles.propRow}>
          <span className={styles.propName}>{row.name}</span>
          <span className={row.required ? styles.propRequired : styles.propOptional}>
            {row.required ? 'Required' : 'Optional'}
          </span>
          <p className={styles.propDesc}>{row.description}</p>
        </div>
      ))}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function ProductCardsPage() {
  return (
    <ComponentPageLayout
      section="WCP Components"
      title="Product Cards"
      description="Three product card components used across search results, category pages, and home-page carousels. Each card is a standalone component — combine them with SearchFilterBar and SearchResultsHeader to build full search patterns."
    >

      {/* ── ProductCardList ───────────────────────────────────── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>ProductCardList</h2>
        <p className={styles.sectionDesc}>
          Full-width row card best suited for grocery and staple categories. Features a tall product image column on the left and rich metadata on the right including price, name, rating, EBT eligibility, and pickup time.
        </p>

        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>ProductCardList</span>
          <Tag variant="info">List layout</Tag>
          <Tag variant="neutral">Mweb</Tag>
          <p className={styles.metaDesc}>
            Used on <code>/walmart/search/cereal</code>. Renders a border-bottom separator between rows.
          </p>
        </div>

        <div className={styles.frame}>
          <div className={styles.mobileFrame}>
            {LIST_SAMPLES.map((p, i) => (
              <ProductCardList key={i} {...p} />
            ))}
          </div>
        </div>

        <PropTable rows={[
          { name: 'image', required: true, description: 'Product image URL — use CDN with ?format=webp&width=400' },
          { name: 'name', required: true, description: 'Full product name shown as a 2-line clamp' },
          { name: 'price', required: true, description: 'Dollar portion of the price, e.g. "3"' },
          { name: 'cents', required: true, description: 'Cents portion of the price, e.g. "68"' },
          { name: 'rating', required: true, description: 'Numeric rating 0–5 passed to the Rating component' },
          { name: 'ratingCount', required: true, description: 'Formatted review count string, e.g. "12,234"' },
          { name: 'wasPrice', required: false, description: 'Original price shown as struck-through when on rollback/sale' },
          { name: 'flag', required: false, description: 'Badge label, e.g. "Best seller" or "Rollback"' },
          { name: 'flagVariant', required: false, description: "Badge color variant: 'default' (dark navy) or 'red' (rollback)" },
          { name: 'unitPrice', required: false, description: 'Per-unit price string, e.g. "$4.36/lb"' },
          { name: 'ebt', required: false, description: 'When true, shows an "EBT eligible" green label' },
          { name: 'pickup', required: false, description: 'Pickup time string, e.g. "2 pm" or "Tomorrow"' },
          { name: 'stock', required: false, description: 'Low-stock warning shown in red, e.g. "Only 3 left"' },
          { name: 'onAddToCart', required: false, description: 'Callback fired when the "Add to cart" button is tapped' },
        ]} />
      </div>

      {/* ── ProductCardGrid ───────────────────────────────────── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>ProductCardGrid</h2>
        <p className={styles.sectionDesc}>
          Two-column image-first tile best suited for apparel, home décor, and other visual categories. Features a large image area at the top and compact metadata below.
        </p>

        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>ProductCardGrid</span>
          <Tag variant="success">Grid layout</Tag>
          <Tag variant="neutral">Mweb</Tag>
          <p className={styles.metaDesc}>
            Used on <code>/walmart/search/dresses</code>. Rendered inside a CSS <code>grid-template-columns: 1fr 1fr</code> container.
          </p>
        </div>

        <div className={styles.frame}>
          <div className={styles.gridFrame}>
            {GRID_SAMPLES.map((p, i) => (
              <ProductCardGrid key={i} {...p} />
            ))}
          </div>
        </div>

        <PropTable rows={[
          { name: 'image', required: true, description: 'Product image URL' },
          { name: 'name', required: true, description: 'Product name, shown as 2-line clamp' },
          { name: 'price', required: true, description: 'Dollar portion of price' },
          { name: 'cents', required: true, description: 'Cents portion of price' },
          { name: 'rating', required: true, description: 'Numeric rating 0–5' },
          { name: 'ratingCount', required: true, description: 'Formatted review count string' },
          { name: 'wasPrice', required: false, description: 'Original price for rollback display' },
          { name: 'flag', required: false, description: 'Badge label overlay on image' },
          { name: 'flagVariant', required: false, description: "Badge color variant: 'default' or 'red'" },
          { name: 'pickup', required: false, description: 'Pickup time string' },
          { name: 'onAddToCart', required: false, description: 'Callback for "Add to cart" tap' },
        ]} />
      </div>

      {/* ── CarouselProductCard ───────────────────────────────── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>CarouselProductCard</h2>
        <p className={styles.sectionDesc}>
          Compact card used inside horizontal carousels such as "New Arrivals" and "Jump Right Back In" on the home page. Shows a product image, price, and an inline quantity stepper / add-to-cart control.
        </p>

        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>CarouselProductCard</span>
          <Tag variant="neutral">Carousel</Tag>
          <Tag variant="info">Home page</Tag>
          <p className={styles.metaDesc}>
            Rendered inside a horizontally-scrolling flex container. Pass <code>idx</code> and <code>onQuantityChange</code> to wire up cart state from the parent.
          </p>
        </div>

        <div className={styles.frame}>
          <div className={styles.carouselFrame}>
            {CAROUSEL_SAMPLES.map((p, i) => (
              <div key={i} className={styles.carouselCard}>
                <CarouselProductCard
                  image={p.image}
                  price={p.price}
                  cents={p.cents}
                  idx={i}
                  onQuantityChange={() => {}}
                />
              </div>
            ))}
          </div>
        </div>

        <PropTable rows={[
          { name: 'image', required: true, description: 'Product image URL' },
          { name: 'price', required: true, description: 'Dollar portion of price' },
          { name: 'cents', required: true, description: 'Cents portion of price' },
          { name: 'idx', required: true, description: 'Card index used to identify which card triggered a quantity change' },
          { name: 'onQuantityChange', required: true, description: 'Callback (idx, qty) => void — fires when quantity stepper changes' },
        ]} />
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
              name: 'ProductCardList',
              tag: 'List layout',
              tagVariant: 'info' as const,
              code: '<ProductCardList image="..." name="..." price="3" cents="68" rating={4.7} ratingCount="12,234" />',
              path: '@/components/walmart/ProductCardList',
            },
            {
              name: 'ProductCardGrid',
              tag: 'Grid layout',
              tagVariant: 'success' as const,
              code: '<ProductCardGrid image="..." name="..." price="18" cents="98" rating={4.4} ratingCount="1,247" />',
              path: '@/components/walmart/ProductCardGrid',
            },
            {
              name: 'CarouselProductCard',
              tag: 'Carousel',
              tagVariant: 'neutral' as const,
              code: '<CarouselProductCard image="..." price="3" cents="68" idx={0} onQuantityChange={fn} />',
              path: '@/components/walmart/CarouselProductCard',
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
