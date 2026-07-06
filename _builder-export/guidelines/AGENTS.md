# Fusion Starter

A production-ready full-stack React application template with integrated Express server, featuring React Router 6 SPA mode, TypeScript, Vitest, Zod and modern tooling.

While the starter comes with a express server, only create endpoint when strictly neccesary, for example to encapsulate logic that must leave in the server, such as private keys handling, or certain DB operations, db...

## Tech Stack

- **PNPM**: Prefer pnpm
- **Frontend**: React 18 + React Router 6 (spa) + TypeScript + Vite + TailwindCSS 3
- **Backend**: Express server integrated with Vite dev server
- **Testing**: Vitest
- **UI**: Radix UI + TailwindCSS 3 + Lucide React icons

## Project Structure

```
client/                   # React SPA frontend
├── pages/                # Route components (Index.tsx = home)
├── components/ui/        # Pre-built UI component library
├── App.tsx                # App entry point and with SPA routing setup
└── global.css            # TailwindCSS 3 theming and global styles

server/                   # Express API backend
├── index.ts              # Main server setup (express config + routes)
└── routes/               # API handlers

shared/                   # Types used by both client & server
└── api.ts                # Example of how to share api interfaces
```

## Key Features

## SPA Routing System

The routing system is powered by React Router 6:

- `client/pages/Index.tsx` represents the home page.
- Routes are defined in `client/App.tsx` using the `react-router-dom` import
- Route files are located in the `client/pages/` directory

For example, routes can be defined with:

```typescript
import { BrowserRouter, Routes, Route } from "react-router-dom";

<Routes>
  <Route path="/" element={<Index />} />
  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
  <Route path="*" element={<NotFound />} />
</Routes>;
```

### Styling System

- **Primary**: TailwindCSS 3 utility classes
- **Theme and design tokens**: Configure in `client/global.css` 
- **UI components**: Pre-built library in `client/components/ui/`
- **Utility**: `cn()` function combines `clsx` + `tailwind-merge` for conditional classes

```typescript
// cn utility usage
className={cn(
  "base-classes",
  { "conditional-class": condition },
  props.className  // User overrides
)}
```

### Express Server Integration

- **Development**: Single port (8080) for both frontend/backend
- **Hot reload**: Both client and server code
- **API endpoints**: Prefixed with `/api/`

#### Example API Routes
- `GET /api/ping` - Simple ping api
- `GET /api/demo` - Demo endpoint  

### Shared Types
Import consistent types in both client and server:
```typescript
import { DemoResponse } from '@shared/api';
```

Path aliases:
- `@shared/*` - Shared folder
- `@/*` - Client folder

## Development Commands

```bash
pnpm dev        # Start dev server (client + server)
pnpm build      # Production build
pnpm start      # Start production server
pnpm typecheck  # TypeScript validation
pnpm test          # Run Vitest tests
```

## Adding Features

### Add new colors to the theme

Open `client/global.css` and `tailwind.config.ts` and add new tailwind colors.

### New API Route
1. **Optional**: Create a shared interface in `shared/api.ts`:
```typescript
export interface MyRouteResponse {
  message: string;
  // Add other response properties here
}
```

2. Create a new route handler in `server/routes/my-route.ts`:
```typescript
import { RequestHandler } from "express";
import { MyRouteResponse } from "@shared/api"; // Optional: for type safety

export const handleMyRoute: RequestHandler = (req, res) => {
  const response: MyRouteResponse = {
    message: 'Hello from my endpoint!'
  };
  res.json(response);
};
```

3. Register the route in `server/index.ts`:
```typescript
import { handleMyRoute } from "./routes/my-route";

// Add to the createServer function:
app.get("/api/my-endpoint", handleMyRoute);
```

4. Use in React components with type safety:
```typescript
import { MyRouteResponse } from '@shared/api'; // Optional: for type safety

const response = await fetch('/api/my-endpoint');
const data: MyRouteResponse = await response.json();
```

### New Page Route
1. Create component in `client/pages/MyPage.tsx`
2. Add route in `client/App.tsx`:
```typescript
<Route path="/my-page" element={<MyPage />} />
```

## Production Deployment

- **Standard**: `pnpm build`
- **Binary**: Self-contained executables (Linux, macOS, Windows)
- **Cloud Deployment**: Use either Netlify or Vercel via their MCP integrations for easy deployment. Both providers work well with this starter template.

## Architecture Notes

- Single-port development with Vite + Express integration
- TypeScript throughout (client, server, shared)
- Full hot reload for rapid development
- Production-ready with multiple deployment options
- Comprehensive UI component library included
- Type-safe API communication via shared interfaces

---

## Living Design 3.5 — Design System Rules

### Layout Rules

- **Never use `max-width` constraints** on page content containers. All page content (headers, content areas) must fill the full available width within the sidebar + masthead shell.
- **Use `align-items: stretch`** instead of `align-items: center` on flex column containers that hold page content. Centering causes content to shrink instead of filling width.
- **Standard page shell pattern** — every page must use this identical structure:

```tsx
<div className={styles.root}>       {/* full viewport, flex column */}
  <MastHead />
  <div className={styles.appRow}>   {/* flex row: sidebar + main */}
    <AppSidebar menuItems={...} />
    <main className={styles.main}>  {/* flex: 1, overflow-y: auto */}
      {/* page content here */}
    </main>
  </div>
</div>
```

- Content areas should use `flex: 1` to expand and fill available height.

### Token Rules (CRITICAL)

- **Never use hardcoded hex colors.** Always use `var(--ld-semantic-color-*)` tokens with hex fallbacks:

```css
/* ✅ CORRECT */
color: var(--ld-semantic-color-text, #2E2F32);
background: var(--ld-semantic-color-background-subtle, #f8f8f8);

/* ❌ WRONG */
color: #2E2F32;
background: #F8F8F8;
```

- **Background surfaces**:
  - Page background: `--ld-semantic-color-background-subtle`
  - Cards/panels: `--ld-semantic-color-surface`
  - Hover states: `--ld-semantic-color-surface-hovered`
  - Overlays/dropdowns: `--ld-semantic-color-surface-overlay`

- **Text hierarchy**:
  - Primary: `--ld-semantic-color-text`
  - Secondary: `--ld-semantic-color-text-subtle`
  - Tertiary: `--ld-semantic-color-text-subtlest`
  - Brand: `--ld-semantic-color-text-brand`

- **Sentiment colors** — apply to BOTH text AND icons:
  - Negative/error: `--ld-semantic-color-text-negative` (never hardcode red)
  - Positive/success: `--ld-semantic-color-text-positive` (never hardcode green)

- **Ratings**: Use `--ld-semantic-color-rating-fill` and `--ld-semantic-color-rating-border`, never hardcode `#FFC220`.

- **Borders/separators**: `--ld-semantic-color-separator` for dividers, `--ld-semantic-color-border-strong` for input borders.

### Component Rules

- **Always use existing LD components** before creating custom elements. Search `client/components/ui/` first.
- **Import paths** — uppercase for LD 3.5 components, lowercase for Shadcn/Radix:

```tsx
// ✅ LD 3.5 components (uppercase)
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { Tag } from '@/components/ui/tag';
import { Rating } from '@/components/ui/Rating';

// ✅ Shadcn/Radix components (lowercase)
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
```

- **Rating stars**: Use `<Rating value={4.4} size="small" />`, never manually render star SVGs.
- **Buttons**: Always use `<Button variant="primary|secondary|tertiary|destructive" size="small|medium|large">`. Never create `<button>` elements with inline styles.
- **Tags**: Use `<Tag variant="..." color="...">`, never `<span>` with custom badge styles.
- **Button groups**: Use `<ButtonGroup>`, never manual flex containers for buttons.

### Styling Rules

- **Always use CSS Modules** (`.module.css`), never inline `style={{}}` for layout or colors.
- Inline styles are only acceptable for truly dynamic values (e.g., calculated widths).
- **Standard spacing**: Use 8px multiples (8, 16, 24, 32, 48px). Use `var(--ld-semantic-spacing-*)` or `var(--ld-primitive-scale-space-*)` tokens when available.
- **Responsive breakpoints** (standard across all pages):
  - `1024px` — tablet
  - `768px` — small tablet
  - `480px` — phone
  - Padding reduces: `24px → 16px → 12px` across breakpoints
- **Font family**: Always `var(--ld-semantic-font-family-sans)` or specific semantic font tokens like `var(--ld-semantic-font-heading-large-family)`. Never let text fall back to browser serif defaults.
- **Border radius**: Use `var(--ld-primitive-scale-borderradius-100, 8px)` for cards, `9999px` for pills/circles.
- **Box shadows** for elevated cards: `0 -1px 2px 0 rgba(0,0,0,0.10), 0 1px 2px 1px rgba(0,0,0,0.15)`.

### Figma Import Rules

- **Convert absolute positioning** from Figma to flexbox/grid layouts. Never use `position: absolute` for page layout.
- **Map Figma token names** directly to CSS custom properties: Figma `ld-semantic-color-text` → CSS `var(--ld-semantic-color-text)`.
- Figma inline `style=""` attributes represent design intent, not code format — always convert to CSS module classes.
- **Preserve SVGs exactly** as designed unless an identical icon already exists in `@/components/icons`.
- **Circular images/flags**: Use SVG with `<clipPath>` circles, not `border-radius` on `<img>`.
- When Figma shows multiple frames/breakpoints, implement one responsive component that handles all breakpoints via CSS media queries, not separate components.

### File Organization

- Break complex pages into smaller component files under `client/features/[feature]/`.
- Each page gets its own CSS module in `client/styles/`.
- UI primitives go in `client/components/ui/` with their own `.module.css`.
- Check `guidelines/` folder for component documentation before creating new components.

### Common Mistakes to Avoid

```tsx
// ❌ WRONG — hardcoded colors
<div style={{ backgroundColor: '#F8F8F8', color: '#2E2F32' }}>

// ❌ WRONG — max-width constraining page content
.contentContainer { max-width: 1280px; margin: 0 auto; }

// ❌ WRONG — centering page content instead of stretching
.contentArea { align-items: center; }

// ❌ WRONG — custom button with inline styles
<button className="bg-blue-500 px-4 py-2 rounded-full">Click</button>

// ❌ WRONG — manual star rendering
<StarFill style={{ color: '#FFC220' }} />

// ✅ CORRECT — tokens in CSS modules
.container { background: var(--ld-semantic-color-background-subtle, #f8f8f8); }

// ✅ CORRECT — full-width content
.contentArea { align-items: stretch; }

// ✅ CORRECT — use LD Button component
<Button variant="primary" size="medium">Click</Button>

// ✅ CORRECT — use LD Rating component
<Rating value={4.4} size="small" />
```
