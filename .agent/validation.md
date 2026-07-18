# Validation: TheOpenAbove Map-Open Dual-Surface Render Work Budget

**Last aligned:** `2026-07-18T12-38-04-04-00`

## Scope

Documentation-only reconciliation of the full Publish inventory, the current interaction/domain/kit/service inventory, and the map-open dual-RAF, dirty-redraw, combined-work, retirement and visible-frame gap.

## Summary

Source inspection confirms one Journey-owned RAF, map-open simulation suppression, continued Experience rendering with `dt: 0`, one map-owned RAF while open, map RAF cancellation on close/dispose, world-map revision caching, ResizeObserver retirement and a DPR cap of two.

It also confirms that the map redraws all composed content every map RAF, including 90 decorative circles and a newly created reference-card gradient, without one accepted surface plan or dirty-state result. These are source observations and arithmetic, not measured browser or GPU results.

## Checklist

- [x] Enumerate all 11 accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and root `.agent` states.
- [x] Confirm every eligible `main` head matches its documented repo-local head.
- [x] Select TheOpenAbove by the oldest documented-selection rule.
- [x] Inspect Journey, Meadow Lift, Navigation, parchment overlay, index overlay styling, resize and retirement.
- [x] Reconcile all 125 active documented surfaces and offered services.
- [x] Add and route the timestamped audit family.
- [ ] Execute dual-RAF, dirty-redraw, resize, transition, browser, artifact and Pages fixtures.

## Confirmed by inspection

```txt
reviewed repository head: 28bed180bac93a326dfa1a31ab54699387698086
semantic active domains: 7
active documented surfaces: 125
inactive Air Mail surfaces: 6

Journey primary RAF: yes
map-open simulation suppression: yes
Experience.render while map open: yes, dt zero
map independent RAF while open: yes
map RAF cancellation on close/dispose: yes
world-map revision cache: yes
ResizeObserver retirement: yes
map DPR cap: 2

scheduled loops while map open: 2
fixed decorative circles per map draw: 90
reference gradient creations per map draw: 1

MapOpenGeneration: no
MapSurfacePlanResult: no
MapRedrawAdmissionResult: no
MapRenderWorkBudgetResult: no
MapSurfaceDigest: no
FirstMapBoundFrameAck: no
```

## Source inspection performed

```txt
LuminaryLabs-Publish organization inventory
LuminaryLabs-Dev/LuminaryLabs Publish ledgers
TheOpenAbove central ledger and root .agent state
src/domains/journey/journey-domain.js
src/scenes/meadow-lift-scene.js
src/domains/navigation/navigation-domain.js
src/ui/parchment-map-overlay.js
index.html
previous complete kit/service tracker
```

## What source inspection proves

```txt
Journey continues scheduling frames while the map is open
Journey skips gameplay update while the map is open
Meadow Lift still routes Journey render to Experience
map open starts an independent map RAF
map draw recomposes the Canvas2D surface every map RAF
close and dispose cancel the current map RAF handle
world background regeneration is revision-cached
```

## What is not proven

```txt
actual RAF callback frequency
actual Canvas2D or Three.js frame duration
actual GPU, battery or thermal cost
user-visible performance impact
correct product choice for background presentation
performance improvement from dirty redraw
exact map/world/capture/player frame convergence
source, artifact and Pages parity
production readiness
```

## Required fixtures

```txt
stable flight -> record baseline Journey callback/render counts
open map -> record Journey and map RAF counts
unchanged steady-open state -> verify admitted dirty policy
resize open/closed -> one viewport settlement per revision
rapid open/close/open -> no duplicate or stale callbacks
dispose -> zero further map or Journey callbacks
world/capture/player revision changes -> matching map redraw reason
accepted map generation -> MapSurfaceDigest and FirstMapBoundFrameAck
source -> Vite artifact -> Pages results match
```

## Change scope

```txt
documentation changed: yes
runtime JavaScript changed by audit: no
rendering, gameplay or input changed by audit: no
tests or package scripts changed by audit: no
workflow or deployment changed by audit: no
branch created: no
pull request created: no

npm run check: not run
npm run build: not run
browser RAF fixture: not run
Canvas2D profile: not run
artifact downloaded: no
Pages origin fetched: no
```

## Claims intentionally withheld

No claim is made for measured callback cadence, Canvas2D cost, GPU cost, reduced work, improved frame time, battery or thermal benefit, exact frame convergence, artifact parity, Pages parity, or production readiness.