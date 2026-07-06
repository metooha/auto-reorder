---
title: Generate a PRD from Figma Design Documentation
scope: skill
status: stable
last_updated: 2026-03-02
---

# Generate a PRD from Figma Design Documentation

> Reusable Product Requirements Document structure for Walmart LD Arch product initiatives.
> Derived from the Brand Shop / Shelf Workflow PRD (pageId=2039468720) as a canonical example.
> Includes a step-by-step guide for translating Figma design documentation into each PRD section.

---

## What This Skill Does

Translates Figma design documentation artifacts — anatomy annotations, do/don't specimens, component states, and variant tables — into a structured, reviewable PRD using the Walmart LD Arch standard template.

## When to Use It

- You have a Figma file with annotated component specs (anatomy lists, state frames, do/don't sections)
- You are starting a new feature PRD from a design-first workflow
- You need to align PM, Eng, QA, and Architecture from an existing design

---

## Part 1 — Read Your Figma Design Documentation

Before writing any PRD section, extract the following from your Figma file:

### 1A — Anatomy Annotations

Figma uses **"Anatomy itemized"** components — numbered lists that describe exactly what each part of the UI does.

**What to look for in the design:**
```
Anatomy itemized → items 1–N
Each item = one behavioral rule about the component
```

**What it maps to in the PRD:**
- Each anatomy item → one row in the **Requirements Table** (Section 7)
- Convert the description into a user story: "As a [user], I want [anatomy behavior] so that [outcome]"

**Example from Heart View + Callout design:**

| Anatomy Item | → Requirements Table Row |
|---|---|
| "The Heart View component is in the 'Hovered' state." | The callout MUST appear when the Heart View icon is hovered |
| "There is 8px of spacing between the Heart View component and the Callout." | The gap between trigger and callout MUST be exactly 8px |
| "The Callout hugs its content and maintains its padding." | The callout width MUST not stretch to fill the container |
| "The Callout may use any position variant depending on the location of the Heart View component." | The callout position variant MUST adapt to viewport edge proximity |

---

### 1B — Component States (State Frames)

Figma frames are often named by their **interaction state** (Hovered, Activated, Pressed, Removed, etc.). Each state frame = one user journey step.

**What to look for:**
- Frame layer names that include a state: `State=Hovered`, `State=Activated`, `isActivated=True`, etc.
- `data-variant-name` props in the design: `State=Hovered, isActivated=False, Variant=Medium`

**What it maps to in the PRD:**
- Each unique state → one row in the **User Journey Map** (Section 5)
- State sequence → the numbered narrative steps in Section 5

**Example from Heart View + Callout design:**

| State Frame | User Journey Step |
|---|---|
| `State=Hovered, isActivated=False` | 2. User hovers over the Heart View icon → "Add to favorites" callout appears |
| `State=Activated` | 3. User clicks → item saved; callout shows "Saved to favorites: [List Name]" with a "View" action |
| `State=Hovered, isActivated=False` (post-remove) | 4. User clicks again → item removed; callout shows "Removed from favorites: [List Name]" |

---

### 1C — Do/Don't Specimens

Figma uses **"Specimen Note-do and don't"** frames — paired images with labeled Do / Don't headers and a body description.

**What to look for:**
- `🛠️ Semantic Header` with `Type=Do` or `Type=Don't`
- Body text explains the specific constraint or correct usage

**What it maps to in the PRD:**
- **Do** specimens → Functional Requirements or Acceptance Criteria in Section 7
- **Don't** specimens → Edge Cases or Out of Scope in Sections 7 / 8
- Both together → QA test cases in Sections 12 / 13

**Example from Heart View + Callout design:**

| Specimen | Type | PRD Section |
|---|---|---|
| "Overlay the Heart Fill component on top of Item Tiles in the top right corner." | Do | Section 7 — Functional Requirement: Heart View MUST be positioned top-right on Item Tiles |
| "On PDP pages, Heart View within floating buttons MUST match the other button sizes." | Do | Section 7 — Functional Requirement: Size consistency enforced on PDP floating button rows |
| "Don't change the color of the filled state of the Heart View component." | Don't | Section 7 — Edge Case: Heart View fill color MUST NOT be overridden per-surface |
| "Don't include CTAs in the tooltip content that are not available from the page underneath." | Don't | Section 8 — Out of Scope: Callout-only CTAs with no page-level fallback |
| "Add a popover in a place where it doesn't overlap any other actions." | Do | Section 7 — Functional Requirement: Callout position MUST not occlude adjacent interactive elements |
| "Don't add a popover where it overlaps other actions (e.g., the zoom action)." | Don't | Section 7 — Edge Case: Callout MUST reposition when default position would cover a sibling action button |

---

### 1D — Component Variants / Props

Figma component instances expose variant props like:
```
isChecked=True/False
State=Enabled / Hovered / Pressed / Disabled
Size=Small / Medium / Large
Variant=Round / Square
Color=Default / Brand
```

**What it maps to in the PRD:**
- Each prop axis → one row in the **Functional Requirements Summary** (Section 7)
- Boolean props (isChecked, isActivated) → one acceptance criterion each
- State props → one test case per state in Section 12

**Example from WCP Icon Selector design:**

| Component Prop | Requirement |
|---|---|
| `isChecked=False` (shows `CheckCircle` outline icon) | Icon Selector MUST display an outline check-circle when not selected |
| `isChecked=True` (shows `CheckCircleFill` solid icon) | Icon Selector MUST display a filled check-circle when selected |
| `State=Enabled` | Icon Selector MUST be interactive and respond to click/tap |
| `Variant=Round` | Icon Selector MUST have a fully rounded border-radius by default |

---

## Part 2 — PRD Template

Use this template. Fill each section using the extraction guide in Part 1.

```markdown
# [Component / Feature Name] — Product Requirements Document

**Confluence Source**: [Link]
**Status**: Draft | In Review | Approved
**Last Updated**: YYYY-MM-DD
**Version**: 1.0

---

## TLDR

> One paragraph. What is broken today? What are we building? What is the key outcome?
> Write this for a busy exec who has 30 seconds.

---

## Team

| Role       | Name(s)         |
|------------|-----------------|
| PM         | [Name]          |
| Architect  | [Name]          |
| TPM        | [Name]          |
| QA         | [Name]          |
| Eng Lead   | [Name]          |
| Design/UX  | [Name]          |

---

## Section 1 — Problem Statement

### Problem Statement

- [What is the user/business pain?]
- [What friction/blocker exists today?]
- [What downstream harm occurs if unresolved?]

### Target Customer

- **Primary**: Who is directly affected?
- **Secondary / Downstream**: Who is indirectly affected?

### Pain Points

- [Specific friction point 1]
- [Specific friction point 2]

### Background

- [How did we get here? Historical product decisions, growth drivers]
- [How does this fit into the long-term product vision?]

---

## Section 2 — Objective

### User Objective

- [What the end user wants to achieve with this feature]
- [Outcome for them if successful]

### Business Objective

- [What Walmart / the platform gains]
- [Alignment to annual OKRs or platform strategy]

---

## Section 3 — Expected Business Impact and Key Results

### Expected Impact

- [Qualitative impact: e.g., improved satisfaction, reduced support tickets]
- [Quantitative impact: e.g., X% increase in conversion]

### Key Results

- [KR 1: Measurable outcome with target metric]
- [KR 2: Measurable outcome with target metric]
- [KR 3: Measurable outcome with target metric]

---

## Section 4 — Rollout Plan

| Quarter | Milestone                              | Owner      |
|---------|----------------------------------------|------------|
| FY26 Q1 | UX Design complete                     | Design     |
| FY26 Q1 | Engineering development                | Eng        |
| FY26 Q1 | VQA, QA, Deploy                        | QA / Eng   |
| FY26 Q1 | GTM materials updated                  | PMM        |

> Include dependencies, phasing strategy, and gating conditions (e.g., A/B launch, partner readiness).

---

## Section 5 — User Journey Map / Experience

> Extracted from component state frames in your Figma file.
> Each unique interaction state = one step in the journey.

**[Link to Figma]**

### Journey Steps

1. User encounters [entry point — e.g., Item Tile on search results page]
2. User hovers [trigger element — state frame: State=Hovered, isActivated=False]
3. System shows [callout/tooltip — anatomy item 1 describes this]
4. User clicks [action — state frame: isActivated=True]
5. System responds with [confirmation — e.g., "Saved to favorites: [List Name]"]
6. User can [follow-on action — e.g., tap "View" to navigate to favorites list]

---

## Section 6 — High-Level Architecture Design

> Architects are responsible for high-level design proposals for any P0, P1 with LOE > 4 sprints.

**[Link to Architecture Design Doc]**

- [Decision 1]
- [Decision 2]

---

## Section 7 — Requirements and UI

### Functional Requirements Summary

> Extracted from: Anatomy annotations + Do specimens + Component variant props.

- **[Component / Area]**: [High-level requirement description]
- **[Component / Area]**: [High-level requirement description]

---

### Requirements Table — [Feature Area]

> One row per anatomy item or Do specimen. Use the exact behavioral language from the design annotations.

| # | User Story / Experience | Feature | Feature Details | Comments / Notes |
|---|------------------------|---------|-----------------|------------------|
| 1 | As a [user], I want [anatomy behavior] so that [outcome] | [Feature] | - Anatomy item 1<br>- Anatomy item 2 | [Design ref] |
| 2 | As a [user], I want [behavior] so that [outcome] | [Feature] | - Detail | [Notes] |

---

### Engineering / Architecture Notes

**Data Model / Concepts:**
- [Key hierarchy or data structure]

**Questions / Considerations:**
- [Open technical question 1]
- [Open technical question 2]

**Edge Cases:**
> Extracted from: Don't specimens in the Figma file.

- **[Don't specimen label]:** [How should the system handle or prevent this?]
- **[Don't specimen label]:** [How should the system handle or prevent this?]

---

## Section 8 — Out of Scope

> Extracted from: Don't specimens where the constraint is a permanent exclusion (not just an edge case).

1. **[Don't behavior]:** [Why it is excluded from this feature]
2. **[Don't behavior]:** [Why it is excluded from this feature]

---

## Section 9 — Metrics

### Input Metrics

| Metric | Description | Target | Owner |
|--------|-------------|--------|-------|
| [Metric] | [What it measures] | [Target] | [Team] |

### Output Metrics

| Metric | Description | Target | Owner |
|--------|-------------|--------|-------|
| [Metric] | [What it measures] | [Target] | [Team] |

---

## Section 10 — Events / Beacons

- [Event tracker to update]
- [New beacon / event to instrument]

---

## Section 11 — A/B Testing

1. [Hypothesis or metric to A/B test]
2. [Hypothesis or metric to A/B test]

> **Ultimate goal:** [North-star outcome the A/B tests are proving]

---

## Section 12 — E2E Test Cases

> Extracted from: Each component state frame + each Do specimen = one test case.
> Each Don't specimen = one negative test case (verify system prevents the bad behavior).

| # | Use Case | Platform | Description | Steps | Expected Results | Comments |
|---|----------|----------|-------------|-------|-----------------|----------|
| 1 | [State frame label] | [rWeb / iOS / Android] | [Anatomy item description] | 1. Step<br>2. Step | [Expected behavior from anatomy annotation] | |
| 2 | [Don't specimen - negative] | [Platform] | Verify [Don't behavior] does not occur | 1. Step | System prevents / repositions / flags | |

---

## Section 13 — UAT E2E Test Cases

| # | Use Case | Platform | Description | Steps | Expected Results | Comments |
|---|----------|----------|-------------|-------|-----------------|----------|
| 1 | [Use case] | [Platforms] | [Description] | 1. Step<br>2. Step | [Result] | |

---

## Section 14 — Open Questions

| # | Question | Answer | Comment |
|---|----------|--------|---------|
| 1 | [Question] | [TBD] | [Context] |

---

## Section 15 — Related Links / PRDs

- **Figma**: [Link to your design file]
- **Confluence**: [Link]
- **Related PRD**: [Link]

---

## Section 16 — Product Marketing Requirements

1. [What PMM comms or materials need to be created/updated]
2. [What Q&A / FAQ content is expected for this feature]

---

## Section 17 — Glossary

| Term | Definition |
|------|------------|
| [Term] | [Definition] |
| [Acronym] | [What it stands for and means in context] |
```

---

## Part 3 — Quick Mapping Cheat Sheet

| Figma Design Artifact | PRD Section |
|---|---|
| Anatomy itemized → item N | Section 7 — Requirements Table row |
| State frame (Hovered / Activated / Removed) | Section 5 — User Journey step |
| Do specimen | Section 7 — Functional Requirement or Section 12 — positive test case |
| Don't specimen (behavioral constraint) | Section 7 — Edge Case |
| Don't specimen (permanent exclusion) | Section 8 — Out of Scope |
| Component prop axis (Size, Variant, Color) | Section 7 — Functional Requirements Summary bullet |
| Boolean prop (isChecked, isActivated) | Section 12 — two test cases (true and false state) |
| Callout / Tooltip action text | Section 5 — Journey step + Section 7 — content requirement |

---

## Part 4 — Worked Example (Heart View + Callout)

### Section 5 — User Journey (from state frames)

1. User is browsing a search results page and sees Item Tiles
2. User hovers the Heart View icon — callout appears: "Add to favorites" *(State=Hovered, isActivated=False)*
3. User clicks the icon — item is saved; callout updates: "Saved to favorites: Amy's List" with a "View" link *(isActivated=True)*
4. User hovers Heart View again — callout: "Remove from favorites: Amy's List" *(State=Hovered, isActivated=True)*
5. User clicks — item removed; callout: "Removed from favorites: Amy's List" *(back to isActivated=False)*
6. User mouses out of the combined hit-box (Heart View + Callout) — callout dismisses

### Section 7 — Requirements Table (from anatomy annotations)

| # | User Story | Feature | Feature Details | Notes |
|---|---|---|---|---|
| 1 | As a shopper, I want a callout to appear when I hover the Heart View so I understand the action | Hover Callout | - Callout position: Right (default)<br>- Gap: 8px between icon and callout<br>- Text: "Add to favorites" | Position adapts to viewport edge |
| 2 | As a shopper, I want confirmation when I save an item so I know it worked | Save Confirmation Callout | - Text: "Saved to favorites: [List Name]"<br>- Includes "View" action link<br>- Callout width hugs content | List name dynamically injected |
| 3 | As a shopper, I want to be able to dismiss via mouse-out so the callout doesn't block my page | Combined Hit-box Dismissal | - Hit-box expands to include both Heart View + Callout<br>- Dismisses after mousing out of combined area | Stays visible while mouse is within combined hit-box |

### Section 7 — Edge Cases (from Don't specimens)

- **Heart View fill color override**: System MUST NOT allow per-surface color overrides of the filled Heart View state. The `isActivated=True` fill color is fixed by the design token.
- **Callout-only CTAs**: Callout actions MUST also be accessible from the page itself. Never add a CTA to the Callout that has no page-level equivalent, since the Callout auto-dismisses.
- **Callout occlusion**: Callout position MUST shift when the default position would overlap adjacent interactive elements (e.g., a zoom button on PDP).

### Section 8 — Out of Scope (from Don't specimens — permanent exclusions)

1. **Custom Heart View fill colors per surface**: Color theming of the activated/filled state is not in scope for this PRD. Heart View fill color is a design system token, not a per-feature variable.

---

## Related

- [SKILL_WriteDesignPrompt.md](SKILL_WriteDesignPrompt.md) — Write prompts for generating UI from designs
- [SKILL_AccessibilityHardening.md](SKILL_AccessibilityHardening.md) — Add WCAG requirements to Section 7 of the PRD
- [Specifications directory](../specifications/) — Where completed PRDs live
