---
title: Add a CSS Animation
scope: skill
based-on: RULE_AnimationAndMotion.mdc
last_updated: 2025-02-28
---

## What This Skill Does

Shows you how to add CSS animations to components — including multi-step keyframe sequences, hover transitions, loading spinners, and insertion glows — with mandatory `prefers-reduced-motion` support.

## When to Use It

- Adding a "new item" confirmation glow to a card
- Adding hover/focus transitions to interactive elements
- Adding a loading or pulsing skeleton animation
- Ensuring an existing animation respects `prefers-reduced-motion`

---

## The Two Animation Patterns

| Pattern | When to use | CSS approach |
|---|---|---|
| **Transition** | Simple 2-state change (hover in/out, focus on/off) | `transition` property |
| **Keyframe** | Multi-step sequence (glow, pulse, insertion, spinner) | `@keyframes` + `animation` |

---

## Pattern 1 — Hover/Focus Transition

For buttons, cards, and other interactive elements that change on hover or focus.

```css
/* ✅ Transition — for 2-state changes only */
.button {
  background: var(--ld-semantic-color-action-fill-primary);
  transition: background 250ms ease, box-shadow 150ms ease;
}

.button:hover {
  background: var(--ld-semantic-color-action-fill-primary-hovered);
}

.button:focus-visible {
  outline: 2px solid var(--ld-semantic-color-action-focus-outline);
  outline-offset: 2px;
}

/* Required: disable transition for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  .button {
    transition: none;
  }
}
```

**Standard durations**:
- `150ms` — micro (color swaps, opacity)
- `250ms` — standard (most hover transitions)
- `400ms` — complex (multi-property, elevation changes)

---

## Pattern 2 — Keyframe Animation (New Item Glow)

Used when a newly added item needs a visual "confirmation" that it appeared.

```css
/* In your CSS module */

/* Wrap the new item in a <div className={styles.newItem}> */
.newItem {
  animation: glowIn 2.5s ease-in-out forwards;
}

@keyframes glowIn {
  0%   { box-shadow: none; }
  20%  { box-shadow: 0 0 0 2px #1A7A34, 0 0 24px 6px rgba(26, 122, 52, 0.30); }
  60%  { box-shadow: 0 0 0 2px #1A7A34, 0 0 24px 6px rgba(26, 122, 52, 0.30); }
  100% { box-shadow: none; }
}

/* Required: remove animation when user prefers reduced motion */
@media (prefers-reduced-motion: reduce) {
  .newItem {
    animation: none;
  }
}
```

**In the component**:
```tsx
// Apply the glow class to the newly inserted element
<div className={styles.newItem}>
  <YourCard ... />
</div>
```

---

## Pattern 3 — Pulsing Skeleton Loader

```css
.skeleton {
  background: var(--ld-semantic-color-fill-subtle);
  border-radius: var(--ld-primitive-scale-borderradius-50, 0.25rem);
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}

@media (prefers-reduced-motion: reduce) {
  .skeleton {
    animation: none;
    opacity: 0.7; /* Static muted state for reduced motion */
  }
}
```

---

## Pattern 4 — Spinner

**Never create a custom spinner animation.** Use the existing `Spinner` component:

```tsx
import { Spinner } from '@/components/ui/Spinner';

// Default size
<Spinner />

// With label for screen readers
<Spinner aria-label="Loading orders" />
```

---

## Pattern 5 — Slide-In Panel or Drawer

```css
.panel {
  transform: translateX(100%);
  transition: transform 400ms ease;
}

.panel.open {
  transform: translateX(0);
}

@media (prefers-reduced-motion: reduce) {
  .panel {
    transition: none;
    /* Panel still opens — just instantly */
  }
}
```

---

## Standard Duration Reference

| Duration | Use for |
|---|---|
| `150ms` | Color swaps, opacity, micro-interactions |
| `250ms` | Standard hover transitions, focus rings |
| `400ms` | Slide-in panels, complex multi-property transitions |
| `2500ms` | Insertion glow / confirmation animations |

**Never exceed 4 seconds** for any animation.

---

## prefers-reduced-motion — Required for Every Animation

Every `animation` or `transition` property MUST have a `@media (prefers-reduced-motion: reduce)` override.

```css
/* ✅ COMPLETE — has reduced-motion override */
.element {
  animation: fadeIn 250ms ease;
}

@media (prefers-reduced-motion: reduce) {
  .element {
    animation: none;
  }
}

/* ❌ INCOMPLETE — missing reduced-motion override */
.element {
  animation: fadeIn 250ms ease;
}
```

**Why this matters**: Users with vestibular disorders, epilepsy, or cognitive conditions can configure their OS to `prefers-reduced-motion: reduce`. Your animation will still run for them without this override.

---

## Canonical Green Glow Values

The "new item added" confirmation animation uses these exact values — do not approximate:

```css
box-shadow: 0 0 0 2px #1A7A34, 0 0 24px 6px rgba(26, 122, 52, 0.30);
```

- Inner ring: `2px solid #1A7A34` (success green)
- Outer glow: `24px blur, 6px spread, 30% opacity green`
- Duration: `2.5s ease-in-out`
- Hold at peak: 20%–60% of keyframe (40% of the duration)

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| No `@media (prefers-reduced-motion: reduce)` | Always add it — for every animation, no exceptions |
| Creating a custom spinner with `@keyframes rotate` | Use the existing `Spinner` component |
| Using `transition: all` | Be specific: `transition: background 250ms ease, opacity 150ms ease` |
| `animation-duration: 5s` | Cap at 4s for standard animations; 2.5s for glows |
| Using `ease-in` for hover-out transitions | Use `ease` or `ease-out` — `ease-in` feels abrupt at the end |
| Keyframe animation without `forwards` fill mode on one-shot animations | Add `animation: glowIn 2.5s ease-in-out forwards` so the element stays in its final state |
