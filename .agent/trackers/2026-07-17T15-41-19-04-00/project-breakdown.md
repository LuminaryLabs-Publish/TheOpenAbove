# Project Breakdown: TheOpenAbove Wind Particle Budget and Frame Authority

**Timestamp:** `2026-07-17T15-41-19-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Selection:** sole runtime-ahead eligible Publish repository  
**Reviewed pre-audit repository head:** `c066a1f4315ac7e0db87eb30ffb4bbe4201089d4`  
**Previous documented head:** `2d2b4b3cf022905a61d584ada92cf85e0fcf1a82`  
**Runtime delta:** 7 commits / 7 changed files  
**Status:** `wind-particle-simulation-budget-quality-admission-authority-audited`

## Summary

The current `LuminaryLabs-Publish` inventory contains 11 repositories. Ten are eligible after excluding `LuminaryLabs-Publish/TheCavalryOfRome`. All ten have central ledgers and root `.agent` state. `TheOpenAbove` was the only runtime-ahead repository, with seven commits replacing the legacy spline wind renderer with a player-centered 3,200-particle dust field and adding source-policy tests.

The new field reuses one position buffer and one phase buffer, has explicit disposal, uses 50% alpha, normal blending and layered 3D flow noise, and removes the redundant route-trail visual. The remaining gap is runtime authority: every active flight frame evaluates layered trigonometric noise for all 3,200 particles and rewrites 9,600 position scalars without quality-tier admission, cadence control, measured CPU/write budgets, degradation results, runtime browser fixtures or an exact wind-sample-to-frame acknowledgement.

No browser-visible performance defect is claimed. This is a source-backed cost ownership, quality admission, diagnostics and executable-proof gap.

## Intent

Keep the new compressed dust-stream visual while binding one wind-visual generation to accepted wind evidence, quality policy, particle capacity, update cadence, CPU and buffer-write budgets, degradation, disposal and the matching rendered frame.

## Checklist

- [x] Enumerate all 11 accessible Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and root `.agent` states.
- [x] Identify `TheOpenAbove` as the sole runtime-ahead repository.
- [x] Reconcile the seven-commit runtime delta and all seven changed files.
- [x] Identify the complete interaction loop and active domains.
- [x] Reconcile all 125 active documented surfaces and offered services.
- [x] Remove the retired `open-above-airstream-visual-kit` from the active inventory.
- [x] Add `open-above-wind-visual-policy-test-kit` to the active proof inventory.
- [x] Define one proposed wind-particle authority with 20 coordinating surfaces.
- [ ] Implement quality admission, cadence, budget settlement, diagnostics and frame proof.
- [ ] Execute runtime, long-flight, browser, artifact and Pages fixtures.

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
selection rule: sole runtime-ahead eligible repository
previous documented head: 2d2b4b3cf022905a61d584ada92cf85e0fcf1a82
reviewed runtime head: c066a1f4315ac7e0db87eb30ffb4bbe4201089d4
ahead by: 7 commits
changed files: 7
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Runtime delta

```txt
feat(wind): render half-size dust through 3d flow noise
refactor(sky): expose dust wind visual policy
refactor(wind): remove spline trail renderer from runtime
refactor(wind): stop exporting legacy route visuals
refactor(wind): delete legacy spline trail renderer
test(wind): lock dust noise visual policy
test(wind): run wind visual policy checks
```

Changed source:

```txt
src/domains/sky/sky-domain.js
src/domains/sky/wind-particle-field-kit.js
src/runtime/airstream-domain/airstream-domain.js
src/runtime/airstream-domain/airstream-visual-kit.js (removed)
src/runtime/airstream-domain/index.js
tests/run-tiered-checks.mjs
tests/wind-visuals.mjs
```

## Complete interaction loop

```txt
boot
  -> Meadow Lift composes Journey, Ballooning, Sky, Land,
     Navigation, Image Capture and Experience
  -> Sky mounts Airstream with debug visuals disabled
  -> Sky allocates one 3,200-particle dust field
  -> field allocates persistent Float32 position and phase arrays
  -> field creates one DynamicDraw position BufferAttribute
  -> field creates a procedural CanvasTexture and PointsMaterial

accepted flight frame
  -> Journey clamps dt and skips simulation while the map is open
  -> Ballooning produces position, elapsed time and sampled airstream velocity
  -> Sky updates Airstream state from the supplied sample
  -> Wind Particle Field centers its Points object on the balloon
  -> every particle evaluates layered 3D trigonometric flow noise
  -> every particle advances along normalized wind plus local noise
  -> local positions wrap within a 50 m horizontal / 27.5 m vertical volume
  -> 9,600 position scalars are rewritten
  -> BufferAttribute.needsUpdate is set
  -> Experience updates and HDR rendering presents the frame

map / retirement
  -> map-open frames skip Sky update and render with dt zero
  -> scene disposal removes Points and disposes geometry, material and texture
  -> no generation-bound update result, cost result or rendered-frame ack exists
```

## Domains in use

| Domain | Ownership and services |
|---|---|
| Journey | session status, map pause policy, RAF progression, failure containment, snapshots and disposal |
| Ballooning | balloon loading, simulation, controls, steering, buoyancy, terrain contact, pose, state and animation |
| Sky | airstream composition, Weather readback, dust wind-particle lifecycle, close-cloud publication and disposal |
| Airstream | routes, field sampling, active-route state, force evidence, optional debug diagnostics and snapshots; no longer owns route-trail presentation |
| Land | Core World configuration, world generation, terrain sampling, visual binding and snapshots |
| Navigation | parchment-map lifecycle, routes, Snap Points, reference cards, map state and disposal |
| Image Capture | sightseeing mode, shutter admission, recognition, score, metadata, completion and disposal |
| Experience | Three.js renderer/camera, balloon presentation, visual update/render, diagnostics, snapshots and disposal |
| Balloon object/presentation | envelope, basket, burner, rigging, ropes, materials, animation and camera-facing presentation |
| Core World family | foundation sampling, features, landforms, atmosphere descriptors and provider snapshots |
| Weather family | base weather, semantic layered weather, altitude composition and snapshots |
| Visual environment | sky, lighting, terrain, water, flora, clouds, HDR composition and dynamic resolution |
| Validation/deploy | source-policy checks, tiered validation, Vite artifact, provider revision stamping and Pages publication |
| Proposed wind-particle authority | generation, sample binding, quality admission, capacity, cadence, cost budgets, degradation, retirement and frame proof |

## Main source-backed finding

### Implemented strengths

```txt
legacy spline route-trail renderer: removed
single wind visual owner under Sky: present
deterministic particle initialization: present
persistent Float32 position array: present
persistent Float32 phase array: present
DynamicDraw position attribute: present
particle count: 3,200
horizontal radius: 50 m
vertical radius: 27.5 m
particle size: 0.11
opacity: 0.5
procedural dust texture: present
normal blending: present
additive blending: absent
layered 3D flow noise: present
bounded dt from Journey: present
map-open simulation suspension: present
explicit geometry/material/texture disposal: present
source-policy test in tiered runner: present
```

### Missing authority

```txt
WindVisualGeneration: absent
WindSampleRevision binding: absent
quality-tier-derived particle capacity: absent
quality-tier-derived noise complexity: absent
update cadence / stagger policy: absent
visibility admission result: absent
CPU update duration result: absent
trigonometric evaluation budget: absent
buffer-write byte/scalar budget result: absent
adaptive degradation result: absent
stale wind-sample rejection: absent
public update-cost diagnostics: absent
WindParticleFrameDigest: absent
FirstWindParticleBoundFrameAck: absent
runtime constructor fixture: absent
browser long-flight budget fixture: absent
artifact / Pages visual-policy proof: absent
```

At the default policy, each accepted flight frame calls `sampleFlowNoise3D` 3,200 times. Each call evaluates six primary `sin`/`cos` terms plus three additional sine terms, then the update loop rewrites three position components per particle. The source therefore establishes a fixed per-frame CPU and upload workload, but not its measured browser cost or admissible device tiers.

The new `tests/wind-visuals.mjs` verifies file presence, constants, source patterns, normal blending and removal of the legacy renderer. It does not construct the field, execute an update, measure cost, validate typed-array stability, inspect a browser frame or prove source/artifact/Pages parity.

## Required authority

`open-above-wind-particle-simulation-budget-quality-admission-authority-domain`

```txt
WindVisualAdmissionCommand
  -> bind HostSessionId, SkyGeneration, WindVisualGeneration,
     WindPolicyRevision, QualityTierRevision and particle capacity
  -> publish WindVisualAdmissionResult

WindParticleUpdateCommand
  -> bind accepted WindSampleRevision, simulation frame and dt
  -> reject stale or retired generations
  -> execute the admitted capacity, cadence and noise profile
  -> publish WindParticleUpdateResult

WindVisualBudgetSettlementCommand
  -> record particles evaluated, noise evaluations, scalar writes,
     upload bytes, update duration and degradation state
  -> publish WindVisualBudgetResult

WindVisualRetirementCommand
  -> stop updates, detach Points and dispose owned resources once
  -> publish WindVisualRetirementResult

WindVisualProjectionCommitCommand
  -> publish WindParticleFrameDigest
  -> expose generation/sample/policy/budget state through diagnostics
  -> publish FirstWindParticleBoundFrameAck
```

## Planned authority surfaces: 20

1. `open-above-wind-particle-simulation-budget-quality-admission-authority-domain`
2. `wind-visual-generation-kit`
3. `wind-particle-policy-kit`
4. `wind-sample-revision-kit`
5. `wind-particle-quality-tier-kit`
6. `wind-particle-capacity-kit`
7. `wind-particle-update-plan-kit`
8. `wind-particle-update-cadence-kit`
9. `wind-particle-cpu-budget-kit`
10. `wind-particle-buffer-write-budget-kit`
11. `wind-particle-noise-profile-kit`
12. `wind-particle-visibility-admission-kit`
13. `wind-particle-degradation-policy-kit`
14. `stale-wind-visual-update-rejection-kit`
15. `wind-particle-update-result-kit`
16. `wind-particle-frame-digest-kit`
17. `first-wind-particle-bound-frame-ack-kit`
18. `wind-particle-retirement-kit`
19. `wind-particle-runtime-fixture-kit`
20. `wind-particle-browser-budget-fixture-kit`

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
planned wind authority surfaces:     20
```

## Validation boundary

Source inspection covered the full current Publish inventory, central ledgers, root `.agent` states, the seven-commit delta, Sky composition, Airstream composition, wind-particle implementation, Journey frame policy and tiered source tests. Documentation changed only. Runtime JavaScript, rendering behavior, gameplay, tests, package scripts, workflows and deployment were not changed by this audit.

`npm run check` and `npm run build` were not executed because no repository checkout was available in the automation runtime. A direct public clone attempt failed at DNS resolution before any package command ran. No runtime constructor, profiler, browser, artifact or Pages fixture was executed.
