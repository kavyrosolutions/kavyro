# 0009. Real imagery only on the portfolio

Status: Accepted
Date: 2026-10-01

## Context

Portfolio pages often fill space with mock-ups and stock devices. For a
prospect deciding whether to hand work to an offshore team, made-up visuals
undermine the one page meant to prove the work is real
([0004](0004-only-defensible-claims.md)).

## Decision

- Client websites are shown as screenshots of the live site, and campaigns as
  the creative as it was published, stored as webp in `assets/portfolio/`. The
  root README has the recipe for re-shooting a site.
- The custom business systems run inside client offices and cannot be shown,
  so that section is typographic, not illustrated with invented screens.
- No decorative icons on the portfolio; the images carry the page.

## Consequences

- Screenshots go stale when a client redesigns; re-shoot them.
- The business-systems section relies on copy and layout to hold attention.

## Related

- [0004. Only claims we can stand behind](0004-only-defensible-claims.md)
