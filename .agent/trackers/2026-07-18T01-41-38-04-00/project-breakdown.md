# Project Breakdown: TheOpenAbove Balloon Simulation Tick Allocation and Terrain Sample Authority

**Timestamp:** `2026-07-18T01-41-38-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Selection:** oldest synchronized eligible Publish repository  
**Reviewed repository head:** `3446d1c65796bdd57bc1aa1ad7dfc59674292b7e`  
**Status:** `balloon-simulation-tick-allocation-terrain-sample-budget-authority-audited`

## Summary

The current `LuminaryLabs-Publish` installation contains 11 repositories. Ten are eligible after excluding `LuminaryLabs-Publish/TheCavalryOfRome`. All ten have central-ledger coverage, root `.agent` state, and `main` heads matching the documented repo-local heads. `TheOpenAbove` was selected by the oldest documented-selection rule using its prior central timestamp `2026-07-17T15-41-19-04-00`.

The focused source audit found a stable and understandable balloon-flight loop, but its accepted simulation tick creates repeated short-lived objects and repeats one terrain query. The local path proves at least nine new JavaScript objects or arrays per active tick before counting allocations inside the live Sky/Airstream sampler: an eagerly built fallback-wind object, normalized flow and velocity objects, two contributor arrays, a replacement public airstream object and velocity, a steering result, and a new `THREE.Vector3` velocity target. At 60 accepted ticks per second, that source minimum is 540 local allocations per second. This is arithmetic from the implementation, not a measured runtime profile.

The same post-integration `terrainHeight(x, z)` value is requested twice: once to settle the ground floor and again to calculate altitude. The fallback wind also performs trigonometric work and allocates its object before `sampleBalloonAirstream()` knows whether a live sampler is available.

No hitch, garbage-collection pause, terrain defect, determinism regression, or device failure was reproduced. The finding is a tick-work ownership, scratch-memory, terrain-query reuse, diagnostics, and executable-proof gap.

## Intent

Keep the current buoyancy, steering, airstream, terrain-contact, animation, and snapshot behavior while making one admitted simulation generation authoritative for reusable scratch state, lazy fallback evaluation, terrain-sample reuse, tick-cost evidence, deterministic parity, and the matching rendered frame.

## Checklist

- [x] Enumerate all 11 accessible Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and root `.agent` states.
- [x] Confirm all ten eligible `main` heads match their documented repo-local heads.
- [x] Select only `LuminaryLabs-Publish/TheOpenAbove` by the oldest documented-selection rule.
- [x] Identify the complete interaction loop and all active domains.
- [x] Reconcile all 125 active documented surfaces, kits, adapters, provider surfaces, and offered services.
- [x] Inspect Ballooning composition, balloon simulation, Airstream force normalization, wind-relative steering, scene ordering, and terrain-contact usage.
- [x] Define one proposed balloon-simulation tick allocation and terrain-sample authority with 20 coordinating surfaces.
- [ ] Replace recurring tick allocations with generation-owned scratch state without changing simulation truth.
- [ ] Reuse one accepted terrain sample for floor settlement and altitude.
- [ ] Execute deterministic parity, allocation, terrain-query-count, browser long-flight, artifact, and Pages fixtures.

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
selected prior central timestamp: 2026-07-17T15-41-19-04-00
reviewed repository head: 3446d1c65796bdd57bc1aa1ad7dfc59674292b7e
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
boot
  -> Meadow Lift composes Journey, Ballooning, Sky, Land,
     Navigation, Image Capture and Experience
  -> Ballooning loads and mounts the balloon presentation
  -> Ballooning creates Balloon Simulation with terrainHeight and Sky.sample
  -> Simulation installs keyboard and blur input listeners
  -> initial balloon pose is committed without advancing simulation

accepted flight tick
  -> Journey admits bounded dt while the map is closed
  -> Ballooning calls simulation.update(dt)
  -> input state resolves burner, vent and steering evidence
  -> fallbackWind() eagerly evaluates trigonometric fallback and allocates an object
  -> sampleBalloonAirstream() calls Sky.sample and allocates normalized flow evidence
  -> applyAirstreamToBalloonState() replaces public airstream evidence
  -> wind-relative steering allocates a result object
  -> buoyancy, damping and ceiling response update vertical velocity
  -> a fresh THREE.Vector3 target is allocated for velocity interpolation
  -> position integrates
  -> terrainHeight(x, z) is called for ground settlement
  -> terrainHeight(x, z) is called again for altitude
  -> distance, message and simulation snapshot state update
  -> Ballooning applies pose and animates balloon presentation
  -> Sky, Experience, Image Capture and Nexus Engine advance
  -> HDR rendering presents the frame

map / retirement
  -> map-open state prevents accepted simulation updates
  -> Ballooning.dispose removes input listeners and detaches the balloon
  -> no allocation result, terrain-query result, tick digest,
     deterministic parity result or matching-frame acknowledgement exists
```

## Domains in use

| Domain | Ownership and services |
|---|---|
| Journey | session status, map pause policy, bounded RAF progression, failure containment, snapshots, and disposal |
| Ballooning | balloon loading, simulation composition, accepted tick update, pose commit, model animation, readiness, state, snapshots, and disposal |
| Balloon Simulation | keyboard evidence, burner/vent, fallback wind, airstream normalization, steering, buoyancy, damping, terrain contact, integration, telemetry, snapshot, and listener retirement |
| Sky | Airstream composition, Weather readback, wind particles, close-cloud field, update, state, and disposal |
| Airstream | route/field sampling, active-route evidence, balloon-force normalization, contributors, diagnostics, snapshots, and disposal |
| Wind-relative steering | flow-relative direction, speed, turn offset, heading, and target horizontal velocity |
| Land | Core World binding, staged generation, visual world binding, terrain height/color/moisture queries, snapshots, and disposal |
| Navigation | map lifecycle, routes, Snap Points, reference cards, generated-world projection, snapshots, and disposal |
| Image Capture | sightseeing mode, shutter admission, recognition, score, completion, metadata, and disposal |
| Experience | Three.js renderer/camera, balloon presentation, visual update/render, diagnostics, snapshots, and disposal |
| Core World/Weather | foundation, features, landforms, atmosphere, weather advancement, layered altitude sampling, and public snapshots |
| Validation/deploy | static/tiered checks, Vite artifact, provider revision stamping, GitHub Actions, and Pages publication |
| Proposed simulation-tick authority | generation, scratch state, lazy fallback, terrain-sample reuse, allocation/query budgets, parity, diagnostics, and frame proof |

## Main source-backed finding

### Implemented strengths

```txt
bounded dt from Journey: present
map-open update suspension: present
named keyboard and blur listener retirement: present
persistent simulation position/velocity/wind vectors: present
flow-relative steering semantics: present
terrain floor settlement: present
altitude readback: present
snapshot telemetry: present
balloon pose and animation commit: present
```

### Source-local active-tick allocations

```txt
fallbackWind return object:                         1
sampleBalloonAirstream result object:               1
sampleBalloonAirstream velocity object:             1
sampleBalloonAirstream contributors copy:           1
applyAirstreamToBalloonState replacement object:    1
applyAirstreamToBalloonState velocity object:       1
applyAirstreamToBalloonState contributors copy:     1
wind-relative steering result object:               1
THREE.Vector3 velocity target:                      1
                                                     --
source-local minimum per accepted tick:             9
source-local minimum at 60 accepted ticks/second: 540/second
```

This minimum excludes any allocations performed by `Sky.sample`, Airstream route/field sampling, animation, snapshots, rendering, browser internals, or Three.js internals.

### Repeated work and identity gaps

```txt
fallback wind built before sampler need is known: yes
fallback trigonometric work when live sampler succeeds: yes
public state.airstream object replaced each tick: yes
flow velocity object copied twice: yes
contributors array copied twice: yes
steering result object allocated each tick: yes
velocity target vector allocated each tick: yes
terrainHeight at post-integration x/z: two calls
single accepted TerrainSampleRevision: absent
SimulationTickAllocationResult: absent
SimulationTerrainQueryResult: absent
SimulationTickDigest: absent
FirstAllocationBoundFlightFrameAck: absent
allocation/determinism browser fixture: absent
```

## Required authority

`open-above-balloon-simulation-tick-allocation-terrain-sample-budget-authority-domain`

```txt
BalloonSimulationGenerationAdmissionCommand
  -> bind HostSessionId, RouteRevision, BalloonSimulationGeneration,
     accepted dt policy, sampler identity and terrain provider identity
  -> allocate and own reusable flow, steering, velocity and contributor scratch state
  -> publish BalloonSimulationGenerationResult

BalloonSimulationTickCommand
  -> consume accepted input and dt
  -> lazily request fallback wind only when live sampling cannot provide velocity
  -> normalize flow into generation-owned scratch state
  -> update public airstream fields in place or publish an explicit immutable result boundary
  -> reuse steering and velocity-target scratch objects
  -> publish BalloonSimulationTickResult

BalloonTerrainSampleCommand
  -> sample post-integration terrain once
  -> bind TerrainSampleRevision to position and provider revision
  -> reuse the sample for ground settlement and altitude
  -> publish BalloonTerrainSampleResult

BalloonSimulationBudgetSettlementCommand
  -> record local allocations, scratch reuse, terrain-query count,
     tick duration and degradation/failure classification
  -> publish BalloonSimulationBudgetResult

BalloonSimulationProjectionCommitCommand
  -> bind the accepted tick and terrain sample to balloon pose,
     telemetry and the presented frame
  -> publish BalloonSimulationTickDigest
  -> publish FirstAllocationBoundFlightFrameAck
```

## Planned authority surfaces: 20

1. `open-above-balloon-simulation-tick-allocation-terrain-sample-budget-authority-domain`
2. `balloon-simulation-generation-kit`
3. `balloon-simulation-tick-plan-kit`
4. `lazy-fallback-wind-kit`
5. `airstream-flow-scratch-kit`
6. `airstream-state-in-place-copy-kit`
7. `airstream-contributor-scratch-kit`
8. `wind-relative-steering-result-scratch-kit`
9. `balloon-velocity-target-scratch-kit`
10. `balloon-terrain-sample-reuse-kit`
11. `balloon-simulation-allocation-budget-kit`
12. `balloon-terrain-query-budget-kit`
13. `balloon-simulation-tick-result-kit`
14. `stale-balloon-simulation-tick-rejection-kit`
15. `balloon-simulation-budget-diagnostics-kit`
16. `balloon-simulation-tick-digest-kit`
17. `first-allocation-bound-flight-frame-ack-kit`
18. `balloon-simulation-allocation-fixture-kit`
19. `balloon-terrain-sample-count-fixture-kit`
20. `balloon-deterministic-flight-parity-fixture-kit`

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
planned simulation authority:        20
```

## Validation boundary

Source inspection covered the current Publish inventory, all central Publish ledgers, root `.agent` state, Meadow Lift composition, Ballooning, Balloon Simulation, Airstream force normalization, wind-relative steering, terrain-contact queries, and the prior complete kit/service inventory. Documentation changed only. Runtime JavaScript, simulation behavior, rendering, input, tests, packages, workflows, and deployment were not changed by this audit.

No package, browser, profiler, artifact, or Pages fixture was executed. No claim is made for a measured allocation rate, garbage-collection impact, terrain-query performance, simulation improvement, deterministic parity, artifact parity, Pages parity, or production readiness.