# 0007. Self-host assets behind a strict CSP

Status: Accepted
Date: 2026-10-01

## Context

Google Fonts and CDN scripts each add a third-party connection before the page
can render, and an open Content-Security-Policy lets any injected script run.
The site needs very few outside services: Google Analytics and the contact
form (a LeadConnector embed).

## Decision

- Fonts (Montserrat, Poppins, Nunito) and scripts, including Three.js
  ([0008](0008-trimmed-threejs-globe.md)), are served from `assets/`.
- `_headers` sets a strict CSP listing every origin the pages talk to. Any new
  third-party script, font, image host or fetch target must be added there.
- gtag.js loads after the `load` event so it does not compete with the hero.

## Consequences

- Faster first render and no font flash from a third-party host.
- Adding a service is a two-place change (the page and `_headers`). Forgetting
  `_headers` works locally and breaks in production; the LeadConnector form
  needs `api.leadconnectorhq.com` in `frame-src` and `link.msgsndr.com` in
  `script-src`.

## Related

- [0008. A trimmed Three.js bundle for the globe](0008-trimmed-threejs-globe.md)
- [0014. The contact form is a HighLevel embed](0014-highlevel-contact-form.md)
