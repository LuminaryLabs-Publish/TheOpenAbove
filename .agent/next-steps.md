# Next Steps: TheOpenAbove Map-Open Dual-Surface Render Work Budget

**Last aligned:** `2026-07-18T12-38-04-04-00`  
**Status:** `map-open-dual-surface-render-work-budget-authority-audited`

## Summary

Preserve current map interaction while replacing implicit dual-RAF behavior with an explicit, generation-owned plan for the world background and parchment redraw surface.

## Intent

Produce one deterministic path from map-open admission through background policy, dirty-state redraw, combined work settlement, retirement, and the matching visible frame.

## What needs to happen

### Gate 1: Map-open generation

- [ ] Add `MapOpenGeneration` bound to Journey, Navigation, world, capture, player-pose and viewport revisions.
- [ ] Publish `MapOpenGenerationResult` when open is accepted.
- [ ] Retire the generation exactly once on close or disposal.

### Gate 2: Surface plan

- [ ] Define explicit background policies: `live-full`, `live-reduced`, `static-snapshot`, and `suspended`.
- [ ] Choose a policy from product intent and measured evidence.
- [ ] Define map transition and steady-open redraw cadence.
- [ ] Publish `MapSurfacePlanResult`.

### Gate 3: Dirty-state admission

- [ ] Track open, transition, world, route, Snap Point, capture, player-pose, viewport and style revisions.
- [ ] Admit redraw only for an accepted reason or explicit animation cadence.
- [ ] Reject unchanged and stale work.
- [ ] Publish `MapRedrawAdmissionResult`.

### Gate 4: RAF ownership

- [ ] Keep one stable Journey RAF lease.
- [ ] Decide whether a separate map RAF is required by the accepted surface plan.
- [ ] Prevent duplicate leases across repeated open commands.
- [ ] Cancel every map-specific lease before close/dispose returns.

### Gate 5: Work settlement

- [ ] Count Journey callbacks, map callbacks, Experience renders and map draws.
- [ ] Count world-map rebuilds, decorative primitives, route points, Snap Points and gradient creations.
- [ ] Measure Canvas2D duration, background render duration and frame cadence.
- [ ] Publish `MapRenderWorkBudgetResult` from measurements rather than source arithmetic.

### Gate 6: Diagnostics and frame proof

- [ ] Expose map generation, surface policy, redraw reason, dirty revisions, RAF lease IDs and work result.
- [ ] Publish `MapSurfaceDigest` after both accepted surfaces commit.
- [ ] Publish `FirstMapBoundFrameAck` after the matching frame is visible.

### Gate 7: Fixtures

- [ ] Open map from a stable flight frame and record both RAF paths.
- [ ] Hold unchanged steady-open state and verify the admitted redraw policy.
- [ ] Resize while open and closed.
- [ ] Rapidly open/close/open and prove no stale callback survives.
- [ ] Verify retained flight, player marker and capture completion revisions.
- [ ] Compare source, Vite artifact and Pages behavior.

## Recommended file cut

```txt
src/domains/navigation/map-render-budget/
  map-open-dual-surface-render-work-budget-authority-domain.js
  map-open-generation-kit.js
  map-surface-plan-kit.js
  parchment-map-dirty-state-kit.js
  map-redraw-admission-kit.js
  map-render-work-budget-kit.js
  map-surface-digest-kit.js

src/domains/journey/
  journey-domain.js

src/ui/
  parchment-map-overlay.js

tests/
  map-dual-raf-browser.mjs
  map-dirty-redraw.mjs
  map-open-resize-retirement.mjs
```

## Compatibility constraints

Preserve M/Escape controls, map modal semantics, translucent overlay appearance, CSS transitions, generated map cache, routes, Snap Points, player marker, reference card, map-open flight suspension, camera/world presentation intent, snapshots, failure handling, resize and disposal behavior.

## Do not claim

Do not claim reduced RAF work, lower Canvas2D cost, lower GPU cost, improved frame time, battery improvement, exact frame convergence, artifact parity, Pages parity, or production readiness until implementation and fixtures exist.