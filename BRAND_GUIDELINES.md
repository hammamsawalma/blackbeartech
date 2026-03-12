# BLACK BEAR TECH — Brand & UI Guidelines

## Art Direction
**Theme:** Dark Luxe Minimalism + 3D Depth  
**Mood:** Premium, cutting-edge technology · Professional yet approachable  
**Bear Motif:** Signature 3D bear mascot integrated into hero section

---

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg-primary` | `#000000` | Main background |
| `--color-bg-surface` | `#0a0c10` | Cards, panels |
| `--color-bg-elevated` | `#141620` | Elevated surfaces, modals |
| `--color-bg-deep` | `#060710` | Overlay backgrounds |
| `--color-accent-primary` | `#00D4FF` | Primary accent (links, CTAs, icons) |
| `--color-accent-secondary` | `#00A3CC` | Secondary accent (gradients) |
| `--color-accent-rose` | `#FF6B9D` | Accent alt (some service cards) |
| `--color-text-primary` | `#FFFFFF` | Headings, primary text |
| `--color-text-muted` | `rgba(255,255,255,0.5)` | Body text, descriptions |

> **Rule:** Never use `accent-primary` for body text. Never use hardcoded hex — always use tokens.

---

## Typography

| Language | Headings | Body |
|----------|----------|------|
| English | Space Grotesk (700) | Inter (400, 500) |
| Arabic | Cairo (700) | IBM Plex Sans Arabic (400, 500, 700) |

### Fluid Scale (clamp)
| Token | Min | Preferred | Max |
|-------|-----|-----------|-----|
| `--text-h1` | 36px | 5vw | 72px |
| `--text-h2` | 28px | 3.5vw | 48px |
| `--text-h3` | 20px | 2vw | 30px |
| `--text-body` | 14px | 1.1vw | 18px |

---

## Component Library (Atomic Design)

### Atoms
| Component | Variants | File |
|-----------|----------|------|
| Button | primary, secondary, ghost, gradient, danger | `atoms/Button.tsx` |
| Badge | accent, success, warning, error, neutral | `atoms/Badge.tsx` |
| Input | default + error/success/disabled states | `atoms/Input.tsx` |
| Select | single select with custom dropdown | `atoms/Select.tsx` |
| Textarea | resizable with character limits | `atoms/Textarea.tsx` |
| Icon | xs, sm, md, lg, xl sizes | `atoms/Icon.tsx` |
| Alert | info, success, warning, error (dismissible) | `atoms/Alert.tsx` |
| Tooltip | top, bottom, left, right positioning | `atoms/Tooltip.tsx` |
| Skeleton | text, card, image, avatar, table-row | `atoms/Skeleton.tsx` |

### Molecules
| Component | Purpose | File |
|-----------|---------|------|
| Card | Interactive card with 3 variants + glow | `molecules/Card.tsx` |
| Dropdown | Menu with keyboard navigation | `molecules/Dropdown.tsx` |
| ScrollProgress | Scroll position indicator bar | `molecules/ScrollProgress.tsx` |
| Toast | Auto-dismiss notifications | `molecules/Toast.tsx` |

### Organisms
| Component | Purpose |
|-----------|---------|
| Navbar | Sticky nav with IntersectionObserver section tracking |
| HeroSection | 5-layer depth composition with 3D bear |
| CoreServices | Service cards with search filter |
| AboutUs | Company info with workspace illustration |
| Footer | Animated footer with social glow icons |
| Sidebar | Slide-in drawer with spring animation |
| Modal | Accessible dialog (ARIA) with focus trap |
| DataTable | Responsive table → mobile cards |
| DiagnosticWizard | Multi-step interactive wizard |

---

## Animation Principles

| Property | Value |
|----------|-------|
| Easing | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Default Duration | 300ms |
| Complex Duration | 500-600ms |
| Entrance Pattern | `fadeInUp` or `scaleIn` |
| Exit Pattern | Reverse of entrance (150ms) |
| Stagger Delay | 50-80ms between children |
| Reduced Motion | All animations respect `prefers-reduced-motion` |

**Shared variants:** Import from `src/lib/animations.ts`

---

## Spacing & Layout

- **Base unit:** 4px grid
- **Section padding:** `py-24` (96px)
- **Container:** `max-w-7xl mx-auto px-6`
- **Card gap:** `gap-6` (24px)
- **Grid columns:** 1 → 2 → 3 → 4 (responsive)

---

## Image Style Guide

- **Format:** WebP/AVIF primary (via Next.js Image optimization)
- **Art style:** Dark backgrounds, isometric 3D, cyan/rose accent lighting
- **Bear motif:** Use in error pages and hero section only
- **Icons:** Custom isometric illustrations for services
- **Alt text:** Decorative images = `alt=""`, informative = descriptive
- **Loading:** `priority` for above-fold, lazy for below-fold

---

## Accessibility (WCAG AA)

- Focus ring: `2px solid accent-primary`, `2px offset`
- Skip-to-content link (visible on Tab)
- All modals have `role="dialog"`, `aria-modal="true"`
- Hamburger has `aria-expanded` and `aria-label`
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Color contrast ≥ 4.5:1 for text
- Reduced motion support via CSS media query

---

## Iconography

- **Library:** lucide-react exclusively
- **Size tokens:** xs (12px), sm (16px), md (20px), lg (24px), xl (32px)
- **Color:** Inherits from parent element
- **Custom icons:** Isometric PNGs for service cards only
