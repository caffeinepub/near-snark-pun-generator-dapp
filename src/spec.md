# Specification

## Summary
**Goal:** Ensure all generated puns are explicitly NEAR-focused (always including the literal text "NEAR") while expanding coverage to include comparisons with ICP and other Web3 projects/protocols without increasing false safety rejections.

**Planned changes:**
- Update the backend pun catalog/templates so every generated pun includes the substring "NEAR", including revising any ICP-only or NEAR-omitting templates.
- Expand backend pun/template coverage to produce a meaningful portion of outputs that compare NEAR vs ICP and NEAR vs other Web3 projects/protocols (with NEAR as the primary subject), without changing the existing generatePun(...) API shape.
- Adjust backend content-safety guardrails to avoid incorrectly rejecting legitimate NEAR/ICP/Web3 protocol satire while keeping checks focused on projects/protocols (not protected classes).

**User-visible outcome:** Generating a pun consistently returns a NEAR-referencing joke, with many outputs also including NEAR-vs-ICP and NEAR-vs-other-Web3 comparisons, and fewer “unsafe content” fallbacks for legitimate protocol satire.
