## Summary
Living Design migration is in progress. Button, ButtonGroup, Card, and Heading are available. Tokens and typography are wired.

## Completed
- Button (primary/secondary/tertiary/destructive)
- ButtonGroup
- Card / CardHeader / CardContent
- Heading
- Design tokens + CSS Modules

## Needs Migration
### Pages (examples)
- `client/pages/Index.tsx`
- `client/pages/AllCampaigns.tsx`
- `client/pages/AllKeywords.tsx`
- `client/pages/Campaign.tsx`
- `client/pages/KeywordsPlanner.tsx`
- `client/pages/ItemHealth.tsx`
- `client/pages/DisplayAdvertisingCampaigns.tsx`
- `client/pages/SponsoredSearch.tsx`
- `client/pages/NotFound.tsx`
- `client/pages/AllCampaigns_TABLE_NEW.tsx`

### Components (examples)
- `client/components/DisplayDashboard.tsx`
- `client/components/RecommendationsPanel.tsx`
- `client/components/RecommendationsPopover.tsx`
- `client/components/AttributionFilterDropdown.tsx`
- `client/components/DateRangeFilterDropdown.tsx`
- `client/components/DisplayAdvertisingSidebar.tsx`
- `client/components/CampaignChart.tsx`
- `client/components/BiddingStrategyModal.tsx`

## Common Issues
- Inline hex colors instead of tokens
- Tailwind typography classes instead of LD typography components
- Inconsistent heading sizes

## Guidance
- Use LD Heading for titles.
- Use tokens for color.
- Keep typography consistent across pages.
