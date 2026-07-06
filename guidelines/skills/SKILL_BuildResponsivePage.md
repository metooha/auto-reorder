---
title: Build a Responsive Walmart Page
scope: skill
based-on: RULE_ResponsiveLayout.mdc, RULE_WalmartPageComposition.mdc
last_updated: 2025-02-28
---

## What This Skill Does

Walks you through building a new Walmart-facing page with the correct shell, content stacking order, full-bleed sections, padded sections, and all three responsive breakpoints.

## When to Use It

- Creating a new page at `client/pages/walmart/YourPage.tsx`
- Adding a new route to the Walmart section of the app
- A page layout looks wrong at tablet or mobile sizes

---

## What the Shell Provides (Don't Re-Render These)

The layout already wraps every Walmart page with:

- `DesktopHeader` — top navigation bar
- `MobileTopNav` — mobile top bar
- `SubNav` — category navigation strip
- `BottomNav` — mobile bottom tab bar

Your page file should **only render the page-specific content**. Never add these shell components inside a page file.

---

## Standard Stacking Order (Top → Bottom)

```
1. Hero / full-bleed banner          (no horizontal padding, width: 100%)
2. Promotional row(s)                (JumpRightBackIn, NewArrivalsCarousel)
3. Section headers + "See all" links (padded)
4. Content grid or list              (padded)
5. Inline ad banner                  (full-bleed or padded — depends on design)
```

---

## Step-by-Step

### Step 1 — Create the page file

**File**: `client/pages/walmart/YourPage.tsx`

```tsx
import React from 'react';
import styles from './YourPage.module.css';

export default function YourPage() {
  return (
    <div className={styles.page}>

      {/* 1. Full-bleed hero — no horizontal padding */}
      <section className={styles.hero}>
        <img
          src="/illustrations/spot-illustration/hero-image.webp"
          alt="Hero description"
          className={styles.heroImage}
        />
      </section>

      {/* 2. Padded content section */}
      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>Section Title</h2>
        {/* content */}
      </section>

    </div>
  );
}
```

### Step 2 — Create the CSS module

**File**: `client/pages/walmart/YourPage.module.css`

```css
/* Page wrapper — full width within the shell, no max-width */
.page {
  width: 100%;
  padding-bottom: var(--ld-semantic-spacing-400, 2rem);
}

/* ── Full-bleed section (hero, carousels) ─────────────────────────────────── */
/* No horizontal padding — content stretches edge to edge */
.hero {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.heroImage {
  width: 100%;
  display: block;
  object-fit: cover;
}

/* ── Padded content section ───────────────────────────────────────────────── */
.section {
  padding: var(--ld-semantic-spacing-300, 1.5rem) var(--ld-semantic-spacing-400, 2rem);
}

.sectionHeading {
  font-family: var(--ld-semantic-font-family-sans);
  font-size: var(--ld-semantic-font-heading-small-size, 1.25rem);
  font-weight: var(--ld-semantic-font-body-small-weight-alt, 700);
  color: var(--ld-semantic-color-text);
  margin: 0 0 var(--ld-semantic-spacing-200, 1rem);
}

/* ── Content grid ─────────────────────────────────────────────────────────── */
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--ld-semantic-spacing-200, 1rem);
}

/* ── Breakpoints ──────────────────────────────────────────────────────────── */

/* Tablet: 1024px */
@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile large: 768px */
@media (max-width: 768px) {
  .section {
    padding: var(--ld-semantic-spacing-200, 1rem) var(--ld-semantic-spacing-300, 1.5rem);
  }

  .sectionHeading {
    font-size: var(--ld-semantic-font-body-medium-size, 1rem);
  }

  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--ld-semantic-spacing-100, 0.5rem);
  }
}

/* Mobile small: 480px */
@media (max-width: 480px) {
  .section {
    padding: var(--ld-semantic-spacing-200, 1rem);
  }

  .grid {
    grid-template-columns: 1fr;
  }
}
```

### Step 3 — Add the route

In `client/App.tsx`, inside the Walmart routes section:

```tsx
// Lazy import near top of file:
const YourPage = React.lazy(() => import('./pages/walmart/YourPage'));

// Inside the Walmart <Route> children:
<Route path="your-page" element={<YourPage />} />
```

### Step 4 — Add a BottomNav link (if needed)

If your page should be accessible from the mobile bottom nav, add a tab entry in `client/components/walmart/BottomNav.tsx`.

**Never add `max-width` or `margin: 0 auto` to the BottomNav** — it must be full-width.

---

## Responsive Padding Reference

Apply this padding scale consistently across all content sections:

| Breakpoint | Padding |
|---|---|
| Desktop (>1024px) | `24px 32px` |
| Tablet (768–1024px) | `20px 24px` |
| Mobile (480–768px) | `16px` |
| Small mobile (<480px) | `12px` |

```css
.section {
  padding: var(--ld-semantic-spacing-300, 1.5rem) var(--ld-semantic-spacing-400, 2rem);
}

@media (max-width: 1024px) {
  .section { padding: 20px var(--ld-semantic-spacing-300, 1.5rem); }
}

@media (max-width: 768px) {
  .section { padding: var(--ld-semantic-spacing-200, 1rem); }
}

@media (max-width: 480px) {
  .section { padding: 12px; }
}
```

---

## Standard Breakpoints — Do Not Invent New Ones

```
1024px — desktop → tablet transition
 768px — tablet → mobile transition
 480px — mobile → small mobile transition
```

---

## Full-Bleed vs Padded — Quick Reference

| Section type | CSS | Examples |
|---|---|---|
| Full-bleed | `width: 100%; overflow: hidden; no padding` | Hero banner, JumpRightBackIn carousel, ad strips |
| Padded | `padding: [standard scale]` | Product grids, section headers, order cards |

---

## Complete Example — Minimal Walmart Page

```tsx
// client/pages/walmart/DealsPage.tsx
import React from 'react';
import styles from './DealsPage.module.css';

const DEALS = [
  { id: '1', name: 'Deal One', price: '$9.98', image: '/illustrations/...' },
  { id: '2', name: 'Deal Two', price: '$14.97', image: '/illustrations/...' },
];

export default function DealsPage() {
  return (
    <div className={styles.page}>
      {/* Full-bleed hero */}
      <div className={styles.hero}>
        <img src="/illustrations/spot-illustration/deals-hero.webp" alt="Deals" className={styles.heroImage} />
      </div>

      {/* Padded content */}
      <section className={styles.section}>
        <h2 className={styles.heading}>Today's Deals</h2>
        <div className={styles.grid}>
          {DEALS.map((deal) => (
            <div key={deal.id} className={styles.card}>
              <img src={deal.image} alt={deal.name} className={styles.cardImage} />
              <p className={styles.cardName}>{deal.name}</p>
              <p className={styles.cardPrice}>{deal.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
```

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Adding `DesktopHeader` inside the page | Remove it — the shell provides it |
| Using `max-width: 1280px; margin: 0 auto` | Remove — pages must fill full shell width |
| Inventing a breakpoint like `900px` | Use only `1024px`, `768px`, `480px` |
| No responsive media queries on grids | Every multi-column grid needs breakpoint overrides |
| Hero image with `overflow: visible` | Use `overflow: hidden` to prevent horizontal scroll |
| `padding: 40px 60px` on a content section | Use the standard scale with tokens |
| Forgetting `object-fit: cover` on hero image | Without it, images distort at different viewport widths |
