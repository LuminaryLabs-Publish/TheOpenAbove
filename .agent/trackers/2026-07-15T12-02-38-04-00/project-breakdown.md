# Project Breakdown: TheOpenAbove Host Clock Fixed-Step Flight Simulation

**Timestamp:** `2026-07-15T12-02-38-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Selection:** oldest synchronized eligible repository  
**Reviewed repository head:** `d122f875e321eb3a52fda37af4de9abc4ca47105`  
**Reviewed runtime source revision:** `1417c80309218c7c61def3b2f09a977eaab8b953`  
**Status:** `host-clock-fixed-step-flight-simulation-authority-audited`

## Summary

TheOpenAbove was selected after the full 11-repository Publish inventory matched ten eligible central ledgers and root `.agent` states, every eligible head matched its documented repo-local head, and no higher-priority new, missing, undocumented, or runtime-ahead case existed. The active RAF host clips every callback to one simulation step of at most `1/30` second and carries no accumulator or residual time, so callback intervals above 33.3 ms are silently discarded and flight, wind, Air Mail, world, and engine time slow below wall time.

## Plan ledger

**Goal:** document one host-clock authority that converts monotonic browser time into bounded deterministic steps, preserves explicit map suspension, carries residual time, reports overload, and renders the first frame matching the accepted simulation revision.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare ten eligible repositories with ten central ledger entries.
- [x] Confirm root `.agent` coverage and synchronized heads for all ten eligible repositories.
- [x] Select only `LuminaryLabs-Publish/TheOpenAbove` using the oldest documented-selection rule.
- [x] Trace browser RAF, map suspension, balloon simulation, airstream, Air Mail, Core World, visual update, engine tick, and render ordering.
- [x] Identify every active domain, kit, adapter, provider surface, and offered service.
- [x] Preserve all 101 active named surfaces.
- [x] Define the fixed-step host-clock authority, result boundary, and browser fixture gate.
- [x] Change documentation only.
- [ ] Implement and execute controlled-clock, low-FPS, suspension, resume, overload, interpolation, build, artifact, and Pages fixtures.

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
prior central timestamp: 2026-07-15T07-39-52-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

```txt
TheOpenAbove       2026-07-15T07-39-52-04-00 selected oldest
ZombieOrchard      2026-07-15T08-26-01-04-00
TheUnmappedHouse   2026-07-15T08-28-25-04-00
PhantomCommand     2026-07-15T08-41-37-04-00
AetherVale         2026-07-15T09-00-08-04-00
TheLongHaul        2026-07-15T09-40-51-04-00
MyCozyIsland       2026-07-15T10-01-08-04-00
IntoTheMeadow      2026-07-15T10-40-17-04-00
PrehistoricRush    2026-07-15T10-58-45-04-00
HorrorCorridor     2026-07-15T11-39-04-04-00
TheCavalryOfRome   explicitly excluded
```

## Complete interaction loop

```txt
workflow and browser admission
  -> checkout product and NexusEngine provider
  -> execute checks build artifact upload and Pages deployment
  -> load route import map canvas map shell and error surface
  -> compose telemetry Core World balloon airstream Air Mail visual and UI domains

boot
  -> create renderer scene camera world HDR and cloud resources
  -> load balloon model and attach presentation
  -> create simulation airstream Air Mail map and camera services
  -> publish GameHost and request first animation frame

active RAF callback
  -> derive callback interval from performance.now
  -> cap frameMs to 80 ms
  -> cap simulation dt to 1/30 second
  -> when map is closed:
       update balloon simulation once
       update Air Mail once
       update airstream once
       update balloon model and presentation once
       update camera and visual world once
       tick NexusEngine once
  -> render clouds HDR world and map from the resulting state
  -> request the next callback

map-open callback
  -> update the host timestamp
  -> skip simulation airstream mail camera world and engine updates
  -> render with dt 0
  -> request the next callback

low-FPS path
  -> callback interval exceeds 33.3 ms
  -> one capped step executes
  -> excess elapsed time is neither stepped nor retained
  -> simulation elapsed distance wind Air Mail world and engine time fall behind wall time
```

## Domains in use

```txt
GitHub workflow provider checkout Vite build artifact and Pages deployment
browser route import map lifecycle RAF input resize errors visibility and GameHost
host clock monotonic interval admission suspension resume overload and interpolation
Nexus Engine telemetry and Core World composition
balloon simulation telemetry object presentation camera clipping and model lifecycle
airstream route field sampling forces visuals and diagnostics
Air Mail parcel route town volume progress completion and timestamps
staged world generation foundation features landforms and sampling
terrain horizon vegetation grass flowers water and landmarks
quality detection DPR policy dynamic resolution and render-surface sizing
weather physical sky sun aerial perspective cloud lighting and ray marching
cloud target dispatch low-resolution composite and lifecycle
HDR half-float targets depth attachments composer passes color grading and lens response
parchment map suspension UI headless inspection tests and central tracking
```

## Kit and service census

```txt
local source-backed kits:           71
runtime-implied adapters:           13
Core World provider surfaces:       17
active named surface total:        101
inactive or retired legacy:         13
planned host-clock surfaces:        20
new named runtime kit IDs:           0
```

### Runtime and gameplay kits

| Kit | Services |
|---|---|
| `open-above-balloon-simulation-kit` | balloon state integration flight controls terrain contact elapsed time distance and snapshot |
| `open-above-balloon-telemetry-kit` | NexusEngine resources events telemetry and readback |
| `open-above-airstream-domain` | airstream composition lifecycle update sample and snapshot |
| `open-above-airstream-route-kit` | route descriptors route identity and route state |
| `open-above-airstream-sampler-kit` | route and field sampling |
| `open-above-airstream-field-kit` | spatial wind-field evaluation |
| `open-above-airstream-balloon-force-kit` | balloon force contribution |
| `open-above-airstream-visual-kit` | airstream visual descriptors and updates |
| `open-above-airstream-debug-kit` | diagnostics and debug readback |
| `open-above-mail-delivery-domain` | Air Mail composition lifecycle update and snapshot |
| `open-above-mail-parcel-kit` | parcel identity state and message |
| `open-above-mail-route-kit` | delivery-route and town descriptors |
| `open-above-delivery-volume-kit` | geometric delivery eligibility |
| `open-above-delivery-progress-kit` | progress settlement completion and delivered-at projection |
| `open-above-mail-town-kit` | town anchors geometry animation and delivery metadata |

### Balloon object and presentation kits

| Kit | Services |
|---|---|
| `open-above-hot-air-balloon-object-kit` | async balloon object composition model readiness and animation |
| `open-above-balloon-envelope-profile-kit` | envelope proportions and profile |
| `open-above-balloon-envelope-panel-kit` | envelope panel geometry |
| `open-above-balloon-mouth-kit` | mouth geometry and fit |
| `open-above-balloon-streamer-fit-kit` | streamer placement and fit |
| `open-above-balloon-fabric-seam-kit` | fabric seam presentation |
| `open-above-hot-air-balloon-basket-kit` | basket geometry |
| `open-above-hot-air-balloon-rigging-kit` | ropes and rigging layout |
| `open-above-hot-air-balloon-burner-kit` | burner geometry and presentation |
| `open-above-rope-kit` | segmented rope construction |
| `open-above-balloon-presentation-domain` | balloon presentation composition and update |
| `open-above-envelope-fabric-material-kit` | envelope material descriptors |
| `open-above-basket-material-kit` | basket material descriptors |
| `open-above-balloon-camera-rig-kit` | flight camera zoom mode and view transitions |
| `open-above-clipping-fade-kit` | near-camera clipping fade |

### Visual world and environment kits

| Kit | Services |
|---|---|
| `open-above-visual-domain` | renderer scene camera world update render resize state and disposal |
| `open-above-world-generation-kit` | deterministic staged generation work budget state and subscriptions |
| `open-above-world-feature-foundation-kit` | generated-world and Core World bridge |
| `open-above-quality-tier-kit` | device quality detection and tier descriptors |
| `open-above-dynamic-resolution-kit` | effective pixel ratio frame-time sampling scale changes and resize |
| `open-above-physical-sky-kit` | sky shader and solar update |
| `open-above-sun-light-kit` | sun direction color shadows and world position |
| `open-above-aerial-perspective-kit` | fog and aerial perspective |
| `open-above-cloud-weather-map-kit` | cloud coverage density wind offset and update |
| `open-above-volumetric-cloud-kit` | cloud ray march private scene low-resolution target composite size readback and disposal |
| `open-above-cloud-lod-kit` | cloud render scale view/light samples and distance budgets |
| `open-above-cloud-lighting-kit` | cloud sun and sky-fill lighting |
| `open-above-terrain-surface-kit` | terrain geometry material height moisture streaming update and disposal |
| `open-above-terrain-streaming-contract-kit` | terrain streaming contract |
| `open-above-terrain-chunk-streaming-kit` | active terrain chunk lifecycle |
| `open-above-terrain-horizon-streaming-kit` | horizon-ring lifecycle |
| `open-above-vegetation-cluster-kit` | vegetation generation refresh update and disposal |
| `open-above-grass-world-seed-kit` | deterministic grass seed |
| `open-above-grass-biome-density-kit` | biome density evaluation |
| `open-above-grass-exclusion-mask-kit` | route and object exclusions |
| `open-above-grass-patch-density-kit` | patch distribution |
| `open-above-grass-texture-atlas-kit` | grass texture atlas generation |
| `open-above-grass-chunk-placement-kit` | grass chunk placement |
| `open-above-grass-lod-kit` | grass LOD policy |
| `open-above-grass-compute-culling-kit` | grass culling and capacity policy |
| `open-above-grass-field-domain` | grass composition update refresh state and disposal |
| `open-above-flower-chunk-placement-kit` | flower placement |
| `open-above-flower-texture-atlas-kit` | flower atlas generation |
| `open-above-flower-field-domain` | flower composition update refresh state and disposal |
| `open-above-water-surface-kit` | water geometry material lighting and update |
| `open-above-distant-landmark-kit` | distant landmark geometry and disposal |
| `open-above-hdr-composer-kit` | half-float targets independent depth textures RenderPass color grade resize render and disposal |
| `open-above-color-grade-kit` | HDR color grading and exposure response |
| `open-above-lens-response-kit` | sun-facing lens response |

### UI and tooling kits

| Kit | Services |
|---|---|
| `open-above-parchment-map-overlay-kit` | map drawing interaction snapshot animation visibility and lifecycle |
| `open-above-headless-editor-environment` | headless inspection commands snapshots renderer and world validation |
| `open-above-static-smoke-test-kit` | static smoke proof |
| `open-above-airstream-mail-test-kit` | airstream and mail contract proof |
| `open-above-world-flora-test-kit` | world and flora proof |
| `open-above-world-feature-foundation-test-kit` | foundation contract proof |
| `open-above-world-domain-composition-test-kit` | real-provider composition proof |

### Runtime-implied adapters

| Adapter | Services |
|---|---|
| `open-above-route-shell-kit` | browser route shell and startup |
| `open-above-importmap-kit` | browser module resolution |
| `open-above-runtime-composer-kit` | product domain composition |
| `open-above-keyboard-input-kit` | keyboard command capture |
| `open-above-wheel-zoom-input-kit` | wheel camera zoom |
| `open-above-parchment-map-shell-kit` | map DOM host and simulation suspension signal |
| `open-above-error-panel-kit` | startup and runtime error projection |
| `open-above-gamehost-legacy-readback-kit` | public diagnostic readback |
| `open-above-vite-nexusengine-checkout-alias-kit` | checked-out provider alias resolution |
| `open-above-nexusengine-revision-stamp-kit` | provider revision projection |
| `open-above-campaign-source-kit` | product content world and route data |
| `open-above-raf-clock-adapter-kit` | browser callback scheduling interval clipping and delta derivation |
| `open-above-pages-deploy-kit` | Pages build artifact and publication |

### Core World provider surfaces

| Surface | Services |
|---|---|
| `n-world-domain` | world-domain composition |
| `world-builder-runtime-kit` | world runtime builder |
| `n-world-foundation-domain` | foundation composition |
| `foundation-definition-kit` | foundation descriptors |
| `foundation-composition-kit` | foundation merge ordering and resolution |
| `foundation-sampling-kit` | foundation sampling |
| `foundation-cell-resolution-kit` | cell resolution and snapshots |
| `n-world-feature-domain` | feature composition |
| `feature-registry-kit` | feature registration |
| `feature-lifecycle-kit` | feature lifecycle |
| `feature-query-kit` | bounds and feature queries |
| `feature-composition-kit` | feature contribution composition |
| `n-world-landform-feature-domain` | landform composition |
| `mountain-feature-kit` | mountain contributions |
| `canyon-feature-kit` | canyon contributions |
| `cliff-feature-kit` | cliff contributions |
| `plateau-feature-kit` | plateau contributions |

## Source-backed timing finding

```txt
host frameMs clamp: 80 ms
host dt clamp: 1 / 30 second = 33.333 ms
simulation updates per RAF callback: 1
accumulator: absent
residual time: absent
catch-up budget: absent
overload result: absent
interpolation alpha: absent
explicit map suspension result: absent
first clock-aligned visible frame acknowledgement: absent
```

```txt
10 FPS callback interval: 100 ms
admitted simulation time: 33.333 ms
silently discarded time: about 66.667 ms
approximate simulation pacing: 0.333x wall time

5 FPS callback interval: 200 ms
admitted simulation time: 33.333 ms
silently discarded time: about 166.667 ms
approximate simulation pacing: 0.167x wall time
```

The exact downstream consumers include `state.elapsed`, wind phase, airstream sampling, steering smoothing, buoyancy, velocity, position, altitude, distance, Air Mail delivery timestamps and visuals, camera update, visual world update, and `engine.tick(dt)`. These are source-derived pacing paths. No browser timing defect was reproduced.

## Required authority

```txt
open-above-host-clock-fixed-step-flight-simulation-authority-domain
```

```txt
HostClockFrameCommand
  -> bind document runtime RAF clock map simulation and input revisions
  -> admit one monotonic callback interval
  -> classify active map-suspended hidden resumed and overload states
  -> accumulate elapsed wall time
  -> execute deterministic fixed steps within a bounded step and time budget
  -> retain residual time or publish an explicit discarded-time receipt
  -> bind one input revision to the accepted step batch
  -> step balloon airstream Air Mail world and NexusEngine in declared order
  -> publish HostClockFrameResult and ClockSnapshot
  -> render the accepted simulation revision with interpolation
  -> publish FirstClockAlignedFrameAck
```

## Validation boundary

Documentation only. Runtime JavaScript, shaders, gameplay, packages, tests, workflows, and deployment were unchanged. Source inspection proves elapsed time is clipped and not accumulated; it does not prove observed low-FPS pacing, browser-throttling behavior, pause correctness, deterministic catch-up, artifact parity, deployed parity, or production readiness.