# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-11T13-10-35-04-00`

## Status

```txt
status: product-acceptance-contract-authority-audited
runtime source changed by this pass: no
branch: main
root .agent state: refreshed
central ledger sync: pending until repo-local push completes
```

## Summary

The active product is a hot-air-balloon Air Mail mission, but the repository's public and agent-facing acceptance surfaces still describe the superseded Meadow Lift bird-flight slice. `README.md` and `AGENTS.md` define pitch, bank, boost, thermals, wind gates, perch completion and `R` restart. The runtime instead binds burner, vent and wheel zoom, routes a parcel to Brookhaven, and has no `R` consumer.

`npm run check` validates source presence and selected implementation patterns. It does not prove that public controls, objectives, HUD, repository guidance, browser behavior and deployed behavior describe the same admitted product.

## Plan ledger

**Goal:** define one versioned acceptance contract derived from the admitted product source and consumed by runtime bindings, HUD, documentation, tests, headless tooling and deployment evidence.

- [x] Compare the complete Publish inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove` under the oldest eligible fallback rule.
- [x] Read `AGENTS.md`, `README.md`, `package.json`, `src/main.js`, balloon input and `tests/smoke.mjs`.
- [x] Trace the runtime interaction loop and public/manual acceptance loop.
- [x] Identify all domains, kits and services.
- [x] Record the control, objective, restart and product-identity mismatches.
- [x] Define acceptance schema, projections, parity results, evidence and fixtures.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root `.agent` files.
- [ ] Runtime implementation and executable parity fixtures remain future work.

## Interaction loop

```txt
browser boot
  -> load Three.js and mutable NexusEngine main
  -> create visual, balloon, airstream and mail domains
  -> create balloon simulation, camera, presentation and telemetry
  -> receive burner/vent input through private keyboard state
  -> variable-dt RAF advances simulation and delivery
  -> update airstream, balloon, camera, visual and telemetry
  -> render Air Mail HUD and publish mutable GameHost

repository acceptance loop
  -> contributor reads README and AGENTS
  -> follows Meadow Lift bird controls/objectives
  -> runs npm run check and npm run build
  -> source-pattern smoke passes without opening the product
  -> stale public acceptance contract can be reported as valid
```

## Domains in use

```txt
browser shell and Vite publishing
mutable CDN/ESM dependency admission
legacy Meadow Lift campaign and public documentation source
active Air Mail route, parcel, town and runtime source
product identity, mode selection and supersession
control and objective contracts
repository guidance and public documentation projection
keyboard, blur and wheel input
variable RAF clock
balloon physics and terrain clearance
airstream route, sample, blend, force, visual and debug
mail parcel, route, town, delivery volume and progress
mission session, phase, epoch and restart authority
camera, clipping and balloon presentation
procedural balloon object and materials
quality, resolution, sky, weather and clouds
near/horizon terrain, vegetation, grass, water and landmarks
HDR composition, grade and lens response
telemetry, HUD and mutable GameHost projection
source smoke, acceptance fixtures and evidence
headless operations, Vite build and Pages deployment
runtime lifecycle and disposal
```

## Complete kit inventory

```txt
runtime/gameplay source-backed kits: 15
balloon/presentation source-backed kits: 14
visual environment source-backed kits: 26
tooling source-backed kits: 3
runtime-implied adapters: 12
inactive legacy kits: 11
```

The exact inventory and per-kit service map are recorded in:

```txt
.agent/trackers/2026-07-11T13-10-35-04-00/project-breakdown.md
.agent/kit-registry.json
```

## Services offered

```txt
browser key polling, burner/vent control, blur retirement and wheel zoom
balloon buoyancy, wind integration, terrain clearance, mesh projection, snapshots and listener disposal
airstream route validation, nearest-segment sampling, field blending, force application, visuals and diagnostics
parcel construction/reset, route/town source, delivery-volume sampling and delivery events
camera follow, basket mode, zoom, clipping and disposal
procedural balloon geometry, rigging, burner, rope, materials and animation
quality, terrain, atmosphere, grass, water and HDR rendering
telemetry resources/events, HUD projection and GameHost readback
source smoke, pure tests, headless project operations, Vite build and Pages deployment
```

## Primary finding

```txt
runtime product: Air Mail hot-air-balloon mission
package description: Air Mail-compatible hot-air-balloon experience
README product: Meadow Lift bird free-flight
AGENTS product and manual smoke: Meadow Lift bird free-flight
runtime controls: burner / vent / wheel zoom
README controls: pitch / bank / boost / R restart
runtime R restart: absent
runtime objectives: enter correct current and deliver to Brookhaven
README/AGENTS objectives: thermals / wind gates / perch / Cloud Basin
npm run check docs parity: absent
npm run check browser interaction proof: absent
acceptance schema/fingerprint/evidence: absent
```

A contributor can satisfy the current automated check while the documented product, controls, objectives and restart instructions remain impossible in the shipped runtime.

## Required parent domain

```txt
open-above-product-acceptance-authority-domain
```

Core coordinating kits:

```txt
open-above-acceptance-contract-schema-kit
open-above-product-mode-admission-kit
open-above-control-contract-kit
open-above-objective-contract-kit
open-above-manual-smoke-contract-kit
open-above-documentation-projection-kit
open-above-agent-guidance-projection-kit
open-above-hud-contract-projection-kit
open-above-runtime-binding-observation-kit
open-above-acceptance-parity-result-kit
open-above-acceptance-fingerprint-kit
open-above-acceptance-evidence-kit
open-above-acceptance-journal-kit
open-above-product-acceptance-fixture-kit
open-above-browser-acceptance-smoke-kit
open-above-pages-acceptance-smoke-kit
```

## Required invariant

```txt
one accepted product source
  = one selected mode and mission
  = one control contract
  = one objective contract
  = one HUD projection
  = one README and AGENTS projection
  = one executable acceptance matrix
  = one product/acceptance fingerprint
  = one bounded evidence result
```

## Ordered safe ledges

```txt
1. immutable runtime admission
2. import purity and frame ownership
3. runtime session lifecycle and ordered disposal
4. fixed-step clock and sequenced input
4a. product source supersession and acceptance contract parity
5. Air Mail route and delivery authority
5a. Air Mail mission restart transaction and mission epoch
6. terrain near/horizon continuity and work budget
```

Documentation only. No runtime source, dependency, package script, route behavior, renderer behavior or deployment configuration changed.
