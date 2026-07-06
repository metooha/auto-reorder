---
title: Add a Theme Override
scope: skill
based-on: RULE_ThemeCompliance.mdc, RULE_ThemeAddition.mdc
last_updated: 2025-02-28
---

## What This Skill Does

Shows you how to make one brand look visually different from another (e.g., Bodega green vs. Walmart blue) by editing only the theme override file — without touching any component CSS.

## When to Use It

- A component looks correct in the default Walmart theme but wrong in another theme (e.g., still blue when it should be green)
- A new brand theme needs a different color for a shared UI element
- You've confirmed the component uses semantic tokens correctly, but the visual still doesn't change with the theme

---

## How the Theme System Works

```
Component CSS
  └── uses: var(--ld-semantic-color-fill-brand-subtle)
        │
        ▼
  base/semantic.css          →  #EBF1FF  (blue — Walmart default)
  bodega/semantic.css        →  #eaf3e6  (green — Bodega override)
  walmart-legacy/semantic.css →  #eaf3e6  (green — Bogle override)
```

The component never changes. The theme file remaps the token.

---

## Step-by-Step

### Step 1 — Confirm the component uses a semantic token

Open the component's `.module.css` and verify the color uses `--ld-semantic-*`:

```css
/* ✅ This WILL theme correctly */
.nav { background: var(--ld-semantic-color-fill-brand-subtle, #EBF1FF); }

/* ❌ This will NOT theme — it's hardcoded */
.nav { background: #EBF1FF; }

/* ❌ This will NOT theme — primitive bypasses override layer */
.nav { background: var(--ld-primitive-color-blue-10, #E9F1FE); }
```

If the component uses a primitive token or hardcode, fix that first (see `SKILL_FixTokenViolations.md`).

### Step 2 — Identify which semantic token to override

Run a theme compliance check to see which token is producing the wrong color:

```bash
# Find all semantic token usages in the component
grep -n "ld-semantic-color" client/components/walmart/YourComponent.module.css
```

Note the token name(s) that need to change per brand.

### Step 3 — Find the theme's semantic override file

Each brand theme has its own semantic override file:

```
public/styles/themes/
  base/semantic.css             ← Default values (Walmart blue)
  bodega/semantic.css           ← Bodega/green overrides
  walmart-legacy/semantic.css   ← Bogle/Walmart Legacy overrides
  sams-club/semantic.css        ← Sam's Club overrides
  developer/semantic.css        ← Developer theme
```

Open the theme file that should look different.

### Step 4 — Add the override

Inside the theme's `semantic.css`, add your override inside the `:root` block:

```css
/* public/styles/themes/bodega/semantic.css */
:root {
  /* Existing overrides ... */

  /* Make SubNav and brand banners green instead of blue */
  --ld-semantic-color-fill-brand-subtle: var(--ld-primitive-color-green-10, #eaf3e6);
  --ld-semantic-color-text-brand-bold:   var(--ld-primitive-color-green-160, #0d2901);
  --ld-semantic-color-fill-brand-bold:   var(--ld-primitive-color-green-160, #0d2901);
  --ld-semantic-color-border-brand-bold: var(--ld-primitive-color-green-160, #0d2901);
}
```

Always point to a primitive token, with the computed hex as a fallback.

### Step 5 — Verify in the app

1. Open the app and switch to the theme you just edited
2. The component should now render with the overridden color
3. Switch back to the default theme — it should be unchanged
4. Check all other themes — they should be unaffected

---

## Available Primitive Green Tokens (for Bodega / Walmart Legacy)

```css
var(--ld-primitive-color-green-10,  #eaf3e6)   /* Subtle green — SubNav background */
var(--ld-primitive-color-green-40,  #9dce8f)   /* Light green */
var(--ld-primitive-color-green-80,  #4a8f3f)   /* Mid green */
var(--ld-primitive-color-green-130, #1a5c12)   /* Dark green — links, icons */
var(--ld-primitive-color-green-160, #0d2901)   /* Very dark green — bold text */
```

## Available Primitive Blue Tokens (Walmart default)

```css
var(--ld-primitive-color-blue-10,  #E9F1FE)    /* Subtle blue */
var(--ld-primitive-color-blue-70,  #0071DC)    /* Walmart blue */
var(--ld-primitive-color-blue-100, #0053e2)    /* Mid blue */
var(--ld-primitive-color-blue-130, #002E99)    /* Dark blue — bold text */
```

---

## Worked Example — Making SubNav Green in Bodega Theme

**Problem**: SubNav background is blue in all themes. Bodega should be green.

**1. Component CSS** (already correct — uses semantic token):
```css
/* client/components/walmart/SubNav.module.css */
.subNav {
  background: var(--ld-semantic-color-fill-brand-subtle, #EBF1FF);
}
```

**2. Base theme value** (`public/styles/themes/base/semantic.css`):
```css
--ld-semantic-color-fill-brand-subtle: var(--ld-primitive-color-blue-10, #EBF1FF);
```

**3. Bodega override** (`public/styles/themes/bodega/semantic.css`):
```css
:root {
  --ld-semantic-color-fill-brand-subtle: var(--ld-primitive-color-green-10, #eaf3e6);
}
```

**Result**: SubNav turns green in Bodega, stays blue in Walmart. No component change required.

---

## Which Tokens Are Brand-Sensitive?

These semantic tokens change per brand theme and are the most common override targets:

```css
--ld-semantic-color-fill-brand-subtle       /* Nav, banner backgrounds */
--ld-semantic-color-fill-brand-bold         /* Bold brand fills */
--ld-semantic-color-text-brand              /* Brand body text */
--ld-semantic-color-text-brand-bold         /* Bold brand text / headings */
--ld-semantic-color-border-brand            /* Brand borders */
--ld-semantic-color-border-brand-bold       /* Bold brand borders */
--ld-semantic-color-action-fill-primary     /* Primary button / CTA */
--ld-semantic-color-action-fill-primary-hovered
--ld-semantic-color-action-fill-primary-pressed
```

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Adding override to `base/semantic.css` | Only add brand-specific values to the brand's theme file |
| Pointing to a hex value directly: `--token: #eaf3e6` | Always point to a primitive: `--token: var(--ld-primitive-color-green-10, #eaf3e6)` |
| Overriding in the component CSS itself | Never — overrides belong in the theme file only |
| Using a primitive that doesn't exist in the primitive file | Check `public/styles/themes/base/primitive.css` for available primitives |
| Forgetting to check other themes after adding an override | Switch through all themes to verify no unintended side effects |
