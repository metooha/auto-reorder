# Divider

A visual separator using the LD 3.5 `--ld-semantic-color-separator` token. Use to separate content sections, list items, or inline elements.

## Import

```tsx
import { Divider } from '@/components/ui/Divider';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Direction of the divider |
| `title` | `string` | — | Optional centered label |
| `decorative` | `boolean` | `true` | When true, hidden from assistive tech |
| `UNSAFE_className` | `string` | — | Escape hatch for extra CSS classes |
| `UNSAFE_style` | `CSSProperties` | — | Escape hatch for inline styles |

## Usage

### Horizontal (default)

```tsx
<Divider />
```

### Vertical

Must be inside a flex container so `align-self: stretch` takes effect.

```tsx
<div style={{ display: 'flex', alignItems: 'center', gap: 16, height: 48 }}>
  <span>Left</span>
  <Divider orientation="vertical" />
  <span>Right</span>
</div>
```

### With title

```tsx
<Divider title="Or continue with" />
```

### Custom spacing

The component has **no default margin**. Use `UNSAFE_className` to add spacing:

```tsx
<Divider UNSAFE_className="my-4" />
<Divider UNSAFE_className="mx-6" />
```

## Token Reference

| Token | Value | Usage |
|-------|-------|-------|
| `--ld-semantic-color-separator` | `#e3e4e5` | Divider background color |
| `--ld-semantic-color-text-subtle` | `#74767c` | Title label color |
| `--ld-semantic-font-family-sans` | Everyday Sans UI | Title label font |

## Do / Don't

```tsx
// DO — use the Divider component
<Divider />

// DON'T — inline hard-coded dividers
<div className="h-px bg-[#E3E4E5]" />
<div className="w-px h-full bg-gray-300" />
```

## Accessibility

- Renders `<hr>` with `aria-hidden="true"` when `decorative` (default).
- When `title` is provided, wraps in `<div role="separator" aria-label={title}>`.
- Set `decorative={false}` if the divider conveys structural meaning.
