# RULE: Theme Switcher (Short)

## Overview
Themes swap CSS variables at `:root`. Base theme loads first; override themes only change deltas.

---

## File structure
```
styles/themes/
├── base/
│   ├── primitive.css
│   └── semantic.css
├── walmart-b2b/
│   ├── primitive.css
│   └── semantic.css
└── [theme]/
    ├── primitive.css
    └── semantic.css
```

---

## Inheritance rules
- **Base theme** contains the full token set.
- **Override themes** only include changed tokens.
- Do not duplicate spacing, typography, elevation, or other structural tokens.

---

## Add a new theme
1. Create `styles/themes/[theme]/primitive.css` and `semantic.css`.
2. Only add overrides (leave everything else out).
3. Register in `client/contexts/theme-registry.ts`.
4. Test on `/component-library` with theme switcher.

---

## Tokens to override (common)
- `--ld-semantic-color-action-fill-primary`
- `--ld-semantic-color-text-brand`
- `--ld-semantic-color-border-brand`
- `--ld-semantic-color-action-focus-outline`

## Tokens to keep (usually)
- Spacing, typography, border radius, elevation
- Error/success/warning tokens

---

## Testing checklist
- All components render correctly.
- Hover/focus/pressed/disabled states visible.
- No console errors.
- Theme persists after reload.

---

## Troubleshooting
- Verify CSS links exist and are loaded.
- Ensure tokens are under `:root`.
- Ensure components use semantic tokens (not hardcoded values).
