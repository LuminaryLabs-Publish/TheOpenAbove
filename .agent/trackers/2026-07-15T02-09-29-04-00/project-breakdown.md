# Project Breakdown: TheOpenAbove Low-Resolution Cloud Depth Composite

**Timestamp:** `2026-07-15T02-09-29-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Selection:** runtime-ahead priority  
**Reviewed pre-audit documentation head:** `b1590e1e1e82a56f656db2954870c8252e4213c9`  
**Reviewed runtime head:** `af3f5b96f28a32b1521c6ab7227c26d0c727370b`  
**Status:** `cloud-low-resolution-composite-depth-occlusion-authority-audited`

## Summary

Two runtime commits implemented the previously documented cloud-only low-resolution path. The volumetric ray march now renders into a half-float target sized from the drawing buffer and the cloud LOD scale, then a fullscreen composite is drawn through the main HDR scene. The implementation does not produce cloud depth, consume scene depth in the shader, or perform depth-aware reconstruction. Its fullscreen plane is fixed at far depth, so all scene geometry can occlude the cloud sample even when the ray-marched cloud should be in front.

## Plan ledger

**Goal:** reconcile the runtime-ahead cloud implementation, retain its performance win, and isolate the smallest remaining depth, result, telemetry, and proof boundary.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare ten eligible repositories with ten central ledger entries.
- [x] Confirm root `.agent` state for every eligible repository.
- [x] Compare current eligible heads with recorded documentation heads.
- [x] Select only `LuminaryLabs-Publish/TheOpenAbove` because it is runtime-ahead by two commits.
- [x] Inspect both runtime commits and both changed files.
- [x] Trace the complete browser, simulation, weather, cloud, HDR, terrain-shadow, and deployment loops.
- [x] Preserve all 101 active named surfaces and their services.
- [x] Record the low-resolution services added to the existing volumetric-cloud kit.
- [x] Define the remaining cloud-depth composite authority and fixture gate.
- [x] Change documentation only.
- [ ] Implement representative cloud depth, scene-depth reconstruction, typed results, telemetry, and browser proof.

## Selection comparison

```txt
accessible Publish repositories:              11
eligible after Cavalry exclusion:              10
central ledger entries:                        10
root .agent states:                            10
new eligible repositories:                      0
ledger-missing eligible repositories:           0
root-agent-missing eligible repositories:       0
runtime-ahead eligible repositories:            1

selected: LuminaryLabs-Publish/TheOpenAbove
recorded documentation head: b1590e1e1e82a56f656db2954870c8252e4213c9
current head:                af3f5b96f28a32b1521c6ab7227c26d0c727370b
ahead by:                    2 commits
selection reason:            runtime-ahead priority
excluded:                    LuminaryLabs-Publish/TheCavalryOfRome
```

```txt
AetherVale         head matches ledger
PhantomCommand     head matches ledger
PrehistoricRush    head matches ledger
TheLongHaul        head matches ledger
MyCozyIsland       head matches ledger
IntoTheMeadow      head matches ledger
HorrorCorridor     root .agent present; concurrent documentation refresh observed
ZombieOrchard      head matches ledger
TheUnmappedHouse   head matches ledger
TheOpenAbove       runtime-ahead by two cloud-performance commits; selected
```

## Runtime changes reconciled

```txt
71f286d818d8ea8b308815f759c59b419fcfe508
  perf(clouds): render volume at LOD resolution
  -> move volume into a private cloud scene
  -> allocate RGBA HalfFloat WebGLRenderTarget
  -> size target from drawing buffer * lod.renderScale
  -> render cloud scene offscreen
  -> add fullscreen composite mesh to main scene
  -> add getRenderSize() and dispose()

af3f5b96f28a32b1521c6ab7227c26d0c727370b
  perf(clouds): composite low-resolution cloud pass
  -> call clouds.render(renderer, camera) before composer.render(dt)
  -> dispose cloud resources from visual-domain teardown
```

## Complete interaction loop

```txt
workflow and browser admission
  -> checkout product and NexusEngine provider
  -> test, Vite bundle, upload and deploy
  -> compose Core World, balloon, airstream, Air Mail and visual domains
  -> create Three.js renderer, scene, camera and HDR composer
  -> enter recursive RAF

world and gameplay update
  -> read keyboard and map input
  -> advance balloon simulation and telemetry
  -> update airstream forces and Air Mail eligibility
  -> advance staged world generation
  -> update terrain vegetation grass flowers water balloon and camera

cloud update
  -> update weather offset coverage and density
  -> update sun and sky-fill lighting
  -> center cloud sphere on camera
  -> retain quality view/light samples and renderScale

cloud offscreen render
  -> query current renderer drawing-buffer size
  -> multiply width and height by cloud LOD renderScale
  -> resize one RGBA HalfFloat target
  -> bind private cloud target
  -> clear transparent black
  -> ray march the cloud slab in a private cloud scene
  -> write accumulated cloud color and alpha
  -> restore previous target clear state and autoClear

HDR scene render
  -> composer RenderPass clears and draws the main scene
  -> opaque world geometry writes full-resolution scene depth
  -> transparent fullscreen cloud composite samples low-resolution color/alpha
  -> composite vertex forces clip-space depth to far plane
  -> fixed far-plane depth test rejects cloud behind every geometry depth < 1
  -> no cloud depth or scene-depth texture is sampled by the composite shader
  -> color grade and final HDR presentation execute
  -> dynamic resolution samples total frame time

terrain cloud-shadow path
  -> terrain fragment shader separately evaluates two procedural fbm2 cloud fields
  -> no shared cloud target depth transmittance budget or result is consumed

teardown
  -> remove composite mesh
  -> remove private cloud mesh
  -> dispose cloud and composite geometry materials and render target
  -> dispose remaining world and composer resources
```

## Domains in use

```txt
GitHub Actions provider checkout Vite build artifact and Pages deployment
browser route import map RAF clock input errors and GameHost publication
Nexus Engine telemetry and Core World composition
balloon flight telemetry camera and procedural presentation
airstream route field sampling forces visuals and debugging
Air Mail parcels routes towns delivery volumes and progress
staged world generation foundations features and landforms
terrain horizon vegetation grass flowers water and landmarks
quality-tier detection whole-scene dynamic resolution and cloud LOD
weather physical sky sun aerial perspective and volumetric clouds
private low-resolution cloud scene target and ray-march dispatch
main-scene fullscreen cloud composite and HDR color grading
scene-depth ownership cloud-depth reconstruction and occlusion policy
terrain procedural cloud shadows
parchment map UI headless inspection validation and central tracking
```

## Kit and service census

```txt
local source-backed kits:           71
runtime-implied adapters:           13
Core World provider surfaces:       17
active named surface total:        101
inactive or retired legacy:         13
planned cloud authority surfaces:   20
new named kit IDs in runtime diff:    0
new services on volumetric kit:       7
```

### Runtime and gameplay kits

| Kit | Services |
|---|---|
| `open-above-balloon-simulation-kit` | balloon state integration and flight controls |
| `open-above-balloon-telemetry-kit` | resources events telemetry and readback |
| `open-above-airstream-domain` | airstream composition and lifecycle |
| `open-above-airstream-route-kit` | route descriptors and route state |
| `open-above-airstream-sampler-kit` | route and field sampling |
| `open-above-airstream-field-kit` | spatial wind-field evaluation |
| `open-above-airstream-balloon-force-kit` | balloon force contribution |
| `open-above-airstream-visual-kit` | airstream visual descriptors and updates |
| `open-above-airstream-debug-kit` | airstream diagnostics and debug readback |
| `open-above-mail-delivery-domain` | Air Mail composition and lifecycle |
| `open-above-mail-parcel-kit` | parcel identity and state |
| `open-above-mail-route-kit` | delivery-route descriptors |
| `open-above-delivery-volume-kit` | geometric delivery eligibility |
| `open-above-delivery-progress-kit` | progress settlement and projection |
| `open-above-mail-town-kit` | town anchors and delivery metadata |

### Balloon object and presentation kits

| Kit | Services |
|---|---|
| `open-above-hot-air-balloon-object-kit` | balloon object composition |
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
| `open-above-balloon-camera-rig-kit` | flight camera and view transitions |
| `open-above-clipping-fade-kit` | near-camera clipping fade |

### Visual world and environment kits

| Kit | Services |
|---|---|
| `open-above-visual-domain` | renderer scene camera world update render and disposal |
| `open-above-world-generation-kit` | deterministic staged world generation |
| `open-above-world-feature-foundation-kit` | generated-world and Core World bridge |
| `open-above-quality-tier-kit` | device quality detection |
| `open-above-dynamic-resolution-kit` | whole-scene resolution control |
| `open-above-physical-sky-kit` | sky shader and solar update |
| `open-above-sun-light-kit` | sun light direction color and shadow state |
| `open-above-aerial-perspective-kit` | fog and aerial perspective |
| `open-above-cloud-weather-map-kit` | cloud coverage density wind and offsets |
| `open-above-volumetric-cloud-kit` | cloud ray march private scene low-resolution target composite size readback and disposal |
| `open-above-cloud-lod-kit` | render scale sample and distance budgets |
| `open-above-cloud-lighting-kit` | cloud sun and sky-fill lighting |
| `open-above-terrain-surface-kit` | terrain geometry material height and updates |
| `open-above-terrain-streaming-contract-kit` | terrain streaming contract |
| `open-above-terrain-chunk-streaming-kit` | active terrain chunk lifecycle |
| `open-above-terrain-horizon-streaming-kit` | horizon-ring lifecycle |
| `open-above-vegetation-cluster-kit` | vegetation generation refresh and disposal |
| `open-above-grass-world-seed-kit` | deterministic grass seed |
| `open-above-grass-biome-density-kit` | biome density evaluation |
| `open-above-grass-exclusion-mask-kit` | route and object exclusions |
| `open-above-grass-patch-density-kit` | patch distribution |
| `open-above-grass-texture-atlas-kit` | grass texture atlas generation |
| `open-above-grass-chunk-placement-kit` | grass chunk placement |
| `open-above-grass-lod-kit` | grass LOD policy |
| `open-above-grass-compute-culling-kit` | grass culling and capacity policy |
| `open-above-grass-field-domain` | grass composition update refresh and disposal |
| `open-above-flower-chunk-placement-kit` | flower placement |
| `open-above-flower-texture-atlas-kit` | flower atlas generation |
| `open-above-flower-field-domain` | flower composition update refresh and disposal |
| `open-above-water-surface-kit` | water geometry material and update |
| `open-above-distant-landmark-kit` | distant landmark geometry and disposal |
| `open-above-hdr-composer-kit` | HDR RenderPass composer and resizing |
| `open-above-color-grade-kit` | color grading and exposure response |
| `open-above-lens-response-kit` | sun-facing lens response |

### UI and tooling kits

| Kit | Services |
|---|---|
| `open-above-parchment-map-overlay-kit` | map drawing interaction and lifecycle |
| `open-above-headless-editor-environment` | headless inspection commands and snapshots |
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
| `open-above-vite-nexusengine-checkout-alias-kit` | local provider alias resolution |
| `open-above-nexusengine-revision-stamp-kit` | provider revision projection |
| `open-above-campaign-source-kit` | product content and route data |
| `open-above-raf-clock-adapter-kit` | browser frame scheduling |
| `open-above-pages-deploy-kit` | Pages artifact publication |

### Core World surfaces

| Surface | Services |
|---|---|
| `n-world-domain` | world-domain composition |
| `world-builder-runtime-kit` | world runtime builder |
| `n-world-foundation-domain` | foundation composition |
| `foundation-definition-kit` | foundation descriptors |
| `foundation-composition-kit` | foundation merge and ordering |
| `foundation-sampling-kit` | foundation sampling |
| `foundation-cell-resolution-kit` | cell resolution |
| `n-world-feature-domain` | feature composition |
| `feature-registry-kit` | feature registration |
| `feature-lifecycle-kit` | feature lifecycle |
| `feature-query-kit` | feature queries |
| `feature-composition-kit` | feature contribution composition |
| `n-world-landform-feature-domain` | landform composition |
| `mountain-feature-kit` | mountain contributions |
| `canyon-feature-kit` | canyon contributions |
| `cliff-feature-kit` | cliff contributions |
| `plateau-feature-kit` | plateau contributions |

## Source-backed findings

```txt
cloud renderScale consumed: yes
private cloud scene: yes
cloud-only color target: yes
color target type: RGBA HalfFloat
color target scale: renderer drawing buffer * LOD renderScale
cloud target depthBuffer: false
separate transmittance target: no
representative cloud-depth target: no
scene-depth texture sampled by composite: no
edge-aware or bilateral upscale: no
composite clip-space depth: fixed far plane z = w
composite depth test: enabled
cloud/geometry relative-depth comparison: absent
explicit cloud render before composer: yes
cloud resources disposed: yes
target dimensions readback: getRenderSize()
typed CloudFrameResult: no
GPU timing receipt: no
FirstVisibleCloudFrameAck: no
terrain cloud shadows governed by cloud target: no
combined commit statuses: none returned
```

## Main authority gap

The low-resolution target is real, but the composite is not cloud-depth-aware. The shader samples only low-resolution color and alpha. Its fullscreen geometry is placed at far depth, so opaque scene geometry wins the depth test regardless of whether the cloud ray accumulated in front of that geometry. This can place all terrain, mountains, balloon geometry, ropes, towns and vegetation in front of clouds instead of comparing scene depth with representative cloud depth.

This is a source-permitted occlusion path. No browser screenshot, GPU capture or depth probe was executed.

## Required authority

```txt
open-above-cloud-low-resolution-depth-upscale-authority-domain
```

```txt
CloudDepthCompositeCommand
  -> bind FrameId renderer generation quality viewport DPR weather camera and scene-depth revisions
  -> admit one low-resolution target generation
  -> ray march color transmittance and representative cloud depth
  -> publish executed scale and view/light sample receipts
  -> reconstruct low-resolution cloud samples against linear scene depth
  -> compare cloud and geometry depth in one explicit coordinate space
  -> preserve clouds in front of farther geometry
  -> reject bleeding across nearer terrain balloon rope town and vegetation silhouettes
  -> composite into HDR before color grading
  -> classify Full Reduced ColorOnly FarDepthFallback Disabled or Rejected
  -> publish CloudFrameResult target timing pass fallback and retirement receipts
  -> publish FirstVisibleCloudFrameAck

TerrainCloudShadowCommand
  -> bind the same weather quality and frame revisions
  -> admit procedural cached or disabled shadow policy
  -> publish TerrainCloudShadowResult and cost receipts
```

## Validation boundary

Documentation only. Runtime source, shaders, tests, packages, workflow and deployment were not changed by this audit. Source inspection proves the low-resolution target exists and the depth-aware reconstruction does not. It does not prove a visual defect, a performance improvement, visual equivalence, GPU timing, artifact parity or production readiness.
