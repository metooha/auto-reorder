---
name: build-wcp-component
description: End-to-end recipe for WCP component file CSS module and route
---

## What This Skill Does

Walks you through creating a new Walmart Component Platform (WCP) product component from a Figma design — from the `.tsx` file to the Component Library page and route.

## When to Use It

- You're building a Walmart-specific UI component (banner, promo strip, callout card)
- The component belongs in `client/components/walmart/`, not `client/components/ui/`
- It has 2–3 visual variants driven by a `variant` prop (`default | brand | inverse`)

---

## Step-by-Step

### Step 1 — Name the component

Use PascalCase. Be specific about what it does.

```
✅ BasicBanner       PromoStrip       JumpRightBackIn
❌ Banner            Component1       WalmartCard
```

### Step 2 — Create the component file

**File**: `client/components/walmart/YourComponent.tsx`

```tsx
import React from 'react';
import styles from './YourComponent.module.css';

// 1. Define the variant type — always a string union, never an enum
export type YourComponentVariant = 'default' | 'brand' | 'inverse';

// 2. Define props interface
export interface YourComponentProps {
  variant?: YourComponentVariant;
  text: string;
  onClick?: () => void;
  className?: string;
}

// 3. Export as named export — never export default
export function YourComponent({
  variant = 'default',
  text,
  onClick,
  className,
}: YourComponentProps) {

  // 4. Render as <button> when interactive, <div> when static
  const Tag = onClick ? 'button' : 'div';

  // 5. Compose variant classes with array join — never switch/if chains
  const classNames = [styles.component, styles[variant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      className={classNames}
      onClick={onClick}
      {...(Tag === 'button' ? { type: 'button' as const } : {})}
    >
      <span className={styles.text}>{text}</span>
    </Tag>
  );
}
```

### Step 3 — Create the CSS module

**File**: `client/components/walmart/YourComponent.module.css`

Every value uses a semantic token. No hardcoded hex colors, px spacing, or font sizes.

```css
/* Base styles — shared across all variants */
.component {
  display: flex;
  align-items: center;
  gap: var(--ld-semantic-spacing-100, 0.5rem);
  width: 100%;
  padding: var(--ld-semantic-spacing-component-padding-medium, 0.75rem)
           var(--ld-semantic-spacing-200, 1rem);
  border-radius: var(--ld-primitive-scale-borderradius-100, 0.5rem);
  border: none;
  box-sizing: border-box;
  font-family: var(--ld-semantic-font-body-small-family, 'Everyday Sans UI', sans-serif);
  text-align: left;
}

/* Variant: default — subtle background, primary text */
.default {
  background: var(--ld-semantic-color-fill-brand-subtle, #EBF1FF);
  color: var(--ld-semantic-color-text-brand-bold, #002E99);
}

/* Variant: brand — Walmart blue fill, white text */
.brand {
  background: var(--ld-semantic-color-action-fill-primary, #0071DC);
  color: var(--ld-semantic-color-text-onfill-brand, #FFFFFF);
}

/* Variant: inverse — dark fill, white text */
.inverse {
  background: var(--ld-semantic-color-fill-inverse, #1A1A1A);
  color: var(--ld-semantic-color-text-onfill-inverse, #FFFFFF);
}

/* Text styles */
.text {
  font-size: var(--ld-semantic-font-body-small-size, 0.875rem);
  font-weight: var(--ld-semantic-font-body-small-weight-alt, 700);
  line-height: var(--ld-semantic-font-body-small-line-height, 1.25rem);
  color: inherit;
}
```

### Step 4 — Create the Component Library page

**File**: `client/pages/component-library/YourComponentPage.tsx`

Show all variants side by side. Include a clickable example and a code snippet.

```tsx
import React from 'react';
import { YourComponent } from '@/components/walmart/YourComponent';
import { PageHeader } from '@/components/ui/PageHeader';

const sectionStyle: React.CSSProperties = {
  backgroundColor: 'var(--ld-semantic-color-surface)',
  padding: '32px',
  borderRadius: '8px',
  boxShadow: 'var(--ld-semantic-elevation-100)',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

export default function YourComponentPage() {
  return (
    <div style={{ padding: '48px' }}>
      <PageHeader
        section="Components"
        title="Your Component"
        description="Short description of what this component does and when to use it."
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

        {/* Variants */}
        <div style={sectionStyle}>
          <h2 style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '18px', fontWeight: 700, margin: '0 0 8px', color: 'var(--ld-semantic-color-text)' }}>
            Variants
          </h2>
          <YourComponent variant="default" text="Default variant example" />
          <YourComponent variant="brand" text="Brand variant example" />
          <YourComponent variant="inverse" text="Inverse variant example" />
        </div>

        {/* Clickable */}
        <div style={sectionStyle}>
          <h2 style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '18px', fontWeight: 700, margin: '0 0 8px', color: 'var(--ld-semantic-color-text)' }}>
            Clickable (renders as button)
          </h2>
          <YourComponent
            variant="brand"
            text="Click me"
            onClick={() => alert('Clicked!')}
          />
        </div>

        {/* Usage code */}
        <div style={sectionStyle}>
          <h2 style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '18px', fontWeight: 700, margin: '0 0 8px', color: 'var(--ld-semantic-color-text)' }}>
            Usage
          </h2>
          <pre style={{ fontFamily: 'monospace', fontSize: '13px', background: 'var(--ld-semantic-color-fill-subtle)', padding: '16px', borderRadius: '8px', overflowX: 'auto', margin: 0 }}>{`import { YourComponent } from '@/components/walmart/YourComponent';

<YourComponent variant="default" text="Message here" />
<YourComponent variant="brand" text="Message here" />
<YourComponent variant="inverse" text="Message here" />

// Clickable (renders as <button>)
<YourComponent variant="brand" text="Message" onClick={() => {}} />`}</pre>
        </div>
      </div>
    </div>
  );
}
```

### Step 5 — Add the route

In `client/App.tsx`, add a lazy import and route inside the component library section:

```tsx
// Near the top, with other lazy imports:
const YourComponentPage = React.lazy(() => import('./pages/component-library/YourComponentPage'));

// Inside the component library <Route> children:
<Route path="your-component" element={<YourComponentPage />} />
```

### Step 6 — Add an Overview entry

In `client/pages/component-library/Overview.tsx`, add to the `componentSections` array:

```tsx
{
  titleKey: 'componentLibrary.navYourComponent',
  descKey: 'componentLibrary.descYourComponent',
  path: '/component-library/your-component',
  icon: 'Note',  // pick an existing icon from ICON_MAP
  section: 'ld',
},
```

### Step 7 — Add i18n keys

In `client/locales/en/common.json`, under `"componentLibrary"`:

```json
"navYourComponent": "Your Component",
"descYourComponent": "Short description of what this component does."
```

Repeat for `es/common.json` and `fr/common.json`.

### Step 8 — Update GuidelinesDocIndex

In `client/pages/component-library/GuidelinesDocIndex.tsx`, add to the Enforcement Rules section:

```tsx
{ name: 'Your Component', path: 'guidelines/components/YourComponent.md', purpose: 'Description of your component' },
```

---

## Complete File Checklist

```
✅ client/components/walmart/YourComponent.tsx        — component
✅ client/components/walmart/YourComponent.module.css — styles (tokens only)
✅ client/pages/component-library/YourComponentPage.tsx — doc page
✅ client/App.tsx                                     — route added
✅ client/pages/component-library/Overview.tsx        — card entry added
✅ client/locales/en/common.json                      — i18n key
✅ client/locales/es/common.json                      — i18n key
✅ client/locales/fr/common.json                      — i18n key
✅ client/pages/component-library/GuidelinesDocIndex.tsx — index entry
```

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| `export default function` | Use named export: `export function YourComponent` |
| `background: #0071DC` in CSS | Use `var(--ld-semantic-color-action-fill-primary, #0071DC)` |
| `switch (variant) { case 'brand': ... }` | Use `[styles.component, styles[variant]].filter(Boolean).join(' ')` |
| Rendering `<button>` always | Use `const Tag = onClick ? 'button' : 'div'` |
| Missing `type="button"` on rendered button | Add `...(Tag === 'button' ? { type: 'button' as const } : {})` |
| Using `--ld-primitive-color-*` in CSS | Use `--ld-semantic-color-*` tokens only |
