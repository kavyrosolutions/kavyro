# 0008. A trimmed Three.js bundle for the globe

Status: Accepted
Date: 2026-10-01

## Context

The home hero shows a WebGL globe of where the team works from. Full Three.js
is several hundred KB minified, far more than one globe needs, and loading it
from a CDN would break [0007](0007-self-hosted-strict-csp.md).

## Decision

- `assets/scripts/vendor/three.min.js` is a Three.js r186 file containing only
  the classes `hero-globe.js` imports, committed as-is.
- `main.js` imports the globe late (when, and where not at all, is set by
  [0013](0013-globe-waits-for-interaction.md)). Until then, and on devices
  without WebGL, `assets/images/globe-poster.svg` shows its first frame.

## Consequences

- The hero renders immediately and the globe never blocks it.
- Using another Three.js class means regenerating the trimmed file. Do not
  swap in a CDN copy.

## Related

- [0013. The globe waits for the first interaction](0013-globe-waits-for-interaction.md)
- [0001. Plain static site, no framework or build](0001-plain-static-site.md)
- [0007. Self-host assets behind a strict CSP](0007-self-hosted-strict-csp.md)
