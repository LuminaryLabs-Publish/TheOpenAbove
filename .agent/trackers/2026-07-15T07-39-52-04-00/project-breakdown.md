# Project Breakdown: TheOpenAbove HDR Dynamic-Resolution Depth Size Coherence

**Timestamp:** `2026-07-15T07-39-52-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Selection:** oldest synchronized eligible repository  
**Reviewed documentation head:** `1417c80309218c7c61def3b2f09a977eaab8b953`  
**Status:** `hdr-dynamic-resolution-depth-attachment-size-coherence-authority-audited`

## Summary

TheOpenAbove was selected after the full 11-repository Publish inventory matched the ten eligible central ledgers and root `.agent` states, no eligible runtime was ahead, and the prior selection record identified TheOpenAbove as the next-oldest synchronized repository. The active HDR resize path derives an effective pixel ratio and sizes EffectComposer color targets in physical pixels, then the local HDR helper rewrites the two independent depth texture images to unscaled CSS viewport dimensions. Color and depth attachment dimensions are therefore not guaranteed coherent whenever the effective pixel ratio differs from `1`.

## Plan ledger

**Goal:** document one authoritative render-surface resize transaction that preserves all gameplay and world ownership while making HDR color targets, depth attachments, pass sizes, cloud sizing, target retirement, telemetry, and the first visible frame consume one physical render-surface generation.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare ten eligible repositories with ten central ledger entries.
- [x] Confirm root `.agent` state for every eligible repository.
- [x] Confirm no new, ledger-missing, root-agent-missing, undocumented, or runtime-ahead priority case.
- [x] Select only `LuminaryLabs-Publish/TheOpenAbove` using the oldest synchronized rule.
- [x] Trace the browser, gameplay, world, resize, cloud, HDR, presentation, and deployment loops.
- [x] Identify all domains, kits, adapters, providers, and offered services.
- [x] Preserve all 101 active named surfaces.
- [x] Inspect Three.js `EffectComposer` r165 sizing behavior used by the pinned CDN import.
- [x] Define the HDR render-target depth-size coherence authority and fixture gate.
- [x] Change documentation only.
- [ ] Implement and execute exact attachment-size, framebuffer, browser, artifact, and Pages fixtures.

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
prior central timestamp: 2026-07-15T02-09-29-04-00
previous selection record: HorrorCorridor at 2026-07-15T07-00-28-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

```txt
TheLongHaul        ledger present root .agent present synchronized
IntoTheMeadow      ledger present root .agent present synchronized
HorrorCorridor     ledger present root .agent present synchronized
AetherVale         ledger present root .agent present synchronized
ZombieOrchard      ledger present root .agent present synchronized
TheUnmappedHouse   ledger present root .agent present synchronized
MyCozyIsland       ledger present root .agent present synchronized
TheOpenAbove       ledger present root .agent present synchronized selected oldest
PhantomCommand     ledger present root .agent present synchronized
PrehistoricRush    ledger present root .agent present synchronized
TheCavalryOfRome   explicitly excluded
```

## Complete interaction loop

```txt
workflow and browser admission
  -> checkout product and NexusEngine provider
  -> execute checks build artifact upload and Pages deployment
  -> load route import map canvas map shell and error surface
  -> compose telemetry Core World balloon airstream Air Mail visual and UI domains

visual construction
  -> detect quality tier from memory cores pointer and viewport
  -> create Three.js renderer scene and perspective camera
  -> create staged world terrain vegetation grass flowers water and landmarks
  -> create weather sky sun aerial perspective and low-resolution clouds
  -> create HDR half-float target EffectComposer RenderPass and color grade
  -> replace composer target depth textures with two independent depth textures
  -> create dynamic-resolution controller

initial or browser resize
  -> read CSS viewport width and height
  -> update camera aspect and projection
  -> derive capped device DPR * dynamic scale
  -> set renderer pixel ratio and drawing-buffer size
  -> set composer pixel ratio and size
  -> composer color targets use CSS dimensions * effective pixel ratio
  -> invoke local HDR resize helper
  -> helper calls composer setSize again
  -> helper rewrites both independent depth textures to CSS dimensions

frame update
  -> read keyboard map and camera input
  -> update balloon simulation airstream Air Mail and telemetry
  -> advance staged world generation
  -> update terrain vegetation grass flowers water balloon camera weather sky sun and lens
  -> update NexusEngine truth

frame render
  -> render cloud scene into cloud target sized from renderer drawing buffer * cloud LOD scale
  -> render main HDR scene through EffectComposer color/depth attachments
  -> apply color grade and present
  -> sample total frame time
  -> optionally change dynamic scale and resize the renderer/composer

teardown
  -> stop world subscriptions and listeners
  -> dispose cloud world and composer resources
```

## Domains in use

```txt
GitHub workflow provider checkout Vite build artifact and Pages deployment
browser route import map lifecycle RAF input resize errors and GameHost
Nexus Engine telemetry and Core World composition
balloon simulation telemetry object presentation camera clipping and model lifecycle
airstream route field sampling forces visuals and diagnostics
Air Mail parcel route town volume progress and completion
staged world generation foundation features landforms and sampling
terrain horizon vegetation grass flowers water and landmarks
quality detection DPR policy dynamic resolution and render-surface sizing
weather physical sky sun aerial perspective cloud lighting and ray marching
cloud target dispatch low-resolution composite and lifecycle
HDR half-float color targets independent depth attachments RenderPass and color grading
parchment map headless inspection tests and central tracking
```

## Kit and service census

```txt
local source-backed kits:           71
runtime-implied adapters:           13
Core World provider surfaces:       17
active named surface total:        101
inactive or retired legacy:         13
planned HDR coherence surfaces:     18
new named runtime kit IDs:           0
```

### Runtime and gameplay kits

| Kit | Services |
|---|---|
| `open-above-balloon-simulation-kit` | balloon state integration flight controls terrain contact and snapshot |
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
| `open-above-delivery-progress-kit` | progress settlement completion and projection |
| `open-above-mail-town-kit` | town anchors geometry and delivery metadata |

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
| `open-above-parchment-map-overlay-kit` | map drawing interaction snapshot animation and lifecycle |
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
| `open-above-parchment-map-shell-kit` | map DOM host |
| `open-above-error-panel-kit` | startup and runtime error projection |
| `open-above-gamehost-legacy-readback-kit` | public diagnostic readback |
| `open-above-vite-nexusengine-checkout-alias-kit` | checked-out provider alias resolution |
| `open-above-nexusengine-revision-stamp-kit` | provider revision projection |
| `open-above-campaign-source-kit` | product content world and route data |
| `open-above-raf-clock-adapter-kit` | browser frame scheduling and delta derivation |
| `open-above-pages-deploy-kit` | Pages build artifact and publication |

### Core World surfaces

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

## Source-backed findings

```txt
quality pixel-ratio caps: high 1.60 medium 1.35 low 1.05
initial dynamic scales: high 1.00 medium 0.86 low 0.72
dynamic scale floor: 0.62
sample interval: 90 frames
effective ratio: min(devicePixelRatio, tier cap) * dynamic scale
composer color target size rule: CSS dimensions * composer pixel ratio
independent depth attachments: 2
local HDR depth resize rule: CSS dimensions
visual resize order: dynamic resolution resize then local HDR resize
color/depth shared descriptor: absent
color/depth equality check: absent
framebuffer completeness fixture: absent
render-surface generation: absent
RenderSurfaceResizeResult: absent
FirstHdrResizeFrameAck: absent
combined commit statuses: none returned
```

## Main authority gap

The renderer and EffectComposer use one derived effective pixel ratio, but the local HDR helper independently rewrites depth texture image dimensions after composer target sizing. The accepted color target dimensions and depth attachment dimensions are therefore not represented by one immutable descriptor, validated together, adopted together, or correlated with a visible frame.

This is a source-backed size-coherence path. No incomplete framebuffer, WebGL error, visual defect, or performance impact was reproduced.

## Required authority

```txt
open-above-hdr-render-target-depth-size-coherence-authority-domain
```

```txt
RenderSurfaceResizeCommand
  -> bind ViewportRevision RendererGeneration ComposerGeneration QualityRevision DynamicScaleRevision and ContextRevision
  -> derive one CSS size effective pixel ratio and physical size
  -> prepare both half-float composer color targets
  -> prepare both unsigned-int depth attachments at identical physical dimensions
  -> validate formats filters samples pass sizes and ownership
  -> atomically adopt RenderSurfaceGeneration or preserve the accepted predecessor
  -> publish color depth pass and cloud-size receipts
  -> retire replaced targets and attachments exactly once
  -> reject late work from retired generations
  -> publish RenderSurfaceResizeResult
  -> publish FirstHdrResizeFrameAck
```

## Validation boundary

Documentation only. Runtime JavaScript, shaders, gameplay, tests, packages, workflow, and deployment were not changed. Source inspection proves the independent sizing paths exist; it does not prove an actual framebuffer failure, visual corruption, performance cost, attachment correctness, artifact parity, deployed parity, or production readiness.