---
title: LD 3.5 Tag Component Implementation
scope: implementation
status: archived
owner: design-system
last_updated: 2025-02-26
---

## Status: Archived

This implementation summary has been distilled into a prescriptive rule.

**Active rule**: `guidelines/rules/RULE_TagComponents.mdc`

## What Was Done

- Created `client/components/ui/tag.tsx` — general-purpose Tag with `default`, `primary`, `secondary`, `success`, `warning`, `destructive`, `info` variants and `sm/md/lg` sizes
- Created `client/components/ui/olq-tag.tsx` — OLQ percentage badge with built-in red/yellow/green threshold logic
- Replaced manual `getOLQStyle()` functions in `ItemHealth.tsx` and `OmniROAS.tsx` with `<OLQTag>`
- Exported both components from `client/components/ui/index.ts`

For usage rules, import paths, and migration patterns see `RULE_TagComponents.mdc`.
