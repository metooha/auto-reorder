---
title: Accessibility Hardening for WCP Components
scope: skill
based-on: RULE_WCPComponentCreation.mdc, RULE_DesignSystemEnforcement.mdc
last_updated: 2026-03-02
---

## What This Skill Does

Applies WCAG-compliant accessibility patterns to WCP purchase history cards and other commerce components — covering decorative icons, price rows, data visualizations, interactive ratings, and status indicators.

## When to Use It

- Reviewing an existing component for accessibility gaps
- Building a new card or banner that includes icons, prices, or data visualizations
- Adding hover tooltips to numeric indicators
- Marking up interactive rating widgets

---

## Step 1 — Decorative icons: `aria-hidden="true"`

Any icon whose meaning is conveyed by surrounding text is **decorative** and must be hidden from assistive technology.

```tsx
// WRONG — icon is announced redundantly alongside label text
<Warning width={12} height={12} />

// CORRECT
<Warning width={12} height={12} aria-hidden="true" />
```

**Always hidden:**
- Icons inside `<Tag>` leading slot (label text provides meaning)
- Icons inside `<Button>` (button label provides meaning)
- Decorative illustrations in card headers (`alt=""` + `aria-hidden="true"` on `<img>`)
- Countdown dots, decorative circles, background shapes

```tsx
<img src={illustration} alt="" aria-hidden="true" className={styles.illustration} />
```

---

## Step 2 — Price rows: group + individual labels

A price row showing member price / regular price / savings needs a wrapping group with a label, plus individual labels on each value so screen readers can distinguish them.

```tsx
<div className={styles.priceRow} role="group" aria-label="Pricing">
  <span
    className={styles.priceNew}
    aria-label={`Member price: ${memberPrice}`}
  >
    {memberPrice}
  </span>
  <span
    className={styles.priceOld}
    aria-label={`Regular price: ${regularPrice}`}
  >
    {regularPrice}
  </span>
  <span
    className={styles.priceSaving}
    aria-label={`You save ${savings}`}
  >
    Save {savings}
  </span>
</div>
```

Without these labels, a screen reader would announce `"$11.90 $14.88 Save $2.98"` with no context.

---

## Step 3 — Data visualizations: SVG aria-label + hover tooltip

### SVG arc / ring indicators

Add `aria-label` directly on the `<svg>` describing the full value and scale:

```tsx
<svg
  viewBox="0 0 52 52"
  aria-label={`Health score: ${score} out of 100`}
  role="img"
>
  ...
</svg>
```

### Hover tooltip for numeric indicators

Any score ring, progress arc, or metric chip rendered on a visual surface must have a hover tooltip (so sighted users also understand what the number means):

```tsx
<div className={styles.scoreWrapper}>
  <div className={styles.scoreDisplay}>
    <ScoreRing score={score} />
    <span className={styles.scoreLabel}>Health</span>
  </div>
  <div className={styles.scoreTooltip} role="tooltip">
    <strong>Health Score: {score}/100</strong>
    <span>
      {score >= 70
        ? 'Good condition'
        : score >= 40
        ? 'Needs attention'
        : 'Service overdue'}
    </span>
  </div>
</div>
```

```css
.scoreWrapper {
  position: relative;
  cursor: help;
  flex-shrink: 0;
}

.scoreWrapper:hover .scoreTooltip,
.scoreWrapper:focus-within .scoreTooltip {
  opacity: 1;
  transform: translateY(0);
}

.scoreTooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  right: 0;
  background: rgba(0, 0, 0, 0.85);
  color: #fff;
  font-family: var(--ld-semantic-font-caption-family);
  font-size: var(--ld-semantic-font-caption-size, 0.75rem);
  line-height: var(--ld-semantic-font-caption-line-height, 1rem);
  padding: 8px 12px;
  border-radius: 8px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.15s ease, transform 0.15s ease;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .scoreTooltip {
    transition: opacity 0.15s ease;
    transform: none;
  }
}
```

---

## Step 4 — Interactive rating widget

A 5-star rating widget needs keyboard and screen reader support. Use `radiogroup` + individual `radio` buttons overlaid on the visual stars:

```tsx
function ProductRating({ name }: { name: string }) {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);

  // After rating — show confirmation stacked vertically below stars
  if (selected > 0) {
    return (
      <div className={styles.ratingRow}>
        <Rating
          value={selected}
          size="large"
          aria-label={`Your rating: ${selected} out of 5 stars`}
        />
        <span className={styles.ratingThanks}>Thanks!</span>
      </div>
    );
  }

  return (
    <div className={styles.starsWrapper} onMouseLeave={() => setHovered(0)}>
      {/* Visual stars — hidden from AT, overlay handles interaction */}
      <Rating value={hovered || 0} size="large" aria-hidden />

      {/* Invisible radio buttons overlaid on stars */}
      <div
        className={styles.starOverlays}
        role="radiogroup"
        aria-label={`Rate ${name}`}
      >
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={selected === n}
            aria-label={`${n} star${n > 1 ? 's' : ''}`}
            className={styles.starOverlayBtn}
            onMouseEnter={() => setHovered(n)}
            onClick={() => setSelected(n)}
          />
        ))}
      </div>
    </div>
  );
}
```

**Confirmation state stacks vertically** — "Thanks!" appears below the stars, not beside them:

```css
.ratingRow {
  display: flex;
  flex-direction: column;   /* stack vertically */
  align-items: flex-start;
  gap: 4px;
  margin-top: 4px;
}

.ratingThanks {
  font-family: var(--ld-semantic-font-caption-family);
  font-size: var(--ld-semantic-font-caption-size, 0.75rem);
  font-weight: var(--ld-semantic-font-caption-weight-alt, 700);
  line-height: var(--ld-semantic-font-caption-line-height, 1rem);
  color: var(--ld-semantic-color-text-positive);
}
```

---

## Step 5 — Focus ring on custom interactive elements

Any custom `<button>` used as a star overlay, dot, or icon must have a visible focus ring:

```css
.starOverlayBtn:focus-visible {
  outline: 2px solid var(--ld-semantic-color-action-focus-outline);
  outline-offset: 2px;
}
```

Never remove `:focus-visible` outlines without replacement.

---

## Step 6 — Status tags: complete accessible pattern

Status tags using the LD `<Tag>` component with an icon are automatically accessible **if** the icon has `aria-hidden="true"`:

```tsx
// The Tag renders as an inline element with visible text
// Screen reader announces: "Overdue" (the label) — not the icon
<Tag
  variant="primary"
  color="negative"
  leading={<Warning width={12} height={12} aria-hidden="true" />}
>
  Overdue
</Tag>
```

---

## Accessibility Audit Checklist

Run this check on any new WCP component before shipping:

| Check | How |
|---|---|
| Decorative icons hidden | Every icon used alongside text has `aria-hidden="true"` |
| Decorative images hidden | `<img>` used for illustration has `alt=""` + `aria-hidden="true"` |
| Price rows labelled | `role="group"` + `aria-label="Pricing"` on wrapper; individual `aria-label` on each price span |
| Data viz described | `<svg>` rings/arcs have `aria-label` describing value and scale |
| Data viz explained | Hover tooltip with `role="tooltip"` for every numeric indicator |
| Interactive rating | `role="radiogroup"` wrapper; each star is `role="radio"` with `aria-checked` and `aria-label` |
| Focus rings | All custom buttons have `:focus-visible` outline using `--ld-semantic-color-action-focus-outline` |
| Confirmation state | "Thanks!" or other confirmation text stacks below (not beside) the element it confirms |

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Icon inside Tag with no `aria-hidden` | Add `aria-hidden="true"` to icon — the Tag label is sufficient |
| Price row without group role | Add `role="group" aria-label="Pricing"` to wrapper |
| Score ring with no tooltip | Add `role="tooltip"` div with CSS hover transition |
| "Thanks!" inline with stars | Change `ratingRow` to `flex-direction: column` |
| `cursor: help` missing on tooltip wrapper | Add it — tells sighted users the element has additional info |
| Tooltip not shown on keyboard focus | Add `:focus-within .tooltip { opacity: 1 }` alongside `:hover` |
| `transition` without `prefers-reduced-motion` override | Always add `@media (prefers-reduced-motion: reduce)` block |
