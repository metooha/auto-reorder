---
title: UI Component Replacement Plan
scope: migration
status: in-progress
owner: design-system
last_updated: 2025-02-26
---

## Purpose

Replace legacy UI components with Living Design 3.5 equivalents. Migrate one component at a time; verify dev server after each.

## Architecture Difference

Legacy components used Tailwind + CVA. LD uses CSS Modules + `--ld-*` tokens. The JSX tree structure is usually compatible — only variant names and className overrides need updating.

## Component Mapping

| Legacy component | LD replacement | Status | API notes |
|-----------------|---------------|--------|-----------|
| `button.tsx` | `Button.tsx` | Done | Variant names differ — see table below |
| `checkbox.tsx` | LD Checkbox | Pending | API compatible |
| `radio-group.tsx` | LD Radio | Pending | API compatible |
| `popover.tsx` | Keep for now | Deferred | No LD equivalent yet |
| `dialog.tsx` | LD Modal | Pending | Sub-component names differ |
| `calendar.tsx` | Keep for now | Deferred | No LD equivalent yet |
| `alert.tsx` | LD Alert | Pending | — |
| `alert-dialog.tsx` | LD AlertDialog | Pending | — |
| `toast.tsx` / `toaster.tsx` | Keep for now | Deferred | — |
| `sonner.tsx` | Keep for now | Deferred | — |
| `tooltip.tsx` | Keep for now | Deferred | — |

Components marked **Deferred** have no LD 3.5 equivalent yet. Keep the current version and track with `RULE_StandaloneComponents.mdc`.

## Variant Name Mapping (Button)

| Legacy | LD 3.5 |
|--------|--------|
| `default` | `primary` |
| `outline` | `secondary` |
| `ghost` | `tertiary` |
| `destructive` | `destructive` |
| `link` | use `href` prop with `tertiary` |
| `sm` | `small` |
| `default` (size) | `medium` |
| `lg` | `large` |
| `icon` | use `IconButton` |

## Active Files Using Legacy Components

| File | Components used |
|------|----------------|
| `client/pages/ItemHealth.tsx` | Button |
| `client/pages/Campaign.tsx` | Button |
| `client/components/RecommendationsPanel.tsx` | Button, Checkbox, RadioGroup |
| `client/components/DisplayDashboard.tsx` | Button, Dialog |
| `client/components/AttributionFilterDropdown.tsx` | Popover |
| `client/components/DateRangeFilterDropdown.tsx` | Popover, Calendar |
| `client/App.tsx` | Toaster, Sonner, TooltipProvider |

## Per-Component Migration Checklist

When replacing any legacy component:

- [ ] Import from LD path: `@/components/ui/ComponentName` (uppercase)
- [ ] Update variant/size prop values to LD names
- [ ] Remove any `className` overrides (LD components are not customizable via className)
- [ ] Remove Tailwind classes applied to the component root
- [ ] Verify all interactive states (hover, focus, disabled) still work
- [ ] Check keyboard navigation
- [ ] Run dev server — confirm no console errors

## Find Remaining Legacy Imports

```bash
# Components still importing from lowercase (legacy) paths
grep -r "from '@/components/ui/button'" client/
grep -r "from '@/components/ui/checkbox'" client/
grep -r "from '@/components/ui/dialog'" client/
grep -r "from '@/components/ui/radio-group'" client/
```
