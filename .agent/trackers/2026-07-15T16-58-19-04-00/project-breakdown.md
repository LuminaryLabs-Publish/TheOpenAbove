# Project Breakdown: TheOpenAbove Device-Control Action Coverage

**Timestamp:** `2026-07-15T16-58-19-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Selection:** oldest synchronized eligible repository  
**Reviewed pre-audit repository head:** `86d3847e89a148671dca8487a9afbbb0a1e04951`  
**Reviewed runtime source revision:** `1417c80309218c7c61def3b2f09a977eaab8b953`  
**Status:** `device-control-action-coverage-authority-audited`

## Summary

TheOpenAbove was selected after the current 11-repository Publish inventory matched ten eligible central ledgers, every eligible repository had root `.agent` state, every documented head matched `main`, and `TheCavalryOfRome` was excluded. The active product admits balloon controls only from global keyboard events, camera zoom only from wheel events, and map toggling only from `M` or `Escape`. The full-screen canvas disables default touch behavior but supplies no active pointer, touch, gamepad, or on-screen control producer, so a touch-only player cannot intentionally operate the burner, vent, steering, map, or camera loop.

## Plan ledger

**Goal:** define one device-neutral control authority that admits a complete flight action profile for keyboard/mouse, touch-only, gamepad, and hybrid devices without moving simulation truth into browser handlers or visual components.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare ten eligible repositories with ten central ledger entries.
- [x] Confirm root `.agent` coverage and synchronized heads for all ten eligible repositories.
- [x] Select only `LuminaryLabs-Publish/TheOpenAbove` by the oldest documented-selection rule.
- [x] Trace boot, keyboard flight input, wheel zoom, map toggling, simulation consumption, camera consumption, rendering, and public readback.
- [x] Identify every active domain, kit, adapter, provider surface, and offered service.
- [x] Preserve all 101 active named surfaces.
- [x] Define the device-control admission authority and browser fixture gate.
- [x] Change documentation only.
- [ ] Implement and execute keyboard/mouse, touch-only, gamepad, hybrid-input, cancellation, focus, build, artifact, and Pages fixtures.

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
prior central timestamp: 2026-07-15T12-02-38-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

```txt
TheOpenAbove       2026-07-15T12-02-38-04-00 selected oldest
ZombieOrchard      2026-07-15T12-39-01-04-00
TheUnmappedHouse   2026-07-15T12-59-24-04-00
PhantomCommand     2026-07-15T13-41-25-04-00
AetherVale         2026-07-15T14-01-52-04-00
TheLongHaul        2026-07-15T14-40-11-04-00
MyCozyIsland       2026-07-15T15-01-22-04-00
IntoTheMeadow      2026-07-15T15-41-21-04-00
PrehistoricRush    2026-07-15T16-00-32-04-00
HorrorCorridor     2026-07-15T16-39-06-04-00
TheCavalryOfRome   explicitly excluded
```

## Complete interaction loop

```txt
workflow and browser admission
  -> checkout product and NexusEngine provider
  -> run checks build artifact upload and Pages deployment
  -> load full-screen canvas map overlay error surface and runtime modules
  -> compose telemetry Core World balloon airstream Air Mail visual and UI domains

boot
  -> create renderer scene camera world HDR and cloud resources
  -> load balloon model
  -> create simulation airstream Air Mail map camera and presentation services
  -> install global keyboard wheel and map listeners
  -> publish GameHost and request the first animation frame

keyboard/mouse profile
  -> keydown or keyup mutates the simulation key set
  -> Space W or ArrowUp drives burner
  -> S ArrowDown or Shift drives vent
  -> A D or ArrowLeft ArrowRight drive steering trim
  -> wheel mutates camera zoom
  -> M opens or closes the map
  -> Escape closes the map
  -> RAF consumes the resulting state and renders it

touch-only profile
  -> pointer or touch reaches a canvas with touch-action none
  -> no active pointer or touch listener creates a flight action
  -> no on-screen burner vent steering map or zoom control exists
  -> simulation receives no intentional touch action
  -> balloon continues passive drift under ambient state
  -> the intended route-reading and delivery loop is not controllable

hybrid profile
  -> keyboard wheel and any future touch producer have no shared action generation
  -> no producer ownership duplicate suppression or gesture cancellation result exists
```

## Domains in use

```txt
GitHub workflow provider checkout Vite build artifact and Pages deployment
browser route import map lifecycle RAF resize errors visibility and GameHost
browser device capability input producers action normalization and control surfaces
keyboard burner vent steering input
wheel camera zoom input
map toggle close dialog and simulation suspension
balloon simulation telemetry contact elapsed time distance and snapshots
airstream routes field sampling forces visuals and diagnostics
Air Mail parcel route town volume progress completion and timestamps
balloon object construction materials presentation camera and clipping
Nexus Engine telemetry and Core World foundation features and landforms
staged world generation terrain horizon vegetation grass flowers water and landmarks
quality DPR dynamic resolution and render-surface sizing
weather sky sun aerial perspective volumetric clouds and cloud LOD
HDR targets depth attachments composer passes color grading and lens response
headless validation tests central tracking and browser device fixtures
```

## Kit and service census

```txt
local source-backed kits:           71
runtime-implied adapters:           13
Core World provider surfaces:       17
active named surface total:        101
inactive or retired legacy:         13
planned device-control surfaces:    22
new named runtime kit IDs:           0
```

### Runtime and gameplay kits

| Kit | Services |
|---|---|
| `open-above-balloon-simulation-kit` | balloon state integration, keyboard-state consumption, flight controls, terrain contact, elapsed time, distance, snapshots, listener disposal |
| `open-above-balloon-telemetry-kit` | NexusEngine resources, events, telemetry, and readback |
| `open-above-airstream-domain` | airstream composition, lifecycle, update, sample, and snapshot |
| `open-above-airstream-route-kit` | route descriptors, identity, and route state |
| `open-above-airstream-sampler-kit` | route and field sampling |
| `open-above-airstream-field-kit` | spatial wind-field evaluation |
| `open-above-airstream-balloon-force-kit` | balloon force contribution |
| `open-above-airstream-visual-kit` | airstream visual descriptors and updates |
| `open-above-airstream-debug-kit` | diagnostics and debug readback |
| `open-above-mail-delivery-domain` | Air Mail composition, lifecycle, update, and snapshot |
| `open-above-mail-parcel-kit` | parcel identity, state, and message |
| `open-above-mail-route-kit` | delivery route and town descriptors |
| `open-above-delivery-volume-kit` | geometric delivery eligibility |
| `open-above-delivery-progress-kit` | progress settlement, completion, and delivered-at projection |
| `open-above-mail-town-kit` | town anchors, geometry, animation, and delivery metadata |

### Balloon object and presentation kits

| Kit | Services |
|---|---|
| `open-above-hot-air-balloon-object-kit` | async balloon object composition, model readiness, and animation |
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
| `open-above-balloon-camera-rig-kit` | wheel zoom, flight camera mode, view transitions, and listener disposal |
| `open-above-clipping-fade-kit` | near-camera clipping fade |

### Visual world and environment kits

| Kit | Services |
|---|---|
| `open-above-visual-domain` | renderer, scene, camera, world update, render, resize, state, and disposal |
| `open-above-world-generation-kit` | deterministic staged generation, work budget, state, and subscriptions |
| `open-above-world-feature-foundation-kit` | generated-world and Core World bridge |
| `open-above-quality-tier-kit` | device quality detection and tier descriptors |
| `open-above-dynamic-resolution-kit` | effective pixel ratio, frame-time sampling, scale changes, and resize |
| `open-above-physical-sky-kit` | sky shader and solar update |
| `open-above-sun-light-kit` | sun direction, color, shadows, and world position |
| `open-above-aerial-perspective-kit` | fog and aerial perspective |
| `open-above-cloud-weather-map-kit` | cloud coverage, density, wind offset, and update |
| `open-above-volumetric-cloud-kit` | cloud ray march, private scene, low-resolution target, composite, size readback, and disposal |
| `open-above-cloud-lod-kit` | cloud render scale, view/light samples, and distance budgets |
| `open-above-cloud-lighting-kit` | cloud sun and sky-fill lighting |
| `open-above-terrain-surface-kit` | terrain geometry, material, height, moisture, streaming update, and disposal |
| `open-above-terrain-streaming-contract-kit` | terrain streaming contract |
| `open-above-terrain-chunk-streaming-kit` | active terrain chunk lifecycle |
| `open-above-terrain-horizon-streaming-kit` | horizon-ring lifecycle |
| `open-above-vegetation-cluster-kit` | vegetation generation, refresh, update, and disposal |
| `open-above-grass-world-seed-kit` | deterministic grass seed |
| `open-above-grass-biome-density-kit` | biome density evaluation |
| `open-above-grass-exclusion-mask-kit` | route and object exclusions |
| `open-above-grass-patch-density-kit` | patch distribution |
| `open-above-grass-texture-atlas-kit` | grass texture atlas generation |
| `open-above-grass-chunk-placement-kit` | grass chunk placement |
| `open-above-grass-lod-kit` | grass LOD policy |
| `open-above-grass-compute-culling-kit` | grass culling and capacity policy |
| `open-above-grass-field-domain` | grass composition, update, refresh, state, and disposal |
| `open-above-flower-chunk-placement-kit` | flower placement |
| `open-above-flower-texture-atlas-kit` | flower atlas generation |
| `open-above-flower-field-domain` | flower composition, update, refresh, state, and disposal |
| `open-above-water-surface-kit` | water geometry, material, lighting, and update |
| `open-above-distant-landmark-kit` | distant landmark geometry and disposal |
| `open-above-hdr-composer-kit` | half-float targets, depth textures, RenderPass, color grade, resize, render, and disposal |
| `open-above-color-grade-kit` | HDR color grading and exposure response |
| `open-above-lens-response-kit` | sun-facing lens response |

### UI and tooling kits

| Kit | Services |
|---|---|
| `open-above-parchment-map-overlay-kit` | map drawing, keyboard toggling, interaction snapshot, animation, visibility, resize, and lifecycle |
| `open-above-headless-editor-environment` | headless inspection commands, snapshots, renderer validation, and world validation |
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
| `open-above-runtime-composer-kit` | product-domain composition |
| `open-above-keyboard-input-kit` | global keyboard command capture for burner, vent, steering, and map actions |
| `open-above-wheel-zoom-input-kit` | global wheel camera zoom |
| `open-above-parchment-map-shell-kit` | map DOM host, dialog labeling, and simulation-suspension signal |
| `open-above-error-panel-kit` | startup and runtime error projection |
| `open-above-gamehost-legacy-readback-kit` | public diagnostic readback |
| `open-above-vite-nexusengine-checkout-alias-kit` | checked-out provider alias resolution |
| `open-above-nexusengine-revision-stamp-kit` | provider revision projection |
| `open-above-campaign-source-kit` | product content, world, and route data |
| `open-above-raf-clock-adapter-kit` | browser callback scheduling, interval clipping, and delta derivation |
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

## Source-backed device-control finding

```txt
full-screen game canvas: present
canvas touch-action none: present
active keyboard flight producer: present
active wheel zoom producer: present
active M and Escape map producer: present
active pointer or touch flight producer: absent
active gamepad flight producer: absent
on-screen burner control: absent
on-screen vent control: absent
on-screen steering control: absent
on-screen map control: absent
on-screen zoom control: absent
control-profile admission result: absent
hybrid duplicate suppression: absent
FirstDeviceControlSurfaceFrameAck: absent
FirstDeviceActionEffectFrameAck: absent
```

The active required action vocabulary is:

```txt
burner
vent
steer-left
steer-right
map-toggle
map-close
camera-zoom-in
camera-zoom-out
```

The touch-only path has no source producer for any of these actions. The page disables native touch behavior on the gameplay canvas, so touch interaction is neither delegated to browser behavior nor translated into semantic game actions. This is a source-backed capability gap; no physical touch device was tested.

## Required authority

```txt
open-above-device-control-action-coverage-authority-domain
```

```txt
DeviceControlAdmissionCommand
  -> bind document runtime viewport device-capability action-map and control-generation revisions
  -> resolve one compatible ControlProfileDescriptor
  -> require burner vent steering map and camera action coverage
  -> prepare keyboard wheel pointer touch gamepad and on-screen producers
  -> publish visible controls before admitting profiles that require them
  -> route all producers into one normalized FlightActionState
  -> arbitrate pointer gesture and overlay ownership
  -> suppress duplicate hybrid-device actions
  -> cancel held actions on blur hide suspension overlay transition and runtime retirement
  -> publish DeviceControlAdmissionResult
  -> publish FirstDeviceControlSurfaceFrameAck
  -> publish FirstDeviceActionEffectFrameAck
```

## Planned authority surfaces

```txt
open-above-device-control-action-coverage-authority-domain
open-above-device-capability-observation-kit
open-above-control-profile-descriptor-kit
open-above-required-action-coverage-kit
open-above-keyboard-action-producer-kit
open-above-wheel-action-producer-kit
open-above-pointer-touch-gesture-producer-kit
open-above-gamepad-action-producer-kit
open-above-on-screen-flight-controls-kit
open-above-on-screen-map-control-kit
open-above-on-screen-camera-zoom-kit
open-above-flight-action-command-kit
open-above-flight-action-normalization-kit
open-above-control-producer-generation-kit
open-above-input-ownership-arbitration-kit
open-above-hybrid-action-deduplication-kit
open-above-gesture-cancellation-kit
open-above-overlay-control-routing-kit
open-above-device-control-result-kit
open-above-first-device-control-surface-frame-ack-kit
open-above-first-device-action-effect-frame-ack-kit
open-above-device-control-browser-fixture-kit
```

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, shaders, gameplay, packages, tests, workflows, and deployment were unchanged. Source inspection proves the active producer set and missing touch/gamepad/on-screen producers; it does not prove physical-device behavior, touch browser compatibility, action ergonomics, hybrid-input correctness, visible action convergence, artifact parity, deployed parity, or production readiness.
