# START HERE: TheOpenAbove

**Last aligned:** `2026-07-11T09-21-50-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

## Summary

`TheOpenAbove` currently executes an altitude-routing hot-air-balloon Air Mail loop, but the repository still declares Meadow Lift free-flight objectives and controls through `README.md`, `AGENTS.md` and `src/data/campaign.config.js`. The active session therefore combines `mail-flight`, `meadow-mail-run` and Brookhaven with the legacy `meadow-lift` region and obsolete control documentation.

The current audit defines a product-source supersession authority boundary so one versioned manifest owns the active mode, objective, controls, runtime source graph, HUD copy, snapshots, tests and public documentation.

## Plan ledger

**Goal:** replace the implicit Meadow Lift/Air Mail source split with one admitted product mode and prove parity across runtime, controls, HUD, GameHost, headless tools and public documentation.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are tracked and have root `.agent` state.
- [x] Select only `TheOpenAbove` as the oldest eligible central-ledger entry.
- [x] Trace the active browser interaction loop.
- [x] Identify all active, implied and inactive domains.
- [x] Catalog all source-backed kits and kit-family services.
- [x] Trace Meadow Lift, balloon drift and Air Mail source identities.
- [x] Trace documentation/runtime control drift.
- [x] Define product manifest, supersession, source admission and parity fixtures.
- [x] Add timestamped architecture, render, gameplay, interaction, source-authority and deploy audits.
- [x] Refresh required root `.agent` files and kit registry.
- [x] Push documentation only to `main`.
- [x] Synchronize `LuminaryLabs-Dev/LuminaryLabs`.
- [ ] Runtime implementation and executable parity fixtures remain future work.

## Selection result

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or ledger-missing eligible repositories: 0
root-undocumented eligible repositories: 0
selected: TheOpenAbove
excluded: TheCavalryOfRome
```

`TheOpenAbove` was the oldest eligible central entry before this run.

## Read first

```txt
.agent/trackers/2026-07-11T09-21-50-04-00/project-breakdown.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
```

Then read:

```txt
.agent/turn-ledger/2026-07-11T09-21-50-04-00.md
.agent/architecture-audit/2026-07-11T09-21-50-04-00-product-source-supersession-dsk-map.md
.agent/render-audit/2026-07-11T09-21-50-04-00-mixed-product-identity-projection-gap.md
.agent/gameplay-audit/2026-07-11T09-21-50-04-00-meadow-lift-air-mail-source-split-loop.md
.agent/interaction-audit/2026-07-11T09-21-50-04-00-control-contract-parity-map.md
.agent/source-authority-audit/2026-07-11T09-21-50-04-00-product-mode-manifest-contract.md
.agent/deploy-audit/2026-07-11T09-21-50-04-00-product-source-parity-fixture-gate.md
```

## Active interaction loop

```txt
browser resolves Three.js and NexusEngine ESM
  -> imports legacy CAMPAIGN/WORLD source
  -> visual domain creates terrain, horizon, atmosphere, grass, water and postprocess
  -> airstream domain creates three routes, samples and visuals
  -> mail domain independently creates Air Mail route, parcel, towns and volumes
  -> keyboard state drives burner and vent
  -> variable-dt RAF updates simulation
  -> airstream flow changes horizontal movement and lift
  -> delivery-volume membership may deliver Brookhaven parcel
  -> camera and visual domains update
  -> telemetry snapshots before render
  -> HDR render and hard-coded HUD update
  -> mutable GameHost exposes the live graph
```

## Product-source finding

```txt
README and AGENTS.md
  -> Meadow Lift
  -> thermals, gates, perch, Cloud Basin
  -> pitch/bank/boost/restart controls

campaign.config.js
  -> region meadow-lift
  -> Cloud Basin
  -> thermal/gate/perch objective values
  -> old free-flight parameters

active runtime
  -> hot-air-balloon Air Mail
  -> meadow-mail-run
  -> Brookhaven parcel
  -> burner/vent altitude routing
```

Runtime snapshots combine `status: mail-flight` with `region: meadow-lift`. HUD and simulation strings hard-code Brookhaven. Public controls document A/D banking and R restart, while runtime ignores A/D and R and instead accepts Space/W/Up for burner and S/Down/Shift for vent.

## Domains in use

```txt
browser shell and Vite publishing
mutable CDN source admission
legacy Meadow Lift campaign/world source
active Air Mail route/parcel/town source
keyboard, blur and wheel input
variable RAF timing
balloon buoyancy and terrain clearance
airstream route validation and sampling
airstream field blending and balloon-force adaptation
airstream visuals and diagnostics
parcel state, delivery volume and town visuals
camera follow, basket mode, clipping and zoom
quality tier and dynamic resolution
physical sky, light, weather and clouds
near and horizon terrain streaming
terrain color, vegetation, grass, water and landmarks
HDR composition, grading and lens response
telemetry, HUD and mutable GameHost projection
partial lifecycle and disposal
source smoke, pure tests, headless routing and Pages deployment
```

Missing authority domains:

```txt
product manifest and selected-mode authority
mode supersession or migration
control-contract authority
objective-source selection
source admission result and fingerprint
HUD/documentation projection from source
committed product-frame identity
```

## Services offered

- Balloon simulation: key polling, airstream sampling, buoyancy, integration, terrain clearance, balloon projection, snapshots and listener disposal.
- Airstream route/sampler/field: route validation, nearest-segment geometry, influence, capture, routed velocity, overlap blending and ambient fallback.
- Airstream domain: flow application, route visuals, diagnostics, snapshots and disposal.
- Mail route/parcel/delivery: town and parcel descriptors, correct-current declaration, delivery-volume sampling, selected-route mutation, delivery event, parcel reset, snapshots and disposal.
- Balloon object/presentation: procedural envelope, mouth, seams, basket, rigging, burner, ropes, materials, camera rig and clipping fade.
- Visual domain: quality, dynamic resolution, sky, lighting, weather, clouds, terrain, vegetation, grass, water, landmarks, HDR composition, grading, render statistics and disposal.
- Tooling/proof: telemetry projection, HUD, GameHost, source smoke, pure airstream/mail tests, headless status/inspect/renderer/check/build and Pages deployment.

## Active source-backed kits

### Runtime and gameplay

```txt
open-above-balloon-simulation-kit
open-above-balloon-telemetry-kit
open-above-airstream-domain
open-above-airstream-route-kit
open-above-airstream-sampler-kit
open-above-airstream-field-kit
open-above-airstream-balloon-force-kit
open-above-airstream-visual-kit
open-above-airstream-debug-kit
open-above-mail-delivery-domain
open-above-mail-parcel-kit
open-above-mail-route-kit
open-above-delivery-volume-kit
open-above-delivery-progress-kit
open-above-mail-town-kit
```

### Balloon and presentation

```txt
open-above-hot-air-balloon-object-kit
open-above-balloon-envelope-panel-kit
open-above-balloon-mouth-kit
open-above-balloon-streamer-fit-kit
open-above-balloon-fabric-seam-kit
open-above-hot-air-balloon-basket-kit
open-above-hot-air-balloon-rigging-kit
open-above-hot-air-balloon-burner-kit
open-above-rope-kit
open-above-balloon-presentation-domain
open-above-envelope-fabric-material-kit
open-above-basket-material-kit
open-above-balloon-camera-rig-kit
open-above-clipping-fade-kit
```

### Visual environment

```txt
open-above-visual-domain
open-above-quality-tier-kit
open-above-dynamic-resolution-kit
open-above-physical-sky-kit
open-above-sun-light-kit
open-above-aerial-perspective-kit
open-above-cloud-weather-map-kit
open-above-volumetric-cloud-kit
open-above-cloud-lod-kit
open-above-cloud-lighting-kit
open-above-terrain-surface-kit
open-above-terrain-chunk-streaming-kit
open-above-terrain-horizon-streaming-kit
open-above-vegetation-cluster-kit
open-above-grass-world-seed-kit
open-above-grass-biome-density-kit
open-above-grass-exclusion-mask-kit
open-above-grass-chunk-placement-kit
open-above-grass-lod-kit
open-above-grass-compute-culling-kit
open-above-grass-field-domain
open-above-water-surface-kit
open-above-distant-landmark-kit
open-above-hdr-composer-kit
open-above-color-grade-kit
open-above-lens-response-kit
```

### Tooling and proof

```txt
open-above-headless-editor-environment
open-above-static-smoke-test-kit
open-above-airstream-mail-test-kit
```

## Ordered safe ledges

```txt
1. Immutable Runtime Admission + Boot Capability Fixture Gate
2. Import-Pure Balloon Object Kit + Frame Ownership Fixture Gate
3. Runtime Session Lifecycle + Ordered Disposal/Reboot Fixture Gate
4. Fixed-Step Simulation Clock + Visibility/Input Parity Fixture Gate
4a. Product Source Supersession + Mode/Controls/HUD/Docs Parity Fixture Gate
5. Air Mail Route and Delivery Authority + Correct-Current Fixture Gate
5a. Air Mail Restart Transaction + Mission Epoch/First-Frame Fixture Gate
6. Terrain Surface/Horizon Authority + Continuity/Work-Budget Fixture Gate
```

## Guardrails

```txt
Push only to main.
Create no branches or pull requests.
Do not work on TheCavalryOfRome.
Preserve altitude-only balloon routing.
Keep renderer code presentation-only.
Select exactly one product mode per runtime session.
Do not hard-code authoritative destination or control copy in HUD code.
Do not claim browser or deployment success without execution evidence.
```
