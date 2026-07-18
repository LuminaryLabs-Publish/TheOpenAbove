# Render Audit: Map-Open Dual-RAF Visible-Frame Gap

**Timestamp:** `2026-07-18T12-38-04-04-00`  
**Status:** `map-open-dual-surface-render-work-budget-authority-audited`

## Summary

Opening the parchment map creates two independently scheduled presentation paths:

```txt
Journey RAF
  -> Experience.render(dt=0)
  -> Three.js world + HDR frame

Parchment RAF
  -> draw()
  -> Canvas2D map frame
```

The overlay is translucent and may intentionally retain a live world background. The gap is not that two surfaces exist; it is that their cadence, dirty state, work budget and shared generation are implicit.

## Source-backed render path

```txt
Journey.frame()
  -> mapOpen = true
  -> skip update()
  -> call render({ dt: 0 })
  -> schedule next Journey RAF

ParchmentMapOverlay.setOpen(true)
  -> resize Canvas2D backing store
  -> refresh world-map cache
  -> schedule map RAF

ParchmentMapOverlay.animate()
  -> draw all map content
  -> schedule next map RAF
```

## Per-map-frame work visible in source

```txt
refresh world-map revision check: 1
clearRect: 1
fixed decorative circles: 90
world background draw: up to 1
route traversal: 1 pass
Snap Point traversal: 1 pass
player marker projection/draw: 1
reference-card search/draw: 1
linear gradient creation: 1
map title/subtitle draw: 2
```

At a hypothetical 60 displayed frames per second:

```txt
Journey callbacks: 60/second
map callbacks: 60/second
Experience render calls: 60/second
map draw calls: 60/second
decorative-circle iterations: 5,400/second
reference gradients: 60/second
```

This arithmetic does not include actual browser synchronization, throttling, GPU work, HDR pass count, route-point count, Snap Point count, Canvas2D implementation cost, compositor behavior or CSS transitions.

## Present strengths

- both RAF leases can be cancelled;
- map RAF runs only while the map is open;
- map world texture is cached by world generation revision;
- the Canvas2D DPR is capped at two;
- the main simulation is frozen while the map is open;
- the overlay visibly communicates modal map state.

## Missing render evidence

```txt
MapSurfacePlanResult: absent
main-scene map-open cadence: implicit full cadence
map dirty revision: absent
map redraw reason: absent
combined surface budget: absent
accepted main/map revision pair: absent
stale map draw rejection: absent
MapSurfaceDigest: absent
FirstMapBoundFrameAck: absent
```

## Required render policy

The authority must choose one explicit main-scene policy for each map-open generation:

1. `live-full` — retain current full-cadence world rendering;
2. `live-reduced` — render background at an admitted lower cadence;
3. `static-snapshot` — present one accepted world frame behind the overlay;
4. `suspended` — stop world rendering while the map is modal.

The parchment surface should redraw only for admitted reasons such as open transition, viewport change, world revision, capture revision, player-marker revision, explicit animation or diagnostics.

## Validation required

- instrument both RAF callback counts;
- count Experience and map render calls while open and closed;
- prove dirty-state redraw behavior;
- exercise resize during map-open state;
- exercise repeated open/close without duplicate loops;
- verify overlay transition and translucent background behavior;
- bind world/capture/player revisions to the presented map frame;
- compare source, artifact and Pages results.

## Claim boundary

No frame-time regression, GPU waste, battery impact, thermal impact, stutter or visual defect was reproduced. This is a render ownership and proof gap.