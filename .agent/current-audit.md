# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-12T21-18-18-04-00`  
**Status:** `telemetry-snapshot-immutability-readback-authority-audited`  
**Runtime revision reviewed:** `c2b96fa4d0dc44f6f3cf52762834324e712ed7d9`

## Summary

The current telemetry path does not establish an immutable read-model boundary. `getSnapshot()` creates one complete projection, the Nexus telemetry system stores that object directly as `BalloonSnapshot`, and stores its nested `visual` object directly as `VisualSnapshot`. Nexus resources, resource journals, `engine.openAbove` getters and `window.GameHost` retain or return those mutable references.

## Plan ledger

**Goal:** define one snapshot commit whose complete and visual resources, public readback, journal evidence and visible-frame acknowledgement share immutable identity and publication-time truth.

- [x] Compare the full Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove` by the oldest eligible central timestamp.
- [x] Inspect `getSnapshot()`, balloon telemetry, Nexus resource storage and public readback.
- [x] Identify complete interaction loops, domains, 68 source-backed kits and services.
- [x] Define snapshot identity, normalization, alias control, fingerprint, atomic commit and readback isolation.
- [x] Add a complete timestamped audit family and refresh required root files.
- [ ] Runtime implementation and executable mutation fixtures remain future work.

## Selection result

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
selected repository: LuminaryLabs-Publish/TheOpenAbove
selection basis: oldest eligible central update at 2026-07-12T19-31-06-04-00
excluded repository: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
frame update
  -> mutate flight, mail, airstream, camera and visual state
  -> build getSnapshot() projection
  -> telemetry simulate system receives projection
  -> store full object as BalloonSnapshot
  -> store nested visual object as VisualSnapshot
  -> emit BalloonTicked scalar metadata
  -> expose resources through engine.openAbove
  -> expose complete resource through GameHost
  -> render frame

public consumer
  -> obtains engine-owned object reference
  -> can mutate nested fields without a command or tick
  -> complete and visual resources can change together through aliasing
  -> journal-held object evidence can change after publication
```

## Source-backed findings

### Full and visual resources share a writable subtree

`world.setResource(BalloonSnapshot, snapshot)` stores the complete object. `world.setResource(VisualSnapshot, snapshot.visual ?? null)` stores the exact nested visual object. The two resource projections are therefore linked by object identity.

### Nexus stores and reads values by reference

The inspected Nexus Engine world places the supplied value directly into `resourceValues`. `getResource()` returns that value directly. No copy, freeze, normalization, schema check or mutation guard is applied.

### Resource journal rows retain object references

Resource records include the supplied `previous` and `value`. They are not detached. Later mutation of those objects can alter the apparent evidence returned when the journal is drained.

### Public readback exposes engine ownership

`engine.openAbove.getState()` and `getVisualState()` return Nexus resource values. `window.GameHost.getState().nexusEngine` returns the complete resource again. No readback envelope, consumer identity, snapshot ID or clone-on-read boundary exists.

### Render and telemetry have no shared receipt

The frame renders after the telemetry tick, but the snapshot has no runtime session, frame ID, visible revision or first-frame acknowledgement. A post-tick mutation can change telemetry without a new visible frame.

## Reachable failure classes

```txt
cross-resource mutation
  -> mutate VisualSnapshot
  -> BalloonSnapshot.visual changes without a tick

public-readback mutation
  -> mutate GameHost Nexus snapshot
  -> engine-owned resource changes in place

journal evidence drift
  -> mutate retained resource object
  -> journal previous/value no longer reflects append-time state

stale read ambiguity
  -> consumer retains predecessor object
  -> successor commits
  -> no identity or lifecycle result distinguishes them

visible telemetry mismatch
  -> mutate published visual values after render
  -> telemetry no longer describes the visible frame
```

No claim is made that these paths are exercised by production callers. They are permitted by the current ownership boundary.

## Domains in use

```txt
browser shell, canvas, map, fatal projection and GameHost
runtime boot, session, input, RAF and telemetry
balloon motion, steering, burner, vent, altitude and distance
airstream routes, samples, force, visuals and debug
mail parcel, towns, delivery volume and progress
seeded world generation, disk membership, erosion, climate, biome and flora
terrain near/horizon streaming and resource disposal
vegetation, grass and flowers, exclusions, chunks, LOD, culling and wind
balloon geometry, materials, rigging, camera and secondary presentation
quality, dynamic resolution, illumination, clouds, water, HDR and lens
map projection, headless proof, tests, build and Pages
Nexus resource, event and journal storage
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
```

## Offered services

```txt
runtime/gameplay:
  flight input/integration, telemetry, airstream routing/force, mail delivery and reset

balloon/object/presentation:
  procedural envelope/basket/rigging/burner/rope, materials, secondary motion, camera and clipping

world/environment:
  seeded world, anchors, erosion, biome, terrain streaming, vegetation, grass/flowers,
  quality, dynamic resolution, sky, clouds, water, HDR, color grade and lens response

UI/tooling:
  parchment map, headless inspection, source/static checks, world/flora and route/mail proof,
  build and Pages adaptation
```

All active kit names and per-kit services are preserved in the latest tracker and `.agent/kit-registry.json`.

## Required parent domain

```txt
open-above-telemetry-snapshot-immutability-authority-domain
```

## Candidate coordinating kits

```txt
open-above-telemetry-snapshot-session-kit
open-above-telemetry-frame-id-kit
open-above-telemetry-source-revision-kit
open-above-telemetry-snapshot-id-kit
open-above-telemetry-snapshot-builder-kit
open-above-telemetry-normalization-kit
open-above-telemetry-content-fingerprint-kit
open-above-telemetry-deep-freeze-kit
open-above-telemetry-resource-projection-kit
open-above-visual-snapshot-projection-kit
open-above-telemetry-alias-detector-kit
open-above-telemetry-atomic-commit-kit
open-above-telemetry-readback-envelope-kit
open-above-telemetry-clone-on-read-kit
open-above-telemetry-consumer-receipt-kit
open-above-telemetry-mutation-rejection-kit
open-above-telemetry-observation-kit
open-above-telemetry-immutable-journal-kit
open-above-first-visible-telemetry-frame-ack-kit
open-above-cross-resource-alias-fixture-kit
open-above-public-readback-mutation-fixture-kit
open-above-journal-retroactive-mutation-fixture-kit
open-above-telemetry-consumer-parity-fixture-kit
open-above-telemetry-pages-smoke-kit
```

## Required transaction

```txt
TelemetrySnapshotCommand
  -> validate runtime session, frame and predecessor snapshot
  -> collect detached provider projections and source revisions
  -> normalize nested values into a canonical candidate
  -> derive complete and visual resource projections
  -> reject prohibited writable aliasing
  -> calculate content fingerprint
  -> deep-freeze or establish explicit copy boundaries
  -> atomically commit all resource projections
  -> publish TelemetrySnapshotCommitResult
  -> expose revisioned immutable public readback
  -> append immutable journal evidence
  -> collect consumer receipts
  -> acknowledge first visible frame citing the same snapshot ID
```

## Required invariants

```txt
public callers cannot mutate engine-owned telemetry
complete and visual resources cite one snapshot and frame
shared subtrees are immutable or detached
resource journals cannot drift after append
failed or stale candidates perform zero live mutation
predecessor pair remains available until successor commit succeeds
visible acknowledgement follows a successful snapshot commit
```

## Validation boundary

Documentation only. Runtime source, HTML, package scripts, dependencies, gameplay, rendering and deployment were not changed. No mutation, alias, journal-integrity, browser, built-output or Pages fixture was run.
