# UI Component Replacement Plan (Short)

## Goal
Replace shadcn/ui components with Living Design (LD) components without breaking existing pages.

---

## Current usage (high priority)
- Pages: `ItemHealth.tsx`, `Campaign.tsx`
- Components: `RecommendationsPanel.tsx`, `DisplayDashboard.tsx`, `AttributionFilterDropdown.tsx`, `DateRangeFilterDropdown.tsx`
- App-level: `App.tsx` (toasts, tooltip provider)

---

## Key API differences (examples)
- **Button:** shadcn `variant="default"` → LD `variant="primary"`.
- **Styling:** Tailwind classes → LD CSS modules + tokens.
- **Dialog vs Modal:** verify LD modal API before swapping.

---

## Migration strategy (recommended: incremental)
1. **Button** (most used)
2. **Checkbox + RadioGroup**
3. **Popover**
4. **Calendar**
5. **Dialog/Modal** (highest risk)
6. **Toast + Tooltip**
7. **Remaining unused components**

---

## Checklist per component
- Update imports.
- Map variants/sizes to LD names.
- Remove Tailwind-only overrides.
- Verify hover/focus/disabled states.
- Verify keyboard and ARIA behavior.

---

## Risk notes
- **High:** Dialog/Modal, Calendar
- **Medium:** Button, Popover, Checkbox/Radio
- **Low:** Toast, Tooltip

---

## Success criteria
- No console errors.
- All pages render correctly.
- Keyboard/focus states work.
- Components use LD tokens only.
