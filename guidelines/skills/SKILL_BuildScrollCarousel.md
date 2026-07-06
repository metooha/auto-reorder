---
title: Build a Horizontal Scroll Carousel
scope: skill
based-on: RULE_CarouselAndScrollPatterns.mdc
last_updated: 2025-02-28
---

## What This Skill Does

Provides a copy-paste implementation for a horizontally scrollable product tile row using CSS scroll-snap — no JavaScript required for the scroll behavior.

## When to Use It

- Displaying a horizontal row of same-sized tiles (products, cards, categories)
- The list should scroll left/right on mobile and show multiple items on desktop
- You don't need auto-advance or prev/next buttons

For auto-advancing hero carousels (with JS controls), see the `JumpRightBackIn` component as a reference instead.

---

## Step-by-Step

### Step 1 — Define the data

Place the data array above the component function in the same file.

```tsx
interface ProductTile {
  id: string;
  image: string;
  name: string;
  price: string;
  rating?: number;
}

const PRODUCTS: ProductTile[] = [
  {
    id: '1',
    image: '/illustrations/spot-illustration/product-a.webp',
    name: 'Product Name',
    price: '$12.98',
    rating: 4.5,
  },
  // ... more items
];
```

### Step 2 — Build the component

```tsx
import React from 'react';
import styles from './YourCarousel.module.css';

export function YourCarousel() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Section Title</h2>

      {/* Scrollable track */}
      <div className={styles.track} role="list">
        {PRODUCTS.map((product) => (
          <div key={product.id} className={styles.tile} role="listitem">
            <img
              src={product.image}
              alt={product.name}
              className={styles.image}
              loading="lazy"
            />
            <p className={styles.name}>{product.name}</p>
            <p className={styles.price}>{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

### Step 3 — Write the CSS module

This is the core of the scroll-snap pattern. Copy this exactly.

```css
/* YourCarousel.module.css */

.section {
  padding: var(--ld-semantic-spacing-300, 1.5rem) 0;
}

.heading {
  font-family: var(--ld-semantic-font-family-sans);
  font-size: var(--ld-semantic-font-heading-small-size, 1.25rem);
  font-weight: var(--ld-semantic-font-body-small-weight-alt, 700);
  color: var(--ld-semantic-color-text);
  margin: 0 0 var(--ld-semantic-spacing-200, 1rem);
  padding: 0 var(--ld-semantic-spacing-300, 1.5rem);
}

/* ── Scrollable track ─────────────────────────────────────────────────────── */

.track {
  display: flex;
  gap: var(--ld-semantic-spacing-200, 1rem);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  /* Padding allows first/last cards to align with page content */
  padding: var(--ld-semantic-spacing-100, 0.5rem) var(--ld-semantic-spacing-300, 1.5rem);
  margin: 0;

  /* Hide scrollbar — scroll still works */
  scrollbar-width: none;
}

.track::-webkit-scrollbar {
  display: none;
}

/* ── Tile ─────────────────────────────────────────────────────────────────── */

.tile {
  flex: 0 0 148px;               /* Mobile: 148px wide, doesn't shrink */
  scroll-snap-align: start;
  background: var(--ld-semantic-color-surface);
  border-radius: var(--ld-primitive-scale-borderradius-100, 0.5rem);
  overflow: hidden;
  cursor: pointer;
}

.image {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  display: block;
}

.name {
  font-family: var(--ld-semantic-font-family-sans);
  font-size: var(--ld-semantic-font-body-small-size, 0.875rem);
  color: var(--ld-semantic-color-text);
  margin: var(--ld-semantic-spacing-100, 0.5rem) var(--ld-semantic-spacing-100, 0.5rem) 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.price {
  font-family: var(--ld-semantic-font-family-sans);
  font-size: var(--ld-semantic-font-body-small-size, 0.875rem);
  font-weight: var(--ld-semantic-font-body-small-weight-alt, 700);
  color: var(--ld-semantic-color-text);
  margin: var(--ld-semantic-spacing-50, 0.25rem) var(--ld-semantic-spacing-100, 0.5rem) var(--ld-semantic-spacing-100, 0.5rem);
}

/* ── Responsive tile sizing ───────────────────────────────────────────────── */

@media (min-width: 768px) {
  .tile { flex: 0 0 180px; }
}

@media (min-width: 1024px) {
  .tile { flex: 0 0 200px; }
}
```

---

## Key CSS Rules — What Each Does

| Property | Value | Why |
|---|---|---|
| `overflow-x: auto` | on `.track` | Enables horizontal scroll |
| `scroll-snap-type: x mandatory` | on `.track` | Makes scroll snap to tile boundaries |
| `scroll-snap-align: start` | on `.tile` | Each tile snaps to the left edge |
| `flex: 0 0 148px` | on `.tile` | Fixed width — doesn't shrink or grow |
| `scrollbar-width: none` | on `.track` | Hides scrollbar in Firefox |
| `::-webkit-scrollbar { display: none }` | on `.track` | Hides scrollbar in Chrome/Safari |
| `-webkit-overflow-scrolling: touch` | on `.track` | Smooth momentum scrolling on iOS |

---

## Adding an "Add to Cart" Button

```tsx
// In the tile JSX:
<div key={product.id} className={styles.tile} role="listitem">
  <img src={product.image} alt={product.name} className={styles.image} loading="lazy" />
  <p className={styles.name}>{product.name}</p>
  <p className={styles.price}>{product.price}</p>
  <div className={styles.tileFooter}>
    <Button variant="primary" size="small" onClick={() => handleAddToCart(product.id)}>
      Add
    </Button>
  </div>
</div>
```

```css
.tileFooter {
  padding: var(--ld-semantic-spacing-100, 0.5rem);
  display: flex;
  justify-content: flex-end;
}
```

---

## Accessibility Checklist

- [ ] Track has `role="list"` and each tile has `role="listitem"`
- [ ] Images have descriptive `alt` text
- [ ] Tiles are keyboard-navigable (native scroll works with arrow keys on focusable children)
- [ ] Touch targets inside tiles are at least 44×44px

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| `flex: 1 1 148px` — tiles grow to fill space | Use `flex: 0 0 148px` — fixed width, no shrink/grow |
| Forgetting `scroll-snap-align: start` on tile | Without this, snap feels broken |
| Applying `overflow: hidden` to the track | This kills horizontal scroll — never use `overflow: hidden` on the track |
| Adding `max-width` to the track container | Remove it — track must be full width |
| Using `scroll-snap-type: x proximity` | Use `mandatory` for product tiles — `proximity` feels imprecise |
| Putting `padding-right` on the track instead of both sides | Put equal padding on both sides so first/last cards align |
