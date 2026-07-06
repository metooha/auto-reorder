# Living Design 3.5 Design Tokens (Short)

## Overview
Use existing tokens only. Never add new tokens or hardcoded values.

## Token architecture
- **Primitive tokens** (`styles/primitive.css`): raw values.
- **Semantic tokens** (`styles/semantic.css`): usage-based names.
- **Rule:** Components must use semantic tokens, not primitives.

## Mandatory rules
1. No hardcoded colors, spacing, or fonts.
2. No new custom CSS variables.
3. Use semantic tokens (not primitives) in components.
4. Use state tokens for hover/focus/pressed/disabled.
5. Choose tokens by purpose, not by color name.

## Quick examples
```css
/* Wrong */
.button { background: #0053e2; color: #fff; padding: 16px; }

/* Right */
.button {
  background: var(--ld-semantic-color-action-fill-primary);
  color: var(--ld-semantic-color-action-text-on-fill-primary);
  padding: var(--ld-semantic-spacing-4);
}
```

```css
/* Wrong */
.card { background: var(--ld-primitive-color-white); }

/* Right */
.card { background: var(--ld-semantic-color-surface); }
```

## Token categories (use these families)
- **Color:** `--ld-semantic-color-*`
- **Text:** `--ld-semantic-color-text-*`
- **Action:** `--ld-semantic-color-action-*`
- **Fill/Surface:** `--ld-semantic-color-fill-*`, `--ld-semantic-color-surface-*`
- **Border:** `--ld-semantic-color-border-*`
- **Spacing:** `--ld-semantic-spacing-*` (or primitive scale if needed)
- **Typography:** `--ld-semantic-font-*`
- **Radius:** `--ld-semantic-border-radius-*`
- **Elevation:** `--ld-semantic-elevation-*`

## State tokens (use for interactive elements)
- `*-hovered`, `*-focused`, `*-pressed`, `*-disabled`

## Builder/Figma import rule
All imported designs must be mapped to tokens. No raw values in generated CSS.

## If a token is missing
Do not create a new token. Request it or reuse the closest semantic token.
