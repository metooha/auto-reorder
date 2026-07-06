## Overview
This project uses **react-i18next**. All user-facing text must be translated.

**Languages**: en, es, fr

## Structure
```
client/
├── i18n.ts
├── locales/
│   ├── en/common.json
│   ├── en/pages.json
│   ├── es/common.json
│   ├── es/pages.json
│   ├── fr/common.json
│   └── fr/pages.json
└── components/ui/LanguageSelector.tsx
```

## Golden Rule
Never hardcode user-facing text. Use translation keys.

## Namespaces
| Namespace | File | Use for |
|-----------|------|---------|
| `common` | `common.json` | Shared UI text (nav, buttons, labels) |
| `pages` | `pages.json` | Page-specific text |

## Add New Strings
1. Add keys to **en**, **es**, **fr**.
2. Use `useTranslation()` in components.

```tsx
import { useTranslation } from 'react-i18next';

export function MyFeature() {
  const { t } = useTranslation('pages');
  return <h1>{t('myFeature.title')}</h1>;
}
```

## Key Rules
- Use camelCase keys.
- Group keys by feature.
- Keep nesting shallow (2–3 levels).

## Translate These
- Headings, labels, buttons, helper text
- Errors, empty states, toasts
- Table headers, tab labels, breadcrumbs
- aria-labels, alt text

## Do Not Translate
- Brand names (Walmart)
- IDs, URLs, code examples
- Pure numbers

## Interpolation
```json
{"results": {"showing": "Showing {{count}} results"}}
```
```tsx
t('results.showing', { count })
```

## Plurals
Use `count` with i18next for plural forms.
