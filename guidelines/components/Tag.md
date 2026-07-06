---
title: Tag
scope: component
status: stable
owner: design-system
last_updated: 2025-02-25
---

## Purpose

Tags label or call out a short attribute of an item, a status, or a group. Tags are **static** (non-interactive) and should be **brief** (1-3 words maximum).

## Rules

- **MUST** use the Living Design `Tag` component (`import { Tag } from '@/components/ui/tag'`).
- **MUST** keep tag text short (1-3 words).
- **MUST NOT** recreate tag styles with raw HTML/CSS.
- **MUST NOT** add interaction (click/press/hover). Use **Chip** or **Button** instead.
- **MUST NOT** replace the label with an icon-only tag.
- **SHOULD** choose colors that reinforce meaning (semantic first, decorative second).

## Usage

```tsx
import { Tag } from '@/components/ui/tag';

// Default (secondary variant, brand color)
<Tag>Label</Tag>

// Filled brand tag
<Tag variant="primary" color="brand">Brand</Tag>

// With leading icon
<Tag variant="primary" color="positive" leading={<Icons.Check size={14} />}>
  Verified
</Tag>

// Multiple tags with spacing
<div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
  <Tag variant="primary" color="brand">New</Tag>
  <Tag variant="primary" color="positive">Active</Tag>
</div>
```

### Variants

- **primary** (filled): High emphasis, full colored background. Use sparingly.
- **secondary** (text-only): Medium emphasis, transparent background (default).
- **tertiary** (subtle): Low emphasis, subtle colored background.

### Colors

- **Semantic** (preferred): `brand`, `positive`, `negative`, `warning`, `info`, `edited`
- **Accent**: `blue`, `spark`, `green`, `red`, `purple`, `gray`, `cyan`, `orange`, `pink`, `yellow`, `teal`

## Do / Don't

### Do

- Use Tags to call out an attribute or status that helps users scan.
- Use Tags to group related items and reinforce relationships.
- Choose colors with clear semantic meaning when applicable.
- Keep labels short and easy to translate/localize.

### Don't

- Use Tags for more than 2-3 words of content.
- Add interaction to Tags; if it needs to be clickable, use a **Chip** or **Button**.
- Use icon-only tags or replace text with an icon.
- Rely on color alone; the text label must convey meaning.

## Migration

| Old API | New API |
|---|---|
| `variant="success"` | `variant="primary" color="positive"` |
| `variant="warning"` | `variant="primary" color="warning"` |
| `variant="destructive"` | `variant="primary" color="negative"` |
| `variant="info"` | `variant="primary" color="info"` |
| `icon={<Icon />}` | `leading={<Icon size={14} />}` |

Removed features: `size`, `dismissible`, `clickable`, `disabled` props are not in LD 3.5.

## Accessibility

- **MUST** ensure the label communicates meaning without color.
- **SHOULD** avoid icons that introduce ambiguity; if using an icon, keep the label present.
- Tags render as `<span>` elements (not interactive).

## Related

- [Tag API reference](../../design-system-docs/Tag.mdx)
- [Chip](./Chip.md) for interactive selection
- [FilterChip](./FilterChip.md) for toggle filtering
- [Badge](./Badge.md) for notification counts
