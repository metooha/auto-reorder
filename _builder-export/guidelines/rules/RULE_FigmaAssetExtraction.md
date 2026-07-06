# RULE: Figma Exportable Asset Extraction

## Purpose
This rule ensures that only explicitly marked exportable assets from Figma are extracted and used in the codebase, preventing confusion and maintaining design system integrity.

## Rule Statement

**When extracting assets from Figma designs:**
- ✅ **ONLY extract assets that are marked as "exportable" in Figma**
- ✅ Extract assets using the exact names provided by the designer
- ✅ Preserve the file format specified (SVG, PNG, WebP, etc.)
- ❌ **DO NOT extract every image or graphic visible in the Figma file**
- ❌ DO NOT rename assets without designer approval
- ❌ DO NOT convert file formats arbitrarily

## Rationale

1. **Designer Intent**: Exportable assets are explicitly marked by designers to indicate which elements should be extracted for development
2. **Design System Consistency**: Non-exportable elements might be reference images, mockups, or temporary placeholders
3. **Performance**: Extracting unnecessary assets bloats the codebase and increases bundle size
4. **Clarity**: Clear distinction between production assets and design reference materials

## How to Identify Exportable Assets in Figma

### In Figma Design Files (HTML Export)
When reading Figma HTML exports, exportable assets are typically:
- Embedded with `<img>` tags that have specific Builder.io TEMP URLs
- Referenced multiple times across different frames/variants
- Have semantic, descriptive layer names (not auto-generated names)

### Asset Naming Conventions
Exportable assets usually follow patterns like:
- `associate-waving.svg` ✅
- `network-issue.svg` ✅
- `icon-search.svg` ✅
- `Rectangle 123` ❌ (auto-generated)
- `Untitled` ❌ (placeholder)

## Implementation Guidelines

### 1. Verify Asset Exportability
Before extracting any asset:
```bash
# Check if the asset is referenced in multiple places
# Exportable assets are typically reused across variants
```

### 2. Use Provided URLs
When assets are provided as attachments with semantic names:
```typescript
// ✅ CORRECT - Use the provided asset URL
<img src="/illustrations/associate-waving.svg" alt="Associate waving" />

// ❌ WRONG - Don't extract every visible image
<img src="/temp/auto-generated-image-123.png" />
```

### 3. Organize Assets Properly
```
public/
  illustrations/     # Illustration SVGs (exportable)
    associate-waving.svg
    associate-glasses.svg
    network-issue.svg
  icons/            # Icon SVGs (exportable)
    search.svg
    filter.svg
  images/           # Photos/images (exportable)
    hero-banner.jpg
```

## Example: Content Message Illustrations

### Correct Approach ✅
Designer provides 3 exportable illustrations:
1. `Associate.svg` → `associate-waving.svg`
2. `Associate-find.svg` → `associate-glasses.svg`
3. `Network Issue.svg` → `network-issue.svg`

These are explicitly provided as attachments with semantic names, indicating they are production-ready exports.

### Incorrect Approach ❌
Extracting all images visible in the Figma:
- Background textures
- Reference photos
- Design annotations
- Prototype overlays
- Auto-generated placeholders

## Validation Checklist

Before committing extracted assets:
- [ ] Asset was explicitly marked as exportable or provided by designer
- [ ] Asset has a semantic, descriptive filename
- [ ] Asset is optimized for production (SVGs are cleaned, images are compressed)
- [ ] Asset is placed in the correct directory structure
- [ ] Asset is referenced in code with proper paths
- [ ] Unused/non-exportable assets are not extracted

## Communication with Designers

When in doubt:
1. Ask: "Which assets should be exported for production?"
2. Request: "Can you mark exportable assets in Figma?"
3. Confirm: "Are these the only illustrations/icons needed?"

## Related Rules
- [RULE_DesignSystemEnforcement](./RULE_DesignSystemEnforcement.md)
- [RULE_IconUsage](./RULE_IconUsage.md)

## Enforcement
This rule is enforced through:
- Code review checks for asset extraction
- Asset audit during design handoff
- Documentation of asset provenance

---

**Last Updated**: 2025-02-16  
**Status**: Active  
**Applies To**: All Figma design implementations
