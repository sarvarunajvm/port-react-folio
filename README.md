# Portfolio

A modern, magazine-style portfolio built with Next.js, featuring smooth animations and multiple color themes.

**Live:** https://sarvarunajvm.github.io/port-react-folio/

## Features

- 🎨 4 color themes (Cyberpunk, Matrix, Synthwave, Tokyo Night)
- ✨ Smooth scroll with Lenis
- 🎬 Framer Motion animations
- 🖱️ Custom animated cursor
- 📱 Responsive design
- ♿ Accessible (respects reduced motion preferences)

## Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5174)
npm run dev

# Build for production
npm run build

# Preview static build (http://localhost:5175)
npm run preview
```

## Deployment

Automated via GitHub Actions on push to `main`. Deploys to GitHub Pages.

**Manual deployment:** Upload the `out/` folder to any static hosting.

## Customization

- **Profile data:** `data/profile.json`
- **Experience:** `data/experience.json`
- **Projects:** `data/projects.json`
- **Skills:** `data/skills.json`
- **Themes:** `app/globals.css` (CSS variables)

## Tech Stack

- Next.js 15 (Static Export)
- React 19
- Tailwind CSS 4
- Framer Motion
- Lenis (Smooth Scroll)
- GSAP

## Author

**Saravanan Kalimuthu**
- [GitHub](https://github.com/sarvarunajvm)
- [LinkedIn](https://linkedin.com/in/saravanan-kalimuthu-01a0a9113)
- sarvaruna@outlook.com
