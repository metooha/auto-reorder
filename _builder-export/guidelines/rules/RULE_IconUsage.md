# RULE: Icon Usage and Management

**CRITICAL RULE - ALWAYS ENFORCE**

## When This Rule Applies

This rule **MUST** be enforced when:

1. ✅ User imports designs from Builder.io Figma plugin
2. ✅ User requests to add icons to the project
3. ✅ User asks to create new UI elements that need icons
4. ✅ AI generates new designs or components with icons
5. ✅ Any icon-related changes are being made

---

## Mandatory Requirements

### 1. **ALWAYS Search for Existing Icons First**

Before creating or importing ANY new icon, you **MUST**:

1. **Search the icon library** at `client/components/icons/`
2. **Check the Component Library** at `/component-library#icons`
3. **Review all 303 available icons** organized in categories
4. **Find similar or equivalent icons** that can be repurposed

```tsx
// ✅ CORRECT - Search first
// 1. Check if icon exists: client/components/icons/Search.tsx
// 2. Found! Use existing icon
import { Search } from '@/components/icons';
<Search style={{ color: 'var(--ld-semantic-color-text-brand)' }} />

// ❌ WRONG - Creating new icon without checking
// DON'T create SearchIcon.tsx if Search.tsx already exists!
```

### 2. **NEVER Create Duplicate Icons**

**DO NOT** create new icons if similar ones exist:

```tsx
// ❌ FORBIDDEN - Duplicates
// If these exist, DON'T create:
// - SearchIcon.tsx (Search.tsx exists)
// - UserIcon.tsx (User.tsx exists)
// - SettingsIcon.tsx (Settings.tsx exists)
// - TrashIcon.tsx (Trash.tsx exists)

// ✅ REQUIRED - Use existing
import { Search, User, Settings, Trash } from '@/components/icons';
```

### 3. **Icon Library Inventory** (303 Icons Available)

Before creating a new icon, verify it's not already available in these categories:

#### Navigation & Arrows (16 icons)
- ArrowUp, ArrowDown, ArrowLeft, ArrowRight
- ArrowUpDown, ArrowUpLeft, ArrowUpRight
- ArrowsLeftRight, ArrowsUpDown, ArrowsLeftRightCurve
- ChevronUp, ChevronDown, ChevronLeft, ChevronRight
- CaretDown, ArrowCircleDot

#### Actions & Controls (25+ icons)
- Check, X, Plus, Minus
- Edit, Pencil, Trash
- Download, Upload, Refresh, RotateCcw, Undo
- Search, Filter, Settings, Gear, Sliders
- More, MoreHorizontal, MoreVertical, Menu
- Drag, GripVertical

#### Communication (13 icons)
- Email, EmailFill, Chat, ChatBubbleSquare
- Phone, Bell, Share, ShareAndroid
- Microphone, MicrophoneSlash, Speaker, SpeakerSlash
- VoiceSearch

#### Media & Files (18 icons)
- Image, ImageIcon, Camera, Play, PlayFill, Pause
- VideoArrowUp, VideoArrowUpFill
- Article, Note, DocumentCorner, DocumentExclamation
- BoxDocument, BoxDocumentFill, Clipboard
- PaperClip, Printer, ScanDocument

#### User & Account (12 icons)
- User, UserCircle, UserCircleFill, UserPlus
- UserBook, UserGraph, UsersArrows, UsersFill
- IdCard, CardUser, SignIn, SignOut

#### Commerce & Shopping (21+ icons)
- Cart, CartFill, CartArrow, Tag, TagFill
- Dollar, DollarCircle, DollarCircleFill
- Receipt, ReceiptPercent, ReceiptPercentFill
- CreditCard, CreditCardFill, Wallet
- Gift, GiftFill, Coupon, Barcode, QrCode
- UpcLabel, UpcLabelCancel

#### Location & Maps (10 icons)
- Location, CurrentLocation, Map, MapRoute, MapRouteFill
- Pin, PinFill, PinLine, Globe, Facility

#### Store & Retail (11 icons)
- Store, StoreFill, StoreAwning, StoreAwningFill
- StoreClock, StoreLocation, StoreMap
- Associate, Services, ServicesFill, Returns, Restroom

#### Charts & Data (11 icons)
- BarGraph, BarGraphFill, BarGraphThin
- LineGraph, LineGraphBars, LineGraphXY
- PieChart, DonutChart, BubbleChart, BubbleChartFill
- ScatterChart, ChartWaterfall, Reports

#### Status & Indicators (25+ icons)
- CheckCircle, CheckCircleFill, InfoCircle, InfoCircleFill
- ExclamationCircle, ExclamationCircleFill, CloseCircleFill
- QuestionCircle, HelpCircle, Warning, WarningFill, Ban
- Flag, FlagFill, FlagStrike
- Star, StarFill, StarHalf
- ThumbUp, ThumbUpFill, ThumbDown, ThumbDownFill
- Heart, HeartFill, Spark

#### Logistics & Shipping (18+ icons)
- Box, BoxArrowUp, BoxArrowDown, BoxCorners
- BoxOpenArrowDown, BoxShelves, BoxSpark, BoxSparkFill
- Truck, Trailer, TrailerArrowRight, TrailerDoor
- Forklift, PalletBoxes, ThreeDBoxArrows
- FedExBox, DockDoor, Bulkhead

#### Products (10 icons)
- CleaningSpray, DishSoap, LaundryDetergent
- PaperTowels, Sponge, BottleEach, BowlWhisk
- FruitCarton, FruitEach, Shirt

...and 100+ more icons across Technology, Security, Tools, Business, and other categories.

**Total: 303 icons available**

---

## Icon Search Workflow

### BEFORE Creating or Importing an Icon:

**Step 1: Search by Name**
```bash
# Example: Looking for a "home" icon
# Check: Home, SGHome, HouseMoney
```

**Step 2: Search by Function**
```bash
# Example: Need a "settings" icon
# Available: Settings, Gear, GearFill, Sliders
```

**Step 3: Search by Category**
```bash
# Example: Need a chart icon
# Available: BarGraph, LineGraph, PieChart, DonutChart, BubbleChart, etc.
```

**Step 4: Check Component Library**
- Visit `/component-library#icons`
- Browse all 303 icons organized by category
- Use search/filter to find similar icons

**Step 5: Only if NO match found**
- Proceed to create new icon in `client/components/icons-custom/` folder

---

## Creating New Icons (Last Resort Only)

If you **absolutely must** create a new icon (after exhausting all search options):

### Location
Create new icons in: **`client/components/icons-custom/`**

**DO NOT** add new icons to `client/components/icons/` - that folder is reserved for the core LD 3.5 icon library.

### Template

```tsx
// client/components/icons-custom/MyNewIcon.tsx
import { SVGProps } from 'react';

export const MyNewIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 20 20" 
    fill="none"
    {...props}
  >
    {/* Your icon paths here */}
    <path 
      d="M..." 
      stroke="currentColor" 
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
```

### Icon Specifications (LD 3.5 Standard)

All new icons **MUST** follow these specifications:

- ✅ **Size**: 20x20 viewBox (standard), 32x32 for larger icons
- ✅ **Stroke width**: 1.5px (LD 3.5 specification)
- ✅ **Color**: Use `currentColor` for fills and strokes
- ✅ **Style**: `strokeLinecap="round"` and `strokeLinejoin="round"`
- ✅ **Props**: Accept `SVGProps<SVGSVGElement>`
- ✅ **Export**: Named export (e.g., `export const MyIcon`)

### Export New Icons

Add to `client/components/icons-custom/index.tsx`:

```tsx
export { MyNewIcon } from './MyNewIcon';
```

Import from custom folder:

```tsx
import { MyNewIcon } from '@/components/icons-custom';
```

---

## Builder.io Plugin Integration

### When Processing Designs from Builder.io:

**Step 1: Icon Detection**
When Builder.io imports a design with icons, analyze the icon first:

1. **Identify the icon** (search, settings, user, etc.)
2. **Search existing library** for exact or similar match
3. **Map to existing icon** if available
4. **Only create new icon** if absolutely no match exists

**Step 2: Icon Mapping**

```tsx
// ✅ CORRECT - Map Figma icons to existing library
// Figma design has "search icon"
// → Use: import { Search } from '@/components/icons';

// Figma design has "user profile icon"  
// → Use: import { User, UserCircle } from '@/components/icons';

// Figma design has "shopping cart icon"
// → Use: import { Cart, CartFill } from '@/components/icons';
```

**Step 3: Validation**

Before finalizing imported design:
- [ ] All icons mapped to existing library
- [ ] No duplicate icon components created
- [ ] No inline SVG elements in code
- [ ] All imports from `@/components/icons`
- [ ] New icons (if any) in `@/components/icons-custom/`

---

## Common Icon Equivalents

When searching for icons, use these common mappings:

| Need | Use This | Don't Create |
|------|----------|--------------|
| Search | `Search` | ❌ SearchIcon |
| Settings | `Settings`, `Gear` | ❌ SettingsIcon, Cog |
| User/Profile | `User`, `UserCircle` | ❌ Profile, Avatar |
| Close/Delete | `X`, `Trash` | ❌ Delete, Remove |
| Home | `Home`, `SGHome` | ❌ House, HomeIcon |
| Cart | `Cart`, `CartFill` | ❌ ShoppingCart |
| Edit | `Edit`, `Pencil` | ❌ EditIcon, Modify |
| Download | `Download` | ❌ DownloadIcon, ArrowDown |
| Upload | `Upload` | ❌ UploadIcon, ArrowUp |
| Calendar | `Calendar` | ❌ CalendarIcon, Date |
| Mail | `Email`, `EmailFill` | ❌ Mail, Envelope |
| Phone | `Phone` | ❌ Call, Telephone |
| Location | `Location`, `Pin`, `Map` | ❌ MapPin, Marker |
| Store | `Store`, `StoreFill` | ❌ Shop, StoreIcon |
| Info | `InfoCircle`, `HelpCircle` | ❌ Information |
| Warning | `Warning`, `ExclamationCircle` | ❌ Alert, Caution |
| Success | `CheckCircle`, `CheckCircleFill` | ❌ Success, Tick |
| Error | `CloseCircleFill`, `Ban` | ❌ Error, Failed |
| Like/Favorite | `Heart`, `ThumbUp`, `Star` | ❌ Favorite, Like |
| Share | `Share`, `ShareAndroid` | ❌ ShareIcon |
| More Options | `More`, `MoreHorizontal`, `MoreVertical` | ❌ Menu, Options |
| Filter | `Filter`, `Sliders` | ❌ FilterIcon |
| Sort | `SortUp`, `SortDown`, `SortingArrows` | ❌ Sort |
| Chevrons | `ChevronUp/Down/Left/Right` | ❌ Arrow |
| Arrows | `ArrowUp/Down/Left/Right` | ❌ Direction |

---

## Folder Structure

```
client/components/icons/
├── index.tsx           # 306 core LD 3.5 icons (✅ USE THESE)
├── Search.tsx
├── Settings.tsx
├── User.tsx
└── ... (303 more core icons)

client/components/icons-custom/  # New custom icons ONLY
├── index.tsx           # Custom icon exports
└── MyCustomIcon.tsx    # Only if NO equivalent exists
```

---

## Detection and Prevention

### Automated Checks

Before allowing new icon creation, run these checks:

```bash
# Check if icon already exists
find client/components/icons -name "*Icon*.tsx" -o -name "*Search*.tsx"

# Search for similar icon names
grep -r "export.*Icon" client/components/icons/index.tsx
```

### Code Review Checklist

- [ ] Did you search all 306 existing icons?
- [ ] Did you check the Component Library at `/component-library#icons`?
- [ ] Did you search by function (not just exact name)?
- [ ] Is there a similar icon that can be repurposed?
- [ ] If creating new icon, is it in `icons-custom/` folder?
- [ ] Does the new icon follow LD 3.5 specifications?

---

## Enforcement

### Error Messages

If duplicate icon detected:

```
❌ Duplicate Icon Detected

You attempted to create: SearchIcon.tsx
Existing icon found: Search.tsx (client/components/icons/)

ACTION REQUIRED:
1. Use existing icon: import { Search } from '@/components/icons';
2. Delete duplicate: SearchIcon.tsx

See guidelines/RULE_IconUsage.md for icon library reference.
```

If new icon created in wrong folder:

```
❌ Incorrect Icon Location

You created: client/components/icons/MyNewIcon.tsx
New icons must go in: client/components/icons-custom/

ACTION REQUIRED:
1. Move icon to: client/components/icons-custom/MyNewIcon.tsx
2. Export from: client/components/icons-custom/index.tsx
3. Import from: '@/components/icons-custom'

See guidelines/RULE_IconUsage.md for folder structure.
```

---

## Builder.io Plugin Workflow

When processing designs from Builder.io plugin:

### Step 1: Analyze Icon Requirements
```
Figma design includes:
- Search icon
- User profile icon
- Shopping cart icon
- Settings icon
```

### Step 2: Map to Existing Icons
```tsx
// ✅ CORRECT - Map ALL to existing library
import { 
  Search,      // ← Figma "search icon"
  User,        // ← Figma "user profile icon"  
  Cart,        // ← Figma "shopping cart icon"
  Settings     // ← Figma "settings icon"
} from '@/components/icons';
```

### Step 3: Verify No New Icons Created
```
✅ All icons mapped to existing library
✅ No new icon files created
✅ No inline SVG elements in generated code
✅ All imports from @/components/icons
```

### Step 4: Handle Missing Icons (Rare)

If icon truly doesn't exist (after thorough search):

```tsx
// 1. Create in custom folder
// client/components/icons-custom/SpecialFeatureIcon.tsx

import { SVGProps } from 'react';

export const SpecialFeatureIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 20 20" 
    fill="none"
    {...props}
  >
    <path 
      d="M..." 
      stroke="currentColor" 
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 2. Export from custom index
// client/components/icons-custom/index.tsx
export { SpecialFeatureIcon } from './SpecialFeatureIcon';

// 3. Import from custom folder
import { SpecialFeatureIcon } from '@/components/icons-custom';
```

---

## Quick Reference: Find Icons Fast

### By Visual Appearance

- **Magnifying glass** → `Search`
- **Gear** → `Settings`, `Gear`, `GearFill`
- **Person** → `User`, `UserCircle`, `UserCircleFill`
- **Shopping bag** → `Cart`, `CartFill`, `CartArrow`
- **Trash can** → `Trash`
- **Pencil** → `Edit`, `Pencil`
- **Three dots** → `More`, `MoreHorizontal`, `MoreVertical`
- **Bell** → `Bell`
- **Envelope** → `Email`, `EmailFill`
- **Checkmark** → `Check`, `CheckCircle`, `CheckCircleFill`
- **X mark** → `X`, `Close`, `CloseCircleFill`
- **Question mark** → `QuestionCircle`, `HelpCircle`
- **Exclamation** → `ExclamationCircle`, `Warning`
- **Info symbol** → `InfoCircle`, `InfoCircleFill`
- **Arrow pointing up** → `ArrowUp`, `ChevronUp`, `Upload`
- **Arrow pointing down** → `ArrowDown`, `ChevronDown`, `Download`
- **Left arrow** → `ArrowLeft`, `ChevronLeft`
- **Right arrow** → `ArrowRight`, `ChevronRight`

### By Function

- **Navigation** → Arrows, Chevrons
- **Forms** → Check, X, Calendar, Clock
- **Actions** → Edit, Trash, Download, Upload
- **Status** → CheckCircle, Warning, InfoCircle
- **Social** → Heart, Star, ThumbUp, Share
- **E-commerce** → Cart, Tag, Dollar, Receipt
- **Communication** → Email, Phone, Chat, Bell
- **Media** → Image, Camera, Play, Video

---

## Statistics

- **Total icons available**: 306
- **Icon categories**: 15+
- **Storage location**: `client/components/icons/`
- **Custom icons location**: `client/components/icons-custom/` (create if needed)
- **Showcase page**: `/component-library#icons`

---

## Summary

**Golden Rules:**
1. 🔍 **Search FIRST**, create LAST
2. 📚 Use existing 303 icons whenever possible
3. 🚫 NEVER create duplicates
4. 📁 New icons ONLY in `icons-custom/` folder
5. ✅ Follow LD 3.5 specifications for all new icons
6. 🎨 Always use `currentColor` for semantic theming
7. 📖 Check Component Library before creating

**Enforcement Level**: CRITICAL - NO EXCEPTIONS

Any code that creates duplicate icons or adds to the core `icons/` folder MUST be rejected.
