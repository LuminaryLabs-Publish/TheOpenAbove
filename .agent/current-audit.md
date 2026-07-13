# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-13T00-00-02-04-00`  
**Status:** `air-mail-session-persistence-central-reconciled`  
**Runtime revision reviewed:** `c2b96fa4d0dc44f6f3cf52762834324e712ed7d9`

## Summary

TheOpenAbove has no executable persistence authority. Browser boot constructs a new default mail route, a fresh parcel and a fresh balloon simulation. Gameplay mutates those owners only in memory, and reload or navigation discards all flight and delivery progress.

## Plan ledger

**Goal:** define one atomic and durable save/restore authority for Air Mail progress while preserving existing domain ownership.

- [x] Compare the complete Publish inventory against central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `TheOpenAbove` for reconciliation.
- [x] Trace boot, flight, airstream, mail, telemetry, map and render paths.
- [x] Preserve all active domains and all kit/service mappings.
- [x] Define save, restore, reset, migration, conflict and visible-frame contracts.
- [x] Add the current timestamped tracker and audit family.
- [x] Synchronize central tracking.
- [ ] Implement and execute persistence fixtures.

## Complete interaction loop

```txt
browser boot
  -> default routes
  -> deterministic visual world
  -> fresh mail parcel
  -> fresh balloon simulation at [0, 105, 0]
  -> map, camera, presentation and telemetry
  -> GameHost and RAF

running frame
  -> keyboard-held state
  -> balloon integration
  -> airstream sample and force
  -> parcel delivery update
  -> camera/world/telemetry/map projection
  -> render

lifecycle end
  -> no save command
  -> no durable write or readback verification
  -> no lifecycle flush result

next boot
  -> defaults recreated
  -> no restore generation or restored-frame acknowledgement
```

## Domains in use

```txt
browser shell, canvas, map, fatal projection and public GameHost
runtime boot, input, RAF, session and telemetry
Nexus resources, events and journals
balloon motion, steering, burner, vent, heading, altitude, elapsed and distance
airstream routes, sampling, field, force, visuals and debug
mail parcel, route, towns, volumes, progress and reset
seeded world generation, membership, erosion, climate, biome and flora
near/horizon terrain streaming and disposal
vegetation, grass and flowers, exclusions, chunks, LOD, culling and wind
balloon geometry, materials, rigging, secondary motion, camera and clipping
quality, dynamic resolution, sky, sun, aerial perspective, clouds, water, HDR and lens
parchment-map projection, headless proof, tests, build and Pages
missing persistence identity, durable commit, restore, migration, conflict and proof
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
planned persistence authority including parent: 22
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
  flight input/integration and telemetry publication
  airstream route/field/force/visual/debug
  mail parcel/route/town/volume/progress/reset

balloon/object/presentation:
  procedural construction, deferred loading and GPU ownership
  materials, rigging, burner, ropes, secondary motion, camera and clipping

world/environment:
  world-grid generation, anchors, erosion, flow, climate, biome and membership
  near/horizon terrain streaming and disposal
  vegetation, grass and flowers, deterministic chunks, LOD, culling and wind
  quality, dynamic resolution, sky, clouds, water, HDR, grading and lens

UI/tooling:
  parchment-map lifecycle and projection
  headless inspection, source/static checks, domain tests, build and Pages adaptation
```

## Source-backed findings

```txt
fresh default route every boot: confirmed
fresh default parcel every boot: confirmed
fresh balloon state at [0,105,0]: confirmed
flight and mail mutation are memory-only: confirmed
balloon snapshot exists: confirmed
mail snapshot/reset exist: confirmed
balloon/mail restore transaction: absent
persistence domain and storage adapter: absent
schema, generation and fingerprint: absent
migration, quarantine and writer-conflict result: absent
lifecycle flush result: absent
first restored-frame acknowledgement: absent
```

## Required parent domain

```txt
open-above-flight-session-persistence-authority-domain
```

## Required transaction

```txt
SaveSessionCommand
  -> validate runtime, writer and predecessor
  -> collect detached participant snapshots
  -> canonicalize, validate and fingerprint
  -> stage and readback-verify
  -> atomically promote the active generation
  -> publish SaveCommitResult

RestoreSessionCommand
  -> verify active generation or bounded backup
  -> migrate or quarantine
  -> prepare every participant candidate off-line
  -> atomically install one generation
  -> publish RestoreCommitResult
  -> acknowledge the first matching visible frame
```

## Validation boundary

Documentation only. No runtime source, dependency, package script, gameplay, rendering or deployment workflow changed. No persistence fixture was run.