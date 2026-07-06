---
title: Top Navigation (DesktopHeader + SubNav)
scope: component
status: stable
owner: design-system
last_updated: 2025-02-26
---

## Overview

The Top Navigation system consists of two components that work together to provide the main navigation shell for all pages:

- **DesktopHeader** — Primary header bar with logo, search, delivery selector, account flyouts, and cart
- **SubNav** — Secondary navigation bar with department dropdowns and quick links

Both are provided automatically by the `ResponsiveLayout` wrapper component.

## File Locations

| Component | File |
|-----------|------|
| DesktopHeader | `client/components/walmart/DesktopHeader.tsx` |
| DesktopHeader styles | `client/components/walmart/DesktopHeader.module.css` |
| SubNav | `client/components/walmart/SubNav.tsx` |
| SubNav styles | `client/components/walmart/SubNav.module.css` |
| ResponsiveLayout | `client/components/walmart/ResponsiveLayout.tsx` |

## Usage

### Recommended: Use ResponsiveLayout (preferred)

```tsx
import { ResponsiveLayout } from '@/components/walmart/ResponsiveLayout';

export default function MyPage() {
  return (
    <ResponsiveLayout maxWidth="full">
      {/* page content */}
    </ResponsiveLayout>
  );
}
```

`ResponsiveLayout` automatically renders `DesktopHeader`, `SubNav`, `PromoBanner`, `DesktopFooter`, and `BottomNav` (mobile).

### Direct usage (rare, only for custom layouts)

```tsx
import { DesktopHeader } from '@/components/walmart/DesktopHeader';
import { SubNav } from '@/components/walmart/SubNav';

<DesktopHeader />
<SubNav />
```

## Design Tokens

### Required Tokens

All top navigation components MUST use these LD semantic tokens. Never hard-code colors.

| Token | Usage |
|-------|-------|
| `--ld-semantic-color-top-nav-fill` | Header background color |
| `--ld-semantic-color-top-nav-fill-hovered` | Header hover state |
| `--ld-semantic-color-top-nav-fill-pressed` | Header pressed/active state |
| `--ld-semantic-color-top-nav-text-on-fill` | Text/icons on header background |
| `--ld-semantic-color-fill-accent-blue-subtle` | SubNav background |
| `--ld-semantic-font-family-sans` | All navigation text |

### Token Examples

```css
/* ✅ CORRECT */
background-color: var(--ld-semantic-color-top-nav-fill);
color: var(--ld-semantic-color-top-nav-text-on-fill);

/* ❌ WRONG — hard-coded colors */
background-color: #0071DC;
color: white;

/* ❌ WRONG — incorrect token names (non-hyphenated) */
background-color: var(--ld-semantic-color-topnav-background);
```

## DesktopHeader Flyouts

The DesktopHeader includes three interactive flyout panels:

### 1. Delivery Flyout
- Trigger: "Pickup or delivery?" button
- Options: Shipping, Pickup, Delivery
- Shows address/store for each option
- Selection persists in the header label

### 2. My Items Flyout
- Trigger: Heart icon + "My Items" label
- Options: Reorder, Lists, Purchase History
- Each links to its respective page

### 3. Account Flyout
- Trigger: User icon + "Account" label
- Shows Sign In button
- Links: Purchase History, Walmart+, Manage Account

### Flyout Implementation Pattern

All flyouts use the shared `useFlyout` hook:

```tsx
function useFlyout() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    // Close on outside click
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    // Close on Escape
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', esc);
    return () => { /* cleanup */ };
  }, [open]);

  return { open, setOpen, ref };
}
```

## SubNav Structure

SubNav contains:
- **DepartmentsDropdown** — Full department mega-menu
- **ServicesDropdown** — Services like Auto Care, Pharmacy, etc.
- **Quick links** — Get it Fast, Rollbacks, Easter, Pharmacy, etc.
- **MoreLinksDropdown** — Overflow menu for additional links

## Responsive Behavior

| Viewport | Behavior |
|----------|----------|
| Desktop (≥1024px) | Full DesktopHeader + SubNav visible |
| Mobile (<1024px) | DesktopHeader and SubNav hidden (`lg:hidden` on mobile header, `hidden lg:flex` on desktop header). Mobile gets its own inline header with search bar and BottomNav |

## Accessibility

- All flyout triggers are keyboard-focusable buttons
- Flyouts close on `Escape` key press
- Flyouts close on outside click
- Cart icon announces item count via aria-label
- Search input is focusable with proper labeling

## Checklist for Pages Using Top Navigation

- [ ] Page wrapped with `ResponsiveLayout` (or uses `DesktopHeader` + `SubNav` directly)
- [ ] No duplicate headers or footers rendered
- [ ] Mobile header uses `lg:hidden` to hide on desktop
- [ ] All navigation links use `/walmart/` prefix for routes
- [ ] No hard-coded colors — all use LD semantic tokens
