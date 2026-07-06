# RULE: Create New Component (Short)

## Goal
Create new LD components that follow tokens, Figma specs, and component library integration.

---

## Required steps
1. **Check existing component** in `client/components/ui/`.
2. **Read Figma** files if provided.
3. **Build component** with tokens only:
   - `client/components/ui/ComponentName.tsx`
   - `client/components/ui/ComponentName.module.css`
4. **Add example**: `client/components/examples/ComponentNameExample.tsx`
5. **Add guideline**: `guidelines/components/ComponentName.md`
6. **Integrate into Component Library**:
   - Add page `client/pages/component-library/ComponentNames.tsx`
   - Add route in `client/App.tsx`
   - Add entry in `Overview.tsx`
   - Add section + property tester in `ComponentLibrary.tsx`
7. **If replacing**: update all usages and create a brief migration plan.
8. **Test**: variants, sizes, states, themes, and TypeScript.

---

## Token rules (non‑negotiable)
- Use semantic tokens for colors.
- Use semantic/primitive tokens for spacing, typography, radius.
- No hardcoded values.

---

## Minimal component template
```tsx
export interface ComponentNameProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

export const ComponentName = React.forwardRef<HTMLElement, ComponentNameProps>(
  ({ variant = 'primary', size = 'medium', ...props }, ref) => {
    const className = [
      styles.root,
      styles[`root--${variant}`],
      styles[`root--${size}`],
    ].filter(Boolean).join(' ');

    return <div ref={ref} className={className} {...props} />;
  }
);
```

---

## Done when
- Component, styles, example, guideline created.
- Component appears in the component library.
- All usages updated (if replacing).
- No TS errors.
