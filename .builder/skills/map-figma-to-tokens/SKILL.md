---
name: map-figma-to-tokens
description: Translate Figma hex colors spacing and fonts into semantic tokens
---

## What This Skill Does

Teaches you how to look at a Figma design frame and translate every color, spacing value, font style, and border radius into the correct semantic token — without ever writing a hex color.

## When to Use It

- Implementing a new component or page from a Figma design
- Figma shows specific color values (e.g., `#0071DC`, `rgba(0, 46, 153, 1)`)
- You're not sure which token maps to a particular visual

---

## The Core Principle

Figma designs are specified with primitive values. Your job is to identify the **semantic role** of that value, not match the hex code.

```
Figma shows: #0071DC (Walmart blue)
Your brain: "This is the primary action color"
You write:  var(--ld-semantic-color-action-fill-primary, #0071DC)
```

---

## Step-by-Step

### Step 1 — Read the Figma HTML output

When a Figma design is provided, the HTML contains token names directly. Look for patterns like:

```html
style="color: ld-semantic-color-text-onfill-brand; background: ld-semantic-color-fill-brand-subtle"
```

These token names translate directly to CSS variables:

```css
color: var(--ld-semantic-color-text-onfill-brand);
background: var(--ld-semantic-color-fill-brand-subtle);
```

### Step 2 — Identify the color's semantic role

When the Figma output shows a raw hex value instead of a token name, ask: **what is this color doing?**

| If the color is used for... | Use this token |
|---|---|
| Primary button fill | `--ld-semantic-color-action-fill-primary` |
| Primary button text | `--ld-semantic-color-action-text-on-fill-primary` |
| Subtle brand background (nav, banners) | `--ld-semantic-color-fill-brand-subtle` |
| Bold brand text (headings, labels) | `--ld-semantic-color-text-brand-bold` |
| Text on a brand-filled surface | `--ld-semantic-color-text-onfill-brand` |
| Text on a dark/inverse surface | `--ld-semantic-color-text-onfill-inverse` |
| Primary body text | `--ld-semantic-color-text` |
| Secondary/muted body text | `--ld-semantic-color-text-subtle` |
| White surface / card background | `--ld-semantic-color-surface` |
| Subtle fill (light gray) | `--ld-semantic-color-fill-subtle` |
| Dark/inverse fill | `--ld-semantic-color-fill-inverse` |
| Success/positive text | `--ld-semantic-color-text-positive` |
| Error/destructive text | `--ld-semantic-color-text-negative` |
| Warning text | `--ld-semantic-color-text-warning` |
| Separator / divider line | `--ld-semantic-color-separator` |
| Border (interactive element) | `--ld-semantic-color-border-strong` |
| Info fill | `--ld-semantic-color-fill-info-subtle` |

### Step 3 — Map known Walmart hex values to tokens

| Figma hex | Semantic token |
|---|---|
| `#0071DC` | `--ld-semantic-color-action-fill-primary` |
| `#0060B8` | `--ld-semantic-color-action-fill-primary-hovered` |
| `#004C94` | `--ld-semantic-color-action-fill-primary-pressed` |
| `#002E99` | `--ld-semantic-color-text-brand-bold` |
| `#EBF1FF` | `--ld-semantic-color-fill-brand-subtle` |
| `#FFFFFF` | `--ld-semantic-color-text-onfill-brand` or `--ld-semantic-color-surface` |
| `#2E2F32` | `--ld-semantic-color-text` |
| `#74767C` | `--ld-semantic-color-text-subtle` |
| `#F2F2F2` | `--ld-semantic-color-fill-subtle` |
| `#1A1A1A` | `--ld-semantic-color-fill-inverse` |
| `#E5E5E5` | `--ld-semantic-color-separator` |

### Step 4 — Map spacing values to tokens

Figma spacing values map to the semantic spacing scale:

| Figma value | Semantic token |
|---|---|
| 4px | `var(--ld-semantic-spacing-50, 0.25rem)` |
| 8px | `var(--ld-semantic-spacing-100, 0.5rem)` |
| 12px | `var(--ld-semantic-spacing-component-padding-medium, 0.75rem)` |
| 16px | `var(--ld-semantic-spacing-200, 1rem)` |
| 24px | `var(--ld-semantic-spacing-300, 1.5rem)` |
| 32px | `var(--ld-semantic-spacing-400, 2rem)` |
| 40px | `var(--ld-semantic-spacing-500, 2.5rem)` |

### Step 5 — Map typography values to tokens

| Figma style | Semantic token |
|---|---|
| Body Small (14px, regular) | `--ld-semantic-font-body-small-size` + `weight-default` |
| Body Small Bold (14px, 700) | `--ld-semantic-font-body-small-size` + `weight-alt` |
| Body Medium (16px) | `--ld-semantic-font-body-medium-size` |
| Heading Small | `--ld-semantic-font-heading-small-size` |
| Heading Medium | `--ld-semantic-font-heading-medium-size` |
| Heading Large | `--ld-semantic-font-heading-large-size` |
| Font family (all) | `--ld-semantic-font-family-sans` |

### Step 6 — Map border radius values

| Figma value | Primitive token |
|---|---|
| 4px | `var(--ld-primitive-scale-borderradius-50, 0.25rem)` |
| 8px | `var(--ld-primitive-scale-borderradius-100, 0.5rem)` |
| 16px | `var(--ld-primitive-scale-borderradius-200, 1rem)` |
| 9999px (pill) | `var(--ld-primitive-scale-borderradius-full, 9999px)` |

### Step 7 — Map icon sizes

| Figma size | Semantic token |
|---|---|
| 16px icon | `var(--ld-semantic-scale-icon-small, 1rem)` |
| 24px icon | `var(--ld-semantic-scale-icon-medium, 1.5rem)` |
| 32px icon | `var(--ld-semantic-scale-icon-large, 2rem)` |

---

## Worked Example

**Figma shows**: A banner with a blue background (`#0071DC`), white text, and an icon.

**Before (wrong)**:
```css
.banner {
  background: #0071DC;
  color: #FFFFFF;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
}
```

**After (correct)**:
```css
.banner {
  background: var(--ld-semantic-color-action-fill-primary, #0071DC);
  color: var(--ld-semantic-color-text-onfill-brand, #FFFFFF);
  padding: var(--ld-semantic-spacing-component-padding-medium, 0.75rem)
           var(--ld-semantic-spacing-200, 1rem);
  border-radius: var(--ld-primitive-scale-borderradius-100, 0.5rem);
  font-size: var(--ld-semantic-font-body-small-size, 0.875rem);
  font-weight: var(--ld-semantic-font-body-small-weight-alt, 700);
}
```

---

## What to Do When There's No Matching Token

If you cannot find a semantic token for a value:

1. **Check** `public/styles/themes/base/semantic.css` — search for the hex value in comments
2. **Check** `guidelines/design-system/DesignTokens.md` for the full reference
3. **Use the closest semantic token** that matches the color's role (don't match exact hex — match purpose)
4. **Never create a new CSS variable** — the token system is comprehensive

If a color genuinely doesn't exist in the semantic system, it may be a new brand color. In that case, add it as a new semantic token in `base/semantic.css` and as an override in each theme file.

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Copying hex from Figma directly | Ask: what is this color *for*? Find the token by role |
| Using `--ld-primitive-color-blue-130` in CSS | Map to `--ld-semantic-color-text-brand-bold` instead |
| Hardcoding `14px` for body text | Use `var(--ld-semantic-font-body-small-size, 0.875rem)` |
| Writing `padding: 16px` | Use `var(--ld-semantic-spacing-200, 1rem)` |
| Matching hex exactly but picking wrong token | Colors can be shared — pick the token that matches the *semantic role*, not the value |
