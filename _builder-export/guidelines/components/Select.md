title: Select
scope: component
status: draft
owner: design-system
last_updated: 2025-12-19
---

## Purpose
Choose one value from a list.

## Rules
- Use the Living Design Select component.
- Provide a label and support error states.
- Prefer native select when possible for accessibility.

## States
Default, Focus-visible, Disabled, Error, Magic (AI-selected)

## Example
```tsx
import * as React from "react";
import { Select, SelectItem } from "@/components/ui/Select";

export function SelectExample() {
  const [value, setValue] = React.useState("");

  return (
    <Select
      label="Country"
      value={value}
      onValueChange={setValue}
      placeholder="Select option..."
      helperText="Choose your shipping destination."
    >
      <SelectItem value="us">United States</SelectItem>
      <SelectItem value="ca">Canada</SelectItem>
      <SelectItem value="mx">Mexico</SelectItem>
    </Select>
  );
}
```

## API (summary)
```ts
interface SelectProps {
  label: string;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: 'small' | 'large';
  error?: boolean;
  errorMessage?: string;
  isMagic?: boolean;
  helperText?: string;
  leadingIcon?: React.ReactNode;
  required?: boolean;
}
```

## Notes
- Magic state reflects AI-selected input. It responds to agent themes.
- Use Select when users must choose a single option.
- Use Radio/Checkbox groups for 2–3 options or multi-select needs.
