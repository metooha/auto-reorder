title: Magic Box
scope: component
status: draft
owner: design-system
last_updated: 2025-12-19
---

## Purpose
Magic Box highlights content actively being updated by AI/agents.

## Rules
- Use Magic Box only while AI work is in progress.
- Apply it to a container, not individual elements.
- Use on default color surfaces only.
- Remove it once the AI operation is complete.

## Theme
Magic Box colors respond to agent themes.

## Example
```tsx
import { MagicBox } from "@/components/ui/MagicBox";

export function Example({ isUpdating }: { isUpdating: boolean }) {
  return <MagicBox active={isUpdating}>{/* AI content */}</MagicBox>;
}
```

## Accessibility
Magic Box must not be the only indicator. Provide text or status cues if needed.
