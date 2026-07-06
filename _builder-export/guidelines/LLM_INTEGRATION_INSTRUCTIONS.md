# LLM Integration Instructions (Short)

Use this guide to integrate Living Design 3.5 (LD 3.5) into another Builder project.

---

## 1) Prerequisites
### Required deps (core)
- `class-variance-authority`, `clsx`, `tailwind-merge`
- `tailwindcss`, `tailwindcss-animate`, `postcss`, `autoprefixer`

### Radix deps (for shared components)
- `@radix-ui/*` packages used by shadcn wrappers (accordion, dialog, dropdown, tabs, etc.).

### Optional deps (only if you use these components)
- `lottie-react`, `date-fns`, `react-day-picker`, `embla-carousel-react`, `recharts`, `vaul`, `cmdk`, `react-hook-form`, `input-otp`, `react-resizable-panels`, `sonner`.

### Path alias
In `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./client/*"] }
  }
}
```
Adjust `client` to `src` if needed.

---

## 2) Copy files
Copy these directories as-is (keep structure):
- `client/components/ui/`
- `client/components/icons/` and `client/components/icons-custom/`
- `client/components/examples/` (optional)
- `client/styles/`
- `public/styles/` (theme files)
- `client/contexts/ThemeContext.tsx`, `client/contexts/theme-registry.ts`
- `client/hooks/*` (local storage, snackbar, mobile)
- `client/lib/utils.ts`
- `guidelines/` and `design-system-docs/`

Add to global CSS (before Tailwind):
```css
@import url("/fonts/fonts.css");
@import "./styles/themes/base/primitive.css";
@import "./styles/themes/base/semantic.css";
```

---

## 3) Replace shadcn components with LD equivalents
Replace common shadcn components with LD components:
- `button` → `Button`
- `badge` → `Badge`
- `checkbox` → `Checkbox`
- `select` → `Select`
- `textarea` → `TextArea`
- `input` → `TextField`
- `card` → `Card` (+ `CardHeader`, `CardContent`)
- `popover` → `Popover` (LD)
- `tabs` → `Tab`
- `toggle` → `Toggle` (uppercase file)
- `separator` → `Divider`
- `progress` → `ProgressIndicator`
- `skeleton` → `Skeleton`
- `switch` → `Switch`
- `table` → `DataTable`

Keep shared Radix wrappers (lowercase) if there is no LD equivalent.

### Import rule
```tsx
// LD components use uppercase imports
import { Button } from '@/components/ui/Button';
```

---

## 4) Token migration rules
Replace hardcoded values with semantic tokens:
- Colors → `var(--ld-semantic-color-*)`
- Spacing → `var(--ld-semantic-spacing-*)`
- Fonts → `var(--ld-semantic-font-family-*)`
- Radius → `var(--ld-semantic-border-radius-*)`

Replace inline SVGs with icons from `@/components/icons`.

---

## 5) Create new components (only if needed)
1. Search `client/components/ui/` and `guidelines/` first.
2. If new component is required:
   - `client/components/ui/ComponentName.tsx`
   - `client/components/ui/ComponentName.module.css`
3. Use LD tokens only. No hardcoded values.
4. Add example and guideline if needed.

---

## 6) Validation checklist
- No raw `<button>` (use `<Button>`).
- No inline SVGs.
- No hardcoded hex/rgb colors.
- No non-token spacing or font values.
- Theme switching works (if ThemeContext is used).

---

## Quick import cheat sheet
```tsx
// LD components
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { Card } from '@/components/ui/Card';
import { CardHeader } from '@/components/ui/CardHeader';
import { CardContent } from '@/components/ui/CardContent';
import { Tag } from '@/components/ui/Tag';
import { Badge } from '@/components/ui/Badge';
import { Alert } from '@/components/ui/Alert';
import { Divider } from '@/components/ui/Divider';
import { IconButton } from '@/components/ui/IconButton';
import { LinkButton } from '@/components/ui/LinkButton';
import { TextField } from '@/components/ui/TextField';
import { TextArea } from '@/components/ui/TextArea';
import { Select } from '@/components/ui/Select';
import { Tabs } from '@/components/ui/Tab';
import { Modal } from '@/components/ui/Modal';
import Metric from '@/components/ui/Metric';
import { DataTable } from '@/components/ui/DataTable';

// Shared components (lowercase)
import { Dialog } from '@/components/ui/dialog';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';

// Icons
import { Search, ChevronRight, Close } from '@/components/icons';
```
