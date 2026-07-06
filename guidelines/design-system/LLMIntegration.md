---
title: LLM Integration Instructions
scope: design-system
status: stable
owner: design-system
last_updated: 2026-03-02
---

## Purpose

Step-by-step instructions for an AI assistant to integrate the Living Design 3.5 (LD 3.5) portable component library into any existing Builder project.

## Table of Contents

1. [Overview & Prerequisites](#1-overview--prerequisites)
2. [Import Files Into a New Project](#2-import-files-into-a-new-project)
3. [Replace Legacy Components with LD 3.5](#3-replace-legacy-components-with-ld-35)
4. [Update Existing Designs to Use the Design System](#4-update-existing-designs-to-use-the-design-system)
5. [Create New Components Using LD Tokens](#5-create-new-components-using-ld-tokens)
6. [Validation Checklist](#6-validation-checklist)
7. [Advanced Authoring Rules (WCP-Validated)](#7-advanced-authoring-rules-wcp-validated)
   - [7.1 Typography Token Rules](#71-typography-token-rules)
   - [7.2 Color & Surface Rules](#72-color--surface-rules)
   - [7.3 Icon Rules](#73-icon-rules)
   - [7.4 Component Usage Rules](#74-component-usage-rules)
   - [7.5 Typography Style Rules](#75-typography-style-rules)
   - [7.6 Accessibility Rules](#76-accessibility-rules)
   - [7.7 Visual Layering Rules](#77-visual-layering-rules)
   - [7.8 Component Library Pattern Page Rules](#78-component-library-pattern-page-rules)
   - [7.9 No Divider Lines](#79-no-divider-lines)

---

## 1. Overview & Prerequisites

### What This Library Contains

This is a portable **Living Design 3.5** component library that includes:

- **60+ LD 3.5 components** (Button, Card, Tag, DataTable, Metric, etc.) with CSS Modules
- **300+ icons** (custom SVG icon library)
- **Design tokens** (primitive + semantic CSS custom properties)
- **30+ themes** (Walmart, Sam's Club, Associate, Developer, etc.)
- **Component examples** (one example file per component)
- **Guidelines & documentation** (component specs, token references, rules)

### Required Dependencies

Add these to the target project's `package.json`:

**Core (required):**
```
class-variance-authority
clsx
tailwind-merge
tailwindcss
tailwindcss-animate
autoprefixer
postcss
```

**Additional (for specific components):**
```
lottie-react          # MagicBox animation component
date-fns              # DatePicker, DateField, DateRangePicker
react-day-picker      # Calendar/DatePicker components
embla-carousel-react  # Carousel component
recharts              # Chart component
framer-motion         # Animations (BottomSheet, Drawer)
vaul                  # Drawer component
cmdk                  # Command palette component
react-hook-form       # Form component
@hookform/resolvers   # Form validation
input-otp             # OTP input component
react-resizable-panels # Resizable panels
sonner                # Toast notifications
```

### Required Path Aliases

Configure in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./client/*"],
      "@shared/*": ["./shared/*"]
    }
  }
}
```

If the target project uses a different source directory (e.g., `src/`), adjust the alias to point to wherever the library files are placed:
```json
{
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

---

## 2. Import Files Into a New Project

Copy these folders and files from this library into the target project. Maintain the same directory structure relative to the client/source root.

### Step 2.1: Copy Component Files

```
client/components/ui/          -> {target}/components/ui/
```

This includes ALL `.tsx` and `.module.css` files. The full list of LD 3.5 components:

| Component | Files |
|-----------|-------|
| Alert | `Alert.tsx`, `Alert.module.css` |
| Badge | `Badge.tsx`, `Badge.module.css` |
| BottomSheet | `BottomSheet.tsx`, `BottomSheet.module.css` |
| Breadcrumb | `Breadcrumb.tsx`, `Breadcrumb.module.css` |
| Button | `Button.tsx`, `Button.module.css` |
| ButtonGroup | `ButtonGroup.tsx`, `ButtonGroup.module.css` |
| Callout | `Callout.tsx`, `Callout.module.css` |
| Card | `Card.tsx`, `Card.module.css`, `CardContent.tsx`, `CardContent.module.css`, `CardHeader.tsx`, `CardHeader.module.css` |
| Checkbox | `Checkbox.tsx`, `Checkbox.module.css` |
| Chip | `Chip.tsx`, `Chip.module.css` |
| ContentMessage | `ContentMessage.tsx`, `ContentMessage.module.css` |
| DataTable | `DataTable.tsx`, `DataTable.module.css`, `DataTableHeader.tsx`, `DataTableHeader.module.css`, `DataTableRow.tsx`, `DataTableRow.module.css`, `DataTableCellText.tsx`, `DataTableCellText.module.css`, `DataTableCellActions.tsx`, `DataTableCellActions.module.css`, `DataTableCellBulkEdit.tsx`, `DataTableCellBulkEdit.module.css`, `DataTableCellInlineEdit.tsx`, `DataTableCellInlineEdit.module.css`, `DataTableCellSelect.tsx`, `DataTableCellSelect.module.css`, `DataTableCellStatus.tsx`, `DataTableBulkActions.tsx`, `DataTableBulkActions.module.css` |
| DateField | `DateField.tsx`, `DateField.module.css` |
| DatePicker | `DatePicker.tsx`, `DatePicker.module.css` |
| DatePickerCalendar | `DatePickerCalendar.tsx`, `DatePickerCalendar.module.css` |
| DateRangePicker | `DateRangePicker.tsx`, `DateRangePicker.module.css` |
| Divider | `Divider.tsx`, `Divider.module.css` |
| FilterChip | `FilterChip.tsx`, `FilterChip.module.css` |
| FormGroup | `FormGroup.tsx`, `FormGroup.module.css` |
| Heading | `Heading.tsx`, `Heading.module.css` |
| IconButton | `IconButton.tsx`, `IconButton.module.css` |
| Link | `Link.tsx`, `Link.module.css` |
| LinkButton | `LinkButton.tsx`, `LinkButton.module.css` |
| List | `List.tsx`, `List.module.css` |
| MagicBox | `MagicBox.tsx`, `MagicBox.module.css` |
| Menu | `Menu.tsx`, `Menu.module.css`, `MenuItem.tsx`, `MenuItem.module.css` |
| Metric | `Metric.tsx`, `Metric.module.css` |
| Modal | `Modal.tsx`, `Modal.module.css` |
| NavList | `NavList.tsx`, `NavList.module.css` |
| Nudge | `Nudge.tsx`, `Nudge.module.css` |
| PageHeader | `PageHeader.tsx`, `PageHeader.module.css` |
| Panel | `Panel.tsx`, `Panel.module.css` |
| Popover (LD) | `Popover.tsx`, `Popover.module.css` |
| ProgressIndicator | `ProgressIndicator.tsx`, `ProgressIndicator.module.css` |
| ProgressTracker | `ProgressTracker.tsx`, `ProgressTracker.module.css` |
| Radio | `Radio.tsx`, `Radio.module.css` |
| Rating | `Rating.tsx`, `Rating.module.css` |
| Scrim | `Scrim.tsx`, `Scrim.module.css` |
| Select (LD) | `Select.tsx`, `Select.module.css` |
| SideNavigation | `SideNavigation.tsx`, `SideNavigation.module.css` |
| Skeleton | `Skeleton.tsx`, `Skeleton.module.css`, `SkeletonText.tsx`, `SkeletonText.module.css` |
| Snackbar | `Snackbar.tsx`, `Snackbar.module.css`, `SnackbarContainer.tsx` |
| Spinner | `Spinner.tsx`, `Spinner.module.css` |
| SpotIcon | `SpotIcon.tsx`, `SpotIcon.module.css` |
| Switch | `Switch.tsx`, `Switch.module.css` |
| Tab | `Tab.tsx`, `Tab.module.css` |
| Tag | `Tag.tsx`, `Tag.module.css` |
| TextArea | `TextArea.tsx`, `TextArea.module.css` |
| TextField | `TextField.tsx`, `TextField.module.css` |
| Toggle (LD) | `Toggle.tsx`, `Toggle.module.css` (Note: uppercase file) |

Also copy the barrel export file:
```
client/components/ui/index.ts
```

### Step 2.2: Copy Icon Library

```
client/components/icons/       -> {target}/components/icons/
client/components/icons-custom/ -> {target}/components/icons-custom/
```

The icon library contains 300+ SVG icon components. All icons follow these conventions:
- `viewBox="0 0 20 20"`
- `strokeLinecap="square"`
- `strokeWidth="1.5"`
- Exported from `client/components/icons/index.tsx`

### Step 2.3: Copy Component Examples (Optional)

```
client/components/examples/    -> {target}/components/examples/
```

These are reference implementations showing how to use each component. Useful for developers but not required at runtime.

### Step 2.4: Copy Design Tokens & Styles

```
client/styles/                 -> {target}/styles/
```

This includes:
- `themes/base/primitive.css` — base primitive tokens (colors, spacing, etc.)
- `themes/base/semantic.css` — base semantic tokens (maps primitives to semantic names)
- `themes/*/semantic.css` — theme-specific overrides (30+ themes)
- `fonts.css` — font definitions
- `index.css`, `primitive.css`, `semantic.css`, `theme.css` — legacy/compatibility files

### Step 2.5: Copy Public Theme Files

```
public/styles/                 -> {target_public}/styles/
```

These are public-facing copies of theme CSS files used for dynamic theme loading at runtime via the ThemeContext.

### Step 2.6: Copy Theme Context & Hooks

```
client/contexts/ThemeContext.tsx    -> {target}/contexts/ThemeContext.tsx
client/contexts/theme-registry.ts  -> {target}/contexts/theme-registry.ts
client/hooks/useLocalStorage.ts    -> {target}/hooks/useLocalStorage.ts
client/hooks/use-snackbar.tsx      -> {target}/hooks/use-snackbar.tsx
client/hooks/use-mobile.tsx        -> {target}/hooks/use-mobile.tsx
```

### Step 2.7: Copy Utility Functions

```
client/lib/utils.ts            -> {target}/lib/utils.ts
```

This provides the `cn()` utility (combines `clsx` + `tailwind-merge`) used by all components.

### Step 2.8: Copy Documentation

```
guidelines/                    -> {target_root}/guidelines/
design-system-docs/            -> {target_root}/design-system-docs/
```

### Step 2.9: Update Global CSS

Add these imports to the target project's global CSS file (e.g., `global.css` or `index.css`):

```css
/* Brand fonts */
@import url("/fonts/fonts.css");

/* Base LD 3.5 tokens — REQUIRED */
@import "./styles/themes/base/primitive.css";
@import "./styles/themes/base/semantic.css";
```

These must be imported BEFORE any Tailwind directives (`@tailwind base`, etc.).

### Step 2.10: Verify Font Files

Ensure the brand fonts directory exists in the public folder:
```
public/fonts/
```

If brand fonts are not available, the components will fall back to system fonts. The `--ld-semantic-font-family-sans` token defaults to `"Everyday Sans UI", "Bogle", sans-serif`.

---

## 3. Replace Legacy Components with LD 3.5

If the target project has existing custom or third-party UI components, replace them with LD 3.5 equivalents.

### Step 3.1: Audit Existing Components

Scan the target project for existing components:
```bash
ls {target}/components/ui/
```

### Step 3.2: Replace Components That Have LD 3.5 Equivalents

For each component below, **delete the old file** and use the LD 3.5 version from this library. Then update all imports across the project.

| Legacy Component | LD 3.5 Replacement | New Import Path | Notes |
|---|---|---|---|
| `button.tsx` | `Button.tsx` | `@/components/ui/Button` | Variants: `primary`, `secondary`, `tertiary`, `destructive` |
| `badge.tsx` | `Badge.tsx` | `@/components/ui/Badge` | Variants: `info`, `success`, `warning`, `error` |
| `checkbox.tsx` | `Checkbox.tsx` | `@/components/ui/Checkbox` | LD 3.5 checkbox with label support |
| `select.tsx` | `Select.tsx` | `@/components/ui/Select` | LD 3.5 native-like select |
| `textarea.tsx` | `TextArea.tsx` | `@/components/ui/TextArea` | LD 3.5 textarea with label/helper |
| `input.tsx` | `TextField.tsx` | `@/components/ui/TextField` | LD 3.5 text input with label/helper |
| `card.tsx` | `Card.tsx` | `@/components/ui/Card` | Use with `CardHeader` + `CardContent` |
| `popover.tsx` | `Popover.tsx` | `@/components/ui/Popover` | LD 3.5 popover with nubbin |
| `tabs.tsx` | `Tab.tsx` | `@/components/ui/Tab` | LD 3.5 tab navigation |
| `toggle.tsx` | `Toggle.tsx` | `@/components/ui/Toggle` (uppercase) | LD 3.5 toggle |
| `separator.tsx` | `Divider.tsx` | `@/components/ui/Divider` | LD 3.5 divider |
| `progress.tsx` | `ProgressIndicator.tsx` | `@/components/ui/ProgressIndicator` | LD 3.5 progress bar |
| `skeleton.tsx` | `Skeleton.tsx` | `@/components/ui/Skeleton` | LD 3.5 skeleton loader |
| `switch.tsx` | `Switch.tsx` | `@/components/ui/Switch` | LD 3.5 toggle switch |
| `label.tsx` | (not needed) | — | Labels are built into TextField, TextArea, FormGroup |
| `table.tsx` | `DataTable.tsx` | `@/components/ui/DataTable` | Use with DataTableHeader, DataTableRow, DataTableCell |

### Step 3.3: Update All Imports

After replacing components, update all import statements across the project:

```bash
# Find files using old lowercase imports
grep -rn "from ['\"]@/components/ui/button['\"]" {target}/
grep -rn "from ['\"]@/components/ui/badge['\"]" {target}/
# ... repeat for each replaced component
```

**All LD 3.5 imports are PascalCase:**
```tsx
// OLD (legacy lowercase)
import { Button } from '@/components/ui/button';

// NEW (LD 3.5 PascalCase)
import { Button } from '@/components/ui/Button';
```

### Step 3.4: Update Component Props

LD 3.5 components may use different prop names. Common changes:

| Old Prop | LD 3.5 Prop | Component |
|---|---|---|
| `variant="outline"` | `variant="secondary"` | Button |
| `variant="ghost"` | `variant="tertiary"` | Button |
| `size="sm"` | `size="small"` | Button |
| `size="lg"` | `size="large"` | Button |
| `className="..."` | `UNSAFE_className="..."` | Card, DataTable, most LD components |
| `style={...}` | `UNSAFE_style={...}` | Card, DataTable, most LD components |

**Note on UNSAFE_ prefix:** LD 3.5 components use `UNSAFE_className` and `UNSAFE_style` as escape hatches. This naming convention signals that custom styles bypass the design system and should be used sparingly.

---

## 4. Update Existing Designs to Use the Design System

Systematically audit and migrate the target project to use LD tokens exclusively.

### Step 4.1: Replace Hardcoded Colors

**Scan:**
```bash
grep -rn "#[0-9a-fA-F]\{3,8\}" {target}/pages/ {target}/components/
grep -rn "rgb\|rgba\|hsl\|hsla" {target}/pages/ {target}/components/
grep -rn "bg-\[#\|text-\[#\|border-\[#" {target}/pages/ {target}/components/
```

**Replace with LD tokens:**

| Use Case | Token |
|---|---|
| Primary action background | `var(--ld-semantic-color-action-fill-primary)` |
| Primary action hover | `var(--ld-semantic-color-action-fill-primary-hovered)` |
| Primary action pressed | `var(--ld-semantic-color-action-fill-primary-pressed)` |
| Secondary action background | `var(--ld-semantic-color-action-fill-secondary)` |
| Destructive action background | `var(--ld-semantic-color-action-fill-destructive)` |
| Primary text | `var(--ld-semantic-color-text-primary)` |
| Secondary text | `var(--ld-semantic-color-text-secondary)` |
| Disabled text | `var(--ld-semantic-color-text-disabled)` |
| On-fill primary text (white on blue) | `var(--ld-semantic-color-action-text-on-fill-primary)` |
| Surface primary (white background) | `var(--ld-semantic-color-fill-surface-primary)` |
| Surface secondary (gray background) | `var(--ld-semantic-color-fill-surface-secondary)` |
| Border subtle | `var(--ld-semantic-color-border-subtle)` |
| Border moderate | `var(--ld-semantic-color-border-moderate)` |
| Border strong | `var(--ld-semantic-color-border-strong)` |
| Success/positive | `var(--ld-semantic-color-sentiment-positive-text)` |
| Warning | `var(--ld-semantic-color-sentiment-warning-text)` |
| Error/negative | `var(--ld-semantic-color-sentiment-negative-text)` |
| Info | `var(--ld-semantic-color-sentiment-info-text)` |
| Focus outline | `var(--ld-semantic-color-action-focus-outline)` |

For a complete list of all tokens, see `client/styles/themes/base/semantic.css`.

### Step 4.2: Replace Hardcoded Spacing

**Scan:**
```bash
grep -rn "padding: [0-9]\|margin: [0-9]\|gap: [0-9]" {target}/pages/ {target}/components/
```

**Replace with LD spacing tokens:**

| Value | Token |
|---|---|
| 2px | `var(--ld-primitive-scale-space-050)` |
| 4px | `var(--ld-primitive-scale-space-1)` or `var(--ld-semantic-spacing-1)` |
| 8px | `var(--ld-semantic-spacing-2)` |
| 12px | `var(--ld-semantic-spacing-3)` |
| 16px | `var(--ld-semantic-spacing-4)` |
| 20px | `var(--ld-semantic-spacing-5)` |
| 24px | `var(--ld-semantic-spacing-6)` |
| 32px | `var(--ld-semantic-spacing-8)` |
| 40px | `var(--ld-semantic-spacing-10)` |
| 48px | `var(--ld-semantic-spacing-12)` |

### Step 4.3: Replace Hardcoded Fonts

**Scan:**
```bash
grep -rn "font-family:" {target}/pages/ {target}/components/
grep -rn "font-\[" {target}/pages/ {target}/components/
```

**Replace with:**
```css
/* Sans-serif (default for all UI) */
font-family: var(--ld-semantic-font-family-sans);

/* Monospace (code, data) */
font-family: var(--ld-semantic-font-family-mono);
```

### Step 4.4: Replace Inline SVG Icons

**Scan:**
```bash
grep -rn "<svg" {target}/pages/ {target}/components/
```

**Replace with icons from the library:**
```tsx
// OLD - inline SVG
<svg width="20" height="20" viewBox="0 0 20 20">...</svg>

// NEW - use icon library
import { Search } from '@/components/icons';
<Search />
```

All available icons are exported from `@/components/icons/index.tsx`. Common icons include:
`Search`, `Settings`, `ChevronRight`, `ChevronDown`, `ChevronLeft`, `ChevronUp`, `ArrowDown`, `ArrowUp`, `ArrowLeft`, `ArrowRight`, `Close`, `Plus`, `Minus`, `Check`, `X`, `Eye`, `EyeOff`, `Download`, `Upload`, `Edit`, `Trash`, `Copy`, `Filter`, `Sort`, `Home`, `User`, `Cart`, `Star`, `Heart`, `InfoCircle`, `CheckCircle`, `Warning`, `ExclamationCircle`, `MoreHorizontal`, `MoreVertical`, `Calendar`, `Clock`, `Link`, `ExternalLink`, `Refresh`, `Sliders`

### Step 4.5: Replace Custom Button Elements

**Scan:**
```bash
grep -rn "<button " {target}/pages/ {target}/components/
grep -rn "<button>" {target}/pages/ {target}/components/
```

**Replace with the LD Button component:**
```tsx
// OLD
<button className="bg-blue-500 text-white px-4 py-2 rounded-full">Click me</button>

// NEW
import { Button } from '@/components/ui/Button';
<Button variant="primary" size="medium">Click me</Button>
```

**Button variant mapping:**
| Visual Style | LD Variant |
|---|---|
| Filled primary color (blue) | `variant="primary"` |
| Outlined/bordered | `variant="secondary"` |
| Text-only/ghost | `variant="tertiary"` |
| Red/danger | `variant="destructive"` |

**Button size mapping:**
| Size | LD Size |
|---|---|
| Small (32px height) | `size="small"` |
| Medium (40px height) | `size="medium"` |
| Large (48px height) | `size="large"` |

### Step 4.6: Replace External Icon Libraries

**Scan:**
```bash
grep -rn "react-icons\|heroicons\|lucide-react\|@heroicons" {target}/
```

**Replace with equivalent icons from `@/components/icons`.** If an icon doesn't exist in the library, create it following the icon creation rules in Section 5.

### Step 4.7: Replace Hardcoded Border Radius

**Scan:**
```bash
grep -rn "border-radius:\|rounded-" {target}/pages/ {target}/components/
```

**Replace with LD tokens:**

| Value | Token |
|---|---|
| 0px | `var(--ld-semantic-border-radius-none)` |
| 4px | `var(--ld-semantic-border-radius-small)` |
| 8px | `var(--ld-semantic-border-radius-medium)` |
| 12px | `var(--ld-semantic-border-radius-large)` |
| 16px | `var(--ld-semantic-border-radius-xlarge)` |
| 9999px (pill) | `var(--ld-semantic-border-radius-full)` |

---

## 5. Create New Components Using LD Tokens

When the target project needs a component that doesn't exist in this library, follow this process.

### Step 5.1: Verify It Doesn't Already Exist

Before creating anything new:

1. Search `client/components/ui/` for existing components
2. Search `client/components/ui/index.ts` for exports
3. Check `guidelines/components/` for documentation
4. Check `design-system-docs/` for MDX specs
5. Check `design-system-docs/` for MDX specs and existing patterns

### Step 5.2: Create the Component

If no existing component works, create a new one following this structure:

**File: `client/components/ui/ComponentName.tsx`**
```tsx
import React from 'react';
import styles from './ComponentName.module.css';

export interface ComponentNameProps {
  children: React.ReactNode;
  variant?: 'default' | 'alternate';
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

export const ComponentName = React.forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ children, variant = 'default', UNSAFE_className, UNSAFE_style, ...props }, ref) => {
    const className = [
      styles.root,
      styles[`root--${variant}`],
      UNSAFE_className,
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={className} style={UNSAFE_style} {...props}>
        {children}
      </div>
    );
  }
);

ComponentName.displayName = 'ComponentName';
```

**File: `client/components/ui/ComponentName.module.css`**
```css
.root {
  font-family: var(--ld-semantic-font-family-sans);
  color: var(--ld-semantic-color-text-primary);
  background-color: var(--ld-semantic-color-fill-surface-primary);
  border: 1px solid var(--ld-semantic-color-border-moderate);
  border-radius: var(--ld-semantic-border-radius-medium);
  padding: var(--ld-semantic-spacing-4);
}

.root--alternate {
  background-color: var(--ld-semantic-color-fill-surface-secondary);
}
```

### Step 5.3: CRITICAL Token Rules

When creating new components, NEVER use:
- Hardcoded hex colors (`#0071DC`, `#2E2F32`, etc.)
- Hardcoded pixel values for spacing (use `var(--ld-semantic-spacing-*)`)
- Hardcoded font families (use `var(--ld-semantic-font-family-sans)`)
- Hardcoded border radius values (use `var(--ld-semantic-border-radius-*)`)
- Tailwind color utilities (`bg-blue-500`, `text-gray-800`, etc.)
- Inline color styles (`style={{ color: '#000' }}`)

ALWAYS use LD semantic tokens. This ensures:
- Brand consistency across all themes
- Automatic theme switching support (light/dark, Walmart/Sam's Club, etc.)
- Centralized design updates
- Living Design 3.5 compliance

### Step 5.4: Token Category Reference

When building new components, reference these token categories (all defined in `client/styles/themes/base/semantic.css`):

| Category | Token Prefix | Example |
|---|---|---|
| Action Colors | `--ld-semantic-color-action-*` | `fill-primary`, `fill-secondary`, `text-primary` |
| Text Colors | `--ld-semantic-color-text-*` | `primary`, `secondary`, `disabled`, `inverse` |
| Fill/Background | `--ld-semantic-color-fill-*` | `surface-primary`, `surface-secondary`, `disabled` |
| Border | `--ld-semantic-color-border-*` | `subtle`, `moderate`, `strong`, `disabled` |
| Sentiment | `--ld-semantic-color-sentiment-*` | `positive-text`, `negative-text`, `warning-text`, `info-text` |
| Spacing | `--ld-semantic-spacing-*` | `1` (4px), `2` (8px), `3` (12px), `4` (16px)... |
| Typography | `--ld-semantic-font-family-*` | `sans`, `mono` |
| Border Radius | `--ld-semantic-border-radius-*` | `none`, `small`, `medium`, `large`, `full` |
| Elevation | `--ld-semantic-elevation-*` | `level-1`, `level-2`, `level-3` |

### Step 5.5: Create Icon (If Needed)

If a new icon is required:

1. Create the icon file in `client/components/icons/IconName.tsx`:
```tsx
import React from 'react';

interface IconNameProps extends React.SVGProps<SVGSVGElement> {}

export const IconName: React.FC<IconNameProps> = (props) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="..."
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    />
  </svg>
);
```

2. Export from `client/components/icons/index.tsx`:
```tsx
export { IconName } from './IconName';
```

### Step 5.6: Document the Component

1. Create a guideline: `guidelines/components/ComponentName.md`
2. Create an example: `client/components/examples/ComponentNameExample.tsx`
3. Optionally add to the component library page navigation in `client/components/ComponentLibraryLayout.tsx`

---

## 6. Validation Checklist

After completing the integration, run these checks to verify everything is correct.

### Automated Checks

```bash
# 1. No hardcoded hex colors in pages or components
grep -rn "#[0-9a-fA-F]\{3,8\}" {target}/pages/ {target}/components/ --include="*.tsx" --include="*.css"

# 2. No inline SVG icons (all should use @/components/icons)
grep -rn "<svg" {target}/pages/ {target}/components/ --include="*.tsx"

# 3. No custom <button> elements (all should use <Button>)
grep -rn "<button " {target}/pages/ --include="*.tsx"
grep -rn "<button>" {target}/pages/ --include="*.tsx"

# 4. No external icon libraries
grep -rn "react-icons\|heroicons\|lucide-react" {target}/ --include="*.tsx"

# 5. No hardcoded font families
grep -rn "font-family:" {target}/pages/ {target}/components/ --include="*.css" --include="*.tsx"

# 6. Build succeeds
pnpm run build:client

# 7. No TypeScript errors
pnpm run typecheck
```

### Manual Checks

- [ ] All pages render correctly in the browser
- [ ] Theme switching works (if ThemeContext is integrated)
- [ ] Components render correctly with the base theme
- [ ] No console errors in the browser
- [ ] All buttons use the `<Button>` component (not raw `<button>`)
- [ ] All tags/badges use `<Tag>` or `<Badge>` (not raw `<span>` with styles)
- [ ] All inputs use `<TextField>` or `<TextArea>` (not raw `<input>` or `<textarea>`)
- [ ] All tables use `<DataTable>` components (not raw `<table>`)
- [ ] All icons use `@/components/icons` (not inline SVGs or external libraries)
- [ ] All spacing uses LD tokens (not arbitrary pixel values)
- [ ] All colors use LD tokens (not hex/rgb values)
- [ ] All typography uses LD tokens (not hardcoded font families)

### Component Audit Summary

After integration, create a brief summary:

```
Components replaced: X (list which legacy components were swapped for LD 3.5)
New components created: X (list any new components built with LD tokens)
New icons created: X (list any new icons added)
Tokens migrated: X hardcoded values replaced with LD tokens
```

---

---

## 7. Advanced Authoring Rules (WCP-Validated)

These rules were validated through real component work on the Walmart Commerce Platform Purchase History page. They complement the general rules above and should be applied to all new component work.

---

### 7.1 Typography Token Rules

#### Always validate tokens against `client/styles/semantic.css` before using them

Many tokens that look correct are actually invalid. Always grep the actual file as source of truth before writing new CSS.

**Heading tokens require a viewport suffix — `-b-s` (small) or `-b-l` (large):**
```css
/* WRONG — this token does not exist */
font-size: var(--ld-semantic-font-heading-small-size);

/* CORRECT */
font-size: var(--ld-semantic-font-heading-small-size-b-s, 1.125rem);
line-height: var(--ld-semantic-font-heading-small-line-height-b-s, 1.5rem);
font-weight: var(--ld-semantic-font-heading-small-weight-default, 700);
font-family: var(--ld-semantic-font-heading-small-family);
```

#### Always provide the full token set — not just size

A complete typography definition requires all four properties. Partial application is a violation:

```css
/* WRONG — only size, missing family/weight/line-height */
.label {
  font-size: var(--ld-semantic-font-caption-size);
}

/* CORRECT — complete caption token set */
.label {
  font-family: var(--ld-semantic-font-caption-family);
  font-size: var(--ld-semantic-font-caption-size, 0.75rem);
  font-weight: var(--ld-semantic-font-caption-weight-default, 400);
  line-height: var(--ld-semantic-font-caption-line-height, 1rem);
}
```

#### Caption tokens for all small labels and eyebrows

Any text smaller than body (eyebrows, status labels, meta text, fine print) must use caption tokens — never hardcoded px values:

| Token set | Use |
|---|---|
| `--ld-semantic-font-caption-*` with `weight-default` | Default weight labels |
| `--ld-semantic-font-caption-*` with `weight-alt` | Bold/emphasis labels |
| `--ld-semantic-font-body-small-*` | Body-level text (14px / 0.875rem) |
| `--ld-semantic-font-body-medium-*` | Default body (16px / 1rem) |
| `--ld-semantic-font-heading-small-*-b-s` | Small headings (18px / 1.125rem) |

#### Never use hardcoded font fallbacks that don't match the token value

```css
/* WRONG — token is 0.875rem but fallback says 13px */
font-size: var(--ld-semantic-font-body-small-size, 13px);

/* CORRECT */
font-size: var(--ld-semantic-font-body-small-size, 0.875rem);
```

---

### 7.2 Color & Surface Rules

#### Never use gradients on surfaces

`linear-gradient` is prohibited on surface backgrounds (cards, panels, headers) unless the token itself is a gradient (e.g., magic tokens). Use a flat semantic fill token instead:

```css
/* WRONG */
background: linear-gradient(135deg, #001E5A, #003087);

/* CORRECT */
background: var(--ld-semantic-color-fill-brand-bold, #001E5A);
```

#### Brand blue vs. positive green — know when to use each

| Use case | Token |
|---|---|
| Brand CTAs, member prices, links | `var(--ld-semantic-color-text-brand)` |
| Savings amounts, discounts, positive outcomes | `var(--ld-semantic-color-text-positive)` |
| Savings badge background | `var(--ld-semantic-color-fill-positive-subtle)` |
| Dark brand panel/header | `var(--ld-semantic-color-fill-brand-bold)` |

Savings text **must always be green** (`text-positive`). Never use brand blue for savings.

#### Never use `rgba()` opacity hacks for semantic colors

```css
/* WRONG — bypasses theming */
color: rgba(255, 255, 255, 0.7);

/* CORRECT — use the appropriate on-fill token with opacity as a last resort only */
color: var(--ld-semantic-color-action-text-on-fill-primary);
opacity: 0.7;
```

---

### 7.3 Icon Rules

#### Always use outlined icons, never Fill variants

```tsx
// WRONG
import { CheckCircleFill } from '@/components/icons/CheckCircleFill';
import { WarningFill } from '@/components/icons/WarningFill';

// CORRECT
import { CheckCircle } from '@/components/icons/CheckCircle';
import { Warning } from '@/components/icons/Warning';
```

#### Always add `aria-hidden="true"` to decorative icons

Icons used inside Tags, Alerts, and buttons are decorative — the surrounding text provides context:

```tsx
<Warning width={12} height={12} aria-hidden="true" />
```

#### Always set explicit width/height on icons used in compact contexts

Icons default to 20×20. In Tags (12px) or fine-print areas (14px), always set explicit size:

```tsx
// Inside a Tag
<Clock width={12} height={12} aria-hidden="true" />

// In a detail row
<Car width={16} height={16} aria-hidden="true" />
```

---

### 7.4 Component Usage Rules

#### Tag vs Badge — they are not interchangeable

| Component | Use for |
|---|---|
| `<Tag>` | Status labels, category labels, any text-based indicator |
| `<Badge>` | Numeric counts only (notification count, cart quantity) |

Never use a raw `<span>` with custom styles for either of these.

#### Tags and Buttons must hug content — never stretch full width

Add `align-items: flex-start` to any flex container that holds Tags or Buttons to prevent them from stretching:

```css
/* Flex parent of Tags/Buttons */
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* REQUIRED — prevents stretching */
}
```

#### Use `<Alert>` for all info/success/warning/error banners

Never build custom callout divs with background color + icon + text. The `<Alert>` component handles all of this:

```tsx
// WRONG — custom callout div
<div className={styles.warningBox}>
  <WarningIcon />
  <p>Delayed, up to 2 hours late</p>
</div>

// CORRECT
import { Alert } from '@/components/ui/Alert';
<Alert variant="warning">
  <strong>Estimated up to 2 hours late</strong> — We're working to get your order to you as quickly as possible.
</Alert>
```

Alert variants: `info` | `success` | `warning` | `error`

---

### 7.5 Typography Style Rules

#### Never use `text-transform: uppercase`

LD 3.5 does not use all-caps for eyebrows, labels, or section titles. Remove any `text-transform: uppercase` and accompanying `letter-spacing` values.

```css
/* WRONG */
.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* CORRECT — just use caption tokens at normal case */
.eyebrow {
  font-family: var(--ld-semantic-font-caption-family);
  font-size: var(--ld-semantic-font-caption-size, 0.75rem);
  font-weight: var(--ld-semantic-font-caption-weight-alt, 700);
  line-height: var(--ld-semantic-font-caption-line-height, 1rem);
}
```

---

### 7.6 Accessibility Rules

#### Price rows need ARIA group context

When displaying old price / new price / savings together, wrap in a group with a label:

```tsx
<div role="group" aria-label="Pricing">
  <span aria-label={`Member price: ${memberPrice}`}>{memberPrice}</span>
  <span aria-label={`Regular price: ${regularPrice}`}>{regularPrice}</span>
  <span aria-label={`You save ${savings}`}>Save {savings}</span>
</div>
```

#### Data visualizations need hover tooltips

Any numeric indicator (score ring, progress arc, metric) rendered on a visual surface must have a hover tooltip explaining what it means. Use a CSS-based tooltip with `role="tooltip"`:

```tsx
<div className={styles.scoreWrapper}>
  <div className={styles.score}>
    <ScoreRing score={score} />
    <span>Health</span>
  </div>
  <div className={styles.tooltip} role="tooltip">
    <strong>Health Score: {score}/100</strong>
    <span>{score >= 70 ? 'Good condition' : score >= 40 ? 'Needs attention' : 'Service overdue'}</span>
  </div>
</div>
```

```css
.scoreWrapper { position: relative; cursor: help; }
.scoreWrapper:hover .tooltip { opacity: 1; transform: translateY(0); }
.tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  right: 0;
  background: rgba(0, 0, 0, 0.85);
  color: #fff;
  font-size: var(--ld-semantic-font-caption-size, 0.75rem);
  padding: 8px 12px;
  border-radius: 8px;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.15s ease, transform 0.15s ease;
  z-index: 10;
}
```

#### SVG score rings / progress indicators

For custom radial progress (health score, completion ring):
- Add `aria-label` on the `<svg>` describing the value (e.g., `"Health score: 62 out of 100"`)
- Use `role="img"` if the SVG conveys meaningful data
- Score number text inside SVG: use `dominant-baseline="central"` + `text-anchor="middle"` for centering

---

### 7.7 Visual Layering Rules

#### Elements rendered on top of illustrations need a backdrop

When a UI element (score ring, text, badge) is positioned over an illustration or photo, add a frosted glass backdrop so it remains legible regardless of the image content:

```css
.overlaidElement {
  background: rgba(0, 0, 20, 0.45);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: var(--ld-primitive-scale-borderradius-100, 8px);
  padding: 6px 8px;
  border: 1px solid rgba(255, 255, 255, 0.15);
}
```

#### Illustration masking on card headers

When an illustration is absolutely positioned in a card header (covering part of the background), use a `mask-image` gradient to fade it into the background color:

```css
/* Illustration fading from right edge leftward */
.illustration {
  mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,1) 70%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,1) 70%);
}

/* Illustration fading from bottom (offer panel style) */
.illustration {
  mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.85) 100%);
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.85) 100%);
}
```

---

### 7.8 Component Library Pattern Page Rules

When maintaining a component pattern library page (`/component-library/order-card-patterns` or similar):

1. **Remove patterns once added to real pages** — the library should only contain patterns not yet deployed, to avoid redundancy
2. **Provide three things per pattern**: title label, live preview, copyable prompt
3. **Add a summary table** at the top of the page listing all patterns and their prompts in a scannable format
4. **Keep prompts concise** — one sentence describing exactly what the card shows (e.g., `"Show a combined card pairing a same-day oil change with a curbside pickup, with a merged bundle total."`)
5. **Use `newCard` animation wrapper** when inserting prompt-driven cards into real pages so designers can see what was just added

---

### 7.9 No Divider Lines

Do not add divider lines between sections unless explicitly requested. Use spacing (gap/padding) to create visual separation instead.

```css
/* WRONG — adding an unsolicited divider */
border-bottom: 1px solid var(--ld-semantic-color-separator);

/* CORRECT — use spacing */
gap: var(--ld-primitive-scale-space-400, 16px);
```

---

## Quick Reference: Import Cheat Sheet

```tsx
// LD 3.5 Components (Uppercase imports)
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { Card } from '@/components/ui/Card';
import { CardHeader } from '@/components/ui/CardHeader';
import { CardContent } from '@/components/ui/CardContent';
import { Tag } from '@/components/ui/Tag';
import { Badge } from '@/components/ui/Badge';
import { Alert } from '@/components/ui/Alert';
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/Breadcrumb';
import { Checkbox } from '@/components/ui/Checkbox';
import { Divider } from '@/components/ui/Divider';
import { IconButton } from '@/components/ui/IconButton';
import { Link } from '@/components/ui/Link';
import { LinkButton } from '@/components/ui/LinkButton';
import { TextField } from '@/components/ui/TextField';
import { TextArea } from '@/components/ui/TextArea';
import { Select, SelectItem } from '@/components/ui/Select';
import { Tabs, TabList, Tab } from '@/components/ui/Tab';
import { Modal } from '@/components/ui/Modal';
import { Spinner } from '@/components/ui/Spinner';
import { Switch } from '@/components/ui/Switch';
import Metric from '@/components/ui/Metric';
import { DataTable, DataTableHead, DataTableBody } from '@/components/ui/DataTable';
import { DataTableHeader } from '@/components/ui/DataTableHeader';
import { DataTableRow } from '@/components/ui/DataTableRow';
import { DataTableCell } from '@/components/ui/DataTableCellText';
import { SideNavigation, SideNavigationItem } from '@/components/ui/SideNavigation';

// Icons
import { Search, Settings, ChevronRight, Close, Plus, Edit, Trash } from '@/components/icons';

// Utilities
import { cn } from '@/lib/utils';

// Theme
import { ThemeProvider } from '@/contexts/ThemeContext';
```

---

## Appendix: Available Themes

The library ships with 30+ themes. Each theme overrides the base semantic tokens:

| Theme | Folder | Description |
|---|---|---|
| Base (Default) | `themes/base/` | Default Walmart theme |
| Associate | `themes/associate/` | Internal associate-facing |
| AX | `themes/ax/` | Advertising Experience |
| AX Walmart | `themes/ax-walmart/` | AX with Walmart branding |
| AX Sam's Club | `themes/ax-sams-club/` | AX with Sam's Club branding |
| Bodega | `themes/bodega/` | Bodega Aurrera |
| Cashi MX | `themes/cashi-mx/` | Cashi Mexico |
| Customer | `themes/customer/` | Customer-facing |
| Data Ventures | `themes/data-ventures/` | Data Ventures |
| Developer | `themes/developer/` | Developer portal |
| Members Mark | `themes/members-mark/` | Member's Mark |
| Partner | `themes/partner/` | Partner portal |
| PX | `themes/px/` | Partner Experience |
| PX Walmart | `themes/px-walmart/` | PX with Walmart branding |
| PX Sam's Club | `themes/px-sams-club/` | PX with Sam's Club branding |
| Sam's Club | `themes/sams-club/` | Sam's Club theme |
| Sparky | `themes/sparky/` | Sparky theme |
| Walmart B2B | `themes/walmart-b2b/` | Walmart Business |
| Walmart Legacy | `themes/walmart-legacy/` | Legacy Walmart |
| Walmart Plus | `themes/walmart-plus/` | Walmart+ |
| WCP | `themes/wcp/` | Walmart Commerce Platform |

To apply a theme, load its `semantic.css` (and `primitive.css` if it has one) after the base theme files.
