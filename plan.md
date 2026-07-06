# Plan: Getting Started Section Overhaul

## Current State
- **Overview** (`Overview.tsx`): Lists ~75 components as cards with preview thumbnails. Uses `getComponentPreview()` for rendering live mini-previews. Has search, theme switcher, and section grouping (LD / Shared / Patterns).
- **Getting Started** (`GettingStarted.tsx`): 4 tabs — Designer, Developer, Agent, Component Designer. Heavy inline content, no lazy loading.
- **Guidelines** (`Guidelines.tsx`): 8 tabs — Overview, Principles, Component Usage, Accessibility, Code Standards, Token Usage, Agent Rules, Doc Index. All tabs imported eagerly.
- **Foundations** (`Foundations.tsx`): 2 tabs — Themes & Tokens, Project Token Usage. Token rows are large (40px height each), taking lots of vertical space.
- **No Assets page** exists. Illustrations (87 spot SVGs), product images (16), icons (313), and logos (3) are scattered across `public/`.

## Plan

### 1. Overview Page — Show All Components with Live Previews
**File**: `client/pages/component-library/Overview.tsx`, `Overview.module.css`

**Changes**:
- Ensure every component in `componentSections` has a corresponding entry in `PREVIEW_MAP` (in `ComponentCardPreviews.tsx`). Audit for missing previews and add them.
- For components that currently fall through to `GenericPreview` (icon-only placeholder), create simple live previews showing the component in its simplest form (e.g., a single `<Dialog>` trigger, a `<QuantityStepper>`, a `<WCPFlag>`, etc.).
- Add missing WCP components to the overview that exist in the sidebar but not in `componentSections` (e.g., WCP Country, WCP Flag, WCP Rating, WCP Queue Banner, WCP Upload Image, WCP Signature Capture).
- Move inline styles to `Overview.module.css` for the theme switcher bar, search bar, and grid sections.

**New files**:
- Update `client/pages/component-library/previews/LDComponentPreviews.tsx` — add missing preview components
- Update `client/pages/component-library/ComponentCardPreviews.tsx` — register new previews

### 2. Getting Started — Updated Role-Based Guides + Product Manager Tab
**File**: `client/pages/component-library/GettingStarted.tsx`

**Changes**:
- Add a new **Product Manager** tab alongside Designer, Developer, Agent, Component Designer.
- Implement lazy loading for all tab content using `React.lazy()` + `<Suspense>` with a Spinner fallback. Each tab panel only loads its content when selected.
- Update the Designer tab content with clearer workflow steps focused on using the kit with Figma and AI tools.
- Update Developer tab to reflect current project structure accurately.

**New file**: `client/pages/component-library/GettingStartedProductManager.tsx`
- PRD template section with a structured template for writing product requirements that reference the design system
- "How to write a SKILL PRD" guidance — sections, acceptance criteria, component mapping
- Workflow: PRD → Designer → Developer handoff process
- Quick-reference table of available components grouped by use case (forms, navigation, feedback, data display)
- Tips for writing requirements that reference LD 3.5 components by name
- Checklist: what to include in a PRD for UI features

### 3. Guidelines — Update with Current Rules
**File**: `client/pages/component-library/Guidelines.tsx`, `guidelines-tabs/*.tsx`

**Changes**:
- Lazy-load all 8 tab panels using `React.lazy()` + `<Suspense>`.
- Update tab content to reflect the latest rules from `guidelines/rules/`:
  - **Component Usage tab**: Add carousel overflow rule, interactive frame tooltip clipping pattern, QuantityStepper usage patterns
  - **Code Standards tab**: Add CSS module vs inline style rules, file naming conventions
  - **Token Usage tab**: Add separator token rule (never use `border-subtle` for dividers), primitive token prohibition
  - **Accessibility tab**: Add "never disable buttons" rule
- Keep existing tab structure but refresh content.

### 4. Foundations — Compact Token Rows
**File**: `client/pages/component-library/DesignTokens.tsx`

**Changes**:
- Reduce `ColorRow` height from 40px swatch + padding to a compact 24px swatch with tighter padding (row height ~32px instead of ~52px).
- Reduce `ValueRow` padding similarly.
- Change the grid from `minmax(320px, 1fr)` to `minmax(260px, 1fr)` to fit more columns.
- Reduce font size in token rows from 12px to 11px for names, keep descriptions at 11px.
- Add a "compact/expanded" toggle button so users can switch between the current spacious view and the new compact view.
- This allows 2-3x more tokens visible without scrolling.

### 5. New Assets Page — Illustrations, Product Images, Icons
**New file**: `client/pages/component-library/Assets.tsx`, `Assets.module.css`

**Structure** — 3 tabs with lazy-loaded content:

**Tab 1: Illustrations** (87 spot SVGs from `public/illustrations/spot-illustration/`)
- Grid of all SVG illustrations with filename labels
- Click to copy the path (`/illustrations/spot-illustration/Filename.svg`)
- Search/filter by name
- Show SVGs at consistent 64×64 size with proper alt text

**Tab 2: Product Images** (16 images from `public/images/products/`)
- Grid of product photos with filenames
- Click to copy import path
- Show at consistent thumbnail size

**Tab 3: Icons** 
- Link to existing `/component-library/icons` page (don't duplicate — just provide a card/link since the Icons page already has a comprehensive searchable grid of all 313 icons)

**Registration**:
- Add route in `client/App.tsx`: `<Route path="assets" element={<AssetsPage />} />`
- Add nav entry in `ComponentLibraryLayout.tsx` under the Getting Started section:
  `{ id: 'assets', nameKey: 'componentLibrary.navAssets', path: '/component-library/assets' }`
- Add i18n key for the nav label

### 6. Performance — Lazy Loading Throughout
**Files**: `client/App.tsx`, all Getting Started section pages

**Changes**:
- Convert all Getting Started section page imports in `App.tsx` to use `React.lazy()` if not already.
- Within pages that use tabs (Getting Started, Guidelines, Foundations), wrap each `<TabPanel>` content in `<Suspense>` with a `<Spinner>` fallback.
- This means tab content modules are only downloaded when the user clicks that tab.
- The Overview page grid already renders quickly since previews are small; no changes needed there beyond ensuring preview components are lightweight.

### 7. Navigation Cleanup
**File**: `client/components/ComponentLibraryLayout.tsx`

**Changes**:
- Add "Assets" to the Getting Started nav section (after Foundations).
- Ensure the nav order is: Overview → Getting Started → Guidelines → Foundations → Assets.

## Implementation Order
1. **Foundations compact rows** (smallest, self-contained change)
2. **Assets page** (new page, no existing dependencies)
3. **Overview audit** (add missing previews/components)
4. **Getting Started + Product Manager tab** (new tab + lazy loading)
5. **Guidelines refresh** (update tab content)
6. **Lazy loading pass** (wrap all tabs across all pages)
7. **Navigation cleanup** (final sidebar update)

## Files Modified (summary)
| File | Action |
|---|---|
| `client/pages/component-library/DesignTokens.tsx` | Compact row layout |
| `client/pages/component-library/Assets.tsx` | **NEW** — Assets page |
| `client/pages/component-library/Assets.module.css` | **NEW** — Assets styles |
| `client/pages/component-library/Overview.tsx` | Add missing components, move styles to CSS module |
| `client/pages/component-library/Overview.module.css` | Add new styles |
| `client/pages/component-library/ComponentCardPreviews.tsx` | Register missing previews |
| `client/pages/component-library/previews/LDComponentPreviews.tsx` | Add missing preview components |
| `client/pages/component-library/GettingStarted.tsx` | Add PM tab, lazy load all tabs |
| `client/pages/component-library/GettingStartedProductManager.tsx` | **NEW** — PM guide |
| `client/pages/component-library/Guidelines.tsx` | Lazy load tabs |
| `client/pages/component-library/guidelines-tabs/*.tsx` | Update content with latest rules |
| `client/pages/component-library/Foundations.tsx` | Lazy load tabs |
| `client/App.tsx` | Add Assets route, lazy imports |
| `client/components/ComponentLibraryLayout.tsx` | Add Assets nav entry |
| `client/locales/en/common.json` | Add i18n keys |
