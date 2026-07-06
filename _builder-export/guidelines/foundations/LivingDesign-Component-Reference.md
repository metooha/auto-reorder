---

# Living Design Component Reference (Short)

## Goal
Use Living Design components and tokens. Keep code accessible and consistent.

## Non‑negotiables
1. Use existing Living Design components first.
2. Use semantic tokens (`var(--ld-semantic-*)`) for all styling.
3. Do not invent component APIs or token names.
4. Accessibility is required (keyboard, focus, semantic HTML, ARIA).

---

# Components (imports + required props + key variants)

> Import pattern: `import { ComponentName } from '@livingdesign/react'`

## Alert
- Required: `children`
- Variants: `error | info | success | warning`

## Badge
- Required: none
- Colors: `blue | brand | brandBold | cyan | edited | gray | green | info | negative | neutral | orange | pink | positive | purple | red | spark | teal | warning | yellow`

## Banner
- Required: `children`, `onClose`
- Variants: `error | info | success | warning`

## BottomSheet
- Required: `children`, `title`, `onClose`
- Optional: `actions`, `isOpen`, `onClosed`

## Breadcrumb / BreadcrumbItem
- Breadcrumb required: `children`
- BreadcrumbItem required: `children`, `href`

## Button
- Required: `children`
- Variants: `primary | secondary | tertiary | destructive`
- Sizes: `small | medium | large`

## ButtonGroup
- Required: `children`

## Callout
- Required: `a11yContentLabel`, `children`, `onClose`, `trigger`, `triggerRef`
- Positions: `bottomCenter | bottomLeft | bottomRight | left | right | topCenter | topLeft | topRight`

## Card / CardContent / CardHeader / CardActions / CardMedia
- Card required: `children`
- Card sizes: `small | large`
- CardHeader required: `title`

## Checkbox
- Required: `onChange`
- Common: `checked`, `label`, `id`, `name`, `disabled`, `indeterminate`

## Chip / ChipGroup
- Chip required: `children`
- Chip sizes: `small | large`
- ChipGroup required: `children`

## ContentMessage
- Required: `children`, `title`
- Sizes: `small | large`

## DataTable (and subcomponents)
- Base components: `DataTable`, `DataTableHead`, `DataTableBody`, `DataTableRow`, `DataTableCell`
- Required: `children` on all structural components
- Header sorting: `DataTableHeader` (`children`, `alignment`, `sort`, `onSort`)

## DateField
- Required: `label`, `onChange`
- Sizes: `small | large`

## DatePicker
- Required: `label`, `onOpen`, `onClose`, `onSelect`
- Sizes: `small | large`

## Divider
- Optional: `title`

## ErrorMessage
- Required: `children`, `title`

## FormGroup
- Required: `children`

## IconButton
- Required: `a11yLabel`, `children`
- Variants: `round | full`
- Sizes: `xsmall | small | medium | large`

## Link
- Required: `children`, `href`
- Colors: `default | subtle | white`

## LinkButton
- Optional: `children`, `href`, `leading`, `trailing`
- Sizes: `small | medium | large`
- Colors: `default | subtle | white`

## List / ListItem
- List required: `children`
- ListItem required: `children`

## MagicBox
- Required: `children`, `width`, `height`
- Border radius: `25 | 50 | 100 | 200 | round`

## Menu / MenuItem
- Menu required: `children`, `trigger`, `triggerRef`, `onOpen`, `onClose`
- Positions: `bottomLeft | bottomRight | topLeft | topRight`
- MenuItem required: `children`

## Metric
- Required: `title`, `value`
- Variants: `negativeDown | negativeUp | neutral | positiveDown | positiveUp`

## Modal
- Required: `children`, `title`, `onClose`
- Sizes: `small | medium | large`

## Nudge
- Required: `children`, `title`

## Panel
- Required: `children`, `title`, `onClose`
- Sizes: `small | medium | large`
- Positions: `left | right`

## Popover
- Required: `children`, `content`, `triggerRef`, `onClose`
- Positions: `bottomCenter | bottomLeft | bottomRight | left | right | topCenter | topLeft | topRight`

## ProgressIndicator
- Required: `valueLabel`
- Variants: `error | info | success | warning`

## ProgressTracker / ProgressTrackerItem
- ProgressTracker: `activeIndex`, `children`
- ProgressTrackerItem: `children`

## Radio
- Required: `name`, `onChange`

## Rating
- Sizes: `small | large`

## Select
- Required: `label`, `onChange`
- Sizes: `small | large`

## SideNavigation / SideNavigationItem
- SideNavigationItem required: `children`, `href`

## Skeleton / SkeletonText
- Skeleton variants: `rectangle | rounded`

## Spinner
- Sizes: `small | large`
- Colors: `neutral | white`

## SpotIcon
- Required: `children`
- Sizes: `small | large`
- Colors: `brand | neutral`

## Switch
- Required: none (use `isOn`, `label`, `onClick`)

## TabNavigation / TabNavigationItem
- TabNavigation: `children`
- TabNavigationItem: `children`, `href`

## Tag
- Required: `children`
- Variants: `primary | secondary | tertiary`
- Colors: `blue | brand | cyan | edited | gray | green | info | negative | orange | pink | positive | purple | red | spark | teal | warning | yellow`

## TextArea
- Required: `label`, `onChange`
- Sizes: `small | large`

## TextField
- Required: `label`, `onChange`
- Sizes: `small | large`
- Types: `text | search | email | password | tel | url | number | time`

---

# Token Guidance (Short)
- Always use semantic tokens (`var(--ld-semantic-*)`) first.
- Only use primitive tokens if no semantic token exists.
- Never hardcode hex colors, sizes, or fonts.

Example:
```
color: var(--ld-semantic-color-text);
background: var(--ld-semantic-color-surface);
```
