# Card Templates — Purchase History

These are the reusable card patterns available in the Purchase History page. Each card is a self-contained template that can be surfaced by toggling a flag in `client/pages/walmart/PurchaseHistory.tsx` or by passing the right props to the corresponding component.

All cards use LD 3.5 semantic design tokens, support mobile and desktop layouts, and follow the Button/Tag/Icon component rules.

---

## How to surface a card

Open `client/pages/walmart/PurchaseHistory.tsx` and set the matching flag to `true`:

```ts
const SHOW_COMBINED_CARD        = true;  // Auto Care + Curbside bundled card
const SHOW_AUTO_CARE_ORDER      = true;  // Standalone Auto Care appointment card
const SHOW_CURBSIDE_GET_IT_NOW  = true;  // Curbside "Get it now" active order
const SHOW_DELAYED_DELIVERY     = true;  // Delayed delivery warning card
```

Standard delivery, shipping, store, and completed curbside cards always display — no flag needed.

---

## Card Catalog

---

### 1. Standard Order Card

**Component:** `client/components/walmart/purchase-history/OrderCard.tsx`

**What it is:** The default card for any completed or in-progress order. Supports delivery, shipping, store purchase, and curbside pickup. Shows product images, a status heading, optional order timeline tracker, and action buttons.

**When to use it:** Any fulfilled or in-progress order that isn't a specialised card type.

**Key props:**
| Prop | Type | Description |
|---|---|---|
| `orderType` | `'delivery' \| 'shipping' \| 'store' \| 'curbside'` | Sets the order type badge and icon |
| `statusHeading` | `string` | Main date/status line (e.g. "Delivered on Feb 15") |
| `products` | `{ src, alt }[]` | Product thumbnail images |
| `orderTotal` | `string` | Displayed in the card footer (e.g. "$41.90") |
| `timelineStep` | `'placed' \| 'preparing' \| 'on-the-way' \| 'delivered'` | Progress tracker step |
| `actions` | `{ label, variant }[]` | Footer action buttons |
| `showStartReturn` | `boolean` | Shows "Start a return" link |
| `returnNotice` | `string` | Optional return deadline notice |
| `location` | `string` | Store address (curbside/store orders) |

**Simple prompt:**
> Add a standard delivery order card showing "Delivered on Feb 15" with four product thumbnails and a "View details" button.

---

### 2. Curbside Pickup Card — Completed

**Component:** `client/components/walmart/purchase-history/CurbsideOrderCard.tsx`

**What it is:** A standard curbside card for a completed pickup. Shows store location, pickup date, product thumbnails, and a "View details" action. Uses the same layout as the Standard Order Card but with the curbside pickup timeline variant.

**When to use it:** A curbside order that has already been picked up.

**Key props:** Same as Standard Order Card with `orderType: 'curbside'` and `timelineVariant: 'pickup'`.

**Simple prompt:**
> Add a completed curbside pickup card for "Carrollton Supercenter at 1213 Trinity Mills Rd" picked up on Jan 15, with four product images and a "View details" button.

---

### 3. Curbside Card — Active with "Get it now"

**Component:** `client/components/walmart/purchase-history/CurbsideOrderCard.tsx`

**Flag to enable:** `SHOW_CURBSIDE_GET_IT_NOW = true`

**What it is:** An active curbside order with the option to upgrade to express delivery. Shows a countdown banner ("1hr 20min left to add to your order"), the order timeline in "placed" state, product thumbnails, and three actions: **Get it now** (primary), **Edit items** (secondary), and **View details** (secondary). Clicking "Get it now" opens `GetItNowModal`, which lets the customer switch to express delivery for a $9.95 fee.

**When to use it:** A curbside order that is still editable and where express delivery is available.

**Key props:**
| Prop | Value for this pattern |
|---|---|
| `orderType` | `'curbside'` |
| `addItemsBanner` | `'1hr 20min left to add to your order'` |
| `timelineStep` | `'placed'` |
| `actions` | `[{ label: 'Get it now', variant: 'primary' }, { label: 'Edit items', variant: 'secondary' }, { label: 'View details', variant: 'secondary' }]` |

**Simple prompt:**
> Show an active curbside order card for "Sat, Mar 7, 12:00pm–1:00pm" at the Carrollton Supercenter with a "Get it now" primary button that opens the express delivery upgrade modal.

---

### 4. Auto Care Appointment Card

**Component:** `client/components/walmart/purchase-history/AutoCareOrderCard.tsx`

**Flag to enable:** `SHOW_AUTO_CARE_ORDER = true`

**What it is:** A scheduled auto care service appointment card. Shows the store location, appointment date/time, vehicle info (2019 Toyota Camry), and services booked (e.g. oil change, tire rotation). Actions: **Check in** (primary), **Reschedule** (secondary), **View details** (secondary). Each action opens the matching modal from `AutoCareModals.tsx`.

**When to use it:** An upcoming Auto Care Center appointment.

**Key props:**
| Prop | Description |
|---|---|
| `orderType` | `'auto'` |
| `location` | Store address string |
| `statusHeading` | Appointment date/time (e.g. "Sat, Mar 7, 10:00am–11:00am") |
| `serviceDetails` | Object with `vehicle`, `services`, `serviceItems`, `storePhone`, etc. |
| `orderTotal` | Estimated total |
| `actions` | Check in / Reschedule / View details |

**Simple prompt:**
> Add an Auto Care appointment card for a conventional oil change and tire rotation on Sat, Mar 7 at 10am for a 2019 Toyota Camry at the Carrollton Supercenter, with Check in, Reschedule, and View details buttons.

---

### 5. Combined Bundled Card

**Component:** `client/components/walmart/purchase-history/CombinedOrderCard.tsx`

**Flag to enable:** `SHOW_COMBINED_CARD = true`

**What it is:** A two-panel card that presents a related Auto Care appointment and a curbside pickup order side by side. Left panel shows the oil change appointment (date, location, actions). Right panel shows the curbside pickup (location, scheduled time, products). A "Bundle & save" pricing callout links the two orders together.

**When to use it:** When a customer has both an auto care appointment and a same-day curbside pickup — surfaced as a "smart bundle" to encourage them to combine the trip.

**Key props:**
| Prop | Type | Description |
|---|---|---|
| `autoCare` | `OrderCardProps` | Auto care order data |
| `delivery` | `OrderCardProps` | Curbside order data |
| `autoCareAppointmentDate` | `Date` | Used to compute "same day" messaging |

**Simple prompt:**
> Show the combined bundled card that pairs the oil change appointment with the curbside pickup and displays a "Bundle & save" section with a merged total.

---

### 6. Delayed Delivery Card

**Component:** `client/components/walmart/purchase-history/DelayedDeliveryCard.tsx`

**Flag to enable:** `SHOW_DELAYED_DELIVERY = true`

**What it is:** A high-emphasis warning card shown above an order that is running late. Features an amber border, a clock icon, the delay estimate, product thumbnails, and a progress tracker frozen at "On the way". Actions include Reschedule delivery, Pickup instead, View details, and Cancel order.

**When to use it:** A delivery order that has passed its ETA window.

**Key props:**
| Prop | Type | Description |
|---|---|---|
| `statusHeading` | `string` | Short delay message (e.g. "Delayed, estimated up to 2 hours") |
| `delayEstimate` | `string` | Detailed estimate shown in the callout box |
| `products` | `{ src, alt }[]` | Product thumbnails |
| `orderTotal` | `string` | Order total shown in footer |

**Simple prompt:**
> Add a delayed delivery warning card for an order that is 2 hours late, showing the affected products and options to reschedule, pick up instead, or cancel.

---

### 7. Inline Ad Banner

**Component:** `client/components/walmart/purchase-history/InlineAdBanner.tsx`

**What it is:** A full-width sponsored content banner inserted between order cards (currently after the 4th card). Displays a brand logo, headline, CTA button, and a decorative illustration. Does not count as an order card.

**When to use it:** Injected at a fixed position in the order list to surface a relevant third-party or Walmart offer.

**Key props:**
| Prop | Type | Description |
|---|---|---|
| `logoSrc` | `string` | Brand logo image URL |
| `logoAlt` | `string` | Alt text for logo |
| `headline` | `string` | Ad headline text |
| `ctaLabel` | `string` | Button label |
| `imageSrc` | `string` | Decorative illustration URL |
| `imageAlt` | `string` | Alt text for illustration |

**Simple prompt:**
> Insert an inline ad banner after the 4th order card promoting GEICO car insurance with a "Get a quote" button and the GEICO gecko illustration.

---

### 8. Review Prompt Banner

**Component:** `client/components/walmart/purchase-history/ReviewPromptBanner.tsx`

**What it is:** A carousel/banner shown at the top of the order list prompting the customer to leave reviews for recently purchased products. On desktop, shows a side-by-side CTA card and up to two product review cards. On mobile, shows a horizontal scroll carousel with dot pagination.

**When to use it:** After a customer has received an order containing reviewable products.

**Key props:**
| Prop | Type | Description |
|---|---|---|
| `products` | `{ name, imageSrc, rating }[]` | Products awaiting review |
| `ctaIllustration` | `string` | Illustration image URL for the CTA card |

**Simple prompt:**
> Show the review prompt banner at the top of the order list asking the customer to review their Nintendo Switch and Mario Kart 8 purchases.

---

## Token & component rules (all cards follow these)

- Buttons use `<Button variant="primary|secondary">` from `@/components/ui/Button` — never raw `<button>` elements for actions.
- Colors use `var(--ld-semantic-color-*)` tokens — no hardcoded hex values.
- Box shadows use `var(--ld-semantic-elevation-shadow-raised|overlay)` tokens.
- Typography uses `var(--ld-semantic-font-family-sans)`.
- Icons come from `@/components/icons` — no inline SVGs or emojis.
