# Project Breakdown: TheOpenAbove WebGL Context-Loss Recovery

**Timestamp:** `2026-07-16T03-03-22-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Selection:** oldest synchronized eligible repository  
**Reviewed pre-audit repository head:** `4de46a2f769624e8a65eabc6114185e4dcf738f5`  
**Reviewed runtime source revision:** `1417c80309218c7c61def3b2f09a977eaab8b953`  
**Status:** `webgl-context-resource-recovery-authority-audited`

## Summary

The complete current Publish inventory contains 11 repositories. Ten are eligible after excluding `TheCavalryOfRome`; all ten have central ledgers, root `.agent` state, and repository heads matching their documented heads. TheOpenAbove had the oldest synchronized ledger timestamp.

The active route creates one `THREE.WebGLRenderer`, HDR composer, independent depth textures, volumetric-cloud render target, terrain, vegetation, grass, flowers, water, landmarks, balloon resources, and an unbounded RAF loop. No `webglcontextlost` or `webglcontextrestored` listener, renderer generation, GPU-resource reconstruction registry, stale-generation rejection, recovery deadline, fallback result, or first-recovered-frame acknowledgement exists.

## Plan ledger

**Goal:** define one renderer-recovery authority that suspends stale presentation, reconstructs every registered GPU resource after an admitted WebGL context restoration, and either presents a revision-bound recovered frame or exposes an actionable fallback.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare ten eligible repositories with ten central ledger entries.
- [x] Confirm root `.agent` coverage and synchronized heads for all ten eligible repositories.
- [x] Select only `LuminaryLabs-Publish/TheOpenAbove` using the oldest synchronized timestamp.
- [x] Trace boot, renderer construction, HDR resources, cloud targets, RAF presentation, resize, disposal, validation, and deployment.
- [x] Identify the complete interaction loop, domains, all kits, adapters, provider surfaces, and services.
- [x] Preserve all 101 active named surfaces.
- [x] Define one parent recovery domain and 19 coordinating surfaces.
- [x] Change documentation only.
- [ ] Implement and execute forced-loss, restoration, rehydration, fallback, artifact, and Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories:              11
eligible after Cavalry exclusion:              10
central ledger entries:                        10
root .agent states:                            10
new eligible repositories:                      0
ledger-missing eligible repositories:           0
root-agent-missing eligible repositories:       0
runtime-ahead eligible repositories:            0

selected: LuminaryLabs-Publish/TheOpenAbove
selection reason: oldest synchronized eligible repository
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

```txt
TheOpenAbove       2026-07-15T22-00-36-04-00 selected oldest
ZombieOrchard      2026-07-15T22-40-29-04-00
TheUnmappedHouse   2026-07-15T23-00-03-04-00
PhantomCommand     2026-07-16T00-00-40-04-00
AetherVale         2026-07-16T00-26-16-04-00
TheLongHaul        2026-07-16T00-38-29-04-00
MyCozyIsland       2026-07-16T00-59-16-04-00
IntoTheMeadow      2026-07-16T01-38-56-04-00
PrehistoricRush    2026-07-16T02-03-42-04-00
HorrorCorridor     2026-07-16T02-40-29-04-00
TheCavalryOfRome   explicitly excluded
```

## Complete interaction loop

```txt
workflow and browser admission
  -> checkout product and NexusEngine provider
  -> run checks build artifact upload and Pages deployment
  -> load the route shell import map canvas map and error panel

boot
  -> construct telemetry and Core World composition
  -> construct one WebGLRenderer scene camera world and quality policy
  -> allocate HDR color targets independent depth textures and passes
  -> allocate cloud shader geometry low-resolution target and composite
  -> allocate terrain vegetation grass flowers water landmarks and balloon resources
  -> publish GameHost and request RAF

flight frame
  -> input state drives simulation
  -> accepted state updates balloon airstream Air Mail camera world and post effects
  -> clouds render to their private target
  -> composer renders the visible frame
  -> firstFramePresented becomes true
  -> RAF schedules the next callback

context-loss path today
  -> browser may invalidate the WebGL context and GPU objects
  -> no product-owned loss event is admitted
  -> RAF continues attempting cloud and composer work
  -> no renderer generation is retired
  -> no registered resource graph is rebuilt
  -> no recovery or fallback result reaches the player

required recovery
  -> observe and classify context loss once
  -> suspend stale presentation and apply simulation/input policy
  -> adopt one new renderer generation after restoration
  -> rebuild renderer composer clouds materials textures geometry and streamed resources
  -> reject callbacks from retired generations
  -> present one accepted recovered frame or typed fallback
```

## Domains in use

```txt
GitHub workflow provider checkout Vite build artifact and Pages deployment
browser route import map document lifecycle RAF resize errors and GameHost
WebGL capability context lifecycle renderer generation and recovery
balloon simulation telemetry presentation camera clipping and model lifecycle
airstream routes fields forces visuals and diagnostics
Air Mail parcels routes towns volumes progress completion and timestamps
Nexus Engine telemetry and Core World foundation features and landforms
staged world generation terrain horizon vegetation grass flowers water and landmarks
quality DPR dynamic resolution and physical render-surface sizing
weather sky sun aerial perspective volumetric clouds and cloud LOD
HDR targets depth attachments composer passes color grading and lens response
GPU-resource registration reconstruction stale-generation rejection and fallback
map UI validation browser recovery fixtures and central tracking
```

## Kit and service census

```txt
local source-backed kits:           71
runtime-implied adapters:           13
Core World provider surfaces:       17
active named surface total:        101
inactive or retired legacy:         13
planned recovery surfaces:          20
new runtime kit IDs:                 0
```

### Runtime and gameplay kits

| Kit | Services |
|---|---|
| `open-above-balloon-simulation-kit` | flight-state integration, keyboard consumption, buoyancy, steering, airstream force, terrain contact, elapsed time, distance, snapshots, disposal |
| `open-above-balloon-telemetry-kit` | NexusEngine resources, events, telemetry, world-provider installation, and readback |
| `open-above-airstream-domain` | route/field/force/visual composition, update, sample, snapshot, and disposal |
| `open-above-airstream-route-kit` | route descriptors, identity, control points, and route state |
| `open-above-airstream-sampler-kit` | route and field sampling |
| `open-above-airstream-field-kit` | spatial wind-field evaluation |
| `open-above-airstream-balloon-force-kit` | balloon force contribution |
| `open-above-airstream-visual-kit` | route visualization and updates |
| `open-above-airstream-debug-kit` | diagnostics and debug readback |
| `open-above-mail-delivery-domain` | Air Mail composition, update, reset, snapshot, and disposal |
| `open-above-mail-parcel-kit` | parcel identity, state, message, and reset |
| `open-above-mail-route-kit` | route and town descriptors |
| `open-above-delivery-volume-kit` | geometric delivery eligibility |
| `open-above-delivery-progress-kit` | current-target tracking, progress settlement, completion event, and delivered timestamp |
| `open-above-mail-town-kit` | town anchors, meshes, animation, and delivery metadata |

### Balloon object and presentation kits

| Kit | Services |
|---|---|
| `open-above-hot-air-balloon-object-kit` | asynchronous balloon composition, model readiness, persistent-resource metadata, and animation |
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
| `open-above-balloon-camera-rig-kit` | wheel zoom, camera modes, transitions, and input-listener disposal |
| `open-above-clipping-fade-kit` | near-camera clipping fade |

### Visual world and environment kits

| Kit | Services |
|---|---|
| `open-above-visual-domain` | renderer, scene, camera, world composition, update, render, resize, state, and partial disposal |
| `open-above-world-generation-kit` | deterministic staged generation, work budgets, snapshots, and subscriptions |
| `open-above-world-feature-foundation-kit` | generated-world/Core World bridge |
| `open-above-quality-tier-kit` | device quality detection and tier descriptors |
| `open-above-dynamic-resolution-kit` | effective DPR, frame-time sampling, scale transitions, and resize |
| `open-above-physical-sky-kit` | sky shader and solar update |
| `open-above-sun-light-kit` | sun direction, color, shadows, and world position |
| `open-above-aerial-perspective-kit` | fog and aerial perspective |
| `open-above-cloud-weather-map-kit` | coverage, density, wind offset, and update |
| `open-above-volumetric-cloud-kit` | cloud shaders, private scene, low-resolution half-float target, composite, render-size readback, and disposal |
| `open-above-cloud-lod-kit` | cloud render scale and sample budgets |
| `open-above-cloud-lighting-kit` | cloud sun and sky-fill lighting |
| `open-above-terrain-surface-kit` | terrain geometry/material, height/moisture queries, streaming update, and disposal |
| `open-above-terrain-streaming-contract-kit` | terrain streaming contract |
| `open-above-terrain-chunk-streaming-kit` | active terrain-chunk lifecycle |
| `open-above-terrain-horizon-streaming-kit` | horizon-ring lifecycle |
| `open-above-vegetation-cluster-kit` | vegetation generation, refresh, update, and disposal |
| `open-above-grass-world-seed-kit` | deterministic grass seed |
| `open-above-grass-biome-density-kit` | biome density evaluation |
| `open-above-grass-exclusion-mask-kit` | route and object exclusions |
| `open-above-grass-patch-density-kit` | patch distribution |
| `open-above-grass-texture-atlas-kit` | procedural texture-atlas generation |
| `open-above-grass-chunk-placement-kit` | chunk placement |
| `open-above-grass-lod-kit` | LOD policy |
| `open-above-grass-compute-culling-kit` | culling and capacity policy |
| `open-above-grass-field-domain` | grass composition, update, refresh, state, and disposal |
| `open-above-flower-chunk-placement-kit` | flower placement |
| `open-above-flower-texture-atlas-kit` | procedural flower atlas generation |
| `open-above-flower-field-domain` | flower composition, update, refresh, state, and disposal |
| `open-above-water-surface-kit` | water geometry, material, lighting, and update |
| `open-above-distant-landmark-kit` | landmark geometry and disposal |
| `open-above-hdr-composer-kit` | half-float targets, independent depth textures, RenderPass, color grade, resize, render, and disposal |
| `open-above-color-grade-kit` | HDR color grading and exposure response |
| `open-above-lens-response-kit` | sun-facing lens response |

### UI and tooling kits

| Kit | Services |
|---|---|
| `open-above-parchment-map-overlay-kit` | map drawing, keyboard toggle/close, snapshot, animation, visibility, resize, and lifecycle |
| `open-above-headless-editor-environment` | headless inspection, project checks, renderer validation, and world validation |
| `open-above-static-smoke-test-kit` | static source smoke proof |
| `open-above-airstream-mail-test-kit` | airstream and Air Mail contract proof |
| `open-above-world-flora-test-kit` | world/flora proof |
| `open-above-world-feature-foundation-test-kit` | foundation contract proof |
| `open-above-world-domain-composition-test-kit` | real-provider composition proof |

### Runtime-implied adapters

| Adapter | Services |
|---|---|
| `open-above-route-shell-kit` | document shell and startup |
| `open-above-importmap-kit` | module resolution |
| `open-above-runtime-composer-kit` | product-domain composition |
| `open-above-keyboard-input-kit` | burner, vent, steering, and map command capture |
| `open-above-wheel-zoom-input-kit` | camera zoom input |
| `open-above-parchment-map-shell-kit` | map DOM host, dialog semantics, and suspension signal |
| `open-above-error-panel-kit` | boot-failure projection |
| `open-above-gamehost-legacy-readback-kit` | public diagnostics and object access |
| `open-above-vite-nexusengine-checkout-alias-kit` | checked-out provider alias resolution |
| `open-above-nexusengine-revision-stamp-kit` | provider revision projection |
| `open-above-campaign-source-kit` | campaign, world, and route configuration |
| `open-above-raf-clock-adapter-kit` | callback scheduling, interval clipping, and frame admission |
| `open-above-pages-deploy-kit` | Pages build artifact and publication |

### Core World provider surfaces

| Surface | Services |
|---|---|
| `n-world-domain` | parent world composition, install, snapshot, reset, and child-domain routing |
| `world-builder-runtime-kit` | builder registration and domain assembly |
| `n-world-foundation-domain` | resolved foundation ownership |
| `foundation-definition-kit` | foundation descriptors and channels |
| `foundation-composition-kit` | contribution composition |
| `foundation-sampling-kit` | elevation, material, normal, and resolved-surface sampling |
| `foundation-cell-resolution-kit` | cell resolution and compilation |
| `n-world-feature-domain` | semantic feature parent domain |
| `feature-registry-kit` | feature registration and identity |
| `feature-lifecycle-kit` | feature activation, update, retirement, and reset |
| `feature-query-kit` | spatial and semantic queries |
| `feature-composition-kit` | per-cell contribution composition |
| `n-world-landform-feature-domain` | landform family composition |
| `mountain-feature-kit` | mountain descriptors and contributions |
| `canyon-feature-kit` | canyon descriptors and contributions |
| `cliff-feature-kit` | cliff descriptors and contributions |
| `plateau-feature-kit` | plateau descriptors and contributions |

## Source-backed renderer finding

```txt
one WebGLRenderer generation: present
recursive RAF presentation: present
HDR half-float targets and depth textures: present
cloud private target and shader resources: present
streamed terrain and flora GPU resources: present
webglcontextlost listener: absent
webglcontextrestored listener: absent
renderer generation identity: absent
GPU-resource registration and rebuild registry: absent
presentation suspension result: absent
stale-generation rejection: absent
recovery deadline and retry budget: absent
fallback projection result: absent
RenderRecoveryResult: absent
FirstRecoveredFrameAck: absent
forced-loss browser fixture: absent
```

`createGame()` catches boot failures only. Once RAF starts, the frame callback directly performs simulation, cloud rendering, composer rendering, and schedules itself again without a frame-level recovery boundary. `createVisualDomain()` constructs renderer and GPU resources once; its `dispose()` retires many owned resources but does not define loss observation, reconstruction ordering, or recovered-frame proof.

This is a source-backed liveness and presentation-coherence risk. No context-loss incident was reproduced.

## Required authority

```txt
open-above-webgl-context-resource-recovery-authority-domain
```

```txt
RenderRecoveryAdmissionCommand
  -> bind document runtime renderer context and resource generations
  -> observe and classify context-loss evidence once
  -> prevent default browser disposal where restoration is intended
  -> suspend stale presentation and apply simulation/input policy
  -> publish RenderLossResult
  -> admit one context-restoration generation
  -> rebuild renderer state composer targets cloud targets materials textures geometry and streamed resources
  -> reject callbacks and resources from retired generations
  -> enforce recovery deadline retry budget and fallback policy
  -> present one accepted recovered frame
  -> publish RenderRecoveryResult or RenderFallbackResult
  -> publish FirstRecoveredFrameAck
```

## Planned recovery surfaces

```txt
open-above-webgl-context-resource-recovery-authority-domain
open-above-render-capability-observation-kit
open-above-render-generation-identity-kit
open-above-webgl-context-loss-observation-kit
open-above-webgl-context-restoration-observation-kit
open-above-render-loss-classification-kit
open-above-presentation-suspension-policy-kit
open-above-simulation-input-loss-policy-kit
open-above-gpu-resource-registration-kit
open-above-scene-resource-rehydration-kit
open-above-post-process-resource-rehydration-kit
open-above-cloud-resource-rehydration-kit
open-above-terrain-flora-resource-rehydration-kit
open-above-renderer-reconstruction-kit
open-above-stale-render-generation-rejection-kit
open-above-render-recovery-deadline-budget-kit
open-above-render-fallback-projection-kit
open-above-render-loss-result-kit
open-above-render-recovery-result-kit
open-above-first-recovered-frame-ack-kit
```

## Required output family

```txt
.agent/trackers/2026-07-16T03-03-22-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-16T03-03-22-04-00.md
.agent/architecture-audit/2026-07-16T03-03-22-04-00-webgl-context-resource-recovery-dsk-map.md
.agent/render-audit/2026-07-16T03-03-22-04-00-context-loss-first-recovered-frame-gap.md
.agent/gameplay-audit/2026-07-16T03-03-22-04-00-render-loss-noninteractive-flight-loop.md
.agent/interaction-audit/2026-07-16T03-03-22-04-00-render-recovery-command-result-map.md
.agent/renderer-recovery-audit/2026-07-16T03-03-22-04-00-webgl-resource-rehydration-contract.md
.agent/deploy-audit/2026-07-16T03-03-22-04-00-context-loss-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-16T03-03-22-04-00-oldest-selection-renderer-recovery-reconciliation.md
```

## Validation boundary

```txt
documentation changed: yes
runtime JavaScript changed: no
HTML CSS or shaders changed: no
gameplay or rendering behavior changed: no
packages dependencies tests workflows or deployment changed: no
branch created: no
pull request created: no

npm run check: not run
npm run build: not run
forced WebGL context-loss fixture: not run
context-restoration fixture: not run
GPU-resource rehydration fixture: not run
artifact downloaded: no
Pages URL fetched: no
```

No renderer recovery, context restoration, resource rehydration, stale-generation rejection, fallback correctness, first-recovered-frame convergence, artifact parity, Pages parity, or production readiness is claimed.