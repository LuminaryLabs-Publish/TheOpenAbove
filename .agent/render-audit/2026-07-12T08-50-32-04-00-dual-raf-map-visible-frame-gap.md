# Render Audit: Dual-RAF Map Visible-Frame Gap

**Timestamp:** `2026-07-12T08-50-32-04-00`

## Summary

Opening the parchment map leaves the main RAF active and starts a second recursive RAF for the map canvas. The main loop renders the 3D scene with `dt=0`, while the map loop independently redraws route, town, destination and player markers. No shared frame ID or commit proves which frozen world state the visible map represents.

## Plan ledger

**Goal:** make map and world presentation derive from one admitted frame plan and publish one visible-frame receipt.

- [x] Trace main and map RAF ownership.
- [x] Trace map source reads and world rendering while paused.
- [x] Identify missing frame, projection and source revisions.
- [x] Define one-owner and frame-acknowledgement requirements.
- [ ] Implement executable render cadence and transition fixtures.

## Current frame topology

```txt
main RAF
  -> update last timestamp
  -> skip simulation owners when map open
  -> visual.render(0, frameMs)
  -> schedule main RAF

map RAF
  -> read live player and parcel objects
  -> clear and redraw map canvas
  -> schedule map RAF
```

## Gaps

```txt
no shared frame ID
no map projection revision
no immutable map frame plan
no world-source fingerprint
no route/town/parcel/player revisions
no committed frozen-world snapshot
no map-open first-frame acknowledgement
no map-close first-resumed-frame acknowledgement
no stale map-frame rejection
no one-owner cadence policy
```

The map reads mutable player and parcel objects directly. Simulation is skipped while open, but other callbacks or future owners could mutate those objects without invalidating a prepared map frame.

## Required frame plan

```txt
MapFramePlan
  frameId
  mapGeneration
  pauseRevision
  projectionRevision
  surfaceRevision
  worldSurfaceFingerprint
  routeRevision
  townRevision
  parcelRevision
  playerPoseRevision
  cssWidth
  cssHeight
  devicePixelRatio
  physicalWidth
  physicalHeight
```

## Required rendering rule

```txt
open transition commit
  -> freeze admitted map source observation
  -> allocate one map-frame owner
  -> render map frame from immutable plan
  -> publish projection result
  -> acknowledge first visible map frame

subsequent paused frames
  -> render only when an admitted source or surface revision changes
  -> return typed no-op when unchanged

close transition
  -> revoke map frame owner
  -> render first resumed 3D frame from new input/pause revision
  -> acknowledge resumed frame
```

## Required fixtures

```txt
fixture:single-map-frame-owner
fixture:map-open-first-visible-frame
fixture:map-unchanged-projection-no-op
fixture:map-source-revision-invalidation
fixture:map-stale-frame-rejection
fixture:map-30-60-120hz-parity
fixture:map-close-first-resumed-frame
fixture:resize-dpr-map-surface-parity
```

A visually correct parchment canvas is not proof that its route, parcel, player and frozen world state belong to one committed frame.