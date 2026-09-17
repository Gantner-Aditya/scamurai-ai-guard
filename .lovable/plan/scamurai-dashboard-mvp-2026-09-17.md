# SCAMURAI Dashboard MVP

## Goal
Build a production-ready, dark cybersecurity operations dashboard at `/` with realistic simulated threat data, responsive layouts, and polished interactions.

## Experience
- Create a compact command bar with the SCAMURAI identity, active location, simulation control, and four operational KPIs.
- Add a live anomaly stream with severity, source, location, time, and confidence details; selecting any alert opens the security co-pilot.
- Build the right-side co-pilot with simulated CCTV evidence, tracking path, AI assessment, response actions, consultation shortcuts, and incident export.
- Add a hardware health area with functional tabs for Salto doors and Gantner lockers, including status-rich telemetry.
- Build a full-screen incident dossier with summary, audit timeline, evidence snapshots, officer actions, and a working report-download action.

## Interaction Details
- Normal and attack simulation modes will visibly alter the threat stream, KPIs, and system status.
- Alert selection, drawer open/close, telemetry tabs, AI response actions, consultation prompts, dossier opening, and report download will all work.
- Actions will update local dashboard state and show clear confirmation feedback without requiring a backend.
- Motion will be restrained and operational: live indicators, ticker movement, drawer/modal transitions, and evidence overlays, with reduced-motion support.

## Visual Direction
- Use the specified slate command-center palette with semantic critical red, warning amber, and normal green tokens.
- Favor dense, scannable information, sharp hierarchy, compact cards, gridlines, restrained glow, and technical typography.
- Use Lucide icons and familiar Shadcn-style controls while avoiding decorative or generic landing-page patterns.
- Ensure desktop command-center density and a coherent stacked mobile layout.

## Technical Details
- Keep the existing TanStack Start routing structure and implement the requested React/TypeScript experience on the index route.
- Define the full token system and reusable visual utilities in `src/styles.css` using Tailwind v4 conventions.
- Add a leaf-route metadata definition with unique title, description, Open Graph, and Twitter tags.
- Use in-memory seeded data for this MVP; no account, database, or external hardware connection is included.
- Validate compilation automatically, then verify the rendered dashboard and core interactions in the live preview at desktop and mobile sizes.
