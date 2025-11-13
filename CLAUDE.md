# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Audacetics is an Astro-based website for digital audio guide services, built with Tailwind CSS and GSAP animations. The site is designed for tourism/cultural content delivery with built-in internationalization (i18n) support for Spanish (default) and English.

## Development Commands

### Core Commands
- **Development**: `bun run dev` or `bun start` - Start dev server
- **Build**: `bun run build` - Build for production
- **Preview**: `bun run preview` - Preview production build locally
- **Install**: `bun install` - Install dependencies (uses Bun as primary package manager)

### Special Commands
- **PWA Assets**: `bun run pwa:generate-assets` - Generate PWA assets from logo.svg

### Docker
- Build: `docker build -t audacetics .`
- Run: `docker-compose up`
- The Dockerfile uses multi-stage builds with Bun runtime

## Architecture & Key Concepts

### Internationalization (i18n)

The site uses a custom i18n implementation (not Astro's built-in i18n routing):

- **Default locale**: Spanish (`es`) configured in `astro.config.mjs`
- **Supported locales**: `es`, `en`
- **Translation system**: Located in `src/i18n/`
  - `ui.ts` - Translation strings dictionary
  - `utils.ts` - i18n utility functions
- **URL structure**:
  - Spanish (default) uses root paths: `/`, `/blog`, `/contact`
  - English uses prefixed paths: `/en`, `/en/blog`, `/en/contact`
  - Controlled by `showDefaultLang = false` in `src/i18n/ui.ts`

**Key i18n utilities**:
- `getLangFromUrl(url)` - Extract language from URL
- `useTranslations(lang)` - Get translation function for a language
- `useTranslatedPath(lang)` - Generate localized URLs

### Content Collections

Defined in `src/content/config.ts` with three collections:

1. **posts** - Blog articles
   - Schema: title, pubDate, description, author, image, tags
   - Organized by language: `src/content/posts/en/`, `src/content/posts/es/`

2. **projects** - Portfolio/work items
   - Schema: title, pubDate, description, link, author, image
   - Organized by language: `src/content/projects/en/`, `src/content/projects/es/`

3. **authors** - Author profiles
   - Schema: name, description, image
   - Organized by language: `src/content/authors/en/`, `src/content/authors/es/`

### Page Structure

The site uses a dual routing pattern:
- Root-level pages for Spanish (default): `/pages/index.astro`, `/pages/blog/`, etc.
- `/en/` prefixed pages for English: `/pages/en/index.astro`, `/pages/en/blog/`, etc.

This pattern is consistent across all page types (blog, work, tags, authors).

### Cloudflare Functions

Located in `functions/api/`:
- `auth.js` - GitHub OAuth authentication flow
- `callback.js` - OAuth callback handler
- Uses Cloudflare Pages Functions API (context-based)

### Styling & Theming

**Tailwind Configuration**:
- Custom color palette with `primary`, `secondary`, `lime`, and `blue` variants
- Custom fonts:
  - Display: "Midnight"
  - Sans: "Inter"
  - Mono: "JetBrains Mono"
- Global styles in `src/styles/global.css`
- Tailwind plugins: typography, forms, aspect-ratio

**GSAP Animations**:
- GSAP is free as of April 2025 (noted in `.npmrc` and `bunfig.toml`)
- Previously required premium authentication but no longer necessary
- Used throughout components for animations

### Component Organization

Components are organized by purpose:
- `src/components/landing/` - Homepage sections (Hero, Services, Testimonials, etc.)
- `src/components/blog/` - Blog-related components (Articles, Comments, Newsletter, etc.)
- `src/components/global/` - Site-wide components (Navigation, Footer, Title, etc.)
- `src/components/infopages/` - Static pages (FAQ, Privacy, Terms, 404, etc.)
- `src/components/forms/` - Form components (Contact)
- `src/components/work/` - Portfolio/work components

### Layouts

Two main layouts in `src/layouts/`:
- `BaseLayout.astro` - Main site layout
- `MarkdownPostLayout.astro` - Blog post/markdown content layout

## Important Notes

### GSAP Setup
The README mentions requiring premium GSAP, but this is outdated. The `.npmrc` and `bunfig.toml` files indicate GSAP is now free as of April 2025. The commented-out authentication configurations should not be uncommented.

### Prettier Configuration
Configured in `package.json`:
- Tab width: 4 spaces (uses tabs)
- Print width: 150
- HTML whitespace: ignore
- Plugins: prettier-plugin-astro, prettier-plugin-tailwindcss

### Deployment Targets
Configured for deployment to:
- Cloudflare Workers
- Netlify
- Vercel

## Environment Variables

For GitHub OAuth (Cloudflare Functions):
- `GITHUB_CLIENT_ID` - GitHub OAuth app client ID

## Vite Configuration

Custom Vite config in `astro.config.mjs`:
- Uses polling for file watching (likely for WSL/Docker compatibility)
- Server watch configured with `usePolling: true`
