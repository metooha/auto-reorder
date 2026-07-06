---
name: write-design-prompt
description: Recipes for prompting new pages cards banners and carousels
---

## What This Skill Does

Shows you how to write a text prompt that produces correct, complete, themed, and responsive UI output from an AI agent — without back-and-forth clarification.

## When to Use It

- Requesting a new page, section, or component from an AI agent
- Refining a prompt that produced generic or incorrect output
- Writing a prompt for a card, banner, navigation section, or carousel

---

## The Four Questions Every Prompt Must Answer

```
1. WHAT    — the page, section, or component being built
2. WHO     — who sees it (customer, associate, admin)
3. CONTAINS — the key data points, actions, and states
4. FITS    — where it lives in the navigation or layout
```

**Too vague (bad)**:
```
"Add an order card"
```

**Too specific (bad — brittle)**:
```
"Make a flex container with 16px padding, 1px border #E3E4E5, font-size 14px..."
```

**Just right**:
```
"Add an order card to the Purchase History page (customer-facing) that shows
fulfillment type (curbside, delivery, shipping), a status heading,
a 4-step progress tracker, product thumbnails, and action buttons.
Shipping orders show a 'Buy again' primary action. All cards have a
'Start a return' footer link. On mobile, action buttons stack vertically."
```

---

## Prompt Structure

Use this order for consistent results:

```
[Page context] > [Component name] > [States/variants] > [Content] > [Actions] > [Responsive]
```

---

## Recipes by Component Type

### New Page

```
Build a [PageName] page at the [/walmart/route] route.
It is visible to [customer / associate / admin].

Layout:
- Hero section (full-bleed, no horizontal padding): [description]
- Section 1: [heading, content type, data shown]
- Section 2: [heading, content type, data shown]

Responsive:
- Desktop: [layout description]
- Tablet (1024px): [what changes]
- Mobile (768px): [what changes]

Use the [ExistingComponent] pattern for [similar section].
```

### New Card

```
Add a [CardName] card to [PageName].
It shows: [list the data points — status, price, image, etc.]
States: default, [state2], [state3 e.g. loading / error / empty]
Actions: [primary action button], [secondary action], [link]
On mobile, [what changes — stacked buttons, hidden element, etc.]
Use the same border and padding as [ExistingCard].
```

### New Banner

```
Add a [BannerName] banner between [ComponentA] and [ComponentB] on [PageName].
Variants: default (subtle background), brand (Walmart blue), inverse (dark)
Content: [eyebrow text], [headline], [optional body text], [optional CTA]
Width: full-bleed / padded (pick one)
On mobile: [stacks / hides element / changes layout]
```

### New Navigation Section

```
Add a [SectionName] group to [NavComponent] below [ExistingItem].
It contains: [list of nav items with their route paths]
Active state: highlight the item matching the current route.
Follow the same [SideNavigationItem / SubNavButton] pattern as other items.
```

### New Carousel / Scroll Row

```
Add a [CarouselName] scroll row to [PageName] between [SectionA] and [SectionB].
It shows [N] product/content tiles scrolling horizontally.
Each tile contains: [image, title, price, optional rating, optional button]
Tile width: [148px mobile / 180px tablet / 200px desktop]
Auto-advance: yes (every [N] seconds) / no (user-scrolled only)
```

---

## State Specification — Always Name All States

The AI will not invent states unless you ask. Name each one:

| Instead of... | Say... |
|---|---|
| "make a button" | "make a button with default, hover, focus, and loading states" |
| "add an alert" | "add an info alert for the normal state, a warning alert for the delayed state" |
| "show order status" | "show three status variants: Delivered (success), Delayed (warning), Cancelled (neutral)" |

---

## Colors — Describe Semantic Role, Never Hex

```
// ❌ Wrong — hardcodes a primitive color
"Make the eyebrow text #001e60 with font-size 14px"

// ✅ Correct — describes the semantic role
"Make the eyebrow text use the brand-bold text color, body-small size"

// ✅ Also correct — names the token directly
"Use var(--ld-semantic-color-text-brand-bold) for the eyebrow"
```

**Color role vocabulary** to use in prompts:

| Say this | Means this token |
|---|---|
| "primary text" | `--ld-semantic-color-text` |
| "subtle / muted text" | `--ld-semantic-color-text-subtle` |
| "brand text" | `--ld-semantic-color-text-brand` |
| "brand-bold text" | `--ld-semantic-color-text-brand-bold` |
| "brand subtle background" | `--ld-semantic-color-fill-brand-subtle` |
| "white surface / card background" | `--ld-semantic-color-surface` |
| "subtle fill / light gray" | `--ld-semantic-color-fill-subtle` |
| "primary action fill" | `--ld-semantic-color-action-fill-primary` |
| "success text" | `--ld-semantic-color-text-positive` |
| "warning text" | `--ld-semantic-color-text-warning` |
| "error text" | `--ld-semantic-color-text-negative` |
| "separator / divider" | `--ld-semantic-color-separator` |

---

## Responsive Prompting — Always Specify Breakpoints

Always state what changes at each breakpoint. If you don't specify, the AI will guess.

```
"Desktop (>1024px): two-column layout, image 40% / text 60%.
Tablet (768–1024px): same two-column layout, reduce padding to 24px.
Mobile (<768px): stack image on top, text below. Buttons become full-width."
```

Standard breakpoints in this project: `1024px`, `768px`, `480px`.

---

## Anchoring to Existing Components

Name existing components to reuse their patterns:

```
// Reuse a layout pattern
"Add a new section to AccountSideNav below Messages,
following the same SideNavigationItem pattern."

// Reuse a card style
"Add a new card using the same border, padding, and footer
as the existing OrderCard — but replace the progress tracker
with a single-line status text."

// Reuse a component directly
"Use the BasicBanner component with the 'brand' variant for the promo strip."
```

---

## Complete Example Prompt

```
On the Walmart home page (client/pages/walmart/Index.tsx),
add a "Flash Deals" section between the JumpRightBackIn carousel
and the NewArrivalsCarousel.

Section heading: "Flash Deals" with a "See all" link on the right.

Content: horizontally scrollable product tile row (Pattern 1 — scroll snap).
Each tile: 148px wide on mobile, 180px tablet, 200px desktop.
Tile content: product image (1:1 aspect ratio), product name (2 lines max),
original price struck through, sale price in success green, "Add" button.

Use the CarouselProductCard component if it fits, or create a new
FlashDealTile component in client/components/walmart/ with default and
sale variants.

On mobile, full-bleed with 16px side padding inside the track.
On desktop, 32px side padding.
```

---

## Common Prompt Mistakes

| Mistake | Fix |
|---|---|
| No states specified | List every state: default, hover, loading, empty, error |
| Hex colors in prompt | Use semantic role description or token name |
| No responsive spec | Always state what changes at 1024px, 768px, 480px |
| Too vague: "make it look good" | Describe the visual outcome: "use brand-subtle background, bold text, 16px padding" |
| No context: "add a button" | Specify page, position, variant: "Add a primary 'Add to cart' button to the ProductCard in the bottom-right corner" |
| Specifying exact px values | Describe intent: "generous padding" → "use the large component padding token" |
