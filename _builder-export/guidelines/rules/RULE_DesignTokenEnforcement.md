# RULE: Design Token Enforcement (Short)

## Purpose
All UI must use Living Design semantic tokens. No hardcoded values.

---

## Golden rule
Never hardcode visual values. Always use semantic tokens.

```tsx
// Wrong
style={{ color: '#0053e2', padding: '16px' }}

// Right
style={{
  color: 'var(--ld-semantic-color-text-brand)',
  padding: 'var(--ld-semantic-spacing-200)'
}}
```

---

## Required token usage
- **Colors:** `var(--ld-semantic-color-*)`
- **Spacing:** `var(--ld-semantic-spacing-*)`
- **Typography:** `var(--ld-semantic-font-*)`
- **Radius:** `var(--ld-semantic-border-radius-*)`
- **Elevation:** `var(--ld-semantic-elevation-*)`

Do not use primitive tokens directly in component styles.

---

## Use existing components
Prefer LD components instead of custom elements:
- `Button`, `ButtonGroup`, `Tag`, `OLQTag`, etc.

---

## Quick review checklist
- No hex/rgb values.
- No inline spacing values.
- No raw `<button>` when `Button` exists.
- All states use semantic tokens.
- Theme switch works.

---

## Common fixes
**Custom button → Button**
```tsx
// Wrong
<button style={{ backgroundColor: '#0053e2' }}>Save</button>

// Right
import { Button } from '@/components/ui/Button';
<Button variant="primary">Save</Button>
```

**Spacing**
```tsx
// Wrong
style={{ padding: '16px' }}

// Right
style={{ padding: 'var(--ld-semantic-spacing-200)' }}
```

---

## Summary
1. Use semantic tokens only.
2. Use LD components first.
3. Verify theme switching.
