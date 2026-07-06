# Theme Switcher Plan (Short)

## Overview
Implement a dynamic theme system that swaps token CSS files. Supports Base + Walmart B2B themes and allows future themes.

---

## Architecture
**File structure**
```
client/styles/themes/
├── base/
│   ├── primitive.css
│   └── semantic.css
├── walmart-b2b/
│   ├── primitive.css
│   └── semantic.css
└── theme-registry.ts
```

**Loading strategy**
- Load theme CSS via `<link>` tags in `<head>`.
- Remove old theme links before adding new.
- Persist theme in `localStorage` (key: `ld-theme`).
- Default theme: `base`.

---

## Core Types
```ts
interface Theme {
  id: 'base' | 'walmart-b2b';
  name: string;
  description: string;
  primitiveCSS: string;
  semanticCSS: string;
}

interface ThemeContextValue {
  currentTheme: string;
  availableThemes: Theme[];
  switchTheme: (themeId: string) => void;
}
```

---

## Steps
### 1) Theme files
- Move existing tokens into `themes/base/`.
- Add WCP extensions to `themes/base/semantic.css`.
- Create B2B overrides in `themes/walmart-b2b/semantic.css`.
- Only override differences in B2B.

### 2) Theme registry
`client/contexts/theme-registry.ts`
```ts
export const THEMES = [
  {
    id: 'base',
    name: 'Walmart Connect (Base)',
    description: 'Default Walmart Connect theme with WCP extensions',
    primitiveCSS: '/styles/themes/base/primitive.css',
    semanticCSS: '/styles/themes/base/semantic.css',
  },
  {
    id: 'walmart-b2b',
    name: 'Walmart Business (B2B)',
    description: 'B2B theme with darker brand colors',
    primitiveCSS: '/styles/themes/walmart-b2b/primitive.css',
    semanticCSS: '/styles/themes/walmart-b2b/semantic.css',
  },
];
export const DEFAULT_THEME = 'base';
```

### 3) Theme context
`client/contexts/ThemeContext.tsx`
- Responsibilities:
  - Load theme CSS links.
  - Switch themes.
  - Persist theme choice.

Key logic:
```ts
const loadThemeCSS = (theme: Theme) => {
  document.querySelectorAll('link[data-theme]').forEach(l => l.remove());
  const primitive = document.createElement('link');
  primitive.rel = 'stylesheet';
  primitive.href = theme.primitiveCSS;
  primitive.setAttribute('data-theme', 'primitive');
  const semantic = document.createElement('link');
  semantic.rel = 'stylesheet';
  semantic.href = theme.semanticCSS;
  semantic.setAttribute('data-theme', 'semantic');
  document.head.appendChild(primitive);
  document.head.appendChild(semantic);
};
```

### 4) Theme switcher UI
`client/components/ThemeSwitcher.tsx`
- Simple select/dropdown.
- Shows name + description.
- Uses LD tokens for styling.

### 5) Integrate
`client/pages/ComponentLibrary.tsx`
- Add `<ThemeSwitcher />` in header (right side).

---

## Token differences (example)
- `action-fill-primary`: Base `#0053e2`, B2B `#002e99`.
- `text-brand`: Base `#0053e2`, B2B `#001e60`.

---

## Testing (manual)
1. Switch theme; verify tokens update.
2. Buttons, tags, links, cards, inputs all render correctly.
3. Hover/focus/disabled states visible.
4. Reload page; theme persists.

---

## Risks & mitigation
- Theme fails to load → fallback to base.
- Partial load → load both files together and rollback on error.
- Token conflicts → keep semantic token names stable across themes.

---

## Success criteria
- Two themes switchable.
- No component code changes required.
- Accessible focus states in both themes.
