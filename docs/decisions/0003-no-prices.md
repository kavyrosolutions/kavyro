# 0003. No prices anywhere on the site

Status: Accepted
Date: 2026-10-01

## Context

Fees depend on the role, hours and scope of each engagement. A published
price either undersells a larger engagement or scares off a smaller one, and
"affordable" copy cheapens the positioning in
[0002](0002-outsourcing-positioning.md).

## Decision

No prices, packages, payment terms, billing language or "affordable"-type copy
on any page. Fees are left to the proposal. Calls to action lead to the
enquiry form instead.

## Consequences

- Visitors who want a number must enquire, which is the point.
- Every copy change, including FAQs and JSON-LD, is checked against this rule.
  No `offers`/`price` fields in structured data.
- `tools/check-site.js` fails a PR whose page text contains `$` amounts,
  "price", "pricing", "affordable", "per month" or "/mo".

## Related

- [0002. Position as an offshore outsourcing partner](0002-outsourcing-positioning.md)
- [0004. Only claims we can stand behind](0004-only-defensible-claims.md)
