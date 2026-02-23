# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Kavyro Solutions** is a static marketing website for an AI-driven digital agency. There is no build system, no package manager, and no framework — everything is plain HTML, CSS, and vanilla JavaScript served directly by Laragon.

## Development

Open the site in a browser via Laragon's local server (typically `http://kavyro.test` or `http://localhost/kavyro`). There is no build step, compilation, or hot-reload — just edit files and refresh the browser.

## File Structure

- `index.html` — Main landing page (all CSS and JS are inline in this single file, ~1 900 lines)
- `privacy-policy.html` — Privacy policy page (self-contained)
- `terms-of-service.html` — Terms of service page (self-contained)
- `logo.png` — Site logo used across all pages

## Architecture

### index.html structure
All styles, markup, and scripts live in one file in this order:
1. **`<style>`** — Full CSS (~850 lines). Sections are delimited by `/* ─── SECTION NAME ─── */` comments. CSS variables are defined in `:root` and used throughout.
2. **`<body>`** — Page sections in order: mobile nav overlay → `<nav>` → `#hero` → `#trust` → `#services` → `#why` → `#process` → `#ai-strip` → `#testimonials` → `#cta` → `#contact` → `<footer>`
3. **Chatbot widget** — Appended after the footer: `#ks-bubble` (FAB button) + `#ks-window` (chat dialog)
4. **`<script>`** — Inline JS at the bottom handling: navbar scroll behavior, mobile nav toggle, contact form submission (`handleForm`), and the chatbot logic

### Design tokens (CSS variables)
```
--blue: #1658a1   --blue-dark: #0d3d73   --blue-mid: #1e6bbf
--cyan: #54c8da   --cyan-light: #7dd8e6
--gray: #575b5b   --gray-light: #f2f6fb  --gray-mid: #e4eaf3
--white: #ffffff  --border: #dce5f0      --radius: 10px
```

### Typography
Three Google Fonts families: **Montserrat** (headings/logo), **Poppins** (body/UI), **Nunito** (secondary).

### Chatbot (`#ks-window`)
Pure client-side keyword-matching chatbot. The knowledge base is a `KB` array of `{ keys, reply, chips }` objects defined in the inline `<script>`. Matching is done by checking if the user's lowercase input includes any key string. A `FALLBACK` object handles unmatched queries. No external API is called.

### Contact form
The `handleForm(event)` function handles submission. Check the inline script for the current backend/endpoint used (FormSubmit or similar).

### privacy-policy.html / terms-of-service.html
These pages duplicate the navbar and footer HTML. They share the same CSS variable palette and font stack as `index.html` but define their own `<style>` blocks inline. The navbar on these pages is `position: sticky` (vs `position: fixed` on `index.html`).

## Key Conventions

- **No external CSS or JS files** — all code is inline per page.
- **Section IDs** are the navigation anchors: `#hero`, `#services`, `#why`, `#process`, `#ai-strip`, `#testimonials`, `#contact`.
- **Utility classes**: `.container` (max-width 1160px), `.section` (96px padding), `.btn`, `.label`, `.title`, `.subtitle`.
- **Chatbot IDs** are prefixed `ks-` (`#ks-bubble`, `#ks-window`, `#ks-msgs`, `#ks-quick`, `#ks-input`, `#ks-send`).
- Contact email: `kavyrosolutions@gmail.com`
