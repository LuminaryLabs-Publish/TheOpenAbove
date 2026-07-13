# Project Breakdown: Flight Session Persistence Authority

**Timestamp:** `2026-07-12T23-50-01-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Runtime revision reviewed:** `c2b96fa4d0dc44f6f3cf52762834324e712ed7d9`  
**Status:** `air-mail-session-persistence-authority-audited`

## Summary

TheOpenAbove is a browser hot-air-balloon mail-delivery experience composed from balloon simulation, airstream, mail, deterministic world, terrain/flora, camera, HDR, map, telemetry and proof services. This pass selected only TheOpenAbove because no eligible repository was new, missing from the central ledger or missing root `.agent` state, and TheOpenAbove had the oldest eligible central update.

The current runtime keeps flight and delivery progress only in mutable in-memory objects. Every boot creates a new default parcel and a new balloon simulation at `[0, 105, 0]`; delivery mutates that parcel once in memory, but no persistence service captures, commits, restores, migrates, validates or visibly acknowledges the session. Refresh, navigation or process termination therefore resets position, elapsed time, distance, selected current and delivery completion without a typed persistence result.

## Plan ledger

**Goal:** document one authoritative persistence transaction from committed flight/mail state through durable storage, verified restore, migration, conflict handling and first-visible-frame acknowledgement.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `LuminaryLabs-Publish/TheOpenAbove` by the oldest eligible central timestamp.
- [x] Re-read browser composition, balloon state construction, mail-domain state, delivery mutation and package proof surfaces.
- [x] Identify the complete interaction loop and all active domains.
- [x] Preserve all 68 active source-backed kits, 12 runtime-implied adapters and their offered services.
- [x] Record missing persistence identity, capture, durable commit, restore, migration, conflict and visible-proof boundaries.
- [x] Add a new tracker, turn-ledger entry and system-specific audit family.
- [x] Refresh all required root `.agent` documents and machine registry.
- [ ] Runtime implementation and executable persistence fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
selected: LuminaryLabs-Publish/TheOpenAbove
excluded: LuminaryLabs-Publish/TheCavalryOfRome
selection rule: oldest eligible central update
```

Central timestamps at selection:

```txt
TheOpenAbove:     2026-07-12T21-31-40-04-00
IntoTheMeadow:    2026-07-12T21-40-09-04-00
PhantomCommand:   2026-07-12T22-15-00-04-00
PrehistoricRush:  2026-07-12T22-18-39-04-00
HorrorCorridor:   2026-07-12T22-44-30-04-00
ZombieOrchard:    2026-07-12T23-00-53-04-00
MyCozyIsland:     2026-07-12T23-08-37-04-00
TheUnmappedHouse: 2026-07-12T23-20-51-04-00
AetherVale:       2026-07-12T23-30-56-04-00
```

## Complete interaction loop

```txt
browser boot
  -> create default airstream and mail routes
  -> create visual world and procedural balloon
  -> create mail domain with a fresh default parcel
  -> create balloon simulation at [0, 105, 0]
  -> create map, camera, presentation and telemetry services
  -> publish GameHost
  -> start RAF

running frame while map is closed
  -> update mutable balloon state
  -> update mail delivery against current position
  -> mutate parcel selectedAirstreamId, status, deliveredAt and message
  -> update airstream, pose, camera and visual state
  -> publish telemetry
  -> render

browser refresh, navigation or process termination
  -> no session capture or durable commit occurs
  -> no page-lifecycle flush result exists
  -> next boot creates the default parcel and default balloon state again
  -> no restore, migration, quarantine or visible restored-frame acknowledgement occurs
```

## Domains in use

```txt
browser shell, canvas, map, fatal projection and public host
runtime boot, import admission, session, keyboard/wheel input, RAF and telemetry
Nexus Engine composition, clocks, resources, events and journals
balloon simulation, steering, burner, vent, altitude, distance and snapshot projection
airstream routes, sampling, force, visuals and debug
mail parcel, towns, delivery volumes, progress and reset
seeded world generation, bounded-disk membership, erosion, climate, biome and flora
near/horizon terrain streaming, geometry ownership and disposal
vegetation, grass and flowers, exclusions, chunks, LOD, culling and wind
procedural balloon object, rigging, materials, camera and presentation
quality, dynamic resolution, sky, sun, clouds, water, HDR and lens
parchment-map projection and lifecycle
headless inspection, tests, build and Pages deployment
missing session persistence, durable commit, restore, migration, conflict, lifecycle flush and visible proof
```

## Implemented kits and offered services

### Runtime and gameplay: 15

```txt
open-above-balloon-simulation-kit: keyboard ownership, mutable flight integration, terrain floor, snapshots and disposal
open-above-balloon-telemetry-kit: Nexus resources, tick event and engine readback
open-above-airstream-domain: route composition, sampling, update, snapshot and disposal
open-above-airstream-route-kit: authored route descriptors
open-above-airstream-sampler-kit: route influence sampling
open-above-airstream-field-kit: ambient and routed flow field
open-above-airstream-balloon-force-kit: flow-to-balloon state application
open-above-airstream-visual-kit: current visualization
open-above-airstream-debug-kit: diagnostics
open-above-mail-delivery-domain: parcel/town/volume/progress composition, snapshot, reset and disposal
open-above-mail-parcel-kit: default parcel creation and mutable reset
open-above-mail-route-kit: authored towns and delivery route
open-above-delivery-volume-kit: destination membership
open-above-delivery-progress-kit: current selection, completion mutation and event result
open-above-mail-town-kit: town descriptors and scene representation
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

Services: procedural model loading and assembly, envelope/basket/rigging/burner/rope construction, materials, secondary motion, camera follow, zoom, first-person blend and clipping fade.

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

Services: seeded world/erosion/climate/biome queries, near/horizon terrain streaming, vegetation and flora placement, exclusions, LOD/culling/wind, quality and dynamic resolution, sky/cloud/water lighting, HDR composition, grading and lens response.

### UI and tooling: 5

```txt
open-above-parchment-map-overlay-kit
open-above-headless-editor-environment
open-above-static-smoke-test-kit
open-above-airstream-mail-test-kit
open-above-world-flora-test-kit
```

Services: map lifecycle and projection, headless inspection, source/static checks, route/mail proof, world/flora proof, build and Pages adaptation.

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

### Inactive or retired legacy kits: 12

```txt
open-above-hud-projection-kit
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

## Source-backed findings

1. `createGame()` always creates the mail domain from `createDefaultMailRoute()` and creates the balloon simulation with `startPosition: [0, 105, 0]`.
2. `createMailParcel()` always starts `status: "in-transit"`, `delivered: false`, `deliveredAt: null` and `selectedAirstreamId: null`.
3. Delivery changes only the in-memory parcel. The progress kit sets `delivered`, `deliveredAt`, selected current and message, then returns an event.
4. The browser composition imports no save/persistence domain and performs no load before runtime construction.
5. No durable save is scheduled after delivery, periodically, on `visibilitychange`, on `pagehide` or before navigation.
6. No restore command can reconstruct balloon vectors, elapsed time, distance, airstream selection, parcel completion or message from a verified generation.
7. Package checks cover static, terrain, route and flora behavior but declare no persistence fixture.

## Required parent domain

```txt
open-above-flight-session-persistence-authority-domain
```

## Candidate coordinating kits: 22 including parent

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
  -> validate runtime session, world, route, mail and flight revisions
  -> collect detached participant snapshots
  -> normalize and fingerprint a canonical candidate
  -> write a new staging generation
  -> read back and verify schema, bytes and fingerprint
  -> compare expected predecessor and writer lease
  -> atomically promote the verified generation
  -> retain a bounded verified predecessor
  -> publish SaveCommitResult
  -> acknowledge the first frame carrying the committed save revision

RestoreSessionCommand
  -> resolve and verify active generation or bounded backup
  -> migrate supported schemas or quarantine invalid records
  -> validate world, route and participant compatibility
  -> prepare detached flight, mail, airstream and camera candidates
  -> atomically install one restored session generation
  -> publish RestoreCommitResult
  -> acknowledge the first visible restored frame
```

## Required invariants

```txt
no UI or telemetry may claim saved before durable verification
reload after an accepted save restores the same parcel and flight revisions
failed or stale saves do not replace the verified predecessor
partial participant restore is rejected or rolled back truthfully
unsupported or corrupt records are quarantined, not silently consumed
reset and save converge on one durable result
page lifecycle flushes are typed, bounded and idempotent
visible restored frames cite the installed persistence generation
```

## Validation boundary

Documentation only. Runtime JavaScript, HTML, dependencies, package scripts, gameplay, rendering and deployment were not changed. No browser-storage, migration, corruption, conflict, lifecycle, build or Pages persistence fixture was run.