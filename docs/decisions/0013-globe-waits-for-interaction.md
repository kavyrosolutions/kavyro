# 0013. The globe waits for the first interaction

Status: Accepted
Date: 2026-10-04

## Context

Started on the load event, the WebGL globe ([0008](0008-trimmed-threejs-globe.md))
cost 1.6 s (mobile) to 1.9 s (desktop) of Total Blocking Time in PageSpeed
Insights and about 40 s of main-thread work, putting the home page at 46–50.
The hero headline and buttons also slid in, which pushed mobile LCP to 4.4 s
and hid the first call to action from audit tools.

## Decision

- `main.js` imports the globe on the visitor's first scroll, pointer move,
  pointer down, wheel, touch or key press after `load`, then waits for idle.
- Never on screens 860px wide or less (it sits at half opacity behind the
  copy there) or on save-data. The SVG poster stays.
- The hero poster loads with `fetchpriority="high"` and is visible from the
  first frame (its entrance animates scale only). The headline, intro and
  buttons have no entrance animation.

## Consequences

- Lab tests, which never interact, see no WebGL work.
- Phone visitors always see the still poster, not the live globe.
- The globe appears a moment after the first interaction, not on load.

## Related

- [0008. A trimmed Three.js bundle for the globe](0008-trimmed-threejs-globe.md)
