# RULE: Theme Addition Process

## Overview

When adding a new theme to the Living Design 3.5 theme system, you MUST follow this checklist to ensure proper integration and inheritance.

## Mandatory Checklist

### ✅ Step 1: Determine Inheritance

Before creating files, determine where the theme fits in the inheritance tree:

- **Inherits LD Base directly?** → Standalone theme
- **Inherits Developer?** → Persona theme (Customer, Associate, Partner)
- **Inherits WCP?** → Commerce platform theme
- **Inherits AX?** → Advertising platform variant
- **Inherits PX?** → Partner platform variant

Refer to `THEME_INHERITANCE.md` for the complete tree structure.

### ✅ Step 2: Create Theme Directory

```bash
mkdir -p client/styles/themes/your-theme-name/
```

**Naming convention:**
- Use kebab-case: `sams-club`, `walmart-b2b`, `data-ventures`
- Match Airtable theme name exactly
- No spaces or special characters

### ✅ Step 3: Create Minimal semantic.css

```css
/**
 * [Theme Name] Theme
 * Generated from LivingDesign Airtable Sync + LD Base
 * 
 * INHERITANCE: [Describe inheritance path]
 * 
 * [Brief description of what this theme does]
 */

:root {
  /* ONLY override tokens that CHANGE for this theme */
  --ld-semantic-color-action-fill-primary: var(--ld-primitive-color-[X], #[HEX]);
  --ld-semantic-color-text-brand: var(--ld-primitive-color-[X], #[HEX]);
  
  /* DO NOT duplicate tokens that inherit unchanged */
  /* Inherits all other tokens from [parent theme] */
}
```

**Rules:**
- ❌ **NEVER** copy all 257+ tokens from base
- ✅ **ONLY** include tokens you're overriding
- ✅ Keep file under 100 lines (30-50 typical)
- ✅ Add inheritance comment
- ✅ Document what changes and why

### ✅ Step 4: Create primitive.css (if needed)

Only create `primitive.css` if you need to override primitive color values.

**Most themes DON'T need this** - they just override semantic tokens.

```css
/**
 * [Theme Name] Theme - Primitive Overrides
 * 
 * RARE: Only needed if primitive colors differ
 */

:root {
  /* Example: Custom magic gradient */
  --ld-primitive-color-magic-2: #a4fb6c;
}
```

### ✅ Step 5: Add to Theme Registry

**File**: `client/contexts/theme-registry.ts`

Add entry to `AVAILABLE_THEMES` array:

```typescript
{
  id: 'your-theme-id',
  name: 'Your Theme Name',
  description: 'Brief description for dropdown',
  primitiveCSS: '/styles/themes/your-theme-id/primitive.css',
  semanticCSS: '/styles/themes/your-theme-id/semantic.css',
  previewColor: '#HEX', // Brand color for visual indicator
  inherits: 'parent-theme-id', // Optional: for documentation
},
```

**Important:**
1. Add to correct section (Developer personas, WCP, AX, PX, or standalone)
2. Update the `Theme['id']` type union to include your new theme
3. Set correct `previewColor` (brand primary color)
4. Document inheritance with `inherits` field

### ✅ Step 6: Update THEME_INHERITANCE.md

Add theme to documentation:

```markdown
### Your Theme Name
- **Path**: `themes/your-theme-id/`
- **Inherits**: [Parent Theme]
- **Brand**: [Color and values]
- **Usage**: [When to use]
```

### ✅ Step 7: Test the Theme

1. Open Component Library page
2. Use Theme dropdown to select your theme
3. Verify:
   - ✅ Theme loads without errors
   - ✅ Brand colors apply correctly
   - ✅ Inherited tokens work
   - ✅ No console errors
   - ✅ Components render properly

### ✅ Step 8: Verify Inheritance Chain

Check browser DevTools:

```javascript
// In console:
getComputedStyle(document.documentElement)
  .getPropertyValue('--ld-semantic-color-action-fill-primary')
  
// Should show your theme's override, not base value
```

## Common Mistakes to Avoid

### ❌ DON'T: Copy All Base Tokens

```css
/* BAD - 257 lines of duplicated tokens */
:root {
  --ld-semantic-color-text: var(...);
  --ld-semantic-color-text-subtle: var(...);
  --ld-semantic-spacing-100: var(...);
  --ld-semantic-spacing-200: var(...);
  /* ... 253 more unchanged tokens ... */
}
```

### ✅ DO: Override Only What Changes

```css
/* GOOD - 5 lines of actual changes */
:root {
  --ld-semantic-color-action-fill-primary: var(--ld-primitive-color-purple-100, #6245b7);
  --ld-semantic-color-text-brand: var(--ld-primitive-color-purple-100, #6245b7);
  /* Everything else inherits automatically */
}
```

## Theme Override Examples

### Brand Color Change Only

```css
:root {
  /* Change primary brand color to purple */
  --ld-semantic-color-action-fill-primary: var(--ld-primitive-color-purple-100, #6245b7);
  --ld-semantic-color-text-brand: var(--ld-primitive-color-purple-100, #6245b7);
  --ld-semantic-color-border-brand: var(--ld-primitive-color-purple-100, #6245b7);
}
```

### Brand + Font Change

```css
:root {
  /* Brand colors */
  --ld-semantic-color-action-fill-primary: var(--ld-primitive-color-blue-100, #0071dc);
  
  /* Legacy font */
  --ld-semantic-font-body-large-family: Bogle;
  --ld-semantic-font-body-medium-family: Bogle;
}
```

### Platform-Specific Tokens (WCP)

```css
:root {
  /* WCP-specific tokens (wcp- prefix) */
  --wcp-semantic-color-action-fill-primary-alt: var(--ld-primitive-color-spark-100, #ffc220);
  --wcp-semantic-color-fill-savings-bold: var(--ld-primitive-color-red-100, #ea1100);
  --wcp-semantic-color-text-on-fill-social: var(--ld-primitive-color-magic-1, #0053e2);
}
```

## Validation Checklist

Before marking theme complete:

- [ ] Theme directory created with correct name
- [ ] `semantic.css` exists with inheritance comment
- [ ] `primitive.css` exists ONLY if needed (rare)
- [ ] File is under 100 lines (ideally 30-50)
- [ ] Added to `theme-registry.ts` AVAILABLE_THEMES
- [ ] Added to `theme-registry.ts` Theme['id'] type
- [ ] Updated `THEME_INHERITANCE.md`
- [ ] Tested in Component Library
- [ ] No console errors when switching
- [ ] Brand colors render correctly
- [ ] Inheritance chain verified

## File Size Guidelines

- **Base theme**: 80-100KB (complete token set)
- **Platform themes** (WCP, AX, PX): 3-5KB (platform tokens)
- **Brand themes**: 2-4KB (brand color overrides)
- **Persona themes**: 1-2KB (minimal/no overrides)

**If your theme file is >10KB**, you're likely duplicating base tokens. Review and remove duplicates.

## Quick Reference: Theme Types

| Type | Inherits | File Size | Example Tokens |
|------|----------|-----------|----------------|
| Persona | Developer | ~1KB | None (pure inheritance) |
| Platform | LD Base | ~4KB | Platform-specific (wcp-, ax-, px-) |
| Brand | LD Base/Platform | ~3KB | Brand colors, maybe fonts |
| Regional | LD Base | ~5KB | Brand + regional adjustments |

## When NOT to Create a Theme

Don't create a new theme if:
- ❌ Only 1-2 components need different colors → Use component props
- ❌ Temporary styling → Use inline styles or CSS modules
- ❌ A/B testing → Use feature flags
- ❌ User preferences → Use user settings, not themes

**Create a theme when:**
- ✅ Entire app/platform needs consistent brand
- ✅ Multiple pages/components share the style
- ✅ Brand identity is distinct (different company/product)
- ✅ Theme will be used long-term

---

**IMPORTANT**: After adding a theme, this rule file MUST be updated if the process changes.

Last updated: 2025-02-14
