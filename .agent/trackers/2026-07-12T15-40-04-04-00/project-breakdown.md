# Project Breakdown: TheOpenAbove Vegetation Coverage Reconciliation

**Timestamp:** `2026-07-12T15-40-04-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Runtime revision reviewed:** `c2b96fa4d0dc44f6f3cf52762834324e712ed7d9`  
**Repo-local documentation head observed:** `b0fd6122f7424281db9474d4633195084a884f63`

## Summary

TheOpenAbove is a browser Air Mail balloon experience composed from deterministic world generation, camera-relative terrain/grass/flower streaming, procedural balloon construction, authored airstream and mail content, HDR presentation, a parchment map, Nexus telemetry and browser/headless proof surfaces.

This run reconciles the newer repo-local vegetation audit with the central repository ledger. Tree vegetation is generated once during visual-domain construction as two global instanced meshes. Terrain, grass and flowers continue following the camera, but trees have no frame update, chunk identity, camera-relative coverage plan, lifecycle owner, disposal service, coverage observation or first-visible-frame receipt.

## Plan ledger

**Goal:** preserve deterministic tree placement while making vegetation a world-bound, camera-relative, budgeted and transactionally adopted consumer, then synchronize the complete breakdown into the central ledger.

- [x] Compare the complete accessible `LuminaryLabs-Publish` repository inventory against central tracking.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger entries and root `.agent` state.
- [x] Prioritize `TheOpenAbove` because its `15:31:24` repo-local vegetation audit was newer than central tracking.
- [x] Work on only `LuminaryLabs-Publish/TheOpenAbove` in the Publish organization.
- [x] Inspect world configuration, balloon traversal, visual composition, vegetation construction, streamed consumers, observability and validation.
- [x] Identify the interaction loop and all active domains.
- [x] Preserve all 68 active source-backed kits and their offered services.
- [x] Define the vegetation spatial-coverage authority and candidate DSK composition.
- [x] Add a new timestamped tracker, turn ledger, architecture audit and reconciliation audits.
- [x] Refresh the required root `.agent` documents and machine registry.
- [x] Synchronize the central repo ledger and internal change log.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable vegetation-spatial fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
unsynchronized repo-local audit state: TheOpenAbove

TheOpenAbove       central 2026-07-12T13-29-56-04-00; local 2026-07-12T15-31-24-04-00; selected
IntoTheMeadow      2026-07-12T13-54-00-04-00
PhantomCommand     2026-07-12T13-59-50-04-00
PrehistoricRush    2026-07-12T14-10-22-04-00
HorrorCorridor     2026-07-12T14-30-36-04-00
ZombieOrchard      2026-07-12T14-38-35-04-00
MyCozyIsland       2026-07-12T14-59-01-04-00
TheUnmappedHouse   2026-07-12T15-08-07-04-00
AetherVale         2026-07-12T15-18-50-04-00
TheCavalryOfRome   excluded
```

## Complete interaction loop

```txt
page boot
  -> import Three.js and Nexus Engine from CDN
  -> build deterministic world artifact
  -> create camera-relative near/horizon terrain
  -> create one boot-time central tree field
  -> pass boot tree positions into grass and flower exclusion inputs
  -> create balloon, airstream, mail, camera, map and HDR presentation
  -> expose GameHost and schedule RAF

active flight frame
  -> integrate balloon velocity and position
  -> update mail delivery and airstream state
  -> apply balloon animation and secondary presentation
  -> move the camera with the balloon
  -> update near/horizon terrain around the camera
  -> update grass and flower chunk windows around the camera
  -> leave tree instance matrices unchanged
  -> update water, sky, clouds, lens and HDR
  -> render

long traversal
  -> horizontal flight has no world-bound admission
  -> camera and streamed ground can leave the boot tree cluster field
  -> tree coverage has no requirement, degraded state or typed result
  -> grass/flower exclusions remain bound to the boot tree-position array
```

## Domains in use

```txt
browser shell, semantic canvas, parchment map and fatal projection
runtime boot, session, keyboard/wheel input, RAF and public host
balloon simulation, steering, airstream and mail delivery
seeded world generation, erosion, flow, climate, biome, flora and map color
world membership and authored route/town/lake protection
terrain streaming frame, near/horizon ownership, geometry and disposal
boot-time vegetation placement and global tree instancing
grass/flower chunk placement, atlases, LOD, culling, wind and exclusion
procedural balloon model, materials, rigging, burner, ropes and presentation
quality, dynamic resolution, sky, clouds, water, HDR, color grade and lens response
map projection, telemetry, headless inspection, tests, build and Pages deployment
```

## Active kits and offered services

### Runtime and gameplay, 15

```txt
open-above-balloon-simulation-kit: input state, flight integration, airstream force, terrain clearance, state application and snapshots
open-above-balloon-telemetry-kit: Nexus telemetry composition, ticking and state publication
open-above-airstream-domain: route-field composition, sampling, update, snapshot, visuals/debug and disposal
open-above-airstream-route-kit: authored/default route descriptors
open-above-airstream-sampler-kit: closest-route, influence and blended sample calculation
open-above-airstream-field-kit: immutable route field and ambient/route sampling
open-above-airstream-balloon-force-kit: airstream sample and flight-state adaptation
open-above-airstream-visual-kit: route visual construction and active-route presentation
open-above-airstream-debug-kit: route/sample diagnostics
open-above-mail-delivery-domain: parcel/town composition, update, snapshot, reset and disposal
open-above-mail-parcel-kit: parcel construction and reset
open-above-mail-route-kit: towns, parcel destination and correct-current descriptors
open-above-delivery-volume-kit: destination spatial-volume sampling
open-above-delivery-progress-kit: selected-current tracking, delivery transition and event production
open-above-mail-town-kit: town visuals, destination emphasis and disposal
```

### Balloon object and presentation, 15

```txt
open-above-hot-air-balloon-object-kit: profile composition, procedural model build, deferred loading and animation
open-above-balloon-envelope-profile-kit: envelope shape/profile descriptors
open-above-balloon-envelope-panel-kit: triangulated envelope panel construction
open-above-balloon-mouth-kit: open-mouth geometry
open-above-balloon-streamer-fit-kit: fitted fabric pattern streamers
open-above-balloon-fabric-seam-kit: envelope seam geometry
open-above-hot-air-balloon-basket-kit: basket construction and rider anchors
open-above-hot-air-balloon-rigging-kit: rigging construction and tension animation
open-above-hot-air-balloon-burner-kit: burner geometry, flame and heat animation
open-above-rope-kit: segmented rope construction
open-above-balloon-presentation-domain: envelope/gondola secondary motion
open-above-envelope-fabric-material-kit: envelope fabric material
open-above-basket-material-kit: basket material
open-above-balloon-camera-rig-kit: wheel zoom, follow camera, first-person blend and clipping state
open-above-clipping-fade-kit: balloon visibility fade near first-person view
```

### Visual, world and environment, 33

```txt
open-above-visual-domain: scene/renderer/camera composition, world/environment construction, update, render, resize and partial disposal
open-above-world-generation-kit: seeded grid, anchor protection, erosion/flow, climate/biome/flora, disk membership and map color
open-above-quality-tier-kit: device-based quality selection
open-above-dynamic-resolution-kit: frame-time smoothing, render-scale adaptation and resize
open-above-physical-sky-kit: procedural sky presentation
open-above-sun-light-kit: sun lighting and tracking
open-above-aerial-perspective-kit: haze and fog response
open-above-cloud-weather-map-kit: deterministic cloud-weather field
open-above-volumetric-cloud-kit: cloud rendering and camera-relative update
open-above-cloud-lod-kit: cloud quality/LOD policy
open-above-cloud-lighting-kit: cloud illumination policy
open-above-terrain-surface-kit: bounded height/color, shared stream frame, near/horizon order and disposal
open-above-terrain-streaming-contract-kit: stable anchors, frozen frame, bounds, partition, clip signatures and LOD requirements
open-above-terrain-chunk-streaming-kit: near requirements, geometry, skirts, live replacement and disposal
open-above-terrain-horizon-streaming-kit: horizon requirements, clipping, sparse geometry, reclassification, skirts and disposal
open-above-vegetation-cluster-kit: deterministic boot clusters, trunk/crown instancing, terrain placement and tree exclusion records
open-above-grass-world-seed-kit: deterministic flora seed normalization
open-above-grass-biome-density-kit: biome density policy
open-above-grass-exclusion-mask-kit: tree/route/water exclusion sampling
open-above-grass-patch-density-kit: world/legacy grass-density composition
open-above-grass-texture-atlas-kit: five-species procedural atlas
open-above-grass-chunk-placement-kit: deterministic chunk candidate placement
open-above-grass-lod-kit: distance and fade policy
open-above-grass-compute-culling-kit: culling backend contract
open-above-grass-field-domain: camera-relative chunks, instancing, wind, LOD, state and disposal
open-above-flower-chunk-placement-kit: deterministic five-type candidates and budgets
open-above-flower-texture-atlas-kit: procedural flower atlas
open-above-flower-field-domain: camera-relative flower rendering, sway, state and disposal
open-above-water-surface-kit: shared lakes, animated Fresnel water, feathered edges and disposal
open-above-distant-landmark-kit: landmarks, terrain-draped fields/road and disposal
open-above-hdr-composer-kit: render targets, depth attachments, composition, resize, render and disposal
open-above-color-grade-kit: final color transform
open-above-lens-response-kit: camera/sun lens response
```

### UI and proof, 5

```txt
open-above-parchment-map-overlay-kit: map toggle, world raster, route/town/player projection, map RAF, snapshot and disposal
open-above-headless-editor-environment: project inspection, renderer validation, checks and build adaptation
open-above-static-smoke-test-kit: static source/runtime smoke proof
open-above-airstream-mail-test-kit: deterministic airstream and delivery proof
open-above-world-flora-test-kit: deterministic world/flora proof
```

## Runtime-implied adapters, 12

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

```txt
world surface radius: 10000
terrainSize: 2400
vegetation clusters: 18
local cluster-center extent: 2400 * 1.18 = 2832
wider cluster-center extent: min(10000 * 0.42, 2832 * 1.9) = 4200
cluster spread: 80..340
vegetation construction: once during visual-domain creation
vegetation update in RAF: none
vegetation lifecycle/disposal service: none
vegetation state in runtime snapshot: none
horizontal flight world-bound admission: none
```

The source establishes a coverage-ownership mismatch. It does not by itself prove a specific missing-tree screenshot because no browser traversal was run.

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
open-above-vegetation-exclusion-artifact-kit
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
  -> intersect requirements with explicit world membership
  -> derive stable per-chunk seeds independent of query order
  -> generate detached candidates using terrain/biome/exclusion policy
  -> enforce placement, instance, memory and transition budgets
  -> build detached render resources
  -> validate complete required-cell coverage
  -> atomically adopt successor chunks or preserve last-good coverage
  -> publish revisioned tree exclusion artifact for grass/flowers
  -> retire obsolete resources exactly once
  -> publish observation and journal entries
  -> render and acknowledge the first matching visible frame
```

## Validation

```txt
runtime source changed: no
package scripts or dependencies changed: no
gameplay/render/deployment behavior changed: no
branch created: no
pull request created: no
commands run this reconciliation: no
browser traversal smoke: not run
Pages traversal smoke: not run
vegetation-spatial fixtures: unavailable
```

No runtime coverage, rollback, disposal, frame-provenance or deployment-readiness claim is made.