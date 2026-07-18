# Map System Audit: Parchment Dirty-Redraw Budget Contract

**Timestamp:** `2026-07-18T12-38-04-04-00`  
**Status:** `map-open-dual-surface-render-work-budget-authority-audited`

## Summary

The parchment map already caches the expensive 96×96 generated-world color canvas by world generation revision. The final map surface does not use equivalent dirty-state admission: while open, it redraws all decoration, route, Snap Point, player and reference-card content every RAF.

## Current dirty evidence

```txt
world generation revision: available
map open/closed state: available
viewport bounds: observable through ResizeObserver
player position and heading: readable
capture completion: readable
Snap Point list: readable
CSS open/close transition: defined
```

## Current redraw behavior

```txt
open -> schedule RAF
RAF -> draw everything
RAF -> schedule next RAF
close -> cancel RAF
```

Only the generated world background has revision-based reuse. The composed map frame has no dirty revision or redraw reason.

## Proposed dirty model

```txt
MapDirtyState
  openRevision
  transitionRevision
  worldRevision
  routeRevision
  snapPointRevision
  captureRevision
  playerPoseRevision
  viewportRevision
  styleRevision
```

A map redraw should be admitted when at least one accepted revision changes or when an explicit animated presentation policy requires another frame.

## Proposed redraw reasons

- `opened`
- `transition-frame`
- `world-changed`
- `routes-changed`
- `snap-points-changed`
- `capture-state-changed`
- `player-marker-changed`
- `viewport-changed`
- `style-changed`
- `diagnostic-request`

## Budget evidence

`MapRenderWorkBudgetResult` should report:

```txt
map generation
redraw reason
RAF callbacks
admitted draws
rejected unchanged draws
world-map rebuilds
decorative primitive count
route point count
Snap Point count
reference-card gradient count
Canvas2D duration
backing-store dimensions and DPR
```

## Retirement contract

- closing retires the active map generation;
- every outstanding map RAF belongs to that generation;
- callbacks from retired generations are rejected before drawing;
- repeated close is harmless;
- disposal cancels RAF, disconnects ResizeObserver and removes key input exactly once;
- reopening creates a new generation and forces one admitted redraw.

## Required fixtures

- open with unchanged state: one initial redraw plus only admitted transition frames;
- remain open with unchanged state: no unbounded redraw loop unless explicitly configured;
- capture revision change: one accepted redraw;
- player pose revision change under a live-marker policy: one accepted redraw;
- resize: one backing-store settlement and redraw;
- rapid open/close/open: no stale callback mutation;
- world revision change: one world-map rebuild and composed redraw;
- browser trace: counts match published budget result.

## Claim boundary

This contract is proposed only. It does not assert that event-driven redraw is automatically superior on every device or that the player marker must remain static under every future map policy.