# RULE: Token Usage Enforcement

## Overview

**ALL components MUST use Living Design tokens for styling values.** Hardcoded values are strictly prohibited except in rare, documented cases.

## Hard Rule

### ✅ REQUIRED: Use Tokens

**You MUST use tokens for:**

1. **Spacing** (padding, margin, gap, width, height)
   - Use: `var(--ld-primitive-scale-space-*)` or `var(--ld-semantic-spacing-*)`
   - ❌ NEVER: `padding: 8px` or `gap: 12px`
   - ✅ ALWAYS: `padding: var(--ld-primitive-scale-space-100)` or `gap: var(--ld-primitive-scale-space-150)`

2. **Border Radius** (border-radius, border-top-left-radius, etc.)
   - Use: `var(--ld-primitive-scale-border-radius-*)`
   - ❌ NEVER: `border-radius: 4px` or `border-radius: 8px`
   - ✅ ALWAYS: `border-radius: var(--ld-primitive-scale-border-radius-50)` or `var(--ld-primitive-scale-border-radius-100)`

3. **Border Width** (border, border-width, outline)
   - Use: `var(--ld-semantic-scale-border-width-*)`
   - ❌ NEVER: `border: 2px solid` or `border-width: 1px`
   - ✅ ALWAYS: `border-width: var(--ld-semantic-scale-border-width-interactive)`

4. **Typography** (font-size, line-height, font-weight, font-family)
   - Use: `var(--ld-semantic-font-*)`
   - ❌ NEVER: `font-size: 14px` or `line-height: 20px` or `font-family: Arial`
   - ✅ ALWAYS: `font-size: var(--ld-semantic-font-body-small-size)` or `line-height: var(--ld-semantic-font-body-small-line-height)`

5. **Colors** (background-color, color, border-color, fill, stroke)
   - Use: `var(--ld-semantic-color-*)`
   - ❌ NEVER: `color: #2e2f32` or `background: #0053e2`
   - ✅ ALWAYS: `color: var(--ld-semantic-color-text)` or `background: var(--ld-semantic-color-action-fill-primary)`

6. **Transitions** (transition, animation-duration)
   - Use: `var(--ld-primitive-duration-*)`
   - ❌ NEVER: `transition: all 0.2s` or `animation-duration: 0.15s`
   - ✅ ALWAYS: `transition: all var(--ld-primitive-duration-200)` or `animation-duration: var(--ld-primitive-duration-100)`

7. **Icon Sizes** (width/height of SVG icons)
   - Use: `var(--ld-semantic-scale-icon-*)`
   - ❌ NEVER: `width: 16px; height: 16px;` for icons
   - ✅ ALWAYS: `width: var(--ld-semantic-scale-icon-small)` or `var(--ld-semantic-scale-icon-medium)`

### ⚠️ EXCEPTIONS (Rare)

You MAY use hardcoded values ONLY when:

1. **Exact component height specifications** from design system
   - Example: `height: 32px` for Button small size (per LD 3.5 spec)
   - Must be documented with comment: `height: 32px; /* LD 3.5 spec */`

2. **Calculation values** that can't be tokened
   - Example: `calc(50% - 8px)` - the 8px should still be a token: `calc(50% - var(--ld-primitive-scale-space-100))`

3. **Unit-less values**
   - Example: `flex: 1`, `opacity: 0.8`, `z-index: 1000`

4. **Transform values**
   - Example: `transform: rotate(45deg)`, `translate(10px, 20px)` - but use tokens for px values

**All exceptions MUST have inline comments explaining why.**

---

## Violation Examples

### ❌ VIOLATIONS

```css
/* BAD - All hardcoded */
.myComponent {
  padding: 16px 20px;
  font-size: 14px;
  line-height: 20px;
  border-radius: 8px;
  background-color: #0053e2;
  border: 2px solid #2e2f32;
  transition: all 0.2s ease;
  gap: 12px;
}

/* BAD - Inline styles with hardcoded values */
<div style={{ padding: '16px', fontSize: '14px', color: '#2e2f32' }}>
```

### ✅ CORRECT

```css
/* GOOD - All tokens */
.myComponent {
  padding: var(--ld-primitive-scale-space-200) var(--ld-primitive-scale-space-250);
  font-size: var(--ld-semantic-font-body-small-size);
  line-height: var(--ld-semantic-font-body-small-line-height);
  border-radius: var(--ld-primitive-scale-border-radius-100);
  background-color: var(--ld-semantic-color-action-fill-primary);
  border: var(--ld-semantic-scale-border-width-interactive-focused) solid var(--ld-semantic-color-border);
  transition: all var(--ld-primitive-duration-200) ease;
  gap: var(--ld-primitive-scale-space-150);
}

/* GOOD - Inline styles with tokens */
<div style={{
  padding: 'var(--ld-primitive-scale-space-200)',
  fontSize: 'var(--ld-semantic-font-body-small-size)',
  color: 'var(--ld-semantic-color-text)'
}}>
```

---

## Enforcement

### Code Review Checklist

Before approving any component code:

- [ ] Run search for hardcoded px values: `grep -r ":\s*[0-9]+px" component.module.css`
- [ ] Check for hardcoded colors: Look for `#` in color properties
- [ ] Check for hardcoded transitions: Look for `0.` in transition/animation
- [ ] Verify all tokens exist in design system
- [ ] Test component in multiple themes to ensure tokens work

### Automated Detection

```bash
# Find hardcoded px values
grep -rn ":\s*[0-9]+px" client/components/ui/*.module.css

# Find hardcoded hex colors  
grep -rn "#[0-9a-fA-F]\{3,6\}" client/components/ui/*.module.css

# Find hardcoded transitions
grep -rn "transition.*0\.[0-9]s" client/components/ui/*.module.css
```

### Pull Request Requirements

All component PRs MUST:
1. Use tokens for all values (no hardcoded px/rem/hex/durations)
2. Include inline comments for any exceptions
3. Pass automated token usage check
4. Work correctly in all themes (test at least Walmart, Sam's Club, Walmart Business)

---

## Why This Matters

### ❌ Without Tokens (Problems)

```css
.button {
  background-color: #0053e2; /* Walmart blue */
  padding: 8px 16px;
  font-size: 14px;
}
```

**Problems:**
- ❌ Doesn't work in Sam's Club theme (needs #0086ed)
- ❌ Doesn't work in Bodega theme (needs green)
- ❌ Hard to maintain (change 8px spacing everywhere manually)
- ❌ Inconsistent (different components might use 8px vs 7px vs 9px)
- ❌ Doesn't respect user preferences (can't scale)

### ✅ With Tokens (Benefits)

```css
.button {
  background-color: var(--ld-semantic-color-action-fill-primary);
  padding: var(--ld-primitive-scale-space-100) var(--ld-primitive-scale-space-200);
  font-size: var(--ld-semantic-font-body-small-size);
}
```

**Benefits:**
- ✅ Works in ALL themes automatically
- ✅ Sam's Club gets #0086ed, Bodega gets green, automatically
- ✅ Single source of truth for spacing
- ✅ Consistent across all components
- ✅ Can scale with user preferences
- ✅ Easy to maintain (change token value once, updates everywhere)

---

## Token Not Found?

If you need a value that doesn't have a token:

### ❌ DON'T: Use hardcoded value

```css
/* BAD */
.component {
  padding: 18px; /* No token for 18px! */
}
```

### ✅ DO: Use closest token or request new token

```css
/* GOOD - Use closest token */
.component {
  padding: var(--ld-primitive-scale-space-200, 16px); /* Closest to 18px */
}

/* OR - Request new token from design system team */
/* File issue: "Need token for 18px spacing" */
```

---

## Migration Strategy

For existing components with hardcoded values:

1. **Identify** hardcoded values using grep
2. **Map** each value to appropriate token (see table above)
3. **Replace** value with token
4. **Test** in all themes
5. **Document** any exceptions with inline comments
6. **Update** component guidelines

### Example Migration

**Before**:
```css
.badge {
  padding: 0 4px;
  font-size: 10px;
  border-radius: 9999px;
}
```

**After**:
```css
.badge {
  padding: 0 var(--ld-primitive-scale-space-50);
  font-size: var(--ld-semantic-font-caption-size);
  border-radius: var(--ld-primitive-scale-border-radius-round);
}
```

---

## Validation

### Manual Check

1. Open component CSS module
2. Search for `: [number]` (regex: `:\s*\d`)
3. If found and NOT a token, it's a violation
4. Replace with appropriate token

### Automated Check (Future)

```json
// .stylelintrc.json
{
  "rules": {
    "declaration-property-value-disallowed-list": {
      "/^(padding|margin|gap|width|height|font-size|border-radius|border-width)/": [
        "/^[0-9]+(px|rem|em)$/",
        {
          "message": "Use LD tokens instead of hardcoded values"
        }
      ]
    }
  }
}
```

---

## Quick Reference

**Before writing any CSS:**

1. ✅ Check if token exists for your value
2. ✅ Use token with fallback: `var(--token-name, fallback)`
3. ✅ Document any hardcoded exceptions
4. ❌ NEVER use raw px/rem/hex without tokens

**This is a HARD RULE. No exceptions without documented justification.**

---

Last updated: 2025-02-14  
See also: `RULE_DesignTokenEnforcement.md`, `guidelines/design-system/DesignTokens.md`
