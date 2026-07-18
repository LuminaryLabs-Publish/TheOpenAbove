# Current Audit: TheOpenAbove Map-Open Dual-Surface Render Work Budget

**Last aligned:** `2026-07-18T12-38-04-04-00`  
**Status:** `map-open-dual-surface-render-work-budget-authority-audited`  
**Reviewed pre-audit repository head:** `28bed180bac93a326dfa1a31ab54699387698086`

## Summary

The active Meadow Lift scene retains Journey, Ballooning, Sky, Land, Navigation, Image Capture, and Experience. The focused audit covers map-open presentation between the accepted map toggle and the visible Three.js plus Canvas2D surfaces.

Journey suppresses gameplay updates while the map is open, but continues its primary RAF and Experience render path with `dt: 0`. The parchment map starts a second independent RAF and redraws mostly retained state every frame. No shared generation settles the main background policy, map dirty state, combined work budget, or matching visible frame.

## Intent

Make one map-open generation authoritative for both presentation surfaces, their cadence, dirty-state admission, RAF ownership, work budgets, diagnostics, retirement, and exact frame convergence.

## Interaction loop

```txt
boot
  -> Journey owns primary RAF
  -> Navigation mounts parchment overlay

map toggle
  -> M opens map
  -> overlay resizes and starts map RAF
  -> Journey detects map-open state

map-open frame
  -> Journey skips simulation update
  -> Journey still calls Experience.render(dt=0)
  -> Journey schedules next primary RAF
  -> map RAF redraws map canvas
  -> map RAF schedules next map RAF

close / retirement
  -> M or Escape closes map
  -> overlay cancels map RAF
  -> Journey resumes simulation update
  -> disposal cancels both owners through their own domains
```

## Domains in use

```txt
Journey: primary RAF, map state, update suppression, main render, failure containment
Navigation: map mount/open/close/refresh/snapshot/disposal
Parchment Map: Canvas2D RAF, resize, cache, routes, Snap Points, player, reference card
Meadow Lift: domain composition and update/render ordering
Experience: Three.js world, balloon, clouds, HDR and final game-canvas presentation
Ballooning/Sky/Land/Image Capture: retained state consumed by map projection
Core World/Weather: world and atmosphere data consumed by both surfaces
Validation/Deploy: source checks, Vite artifact, provider revision and Pages
```

## Current finding

```txt
Journey primary RAF while map open: present
map independent RAF while open: present
scheduled RAF loops while map open: 2
simulation update while open: suppressed
Experience.render while open: present with dt zero
map redraw while open: every map RAF
fixed decorative circles per map draw: 90
reference gradient creations per map draw: 1
world-map revision cache: present
close/dispose map RAF cancellation: present

MapOpenGeneration: absent
MapSurfacePlanResult: absent
MapRedrawAdmissionResult: absent
MapRenderWorkBudgetResult: absent
MapSurfaceDigest: absent
FirstMapBoundFrameAck: absent
```

At a hypothetical 60 displayed frames per second, source arithmetic yields 120 RAF callbacks, 60 Experience render calls, 60 map draws, 5,400 decorative-circle iterations, and 60 gradient creations per second. No browser or GPU measurement was performed.

## Required authority

`open-above-map-open-dual-surface-render-work-budget-authority-domain`

## Inventory

The complete 125-surface kit/provider/adapter inventory and offered services are recorded in:

```txt
.agent/trackers/2026-07-18T12-38-04-04-00/project-breakdown.md
```

## Boundary

Documentation only. Runtime, rendering, gameplay, input, tests, build, and deployment were not changed by this audit.