## Overview
Replace custom icon buttons with the LD 3.5 `IconButton` component.

## Components Created
- `client/components/ui/IconButton.tsx`
- `client/components/ui/IconButton.module.css`
- `client/components/IconButtonExample.tsx`
- `guidelines/IconButton.md`

## IconButton Specs
- Variants: ghost, primary, secondary, tertiary, destructive
- Sizes: small (24), medium (32), large (40)
- Requires `aria-label`

## Migration Steps
1. Import `IconButton`.
2. Replace custom `<button>` with `<IconButton>`.
3. Use `currentColor` for icon fills.
4. Remove custom styling.

## Migration Targets
### High Priority
- `client/components/ui/MastHead.tsx`
- `client/components/SponsoredSearchSidebar.tsx`
- `client/components/DisplayAdvertisingSidebar.tsx`
- `client/components/StoreAdsSidebar.tsx`

### Medium Priority
- `client/components/EditMetricsModal.tsx`
- `client/components/DateRangeFilterDropdown.tsx`
- `client/components/BiddingStrategyModal.tsx`
- `client/components/RecommendationsPanel.tsx`

### Low Priority
- `client/components/ui/carousel.tsx`
- `client/components/ui/pagination.tsx`
