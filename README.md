# Kavyro Solutions

Marketing website for Kavyro Solutions, an AI-driven digital agency. It is a
static brochure site whose job is to explain the agency's services and turn
visitors into enquiries.

Live at [kavyrosolutions.com](https://kavyrosolutions.com).

## What the site covers

The landing page runs top to bottom as a single narrative: a hero pitch, trust
signals, the service catalogue, reasons to choose the agency, the engagement
process, an AI capability strip, testimonials, an FAQ, a closing call to
action, and a contact form.

Nine services are presented: digital marketing, SEO optimization, video editing,
web development and design, graphic design, content marketing, paid advertising,
social media management, and virtual assistant services. Each service card
links to one of five service pages, which carry the detail, an FAQ and their
own Service and FAQPage structured data:

- `digital-marketing-seo.html` — SEO, paid ads, social media, content
- `web-design.html` — websites, landing pages, e-commerce, graphic design
- `video-editing.html`
- `virtual-assistant-services.html`
- `ai-automation.html`

`about.html`, `privacy-policy.html` and `terms-of-service.html` complete the
set. The service and About pages share `legal-page.css` for their shell and
add `service-page.css` on top. Nothing on the site quotes a price; fees are
left to the proposal, and the pages are written that way on purpose.

## Stack

Plain HTML, CSS, and vanilla JavaScript. No framework, no bundler, no
dependencies. Markup lives in the HTML files at the root; styles, scripts and
fonts are split under `assets/`.

## Development

Open the files through Laragon (`http://kavyro.test`) or any static server.
There is no build step for local work, so edit and refresh.

Pages link to each other by clean URL (`/privacy-policy`, not
`privacy-policy.html`) because that is what Cloudflare serves. To make Apache
under Laragon do the same, drop this `.htaccess` in the project root (it is
git-ignored so it never ships):

```
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.*)$ $1.html [L]
```

`assets/og-image.jpg` (the link-preview card) and `assets/logo.webp` are
rendered from `assets/logo.png` by `tools/og-image.js`. Re-run it when the
logo or tagline changes; the header of the script says how.

## Deployment

The site is served by a Cloudflare Worker (`withered-night-aa0e`) using static
assets, fronted by `kavyrosolutions.com`. DNS and SSL are managed in Cloudflare;
the domain is registered at GoDaddy with nameservers pointed at Cloudflare.

`build.sh` copies the public files into `dist/`, which is what Cloudflare serves.
`dist/` is generated and not committed.

To publish a change:

```
./deploy.sh        # macOS and Linux
deploy.cmd         # Windows
```

Both run the build and then `wrangler deploy`. Authorize once first with
`npx wrangler login`.

`_headers` sets security headers and caches `assets/*` for a day, so purge the
Cloudflare cache after a CSS or JS change if you need it visible immediately.
Its Content-Security-Policy lists every origin the pages talk to; if
`FORM_ENDPOINT` in `assets/scripts/main.js` is ever pointed at a form service,
add that origin to `connect-src` or submissions will be blocked.

`robots.txt` and `sitemap.xml` are deployed as-is; add a `<url>` to the sitemap
when a page is added.

Stylesheets and scripts are linked with `?v=<date>` and `_headers` caches
`assets/*` for a day at the edge and in browsers. Bump the version string in
every page whenever a CSS or JS file changes, or visitors keep the old file
until the cache expires.

## Contact

kavyrosolutions@gmail.com
