---
name: fix-token-violations
description: Audit and replace hardcoded colors and values with semantic tokens
---

## What This Skill Does

Teaches you how to audit a component or page for hardcoded colors, primitive token references, and hardcoded spacing/font values — and how to replace each one with the correct semantic token.

## When to Use It

- A component looks wrong in a non-default theme (wrong color, doesn't change)
- You're reviewing someone else's code before merge
- Running a codebase audit for theme compliance
- Fixing an existing component that pre-dates the token system

---

## Step 1 — Run the Detection Grep Commands

Run these from the project root to find violations:

```bash
# 1. Hardcoded hex colors in CSS files
grep -rn "#[0-9a-fA-F]\{6\}\|#[0-9a-fA-F]\{3\}" client/components/ client/pages/ --include="*.css"

# 2. Primitive color tokens used directly in component/page CSS (forbidden)
grep -rn "ld-primitive-color-" client/components/ client/pages/ --include="*.css"

# 3. Hardcoded pixel font sizes (should use token vars)
grep -rn "font-size: [0-9]" client/components/ client/pages/ --include="*.css"

# 4. Hardcoded pixel padding (should use token vars)
grep -rn "padding: [0-9]\|padding-top: [0-9]\|padding-bottom: [0-9]\|padding-left: [0-9]\|padding-right: [0-9]" \
  client/components/ client/pages/ --include="*.css"

# 5. Hardcoded border-radius (should use token vars)
grep -rn "border-radius: [0-9]" client/components/ client/pages/ --include="*.css"

# 6. Inline hardcoded colors in TSX files
grep -rn "backgroundColor: '#\|color: '#\|background: '#\|borderColor: '#" \
  client/components/ client/pages/ --include="*.tsx"
```

---

## Step 2 — Triage Each Violation

For each result, decide which category it falls into:

| Violation type | Action |
|---|---|
| Hardcoded hex color | Replace with semantic color token |
| `--ld-primitive-color-*` in CSS | Replace with the corresponding semantic token |
| Hardcoded px font size | Replace with `var(--ld-semantic-font-*-size, fallback)` |
| Hardcoded px padding/gap | Replace with `var(--ld-semantic-spacing-*, fallback)` |
| Hardcoded border-radius | Replace with `var(--ld-primitive-scale-borderradius-*, fallback)` |
| Inline hex in `.tsx` style prop | Replace with token var, or move to CSS module |

---

## Step 3 — Fix Each Violation

### Fix: Hardcoded hex color

```css
/* BEFORE */
.banner { background: #EBF1FF; color: #002E99; }

/* AFTER — identify the semantic role of each color */
.banner {
  background: var(--ld-semantic-color-fill-brand-subtle, #EBF1FF);
  color: var(--ld-semantic-color-text-brand-bold, #002E99);
}
```

Reference: `SKILL_MapFigmaToTokens.md` for the full hex → token mapping table.

---

### Fix: Primitive color token in component CSS

```css
/* BEFORE — bypasses theme override layer */
.footer { background: var(--ld-primitive-color-blue-10, #E9F1FE); }
.link   { color: var(--ld-primitive-color-blue-130, #002E99); }

/* AFTER — semantic tokens allow theme overrides */
.footer { background: var(--ld-semantic-color-fill-brand-subtle, #E9F1FE); }
.link   { color: var(--ld-semantic-color-text-brand-bold, #002E99); }
```

> **Why**: Primitive tokens resolve to fixed values regardless of theme. Semantic tokens can be remapped per brand in the theme override files.

---

### Fix: Hardcoded font size

```css
/* BEFORE */
.label { font-size: 14px; font-weight: 700; line-height: 1.4; }

/* AFTER */
.label {
  font-size: var(--ld-semantic-font-body-small-size, 0.875rem);
  font-weight: var(--ld-semantic-font-body-small-weight-alt, 700);
  line-height: var(--ld-semantic-font-body-small-line-height, 1.25rem);
}
```

---

### Fix: Hardcoded padding

```css
/* BEFORE */
.card { padding: 16px 24px; gap: 8px; }

/* AFTER */
.card {
  padding: var(--ld-semantic-spacing-200, 1rem) var(--ld-semantic-spacing-300, 1.5rem);
  gap: var(--ld-semantic-spacing-100, 0.5rem);
}
```

Spacing token reference:

| px | Token |
|---|---|
| 4px | `--ld-semantic-spacing-50` |
| 8px | `--ld-semantic-spacing-100` |
| 12px | `--ld-semantic-spacing-component-padding-medium` |
| 16px | `--ld-semantic-spacing-200` |
| 24px | `--ld-semantic-spacing-300` |
| 32px | `--ld-semantic-spacing-400` |

---

### Fix: Hardcoded border-radius

```css
/* BEFORE */
.chip { border-radius: 9999px; }
.card { border-radius: 8px; }

/* AFTER */
.chip { border-radius: var(--ld-primitive-scale-borderradius-full, 9999px); }
.card { border-radius: var(--ld-primitive-scale-borderradius-100, 0.5rem); }
```

---

### Fix: Inline hardcoded color in TSX

```tsx
/* BEFORE */
<div style={{ backgroundColor: '#0071DC', color: '#FFFFFF', padding: '16px' }}>

/* AFTER — option 1: use token in inline style */
<div style={{
  backgroundColor: 'var(--ld-semantic-color-action-fill-primary)',
  color: 'var(--ld-semantic-color-text-onfill-brand)',
  padding: 'var(--ld-semantic-spacing-200)',
}}>

/* AFTER — option 2 (preferred): move static styles to CSS module */
<div className={styles.container}>
```

Only keep inline styles for genuinely dynamic values (e.g., `objectPosition`, drag width, tooltip coordinates). Static colors belong in the CSS module.

---

## Step 4 — Verify the Fix

After replacing all violations, verify:

1. Run the grep commands again — they should return zero results
2. Open the app and switch to **Bodega (green)** theme — brand colors should be green
3. Switch to **Walmart Legacy** — verify correct rendering
4. Switch back to **Walmart default** — verify nothing broke

---

## Worked Example — Fixing a Footer Component

**Before audit** (`DesktopFooter.module.css`):

```css
.feedbackSection {
  background: var(--ld-primitive-color-blue-10, #E9F1FE);   /* ❌ primitive */
}

.feedbackDivider {
  border-color: var(--ld-primitive-color-blue-30, #ACC8FB);  /* ❌ primitive */
}

.linksSection {
  background: #002E99;                                        /* ❌ hardcoded hex */
}
```

**After fix**:

```css
.feedbackSection {
  background: var(--ld-semantic-color-fill-brand-subtle, #E9F1FE);        /* ✅ */
}

.feedbackDivider {
  border-color: var(--ld-semantic-color-border-brand, #0053e2);            /* ✅ */
  opacity: 0.3;
}

.linksSection {
  background: var(--ld-semantic-color-action-fill-primary-pressed, #002E99); /* ✅ */
}
```

**Result**: Footer now correctly turns green in Bodega theme with no component changes.

---

## Exceptions — Values That Are Allowed as Hardcodes

Not every hardcoded value is a violation. These are intentional:

| Pattern | Allowed? | Why |
|---|---|---|
| `opacity: 0.8` | ✅ Yes | Unit-less, not a color |
| `z-index: 1000` | ✅ Yes | Layout concern, not a token |
| `flex: 1` | ✅ Yes | Layout shorthand |
| `transform: rotate(45deg)` | ✅ Yes | Transform values |
| `height: 44px; /* LD 3.5 spec */` | ✅ Yes | Exact spec value with comment |
| `aspect-ratio: 1` | ✅ Yes | Ratio, not a token |
| `width: 100%` | ✅ Yes | Structural, not a design value |
| `background: #0071DC` | ❌ No | Use token |
| `font-size: 14px` | ❌ No | Use font token |
| `padding: 16px` | ❌ No | Use spacing token |
| `var(--ld-primitive-color-blue-10)` in component CSS | ❌ No | Use semantic token |

---

## Common Mistakes When Fixing

| Mistake | Fix |
|---|---|
| Adding a fallback that doesn't match the token's actual value | Check `base/semantic.css` for the real resolved value |
| Using a semantic token with the wrong semantic role | A blue hex might map to `text-brand-bold`, not `action-fill-primary` — check the role, not the color |
| Fixing the component but not running the theme test | Always switch themes after fixing to confirm it works |
| Moving a static style to inline instead of a CSS module | Static styles belong in CSS modules — only truly dynamic values go inline |
