# 0005. Shared styles, duplicated header markup

Status: Accepted
Date: 2026-10-01

## Context

Every page shows the same header, nav and footer. With no build step
([0001](0001-plain-static-site.md)) there is no include or component to share
markup, and per-page copies of the same CSS drift apart.

## Decision

- Styles that more than one page needs live once in `assets/styles/main.css`
  (header, nav, logo, buttons, footer). Page stylesheets own only their page.
- Header and footer markup is copied identically into all twelve pages. A
  change to either is made in every page in the same commit.

## Consequences

- One stylesheet to change for the shell; visual drift is not possible.
- Markup drift still is, and CI does not compare headers. Find every copy
  with `git grep` before editing.
- If the page count grows much further, revisit this.

## Related

- [0001. Plain static site, no framework or build](0001-plain-static-site.md)
- [0006. Cache-bust assets with a dated `?v=`](0006-dated-cache-busting.md)
