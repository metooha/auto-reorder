---
name: manage-pattern-library
description: Manage and organize the pattern library
---

## What This Skill Does

Explains how to maintain a component pattern library page — adding new patterns, removing ones that have been promoted to real pages, writing good prompts, and keeping the summary table in sync.

## When to Use It

- Adding a new card pattern to the component library
- Promoting a pattern from the library to a real page (and cleaning it up)
- Writing a prompt for a new card variant
- Auditing which patterns are already live vs. still in the library

---

## Pattern Library Structure

Each pattern library page (e.g., `/component-library/order-card-patterns`) has three layers:

```
1. Summary table     — scannable list of all patterns + their prompts
2. Live previews     — one PatternSection per pattern (label + preview + copy button)
3. PATTERNS array    — source of truth; drives both the table and the previews
```

All three are derived from the same `PATTERNS` array — update it once and both the table and previews update automatically.

---

## Step 1 — Define the PATTERNS array entry

Each entry needs exactly three things: a stable `id`, a short human-readable `title`, a one-sentence `prompt`, and a `preview` node.

```tsx
interface PatternEntry {
  id: string;         // kebab-case, stable — used as React key
  title: string;      // Short display name shown in table + card label
  prompt: string;     // One sentence — what a designer would type into Fusion
  preview: React.ReactNode; // Live rendered component(s)
}

const PATTERNS: PatternEntry[] = [
  {
    id: 'delayed-delivery',
    title: 'Late delivery warning',
    prompt: 'Show a delayed delivery warning card with options to reschedule, switch to pickup, or cancel.',
    preview: (
      <DelayedDeliveryCard
        statusHeading="Delayed, estimated up to 2 hours"
        delayEstimate="Estimated up to 2 hours late"
        products={[P.strawberries, P.blueberries, P.bananas]}
        orderTotal="$32.47"
      />
    ),
  },
];
```

**Prompt writing rules:**
- One sentence, imperative mood ("Show a…", "Insert a…", "Display a…")
- Include the key visual differentiator (what makes this pattern unique)
- Include the primary actions if relevant
- Keep under 20 words where possible

---

## Step 2 — Add the summary table component

The summary table lives at the top of the page, above all previews. It renders automatically from `PATTERNS` — no manual updates needed.

```tsx
function PromptsTable() {
  const border = '1px solid var(--ld-semantic-color-separator, #E3E4E5)';
  const cellStyle: React.CSSProperties = {
    padding: '12px 16px',
    verticalAlign: 'top',
    borderBottom: border,
    fontFamily: 'var(--ld-semantic-font-family-sans)',
    fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)',
    lineHeight: 'var(--ld-semantic-font-body-small-line-height, 1.25rem)',
    color: 'var(--ld-semantic-color-text, #2E2F32)',
  };

  return (
    <div style={{ borderRadius: '8px', border, overflow: 'hidden', marginBottom: '8px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: 'var(--ld-semantic-color-background-subtle, #F2F3F3)' }}>
            <th style={{ ...cellStyle, width: '220px', fontWeight: 700, color: 'var(--ld-semantic-color-text-subtle)', fontSize: 'var(--ld-semantic-font-caption-size, 0.75rem)' }}>
              Pattern
            </th>
            <th style={{ ...cellStyle, fontWeight: 700, color: 'var(--ld-semantic-color-text-subtle)', fontSize: 'var(--ld-semantic-font-caption-size, 0.75rem)' }}>
              Prompt
            </th>
          </tr>
        </thead>
        <tbody>
          {PATTERNS.map((p, i) => (
            <tr key={p.id} style={{ background: i % 2 === 0 ? 'var(--ld-semantic-color-surface)' : 'var(--ld-semantic-color-background-subtle)' }}>
              <td style={{ ...cellStyle, fontWeight: 600, borderRight: border, whiteSpace: 'nowrap' }}>
                {p.title}
              </td>
              <td style={{ ...cellStyle }}>
                {p.prompt}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

## Step 3 — Add the copyable prompt button

Each pattern card has a button at the bottom that copies the prompt to clipboard. Reuse this component across all pattern pages:

```tsx
function CopyPromptButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      onClick={handleCopy}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        width: '100%',
        padding: '12px 20px',
        background: copied
          ? 'var(--ld-semantic-color-fill-positive-subtle)'
          : 'var(--ld-semantic-color-background-subtle)',
        border: 'none',
        borderTop: '1px solid var(--ld-semantic-color-separator)',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'background 0.15s ease',
        fontFamily: 'var(--ld-semantic-font-family-sans)',
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{
          display: 'block',
          fontSize: 'var(--ld-semantic-font-caption-size, 0.75rem)',
          fontWeight: 700,
          color: copied
            ? 'var(--ld-semantic-color-text-positive)'
            : 'var(--ld-semantic-color-text-subtlest)',
          marginBottom: '4px',
        }}>
          {copied ? 'Copied!' : 'Prompt'}
        </span>
        <span style={{
          display: 'block',
          fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)',
          fontStyle: 'italic',
          color: 'var(--ld-semantic-color-text)',
          lineHeight: '1.5',
        }}>
          "{text}"
        </span>
      </div>
    </button>
  );
}
```

---

## Step 4 — Promote a pattern to a real page

When a pattern is ready to go live on a real page (e.g., Purchase History):

### 4a — Add it to the real page

In the target page (e.g., `PurchaseHistory.tsx`), insert the component inside a `newCard` wrapper so designers can see the insertion animation:

```tsx
{/* Description of what this card is for */}
<div className={styles.newCard}>
  <MyNewCard {...myCardProps} />
</div>
```

### 4b — Remove it from the pattern library

Delete the entire entry from the `PATTERNS` array in the pattern library page. Remove any data constants that were only used by that pattern. Remove now-unused imports.

```tsx
// BEFORE
const PATTERNS = [
  { id: 'delayed-delivery', ... },  // ← promoted to real page
  { id: 'auto-care', ... },
];

// AFTER
const PATTERNS = [
  { id: 'auto-care', ... },  // only un-promoted patterns remain
];
```

**Rule: the pattern library should only contain patterns not yet live on any real page.** It is a staging area, not a permanent archive.

### 4c — Clean up unused data

Remove any constants, data objects, or product image references that were only used by the removed pattern:

```tsx
// Remove these if no longer used by any remaining pattern
const GEICO_LOGO = ...;  // ← only used by inline-ad pattern
const GEICO_AD   = ...;  // ← same
```

---

## Step 5 — The `newCard` insertion animation

When inserting a pattern-driven card into a real page for the first time, wrap it in `styles.newCard`. This triggers the green glow animation so designers can instantly see what was added.

```tsx
// In PurchaseHistory.module.css (or equivalent)
.newCard {
  animation: insertGlow 2s ease-out forwards;
}

@keyframes insertGlow {
  0%   { box-shadow: 0 0 0 3px var(--ld-semantic-color-fill-positive-subtle); }
  100% { box-shadow: none; }
}
```

After review, the wrapper can be removed — it has no functional effect.

---

## Step 6 — Page layout boilerplate

```tsx
export default function MyPatternPage() {
  return (
    <ComponentPageLayout
      section="WCP Patterns"
      title="Order Cards"
      description="Ready-to-use card templates. Each pattern is a live component — click the prompt to copy it, then paste it into Fusion."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', fontFamily: 'var(--ld-semantic-font-family-sans)' }}>
        {/* Summary table at the top */}
        <PromptsTable />

        {/* Live previews below */}
        {PATTERNS.map(pattern => (
          <PatternSection key={pattern.id} pattern={pattern} />
        ))}
      </div>
    </ComponentPageLayout>
  );
}
```

---

## Lifecycle of a Pattern

```
1. Design spec / prompt written
       ↓
2. Component built + added to PATTERNS array in library page
       ↓
3. Preview reviewed and approved
       ↓
4. Promoted to real page (wrapped in newCard)
       ↓
5. Removed from PATTERNS array — library stays lean
```

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Leaving promoted patterns in the library | Remove from `PATTERNS` once live on a real page |
| Prompt is too long or vague | One sentence, imperative mood, under 20 words |
| Summary table manually maintained | Table must render from `PATTERNS` array — never maintain separately |
| Unused product images left in file | Delete constants only used by removed patterns |
| No `newCard` wrapper on insertion | Wrap in `styles.newCard` so designers see what was added |
| Pattern library used as permanent archive | It is a staging area only — promote → remove |
