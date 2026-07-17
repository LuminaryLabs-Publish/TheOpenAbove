# Project Breakdown: TheOpenAbove Balloon Rigging Frame Budget and Resource Retirement

**Timestamp:** `2026-07-17T10-41-44-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Selection:** oldest synchronized eligible Publish repository  
**Reviewed repository head:** `9d9214b8c8cdbadf5c2ce40e6a794b1f88189877`  
**Status:** `balloon-rigging-frame-budget-resource-retirement-authority-audited`

## Summary

The current `LuminaryLabs-Publish` inventory contains 11 repositories. Ten are eligible after excluding `LuminaryLabs-Publish/TheCavalryOfRome`; all ten have central ledger and root `.agent` coverage and none are runtime-ahead. TheOpenAbove was selected by the oldest documented-selection rule.

The focused finding is the animated balloon rigging path. Four ropes keep their GPU vertex buffers and update them in place, but every rendered flight frame allocates fresh endpoint vectors, point arrays, point clones, tangent frames, ring normals, and ring-position vectors. The rigging and rope kits also expose no explicit resource inventory or disposal service, while balloon replacement removes prior scene children without retiring their geometries and materials.

No browser stutter, memory leak, or GPU exhaustion was reproduced. This is a source-backed frame-budget, allocation-observability, replacement, and resource-retirement gap.

## Intent

Preserve the current soft-rope appearance while making one rigging generation authoritative for reusable CPU scratch state, dynamic GPU buffers, per-frame updates, diagnostics, replacement, disposal, and the matching rendered frame.

## Checklist

- [x] Enumerate all 11 accessible Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and root `.agent` states.
- [x] Confirm no new, ledger-missing, root-agent-missing, undocumented, or runtime-ahead eligible repository.
- [x] Select only TheOpenAbove by the oldest documented-selection rule.
- [x] Identify the complete interaction loop and active domains.
- [x] Reconcile all 125 active documented surfaces and offered services.
- [x] Inspect balloon construction, rigging construction, rope buffer creation, per-frame rope updates, replacement, and disposal boundaries.
- [x] Define one proposed rigging authority with 20 coordinating surfaces.
- [ ] Implement scratch reuse, resource manifests, exact retirement, diagnostics, and frame proof.
- [ ] Execute long-flight, replacement, browser, artifact, and Pages fixtures.

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
selection rule: oldest documented-selection rule
previous central update: 2026-07-17T05-41-10-04-00
reviewed repository head: 9d9214b8c8cdbadf5c2ce40e6a794b1f88189877
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
boot
  -> Meadow Lift composes Journey, Ballooning, Sky, Land,
     Navigation, Image Capture, and Experience
  -> Experience loads/builds the hot-air balloon
  -> buildHotAirBalloon allocates envelope, basket, burner, rigging,
     four soft ropes, geometries, materials, and dynamic buffer attributes
  -> model is attached to the live vehicle and marked persistent

flight frame
  -> Journey admits one frame and Balloon Simulation updates flight state
  -> animateHotAirBalloon derives rigging tension from vertical velocity and trim
  -> animateRigging loops across four ropes
  -> each rope receives newly allocated endpoint vectors
  -> updateSoftRope clones endpoints and computes a new point array
  -> updateTubeGeometry allocates tangent/frame/binormal/ring vectors
  -> persistent position and normal BufferAttributes are rewritten in place
  -> Visual/HDR Composer presents the frame

replacement/retirement
  -> installHotAirBalloonVisual removes all prior vehicle children
  -> removed geometries/materials are not explicitly disposed
  -> rope/rigging/object kits expose no resource manifest or dispose result
  -> stale update rejection and first rigging-bound frame proof are absent
```

## Domains in use

| Domain | Ownership and services |
|---|---|
| Journey | session status, map pause policy, RAF progression, failure containment, snapshots, and disposal |
| Ballooning | balloon loading, simulation, controls, steering, buoyancy, terrain contact, pose, state, and model animation |
| Sky | airstreams, Weather readback, wind particles, close-cloud publication, and disposal |
| Land | Core World configuration, world generation, terrain sampling, visual binding, and snapshots |
| Navigation | parchment-map lifecycle, routes, Snap Points, reference cards, map state, and disposal |
| Image Capture | sightseeing mode, shutter admission, recognition, score, metadata, completion, and disposal |
| Experience | Three.js renderer/camera, balloon model binding, update/render, diagnostics, snapshots, and disposal |
| Balloon object/presentation | envelope, basket, burner, rigging, soft ropes, materials, animation, and camera-facing presentation |
| Core World family | foundation sampling, features, landforms, atmosphere descriptors, and provider snapshots |
| Weather family | base weather, semantic layered weather, altitude composition, and snapshots |
| Visual environment | sky, lighting, terrain, water, flora, clouds, HDR composition, and dynamic resolution |
| Validation/deploy | source checks, Vite artifact, provider revision stamping, and Pages publication |
| Proposed rigging authority | rigging generation, resource inventory, scratch reuse, update budget, retirement, diagnostics, and frame proof |

## Main source-backed finding

### Implemented strengths

```txt
four soft ropes: present
persistent dynamic position/normal BufferAttributes: present
in-place buffer writes: present
bounded rope topology: 10 segments, 5 radial segments
flight-state-derived tension: present
visual sway and sag: present
```

### Missing authority

```txt
RiggingGeneration / RopeGeneration: absent
resource manifest and ownership result: absent
reusable endpoint and point scratch buffers: absent
reusable tangent/frame/binormal scratch vectors: absent
per-frame allocation count/budget: absent
stale rope update rejection: absent
rigging update duration/result: absent
replacement resource transfer/retirement: absent
idempotent geometry/material disposal result: absent
rigging state in public diagnostics: absent
RiggingFrameDigest: absent
FirstRiggingBoundFrameAck: absent
```

Default topology produces four ropes × eleven point rings × five vertices, or 220 dynamic rope vertices per frame. The persistent typed arrays are reused, but the CPU path constructs many temporary arrays and `THREE.Vector3` objects around those writes. `persistentGpuResources` and `persistentGeometry` are metadata only; no owner enumerates or retires the resources.

## Required authority

`open-above-balloon-rigging-frame-budget-resource-retirement-authority-domain`

```txt
RiggingResourceAdmissionCommand
  -> bind HostSessionId, BalloonModelGeneration, RiggingGeneration,
     rope topology, material set, geometry set, and dynamic buffers
  -> publish RiggingResourceAdmissionResult and immutable resource manifest

RiggingFrameUpdateCommand
  -> bind simulation revision, frame ID, tension revision, and endpoints
  -> reuse preallocated endpoint, point, tangent, frame, binormal, and ring scratch
  -> reject stale model/rigging generations
  -> publish RiggingFrameUpdateResult

RiggingFrameBudgetSettlementCommand
  -> record update duration, buffer writes, temporary allocations, and degradation
  -> preserve visual continuity under the accepted budget
  -> publish RiggingFrameBudgetResult

RiggingResourceRetirementCommand
  -> stop updates for the retiring generation
  -> dispose owned geometries/materials exactly once
  -> detach and clear resource references
  -> publish RiggingResourceRetirementResult

RiggingFrameCommitCommand
  -> publish RiggingFrameDigest
  -> expose generation/update/budget/retirement state through diagnostics
  -> publish FirstRiggingBoundFrameAck
```

## Planned authority surfaces: 20

1. `open-above-balloon-rigging-frame-budget-resource-retirement-authority-domain`
2. `rigging-generation-kit`
3. `rope-generation-kit`
4. `rigging-resource-manifest-kit`
5. `rope-dynamic-buffer-kit`
6. `rope-endpoint-binding-kit`
7. `rope-point-scratch-pool-kit`
8. `rope-frame-scratch-pool-kit`
9. `rigging-tension-revision-kit`
10. `rigging-frame-plan-kit`
11. `rigging-update-budget-kit`
12. `rigging-frame-update-result-kit`
13. `stale-rigging-update-rejection-kit`
14. `rigging-resource-retirement-kit`
15. `rigging-disposal-idempotency-kit`
16. `balloon-replacement-resource-transfer-kit`
17. `rigging-frame-digest-kit`
18. `first-rigging-bound-frame-ack-kit`
19. `rope-allocation-budget-fixture-kit`
20. `rigging-replacement-long-flight-fixture-kit`

## Complete kit and offered-service inventory

### Semantic scene, wind, and close-cloud surfaces: 11

- `open-above-journey-domain`: session/region state, map pause policy, RAF progression, error containment, snapshots, and disposal.
- `open-above-ballooning-domain`: balloon loading/mounting, simulation composition, update, readiness, state/snapshot, and disposal.
- `open-above-sky-domain`: airstream composition, weather binding/readback, wind-particle lifecycle, cloud-field publication, and disposal.
- `open-above-land-domain`: Core World binding, world anchors, visual binding, generation/terrain snapshot, and height sampling.
- `open-above-navigation-domain`: map mount, open/close, world refresh, Snap Point projection, snapshot, and disposal.
- `open-above-image-capture-domain`: camera mode, shutter admission, recognition, score, metadata, completion, and disposal.
- `open-above-experience-domain`: visual composition, camera rig binding, balloon presentation, cloud diagnostics, update/render, snapshots, and disposal.
- `open-above-meadow-lift-scene`: semantic composition, boot/update/render ordering, GameHost projection, and disposal.
- `open-above-wind-relative-steering-kit`: flow-relative direction, heading, turn offset, and target velocity resolution.
- `open-above-wind-particle-field-kit`: deterministic particle allocation, player-centered advection, wrapping, opacity, snapshots, and disposal.
- `open-above-cloud-bank-field-kit`: seeded close-cloud generation, volume-reach query, LOD tiers, splat sampling, and snapshot.

### Runtime and airstream kits: 9

- `open-above-balloon-simulation-kit`: key consumption, burner/vent, buoyancy, steering, heading, airstream force, terrain contact, integration, pose, and snapshots.
- `open-above-balloon-telemetry-kit`: Nexus Engine resources/events, Core World/Weather composition, feature registration, ticking, and public readback.
- `open-above-airstream-domain`: route, field, force, visual, diagnostics, update, sampling, snapshots, and disposal.
- `open-above-airstream-route-kit`: route identity, control points, colors, destinations, and descriptors.
- `open-above-airstream-sampler-kit`: route and ambient field sampling.
- `open-above-airstream-field-kit`: spatial wind evaluation and contributor blending.
- `open-above-airstream-balloon-force-kit`: flow normalization and balloon-force application.
- `open-above-airstream-visual-kit`: route visualization and scene updates.
- `open-above-airstream-debug-kit`: route/field diagnostics and readback.

### Balloon object and presentation kits: 15

- `open-above-hot-air-balloon-object-kit`: asynchronous composition, readiness, persistent-resource metadata, installation, and animation.
- `open-above-balloon-envelope-profile-kit`: envelope proportions and profile sampling.
- `open-above-balloon-envelope-panel-kit`: envelope panel geometry.
- `open-above-balloon-mouth-kit`: mouth geometry and fit.
- `open-above-balloon-streamer-fit-kit`: streamer placement and fit.
- `open-above-balloon-fabric-seam-kit`: fabric-seam presentation.
- `open-above-hot-air-balloon-basket-kit`: basket geometry.
- `open-above-hot-air-balloon-rigging-kit`: frame bars, four rope construction, tension-driven animation, and connection metadata.
- `open-above-hot-air-balloon-burner-kit`: burner geometry and presentation.
- `open-above-rope-kit`: rope topology, dynamic geometry buffers, sag/sway point generation, per-frame buffer updates, and metadata.
- `open-above-balloon-presentation-domain`: presentation composition and accepted-state updates.
- `open-above-envelope-fabric-material-kit`: envelope material descriptors and GPU state.
- `open-above-basket-material-kit`: basket material descriptors and GPU state.
- `open-above-balloon-camera-rig-kit`: follow zoom, view blending, pointer look, heading recenter, camera commit, state, and disposal.
- `open-above-clipping-fade-kit`: near-camera clipping fade.

### Visual world and environment kits: 35

- `open-above-visual-domain`: renderer, scene, camera, generated world, weather adapters, clouds, update/render/resize/state/disposal.
- `open-above-world-generation-kit`: deterministic staged generation, work budgets, snapshots, and subscriptions.
- `open-above-world-feature-foundation-kit`: generated-world/Core World bridge.
- `open-above-quality-tier-kit`: device quality detection and tier descriptors.
- `open-above-dynamic-resolution-kit`: effective DPR, frame sampling, scale transitions, and resize.
- `open-above-physical-sky-kit`: sky shader and solar update.
- `open-above-sun-light-kit`: sun direction, color, shadows, and world position.
- `open-above-aerial-perspective-kit`: fog, altitude clearing, cloud response, and sun warmth.
- `open-above-cloud-weather-map-kit`: Weather advancement, aggregation, and projection.
- `open-above-volumetric-cloud-kit`: distant-layer raymarch, uniforms, budgets, low-resolution target, composite, and disposal.
- `open-above-gaussian-cloud-render-adapter`: instanced close-cloud projection, visibility, rebatching, capacity, diagnostics, and disposal.
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
- `open-above-cloud-lod-integration-test-kit`: cloud field, LOD, volume, capacity, wiring, and fog-uniform regression assertions.
- `open-above-tiered-validation-runner-kit`: subprocess orchestration and severity annotations.
- `open-above-semantic-domain-composition-test-kit`: semantic folder/composition and Air Mail retirement assertions.

### Runtime-implied browser/host/deploy adapters: 14

- `open-above-route-shell-kit`: HTML route and main canvas ownership.
- `open-above-importmap-kit`: Three.js/Nexus Engine module resolution.
- `open-above-runtime-composer-kit`: browser boot and scene creation.
- `open-above-keyboard-input-kit`: burner, vent, steering, map, camera, and shutter evidence.
- `open-above-wheel-zoom-input-kit`: follow-distance and sightseeing wheel evidence.
- `open-above-pointer-look-input-kit`: global primary-pointer admission and camera-look evidence.
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
planned rigging authority surfaces:  20
```

## Validation boundary

Source inspection covered the current organization inventory, central ledger, root `.agent` state, balloon object kit, rigging kit, rope kit, Ballooning/Experience ownership, and the prior complete service inventory. Documentation changed only. Runtime JavaScript, rendering behavior, gameplay, tests, package scripts, workflows, and deployment were not changed. No profiler, long-flight, replacement, browser, artifact, or Pages fixture was executed.