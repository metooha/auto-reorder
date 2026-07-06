# Auto Reorder

Walmart Auto Reorder prototype built on Living Design 3.5.

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:8080](http://localhost:8080) (Vite picks the next free port if 8080 is busy).

## Build

```bash
pnpm build
```

## GitHub Pages preview

The site deploys automatically on push to `main` via GitHub Actions.

- **Preview URL:** `https://<your-github-username>.github.io/auto-reorder/`
- **Main route:** `/walmart` (home redirects there in production)

To test the Pages build locally:

```bash
pnpm run build:pages
pnpm dlx serve dist/spa -l 4173
```

Then open `http://localhost:4173/auto-reorder/`.
