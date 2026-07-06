# Design System Enforcement Rule

## Overview
This rule ensures that ALL code in the project follows Living Design 3.5 (LD 3.5) design system principles, using only approved design tokens and icon library components.

## Critical Requirements

### 1. Design Token Usage

**ALWAYS use semantic design tokens. NEVER use hard-coded values.**

#### ❌ WRONG - Hard-coded values:
```tsx
// Never do this
<button style={{
  backgroundColor: '#0071DC',
  color: '#FFFFFF',
  borderRadius: '4px',
  padding: '8px 16px'
}}>
  Click me
</button>

<div style={{
  backgroundColor: '#f5f5f5',
  color: '#333333'
}}>
  Content
</div>
```

#### ✅ CORRECT - Semantic tokens:
```tsx
// Always do this
import { Button } from '@/components/ui/Button';

<Button variant="primary">
  Click me
</Button>

<div style={{
  backgroundColor: 'var(--ld-semantic-color-surface)',
  color: 'var(--ld-semantic-color-text)'
}}>
  Content
</div>
```

### 2. Icon Usage

**ALWAYS use icons from the centralized icon library (`client/components/icons/`). NEVER create inline SVGs or use external icon libraries.**

#### ❌ WRONG - Inline SVG:
```tsx
// Never do this
<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
</svg>

// Never use external libraries
import { FaHome } from 'react-icons/fa'; // ❌ NO!
import { HomeIcon } from '@heroicons/react'; // ❌ NO!
```

#### ✅ CORRECT - Icon library:
```tsx
// Always do this
import { Home, Search, Settings } from '@/components/icons';

<Home style={{ width: 20, height: 20 }} />
<Search className="w-5 h-5" />
<Settings style={{ 
  color: 'var(--ld-semantic-color-action-fill-primary)' 
}} />
```

**Available icons:** 303 icons in the centralized library
**Location:** `client/components/icons/`
**Index:** All icons are exported from `client/components/icons/index.tsx`

### 3. Component Usage

**ALWAYS use LD 3.5 components. NEVER create custom components for existing patterns.**

#### ❌ WRONG - Custom button:
```tsx
// Never do this
<button style={{
  padding: '8px 16px',
  backgroundColor: '#0071DC',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
}}>
  Submit
</button>
```

#### ✅ CORRECT - LD Button:
```tsx
import { Button } from '@/components/ui/Button';
import { ArrowRight } from '@/components/icons';

<Button 
  variant="primary" 
  size="medium"
  trailing={<ArrowRight />}
>
  Submit
</Button>
```

### 4. When Creating New Icons

If you MUST create a new icon (only if it doesn't exist in the 304-icon library):

**Requirements:**
- **Stroke linecap:** ALWAYS use `strokeLinecap="square"` (never "round")
- **Stroke width:** ALWAYS use `strokeWidth="1.5"`
- **ViewBox:** ALWAYS use `viewBox="0 0 20 20"`
- **Current color:** ALWAYS use `stroke="currentColor"` for semantic theming
- **File location:** `client/components/icons/IconName.tsx`
- **Export:** Add to `client/components/icons/index.tsx`

#### Icon Template:
```tsx
// client/components/icons/NewIcon.tsx
import * as React from 'react';

export const NewIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M..." 
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
};
```

**Then export it:**
```tsx
// client/components/icons/index.tsx
export { NewIcon } from './NewIcon';
```

### 5. Design Token Categories

**624 semantic tokens available across 10 categories:**

1. **Action Colors** (60 tokens) - Buttons, links, interactive elements
2. **Text Colors** (80 tokens) - All text elements
3. **Fill/Background** (80 tokens) - Background colors, fills
4. **Border & Separator** (40 tokens) - Borders, dividers
5. **Surface & Elevation** (20 tokens) - Cards, modals, overlays
6. **Spacing Scale** (30 tokens) - Margins, padding, gaps
7. **Typography** (60 tokens) - Font families, sizes, line heights
8. **Border Radius** (13 tokens) - Corner rounding
9. **Elevation/Shadow** (3 tokens) - Box shadows
10. **Animation Duration** (20 tokens) - Transition timing

**Access all tokens:** Visit Component Library page > Design Tokens section

### 6. Common Token Reference

```css
/* Colors */
--ld-semantic-color-action-fill-primary (Walmart blue #0071DC)
--ld-semantic-color-text
--ld-semantic-color-text-subtle
--ld-semantic-color-surface
--ld-semantic-color-background

/* Spacing */
--ld-semantic-spacing-100 (8px)
--ld-semantic-spacing-200 (16px)
--ld-semantic-spacing-300 (24px)
--ld-semantic-spacing-400 (32px)

/* Typography */
--ld-semantic-font-family-sans (Everyday Sans UI)
--ld-semantic-font-family-mono (Everyday Sans Mono)

/* Border Radius */
--ld-semantic-border-radius-small (2px)
--ld-semantic-border-radius-medium (4px)
--ld-semantic-border-radius-large (8px)
--ld-semantic-border-radius-button (pill/9999px)

/* Elevation */
--ld-semantic-elevation-100 (subtle shadow)
```

## Enforcement Checklist

Before committing code, verify:

- ✅ No hard-coded hex colors (#0071DC, #FFFFFF, etc.)
- ✅ No hard-coded px values for spacing, sizing
- ✅ No inline SVG icons
- ✅ No external icon libraries (react-icons, heroicons, etc.)
- ✅ All buttons use `<Button>` component
- ✅ All icons imported from `@/components/icons`
- ✅ All colors use `var(--ld-semantic-color-*)`
- ✅ All spacing uses `var(--ld-semantic-spacing-*)`

## Code Review Pattern

**Search for violations:**
```bash
# Find hard-coded colors
grep -r "#[0-9a-fA-F]\{6\}" client/

# Find inline SVGs
grep -r "<svg" client/components/ client/pages/

# Find hard-coded pixel values
grep -r "padding: [0-9]" client/
grep -r "margin: [0-9]" client/
```

## References

- **Component Library:** `/component-library` page
- **Design Tokens:** 624 tokens in `styles/semantic.css`
- **Icon Library:** 303 icons in `client/components/icons/`
- **Button Component:** `client/components/ui/Button.tsx`
- **Guidelines:** `guidelines/` folder

## Examples

### ✅ Good Example - Complete Component
```tsx
import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CardHeader } from '@/components/ui/CardHeader';
import { CardContent } from '@/components/ui/CardContent';
import { Home, Settings } from '@/components/icons';

export const MyComponent: React.FC = () => {
  return (
    <Card size="small">
      <CardHeader
        leadingIcon={<Home style={{ width: 20, height: 20 }} />}
        title="My Dashboard"
        trailing={
          <Button variant="secondary" size="small">
            <Settings style={{ width: 16, height: 16 }} />
          </Button>
        }
      />
      <CardContent>
        <p style={{ color: 'var(--ld-semantic-color-text-subtle)' }}>
          All components use semantic tokens and icon library.
        </p>
        <Button variant="primary" size="medium">
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
};
```

### ❌ Bad Example - Violations
```tsx
// Multiple violations - DO NOT DO THIS
export const BadComponent: React.FC = () => {
  return (
    <div style={{
      backgroundColor: '#f5f5f5', // ❌ Hard-coded color
      padding: '20px', // ❌ Hard-coded spacing
      borderRadius: '8px' // ❌ Hard-coded radius
    }}>
      <svg width="24" height="24"> {/* ❌ Inline SVG */}
        <path d="..."/>
      </svg>
      <button style={{ // ❌ Custom button
        backgroundColor: '#0071DC',
        color: '#fff',
        padding: '8px 16px'
      }}>
        Click me
      </button>
    </div>
  );
};
```

## Summary

**Golden Rules:**
1. 🎨 **Design Tokens:** Always use semantic tokens, never hard-code values
2. 🔍 **Icons:** Always use icon library, never create inline SVGs
3. 🧩 **Components:** Always use LD components, never create custom variants
4. 📏 **New Icons:** Square linecap, 1.5px stroke, 20x20 viewBox
5. ✅ **Enforcement:** Run checks before committing code

**When in doubt:**
- Check the Component Library page
- Search existing components for examples
- Consult `guidelines/` documentation
- Use design tokens from `styles/semantic.css`
