---
title: Skills Index
scope: skill
status: stable
owner: design-system
last_updated: 2026-03-02
---

## What Is a Skill?

A **skill** is a step-by-step implementation recipe for a common task in this project. Skills are the "how-to" companion to rules:

| | Rule | Skill |
|---|---|---|
| **Purpose** | Defines what is required or forbidden | Teaches how to do something well |
| **Tone** | "You MUST / NEVER" | "Here's how to do this" |
| **Content** | Constraints and enforcement | Steps, recipes, copy-paste code |
| **Enforced?** | Always | Applied when the task calls for it |

Skills assume you have already read the relevant rule. They do not re-explain the "why" — they focus entirely on the "how."

---

## Available Skills

### Component Building

| Skill | Based on Rule | Summary |
|---|---|---|
| [Build a WCP Component](SKILL_BuildWCPComponent.md) | `RULE_WCPComponentCreation.mdc` | End-to-end walkthrough: file, CSS module, Component Library page, route, i18n |
| [Build a Scroll Carousel](SKILL_BuildScrollCarousel.md) | `RULE_CarouselAndScrollPatterns.mdc` | Copy-paste scroll-snap carousel with hidden scrollbar and responsive tile sizes |
| [Build a Responsive Page](SKILL_BuildResponsivePage.md) | `RULE_ResponsiveLayout.mdc`, `RULE_WalmartPageComposition.mdc` | New Walmart page with correct shell, stacking order, full-bleed sections, and breakpoints |

### Design & Tokens

| Skill | Based on Rule | Summary |
|---|---|---|
| [Map Figma Designs to Tokens](SKILL_MapFigmaToTokens.md) | `RULE_DesignSystemEnforcement.mdc`, `RULE_ThemeCompliance.mdc` | How to look at a Figma frame and translate every color, size, and font into a semantic token |
| [Add a Theme Override](SKILL_AddThemeOverride.md) | `RULE_ThemeCompliance.mdc`, `RULE_ThemeAddition.mdc` | How to make one brand look different (e.g., Bodega green) without touching component CSS |
| [Fix Token Violations](SKILL_FixTokenViolations.md) | `RULE_ThemeCompliance.mdc`, `RULE_DesignSystemEnforcement.mdc` | How to find and replace hardcoded hex colors and primitive tokens in existing code |

### Animation & Motion

| Skill | Based on Rule | Summary |
|---|---|---|
| [Add a CSS Animation](SKILL_AddAnimation.md) | `RULE_AnimationAndMotion.mdc` | Keyframes, transitions, insertion glows, and skeleton loaders — with prefers-reduced-motion |

### Internationalisation

| Skill | Based on Rule | Summary |
|---|---|---|
| [Add Translatable Strings](SKILL_AddI18nStrings.md) | `RULE_Internationalization.mdc` | Add keys to en/es/fr locale files and use them in components with `useTranslation` |

### Icons & Assets

| Skill | Based on Rule | Summary |
|---|---|---|
| [Add a Custom Icon](SKILL_AddCustomIcon.md) | `RULE_IconUsage.mdc`, `RULE_DesignSystemEnforcement.mdc` | Create a new SVG icon component when none exists in the 303+ icon library |
| [Extract Figma Assets](SKILL_ExtractFigmaAssets.md) | `RULE_FigmaAssetExtraction.mdc`, `RULE_SVGAssets.mdc` | Identify exportable assets, use existing illustrations, avoid CDN URLs and placeholders |

### AI Design Prompting

| Skill | Based on Rule | Summary |
|---|---|---|
| [Write a Design Prompt](SKILL_WriteDesignPrompt.md) | `RULE_PromptDrivenDesign.mdc` | Recipes for prompting new pages, cards, banners, carousels, and nav sections |

### Product Documentation

| Skill | Based on Rule | Summary |
|---|---|---|
| [Generate a PRD from Figma](SKILL_PRD%20Template.md) | `RULE_PromptDrivenDesign.mdc` | Translate Figma anatomy annotations, do/don't specimens, and component states into a full PRD using the Walmart LD Arch standard template |

### Data & Components

| Skill | Based on Rule | Summary |
|---|---|---|
| [Build a Data-Driven Component](SKILL_BuildDataDrivenComponent.md) | `RULE_DataDrivenComponents.mdc` | Static data arrays, TypeScript interfaces, headlineParts, and objectPosition patterns |
| [Use Tag and OLQTag](SKILL_UseTagComponents.md) | `RULE_TagComponents.mdc` | When to use Tag vs OLQTag, all variants, how to replace custom styled status divs |
| [Build a Card Meta Layout](SKILL_BuildCardMetaLayout.md) | `RULE_CardMetaLayout.mdc` | Icon + stacked label/sublabel chip pattern with correct nested DOM structure |
| [Build an LD Primitive Component](SKILL_BuildLDComponent.md) | `RULE_CreateNewComponent.mdc` | Complete 10-step process for new design-system primitives in `client/components/ui/` |
| [Use LinkButton and Spot Icon](SKILL_UseLinkButton.md) | `RULE_LinkButtonAndSpotIcon.mdc` | LinkButton for text-link actions; round brand-colored Spot Icon for todo/action rows |

### WCP Purchase History (validated March 2026)

| Skill | Based on Rule | Summary |
|---|---|---|
| [Build a Purchase History Card](SKILL_BuildPurchaseHistoryCard.md) | `RULE_PurchaseHistoryCardPatterns.mdc`, `RULE_WCPComponentCreation.mdc` | Illustrated headers, status Tags, Alert banners, health score rings, pricing rows — full card recipe |
| [Accessibility Hardening](SKILL_AccessibilityHardening.md) | `RULE_WCPComponentCreation.mdc` | aria-hidden on icons, price row groups, SVG aria-labels, hover tooltips, rating widget keyboard support |
| [Manage a Pattern Library](SKILL_ManagePatternLibrary.md) | `RULE_PurchaseHistoryCardPatterns.mdc`, `RULE_PromptDrivenDesign.mdc` | Add/remove patterns, write prompts, maintain summary table, promote patterns to real pages |

---

## How to Use Skills

1. **Identify the task** — what are you trying to build or fix?
2. **Find the matching skill** in the table above
3. **Read the skill end-to-end** before writing any code
4. **Use the code templates** as your starting point — they are correct by design
5. **Check the relevant rule** if you need to understand enforcement details

---

## Skill Template

When creating a new skill, use this structure:

```markdown
---
title: Skill Name
scope: skill
based-on: RULE_FileName.mdc
last_updated: YYYY-MM-DD
---

## What This Skill Does
One sentence.

## When to Use It
Two or three bullets.

## Step-by-Step

### Step 1 — Title
Explanation + code.

### Step 2 — Title
...

## Complete Example
Full working code block.

## Common Mistakes
Short list of pitfalls.
```
