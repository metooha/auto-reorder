---
name: add-custom-icon
description: Create a new SVG icon component when none exists in the icon library
---

## What This Skill Does

Shows you how to add a new icon to the project when the 303+ existing icons don't include what you need — and how to check thoroughly that it really doesn't exist first.

## When to Use It

- A Figma design uses an icon you can't find in the library
- You've confirmed the icon doesn't exist in any of the 303+ icons (after thorough search)
- You need a brand-specific or feature-specific icon not in the standard set

---

## Step 1 — Search Thoroughly (Required First)

Before creating anything, search by multiple names and concepts:

```bash
# Search by name
ls client/components/icons/ | grep -i "cart\|basket\|bag\|shop"

# Search by SVG path shape (approximate)
grep -r "M12 2" client/components/icons/ --include="*.tsx" | head -5
```

Also check the Component Library page at `/component-library#icons` for a visual grid.

**Search synonyms**:
- "cart" → also check: basket, bag, shopping
- "home" → also check: house, building, store
- "check" → also check: tick, confirm, done, checkmark
- "warning" → also check: alert, exclamation, caution

If the icon exists under a different name, use it. Do not create a duplicate.

---

## Step 2 — Get the SVG from Figma

Export the icon from the Figma design as an SVG. It must meet the LD 3.5 spec:

| Spec | Required value |
|---|---|
| ViewBox | `0 0 20 20` |
| Stroke linecap | `square` |
| Stroke width | `1.5` |
| Stroke color | `currentColor` (never hardcoded) |
| Fill | `none` (for outlined icons) |

If the Figma SVG uses different values (e.g., `24 24` viewBox, `round` linecap), update them to match the spec before adding.

---

## Step 3 — Create the icon component

**Location for custom icons**: `client/components/icons-custom/`
**Location for core icons**: `client/components/icons/` (only if adding to the standard set)

```tsx
// client/components/icons-custom/MyCustomIcon.tsx
import React from 'react';

interface IconProps {
  size?: number;
  style?: React.CSSProperties;
  className?: string;
  'aria-hidden'?: boolean;
}

export function MyCustomIcon({
  size = 20,
  style,
  className,
  'aria-hidden': ariaHidden = true,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className={className}
      aria-hidden={ariaHidden}
    >
      {/* Paste your SVG path(s) here */}
      <path
        d="M3 10H17M10 3V17"   /* example — replace with actual path */
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}
```

### Key points:
- `fill="none"` on the `<svg>` element (outlined icons)
- `stroke="currentColor"` on paths (inherits color from CSS `color` property)
- `strokeLinecap="square"` — NOT `round`
- `strokeWidth="1.5"` — exactly 1.5
- `aria-hidden={true}` by default — icons are decorative; labels come from the surrounding button/text

---

## Step 4 — Export from the icons-custom index

If `client/components/icons-custom/index.tsx` exists, add your export:

```tsx
export { MyCustomIcon } from './MyCustomIcon';
```

If the index doesn't exist yet, create it:

```tsx
// client/components/icons-custom/index.tsx
export { MyCustomIcon } from './MyCustomIcon';
```

---

## Step 5 — Use the icon

```tsx
import { MyCustomIcon } from '@/components/icons-custom/MyCustomIcon';

// In a button (icon is decorative — label on button provides context)
<button aria-label="Add custom item">
  <MyCustomIcon size={20} />
</button>

// With explicit color via className
<MyCustomIcon size={16} style={{ color: 'var(--ld-semantic-color-text-brand-bold)' }} />
```

---

## Accessibility Notes

- Icons are `aria-hidden="true"` by default — they are decorative
- When an icon is the **only** content in a button, the button MUST have `aria-label`
- When an icon is **next to text**, the text provides the label — icon stays hidden

```tsx
// ✅ Icon-only button — needs aria-label
<button aria-label="Search products">
  <Search size={20} />
</button>

// ✅ Icon + text — icon is decorative, text provides label
<button>
  <Search size={20} aria-hidden />
  Search products
</button>
```

---

## Converting a 24×24 Figma Icon to 20×20

If the Figma icon uses a 24×24 viewBox:

```tsx
// Option 1: Re-export at 20×20 scale with viewBox adjustment
<svg viewBox="0 0 24 24" width="20" height="20">  {/* renders at 20px but keeps 24 viewBox */}

// Option 2: Rescale the paths mathematically (multiply all coordinates by 20/24 = 0.833)
// This is only needed if paths need to be embedded at exact 20×20

// Option 3: Use size prop to render at 20px but keep original viewBox
<svg width={size} height={size} viewBox="0 0 24 24">
```

For consistency with the standard library, prefer Option 1 or Option 3.

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Adding icon to `client/components/icons/` without checking it's truly missing | Check `/component-library#icons` visual grid first |
| Using `strokeLinecap="round"` | Change to `strokeLinecap="square"` |
| Using `stroke="#2E2F32"` | Change to `stroke="currentColor"` |
| ViewBox `0 0 24 24` | Convert to `0 0 20 20` or keep 24 and use `width/height` props |
| No `aria-hidden` on decorative icon | Add `aria-hidden={true}` (default in the template above) |
| Creating a duplicate of `Search.tsx` as `SearchIcon.tsx` | Always check the library first — use the existing one |
