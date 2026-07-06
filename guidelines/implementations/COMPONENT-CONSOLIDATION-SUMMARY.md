---
title: Button Component Consolidation
scope: implementation
status: archived
owner: design-system
last_updated: 2025-02-26
---

## Status: Archived

The rules extracted from this work live in `guidelines/rules/RULE_DesignSystemEnforcement.mdc` and the component spec lives in `guidelines/components/Button.md`.

## What Was Done

- Deleted `client/components/ui/button.tsx` (lowercase legacy original)
- Canonical implementation is `client/components/ui/Button.tsx` (uppercase, LD 3.5)
- Migrated `buttonVariants` CVA export into `Button.tsx` for backwards compatibility
- Updated 5 legacy components that imported from the old path: `calendar`, `alert-dialog`, `pagination`, `sidebar`, `carousel`
- Updated `ButtonGroup.tsx` to use `var(--ld-semantic-spacing-3, 12px)` instead of hard-coded `12px`

## Canonical Import

```tsx
// ONLY correct import path
import { Button, buttonVariants } from '@/components/ui/Button';

// This file no longer exists
// import { Button } from '@/components/ui/button';
```

## Button API Quick Reference

| Prop | Values | Default |
|------|--------|---------|
| `variant` | `primary` \| `secondary` \| `tertiary` \| `destructive` | `primary` |
| `size` | `small` \| `medium` \| `large` | `medium` |
| `isFullWidth` | `boolean` | `false` |
| `leading` | `ReactNode` | — |
| `trailing` | `ReactNode` | — |
| `href` | `string` | — renders as `<a>` |
| `disabled` | `boolean` | `false` |

Old (legacy) size/variant names are no longer valid:

| Old | New |
|-----|-----|
| `default` | `primary` |
| `outline` | `secondary` |
| `ghost` | `tertiary` |
| `sm` | `small` |
| `lg` | `large` |

## Find Old Patterns

```bash
# Find any remaining lowercase imports
grep -r "from '@/components/ui/button'" client/

# Find custom inline buttons that should use Button component
grep -r "className=\".*bg-\[#.*rounded-full" client/pages/ client/components/
```
