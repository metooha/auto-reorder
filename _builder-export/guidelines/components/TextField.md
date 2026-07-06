title: Text Field
scope: component
status: draft
owner: design-system
last_updated: 2025-01-07
---

## Purpose
Text Fields collect single-line input such as names, emails, and phone numbers.

## Rules
- Use the Living Design Text Field component.
- Provide a visible label or accessible name.
- Support error, disabled, and read-only states.
- Keep width under 700px on large screens.

## States
Default, Focus-visible, Disabled, Read-only, Error, Magic (AI-filled)

## Example
```tsx
import * as React from "react";
import { TextField } from "REPLACE_ME_COMPONENT_IMPORT_PATH";

export function TextFieldExamples() {
  const [value, setValue] = React.useState("");

  return (
    <TextField
      label="Email address"
      value={value}
      onValueChange={setValue}
      helperText="We'll never share your email."
    />
  );
}
```

## Notes
- Use helper text for format guidance.
- Error text replaces helper text.
- Magic state indicates AI-filled content and responds to agent themes.

## Accessibility
- Associate labels with inputs.
- Announce errors with aria attributes.
- Keep read-only fields focusable.
