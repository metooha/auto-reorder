# Development Rules

## 1. Navigation & Dropdowns

- **Use actual design assets** - Don't create new versions of SVGs or icons. Use the exact assets provided.
- **Custom dropdowns for top nav** - Build dropdowns without generic Menu components. Include:
  - Proper ARIA attributes (`aria-haspopup`, `aria-expanded`, `role="menu"`)
  - Click-outside detection with `useRef` and `mousedown` listener
  - Escape key handling
  - State management with `useState`

## 2. Component Reuse

- **Search for existing components first** before creating anything new:
  - `client/components/ui/` - Design system components
  - `client/components/` - Application components
  - `guidelines/` - Component documentation
- **Reuse what exists** before building new

## 3. Styling & Tokens

- **Always use LD semantic tokens** - Never hardcode colors:
  - Colors: `var(--ld-semantic-color-*)`
  - Fonts: `var(--ld-semantic-font-family-sans)`
  - Spacing: `var(--ld-semantic-spacing-*)`
- **CSS Modules over inline styles** - Separate markup from styling for maintainability
- **Remove unused translation keys** - Use readable English text instead of broken keys

## 4. Component Consistency

- **Icon consistency** - All icons in a feature should follow the same visual language
- **Layout alignment** - Use `flex-1` for full-width spanning components
- **Menu item styling** - All menu items should have consistent styling, padding, and hover states

## 5. Accessibility First

Always include:
- Proper semantic HTML (buttons, roles)
- Keyboard navigation support (Tab, Enter, Escape)
- ARIA attributes for screen readers
- Focus management and focus-visible states
- Click-outside detection for dropdowns

## 6. Code Organization

- **Read before editing** - Understand existing code before making changes
- **No over-engineering** - Only add what's necessary
- **Keep it simple** - Avoid premature abstractions
- **Delete unused code** - Don't leave commented-out code or unused imports

## Quick Checklist

- [ ] Design assets are the real ones, not recreated
- [ ] Using LD tokens for all colors and fonts
- [ ] CSS Modules instead of inline styles
- [ ] Proper ARIA attributes on interactive elements
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Searched for existing components first
- [ ] No hardcoded colors or spacing values
