# Project Breakdown: TheOpenAbove

**Run:** `2026-07-13T00-00-02-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Status:** `air-mail-session-persistence-central-reconciled`

## Summary

TheOpenAbove is an Air Mail hot-air-balloon experience combining deterministic world generation, airstream navigation, parcel delivery, procedural terrain and flora, HDR presentation, a parchment map, Nexus telemetry and browser/headless proof surfaces.

This run compared the complete ten-repository Publish inventory against the nine eligible central ledger entries and root `.agent` states. No eligible repository was new, ledger-missing or root-agent-missing. TheOpenAbove was selected because its `2026-07-12T23-50-01-04-00` flight-session persistence audit was newer than the central completion state used by the selection ledger.

## Plan ledger

**Goal:** preserve the full source-backed breakdown and synchronize one explicit authority for durable flight and mail progress across capture, storage, restore and the first visible restored frame.

- [x] Enumerate all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `LuminaryLabs-Publish/TheOpenAbove`.
- [x] Re-read boot composition, balloon simulation and mail delivery ownership.
- [x] Identify the complete interaction loop and all active domains.
- [x] Preserve all 68 source-backed kits, 12 runtime-implied adapters and offered services.
- [x] Preserve the 22-kit persistence authority plan.
- [x] Add a new timestamped tracker, turn ledger and audit reconciliation family.
- [x] Refresh every required root `.agent` file and the machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [x] Pair the repo-local update with the central ledger and internal change log.
- [ ] Runtime persistence implementation and executable fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
selected repository: LuminaryLabs-Publish/TheOpenAbove
selection reason: repo-local flight-persistence audit required central reconciliation
excluded repository: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
browser boot
  -> create default airstream and mail routes
  -> create deterministic visual world
  -> create fresh mail parcel and delivery state
  -> create fresh balloon simulation at [0, 105, 0]
  -> create map, camera, presentation and Nexus telemetry
  -> publish window.GameHost
  -> start recursive RAF

active frame
  -> admit global keyboard state
  -> update balloon position, velocity, altitude, elapsed and distance
  -> sample and apply airstream state
  -> update parcel route and delivery progress
  -> update balloon, camera, world and telemetry projections
  -> render

lifecycle end or navigation
  -> no SaveSessionCommand
  -> no staged durable write or readback verification
  -> no pagehide/visibility flush result

next boot
  -> reconstruct default balloon and parcel state
  -> restore no persistence generation
  -> publish no first-restored-frame acknowledgement
```

## Domains in use

```txt
browser shell, canvas, parchment map, fatal projection and GameHost
runtime boot, input, RAF, session and telemetry
Nexus resources, events and journals
balloon steering, burner, vent, altitude, heading, elapsed and distance
airstream routes, sampling, field, force, visuals and debug
mail parcel, route, towns, delivery volumes, progress and reset
seeded world generation, disk membership, erosion, flow, climate, biome and flora
near and horizon terrain streaming, geometry, ownership and disposal
vegetation, grass and flowers, exclusions, chunks, LOD, culling and wind
balloon object construction, materials, rigging, secondary motion and camera
quality, dynamic resolution, sky, sun, aerial perspective, clouds, water, HDR and lens
map projection, headless inspection, tests, build and Pages deployment
missing persistence capture, durable commit, restore, migration, conflict and visible proof
```

## Implemented kit inventory

### Runtime and gameplay: 15

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

### Balloon object and presentation: 15

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

### Visual, world and environment: 33

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

### UI and tooling/proof: 5

```txt
open-above-parchment-map-overlay-kit
open-above-headless-editor-environment
open-above-static-smoke-test-kit
open-above-airstream-mail-test-kit
open-above-world-flora-test-kit
```

### Runtime-implied adapters: 12

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
  balloon telemetry resources and events
  airstream route, sample, field, force, visual and debug
  mail parcel, route, town, delivery-volume, progress and reset

balloon/object/presentation:
  procedural envelope, panels, mouth, seams, basket, burner, ropes and rigging
  deferred model loading and persistent GPU resources
  materials, secondary motion, camera rig and clipping fade

world/environment:
  deterministic world-grid generation and membership
  protected anchors, erosion, flow, climate, biome and flora queries
  near/horizon terrain streaming and disposal
  vegetation records, grass/flower density, chunk placement, LOD, culling and wind
  quality tiers, dynamic resolution, physical sky, clouds, water, HDR and lens response

UI/tooling:
  parchment-map lifecycle and projection
  headless inspection and public diagnostics
  source/static, route/mail and world/flora proof
  static build and Pages deployment adaptation
```

## Source-backed persistence finding

`src/main.js` constructs a default route, a fresh mail domain and a fresh balloon simulation on every boot. `balloon-simulation-kit.js` mutates flight state in memory and exposes `snapshot()` but no load/restore transaction. `mail-delivery-domain.js` exposes `snapshot()` and `reset()` but no persistence adapter or detached restore candidate. The browser host imports no persistence domain and installs no storage or lifecycle flush path.

## Required parent domain

```txt
open-above-flight-session-persistence-authority-domain
```

### Planned authority kits: 22 including parent

```txt
open-above-flight-session-persistence-authority-domain
open-above-session-save-command-kit
open-above-session-restore-command-kit
open-above-session-reset-command-kit
open-above-persistence-schema-kit
open-above-persistence-participant-snapshot-kit
open-above-persistence-canonicalization-kit
open-above-persistence-content-fingerprint-kit
open-above-persistence-generation-kit
open-above-browser-storage-adapter-kit
open-above-persistence-staging-write-kit
open-above-persistence-readback-verification-kit
open-above-persistence-atomic-pointer-commit-kit
open-above-persistence-backup-retention-kit
open-above-persistence-migration-kit
open-above-persistence-quarantine-kit
open-above-persistence-writer-conflict-kit
open-above-persistence-dirty-revision-kit
open-above-page-lifecycle-flush-kit
open-above-persistence-result-kit
open-above-restored-visible-frame-ack-kit
open-above-persistence-fixture-gate-kit
```

## Required transaction

```txt
SaveSessionCommand
  -> validate runtime, world, route and participant predecessors
  -> collect detached balloon, mail and route/world compatibility snapshots
  -> canonicalize and fingerprint one candidate
  -> stage and readback-verify durable bytes
  -> compare writer and active predecessor
  -> atomically promote the verified generation
  -> publish SaveCommitResult

RestoreSessionCommand
  -> verify active generation or bounded backup
  -> migrate supported schemas or quarantine invalid data
  -> construct and validate every participant candidate off-line
  -> suspend live mutation during installation
  -> atomically install one persistence generation
  -> publish RestoreCommitResult
  -> acknowledge the first visible restored frame
```

## Validation boundary

Documentation only. No runtime JavaScript, HTML, package script, dependency, gameplay behavior, rendering behavior or deployment workflow was changed. No persistence, migration, corruption, multi-tab, lifecycle, browser or Pages fixture was run.