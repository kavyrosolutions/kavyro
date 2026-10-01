# 0001. Plain static site, no framework or build

Status: Accepted
Date: 2026-10-01

## Context

The site is a brochure: a dozen pages whose job is to explain the services and
collect enquiries. A framework, a build step or a package manager would add
moving parts without adding anything a visitor sees.

## Decision

The site is hand-written HTML, CSS and vanilla JavaScript in `public/`. No
framework, no build, no npm packages. Node appears only in CI, to run
`tools/check-site.js`; nothing needs to be installed to work on the site.

## Consequences

- Any page can be edited and checked by opening it in a browser.
- Pages load fast with nothing to hydrate.
- Shared markup cannot be componentised, so it is duplicated; see
  [0005](0005-shared-styles-duplicated-markup.md).
- Without a bundler, cache-busting is done by hand; see
  [0006](0006-dated-cache-busting.md).
- The one heavy library, Three.js, ships as a pre-trimmed file; see
  [0008](0008-trimmed-threejs-globe.md).

## Related

- [0005. Shared styles, duplicated header markup](0005-shared-styles-duplicated-markup.md)
- [0006. Cache-bust assets with a dated `?v=`](0006-dated-cache-busting.md)
- [0008. A trimmed Three.js bundle for the globe](0008-trimmed-threejs-globe.md)
- [0011. The website lives in `public/`](0011-site-in-public-folder.md)
