---
title: Extract Assets from a Figma Design
scope: skill
based-on: RULE_FigmaAssetExtraction.mdc, RULE_SVGAssets.mdc
last_updated: 2025-02-28
---

## What This Skill Does

Shows you how to identify which assets from a Figma design are meant to be exported — and how to use them in the project without downloading, generating, or duplicating assets unnecessarily.

## When to Use It

- Implementing a Figma design that contains illustrations, images, or icons
- Deciding whether to use an existing asset or request a new export
- A Figma design shows an image or graphic and you're not sure if it should be a real asset or a placeholder

---

## The Core Principle

**Only extract assets the designer explicitly marked as "exportable."**

Not every visual in a Figma file should become a file in the codebase. Backgrounds, layout shapes, and placeholder rectangles are design artifacts — they are NOT assets.

---

## Step 1 — Read the Figma HTML Output

When a Figma design is provided as HTML, look for assets that have explicit `src` attributes or are described as exportable:

```html
<!-- Exportable illustration — has a specific name and format -->
<img src="associate-waving.svg" />

<!-- NOT exportable — it's a rectangle or background shape -->
<div style="background: #F2F2F2; width: 200px; height: 200px" />
```

Look for these indicators of an exportable asset:
- A meaningful semantic name (`associate-waving`, `network-issue`, `star-rating`)
- An explicit file format in the description (SVG, PNG, WebP)
- A comment in the Figma file noting export settings

---

## Step 2 — Check Existing Assets First

Before requesting or generating anything, check if the asset already exists locally:

```bash
# Check spot illustrations
ls public/illustrations/spot-illustration/

# Check mono illustrations (category icons)
ls public/illustrations/mono-large/
ls public/illustrations/mono-small/

# Check product images
ls public/images/

# Search by concept
ls public/illustrations/ | grep -i "associate\|network\|toys\|grocery"
```

**If a semantically matching asset exists — use it.** Tell the user which one you chose and list 2–4 alternatives by filename.

---

## Step 3 — Use Existing Assets Correctly

```tsx
// ✅ Spot illustration — character or scene
<img
  src="/illustrations/spot-illustration/associate-waving.svg"
  alt="Associate waving hello"   // Descriptive alt text
  width="160"
  height="160"
/>

// ✅ Purely decorative illustration — use empty alt + aria-hidden
<img
  src="/illustrations/spot-illustration/network-issue.svg"
  alt=""
  aria-hidden="true"
  width="160"
  height="160"
/>

// ✅ Category/fulfillment pictogram
<img
  src="/illustrations/mono-large/Toys.svg"
  alt="Toys"
  width="64"
  height="64"
/>
```

**Never use the filename as alt text**: `alt="Toys.svg"` is wrong. Use `alt="Toys"`.

---

## Step 4 — Request Export When Asset Is Missing

If the asset doesn't exist locally and the Figma design marks it as exportable:

1. Note the exact name the designer used in Figma
2. Note the format (SVG preferred for illustrations, WebP/PNG for photos)
3. Ask the designer to export and provide the file
4. Place it in the correct folder:

```
public/illustrations/spot-illustration/  ← Character/scene illustrations
public/illustrations/mono-large/          ← Large category pictograms (64×64)
public/illustrations/mono-small/          ← Small category pictograms (32×32)
public/images/                            ← Product and lifestyle photos
public/icons/                             ← SVG icon files (if not in icon components)
```

---

## Step 5 — Never Generate Placeholder Images

```tsx
// ❌ WRONG — generates or fetches external images
<Media type="gen-image" query="associate waving illustration" />
<img src="https://picsum.photos/160/160" alt="placeholder" />
<img src="https://placehold.it/200x200" alt="placeholder" />

// ❌ WRONG — gray box placeholder
<div style={{ width: 160, height: 160, background: '#ccc' }} />

// ✅ CORRECT — use the existing local asset
<img
  src="/illustrations/spot-illustration/associate-waving.svg"
  alt="Associate waving hello"
  width="160"
  height="160"
/>
```

---

## Step 6 — Avoid CDN URLs for SVGs

```tsx
// ❌ WRONG — CDN URL re-encodes SVG as WebP, losing quality and theming
<img src="https://cdn.builder.io/api/v1/image/icon?format=webp&width=800" />

// ✅ CORRECT — always reference local file
<img src="/illustrations/spot-illustration/associate-waving.svg" alt="..." />
```

---

## Asset Location Reference

| Asset type | Folder | Size |
|---|---|---|
| Character/scene illustrations | `public/illustrations/spot-illustration/` | 120–200px typical |
| Large category pictograms | `public/illustrations/mono-large/` | 64×64px |
| Small category pictograms | `public/illustrations/mono-small/` | 32×32px |
| Product/lifestyle photos | `public/images/` | Varies |
| SVG icon files | `client/components/icons/` or `icons-custom/` | 20×20px viewBox |

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Generating a new illustration when a matching one exists | Check `public/illustrations/` first — always |
| Using CDN URL for SVG illustration | Copy to `public/illustrations/` and use local path |
| Using filename as alt text: `alt="Toys.svg"` | Write descriptive alt: `alt="Toys"` or `alt=""` for decorative |
| Omitting `alt` on an `<img>` tag | Every `<img>` MUST have `alt` attribute (even if empty) |
| Using a gray rectangle instead of a real asset | Either use an existing illustration or note it as a missing export |
| Renaming an asset without designer approval | Keep the exact name from Figma |
