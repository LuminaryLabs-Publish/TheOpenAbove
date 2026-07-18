# Project Breakdown: TheOpenAbove Map-Open Dual-Surface Render Work Budget

**Timestamp:** `2026-07-18T12-38-04-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Selection:** oldest synchronized eligible Publish repository  
**Reviewed repository head:** `28bed180bac93a326dfa1a31ab54699387698086`  
**Status:** `map-open-dual-surface-render-work-budget-authority-audited`

## Summary

The current `LuminaryLabs-Publish` installation contains 11 repositories. Ten are eligible after excluding `LuminaryLabs-Publish/TheCavalryOfRome`. All ten have central-ledger coverage, root `.agent` state, and `main` heads matching their documented repo-local heads. TheOpenAbove was selected by the oldest documented-selection rule using its prior central timestamp `2026-07-18T01-41-38-04-00`.

The focused source audit found that opening the parchment map does not replace or suspend the main render loop. Journey keeps one `requestAnimationFrame` loop alive and calls the full Experience render path with `dt: 0`, while the map overlay starts a second independent `requestAnimationFrame` loop that redraws its Canvas2D surface every frame.

The map content is mostly frozen because Journey suppresses simulation updates while the map is open. Even so, each map frame clears and redraws the background, 90 decorative circles, routes, Snap Points, the player marker, and a reference card; the reference card creates a new gradient each frame. At a hypothetical 60 displayed frames per second, the source-visible schedule is two RAF callbacks per display frame, 60 main-scene render calls, 60 map draws, 5,400 decorative-circle iterations, and 60 gradient creations per second. This is source arithmetic, not a browser profile or proof of harmful work.

## Intent

Preserve the current map interaction and translucent world presentation while making one map-open generation authoritative for background-scene cadence, map dirty-state admission, Canvas2D redraws, transition behavior, work budgets, diagnostics, retirement, and the matching visible frame.

## Checklist

- [x] Enumerate all 11 accessible Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and root `.agent` states.
- [x] Confirm all ten eligible `main` heads match their documented repo-local heads.
- [x] Select only `LuminaryLabs-Publish/TheOpenAbove` by the oldest documented-selection rule.
- [x] Identify the complete interaction loop and all active domains.
- [x] Reconcile all 125 active documented surfaces, kits, adapters, provider surfaces, and offered services.
- [x] Inspect Journey RAF ownership, map-open update suppression, Meadow Lift rendering, Navigation composition, parchment-map RAF ownership, map draw work, resize handling, and overlay presentation.
- [x] Define one proposed map-open dual-surface render-work authority with 20 coordinating surfaces.
- [ ] Implement an explicit map-open background-render policy and dirty redraw admission.
- [ ] Execute dual-RAF, dirty redraw, transition, resize, browser, artifact, and Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories:      11
eligible after Cavalry exclusion:      10
central ledger entries:                10
root .agent states:                    10
new or ledger-missing:                  0
root-agent-missing:                     0
undocumented:                           0
runtime-ahead:                          0

selected: LuminaryLabs-Publish/TheOpenAbove
selection rule: oldest synchronized eligible repository
selected prior central timestamp: 2026-07-18T01-41-38-04-00
reviewed repository head: 28bed180bac93a326dfa1a31ab54699387698086
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
boot
  -> Meadow Lift composes Journey, Ballooning, Sky, Land,
     Navigation, Image Capture and Experience
  -> Journey owns the primary browser RAF
  -> Navigation mounts the parchment map overlay
  -> map overlay installs keyboard and ResizeObserver ownership

flight frame
  -> Journey computes bounded dt
  -> when map is closed, Journey advances Ballooning, Sky,
     Experience, Image Capture and Nexus Engine
  -> Journey always invokes Experience.render
  -> HDR world presentation reaches the game canvas

map open
  -> M toggles Navigation.setMapOpen(true)
  -> parchment overlay marks the DOM surface open
  -> parchment overlay resizes its Canvas2D backing store
  -> parchment overlay starts an independent RAF loop
  -> Journey continues its primary RAF loop
  -> Journey skips simulation update while map is open
  -> Journey still calls Experience.render with dt zero
  -> map RAF clears and redraws world map, 90 decorative marks,
     routes, Snap Points, player marker and reference card
  -> two render surfaces are scheduled without one shared work plan

map close / retirement
  -> map overlay cancels its RAF when closed
  -> Journey resumes simulation updates on the next primary frame
  -> Navigation disposal cancels map RAF, disconnects ResizeObserver,
     and removes the map keyboard listener
  -> Journey disposal cancels the primary RAF
```

## Domains in use

| Domain | Ownership and services |
|---|---|
| Journey | session status, map-open admission, bounded RAF progression, update suppression, main render invocation, failure containment, snapshots, stop and disposal |
| Navigation | map mount, open/close commands, generated-world refresh, routes, Snap Points, state and disposal |
| Parchment map overlay | independent RAF, Canvas2D resize, world-map cache, route/Snap Point/player/reference rendering, keyboard interaction and retirement |
| Meadow Lift scene | semantic composition, update/render ordering, map-open query, GameHost publication and disposal |
| Experience | Three.js renderer/camera, world/balloon/cloud/HDR presentation, frame timing and disposal |
| Ballooning/Sky/Land/Image Capture | frozen gameplay state supplied to map projection while Journey suppresses updates |
| Core World/Weather | world and weather descriptors consumed by the visual and map surfaces |
| Browser presentation | game canvas, translucent fixed overlay, parchment canvas, CSS transition and device-pixel-ratio sizing |
| Validation/deploy | static/tiered checks, Vite artifact, provider revision stamping, GitHub Actions and Pages |
| Proposed map render authority | map-open generation, surface policy, dirty-state admission, work budget, diagnostics, retirement and frame proof |

## Main source-backed finding

### Implemented strengths

```txt
one Journey-owned primary RAF: present
bounded frame delta: present
map-open simulation suppression: present
map overlay open/close state: present
map RAF cancellation on close: present
map RAF cancellation on dispose: present
ResizeObserver retirement: present
world-map revision cache: present
map Canvas2D DPR cap at 2: present
main render receives dt zero while map open: present
```

### Source-visible map-open work

```txt
primary Journey RAF remains active: yes
Experience.render remains active: yes
independent map RAF starts: yes
scheduled RAF loops while map open: 2

map redraw cadence: every map RAF
map clear per redraw: 1
fixed decorative circle iterations per redraw: 90
reference gradients created per redraw: 1
route traversal per redraw: yes
Snap Point traversal per redraw: yes
player marker redraw per redraw: yes
reference card redraw per redraw: yes

hypothetical at 60 displayed frames/second:
  primary render calls: 60/second
  map draw calls: 60/second
  total RAF callbacks: 120/second
  decorative circle iterations: 5,400/second
  reference gradients created: 60/second
```

The arithmetic excludes Three.js, HDR passes, Canvas2D implementation work, route-point counts, Snap Point counts, browser throttling, compositor behavior, and CSS-transition cost. The translucent overlay may intentionally retain a live world background; the gap is that no explicit policy, budget, cadence result, dirty-state result, or matching-frame receipt owns that choice.

### Missing ownership

```txt
MapOpenGeneration: absent
background scene render policy: absent
background scene cadence result: absent
map dirty-state revision: absent
map redraw admission result: absent
map render work budget: absent
stale map redraw rejection: absent
main/map surface generation binding: absent
MapSurfaceDigest: absent
FirstMapBoundFrameAck: absent
browser dual-RAF fixture: absent
dirty-redraw fixture: absent
```

## Required authority

`open-above-map-open-dual-surface-render-work-budget-authority-domain`

```txt
MapOpenGenerationAdmissionCommand
  -> bind HostSessionId, JourneyGeneration, NavigationGeneration,
     map-open revision, world revision, capture revision,
     viewport revision and presentation policy
  -> publish MapOpenGenerationResult

MapSurfacePlanCommand
  -> choose explicit main-scene policy:
     live-full, live-reduced, static-snapshot or suspended
  -> choose explicit map transition and redraw cadence
  -> publish MapSurfacePlanResult

MapRedrawAdmissionCommand
  -> consume open, transition, resize, world, capture,
     player-position and heading dirty evidence
  -> reject unchanged or stale work
  -> publish MapRedrawAdmissionResult

MapRenderWorkSettlementCommand
  -> record main-scene calls, map draws, Canvas2D operations,
     redraw reasons, cadence and frame duration
  -> publish MapRenderWorkBudgetResult

MapProjectionCommitCommand
  -> bind the accepted world/capture/player state to both surfaces
  -> publish MapSurfaceDigest
  -> publish FirstMapBoundFrameAck
```

## Planned authority surfaces: 20

1. `open-above-map-open-dual-surface-render-work-budget-authority-domain`
2. `map-open-generation-kit`
3. `map-surface-plan-kit`
4. `map-background-world-render-policy-kit`
5. `map-background-render-cadence-kit`
6. `parchment-map-dirty-state-kit`
7. `map-redraw-admission-kit`
8. `map-transition-state-kit`
9. `map-player-marker-revision-kit`
10. `map-world-revision-refresh-kit`
11. `map-capture-revision-refresh-kit`
12. `map-viewport-revision-kit`
13. `map-raf-lease-kit`
14. `map-render-work-budget-kit`
15. `map-render-result-kit`
16. `stale-map-redraw-rejection-kit`
17. `map-surface-digest-kit`
18. `first-map-bound-frame-ack-kit`
19. `dual-raf-browser-fixture-kit`
20. `map-dirty-redraw-fixture-kit`

## Complete kit and offered-service inventory

### Semantic scene, wind and close-cloud surfaces: 11

- `open-above-journey-domain`: session/region state, map pause policy, RAF progression, error containment, snapshots and disposal.
- `open-above-ballooning-domain`: balloon loading/mounting, simulation composition, update, readiness, state/snapshot and disposal.
- `open-above-sky-domain`: airstream composition, weather binding/readback, dust wind-particle lifecycle, cloud-field publication and disposal.
- `open-above-land-domain`: Core World binding, world anchors, visual binding, generation/terrain snapshot and height sampling.
- `open-above-navigation-domain`: map mount, open/close, world refresh, Snap Point projection, snapshot and disposal.
- `open-above-image-capture-domain`: camera mode, shutter admission, recognition, score, metadata, completion and disposal.
- `open-above-experience-domain`: visual composition, camera rig binding, balloon presentation, cloud diagnostics, update/render, snapshots and disposal.
- `open-above-meadow-lift-scene`: semantic composition, boot/update/render ordering, GameHost projection and disposal.
- `open-above-wind-relative-steering-kit`: flow-relative direction, heading, turn offset and target velocity resolution.
- `open-above-wind-particle-field-kit`: deterministic dust allocation, CanvasTexture creation, player-centered advection, layered 3D flow noise, wrapping, persistent buffer writes, policy snapshot and disposal.
- `open-above-cloud-bank-field-kit`: seeded close-cloud generation, volume-reach query, LOD tiers, splat sampling and snapshot.

### Runtime and airstream kits: 8

- `open-above-balloon-simulation-kit`: key consumption, burner/vent, buoyancy, steering, heading, airstream force, terrain contact, integration, pose and snapshots.
- `open-above-balloon-telemetry-kit`: Nexus Engine resources/events, Core World/Weather composition, feature registration, ticking and public readback.
- `open-above-airstream-domain`: route and field composition, active-route state, diagnostics, update, sampling, snapshots and disposal.
- `open-above-airstream-route-kit`: route identity, control points, colors, destinations and descriptors.
- `open-above-airstream-sampler-kit`: route and ambient field sampling.
- `open-above-airstream-field-kit`: spatial wind evaluation and contributor blending.
- `open-above-airstream-balloon-force-kit`: flow normalization and balloon-force application.
- `open-above-airstream-debug-kit`: optional route/field diagnostics and readback.

### Balloon object and presentation kits: 15

- `open-above-hot-air-balloon-object-kit`: asynchronous composition, readiness, persistent-resource metadata, installation and animation.
- `open-above-balloon-envelope-profile-kit`: envelope proportions and profile sampling.
- `open-above-balloon-envelope-panel-kit`: envelope panel geometry.
- `open-above-balloon-mouth-kit`: mouth geometry and fit.
- `open-above-balloon-streamer-fit-kit`: streamer placement and fit.
- `open-above-balloon-fabric-seam-kit`: fabric-seam presentation.
- `open-above-hot-air-balloon-basket-kit`: basket geometry.
- `open-above-hot-air-balloon-rigging-kit`: frame bars, four rope construction, tension-driven animation and connection metadata.
- `open-above-hot-air-balloon-burner-kit`: burner geometry and presentation.
- `open-above-rope-kit`: rope topology, dynamic geometry buffers, sag/sway point generation, per-frame buffer updates and metadata.
- `open-above-balloon-presentation-domain`: presentation composition and accepted-state updates.
- `open-above-envelope-fabric-material-kit`: envelope material descriptors and GPU state.
- `open-above-basket-material-kit`: basket material descriptors and GPU state.
- `open-above-balloon-camera-rig-kit`: follow zoom, view blending, pointer look, heading recenter, camera commit, state and disposal.
- `open-above-clipping-fade-kit`: near-camera clipping fade.

### Visual world and environment kits: 35

- `open-above-visual-domain`: renderer, scene, camera, generated world, weather adapters, clouds, update/render/resize/state/disposal.
- `open-above-world-generation-kit`: deterministic staged generation, work budgets, snapshots and subscriptions.
- `open-above-world-feature-foundation-kit`: generated-world/Core World bridge.
- `open-above-quality-tier-kit`: device quality detection and tier descriptors.
- `open-above-dynamic-resolution-kit`: effective DPR, frame sampling, scale transitions and resize.
- `open-above-physical-sky-kit`: sky shader and solar update.
- `open-above-sun-light-kit`: sun direction, color, shadows and world position.
- `open-above-aerial-perspective-kit`: fog, altitude clearing, cloud response and sun warmth.
- `open-above-cloud-weather-map-kit`: Weather advancement, aggregation and projection.
- `open-above-volumetric-cloud-kit`: distant-layer raymarch, uniforms, budgets, low-resolution target, composite and disposal.
- `open-above-gaussian-cloud-render-adapter`: instanced close-cloud projection, visibility, rebatching, capacity, diagnostics and disposal.
- `open-above-cloud-lod-kit`: volumetric render scale, samples, distance and jitter policy.
- `open-above-cloud-lighting-kit`: cloud sun and sky-fill lighting.
- `open-above-terrain-surface-kit`: terrain geometry/material, queries, streaming and disposal.
- `open-above-terrain-streaming-contract-kit`: terrain streaming contract.
- `open-above-terrain-chunk-streaming-kit`: active terrain-chunk lifecycle.
- `open-above-terrain-horizon-streaming-kit`: horizon-ring lifecycle.
- `open-above-vegetation-cluster-kit`: vegetation generation, refresh, update and disposal.
- `open-above-grass-world-seed-kit`: deterministic grass seed.
- `open-above-grass-biome-density-kit`: biome density evaluation.
- `open-above-grass-exclusion-mask-kit`: route and object exclusions.
- `open-above-grass-patch-density-kit`: patch distribution.
- `open-above-grass-texture-atlas-kit`: procedural grass atlas generation.
- `open-above-grass-chunk-placement-kit`: grass chunk placement.
- `open-above-grass-lod-kit`: grass LOD policy.
- `open-above-grass-compute-culling-kit`: culling and capacity policy.
- `open-above-grass-field-domain`: grass composition, update, refresh, state and disposal.
- `open-above-flower-chunk-placement-kit`: flower placement.
- `open-above-flower-texture-atlas-kit`: procedural flower atlas generation.
- `open-above-flower-field-domain`: flower composition, update, refresh, state and disposal.
- `open-above-water-surface-kit`: water geometry, material, lighting and update.
- `open-above-distant-landmark-kit`: landmark geometry and disposal.
- `open-above-hdr-composer-kit`: half-float targets, depth textures, passes, resize, render and disposal.
- `open-above-color-grade-kit`: HDR grading and exposure response.
- `open-above-lens-response-kit`: sun-facing lens response.

### UI, tooling and proof kits: 12

- `open-above-parchment-map-overlay-kit`: generated map, routes, Snap Points, reference card, player projection, RAF and disposal.
- `open-above-headless-editor-environment`: deterministic environment setup and editor validation.
- `open-above-static-smoke-test-kit`: source and composition smoke assertions.
- `open-above-wind-visual-policy-test-kit`: source-policy assertions for dust constants, layered noise, blending, Sky wiring and legacy route-visual removal.
- `open-above-airstream-mail-test-kit`: retained airstream/Air Mail historical assertions.
- `open-above-world-flora-test-kit`: terrain/flora source-contract assertions.
- `open-above-world-feature-foundation-test-kit`: foundation and feature integration assertions.
- `open-above-world-domain-composition-test-kit`: Core World composition assertions.
- `open-above-layered-weather-integration-test-kit`: five-layer weather integration assertions.
- `open-above-cloud-lod-integration-test-kit`: cloud field, LOD, volume, capacity, wiring and fog-uniform regression assertions.
- `open-above-tiered-validation-runner-kit`: subprocess orchestration, severity annotations and deployment-blocker classification.
- `open-above-semantic-domain-composition-test-kit`: semantic folder/composition and Air Mail retirement assertions.

### Runtime-implied browser/host/deploy adapters: 14

- `open-above-route-shell-kit`: HTML route and main canvas ownership.
- `open-above-importmap-kit`: Three.js/Nexus Engine module resolution.
- `open-above-runtime-composer-kit`: browser boot and scene creation.
- `open-above-keyboard-input-kit`: burner, vent, steering, map, camera and shutter evidence.
- `open-above-wheel-zoom-input-kit`: follow-distance and sightseeing wheel evidence.
- `open-above-pointer-look-input-kit`: primary-pointer admission and camera-look evidence.
- `open-above-parchment-map-shell-kit`: map DOM/canvas surface.
- `open-above-error-panel-kit`: fatal error projection.
- `open-above-gamehost-legacy-readback-kit`: browser diagnostics and domain readback.
- `open-above-vite-nexusengine-checkout-alias-kit`: checked-out provider aliasing.
- `open-above-nexusengine-revision-stamp-kit`: provider revision embedding.
- `open-above-campaign-source-kit`: world, weather and feature configuration.
- `open-above-raf-clock-adapter-kit`: browser wall-time to Journey frame progression.
- `open-above-pages-deploy-kit`: static artifact publication.

### Nexus Engine provider surfaces: 30

- `n-world-domain`: parent world composition and public surface.
- `world-builder-runtime-kit`: world builder runtime contract.
- `n-world-foundation-domain`: elevation/material/normal/collision foundation.
- `foundation-definition-kit`: foundation descriptors.
- `foundation-composition-kit`: contribution composition.
- `foundation-sampling-kit`: resolved world sampling.
- `foundation-cell-resolution-kit`: cell-level resolution.
- `n-world-feature-domain`: feature registry/lifecycle/query/composition parent.
- `feature-registry-kit`: feature registration and identity.
- `feature-lifecycle-kit`: feature activation and retirement.
- `feature-query-kit`: bounds and semantic queries.
- `feature-composition-kit`: feature contribution composition.
- `n-world-landform-feature-domain`: landform feature family.
- `mountain-feature-kit`: mountain contributions.
- `canyon-feature-kit`: canyon contributions.
- `cliff-feature-kit`: cliff contributions.
- `plateau-feature-kit`: plateau contributions.
- `n-world-atmosphere-feature-domain`: atmosphere feature family.
- `cloud-layer-feature-kit`: cloud-layer descriptors.
- `cloud-bank-feature-kit`: cloud-bank descriptors.
- `fog-bank-feature-kit`: fog-bank descriptors.
- `storm-cell-feature-kit`: storm-cell descriptors.
- `wind-corridor-feature-kit`: directional wind corridors.
- `thermal-column-feature-kit`: thermal lift descriptors.
- `downdraft-zone-feature-kit`: downdraft descriptors.
- `turbulence-zone-feature-kit`: turbulence descriptors.
- `precipitation-feature-kit`: precipitation descriptors.
- `visibility-zone-feature-kit`: visibility descriptors.
- `n-weather-domain`: renderer-neutral weather state and advancement.
- `n-layered-weather-domain`: semantic layered weather state, sampling and snapshots.

### Inactive Air Mail migration surfaces: 6

- `open-above-mail-delivery-domain`
- `open-above-mail-parcel-kit`
- `open-above-mail-route-kit`
- `open-above-delivery-volume-kit`
- `open-above-delivery-progress-kit`
- `open-above-mail-town-kit`

## Census

```txt
active local source-backed surfaces: 81
runtime-implied adapters:            14
Nexus Engine provider surfaces:      30
active documented surfaces:         125
inactive Air Mail migration:          6
planned map render authority:        20
```

## Validation boundary

Source inspection covered the current Publish inventory, central Publish ledgers, root `.agent` state, Journey, Meadow Lift scene ordering, Navigation, parchment map overlay, index overlay styling, and the prior complete kit/service inventory. Documentation changed only. Runtime JavaScript, rendering behavior, gameplay, input, tests, packages, workflows, and deployment were not changed by this audit.

No browser trace, RAF counter, Canvas2D profile, GPU measurement, artifact fixture, or Pages fixture was executed. No claim is made for wasted work, visible performance impact, improved frame time, exact dual-surface convergence, artifact parity, Pages parity, or production readiness.