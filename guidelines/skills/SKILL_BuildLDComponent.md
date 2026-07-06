---
title: Build a Living Design (LD) Primitive Component
scope: skill
based-on: RULE_CreateNewComponent.mdc, RULE_ComponentPropertyTester.mdc
last_updated: 2025-02-28
---

## What This Skill Does

Walks you through the complete 10-step process for creating a new LD 3.5 primitive component — a design-system building block that lives in `client/components/ui/` and can be used across the entire app.

## When to Use It

- Creating a general-purpose UI primitive (Input, Stepper, Tooltip, Progress bar)
- The component is NOT Walmart-specific — it could be used in any app
- The component needs a sandbox entry and a full Component Library page

> For Walmart-specific product components, use `SKILL_BuildWCPComponent.md` instead.

---

## LD vs WCP — Quick Check

| Is the component... | Then use... |
|---|---|
| A general UI primitive (Button, Input, Tag, Spinner) | This skill (LD component) |
| Walmart-specific / product-level (Banner, Promo strip, Order card) | `SKILL_BuildWCPComponent.md` |

---

## Complete 10-Step Process

### Step 1 — Check if it already exists

```bash
# Check components/ui/ for existing match
ls client/components/ui/ | grep -i "your-component-name"

# Search for similar patterns
grep -r "export.*function\|export.*const" client/components/ui/ | grep -i "keyword"
```

Check the Component Library page at `/component-library` visually as well. If a similar component exists, extend it — don't create a duplicate.

### Step 2 — Read the Figma design

Extract from the Figma HTML output:
- All variants (primary, secondary, destructive)
- All sizes (small, medium, large)
- All states (default, hover, focus, pressed, disabled)
- Exact spacing values → map to tokens
- Colors → map to semantic tokens
- Border radius, border width, typography

### Step 3 — Create the component file

**Location**: `client/components/ui/ComponentName.tsx`

```tsx
import React from 'react';
import styles from './ComponentName.module.css';

export type ComponentNameVariant = 'primary' | 'secondary' | 'destructive';
export type ComponentNameSize = 'small' | 'medium' | 'large';

export interface ComponentNameProps {
  variant?: ComponentNameVariant;
  size?: ComponentNameSize;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const ComponentName = React.forwardRef<HTMLElement, ComponentNameProps>(
  ({ variant = 'primary', size = 'medium', disabled, children, onClick, className }, ref) => {

    const classNames = [
      styles.component,
      styles[variant],
      styles[size],
      className,
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classNames}
        disabled={disabled}
        onClick={onClick}
        type="button"
      >
        {children}
      </button>
    );
  }
);

ComponentName.displayName = 'ComponentName';
```

**Key requirements**:
- Named export (no `export default`)
- Use `React.forwardRef` for LD primitives (allows parent ref attachment)
- Add `.displayName` for React DevTools
- Variant classes via array join — never switch/if chains

### Step 4 — Create the CSS module

**Location**: `client/components/ui/ComponentName.module.css`

```css
/* Base styles */
.component {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--ld-semantic-font-family-sans);
  border: none;
  cursor: pointer;
  transition: background var(--ld-primitive-duration-200, 200ms) ease;
}

/* Sizes */
.small {
  padding: var(--ld-semantic-spacing-component-padding-small, 0.5rem) var(--ld-semantic-spacing-200, 1rem);
  font-size: var(--ld-semantic-font-body-small-size, 0.875rem);
  border-radius: var(--ld-primitive-scale-borderradius-full, 9999px);
}

.medium {
  padding: var(--ld-semantic-spacing-component-padding-medium, 0.75rem) var(--ld-semantic-spacing-300, 1.5rem);
  font-size: var(--ld-semantic-font-body-medium-size, 1rem);
  border-radius: var(--ld-primitive-scale-borderradius-full, 9999px);
}

.large {
  padding: var(--ld-semantic-spacing-component-padding-large, 1rem) var(--ld-semantic-spacing-400, 2rem);
  font-size: var(--ld-semantic-font-body-large-size, 1.125rem);
  border-radius: var(--ld-primitive-scale-borderradius-full, 9999px);
}

/* Variants */
.primary {
  background: var(--ld-semantic-color-action-fill-primary, #0071DC);
  color: var(--ld-semantic-color-action-text-on-fill-primary, #FFFFFF);
}

.primary:hover { background: var(--ld-semantic-color-action-fill-primary-hovered, #0060B8); }
.primary:active { background: var(--ld-semantic-color-action-fill-primary-pressed, #004C94); }
.primary:focus-visible { outline: 2px solid var(--ld-semantic-color-action-focus-outline, #0071DC); outline-offset: 2px; }

.secondary {
  background: var(--ld-semantic-color-action-fill-secondary, #FFFFFF);
  color: var(--ld-semantic-color-action-text-secondary, #2E2F32);
  border: 1px solid var(--ld-semantic-color-action-border-secondary, #74767C);
}

/* Disabled state */
.component:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .component { transition: none; }
}
```

### Step 5 — Create the component example file

**Location**: `client/components/examples/ComponentNameExample.tsx`

```tsx
import React from 'react';
import { ComponentName } from '@/components/ui/ComponentName';

export default function ComponentNameExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Variants */}
      <section>
        <h3 style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', marginBottom: '12px' }}>Variants</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <ComponentName variant="primary">Primary</ComponentName>
          <ComponentName variant="secondary">Secondary</ComponentName>
          <ComponentName variant="destructive">Destructive</ComponentName>
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h3 style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', marginBottom: '12px' }}>Sizes</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <ComponentName size="small">Small</ComponentName>
          <ComponentName size="medium">Medium</ComponentName>
          <ComponentName size="large">Large</ComponentName>
        </div>
      </section>

      {/* States */}
      <section>
        <h3 style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', marginBottom: '12px' }}>States</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <ComponentName>Default</ComponentName>
          <ComponentName disabled>Disabled</ComponentName>
        </div>
      </section>

    </div>
  );
}
```

### Step 6 — Create the Component Library page

**Location**: `client/pages/component-library/ComponentNames.tsx`

```tsx
import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import ComponentNameExample from '@/components/examples/ComponentNameExample';

export default function ComponentNamesPage() {
  return (
    <div style={{ padding: '48px' }}>
      <PageHeader
        section="Components"
        title="Component Names"
        description="Brief description of what this component is and when to use it."
      />
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-surface)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)',
      }}>
        <ComponentNameExample />
      </div>
    </div>
  );
}
```

### Step 7 — Add the Component Library route

In `client/App.tsx`:

```tsx
// Lazy import
const ComponentNamesPage = React.lazy(() => import('./pages/component-library/ComponentNames'));

// Route (inside the component library section)
<Route path="component-names" element={<ComponentNamesPage />} />
```

### Step 8 — Add the Overview card

In `client/pages/component-library/Overview.tsx`, add to `componentSections`:

```tsx
{
  titleKey: 'componentLibrary.navComponentName',
  descKey: 'componentLibrary.descComponentName',
  path: '/component-library/component-names',
  icon: 'Box',
  section: 'ld',
},
```

### Step 9 — Add i18n keys

In all three locale files (`en/common.json`, `es/common.json`, `fr/common.json`):

```json
{
  "componentLibrary": {
    "navComponentName": "Component Name",
    "descComponentName": "One-line description of what this component does."
  }
}
```

### Step 10 — Create the component guideline

**Location**: `guidelines/components/ComponentName.md`

Document: purpose, variants, sizes, states, props API, token usage, and do/don't examples.

Update `client/pages/component-library/GuidelinesDocIndex.tsx` to add this file.

---

## LD vs WCP File Checklist

| File | LD Component | WCP Component |
|---|---|---|
| `client/components/ui/ComponentName.tsx` | ✅ Required | ❌ Wrong location |
| `client/components/walmart/ComponentName.tsx` | ❌ Wrong location | ✅ Required |
| `client/components/examples/ComponentNameExample.tsx` | ✅ Required | ❌ Not needed |
| `client/pages/component-library/ComponentNames.tsx` | ✅ Required | ✅ Required |
| Route in `App.tsx` | ✅ Required | ✅ Required |
| Overview.tsx card | ✅ Required | ✅ Required |
| `guidelines/components/ComponentName.md` | ✅ Required | ✅ Required |
| i18n keys | ✅ Required | ✅ Required |
| `GuidelinesDocIndex.tsx` entry | ✅ Required | ✅ Required |

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| No `React.forwardRef` on LD component | LD primitives must support refs — use `forwardRef` |
| Missing `displayName` | Add `ComponentName.displayName = 'ComponentName'` |
| `export default` | Use named export: `export const ComponentName` |
| Skipping the example file | Every LD component needs `ComponentNameExample.tsx` |
| Hardcoded colors in CSS | Use `var(--ld-semantic-color-*)` only |
| No `prefers-reduced-motion` on transitions | Always add the `@media` override |
| Putting WCP component in `client/components/ui/` | WCP goes in `client/components/walmart/` |
