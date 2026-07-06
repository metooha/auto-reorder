# Fusion Starter

---

## BEFORE YOU START — Read the Skill First

**CRITICAL: Before writing any code, check this table. If your task matches a skill, read that skill file end-to-end first. Skills contain copy-paste scaffolds that prevent the most common mistakes.**

| Task | Read this skill first |
|---|---|
| Build a new WCP component | `guidelines/skills/SKILL_BuildWCPComponent.md` |
| Build a new LD primitive component | `guidelines/skills/SKILL_BuildLDComponent.md` |
| Build a new Walmart page | `guidelines/skills/SKILL_BuildResponsivePage.md` |
| Build a scroll/snap carousel | `guidelines/skills/SKILL_BuildScrollCarousel.md` |
| Build a data-driven component | `guidelines/skills/SKILL_BuildDataDrivenComponent.md` |
| Build a Purchase History card | `guidelines/skills/SKILL_BuildPurchaseHistoryCard.md` |
| Build a card meta layout (icon + stacked text) | `guidelines/skills/SKILL_BuildCardMetaLayout.md` |
| Add an animation or transition | `guidelines/skills/SKILL_AddAnimation.md` |
| Add translatable strings (i18n) | `guidelines/skills/SKILL_AddI18nStrings.md` |
| Add a custom icon | `guidelines/skills/SKILL_AddCustomIcon.md` |
| Add a theme override | `guidelines/skills/SKILL_AddThemeOverride.md` |
| Extract or use Figma assets | `guidelines/skills/SKILL_ExtractFigmaAssets.md` |
| Map Figma colors/fonts to tokens | `guidelines/skills/SKILL_MapFigmaToTokens.md` |
| Fix hardcoded colors or token violations | `guidelines/skills/SKILL_FixTokenViolations.md` |
| Use Tag or OLQTag | `guidelines/skills/SKILL_UseTagComponents.md` |
| Use LinkButton or Spot Icon | `guidelines/skills/SKILL_UseLinkButton.md` |
| Write a design prompt | `guidelines/skills/SKILL_WriteDesignPrompt.md` |
| Harden accessibility (aria, keyboard, screen reader) | `guidelines/skills/SKILL_AccessibilityHardening.md` |
| Manage a pattern library | `guidelines/skills/SKILL_ManagePatternLibrary.md` |

All skills are in `guidelines/skills/`. The full index is at `guidelines/skills/SKILLS_INDEX.md`.

---

## TOP VIOLATIONS — Always Check These First

These are the most frequently broken rules. Verify before considering any task complete:

### 1. No hardcoded hex colors — ever
```css
/* ❌ WRONG */
color: #0071DC;
background: #F8F8F8;

/* ✅ CORRECT */
color: var(--ld-semantic-color-text-brand, #0071DC);
background: var(--ld-semantic-color-background-subtle, #F8F8F8);
```
Run before finishing: `grep -rn "#[0-9a-fA-F]\{6\}" client/components/ client/pages/ --include="*.css"`

### 2. Never use `--ld-primitive-color-*` in component CSS
Primitive tokens bypass theming. Only semantic tokens (`--ld-semantic-*`) are allowed in component and page CSS.

### 3. Never create raw `<button>`, `<input>`, `<select>`, `<a>` elements
| Raw element | Use instead |
|---|---|
| `<button>` | `<Button>` from `@/components/ui/Button` |
| `<input type="checkbox">` | `<Checkbox>` from `@/components/ui/Checkbox` |
| `<input type="radio">` | `<Radio>` / `<RadioGroup>` |
| `<input>` / `<textarea>` | `<TextField>` / `<TextArea>` |
| `<select>` | `<Select>` from `@/components/ui/Select` |
| `<a>` | `<Link>` from the LD Link component |

### 4. Never create custom dropdowns, popovers, or modals
Always use portal-based LD components (`Popover`, `Modal`, `Menu`, `Select`). Never use `position: absolute` for overlay UI.

### 5. Never add `max-width` or `margin: 0 auto` to page content containers
Content must fill the full available width. Use `align-items: stretch` on flex column containers.

### 6. Every animation MUST have a `prefers-reduced-motion` override
```css
@keyframes myAnim { ... }
@media (prefers-reduced-motion: reduce) {
  .element { animation: none; }
}
```

### 7. Never install external UI or icon libraries
No `shadcn/ui`, `@radix-ui/*`, `@headlessui/*`, `react-icons`, `lucide-react`, etc. All UI from `client/components/ui/`. All icons from `client/components/icons/`.

---

## MANDATORY PRE-TASK PROTOCOL — Ask Before You Build

**CRITICAL RULE: Before writing a single line of code for any design or UI request, the agent MUST ask the designer/requester the relevant questions from the checklist below. Do not assume. Do not guess. Do not start implementing.**

This applies to every new component, page, feature, or visual change — no exceptions.

### Step 1 — Identify which categories apply to the task

| Task type | Required question categories |
|---|---|
| New page or layout | Layout & Spacing, States, Data & Content, Components |
| New component | Layout & Spacing, States, Touch & Accessibility, Components |
| Carousel / scrollable list | Shadow / Elevation, Auto-advance, Touch & Accessibility |
| Interactive element (tabs, nav, buttons) | States, Navigation / Routing, Touch & Accessibility |
| Data / content update | Data & Content |
| Animation / transition | Animation feel, Navigation timing |

### Step 2 — Ask only the relevant questions (don't dump the entire list)

Select the questions that apply and ask them in a single message before proceeding.

#### Layout & Spacing
- What padding does this section inherit from its parent? Does any part need to break out of it (full-bleed / negative margin)?
- Which breakpoints does this apply to? (Desktop only ≥1024px / mobile only <768px / both)

#### States & Interactions
- What are ALL states needed? (default, hover, active, disabled, loading, empty, error)
- What triggers any animation? (click, scroll, auto-advance, on mount)
- What does the animation feel like? (spring bounce, smooth ease, instant snap, elastic)

#### Carousel / Auto-advance
- Does this auto-advance? At what interval?
- Does it pause on hover? On touch? How long until it resumes?
- Is the card inside a scrollable container? (Shadow clipping risk if yes)

#### Navigation / Routing
- Do any tabs or buttons navigate to another page? Which route?
- Should the animation complete before navigation fires? How long to delay?
- Which tab in the bottom nav is active on this page?

#### Touch & Accessibility
- Are all interactive elements (dots, chips, icon buttons) at least 44×44px tap target?
- If not, should we use the padding + `::before` trick to expand the touch area without changing visuals?

#### Data & Content
- Are dates relative to today? Should the year appear in the label text?
- Should names/addresses be real, randomized, or from a user profile?
- What is the max content length before text truncates?

#### Components & Tokens
- Is this an existing LD component or a new pattern?
- What semantic token maps to each color in the design? (Never use hex — always a token)
- Does this duplicate any existing component? Check before creating.

#### Elevation & Shadows
- Do cards in this section have box-shadow elevation?
- Is the card inside a scrollable container? (If yes, shadows need padding *inside* the scroll container, not an outer `overflow: hidden` wrapper)

### Step 3 — Get answers, then build

Only after receiving answers to the relevant questions should implementation begin. If the requester says "just go ahead," use the defaults from `RULE_PromptDrivenDesign.mdc` and document the assumptions made.

---

A production-ready full-stack React application template with integrated Express server, featuring React Router 6 SPA mode, TypeScript, Vitest, Zod and modern tooling.

While the starter comes with a express server, only create endpoint when strictly neccesary, for example to encapsulate logic that must leave in the server, such as private keys handling, or certain DB operations, db...

## Tech Stack

- **PNPM**: Prefer pnpm
- **Frontend**: React 18 + React Router 6 (spa) + TypeScript + Vite + TailwindCSS 3
- **Backend**: Express server integrated with Vite dev server
- **Testing**: Vitest
- **UI**: Living Design 3.5 + CSS Modules

## Project Structure

```
client/                   # React SPA frontend
├── pages/                # Route components (Index.tsx = home)
├── components/ui/        # Pre-built UI component library
├── App.tsx                # App entry point and with SPA routing setup
└── global.css            # TailwindCSS 3 theming and global styles

server/                   # Express API backend
├── index.ts              # Main server setup (express config + routes)
└── routes/               # API handlers

shared/                   # Types used by both client & server
└── api.ts                # Example of how to share api interfaces
```

## Key Features

## SPA Routing System

The routing system is powered by React Router 6:

- `client/pages/Index.tsx` represents the home page.
- Routes are defined in `client/App.tsx` using the `react-router-dom` import
- Route files are located in the `client/pages/` directory

For example, routes can be defined with:

```typescript
import { BrowserRouter, Routes, Route } from "react-router-dom";

<Routes>
  <Route path="/" element={<Index />} />
  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
  <Route path="*" element={<NotFound />} />
</Routes>;
```

### Styling System

- **Primary**: TailwindCSS 3 utility classes
- **Theme and design tokens**: Configure in `client/global.css` 
- **UI components**: Pre-built library in `client/components/ui/`
- **Utility**: `cn()` function combines `clsx` + `tailwind-merge` for conditional classes

```typescript
// cn utility usage
className={cn(
  "base-classes",
  { "conditional-class": condition },
  props.className  // User overrides
)}
```

### Express Server Integration

- **Development**: Single port (8080) for both frontend/backend
- **Hot reload**: Both client and server code
- **API endpoints**: Prefixed with `/api/`

#### Example API Routes
- `GET /api/ping` - Simple ping api
- `GET /api/demo` - Demo endpoint  

### Shared Types
Import consistent types in both client and server:
```typescript
import { DemoResponse } from '@shared/api';
```

Path aliases:
- `@shared/*` - Shared folder
- `@/*` - Client folder

## Development Commands

```bash
pnpm dev        # Start dev server (client + server)
pnpm build      # Production build
pnpm start      # Start production server
pnpm typecheck  # TypeScript validation
pnpm test          # Run Vitest tests
```

## Adding Features

### Add new colors to the theme

Open `client/global.css` and `tailwind.config.ts` and add new tailwind colors.

### New API Route
1. **Optional**: Create a shared interface in `shared/api.ts`:
```typescript
export interface MyRouteResponse {
  message: string;
  // Add other response properties here
}
```

2. Create a new route handler in `server/routes/my-route.ts`:
```typescript
import { RequestHandler } from "express";
import { MyRouteResponse } from "@shared/api"; // Optional: for type safety

export const handleMyRoute: RequestHandler = (req, res) => {
  const response: MyRouteResponse = {
    message: 'Hello from my endpoint!'
  };
  res.json(response);
};
```

3. Register the route in `server/index.ts`:
```typescript
import { handleMyRoute } from "./routes/my-route";

// Add to the createServer function:
app.get("/api/my-endpoint", handleMyRoute);
```

4. Use in React components with type safety:
```typescript
import { MyRouteResponse } from '@shared/api'; // Optional: for type safety

const response = await fetch('/api/my-endpoint');
const data: MyRouteResponse = await response.json();
```

### New Page Route
1. Create component in `client/pages/MyPage.tsx`
2. Add route in `client/App.tsx`:
```typescript
<Route path="/my-page" element={<MyPage />} />
```

## Production Deployment

- **Standard**: `pnpm build`
- **Binary**: Self-contained executables (Linux, macOS, Windows)
- **Cloud Deployment**: Use either Netlify or Vercel via their MCP integrations for easy deployment. Both providers work well with this starter template.

## Architecture Notes

- Single-port development with Vite + Express integration
- TypeScript throughout (client, server, shared)
- Full hot reload for rapid development
- Production-ready with multiple deployment options
- Comprehensive UI component library included
- Type-safe API communication via shared interfaces

---

## Living Design 3.5 — Design System Rules

### Layout Rules

- **All Walmart pages cap at 1660px max-width** with no left/right padding on the content container. This is enforced by `ResponsiveLayout` — do not override it. Individual sections handle their own internal horizontal padding.
- **Use `align-items: stretch`** instead of `align-items: center` on flex column containers that hold page content. Centering causes content to shrink instead of filling width.
- **Standard page shell pattern** — every page must use this identical structure:

```tsx
<ResponsiveLayout maxWidth="full">
  {/* page content here */}
</ResponsiveLayout>
```

- Content areas should use `flex: 1` to expand and fill available height.
- Page-level wrappers (the first `<div>` inside `<ResponsiveLayout>`) must NOT add `px-*` Tailwind classes or CSS `padding-left`/`padding-right`.

### Token Rules (CRITICAL)

- **Never use hardcoded hex colors.** Always use `var(--ld-semantic-color-*)` tokens with hex fallbacks:

```css
/* ✅ CORRECT */
color: var(--ld-semantic-color-text, #2E2F32);
background: var(--ld-semantic-color-background-subtle, #f8f8f8);

/* ❌ WRONG */
color: #2E2F32;
background: #F8F8F8;
```

- **Background surfaces**:
  - Page background: `--ld-semantic-color-background-subtle`
  - Cards/panels: `--ld-semantic-color-surface`
  - Hover states: `--ld-semantic-color-surface-hovered`
  - Overlays/dropdowns: `--ld-semantic-color-surface-overlay`

- **Text hierarchy**:
  - Primary: `--ld-semantic-color-text`
  - Secondary: `--ld-semantic-color-text-subtle`
  - Tertiary: `--ld-semantic-color-text-subtlest`
  - Brand: `--ld-semantic-color-text-brand`

- **Sentiment colors** — apply to BOTH text AND icons:
  - Negative/error: `--ld-semantic-color-text-negative` (never hardcode red)
  - Positive/success: `--ld-semantic-color-text-positive` (never hardcode green)

- **Ratings**: Use `--ld-semantic-color-rating-fill` and `--ld-semantic-color-rating-border`, never hardcode `#FFC220`.

- **Borders/separators**: `--ld-semantic-color-separator` for dividers, `--ld-semantic-color-border-strong` for input borders.

### Component Rules

- **Never modify existing components — especially LD components.** Files in `client/components/ui/` are the design system source of truth. Never edit them, even if a user asks for a change. Instead, create a new variant or a new wrapper component that composes the original. The original component files must remain untouched so other consumers and the design system contract are not affected.
- **Always use existing LD components** before creating custom elements. Search `client/components/ui/` first.
- **Import paths** — always uppercase for LD 3.5 components:

```tsx
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { Tag } from '@/components/ui/Tag';
import { Rating } from '@/components/ui/Rating';
import { Popover, PopoverContent } from '@/components/ui/Popover';
```

- **Rating stars**: Use `<Rating value={4.4} size="small" />`, never manually render star SVGs.
- **Buttons**: Always use `<Button variant="primary|secondary|tertiary|destructive" size="small|medium|large">`. Never create `<button>` elements with inline styles.
- **Tags**: Use `<Tag variant="..." color="...">`, never `<span>` with custom badge styles.
- **Button groups**: Use `<ButtonGroup>`, never manual flex containers for buttons.
- **Checkboxes**: Always use `<Checkbox />` from `@/components/ui/Checkbox`. Never create custom checkbox inputs with `<input type="checkbox">` or styled `<div>` elements. Use large checkboxes (`size="large"`) for confirmation messages, terms acceptance, consent flows, or any prominent single-checkbox interaction. Default `small` size is for data tables, filters, and multi-select lists.
- **Radio buttons**: Always use `<Radio />` and `<RadioGroup />` from `@/components/ui/Radio` and `@/components/ui/RadioGroup`. Never create custom radio inputs with `<input type="radio">`, styled circles/dots, or custom toggle groups.
- **DataTable (No Exceptions)**:
  - Never create custom/hardcoded `<table>` elements. All tabular data must use the DataTable component system.
  - New cell variants are allowed (following existing patterns), but net-new table structures are forbidden.
  - Rounding: standalone DataTables use the `rounded` prop. DataTables inside cards/containers should NOT use `rounded` — the parent card provides the frame.
  - **Never customize DataTable colors or visual styling.** DataTable must look identical everywhere. Even if a Figma design shows alternate row colors, tinted headers, striped rows, or any color variation — ignore those differences and use the default DataTable styling. Do not override with custom backgrounds, border colors, font colors, or `UNSAFE_className`/`UNSAFE_style` overrides.
- **Tabs (No Exceptions)**: Never create custom tab components. Always use `Tabs`, `TabList`, `Tab`, `TabPanel` from the Tab component.
- **Links (No Exceptions)**: Never create raw `<a>` tags or custom hyperlink styles. All text links must use the LD `Link` component. Variants: `default` (brand-colored), `subtle` (gray), `white` (for dark backgrounds). The Link component auto-detects internal vs external links.
- **Button Width (No Exceptions)**: If a button hugs its text in Figma, use the default Button behavior — no `isFullWidth`, no width overrides. If a button is full-width in Figma, use `<Button isFullWidth>`. Never force button widths with inline styles, custom classes, or `UNSAFE_style`. The only two width modes are: default (hug text) and `isFullWidth` (stretch).
- **Side Navigation (No Exceptions)**: Always use the existing `AppSidebar` component from `@/components/ui/AppSidebar`. Never create a new sidebar or side navigation component. When building new pages, pass different `menuItems` to configure the links and content — do not duplicate or recreate the sidebar structure. The same applies to `SideNavigation` and `SideNavigationItem` for secondary navigation patterns.
- **Overlays — Popovers, Dropdowns, Tooltips, Dialogs (No Exceptions)**:
  - All overlay elements must render on top of everything and never be clipped or cut off.
  - Always use LD portal-based components (`Popover`, `Modal`, `Menu`, `Select`) which portal to `document.body` and escape `overflow: hidden` ancestors.
  - Never set `overflow: hidden` on containers holding overlay triggers unless the overlay portals out.
  - Never create custom absolute-positioned dropdown menus.

### File Naming Conventions

| File type | Convention | Examples |
|---|---|---|
| All UI components (LD 3.5) | **PascalCase** | `Button.tsx`, `Dialog.tsx`, `Modal.tsx`, `Popover.tsx` |
| CSS modules | **PascalCase** (match component) | `Button.module.css`, `DataTable.module.css` |
| Pages | **PascalCase** | `Index.tsx`, `Catalog.tsx` |
| Page CSS modules | **camelCase** | `detailItem.module.css` |
| React hooks | **camelCase** with `use` prefix | `useMobile.tsx`, `useSnackbar.ts` |
| Context files | **PascalCase** | `ThemeRegistry.ts` |
| Feature utilities | **PascalCase** | `MartyUtils.ts` |
| Example files | **PascalCase** + `Example` suffix | `ButtonExample.tsx`, `TabExample.tsx` |
| Token CSS files | **lowercase** | `semantic.css`, `primitive.css` |

### Styling Rules

- **Always use CSS Modules** (`.module.css`), never inline `style={{}}` for layout or colors.
- Inline styles are only acceptable for truly dynamic values (e.g., calculated widths).
- **Standard spacing**: Use 8px multiples (8, 16, 24, 32, 48px). Use `var(--ld-semantic-spacing-*)` or `var(--ld-primitive-scale-space-*)` tokens when available.
- **Responsive breakpoints** (standard across all pages):
  - `1024px` — tablet
  - `768px` — small tablet
  - `480px` — phone
  - Padding reduces: `24px → 16px → 12px` across breakpoints
- **Font family**: Always `var(--ld-semantic-font-family-sans)` or specific semantic font tokens like `var(--ld-semantic-font-heading-large-family)`. Never let text fall back to browser serif defaults.
- **Border radius**: Use `var(--ld-primitive-scale-borderradius-100, 8px)` for cards, `9999px` for pills/circles.
- **Box shadows** for elevated cards: `0 -1px 2px 0 rgba(0,0,0,0.10), 0 1px 2px 1px rgba(0,0,0,0.15)`.

## Purchase History & Account Page Patterns

### Side Navigation Padding

Collapsible section headers and action rows (e.g., Sign out) in account side navigation must have **zero horizontal padding** so their text aligns flush with the nav item text below them:

```css
/* ✅ CORRECT — 0 left/right padding on collapsible header buttons */
.collapsibleHeader {
  padding: 12px 0;
}

/* ✅ CORRECT — 0 left/right padding on sign-out row */
.signOutRow {
  padding: 12px 0;
}

/* ❌ WRONG — 12px horizontal padding misaligns with nav items */
.collapsibleHeader {
  padding: 12px var(--ld-primitive-scale-space-150, 0.75rem);
}
```

### Order Card Layout

Order card meta sections use the **icon-left / text-column-right** pattern. See `RULE_CardMetaLayout.mdc` for full details.

```tsx
// ✅ CORRECT — location nested inside chip text column
<span className={styles.orderTypeChip}>
  <img src="/assets/illustrations/mono-small/fulfillment-pickup.svg" width={64} height={64} aria-hidden="true" />
  <span className={styles.orderTypeChipText}>
    <span>Curbside pickup</span>
    {location && <span className={styles.location}>{location}</span>}
  </span>
</span>

// ❌ WRONG — location as a sibling disconnects it from the icon
<span className={styles.orderTypeChip}>...</span>
<span className={styles.location}>Carrollton Supercenter...</span>
```

### SVG Fulfillment Icons

- Always host SVG pictograms locally in `/public/illustrations/mono-small/`
- Render fulfillment icons at **64×64** — never smaller
- Never use CDN URLs with `?format=webp` for SVG files (causes blur)
- See `RULE_SVGAssets.mdc` for full management rules

### Review Prompt Carousel (ReviewPromptBanner)

When implementing a product review prompt carousel:
- **CTA card**: Fixed `width: 300px`, `flex-shrink: 0`. Illustration is `position: absolute; right: 0; bottom: 0; width: 110px`
- **Product cards**: `flex: 1 1 0`, `width: auto`, equal height via `align-items: stretch` on the card row
- **Rating stars**: Always use `<Rating value={x} size="small" />` — never custom SVG stars
- **Desktop layout**: Horizontal scrollable row; **Mobile layout**: Swipeable carousel with pagination dots

### AmendsBanner (Order Edit Countdown)

When an order has an editing window, use an amber-background banner (`#FFF3C4`) with:
- `CartArrow` icon from `@/components/icons` (never create a custom cart+timer SVG)
- Message text on the left, link CTA on the right
- Fixed height: 48px
- Use the existing `<Link underline>` component for the CTA

### Builder.io Editor Inline Style Overrides

The Builder.io visual editor injects inline styles (e.g., `max-width: 900px !important`) on elements when they are selected or edited in the editor UI. These styles are persisted by the fusion system and can override CSS module rules.

**To counter them, add `!important` to the CSS module property:**

```css
/* ✅ Overrides Builder editor's inline max-width injection */
.content {
  width: 100% !important;
  max-width: none !important;
}
```

This is not a hack — it's the correct pattern when working alongside the visual editor. Apply it to any layout property that the editor persistently overrides.

---

## Prompting Fusion — Quick Reference

Use these patterns to get precise output the first time. Most iteration comes from three missing pieces: token names, responsive scope, and animation intent.

### The Three Must-Haves in Every Prompt

**1. Token, not hex**
```
// Wrong
"gray background"

// Right
"background: var(--ld-semantic-color-background-subtle)"
```

**2. Responsive scope**
```
// Wrong
"add padding on top"

// Right
"mobile only (<768px): add padding-top: 16px to .mobile section"
```

**3. Animation feel**
```
// Wrong
"animate it"

// Right
"spring bounce like iOS — cubic-bezier(0.34, 1.56, 0.64, 1), 350ms"
```

---

### Prompt Template — Visual Change

```
Component: [file path if known, e.g. client/components/walmart/purchase-history/OrderCard.module.css]
Element: [CSS class or element description]
Breakpoints affected: [desktop only ≥1024px | mobile only <768px | both]

Changes:
- [property]: [value using token name, not hex]
- [property]: [value]

Reason / intent: [one line — e.g. "order total row needs to feel like a footer tray"]
```

### Prompt Template — Interactive Component

```
Component: [Name] at [file path]
Breakpoint: [mobile only | desktop only | both]

Behavior:
- Trigger: [click | scroll | auto | on mount]
- Animation feel: [spring | ease | instant | bounce — describe it]
- Animation timing: [Nms]
- Navigation: [navigates to /path after Nms delay | stays on page]

Auto-advance (if carousel):
- Interval: [N]ms
- Pause on: [hover | touch | both]
- Resume: [immediately | after Nms]

Touch targets:
- Min tap size: 44×44px (use padding + ::before for small visual elements)
```

### Prompt Template — Data / Content Update

```
Page: [route]
Component: [file path]

Update:
- [field name]: "[old value]" → "[new value]"
- Dates: [year to use, include year in text or not]
- Names: [real name or randomize]
- Addresses: [real or plausible fake]
```

### Prompt Template — Navigation / Routing

```
Page: [route where this nav lives]
Component: BottomNav / [component]

Active tab: "[tab name]" should be active on this page
Tab click behavior:
- [Tab label] → navigates to [/path], delay [N]ms so animation plays first
- [Tab label] → [no navigation | navigates to /path]
```

---

### Shadow / Elevation Gotcha

If cards with `box-shadow` are inside a scrollable container (`overflow-x: auto`), shadows **will be clipped** unless you add vertical padding *inside* the scroll container. Never wrap a scroll container with `overflow: hidden` to fix it — that makes clipping worse.

```
// Correct prompt
"The carousel has card elevation. Add padding: 8px 16px to the .carousel
element itself (not a wrapper) so top/bottom shadows render without clipping."
```

---

## Designer Getting Started — Figma Best Practices (HARD RULES)

These rules ensure Figma designs translate cleanly into code. Designers MUST follow these before handing off.

### 1. Always use Auto Layout

Never use absolute positioning or free-floating layers. Every frame, section, and component must use Figma's Auto Layout so the AI can infer the correct flexbox/grid structure. Absolute layers are ignored or misinterpreted during export.

### 2. Always make images exportable

Mark every image, illustration, and icon layer as exportable in Figma (right panel → Export section → add an export setting). If an image isn't marked exportable, the AI cannot extract it and will render a blank placeholder.

### 3. Be explicit in annotations

Don't assume the AI will guess interactions. Spell out:
- **Hover states** — what changes on hover (color, shadow, underline, etc.)
- **Click/tap behavior** — what happens on click (navigate to X, open modal, toggle state)
- **Error and loading states** — show separate frames for error, empty, and loading variations
- **Transitions/animations** — describe any motion (e.g., "slide in from right, 200ms ease")

Use Figma comments or a dedicated annotations layer to document these.

### 4. Name layers and artboards sequentially

Use clear, sequential naming for screens and frames:
- `01 — Login`, `02 — Dashboard`, `03 — Settings`
- `Button / Primary / Default`, `Button / Primary / Hover`, `Button / Primary / Loading`

Sequential naming helps the AI process multi-screen exports in the correct order and understand state progressions.

### 5. All screens must hug content, never clip

Set every top-level frame to **"Hug contents"** rather than a fixed size with clipping. If a frame clips its content, anything outside the visible bounds is invisible to the AI and will be lost in the export. Scroll regions should be annotated, not simulated by clipping.

### 6. Use actual LD Components, never fake them

- **Do not** group shapes, rectangles, and text to mimic a Button, Tag, Chip, or any other Living Design component. The AI relies on the Figma component name (e.g., `WCP / Button`) to map it to the correct code component (`<Button />`).
- **Never detach** a component instance. Detached instances lose their component metadata and the AI treats them as anonymous layers.
- If the component you need doesn't exist in the LD library, annotate it clearly (e.g., "Custom component — not in LD") so the AI knows to build it from scratch rather than attempting a faulty match.

### Pre-Launch Designer Checklist

Answer these before handing off to engineering or Fusion. Unanswered questions = iteration rounds.

#### Layout & Spacing
- [ ] What padding does this section inherit from its parent? Does any part need to break out of it (full-bleed / negative margin)?
- [ ] Which breakpoints does this change apply to? (Desktop only ≥1024px / mobile only <768px / both)
- [ ] Does any card or section inside a scroll area have elevation? (Shadow clipping risk — must be flagged)

#### States & Interactions
- [ ] What are ALL states? (default, hover, active, disabled, loading, empty, error)
- [ ] What triggers any animation? (click, scroll, auto-advance, on mount)
- [ ] What does the animation FEEL like? (spring bounce, ease, instant, elastic)
- [ ] Does this auto-advance? Pause on hover? Pause on touch? Resume after how long?
- [ ] Do any tabs or buttons navigate to another page? Which route?
- [ ] Which tab in the bottom nav is active on this page?

#### Touch & Accessibility
- [ ] Are all tap targets at least 44×44px? (Dots, chips, icon buttons)
- [ ] Does this need keyboard navigation or screen reader labels?

#### Data & Content
- [ ] Are dates relative to today? Include the year in the label or not?
- [ ] Should names and addresses be real, randomized, or from a user profile?
- [ ] What's the max content length before text truncates?

#### Components & Tokens
- [ ] Is this an existing LD component or a new pattern?
- [ ] What semantic token maps to each color shown in the design?
- [ ] Does this duplicate an existing component anywhere in the codebase?

---

### Onboarding & Support

- **Figma onboarding to Fusion**: https://www.figma.com/slides/qZtLPYOsWk3uhWGC24iGRx/Builder-Demo?node-id=9-1277&t=tD5pX6YDZskvrDLP-0
- **Slack support**: #builderio-support — https://walmart.enterprise.slack.com/archives/C09AZQZPD9D

---

## New Rules — Added 2025-02-28

Seven new rules have been added to `guidelines/rules/`. These are enforced by the pre-task protocol via `RULES_INDEX.mdc`.

### Rule 15 — WCP Component Creation (`RULE_WCPComponentCreation.mdc`)
- **LD components** live in `client/components/ui/` — design-system primitives
- **WCP components** live in `client/components/walmart/` — Walmart product-level, built on top of LD primitives
- WCP uses visual-theme variants: `default | brand | inverse` (never `primary | secondary`)
- Variant classes via array join: `[styles.banner, styles[variant]].filter(Boolean).join(' ')`
- Render as `<button>` when `onClick` provided, `<div>` otherwise
- Named export only; requires Component Library page + route + Overview.tsx entry + i18n keys
- Does NOT require ComponentPropertyTester sandbox entry or 10-step LD process

### Rule 16 — Carousel and Scroll Patterns (`RULE_CarouselAndScrollPatterns.mdc`)
- **Pattern 1** (scroll snap): `overflow-x: auto`, `scroll-snap-type: x mandatory`, `scrollbar-width: none` — no JS needed
- **Pattern 2** (auto-advance): `setInterval` with `useRef`, pause on user interaction, `IconButton` with `aria-label` for prev/next
- `headlineParts?: string[]` for multi-line headlines — render each in `<span style={{ display: 'block' }}>`
- `objectPosition` applied as inline style (dynamic per slide)
- `UNSAFE_className` acceptable for circular `IconButton` nav controls
- Always add `prefers-reduced-motion: reduce` override

### Rule 17 — Inline Style vs CSS Module (`RULE_InlineStyleVsCSSModule.mdc`)
- CSS modules for ALL static values (variants, states, tokens, spacing, typography)
- Inline styles ONLY for truly dynamic per-instance values: `objectPosition`, drag width, tooltip coordinates, progress percentage
- When using tokens inline, always include fallback: `var(--ld-semantic-color-text-positive, #1A7A34)`
- Never hardcode hex colors inline; never put spacing/font/border-radius inline

### Rule 18 — Animation and Motion (`RULE_AnimationAndMotion.mdc`)
- EVERY animation MUST have `@media (prefers-reduced-motion: reduce)` override — no exceptions
- `@keyframes` for multi-step sequences; `transition` for 2-state hover/focus
- Canonical "new item" glow: `0 0 0 2px #1A7A34, 0 0 24px 6px rgba(26, 122, 52, 0.30)`, 2.5s ease-in-out
- Standard durations: 150ms (micro), 250ms (standard), 400ms (complex)
- Never create a custom spinner — use the existing `Spinner` component

### Rule 19 — Data-Driven Components (`RULE_DataDrivenComponents.mdc`)
- Static demo data in the SAME `.tsx` file as the component, above the component function
- Array names: `UPPER_SNAKE_CASE` (e.g., `PRODUCTS`, `SLIDES`, `ORDERS`)
- Always define a TypeScript interface for the data shape
- `headlineParts?: string[]` for multi-line text — never `\n` in strings
- Use Walmart CDN or local illustration URLs — never placeholder.com or picsum

### Rule 20 — Component Variant Naming (`RULE_ComponentVariantNaming.mdc`)
- Action-intent (LD): `primary | secondary | tertiary | destructive` — Button, IconButton only
- Visual-theme (WCP): `default | brand | inverse` — banners, callouts, promo components
- Status/sentiment: `success | warning | error | info | neutral` — Tag, Alert, Badge
- Always string union type (never enum); always optional with default; always `styles[variant]` for class mapping

### Rule 21 — Walmart Page Composition (`RULE_WalmartPageComposition.mdc`)
- Page files MUST NOT render shell components (`DesktopHeader`, `MobileTopNav`, `SubNav`, `BottomNav`) — already provided by layout
- Standard stacking: Hero → Promotional rows → Section headers → Content grids → Inline ad banners
- Full-bleed sections: `width: 100%; overflow: hidden` — never `max-width`
- Padded content: `24px 32px` → `20px 24px` → `16px` → `12px` across breakpoints
- Never add `max-width` or `margin: 0 auto` to full-bleed sections or `BottomNav`

---

## Design System Package Ingestion Process

When a designer drops a new design system package into the project:

1. Create a staging folder `design-system-package/` at project root
2. Read ALL documentation in the package before touching any files
3. Reorganize files to match the project's existing structure:
   - Components → `client/components/ui/`
   - Icons → `client/components/icons/`
   - Tokens → `public/styles/themes/` (runtime) and `client/styles/themes/base/` (build-time base only)
   - Docs → `guidelines/`
4. Replace old components with new ones, checking for breaking API changes and updating all usages
5. Clean up: delete the staging folder, remove duplicates, remove markdown from component folders, run typecheck
6. Report a summary of what was added, updated, or removed

---

### Figma Import Rules (HARD RULES — NO EXCEPTIONS)

#### Design System First (CRITICAL)

When implementing any Figma design, you MUST use the existing Living Design 3.5 design system. **Never hardcode colors, text styles, or tokens.**

- **Colors**: Every color in the Figma design maps to an `ld-semantic-color-*` token. Use `var(--ld-semantic-color-*)` in CSS — never write hex values like `#0071DC`, `#2E2F32`, `rgba(46,47,50,1)`, etc. Even if the Figma export includes raw hex/rgba values in inline styles, always replace them with the corresponding semantic token.
- **Typography**: Every font in the Figma design maps to `ld-semantic-font-*` tokens. Use `var(--ld-semantic-font-body-small-family)`, `var(--ld-semantic-font-body-small-size)`, `var(--ld-semantic-font-body-small-weight-alt)`, etc. Never hardcode `font-family: 'Everyday Sans UI'`, `font-size: 14px`, or `font-weight: 700` directly — wrap them in token variables with fallbacks.
- **Spacing & Sizing**: Use `var(--ld-primitive-scale-space-*)` or `var(--ld-semantic-spacing-*)` tokens. Never use arbitrary pixel values for padding, gap, or margins.
- **Border radius**: Use `var(--ld-primitive-scale-borderradius-*)` tokens. For pill shapes use `var(--ld-primitive-scale-borderradius-round, 9999px)`.
- **Border widths**: Use `var(--ld-primitive-scale-borderwidth-*)` tokens, not raw `1px` or `2px`.
- **Icon sizes**: Use `var(--ld-semantic-scale-icon-small)`, `var(--ld-semantic-scale-icon-medium)`, `var(--ld-semantic-scale-icon-large)` — never hardcode `16px`, `24px`, `32px`.

```css
/* ❌ WRONG — hardcoded from Figma export */
.button {
  background: #0071DC;
  color: #FFFFFF;
  font-family: 'Everyday Sans UI', sans-serif;
  font-size: 14px;
  font-weight: 700;
  border-radius: 1000px;
  padding: 0 12px;
  gap: 4px;
}

/* ✅ CORRECT — mapped to design tokens */
.button {
  background: var(--ld-semantic-color-action-fill-primary);
  color: var(--ld-semantic-color-action-text-onfill-primary);
  font-family: var(--ld-semantic-font-body-small-family);
  font-size: var(--ld-semantic-font-body-small-size);
  font-weight: var(--ld-semantic-font-body-small-weight-alt);
  border-radius: var(--ld-primitive-scale-borderradius-round, 9999px);
  padding: 0 var(--ld-primitive-scale-space-300, 12px);
  gap: var(--ld-primitive-scale-space-100, 4px);
}
```

#### Figma Component → Code Component Mapping

When a Figma layer is named `[WCP] Button`, `[WCP] Loading Button`, `[LD 3.5] Plus`, etc., it maps directly to an existing LD component. **Always use the existing component** — never rebuild it from scratch with raw HTML elements.

| Figma Component Name | Code Component |
|---|---|
| `[WCP] Button` / `[WCP] Loading Button` | `<Button>` from `@/components/ui/Button` |
| `[WCP] Quantity Stepper *` | Build as wrapper — never hardcode colors |
| `[WCP] Segmented Control` | Build as wrapper — use LD tokens for all states |
| `[LD 3.5] Plus` / `[LD 3.5] Minus` | Use existing icon components or SVG with token fills |
| `[WCP] Generic Spinner` | Use existing spinner or build with token-based gradients |

#### General Figma-to-Code Rules

- **Convert absolute positioning** from Figma to flexbox/grid layouts. Never use `position: absolute` for page layout.
- **Map Figma token names** directly to CSS custom properties: Figma `ld-semantic-color-text` → CSS `var(--ld-semantic-color-text)`.
- Figma inline `style=""` attributes represent design intent, not code format — always convert to CSS module classes.
- **Preserve SVGs exactly** as designed unless an identical icon already exists in `@/components/icons`.
- **Circular images/flags**: Use SVG with `<clipPath>` circles, not `border-radius` on `<img>`.
- When Figma shows multiple frames/breakpoints, implement one responsive component that handles all breakpoints via CSS media queries, not separate components.
- **State tokens**: Figma hover/focus/pressed/disabled states use semantic state tokens (e.g., `ld-semantic-color-action-fill-primary-hovered`). Always map these to `var(--ld-semantic-color-action-fill-primary-hovered)` in `:hover` pseudo-classes — never approximate with `opacity` or manual color darkening.

### File Organization

- Break complex pages into smaller component files under `client/features/[feature]/`.
- Each page gets its own CSS module in `client/styles/`.
- UI primitives go in `client/components/ui/` with their own `.module.css`.
- Check `guidelines/` folder for component documentation before creating new components.

### Page Section Spacing (HARD RULE — No Exceptions)

Every page — component-library pages, Walmart pages, settings pages — MUST have consistent vertical spacing between all sections and components. Sections must never visually butt up against each other with no breathing room.

- **Always set `gap` on flex-column page layouts.** If a page's content wrapper uses `display: flex; flex-direction: column`, it MUST have a `gap` property (minimum `var(--ld-primitive-scale-space-800, 32px)` between major sections). Never rely on children to space themselves with individual margins.
- **New sections inherit the page's gap automatically** when the parent uses `gap`. Do not add redundant `margin-top` if the parent already provides it.
- **If the parent does NOT use `gap`**, add explicit `margin-top` or `padding-top` that matches the existing rhythm of the page. Check the CSS module for the page's established spacing pattern and replicate it exactly.
- **Separators need breathing room.** Separator elements (borders, `<hr>`, divider components) must have vertical padding or margin on both sides — never render a separator flush against the content above or below it.
- **Demo/preview frames need internal padding.** When rendering a component inside a preview frame (e.g., `<div className={styles.frame}>`), the frame must have internal padding so the component doesn't touch the frame edges.
- **Never stack two `<div>` sections with zero spacing.** If two sibling sections render back-to-back with no gap, margin, or padding between them, that is a bug. Fix it before considering the task complete.

```css
/* ✅ CORRECT — page layout with consistent gap */
.page {
  display: flex;
  flex-direction: column;
  gap: var(--ld-primitive-scale-space-800, 32px);
}

/* ✅ CORRECT — sections inside a gap-based parent need no extra margin */
.section {
  display: flex;
  flex-direction: column;
  gap: var(--ld-primitive-scale-space-400, 16px);
}

/* ❌ WRONG — no gap, sections butt up against each other */
.page {
  display: flex;
  flex-direction: column;
  /* missing gap! */
}

/* ❌ WRONG — separator flush against content */
.separator {
  height: 1px;
  background: var(--ld-semantic-color-separator, #e3e4e5);
  /* no margin or padding above/below */
}
```

### Common Mistakes to Avoid

```tsx
// ❌ WRONG — hardcoded colors
<div style={{ backgroundColor: '#F8F8F8', color: '#2E2F32' }}>

// ❌ WRONG — max-width constraining page content
.contentContainer { max-width: 1280px; margin: 0 auto; }

// ❌ WRONG — centering page content instead of stretching
.contentArea { align-items: center; }

// ❌ WRONG — custom button with inline styles
<button className="bg-blue-500 px-4 py-2 rounded-full">Click</button>

// ❌ WRONG — manual star rendering
<StarFill style={{ color: '#FFC220' }} />

// ✅ CORRECT — tokens in CSS modules
.container { background: var(--ld-semantic-color-background-subtle, #f8f8f8); }

// ✅ CORRECT — full-width content
.contentArea { align-items: stretch; }

// ✅ CORRECT — use LD Button component
<Button variant="primary" size="medium">Click</Button>

// ✅ CORRECT — use LD Rating component
<Rating value={4.4} size="small" />

// ❌ WRONG — primitive token directly in component CSS (bypasses theming)
// .nav { background: var(--ld-primitive-color-blue-10); }

// ❌ WRONG — hardcoded hex even with a fallback comment
// .banner { background: #EBF1FF; /* brand-subtle */ }

// ✅ CORRECT — semantic token in CSS module (themes automatically)
// .nav { background: var(--ld-semantic-color-fill-brand-subtle, #EBF1FF); }
```

### Theme Compliance — Pre-Completion Requirement

**Every new component and page MUST pass a theme compliance check before it is considered done.**

See `guidelines/rules/RULE_ThemeCompliance.mdc` for the full rule. Key checks:

1. Zero hardcoded hex colors in component/page CSS
2. Zero `--ld-primitive-color-*` references in component CSS
3. Zero hardcoded `font-size`, `padding`, `border-radius` values (use token vars)
4. Switch to Bodega (green) theme → brand colors must be green, not blue
5. Switch to Walmart Legacy theme → verify correct rendering

```bash
# Run before completing any component work:
grep -rn "#[0-9a-fA-F]\{6\}" client/components/ client/pages/ --include="*.css"
grep -rn "ld-primitive-color-" client/components/ client/pages/ --include="*.css"
```
