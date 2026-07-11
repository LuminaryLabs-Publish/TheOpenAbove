# Project Breakdown: TheOpenAbove Grass Spatial Culling Authority

**Timestamp:** `2026-07-11T18-01-38-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

## Summary

The active grass domain rebuilds deterministic chunks around the camera, but every chunk mesh remains at the scene origin because its instances use absolute world-space transforms. The culling pass measures `camera.position.distanceTo(mesh.position)`, so every chunk receives the same distance-to-origin result instead of a distance to its own spatial bounds.

With the current `520 m` chunk size and `4.2` multiplier, every generated grass chunk is visible while the camera is within `2184 m` of the global origin and every generated grass chunk is hidden after the camera crosses that radius, including the newly rebuilt center chunk surrounding the camera. The culling kit can also report `webgpu-compute` without constructing or dispatching a GPU compute pipeline.

## Plan ledger

**Goal:** preserve deterministic camera-centered grass while establishing truthful chunk identity, bounds, LOD, culling execution, visible-set commit and rendered-frame observation.

- [x] Compare the complete accessible `LuminaryLabs-Publish` inventory with central tracking.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger entries and root `.agent` state.
- [x] Select only `LuminaryLabs-Publish/TheOpenAbove` as the oldest eligible central entry.
- [x] Read root guidance, current `.agent` routing, retained grass audits and validation surfaces.
- [x] Trace grass candidate placement, LOD classification, chunk rebuild, manual culling, state readback and visual frame order.
- [x] Identify the complete interaction loop.
- [x] Identify all active domains.
- [x] Identify every active, implied and inactive legacy kit.
- [x] Identify the services offered by the kits.
- [x] Document the global-origin culling defect and backend-truth mismatch.
- [x] Define a grass spatial-culling authority domain and fixture gate.
- [x] Change no runtime, package, dependency, route, renderer or deployment behavior.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable grass traversal fixtures remain future work.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-undocumented eligible repositories: 0

TheOpenAbove       2026-07-11T16-30-25-04-00 selected
HorrorCorridor     2026-07-11T16-38-10-04-00
PhantomCommand     2026-07-11T16-49-51-04-00
ZombieOrchard      2026-07-11T17-01-11-04-00
TheUnmappedHouse   2026-07-11T17-10-50-04-00
AetherVale         2026-07-11T17-20-20-04-00
IntoTheMeadow      2026-07-11T17-30-56-04-00
PrehistoricRush    2026-07-11T17-39-47-04-00
MyCozyIsland       2026-07-11T17-50-37-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/TheOpenAbove` was changed in the Publish organization.

## Interaction loop

```txt
browser boot
  -> create visual domain
  -> create terrain surface
  -> create grass field domain

first grass update
  -> round camera position to 520 m chunk center
  -> classify required offsets by chunk distance
  -> generate deterministic world-space candidates
  -> encode absolute world positions in instance matrices
  -> keep each InstancedMesh transform at scene origin

subsequent frame
  -> camera and balloon advance
  -> grass center may rebuild around camera
  -> for every active grass mesh:
       distance = camera.position.distanceTo(mesh.position)
       mesh.position is the global origin for every chunk
       visible = distance <= 520 * 4.2
  -> render current grass visible set
  -> expose backend, chunk count and instance count only
```

## Source-backed defect

```txt
chunkSize: 520 m
manual cull radius: 520 * 4.2 = 2184 m
mesh transform: identity at 0,0,0
instance transforms: absolute world positions
manual distance for every chunk: camera distance to 0,0,0
```

Consequences:

```txt
inside origin radius:
  all generated grass chunks pass the same manual cull decision

outside origin radius:
  all generated grass chunks fail the same manual cull decision
  including the center chunk generated around the camera

camera-centered rebuild:
  does not repair visibility because the new mesh also remains at origin
```

## Backend-truth defect

```txt
navigator.gpu exists
  -> state.backend = webgpu-compute

actual runtime path
  -> no GPU device request
  -> no compute pipeline
  -> no storage buffers
  -> no command encoder
  -> no dispatchWorkgroups call
  -> cullChunk performs one CPU scalar distance comparison
  -> dispatchedWorkgroups increments anyway
```

The current backend name and workgroup counter can therefore claim GPU compute behavior that did not occur.

## Domains in use

```txt
browser shell and Vite publishing
mutable CDN and ESM runtime admission
legacy Meadow Lift and active Air Mail product sources
product controls, objectives, acceptance and supersession
keyboard, blur, wheel and variable RAF time
balloon simulation, airstream force, terrain clearance and snapshots
airstream routes, field sampling, visuals and diagnostics
mail parcel, route, towns, delivery volumes, progress and reset
mission lifecycle, delivery, restart and epoch authority
camera, clipping, presentation and procedural balloon construction
quality, dynamic resolution, sky, weather, clouds and lighting
terrain source, near/horizon streaming, LOD transition and continuity
vegetation, streamed grass, water and landmarks
grass deterministic placement, chunk LOD, culling and state projection
HDR rendering, lens response and renderer diagnostics
Nexus telemetry, HUD, GameHost and headless readback
runtime lifecycle, validation, build and Pages deployment
committed observation, terrain transition and grass spatial-culling authority
```

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

### Balloon object and presentation

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

## Runtime-implied kits

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

## Inactive legacy kits

```txt
open-above-hot-air-balloon-envelope-kit
open-above-grass-detail-kit
open-above-bloom-kit
open-above-god-ray-kit
open-above-auto-exposure-kit
open-above-bird-camera-kit
open-above-bird-posture-kit
open-above-bird-dive-domain-kit
open-above-bird-flight-frame-kit
open-above-bird-flight-input-kit
open-above-bird-flight-physics-kit
```

## Services offered

```txt
browser boot, import resolution, route hosting and fatal-error projection
burner, vent, blur and wheel input
balloon buoyancy, wind integration, terrain clearance, snapshots and disposal
airstream route validation, sampling, blending, force adaptation, visuals and diagnostics
parcel construction, route, town, volume, progress, delivery event and reset
procedural balloon geometry, fabric, basket, rigging, burner, rope and animation
camera follow, basket mode, zoom, clipping and disposal
quality selection, dynamic resolution, sky, weather, clouds, lighting and atmosphere
terrain height, color, near chunks, horizon annulus, LOD and disposal
vegetation clustering, deterministic grass candidate generation and grass shader wind
grass quality/distance LOD profiles and camera-centered chunk rebuild
manual grass chunk culling and aggregate backend/chunk/instance readback
water, landmarks, HDR composition, lens response and renderer statistics
Nexus resource/event telemetry, HUD, GameHost and headless readback
source smoke, pure mail/airstream tests, Vite build and Pages deployment
```

## Required parent domain

```txt
open-above-grass-spatial-culling-authority-domain
  -> open-above-grass-chunk-identity-kit
  -> open-above-grass-chunk-world-bounds-kit
  -> open-above-grass-camera-center-revision-kit
  -> open-above-grass-lod-classification-kit
  -> open-above-grass-cull-policy-kit
  -> open-above-grass-cull-distance-kit
  -> open-above-grass-backend-capability-kit
  -> open-above-grass-backend-selection-kit
  -> open-above-grass-culling-execution-kit
  -> open-above-grass-cull-decision-kit
  -> open-above-grass-visible-set-commit-kit
  -> open-above-grass-stale-decision-rejection-kit
  -> open-above-grass-cull-observation-kit
  -> open-above-grass-frame-acknowledgement-kit
  -> open-above-grass-culling-journal-kit
  -> open-above-grass-traversal-fixture-kit
```

## Required invariant

```txt
for each active grass chunk:
  cull distance is measured from camera to that chunk's committed bounds
  intended LOD and visibility use the same camera-center and quality revision
  a camera-centered required chunk cannot disappear because of global-origin distance
  reported backend equals the execution path that produced the decision
  reported workgroup count reflects actual GPU dispatches only
  visible-set observations identify chunk, bounds, LOD, decision and frame
```

## Required fixtures

```txt
fixture:grass-chunk-world-bounds
fixture:grass-cull-distance
fixture:grass-origin-crossing
fixture:grass-camera-centered-retention
fixture:grass-visible-set
fixture:grass-lod-cull-revision
fixture:grass-cpu-backend-truth
fixture:grass-webgpu-backend-truth
fixture:grass-no-false-workgroup-count
fixture:grass-first-visible-frame
fixture:grass-pages-traversal-parity
```

## Validation boundary

This pass inspected checked-in source only. It did not execute Node tests, Vite build, browser/WebGL rendering, WebGPU compute, headless tools or the deployed Pages route.

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
render behavior changed: no
deployment changed: no
branch created: no
pull request created: no
```
