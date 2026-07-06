This project is a self-contained design system built on Living Design 3.5 tokens.

## Prerequisites
- Node.js 18+
- pnpm (see `packageManager` in `package.json`)

## Install
```bash
pnpm install
```

## Run
```bash
pnpm dev
```

## Build
```bash
pnpm build
```

## Key Dependencies
**Core**: `react`, `react-dom`, `react-router-dom`, `typescript`, `vite`

**Design system**: `@radix-ui/react-*`, `class-variance-authority`, `clsx`, `tailwindcss`

**Feature libraries**: `date-fns`, `embla-carousel-react`, `react-day-picker`, `react-hook-form`, `recharts`, `vaul`

**Server**: `express`, `cors`, `dotenv`, `serverless-http`

## Project Structure
```
client/
  App.tsx              - Entry point with routing
  global.css           - Global styles + theme imports
  styles/themes/       - LD 3.5 token files
  components/ui/       - Design system components
  contexts/            - React contexts (Theme)
  locales/             - i18n translation files (en, es, fr)
  i18n.ts              - i18n initialization
public/
  fonts/               - Brand fonts
  animations/          - Lottie animation JSONs
server/
  index.ts             - Express server
```
