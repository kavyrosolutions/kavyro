# 0006. Cache-bust assets with a dated `?v=`

Status: Accepted
Date: 2026-10-01

## Context

`_headers` caches `assets/*` for a day at the Cloudflare edge and in browsers,
which is right for speed. Without a fresh URL, a changed CSS or JS file would
reach visitors up to a day late and break layouts in between. With no bundler
([0001](0001-plain-static-site.md)) there are no content-hashed filenames.

## Decision

Every `<link rel="stylesheet">` and `<script src>` carries `?v=<yyyymmdd>`
(letter suffix for a second change the same day, e.g. `20260930c`). All pages
share one version string. Any change to CSS or JS bumps it in all twelve pages.

## Consequences

- A changed asset reaches visitors on the next page load.
- Easy to forget, so `tools/check-site.js` fails a PR that changes an asset
  without bumping the version, or where pages disagree on it.
- One shared version means unchanged files are re-fetched too; acceptable at
  this size.

## Related

- [0001. Plain static site, no framework or build](0001-plain-static-site.md)
- [0005. Shared styles, duplicated header markup](0005-shared-styles-duplicated-markup.md)
- [0010. Branch, PR to staging, release to main](0010-staging-release-flow.md)
