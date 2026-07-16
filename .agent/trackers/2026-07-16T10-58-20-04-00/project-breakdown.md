# Project Breakdown: TheOpenAbove Layered Weather Clock and Projection Ownership

**Timestamp:** `2026-07-16T10-58-20-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Selection:** runtime-ahead / recently implemented layered-weather system  
**Reviewed pre-audit repository head:** `a2291f95e9eb9447512e00a5fc60a4a7ca83ad10`  
**Previous central repo-local head:** `e9e0465d3d72995e8e398ab7b821d38fd332bc33`  
**Status:** `weather-simulation-clock-projection-ownership-authority-audited`

## Summary

The full Publish comparison found 11 repositories. Ten are eligible after excluding `LuminaryLabs-Publish/TheCavalryOfRome`; every eligible repository remains centrally tracked and has root `.agent` state. `TheOpenAbove` is the only runtime-ahead repository. It is ten commits ahead of its documented head and now implements Core Weather, Layered Weather, Core World atmosphere features, five persistent altitude layers, a five-layer volumetric shader path, visual snapshots and a new integration test.

The implementation materially resolves the prior single-layer/reference gap. The focused unresolved gap is clock and mutation ownership: `open-above-cloud-weather-map-kit`, a visual adapter, directly advances `n:weather` and `n:weather:layered` from `visual.update()`. That update is skipped whenever the parchment map is open, while rendering continues. Weather therefore has no simulation-owned single-step command/result, no duplicate-step rejection, no explicit map/pause policy and no frame acknowledgement binding one accepted weather revision to the displayed frame.

## Plan ledger

**Goal:** preserve the new five-layer atmosphere while moving weather evolution to one authoritative simulation clock and making all render systems read immutable revision-bound snapshots.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare the ten eligible repositories with the ten central ledgers and root `.agent` states.
- [x] Identify `TheOpenAbove` as the only runtime-ahead/recently undocumented repository.
- [x] Compare documented head `e9e0465d` with runtime head `a2291f95`.
- [x] Inspect all nine changed files and the ten-commit layered-weather implementation.
- [x] Identify the complete interaction loop, domains, kits, adapters, provider surfaces and services.
- [x] Reconcile 72 local source-backed kits, 13 host adapters and 30 provider surfaces.
- [x] Define one weather-clock authority and 19 coordinating surfaces.
- [x] Change documentation only.
- [ ] Implement single-owner weather stepping and executable scheduler, map, artifact and Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories:             11
eligible after Cavalry exclusion:             10
central ledger entries:                       10
root .agent states:                           10
new or ledger-missing:                         0
root-agent-missing:                            0
runtime-ahead / recently undocumented:         1

selected: LuminaryLabs-Publish/TheOpenAbove
previous central repo-local head: e9e0465d3d72995e8e398ab7b821d38fd332bc33
reviewed pre-audit head:          a2291f95e9eb9447512e00a5fc60a4a7ca83ad10
ahead by:                         10 commits
changed files:                     9
selection reason: layered-weather runtime implementation absent from the ledger
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Runtime-ahead change set

```txt
package.json
  -> adds layered-weather integration to npm run check

src/data/campaign.config.js
  -> adds five semantic atmosphere features
  -> adds five renderer-neutral weather-layer descriptors
  -> adds global weather conditions and tendencies

src/runtime/balloon-telemetry-kit.js
  -> requires n:weather and n:weather:layered
  -> installs Atmosphere Feature, Weather and Layered Weather domains
  -> registers landform and atmosphere features
  -> replaces layered-weather descriptors during boot

src/main.js
  -> passes weather configuration into the engine
  -> passes Weather and Layered Weather APIs into the visual domain
  -> exposes layered weather through visual and telemetry snapshots

src/visual/atmosphere/cloud-weather-map-kit.js
  -> advances Core Weather and Layered Weather
  -> aggregates layer coverage, density, offsets and ground fog
  -> publishes altitude composition in visual state

src/visual/atmosphere/volumetric-cloud-kit.js
  -> renders up to five altitude layers
  -> allocates per-layer uniforms and sample budgets
  -> distinguishes fog, cumulus/high cloud and cirrus profiles

src/visual/visual-domain.js
  -> composes Weather and Layered Weather into visual update
  -> stores the layered snapshot in visual state

tests/layered-weather-integration.mjs
  -> validates five layers, floors, altitude sampling, composition and motion

tests/world-domain-composition.mjs
  -> validates the expanded provider composition
```

## Complete interaction loop

```txt
workflow and browser admission
  -> checkout TheOpenAbove and NexusEngine
  -> run smoke, world, layered-weather and terrain checks
  -> build Vite artifact and publish Pages

boot
  -> create Core World root without implicit children
  -> install World Foundation, World Features, Landforms and Atmosphere Features
  -> install Core Weather and Layered Weather
  -> register landform and atmosphere feature descriptors
  -> replace the five weather-layer descriptors
  -> create renderer, generated world, terrain, vegetation and HDR pipeline
  -> create visual weather adapter and five-layer cloud renderer
  -> create balloon, airstream, Air Mail, map, camera and telemetry

visible flight frame
  -> flight RAF computes clipped dt
  -> simulation and Air Mail update
  -> airstream, balloon, camera and presentation update
  -> visual.update calls cloud-weather-map.update
  -> cloud-weather-map advances n:weather by dt
  -> cloud-weather-map advances n:weather:layered from that snapshot
  -> visual consumers read the resulting layer snapshot
  -> engine.tick publishes telemetry after visual mutation
  -> cloud target and HDR frame render

map-open frame
  -> simulation update is skipped
  -> visual.update is skipped
  -> engine.tick is skipped
  -> visual.render still executes
  -> weather elapsed and revisions freeze implicitly

current settlement
  -> weather truth is mutated by a visual adapter
  -> one accepted simulation tick does not own one weather step
  -> no command/result identifies the accepted weather delta
  -> no policy declares weather behavior while map-open, paused or suspended
  -> no frame acknowledgement binds weather and layered revisions to presentation
```

## Domains in use

```txt
GitHub workflow, checked-out provider, Vite build, artifact and Pages deployment
browser route, module graph, RAF, resize, keyboard, wheel, map and GameHost
balloon flight simulation, telemetry, presentation, camera and clipping
airstream route, field, force, visual and diagnostics
Air Mail parcel, route, town, delivery-volume, progress and completion
Core World root, foundation, feature registry, landforms and atmosphere features
Core Weather conditions, tendencies, evolution, regional sampling and snapshots
Layered Weather descriptors, evolution, altitude sampling, composition and snapshots
staged world generation, terrain, vegetation, grass, flowers, water and landmarks
quality, dynamic resolution, sky, sun, aerial perspective, five-layer clouds, HDR and grading
weather clock admission, revision identity, immutable projection and frame convergence
headless/static validation, browser fixtures, artifact/Pages parity and central tracking
```

## Kit and service census

```txt
local runtime and gameplay kits:              15
local balloon object and presentation kits:   15
local visual world and environment kits:      34
local UI, tooling and proof kits:               8
local source-backed total:                    72
runtime-implied browser/host adapters:         13
Nexus Engine provider surfaces:               30
active named surface total:                  115
inactive or retired legacy surfaces:          13
planned weather-clock surfaces:               20
new provider surfaces since prior audit:       13
new local proof kit since prior audit:          1
```

### Runtime and gameplay kits

| Kit | Services |
|---|---|
| `open-above-balloon-simulation-kit` | flight integration, held-key consumption, buoyancy, venting, steering, airstream force, terrain contact, elapsed time, distance, snapshots and disposal |
| `open-above-balloon-telemetry-kit` | Nexus Engine resources/events, visual snapshots, Core World/Weather composition, feature registration and public readback |
| `open-above-airstream-domain` | route, field, force, visual and diagnostics composition, update, sampling, snapshot and disposal |
| `open-above-airstream-route-kit` | route descriptors, identity, control points and route state |
| `open-above-airstream-sampler-kit` | route and field sampling |
| `open-above-airstream-field-kit` | spatial wind-field evaluation |
| `open-above-airstream-balloon-force-kit` | balloon force contribution |
| `open-above-airstream-visual-kit` | route visualization and updates |
| `open-above-airstream-debug-kit` | diagnostics and debug readback |
| `open-above-mail-delivery-domain` | Air Mail composition, update, reset, snapshot and disposal |
| `open-above-mail-parcel-kit` | parcel identity, state, message and reset |
| `open-above-mail-route-kit` | route and town descriptors |
| `open-above-delivery-volume-kit` | geometric delivery eligibility |
| `open-above-delivery-progress-kit` | target tracking, progress settlement, completion event and delivered timestamp |
| `open-above-mail-town-kit` | town anchors, meshes, animation and delivery metadata |

### Balloon object and presentation kits

| Kit | Services |
|---|---|
| `open-above-hot-air-balloon-object-kit` | asynchronous balloon composition, readiness, persistent-resource metadata and animation |
| `open-above-balloon-envelope-profile-kit` | envelope proportions and profile |
| `open-above-balloon-envelope-panel-kit` | panel geometry |
| `open-above-balloon-mouth-kit` | mouth geometry and fit |
| `open-above-balloon-streamer-fit-kit` | streamer placement and fit |
| `open-above-balloon-fabric-seam-kit` | fabric-seam presentation |
| `open-above-hot-air-balloon-basket-kit` | basket geometry |
| `open-above-hot-air-balloon-rigging-kit` | rope and rigging layout |
| `open-above-hot-air-balloon-burner-kit` | burner geometry and presentation |
| `open-above-rope-kit` | segmented rope construction |
| `open-above-balloon-presentation-domain` | presentation composition and accepted-state updates |
| `open-above-envelope-fabric-material-kit` | envelope material descriptors and GPU material state |
| `open-above-basket-material-kit` | basket material descriptors and GPU material state |
| `open-above-balloon-camera-rig-kit` | wheel zoom, camera modes, transitions and listener disposal |
| `open-above-clipping-fade-kit` | near-camera clipping fade |

### Visual world and environment kits

| Kit | Services |
|---|---|
| `open-above-visual-domain` | renderer, scene, camera, generated world, weather adapter, update, render, resize, state and disposal |
| `open-above-world-generation-kit` | deterministic staged generation, work budgets, snapshots and subscriptions |
| `open-above-world-feature-foundation-kit` | generated-world/Core World bridge |
| `open-above-quality-tier-kit` | device quality detection and tier descriptors |
| `open-above-dynamic-resolution-kit` | effective DPR, frame-time sampling, scale transitions and resize |
| `open-above-physical-sky-kit` | sky shader and solar update |
| `open-above-sun-light-kit` | sun direction, color, shadows and world position |
| `open-above-aerial-perspective-kit` | global exponential fog, altitude clearing, cloud-density response and sun warmth |
| `open-above-cloud-weather-map-kit` | Core Weather advance, Layered Weather advance, layer aggregation, altitude composition and snapshot projection |
| `open-above-volumetric-cloud-kit` | five-layer raymarch, per-layer profiles/uniforms/budgets, low-resolution target, composite and disposal |
| `open-above-cloud-lod-kit` | render scale, view/light sample budgets, maximum distance and temporal-jitter policy |
| `open-above-cloud-lighting-kit` | cloud sun and sky-fill lighting |
| `open-above-terrain-surface-kit` | terrain geometry/material, height/moisture queries, streaming update and disposal |
| `open-above-terrain-streaming-contract-kit` | terrain streaming contract |
| `open-above-terrain-chunk-streaming-kit` | active terrain-chunk lifecycle |
| `open-above-terrain-horizon-streaming-kit` | horizon-ring lifecycle |
| `open-above-vegetation-cluster-kit` | vegetation generation, refresh, update and disposal |
| `open-above-grass-world-seed-kit` | deterministic grass seed |
| `open-above-grass-biome-density-kit` | biome density evaluation |
| `open-above-grass-exclusion-mask-kit` | route and object exclusions |
| `open-above-grass-patch-density-kit` | patch distribution |
| `open-above-grass-texture-atlas-kit` | procedural texture-atlas generation |
| `open-above-grass-chunk-placement-kit` | chunk placement |
| `open-above-grass-lod-kit` | grass LOD policy |
| `open-above-grass-compute-culling-kit` | culling and capacity policy |
| `open-above-grass-field-domain` | grass composition, update, refresh, state and disposal |
| `open-above-flower-chunk-placement-kit` | flower placement |
| `open-above-flower-texture-atlas-kit` | procedural flower atlas generation |
| `open-above-flower-field-domain` | flower composition, update, refresh, state and disposal |
| `open-above-water-surface-kit` | water geometry, material, lighting and update |
| `open-above-distant-landmark-kit` | landmark geometry and disposal |
| `open-above-hdr-composer-kit` | half-float targets, depth textures, render pass, grading, resize, render and disposal |
| `open-above-color-grade-kit` | HDR color grading and exposure response |
| `open-above-lens-response-kit` | sun-facing lens response |

### UI, tooling and proof kits

| Kit | Services |
|---|---|
| `open-above-parchment-map-overlay-kit` | map drawing, conditional map RAF, toggle/close, snapshot, visibility, resize and disposal |
| `open-above-headless-editor-environment` | headless inspection, project checks, renderer validation and world validation |
| `open-above-static-smoke-test-kit` | static source smoke proof |
| `open-above-airstream-mail-test-kit` | airstream and Air Mail contract proof |
| `open-above-world-flora-test-kit` | world/flora proof |
| `open-above-world-feature-foundation-test-kit` | foundation contract proof |
| `open-above-world-domain-composition-test-kit` | real-provider world/weather composition proof |
| `open-above-layered-weather-integration-test-kit` | five-layer count/kind/floor checks, altitude sampling, composition and offset evolution proof |

### Runtime-implied browser and host adapters

| Adapter | Services |
|---|---|
| `open-above-route-shell-kit` | document shell and startup |
| `open-above-importmap-kit` | module resolution |
| `open-above-runtime-composer-kit` | product-domain composition |
| `open-above-keyboard-input-kit` | burner, vent, steering and map command capture |
| `open-above-wheel-zoom-input-kit` | camera zoom input |
| `open-above-parchment-map-shell-kit` | map DOM host, dialog semantics and map-open suspension signal |
| `open-above-error-panel-kit` | boot-failure projection |
| `open-above-gamehost-legacy-readback-kit` | public diagnostics and object access |
| `open-above-vite-nexusengine-checkout-alias-kit` | checked-out provider alias resolution |
| `open-above-nexusengine-revision-stamp-kit` | provider revision projection |
| `open-above-campaign-source-kit` | campaign, world, atmosphere-feature and weather-layer configuration |
| `open-above-raf-clock-adapter-kit` | callback scheduling, interval clipping and frame admission |
| `open-above-pages-deploy-kit` | Pages build artifact and publication |

### Nexus Engine provider surfaces

| Surface | Services |
|---|---|
| `n-world-domain` | parent world composition, install, snapshot, reset and child-domain routing |
| `world-builder-runtime-kit` | builder registration and domain assembly |
| `n-world-foundation-domain` | resolved foundation ownership |
| `foundation-definition-kit` | foundation descriptors and channels |
| `foundation-composition-kit` | contribution composition |
| `foundation-sampling-kit` | elevation, material, normal and resolved-surface sampling |
| `foundation-cell-resolution-kit` | cell resolution and compilation |
| `n-world-feature-domain` | semantic feature parent domain |
| `feature-registry-kit` | feature registration and identity |
| `feature-lifecycle-kit` | feature activation, update, retirement and reset |
| `feature-query-kit` | spatial and semantic queries |
| `feature-composition-kit` | per-cell contribution composition |
| `n-world-landform-feature-domain` | landform family composition |
| `mountain-feature-kit` | mountain descriptors and contributions |
| `canyon-feature-kit` | canyon descriptors and contributions |
| `cliff-feature-kit` | cliff descriptors and contributions |
| `plateau-feature-kit` | plateau descriptors and contributions |
| `n-world-atmosphere-feature-domain` | atmosphere feature-family composition and catalog installation |
| `cloud-layer-feature-kit` | bounded cloud-layer placement, altitude, coverage and density contributions |
| `cloud-bank-feature-kit` | local cloud-bank placement and density influence |
| `fog-bank-feature-kit` | local fog placement, attenuation and humidity influence |
| `storm-cell-feature-kit` | storm volume, intensity and lifetime descriptors |
| `wind-corridor-feature-kit` | path-based airflow descriptors and vector-field influence |
| `thermal-column-feature-kit` | thermal lift placement and influence |
| `downdraft-zone-feature-kit` | downdraft placement and sink-rate influence |
| `turbulence-zone-feature-kit` | turbulence placement, strength and frequency influence |
| `precipitation-feature-kit` | precipitation placement, type and rate influence |
| `visibility-zone-feature-kit` | visibility range and attenuation influence |
| `n-weather-domain` | conditions, tendencies, deterministic evolution, regional sampling and snapshots |
| `n-layered-weather-domain` | layer descriptors, evolution, altitude sampling, composition and snapshots |

## Source-backed finding

```txt
Core Weather owner exists: yes
Layered Weather owner exists: yes
Atmosphere Feature owner exists: yes
five layer descriptors exist: yes
five-layer volumetric projection exists: yes
layered-weather integration test exists: yes

weather advance caller: open-above-cloud-weather-map-kit
caller domain: visual/presentation
advance path: visual.update -> weather.update -> n:weather.advance -> n:weather:layered.advance
engine tick occurs after visual weather mutation: yes
map-open skips weather advance: yes
render continues while map-open: yes
single accepted WeatherAdvanceCommand: absent
WeatherAdvanceResult: absent
duplicate-step rejection: absent
map/pause weather policy: absent
weather/layer/frame convergence result: absent
FirstWeatherBoundFrameAck: absent
```

This is an ownership and determinism gap, not a claim that the five-layer renderer visibly fails. The new implementation is real and source-backed. The unresolved issue is that a renderer-facing adapter is the writer of Core Weather state, so weather elapsed time and revision depend on calls to `visual.update()` rather than one explicit simulation-clock transaction.

A secondary configuration risk remains: `WORLD.features.atmosphere` and `WORLD.weather.layers` define parallel altitude/coverage records with different identifiers and no binding result. That should be validated by the same authority, but it is not the primary focus of this pass.

## Required authority

`open-above-weather-simulation-clock-projection-ownership-authority-domain`

```txt
WeatherAdvanceCommand
  -> bind session, route, simulation-frame, clock, weather, layered-weather and feature revisions
  -> admit exactly one non-negative delta for one accepted simulation tick
  -> apply explicit running, map-open, paused, hidden and catch-up policy
  -> advance n:weather once
  -> advance n:weather:layered from the resulting weather snapshot once
  -> validate atmosphere-feature/layer bindings
  -> publish immutable WeatherAdvanceResult

WeatherProjectionCommand
  -> consume WeatherAdvanceResult without mutating Core Weather
  -> publish one WeatherProjectionSnapshot
  -> reject stale, duplicate and retired revisions
  -> bind cloud, fog, terrain and telemetry consumers to that snapshot
  -> render one matching frame
  -> publish FirstWeatherBoundFrameAck
```

## Planned weather-clock surfaces

```txt
open-above-weather-simulation-clock-projection-ownership-authority-domain
open-above-weather-clock-source-kit
open-above-weather-tick-admission-kit
open-above-weather-advance-command-kit
open-above-weather-advance-result-kit
open-above-weather-revision-identity-kit
open-above-layered-weather-revision-bridge-kit
open-above-atmosphere-feature-layer-binding-kit
open-above-weather-snapshot-publication-kit
open-above-visual-weather-read-only-adapter-kit
open-above-map-pause-weather-policy-kit
open-above-page-suspension-weather-policy-kit
open-above-bounded-weather-catchup-kit
open-above-duplicate-weather-step-rejection-kit
open-above-stale-weather-snapshot-rejection-kit
open-above-weather-frame-convergence-kit
open-above-first-weather-bound-frame-ack-kit
open-above-weather-clock-headless-fixture-kit
open-above-weather-map-pause-browser-fixture-kit
open-above-weather-artifact-pages-parity-fixture-kit
```

## Required output family

```txt
.agent/trackers/2026-07-16T10-58-20-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-16T10-58-20-04-00.md
.agent/architecture-audit/2026-07-16T10-58-20-04-00-weather-clock-projection-dsk-map.md
.agent/render-audit/2026-07-16T10-58-20-04-00-render-owned-weather-revision-gap.md
.agent/gameplay-audit/2026-07-16T10-58-20-04-00-map-open-weather-freeze-loop.md
.agent/interaction-audit/2026-07-16T10-58-20-04-00-weather-advance-command-result-map.md
.agent/weather-system-audit/2026-07-16T10-58-20-04-00-simulation-clock-projection-ownership-contract.md
.agent/deploy-audit/2026-07-16T10-58-20-04-00-weather-clock-parity-fixture-gate.md
.agent/central-sync-audit/2026-07-16T10-58-20-04-00-runtime-ahead-layered-weather-reconciliation.md
```

## Validation boundary

```txt
documentation changed: yes
runtime JavaScript changed by this audit: no
weather descriptors or shaders changed by this audit: no
Nexus Engine provider changed by this audit: no
gameplay or rendering behavior changed by this audit: no
packages tests workflows or deployment changed by this audit: no
branch created: no
pull request created: no

source diff inspected: yes
provider Weather and Layered Weather source inspected: yes
combined commit statuses on reviewed runtime head: none
npm run check: not run
npm run build: not run
single-step weather fixture: unavailable
map-open weather policy fixture: unavailable
first weather-bound frame fixture: unavailable
artifact downloaded: no
Pages URL fetched: no
```

No claim is made for authoritative weather-clock ownership, duplicate-step safety, map/pause policy, frame convergence, performance, artifact parity, Pages parity or production readiness.