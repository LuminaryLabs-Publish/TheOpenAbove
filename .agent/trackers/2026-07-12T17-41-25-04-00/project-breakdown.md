# TheOpenAbove Project Breakdown

**Generated:** `2026-07-12T17-41-25-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Runtime revision reviewed:** `c2b96fa4d0dc44f6f3cf52762834324e712ed7d9`  
**Status:** `flight-world-membership-authority-audited`

## Summary

TheOpenAbove declares a bounded 10,000-unit world but integrates balloon movement without consulting that boundary. This pass documents the missing movement-admission authority, preserves the complete 68-kit inventory, and defines the transaction required to keep flight, world consumers, map projection and the visible frame on one world-membership result.

## Plan ledger

**Goal:** make every balloon movement proposal prove world membership and commit one authored boundary outcome before any gameplay, streaming, map or render consumer accepts the successor position.

- [x] Compare the full ten-repository Publish inventory with all central ledger entries.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `TheOpenAbove` by the oldest eligible synchronized ledger timestamp.
- [x] Inspect world configuration, simulation integration, host frame order, map input and current audit state.
- [x] Identify the complete interaction loop and every active domain.
- [x] Preserve all 68 source-backed kits, 12 runtime-implied kits, 12 inactive/retired kits and offered services.
- [x] Define flight/world identities, proposal, swept membership, policy, result, atomic commit and visible-frame contracts.
- [x] Add one timestamped tracker, turn ledger and architecture/system audit family.
- [x] Refresh required root `.agent` files and machine registry.
- [x] Create no branch or pull request.
- [ ] Runtime implementation and executable boundary fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

TheOpenAbove       2026-07-12T15-40-04-04-00 selected
IntoTheMeadow      2026-07-12T15-49-09-04-00
PhantomCommand     2026-07-12T16-00-03-04-00
PrehistoricRush    2026-07-12T16-20-55-04-00
HorrorCorridor     2026-07-12T16-39-35-04-00
ZombieOrchard      2026-07-12T16-51-47-04-00
MyCozyIsland       2026-07-12T17-10-31-04-00
TheUnmappedHouse   2026-07-12T17-20-42-04-00
AetherVale         2026-07-12T17-35-48-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/TheOpenAbove` is in scope.

## Interaction loop

```txt
boot
  -> construct bounded-disk world and camera-relative visual systems
  -> construct balloon simulation at the authored start
  -> publish map, telemetry and public host
  -> schedule RAF

frame
  -> read held keys
  -> sample airstream
  -> integrate horizontal and vertical velocity
  -> add velocity * dt directly to balloon position
  -> enforce terrain floor and soft altitude ceiling
  -> update mail, camera, terrain, vegetation-adjacent flora and HDR
  -> render

boundary crossing
  -> balloon may cross the 10,000-unit bounded-disk radius
  -> no membership admission or crossing result runs
  -> no accept, soft-return, clamp, reject or terminal policy is selected
  -> map and streamed world consumers continue from an unclassified position
  -> no boundary revision or visible-frame acknowledgement is published
```

## Main finding

`WORLD.surface` declares a bounded disk centered at `(0, 0)` with radius `10000`, edge blend `600`, and an outside floor. `createBalloonSimulation().update(dt)` adds horizontal velocity directly to `state.position` and only applies a terrain floor plus a vertical soft ceiling. It never samples the world surface, classifies inside/edge/outside, detects a high-speed crossing, or returns a boundary result.

The host then uses that unclassified flight state to update mail, camera, terrain, flora, telemetry, the map, and the rendered frame. The repository therefore has a bounded world description but no authoritative rule for whether an outside position is accepted, redirected, clamped, rejected, terminal, or merely visual.

## Domains in use

```txt
browser shell, canvas, map, fatal projection and public host
runtime boot, session, keyboard/wheel input, RAF and telemetry
balloon motion, steering, burner, vent, altitude and distance
airstream routes, sampling, force, visuals and debug
mail parcel, town, delivery volume and progress
seeded world generation, bounded-disk membership, erosion, climate, biome and flora
terrain near/horizon streaming, ownership, geometry and disposal
vegetation, grass and flower placement, exclusion, LOD, culling and wind
balloon construction, rigging, material, camera and secondary presentation
quality, dynamic resolution, sky, sun, clouds, water, HDR and lens response
parchment-map projection, headless proof, tests, build and Pages
missing flight/world membership admission, boundary policy, commit and proof
```

## Active source-backed kits

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

### UI: 1

```txt
open-above-parchment-map-overlay-kit
```

### Tooling and proof: 4

```txt
open-above-headless-editor-environment
open-above-static-smoke-test-kit
open-above-airstream-mail-test-kit
open-above-world-flora-test-kit
```

## Runtime-implied adapters: 12

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

## Inactive or retired legacy surfaces: 12

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

## Offered services

```txt
runtime/gameplay:
  flight input and integration
  airstream route, field, force, visual and debug
  mail parcel, town, volume, progress and reset
  telemetry and snapshots

balloon/object/presentation:
  envelope profile and panel construction
  mouth, seams, basket, rigging, burner and rope
  deferred model loading
  secondary motion, materials, camera and clipping

world/environment:
  seeded grid, protected anchors, erosion and flow
  climate, biome, flora, disk membership and map colors
  shared camera-relative terrain frame and near/horizon geometry
  boot vegetation, grass/flower chunks, atlases, LOD, culling, wind and exclusions
  sky, sun, aerial perspective, clouds, water, HDR, color grade and lens response

UI/tooling:
  parchment-map lifecycle and projection
  headless inspection
  source validation, game/world/flora fixtures
  build and Pages adaptation
```

## Required parent domain

```txt
open-above-flight-world-membership-authority-domain
```

## Candidate coordinating kits

```txt
open-above-flight-world-membership-authority-domain
open-above-flight-command-id-kit
open-above-flight-frame-id-kit
open-above-world-surface-revision-kit
open-above-flight-state-revision-kit
open-above-flight-position-proposal-kit
open-above-world-membership-sample-kit
open-above-flight-boundary-band-kit
open-above-flight-boundary-policy-kit
open-above-flight-edge-return-force-kit
open-above-flight-outside-rejection-kit
open-above-flight-boundary-result-kit
open-above-flight-world-consumer-receipt-kit
open-above-flight-world-frame-commit-kit
open-above-stale-flight-frame-rejection-kit
open-above-flight-boundary-observation-kit
open-above-flight-boundary-journal-kit
open-above-flight-boundary-visible-frame-ack-kit
open-above-flight-center-membership-fixture-kit
open-above-flight-edge-transition-fixture-kit
open-above-flight-outside-rejection-fixture-kit
open-above-flight-high-speed-crossing-fixture-kit
open-above-flight-map-world-parity-fixture-kit
open-above-flight-pages-boundary-smoke-kit
```

## Required transaction

```txt
FlightFrameCommand
  -> validate runtime session, frame sequence and predecessor flight revision
  -> bind the current WorldSurfaceRevision
  -> construct a detached position/velocity proposal
  -> sample start and proposed positions against bounded-disk membership
  -> detect center, edge-band, outside and swept high-speed crossings
  -> apply one authored Accept, SoftReturn, Clamp, Reject or Terminal policy
  -> construct one immutable FlightBoundaryResult
  -> atomically commit flight state and world-consumer frame evidence
  -> reject stale frame results
  -> publish bounded observations and journal entry
  -> acknowledge the first terrain/flora/map/HDR frame citing the committed result
```

## Required invariants

```txt
the committed flight position always cites one WorldSurfaceRevision
inside/edge/outside is explicit for both start and proposed positions
swept crossing detection prevents tunneling across the edge band
outside policy is authored and never inferred by individual consumers
rejected or failed proposals perform zero flight/world-consumer mutation
terrain, vegetation, grass, flowers, mail and map cite the same boundary result
stale frame results cannot re-enter after session/world replacement
the first visible acknowledgement follows the committed boundary result
```

## Validation boundary

Documentation only. Runtime JavaScript, HTML, package scripts, dependencies, gameplay, rendering and deployment were not changed. No Node, browser or Pages boundary fixture was executed.
