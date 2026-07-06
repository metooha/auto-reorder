---
name: build-data-driven-component
description: Build components with static data arrays and TypeScript interfaces
---

## What This Skill Does

Shows you how to structure a component that renders from a local static data array — including naming conventions, TypeScript interfaces, multi-line text patterns, and the distinction between static demo data and real API data.

## When to Use It

- Building a carousel, product row, or order list with demo/static content
- Creating a component that maps over an array to render repeating tiles or cards
- A component has data that won't change (product images, promotional content, seed data)

---

## The Core Pattern

Local static data lives **in the same file as the component**, above the component function. It is never in a separate data file unless shared across multiple components.

```
ComponentFile.tsx
  ├── TypeScript interface (data shape)
  ├── CONST_DATA array (static data)
  └── export function Component() { ... }
```

---

## Step-by-Step

### Step 1 — Define the TypeScript interface

Always define the shape of your data before writing the array. Be explicit about optional fields.

```tsx
interface ProductTile {
  id: string;
  image: string;
  name: string;
  price: string;
  rating?: number;          // Optional
  objectPosition?: string;  // Optional — for image focal point control
  headlineParts?: string[]; // Optional — for multi-line text
}
```

### Step 2 — Name the data constant

Use `UPPER_SNAKE_CASE` for the constant name. Match the semantic meaning of the data.

```tsx
// ✅ Correct naming
const PRODUCTS: ProductTile[] = [...];
const SLIDES: CarouselSlide[] = [...];
const ORDERS: OrderCard[] = [...];
const CATEGORIES: CategoryItem[] = [...];
const DEALS: DealTile[] = [...];

// ❌ Wrong naming
const data = [...];
const items = [...];
const list = [...];
const arr = [...];
```

### Step 3 — Write the data array

Place it above the component function, right after the interface.

```tsx
const PRODUCTS: ProductTile[] = [
  {
    id: '1',
    image: '/illustrations/spot-illustration/product-a.webp',
    name: 'Great Value Whole Milk',
    price: '$3.98',
    rating: 4.5,
  },
  {
    id: '2',
    image: '/illustrations/spot-illustration/product-b.webp',
    name: 'Marketside Organic Baby Spinach',
    price: '$4.47',
    rating: 4.2,
  },
];
```

**Image URLs**: Use local `public/` paths or Walmart CDN URLs. Never use `placeholder.com`, `picsum.photos`, or `via.placeholder.com`.

```tsx
// ✅ Local illustration
image: '/illustrations/spot-illustration/great-value-milk.webp'

// ✅ Walmart CDN URL (for products)
image: 'https://i5.walmartimages.com/seo/Product-Name_abc123.jpg'

// ❌ Wrong — external placeholder
image: 'https://picsum.photos/200/200'
image: 'https://via.placeholder.com/200'
```

### Step 4 — Render the data

```tsx
export function ProductCarousel() {
  return (
    <div className={styles.track}>
      {PRODUCTS.map((product) => (
        <div key={product.id} className={styles.tile}>
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
  );
}
```

Always use `product.id` (or a unique string) as the `key` — never use the array index.

---

## Multi-Line Text Pattern

When a headline or label needs to break across multiple lines, use `headlineParts?: string[]` — **never** use `\n` in strings.

```tsx
// ✅ Correct — headlineParts array
interface CarouselSlide {
  headlineParts?: string[];
  image: string;
}

const SLIDES: CarouselSlide[] = [
  {
    headlineParts: ['Get what you need,', 'when you need it'],
    image: '/illustrations/hero-slide-1.webp',
  },
];

// Render each part in a <span style={{ display: 'block' }}>
{slide.headlineParts
  ? slide.headlineParts.map((part, i) => (
      <span key={i} style={{ display: 'block' }}>{part}</span>
    ))
  : slide.headline
}
```

```tsx
// ❌ Wrong — \n in string (doesn't render in HTML without pre-wrap)
const SLIDES = [
  { headline: 'Get what you need,\nwhen you need it' }
];
```

---

## Per-Item Dynamic Values (objectPosition)

Some items need different image focal points. Use optional properties for these:

```tsx
interface CarouselSlide {
  image: string;
  objectPosition?: string;  // e.g., 'center top', '30% 50%'
}

const SLIDES: CarouselSlide[] = [
  { image: '/hero-1.webp', objectPosition: 'center top' },   // Show top of image
  { image: '/hero-2.webp', objectPosition: '30% 50%' },      // Custom focal point
];

// Apply as inline style (it's dynamic per slide)
<img
  src={slide.image}
  alt={slide.altText}
  style={{ objectPosition: slide.objectPosition ?? 'center' }}
  className={styles.heroImage}
/>
```

---

## Static Data vs Real API Data

| | Static (demo) data | Real API data |
|---|---|---|
| **Location** | Same `.tsx` file as component, above function | Passed as props from parent/page |
| **Naming** | `CONST` in UPPER_SNAKE_CASE | Prop name in camelCase |
| **Type** | TypeScript interface defined in same file | Shared type from `shared/api.ts` or API types |
| **Purpose** | Prototype, demo, seed content | Production user data |

```tsx
// ✅ Static demo data — defined in the file
const PRODUCTS: ProductTile[] = [...];

function NewArrivalsCarousel() {
  return PRODUCTS.map(...);
}

// ✅ Real API data — passed as props
interface OrderHistoryProps {
  orders: Order[];  // comes from API, passed from parent
}

function OrderHistory({ orders }: OrderHistoryProps) {
  return orders.map(...);
}
```

**Never hardcode user-specific data** (names, addresses, account numbers) in the component file — always pass as props.

---

## Complete Example

```tsx
// client/components/walmart/FeaturedDeals.tsx
import React from 'react';
import styles from './FeaturedDeals.module.css';

interface DealTile {
  id: string;
  image: string;
  name: string;
  originalPrice: string;
  salePrice: string;
  badge?: string;
}

const DEALS: DealTile[] = [
  {
    id: 'deal-1',
    image: '/illustrations/spot-illustration/deal-coffee.webp',
    name: 'Folgers Classic Roast Coffee',
    originalPrice: '$12.98',
    salePrice: '$8.98',
    badge: 'Rollback',
  },
  {
    id: 'deal-2',
    image: '/illustrations/spot-illustration/deal-paper-towels.webp',
    name: 'Bounty Select-A-Size Paper Towels',
    originalPrice: '$19.97',
    salePrice: '$15.47',
  },
];

export function FeaturedDeals() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Featured Deals</h2>
      <div className={styles.track}>
        {DEALS.map((deal) => (
          <div key={deal.id} className={styles.tile}>
            <img src={deal.image} alt={deal.name} className={styles.image} loading="lazy" />
            {deal.badge && <span className={styles.badge}>{deal.badge}</span>}
            <p className={styles.name}>{deal.name}</p>
            <p className={styles.originalPrice}>{deal.originalPrice}</p>
            <p className={styles.salePrice}>{deal.salePrice}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| `const data = [...]` | Use `const PRODUCTS: ProductTile[] = [...]` |
| `key={index}` in `.map()` | Use `key={item.id}` with a stable unique ID |
| `\n` in string for line breaks | Use `headlineParts: ['line 1', 'line 2']` |
| Placeholder image URLs | Use local `public/` paths or Walmart CDN URLs |
| User-specific data hardcoded in file | Pass real user data as props — never hardcode |
| No TypeScript interface | Always define the data shape with an interface |
| Data array in a separate file (for one component) | Keep it in the same file unless shared across multiple components |
