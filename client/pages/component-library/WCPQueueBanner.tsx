import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { WCPQueueBanner } from '@/components/walmart/WCPQueueBanner';
import { WCPQueuePanel } from '@/components/walmart/WCPQueuePanel';
import type { QueueItem } from '@/components/walmart/WCPQueueItemCard';
import { WCPRichSnackbar } from '@/components/walmart/WCPRichSnackbar';
import { Warning } from '@/components/icons/Warning';
import { Button } from '@/components/ui/Button';
import { BottomNav } from '@/components/walmart/BottomNav';
import styles from './WCPQueueBanner.module.css';

// ── Helper: ms from now ────────────────────────────────────────────────────
function secondsFromNow(s: number): number {
  return Date.now() + s * 1000;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className={styles.sectionTitle}>{children}</h2>;
}

function SectionDesc({ children }: { children: React.ReactNode }) {
  return <p className={styles.sectionDesc}>{children}</p>;
}

// ── Main page ──────────────────────────────────────────────────────────────

// ── Demo queue items ───────────────────────────────────────────────────────
const DEMO_PRODUCT_IMG =
  'https://i5.walmartimages.com/seo/Apple-AirPods-Pro-2nd-Generation-with-Lightning-Charging-Case_c3e28b66-aa34-45fa-9d5c-82ef81b8d0b0.0c8e6c0d6e34cf3e11da0965e8d6a21a.jpeg?odnWidth=180&odnHeight=180&odnBg=ffffff';

function buildDemoItems(): QueueItem[] {
  return [
    {
      id: '1',
      productImage: DEMO_PRODUCT_IMG,
      productImageAlt: 'Champion Men\u2019s Classic Graphic Tee',
      description: 'Champion Men\u2019s Classic Graphic Tee',
      price: '$199.99',
      originalPrice: '$299.99',
      endTime: secondsFromNow(19 * 60),
    },
    {
      id: '2',
      productImage: DEMO_PRODUCT_IMG,
      productImageAlt: 'Champion-Test1',
      description: 'Champion-Test1',
      price: '$5.00',
      endTime: secondsFromNow(34 * 60),
    },
    {
      id: '3',
      productImage: DEMO_PRODUCT_IMG,
      productImageAlt: 'Champion Men\u2019s Sportstyle Colorblock Tee',
      description: 'Champion Men\u2019s Sportstyle Colorblock Tee',
      price: '$6.00',
      endTime: secondsFromNow(54 * 60),
    },
  ];
}

export default function WCPQueueBannerPage() {
  const [lineJoinedEnd, setLineJoinedEnd] = useState(() => secondsFromNow(59 * 60));
  const [warningEnd] = useState(() => secondsFromNow(10 * 60 + 23));
  const [expiringEnd] = useState(() => secondsFromNow(45));
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [demoItems] = useState<QueueItem[]>(buildDemoItems);

  return (
    <ComponentPageLayout
      section="WCP Components"
      title="[WCP] Queue Banner"
      description="A banner with a live countdown timer for reserved carts, flash sales, and limited-time queue flows. Supports multiple variants: line-joined (card), checkout (compact bar), and error (warning message)."
    >
      <div className={styles.page}>

        {/* ── Overview ─────────────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Overview</SectionTitle>
          <SectionDesc>
            The Queue Banner sits on a dark navy background and contains a white card with a product
            image placeholder, timer badge, reservation text, and View/Leave action links. A link
            row with a chevron appears below the card. The component adapts its sizing at the 900px
            breakpoint — desktop gets larger padding and body-medium text, while mobile uses compact
            padding and body-small text on certain variants.
          </SectionDesc>
        </div>

        {/* ── Line Joined — Desktop (900+px) ───────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Line Joined — Waiting Room (Light Blue Timer)</SectionTitle>
          <SectionDesc>
            Default variant when a user joins the line. Timer badge is light blue. Includes product
            image placeholder, View &amp; Leave links, and a link row below.
          </SectionDesc>

          <div className={styles.controlRow}>
            <span className={styles.controlLabel}>Set timer:</span>
            <Button variant="secondary" size="small" onClick={() => setLineJoinedEnd(secondsFromNow(59 * 60))}>
              59 min (normal)
            </Button>
            <Button variant="secondary" size="small" onClick={() => setLineJoinedEnd(secondsFromNow(5 * 60))}>
              5 min (warning)
            </Button>
            <Button variant="secondary" size="small" onClick={() => setLineJoinedEnd(secondsFromNow(30))}>
              30 s (critical)
            </Button>
          </div>

          <div className={styles.bannerFrame}>
            <WCPQueueBanner
              endTime={lineJoinedEnd}
              variant="lineJoined"
              reservationText="reservation text"
              onView={() => {}}
              onLeave={() => {}}
              linkText="Placeholder link text"
              onLink={() => setIsPanelOpen(true)}
              inline
            />
          </div>
        </div>

        {/* Queue items side panel */}
        <WCPQueuePanel
          isOpen={isPanelOpen}
          onClose={() => setIsPanelOpen(false)}
          items={demoItems}
        />

        {/* ── Line Joined — Warning (Yellow Timer) ─────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Line Joined — Item Warning (Yellow Timer)</SectionTitle>
          <SectionDesc>
            When the item reservation is nearing expiry, the timer badge turns yellow/warning.
            Same card layout as line-joined but with urgency-driven badge color.
          </SectionDesc>

          <div className={styles.bannerFrame}>
            <WCPQueueBanner
              endTime={warningEnd}
              variant="lineJoined"
              reservationText="reservation text"
              onView={() => {}}
              onLeave={() => {}}
              linkText="Placeholder link text"
              onLink={() => {}}
              inline
            />
          </div>
        </div>

        {/* ── Line Joined — Expiring (Red Timer) ───────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Line Joined — Expiring (Red Timer)</SectionTitle>
          <SectionDesc>
            Final urgency state — the timer badge turns red when time is critically low.
          </SectionDesc>

          <div className={styles.bannerFrame}>
            <WCPQueueBanner
              endTime={expiringEnd}
              variant="lineJoined"
              reservationText="reservation text"
              onView={() => {}}
              onLeave={() => {}}
              linkText="Placeholder link text"
              onLink={() => {}}
              inline
            />
          </div>
        </div>

        {/* ── Checkout Variant ──────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Checkout Variant</SectionTitle>
          <SectionDesc>
            Simplified navy bar used during checkout. Shows timer + message + dismiss button.
            On desktop (900+px) it has 24px vertical padding and body-medium text. On mobile
            (&lt;900px) it becomes a compact 40px bar with body-small text.
          </SectionDesc>

          <div className={styles.variantRow}>
            <div className={styles.variantCard}>
              <div className={styles.demoLabel}>Desktop (900+px)</div>
              <div className={styles.bannerFrame}>
                <WCPQueueBanner
                  endTime={secondsFromNow(63)}
                  variant="checkout"
                  queueMessage="queue messaging"
                  onDismiss={() => {}}
                  inline
                />
              </div>
            </div>
            <div className={styles.variantCard}>
              <div className={styles.demoLabel}>Mobile (&lt;900px)</div>
              <div className={styles.bannerFrameNarrow}>
                <WCPQueueBanner
                  endTime={secondsFromNow(63)}
                  variant="checkout"
                  queueMessage="queue messaging"
                  onDismiss={() => {}}
                  inline
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Error Variant ────────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Error Variant</SectionTitle>
          <SectionDesc>
            Shown when the queue encounters an error or the user is being placed in line. Displays
            a warning icon and message. Desktop uses body-medium text with more padding; mobile
            uses body-small text with compact padding.
          </SectionDesc>

          <div className={styles.variantRow}>
            <div className={styles.variantCard}>
              <div className={styles.demoLabel}>Desktop (900+px)</div>
              <div className={styles.bannerFrame}>
                <WCPQueueBanner
                  endTime={secondsFromNow(600)}
                  variant="error"
                  errorMessage="Hang on, we're getting you in line. Please don't refresh or leave the line."
                  inline
                />
              </div>
            </div>
            <div className={styles.variantCard}>
              <div className={styles.demoLabel}>Mobile (&lt;900px)</div>
              <div className={styles.bannerFrameNarrow}>
                <WCPQueueBanner
                  endTime={secondsFromNow(600)}
                  variant="error"
                  errorMessage="Hang on, we're getting you in line. Please don't refresh or leave the line."
                  inline
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile + Bottom Nav Demo ──────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Mobile — Above Bottom Nav</SectionTitle>
          <SectionDesc>
            On mobile, the queue banner sits directly above the bottom navigation bar. The snackbar
            (inverse) appears above the banner. This demo simulates a phone frame to show the
            stacking order. Note: the bottom nav is shown as a placeholder — the real app uses the
            existing <code>BottomNav</code> from the layout shell.
          </SectionDesc>

          <div className={styles.mobileStatesRow}>
            {/* Line Joined with Snackbar */}
            <div className={styles.mobileStateCard}>
              <div className={styles.mobileStateLabel}>Line Joined + Snackbar</div>
              <div className={styles.mobileStateSublabel}>Waiting room state</div>
              <div className={styles.phoneFrame}>
                <div className={styles.phonePage}>
                  <div className={styles.phoneNavBar} />
                  <div className={styles.phonePageContent} />
                </div>
                <div className={styles.phoneBannerSlot}>
                  <div className={styles.phoneSnackbarWrap}>
                    <WCPRichSnackbar
                      open
                      color="inverse"
                      leadingSlot={<Warning width={20} height={20} />}
                      message="Declarative title or body"
                      actionLabel="Action Button"
                      onAction={() => {}}
                      duration={Infinity}
                      inline
                    />
                  </div>
                  <WCPQueueBanner
                    endTime={secondsFromNow(59 * 60)}
                    variant="lineJoined"
                    reservationText="reservation text"
                    onView={() => {}}
                    onLeave={() => {}}
                    linkText="Placeholder link text"
                    onLink={() => {}}
                    inline
                  />
                </div>
                <div className={styles.phoneBottomNavSlot}>
                  <BottomNav contained />
                </div>
              </div>
            </div>

            {/* Warning with Snackbar */}
            <div className={styles.mobileStateCard}>
              <div className={styles.mobileStateLabel}>Item Warning + Snackbar</div>
              <div className={styles.mobileStateSublabel}>Yellow timer badge</div>
              <div className={styles.phoneFrame}>
                <div className={styles.phonePage}>
                  <div className={styles.phoneNavBar} />
                  <div className={styles.phonePageContent} />
                </div>
                <div className={styles.phoneBannerSlot}>
                  <div className={styles.phoneSnackbarWrap}>
                    <WCPRichSnackbar
                      open
                      color="inverse"
                      leadingSlot={<Warning width={20} height={20} />}
                      message="Declarative title or body"
                      actionLabel="Action Button"
                      onAction={() => {}}
                      duration={Infinity}
                      inline
                    />
                  </div>
                  <WCPQueueBanner
                    endTime={warningEnd}
                    variant="lineJoined"
                    reservationText="reservation text"
                    onView={() => {}}
                    onLeave={() => {}}
                    linkText="Placeholder link text"
                    onLink={() => {}}
                    inline
                  />
                </div>
                <div className={styles.phoneBottomNavSlot}>
                  <BottomNav contained />
                </div>
              </div>
            </div>

            {/* Checkout */}
            <div className={styles.mobileStateCard}>
              <div className={styles.mobileStateLabel}>Checkout (Compact)</div>
              <div className={styles.mobileStateSublabel}>Compact 40px bar on mobile</div>
              <div className={styles.phoneFrame}>
                <div className={styles.phonePage}>
                  <div className={styles.phoneNavBar} />
                  <div className={styles.phonePageContent} />
                </div>
                <div className={styles.phoneBannerSlot}>
                  <WCPQueueBanner
                    endTime={secondsFromNow(63)}
                    variant="checkout"
                    queueMessage="queue messaging"
                    onDismiss={() => {}}
                    inline
                  />
                </div>
                <div className={styles.phoneBottomNavSlot}>
                  <BottomNav contained />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Snackbar Integration ─────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Snackbar Integration</SectionTitle>
          <SectionDesc>
            Pair the queue banner with a <strong>WCPRichSnackbar</strong> (Inverse variant) above
            it to communicate queue status. The snackbar confirms the user is being added to the
            line and provides instructions.
          </SectionDesc>

          <div className={styles.snackbarDemo}>
            <WCPRichSnackbar
              open
              color="inverse"
              leadingSlot={<Warning width={20} height={20} />}
              message="Hang on, we're getting you in line. Please don't refresh or leave the line."
              duration={Infinity}
              inline
            />
          </div>
        </div>

        {/* ── Component Props ──────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Component Props</SectionTitle>
          <table className={styles.propsTable}>
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>endTime</td><td>Date | number | string</td><td>—</td><td>Required. Target end time for the countdown.</td></tr>
              <tr><td>variant</td><td>'lineJoined' | 'checkout' | 'error'</td><td>'lineJoined'</td><td>Banner variant matching Figma states.</td></tr>
              <tr><td>productImage</td><td>string</td><td>—</td><td>Product thumbnail URL (32×32). Shows a gray placeholder if omitted.</td></tr>
              <tr><td>reservationText</td><td>string</td><td>'reservation text'</td><td>Text next to the timer badge on the white card.</td></tr>
              <tr><td>viewLabel</td><td>string</td><td>'View'</td><td>Label for the View link button.</td></tr>
              <tr><td>onView</td><td>() =&gt; void</td><td>—</td><td>Called when View is clicked.</td></tr>
              <tr><td>leaveLabel</td><td>string</td><td>'Leave'</td><td>Label for the Leave link button.</td></tr>
              <tr><td>onLeave</td><td>() =&gt; void</td><td>—</td><td>Called when Leave is clicked.</td></tr>
              <tr><td>linkText</td><td>string</td><td>'Placeholder link text'</td><td>Link row text below the card.</td></tr>
              <tr><td>showLinkRow</td><td>boolean</td><td>true</td><td>Whether to show the link row.</td></tr>
              <tr><td>queueMessage</td><td>string</td><td>'queue messaging'</td><td>Message for the checkout variant.</td></tr>
              <tr><td>onDismiss</td><td>() =&gt; void</td><td>—</td><td>Called when the close button is clicked (checkout).</td></tr>
              <tr><td>errorMessage</td><td>string</td><td>(default text)</td><td>Error/loading message (error variant).</td></tr>
              <tr><td>position</td><td>'top' | 'bottom' | 'inline'</td><td>'top'</td><td>'top' = sticky; 'bottom' = fixed above bottom nav; 'inline' = in-flow.</td></tr>
              <tr><td>onExpire</td><td>() =&gt; void</td><td>—</td><td>Called once when the timer hits zero.</td></tr>
            </tbody>
          </table>
        </div>

        {/* ── Usage ────────────────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Usage</SectionTitle>
          <pre className={styles.codeBlock}>{`import { WCPQueueBanner } from '@/components/walmart/WCPQueueBanner';

// Line Joined (default) — card with image, timer, View/Leave
<WCPQueueBanner
  endTime={reservationEndTime}
  reservationText="Your item is reserved"
  onView={handleView}
  onLeave={handleLeave}
  linkText="View all reserved items"
  onLink={handleLink}
/>

// Checkout — compact navy bar
<WCPQueueBanner
  endTime={checkoutEndTime}
  variant="checkout"
  queueMessage="Complete checkout before time runs out"
  onDismiss={handleDismiss}
/>

// Error — warning message
<WCPQueueBanner
  endTime={endTime}
  variant="error"
  errorMessage="Hang on, we're getting you in line."
/>`}</pre>
        </div>

        {/* ── Guidelines ──────────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Guidelines</SectionTitle>
          <div className={styles.guidelineGrid}>
            <div className={styles.guidelineCard}>
              <div className={styles.doLabel}>Do</div>
              <p className={styles.guidelineText}>
                Use <code>variant="lineJoined"</code> for the main queue waiting experience and
                pair it with a WCPRichSnackbar (Inverse) above it.
              </p>
            </div>
            <div className={styles.guidelineCard}>
              <div className={styles.dontLabel}>Don't</div>
              <p className={styles.guidelineText}>
                Don't stack multiple queue banners. Only one queue reservation should be active at
                a time.
              </p>
            </div>
            <div className={styles.guidelineCard}>
              <div className={styles.doLabel}>Do</div>
              <p className={styles.guidelineText}>
                Use <code>variant="checkout"</code> during the checkout flow for a compact, less
                intrusive timer bar.
              </p>
            </div>
            <div className={styles.guidelineCard}>
              <div className={styles.dontLabel}>Don't</div>
              <p className={styles.guidelineText}>
                Don't use the queue banner for generic promotions. Use the Basic Banner or Promo
                Banner component instead.
              </p>
            </div>
          </div>
        </div>

      </div>
    </ComponentPageLayout>
  );
}
