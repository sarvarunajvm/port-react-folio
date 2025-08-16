# Portfolio - Saravanan Kalimuthu

A modern, minimalist portfolio featuring a unique Bento Grid layout with Neomorphic Soft UI design. Built with React 18, TypeScript, Vite, and HeroUI components, showcasing a no-scroll single-page experience with modal-based content exploration.

## 🎨 Design Philosophy

### Bento Grid Layout

- **Fixed Viewport**: Full-screen, no-scroll design
- **Grid System**: 12-column responsive grid with adaptive card sizes
- **Modal Navigation**: Click-to-explore sections in elegant modals
- **Hover Effects**: Dynamic pastel purple (light) and emerald (dark) accents

### Neomorphic Soft UI

- **3D Surfaces**: Raised cards with realistic shadows and highlights
- **Monochrome Base**: Clean black/white/grey foundation
- **Accent Colors**: Subtle pastel gradients on hover interactions
- **Smooth Transitions**: Cubic-bezier animations for natural movement

## 🚀 Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **UI Library**: HeroUI Components
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Styling**: Tailwind CSS + Custom CSS
- **Code Quality**: ESLint + Prettier + Husky

## 📦 Quick Start

```bash
# Clone repository
git clone https://github.com/sarvarunajvm/port-vue-folio.git
cd port-vue-folio

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the portfolio.

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run deploy       # Build and prepare for deployment
```

## 🎯 Features

### Interactive Bento Cards

- **Hero Card**: Dynamic title rotation, real-time clock, stats display
- **Profile Photo**: Animated presence with online indicator
- **Experience**: Timeline view with company highlights
- **Skills**: Categorized tech stack visualization
- **Projects**: Open source contributions showcase
- **Contact**: Social links and communication channels
- **Resume**: One-click CV download

### User Experience

- **Theme Toggle**: Automatic system detection + manual override
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Accessibility**: WCAG AA compliant, keyboard navigation support
- **Performance**: Optimized bundle sizes with code splitting

## 📁 Project Structure

```
port-vue-folio/
├── src/
│   ├── components/
│   │   ├── Home.tsx              # Main Bento grid layout
│   │   ├── Modal.tsx             # Reusable modal component
│   │   ├── FloatingThemeToggle.tsx
│   │   └── sections/             # Content sections
│   │       ├── About.tsx
│   │       ├── ContactBento.tsx
│   │       ├── Experience.tsx
│   │       ├── Projects.tsx
│   │       └── Skills.tsx
│   ├── contexts/
│   │   └── ThemeContext.tsx     # Theme management
│   ├── hooks/
│   │   └── useTheme.ts          # Theme hook
│   ├── data/                    # Portfolio content
│   │   ├── about.ts
│   │   ├── education.ts
│   │   ├── experience.ts
│   │   ├── projects.ts
│   │   └── skills.ts
│   └── styles/
│       └── globals.css          # Neomorphic design system
├── public/
│   ├── photo.png               # Profile photo
│   ├── Resume.pdf              # Downloadable CV
│   └── fonts/                  # Custom fonts (optional)
└── dist/                       # Production build
```

## 🎨 Customization

### Update Content

Edit the TypeScript files in `src/data/`:

- `about.ts` - Personal information
- `experience.ts` - Work history
- `projects.ts` - Portfolio projects
- `skills.ts` - Technical skills
- `education.ts` - Educational background

### Theme Colors

Modify CSS variables in `src/styles/globals.css`:

```css
/* Light Theme */
--bg: #f2f3f5;
--surface: #f7f8fa;
--fg: #1a1a1a;
--muted: #4a4a4a;

/* Dark Theme */
--bg: #0e0f11;
--surface: #121316;
--fg: #f0f0f0;
--muted: #a0a0a0;
```

### Hover Effects

- Light mode: Pastel purple shadows (rgba(147, 51, 234))
- Dark mode: Pastel emerald shadows (rgba(16, 185, 129))

## 🌐 Deployment

### GitHub Pages

Configured for automatic deployment on push to `master` branch.

### Manual Deployment

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service

### Environment Requirements

- Node.js 18+ recommended
- npm 9+ or compatible package manager

## 📊 Performance

- **Lighthouse Scores**: 90+ across all metrics
- **Bundle Size**: ~380KB total (gzipped ~110KB)
- **Initial Load**: < 2s on 3G connection
- **Interaction Ready**: < 1s Time to Interactive

## 🔧 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

Open source - feel free to use as inspiration for your own portfolio.

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Contact

- **Email**: sathishdaywalker@outlook.com
- **GitHub**: [@sarvarunajvm](https://github.com/sarvarunajvm)
- **LinkedIn**: [Saravanan Kalimuthu](https://www.linkedin.com/in/saravanan-kalimuthu-01a0a9113)

---

Built with ❤️ using React, TypeScript, and HeroUI
