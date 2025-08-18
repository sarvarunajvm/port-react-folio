# Portfolio - Saravanan Kalimuthu

A modern, responsive portfolio website built with React 18, TypeScript, and Vite. Features a unique Bento Grid layout with Neomorphic Soft UI design, offering an immersive single-page experience with smooth animations and modal-based content exploration.

## 🌟 Live Demo

Visit the live portfolio at [https://sarvarunajvm.github.io/port-react-folio](https://sarvarunajvm.github.io/port-react-folio)

## 🎨 Design Philosophy

### Bento Grid Layout

- **Fixed Viewport**: Full-screen, no-scroll design optimized for all devices
- **Responsive Grid**: Dynamic grid system that adapts from mobile to desktop
- **Modal Navigation**: Click-to-explore sections with smooth transitions
- **Interactive Cards**: Hover effects with dynamic color accents

### Neomorphic Soft UI

- **3D Surfaces**: Raised cards with realistic shadows and depth
- **Theme Support**: Light and dark modes with system preference detection
- **Accent Colors**: Pastel purple (light mode) and emerald (dark mode) highlights
- **Smooth Animations**: Framer Motion powered transitions with reduced motion support

## 🚀 Tech Stack

### Core Technologies

- **Framework**: React 18.2 with TypeScript 5.2
- **Build Tool**: Vite 7.1 with optimized chunking strategy
- **UI Library**: HeroUI Components 2.8
- **Animations**: Framer Motion 12.23
- **Styling**: Tailwind CSS 3.4 + Custom CSS Variables

### Development Tools

- **Code Quality**: ESLint + Prettier with automatic formatting
- **Git Hooks**: Husky + lint-staged for pre-commit checks
- **Commit Standards**: Commitlint with conventional commits
- **Bundle Analysis**: Rollup Visualizer for optimization
- **Compression**: Gzip + Brotli for production builds

## 📦 Quick Start

```bash
# Clone repository
git clone https://github.com/sarvarunajvm/port-react-folio.git
cd port-react-folio

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the portfolio.

## 🛠️ Available Scripts

### Development

```bash
npm run dev          # Start development server on port 5173
npm run preview      # Preview production build locally
npm run lint         # Run ESLint with error reporting
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

### Building & Deployment

```bash
npm run build        # Build for production with optimizations
npm run deploy       # Build and prepare for deployment
```

### Release Management

```bash
npm run release      # Create a new release
npm run release:patch # Patch version bump (1.0.0 → 1.0.1)
npm run release:minor # Minor version bump (1.0.0 → 1.1.0)
npm run release:major # Major version bump (1.0.0 → 2.0.0)
npm run release:dry  # Preview release without making changes
```

## 🎯 Features

### Core Components

- **Hero Section**: 
  - Real-time clock display
  - Dynamic title rotation with typewriter effect
  - Live statistics counters (9+ years experience, 25+ projects, 48+ technologies)
  - Profile avatar with availability status indicator

- **Navigation Cards**: 
  - Experience: Professional journey with 4 companies
  - Projects: Open source contributions and utilities
  - Skills: 48+ technologies across 5 categories
  - Resume: Direct PDF download

### Interactive Elements

- **Modal System**: Smooth modal transitions for content exploration
- **Theme Toggle**: Floating theme switcher with system preference detection
- **Hover Effects**: Dynamic color accents and depth effects
- **Loading States**: Custom coffee-themed loader with particle animations

### User Experience

- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Performance**: 
  - Code splitting for optimal loading (< 400KB bundle size)
  - Lazy loading for modal content
  - Image optimization and compression
- **Accessibility**: 
  - WCAG AA compliant
  - Keyboard navigation support
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

Built with ❤️ using React, TypeScript, and modern web technologies
