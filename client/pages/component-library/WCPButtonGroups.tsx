import React from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import styles from './WCPButtonGroups.module.css';

// ── Shared preview wrappers ───────────────────────────────────────────────────

function PatternFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.patternFrame}>
      {children}
    </div>
  );
}

function PatternCard({
  name,
  tag,
  description,
  children,
}: {
  name: string;
  tag?: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.patternCard}>
      <div className={styles.patternCardHeader}>
        <span className={styles.patternName}>{name}</span>
        {tag && <Tag variant="neutral">{tag}</Tag>}
      </div>
      <p className={styles.patternDesc}>{description}</p>
      <PatternFrame>{children}</PatternFrame>
    </div>
  );
}

// ── Inline Button Groups ──────────────────────────────────────────────────────

function InlinePrimarySecondary({ fullWidth = true }: { fullWidth?: boolean }) {
  return (
    <div className={fullWidth ? styles.inlineFull : styles.inlineAuto}>
      <Button variant="secondary" size="medium" isFullWidth={fullWidth}>Alternate</Button>
      <Button variant="primary" size="medium" isFullWidth={fullWidth}>Preferred</Button>
    </div>
  );
}

function InlinePrimaryTertiary({ fullWidth = true }: { fullWidth?: boolean }) {
  return (
    <div className={fullWidth ? styles.inlineFull : styles.inlineAuto}>
      <Button variant="tertiary" size="medium" isFullWidth={fullWidth}>Alternate</Button>
      <Button variant="primary" size="medium" isFullWidth={fullWidth}>Preferred</Button>
    </div>
  );
}

function InlineSecondaryTertiary({ fullWidth = true }: { fullWidth?: boolean }) {
  return (
    <div className={fullWidth ? styles.inlineFull : styles.inlineAuto}>
      <Button variant="tertiary" size="medium" isFullWidth={fullWidth}>Alternate</Button>
      <Button variant="secondary" size="medium" isFullWidth={fullWidth}>Preferred</Button>
    </div>
  );
}

function InlineTertiaryTertiary({ fullWidth = true }: { fullWidth?: boolean }) {
  return (
    <div className={fullWidth ? styles.inlineFull : styles.inlineAuto}>
      <Button variant="tertiary" size="medium" isFullWidth={fullWidth}>Alternate</Button>
      <Button variant="tertiary" size="medium" isFullWidth={fullWidth}>Preferred</Button>
    </div>
  );
}

// ── Stacked Button Groups ─────────────────────────────────────────────────────

function StackedPrimarySecondary() {
  return (
    <div className={styles.stacked}>
      <Button variant="primary" size="medium" isFullWidth>Preferred</Button>
      <Button variant="secondary" size="medium" isFullWidth>Alternate</Button>
    </div>
  );
}

function StackedPrimaryTertiary() {
  return (
    <div className={styles.stacked}>
      <Button variant="primary" size="medium" isFullWidth>Preferred</Button>
      <Button variant="tertiary" size="medium" isFullWidth>Alternate</Button>
    </div>
  );
}

function StackedSecondaryTertiary() {
  return (
    <div className={styles.stacked}>
      <Button variant="secondary" size="medium" isFullWidth>Preferred</Button>
      <Button variant="tertiary" size="medium" isFullWidth>Alternate</Button>
    </div>
  );
}

function Stacked3Options() {
  return (
    <div className={styles.stacked}>
      {/* Top row: inline Primary-Secondary */}
      <div className={styles.inlineFull}>
        <Button variant="secondary" size="medium" isFullWidth>Alternate</Button>
        <Button variant="primary" size="medium" isFullWidth>Preferred</Button>
      </div>
      {/* Bottom tertiary link */}
      <Button variant="tertiary" size="medium" isFullWidth>Alternate</Button>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function WCPButtonGroupsPage() {
  return (
    <ComponentPageLayout
      section="WCP Components"
      title="Button Groups"
      description="WCP button group patterns for mobile cards, action footers, and bottom sheets. Each pattern specifies which LD 3.5 button variants to pair and in what order — primary action always on the right (inline) or top (stacked)."
    >

      {/* ── Inline Patterns ───────────────────────────────────── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>In-line Patterns</h2>
        <p className={styles.sectionDesc}>
          Side-by-side buttons on the same row. Use when two actions are equally visible and screen width allows. The <strong>Preferred</strong> (primary) action is always on the right. Supports full-width (fills container) and auto-width variants.
        </p>

        <div className={styles.patternGrid}>
          <PatternCard
            name="Primary / Secondary"
            tag="Most common"
            description="The standard two-button pattern. Use for key decision points like 'Confirm / Cancel' or 'Check in / View details'."
          >
            <div className={styles.variantGroup}>
              <span className={styles.variantLabel}>Full width</span>
              <InlinePrimarySecondary fullWidth />
            </div>
            <div className={styles.variantGroup}>
              <span className={styles.variantLabel}>Auto width</span>
              <InlinePrimarySecondary fullWidth={false} />
            </div>
          </PatternCard>

          <PatternCard
            name="Primary / Tertiary"
            description="Strong primary action paired with a lower-emphasis alternative. Use when the alternate path is optional or destructive."
          >
            <div className={styles.variantGroup}>
              <span className={styles.variantLabel}>Full width</span>
              <InlinePrimaryTertiary fullWidth />
            </div>
            <div className={styles.variantGroup}>
              <span className={styles.variantLabel}>Auto width</span>
              <InlinePrimaryTertiary fullWidth={false} />
            </div>
          </PatternCard>

          <PatternCard
            name="Secondary / Tertiary"
            description="Use when neither action is the primary CTA — e.g. 'Reschedule / Cancel' inside a card with a primary action above."
          >
            <div className={styles.variantGroup}>
              <span className={styles.variantLabel}>Full width</span>
              <InlineSecondaryTertiary fullWidth />
            </div>
            <div className={styles.variantGroup}>
              <span className={styles.variantLabel}>Auto width</span>
              <InlineSecondaryTertiary fullWidth={false} />
            </div>
          </PatternCard>

          <PatternCard
            name="Tertiary / Tertiary"
            description="Two equal-weight text link buttons. Use only when both actions are supplementary — e.g. 'Learn more / Skip' inside an informational card."
          >
            <div className={styles.variantGroup}>
              <span className={styles.variantLabel}>Full width</span>
              <InlineTertiaryTertiary fullWidth />
            </div>
            <div className={styles.variantGroup}>
              <span className={styles.variantLabel}>Auto width</span>
              <InlineTertiaryTertiary fullWidth={false} />
            </div>
          </PatternCard>
        </div>
      </section>

      {/* ── Stacked Patterns ──────────────────────────────────── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Stacked Patterns</h2>
        <p className={styles.sectionDesc}>
          Vertically stacked full-width buttons. Use in narrow contexts like bottom sheets or action footers where horizontal space is constrained. The <strong>Preferred</strong> action is always on top.
        </p>

        <div className={styles.patternGrid}>
          <PatternCard
            name="Primary / Secondary"
            tag="Most common"
            description="The standard stacked pattern — preferred primary action on top, alternate secondary below. Common in checkout flows and bottom sheets."
          >
            <StackedPrimarySecondary />
          </PatternCard>

          <PatternCard
            name="Primary / Tertiary"
            description="Strong primary action with a lower-emphasis alternative below. Use when the alternate is a 'dismiss' or 'skip' type action."
          >
            <StackedPrimaryTertiary />
          </PatternCard>

          <PatternCard
            name="Secondary / Tertiary"
            description="Use when a primary action already exists above the button group — e.g. inside a card where the main CTA is the card title or image link."
          >
            <StackedSecondaryTertiary />
          </PatternCard>

          <PatternCard
            name="3 Options"
            tag="Complex"
            description="An inline Primary/Secondary row on top with a tertiary link below. Use sparingly — only when a third, lower-priority path is required (e.g. 'Get it now / Edit items' + 'Cancel order')."
          >
            <Stacked3Options />
          </PatternCard>
        </div>
      </section>

      {/* ── Usage Rules ───────────────────────────────────────── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Usage Rules</h2>
        <div className={styles.rulesGrid}>
          {[
            { rule: 'Primary always right (inline) or top (stacked)', type: 'do' },
            { rule: 'Limit to 2 buttons inline; use Stacked 3 Options for 3', type: 'do' },
            { rule: 'Keep button labels concise — 1–3 words', type: 'do' },
            { rule: 'Never put two primary buttons in one group', type: 'dont' },
            { rule: 'Do not stack inline groups or inline stacked groups', type: 'dont' },
            { rule: 'Avoid using isFullWidth={false} in bottom sheets or action footers', type: 'dont' },
          ].map((item) => (
            <div key={item.rule} className={item.type === 'do' ? styles.rulesDo : styles.rulesDont}>
              <span className={styles.rulesIcon}>{item.type === 'do' ? '✓' : '✕'}</span>
              <span className={styles.rulesText}>{item.rule}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Import Reference ──────────────────────────────────── */}
      <section className={styles.usageSection}>
        <h2 className={styles.sectionTitle}>Code Reference</h2>
        <pre className={styles.codeBlock}>{`// Inline Primary / Secondary (full width)
<div style={{ display: 'flex', gap: '8px' }}>
  <Button variant="secondary" size="medium" isFullWidth>Alternate</Button>
  <Button variant="primary"   size="medium" isFullWidth>Preferred</Button>
</div>

// Stacked Primary / Secondary
<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
  <Button variant="primary"   size="medium" isFullWidth>Preferred</Button>
  <Button variant="secondary" size="medium" isFullWidth>Alternate</Button>
</div>

// Stacked 3 Options
<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
  <div style={{ display: 'flex', gap: '8px' }}>
    <Button variant="secondary" size="medium" isFullWidth>Alternate</Button>
    <Button variant="primary"   size="medium" isFullWidth>Preferred</Button>
  </div>
  <Button variant="tertiary" size="medium" isFullWidth>Alternate</Button>
</div>`}</pre>
      </section>
    </ComponentPageLayout>
  );
}
