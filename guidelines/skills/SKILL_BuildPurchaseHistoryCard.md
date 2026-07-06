---
title: Build a Purchase History Card
scope: skill
based-on: RULE_PurchaseHistoryCardPatterns.mdc, RULE_WCPComponentCreation.mdc, RULE_TagComponents.mdc, RULE_DesignSystemEnforcement.mdc
last_updated: 2026-03-02
---

## What This Skill Does

Walks through the full process of building a WCP purchase history card — from status tags and alert banners to illustrated headers, health score rings, and hover tooltips — using only LD 3.5 components and semantic tokens.

## When to Use It

- Creating a new order card variant (delivery, curbside, auto care, combined)
- Building an engagement card (maintenance health, upsell offer, delayed delivery)
- Adding status indicators, alert banners, or illustrated headers to any card

---

## Step 1 — Card shell

Every purchase history card is an `<article>` with a CSS module. Location: `client/components/walmart/purchase-history/`.

```tsx
// MyCard.tsx
import styles from './MyCard.module.css';

export function MyCard({ ... }: MyCardProps) {
  return (
    <article className={styles.card}>
      {/* header, body, footer */}
    </article>
  );
}
```

```css
/* MyCard.module.css */
.card {
  border-radius: var(--ld-primitive-scale-borderradius-150, 10px);
  border: 1px solid var(--ld-semantic-color-separator, #e3e4e5);
  overflow: hidden;
  font-family: var(--ld-semantic-font-family-sans);
  background: var(--ld-semantic-color-surface);
}
```

---

## Step 2 — Illustrated header

When a card has a brand header with an illustration behind the text:

```tsx
<div className={`${styles.header} ${illustration ? styles.headerWithIllustration : ''}`}>
  {illustration && (
    <img src={illustration} alt="" aria-hidden="true" className={styles.headerIllustration} />
  )}
  <div className={styles.headerContent}>
    {/* text + score ring */}
  </div>
</div>
```

```css
.header {
  background: var(--ld-semantic-color-fill-brand-bold, #001E5A);
  position: relative;
  overflow: hidden;
  min-height: 100px;
  padding: 16px 20px;
}

/* Illustration fades from right edge */
.headerIllustration {
  position: absolute;
  top: 0; right: 0;
  width: 60%; height: 100%;
  object-fit: cover;
  mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,1) 70%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,1) 70%);
  pointer-events: none;
}

/* Content floats above illustration */
.headerContent {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 14px;
}
```

**Rules:**
- Never use `linear-gradient` as the surface background — only as a mask on images
- All header text uses `--ld-semantic-color-action-text-on-fill-primary` (white)
- No `text-transform: uppercase` on eyebrows

---

## Step 3 — Status tags with outlined icons

Use the LD `<Tag>` component for all status indicators. Never use raw `<span>` with custom styles.

```tsx
import { Tag } from '@/components/ui/Tag';
import { Warning } from '@/components/icons/Warning';
import { Clock } from '@/components/icons/Clock';
import { CheckCircle } from '@/components/icons/CheckCircle';

const STATUS_CONFIG = {
  overdue: { color: 'negative' as const, icon: <Warning     width={12} height={12} aria-hidden="true" />, label: 'Overdue' },
  due:     { color: 'warning'  as const, icon: <Clock       width={12} height={12} aria-hidden="true" />, label: 'Due soon' },
  good:    { color: 'positive' as const, icon: <CheckCircle width={12} height={12} aria-hidden="true" />, label: 'Good' },
};

// Usage
<Tag
  variant="primary"
  color={STATUS_CONFIG[status].color}
  leading={STATUS_CONFIG[status].icon}
>
  {STATUS_CONFIG[status].label}
</Tag>
```

**Rules:**
- Always use **outlined** icons (never `WarningFill`, `CheckCircleFill`)
- Always set `width={12} height={12}` for icons inside Tags
- Always add `aria-hidden="true"` — the Tag label text provides the context
- Parent flex container must have `align-items: flex-start` to prevent Tag from stretching full width

```css
.itemContainer {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* REQUIRED — prevents Tag from stretching */
  gap: 6px;
}
```

---

## Step 4 — Alert banners (info / success / warning / error)

Replace any custom callout div with the LD `<Alert>` component.

```tsx
import { Alert } from '@/components/ui/Alert';

{/* Info statement */}
{valueStatement && (
  <div className={styles.alertWrapper}>
    <Alert variant="info">{valueStatement}</Alert>
  </div>
)}

{/* Bundle savings (positive) */}
{bundleSavings && (
  <div className={styles.alertWrapper}>
    <Alert variant="success">
      {bundleSavings}{amount && <> — <strong>Save {amount}</strong></>}
    </Alert>
  </div>
)}

{/* Delay warning */}
<Alert variant="warning">
  <strong>{delayEstimate}</strong> — We're working to get your order to you as quickly as possible.
</Alert>
```

```css
.alertWrapper {
  margin: 0 var(--ld-primitive-scale-space-500, 20px) var(--ld-primitive-scale-space-300, 12px);
}
```

Alert variants: `info` | `success` | `warning` | `error`

---

## Step 5 — Radial health score ring

For a circular progress indicator overlaid on a brand header:

```tsx
function ScoreRing({ score }: { score: number }) {
  const r = 20;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color =
    score >= 70 ? 'var(--ld-semantic-color-text-positive)'
    : score >= 40 ? 'var(--ld-semantic-color-rating-fill, #FACC15)'
    : 'var(--ld-semantic-color-text-negative)';

  return (
    <svg viewBox="0 0 52 52" aria-label={`Health score: ${score} out of 100`}>
      {/* Track */}
      <circle cx="26" cy="26" r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="5" />
      {/* Progress arc */}
      <circle
        cx="26" cy="26" r={r}
        fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 26 26)"
      />
      {/* Score number */}
      <text x="26" y="26" textAnchor="middle" dominantBaseline="central"
        fill="#ffffff" fontSize="12" fontWeight="700"
        fontFamily="var(--ld-semantic-font-family-sans)">
        {score}
      </text>
    </svg>
  );
}
```

**The score ring must not blend into the illustration.** Wrap it in a frosted glass container:

```css
.healthScore {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 20, 0.45);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: var(--ld-primitive-scale-borderradius-100, 8px);
  padding: 6px 8px;
  border: 1px solid rgba(255, 255, 255, 0.15);
}
```

**Add a hover tooltip** explaining what the score means:

```tsx
<div className={styles.healthScoreWrapper}>
  <div className={styles.healthScore}>
    <ScoreRing score={score} />
    <span className={styles.scoreLabel}>Health</span>
  </div>
  <div className={styles.scoreTooltip} role="tooltip">
    <strong>Health Score: {score}/100</strong>
    <span>
      {score >= 70 ? 'Good condition' : score >= 40 ? 'Needs attention' : 'Service overdue'}
    </span>
  </div>
</div>
```

```css
.healthScoreWrapper { position: relative; flex-shrink: 0; cursor: help; }
.healthScoreWrapper:hover .scoreTooltip { opacity: 1; transform: translateY(0); }

.scoreTooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  right: 0;
  background: rgba(0, 0, 0, 0.85);
  color: #fff;
  font-family: var(--ld-semantic-font-caption-family);
  font-size: var(--ld-semantic-font-caption-size, 0.75rem);
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
  .scoreTooltip { transition: opacity 0.15s ease; transform: none; }
}
```

---

## Step 6 — Pricing row with savings

Member price uses `text-positive` (green). Savings badge uses positive fill.

```tsx
<div className={styles.priceRow} role="group" aria-label="Pricing">
  <span className={styles.priceNew} aria-label={`Member price: ${memberPrice}`}>{memberPrice}</span>
  <span className={styles.priceOld} aria-label={`Regular price: ${regularPrice}`}>{regularPrice}</span>
  <span className={styles.priceSaving} aria-label={`You save ${savings}`}>Save {savings}</span>
</div>
```

```css
.priceRow { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 10px; }

.priceNew {
  font-size: 24px;
  font-weight: 900;
  color: var(--ld-semantic-color-text-positive); /* always green for savings */
  flex-shrink: 0;
}

.priceOld {
  font-size: var(--ld-semantic-font-body-small-size, 0.875rem);
  color: var(--ld-semantic-color-text-subtle);
  text-decoration: line-through;
  flex-shrink: 0;
}

.priceSaving {
  font-family: var(--ld-semantic-font-caption-family);
  font-size: var(--ld-semantic-font-caption-size, 0.75rem);
  font-weight: var(--ld-semantic-font-caption-weight-alt, 700);
  color: var(--ld-semantic-color-text-positive);
  background: var(--ld-semantic-color-fill-positive-subtle);
  padding: 2px 8px;
  border-radius: 4px;
  white-space: nowrap;
  flex-shrink: 0;
}
```

---

## Step 7 — Card footer

```tsx
<div className={styles.footer}>
  <span className={styles.footerLabel}>
    {hasIssues ? 'Action recommended' : 'All services on track'}
  </span>
  <ButtonGroup>
    <Button variant="secondary" size="small">View full report</Button>
    <Button variant="primary" size="small">Schedule services</Button>
  </ButtonGroup>
</div>
```

```css
.footer {
  border-top: 1px solid var(--ld-semantic-color-separator, #e3e4e5);
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--ld-semantic-color-background-subtle, #F6F6F7);
  gap: 10px;
}

.footerLabel {
  font-family: var(--ld-semantic-font-caption-family);
  font-size: var(--ld-semantic-font-caption-size, 0.75rem);
  font-weight: var(--ld-semantic-font-caption-weight-default, 400);
  line-height: var(--ld-semantic-font-caption-line-height, 1rem);
  color: var(--ld-semantic-color-text-subtle);
}
```

---

## Complete Typography Quick Reference

| Element | Token set |
|---|---|
| Card heading | `heading-small-family`, `heading-small-size-b-s`, `heading-small-weight-default`, `heading-small-line-height-b-s` |
| Section title / eyebrow | `caption-family`, `caption-size`, `caption-weight-alt`, `caption-line-height` |
| Body label / detail | `caption-family`, `caption-size`, `caption-weight-default`, `caption-line-height` |
| Item name / price | `body-small-family`, `body-small-size`, `body-small-weight-alt`, `body-small-line-height` |

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Using `CheckCircleFill` / `WarningFill` | Switch to outlined: `CheckCircle`, `Warning` |
| Missing `aria-hidden="true"` on icon inside Tag | Always add it — Tag text provides the label |
| Tag stretching full card width | Add `align-items: flex-start` to the parent flex container |
| Custom callout `<div>` for banners | Use `<Alert variant="warning\|info\|success\|error">` |
| `linear-gradient` as card header background | Use `var(--ld-semantic-color-fill-brand-bold)` flat color; gradients only on image masks |
| `text-transform: uppercase` on eyebrows | Remove it — LD never uses all-caps for labels |
| Score ring blending into illustration | Wrap in `.healthScore` with `backdrop-filter: blur(6px)` + dark background |
| Member price in brand blue | Use `var(--ld-semantic-color-text-positive)` — savings are always green |
| Missing hover tooltip on data viz | Add `role="tooltip"` div with CSS opacity transition |
| `--ld-semantic-font-heading-small-size` | Use `--ld-semantic-font-heading-small-size-b-s` (suffix required) |
