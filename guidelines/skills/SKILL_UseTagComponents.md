---
title: Use Tag and OLQTag Components
scope: skill
based-on: RULE_TagComponents.mdc
last_updated: 2025-02-28
---

## What This Skill Does

Shows you when to use `Tag` vs `OLQTag`, how to import them, which variants are available, and how to replace existing custom-styled status divs with the correct components.

## When to Use It

- Displaying a status label (Active, Pending, Cancelled, Shipped)
- Showing a quality or percentage score (OLQ percentage)
- Replacing an existing `<span>` or `<div>` with inline color logic
- Adding category labels, filter chips, or attribute tags to cards

---

## Which Component to Use?

| Use case | Component | Import |
|---|---|---|
| Status labels (Active, Shipped, Error) | `Tag` | `@/components/ui/tag` |
| Category or attribute labels | `Tag` | `@/components/ui/tag` |
| Dismissible filter chips | `Tag` with `dismissible` prop | `@/components/ui/tag` |
| OLQ / quality percentage score | `OLQTag` | `@/components/ui/olq-tag` |

---

## Tag Component

### Import

```tsx
import { Tag } from '@/components/ui/tag';
```

### Available Variants

| Variant | Color | Use for |
|---|---|---|
| `default` | Gray | Neutral / inactive state |
| `primary` | Blue | Selected, highlighted |
| `secondary` | Light blue | Secondary category |
| `success` | Green | Active, completed, approved |
| `warning` | Yellow | Pending, attention needed |
| `destructive` | Red | Rejected, error, critical |
| `info` | Blue | Informational |

### Basic Usage

```tsx
// Status labels
<Tag variant="success">Active</Tag>
<Tag variant="warning">Pending</Tag>
<Tag variant="destructive">Rejected</Tag>
<Tag variant="info">In Review</Tag>
<Tag variant="default">Draft</Tag>

// Different sizes
<Tag variant="success" size="sm">Active</Tag>   // small
<Tag variant="success" size="md">Active</Tag>   // medium (default)
<Tag variant="success" size="lg">Active</Tag>   // large
```

### Dismissible Filter Tag

```tsx
import { Tag } from '@/components/ui/tag';

const [activeFilters, setActiveFilters] = React.useState(['Free shipping', 'In stock']);

{activeFilters.map((filter) => (
  <Tag
    key={filter}
    variant="info"
    dismissible
    onDismiss={() => setActiveFilters((prev) => prev.filter((f) => f !== filter))}
  >
    {filter}
  </Tag>
))}
```

### Tag with Icon

```tsx
import { Tag } from '@/components/ui/tag';
import { Check } from '@/components/icons';

<Tag variant="success" icon={<Check />}>Verified</Tag>
```

---

## OLQTag Component

OLQTag is for displaying percentage-based quality scores. It automatically picks the right color based on the value — you don't need to write any threshold logic.

### Import

```tsx
import { OLQTag } from '@/components/ui/olq-tag';
```

### Built-in Color Thresholds

| Score | Color | Token |
|---|---|---|
| < 50% | Red | `--ld-semantic-color-fill-accent-red-subtle` |
| 50–79% | Yellow | `--ld-semantic-color-fill-accent-spark-subtle` |
| >= 80% | Green | `--ld-semantic-color-fill-accent-green-subtle` |

### Usage

```tsx
// Pass a numeric percentage — color is automatic
<OLQTag percentage={42} />   // → red
<OLQTag percentage={65} />   // → yellow
<OLQTag percentage={92} />   // → green

// If your data is a string "85%", parse it first
<OLQTag percentage={parseFloat(item.olqScore)} />
```

---

## Replacing Existing Custom Tag Patterns

### Before (wrong — custom styled div)

```tsx
// ❌ Manual threshold function
const getOLQStyle = (olq: string) => {
  const pct = parseFloat(olq);
  if (pct < 50) return { backgroundColor: '#FBD0CC', color: '#EA1100' };
  if (pct < 80) return { backgroundColor: '#FFF3CC', color: '#997000' };
  return { backgroundColor: '#D4EDDA', color: '#2a8703' };
};

<div style={getOLQStyle(item.olq)}>{item.olq}</div>
```

```tsx
// ❌ Custom status span
<span style={{ background: '#eaf3e6', color: '#2a8703', padding: '2px 8px', borderRadius: '4px' }}>
  Active
</span>
```

### After (correct — use LD components)

```tsx
// ✅ OLQTag handles all threshold logic
import { OLQTag } from '@/components/ui/olq-tag';
<OLQTag percentage={parseFloat(item.olq)} />

// ✅ Tag with semantic variant
import { Tag } from '@/components/ui/tag';
<Tag variant="success">Active</Tag>
```

**Migration steps**:
1. Remove the `getXStyle()` function
2. Add the correct import (`Tag` or `OLQTag`)
3. Replace the `<div>` or `<span>` with the component
4. Delete any leftover inline color utilities

---

## Status → Variant Mapping

Use this table to pick the right variant for common statuses:

| Status text | Variant |
|---|---|
| Active, Completed, Delivered, Approved, Verified | `success` |
| Pending, In Progress, Processing, In Review | `warning` |
| Rejected, Cancelled, Failed, Overdue | `destructive` |
| Shipped, On the way, In transit | `info` |
| Draft, Inactive, Paused | `default` |
| Highlighted, Selected, Featured | `primary` |

---

## Finding Violations in the Codebase

```bash
# Find manual OLQ threshold functions
grep -r "getOLQStyle\|getStatusStyle\|getColorForPct" client/pages/ client/components/

# Find inline hex colors used for status display
grep -r "backgroundColor.*#EA1100\|backgroundColor.*#FBD0CC\|backgroundColor.*#eaf3e6" client/

# Find custom styled status spans
grep -r "className.*rounded.*px-\|className.*py-.*rounded" client/ --include="*.tsx"
```

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Writing a custom `getStatusStyle()` function | Use `<Tag variant="success">` — the color is built in |
| Copying OLQ threshold logic (< 50 = red, etc.) | Use `<OLQTag percentage={value} />` — thresholds are built in |
| Using `<span style={{ backgroundColor: '...' }}>` | Use `<Tag variant="...">` |
| Hardcoding the OLQ percentage color | `OLQTag` handles it — just pass the number |
| Using `Badge` instead of `Tag` | `Tag` is for status labels; `Badge` is for notification counts |
| Importing from wrong path | `import { Tag } from '@/components/ui/tag'` (lowercase `tag`) |
