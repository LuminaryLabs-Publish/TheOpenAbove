# Project Breakdown: TheOpenAbove Gaussian Cloud LOD Membership Transition

**Timestamp:** `2026-07-17T02-32-08-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Selection:** sole runtime-ahead eligible repository  
**Previous central repo-local head:** `132f1c5998c86a0201b48215167f8bf28d921e6c`  
**Reviewed pre-audit repository head:** `5695e11ab7948ea6417b3ccf1c1d66550aa5c4df`  
**Status:** `gaussian-cloud-lod-membership-transition-authority-audited`

## Summary

The current `LuminaryLabs-Publish` inventory contains 11 repositories. Ten are eligible after excluding `LuminaryLabs-Publish/TheCavalryOfRome`; all ten have central ledger and root `.agent` coverage. TheOpenAbove was the only eligible repository ahead of its centrally documented head: 11 commits and eight changed files introduced deterministic close-cloud banks, five Gaussian LOD tiers, an instanced Gaussian renderer, live weather visibility, nearest-first capacity retention and a focused source-contract test.

The new pipeline is deterministic at field construction and explicitly prioritizes nearby splats under fixed capacity. Its accepted instance membership is still replaced immediately on each rebatch. There is no accepted rebatch generation, per-bank quota, LOD hysteresis, membership retention, crossfade, projection digest or matching-frame acknowledgement. Camera motion near tier and capacity boundaries can therefore change a large part of the visible set in one update. This is a source-backed transition-risk finding; no browser-visible popping incident was reproduced.

## Intent

Preserve the deterministic bank field and nearest-first capacity policy while making every Gaussian-cloud membership change stable, revision-bound and visibly acknowledged.

## Checklist

- [x] Enumerate all 11 accessible Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten central ledgers and ten root `.agent` states.
- [x] Identify TheOpenAbove as the sole runtime-ahead eligible repository.
- [x] Review the 11-commit runtime delta from `132f1c5` through `5695e11`.
- [x] Identify the complete interaction loop and active domains.
- [x] Reconcile all 124 active kits, adapters and provider surfaces with offered services.
- [x] Define one Gaussian-cloud LOD membership authority with 20 coordinating surfaces.
- [x] Add this timestamped `.agent` audit family on `main`.
- [ ] Implement stable membership admission, hysteresis, transition settlement and frame proof.
- [ ] Execute browser, build, artifact and Pages fixtures.

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
previous documented head: 132f1c5998c86a0201b48215167f8bf28d921e6c
reviewed runtime head:     5695e11ab7948ea6417b3ccf1c1d66550aa5c4df
ahead by:                  11 commits
changed files:              8
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
boot
  -> Meadow Lift creates Sky from WORLD.weather.layers,
     WORLD.surface and WORLD.seed
  -> Sky creates one deterministic cloud-bank field
  -> supported close kinds become ground-fog, low-cloud and mid-cloud banks
  -> Experience passes cloudField plus live Weather/Layered Weather to Visual
  -> Visual assigns close layers to Gaussian splats
  -> high-cloud and cirrus remain on the distant volumetric renderer

flight frame
  -> Ballooning updates flight state
  -> Sky updates airstream and wind-particle presentation
  -> Experience updates the camera rig
  -> Visual advances Weather and Layered Weather
  -> distant volumetric layers receive filtered high/cirrus state
  -> Gaussian renderer checks camera displacement and 0.2-second rebatch age
  -> cloud field queries banks by volume reach
  -> each bank selects one of five distance tiers
  -> deterministic splats are sampled and weighted by live coverage/density
  -> candidates sort nearest-first
  -> candidates truncate to fixed quality capacity
  -> retained candidates sort far-to-near for transparency
  -> all instance attributes and instanceCount are replaced
  -> HDR composer renders the resulting scene

current transition boundary
  -> no rebatch generation or expected predecessor membership
  -> no per-bank minimum/maximum quota
  -> no tier hysteresis or temporal retention
  -> no entering/leaving crossfade
  -> no exact membership digest or matching-frame acknowledgement
```

## Domains in use

| Domain | Ownership and services |
|---|---|
| Journey | session status, region, map policy, RAF progression, failure containment, snapshots and disposal |
| Ballooning | balloon lifecycle, controls, buoyancy, venting, airstream sampling, steering, terrain contact, pose and state |
| Sky | airstream composition, Weather readback, local wind particles and deterministic Gaussian cloud-bank field |
| Land | world configuration, Core World Foundation/Features, generation state, anchors and height sampling |
| Navigation | parchment map lifecycle, generated-world cache, routes, Snap Points, reference cards and map state |
| Image Capture | sightseeing mode, shutter admission, recognition, score, capture metadata and completion |
| Experience | Three.js renderer/camera, visual composition, camera rig, balloon presentation, update/render and snapshots |
| Core World family | foundation sampling, feature registry/lifecycle/query, landforms and atmosphere-feature descriptors |
| Weather family | base weather advancement, semantic layered weather, altitude composition and snapshots |
| Close-cloud field | seeded bank generation, volume-reach query, five LOD tiers and deterministic splat sampling |
| Cloud presentation | live weather visibility, fixed quality capacity, nearest-first retention, far-to-near blending and diagnostics |
| Validation/deploy | tiered Node checks, Vite artifact, provider revision stamping and GitHub Pages publication |
| Proposed transition authority | field/rebatch identity, quotas, hysteresis, membership retention, crossfade, commit digest and frame proof |

## Main source-backed finding

The close-cloud field exposes five tiers with `160 / 48 / 18 / 8 / 3` splats per bank and maximum distances of `260 / 620 / 1300 / 2500 / 4200`. The renderer has fixed quality capacities of `7000 / 4400 / 2400` instances. A rebatch occurs after more than eight world units of camera movement or after 0.2 seconds.

Every rebatch rebuilds the complete candidate array, sorts by distance, truncates immediately to capacity, reverses the retained set for transparency ordering and overwrites all instance attributes. The state reports capacity, visible banks, splat count, dropped splats and tier counts, but it does not retain predecessor membership, transition age, bank quotas, tier hysteresis, field/rebatch revision or an exact frame digest.

```txt
deterministic field and splats: present
volume-reach bank query: present
nearest-first capacity policy: present
far-to-near blend order: present
quality-tier capacity: present

CloudFieldRevision: absent
CloudRebatchGeneration: absent
per-bank quota result: absent
LOD hysteresis: absent
membership retention: absent
enter/leave crossfade: absent
stale rebatch rejection: absent
CloudProjectionDigest: absent
FirstGaussianCloudFrameAck: absent
```

## Required authority

`open-above-gaussian-cloud-lod-membership-transition-authority-domain`

```txt
CloudFieldAdmissionCommand
  -> bind world surface, weather-layer, seed and quality revisions
  -> validate supported layer kinds and tier policy
  -> compute CloudFieldRevision and CloudFieldDigest
  -> publish CloudFieldAdmissionResult

CloudSplatBudgetCommand
  -> bind camera pose, field revision, weather revision and capacity
  -> resolve stable bank quotas and nearest-first overflow policy
  -> apply enter/leave thresholds and tier hysteresis
  -> publish CloudSplatBudgetResult

CloudMembershipTransitionCommand
  -> compare accepted predecessor and candidate memberships
  -> retain stable members across bounded camera movement
  -> crossfade entering, leaving and tier-changing splats
  -> reject stale rebatch generations
  -> publish CloudLodMembershipResult

CloudProjectionCommitCommand
  -> commit one immutable instance-buffer generation
  -> publish CloudProjectionDigest and CloudProjectionResult
  -> render the matching frame
  -> publish FirstGaussianCloudFrameAck
```

## Complete kit and offered-service inventory

### Semantic scene, wind and close-cloud surfaces: 11

- `open-above-journey-domain`: session/region state, map pause policy, RAF progression, error containment, snapshots and disposal.
- `open-above-ballooning-domain`: balloon loading/mounting, simulation composition, update, readiness, state/snapshot and disposal.
- `open-above-sky-domain`: airstream composition, weather binding/readback, wind-particle lifecycle, cloud-field publication and disposal.
- `open-above-land-domain`: Core World binding, world anchors, visual binding, generation/terrain snapshot and height sampling.
- `open-above-navigation-domain`: map mount, open/close, world refresh, Snap Point projection, snapshot and disposal.
- `open-above-image-capture-domain`: camera mode, shutter admission, recognition, score, metadata, completion and disposal.
- `open-above-experience-domain`: visual composition, camera rig, balloon presentation, cloud diagnostics, update/render, snapshots and disposal.
- `open-above-meadow-lift-scene`: semantic composition, cloud configuration binding, boot/update/render ordering, GameHost projection and disposal.
- `open-above-wind-relative-steering-kit`: flow-relative direction, heading, turn offset and target velocity resolution.
- `open-above-wind-particle-field-kit`: deterministic particle allocation, player-centered advection, wrapping, opacity, snapshots and disposal.
- `open-above-cloud-bank-field-kit`: seeded close-cloud bank generation, volume-reach query, five LOD tiers, splat sampling and snapshot.

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
- `open-above-balloon-camera-rig-kit`: follow-distance zoom, camera modes, transitions and listener disposal.
- `open-above-clipping-fade-kit`: near-camera clipping fade.

### Visual world and environment kits: 35

- `open-above-visual-domain`: renderer, scene, camera, generated world, weather adapters, Gaussian/volumetric clouds, update/render/resize/state/disposal.
- `open-above-world-generation-kit`: deterministic staged generation, work budgets, snapshots and subscriptions.
- `open-above-world-feature-foundation-kit`: generated-world/Core World bridge.
- `open-above-quality-tier-kit`: device quality detection and tier descriptors.
- `open-above-dynamic-resolution-kit`: effective DPR, frame sampling, scale transitions and resize.
- `open-above-physical-sky-kit`: sky shader and solar update.
- `open-above-sun-light-kit`: sun direction, color, shadows and world position.
- `open-above-aerial-perspective-kit`: fog, altitude clearing, cloud response and sun warmth.
- `open-above-cloud-weather-map-kit`: Weather/Layered Weather advancement, aggregation and projection.
- `open-above-volumetric-cloud-kit`: distant-layer raymarch, uniforms, budgets, low-resolution target, composite and disposal.
- `open-above-gaussian-cloud-render-adapter`: instanced close-cloud projection, weather visibility, rebatching, capacity selection, diagnostics and disposal.
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

### UI, tooling and proof kits: 11

- `open-above-parchment-map-overlay-kit`: generated map, routes, Snap Points, reference card, player projection, RAF and disposal.
- `open-above-headless-editor-environment`: deterministic environment setup and editor validation.
- `open-above-static-smoke-test-kit`: source and composition smoke assertions.
- `open-above-airstream-mail-test-kit`: retained airstream/Air Mail historical assertions.
- `open-above-world-flora-test-kit`: terrain/flora source contract assertions.
- `open-above-world-feature-foundation-test-kit`: foundation and feature integration assertions.
- `open-above-world-domain-composition-test-kit`: Core World composition assertions.
- `open-above-layered-weather-integration-test-kit`: five-layer weather integration assertions.
- `open-above-cloud-lod-integration-test-kit`: deterministic cloud field, LOD thresholds, volume filtering, capacity order and visual wiring assertions.
- `open-above-tiered-validation-runner-kit`: subprocess orchestration and severity annotations.
- `open-above-semantic-domain-composition-test-kit`: semantic folder/composition and Air Mail retirement assertions.

### Runtime-implied browser/host/deploy adapters: 13

- `open-above-route-shell-kit`: HTML route and canvas ownership.
- `open-above-importmap-kit`: Three.js/Nexus Engine module resolution.
- `open-above-runtime-composer-kit`: browser boot and scene creation.
- `open-above-keyboard-input-kit`: burner, vent, steering, map, camera and shutter key evidence.
- `open-above-wheel-zoom-input-kit`: follow-distance and sightseeing wheel evidence.
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

- `open-above-mail-delivery-domain`: historical Air Mail composition, update, reset, snapshot and disposal.
- `open-above-mail-parcel-kit`: historical parcel identity, state, message and reset.
- `open-above-mail-route-kit`: historical parcel route and town descriptors.
- `open-above-delivery-volume-kit`: historical geometric delivery eligibility.
- `open-above-delivery-progress-kit`: historical target tracking and completion settlement.
- `open-above-mail-town-kit`: historical town meshes, anchors, animation and metadata.

## Census

```txt
active local source-backed surfaces: 81
runtime-implied adapters:            13
Nexus Engine provider surfaces:      30
active named surfaces:              124
inactive Air Mail migration:          6
planned transition surfaces:         20
```

## Validation boundary

The 11-commit source delta and current source-contract test were inspected. Documentation changed only in this audit. Runtime JavaScript, tests, package scripts, workflows and deployment were not changed. No browser transition fixture, build, artifact or Pages smoke was run, and no temporal-coherence or production-readiness claim is made.