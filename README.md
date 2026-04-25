# Portfolio

A clean, data-driven portfolio built with Next.js static export.

The implementation keeps content in JSON and media in `public/`, while the UI is intentionally small:

- `app/page.tsx` renders the full portfolio.
- `app/globals.css` contains the visual system and responsive layout.
- `data/profile.json`, `data/projects.json`, and `data/experience.json` drive the page.
- `public/` contains the resume, images, manifest, sitemap, and video assets.

## Development

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
```

The local dev server runs at `http://localhost:5174`.

## Deployment

The app is configured for static export and GitHub Pages via `next.config.mjs`.
