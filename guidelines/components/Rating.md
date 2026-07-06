---
title: Rating
scope: component
status: stable
owner: design-system
last_updated: 2025-02-25
---

## Purpose

The Rating component displays star ratings with support for whole and half-star values. Use ratings to display user feedback on products or services.

## Rules

- **MUST** use the Living Design Rating component (`import { Rating } from '@/components/ui/Rating'`).
- **MUST** use the `size` prop for sizing (`small` or `large`), never pixel overrides.
- **MUST NOT** manually render star SVGs or use hard-coded color values.
- **MUST NOT** override rating color tokens (uses `--ld-semantic-color-rating-fill` and `--ld-semantic-color-rating-border`).
- **MUST NOT** use for input/selection (display-only component).

## Usage

```tsx
import { Rating } from '@/components/ui/Rating';

// Basic
<Rating value={4.5} />

// Small (12x12px stars, default) - for product listings, tables
<Rating value={3.5} size="small" />

// Large (20x20px stars) - for featured content, hero sections
<Rating value={4.5} size="large" />

// With review count
<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
  <Rating value={4.5} size="small" />
  <span>(1,234 reviews)</span>
</div>
```

### Values

Supports 0 to 5 with 0.5 increments. Values are clamped between 0 and 5.

## Do / Don't

### Do

- Use small size for listings, tables, and compact layouts.
- Use large size for featured content and hero sections.
- Provide review count or context alongside the rating.

### Don't

- Use non-standard rating scales (stick to 0-5).
- Override color tokens with custom colors.
- Place ratings without context (always show what is being rated).
- Manually render star SVGs.

## Accessibility

- Container uses `role="img"` with auto-generated `aria-label` ("Rating: X out of 5 stars").
- Custom `aria-label` supported for specific contexts.
- Individual stars are `aria-hidden="true"`.

## Related

- [Rating API reference](../../design-system-docs/Rating.mdx)
