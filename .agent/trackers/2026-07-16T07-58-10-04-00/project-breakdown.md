# Project Breakdown: TheOpenAbove Page-Lifecycle Suspension and Resume

**Timestamp:** `2026-07-16T07-58-10-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Selection:** oldest synchronized eligible repository  
**Reviewed pre-audit repository head:** `d1d48c49ff687d2a6aa10c1ffd152eb6a771b3ff`  
**Reviewed runtime source revision:** `1417c80309218c7c61def3b2f09a977eaab8b953`  
**Status:** `page-lifecycle-flight-suspension-resume-authority-audited`

## Summary

The current Publish inventory contains 11 repositories. Ten are eligible after excluding `TheCavalryOfRome`; all ten have central ledger entries and root `.agent` state. No eligible repository was new, ledger-missing, root-agent-missing or otherwise undocumented, so TheOpenAbove was selected by the oldest synchronized timestamp.

The route owns a flight RAF, a conditional map RAF, global input listeners, simulation, Air Mail, airstreams, staged world generation, camera transitions and WebGL presentation. It clears held keys on window `blur`, but has no product-owned `visibilitychange`, `pagehide`, `pageshow`, `freeze` or `resume` transaction. Browser backgrounding can therefore stop scheduling implicitly, while the next frame merely clips elapsed wall time and resumes without a typed suspension result, clock rebase, BFCache restoration result or first-resumed-frame acknowledgement.

## Plan ledger

**Goal:** define one lifecycle authority that converts browser lifecycle evidence into revision-bound suspend, resume or retire results across every affected domain.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare ten eligible repositories with ten central ledger entries.
- [x] Confirm root `.agent` coverage and no undocumented priority repository.
- [x] Select only `LuminaryLabs-Publish/TheOpenAbove` by the oldest synchronized timestamp.
- [x] Trace flight RAF, map RAF, input, simulation, Air Mail, world, camera, rendering and validation.
- [x] Identify the complete interaction loop, domains, all kits, adapters, provider surfaces and services.
- [x] Preserve all 101 active named surfaces.
- [x] Define one parent lifecycle authority and 19 coordinating surfaces.
- [x] Change documentation only.
- [ ] Implement and execute visibility, BFCache, freeze/resume, stale-generation and first-resumed-frame fixtures.

## Selection comparison

```txt
accessible Publish repositories:              11
eligible after Cavalry exclusion:              10
central ledger entries:                        10
root .agent states:                            10
new eligible repositories:                      0
ledger-missing eligible repositories:           0
root-agent-missing eligible repositories:       0
undocumented eligible repositories:             0

selected: LuminaryLabs-Publish/TheOpenAbove
selection reason: oldest synchronized eligible repository
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

```txt
TheOpenAbove       2026-07-16T03-03-22-04-00 selected oldest
ZombieOrchard      2026-07-16T03-41-28-04-00
TheUnmappedHouse   2026-07-16T04-02-40-04-00
PhantomCommand     2026-07-16T04-27-44-04-00
AetherVale         2026-07-16T04-40-16-04-00
MyCozyIsland       2026-07-16T05-41-12-04-00
IntoTheMeadow      2026-07-16T05-58-36-04-00
PrehistoricRush    2026-07-16T06-39-16-04-00
HorrorCorridor     2026-07-16T07-03-14-04-00
TheLongHaul        2026-07-16T07-39-04-04-00
TheCavalryOfRome   explicitly excluded
```

## Complete interaction loop

```txt
workflow and browser admission
  -> checkout product and NexusEngine provider
  -> run checks, Vite build, artifact upload and Pages deployment
  -> load route shell, import map, canvas, map overlay and error panel

boot
  -> create telemetry and Core World composition
  -> create visual world, renderer, camera, HDR and clouds
  -> load balloon and create airstream, Air Mail, simulation, map and camera
  -> attach global keyboard, wheel, blur and resize listeners
  -> publish GameHost
  -> request flight RAF

visible flight frame
  -> clamp wall interval to 80 ms
  -> clamp simulation dt to 1/30 s
  -> when map is closed, update simulation, delivery, airstream, balloon, camera, world and engine
  -> render clouds and HDR frame
  -> request the next flight RAF

map-open frame
  -> main RAF renders with dt=0
  -> map overlay starts its own RAF
  -> map samples player, parcel and world-generation state

background or frozen document today
  -> browser may throttle or stop both RAF loops
  -> no lifecycle command or result is published
  -> window blur may clear held keys, but visibility/page lifecycle is not owned
  -> simulation, Air Mail, world-generation, camera and render suspension are implicit

resume today
  -> the next flight callback receives a large wall interval
  -> frameMs is clipped to 80 ms and dt to 1/30 s
  -> last timestamp is replaced
  -> systems continue without an accepted resume generation
  -> no BFCache restoration result or first-resumed-frame acknowledgement exists
```

## Domains in use

```txt
GitHub workflow, checked-out provider, Vite build, artifact and Pages deployment
browser route, import map, document visibility, pagehide/pageshow, freeze/resume, RAF, resize, blur and GameHost
balloon simulation, input, telemetry, presentation, camera and clipping
airstream routes, sampling, fields, forces, visuals and diagnostics
Air Mail parcels, routes, towns, delivery volumes, progress, completion and timestamps
Nexus Engine telemetry, Core World foundation, features and landforms
staged world generation, terrain, horizon, vegetation, grass, flowers, water and landmarks
quality, DPR, dynamic resolution, sky, sun, aerial perspective, clouds, HDR and color grading
map drawing, map animation and route suspension
lifecycle generations, transition normalization, suspend/resume/retire policy and frame proof
validation, browser fixtures and central tracking
```

## Kit and service census

```txt
local source-backed kits:           71
runtime-implied adapters:           13
Core World provider surfaces:       17
active named surface total:        101
inactive or retired legacy:         13
planned lifecycle surfaces:         20
new runtime kit IDs:                 0
```

### Runtime and gameplay kits

| Kit | Services |
|---|---|
| `open-above-balloon-simulation-kit` | flight-state integration, global keyboard consumption, blur-based key clearing, buoyancy, venting, steering, airstream force, terrain contact, elapsed time, distance, snapshots and disposal |
| `open-above-balloon-telemetry-kit` | NexusEngine resources, events, telemetry, world-provider installation and readback |
| `open-above-airstream-domain` | route/field/force/visual composition, update, sampling, snapshot and disposal |
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
| `open-above-delivery-progress-kit` | current-target tracking, progress settlement, completion event and delivered timestamp |
| `open-above-mail-town-kit` | town anchors, meshes, animation and delivery metadata |

### Balloon object and presentation kits

| Kit | Services |
|---|---|
| `open-above-hot-air-balloon-object-kit` | asynchronous balloon composition, model readiness, persistent-resource metadata and animation |
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
| `open-above-visual-domain` | renderer, scene, camera, world composition, update, render, resize, state and partial disposal |
| `open-above-world-generation-kit` | deterministic staged generation, work budgets, snapshots and subscriptions |
| `open-above-world-feature-foundation-kit` | generated-world/Core World bridge |
| `open-above-quality-tier-kit` | device quality detection and tier descriptors |
| `open-above-dynamic-resolution-kit` | effective DPR, frame-time sampling, scale transitions and resize |
| `open-above-physical-sky-kit` | sky shader and solar update |
| `open-above-sun-light-kit` | sun direction, color, shadows and world position |
| `open-above-aerial-perspective-kit` | fog and aerial perspective |
| `open-above-cloud-weather-map-kit` | coverage, density, wind offset and update |
| `open-above-volumetric-cloud-kit` | cloud shaders, private scene, low-resolution half-float target, composite, render-size readback and disposal |
| `open-above-cloud-lod-kit` | cloud render scale and sample budgets |
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
| `open-above-grass-lod-kit` | LOD policy |
| `open-above-grass-compute-culling-kit` | culling and capacity policy |
| `open-above-grass-field-domain` | grass composition, update, refresh, state and disposal |
| `open-above-flower-chunk-placement-kit` | flower placement |
| `open-above-flower-texture-atlas-kit` | procedural flower atlas generation |
| `open-above-flower-field-domain` | flower composition, update, refresh, state and disposal |
| `open-above-water-surface-kit` | water geometry, material, lighting and update |
| `open-above-distant-landmark-kit` | landmark geometry and disposal |
| `open-above-hdr-composer-kit` | half-float targets, independent depth textures, RenderPass, color grade, resize, render and disposal |
| `open-above-color-grade-kit` | HDR color grading and exposure response |
| `open-above-lens-response-kit` | sun-facing lens response |

### UI and tooling kits

| Kit | Services |
|---|---|
| `open-above-parchment-map-overlay-kit` | map drawing, conditional map RAF, keyboard toggle/close, snapshot, visibility, resize, world-map refresh and disposal |
| `open-above-headless-editor-environment` | headless inspection, project checks, renderer validation and world validation |
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
| `open-above-keyboard-input-kit` | burner, vent, steering and map command capture |
| `open-above-wheel-zoom-input-kit` | camera zoom input |
| `open-above-parchment-map-shell-kit` | map DOM host, dialog semantics and map-open suspension signal |
| `open-above-error-panel-kit` | boot-failure projection |
| `open-above-gamehost-legacy-readback-kit` | public diagnostics and object access |
| `open-above-vite-nexusengine-checkout-alias-kit` | checked-out provider alias resolution |
| `open-above-nexusengine-revision-stamp-kit` | provider revision projection |
| `open-above-campaign-source-kit` | campaign, world and route configuration |
| `open-above-raf-clock-adapter-kit` | callback scheduling, interval clipping and frame admission |
| `open-above-pages-deploy-kit` | Pages build artifact and publication |

### Core World provider surfaces

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

## Source-backed lifecycle finding

```txt
flight RAF: present
map RAF while open: present
frameMs clamp: present
simulation dt clamp: present
blur key clearing: present
visibilitychange admission: absent
pagehide/pageshow admission: absent
freeze/resume admission: absent
suspension reason and revision: absent
cross-domain suspend/resume settlement: absent
resume clock rebase: absent
BFCache restoration generation: absent
stale lifecycle-generation rejection: absent
PageLifecycleResult: absent
FirstResumedFrameAck: absent
```

`createGame()` starts the flight RAF and never receives document lifecycle evidence. The map overlay independently schedules and cancels its own RAF only when the map opens or closes. The first callback after a long pause clips the wall interval and updates `last`, but no product result explains whether hidden time was discarded, whether gameplay was suspended, whether input was cancelled or which frame first belongs to the resumed generation.

This is a source-backed lifecycle, input and frame-coherence risk. No backgrounding or BFCache incident was reproduced.

## Required authority

`open-above-page-lifecycle-flight-suspension-resume-authority-domain`

```txt
PageLifecycleTransitionCommand
  -> bind document route session lifecycle clock input world and frame revisions
  -> normalize visibilitychange pagehide pageshow freeze and resume evidence
  -> classify suspend resume or retire intent
  -> clear held actions and publish input settlement
  -> suspend or preserve simulation Air Mail airstream world work map camera and rendering by policy
  -> rebase host time on accepted resume
  -> revalidate renderer viewport world and provider identity
  -> reject stale lifecycle generations and callbacks
  -> publish PageLifecycleResult
  -> present one accepted resumed frame
  -> publish FirstResumedFrameAck
```

## Planned lifecycle surfaces

```txt
open-above-page-lifecycle-flight-suspension-resume-authority-domain
open-above-document-lifecycle-observation-kit
open-above-lifecycle-generation-identity-kit
open-above-lifecycle-transition-normalization-kit
open-above-suspension-reason-policy-kit
open-above-flight-simulation-suspension-kit
open-above-held-input-cancellation-kit
open-above-air-mail-suspension-kit
open-above-airstream-suspension-kit
open-above-world-generation-suspension-kit
open-above-render-scheduler-suspension-kit
open-above-map-overlay-suspension-kit
open-above-camera-transition-suspension-kit
open-above-resume-clock-rebase-kit
open-above-bfcache-restoration-admission-kit
open-above-stale-lifecycle-generation-rejection-kit
open-above-page-lifecycle-result-kit
open-above-lifecycle-fallback-projection-kit
open-above-first-resumed-frame-ack-kit
open-above-page-lifecycle-browser-fixture-kit
```

## Required output family

```txt
.agent/trackers/2026-07-16T07-58-10-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-16T07-58-10-04-00.md
.agent/architecture-audit/2026-07-16T07-58-10-04-00-page-lifecycle-suspension-resume-dsk-map.md
.agent/render-audit/2026-07-16T07-58-10-04-00-hidden-resume-visible-frame-gap.md
.agent/gameplay-audit/2026-07-16T07-58-10-04-00-background-flight-resume-loop.md
.agent/interaction-audit/2026-07-16T07-58-10-04-00-page-lifecycle-command-result-map.md
.agent/lifecycle-audit/2026-07-16T07-58-10-04-00-visibility-pagehide-freeze-resume-contract.md
.agent/deploy-audit/2026-07-16T07-58-10-04-00-page-lifecycle-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-16T07-58-10-04-00-oldest-selection-lifecycle-reconciliation.md
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
visibility lifecycle fixture: not run
BFCache fixture: not run
freeze/resume fixture: not run
held-input cancellation fixture: not run
artifact downloaded: no
Pages URL fetched: no
```

No lifecycle suspension correctness, held-input safety, BFCache restoration, clock continuity, stale-generation rejection, first-resumed-frame convergence, artifact parity, Pages parity or production readiness is claimed.