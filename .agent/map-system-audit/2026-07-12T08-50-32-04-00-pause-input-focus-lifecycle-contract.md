# Map System Audit: Pause, Input, Focus and Lifecycle Contract

**Timestamp:** `2026-07-12T08-50-32-04-00`

## Summary

The parchment map has a useful local API, but its `open` Boolean, global listener, ResizeObserver, RAF, canvas projection and `dispose()` are not owned by a map-session or runtime-session contract. The map should be treated as a first-class product domain rather than a presentation helper.

## Plan ledger

**Goal:** define the complete lifecycle and observable contract for one map generation.

- [x] Inventory map-owned resources and callbacks.
- [x] Inventory map source dependencies.
- [x] Define open, close, suspend, resume and dispose phases.
- [x] Define focus, semantic and observation requirements.
- [ ] Implement the contract and fixtures.

## Owned resources

```txt
map root element
map canvas element
2D rendering context
ResizeObserver
window keydown listener
recursive map RAF ID
open state
CSS/physical surface dimensions
world surface center and radius
route references
town references
player-state getter
parcel getter
```

## Required phases

```txt
NEW
READY
OPENING
OPEN
CLOSING
CLOSED
DISPOSING
DISPOSED
FAILED
```

`open` becomes a derived compatibility value:

```txt
open = phase === OPEN || phase === OPENING
```

## Source contract

The map frame must consume immutable admitted observations:

```txt
MapWorldSource
  worldSurfaceFingerprint
  routesRevision
  townsRevision
  parcelRevision
  playerPoseRevision
  sourceTimestamp
```

Direct reads from mutable simulation and parcel owners should be replaced by a source observation captured at the map-frame boundary.

## Projection contract

```txt
MapProjectionResult
  mapGeneration
  projectionRevision
  sourceFingerprint
  surfaceRevision
  frameId
  routesProjected
  townsProjected
  destinationProjected
  playerProjected
  semanticSummaryRevision
  accepted
  failure
```

## Accessibility contract

The canvas-only map needs a semantic sibling describing:

```txt
current destination
current region or coordinates
available Air Mail routes
captured/current route
player heading
map controls
close action
```

The dialog needs a focusable owner and deterministic close control. `aria-modal` alone is not a focus-management transaction.

## Lifecycle contract

```txt
start
  -> validate DOM and 2D context
  -> allocate generation
  -> register listener/observer leases
  -> publish READY

open
  -> run transition transaction
  -> begin admitted map projection
  -> publish OPEN and first-frame receipt

close
  -> stop map projection
  -> revoke map input/focus leases
  -> publish CLOSED and resumed-flight receipt

dispose
  -> reject new transitions
  -> cancel RAF
  -> disconnect observer
  -> remove listener
  -> revoke focus and source leases
  -> publish DISPOSED retirement receipts
```

## Idempotency

```txt
open while OPEN returns prior open result
close while CLOSED returns prior close result
dispose while DISPOSED returns prior retirement result
stale generation commands are rejected
predecessor RAF callbacks are fenced
```

## Public observation

`GameHost.getState()` should expose detached map observation only:

```txt
phase
mapGeneration
projectionRevision
pauseRevision
inputGeneration
surfaceRevision
sourceFingerprint
lastTransitionResult
lastProjectionResult
lastVisibleFrameId
focusState
```

It should not expose the mutable map owner or canvas context.

## Required fixtures

```txt
fixture:map-start-ready
fixture:map-open-close-idempotency
fixture:map-dispose-idempotency
fixture:map-callback-fence-after-dispose
fixture:map-resize-observer-retirement
fixture:map-semantic-summary
fixture:map-focus-owner-and-close-control
fixture:map-source-fingerprint-change
fixture:map-public-observation-detached
```

The current `dispose()` method is a useful local primitive, but it is not proof of lifecycle ownership until the host invokes it through a session retirement transaction.