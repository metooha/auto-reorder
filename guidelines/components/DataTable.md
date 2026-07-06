---
title: DataTable
scope: component
status: stable
owner: design-system
last_updated: 2025-02-25
---

## Purpose

The DataTable component system displays and interacts with tabular data following Living Design 3.5 specifications. All tabular data must use this component system.

## Rules

- **MUST** use the DataTable component system for all tabular data. Never create custom `<table>` elements.
- **MUST NOT** customize DataTable colors or visual styling. DataTable must look identical everywhere.
- **MUST NOT** override with custom backgrounds, border colors, font colors, or `UNSAFE_className`/`UNSAFE_style` overrides for visual changes.
- **MUST** use `rounded` prop for standalone DataTables. DataTables inside cards/containers should NOT use `rounded`.
- **SHOULD** use frozen columns for key identifier and action columns.

## Usage

```tsx
import { DataTable, DataTableHead, DataTableBody } from '@/components/ui/DataTable';
import { DataTableRow } from '@/components/ui/DataTableRow';
import { DataTableHeader } from '@/components/ui/DataTableHeader';
import { DataTableCell } from '@/components/ui/DataTableCellText';

<DataTable rounded>
  <DataTableHead>
    <DataTableRow>
      <DataTableHeader>Name</DataTableHeader>
      <DataTableHeader alignment="right">Price</DataTableHeader>
    </DataTableRow>
  </DataTableHead>
  <DataTableBody>
    {data.map((item) => (
      <DataTableRow key={item.id}>
        <DataTableCell>{item.name}</DataTableCell>
        <DataTableCell variant="numeric">${item.price}</DataTableCell>
      </DataTableRow>
    ))}
  </DataTableBody>
</DataTable>
```

### Component Hierarchy

```
DataTableTitle          (header bar above table)
DataTableBulkActions    (toolbar when rows selected)
DataTableConfigPanel    (column config overlay)

DataTable               (<table>)
  DataTableHead         (<thead>)
    DataTableRow        (<tr>)
      DataTableHeaderSelect   (select-all checkbox)
      DataTableHeader         (sortable, resizable, frozen)
  DataTableBody         (<tbody>)
    DataTableRow        (<tr>)
      DataTableCellSelect              (row checkbox)
      DataTableCell                    (text: alphanumeric/numeric)
      DataTableCellStatus              (Tag components)
      DataTableCellActions             (IconButton/Menu)
      DataTableCellInlineEditTextArea  (inline edit dialog)
      DataTableCellBulkEditTextArea    (always-visible textarea)
```

### Key Features

- **Sorting**: Add `sort` and `onSort` to `DataTableHeader`.
- **Column Resizing**: Add `resizable` and `onResize` to `DataTableHeader`.
- **Frozen Columns**: Add `frozen="left"` or `frozen="right"` to headers and cells.
- **Row Selection**: Use `DataTableHeaderSelect` + `DataTableCellSelect` together.
- **Bulk Actions**: Use `DataTableBulkActions` above the table when rows are selected.
- **Column Config**: Use `DataTableConfigPanel` for show/hide, pin, and reorder.

### DataTable Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `rounded` | `boolean` | `false` | Rounded corners on container |
| `elevated` | `boolean` | `false` | Box-shadow elevation |
| `textStyle` | `'body-small' \| 'body-medium'` | `'body-small'` | Default text style |

## Do / Don't

### Do

- Use DataTable for all tabular data without exception.
- Use `rounded` for standalone tables, omit when inside cards.
- Use frozen columns for identifier and action columns.
- Keep the default DataTable styling everywhere.

### Don't

- Create custom `<table>` elements.
- Override DataTable colors, backgrounds, or borders.
- Apply alternate row colors, tinted headers, or striped rows (even if Figma shows them).
- Use `UNSAFE_className`/`UNSAFE_style` for visual overrides.

## Accessibility

- `DataTableHeader` renders `scope="col"` and `aria-sort` for sortable columns.
- `DataTableCellSelect` requires `a11yLabelledBy` referencing a visible label cell.
- `DataTableHeaderSelect` provides visually hidden label (default: "Toggle all rows").
- `DataTableConfigPanel` renders as `role="dialog"` with `aria-modal`.

## Related

- [DataTable API reference](../../design-system-docs/DataTable.mdx)
- Example: `client/components/examples/DataTableExample.tsx`
- View in component library at `/component-library/table`
