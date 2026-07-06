import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { WCPQueueCard } from '@/components/walmart/WCPQueueCard';
import { Button } from '@/components/ui/Button';
import styles from './WCPQueueCard.module.css';

function secondsFromNow(s: number): number {
  return Date.now() + s * 1000;
}

const DEMO_IMAGE =
  'https://i5.walmartimages.com/seo/Apple-AirPods-Pro-2nd-Generation-with-Lightning-Charging-Case_c3e28b66-aa34-45fa-9d5c-82ef81b8d0b0.0c8e6c0d6e34cf3e11da0965e8d6a21a.jpeg?odnWidth=180&odnHeight=180&odnBg=ffffff';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className={styles.sectionTitle}>{children}</h2>;
}

function SectionDesc({ children }: { children: React.ReactNode }) {
  return <p className={styles.sectionDesc}>{children}</p>;
}

export default function WCPQueueCardPage() {
  const [liveEnd, setLiveEnd] = useState<number>(() => secondsFromNow(12 * 60));

  return (
    <ComponentPageLayout
      section="WCP Components"
      title="[WCP] Queue Card"
      description="A compact card displaying a reservation timer, product thumbnail, pricing, and queue actions. Comes in three urgency variants: waiting (blue), warning (yellow), and expiring (red)."
    >
      <div className={styles.page}>

        {/* ── Static Variants ───────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Variants</SectionTitle>
          <SectionDesc>
            Three variants communicate queue urgency at a glance. The timer badge colour and label
            text update automatically to match the urgency state.
          </SectionDesc>

          <div className={styles.variantGrid}>
            {/* Waiting — light blue */}
            <div className={styles.variantCol}>
              <span className={styles.variantLabel}>Waiting (Light Blue)</span>
              <WCPQueueCard
                variant="waiting"
                displayTime="57mins"
                productImage={DEMO_IMAGE}
                productImageAlt="Apple AirPods Pro"
                productName="Product description text name that wraps"
                price="$499.90"
                wasPrice="$600.00"
              />
            </div>

            {/* Warning — yellow */}
            <div className={styles.variantCol}>
              <span className={styles.variantLabel}>Warning (Yellow)</span>
              <WCPQueueCard
                variant="warning"
                displayTime="57mins"
                productImage={DEMO_IMAGE}
                productImageAlt="Apple AirPods Pro"
                productName="Product description text name that wraps"
                price="$499.90"
                wasPrice="$600.00"
              />
            </div>

            {/* Expiring — red */}
            <div className={styles.variantCol}>
              <span className={styles.variantLabel}>Expiring (Red)</span>
              <WCPQueueCard
                variant="expiring"
                displayTime="57mins"
                productImage={DEMO_IMAGE}
                productImageAlt="Apple AirPods Pro"
                productName="Product description text name that wraps"
                price="$499.90"
                wasPrice="$600.00"
              />
            </div>
          </div>
        </div>

        {/* ── Live Countdown Demo ───────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Live Countdown</SectionTitle>
          <SectionDesc>
            When <code>endTime</code> is provided the timer counts down in real time. Use the
            controls below to simulate different urgency states.
          </SectionDesc>

          <div className={styles.controlRow}>
            <span className={styles.controlLabel}>Set timer:</span>
            <Button variant="secondary" size="small" onClick={() => setLiveEnd(secondsFromNow(12 * 60))}>
              12 min (waiting)
            </Button>
            <Button variant="secondary" size="small" onClick={() => setLiveEnd(secondsFromNow(4 * 60))}>
              4 min (warning)
            </Button>
            <Button variant="secondary" size="small" onClick={() => setLiveEnd(secondsFromNow(30))}>
              30 s (expiring)
            </Button>
          </div>

          <div className={styles.liveDemo}>
            <WCPQueueCard
              variant="waiting"
              endTime={liveEnd}
              productImage={DEMO_IMAGE}
              productImageAlt="Apple AirPods Pro"
              productName="Apple AirPods Pro (2nd Generation)"
              price="$189.00"
              wasPrice="$249.00"
            />
          </div>
        </div>

        {/* ── Usage ────────────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Usage</SectionTitle>
          <pre className={styles.codeBlock}>{`import { WCPQueueCard } from '@/components/walmart/WCPQueueCard';

// Static display time
<WCPQueueCard
  variant="waiting"
  displayTime="57mins"
  productName="Product name"
  price="$499.90"
  wasPrice="$600.00"
  onLeaveQueue={() => {}}
  onView={() => {}}
/>

// Live countdown
<WCPQueueCard
  variant="expiring"
  endTime={reservationEndTime}
  productImage={imageUrl}
  productName="Product name"
  price="$499.90"
  wasPrice="$600.00"
/>`}</pre>
        </div>

      </div>
    </ComponentPageLayout>
  );
}
