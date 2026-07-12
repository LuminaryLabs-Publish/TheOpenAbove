# Project Breakdown: TheOpenAbove

**Timestamp:** `2026-07-12T15-31-24-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Runtime revision reviewed:** `c2b96fa4d0dc44f6f3cf52762834324e712ed7d9`

## Summary

TheOpenAbove is a browser-based Air Mail balloon experience with procedural balloon construction, deterministic world generation, camera-relative terrain and flora streaming, authored towns and routes, HDR presentation, a parchment map, Nexus telemetry and headless proof surfaces.

The current audit isolates vegetation spatial coverage. Terrain, grass and flowers update around the moving camera, but trees are generated once at boot into two global `InstancedMesh` objects. The generated tree clusters cover only a central subset of the 10,000-unit-radius world, have no camera-relative requirements or chunk identity, are absent from the frame update path, expose no disposal service and publish no coverage or visible-frame result.

## Plan ledger

**Goal:** preserve deterministic tree placement while making vegetation coverage camera-relative, world-bound, budgeted, atomically adopted and provable across source, browser and Pages execution.

- [x] Compare the full accessible `LuminaryLabs-Publish` inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger entries and root `.agent` state.
- [x] Select only `TheOpenAbove` by the oldest eligible central timestamp.
- [x] Inspect world configuration, flight movement, visual composition, vegetation construction, terrain/flora streaming, snapshots and validation scripts.
- [x] Identify the complete interaction loop.
- [x] Reconcile all active domains.
- [x] Preserve all 68 active source-backed kits and their offered services.
- [x] Trace boot-only vegetation placement against camera-relative world traversal.
- [x] Define vegetation coverage, identity, budget, adoption, retirement, observation and proof contracts.
- [x] Add a timestamped architecture and system-audit family.
- [x] Refresh required root `.agent` documents and the machine registry.
- [x] Update central tracking directly on `main`.
- [x] Create no branch or pull request.
- [ ] Runtime implementation and executable vegetation-spatial fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
selected: LuminaryLabs-Publish/TheOpenAbove
selection reason: oldest eligible central ledger timestamp
excluded: LuminaryLabs-Publish/TheCavalryOfRome
other Publish repositories changed: 0
```

## Interaction loop

```txt
boot
  -> create deterministic world artifact
  -> create camera-relative near/horizon terrain
  -> create one boot-time central vegetation field
  -> create camera-relative grass and flower domains
  -> create balloon, routes, mail, camera, map and renderer
  -> start RAF

flight frame
  -> integrate unbounded horizontal balloon position
  -> update mail and airstream state
  -> move camera with the balloon
  -> update terrain around the camera
  -> update grass and flower chunk windows around the camera
  -> keep boot-time tree instances unchanged
  -> render HDR frame

long traversal
  -> camera and streamed ground move beyond boot-time tree coverage
  -> terrain and low vegetation continue rebuilding
  -> tree coverage has no requirement, admission or visible result
```

## Domains in use

```txt
browser shell, canvas, map and fatal projection
runtime boot, session, input, RAF and public host
balloon simulation, steering, airstream and mail
seeded world generation, membership and authored route/town/lake anchors
terrain streaming-frame classification and near/horizon ownership
vegetation cluster placement and tree-instance presentation
grass and flower chunk placement, LOD, culling and wind
balloon object construction, materials, rigging and presentation
quality selection, dynamic resolution, sky, clouds, water, HDR and lens response
map projection, telemetry, headless inspection, tests, build and Pages deployment
```

## Active kits and offered services

### Runtime and gameplay, 15

```txt
open-above-balloon-simulation-kit
  keyboard state, burner/vent/steering integration, airstream force, terrain clearance, snapshots
open-above-balloon-telemetry-kit
  Nexus telemetry composition and state publication
open-above-airstream-domain
  route field, visual/debug ownership, sampling, update, snapshot and disposal
open-above-airstream-route-kit
  authored route descriptors
open-above-airstream-sampler-kit
  route distance, influence and blended sample production
open-above-airstream-field-kit
  immutable route set and ambient/route field sampling
open-above-airstream-balloon-force-kit
  airstream-to-flight-state force adaptation
open-above-airstream-visual-kit
  route visual construction and active-route presentation
open-above-airstream-debug-kit
  diagnostic route/sample projection
open-above-mail-delivery-domain
  parcel, town visual, update, snapshot, reset and disposal composition
open-above-mail-parcel-kit
  parcel state construction and reset
open-above-mail-route-kit
  town, destination and correct-current descriptors
open-above-delivery-volume-kit
  destination volume sampling
open-above-delivery-progress-kit
  current selection, delivery admission and event production
open-above-mail-town-kit
  town visual construction, destination emphasis and disposal
```

### Balloon object and presentation, 15

```txt
open-above-hot-air-balloon-object-kit
  profile composition, procedural model construction, deferred loading and animation
open-above-balloon-envelope-profile-kit
  envelope shape/profile descriptors
open-above-balloon-envelope-panel-kit
  triangulated envelope panel construction
open-above-balloon-mouth-kit
  open mouth geometry
open-above-balloon-streamer-fit-kit
  fitted fabric pattern streamers
open-above-balloon-fabric-seam-kit
  envelope seam geometry
open-above-hot-air-balloon-basket-kit
  basket geometry and rider anchors
open-above-hot-air-balloon-rigging-kit
  rigging construction and tension animation
open-above-hot-air-balloon-burner-kit
  burner geometry, flame and heat animation
open-above-rope-kit
  segmented rope construction
open-above-balloon-presentation-domain
  envelope/gondola secondary motion
open-above-envelope-fabric-material-kit
  fabric material construction
open-above-basket-material-kit
  basket material construction
open-above-balloon-camera-rig-kit
  wheel zoom, third-/first-person blend, follow camera and clipping state
open-above-clipping-fade-kit
  balloon visibility fading near first-person view
```

### Visual, world and environment, 33

```txt
open-above-visual-domain
  scene, renderer, camera, world/environment composition, update, render, resize and partial disposal
open-above-world-generation-kit
  seeded grid build, anchor protection, erosion/flow, climate/biome/flora, disk membership and map color
open-above-quality-tier-kit
  device-based quality selection
open-above-dynamic-resolution-kit
  frame-time smoothing, render-scale adaptation and surface resize
open-above-physical-sky-kit
  procedural sky presentation
open-above-sun-light-kit
  sun lighting and tracking
open-above-aerial-perspective-kit
  distance haze and fog response
open-above-cloud-weather-map-kit
  deterministic cloud-weather field
open-above-volumetric-cloud-kit
  cloud rendering and camera-relative update
open-above-cloud-lod-kit
  cloud quality/LOD policy
open-above-cloud-lighting-kit
  cloud illumination policy
open-above-terrain-surface-kit
  bounded height/color queries, shared streaming frame, near/horizon ordering and disposal
open-above-terrain-streaming-contract-kit
  stable grid anchors, frozen frame, bounds, partition, clip signatures and LOD requirements
open-above-terrain-chunk-streaming-kit
  near requirements, geometry, skirts, live replacement and disposal
open-above-terrain-horizon-streaming-kit
  horizon requirements, clipping, sparse geometry, reclassification, skirts and disposal
open-above-vegetation-cluster-kit
  deterministic boot-time clusters, trunk/crown instancing, terrain placement and tree exclusion records
open-above-grass-world-seed-kit
  normalized deterministic flora seed
open-above-grass-biome-density-kit
  biome density policy
open-above-grass-exclusion-mask-kit
  tree/route/water exclusion sampling
open-above-grass-patch-density-kit
  world/legacy grass density composition
open-above-grass-texture-atlas-kit
  five-species procedural atlas
open-above-grass-chunk-placement-kit
  deterministic chunk candidates and placement
open-above-grass-lod-kit
  grass distance/fade policy
open-above-grass-compute-culling-kit
  visibility/culling backend contract
open-above-grass-field-domain
  camera-relative chunks, instancing, wind, LOD, state and disposal
open-above-flower-chunk-placement-kit
  deterministic five-type flower candidates and budgets
open-above-flower-texture-atlas-kit
  procedural flower atlas
open-above-flower-field-domain
  camera-relative instanced flower rendering, sway, state and disposal
open-above-water-surface-kit
  shared lakes, Fresnel water animation, feathered edges and disposal
open-above-distant-landmark-kit
  landmarks, terrain-draped fields/road and disposal
open-above-hdr-composer-kit
  render targets, depth attachments, composition, resize, render and disposal
open-above-color-grade-kit
  final color transform
open-above-lens-response-kit
  sun/camera lens response
```

### UI, 1

```txt
open-above-parchment-map-overlay-kit
  map toggle, world raster, route/town/player projection, map RAF, snapshot and disposal
```

### Tooling and proof, 4

```txt
open-above-headless-editor-environment
  project status, inspection, renderer validation, check and build adaptation
open-above-static-smoke-test-kit
  source/runtime static smoke proof
open-above-airstream-mail-test-kit
  airstream and delivery proof
open-above-world-flora-test-kit
  deterministic world/flora proof
```

## Runtime-implied adapters

```txt
open-above-route-shell-kit
open-above-importmap-kit
open-above-runtime-composer-kit
open-above-keyboard-input-kit
open-above-wheel-zoom-input-kit
open-above-parchment-map-shell-kit
open-above-error-panel-kit
open-above-gamehost-legacy-readback-kit
open-above-nexusengine-cdn-adapter-kit
open-above-campaign-source-kit
open-above-raf-clock-adapter-kit
open-above-pages-deploy-kit
```

## Main source-backed finding

The world surface radius is `10000`, while vegetation is constructed once using 18 random cluster centers. Its local extent is based on `terrainSize * 1.18`; the wider extent is capped by the lesser of `surface.radius * 0.42` and `localExtent * 1.9`. With the current `terrainSize` of `2400`, this yields central cluster-center extents of roughly `2832` and `4200`, plus at most `340` units of cluster spread.

The balloon has no horizontal world-bound admission. Terrain, grass and flowers follow the camera, but vegetation has no `update()` method and is never consumed by the frame update. The two tree instanced meshes therefore remain a boot artifact rather than a streamed world consumer.

Missing authority:

```txt
vegetation stream/session/frame identity
world/config/quality/algorithm fingerprint
camera-relative coverage requirements
chunk identities and deterministic seed derivation
inside/edge/outside membership result
route, town, lake and terrain exclusion parity
typed candidate/build/adoption results
per-frame placement, instance and allocation budgets
atomic chunk adoption and last-good rollback
exactly-once retirement and resource disposal
coverage state and observation journal
grass/flower exclusion parity with the active vegetation generation
first visible vegetation-frame acknowledgement
browser and Pages long-traversal proof
```

## Required parent domain

```txt
open-above-vegetation-spatial-coverage-authority-domain
```

## Candidate DSK composition

```txt
open-above-vegetation-stream-session-id-kit
open-above-vegetation-frame-id-kit
open-above-vegetation-world-artifact-binding-kit
open-above-vegetation-input-fingerprint-kit
open-above-vegetation-coverage-plan-kit
open-above-vegetation-chunk-id-kit
open-above-vegetation-chunk-requirements-kit
open-above-vegetation-seed-derivation-kit
open-above-vegetation-placement-kit
open-above-vegetation-exclusion-policy-kit
open-above-vegetation-candidate-set-kit
open-above-vegetation-budget-policy-kit
open-above-vegetation-admission-result-kit
open-above-vegetation-chunk-adoption-kit
open-above-vegetation-retirement-kit
open-above-vegetation-observation-kit
open-above-vegetation-journal-kit
open-above-vegetation-visible-frame-ack-kit
open-above-vegetation-spatial-fixture-kit
open-above-vegetation-browser-pages-fixture-kit
```

## Required transaction

```txt
camera sample + runtime session + world artifact + quality/config fingerprints
  -> allocate VegetationFrameId
  -> derive deterministic camera-relative chunk requirements
  -> intersect requirements with admitted world membership
  -> derive stable chunk seeds
  -> build tree candidates outside live scene groups
  -> apply terrain, route, town, lake and spacing exclusions
  -> validate instance, allocation and transition budgets
  -> return typed candidate and admission results
  -> atomically adopt required chunks and preserve last-good predecessors on failure
  -> retire obsolete geometry/material ownership exactly once
  -> publish active coverage, counts, fingerprints and journal entries
  -> make grass/flower exclusions consume the same committed vegetation generation
  -> render and publish VegetationVisibleFrameAck
```

## Validation boundary

Documentation only. Runtime JavaScript, HTML, dependencies, scripts, rendering, gameplay and deployment were not changed. Existing checks were inspected but not rerun. The current check path has no vegetation-spatial, long-traversal, failure-injection, disposal or visible-frame fixture.