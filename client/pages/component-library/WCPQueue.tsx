import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { WCPTimerView } from '@/components/walmart/WCPTimerView';
import { WCPQueueCard } from '@/components/walmart/WCPQueueCard';
import { WCPQueueBanner } from '@/components/walmart/WCPQueueBanner';
import { WCPQueueLanding } from '@/components/walmart/WCPQueueLanding';
import { Tag } from '@/components/ui/Tag';
import { PRODUCT_IMAGES } from '@/components/walmart/productImages';
import styles from './WCPQueue.module.css';

/* ── Demo data ─────────────────────────────────────────────── */

const DEMO_PRODUCT = {
  image: PRODUCT_IMAGES.tablet,
  description: 'Product description text name that wraps',
  price: '$499.90',
  originalPrice: '$600.00',
};

const LANDING_PRODUCT = {
  image: PRODUCT_IMAGES.headphones,
  description: 'Item description that can wrap to multiple lines',
  price: '$499.99',
  originalPrice: '$600.00',
};

/* ── Page ───────────────────────────────────────────────────── */

export default function WCPQueuePage() {
  return (
    <ComponentPageLayout
      section="WCP Components"
      title="Queue"
      description="Queue components for managing reservation flows, waiting rooms, and checkout countdowns. Includes Timer View, Queue Card, Queue Banner, and Queue Landing."
    >
      {/* ── Timer View ───────────────────────────────────────── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Timer View</h2>
        <p className={styles.sectionDesc}>
          Urgency-colored timer pill displaying countdown time. Three variants
          based on urgency level: waiting (blue), warning (yellow), and expiring
          (red).
        </p>
        <div className={styles.metaRow}>
          <Tag variant="info">Primitive</Tag>
          <Tag variant="neutral">Timer</Tag>
        </div>

        <div className={styles.demoGrid}>
          <DemoCard label="Waiting (Blue)">
            <div className={styles.timerRow}>
              <WCPTimerView timeDisplay="57mins" variant="waiting" />
              <span className={styles.metaLabel}>estimated wait</span>
            </div>
          </DemoCard>

          <DemoCard label="Warning (Yellow)">
            <div className={styles.timerRow}>
              <WCPTimerView timeDisplay="10:23" variant="warning" />
              <span className={styles.metaLabel}>left to buy</span>
            </div>
          </DemoCard>

          <DemoCard label="Expiring (Red)">
            <div className={styles.timerRow}>
              <WCPTimerView timeDisplay="01:03" variant="expiring" />
              <span className={styles.metaLabel}>left to buy</span>
            </div>
          </DemoCard>
        </div>

        <PropTable
          rows={[
            ['timeDisplay', 'string', '—', 'Time display string, e.g. "57mins" or "01:03"'],
            ['variant', '"waiting" | "warning" | "expiring"', '"waiting"', 'Color variant based on urgency'],
            ['size', '"medium" | "small"', '"medium"', 'Size of the timer pill'],
          ]}
        />
      </div>

      {/* ── Queue Card ───────────────────────────────────────── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Queue Card</h2>
        <p className={styles.sectionDesc}>
          Compact product card with timer pill, product thumbnail, description,
          and pricing. Used inside queue landing pages and modals.
        </p>
        <div className={styles.metaRow}>
          <Tag variant="info">WCP</Tag>
          <Tag variant="neutral">Card</Tag>
        </div>

        <div className={styles.demoGrid}>
          <DemoCard label="Line Joined (Waiting)">
            <WCPQueueCard
              image={DEMO_PRODUCT.image}
              description={DEMO_PRODUCT.description}
              price={DEMO_PRODUCT.price}
              originalPrice={DEMO_PRODUCT.originalPrice}
              timeDisplay="57mins"
              timerVariant="waiting"
            />
          </DemoCard>

          <DemoCard label="Warning">
            <WCPQueueCard
              image={DEMO_PRODUCT.image}
              description={DEMO_PRODUCT.description}
              price={DEMO_PRODUCT.price}
              originalPrice={DEMO_PRODUCT.originalPrice}
              timeDisplay="10:23"
              timerVariant="warning"
            />
          </DemoCard>

          <DemoCard label="Expiring">
            <WCPQueueCard
              image={DEMO_PRODUCT.image}
              description={DEMO_PRODUCT.description}
              price={DEMO_PRODUCT.price}
              originalPrice={DEMO_PRODUCT.originalPrice}
              timeDisplay="01:03"
              timerVariant="expiring"
            />
          </DemoCard>
        </div>

        <PropTable
          rows={[
            ['image', 'string', '—', 'Product image URL'],
            ['description', 'string', '—', 'Product description text'],
            ['price', 'string', '—', 'Current price, e.g. "$499.90"'],
            ['originalPrice', 'string', 'undefined', 'Strikethrough original price'],
            ['timeDisplay', 'string', '—', 'Timer display string'],
            ['timerVariant', '"waiting" | "warning" | "expiring"', '"waiting"', 'Timer color variant'],
            ['timerLabel', 'string', 'auto', 'Label next to timer pill'],
          ]}
        />
      </div>

      {/* ── Queue Banner ─────────────────────────────────────── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Queue Banner</h2>
        <p className={styles.sectionDesc}>
          Sticky banner shown during queue flows. Supports four variants:
          lineJoined (with snackbar), warning, checkout, and error.
        </p>
        <div className={styles.metaRow}>
          <Tag variant="info">WCP</Tag>
          <Tag variant="neutral">Banner</Tag>
        </div>

        <div className={styles.bannerDemo}>
          <DemoCard label="Line Joined">
            <div className={styles.bannerWrap}>
              <WCPQueueBanner
                variant="lineJoined"
                timeDisplay="59mins"
                message="reservation text"
                snackbarText="Declarative title or body"
                productImage={DEMO_PRODUCT.image}
                onView={() => {}}
                onLeave={() => {}}
                onAction={() => {}}
              />
            </div>
          </DemoCard>

          <DemoCard label="Warning">
            <div className={styles.bannerWrap}>
              <WCPQueueBanner
                variant="warning"
                timeDisplay="10:23"
                message="reservation text"
                snackbarText="Declarative title or body"
                productImage={DEMO_PRODUCT.image}
                onView={() => {}}
                onLeave={() => {}}
                onAction={() => {}}
              />
            </div>
          </DemoCard>

          <DemoCard label="Checkout">
            <div className={styles.bannerWrap}>
              <WCPQueueBanner
                variant="checkout"
                timeDisplay="01:03"
                message="queue messaging"
                onClose={() => {}}
              />
            </div>
          </DemoCard>

          <DemoCard label="Error">
            <div className={styles.bannerWrap}>
              <WCPQueueBanner
                variant="error"
                message="Hang on, we're getting you in line. Please don't refresh or leave the line."
              />
            </div>
          </DemoCard>
        </div>

        <PropTable
          rows={[
            ['variant', '"lineJoined" | "warning" | "checkout" | "error"', '—', 'Banner variant'],
            ['timeDisplay', 'string', 'undefined', 'Timer display string'],
            ['message', 'string', '—', 'Text shown next to or below the timer'],
            ['snackbarText', 'string', 'undefined', 'Optional snackbar text above banner bar'],
            ['productImage', 'string', 'undefined', 'Product thumbnail URL'],
            ['onView', '() => void', 'undefined', 'Callback when "View" link is clicked'],
            ['onLeave', '() => void', 'undefined', 'Callback when "Leave" link is clicked'],
            ['onClose', '() => void', 'undefined', 'Callback when close/dismiss is clicked'],
            ['onAction', '() => void', 'undefined', 'Callback when CTA chevron is clicked'],
          ]}
        />
      </div>

      {/* ── Queue Landing ────────────────────────────────────── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Queue Landing</h2>
        <p className={styles.sectionDesc}>
          Full-page queue waiting room content. Authenticated variant shows
          hourglass illustration with estimated wait timer. Unauthenticated
          variant shows sign-in CTA with product card.
        </p>
        <div className={styles.metaRow}>
          <Tag variant="info">WCP</Tag>
          <Tag variant="neutral">Landing</Tag>
        </div>

        <div className={styles.demoGrid}>
          <DemoCard label="Authenticated">
            <div className={styles.landingWrap}>
              <WCPQueueLanding
                variant="authenticated"
                product={LANDING_PRODUCT}
                timeDisplay="59mins"
                timerVariant="waiting"
              />
            </div>
          </DemoCard>

          <DemoCard label="Unauthenticated">
            <div className={styles.landingWrap}>
              <WCPQueueLanding
                variant="unauthenticated"
                product={LANDING_PRODUCT}
                onSignIn={() => {}}
              />
            </div>
          </DemoCard>
        </div>

        <PropTable
          rows={[
            ['variant', '"authenticated" | "unauthenticated"', '"authenticated"', 'Landing page variant'],
            ['product', 'QueueLandingProduct', '—', 'Product data (image, description, price, originalPrice)'],
            ['timeDisplay', 'string', '"59mins"', 'Timer display string (authenticated only)'],
            ['timerVariant', '"waiting" | "warning" | "expiring"', '"waiting"', 'Timer variant (authenticated only)'],
            ['onSignIn', '() => void', 'undefined', 'Callback when sign-in button is clicked'],
          ]}
        />
      </div>

      {/* ── Import Reference ─────────────────────────────────── */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Import Reference</h2>
        <PropTable
          headers={['Component', 'Tag', 'Import Path']}
          rows={[
            ['WCPTimerView', 'Primitive', '@/components/walmart/WCPTimerView'],
            ['WCPQueueCard', 'Card', '@/components/walmart/WCPQueueCard'],
            ['WCPQueueBanner', 'Banner', '@/components/walmart/WCPQueueBanner'],
            ['WCPQueueLanding', 'Landing', '@/components/walmart/WCPQueueLanding'],
          ]}
        />
      </div>
    </ComponentPageLayout>
  );
}

/* ── Helpers ───────────────────────────────────────────────── */

function DemoCard({
  label,
  dark,
  children,
}: {
  label: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={[styles.demoCard, dark ? styles.demoCardDark : ''].filter(Boolean).join(' ')}>
      <div className={[styles.cardLabel, dark ? styles.cardLabelLight : ''].filter(Boolean).join(' ')}>
        {label}
      </div>
      <div className={styles.cardContent}>{children}</div>
    </div>
  );
}

function PropTable({
  headers,
  rows,
}: {
  headers?: string[];
  rows: string[][];
}) {
  const cols = headers ?? ['Prop', 'Type', 'Default', 'Description'];
  return (
    <table className={styles.propTable}>
      <thead>
        <tr>
          {cols.map((h) => (
            <th key={h}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j}>
                {j === 0 || (j === 1 && !headers) ? <code>{cell}</code> : cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
