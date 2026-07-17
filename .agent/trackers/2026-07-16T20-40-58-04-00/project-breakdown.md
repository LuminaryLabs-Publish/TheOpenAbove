# Project Breakdown: TheOpenAbove Camera Capture Zoom Projection

**Timestamp:** `2026-07-16T20-40-58-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Selection:** oldest synchronized eligible repository  
**Previous central repo-local head:** `7f8de3ab0b6c8540992a22a9605586ef993e14e3`  
**Reviewed pre-audit repository head:** `7f8de3ab0b6c8540992a22a9605586ef993e14e3`  
**Status:** `camera-capture-zoom-projection-authority-audited`

## Summary

The current Publish organization contains 11 repositories. Ten are eligible after excluding `LuminaryLabs-Publish/TheCavalryOfRome`; all ten have a central ledger and root `.agent` state, and all ten were synchronized before this pass. TheOpenAbove was selected as the oldest eligible documented repository.

The focused finding is that sightseeing optical zoom and normal balloon-camera follow zoom both consume the same wheel event through separate listeners. The Image Capture domain changes `camera.fov` and a private capture `zoom` scalar, while the Balloon Camera Rig simultaneously changes follow distance and then overwrites `camera.fov` during the next frame. Recognition scoring uses the private capture scalar rather than the projection that the player actually sees.

## Intent

Keep the sightseeing camera and existing flight camera behavior, but assign each wheel gesture to one explicit zoom owner and bind scoring to the exact committed camera projection.

## Checklist

- [x] Enumerate all 11 accessible Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and ten root `.agent` states.
- [x] Confirm no new, missing, undocumented, root-agent-missing or runtime-ahead repository.
- [x] Select only TheOpenAbove by the oldest synchronized timestamp.
- [x] Identify the interaction loop and active domains.
- [x] Preserve the complete 121-surface active kit/provider/adapter inventory and offered services.
- [x] Define one camera-zoom projection authority with 19 coordinating surfaces.
- [x] Add the timestamped `.agent` audit family on `main`.
- [ ] Implement single-owner wheel admission and projection-bound scoring.
- [ ] Execute source, browser, artifact and Pages fixtures.

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
selected prior timestamp: 2026-07-16T14-59-39-04-00
next oldest: LuminaryLabs-Publish/IntoTheMeadow
next timestamp: 2026-07-16T15-38-27-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
boot
  -> Meadow Lift composes Journey, Ballooning, Sky, Land,
     Navigation, Image Capture and Experience
  -> Experience creates the Three.js camera and renderer
  -> Ballooning binds the balloon camera rig
  -> Image Capture binds the same camera and renderer canvas

normal flight wheel
  -> window wheel listener changes camera-rig follow distance
  -> camera rig updates camera position and first-person blend
  -> camera rig writes camera FOV between 56 and 68 degrees

sightseeing camera wheel
  -> renderer-canvas wheel listener changes private capture zoom
  -> Image Capture immediately writes camera FOV between 18 and 60 degrees
  -> the same bubbling event reaches the window listener
  -> camera-rig follow distance also changes

next flight frame
  -> Ballooning updates simulation
  -> Sky updates airstream visuals and wind particles
  -> Experience updates the balloon camera rig
  -> camera rig overwrites camera FOV from its own blend
  -> Image Capture evaluates a pending shutter
  -> recognition score uses private capture zoom
  -> engine ticks
  -> Experience renders the camera-rig projection

result
  -> recorded zoom and awarded zoom score may not describe
     the projection rendered to the player
```

## Domains in use

| Domain | Ownership and services |
|---|---|
| Journey | session status, region, map policy, frame/elapsed counters, RAF start/stop, failure containment and aggregate snapshots |
| Ballooning | balloon lifecycle, controls, buoyancy, venting, airstream sampling, wind-relative steering, terrain contact, pose and state |
| Sky | airstream composition, Core Weather readback, layered weather and local wind-particle lifecycle |
| Land | world configuration, Core World Foundation/Features, terrain/world anchors, generation state and height sampling |
| Navigation | parchment map lifecycle, generated-world cache, routes, Snap Points, reference cards and map state |
| Image Capture | sightseeing mode, private optical-zoom scalar, shutter request, recognition, score, capture metadata and completion |
| Experience | Three.js renderer, camera, visual world, balloon camera rig, presentation update/render and visual snapshots |
| Core World family | world composition, foundation sampling, feature registry/lifecycle/query, landforms and atmosphere features |
| Weather family | base weather state, advancement, semantic layered weather, sampling and snapshots |
| Presentation | Three.js balloon/world/cloud/terrain/flora/water/HDR rendering and Canvas2D map projection |
| Validation/deploy | tiered Node validation, Vite build, checked-out Nexus Engine aliasing, revision stamping and Pages publication |
| Proposed zoom authority | wheel admission, mode arbitration, optical/follow separation, projection commit, score evidence and frame proof |

## Main source-backed finding

`open-above-balloon-camera-rig-kit` installs a global wheel listener and maps every wheel event to `state.zoom`, which is a follow-distance/first-person control. `open-above-image-capture-domain` installs a second wheel listener on the renderer canvas when sightseeing mode is active and maps the same event to a separate `zoom` value and `camera.fov`.

The canvas listener calls `preventDefault()` but does not stop propagation, so the wheel event can reach both owners. During the next update, `open-above-balloon-camera-rig-kit` writes `camera.fov = lerp(56, 68, firstPersonBlend)`, replacing the capture FOV. The capture evaluator then scores with its private `zoom` scalar rather than reading the actual projection matrix or committed FOV.

```txt
flight follow-distance zoom owner: present
sightseeing optical-zoom owner: present
shared wheel source: present
mode-aware single owner: absent
wheel propagation settlement: absent
projection revision/result: absent
capture zoom -> rendered FOV convergence: absent
score -> actual projection evidence: absent
FirstZoomBoundFrameAck: absent
```

No specific browser or player-visible incident was reproduced. This is a source-backed ownership and projection-evidence gap.

## Required authority

`open-above-sightseeing-camera-zoom-projection-authority-domain`

```txt
CameraZoomIntentCommand
  -> bind document, route, session, camera, viewport and mode revisions
  -> normalize wheel delta and deltaMode
  -> classify the active zoom owner
  -> reject stale, map-suspended or retired evidence
  -> publish CameraZoomIntentResult

CameraZoomArbitrationCommand
  -> sightseeing mode: change optical projection only
  -> flight mode: change follow distance only
  -> prevent one gesture from mutating both policies
  -> publish CameraZoomArbitrationResult

CameraProjectionCommitCommand
  -> apply camera position/look and projection in one ordered commit
  -> publish actual FOV, projection matrix revision and effective zoom
  -> publish CameraProjectionResult

PhotoZoomEvidenceCommand
  -> bind recognition scoring to the committed projection result
  -> reject private-scalar/projection mismatch
  -> publish PhotoZoomEvidenceResult
  -> publish FirstZoomBoundFrameAck
```

## Complete kit and offered-service inventory

### Semantic scene and wind surfaces: 10

- `open-above-journey-domain`: session/region state, map pause policy, RAF progression, error containment, snapshots and disposal.
- `open-above-ballooning-domain`: balloon loading/mounting, simulation composition, update, model readiness, state/snapshot and disposal.
- `open-above-sky-domain`: airstream composition, weather binding/readback, wind-particle mount/update/snapshot and disposal.
- `open-above-land-domain`: Core World binding, world anchors, visual binding, generation/terrain snapshot and height sampling.
- `open-above-navigation-domain`: map mount, open/close, world refresh, Snap Point projection, snapshot and disposal.
- `open-above-image-capture-domain`: camera mode, capture zoom, shutter admission, recognition, score, metadata, completion and disposal.
- `open-above-experience-domain`: visual composition, camera rig, balloon presentation, update/render, snapshots and disposal.
- `open-above-meadow-lift-scene`: semantic composition, boot/update/render ordering, GameHost projection and disposal.
- `open-above-wind-relative-steering-kit`: flow-relative direction, heading, turn offset and target velocity resolution.
- `open-above-wind-particle-field-kit`: deterministic particle allocation, player-centered advection, wrapping, opacity, snapshots and disposal.

### Runtime and airstream kits: 9

- `open-above-balloon-simulation-kit`: key consumption, burner/vent, buoyancy, steering, airstream force, terrain contact, integration, pose and snapshots.
- `open-above-balloon-telemetry-kit`: Nexus Engine resources/events, Core World/Weather composition, feature registration, ticking and public readback.
- `open-above-airstream-domain`: route, field, force, visual and diagnostics composition, update, sampling, snapshots and disposal.
- `open-above-airstream-route-kit`: route identity, control points, colors, destinations and descriptors.
- `open-above-airstream-sampler-kit`: route and ambient field sampling.
- `open-above-airstream-field-kit`: spatial wind evaluation and contributor blending.
- `open-above-airstream-balloon-force-kit`: flow normalization and balloon-force application.
- `open-above-airstream-visual-kit`: route visualization and scene updates.
- `open-above-airstream-debug-kit`: route/field diagnostics and readback.

### Inactive Air Mail migration surfaces: 6

- `open-above-mail-delivery-domain`: historical Air Mail composition, update, reset, snapshot and disposal.
- `open-above-mail-parcel-kit`: historical parcel identity, state, message and reset.
- `open-above-mail-route-kit`: historical parcel route and town descriptors.
- `open-above-delivery-volume-kit`: historical geometric delivery eligibility.
- `open-above-delivery-progress-kit`: historical target tracking and completion settlement.
- `open-above-mail-town-kit`: historical town meshes, anchors, animation and metadata.

### Balloon object and presentation kits: 15

- `open-above-hot-air-balloon-object-kit`: asynchronous composition, readiness, persistent-resource metadata and animation.
- `open-above-balloon-envelope-profile-kit`: envelope proportions and profile sampling.
- `open-above-balloon-envelope-panel-kit`: envelope panel geometry.
- `open-above-balloon-mouth-kit`: mouth geometry and fit.
- `open-above-balloon-streamer-fit-kit`: streamer placement and fit.
- `open-above-balloon-fabric-seam-kit`: fabric-seam presentation.
- `open-above-hot-air-balloon-basket-kit`: basket geometry.
- `open-above-hot-air-balloon-rigging-kit`: rope and rigging layout.
- `open-above-hot-air-balloon-burner-kit`: burner geometry and presentation.
- `open-above-rope-kit`: segmented rope construction and dynamic geometry updates.
- `open-above-balloon-presentation-domain`: presentation composition and accepted-state updates.
- `open-above-envelope-fabric-material-kit`: envelope material descriptors and GPU state.
- `open-above-basket-material-kit`: basket material descriptors and GPU state.
- `open-above-balloon-camera-rig-kit`: follow-distance wheel zoom, camera modes, transitions and listener disposal.
- `open-above-clipping-fade-kit`: near-camera clipping fade.

### Visual world and environment kits: 34

- `open-above-visual-domain`: renderer, scene, camera, generated world, weather adapter, update/render/resize/state/disposal.
- `open-above-world-generation-kit`: deterministic staged generation, work budgets, snapshots and subscriptions.
- `open-above-world-feature-foundation-kit`: generated-world/Core World bridge.
- `open-above-quality-tier-kit`: device quality detection and tier descriptors.
- `open-above-dynamic-resolution-kit`: effective DPR, frame sampling, scale transitions and resize.
- `open-above-physical-sky-kit`: sky shader and solar update.
- `open-above-sun-light-kit`: sun direction, color, shadows and world position.
- `open-above-aerial-perspective-kit`: fog, altitude clearing, cloud response and sun warmth.
- `open-above-cloud-weather-map-kit`: Weather/Layered Weather advancement, aggregation and projection.
- `open-above-volumetric-cloud-kit`: five-layer raymarch, uniforms, budgets, target, composite and disposal.
- `open-above-cloud-lod-kit`: render scale, samples, distance and jitter policy.
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

### UI, tooling and proof kits: 10

- `open-above-parchment-map-overlay-kit`: generated map, routes, Snap Points, reference card, player projection, RAF and disposal.
- `open-above-headless-editor-environment`: deterministic environment setup and editor validation.
- `open-above-static-smoke-test-kit`: source and composition smoke assertions.
- `open-above-airstream-mail-test-kit`: retained airstream/Air Mail historical assertions.
- `open-above-world-flora-test-kit`: terrain/flora source contract assertions.
- `open-above-world-feature-foundation-test-kit`: foundation and feature integration assertions.
- `open-above-world-domain-composition-test-kit`: Core World composition assertions.
- `open-above-layered-weather-integration-test-kit`: five-layer weather integration assertions.
- `open-above-tiered-validation-runner-kit`: subprocess orchestration and severity annotations.
- `open-above-semantic-domain-composition-test-kit`: semantic folder/composition and Air Mail retirement assertions.

### Runtime-implied browser/host/deploy adapters: 13

- `open-above-route-shell-kit`: HTML route and canvas ownership.
- `open-above-importmap-kit`: Three.js/Nexus Engine module resolution.
- `open-above-runtime-composer-kit`: browser boot and scene creation.
- `open-above-keyboard-input-kit`: burner, vent, steering, map, camera and shutter key evidence.
- `open-above-wheel-zoom-input-kit`: shared follow-distance and sightseeing wheel evidence.
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
- `n-world-foundation-domain`: resolved elevation/material/normal/collision foundation.
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

## Census

```txt
active local source-backed surfaces: 78
runtime-implied adapters: 13
Nexus Engine provider surfaces: 30
active named surfaces: 121
inactive Air Mail migration surfaces: 6
planned camera-zoom authority surfaces: 19
```

## Validation boundary

Documentation changed only. Runtime JavaScript, tests, package scripts, workflows and deployment were not changed. Browser wheel ownership, projection convergence, capture-score, artifact and Pages fixtures were not run. No corrected zoom behavior or production-readiness claim is made.