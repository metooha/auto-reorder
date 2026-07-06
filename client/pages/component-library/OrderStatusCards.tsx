import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { ActiveCurbsideCard } from '@/components/walmart/ActiveCurbsideCard';
import { OrderStatusCard } from '@/components/walmart/OrderStatusCard';
import { OrderStatusBanner } from '@/components/walmart/OrderStatusBanner';
import styles from './OrderStatusCards.module.css';

function DemoCard({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <div className={styles.demoCard}>
      <div className={styles.cardLabel}>{title}</div>
      {note && <p className={styles.cardNote}>{note}</p>}
      <div className={styles.cardContent}>{children}</div>
    </div>
  );
}

export default function OrderStatusCardsPage() {
  return (
    <ComponentPageLayout
      section="WCP Patterns"
      title="Order & Status Cards"
      description="Dismissible cards and banners that show active order status, curbside pickup countdowns, and delivery tracking on the Walmart home page."
    >
      <div className={styles.page}>

        {/* ── Active Curbside Card ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Active Curbside Card</h2>
          <p className={styles.sectionDesc}>
            A countdown card shown when the customer has an active curbside pickup order. Displays the editing window countdown, product thumbnail, order total, and a "Get it now" express upgrade CTA. Dismissible via the × button.
          </p>
          <DemoCard title="Curbside pickup with countdown" note="Timer counts down from 57:23. 'Get it now' opens the express upgrade modal.">
            <div className={styles.demoWrapper}>
              <ActiveCurbsideCard />
            </div>
          </DemoCard>
        </section>

        {/* ── Order Status Card ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Order Status Card</h2>
          <p className={styles.sectionDesc}>
            A compact mobile-only card showing delivery status with a product image, status line, delivery estimate, and a "Track" link. Dismissible via the × button.
          </p>
          <DemoCard title="Mobile delivery tracking card" note="Only visible below 1024px. Shows order image, status, and delivery estimate.">
            <div className={styles.demoWrapper}>
              <OrderStatusCard
                image="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F5f02b529221349099118d275e7e1d748"
                statusLine="Your order is on the way"
                deliveryLine="Arrives tomorrow by 8pm"
                trackHref="/walmart/purchase-history"
              />
            </div>
          </DemoCard>
        </section>

        {/* ── Order Status Banner ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Order Status Banner</h2>
          <p className={styles.sectionDesc}>
            A desktop-only horizontal banner that shows order delivery status inline. Includes an icon, status text, delivery estimate, and a "Track order" link. Dismissible via the × button.
          </p>
          <DemoCard title="Desktop order status bar" note="Full-width banner with icon, status text, and tracking link.">
            <div className={styles.demoWrapper}>
              <OrderStatusBanner />
            </div>
          </DemoCard>
        </section>

        {/* ── Usage Notes ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Usage Notes</h2>
          <ul className={styles.usageList}>
            <li>All three components are dismissible — once closed, they do not reappear until the page reloads</li>
            <li><code>ActiveCurbsideCard</code> includes a live countdown timer that ticks every second</li>
            <li><code>OrderStatusCard</code> is mobile-only (hidden above <code>1024px</code>)</li>
            <li><code>OrderStatusBanner</code> is desktop-only (hidden below <code>1024px</code>)</li>
            <li>The "Get it now" button on the curbside card opens a <code>GetItNowModal</code> for express pickup upgrade</li>
            <li>All cards use <code>IconButton</code> with the <code>X</code> icon for the dismiss action</li>
            <li>Product images should use real CDN URLs, never placeholder services</li>
          </ul>
        </section>

      </div>
    </ComponentPageLayout>
  );
}
