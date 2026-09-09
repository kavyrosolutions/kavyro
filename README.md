# Kavyro Solutions

Marketing website for Kavyro Solutions, an AI-driven digital agency. It is a
static brochure site whose job is to explain the agency's services and turn
visitors into enquiries.

Live at [kavyrosolutions.com](https://kavyrosolutions.com).

## What the site covers

The landing page runs top to bottom as a single narrative: a hero pitch, trust
signals, the service catalogue, reasons to choose the agency, the engagement
process, an AI capability strip, testimonials, a closing call to action, and a
contact form.

Nine services are presented: digital marketing, SEO optimization, video editing,
web development and design, graphic design, content marketing, paid advertising,
social media management, and virtual assistant services.

Two supporting pages, `privacy-policy.html` and `terms-of-service.html`, are
linked from the footer.

A keyword-matching chatbot widget sits in the corner of every page. It answers
from a local knowledge base in `assets/scripts/chatbot.js` and calls no external
API, so it works offline and costs nothing to run.

## Stack

Plain HTML, CSS, and vanilla JavaScript. No framework, no bundler, no
dependencies. Markup lives in the three HTML files; styles and scripts are split
under `assets/`.

## Development

Open the files through Laragon (`http://kavyro.test`) or any static server.
There is no build step for local work, so edit and refresh.

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

## Contact

kavyrosolutions@gmail.com
