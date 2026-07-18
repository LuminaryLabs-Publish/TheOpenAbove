# Architecture Audit: Map-Open Dual-Surface Render Work DSK Map

**Timestamp:** `2026-07-18T12-38-04-04-00`  
**Status:** `map-open-dual-surface-render-work-budget-authority-audited`

## Summary

Map-open presentation currently crosses two autonomous frame owners. Journey owns the primary RAF and continues Experience rendering while map updates are suppressed. The parchment overlay owns a second RAF and redraws its Canvas2D surface continuously. No single domain admits both surfaces, selects their cadence, or settles their combined work.

## Current ownership

```txt
open-above-journey-domain
  -> primary requestAnimationFrame lease
  -> map-open state read
  -> simulation update suppression
  -> Experience.render(dt=0) remains active

open-above-navigation-domain
  -> map mount/open/close/refresh/snapshot/disposal
  -> delegates presentation to parchment overlay

open-above-parchment-map-overlay-kit
  -> independent requestAnimationFrame lease while open
  -> Canvas2D resize and DPR
  -> world-map cache
  -> routes, Snap Points, player and reference-card drawing
  -> close/dispose cancellation

open-above-experience-domain
  -> Three.js and HDR frame presentation

open-above-meadow-lift-scene
  -> binds Journey map query to Navigation
  -> always routes Journey render to Experience
```

## DSK/domain gap

The existing domains each behave coherently inside their own boundary. The missing owner sits above them and settles one map-open presentation generation across both browser surfaces.

```txt
MapOpenGeneration
  -> JourneyGeneration
  -> NavigationGeneration
  -> WorldRevision
  -> CaptureRevision
  -> PlayerPoseRevision
  -> ViewportRevision
  -> MainScenePolicy
  -> MapRedrawPolicy
```

Without that generation, the runtime cannot publish a stable answer to:

- whether the 3D background should remain fully live, run at reduced cadence, freeze to a snapshot, or suspend;
- whether the parchment surface is dirty;
- why a map redraw was admitted;
- whether both surfaces represent the same world/capture/player state;
- how much combined work was accepted;
- which visible frame proves the accepted map generation.

## Required parent domain

`open-above-map-open-dual-surface-render-work-budget-authority-domain`

## Proposed DSK breakdown

| Surface | Responsibility |
|---|---|
| `map-open-generation-kit` | create and retire map-open generation identity |
| `map-surface-plan-kit` | resolve main-scene and parchment policies |
| `map-background-world-render-policy-kit` | select live-full, live-reduced, static-snapshot or suspended |
| `map-background-render-cadence-kit` | admit background render cadence |
| `parchment-map-dirty-state-kit` | aggregate dirty evidence |
| `map-redraw-admission-kit` | admit or reject Canvas2D redraw |
| `map-transition-state-kit` | represent open/close transition state |
| `map-player-marker-revision-kit` | version player marker position and heading |
| `map-world-revision-refresh-kit` | version generated map background |
| `map-capture-revision-refresh-kit` | version completion/reference projection |
| `map-viewport-revision-kit` | version CSS and backing-store dimensions |
| `map-raf-lease-kit` | own, reuse and retire any map-specific RAF |
| `map-render-work-budget-kit` | settle main and map work evidence |
| `map-render-result-kit` | publish accepted surface results |
| `stale-map-redraw-rejection-kit` | reject work from old generations |
| `map-surface-digest-kit` | bind state and presentation revisions |
| `first-map-bound-frame-ack-kit` | acknowledge matching visible frame |
| `dual-raf-browser-fixture-kit` | prove callback/cadence policy |
| `map-dirty-redraw-fixture-kit` | prove redraw only follows admitted dirty evidence |

## Command/result map

```txt
MapOpenGenerationAdmissionCommand
  -> MapOpenGenerationResult

MapSurfacePlanCommand
  -> MapSurfacePlanResult

MapRedrawAdmissionCommand
  -> MapRedrawAdmissionResult

MapRenderWorkSettlementCommand
  -> MapRenderWorkBudgetResult

MapProjectionCommitCommand
  -> MapSurfaceDigest
  -> FirstMapBoundFrameAck
```

## Compatibility boundary

Preserve M/Escape behavior, overlay transitions, translucent world background, generated-world map cache, routes, Snap Points, completion markers, player marker, reference card, map-open simulation suspension, Journey failure handling, resize behavior and disposal semantics.

## Claim boundary

This audit proposes architecture only. It does not prove that the current dual-loop design causes visible performance harm or that any particular background policy is correct.