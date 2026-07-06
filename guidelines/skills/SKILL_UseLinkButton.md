---
title: Use LinkButton and the Spot Icon Pattern
scope: skill
based-on: RULE_LinkButtonAndSpotIcon.mdc
last_updated: 2025-02-28
---

## What This Skill Does

Shows you how to use the `LinkButton` component for inline text-link actions, and how to build the standard Spot Icon (round brand-colored icon container) used in todo items, action rows, and cards.

## When to Use It

- Adding a "View details", "See all", or "Start a return" link in a card or list
- Building a todo item or action row with an icon indicator on the left
- Replacing any custom `<button style={{ color: 'blue', textDecoration: 'underline' }}>` or `<a>` with inline click handlers

---

## Part 1 — LinkButton

### Import

```tsx
import { LinkButton } from '@/components/ui/LinkButton';
```

### Basic Usage

```tsx
// Default — black text, regular weight, underlined
<LinkButton>View order details</LinkButton>

// With size
<LinkButton size="small">View details</LinkButton>    // small (default)
<LinkButton size="medium">View details</LinkButton>   // medium
<LinkButton size="large">View details</LinkButton>    // large

// On dark background — use color="white"
<div style={{ background: 'var(--ld-semantic-color-fill-inverse)' }}>
  <LinkButton color="white">View details</LinkButton>
</div>

// With trailing icon
import { ChevronRight } from '@/components/icons';
<LinkButton trailing={<ChevronRight />}>Next step</LinkButton>

// Renders as <a> when href is provided
<LinkButton href="/walmart/orders">See all orders</LinkButton>
```

### LinkButton API

| Prop | Type | Default | Use for |
|---|---|---|---|
| `children` | `ReactNode` | — | Button text (required) |
| `color` | `'default' \| 'subtle' \| 'white'` | `'default'` | Text color variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'small'` | Font size |
| `leading` | `ReactNode` | — | Icon before text |
| `trailing` | `ReactNode` | — | Icon after text |
| `isFullWidth` | `boolean` | `false` | Stretch to container width |
| `disabled` | `boolean` | `false` | Disabled state |
| `href` | `string` | — | Renders as `<a>` (navigates) |
| `onClick` | `() => void` | — | Click handler (renders as `<button>`) |

### What LinkButton Looks Like

- **Color**: Black (`--ld-semantic-color-text`) by default — NOT blue
- **Weight**: Regular (400) — NOT bold
- **Decoration**: Underlined
- **Hover**: Subtle color change — do not override

---

## Replacing Custom Link Buttons

```tsx
// ❌ WRONG — custom styled button
<button
  style={{
    background: 'none',
    border: 'none',
    color: '#0053E2',       // wrong: blue hardcoded
    fontWeight: 700,         // wrong: bold
    textDecoration: 'underline',
    cursor: 'pointer',
    padding: 0,
  }}
>
  View details
</button>

// ❌ WRONG — anchor pretending to be a button
<a href="#" onClick={handleClick} style={{ color: 'blue', fontWeight: 'bold' }}>
  View details
</a>

// ✅ CORRECT — LinkButton handles all styling
<LinkButton onClick={handleClick}>View details</LinkButton>
```

---

## Part 2 — Spot Icon

The Spot Icon is a round, brand-colored container with a centered icon. Used for todo items, action rows, and card leading icons.

### The Pattern

```tsx
import { ListBox } from '@/components/icons';

<div
  style={{
    display: 'flex',
    width: 48,
    height: 48,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',                                                           // ✅ Round
    background: 'var(--ld-semantic-color-fill-brand-subtle, #E9F1FE)',             // ✅ Brand subtle
    flexShrink: 0,
  }}
>
  <ListBox
    width={24}
    height={24}
    style={{ color: 'var(--ld-semantic-color-text-onfill-brand-subtle, #002E99)' }} // ✅ Brand text
  />
</div>
```

### Spot Icon Spec

| Property | Value | Token |
|---|---|---|
| Shape | Circle | `borderRadius: '50%'` |
| Container size | 48×48px | fixed `width: 48, height: 48` |
| Inner padding | 12px on all sides | `padding: 12` |
| Background | Brand subtle fill | `var(--ld-semantic-color-fill-brand-subtle, #E9F1FE)` |
| Icon size | 24×24px | `width: 24, height: 24` |
| Icon color | Brand text on subtle | `var(--ld-semantic-color-text-onfill-brand-subtle, #002E99)` |

### Complete Todo Row Example

```tsx
import { ListBox, ChevronRight } from '@/components/icons';
import { LinkButton } from '@/components/ui/LinkButton';

<div style={{
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--ld-semantic-spacing-200, 1rem)',
  padding: 'var(--ld-semantic-spacing-200, 1rem)',
  backgroundColor: 'var(--ld-semantic-color-surface)',
  borderRadius: 'var(--ld-primitive-scale-borderradius-100, 0.5rem)',
}}>

  {/* Spot Icon */}
  <div style={{
    display: 'flex',
    width: 48,
    height: 48,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    background: 'var(--ld-semantic-color-fill-brand-subtle, #E9F1FE)',
    flexShrink: 0,
  }}>
    <ListBox
      width={24}
      height={24}
      style={{ color: 'var(--ld-semantic-color-text-onfill-brand-subtle, #002E99)' }}
    />
  </div>

  {/* Text content */}
  <div style={{ flex: 1 }}>
    <p style={{
      fontFamily: 'var(--ld-semantic-font-family-sans)',
      fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)',
      fontWeight: 700,
      color: 'var(--ld-semantic-color-text)',
      margin: 0,
    }}>
      Action title
    </p>
    <LinkButton size="small" trailing={<ChevronRight />} onClick={handleAction}>
      View details
    </LinkButton>
  </div>

</div>
```

---

## Replacing Square Icon Placeholders

```tsx
// ❌ WRONG — square, neutral gray, wrong color
<div style={{
  width: 48,
  height: 48,
  borderRadius: '4px',          // wrong: square
  backgroundColor: '#F2F3F3',   // wrong: neutral gray
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}}>
  <Placeholder style={{ color: '#74767C' }} />  {/* wrong: gray icon */}
</div>

// ✅ CORRECT — round, brand blue, semantic tokens
<div style={{
  display: 'flex',
  width: 48,
  height: 48,
  padding: 12,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  background: 'var(--ld-semantic-color-fill-brand-subtle, #E9F1FE)',
  flexShrink: 0,
}}>
  <YourIcon width={24} height={24} style={{ color: 'var(--ld-semantic-color-text-onfill-brand-subtle, #002E99)' }} />
</div>
```

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Custom button with `color: '#0053E2'` and `fontWeight: 700` | Use `<LinkButton>` — it handles all styling |
| `<a href="#">` with `onClick` handler | Use `<LinkButton onClick={handler}>` |
| Overriding LinkButton color with `style={{ color: 'blue' }}` | Never override — use `color="white"` prop for dark backgrounds |
| Square icon placeholder (`borderRadius: '4px'`) | Use `borderRadius: '50%'` — Spot Icons are always round |
| Gray icon background (`backgroundColor: '#F2F3F3'`) | Use `var(--ld-semantic-color-fill-brand-subtle)` |
| Gray icon color | Use `var(--ld-semantic-color-text-onfill-brand-subtle)` |
| Missing `flexShrink: 0` on Spot Icon | Always add — prevents icon from squishing in flex rows |
