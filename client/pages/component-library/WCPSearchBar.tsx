import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { WCPSearchBar } from '@/components/walmart/WCPSearchBar';
import styles from './WCPSearchBar.module.css';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className={styles.sectionTitle}>{children}</h2>;
}

function SectionDesc({ children }: { children: React.ReactNode }) {
  return <p className={styles.sectionDesc}>{children}</p>;
}

export default function WCPSearchBarPage() {
  const [liveValue, setLiveValue] = useState('');
  const [disabledValue] = useState('');

  return (
    <ComponentPageLayout
      section="WCP Components"
      title="[WCP] Search Bar"
      description="Inline page search component positioned within a page — not used for global navigation. Supports two breakpoints (0–899px and 900+px) and states: Enabled, Hovered, Activated (empty & with value), and Disabled."
    >
      <div className={styles.page}>

        {/* ── Overview ─────────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Overview</SectionTitle>
          <SectionDesc>
            The WCP Search Bar is an inline search field for filtering content within a page. It
            differs from the global navigation search — it is scoped to a single section or page.
            On mobile (0–899px) it uses a slightly more compact height (48px) and on desktop
            (900+px) it uses 56px. When activated, a blinking cursor appears and a Cancel link
            is shown; when text is entered, a clear (✕) button replaces the cursor.
          </SectionDesc>
        </div>

        {/* ── Interactive Demo ─────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Interactive Demo</SectionTitle>
          <SectionDesc>
            Try typing to activate the search bar. The clear button appears once text is entered,
            and the Cancel link dismisses focus and clears the value.
          </SectionDesc>
          <div className={styles.demoWrapper}>
            <WCPSearchBar
              value={liveValue}
              onChange={setLiveValue}
              onClear={() => setLiveValue('')}
              onCancel={() => setLiveValue('')}
              placeholder="Enter search term(s)"
            />
          </div>
          {liveValue && (
            <p className={styles.searchValueDisplay}>
              Current value: <code>{liveValue}</code>
            </p>
          )}
        </div>

        {/* ── States ───────────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>States</SectionTitle>
          <SectionDesc>
            The search bar has four interaction states. Hover is desktop-only (900+px). The
            Activated state shows a focus ring and Cancel link; the entered variant shows the
            typed value and a clear button.
          </SectionDesc>

          <div className={styles.statesGrid}>
            {/* Enabled */}
            <div className={styles.stateCard}>
              <div className={styles.stateLabel}>Enabled</div>
              <div className={styles.stateDemo}>
                <WCPSearchBar
                  value=""
                  onChange={() => {}}
                  placeholder="Enter search term(s)"
                />
              </div>
              <p className={styles.stateDesc}>Default resting state. Subtle border and fill.</p>
            </div>

            {/* Activated — empty (cursor shown) */}
            <div className={styles.stateCard}>
              <div className={styles.stateLabel}>Activated — empty</div>
              <div className={styles.stateDemo}>
                <ActivatedEmptyDemo />
              </div>
              <p className={styles.stateDesc}>
                Focused with no input. Blue border (2px), white fill, blinking cursor.
              </p>
            </div>

            {/* Activated — with value */}
            <div className={styles.stateCard}>
              <div className={styles.stateLabel}>Activated — with value</div>
              <div className={styles.stateDemo}>
                <ActivatedWithValueDemo />
              </div>
              <p className={styles.stateDesc}>
                Focused with input text. Clear (✕) button appears on the right.
              </p>
            </div>

            {/* Disabled */}
            <div className={styles.stateCard}>
              <div className={styles.stateLabel}>Disabled</div>
              <div className={styles.stateDemo}>
                <WCPSearchBar
                  value={disabledValue}
                  onChange={() => {}}
                  placeholder="Enter search term(s)"
                  disabled
                />
              </div>
              <p className={styles.stateDesc}>
                Cannot be interacted with. Muted border and text colors.
              </p>
            </div>
          </div>
        </div>

        {/* ── Breakpoints ───────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Breakpoints</SectionTitle>
          <SectionDesc>
            The component automatically adapts between two breakpoints. At 900+px (desktop) the
            pill height increases to 56px and horizontal padding grows to 16px. At 0–899px (mobile
            and tablet) the height is 48px with 12px padding. The "Hovered" state only applies on
            desktop.
          </SectionDesc>

          <div className={styles.breakpointTable}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Property</th>
                  <th>0–899px (Mobile/Tablet)</th>
                  <th>900+px (Desktop)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Min height (enabled)</td>
                  <td>48px</td>
                  <td>56px</td>
                </tr>
                <tr>
                  <td>Padding (enabled)</td>
                  <td>12px (all sides)</td>
                  <td>8px top/bottom, 16px left/right</td>
                </tr>
                <tr>
                  <td>Padding (activated)</td>
                  <td>4px top/bottom/right, 12px left</td>
                  <td>8px top/bottom/right, 16px left</td>
                </tr>
                <tr>
                  <td>Hover state</td>
                  <td>No (touch devices)</td>
                  <td>Yes — slightly darker border + fill</td>
                </tr>
                <tr>
                  <td>Cancel link</td>
                  <td>Shown when activated</td>
                  <td>Shown when activated</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Component Props ───────────────────────────────────── */}
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
              <tr>
                <td>value</td>
                <td>string</td>
                <td>—</td>
                <td>Required. Controlled input value.</td>
              </tr>
              <tr>
                <td>onChange</td>
                <td>(value: string) =&gt; void</td>
                <td>—</td>
                <td>Required. Called on every keystroke.</td>
              </tr>
              <tr>
                <td>onClear</td>
                <td>() =&gt; void</td>
                <td>—</td>
                <td>Called when the clear (✕) button is pressed. Clears value and keeps focus.</td>
              </tr>
              <tr>
                <td>onCancel</td>
                <td>() =&gt; void</td>
                <td>—</td>
                <td>Called when the Cancel link is pressed. Clears value and removes focus.</td>
              </tr>
              <tr>
                <td>placeholder</td>
                <td>string</td>
                <td>'Enter search term(s)'</td>
                <td>Placeholder text shown when the field is empty.</td>
              </tr>
              <tr>
                <td>disabled</td>
                <td>boolean</td>
                <td>false</td>
                <td>Disables all interaction. Applies muted visual styling.</td>
              </tr>
              <tr>
                <td>className</td>
                <td>string</td>
                <td>—</td>
                <td>Optional extra CSS class on the root wrapper.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Usage ─────────────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Usage</SectionTitle>
          <pre className={styles.codeBlock}>{`import { WCPSearchBar } from '@/components/walmart/WCPSearchBar';

function MyPage() {
  const [query, setQuery] = React.useState('');

  return (
    <WCPSearchBar
      value={query}
      onChange={setQuery}
      onClear={() => setQuery('')}
      onCancel={() => setQuery('')}
      placeholder="Search products"
    />
  );
}`}</pre>
        </div>

        {/* ── Do / Don't ───────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Guidelines</SectionTitle>
          <div className={styles.guidelineGrid}>
            <div className={styles.guidelineCard}>
              <div className={styles.doLabel}>Do</div>
              <p className={styles.guidelineText}>
                Use this component for inline/page-scoped search — filtering a list, table, or
                product catalog on the current page.
              </p>
            </div>
            <div className={styles.guidelineCard}>
              <div className={styles.dontLabel}>Don't</div>
              <p className={styles.guidelineText}>
                Don't use this component in the global header for site-wide search. Use the
                dedicated global search bar component for that use case.
              </p>
            </div>
            <div className={styles.guidelineCard}>
              <div className={styles.doLabel}>Do</div>
              <p className={styles.guidelineText}>
                Always provide both <code>onClear</code> and <code>onCancel</code> callbacks so
                users can exit the search state cleanly on both desktop and mobile.
              </p>
            </div>
            <div className={styles.guidelineCard}>
              <div className={styles.dontLabel}>Don't</div>
              <p className={styles.guidelineText}>
                Don't stack multiple search bars on the same page. Only one inline search per
                content area is recommended.
              </p>
            </div>
          </div>
        </div>

      </div>
    </ComponentPageLayout>
  );
}

// ── Helper demos with pre-triggered focus state ───────────────────────────

function ActivatedEmptyDemo() {
  const [val, setVal] = React.useState('');
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const input = ref.current?.querySelector('input');
    if (input) input.focus();
  }, []);

  return (
    <div ref={ref}>
      <WCPSearchBar
        value={val}
        onChange={setVal}
        onClear={() => setVal('')}
        onCancel={() => setVal('')}
        placeholder="Enter search term(s)"
      />
    </div>
  );
}

function ActivatedWithValueDemo() {
  const [val, setVal] = React.useState('running shoes');
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const input = ref.current?.querySelector('input');
    if (input) input.focus();
  }, []);

  return (
    <div ref={ref}>
      <WCPSearchBar
        value={val}
        onChange={setVal}
        onClear={() => setVal('')}
        onCancel={() => setVal('')}
        placeholder="Enter search term(s)"
      />
    </div>
  );
}
