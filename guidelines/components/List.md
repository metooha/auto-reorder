---
title: List
scope: component
status: stable
owner: design-system
last_updated: 2025-02-25
---

## Purpose

Lists present a continuous, vertical group of related information. Items may include text and optional leading/trailing elements (icons, spot icons, images), and should include at least one action.

## Rules

- **MUST** use the Living Design List component (`import { List, ListItem } from '@/components/ui/List'`).
- **MUST** ensure the List contains at least one action (per item or for the list as a whole).
- **MUST** use documented item layouts only (leading/title/content/trailing as supported).
- **MUST NOT** use List for simple single-line text collections (use native `<ul>`/`<ol>` instead).
- **MUST NOT** restyle List internals via custom CSS.
- **MUST NOT** add repeating decorative elements purely for visual decoration.

## Usage

```tsx
import { List, ListItem } from '@/components/ui/List';
import { Settings, Lock } from '@/components/icons';

<List aria-label="Settings">
  <ListItem
    title="Account"
    text="Manage your account settings"
    leading="icon"
    leadingIcon={<Settings style={{ width: 16, height: 16 }} />}
    trailing="icon"
  />
  <ListItem
    title="Privacy"
    text="Control your privacy preferences"
    leading="icon"
    leadingIcon={<Lock style={{ width: 16, height: 16 }} />}
    trailing="icon"
  />
</List>
```

### Leading variants

- `empty` | `icon` (16px) | `spot-icon` (24px in 48px circle) | `custom`

### Trailing variants

- `empty` | `icon` (chevron) | `link` | `custom`

## Do / Don't

### Do

- Include leading elements only if they add context and clarity.
- Use List for vertical collections of similar items with shared context.

### Don't

- Include repeating icons just for visual decoration.
- Use List for simple single-line text (use native HTML lists).
- Nest interactive controls that create ambiguous click targets.

## Accessibility

- `<List>` renders a `<ul>` with `role="list"`. Support `aria-label` on the container.
- Clickable items **MUST** expose correct interactive semantics (`button` or `link`).
- Interactive elements **MUST** be keyboard reachable with visible focus indicator.

## Related

- [List API reference](../../design-system-docs/List.mdx)
- [ListItem API reference](../../design-system-docs/ListItem.mdx)
