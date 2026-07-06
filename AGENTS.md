# Builder.io Agent Rules

## Build Verification (MANDATORY)

After code changes, run `pnpm run build` and fix all errors before considering the task complete.

## Pre-Task Protocol (MANDATORY)

Before writing code for any UI request, ask clarifying questions about breakpoints, tokens, states, animation feel, and data freshness. If told "just go ahead," use defaults from `.builder/rules/prompt-driven-design.mdc`.

## CRITICAL: Always Use Existing Components First

- `client/components/ui/` — LD 3.5 primitives. **ALWAYS** use these first.
- `client/components/` — Custom components. Use if no LD equivalent.
- `.builder/rules/` — 40+ component specs. Check before creating anything new.
- **Priority: Reuse > Adapt > Create**
- **NEVER modify** existing LD components in `client/components/ui/`.

## External Library Policy (HARD RULE)

**NEVER install or import** from `shadcn/ui`, `@radix-ui/*`, `@headlessui/*`, `@mui/*`, `antd`, `chakra-ui`, `react-icons`, `heroicons`, `lucide-react`, or any external UI/icon library. All UI from `client/components/ui/`. All icons from `client/components/icons/`. **NEVER use emojis.**

## TOP VIOLATIONS — Check Every Time

1. Hard-coded hex colors instead of `var(--ld-semantic-color-*)`
2. Raw HTML elements (`<button>`, `<input>`, `<table>`, `<a>`) instead of LD components
3. External library imports
4. Inline styles for static values
5. Missing `prefers-reduced-motion` on animations
6. Custom spinners instead of `<Spinner />`
7. Modifying files in `client/components/ui/`

## Component Rules

| Need | Use | Never |
|---|---|---|
| Buttons | `Button` (default: `medium`) | Custom `<button>` |
| Button groups | `ButtonGroup` | Manual flex |
| Checkboxes | `Checkbox` | `<input type="checkbox">` |
| Radio | `Radio` / `RadioGroup` | `<input type="radio">` |
| Text inputs | `TextField` | Raw `<input>` |
| Selects | `Select` | Raw `<select>` |
| Text areas | `TextArea` | Raw `<textarea>` |
| Tables | `DataTable` | Raw `<table>` |
| Tabs | `Tabs`, `TabList`, `Tab`, `TabPanel` | Custom tabs |
| Links | `Link` (`default`, `subtle`, `white`) | `<a>`, `<button>`, `<span>` |
| Sidebar | `AppSidebar` | Custom sidebar |
| Rating | `Rating` | Manual star SVGs |
| Tags | `Tag` / `OLQTag` | Custom spans |
| Overlays | `Popover`, `Modal`, `Menu` | Absolute dropdowns |
| Number input | `QuantityStepper` | Custom input |
| Header | `DesktopHeader` (shell) | Custom header |

- Button variants: `primary`, `secondary`, `tertiary`, `destructive`, `primary-alt` (W+ only)
- Button sizes: `small`, `medium` (default), `large` — `isFullWidth` for full-width
- Panels MUST be resizable (min 420px, max 800px)

## Page Layout (HARD RULE)

- Pages MUST NOT render shell components — layout wrapper provides them
- Never add `max-width` or `margin: 0 auto` to page containers

## Design Tokens (CRITICAL)

**Never hardcode hex colors, spacing, or fonts. Always use semantic tokens.**

| Category | Pattern |
|---|---|
| Colors | `var(--ld-semantic-color-*)` |
| Spacing | `var(--ld-primitive-scale-space-*)` |
| Typography | `var(--ld-semantic-font-*)` |
| Border Radius | `var(--ld-primitive-scale-borderradius-*)` |
| Elevation | `var(--ld-semantic-elevation-*)` |

- `--ld-primitive-color-*` is **FORBIDDEN** in component CSS
- Separators: `var(--ld-semantic-color-separator)` — never `border-subtle`

## Styling

- CSS modules for static styles. Inline only for dynamic per-render values.
- Inline tokens must include fallback: `var(--token, #hex)`

## Icons

- Search `client/components/icons/` first (303+). Never inline SVGs or external libs.
- New custom icons: `client/components/icons-custom/` (20x20, 1.5px stroke, `currentColor`)

## Responsive Breakpoints

| Breakpoint | Target | Padding |
|---|---|---|
| `> 1024px` | Desktop | `24-32px` |
| `<= 1024px` | Tablet | `20-24px` |
| `<= 768px` | Small tablet | `16px` |
| `<= 480px` | Phone | `12px` |

Multi-column stacks at 768px. 8px-multiple spacing only.

## Accessibility

- Never disable buttons — use label changes. Every animation needs `prefers-reduced-motion`.

## Figma Import

- Map Figma colors to `--ld-semantic-color-*`. Convert absolute positioning to flex/grid.
- All `<img>` in Figma HTML must appear in code. See `figma-asset-extraction.mdc`.

## Theme Compliance

Zero hardcoded hex. Zero primitive color tokens. Test Bodega + Legacy themes.

## Pre-Implementation Checklist

- [ ] Searched `client/components/ui/` and 303+ icons
- [ ] Checked `.builder/rules/` for specs
- [ ] Semantic tokens only (no hex)
- [ ] Layout shell used (no manual Header/BottomNav)
- [ ] Breakpoints: 1024, 768, 480
- [ ] `prefers-reduced-motion` for animations
- [ ] Theme compliance passed

## Additional Rules (`.builder/rules/`)

| Topic | File |
|---|---|
| Animation | `animation-and-motion.mdc` |
| Inline styles | `inline-style-vs-css-module.mdc` |
| Theme compliance | `theme-compliance.mdc` |
| WCP components | `wcp-component-creation.mdc` |
| Page composition | `walmart-page-composition.mdc` |
| Responsive layout | `responsive-layout.mdc` |
| Prompt design | `prompt-driven-design.mdc` |
| Section spacing | `page-section-spacing.mdc` |
| Figma handoff | `designer-figma-handoff.mdc` |

## Quick Links

| Resource | Location |
|---|---|
| Component specs | `.builder/rules/` |
| Design tokens | `design-tokens.mdc` |
| Icon library | `client/components/icons/` |
| Skills | `.builder/skills/` |
