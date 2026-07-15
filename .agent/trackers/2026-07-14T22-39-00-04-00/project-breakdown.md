# Project Breakdown: Cloud Low-Resolution Rendering and Depth-Aware Upscale

**Timestamp:** `2026-07-14T22-39-00-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Reviewed repository head:** `e407aa0c8ae98406f467e05c0fadfff988bdd304`  
**Reviewed runtime revision:** `0d9ea6f6f977b63d09f22f8ae36107bfccd81811`  
**Status:** `cloud-low-resolution-depth-upscale-authority-audited`

## Summary

The cloud LOD profile declares a cloud-only render scale of 0.50, 0.42 or 0.32, but the active renderer never consumes that value. The camera-centered, non-culled volumetric sphere is rendered by the main HDR scene pass at the same resolution as the rest of the world, while whole-scene dynamic resolution is the only resolution control.

## Plan ledger

**Goal:** make the declared cloud LOD scale executable by separating volumetric clouds from the full-resolution world pass, then bind target allocation, ray-march budget, depth-aware upscale, fallback choice and visible-frame proof into one versioned result.

- [x] Enumerate all 11 current `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central-ledger entries and root `.agent` states.
- [x] Compare every eligible current head with its recorded repo-local documentation head.
- [x] Confirm zero new, missing, undocumented, root-agent-missing or runtime-ahead candidates.
- [x] Select only `LuminaryLabs-Publish/TheOpenAbove` by the oldest synchronized timestamp.
- [x] Trace quality detection, cloud LOD, volumetric shader, visual composition, HDR composer, dynamic resolution and terrain cloud shadows.
- [x] Identify the complete interaction loop, domains, all kits and offered services.
- [x] Preserve the complete 101-surface active inventory.
- [x] Add a timestamped tracker, turn ledger and cloud-specific audit family.
- [x] Change documentation only.
- [ ] Implement and execute cloud target, upscale, fallback and browser fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new eligible repositories: 0
central-ledger missing: 0
root-agent missing: 0
runtime-ahead candidates: 0
selected: LuminaryLabs-Publish/TheOpenAbove
selection reason: oldest synchronized central documentation timestamp
selected prior timestamp: 2026-07-14T17-39-01-04-00
next oldest: AetherVale at 2026-07-14T17-58-14-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
workflow and browser admission
  -> checkout product and NexusEngine provider
  -> test, bundle, upload and deploy
  -> compose Core World, balloon, mail and visual domains
  -> create one Three.js scene and HDR composer
  -> enter recursive RAF

cloud frame
  -> detect high, medium or low quality tier
  -> create cloud LOD profile with renderScale, viewSamples and lightSamples
  -> create camera-centered sphere with frustumCulled=false
  -> attach ray-marched transparent cloud material directly to the main scene
  -> update weather, lighting and camera-centered sphere
  -> HDR RenderPass draws terrain, vegetation, balloon and clouds together
  -> cloud fragment shader marches up to the tier view-sample count
  -> each occupied sample launches up to the tier light-sample count
  -> color-grade pass composites the same full-scene target
  -> whole-scene dynamic resolution may resize renderer and composer every 90 samples

terrain shadow path
  -> terrain material runs two procedural fbm2 cloud fields per terrain fragment
  -> shadow cost is independent of cloud LOD renderScale
  -> no cloud-only target, scene-depth input or depth-aware upscaler exists
```

## Domains in use

```txt
GitHub workflow, checked-out provider, Vite build and Pages deployment
browser route, RAF clock, input, errors and GameHost publication
Nexus Engine telemetry and Core World composition
balloon flight, airstream and Air Mail gameplay
world generation, terrain, vegetation, grass and flowers
quality-tier detection and whole-scene dynamic resolution
weather, physical sky, sun, aerial perspective and volumetric clouds
cloud ray marching, lighting, LOD descriptors and terrain cloud shadows
HDR scene rendering, color grading, depth textures and visible-frame evidence
balloon, camera, parchment map and UI presentation
validation, repo-local audit governance and central tracking
```

## Implemented kit and adapter census

```txt
local source-backed kits:     71
runtime-implied adapters:     13
Core World provider surfaces: 17
active documented total:     101
inactive or retired legacy:   13
planned cloud authority:      20
```

### Runtime and gameplay kits, 15

```txt
open-above-balloon-simulation-kit
open-above-balloon-telemetry-kit
open-above-airstream-domain
open-above-airstream-route-kit
open-above-airstream-sampler-kit
open-above-airstream-field-kit
open-above-airstream-balloon-force-kit
open-above-airstream-visual-kit
open-above-airstream-debug-kit
open-above-mail-delivery-domain
open-above-mail-parcel-kit
open-above-mail-route-kit
open-above-delivery-volume-kit
open-above-delivery-progress-kit
open-above-mail-town-kit
```

### Balloon object and presentation kits, 15

```txt
open-above-hot-air-balloon-object-kit
open-above-balloon-envelope-profile-kit
open-above-balloon-envelope-panel-kit
open-above-balloon-mouth-kit
open-above-balloon-streamer-fit-kit
open-above-balloon-fabric-seam-kit
open-above-hot-air-balloon-basket-kit
open-above-hot-air-balloon-rigging-kit
open-above-hot-air-balloon-burner-kit
open-above-rope-kit
open-above-balloon-presentation-domain
open-above-envelope-fabric-material-kit
open-above-basket-material-kit
open-above-balloon-camera-rig-kit
open-above-clipping-fade-kit
```

### Visual, world and environment kits, 34

```txt
open-above-visual-domain
open-above-world-generation-kit
open-above-world-feature-foundation-kit
open-above-quality-tier-kit
open-above-dynamic-resolution-kit
open-above-physical-sky-kit
open-above-sun-light-kit
open-above-aerial-perspective-kit
open-above-cloud-weather-map-kit
open-above-volumetric-cloud-kit
open-above-cloud-lod-kit
open-above-cloud-lighting-kit
open-above-terrain-surface-kit
open-above-terrain-streaming-contract-kit
open-above-terrain-chunk-streaming-kit
open-above-terrain-horizon-streaming-kit
open-above-vegetation-cluster-kit
open-above-grass-world-seed-kit
open-above-grass-biome-density-kit
open-above-grass-exclusion-mask-kit
open-above-grass-patch-density-kit
open-above-grass-texture-atlas-kit
open-above-grass-chunk-placement-kit
open-above-grass-lod-kit
open-above-grass-compute-culling-kit
open-above-grass-field-domain
open-above-flower-chunk-placement-kit
open-above-flower-texture-atlas-kit
open-above-flower-field-domain
open-above-water-surface-kit
open-above-distant-landmark-kit
open-above-hdr-composer-kit
open-above-color-grade-kit
open-above-lens-response-kit
```

### UI and tooling kits, 7

```txt
open-above-parchment-map-overlay-kit
open-above-headless-editor-environment
open-above-static-smoke-test-kit
open-above-airstream-mail-test-kit
open-above-world-flora-test-kit
open-above-world-feature-foundation-test-kit
open-above-world-domain-composition-test-kit
```

### Runtime-implied adapters, 13

```txt
open-above-route-shell-kit
open-above-importmap-kit
open-above-runtime-composer-kit
open-above-keyboard-input-kit
open-above-wheel-zoom-input-kit
open-above-parchment-map-shell-kit
open-above-error-panel-kit
open-above-gamehost-legacy-readback-kit
open-above-vite-nexusengine-checkout-alias-kit
open-above-nexusengine-revision-stamp-kit
open-above-campaign-source-kit
open-above-raf-clock-adapter-kit
open-above-pages-deploy-kit
```

### Core World provider surfaces, 17

```txt
n-world-domain
world-builder-runtime-kit
n-world-foundation-domain
foundation-definition-kit
foundation-composition-kit
foundation-sampling-kit
foundation-cell-resolution-kit
n-world-feature-domain
feature-registry-kit
feature-lifecycle-kit
feature-query-kit
feature-composition-kit
n-world-landform-feature-domain
mountain-feature-kit
canyon-feature-kit
cliff-feature-kit
plateau-feature-kit
```

## Services offered

```txt
runtime and gameplay
  balloon integration, telemetry, airstream route/field/force/visual/debug
  parcel, route, town, delivery-volume and delivery-progress services

balloon presentation
  envelope profile/panels/mouth/streamers/seams
  basket, rigging, burner, rope, materials, camera and clipping

world and environment
  staged world generation and Core World feature/foundation composition
  terrain/horizon streaming, vegetation, grass and flower placement/LOD/culling
  sky, sun, atmosphere, weather, clouds, water, landmarks, HDR and lens response

cloud path
  weather offset, coverage and density evolution
  tier sample budgets and declared cloud render scale
  camera-centered volumetric slab ray march and internal sun transmittance
  terrain procedural cloud-shadow modulation

host, proof and deployment
  route shell, import map, keyboard/wheel input, RAF, errors and GameHost
  headless/source tests, provider alias/revision stamp, Vite build and Pages deploy
```

## Source-backed cloud finding

`createCloudLodProfile()` publishes `renderScale`, `viewSamples`, `lightSamples`, `temporalJitter`, `maxDistance` and `fallbackImpostors`. `createVolumetricClouds()` consumes only the view and light sample counts. The cloud mesh is inserted directly into the main scene, follows the camera, disables frustum culling and has no cloud-only target or compositor.

`createHdrComposer()` owns one `RenderPass(scene, camera)` followed by color grading. The same scene pass therefore draws clouds with terrain, vegetation, balloon and other world geometry. `createDynamicResolutionController()` changes the renderer and composer pixel ratio together, so it reduces the complete frame rather than honoring the cloud-specific scale.

The terrain material separately evaluates two `fbm2` fields for soft cloud shadows on each terrain fragment. That path does not consume the cloud LOD profile or publish a cost/result receipt.

## Main findings

```txt
declared cloud renderScale: high 0.50, medium 0.42, low 0.32
renderScale consumed by cloud renderer: no
cloud-only render target: absent
cloud-only depth/transmittance target: absent
depth-aware upscaler: absent
temporal history/reprojection: absent
fallback impostors: false
cloud sphere radius: 4050
cloud sphere frustum culling: disabled
maximum shader view loop: 48
quality view samples: 36 / 26 / 14
maximum shader light loop: 8
quality light samples: 6 / 4 / 2
main HDR path: one RenderPass for the complete scene
active resolution control: whole-scene dynamic resolution
terrain shadow path: two fbm2 evaluations per terrain fragment
cloud pass timing/result receipt: absent
first cloud frame acknowledgement: absent
```

This is a source-backed execution gap. No GPU timing or visible quality regression was measured during this audit.

## Required parent domain

```txt
open-above-cloud-low-resolution-depth-upscale-authority-domain
```

## Required transactions

```txt
CloudFrameAdmissionCommand
  -> bind FrameId, renderer generation, quality tier, viewport, DPR, weather and camera revisions
  -> validate one CloudLodProfileRevision
  -> allocate cloud color, transmittance and depth candidates at the declared cloud render scale
  -> execute the admitted view/light sample budget
  -> optionally adopt motion-aware temporal history
  -> depth-aware upscale against the accepted scene-depth revision
  -> composite clouds into the HDR scene in explicit order
  -> classify full, reduced, impostor, disabled or rejected execution
  -> publish CloudFrameResult with target, timing, pass and fallback receipts
  -> publish FirstVisibleCloudFrameAck

TerrainCloudShadowCommand
  -> bind the same weather and quality revisions
  -> admit procedural, cached-texture or disabled shadow policy
  -> publish TerrainCloudShadowResult and cost receipts
  -> prevent an untracked shadow path from bypassing the cloud budget
```

## Required fixture matrix

```txt
high/medium/low profile -> exact target dimensions and sample budgets
renderScale 0.50/0.42/0.32 -> cloud-only target changes, main scene target unchanged
cloud target + scene depth -> edge-preserving upscale at terrain and balloon silhouettes
camera motion -> history accepted or reset deterministically
coverage zero -> early skip or bounded minimal path
full/reduced/impostor/disabled -> explicit result classification
terrain shadow policy -> procedural/cached/disabled receipt
resize and DPR change -> old targets retired, new generation admitted
source, built artifact and Pages -> matching CloudFrameResult and visible frame
```

## Validation boundary

Documentation only. Source, configuration and current combined-status surfaces were inspected. No runtime JavaScript, shader, rendering, tests, packages, workflow or deployment implementation changed. No browser, GPU-timing, build-artifact or Pages fixture was executed.
