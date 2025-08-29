# Portfolio – Next.js (GitHub Pages)

Deployed at: https://sarvarunajvm.github.io/port-react-folio/

## Local dev
- Install: `npm i`
- Dev server: `npm run dev` (http://localhost:5174)

## Build and preview static export
- Build: `npm run build` (outputs to `out/`)
- Preview export: `npm run preview` (serves `out/` on http://localhost:5175)

## Deploy to GitHub Pages
- Workflow: `.github/workflows/deploy.yml`
- Trigger: push to `main` or manual dispatch
- Output path uploaded: `out/`
- Repo Settings → Pages → Build and deployment → Source: “GitHub Actions”

## Config
- `next.config.mjs`: `output: 'export'`, `basePath` and `assetPrefix` `/port-react-folio/`, `trailingSlash: true`
- `public/robots.txt` and `public/sitemap.xml` point to your Pages URL

## Highlights
- Aceternity-inspired UI touches (spotlight, border beam, shimmer)
- Automations hub, projects with impact metrics, sticky CTA, command palette

  - Screen reader friendly
  - Reduced motion support

## 📁 Project Structure

```
port-react-folio/
├── src/
│   ├── app/                     # Application setup
│   │   ├── App.tsx              # Root component
│   │   └── providers/           # Context providers
│   ├── config/
│   │   └── portfolio.config.ts  # Global configuration
│   ├── data/
│   │   └── portfolio.data.ts    # All portfolio content (single source of truth)
│   ├── features/                # Feature modules
│   │   ├── about/               # About section
│   │   ├── experience/          # Experience timeline
│   │   ├── hero/                # Hero section with typewriter
│   │   ├── projects/            # Projects showcase
│   │   └── skills/              # Skills categories
│   ├── pages/
│   │   └── Home.tsx             # Main page with Bento grid
│   ├── shared/                  # Shared resources
│   │   ├── components/
│   │   │   ├── loaders/         # Coffee-themed loader
│   │   │   ├── theme/           # Theme toggle components
│   │   │   └── ui/              # Reusable UI components
│   │   ├── contexts/            # React contexts
│   │   ├── hooks/               # Custom hooks
│   │   ├── hoc/                 # Higher-order components
│   │   ├── types/               # TypeScript definitions
│   │   └── utils/               # Utility functions
│   └── styles/
│       └── globals.css          # CSS variables & Neomorphic styles
├── public/
│   ├── photo.png                # Profile photo
│   ├── Resume.pdf               # Downloadable CV
│   ├── robots.txt               # SEO configuration
│   └── sitemap.xml              # Site structure
└── dist/                        # Production build output
```

## 🎨 Customization

### Update Content

All portfolio content is centralized in a single file for easy updates:

**`src/data/portfolio.data.ts`** - Contains:
- Personal information (name, titles, contact)
- Experience data (companies, achievements, metrics)
- Projects (descriptions, tech stack, links)
- Skills (categorized by domain with proficiency levels)
- Education details
- UI content and labels
- Statistics and counters

### Configuration

**`src/config/portfolio.config.ts`** - Controls:
- Layout settings (clock, avatar, animations)
- Section configurations
- Resume path and download settings
- Status indicators

### Theme Customization

Modify CSS variables in `src/styles/globals.css`:

```css
/* Light Theme Colors */
--bg: #f2f3f5;           /* Background */
--surface: #f7f8fa;      /* Card surfaces */
--fg: #1a1a1a;           /* Text color */
--muted: #4a4a4a;        /* Secondary text */
--accent: #9333ea;       /* Purple accent */

/* Dark Theme Colors */
--bg: #0e0f11;           /* Background */
--surface: #121316;      /* Card surfaces */
--fg: #f0f0f0;           /* Text color */
--muted: #a0a0a0;        /* Secondary text */
--accent: #10b981;       /* Emerald accent */
```

### Hover Effects

- **Light Mode**: Soft purple shadows with rgba(147, 51, 234, 0.3)
- **Dark Mode**: Soft emerald shadows with rgba(16, 185, 129, 0.3)
- **Transition**: 300ms cubic-bezier easing for smooth interactions

## 🌐 Deployment

### GitHub Pages

The project is configured for automatic deployment to GitHub Pages:

1. Push changes to the `main` branch
2. GitHub Actions will automatically build and deploy
3. View at: `https://[username].github.io/port-react-folio/`

### Manual Deployment

```bash
# Build for production
npm run build

# The dist folder is ready for deployment
# Upload to any static hosting service:
# - Vercel
# - Netlify
# - AWS S3
# - Firebase Hosting
```

### Environment Variables

Create a `.env` file for custom configuration:

```env
BASE_URL=/port-react-folio/  # For GitHub Pages
VITE_APP_TITLE=Portfolio      # Browser title
```

## 📊 Performance Metrics

### Lighthouse Scores
- **Performance**: 95+
- **Accessibility**: 98+
- **Best Practices**: 100
- **SEO**: 100

### Bundle Analysis
- **Initial Bundle**: ~380KB (110KB gzipped)
- **Code Splitting**: Lazy loading for modal content
- **First Contentful Paint**: < 1.2s
- **Time to Interactive**: < 2.0s
- **Cumulative Layout Shift**: < 0.1

### Optimization Features
- Automatic code splitting by feature
- Gzip + Brotli compression
- Image optimization
- Tree shaking for unused code
- CSS purging for minimal styles

## 🔧 Browser Support

### Desktop
- Chrome/Edge 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Opera 76+ ✅

### Mobile
- iOS Safari 14+ ✅
- Chrome Mobile ✅
- Samsung Internet ✅

### Features
- CSS Grid & Flexbox
- ES2020 JavaScript
- Web Animations API
- Intersection Observer

## 🧪 Testing

```bash
# Run type checking
npm run build  # TypeScript compilation

# Lint code
npm run lint

# Format check
npm run format:check
```

## 📝 License

MIT License - feel free to use this project as inspiration or template for your own portfolio.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using conventional commits (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Testing updates
- `chore:` Maintenance tasks

## 👨‍💻 Author

**Saravanan Kalimuthu**
- **Email**: sarvaruna@outlook.com
- **GitHub**: [@sarvarunajvm](https://github.com/sarvarunajvm)
- **LinkedIn**: [Saravanan Kalimuthu](https://www.linkedin.com/in/saravanan-kalimuthu-01a0a9113)
- **Stack Overflow**: [Profile](https://stackoverflow.com/users/12595188/saravanan-kalimuthu)
- **Dev.to**: [@sarvarunajvm](https://dev.to/sarvarunajvm)

## 🙏 Acknowledgments

- [HeroUI](https://heroui.com) for the beautiful component library
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Tailwind CSS](https://tailwindcss.com) for utility-first styling
- [Vite](https://vitejs.dev) for lightning-fast development

---


<>><>><><><><>
Core Design Philosophy

  - Fixed Viewport: Full-screen, no-scroll design optimized for all
  devices
  - Bento Grid Layout: Dynamic responsive grid system adapting from
  mobile to desktop
  - Neomorphic Soft UI: 3D surfaces with realistic depth and
  interactive elements
  - Modal Navigation: Click-to-explore sections with smooth
  transitions

  Layout Foundation & Bento Grid System

  /* Fixed Viewport Container */
  .bento-container: h-screen overflow-hidden relative
  .bento-grid: grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4
  h-full p-4

  /* Responsive Bento Cards */
  .bento-card: col-span-1 md:col-span-2 lg:col-span-4 row-span-1
  md:row-span-2

  /* Grid Variations */
  .bento-featured: md:col-span-3 lg:col-span-6 md:row-span-3
  .bento-tall: row-span-2 md:row-span-4
  .bento-wide: md:col-span-4 lg:col-span-8

  Neomorphic Design System

  /* Base Neomorphic Surface */
  .neomorphic-base:
    bg-gray-50 dark:bg-gray-900
    border border-gray-200/50 dark:border-gray-700/50
    shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff]
    dark:shadow-[8px_8px_16px_#1f2937,-8px_-8px_16px_#374151]

  /* Raised Neomorphic Cards */
  .neomorphic-raised:
    shadow-[12px_12px_24px_#d1d5db,-12px_-12px_24px_#ffffff]
    dark:shadow-[12px_12px_24px_#1f2937,-12px_-12px_24px_#374151]
    transform translate-y-0 hover:translate-y-[-2px]

  /* Inset Neomorphic Elements */
  .neomorphic-inset:
    shadow-[inset_8px_8px_16px_#d1d5db,inset_-8px_-8px_16px_#ffffff]
    dark:shadow-[inset_8px_8px_16px_#1f2937,inset_-8px_-8px_16px_#3741
  51]

  Theme System & Accent Colors

  /* Pastel Copper (Light Mode) */
  .accent-copper:
    bg-gradient-to-br from-orange-200 to-orange-300
    border-orange-300/50
    text-orange-800
    shadow-[8px_8px_16px_#fed7aa,-8px_-8px_16px_#fef3e2]

  /* Pastel Silver (Dark Mode) */
  .accent-silver:
    bg-gradient-to-br from-slate-600 to-slate-700
    border-slate-500/50
    text-slate-200
    shadow-[8px_8px_16px_#475569,-8px_-8px_16px_#64748b]

  /* Theme Toggle Support */
  .theme-aware:
    transition-colors duration-300 ease-in-out
    bg-gray-50 dark:bg-gray-900
    text-gray-900 dark:text-gray-100

  Interactive Card System

  /* Base Interactive Card */
  .interactive-card:
    cursor-pointer transition-all duration-300 ease-out
    hover:shadow-[16px_16px_32px_#d1d5db,-16px_-16px_32px_#ffffff]

  dark:hover:shadow-[16px_16px_32px_#1f2937,-16px_-16px_32px_#374151]
    hover:scale-[1.02] active:scale-[0.98]

  /* Dynamic Color Accents */
  .card-hover-copper:
    hover:border-orange-300 hover:bg-gradient-to-br
  hover:from-orange-50 hover:to-orange-100
    dark:hover:border-slate-500 dark:hover:from-slate-800
  dark:hover:to-slate-700

  /* Modal Trigger Cards */
  .modal-trigger:
    relative overflow-hidden
    before:absolute before:inset-0 before:bg-gradient-to-r
    before:from-transparent before:via-white/10 before:to-transparent
    before:translate-x-[-100%] hover:before:translate-x-[100%]
    before:transition-transform before:duration-700

  Modal Navigation System

  /* Modal Overlay */
  .modal-overlay:
    fixed inset-0 bg-black/50 backdrop-blur-sm z-50
    opacity-0 invisible transition-all duration-300
    .modal-open: opacity-100 visible

  /* Modal Container */
  .modal-container:
    fixed inset-4 md:inset-8 lg:inset-16 z-50
    bg-gray-50 dark:bg-gray-900 rounded-2xl
    shadow-[24px_24px_48px_#d1d5db,-24px_-24px_48px_#ffffff]
    dark:shadow-[24px_24px_48px_#1f2937,-24px_-24px_48px_#374151]
    transform scale-95 opacity-0 transition-all duration-300
    .modal-open: scale-100 opacity-100

  /* Modal Content */
  .modal-content:
    h-full overflow-y-auto p-6 md:p-8
    scrollbar-thin scrollbar-thumb-gray-300
  dark:scrollbar-thumb-gray-600

  Responsive Breakpoint Strategy

  /* Mobile: Compact Bento Grid */
  .mobile-bento: grid-cols-2 gap-2 p-2
  .mobile-card: aspect-square col-span-1

  /* Tablet: Balanced Layout */
  .tablet-bento: md:grid-cols-4 md:gap-4 md:p-4
  .tablet-card: md:col-span-2 md:aspect-[4/3]

  /* Desktop: Full Bento Experience */
  .desktop-bento: lg:grid-cols-8 lg:gap-6 lg:p-6
  .desktop-card: lg:col-span-2 lg:aspect-[3/4]

  Animation & Motion System

  /* Smooth Entry Animations */
  .animate-fade-in: animate-[fadeIn_0.5s_ease-out]
  .animate-slide-up: animate-[slideUp_0.6s_ease-out]
  .animate-scale-in: animate-[scaleIn_0.4s_ease-out]

  /* Hover Micro-Interactions */
  .hover-lift:
    transition-transform duration-200 ease-out
    hover:translate-y-[-4px] hover:rotate-1

  /* Reduced Motion Support */
  @media (prefers-reduced-motion: reduce) {
    .motion-safe: transition-none animation-none transform-none
  }

  3D Depth & Layering

  /* Surface Elevation Layers */
  .surface-base: shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]
  .surface-raised:
  shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff]
  .surface-floating:
  shadow-[16px_16px_32px_#d1d5db,-16px_-16px_32px_#ffffff]

  /* Z-Index Hierarchy */
  .z-surface: z-10
  .z-elevated: z-20
  .z-floating: z-30
  .z-modal: z-50

  Component Integration Patterns

  /* Navigation Cards */
  .nav-card:
    neomorphic-raised interactive-card modal-trigger
    col-span-1 md:col-span-2 lg:col-span-3
    flex items-center justify-center p-6
    accent-copper dark:accent-silver

  /* Content Sections */
  .content-section:
    neomorphic-base h-full overflow-hidden
    col-span-2 md:col-span-4 lg:col-span-6
    p-4 md:p-6 rounded-2xl

  /* Theme Toggle */
  .theme-toggle:
    neomorphic-inset w-12 h-6 rounded-full
    relative cursor-pointer transition-all duration-300
    bg-gray-200 dark:bg-gray-700

  Implementation Guidelines

  1. Mobile First: Start with compact 2-column bento grid
  2. Progressive Enhancement: Add complexity at larger breakpoints
  3. Accessibility: Maintain focus states and keyboard navigation
  4. Performance: Use will-change only during animations
  5. Theme Consistency: Ensure all components work in both light/dark
  modes
  6. Motion Sensitivity: Respect prefers-reduced-motion settings


<><><><><><><><<><>>

Built with ❤️ using React, TypeScript, and modern web technologies
