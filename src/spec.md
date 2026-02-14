# Specification

## Summary
**Goal:** Build a single-page dapp that generates condescending, sassy NEAR-themed puns (always including the word "NEAR"), backed by a Motoko canister, with a cohesive snarky visual theme and simple sharing via copy-to-clipboard.

**Planned changes:**
- Create a single-page UI with an app title, a primary “Generate pun” button, a display area for the current pun, and a session list of the 10 most recent puns.
- Add a “Copy” action for the current pun with a visible success state.
- Implement a single Motoko main actor query method (e.g., `getPun`) that returns a randomly generated, template-based pun as `Text`, always containing “NEAR”.
- Add basic backend safety guardrails: templates avoid slurs/protected-class attacks; include a configurable banned-terms filter to reject unsafe outputs.
- Connect frontend to canister using the generated actor; use React Query for loading, error, success states, and provide retry on error.
- Apply a consistent snarky theme (not primarily blue/purple) with clear styling for primary/secondary actions and loading/error states; ensure responsive layout.
- Add a static assets section that loads branding images from `frontend/public/assets/generated`, showing the logo in the header and applying a subtle background pattern.

**User-visible outcome:** Users can open the landing page, click “Generate pun” to fetch a new NEAR-mocking pun from the canister with clear loading/error feedback, copy the current pun, and see a list of their recent puns—within a consistent snarky-themed UI featuring the provided logo and background.
