# Project Breakdown: TheOpenAbove Terrain LOD Transition Authority

**Timestamp:** `2026-07-11T16-30-25-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

## Summary

The near terrain streamer reclassifies retained chunks when their distance-based LOD changes. The far-horizon streamer does not. A retained horizon chunk keeps the segment count chosen when it was first created, even after camera movement places it in a different `segmentsForDistance()` band.

This pass documents one terrain-streaming authority that owns chunk identity, intended LOD, built geometry revision, transition planning, work budgets, edge policy, atomic replacement and observable results.

## Plan ledger

**Goal:** make the geometry actually rendered for every near and horizon chunk match the current terrain source revision and current distance-based LOD policy without unbounded synchronous rebuilds or visible replacement gaps.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare all nine eligible repositories with `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Confirm every eligible repository has a central ledger entry and root `.agent` state.
- [x] Select only `LuminaryLabs-Publish/TheOpenAbove` as the oldest eligible central-ledger entry.
- [x] Read the current root `.agent` state and retained terrain audits.
- [x] Read `terrain-surface-kit.js`, `terrain-chunk-streaming-kit.js`, `terrain-horizon-streaming-kit.js` and `visual-domain.js`.
- [x] Identify the runtime interaction loop.
- [x] Identify all active domains.
- [x] Identify all source-backed kits, runtime-implied adapters and offered services.
- [x] Trace near and horizon chunk membership, LOD selection, geometry creation, replacement and disposal.
- [x] Record the retained-horizon-chunk LOD staleness path.
- [x] Define the DSK/domain and fixture boundary for terrain LOD transition authority.
- [x] Add timestamped architecture, render, interaction, terrain, performance and deploy audits.
- [x] Refresh the required root `.agent` documents.
- [x] Change no runtime source, package script, dependency, route, renderer or workflow.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement the authority and executable fixtures in a future runtime pass.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-undocumented eligible repositories: 0

TheOpenAbove       2026-07-11T14-50-59-04-00 selected
HorrorCorridor     2026-07-11T15-01-33-04-00
PhantomCommand     2026-07-11T15-08-41-04-00
ZombieOrchard      2026-07-11T15-20-27-04-00
TheUnmappedHouse   2026-07-11T15-30-50-04-00
AetherVale         2026-07-11T15-38-27-04-00
IntoTheMeadow      2026-07-11T15-49-49-04-00
PrehistoricRush    2026-07-11T15-59-12-04-00
MyCozyIsland       2026-07-11T16-10-58-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/TheOpenAbove` was changed in the Publish organization.

## Interaction loop

```txt
browser boot
  -> create visual domain
  -> create terrain surface
  -> create near chunk streamer
  -> create horizon chunk streamer

visual RAF update
  -> visual.update
  -> terrain.update(camera, weather)
  -> near streamer update
       -> round camera to 520 m chunk center
       -> derive required keys and intended LOD
       -> remove missing or wrong-LOD meshes
       -> synchronously build missing meshes
  -> horizon streamer update
       -> round camera to 1040 m coarse center
       -> derive required keys
       -> remove keys outside the annulus
       -> synchronously build only new keys
       -> retain existing keys without LOD reclassification
  -> render the current near and horizon mesh maps
```

## Source-backed retained-LOD failure

```txt
initial horizon center: 0:0
horizon chunk key: 5:0
initial distance: 5200 m
segmentsForDistance(5200): 4
mesh is created with 4 x 4 segments

camera advances until horizon center: 2:0
same chunk distance: 3120 m
segmentsForDistance(3120): 10
required set still contains 5:0
chunks.has("5:0") is true
createChunk is skipped
mesh remains 4 x 4 instead of 10 x 10
```

The reverse path is also possible: a previously near-horizon 10-segment chunk can remain over-detailed after it moves into a 6- or 4-segment band. The actual geometry cost and visible detail therefore depend on chunk history, not only current camera position and declared policy.

## Near versus horizon behavior

```txt
near streamer
  stores x, z and lod in mesh.userData.chunk
  recomputes intended lod for every required key
  removes retained meshes when actual lod != intended lod
  rebuilds the key at the new lod

horizon streamer
  stores x and z only in mesh.userData.horizonChunk
  computes segments only inside buildGeometry
  required set stores keys only
  skips every retained key
  exposes no intended or actual lod observation
```

## Domains in use

```txt
browser shell and Vite publishing
mutable CDN and ESM runtime admission
legacy Meadow Lift and active Air Mail product sources
product controls, objective, acceptance and supersession
keyboard, blur, wheel and variable RAF time
balloon simulation, terrain clearance and snapshots
airstream route, sampling, field, force, visual and diagnostics
mail parcel, route, town, delivery volume, progress and reset
mission lifecycle, restart, delivery and epoch authority
camera, balloon presentation, clipping and procedural construction
quality, dynamic resolution, sky, weather, clouds and lighting
terrain source, near streaming, horizon streaming and LOD transitions
vegetation, grass, water and landmarks
HDR rendering, lens response and renderer diagnostics
Nexus telemetry, HUD, GameHost and headless readback
runtime lifecycle, checks, build and Pages deployment
committed observation and terrain transition authority
```

## Kit census

```txt
runtime/gameplay source-backed kits: 15
balloon/presentation source-backed kits: 14
visual-environment source-backed kits: 26
tooling/proof source-backed kits: 3
active source-backed total: 58
runtime-implied adapters: 12
inactive legacy kits: 11
```

### Runtime and gameplay kits

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

### Balloon object and presentation kits

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

### Visual environment kits

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

### Tooling and proof kits

```txt
open-above-headless-editor-environment
open-above-static-smoke-test-kit
open-above-airstream-mail-test-kit
```

### Runtime-implied adapters

```txt
open-above-route-shell-kit
open-above-importmap-kit
open-above-runtime-composer-kit
open-above-keyboard-input-kit
open-above-wheel-zoom-input-kit
open-above-hud-projection-kit
open-above-error-panel-kit
open-above-gamehost-legacy-readback-kit
open-above-nexusengine-cdn-adapter-kit
open-above-campaign-source-kit
open-above-raf-clock-adapter-kit
open-above-pages-deploy-kit
```

## Services offered

```txt
burner, vent, blur and wheel input
balloon buoyancy, wind integration, clearance, state projection and disposal
airstream validation, sampling, blending, force adaptation, visuals and diagnostics
parcel construction, route, town, delivery-volume, progress, event and reset services
procedural balloon geometry, materials, rigging, burner, ropes and animation
camera follow, basket mode, zoom, clipping and disposal
quality selection, dynamic resolution, sky, clouds, lighting and atmosphere
terrain height/color source, near chunks, horizon annulus, LOD geometry and disposal
vegetation clusters, grass placement/culling/LOD, water and landmark projection
HDR composition, lens response, renderer statistics and frame submission
Nexus resources/events, HUD, errors, GameHost and headless readback
source checks, pure tests, Vite build and Pages deployment
```

## Required parent domain

```txt
open-above-terrain-lod-transition-authority-domain
  -> open-above-terrain-chunk-identity-kit
  -> open-above-terrain-source-revision-kit
  -> open-above-terrain-lod-policy-kit
  -> open-above-terrain-lod-classification-kit
  -> open-above-terrain-lod-transition-plan-kit
  -> open-above-terrain-geometry-build-request-kit
  -> open-above-terrain-build-budget-kit
  -> open-above-terrain-geometry-build-result-kit
  -> open-above-terrain-edge-stitch-policy-kit
  -> open-above-terrain-atomic-replacement-kit
  -> open-above-terrain-chunk-observation-kit
  -> open-above-terrain-lod-journal-kit
  -> open-above-terrain-lod-fixture-kit
```

## Required invariant

```txt
for every active terrain chunk key:
  intended LOD = policy(camera, chunk, quality, terrain revision)
  actual geometry LOD = intended LOD
  actual terrain revision = current terrain revision
  replacement is either old-complete or new-complete
  no missing or partially built chunk becomes visible
  frame build work stays within the admitted budget
  observation reports intended and actual identities
```

## Validation state

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
render behavior changed: no
deployment workflow changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser smoke: not run
terrain LOD reclassification fixture: unavailable
terrain atomic replacement fixture: unavailable
terrain build-budget fixture: unavailable
Pages terrain transition fixture: unavailable
```

Documentation only. No terrain-transition correctness or performance-budget claim is made until the required fixtures exist and pass.