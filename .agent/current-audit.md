# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-13T09-40-27-04-00`  
**Status:** `map-world-dual-surface-frame-coherence-authority-audited`  
**Runtime revision reviewed:** `0af1b7c8d3131c2af6f60bcc0d655bf399f52ef5`

## Summary

The WebGL world and parchment-map Canvas2D surface are driven by separate recursive RAF chains. `setOpen(true)` makes the map visible before its first matching draw, while the world renderer keeps submitting frames. Both surfaces read mutable flight/mail state without one immutable frame envelope, projection result, dual-surface commit result or visible-frame acknowledgement.

## Plan ledger

**Goal:** define one revisioned presentation transaction from committed flight/mail state through world projection, map projection, map-transition acceptance, recovery and visible proof.

- [x] Compare the complete Publish inventory against central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `TheOpenAbove` under the oldest eligible rule.
- [x] Trace both RAF chains, map visibility input, state getters, WebGL render, Canvas2D draw and GameHost readback.
- [x] Preserve all active domains and complete kit/service mappings.
- [x] Define the dual-surface frame-coherence authority.
- [x] Add the timestamped tracker and audit family.
- [x] Change no runtime source, dependency, package script or workflow.
- [x] Create no branch or pull request.
- [ ] Implement and execute dual-surface fixtures.

## Complete interaction loop

```txt
browser boot
  -> resolve providers and evaluate src/main.js
  -> construct visual/world/balloon/airstream/mail/map/camera/telemetry owners
  -> perform initial state updates
  -> request world RAF

world RAF while map closed
  -> clamp frameMs and dt
  -> update flight simulation
  -> update mail delivery and airstream
  -> update balloon, camera, world, flora, atmosphere, HDR and telemetry
  -> render WebGL world
  -> request successor world RAF

map-open input
  -> toggle open state and CSS immediately
  -> aria-hidden=false
  -> resize map canvas
  -> request first map RAF

world RAF while map open
  -> skip simulation/mail/visual/telemetry update
  -> continue WebGL render with dt 0
  -> request successor world RAF

map RAF while open
  -> read mutable simulation state
  -> read mutable parcel state
  -> draw world background, routes, towns and player marker
  -> request successor map RAF

map-close input
  -> hide overlay
  -> cancel stored map RAF handle
  -> next world RAF resumes updates

GameHost.getState()
  -> capture a fresh aggregate
  -> return no committed world/map frame pair
```

## Domains in use

```txt
browser document, import map, module loader, canvas, map overlay, error panel and GameHost
runtime boot, provider dependency, session, keyboard/wheel input, RAF and telemetry
Nexus resources, events and journals
balloon motion, steering, burner, vent, heading, altitude, elapsed and distance
airstream routes, sampling, field, force, visuals and debug
mail parcel, route, towns, volumes, progress, reset and completion
seeded world generation, membership, erosion, flow, climate, biome and flora
near/horizon terrain streaming, ownership and disposal
vegetation, grass, flowers, exclusions, chunks, LOD, culling and wind
balloon geometry, materials, rigging, secondary motion, camera and clipping
quality, dynamic resolution, sky, sun, aerial perspective, clouds, water, HDR and lens
parchment-map projection, focus and accessibility
headless proof, tests, Vite build and Pages
missing map/world dual-surface frame-coherence authority
```

## Kit census

```txt
runtime/gameplay: 15
balloon/object/presentation: 15
visual/world/environment: 33
UI: 1
tooling/proof: 4
active source-backed total: 68
runtime-implied adapters: 12
inactive/retired legacy: 12
planned dual-surface authority including parent: 15
```

## Implemented kits

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

### Visual, world and environment

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

### UI and tooling/proof

```txt
open-above-parchment-map-overlay-kit
open-above-headless-editor-environment
open-above-static-smoke-test-kit
open-above-airstream-mail-test-kit
open-above-world-flora-test-kit
```

### Runtime-implied adapters

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
  flight input and integration
  Nexus telemetry resource/event publication
  airstream route, field, sample, force, visuals and diagnostics
  mail parcel, route, town, volume, progress, snapshot, reset and disposal

balloon/object/presentation:
  procedural envelope, basket, burner, rope and rigging construction
  deferred model loading and persistent GPU ownership
  materials, secondary motion, camera, clipping and animation

world/environment:
  seeded world-grid generation and membership
  protected anchors, erosion, flow, climate, biome and flora
  near/horizon terrain streaming and disposal
  vegetation, grass and flower chunks, LOD, culling, exclusions and wind
  quality, dynamic resolution, sky, clouds, water, HDR, grading and lens

UI/tooling:
  parchment-map lifecycle and world/route/town/player projection
  headless inspection and renderer validation
  source/static, route/mail and world/flora checks
  Vite build and Pages adaptation
```

## Source-backed findings

```txt
world RAF chain: present
map RAF chain: present
world rendering continues while map is open: yes
simulation/mail/visual/telemetry updates pause while map is open: yes
map overlay visible before first map RAF draw: possible by ordering
map draw reads live simulation getter: yes
map draw reads live parcel getter: yes
shared immutable world/map frame envelope: absent
flight-state revision in map projection: absent
mail-state revision in map projection: absent
map transition generation: absent
world projection result: absent
map projection result: absent
dual-surface commit result: absent
partial-frame recovery result: absent
first coherent map frame acknowledgement: absent
GameHost world/map commit receipt: absent
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
  -> classify map Closed, Opening, Open, Closing or Retired
  -> prepare required world/map projection candidates
  -> validate viewport, transition and surface generations
  -> commit accepted projections under one DualSurfaceCommitId
  -> return Complete, Partial, Failed, Stale, Superseded or Cancelled
  -> preserve the last complete frame on partial failure
  -> publish detached telemetry and GameHost receipts
  -> acknowledge the first coherent visible frame per transition
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

## Retained architecture priorities

```txt
runtime module/provider admission and immutable identity
delivery completion and mission progression
flight-session persistence and restore authority
session, listener, frame and failure ownership
fixed-step clock and sequenced input
telemetry snapshot immutability
world identity and flight membership
terrain and vegetation aggregate adoption
flora exclusion coherence
HDR surface coherence
map spatial navigation and accessibility
```

## Validation boundary

Documentation only. No runtime dual-surface authority, browser frame fixture, pixel readback, build, Pages smoke or production-readiness proof was executed.