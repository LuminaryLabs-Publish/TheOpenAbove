# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-12T21-31-40-04-00`  
**Status:** `telemetry-snapshot-immutability-central-reconciled`  
**Runtime revision reviewed:** `c2b96fa4d0dc44f6f3cf52762834324e712ed7d9`

## Summary

The repo-local telemetry snapshot immutability audit was newer than the central ledger, so TheOpenAbove was selected for reconciliation. The current telemetry path still lacks an immutable read-model boundary: `getSnapshot()` creates one complete projection, the telemetry kit stores it directly as `BalloonSnapshot`, stores its nested `visual` object directly as `VisualSnapshot`, and Nexus resources, journals, engine getters and `GameHost` retain or return those mutable references.

## Plan ledger

**Goal:** synchronize one source-backed telemetry audit and preserve the exact authority needed for immutable complete/visual resources, journal evidence, public readback and visible-frame acknowledgement.

- [x] Compare the full Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `TheOpenAbove` because its repo-local telemetry audit was newer than central tracking.
- [x] Inspect `getSnapshot()`, telemetry publication, Nexus resource storage and public readback.
- [x] Identify the complete interaction loop, domains, 68 source-backed kits and services.
- [x] Preserve snapshot identity, normalization, alias control, fingerprint, atomic commit and readback requirements.
- [x] Add a reconciliation tracker and complete system audit family.
- [ ] Runtime implementation and executable mutation fixtures remain future work.

## Selection result

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
selected repository: LuminaryLabs-Publish/TheOpenAbove
selection basis: repo-local telemetry audit newer than central ledger
excluded repository: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
browser boot
  -> compose visual, balloon, airstream, mail, map and camera services
  -> create balloon simulation and Nexus telemetry engine
  -> publish GameHost
  -> start recursive RAF

frame while map is closed
  -> update simulation, delivery, airstream, pose, camera and visual state
  -> engine.tick(dt)
      -> build getSnapshot() object
      -> store complete object as BalloonSnapshot
      -> store snapshot.visual as VisualSnapshot
      -> emit BalloonTicked scalar event
      -> append resource journal records containing object references
  -> render the frame

public consumer
  -> call engine.openAbove.getState/getVisualState or GameHost.getState
  -> receive engine-owned object reference
  -> mutate nested state without command or tick
  -> complete/visual resources and journal evidence can drift
```

## Source-backed findings

### Full and visual resources share a writable subtree

`world.setResource(BalloonSnapshot, snapshot)` stores the complete object. `world.setResource(VisualSnapshot, snapshot.visual ?? null)` stores the exact nested visual object.

### Nexus stores and reads by reference

`setResource()` places the supplied value directly in `resourceValues`; `getResource()` returns it directly. Resource journal rows retain the supplied `previous` and `value` references.

### Public readback exposes engine ownership

`engine.openAbove.getState()` and `getVisualState()` return Nexus resource values. `window.GameHost.getState().nexusEngine` returns the complete resource again. No immutable envelope, consumer identity, snapshot ID or clone-on-read boundary exists.

### Render and telemetry have no shared receipt

The frame renders after the telemetry tick, but the snapshot has no runtime session, frame identity, content fingerprint or first-visible-frame acknowledgement. A post-tick mutation can change telemetry without a new visible frame.

## Reachable failure classes

```txt
cross-resource mutation
  -> mutate VisualSnapshot
  -> BalloonSnapshot.visual changes without a tick

public-readback mutation
  -> mutate GameHost Nexus snapshot
  -> engine-owned telemetry changes in place

journal evidence drift
  -> mutate retained resource object
  -> journal previous/value no longer reflects append-time state

stale read ambiguity
  -> consumer retains predecessor object
  -> successor commits
  -> no identity distinguishes generations

visible telemetry mismatch
  -> mutate published values after render
  -> telemetry no longer describes the visible frame
```

No claim is made that a production consumer currently exercises these paths. The ownership boundary permits them.

## Domains in use

```txt
browser shell, canvas, map, fatal projection and GameHost
runtime boot, session, input, RAF and telemetry
Nexus resource, event and journal storage
balloon motion, steering, burner, vent, altitude and distance
airstream routes, samples, force, visuals and debug
mail parcel, towns, delivery volumes and progress
seeded world generation, erosion, climate, biome and flora
terrain near/horizon streaming and disposal
vegetation, grass and flowers, exclusions, chunks, LOD, culling and wind
balloon geometry, materials, rigging, camera and presentation
quality, dynamic resolution, illumination, clouds, water, HDR and lens
map projection, headless proof, tests, build and Pages
missing telemetry identity, immutability, alias control, readback isolation and proof
```

## Implemented kit census

```txt
runtime/gameplay: 15
balloon/object/presentation: 15
visual/world/environment: 33
UI: 1
tooling/proof: 4
active source-backed total: 68
runtime-implied adapters: 12
inactive/retired legacy: 12
planned telemetry authority including parent: 25
```

## Offered services

```txt
runtime/gameplay:
  flight input/integration, telemetry resource/event publication,
  airstream route/field/force/visual/debug, mail parcel/town/volume/progress/reset

balloon/object/presentation:
  envelope/basket/rigging/burner/rope construction, materials,
  deferred loading, secondary motion, camera and clipping

world/environment:
  seeded world, erosion, biome, terrain streaming, vegetation, grass/flowers,
  quality, dynamic resolution, sky, clouds, water, HDR, color grade and lens

UI/tooling:
  parchment map, headless inspection, source/static checks,
  world/flora and route/mail proof, build and Pages adaptation
```

All active kit names and per-kit services are preserved in the latest tracker and `.agent/kit-registry.json`.

## Required parent domain

```txt
open-above-telemetry-snapshot-immutability-authority-domain
```

## Required transaction

```txt
TelemetrySnapshotCommand
  -> validate runtime session, frame and predecessor snapshot
  -> collect detached provider projections and source revisions
  -> normalize nested values into a canonical candidate
  -> derive complete and visual projections
  -> reject prohibited writable aliasing
  -> calculate content fingerprint
  -> deep-freeze or establish explicit copy boundaries
  -> atomically commit both resources
  -> publish typed commit result
  -> append immutable journal evidence
  -> expose immutable revisioned readback
  -> collect consumer receipts
  -> acknowledge the first visible matching frame
```

## Required invariants

```txt
public callers cannot mutate engine-owned telemetry
complete and visual resources cite one snapshot and frame
shared subtrees are immutable or detached
resource journals cannot drift after append
failed or stale candidates perform zero live mutation
predecessor pair remains available until successor commit succeeds
visible acknowledgement follows successful commit and render
```

## Validation boundary

Documentation only. Runtime source, HTML, package scripts, dependencies, gameplay, rendering and deployment were not changed. No mutation, alias, journal-integrity, browser, built-output or Pages fixture was run.