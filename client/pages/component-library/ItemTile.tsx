import React from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { Tag } from '@/components/ui/Tag';
import { ProductCardList } from '@/components/walmart/ProductCardList';
import { ProductCardGrid } from '@/components/walmart/ProductCardGrid';
import { CarouselProductCard } from '@/components/walmart/CarouselProductCard';
import { WCPItemTile } from '@/components/walmart/WCPItemTile';
import { WCPAddToCart } from '@/components/walmart/WCPAddToCart';
import { FlashDealsItemTile } from '@/components/walmart/FlashDealsItemTile';
import { PromotionalItemTile } from '@/components/walmart/PromotionalItemTile';
import { CondensedItemTile } from '@/components/walmart/CondensedItemTile';
import { OrderSummaryCard } from '@/components/walmart/OrderSummaryCard';
import { PRODUCT_IMAGES } from '@/components/walmart/productImages';
import styles from './ProductCards.module.css';

const CDN = 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F';

// ── FlashDealsItemTile samples ─────────────────────────────────────────────────
const FLASH_DEALS_SAMPLES: import('@/components/walmart/FlashDealsItemTile').FlashDealsItemTileProps[] = [
  {
    image: PRODUCT_IMAGES.flashEarrings,
    name: 'CZ Stud Earrings, 14K Gold Plated Round...',
    price: '4',
    cents: '97',
    originalPrice: '$12.99',
    pricePrefix: 'Now',
    badge: { label: 'Deal', type: 'deal' as const },
    actionType: 'add',
    idx: 100,
  },
  {
    image: PRODUCT_IMAGES.flashHumidifier,
    name: 'Cool Mist Humidifier, 2.5L Top Fill...',
    price: '19',
    cents: '88',
    originalPrice: '$34.99',
    pricePrefix: 'Now',
    badge: { label: 'Best seller', type: 'bestseller' as const },
    actionType: 'options',
    optionsText: '3 options',
    idx: 101,
  },
  {
    image: PRODUCT_IMAGES.flashTankTops,
    name: "Time & Tru Women's Tank Top, 3-Pack...",
    price: '8',
    cents: '96',
    badge: { label: 'Rollback', type: 'rollback' as const },
    actionType: 'add',
    idx: 102,
  },
];

// ── PromotionalItemTile samples ───────────────────────────────────────────────
// ── CondensedItemTile samples ─────────────────────────────────────────────────
const CONDENSED_TILE_SAMPLES = [
  { image: PRODUCT_IMAGES.redApple, price: '3', cents: '25', tag: '5 oz' },
  { image: PRODUCT_IMAGES.eggs6Count, price: '2', cents: '48' },
  { image: PRODUCT_IMAGES.oatlyOatMilk, price: '4', cents: '98', tag: '64 oz' },
  { image: PRODUCT_IMAGES.goodCultureCottageCheese, price: '3', cents: '97', tag: '16 oz' },
];

const PROMO_TILE_SAMPLES = [
  { image: PRODUCT_IMAGES.starbucksDoubleshot, price: '3', cents: '68' },
  { image: PRODUCT_IMAGES.oatlyOatMilk, price: '4', cents: '98' },
  { image: PRODUCT_IMAGES.skinnyPopPopcorn, price: '3', cents: '48' },
  { image: PRODUCT_IMAGES.freshStrawberries, price: '2', cents: '97' },
];

// ── WCPItemTile samples ───────────────────────────────────────────────────────
const ITEM_TILE_DEFAULT = {
  image: PRODUCT_IMAGES.airFryer,
  name: 'Ninja 4 Qt Air Fryer, Nonstick Basket...',
  price: '98',
  cents: '00',
  badge: { label: 'Best seller', type: 'bestseller' as const },
};

const ITEM_TILE_SAVINGS = {
  image: PRODUCT_IMAGES.countertopBlender,
  name: 'VAVSEA 3-in-1 Blender System...',
  price: '169',
  cents: '98',
  originalPrice: '$200.00',
  pricePrefix: 'Now',
  priceSuffix: '/mo',
  badge: { label: 'Best seller', type: 'bestseller' as const },
};

const ITEM_TILE_ROLLBACK = {
  image: PRODUCT_IMAGES.rattanCabinet,
  name: 'Rattan Storage Cabinet, Modern...',
  price: '89',
  cents: '00',
  originalPrice: '$129.00',
  pricePrefix: 'Now',
  badge: { label: 'Rollback', type: 'rollback' as const },
};

const ITEM_TILE_PLAIN = {
  image: PRODUCT_IMAGES.digitalCamera,
  name: 'Vivitar Popnap Digital Camera...',
  price: '24',
  cents: '88',
};

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
export default function ItemTilePage() {
  return (
    <ComponentPageLayout
      section="WCP Components"
      title="Item Tile"
      description="Product tile and card components used across search results, category pages, home-page carousels, and 2×2 category grids. Each card is a standalone component — combine them to build rich product browsing experiences."
    >

      {/* ── WCPItemTile ───────────────────────────────────────── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>WCPItemTile</h2>
        <p className={styles.sectionDesc}>
          Compact product tile used inside 2×2 category grids (e.g. "Jump right back in" on the home page). Features a product image, WCPFlag badge, WCPHeartView toggle, and flexible price display with default and savings variants.
        </p>

        {/* Default price variant */}
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>Default price</span>
          <Tag variant="neutral">Item Tile</Tag>
          <p className={styles.metaDesc}>
            Standard price display with <code>$</code> superscript, dollar value at 24px, and cents superscript. Used when no <code>pricePrefix</code> is set.
          </p>
        </div>

        <div className={styles.frame}>
          <div className={styles.gridFrame}>
            <WCPItemTile {...ITEM_TILE_DEFAULT} />
            <WCPItemTile {...ITEM_TILE_PLAIN} />
          </div>
        </div>

        {/* Savings / "Now" variant */}
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>Reduced price ("Now")</span>
          <Tag variant="success">Savings</Tag>
          <p className={styles.metaDesc}>
            Green price row triggered by setting <code>pricePrefix="Now"</code>. Shows strikethrough original price and optional <code>/mo</code> suffix.
          </p>
        </div>

        <div className={styles.frame}>
          <div className={styles.gridFrame}>
            <WCPItemTile {...ITEM_TILE_SAVINGS} />
            <WCPItemTile {...ITEM_TILE_ROLLBACK} />
          </div>
        </div>

        {/* 2×2 grid layout */}
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>2×2 Grid layout</span>
          <Tag variant="info">Category card</Tag>
          <p className={styles.metaDesc}>
            Four tiles in a grid as used inside the "Jump right back in" category cards. All tiles have consistent sizing.
          </p>
        </div>

        <div className={styles.frame}>
          <div className={styles.gridFrame}>
            <WCPItemTile {...ITEM_TILE_SAVINGS} />
            <WCPItemTile {...ITEM_TILE_DEFAULT} />
            <WCPItemTile {...ITEM_TILE_ROLLBACK} />
            <WCPItemTile {...ITEM_TILE_PLAIN} />
          </div>
        </div>

        {/* With Add to Cart */}
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>With Add to Cart</span>
          <Tag variant="success">New</Tag>
          <p className={styles.metaDesc}>
            Pass <code>onAddToCart</code> to render a <code>WCPAddToCart</code> button at the bottom-right of the image area. Choose <code>addToCartVariant</code> for primary (solid) or tertiary (bordered).
          </p>
        </div>

        <div className={styles.frame}>
          <div className={styles.gridFrame}>
            <WCPItemTile {...ITEM_TILE_DEFAULT} onAddToCart={() => {}} addToCartVariant="primary" />
            <WCPItemTile {...ITEM_TILE_PLAIN} onAddToCart={() => {}} addToCartVariant="tertiary" />
          </div>
        </div>

        <PropTable rows={[
          { name: 'image', required: true, description: 'Product image URL — use CDN with ?format=webp&width=400' },
          { name: 'name', required: true, description: 'Full product name, shown as 1-line clamp' },
          { name: 'price', required: true, description: 'Dollar portion of the price, e.g. "98"' },
          { name: 'cents', required: true, description: 'Cents portion of the price, e.g. "00"' },
          { name: 'originalPrice', required: false, description: 'Strikethrough original price, e.g. "$200.00"' },
          { name: 'pricePrefix', required: false, description: '"Now" — triggers green savings style for the entire price row' },
          { name: 'priceSuffix', required: false, description: '"/mo" — appended after cents, aligned to bottom' },
          { name: 'badge', required: false, description: '{ label, type } — badge overlay using WCPFlag. Types: bestseller, deal, popular, rollback' },
          { name: 'onAddToCart', required: false, description: 'Callback (count) => void — renders WCPAddToCart at bottom-right of image area' },
          { name: 'addToCartVariant', required: false, description: "'primary' (solid blue) or 'tertiary' (bordered). Defaults to 'primary'" },
        ]} />
      </div>

      {/* ── WCPAddToCart (standalone) ──────────────────────────── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>WCPAddToCart</h2>
        <p className={styles.sectionDesc}>
          Compact add-to-cart trigger using the XSmall QuantityStepper with invisible 44&times;44px touch-target padding. Designed for use inside item tiles and product cards.
        </p>

        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>Variants</span>
          <Tag variant="info">XSmall</Tag>
          <p className={styles.metaDesc}>
            Two variants: <code>primary</code> (solid blue pill, white icon) and <code>tertiary</code> (bordered pill, dark icon).
          </p>
        </div>

        <div className={styles.frame}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px', padding: '16px' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '8px' }}>Primary</p>
              <WCPAddToCart variant="primary" />
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '8px' }}>Tertiary</p>
              <WCPAddToCart variant="tertiary" />
            </div>
          </div>
        </div>

        <PropTable rows={[
          { name: 'variant', required: false, description: "'primary' (solid blue) or 'tertiary' (bordered). Defaults to 'tertiary'" },
          { name: 'defaultCount', required: false, description: 'Initial quantity. 0 = show icon-only add button' },
          { name: 'maxQuantity', required: false, description: 'Maximum allowed quantity' },
          { name: 'disabled', required: false, description: 'Disables the entire component' },
          { name: 'onChange', required: false, description: 'Callback (count) => void — fires on quantity change' },
        ]} />
      </div>

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

      {/* ── FlashDealsItemTile ─────────────────────────────────── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>FlashDealsItemTile</h2>
        <p className={styles.sectionDesc}>
          Card variant used inside the Flash Deals carousel on the home page. Features a no-fill bordered card with a WCPFlag badge overlay, WCPHeartView toggle, green &quot;Now&quot; savings pricing, and a compact &quot;+ Add&quot; or &quot;Options&quot; action button.
        </p>

        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>Deal card with Add action</span>
          <Tag variant="success">Savings</Tag>
          <Tag variant="neutral">Flash Deals</Tag>
          <p className={styles.metaDesc}>
            Uses <code>actionType=&quot;add&quot;</code> — tapping the button immediately adds the item to the cart via <code>CartContext</code>.
          </p>
        </div>

        <div className={styles.frame}>
          <div className={styles.carouselFrame}>
            {FLASH_DEALS_SAMPLES.filter(s => s.actionType === 'add').map((p, i) => (
              <div key={i} className={styles.carouselCard} style={{ flex: '0 0 180px' }}>
                <FlashDealsItemTile {...p} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>Options variant</span>
          <Tag variant="info">Multi-SKU</Tag>
          <p className={styles.metaDesc}>
            Uses <code>actionType=&quot;options&quot;</code> with an <code>optionsText</code> label. Useful when the product has multiple sizes or colors.
          </p>
        </div>

        <div className={styles.frame}>
          <div className={styles.carouselFrame}>
            {FLASH_DEALS_SAMPLES.map((p, i) => (
              <div key={i} className={styles.carouselCard} style={{ flex: '0 0 180px' }}>
                <FlashDealsItemTile {...p} />
              </div>
            ))}
          </div>
        </div>

        <PropTable rows={[
          { name: 'image', required: true, description: 'Product image URL — use CDN with ?format=webp&width=400' },
          { name: 'name', required: true, description: 'Full product name, shown as 2-line clamp' },
          { name: 'price', required: true, description: 'Dollar portion of the price, e.g. "4"' },
          { name: 'cents', required: true, description: 'Cents portion of the price, e.g. "97"' },
          { name: 'actionType', required: true, description: "'add' renders a + Add button; 'options' renders an Options button" },
          { name: 'idx', required: true, description: 'Index used to identify the tile in cart state updates' },
          { name: 'originalPrice', required: false, description: 'Strikethrough original price, e.g. "$12.99"' },
          { name: 'pricePrefix', required: false, description: '"Now" — triggers green savings style' },
          { name: 'badge', required: false, description: '{ label, type } — WCPFlag badge overlay. Types: bestseller, deal, popular, rollback, clearance' },
          { name: 'optionsText', required: false, description: 'Text shown below price, e.g. "3 options"' },
        ]} />
      </div>

      {/* ── CondensedItemTile ─────────────────────────────────── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>CondensedItemTile</h2>
        <p className={styles.sectionDesc}>
          Compact circular-image tile used in grocery lists and shopping lists. Features a rounded product image with an add-to-cart overlay, price display with OpenType superscript formatting, and an optional size/options tag pill.
        </p>

        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>Primary variant</span>
          <Tag variant="success">Grocery</Tag>
          <p className={styles.metaDesc}>
            Uses <code>variant="primary"</code> — solid blue add-to-cart button in the top-right corner of the image area.
          </p>
        </div>

        <div className={styles.frame}>
          <div className={styles.carouselFrame}>
            {CONDENSED_TILE_SAMPLES.map((p, i) => (
              <div key={i} className={styles.carouselCard} style={{ flex: '0 0 96px' }}>
                <CondensedItemTile {...p} variant="primary" onAddToCart={() => {}} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>Tertiary variant</span>
          <Tag variant="neutral">Bordered</Tag>
          <p className={styles.metaDesc}>
            Uses <code>variant="tertiary"</code> — bordered add-to-cart button, lighter visual weight.
          </p>
        </div>

        <div className={styles.frame}>
          <div className={styles.carouselFrame}>
            {CONDENSED_TILE_SAMPLES.map((p, i) => (
              <div key={i} className={styles.carouselCard} style={{ flex: '0 0 96px' }}>
                <CondensedItemTile {...p} variant="tertiary" onAddToCart={() => {}} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>Loading state</span>
          <Tag variant="info">State</Tag>
          <p className={styles.metaDesc}>
            Pass <code>loading=true</code> to dim the tile and disable interaction.
          </p>
        </div>

        <div className={styles.frame}>
          <div className={styles.carouselFrame}>
            {CONDENSED_TILE_SAMPLES.slice(0, 2).map((p, i) => (
              <div key={i} className={styles.carouselCard} style={{ flex: '0 0 96px' }}>
                <CondensedItemTile {...p} loading onAddToCart={() => {}} />
              </div>
            ))}
          </div>
        </div>

        <PropTable rows={[
          { name: 'image', required: true, description: 'Product image URL — use CDN with ?format=webp&width=400' },
          { name: 'price', required: true, description: 'Dollar portion of the price, e.g. "3"' },
          { name: 'cents', required: true, description: 'Cents portion of the price, e.g. "25"' },
          { name: 'tag', required: false, description: 'Size/options tag text shown as a pill next to the price, e.g. "5 oz"' },
          { name: 'variant', required: false, description: "'primary' (solid blue) or 'tertiary' (bordered). Defaults to 'primary'" },
          { name: 'loading', required: false, description: 'When true, renders the tile at reduced opacity with no interaction' },
          { name: 'onAddToCart', required: false, description: 'Callback (count) => void — renders WCPAddToCart in image area when provided' },
        ]} />
      </div>

      {/* ── PromotionalItemTile ────────────────────────────────── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>PromotionalItemTile</h2>
        <p className={styles.sectionDesc}>
          Compact tile variant used inside promotional carousels (e.g. &quot;Continue shopping&quot; and &quot;Buy it again&quot;). Shows a product image, price, and an inline QuantityStepper for quick add-to-cart. No product name or badge — optimized for minimal horizontal footprint.
        </p>

        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>Promo carousel tile</span>
          <Tag variant="neutral">Carousel</Tag>
          <Tag variant="info">Grocery</Tag>
          <p className={styles.metaDesc}>
            Each tile is self-contained — pass <code>idx</code> and <code>onQuantityChange</code> to wire up cart state from the parent carousel.
          </p>
        </div>

        <div className={styles.frame}>
          <div className={styles.carouselFrame}>
            {PROMO_TILE_SAMPLES.map((p, i) => (
              <div key={i} className={styles.carouselCard}>
                <PromotionalItemTile
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
          { name: 'idx', required: true, description: 'Card index for identifying quantity changes' },
          { name: 'onQuantityChange', required: true, description: 'Callback (idx, qty) => void — fires when stepper changes' },
        ]} />
      </div>

      {/* ── OrderSummaryCard ───────────────────────────────────── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>OrderSummaryCard</h2>
        <p className={styles.sectionDesc}>
          Checkout summary card used when item tiles are grouped together. Shows an estimated total header with an Edit action, line items (total + estimated taxes), and a payment method row with a large price display. Features the LD 3.5 animated magic-stroke gradient border.
        </p>

        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>Default</span>
          <Tag variant="neutral">Grouped tiles</Tag>
          <p className={styles.metaDesc}>
            Drop below a set of grouped <code>CondensedItemTile</code> components. Pass real order data via props — all values default to sample data.
          </p>
        </div>

        <div className={styles.frame}>
          <div style={{ maxWidth: '375px', margin: '0 auto', padding: '16px', background: '#fff' }}>
            <OrderSummaryCard
              itemCount={14}
              total="55.59"
              estimatedTaxes="$0.00"
              paymentLast4="1234"
              onEdit={() => {}}
            />
          </div>
        </div>

        <PropTable rows={[
          { name: 'itemCount', required: false, description: 'Number of items in the order, shown in the header and line item label. Defaults to 14.' },
          { name: 'total', required: false, description: 'Order total as a decimal string, e.g. "55.59". Used for the header, line item, and large payment amount.' },
          { name: 'estimatedTaxes', required: false, description: 'Estimated tax string shown in the line items row, e.g. "$0.00".' },
          { name: 'paymentLast4', required: false, description: 'Last 4 digits of the payment card shown next to the VISA logo.' },
          { name: 'onEdit', required: false, description: 'Callback fired when the "Edit" button is tapped.' },
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
              name: 'FlashDealsItemTile',
              tag: 'Flash Deals',
              tagVariant: 'success' as const,
              code: '<FlashDealsItemTile image="..." name="..." price="4" cents="97" actionType="add" idx={0} />',
              path: '@/components/walmart/FlashDealsItemTile',
            },
            {
              name: 'PromotionalItemTile',
              tag: 'Promo',
              tagVariant: 'neutral' as const,
              code: '<PromotionalItemTile image="..." price="3" cents="68" idx={0} onQuantityChange={fn} />',
              path: '@/components/walmart/PromotionalItemTile',
            },
            {
              name: 'WCPItemTile',
              tag: 'Item Tile',
              tagVariant: 'success' as const,
              code: '<WCPItemTile image="..." name="..." price="98" cents="00" />',
              path: '@/components/walmart/WCPItemTile',
            },
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
              name: 'CondensedItemTile',
              tag: 'Grocery',
              tagVariant: 'success' as const,
              code: '<CondensedItemTile image="..." price="3" cents="25" tag="5 oz" onAddToCart={fn} />',
              path: '@/components/walmart/CondensedItemTile',
            },
            {
              name: 'CarouselProductCard',
              tag: 'Carousel',
              tagVariant: 'neutral' as const,
              code: '<CarouselProductCard image="..." price="3" cents="68" idx={0} onQuantityChange={fn} />',
              path: '@/components/walmart/CarouselProductCard',
            },
            {
              name: 'OrderSummaryCard',
              tag: 'Grouped tiles',
              tagVariant: 'info' as const,
              code: '<OrderSummaryCard itemCount={14} total="55.59" estimatedTaxes="$0.00" paymentLast4="1234" />',
              path: '@/components/walmart/OrderSummaryCard',
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
