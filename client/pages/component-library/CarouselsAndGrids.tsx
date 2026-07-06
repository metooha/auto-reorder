import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { FlashDealsCarousel } from '@/components/walmart/FlashDealsCarousel';
import { NewArrivalsCarousel } from '@/components/walmart/NewArrivalsCarousel';
import { JumpRightBackIn } from '@/components/walmart/JumpRightBackIn';
import { ContinueShopping } from '@/components/walmart/ContinueShopping';
import styles from './CarouselsAndGrids.module.css';

function DemoCard({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <div className={styles.demoCard}>
      <div className={styles.cardLabel}>{title}</div>
      {note && <p className={styles.cardNote}>{note}</p>}
      <div className={styles.cardContent}>{children}</div>
    </div>
  );
}

export default function CarouselsAndGridsPage() {
  return (
    <ComponentPageLayout
      section="WCP Patterns"
      title="Carousels & Product Grids"
      description="Horizontally scrollable product sections used on the Walmart home page. Each carousel uses drag-to-scroll with snap points and optional auto-advance."
    >
      <div className={styles.page}>

        {/* ── New Arrivals Carousel ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>New Arrivals Carousel</h2>
          <p className={styles.sectionDesc}>
            Full-bleed hero carousel with auto-advancing slides. Each slide has an eyebrow, headline, CTA button, and background image. Includes prev/next controls and pagination dots.
          </p>
          <DemoCard title="Auto-advancing hero carousel" note="Pauses on hover. Dots and arrows for manual navigation.">
            <div className={styles.demoWrapper}>
              <NewArrivalsCarousel />
            </div>
          </DemoCard>
        </section>

        {/* ── Jump Right Back In ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Jump Right Back In</h2>
          <p className={styles.sectionDesc}>
            Horizontal scroll row of category cards. Each card contains a header with title and "Shop all" link, plus a 2×2 grid of <code>WCPItemTile</code> product tiles. Uses drag-to-scroll.
          </p>
          <DemoCard title="Category cards with 2×2 product grids" note="Drag to scroll. Each category has its own 'Shop all' link.">
            <div className={styles.demoWrapper}>
              <JumpRightBackIn />
            </div>
          </DemoCard>
        </section>

        {/* ── Flash Deals Carousel ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Flash Deals Carousel</h2>
          <p className={styles.sectionDesc}>
            Horizontal scroll of individual deal cards with no background fill. Each card shows a flag badge, heart icon, product image, green savings price, and an "+ Add" or "Options" button. Uses <code>FlashDealsItemTile</code>.
          </p>
          <DemoCard title="Deal cards with action buttons" note="Cards have borders but no fill. '+ Add' adds to cart via CartContext.">
            <div className={styles.demoWrapper}>
              <FlashDealsCarousel />
            </div>
          </DemoCard>
        </section>

        {/* ── Continue Shopping ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Continue Shopping</h2>
          <p className={styles.sectionDesc}>
            Horizontal scroll row of standalone <code>WCPItemTile</code> cards on a subtle background. Header with title and "View all" link. Uses the same drag-to-scroll pattern.
          </p>
          <DemoCard title="Product tile scroll row" note="Uses WCPItemTile with the standard badge and pricing patterns.">
            <div className={styles.demoWrapper}>
              <ContinueShopping />
            </div>
          </DemoCard>
        </section>

        {/* ── Usage Notes ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Usage Notes</h2>
          <ul className={styles.usageList}>
            <li>All carousels use the <code>useDragScroll</code> hook for mouse drag scrolling</li>
            <li>Scroll containers use <code>scroll-snap-type: x mandatory</code> for card alignment</li>
            <li>Scrollbars are hidden via <code>scrollbar-width: none</code></li>
            <li>New Arrivals is the only carousel with auto-advance (pauses on hover/touch)</li>
            <li>All carousels include <code>prefers-reduced-motion</code> overrides</li>
            <li>Product images should come from <code>PRODUCT_IMAGES</code> in <code>productImages.ts</code></li>
            <li>Section headers follow a consistent pattern: bold title left + "View all" or "Shop all" link right</li>
          </ul>
        </section>

      </div>
    </ComponentPageLayout>
  );
}
