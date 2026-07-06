# Design System Rules - Master Index

**Quick reference for all mandatory design system rules and enforcement policies**

---

## 🎯 Critical Rules (ALWAYS ENFORCE)

### 0. Dev Server Health Check
**File**: `RULE_DevServerHealthCheck.md`

**When**: After completing ANY code changes

**Key Requirements**:
- ✅ ALWAYS check dev server logs after finishing changes
- ✅ ALWAYS restart if compilation errors are found
- ✅ NEVER wait for the user to report a blank page
- ✅ Verify clean startup after any restart

---

### 1. Design System Enforcement (Tokens + Icons)
**File**: `RULE_DesignSystemEnforcement.md` 🆕

**When**: ALL code - components, pages, styles, and designs

**Key Requirements**:
- ✅ NEVER use hard-coded hex colors, spacing, or values
- ✅ NEVER create inline SVG icons
- ✅ NEVER use external icon libraries (react-icons, heroicons)
- ✅ ALWAYS use semantic design tokens (624 tokens available)
- ✅ ALWAYS use icons from centralized library (303 icons)
- ✅ ALWAYS use LD components (Button, not inline styled buttons)

**Quick Check**:
```tsx
/* ❌ WRONG */
<button style={{ backgroundColor: '#0071DC', padding: '16px' }}>
  <svg><path d="..."/></svg>
</button>

/* ✅ CORRECT */
import { Button } from '@/components/ui/Button';
import { Search } from '@/components/icons';
<Button variant="primary" leading={<Search />}>Click</Button>
```

**New Icon Requirements**:
- ✅ Square linecap (`strokeLinecap="square"`)
- ✅ 1.5px stroke width
- ✅ 20x20 viewBox
- ✅ currentColor for theming

---

### 2. Design Token Enforcement
**File**: `RULE_DesignTokenEnforcement.md`

**When**: All new designs, Builder.io imports, AI-generated code

**Key Requirements**:
- ✅ NEVER use hard-coded colors, spacing, or typography
- ✅ NEVER create new CSS custom properties/tokens
- ✅ ALWAYS use semantic tokens (not primitive) for colors
- ✅ ALWAYS include interactive states (hover, focus, active, disabled)

**Quick Check**:
```css
/* ❌ WRONG */
.button { background: #0053e2; padding: 16px; }

/* ✅ CORRECT */
.button {
  background: var(--ld-semantic-color-action-fill-primary);
  padding: var(--ld-primitive-scale-space-200);
}
```

---

### 3. Icon Usage and Management
**File**: `RULE_IconUsage.md`

**When**: Adding icons to designs, Builder.io imports, new components

**Key Requirements**:
- ✅ ALWAYS search 304 existing icons first
- ✅ NEVER create duplicate icons
- ✅ NEVER add to core `icons/` folder (use `icons-custom/` for new)
- ✅ ALWAYS check Component Library at `/component-library#icons`

**Quick Check**:
```tsx
/* ❌ WRONG - Creating duplicate */
// Don't create SearchIcon.tsx if Search.tsx exists!

/* ✅ CORRECT - Use existing */
import { Search } from '@/components/icons';
```

**Icon Library Stats**:
- 303 icons available across 15+ categories
- Core library: `client/components/icons/`
- Custom icons: `client/components/icons-custom/`

---

### 4. LinkButton and Spot Icon Usage
**File**: `RULE_LinkButtonAndSpotIcon.md`

**When**: Adding link-styled buttons or icon indicators to todo items, action rows, or cards

**Key Requirements**:
- ✅ ALWAYS use `LinkButton` from `@/components/ui/LinkButton` — never custom inline link buttons
- ✅ ALWAYS use round Spot Icon pattern (brand-subtle background, `borderRadius: 50%`) — never square placeholders
- ❌ NEVER override LinkButton color or weight with custom CSS
- ❌ NEVER use blue bold text for link buttons (LD 3.5 uses regular weight, black text)

**Quick Check**:
```tsx
/* ❌ WRONG */
<button style={{ color: '#0053E2', fontWeight: 700, textDecoration: 'underline' }}>Link</button>

/* ✅ CORRECT */
import { LinkButton } from '@/components/ui/LinkButton';
<LinkButton>Link</LinkButton>
```

---

### 5. Figma Exportable Asset Extraction
**File**: `RULE_FigmaAssetExtraction.md` 🆕

**When**: Implementing Figma designs, extracting assets from design files

**Key Requirements**:
- ✅ ONLY extract assets marked as "exportable" in Figma
- ✅ Use exact names provided by designer
- ✅ Preserve specified file formats (SVG, PNG, WebP)
- ❌ NEVER extract every visible image/graphic
- ❌ NEVER rename assets without approval
- ❌ NEVER convert formats arbitrarily

**Quick Check**:
```tsx
/* ✅ CORRECT - Exportable assets with semantic names */
associate-waving.svg
network-issue.svg
associate-glasses.svg

/* ❌ WRONG - Auto-generated or non-exportable */
Rectangle 123.png
Untitled.jpg
temp-image-xyz.webp
```

**Asset Organization**:
```
public/
  illustrations/  # Production illustrations (exportable)
  icons/         # Production icons (exportable)
  images/        # Production images (exportable)
```

---

### 2b. Guidelines Page Sync
**File**: `RULE_GuidelinesPageSync.md`

**When**: After ANY change to files in the `guidelines/` directory

**Key Requirements**:
- ✅ ALWAYS update `client/pages/component-library/GuidelinesDocIndex.tsx` when adding/removing/renaming guideline files
- ✅ Add new entries with `name`, `path`, and `purpose` to the correct section in `docSections`
- ✅ Remove entries for deleted files
- ✅ Keep the Documentation Index tab on the Guidelines page in sync with actual files

---

## 📚 Component Guidelines

### 3. Living Design Component API Reference
**File**: `LivingDesign-Component-Reference.md` 🆕

**When**: Using ANY Living Design component from `@livingdesign/react`

**What's Included**:
- ✅ 40+ Living Design components with complete API documentation
- ✅ All prop definitions with types (required vs optional)
- ✅ Component variants and sizing options
- ✅ Import statements for each component
- ✅ Usage guidance and examples

**Quick Reference**:
```tsx
// Alert Component
import { Alert } from '@livingdesign/react'
<Alert variant="info">Message</Alert>

// Button Component
import { Button } from '@livingdesign/react'
<Button variant="primary" size="medium">Click</Button>

// Card Component
import { Card, CardHeader, CardContent } from '@livingdesign/react'
<Card>
  <CardHeader title="Title" />
  <CardContent>Content</CardContent>
</Card>
```

### 4. Component Reuse Policy
**Reference**: Custom rules in system prompt

**When**: Creating any new UI component

**Key Requirements**:
- ✅ Check `LivingDesign-Component-Reference.md` for @livingdesign/react components FIRST
- ✅ Search `client/components/ui/` for custom components
- ✅ Use Living Design 3.5 components (Button, Tag, ButtonGroup, etc.)
- ✅ Never create custom buttons with inline styles
- ✅ Consolidate duplicates immediately

**Component Priority**:
1. Living Design components from `@livingdesign/react` (see Component Reference)
2. Living Design 3.5 components (`client/components/ui/` with uppercase)
3. Shadcn/Radix components (lowercase names)
4. Custom components (only if no equivalent exists)

---

### 5. Responsive Layout & Page Structure
**File**: `RULE_ResponsiveLayout.md`

**When**: Creating ANY new page, view, or layout component

**Key Requirements**:
- ✅ MUST use standard shell (MastHead + AppSidebar + scrollable main)
- ✅ MUST fill full available width within the shell (no max-width constraints)
- ✅ MUST use standard breakpoints: 1024px, 768px, 480px
- ✅ MUST reduce padding at each breakpoint (32 → 24 → 16 → 12)
- ✅ MUST stack multi-column layouts at 768px
- ✅ MUST reduce grid columns at 1024px and 768px
- ✅ MUST scale page title to 24px at 768px
- ✅ MUST stack form rows vertically at 768px
- ✅ MUST use 8px spacing multiples
- ❌ NEVER invent new breakpoints
- ❌ NEVER omit responsive media queries from grids or multi-column layouts

**Quick Check**:
```css
/* ❌ WRONG — max-width constrains content, no breakpoints */
.page { max-width: 1280px; margin: 0 auto; padding: 40px 60px; }
.grid { grid-template-columns: repeat(4, 1fr); }

/* ✅ CORRECT — Full width within shell, responsive */
.page { width: 100%; padding: 24px 32px; }
.grid { grid-template-columns: repeat(4, 1fr); }
@media (max-width: 1024px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) { .page { padding: 16px; } .grid { grid-template-columns: 1fr; } }
```

---

### 6. Panel Design Requirements
**File**: `Panel.md`

**When**: Creating any panel, drawer, or sidebar component

**Key Requirements**:
- ✅ MUST be resizable (min: 420px, max: 800px)
- ✅ MUST have resize handle with visual indicator
- ✅ MUST persist width to localStorage
- ✅ MUST be responsive for small screens

**Reference Implementation**: `client/components/RecommendationsPanel.tsx`

---

## 🎨 Design System Resources

### Token Documentation
- **Primitive tokens**: `styles/primitive.css` (364 lines)
- **Semantic tokens**: `styles/semantic.css` (648 lines)
- **Token guide**: `DesignTokens.md` (776 lines)

### Component Documentation
- **Button**: `Button.md`
- **Badge**: `Badge.md`
- **Card**: `Card.md`
- **Tag**: `Tag.md`
- **Complete list**: 30+ component guides in `guidelines/`

### Visual Reference
- **Component Library**: `/component-library`
- **Sections**: Icons, Buttons, Badges, Breadcrumbs, Links, Icon Buttons, Cards

---

## 🚫 Common Violations to Avoid

### ❌ Violation #1: Hard-Coded Colors
```css
/* WRONG */
.element { background: #0053e2; color: white; }

/* CORRECT */
.element { 
  background: var(--ld-semantic-color-action-fill-primary);
  color: var(--ld-semantic-color-action-text-on-fill-primary);
}
```

### ❌ Violation #2: Duplicate Icons
```tsx
/* WRONG */
// Creating UserIcon.tsx when User.tsx exists

/* CORRECT */
import { User } from '@/components/icons';
```

### ❌ Violation #3: Custom Buttons
```tsx
/* WRONG */
<button className="bg-blue-500 px-4 py-2 rounded-full">Click</button>

/* CORRECT */
import { Button } from '@/components/ui/Button';
<Button variant="primary">Click</Button>
```

### ❌ Violation #4: New Tokens
```css
/* WRONG */
:root {
  --my-custom-color: #1a73e8;
}

/* CORRECT */
/* Use existing tokens - they are comprehensive */
```

---

## 🔍 Pre-Implementation Checklist

Before creating ANY new component, icon, or design:

- [ ] Searched existing components in `client/components/ui/`
- [ ] Searched all 303 icons at `/component-library#icons`
- [ ] Checked relevant guideline docs in `guidelines/`
- [ ] Verified no duplicates exist
- [ ] Confirmed using semantic design tokens only
- [ ] All interactive states included (hover, focus, active, disabled)
- [ ] Follows LD 3.5 specifications

---

## 📖 Quick Links

| Resource | Location |
|----------|----------|
| **LD Component API Reference** 🆕 | `guidelines/LivingDesign-Component-Reference.md` |
| **Design System Enforcement** 🆕 | `guidelines/RULE_DesignSystemEnforcement.md` |
| Design Token Rule | `guidelines/RULE_DesignTokenEnforcement.md` |
| Icon Usage Rule | `guidelines/RULE_IconUsage.md` |
| Token Documentation | `guidelines/DesignTokens.md` |
| Component Library | `/component-library` |
| Icon Library (303 icons) | `/component-library#icons` |
| Primitive Tokens | `styles/primitive.css` |
| Semantic Tokens | `styles/semantic.css` |
| Component Guidelines | `guidelines/*.md` (30+ files) |

---

## 🚀 Workflow for New Designs

### From Builder.io Plugin

1. **Analyze** imported Figma design
2. **Map** colors → existing semantic tokens
3. **Map** icons → existing icon library (303 icons)
4. **Map** components → existing LD 3.5 components
5. **Generate** code using ONLY existing tokens and components
6. **Verify** no hard-coded values or duplicates
7. **Add** all interactive states

### From AI Generation

1. **Identify** design requirements
2. **Search** existing components and icons first
3. **Reuse** existing patterns and tokens
4. **Follow** LD 3.5 specifications exactly
5. **Validate** against rules before finalizing

---

## ✅ Success Criteria

Code is ready when:

- ✅ Zero hard-coded color values
- ✅ Zero hard-coded spacing values
- ✅ Zero new tokens created
- ✅ Zero duplicate components
- ✅ Zero duplicate icons
- ✅ All colors use semantic tokens
- ✅ All icons from existing library
- ✅ All interactive states included
- ✅ Follows LD 3.5 specifications

---

**ENFORCEMENT LEVEL**: CRITICAL - NO EXCEPTIONS

All rules are mandatory. Code reviews MUST reject any violations.
