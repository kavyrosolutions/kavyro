# 0014. The contact form is a HighLevel embed

Status: Accepted
Date: 2026-10-07

## Context

The site's own form posted nowhere: it opened a pre-filled message in the
visitor's email app, so enquiries depended on the visitor having one set up
and never reached a CRM. Leads are managed in HighLevel (LeadConnector).

## Decision

- `index.html` (`#contact`) and `contact.html` embed the HighLevel "Client
  Form" in an iframe, sized by `link.msgsndr.com/js/form_embed.js`.
- Fields, colours and fonts are changed in HighLevel's form builder. The site's
  CSS cannot reach inside the iframe.
- `_headers` allows `api.leadconnectorhq.com` in `frame-src` and
  `link.msgsndr.com` in `script-src`.
- A skeleton covers the form until form_embed.js reveals it, and points at the
  email address if it has not appeared after 12 seconds. Do not lazy-load the
  iframe: form_embed.js hides it offscreen until it loads, so it never would.
- The privacy policy names LeadConnector as handling enquiries.

## Consequences

- Enquiries land in HighLevel with its spam protection and cookie consent.
- The form loads from a third party, so it arrives after the page; the
  skeleton covers the gap.
- Its look only matches the site as far as the form builder allows. Going back
  to a site-styled form would mean posting it to a HighLevel inbound webhook.

## Related

- [0007. Self-host assets behind a strict CSP](0007-self-hosted-strict-csp.md)
