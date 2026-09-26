# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Kavyro Solutions** is a static marketing website for an AI-driven digital agency. There is no build system, no package manager, and no framework — everything is plain HTML, CSS, and vanilla JavaScript served directly by Laragon.

## Development

Open the site in a browser via Laragon's local server (typically `http://kavyro.test` or `http://localhost/kavyro`). There is no build step, compilation, or hot-reload — just edit files and refresh the browser.

## File Structure

- `index.html` — Main landing page
- `digital-marketing-seo.html`, `web-design.html`, `video-editing.html`, `virtual-assistant-services.html`, `ai-automation.html` — Service pages (same shell as the legal pages plus `assets/styles/service-page.css`; each carries Service, FAQPage and BreadcrumbList JSON-LD)
- `services.html` — Services hub listing the five roles (same shell)
- `contact.html` — Contact page: the enquiry form on its own URL (shares `assets/styles/contact-block.css` with the home page section)
- `about.html` — About page (same shell)
- `portfolio.html` — Portfolio page (same shell plus `assets/styles/portfolio-page.css`; full-width work sections instead of the TOC sidebar, real screenshots and campaign creative in `assets/portfolio/`, CollectionPage/ItemList/BreadcrumbList JSON-LD). No decorative icons here: the images carry the page.
- `privacy-policy.html` — Privacy policy page
- `terms-of-service.html` — Terms of service page
- `assets/` — `styles/`, `scripts/main.js`, self-hosted `fonts/`, `logo.png`/`logo.webp`, `og-image.jpg`
- `assets/scripts/hero-globe.js` + `globe-land.js` — the WebGL globe on the home page, imported by `main.js` after load. `vendor/three.min.js` is a trimmed Three.js r186 build (only the classes `hero-globe.js` imports, bundled with esbuild); rebuild it if the globe needs another Three.js class. `assets/images/globe-poster.svg` is the globe's first frame, shown before WebGL starts and when it cannot.
- Header: night (`--night`) on every page, using the transparent `assets/logo-mark.*`; the home page adds `nav-over` so it starts clear over the hero.
- `robots.txt`, `sitemap.xml`, `_headers` — crawl and Cloudflare header config, deployed as-is

Site-wide rule: no prices, payment terms or billing language anywhere. Fees are
left to the proposal. Do not add pricing, packages or "affordable" copy.

Assets are cache-busted with `?v=<date>` on every `<link rel="stylesheet">`
and `<script src>`. After changing any CSS or JS, bump the version string in
all twelve HTML pages (`grep -l '?v=' *.html`).

## Architecture

### index.html structure
All styles, markup, and scripts live in one file in this order:
1. **`<style>`** — Full CSS (~850 lines). Sections are delimited by `/* ─── SECTION NAME ─── */` comments. CSS variables are defined in `:root` and used throughout.
2. **`<body>`** — Page sections in order: mobile nav overlay → `<nav>` → `#hero` → `#trust` → `#services` → `#why` → `#process` → `#ai-strip` → `#testimonials` → `#cta` → `#contact` → `<footer>`
3. **`<script>`** — `assets/scripts/main.js`, loaded at the bottom: navbar scroll behavior, mobile nav toggle, contact form submission (`handleForm`)

### Header
Every page renders the same navbar and mobile sheet: Home, Services, Portfolio,
About, Contact, one Get Started button and a hamburger below 860px. The markup
is duplicated per page, but the styles live in `assets/styles/main.css` — do not
re-add nav, logo or button rules to the page stylesheets.

### Design tokens (CSS variables)
```
--blue: #1658a1   --blue-dark: #0d3d73   --blue-mid: #1e6bbf
--cyan: #54c8da   --cyan-light: #7dd8e6
--gray: #575b5b   --gray-light: #f2f6fb  --gray-mid: #e4eaf3
--white: #ffffff  --border: #dce5f0      --radius: 10px
```

### Typography
Three Google Fonts families: **Montserrat** (headings/logo), **Poppins** (body/UI), **Nunito** (secondary).

### Contact form
The `handleForm(event)` function handles submission. Check the inline script for the current backend/endpoint used (FormSubmit or similar).

### privacy-policy.html / terms-of-service.html
These pages duplicate the navbar and footer HTML. They share the same CSS variable palette and font stack as `index.html` but define their own `<style>` blocks inline. The navbar on these pages is `position: sticky` (vs `position: fixed` on `index.html`).

## Key Conventions

- **No external CSS or JS files** — all code is inline per page.
- **Section IDs** are the navigation anchors: `#hero`, `#services`, `#why`, `#process`, `#ai-strip`, `#testimonials`, `#contact`.
- **Utility classes**: `.container` (max-width 1160px), `.section` (96px padding), `.btn`, `.label`, `.title`, `.subtitle`.
- Contact email: `kavyrosolutions@gmail.com`
