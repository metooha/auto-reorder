# Rule: Responsive Layout & Page Structure

**When**: Creating ANY new page, view, or layout component

**Enforcement Level**: CRITICAL — All new pages MUST follow these patterns

---

## Page Shell Structure

Every page MUST use the standard shell: `MastHead` + `AppSidebar` + scrollable `<main>`.

### Using CSS Modules (preferred)

```css
/* page.module.css */
.root {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.appRow {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.main {
  flex: 1;
  overflow-y: auto;
  background-color: var(--ld-semantic-color-fill-surface-subtle, #F8F8F8);
}
```

### Using Inline Styles (acceptable for simple pages)

```tsx
<div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
  <MastHead />
  <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
    <AppSidebar menuItems={menuItems} />
    <main style={{ flex: 1, overflowY: 'auto' }}>
      {/* page content */}
    </main>
  </div>
</div>
```

---

## Content Container

All page content MUST fill the full available width within the shell. **Never use `max-width` constraints** on page content containers.

```css
.contentContainer {
  width: 100%;
  padding: 24px;
}
```

For landing/overview pages with more breathing room:

```css
.pageContent {
  width: 100%;
  padding: 32px 32px 48px;
}
```

Use `align-items: stretch` (not `center`) on flex column containers that hold page content.

---

## Breakpoints

Use these three breakpoints consistently. Do NOT invent new breakpoints.

| Breakpoint | Target | Padding | Columns |
|------------|--------|---------|---------|
| `> 1024px` | Desktop | `24px–32px` | Full grid (3–4 cols) |
| `<= 1024px` | Tablet | `20px–24px` | Reduced grid (2 cols) |
| `<= 768px` | Small tablet | `16px` | Single column, stacked layout |
| `<= 480px` | Phone | `12px` | Single column, compact |

---

## Responsive Rules by Layout Type

### Single-column content page (e.g., Landing Connection)

```css
.pageContent {
  width: 100%;
  padding: 32px 32px 48px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

@media (max-width: 1024px) {
  .pageContent { padding: 24px 24px 40px; }
}

@media (max-width: 768px) {
  .pageContent { padding: 16px 16px 32px; gap: 24px; }
  .pageTitle { font-size: 24px; }
}
```

### Two-column detail page (e.g., Detail Item)

```css
.contentContainer {
  display: flex;
  gap: 24px;
  width: 100%;
  padding: 24px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.primaryColumn {
  flex: 1;
  min-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.secondaryColumn {
  width: 320px;
  min-width: 240px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

@media (max-width: 1024px) {
  .primaryColumn { min-width: 0; }
  .secondaryColumn { width: 280px; }
}

@media (max-width: 768px) {
  .contentContainer { flex-direction: column; padding: 16px; }
  .primaryColumn { min-width: 0; width: 100%; }
  .secondaryColumn { width: 100%; }
  .formRow { flex-direction: column; }
  .pageTitle { font-size: 24px; }
}
```

### Card grid page (e.g., Dashboard, Catalog)

```css
/* 4-column grid */
.primaryCardsGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

/* 3-column grid */
.cardGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

@media (max-width: 1024px) {
  .primaryCardsGrid { grid-template-columns: repeat(2, 1fr); }
  .cardGrid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .primaryCardsGrid { grid-template-columns: repeat(2, 1fr); }
  .cardGrid { grid-template-columns: 1fr; }
}

@media (max-width: 480px) {
  .primaryCardsGrid { grid-template-columns: 1fr; }
}
```

### Metrics grid

```css
.metricsGrid {
  display: grid;
  grid-template-columns: repeat(N, 1fr); /* N = number of metrics */
  gap: var(--ld-semantic-spacing-4, 16px);
}

@media (max-width: 1024px) {
  .metricsGrid { grid-template-columns: repeat(ceil(N/2), 1fr); }
}

@media (max-width: 768px) {
  .metricsGrid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .metricsGrid { grid-template-columns: 1fr; }
}
```

---

## Page Header

Page headers sit inside the content area and MUST include breadcrumbs.

```css
.pageHeaderContainer {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 0 24px;
}

.titleRow {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 40px;
}

.titleActions {
  display: flex;
  align-items: center;
  gap: 16px;
}

@media (max-width: 768px) {
  .titleRow { flex-wrap: wrap; gap: 12px; }
  .titleActions { flex-wrap: wrap; }
  .pageTitle { font-size: 24px; }
}
```

---

## Spacing System (8px Hierarchy)

All spacing MUST use multiples of 8px:

| Use case | Value |
|----------|-------|
| Tight gap (within a group) | `4px` or `8px` |
| Standard gap (between items) | `12px` or `16px` |
| Section spacing | `24px` |
| Large section breaks | `32px` |
| Page-level vertical rhythm | `48px` |

Use LD spacing tokens when available:
- `var(--ld-semantic-spacing-2, 8px)`
- `var(--ld-semantic-spacing-3, 12px)`
- `var(--ld-semantic-spacing-4, 16px)`

---

## Typography Scaling

Page titles MUST scale down on smaller screens:

```css
.pageTitle {
  font-family: var(--ld-semantic-font-heading-large-family);
  font-size: var(--ld-semantic-font-heading-large-size, 32px);
  font-weight: var(--ld-semantic-font-heading-large-weight-default, 700);
  line-height: 1.25;
}

@media (max-width: 768px) {
  .pageTitle { font-size: 24px; }
}
```

---

## Form Layouts

- Form rows (`display: flex; gap: 16px`) MUST stack vertically at `768px`
- Text fields MUST NOT exceed `700px` width on large screens
- Use `flex: 1` on form fields within rows for equal distribution

```css
.formRow {
  display: flex;
  gap: 16px;
}

@media (max-width: 768px) {
  .formRow { flex-direction: column; }
}
```

---

## Tables

Tables MUST be wrapped for horizontal scroll on small screens:

```css
.tableWrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
```

---

## Shared Utilities

Import `responsive.module.css` for reusable grid and layout classes:

```tsx
import styles from '@/styles/responsive.module.css';
```

Available classes: `pageContent`, `threeColGrid`, `metricsGrid4`, `metricsGrid5`, `metricsGrid7`, `heroGrid`, `primaryCardsGrid`, `filterBar`, `tableWrapper`.

For page-specific layouts, create a dedicated CSS module in `client/styles/` (e.g., `client/styles/myPage.module.css`).

---

## Checklist for New Pages

Before submitting any new page or view:

- [ ] Uses standard shell (MastHead + AppSidebar + scrollable main)
- [ ] Content fills full available width (no max-width constraints)
- [ ] Padding reduces at each breakpoint (32 -> 24 -> 16 -> 12)
- [ ] Multi-column layouts stack at `768px`
- [ ] Card grids reduce columns at `1024px` and `768px`
- [ ] Page title scales to `24px` at `768px`
- [ ] Form rows stack vertically at `768px`
- [ ] Text fields capped at `700px` on large screens
- [ ] Tables are horizontally scrollable
- [ ] All spacing uses 8px multiples
- [ ] All colors use LD semantic tokens (no hard-coded values)
- [ ] Background uses `var(--ld-semantic-color-fill-surface-subtle)` or equivalent

---

## Common Violations

```css
/* WRONG — max-width constrains content */
.page { max-width: 1280px; margin: 0 auto; padding: 24px; }

/* CORRECT — full width within shell */
.page { width: 100%; padding: 24px; }
```

```css
/* WRONG — No responsive breakpoints */
.grid { grid-template-columns: repeat(4, 1fr); }

/* CORRECT */
.grid { grid-template-columns: repeat(4, 1fr); }
@media (max-width: 1024px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) { .grid { grid-template-columns: 1fr; } }
```

```css
/* WRONG — Hard-coded padding that doesn't scale */
.container { padding: 40px 60px; }

/* CORRECT — Uses standard values that scale at breakpoints */
.container { padding: 24px 32px; }
@media (max-width: 768px) { .container { padding: 16px; } }
```
