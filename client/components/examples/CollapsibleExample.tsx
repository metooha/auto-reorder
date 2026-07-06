import React from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/Button';
import { LinkButton } from '@/components/ui/LinkButton';
import styles from './CollapsibleExample.module.css';

const LONG_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const MEDIUM_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

/* ─── Inline variant: "… Show more" on the same line ─── */
function InlineExpandableText({ text, lines = 1 }: { text: string; lines?: number }) {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div className={styles.expandableText}>
      {expanded ? (
        <>
          <span>{text}</span>
          {' '}
          <LinkButton onClick={() => setExpanded(false)}>Show less</LinkButton>
        </>
      ) : (
        <span
          className={styles.inlineClamped}
          style={{ WebkitLineClamp: lines } as React.CSSProperties}
        >
          {text}
          <span className={styles.inlineMore}>
            {'… '}
            <LinkButton onClick={() => setExpanded(true)}>Show more</LinkButton>
          </span>
        </span>
      )}
    </div>
  );
}

/* ─── Block variant: "Show more" on its own line below ─── */
function BlockExpandableText({ text, lines = 2 }: { text: string; lines?: number }) {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div>
      <p
        className={[styles.expandableText, !expanded ? styles.blockClamped : ''].join(' ')}
        style={!expanded ? ({ WebkitLineClamp: lines } as React.CSSProperties) : undefined}
      >
        {text}
      </p>
      <LinkButton onClick={() => setExpanded(v => !v)}>
        {expanded ? 'Show less' : 'Show more'}
      </LinkButton>
    </div>
  );
}

export default function CollapsibleExample() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={styles.root}>

      {/* ── Basic Collapsible ── */}
      <section>
        <h3 className={styles.sectionTitle}>Basic Collapsible</h3>
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className={styles.collapsibleContainer}>
          <div className={styles.collapsibleHeader}>
            <h4 className={styles.collapsibleHeading}>Order #WM-20250218 — 3 items</h4>
            <CollapsibleTrigger asChild>
              <Button variant="secondary" size="small">{isOpen ? 'Hide' : 'Show'}</Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            {[
              { name: 'Organic Whole Milk, 1 Gallon', detail: 'Qty: 1 · $4.98' },
              { name: 'Fresh Bananas, Each', detail: 'Qty: 6 · $0.27 each' },
              { name: 'Great Value Large White Eggs, 12 Count', detail: 'Qty: 1 · $3.12' },
            ].map((item) => (
              <div key={item.name} className={styles.collapsibleItem}>
                <p className={styles.itemName}>{item.name}</p>
                <p className={styles.itemDetail}>{item.detail}</p>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </section>

      {/* ── Inline Show More ── */}
      <section>
        <h3 className={styles.sectionTitle}>Expandable Text — Inline</h3>
        <p className={styles.sectionDesc}>
          Text is clamped to a single line with "Show more" appended inline.
        </p>
        <div className={styles.exampleList}>
          <InlineExpandableText text={LONG_TEXT} lines={1} />
          <InlineExpandableText text={MEDIUM_TEXT} lines={1} />
          <InlineExpandableText
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolor..."
            lines={1}
          />
        </div>
      </section>

      {/* ── Block Show More ── */}
      <section>
        <h3 className={styles.sectionTitle}>Expandable Text — Block</h3>
        <p className={styles.sectionDesc}>
          "Show more / Show less" appears on its own line below the text.
        </p>
        <div className={styles.exampleList}>
          <BlockExpandableText text={LONG_TEXT} lines={2} />
          <BlockExpandableText text={MEDIUM_TEXT} lines={1} />
          <BlockExpandableText
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            lines={1}
          />
        </div>
      </section>

    </div>
  );
}
