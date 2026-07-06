---
name: add-i18n-strings
description: Add translatable i18n keys to en es fr locale files
---

## What This Skill Does

Shows you how to add user-facing strings to the three locale files (en, es, fr) and use them correctly in components with the `useTranslation` hook.

## When to Use It

- Adding a new component with user-visible text labels
- Adding a new page with headings or button text
- Adding new Component Library navigation entries
- Any time you write a string that a user will read

---

## The Core Rule

**Every user-facing string must go in the locale JSON file — never hardcoded in the component.**

```tsx
// ❌ WRONG — hardcoded string
<Button variant="primary">Add to cart</Button>

// ✅ CORRECT — translatable
const { t } = useTranslation();
<Button variant="primary">{t('product.addToCart')}</Button>
```

---

## Step-by-Step

### Step 1 — Find the right namespace and key location

The locale files are nested JSON objects. Keys are grouped by feature or component:

```
client/locales/
  en/common.json   ← English (primary)
  es/common.json   ← Spanish
  fr/common.json   ← French
```

Look at the existing structure to find the right group for your strings:

```json
{
  "nav": { ... },
  "actions": { ... },
  "componentLibrary": { ... },
  "walmart": { ... },
  "yourFeature": { ... }   ← Add new groups here
}
```

### Step 2 — Add keys to en/common.json first

Open `client/locales/en/common.json` and add your keys in the appropriate group:

```json
{
  "yourFeature": {
    "heading": "Your feature heading",
    "description": "Short description of what this does.",
    "addButton": "Add item",
    "emptyState": "No items yet. Add one to get started.",
    "errorMessage": "Something went wrong. Please try again."
  }
}
```

**Key naming conventions**:
- Use `camelCase` for key names
- Be descriptive but concise: `addToCart` not `btn1`
- Group related keys together under a parent object
- Use a `heading`, `description`, `emptyState`, `errorMessage` pattern for page sections

### Step 3 — Add the same keys to es/common.json and fr/common.json

**Spanish** (`client/locales/es/common.json`):
```json
{
  "yourFeature": {
    "heading": "Encabezado de tu función",
    "description": "Breve descripción de lo que hace.",
    "addButton": "Agregar elemento",
    "emptyState": "Aún no hay elementos. Agrega uno para comenzar.",
    "errorMessage": "Algo salió mal. Por favor, inténtalo de nuevo."
  }
}
```

**French** (`client/locales/fr/common.json`):
```json
{
  "yourFeature": {
    "heading": "Titre de votre fonctionnalité",
    "description": "Brève description de ce que cela fait.",
    "addButton": "Ajouter un élément",
    "emptyState": "Aucun élément pour l'instant. Ajoutez-en un pour commencer.",
    "errorMessage": "Une erreur s'est produite. Veuillez réessayer."
  }
}
```

> If you don't speak Spanish or French, use a placeholder like `"[ES] Your feature heading"` and leave a comment in the PR for a translator to update. Never leave a key undefined or missing from any locale file.

### Step 4 — Use the strings in your component

```tsx
import { useTranslation } from 'react-i18next';

export function YourFeature() {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t('yourFeature.heading')}</h2>
      <p>{t('yourFeature.description')}</p>
      <Button variant="primary">{t('yourFeature.addButton')}</Button>
    </div>
  );
}
```

### Step 5 — Strings with dynamic values

Use interpolation for strings that include variable data:

**In locale file**:
```json
{
  "yourFeature": {
    "itemCount": "{{count}} items",
    "greeting": "Welcome back, {{name}}"
  }
}
```

**In component**:
```tsx
const { t } = useTranslation();

// Single variable
t('yourFeature.greeting', { name: user.firstName })

// Pluralization
t('yourFeature.itemCount', { count: items.length })
```

---

## Component Library Navigation Keys

When adding a new component to the Overview page, add keys in this pattern:

```json
{
  "componentLibrary": {
    "navYourComponent": "Your Component",
    "descYourComponent": "Short one-line description of what this component does."
  }
}
```

These are referenced in `client/pages/component-library/Overview.tsx`:

```tsx
{
  titleKey: 'componentLibrary.navYourComponent',
  descKey: 'componentLibrary.descYourComponent',
  path: '/component-library/your-component',
  icon: 'Note',
  section: 'ld',
}
```

---

## Complete Example — Adding Strings for a New Banner Component

**1. `client/locales/en/common.json`**:
```json
{
  "basicBanner": {
    "defaultText": "Declarative title or body",
    "freeShipping": "Free delivery on orders $35+",
    "walmartPlus": "Walmart+ members save more every day",
    "sameDay": "Same-day pickup available at your store"
  }
}
```

**2. `client/locales/es/common.json`**:
```json
{
  "basicBanner": {
    "defaultText": "Título o cuerpo declarativo",
    "freeShipping": "Entrega gratuita en pedidos de $35 o más",
    "walmartPlus": "Los miembros de Walmart+ ahorran más cada día",
    "sameDay": "Recogida el mismo día disponible en tu tienda"
  }
}
```

**3. `client/locales/fr/common.json`**:
```json
{
  "basicBanner": {
    "defaultText": "Titre ou corps déclaratif",
    "freeShipping": "Livraison gratuite pour les commandes de 35 $ et plus",
    "walmartPlus": "Les membres Walmart+ économisent plus chaque jour",
    "sameDay": "Retrait le jour même disponible dans votre magasin"
  }
}
```

**4. In the component**:
```tsx
const { t } = useTranslation();
<BasicBanner variant="brand" text={t('basicBanner.walmartPlus')} />
```

---

## Checklist Before Marking Done

- [ ] Key added to `en/common.json`
- [ ] Same key added to `es/common.json`
- [ ] Same key added to `fr/common.json`
- [ ] No hardcoded user-visible strings remain in the component
- [ ] Dynamic values use `t('key', { variable })` interpolation
- [ ] Key names are camelCase and grouped under a logical parent

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Hardcoded string in component: `"Add to cart"` | Use `t('actions.addToCart')` |
| Key only added to `en/common.json` | Always add to all 3 locale files at the same time |
| Key name is too generic: `"text"` | Be specific: `"addToCartButton"` |
| Missing key in one locale file | Component falls back to the key string itself — always add to all locales |
| Using index-based keys: `"btn1"`, `"label2"` | Use semantic names: `"submitButton"`, `"quantityLabel"` |
| Translating dev-only text (console logs, error codes) | Only translate user-visible strings — not internal errors |
