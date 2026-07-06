import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { WCPRating } from '@/components/walmart/WCPRating';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import styles from './WCPRating.module.css';

// ─── Shared helpers ───────────────────────────────────────────────────────────
function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className={styles.sectionTitle}>{children}</h2>;
}

function SectionDesc({ children }: { children: React.ReactNode }) {
  return <p className={styles.sectionDesc}>{children}</p>;
}

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={styles.demoCard}>
      <h3 className={styles.cardTitle}>{title}</h3>
      {children}
    </div>
  );
}

// ─── Rating Display — Auto Care data ─────────────────────────────────────────
const AUTO_CARE_SERVICES = [
  {
    id: 'oil-change',
    icon: '🛢️',
    title: 'Conventional Oil Change',
    description: 'Includes up to 5 quarts of conventional oil and new oil filter',
    price: '$19.88',
    rating: 4.7,
    count: '(4.7)',
    reviewCount: '12,451 reviews',
    badge: 'Best seller',
  },
  {
    id: 'synthetic',
    icon: '⚙️',
    title: 'Full Synthetic Oil Change',
    description: 'Includes up to 5 quarts of full synthetic oil and new oil filter',
    price: '$49.88',
    rating: 4.5,
    count: '(4.5)',
    reviewCount: '8,320 reviews',
    badge: 'Popular',
  },
  {
    id: 'tire-rotation',
    icon: '🔄',
    title: 'Tire Rotation',
    description: 'Rotate and balance up to 4 tires. Includes multi-point inspection',
    price: '$14.00',
    rating: 4.3,
    count: '(4.3)',
    reviewCount: '5,184 reviews',
    badge: null,
  },
  {
    id: 'battery',
    icon: '🔋',
    title: 'Battery Test & Replacement',
    description: 'Free battery test. Installation included with purchase',
    price: '$0.00',
    rating: 4.8,
    count: '(4.8)',
    reviewCount: '2,907 reviews',
    badge: 'Free',
  },
];

// ─── Rating Display sub-components ───────────────────────────────────────────
interface ServiceTileProps {
  icon: string;
  title: string;
  description: string;
  price: string;
  rating: number;
  count: string;
  reviewCount: string;
  badge: string | null;
}

function ServiceTile({ icon, title, description, price, rating, count, reviewCount, badge }: ServiceTileProps) {
  return (
    <div className={styles.serviceTile}>
      <div className={styles.serviceTileTop}>
        <div className={styles.serviceTileIcon}>{icon}</div>
        <div className={styles.serviceTileContent}>
          <div className={styles.serviceTileMeta}>
            <span className={styles.serviceTileTitle}>{title}</span>
            {badge && (
              <Tag variant={badge === 'Free' ? 'success' : badge === 'Best seller' ? 'info' : 'neutral'}>
                {badge}
              </Tag>
            )}
          </div>
          <p className={styles.serviceTileDesc}>{description}</p>
          <WCPRating
            value={rating}
            size="small"
            count={count}
            linkText={reviewCount}
            aria-label={`${title}: ${rating} stars`}
          />
        </div>
      </div>
      <div className={styles.serviceTileFooter}>
        <span className={styles.serviceTilePrice}>
          {price === '$0.00'
            ? 'Free'
            : <><span className={styles.serviceTilePriceAmount}>{price}</span> per vehicle</>}
        </span>
        <Button variant="primary" size="small">Book Service</Button>
      </div>
    </div>
  );
}

function ReviewPromptCard() {
  return (
    <div className={styles.reviewCard}>
      <div className={styles.reviewCardHeader}>
        <div className={styles.reviewCardIcon}>✅</div>
        <div>
          <p className={styles.reviewCardTitle}>Service Complete</p>
          <p className={styles.reviewCardMeta}>Conventional Oil Change · Today, 2:15 PM</p>
          <p className={styles.reviewCardMeta}>Technician: Marcus T.</p>
        </div>
      </div>
      <div className={styles.reviewCardDivider} />
      <div className={styles.reviewCardBody}>
        <p className={styles.reviewCardPrompt}>
          How was your experience? Your review helps other customers choose Auto Care services.
        </p>
        <div className={styles.reviewCardStars}>
          <p className={styles.reviewCardStarsLabel}>Tap to rate your visit</p>
          <WCPRating value={0} size="medium" aria-label="Rate your Auto Care experience" />
        </div>
        <div className={styles.reviewCardActions}>
          <Button variant="primary" size="small">Write a Review</Button>
          <Button variant="tertiary" size="small">Not Now</Button>
        </div>
      </div>
    </div>
  );
}

// ─── Interactive Rating labels ────────────────────────────────────────────────
const LABELS: Record<number, string> = {
  0: 'Unrated',
  1: 'Very poor',
  2: 'Poor',
  3: 'Fair',
  4: 'Good',
  5: 'Excellent',
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function WCPRatingPage() {
  const [controlledValue, setControlledValue] = useState(0);
  const [lastSelected, setLastSelected] = useState<number | null>(null);

  return (
    <ComponentPageLayout
      section="WCP Components"
      title="Ratings"
      description="Two complementary rating components: an interactive star picker (WCPRating) for collecting user feedback, and a read-only aggregate display (WCPRatingDisplay) for item tiles and review sections."
    >
      <div className={styles.content}>

        {/* ══════════════════════════════════════════════════════════════════
            PART 1 — INTERACTIVE RATING (WCPRating)
        ══════════════════════════════════════════════════════════════════ */}
        <div className={styles.componentBlock}>
          <div className={styles.componentBlockHeader}>
            <div>
              <h2 className={styles.componentBlockTitle}>Interactive Rating</h2>
              <p className={styles.componentBlockSubtitle}>
                <code>WCPRating</code> — allows users to select a 1–5 star rating. Supports
                hover preview, controlled / uncontrolled modes, two sizes, and full keyboard
                + screen-reader accessibility.
              </p>
            </div>
            <Tag variant="info">User input</Tag>
          </div>

          {/* Live demo */}
          <section className={styles.section}>
            <SectionTitle>Interactive Demo</SectionTitle>
            <SectionDesc>
              Click a star to select a rating. Click the same star again to clear it back
              to "Unrated". Hover over stars to preview the label.
            </SectionDesc>
            <div className={styles.interactiveDemo}>
              <div className={styles.interactiveDemoInner}>
                <WCPRating
                  size="medium"
                  value={controlledValue}
                  onChange={(v) => {
                    setControlledValue(v);
                    setLastSelected(v);
                  }}
                  aria-label="Product rating"
                />
                <div className={styles.interactiveMeta}>
                  <span className={styles.interactiveValue}>
                    Selected: <strong>{controlledValue}</strong> — {LABELS[controlledValue]}
                  </span>
                  {lastSelected !== null && (
                    <span className={styles.interactiveLastEvent}>
                      Last onChange: {lastSelected}
                    </span>
                  )}
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => { setControlledValue(0); setLastSelected(null); }}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Sizes */}
          <section className={styles.section}>
            <SectionTitle>Sizes</SectionTitle>
            <SectionDesc>
              Two size variants — <code>small</code> (20→24px) and <code>medium</code> (28→32px)
              — adapt at the 900px breakpoint.
            </SectionDesc>
            <div className={styles.sizesGrid}>
              <DemoCard title="Small">
                <div className={styles.ratingsRow}>
                  {[0, 1, 2, 3, 4, 5].map((v) => (
                    <WCPRating size="small" defaultValue={v} key={`small-${v}`} />
                  ))}
                </div>
              </DemoCard>
              <DemoCard title="Medium">
                <div className={styles.ratingsRow}>
                  {[0, 1, 2, 3, 4, 5].map((v) => (
                    <WCPRating size="medium" defaultValue={v} key={`medium-${v}`} />
                  ))}
                </div>
              </DemoCard>
            </div>
          </section>

          {/* States */}
          <section className={styles.section}>
            <SectionTitle>States</SectionTitle>
            <SectionDesc>
              Default, selected, and disabled states. The disabled state prevents all
              interaction and reduces opacity.
            </SectionDesc>
            <div className={styles.statesGrid}>
              <DemoCard title="Default (Unrated)">
                <div className={styles.stateItem}><WCPRating size="medium" defaultValue={0} /></div>
              </DemoCard>
              <DemoCard title="With selection (Good — 4 stars)">
                <div className={styles.stateItem}><WCPRating size="medium" defaultValue={4} /></div>
              </DemoCard>
              <DemoCard title="Disabled (Unrated)">
                <div className={styles.stateItem}><WCPRating size="medium" defaultValue={0} disabled /></div>
              </DemoCard>
              <DemoCard title="Disabled (3 stars)">
                <div className={styles.stateItem}><WCPRating size="medium" defaultValue={3} disabled /></div>
              </DemoCard>
            </div>
          </section>

          {/* Labels */}
          <section className={styles.section}>
            <SectionTitle>Rating Labels</SectionTitle>
            <SectionDesc>
              Each star value maps to a semantic label shown below the stars.
            </SectionDesc>
            <div className={styles.labelsTable}>
              <div className={styles.labelsTableHeader}>
                <span>Stars</span><span>Label</span><span>Preview</span>
              </div>
              {[0, 1, 2, 3, 4, 5].map((v) => (
                <div key={v} className={styles.labelsTableRow}>
                  <span className={styles.labelsTableStars}>{v === 0 ? '—' : `${v} / 5`}</span>
                  <span className={styles.labelsTableLabel}>{LABELS[v]}</span>
                  <WCPRating size="small" value={v} aria-label={`${v} stars example`} />
                </div>
              ))}
            </div>
          </section>

          {/* Accessibility */}
          <section className={styles.section}>
            <SectionTitle>Accessibility</SectionTitle>
            <div className={styles.behaviorGrid}>
              <div className={styles.behaviorCard}>
                <h4 className={styles.behaviorTitle}>Keyboard interaction</h4>
                <ul className={styles.behaviorList}>
                  <li><code>Tab</code> — moves focus between individual star buttons</li>
                  <li><code>Enter</code> / <code>Space</code> — selects or clears the focused star</li>
                  <li>Clicking the selected star clears the rating to "Unrated"</li>
                </ul>
              </div>
              <div className={styles.behaviorCard}>
                <h4 className={styles.behaviorTitle}>Screen reader support</h4>
                <ul className={styles.behaviorList}>
                  <li>Stars are wrapped in a <code>role="radiogroup"</code></li>
                  <li>Each star has <code>role="radio"</code> and <code>aria-checked</code></li>
                  <li>Label uses <code>aria-live="polite"</code> to announce changes</li>
                  <li>Pass a custom <code>aria-label</code> to name the group</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Usage + Props */}
          <section className={styles.section}>
            <SectionTitle>Usage</SectionTitle>
            <pre className={styles.codeBlock}>{`import { WCPRating } from '@/components/walmart/WCPRating';

// Uncontrolled
<WCPRating size="medium" defaultValue={0} onChange={(v) => console.log(v)} />

// Controlled
const [rating, setRating] = useState(0);
<WCPRating size="medium" value={rating} onChange={setRating} />

// Disabled
<WCPRating size="medium" value={4} disabled />`}
            </pre>
          </section>

          <section className={styles.section}>
            <SectionTitle>Props — WCPRating</SectionTitle>
            <div className={styles.propsTable}>
              <div className={styles.propsTableHeader}>
                <span>Prop</span><span>Type</span><span>Default</span><span>Description</span>
              </div>
              {[
                { prop: 'value', type: 'number', def: '—', desc: 'Controlled value (0–5). 0 = unrated.' },
                { prop: 'defaultValue', type: 'number', def: '0', desc: 'Uncontrolled initial value.' },
                { prop: 'onChange', type: '(value: number) => void', def: '—', desc: 'Fires when the user selects or clears a rating.' },
                { prop: 'size', type: "'small' | 'medium'", def: "'medium'", desc: 'Controls star dimensions at mobile and desktop breakpoints.' },
                { prop: 'disabled', type: 'boolean', def: 'false', desc: 'Prevents all interaction and reduces opacity.' },
                { prop: 'aria-label', type: 'string', def: "'Star rating'", desc: 'Accessible name for the radiogroup.' },
                { prop: 'className', type: 'string', def: '—', desc: 'Additional class on the outer wrapper.' },
              ].map(({ prop, type, def, desc }) => (
                <div key={prop} className={styles.propsTableRow}>
                  <code className={styles.propName}>{prop}</code>
                  <code className={styles.propType}>{type}</code>
                  <code className={styles.propDefault}>{def}</code>
                  <span className={styles.propDesc}>{desc}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* divider */}
        <div className={styles.pageDivider} />

        {/* ══════════════════════════════════════════════════════════════════
            PART 2 — RATING DISPLAY (WCPRatingDisplay)
        ══════════════════════════════════════════════════════════════════ */}
        <div className={styles.componentBlock}>
          <div className={styles.componentBlockHeader}>
            <div>
              <h2 className={styles.componentBlockTitle}>Rating Display</h2>
              <p className={styles.componentBlockSubtitle}>
                <code>WCPRatingDisplay</code> — non-interactive aggregate display for item tiles
                and review sections. Shows 5 stars reflecting an overall score with optional
                count, link, and trailing text. Two sizes and two color schemes.
              </p>
            </div>
            <Tag variant="neutral">Read-only</Tag>
          </div>

          {/* All variants */}
          <section className={styles.section}>
            <SectionTitle>Variants</SectionTitle>
            <SectionDesc>
              Two sizes (small · 12px stars, medium · 20px stars) and two color schemes
              (default for light surfaces, inverse for dark backgrounds).
            </SectionDesc>
            <div className={styles.variantsGrid}>
              <div className={styles.variantBox}>
                <span className={styles.variantLabel}>Default · Small · 0 stars</span>
                <WCPRating value={0} size="small" count="(1.5)" linkText="Link" text="Text string" />
              </div>
              <div className={styles.variantBox}>
                <span className={styles.variantLabel}>Default · Small · 2 stars</span>
                <WCPRating value={2} size="small" count="(2.0)" linkText="Link" text="Text string" />
              </div>
              <div className={styles.variantBox}>
                <span className={styles.variantLabel}>Default · Medium · 0 stars</span>
                <WCPRating value={0} size="medium" count="(1.5)" linkText="Link" text="Text string" />
              </div>
              <div className={styles.variantBox}>
                <span className={styles.variantLabel}>Default · Medium · 2 stars</span>
                <WCPRating value={2} size="medium" count="(1.5)" linkText="Link" text="Text string" />
              </div>
              <div className={`${styles.variantBox} ${styles.variantBoxInverse}`}>
                <span className={`${styles.variantLabel} ${styles.variantLabelInverse}`}>Inverse · Small</span>
                <WCPRating value={0} size="small" color="inverse" count="(1.5)" linkText="Link" text="Text string" />
              </div>
              <div className={`${styles.variantBox} ${styles.variantBoxInverse}`}>
                <span className={`${styles.variantLabel} ${styles.variantLabelInverse}`}>Inverse · Medium</span>
                <WCPRating value={0} size="medium" color="inverse" count="(1.5)" linkText="Link" text="Text string" />
              </div>
            </div>
          </section>

          {/* Auto Care engagement — Way 1 */}
          <section className={styles.section}>
            <div className={styles.sectionBadge}>Way 1 of 2 — Auto Care Engagement</div>
            <SectionTitle>Surface Ratings on Service Tiles</SectionTitle>
            <SectionDesc>
              Displaying aggregate star ratings directly on Auto Care service cards increases
              customer confidence before booking — reducing drop-off and increasing
              same-session conversions.
            </SectionDesc>

            <div className={styles.engagementHighlight}>
              <div className={styles.highlightStat}>
                <span className={styles.highlightNumber}>+23%</span>
                <span className={styles.highlightLabel}>booking rate when ratings are visible on service tiles</span>
              </div>
              <div className={styles.highlightDivider} />
              <div className={styles.highlightStat}>
                <span className={styles.highlightNumber}>4.6★</span>
                <span className={styles.highlightLabel}>average Auto Care rating across all service types</span>
              </div>
            </div>

            <div className={styles.frameLabel}>Auto Care Service Listing — Mobile</div>
            <div className={styles.mobileFrame}>
              <div className={styles.frameHeader}>
                <span className={styles.frameHeaderTitle}>Auto Care Services</span>
                <span className={styles.frameHeaderSub}>4 services near you</span>
              </div>
              <div className={styles.serviceList}>
                {AUTO_CARE_SERVICES.map((s) => (
                  <ServiceTile key={s.id} {...s} />
                ))}
              </div>
            </div>

            <div className={styles.beforeAfterGrid}>
              <div className={styles.beforeCard}>
                <h4 className={styles.beforeAfterTitle}>Without ratings</h4>
                <p className={styles.beforeAfterDesc}>
                  Service tiles show only title, description, and price. Customers must tap
                  into each service to find reviews — creating friction.
                </p>
                <div className={styles.simpleTile}>
                  <span className={styles.simpleTileIcon}>🛢️</span>
                  <div>
                    <p className={styles.simpleTileName}>Conventional Oil Change</p>
                    <p className={styles.simpleTilePrice}>$19.88</p>
                  </div>
                  <Button variant="secondary" size="small">Book</Button>
                </div>
              </div>
              <div className={styles.afterCard}>
                <h4 className={styles.beforeAfterTitle}>With ratings</h4>
                <p className={styles.beforeAfterDesc}>
                  Ratings surface trust signals inline. Review count links go directly to the
                  reviews section for deeper evaluation.
                </p>
                <div className={styles.simpleTile}>
                  <span className={styles.simpleTileIcon}>🛢️</span>
                  <div className={styles.simpleTileBody}>
                    <p className={styles.simpleTileName}>Conventional Oil Change</p>
                    <WCPRating value={4.7} size="small" count="(4.7)" linkText="12,451 reviews" />
                    <p className={styles.simpleTilePrice}>$19.88</p>
                  </div>
                  <Button variant="primary" size="small">Book</Button>
                </div>
              </div>
            </div>
          </section>

          {/* Auto Care engagement — Way 2 */}
          <section className={styles.section}>
            <div className={styles.sectionBadge}>Way 2 of 2 — Auto Care Engagement</div>
            <SectionTitle>Post-Service Review Prompts</SectionTitle>
            <SectionDesc>
              After a completed appointment, a contextual review prompt re-engages customers
              and collects fresh UGC — creating a feedback loop that improves both service
              quality and future bookings.
            </SectionDesc>

            <div className={styles.engagementHighlight}>
              <div className={styles.highlightStat}>
                <span className={styles.highlightNumber}>3×</span>
                <span className={styles.highlightLabel}>more reviews submitted when prompted in-app vs. email</span>
              </div>
              <div className={styles.highlightDivider} />
              <div className={styles.highlightStat}>
                <span className={styles.highlightNumber}>+18%</span>
                <span className={styles.highlightLabel}>repeat booking rate among customers who leave a review</span>
              </div>
            </div>

            <div className={styles.frameLabel}>Post-Service Review Card — Mobile</div>
            <div className={styles.mobileFrameNarrow}>
              <ReviewPromptCard />
            </div>

            <div className={styles.promptVariantsGrid}>
              <div className={styles.promptVariantCard}>
                <h4 className={styles.promptVariantTitle}>Order confirmation</h4>
                <p className={styles.promptVariantDesc}>
                  Embed the rating prompt in the completion screen for maximum visibility.
                </p>
                <div className={styles.promptVariantDemo}>
                  <WCPRating value={0} size="small" linkText="Rate your visit" text="takes 30 seconds" />
                </div>
              </div>
              <div className={styles.promptVariantCard}>
                <h4 className={styles.promptVariantTitle}>Purchase history</h4>
                <p className={styles.promptVariantDesc}>
                  Surface unreviewed past services so customers can retroactively leave ratings.
                </p>
                <div className={styles.promptVariantDemo}>
                  <WCPRating value={0} size="small" linkText="Leave a review" text="Not yet reviewed" />
                </div>
              </div>
              <div className={styles.promptVariantCard}>
                <h4 className={styles.promptVariantTitle}>Home page widget</h4>
                <p className={styles.promptVariantDesc}>
                  A "Recent visit" widget nudges customers within 7 days of an appointment.
                </p>
                <div className={styles.promptVariantDemo}>
                  <WCPRating value={0} size="small" count="(0)" linkText="Rate your Oil Change" />
                </div>
              </div>
              <div className={styles.promptVariantCard}>
                <h4 className={styles.promptVariantTitle}>Service detail page</h4>
                <p className={styles.promptVariantDesc}>
                  Use medium size for prominence alongside the full review list.
                </p>
                <div className={styles.promptVariantDemo}>
                  <WCPRating value={4.7} size="medium" count="(4.7)" linkText="12,451 reviews" text="Verified bookings" />
                </div>
              </div>
            </div>
          </section>

          {/* Usage + Props */}
          <section className={styles.section}>
            <SectionTitle>Usage</SectionTitle>
            <pre className={styles.codeBlock}>{`import { WCPRatingDisplay } from '@/components/walmart/WCPRatingDisplay';

// Item tile (small, default)
<WCPRating
  value={4.7}
  size="small"
  count="(4.7)"
  linkText="12,451 reviews"
  linkHref="/auto-care/oil-change/reviews"
  text="Verified bookings"
/>

// Review section header (medium)
<WCPRating value={4.7} size="medium" count="(4.7)" linkText="12,451 reviews" />

// On a dark surface (inverse)
<WCPRating value={4.7} size="small" color="inverse" count="(4.7)" linkText="Reviews" />`}
            </pre>
          </section>

          <section className={styles.section}>
            <SectionTitle>Props — WCPRatingDisplay</SectionTitle>
            <div className={styles.propsTable}>
              <div className={styles.propsTableHeader}>
                <span>Prop</span><span>Type</span><span>Default</span><span>Description</span>
              </div>
              {[
                { prop: 'value', type: 'number', def: '0', desc: 'Rating 0–5. Supports whole numbers and 0.5 increments.' },
                { prop: 'size', type: "'small' | 'medium'", def: "'small'", desc: 'Small → 12px stars + caption. Medium → 20px stars + body text.' },
                { prop: 'color', type: "'default' | 'inverse'", def: "'default'", desc: 'Default for light surfaces. Inverse for dark / coloured backgrounds.' },
                { prop: 'count', type: 'string', def: '—', desc: 'Aggregate count label, e.g. "(4.7)". Omit to hide.' },
                { prop: 'linkText', type: 'string', def: '—', desc: 'Link text, e.g. "12,451 reviews". Omit to hide.' },
                { prop: 'linkHref', type: 'string', def: '"#"', desc: 'href for the link element.' },
                { prop: 'onLinkClick', type: '(e) => void', def: '—', desc: 'Click handler for the link.' },
                { prop: 'text', type: 'string', def: '—', desc: 'Trailing text after the pipe separator. Omit to hide.' },
                { prop: 'className', type: 'string', def: '—', desc: 'Additional classes on the wrapper.' },
                { prop: 'aria-label', type: 'string', def: 'auto', desc: 'Accessible label for the star region.' },
              ].map(({ prop, type, def, desc }) => (
                <div key={prop} className={styles.propsTableRow}>
                  <code className={styles.propName}>{prop}</code>
                  <code className={styles.propType}>{type}</code>
                  <code className={styles.propDefault}>{def}</code>
                  <span className={styles.propDesc}>{desc}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

      </div>
    </ComponentPageLayout>
  );
}
