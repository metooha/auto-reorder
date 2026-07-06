import React from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { WCPHeartView } from '@/components/walmart/WCPHeartView';
import styles from './WCPHeartView.module.css';

function StateLabel({ children }: { children: React.ReactNode }) {
  return <div className={styles.stateLabel}>{children}</div>;
}

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={styles.demoCard}>
      <h3 className={styles.cardTitle}>{title}</h3>
      {children}
    </div>
  );
}

export default function WCPHeartViewPage() {
  const [controlled, setControlled] = React.useState(false);

  return (
    <ComponentPageLayout
      section="WCP Components"
      title="Heart View"
      description="A circular toggle button for adding items to a favorites list. Similar to the Floating Button but acts as a toggle. On desktop (900px+) it shows a callout on hover; on mobile it triggers a snackbar after toggling."
    >
      <div className={styles.content}>

        {/* ── States showcase ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>States</h2>
          <p className={styles.sectionDesc}>
            The Heart View has two size variants and five interaction states. Hover over the inactive variants on desktop to see the callout tooltip.
          </p>

          <div className={styles.statesGrid}>
            {/* Medium — desktop size */}
            <DemoCard title="Medium (desktop 900px+)">
              <div className={styles.stateRow}>
                <div className={styles.stateItem}>
                  <StateLabel>Enabled</StateLabel>
                  <WCPHeartView size="medium" listName="Amy's List" />
                </div>
                <div className={styles.stateItem}>
                  <StateLabel>Activated</StateLabel>
                  <WCPHeartView size="medium" defaultActivated listName="Amy's List" />
                </div>
                <div className={styles.stateItem}>
                  <StateLabel>Disabled</StateLabel>
                  <WCPHeartView size="medium" disabled listName="Amy's List" />
                </div>
                <div className={styles.stateItem}>
                  <StateLabel>Disabled + Active</StateLabel>
                  <WCPHeartView size="medium" disabled defaultActivated listName="Amy's List" />
                </div>
              </div>
            </DemoCard>

            {/* Small — mobile size */}
            <DemoCard title="Small (mobile <900px)">
              <div className={styles.stateRow}>
                <div className={styles.stateItem}>
                  <StateLabel>Enabled</StateLabel>
                  <WCPHeartView size="small" listName="Amy's List" />
                </div>
                <div className={styles.stateItem}>
                  <StateLabel>Activated</StateLabel>
                  <WCPHeartView size="small" defaultActivated listName="Amy's List" />
                </div>
                <div className={styles.stateItem}>
                  <StateLabel>Disabled</StateLabel>
                  <WCPHeartView size="small" disabled listName="Amy's List" />
                </div>
                <div className={styles.stateItem}>
                  <StateLabel>Disabled + Active</StateLabel>
                  <WCPHeartView size="small" disabled defaultActivated listName="Amy's List" />
                </div>
              </div>
            </DemoCard>
          </div>
        </section>

        {/* ── Responsive (no size prop) ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Responsive (default)</h2>
          <p className={styles.sectionDesc}>
            When no <code>size</code> prop is set, the button uses <strong>small (32px)</strong> below 900px and <strong>medium (40px)</strong> at 900px and above — matching product tile usage.
          </p>
          <div className={styles.responsiveDemo}>
            <div className={styles.responsiveItem}>
              <StateLabel>Inactive</StateLabel>
              <WCPHeartView listName="Amy's List" onViewList={() => alert('View list')} />
            </div>
            <div className={styles.responsiveItem}>
              <StateLabel>Activated</StateLabel>
              <WCPHeartView defaultActivated listName="Amy's List" onViewList={() => alert('View list')} />
            </div>
          </div>
        </section>

        {/* ── Controlled example ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Controlled</h2>
          <p className={styles.sectionDesc}>
            Use the <code>activated</code> + <code>onChange</code> props for a controlled component.
            Current state: <strong>{controlled ? 'Favorited' : 'Not favorited'}</strong>
          </p>
          <div className={styles.controlledDemo}>
            <WCPHeartView
              activated={controlled}
              onChange={setControlled}
              listName="Amy's List"
              onViewList={() => alert('Navigate to list')}
            />
            <button
              type="button"
              className={styles.resetBtn}
              onClick={() => setControlled(false)}
            >
              Reset
            </button>
          </div>
        </section>

        {/* ── Product tile example ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>In Context — Product Tile</h2>
          <p className={styles.sectionDesc}>
            The Heart View is typically overlaid on a product tile in the top-right corner. Below is a simplified tile example showing the positioning pattern.
          </p>
          <div className={styles.tilesRow}>
            {[false, true, false].map((initial, i) => (
              <MockProductTile key={i} initialFavorited={initial} />
            ))}
          </div>
        </section>

        {/* ── Do's and Don'ts ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Do's and Don'ts</h2>

          <div className={styles.dosDonotsGrid}>

            {/* DON'T 1 */}
            <div className={styles.dosDontCard}>
              <div className={styles.dosDontPreview}>
                <img
                  src="/assets/examples/heart-view/dont-1-heart-color.webp"
                  alt="Don't change the heart fill color"
                  className={styles.dosDontImg}
                />
              </div>
              <div className={styles.dontLabel}>
                <span className={styles.dontIcon} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="7.25" stroke="#C1002B" strokeWidth="1.5"/>
                    <line x1="4.5" y1="4.5" x2="11.5" y2="11.5" stroke="#C1002B" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="11.5" y1="4.5" x2="4.5" y2="11.5" stroke="#C1002B" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </span>
                <span className={styles.dontText}>DON&apos;T</span>
              </div>
              <p className={styles.dosDontDesc}>Don&apos;t change the color of the filled state of the Heart View component.</p>
            </div>

            {/* DON'T 2 */}
            <div className={styles.dosDontCard}>
              <div className={styles.dosDontPreview}>
                <img
                  src="/assets/examples/heart-view/dont-2-cta-tooltip.webp"
                  alt="Don't include inaccessible CTAs in the callout"
                  className={styles.dosDontImg}
                />
              </div>
              <div className={styles.dontLabel}>
                <span className={styles.dontIcon} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="7.25" stroke="#C1002B" strokeWidth="1.5"/>
                    <line x1="4.5" y1="4.5" x2="11.5" y2="11.5" stroke="#C1002B" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="11.5" y1="4.5" x2="4.5" y2="11.5" stroke="#C1002B" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </span>
                <span className={styles.dontText}>DON&apos;T</span>
              </div>
              <p className={styles.dosDontDesc}>Don&apos;t include CTAs in the tooltip content that are not available from the page underneath. Since it disappears automatically, some users will not be able to access the CTAs and need another way to access the same content.</p>
            </div>

            {/* DO 1 */}
            <div className={styles.dosDontCard}>
              <div className={styles.dosDontPreview}>
                <img
                  src="/assets/examples/heart-view/do-1-product-tiles.webp"
                  alt="Do overlay heart on product tile top right"
                  className={styles.dosDontImg}
                />
              </div>
              <div className={styles.doLabel}>
                <span className={styles.doIcon} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="7.25" stroke="#1A7A3F" strokeWidth="1.5"/>
                    <path d="M4.5 8L7 10.5L11.5 5.5" stroke="#1A7A3F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className={styles.doText}>DO</span>
              </div>
              <p className={styles.dosDontDesc}>Overlay the Heart Fill component on top of Item Tiles in the top right corner.</p>
            </div>

            {/* DO 2 */}
            <div className={styles.dosDontCard}>
              <div className={styles.dosDontPreview}>
                <img
                  src="/assets/examples/heart-view/do-2-pdp-floating.webp"
                  alt="Do match size with other PDP floating buttons"
                  className={styles.dosDontImg}
                />
              </div>
              <div className={styles.doLabel}>
                <span className={styles.doIcon} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="7.25" stroke="#1A7A3F" strokeWidth="1.5"/>
                    <path d="M4.5 8L7 10.5L11.5 5.5" stroke="#1A7A3F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className={styles.doText}>DO</span>
              </div>
              <p className={styles.dosDontDesc}>On PDP pages when using the Heart View component within a series of floating buttons, make sure its size matches the other buttons.</p>
            </div>

            {/* DO 3 */}
            <div className={styles.dosDontCard}>
              <div className={styles.dosDontPreview}>
                <img
                  src="/assets/examples/heart-view/do-3-callout-no-overlap.webp"
                  alt="Do place callout where it doesn't overlap other actions"
                  className={styles.dosDontImg}
                />
              </div>
              <div className={styles.doLabel}>
                <span className={styles.doIcon} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="7.25" stroke="#1A7A3F" strokeWidth="1.5"/>
                    <path d="M4.5 8L7 10.5L11.5 5.5" stroke="#1A7A3F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className={styles.doText}>DO</span>
              </div>
              <p className={styles.dosDontDesc}>Add a popover in a place where it doesn&apos;t overlap any other actions.</p>
            </div>

            {/* DON'T 3 */}
            <div className={styles.dosDontCard}>
              <div className={styles.dosDontPreview}>
                <img
                  src="/assets/examples/heart-view/dont-3-callout-overlap.webp"
                  alt="Don't place callout where it overlaps other actions"
                  className={styles.dosDontImg}
                />
              </div>
              <div className={styles.dontLabel}>
                <span className={styles.dontIcon} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="7.25" stroke="#C1002B" strokeWidth="1.5"/>
                    <line x1="4.5" y1="4.5" x2="11.5" y2="11.5" stroke="#C1002B" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="11.5" y1="4.5" x2="4.5" y2="11.5" stroke="#C1002B" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </span>
                <span className={styles.dontText}>DON&apos;T</span>
              </div>
              <p className={styles.dosDontDesc}>Don&apos;t add a popover in a place where it overlaps other actions. In the example above, the zoom action button is being covered.</p>
            </div>

          </div>
        </section>

        {/* ── Callout positions ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Callout Positions</h2>
          <p className={styles.sectionDesc}>
            Use the <code>calloutPosition</code> prop to control where the callout appears relative to the heart button.
            Choose based on the heart's location on the page so the callout never overlaps other actions.
          </p>
          <div className={styles.positionsGrid}>
            <div className={styles.positionCard}>
              <div className={styles.positionPreview}>
                <WCPHeartView size="medium" listName="Amy's List" calloutPosition="left" />
              </div>
              <div className={styles.positionMeta}>
                <code className={styles.positionCode}>calloutPosition="left"</code>
                <p className={styles.positionDesc}>Callout appears to the left. Use when the heart is in the center or right of the page.</p>
              </div>
            </div>
            <div className={styles.positionCard}>
              <div className={styles.positionPreview}>
                <WCPHeartView size="medium" listName="Amy's List" calloutPosition="right" />
              </div>
              <div className={styles.positionMeta}>
                <code className={styles.positionCode}>calloutPosition="right"</code>
                <p className={styles.positionDesc}>Callout appears to the right. Use when the heart is near the left edge.</p>
              </div>
            </div>
            <div className={styles.positionCard}>
              <div className={styles.positionPreview}>
                <WCPHeartView size="medium" listName="Amy's List" calloutPosition="bottom" />
              </div>
              <div className={styles.positionMeta}>
                <code className={styles.positionCode}>calloutPosition="bottom"</code>
                <p className={styles.positionDesc}>Callout appears below. Use when there is no space on either side, such as a narrow column.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Behavior notes ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Behavior</h2>
          <div className={styles.behaviorGrid}>
            <div className={styles.behaviorCard}>
              <h3 className={styles.behaviorTitle}>Desktop (900px+)</h3>
              <ul className={styles.behaviorList}>
                <li>Hover inactive → "Add to favorites" callout on left</li>
                <li>Hover activated → "Saved to favorites: [list]" callout with View link</li>
                <li>Click to toggle → transient callout ("Saved…" / "Removed…") for 2 seconds</li>
                <li>No snackbar on desktop</li>
              </ul>
            </div>
            <div className={styles.behaviorCard}>
              <h3 className={styles.behaviorTitle}>Mobile (&lt;900px)</h3>
              <ul className={styles.behaviorList}>
                <li>No hover callout (touch device)</li>
                <li>Click to toggle → snackbar fires at bottom center</li>
                <li>Add: "Saved to favorites: [list]" + View action</li>
                <li>Remove: "Removed from favorites: [list]"</li>
                <li>Snackbar auto-dismisses after 3.5s (configurable)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Code usage ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Usage</h2>
          <pre className={styles.codeBlock}>{`import { WCPHeartView } from '@/components/walmart/WCPHeartView';

// Uncontrolled — callout defaults to 'left'
<WCPHeartView
  listName="Amy's List"
  onViewList={() => navigate('/favorites')}
/>

// Controlled with explicit callout position
<WCPHeartView
  activated={isFavorited}
  onChange={setIsFavorited}
  listName="Amy's List"
  onViewList={() => navigate('/favorites')}
  calloutPosition="right"   // 'left' | 'right' | 'bottom'
  snackbarDuration={3500}
/>`}</pre>
        </section>

      </div>
    </ComponentPageLayout>
  );
}

// ── Mock product tile for context demo ──────────────────
function MockProductTile({ initialFavorited }: { initialFavorited: boolean }) {
  const [fav, setFav] = React.useState(initialFavorited);
  return (
    <div className={styles.tile}>
      <div className={styles.tileImage} aria-hidden="true">
        <div className={styles.tilePlaceholder} />
      </div>
      <div className={styles.tileHeartWrap}>
        <WCPHeartView
          activated={fav}
          onChange={setFav}
          listName="Amy's List"
          onViewList={() => {}}
        />
      </div>
      <div className={styles.tileMeta}>
        <div className={styles.tilePrice}>$24.97</div>
        <div className={styles.tileName}>Product name here</div>
      </div>
    </div>
  );
}
