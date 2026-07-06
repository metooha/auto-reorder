import React from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { Tag } from '@/components/ui/Tag';
import { ReplenishmentBasket } from '@/components/walmart/ReplenishmentBasket';
import styles from './ReplenishmentBasket.module.css';

export default function ReplenishmentBasketPage() {
  return (
    <ComponentPageLayout
      section="WCP Patterns"
      title="Replenishment Basket"
      description="A mobile-only floating panel anchored to the bottom of the viewport. Lets users review, edit, and confirm a personalized replenishment delivery basket. Features three states: collapsed summary bar, AI-generating animation, and expanded item review."
    >
      {/* ── Overview ── */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Overview</h2>
          <Tag variant="neutral">Mobile Only</Tag>
          <Tag variant="info">iOS Glass</Tag>
        </div>
        <p className={styles.description}>
          The ReplenishmentBasket is a persistent floating UI element anchored above the BottomNav.
          It gives customers a frictionless way to review and modify their upcoming delivery without
          navigating away from their current context. The component uses the iOS glass styling system
          consistent with <code>FloatingFooter</code> and <code>BottomNav</code>.
        </p>

        <div className={styles.stateList}>
          <div className={styles.stateItem}>
            <span className={styles.stateLabel}>collapsed</span>
            <span className={styles.stateDesc}>
              Mini card showing delivery summary and item thumbnails. Tap to expand.
            </span>
          </div>
          <div className={styles.stateItem}>
            <span className={styles.stateLabel}>generating</span>
            <span className={styles.stateDesc}>
              Full panel with StepAnimation — shown while the AI builds the basket.
            </span>
          </div>
          <div className={styles.stateItem}>
            <span className={styles.stateLabel}>expanded</span>
            <span className={styles.stateDesc}>
              Full panel: item grid (CondensedItemTile) with edit mode toggle, summary bar,
              and glass-style floating footer (Edit / Add to delivery).
            </span>
          </div>
          <div className={styles.stateItem}>
            <span className={styles.stateLabel}>scheduling</span>
            <span className={styles.stateDesc}>
              Delivery scheduling screen with day selector buttons and time slot radio list.
              Shown after tapping &ldquo;Add to delivery&rdquo; from the expanded state.
            </span>
          </div>
        </div>
      </div>

      {/* ── Live demo — mobile viewport frame ── */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Live Demo</h2>
          <Tag variant="neutral">Resize to mobile width</Tag>
        </div>
        <p className={styles.description}>
          The component is hidden on screens wider than 768px. Use the mobile preview or resize
          the browser window to see it. Tap the collapsed card to trigger the AI generating state,
          then watch it transition to the full expanded basket.
        </p>

        {/* Phone frame wrapper — shows on all screen sizes for documentation */}
        <div className={styles.phoneFrame}>
          <div className={styles.phoneScreen}>
            {/* Fake page content behind the basket */}
            <div className={styles.mockPage}>
              <div className={styles.mockHeader} />
              <div className={styles.mockContent}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={styles.mockCard} />
                ))}
              </div>
            </div>

            {/* The actual component — forced visible & contained in phone frame */}
            <ReplenishmentBasket
              deliveryDay="Fri, May 28"
              deliveryTime="4pm–5pm"
              address="3743 Park Ln, Dallas, TX 75220"
              itemCount={14}
              total="55.59"
              forceVisible
              contained
            />
          </div>
        </div>
      </div>

      {/* ── Components used ── */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Nested Components</h2>
        </div>
        <div className={styles.nestedList}>
          <div className={styles.nestedItem}>
            <code className={styles.nestedCode}>CondensedItemTile</code>
            <span className={styles.nestedDesc}>
              3-column grid of condensed product tiles in the expanded basket view.
            </span>
          </div>
          <div className={styles.nestedItem}>
            <code className={styles.nestedCode}>StepAnimation</code>
            <span className={styles.nestedDesc}>
              AI loading animation with customer magic tokens. Shows while basket is being built.
            </span>
          </div>
          <div className={styles.nestedItem}>
            <code className={styles.nestedCode}>DeliveryScheduler</code>
            <span className={styles.nestedDesc}>
              Day selector + time slot radio list for scheduling delivery day and time window.
            </span>
          </div>
        </div>
      </div>

      {/* ── Import reference ── */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Import</h2>
        </div>
        <pre className={styles.codeBlock}>
          {`import { ReplenishmentBasket } from '@/components/walmart/ReplenishmentBasket';

<ReplenishmentBasket
  deliveryDay="Fri, May 28"
  deliveryTime="4pm–5pm"
  address="3743 Park Ln, Dallas, TX 75220"
  itemCount={14}
  total="55.59"
  onEditItems={() => {}}
/>`}
        </pre>
      </div>

      {/* ── Props ── */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Props</h2>
        </div>
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
            <tr>
              <td><code>deliveryDay</code></td>
              <td>string</td>
              <td>"Fri, May 28"</td>
              <td>Formatted delivery day shown in the header and collapsed bar.</td>
            </tr>
            <tr>
              <td><code>deliveryTime</code></td>
              <td>string</td>
              <td>"4pm"</td>
              <td>Delivery time window.</td>
            </tr>
            <tr>
              <td><code>address</code></td>
              <td>string</td>
              <td>—</td>
              <td>Delivery address shown in the expanded panel header.</td>
            </tr>
            <tr>
              <td><code>itemCount</code></td>
              <td>number</td>
              <td>14</td>
              <td>Total item count in the basket.</td>
            </tr>
            <tr>
              <td><code>total</code></td>
              <td>string</td>
              <td>"55.59"</td>
              <td>Estimated total (numeric string, no "$" prefix).</td>
            </tr>
            <tr>
              <td><code>items</code></td>
              <td>BasketItem[]</td>
              <td>demo data</td>
              <td>Array of basket items rendered as CondensedItemTile. Defaults to built-in samples.</td>
            </tr>
            <tr>
              <td><code>suggestedItems</code></td>
              <td>SuggestedItem[]</td>
              <td>demo data</td>
              <td>Horizontal scroll of suggested add-ons.</td>
            </tr>
            <tr>
              <td><code>onEditItems</code></td>
              <td>() =&gt; void</td>
              <td>—</td>
              <td>Called when user taps "Edit items".</td>
            </tr>
          </tbody>
        </table>
      </div>
    </ComponentPageLayout>
  );
}
