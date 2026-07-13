# Project Breakdown: TheOpenAbove

**Timestamp:** `2026-07-13T09-40-27-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Runtime revision reviewed:** `0af1b7c8d3131c2af6f60bcc0d655bf399f52ef5`  
**Status:** `map-world-dual-surface-frame-coherence-authority-audited`

## Summary

TheOpenAbove renders the Three.js world and the parchment map through two independent `requestAnimationFrame` chains. Opening the map makes its DOM surface visible before the first matching map draw, while the world renderer continues submitting frames. Both surfaces read mutable simulation/mail state without a shared immutable frame envelope, projection revision, commit result or visible-frame acknowledgement.

## Plan ledger

**Goal:** define one authoritative frame transaction from committed flight/mail state through WebGL world projection and parchment-map projection, including map-open transitions, partial-frame handling and first coherent visible-frame proof.

- [x] Compare the complete ten-repository Publish inventory with the central ledger.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Find no new, ledger-missing or root-agent-missing eligible repository.
- [x] Select only `LuminaryLabs-Publish/TheOpenAbove`, the oldest eligible documented repository.
- [x] Trace browser boot, flight/mail updates, world RAF, map RAF, open/close input, rendering and public readback.
- [x] Identify all domains, kits and offered services.
- [x] Preserve the previous runtime-provider admission audit as an active dependency.
- [x] Add architecture, render, interaction, map-system and deploy audits.
- [x] Change no runtime source, dependency, script or workflow.
- [x] Create no branch or pull request.
- [ ] Implement and execute dual-surface frame-coherence fixtures.

## Selection comparison

```txt
accessible LuminaryLabs-Publish repositories: 10
excluded repositories: 1 (TheCavalryOfRome)
eligible repositories: 9
central ledger entries: 9
root .agent folders: 9
new or ledger-missing eligible repositories: 0
root-agent-missing eligible repositories: 0
selected repository: LuminaryLabs-Publish/TheOpenAbove
reason: oldest eligible documented repository after higher-priority missing-state checks
```

## Complete interaction loop

```txt
browser boot
  -> resolve providers and evaluate src/main.js
  -> construct world, balloon, airstream, mail, map, camera and telemetry owners
  -> perform initial state updates
  -> schedule the world RAF chain

world RAF while map closed
  -> compute clamped frameMs and dt
  -> update balloon simulation
  -> update mail delivery
  -> update airstream, balloon presentation and camera
  -> update terrain, flora, atmosphere, HDR and telemetry
  -> render WebGL world
  -> schedule successor world RAF

M key
  -> map setOpen(true)
  -> mark overlay visible immediately
  -> resize map canvas
  -> schedule first map RAF

world RAF while map open
  -> skip simulation, mail, visual update and telemetry tick
  -> continue rendering WebGL with dt 0
  -> schedule successor world RAF

map RAF while open
  -> read mutable simulation state through getPlayerState()
  -> read mutable mail parcel through getParcel()
  -> redraw world background, routes, towns and player marker
  -> schedule successor map RAF

Escape or M
  -> map setOpen(false)
  -> hide overlay and cancel the stored map RAF handle
  -> next world RAF resumes simulation

public readback
  -> GameHost.getState() captures a fresh mutable aggregate
  -> no world-frame/map-frame pair or shared commit receipt is returned
```

## Main source-backed finding

`src/main.js` owns one recursive RAF chain and always calls `visual.render(...)`. It skips simulation, mail, environment and telemetry updates only while `mapOverlay.isOpen()` is true.

`src/ui/parchment-map-overlay.js` owns a second recursive RAF chain. `setOpen(true)` exposes the overlay synchronously, then schedules the first map draw for a later callback. The map draw reads live simulation and mail objects through getters rather than one immutable published frame.

Missing evidence:

```txt
FlightStateRevision
MailStateRevision
WorldRenderFrameId
MapRenderFrameId
MapOpenTransitionId
DualSurfaceFrameEnvelope
WorldProjectionResult
MapProjectionResult
DualSurfaceCommitResult
partial-frame recovery policy
first coherent map/world frame acknowledgement
GameHost dual-surface readback receipt
```

## Domains in use

```txt
browser document, import map, module loader, canvas, map overlay, error panel and GameHost
runtime boot, provider admission dependency, session, keyboard input, wheel input, RAF and telemetry
balloon simulation, steering, burner, vent, altitude, heading, elapsed and distance
airstream route, sampling, field, force, visuals and debug
mail parcel, route, towns, delivery volumes, progress, reset and completion
seeded world generation, membership, erosion, flow, climate, biome and flora
near/horizon terrain streaming, ownership and disposal
vegetation, grass, flowers, exclusions, chunks, LOD, culling and wind
balloon construction, materials, rigging, secondary motion, camera and clipping
quality, dynamic resolution, sky, sun, aerial perspective, clouds, water, HDR and lens
parchment-map lifecycle, projection, focus and accessibility
headless inspection, static tests, Vite build and Pages deployment
missing map/world dual-surface frame-coherence authority
```

## Implemented kit inventory

### Runtime and gameplay (15)

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

### Balloon object and presentation (15)

```txt
open-above-hot-air-balloon-object-kit
open-above-balloon-envelope-profile-kit
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

### Visual, world and environment (33)

```txt
open-above-visual-domain
open-above-world-generation-kit
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
open-above-terrain-streaming-contract-kit
open-above-terrain-chunk-streaming-kit
open-above-terrain-horizon-streaming-kit
open-above-vegetation-cluster-kit
open-above-grass-world-seed-kit
open-above-grass-biome-density-kit
open-above-grass-exclusion-mask-kit
open-above-grass-patch-density-kit
open-above-grass-texture-atlas-kit
open-above-grass-chunk-placement-kit
open-above-grass-lod-kit
open-above-grass-compute-culling-kit
open-above-grass-field-domain
open-above-flower-chunk-placement-kit
open-above-flower-texture-atlas-kit
open-above-flower-field-domain
open-above-water-surface-kit
open-above-distant-landmark-kit
open-above-hdr-composer-kit
open-above-color-grade-kit
open-above-lens-response-kit
```

### UI and tooling/proof (5)

```txt
open-above-parchment-map-overlay-kit
open-above-headless-editor-environment
open-above-static-smoke-test-kit
open-above-airstream-mail-test-kit
open-above-world-flora-test-kit
```

### Runtime-implied adapters (12)

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

## Offered services

```txt
runtime/gameplay:
  flight input, integration and immutable-looking snapshots
  Nexus telemetry resource/event publication
  airstream route, field, sample, force, visuals and diagnostics
  mail parcel, route, town, volume, progress, snapshot, reset and disposal

balloon/object/presentation:
  procedural envelope, basket, burner, rope and rigging construction
  deferred model loading and persistent GPU-resource ownership
  fabric/basket materials, secondary motion, camera, clipping and animation

world/environment:
  seeded world generation and membership queries
  protected anchors, erosion, flow, climate, biome and flora
  near/horizon terrain streaming and disposal
  vegetation, grass and flower chunks, exclusions, LOD, culling and wind
  quality, dynamic resolution, sky, clouds, water, HDR, grading and lens response

UI/tooling:
  parchment-map open/close lifecycle and world/route/town/player projection
  headless project inspection and renderer validation
  source/static, route/mail and world/flora checks
  Vite build and GitHub Pages deployment adaptation
```

## Required parent domain

```txt
open-above-map-world-dual-surface-frame-coherence-authority-domain
```

## Required transaction

```txt
PresentFlightFrameCommand
  -> bind runtime session, flight revision and mail revision
  -> capture one immutable DualSurfaceFrameEnvelope
  -> classify map closed, opening, open, closing or retired
  -> prepare world and map projection candidates from the same envelope
  -> commit required surfaces under one DualSurfaceCommitId
  -> return Complete, Partial, Failed, Stale, Superseded or Cancelled
  -> preserve the last complete frame on partial failure
  -> expose detached world/map receipts through telemetry and GameHost
  -> acknowledge the first coherent visible frame for each map transition
```

## Planned coordinating kits

```txt
open-above-map-world-dual-surface-frame-coherence-authority-domain
open-above-dual-surface-frame-envelope-kit
open-above-flight-state-revision-kit
open-above-mail-state-revision-kit
open-above-map-open-transition-kit
open-above-world-projection-command-kit
open-above-map-projection-command-kit
open-above-world-projection-result-kit
open-above-map-projection-result-kit
open-above-dual-surface-commit-kit
open-above-partial-frame-recovery-kit
open-above-map-first-frame-ack-kit
open-above-world-map-readback-kit
open-above-dual-surface-frame-journal-kit
open-above-dual-surface-fixture-gate-kit
```

## Validation boundary

Documentation only. No runtime JavaScript, rendering behavior, map behavior, gameplay, dependency, script or workflow changed. No browser dual-surface fixture, build, Pages smoke or visible-frame readback was executed.