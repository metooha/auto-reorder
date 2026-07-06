---
title: Table Standardization Plan
scope: migration
status: in-progress
owner: design-system
last_updated: 2025-02-26
---

## Purpose

Standardize all data tables to match the reference implementation in `client/pages/Index.tsx`.

## Reference Pattern

```
Sticky header:  sticky top-0 z-20
Sticky left:    sticky left-0 z-30  (checkbox column)
Sticky right:   sticky right-0 z-30 (actions column)
Row hover:      hover:bg-[#F0F5FF] group
Links:          <Link> component
Status:         <Tag> component
Actions:        <Menu> component
```

## Tables to Standardize

| File | Status | Missing |
|------|--------|---------|
| `client/pages/AllCampaigns.tsx` | Pending | Sticky cols, resize handles, Link, Tag |
| `client/pages/AllKeywords.tsx` | Pending | Sticky cols, resize handles |
| `client/pages/DisplayAdvertisingCampaigns.tsx` | Pending | Sticky cols, resize, Link, Tag |
| `client/pages/ItemHealth.tsx` | Pending | Sticky cols, resize, Tag (OLQTag done) |
| `client/pages/OmniROAS.tsx` | Pending | Sticky header, resize |
| `client/pages/Campaign.tsx` | Pending | Multiple tables, inconsistent |
| `client/components/DisplayDashboard.tsx` | Partial | Some Link done, need sticky cols |
| `client/components/SponsoredSearchDashboard.tsx` | Partial | Some Link done, need sticky |
| `client/pages/AllCampaigns_TABLE_NEW.tsx` | Pending | Verify pattern match |

## Per-Table Checklist

When standardizing any table, check off each item:

- [ ] Sticky header (`sticky top-0 z-20`)
- [ ] Sticky left column/checkbox (`sticky left-0 z-30`)
- [ ] Sticky right column/actions (`sticky right-0 z-30`)
- [ ] Resize handles on all non-sticky columns
- [ ] Row hover uses `hover:bg-[#F0F5FF] group`
- [ ] All links use `<Link>` component
- [ ] All status indicators use `<Tag>` component
- [ ] All row action menus use `<Menu>` component
- [ ] Proper shadow on sticky columns
- [ ] Correct z-index hierarchy
- [ ] LD 3.5 color tokens (no hard-coded hex)
- [ ] Keyboard navigation works
- [ ] Dev server shows no errors after change

## Find Tables Missing the Standard Pattern

```bash
# Tables missing sticky header
grep -L "sticky top-0 z-20" client/pages/*.tsx client/components/*.tsx

# Tables with inline link styles instead of <Link>
grep -r 'className=".*text-blue.*cursor-pointer' client/pages/ client/components/
```
