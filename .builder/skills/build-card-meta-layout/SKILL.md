---
name: build-card-meta-layout
description: Build icon plus stacked label and sublabel chip pattern
---

## What This Skill Does

Shows you how to build the standard card meta layout: an icon paired with a primary label and a secondary detail (location, seller name, sublabel) that stacks underneath — all vertically centered together.

## When to Use It

- Building an order card with a fulfillment chip (Curbside, Delivery, Shipping)
- Displaying a seller chip with a store name below it
- Any UI pattern with a small icon + label + sublabel in a horizontal row

---

## The Pattern

The secondary text (location, sublabel) is **nested inside** the chip's text column — NOT placed as a sibling of the chip. This makes the icon vertically center with the whole text block.

```
✅ CORRECT structure:
[icon] [label text]
       [sublabel text]

❌ WRONG structure:
[icon] [label text]
[sublabel text]       ← floats independently, not under the icon
```

---

## Step-by-Step

### Step 1 — Build the JSX structure

```tsx
<span className={styles.chip}>
  {/* Icon */}
  <img
    src="/illustrations/mono-small/CurbsidePickup.svg"
    alt=""
    aria-hidden="true"
    width="16"
    height="16"
    className={styles.chipIcon}
  />

  {/* Text column — label + sublabel stacked */}
  <span className={styles.chipText}>
    <span className={styles.chipLabel}>Curbside pickup</span>
    <span className={styles.chipSublabel}>Carrollton Supercenter #4232</span>
  </span>
</span>
```

The key is that `.chipSublabel` is **inside** `.chipText` — both are children of the same column container.

### Step 2 — Write the CSS

```css
/* The chip row — icon + text column side by side */
.chip {
  display: flex;
  align-items: center;    /* Vertically centers icon with the text block */
  gap: var(--ld-semantic-spacing-100, 0.5rem);
}

/* Icon */
.chipIcon {
  flex-shrink: 0;
  width: var(--ld-semantic-scale-icon-small, 1rem);
  height: var(--ld-semantic-scale-icon-small, 1rem);
}

/* Text column — stacks label and sublabel */
.chipText {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

/* Primary label */
.chipLabel {
  font-family: var(--ld-semantic-font-family-sans);
  font-size: var(--ld-semantic-font-body-small-size, 0.875rem);
  font-weight: var(--ld-semantic-font-body-small-weight-alt, 700);
  color: var(--ld-semantic-color-text);
  line-height: 1.2;
}

/* Secondary sublabel — location, seller name, etc. */
.chipSublabel {
  font-family: var(--ld-semantic-font-family-sans);
  font-size: var(--ld-semantic-font-body-small-size, 0.875rem);
  font-weight: var(--ld-semantic-font-body-small-weight-default, 400);
  color: var(--ld-semantic-color-text-subtle);
  line-height: 1.2;
}
```

---

## Complete Example — Order Card Fulfillment Chip

```tsx
import React from 'react';
import styles from './OrderCard.module.css';

interface OrderCardProps {
  fulfillmentType: 'curbside' | 'delivery' | 'shipping';
  storeName?: string;
  deliveryAddress?: string;
  trackingCarrier?: string;
}

const FULFILLMENT_META = {
  curbside: {
    icon: '/illustrations/mono-small/CurbsidePickup.svg',
    label: 'Curbside pickup',
  },
  delivery: {
    icon: '/illustrations/mono-small/Delivery.svg',
    label: 'Delivery',
  },
  shipping: {
    icon: '/illustrations/mono-small/Shipping.svg',
    label: 'Shipping',
  },
};

export function OrderCard({ fulfillmentType, storeName, deliveryAddress }: OrderCardProps) {
  const meta = FULFILLMENT_META[fulfillmentType];
  const sublabel = fulfillmentType === 'curbside' ? storeName : deliveryAddress;

  return (
    <div className={styles.card}>
      <span className={styles.chip}>
        <img
          src={meta.icon}
          alt=""
          aria-hidden="true"
          width="16"
          height="16"
          className={styles.chipIcon}
        />
        <span className={styles.chipText}>
          <span className={styles.chipLabel}>{meta.label}</span>
          {sublabel && (
            <span className={styles.chipSublabel}>{sublabel}</span>
          )}
        </span>
      </span>
    </div>
  );
}
```

---

## Multiple Chips in a Row

When displaying multiple chips (e.g., fulfillment type + estimated time):

```tsx
<div className={styles.chipRow}>
  <span className={styles.chip}>
    <img src="/illustrations/mono-small/CurbsidePickup.svg" alt="" aria-hidden="true" className={styles.chipIcon} width="16" height="16" />
    <span className={styles.chipText}>
      <span className={styles.chipLabel}>Curbside pickup</span>
      <span className={styles.chipSublabel}>Carrollton Supercenter</span>
    </span>
  </span>

  <span className={styles.chip}>
    <img src="/illustrations/mono-small/Clock.svg" alt="" aria-hidden="true" className={styles.chipIcon} width="16" height="16" />
    <span className={styles.chipText}>
      <span className={styles.chipLabel}>Ready in 2 hrs</span>
    </span>
  </span>
</div>
```

```css
.chipRow {
  display: flex;
  align-items: flex-start;
  gap: var(--ld-semantic-spacing-300, 1.5rem);
  flex-wrap: wrap;
}
```

---

## Using Icons vs Illustrations for Chips

| Content | Source |
|---|---|
| Category pictograms (Curbside, Delivery) | `public/illustrations/mono-small/` (16×16) |
| Status icons (Clock, Check, Warning) | `client/components/icons/` (use `<Clock size={16} />`) |
| Brand logos | `public/images/` |

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Sublabel as sibling of chip: `<span>label</span><span>sublabel</span>` | Nest sublabel inside `chipText`: `<span className={styles.chipText}><span>label</span><span>sublabel</span></span>` |
| `align-items: flex-start` on chip | Use `align-items: center` — icon should center with the text block |
| Hardcoded `font-size: 12px` for sublabel | Use `var(--ld-semantic-font-body-small-size, 0.875rem)` |
| `color: #74767C` for sublabel | Use `var(--ld-semantic-color-text-subtle, #74767C)` |
| Missing `aria-hidden="true"` on icon | Decorative icons must have `aria-hidden="true"` |
| Using `<div>` for chip (inline content) | Use `<span>` — chips are inline elements inside card text flow |
