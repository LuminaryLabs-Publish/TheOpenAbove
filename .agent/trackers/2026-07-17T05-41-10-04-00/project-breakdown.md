# Project Breakdown: TheOpenAbove Camera Pointer-Look Gesture Admission and Retirement

**Timestamp:** `2026-07-17T05-41-10-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Selection:** sole runtime-ahead eligible repository  
**Previous repo-local documentation head:** `d5c194c6b5da7b1ba15f6ba811cdbb1031cc22a9`  
**Reviewed pre-audit repository head:** `5611624ff8b59ff40e3a2e12d0d837e91b56f68d`  
**Status:** `camera-pointer-look-gesture-admission-retirement-authority-audited`

## Summary

The current `LuminaryLabs-Publish` inventory contains 11 repositories. Ten are eligible after excluding `LuminaryLabs-Publish/TheCavalryOfRome`; all ten have a central ledger and root `.agent` state. TheOpenAbove was selected because three runtime commits were ahead of its repo-local documentation head.

The delta removed unsupported Gaussian cloud fog uniforms, added a regression assertion, and introduced drag-to-look with yaw/pitch limits plus delayed heading recentering. Pointer identity is checked during movement and release, but gesture admission is attached to the global window surface. Any left-button press can become camera input, including interaction with the open parchment map. The anonymous blur listener cannot be removed by `dispose()`, `lostpointercapture` is not settled, replacement binding is not guarded, and camera diagnostics omit the accepted gesture and look-pose generation.

No map-drag camera incident or lifecycle leak was reproduced. This is a source-backed interaction ownership, retirement, and frame-proof gap.

## Intent

Preserve immediate drag-look and five-second heading recentering while making one admitted render-surface gesture authoritative for camera yaw, pitch, capture ownership, retirement, diagnostics, and the matching rendered frame.

## Checklist

- [x] Enumerate all 11 accessible Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten central ledgers and ten root `.agent` states.
- [x] Select only TheOpenAbove through runtime-ahead priority.
- [x] Review the three-commit, three-file runtime delta.
- [x] Identify the complete interaction loop and active domains.
- [x] Reconcile all 125 active source, adapter, and provider surfaces with offered services.
- [x] Define one camera pointer-look authority with 20 coordinating surfaces.
- [x] Add this timestamped `.agent` audit family on `main`.
- [ ] Implement surface-scoped admission, capture settlement, lifecycle retirement, diagnostics, and frame proof.
- [ ] Execute browser, build, artifact, and Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories:      11
eligible after Cavalry exclusion:      10
central ledger entries:                10
root .agent states:                    10
new or ledger-missing:                  0
root-agent-missing:                     0
undocumented:                           0
runtime-ahead:                          1

selected: LuminaryLabs-Publish/TheOpenAbove
selection rule: runtime-ahead priority
previous documentation head: d5c194c6b5da7b1ba15f6ba811cdbb1031cc22a9
reviewed runtime head:       5611624ff8b59ff40e3a2e12d0d837e91b56f68d
ahead by:                    3 commits
changed files:                3
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Runtime delta reconciled

```txt
a748664 fix(clouds): disable unsupported Three fog uniforms
0e1c4c0 test(clouds): guard Gaussian fog uniform regression
5611624 feat(camera): add drag look with delayed heading recenter

src/visual/atmosphere/gaussian-cloud-render-adapter.js: updated
src/visual/camera-presentation/balloon-camera-rig-kit.js: updated
tests/cloud-lod-integration.mjs: updated
```

## Complete interaction loop

```txt
boot
  -> Meadow Lift creates Journey, Ballooning, Sky, Land, Navigation,
     Image Capture, and Experience
  -> Experience creates Visual with the main #game canvas
  -> bindBalloon creates Balloon Camera Rig
  -> Camera Rig registers global wheel, pointer, and blur listeners

flight
  -> Balloon Simulation resolves airstream-relative velocity and heading
  -> Camera Rig derives heading basis from flightState.wind
  -> left pointerdown anywhere in the window records pointerId and coordinates
  -> the event target is asked to capture the pointer
  -> matching pointermove mutates lookYaw and lookPitch immediately
  -> pointerup or pointercancel clears the owner
  -> after five seconds without look input, yaw and pitch lerp toward heading
  -> Camera Rig commits camera position, target, FOV, and projection
  -> Visual updates world, weather, clouds, terrain, flora, and post effects
  -> HDR Composer presents the frame

map path
  -> map overlay becomes pointer-interactive
  -> global pointer listener still admits left-button evidence from map surfaces
  -> map drag can mutate camera look state behind the overlay
  -> cameraSnapshot does not expose gesture, yaw, pitch, capture, or recenter state

retirement path
  -> Experience.dispose calls Camera Rig.dispose
  -> named wheel/pointer listeners are removed
  -> anonymous blur listener remains registered
  -> lostpointercapture has no settlement path
  -> repeated bindBalloon has no explicit prior-rig retirement
```

## Domains in use

| Domain | Ownership and services |
|---|---|
| Journey | session status, region, map pause policy, RAF progression, failure containment, snapshots, and disposal |
| Ballooning | balloon lifecycle, keyboard controls, buoyancy, venting, airstream sampling, steering, terrain contact, pose, heading, and state |
| Sky | airstream composition, Weather readback, local wind particles, deterministic close-cloud field, and disposal |
| Land | world configuration, Core World Foundation/Features, generation state, anchors, height sampling, and visual binding |
| Navigation | parchment-map lifecycle, generated-world cache, routes, Snap Points, reference cards, map state, and disposal |
| Image Capture | sightseeing mode, shutter admission, recognition, score, capture metadata, completion, and disposal |
| Experience | Three.js renderer/camera, Balloon Camera Rig, visual composition, update/render, snapshots, and disposal |
| Camera presentation | follow zoom, basket/third-person blend, drag yaw/pitch, delayed heading recenter, clipping fade, and projection commit |
| Core World family | foundation sampling, feature registry/lifecycle/query, landforms, and atmosphere-feature descriptors |
| Weather family | base weather advancement, semantic layered weather, altitude composition, and snapshots |
| Cloud presentation | deterministic Gaussian close layers, volumetric distant layers, live visibility, LOD capacity, and diagnostics |
| Validation/deploy | tiered Node checks, Vite artifact, provider revision stamping, and GitHub Pages publication |
| Proposed pointer-look authority | surface admission, gesture identity, capture lease, map suppression, retirement, pose result, digest, and frame proof |

## Main source-backed finding

The Balloon Camera Rig installs `pointerdown`, `pointermove`, `pointerup`, `pointercancel`, and `blur` on the global event target. `pointerdown` accepts every primary left-button event without checking the main render canvas, map-open state, route revision, session revision, disposed state, or existing active owner. The event target receives pointer capture, so a map canvas or overlay descendant can become the captured surface while camera yaw and pitch continue changing.

Movement and terminal events correctly reject a mismatched `pointerId`, but the lifecycle remains incomplete:

```txt
single pointerId ownership during move/up: present
immediate yaw/pitch response: present
five-second delayed recenter: present
heading-relative camera basis: present
pointercancel settlement: present

main-canvas admission check: absent
map-overlay suppression: absent
gesture/session/route revision: absent
lostpointercapture settlement: absent
explicit capture release result: absent
anonymous blur listener disposal: absent
prior-rig retirement during replacement bind: absent
CameraLookPoseResult: absent
camera look state in cameraSnapshot: absent
FirstCameraLookFrameAck: absent
```

The map overlay explicitly becomes pointer-interactive when open. Because input admission is global, its pointer evidence is not separated from flight-camera evidence. The anonymous `blur` closure is also not retained, so `dispose()` cannot remove it. No specific browser-visible fault was reproduced.

## Required authority

`open-above-camera-pointer-look-gesture-admission-retirement-authority-domain`

```txt
CameraLookGestureAdmissionCommand
  -> bind HostSessionId, RouteRevision, CameraRigGeneration,
     SurfaceId, MapStateRevision, PointerId, and button
  -> require the active #game render surface and flight-admitted route state
  -> allocate GestureId and CaptureLeaseRevision
  -> reject map, error, hidden, stale, disposed, duplicate, or secondary evidence
  -> publish CameraLookGestureAdmissionResult

CameraLookDeltaCommand
  -> require matching GestureId, PointerId, surface, and capture lease
  -> normalize pixel delta against viewport and DPR policy
  -> clamp yaw and pitch
  -> publish CameraLookDeltaResult and CameraLookPoseRevision

CameraLookGestureSettlementCommand
  -> settle pointerup, pointercancel, lostpointercapture, blur,
     visibility loss, map admission, route retirement, replacement, and disposal
  -> release only the matching capture lease exactly once
  -> publish CameraLookGestureSettlementResult

CameraLookRecenterCommand
  -> start from the last accepted gesture settlement
  -> bind heading revision and simulation clock
  -> apply the five-second delay and accepted recenter curve
  -> publish CameraLookPoseResult

CameraLookProjectionCommitCommand
  -> commit pose revision to camera position, target, FOV, and projection
  -> publish CameraLookFrameDigest
  -> expose accepted gesture and pose state through diagnostics
  -> publish FirstCameraLookFrameAck
```

## Planned authority surfaces: 20

1. `open-above-camera-pointer-look-gesture-admission-retirement-authority-domain`
2. `camera-look-surface-admission-kit`
3. `camera-look-gesture-id-kit`
4. `camera-look-pointer-owner-kit`
5. `camera-look-capture-lease-kit`
6. `camera-look-delta-normalization-kit`
7. `camera-look-route-revision-kit`
8. `camera-look-session-revision-kit`
9. `camera-look-map-suppression-kit`
10. `camera-look-focus-retirement-kit`
11. `camera-look-capture-loss-settlement-kit`
12. `camera-look-disposal-retirement-kit`
13. `camera-look-recenter-clock-kit`
14. `camera-look-heading-basis-kit`
15. `camera-look-pose-result-kit`
16. `camera-look-frame-digest-kit`
17. `first-camera-look-frame-ack-kit`
18. `camera-look-input-fixture-kit`
19. `camera-look-map-overlay-fixture-kit`
20. `camera-look-lifecycle-fixture-kit`

## Complete kit and offered-service inventory

### Semantic scene, wind, and close-cloud surfaces: 11

- `open-above-journey-domain`: session/region state, map pause policy, RAF progression, error containment, snapshots, and disposal.
- `open-above-ballooning-domain`: balloon loading/mounting, simulation composition, update, readiness, state/snapshot, and disposal.
- `open-above-sky-domain`: airstream composition, weather binding/readback, wind-particle lifecycle, cloud-field publication, and disposal.
- `open-above-land-domain`: Core World binding, world anchors, visual binding, generation/terrain snapshot, and height sampling.
- `open-above-navigation-domain`: map mount, open/close, world refresh, Snap Point projection, snapshot, and disposal.
- `open-above-image-capture-domain`: camera mode, shutter admission, recognition, score, metadata, completion, and disposal.
- `open-above-experience-domain`: visual composition, camera rig binding, balloon presentation, cloud diagnostics, update/render, snapshots, and disposal.
- `open-above-meadow-lift-scene`: semantic composition, cloud configuration binding, boot/update/render ordering, GameHost projection, and disposal.
- `open-above-wind-relative-steering-kit`: flow-relative direction, heading, turn offset, and target velocity resolution.
- `open-above-wind-particle-field-kit`: deterministic particle allocation, player-centered advection, wrapping, opacity, snapshots, and disposal.
- `open-above-cloud-bank-field-kit`: seeded close-cloud bank generation, volume-reach query, five LOD tiers, splat sampling, and snapshot.

### Runtime and airstream kits: 9

- `open-above-balloon-simulation-kit`: key consumption, burner/vent, buoyancy, steering, heading, airstream force, terrain contact, integration, pose, and snapshots.
- `open-above-balloon-telemetry-kit`: Nexus Engine resources/events, Core World/Weather composition, feature registration, ticking, and public readback.
- `open-above-airstream-domain`: route, field, force, visual, and diagnostics composition, update, sampling, snapshots, and disposal.
- `open-above-airstream-route-kit`: route identity, control points, colors, destinations, and descriptors.
- `open-above-airstream-sampler-kit`: route and ambient field sampling.
- `open-above-airstream-field-kit`: spatial wind evaluation and contributor blending.
- `open-above-airstream-balloon-force-kit`: flow normalization and balloon-force application.
- `open-above-airstream-visual-kit`: route visualization and scene updates.
- `open-above-airstream-debug-kit`: route/field diagnostics and readback.

### Balloon object and presentation kits: 15

- `open-above-hot-air-balloon-object-kit`: asynchronous composition, readiness, persistent-resource metadata, and animation.
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
- `open-above-balloon-camera-rig-kit`: follow-distance zoom, basket/third-person blending, pointer drag yaw/pitch, delayed heading recenter, camera commit, state, and disposal.
- `open-above-clipping-fade-kit`: near-camera clipping fade.

### Visual world and environment kits: 35

- `open-above-visual-domain`: renderer, scene, camera, generated world, weather adapters, Gaussian/volumetric clouds, update/render/resize/state/disposal.
- `open-above-world-generation-kit`: deterministic staged generation, work budgets, snapshots, and subscriptions.
- `open-above-world-feature-foundation-kit`: generated-world/Core World bridge.
- `open-above-quality-tier-kit`: device quality detection and tier descriptors.
- `open-above-dynamic-resolution-kit`: effective DPR, frame sampling, scale transitions, and resize.
- `open-above-physical-sky-kit`: sky shader and solar update.
- `open-above-sun-light-kit`: sun direction, color, shadows, and world position.
- `open-above-aerial-perspective-kit`: fog, altitude clearing, cloud response, and sun warmth.
- `open-above-cloud-weather-map-kit`: Weather/Layered Weather advancement, aggregation, and projection.
- `open-above-volumetric-cloud-kit`: distant-layer raymarch, uniforms, budgets, low-resolution target, composite, and disposal.
- `open-above-gaussian-cloud-render-adapter`: instanced close-cloud projection, weather visibility, rebatching, capacity selection, supported fog-uniform policy, diagnostics, and disposal.
- `open-above-cloud-lod-kit`: volumetric render scale, samples, distance, and jitter policy.
- `open-above-cloud-lighting-kit`: cloud sun and sky-fill lighting.
- `open-above-terrain-surface-kit`: terrain geometry/material, queries, streaming, and disposal.
- `open-above-terrain-streaming-contract-kit`: terrain streaming contract.
- `open-above-terrain-chunk-streaming-kit`: active terrain-chunk lifecycle.
- `open-above-terrain-horizon-streaming-kit`: horizon-ring lifecycle.
- `open-above-vegetation-cluster-kit`: vegetation generation, refresh, update, and disposal.
- `open-above-grass-world-seed-kit`: deterministic grass seed.
- `open-above-grass-biome-density-kit`: biome density evaluation.
- `open-above-grass-exclusion-mask-kit`: route and object exclusions.
- `open-above-grass-patch-density-kit`: patch distribution.
- `open-above-grass-texture-atlas-kit`: procedural grass atlas generation.
- `open-above-grass-chunk-placement-kit`: grass chunk placement.
- `open-above-grass-lod-kit`: grass LOD policy.
- `open-above-grass-compute-culling-kit`: culling and capacity policy.
- `open-above-grass-field-domain`: grass composition, update, refresh, state, and disposal.
- `open-above-flower-chunk-placement-kit`: flower placement.
- `open-above-flower-texture-atlas-kit`: procedural flower atlas generation.
- `open-above-flower-field-domain`: flower composition, update, refresh, state, and disposal.
- `open-above-water-surface-kit`: water geometry, material, lighting, and update.
- `open-above-distant-landmark-kit`: landmark geometry and disposal.
- `open-above-hdr-composer-kit`: half-float targets, depth textures, passes, resize, render, and disposal.
- `open-above-color-grade-kit`: HDR grading and exposure response.
- `open-above-lens-response-kit`: sun-facing lens response.

### UI, tooling, and proof kits: 11

- `open-above-parchment-map-overlay-kit`: generated map, routes, Snap Points, reference card, player projection, RAF, and disposal.
- `open-above-headless-editor-environment`: deterministic environment setup and editor validation.
- `open-above-static-smoke-test-kit`: source and composition smoke assertions.
- `open-above-airstream-mail-test-kit`: retained airstream/Air Mail historical assertions.
- `open-above-world-flora-test-kit`: terrain/flora source-contract assertions.
- `open-above-world-feature-foundation-test-kit`: foundation and feature integration assertions.
- `open-above-world-domain-composition-test-kit`: Core World composition assertions.
- `open-above-layered-weather-integration-test-kit`: five-layer weather integration assertions.
- `open-above-cloud-lod-integration-test-kit`: deterministic cloud field, LOD thresholds, volume filtering, capacity order, visual wiring, and unsupported-fog-uniform regression assertions.
- `open-above-tiered-validation-runner-kit`: subprocess orchestration and severity annotations.
- `open-above-semantic-domain-composition-test-kit`: semantic folder/composition and Air Mail retirement assertions.

### Runtime-implied browser/host/deploy adapters: 14

- `open-above-route-shell-kit`: HTML route and main canvas ownership.
- `open-above-importmap-kit`: Three.js/Nexus Engine module resolution.
- `open-above-runtime-composer-kit`: browser boot and scene creation.
- `open-above-keyboard-input-kit`: burner, vent, steering, map, camera, and shutter key evidence.
- `open-above-wheel-zoom-input-kit`: follow-distance and sightseeing wheel evidence.
- `open-above-pointer-look-input-kit`: global primary-pointer admission, pointer capture request, yaw/pitch deltas, cancellation, and delayed recenter evidence.
- `open-above-parchment-map-shell-kit`: map DOM/canvas surface.
- `open-above-error-panel-kit`: fatal error projection.
- `open-above-gamehost-legacy-readback-kit`: browser diagnostics and domain readback.
- `open-above-vite-nexusengine-checkout-alias-kit`: checked-out provider aliasing.
- `open-above-nexusengine-revision-stamp-kit`: provider revision embedding.
- `open-above-campaign-source-kit`: world, weather, and feature configuration.
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
- `n-layered-weather-domain`: semantic layered weather state, sampling, and snapshots.

### Inactive Air Mail migration surfaces: 6

- `open-above-mail-delivery-domain`: historical Air Mail composition, update, reset, snapshot, and disposal.
- `open-above-mail-parcel-kit`: historical parcel identity, state, message, and reset.
- `open-above-mail-route-kit`: historical parcel route and town descriptors.
- `open-above-delivery-volume-kit`: historical geometric delivery eligibility.
- `open-above-delivery-progress-kit`: historical target tracking and completion settlement.
- `open-above-mail-town-kit`: historical town meshes, anchors, animation, and metadata.

## Census

```txt
active local source-backed surfaces: 81
runtime-implied adapters:            14
Nexus Engine provider surfaces:      30
active documented surfaces:         125
inactive Air Mail migration:          6
planned pointer-look surfaces:       20
```

## Validation boundary

The three-commit runtime delta, current camera code, Experience binding, main canvas/map route, Balloon Simulation heading state, and prior full service inventory were inspected. Documentation changed only in this audit. Runtime JavaScript, tests, package scripts, workflows, and deployment were not changed. No live browser gesture, map interaction, lifecycle, build, artifact, or Pages fixture was executed.