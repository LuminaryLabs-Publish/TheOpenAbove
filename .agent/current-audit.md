# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-11T13-10-35-04-00`

## Status

```txt
status: product-acceptance-contract-authority-audited
runtime source changed by this pass: no
branch: main
root .agent state: refreshed
central ledger sync: complete
central internal change log: complete
```

## Summary

The active product is a hot-air-balloon Air Mail mission, but `README.md` and `AGENTS.md` still define the superseded Meadow Lift bird-flight product, controls, objectives and manual smoke. The runtime binds burner, vent and wheel zoom, routes a parcel to Brookhaven, and has no `R` restart consumer.

`npm run check` validates source presence and implementation patterns. It does not prove that runtime bindings, objectives, HUD, public documentation, browser behavior and deployed Pages behavior share one product acceptance contract.

## Plan ledger

**Goal:** define one versioned acceptance contract derived from the admitted product source and consumed by runtime, HUD, documentation, tests, headless tooling and deployment evidence.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove` under the oldest eligible fallback rule.
- [x] Read repository guidance, public copy, runtime, input, HUD, package scripts and smoke tests.
- [x] Identify the interaction loop, domains, kits and services.
- [x] Record the control, objective, restart and product-identity mismatch.
- [x] Define acceptance schema, projections, parity results, fingerprints and evidence.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root `.agent` files.
- [x] Synchronize the central ledger and internal change log.
- [ ] Runtime implementation and executable parity fixtures remain future work.

## Interaction loop

```txt
browser boot
  -> create visual, balloon, airstream and mail domains
  -> create simulation, camera, presentation and telemetry
  -> private keyboard state controls burner and vent
  -> variable-dt RAF advances simulation and delivery
  -> update visuals, render Air Mail HUD and publish GameHost

repository acceptance
  -> read README and AGENTS Meadow Lift instructions
  -> attempt bird controls/objectives and R restart
  -> run source-pattern smoke without browser execution
  -> stale acceptance guidance can remain green
```

## Domains in use

```txt
browser shell and Vite publishing
mutable CDN/ESM admission
legacy Meadow Lift campaign/documentation source
active Air Mail mission source
product mode selection and supersession
control and objective contracts
README, AGENTS and HUD projection
keyboard, blur and wheel input
variable-step simulation and RAF
balloon physics and terrain clearance
airstream route, sampling, blending, force, visuals and debug
mail parcel, town, route, volume and progress
mission lifecycle and restart authority
camera and balloon presentation
procedural balloon construction and materials
quality, atmosphere, terrain, vegetation, grass, water and landmarks
HDR composition and lens/color response
telemetry, HUD and GameHost readback
source smoke, browser acceptance and deployment evidence
headless operations, Vite build and Pages deployment
runtime lifecycle and disposal
```

## Kit inventory

```txt
runtime/gameplay source-backed kits: 15
balloon/presentation source-backed kits: 14
visual environment source-backed kits: 26
tooling source-backed kits: 3
active source-backed total: 58
runtime-implied adapters: 12
inactive legacy kits: 11
```

The exact kit list and per-group services are recorded in `.agent/kit-registry.json` and the timestamped project breakdown.

## Services offered

```txt
burner/vent/blur/wheel input
balloon buoyancy, wind, integration, terrain clearance, snapshots and disposal
airstream route validation, sampling, blend, force, visuals and diagnostics
parcel, route, town, volume and delivery-event services
procedural balloon geometry, materials, rigging, burner, rope and animation
camera follow, basket blend, zoom and clipping
quality, sky, clouds, terrain streaming, grass, water and HDR rendering
telemetry, HUD, GameHost and error projection
source/pure checks, headless operations, Vite build and Pages deployment
```

## Main finding

```txt
runtime: Air Mail / hot-air-balloon / Brookhaven
README + AGENTS: Meadow Lift / bird flight / thermals, gates and perch
runtime controls: burner / vent / wheel zoom
README controls: pitch / bank / boost / R
R runtime consumer: absent
acceptance schema/fingerprint/evidence: absent
browser and Pages parity proof: absent
```

A green source-pattern check is not proof that the documented product is playable.

## Required parent domain

```txt
open-above-product-acceptance-authority-domain
  -> acceptance-contract-schema
  -> product-mode-admission
  -> control-contract
  -> objective-contract
  -> manual-smoke-contract
  -> README/AGENTS/HUD projections
  -> runtime-binding observation
  -> parity result and fingerprints
  -> bounded evidence and journal
  -> pure, browser and Pages fixture gates
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
