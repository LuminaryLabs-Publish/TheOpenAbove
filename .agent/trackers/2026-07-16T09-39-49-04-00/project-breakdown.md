# Project Breakdown: TheOpenAbove Atmosphere Reference-to-Runtime Traceability

**Timestamp:** `2026-07-16T09-39-49-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Selection:** runtime-ahead / recently added undocumented reference asset  
**Reviewed pre-audit repository head:** `74c782c6074a90127e544c0ce537ac0a2d93aa18`  
**Reviewed runtime source revision:** `1417c80309218c7c61def3b2f09a977eaab8b953`  
**Status:** `atmosphere-reference-layer-runtime-traceability-authority-audited`

## Summary

The current Publish inventory contains 11 repositories. Ten are eligible after excluding `TheCavalryOfRome`; all ten retain central ledger and root `.agent` coverage. Nine eligible heads match their documented repo-local heads. TheOpenAbove is the only eligible repository ahead of its ledger because commit `74c782c6` added `reference-images/persistent-sparse-clouds-implementation-plan.svg` after the previous central reconciliation.

The new asset defines a target of persistent sparse cloud and fog layers at ground, low/mid, high and cirrus altitudes. The executable runtime still owns one weather state, one volumetric cloud shell from 360 to 960 world units, one global aerial-fog equation and landform-only Core World feature registration. The reference names an `atmosphere-layer-controller` and atmosphere feature types that do not exist in the product runtime or the current provider inventory. The gap is traceability and admission: the image is useful design evidence, but no manifest classifies which named modules are implemented, planned, provider-backed or unsupported.

## Plan ledger

**Goal:** make the new atmosphere reference an explicit, versioned design contract whose layer requirements and module names can be compared with executable runtime and provider capabilities without treating the image itself as code.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare ten eligible current heads with ten central repo ledgers.
- [x] Confirm TheOpenAbove is the only runtime-ahead/recently undocumented eligible repository.
- [x] Select only `LuminaryLabs-Publish/TheOpenAbove`.
- [x] Inspect the new SVG reference, visual composition, cloud weather, volumetric cloud, cloud LOD, aerial perspective, campaign world features and Nexus Engine composition.
- [x] Identify the complete interaction loop, domains, kits, adapters, provider surfaces and offered services.
- [x] Preserve all 101 active named runtime surfaces.
- [x] Define one parent traceability authority and 19 coordinating surfaces.
- [x] Change documentation only.
- [ ] Implement an atmosphere-layer manifest, capability bridge, runtime adoption and executable altitude-sweep fixtures.

## Selection comparison

```txt
accessible Publish repositories:        11
eligible after Cavalry exclusion:        10
central ledger entries:                  10
root .agent states:                      10
new or ledger-missing:                    0
root-agent-missing:                       0
undocumented before head comparison:      0
runtime-ahead / recently undocumented:    1

selected: LuminaryLabs-Publish/TheOpenAbove
current head: 74c782c6074a90127e544c0ce537ac0a2d93aa18
ledger repo-local head: 7326e39ed91cacb129265b1ecb49aac1f150b38e
new surface: reference-images/persistent-sparse-clouds-implementation-plan.svg
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

Nine other eligible current heads match their central ledger repo-local heads:

```txt
IntoTheMeadow    fd198200bd6236c67f0c5f36bb773d008a58b331
TheLongHaul      dbd276e894cf3960d0305cfe46bab95ef01d4253
HorrorCorridor   dfe7373884265a2c8e4e9d828e11fff22bf6b2cd
AetherVale       bcc0528e07ce3096d52aa5e708db62a192ba9acf
ZombieOrchard    a2aac9087465d1f85fe26754b218e55f67b4d789
TheUnmappedHouse a90e7e4fa7da0ecfe0863236608d0a397a9dad7d
MyCozyIsland     ba23c6462e120fd0673347e8a039f10941cf6fb7
PhantomCommand   10cd797325f0b20652e7dff780b5046c2909c71b
PrehistoricRush  e83638abab425dc3c54370ad6c3fab17576c3d13
```

## Complete interaction loop

```txt
workflow and browser admission
  -> checkout product and NexusEngine provider
  -> run checks, Vite build, artifact upload and Pages deployment
  -> load route shell, canvas, map overlay and error panel

boot
  -> create Core World foundation, feature and landform domains
  -> register WORLD.features.landforms only
  -> create visual domain, generated world, renderer and camera
  -> create one cloud weather state
  -> create one volumetric cloud layer and one aerial fog field
  -> load balloon, Air Mail, airstream, simulation, map and camera
  -> request flight RAF

visible flight frame
  -> update cloud weather coverage, density and wind offset
  -> update one volumetric cloud shell at 360..960 world units
  -> update global aerial fog from camera altitude and cloud coverage
  -> update terrain, grass, flowers, water, balloon and camera
  -> render cloud target, composite and HDR frame

new reference asset
  -> describes ground fog, low/mid cumulus, high clouds and cirrus
  -> names cloud/fog/visibility atmosphere features
  -> names a new atmosphere-layer-controller
  -> is not loaded, parsed, versioned or compared with runtime capabilities

current settlement
  -> design intent exists as an SVG
  -> executable runtime remains a single-layer atmosphere
  -> no typed implemented/planned/unsupported result exists
  -> no first reference-bound atmosphere frame acknowledgement exists
```

## Domains in use

```txt
GitHub workflow, checked-out provider, Vite build, artifact and Pages deployment
browser route, import map, RAF, resize, input, map and GameHost
balloon simulation, telemetry, presentation, camera and clipping
airstream routes, sampling, fields, forces, visuals and diagnostics
Air Mail parcels, routes, towns, delivery volumes, progress and completion
Nexus Engine Core World foundation, features and landforms
staged world generation, terrain, vegetation, grass, flowers, water and landmarks
quality, dynamic resolution, sky, sun, aerial perspective, cloud weather, volumetric clouds, HDR and color grading
reference asset identity, atmosphere-layer manifest, capability classification and design/runtime traceability
browser altitude-sweep, visual-frame acknowledgement, build/artifact/Pages proof and central tracking
```

## Kit and service census

```txt
local source-backed kits:                 71
runtime-implied adapters:                 13
Core World provider surfaces:             17
active named runtime surface total:      101
new non-runtime reference asset:           1
inactive or retired legacy surfaces:      13
planned traceability surfaces:            20
new implemented runtime kit IDs:           0
```

### Runtime and gameplay kits

| Kit | Services |
|---|---|
| `open-above-balloon-simulation-kit` | flight integration, held-key consumption, buoyancy, venting, steering, airstream force, terrain contact, elapsed time, distance, snapshots and disposal |
| `open-above-balloon-telemetry-kit` | Nexus Engine resources, events, visual snapshots, Core World composition and feature registration |
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
| `open-above-aerial-perspective-kit` | global exponential fog, altitude clearing, cloud-coverage density boost and sun warmth |
| `open-above-cloud-weather-map-kit` | one coverage value, one density value, wind offset and time update |
| `open-above-volumetric-cloud-kit` | one 360..960 cloud shell, raymarch shader, low-resolution half-float target, composite, render-size readback and disposal |
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
| `open-above-grass-lod-kit` | LOD policy |
| `open-above-grass-compute-culling-kit` | culling and capacity policy |
| `open-above-grass-field-domain` | grass composition, update, refresh, state and disposal |
| `open-above-flower-chunk-placement-kit` | flower placement |
| `open-above-flower-texture-atlas-kit` | procedural flower atlas generation |
| `open-above-flower-field-domain` | flower composition, update, refresh, state and disposal |
| `open-above-water-surface-kit` | water geometry, material, lighting and update |
| `open-above-distant-landmark-kit` | landmark geometry and disposal |
| `open-above-hdr-composer-kit` | half-float targets, depth textures, RenderPass, color grade, resize, render and disposal |
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

## Source-backed reference/runtime finding

```txt
reference asset: present
reference revision identity in runtime: absent
four altitude layers in reference: present
runtime volumetric layers: one
runtime cloud base/top: 360 / 960
runtime global aerial fog: present
runtime ground-fog layer descriptor: absent
runtime high-cloud descriptor: absent
runtime cirrus descriptor: absent
runtime sparse density floors per layer: absent
terrain/moisture-to-atmosphere bridge: absent
Core World atmosphere family: absent from installed provider surfaces
WORLD.features atmosphere entries: absent
atmosphere-layer-controller: absent
implemented/planned/unsupported classification: absent
AtmosphereReferenceAdmissionResult: absent
FirstReferenceBoundAtmosphereFrameAck: absent
```

The SVG is a design artifact, not executable proof. It accurately names existing `cloud-weather-map-kit`, `volumetric-cloud-kit` and `aerial-perspective-kit`, while `cloud-composite-pass` is currently embedded inside `open-above-volumetric-cloud-kit` rather than exposed as its own kit. The proposed `atmosphere-layer-controller` and the atmosphere feature family are not implemented in this repository. The runtime registers only `WORLD.features.landforms`, and the checked-in world configuration contains only one mountain feature.

No claim is made that the current cloud composite visibly fails in a browser. The source-backed issue is that the new target cannot be mechanically compared with the implementation, and the design asset does not identify which requirements are authoritative, planned or merely illustrative.

## Required authority

`open-above-atmosphere-reference-layer-runtime-traceability-authority-domain`

```txt
AtmosphereReferenceAdmissionCommand
  -> bind reference asset, product release, runtime source, world config and provider revisions
  -> normalize one immutable AtmosphereLayerManifest
  -> classify every named module as implemented, embedded, provider-backed, planned, unsupported or stale
  -> define ground-fog, low/mid-cumulus, high-cloud and cirrus layer descriptors
  -> bind sparse density floors, altitude bands, terrain/moisture dependencies and wind policy
  -> reject unresolved identifiers and incompatible capability claims
  -> publish AtmosphereReferenceAdmissionResult

AtmosphereLayerAdoptionCommand
  -> bind an accepted manifest and expected visual/world generations
  -> stage runtime/provider bridges without creating duplicate truth owners
  -> publish an explicit adopted, partial, deferred or rejected result
  -> render one matching atmosphere frame
  -> publish FirstReferenceBoundAtmosphereFrameAck
```

## Planned traceability surfaces

```txt
open-above-atmosphere-reference-layer-runtime-traceability-authority-domain
open-above-reference-asset-revision-kit
open-above-atmosphere-layer-manifest-kit
open-above-reference-module-classification-kit
open-above-ground-fog-layer-profile-kit
open-above-low-mid-cumulus-layer-profile-kit
open-above-high-cloud-layer-profile-kit
open-above-cirrus-layer-profile-kit
open-above-sparse-density-floor-policy-kit
open-above-atmosphere-altitude-band-kit
open-above-terrain-moisture-atmosphere-bridge-kit
open-above-core-world-atmosphere-capability-bridge-kit
open-above-weather-field-layer-adapter-kit
open-above-volumetric-layer-scheduler-kit
open-above-cloud-composite-pass-contract-kit
open-above-aerial-perspective-layer-bridge-kit
open-above-wind-advection-layer-bridge-kit
open-above-reference-runtime-coverage-report-kit
open-above-atmosphere-altitude-sweep-browser-fixture-kit
open-above-first-reference-bound-atmosphere-frame-ack-kit
```

## Required output family

```txt
.agent/trackers/2026-07-16T09-39-49-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-16T09-39-49-04-00.md
.agent/architecture-audit/2026-07-16T09-39-49-04-00-atmosphere-reference-runtime-dsk-map.md
.agent/render-audit/2026-07-16T09-39-49-04-00-single-layer-versus-reference-frame-gap.md
.agent/gameplay-audit/2026-07-16T09-39-49-04-00-altitude-cloud-experience-loop.md
.agent/interaction-audit/2026-07-16T09-39-49-04-00-atmosphere-reference-command-result-map.md
.agent/cloud-system-audit/2026-07-16T09-39-49-04-00-layer-manifest-capability-contract.md
.agent/deploy-audit/2026-07-16T09-39-49-04-00-atmosphere-altitude-sweep-fixture-gate.md
.agent/central-sync-audit/2026-07-16T09-39-49-04-00-runtime-ahead-reference-reconciliation.md
```

## Validation boundary

```txt
documentation changed: yes
runtime JavaScript changed: no
reference SVG changed: no
world configuration changed: no
Nexus Engine provider changed: no
cloud shaders or composite changed: no
gameplay or rendering behavior changed: no
packages dependencies tests workflows or deployment changed: no
branch created: no
pull request created: no

npm run check: not run
npm run build: not run
browser cloud visibility fixture: not run
altitude sweep fixture: not run
terrain/moisture response fixture: not run
provider atmosphere capability fixture: unavailable
artifact downloaded: no
Pages URL fetched: no
```

No multi-layer atmosphere implementation, persistent cloud visibility, terrain-aware fog correctness, provider capability, first reference-bound frame convergence, artifact parity, Pages parity or production readiness is claimed.