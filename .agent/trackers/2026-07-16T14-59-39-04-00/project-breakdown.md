# Project Breakdown: TheOpenAbove Sightseeing Photo Frame Artifact

**Timestamp:** `2026-07-16T14-59-39-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Selection:** remaining runtime-ahead priority repository  
**Previous central repo-local head:** `aac119fd0b793ea4a86edee7167f87d4d740275b`  
**Reviewed pre-audit repository head:** `d0677937043224bb295bd3b270c336aed0e2a2b1`  
**Status:** `sightseeing-photo-frame-artifact-authority-audited`

## Summary

The current Publish organization contains 11 repositories. Ten are eligible after excluding `LuminaryLabs-Publish/TheCavalryOfRome`; all ten have a central ledger and root `.agent` state. PrehistoricRush was reconciled by the immediately preceding run, leaving TheOpenAbove as the only eligible repository ahead of its centrally documented repo-local head.

The 26-commit delta introduces semantic Journey, Ballooning, Sky, Land, Navigation, Image Capture and Experience domains; replaces the active Air Mail loop with sightseeing photo recognition; adds map Snap Points; adds immediate wind-relative steering; and adds a player-centered 3,200-particle wind field.

The active capture path records semantic metadata but no rendered image. A pending shutter is evaluated during the scene update before the engine tick and render call. The journal displays generated reference art and completion status, not the photograph the player framed.

## Intent

Preserve the semantic-domain refactor and sightseeing gameplay while making each accepted capture one immutable, exact-frame artifact with matching score and journal projection.

## Checklist

- [x] Enumerate all 11 accessible Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and ten root `.agent` states.
- [x] Select only TheOpenAbove as the remaining runtime-ahead repository.
- [x] Inspect the 26-commit, 19-file delta.
- [x] Identify the full interaction loop and domain composition.
- [x] Identify all active kit/provider/adapter surfaces and offered services.
- [x] Reclassify six Air Mail surfaces as inactive migration history.
- [x] Define one photo-frame artifact authority with 20 coordinating surfaces.
- [x] Add the timestamped `.agent` audit family on `main`.
- [ ] Implement rendered-photo artifact ownership.
- [ ] Execute browser, artifact and Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories:     11
eligible after Cavalry exclusion:     10
central ledger entries:               10
root .agent states:                   10
new or ledger-missing:                 0
root-agent-missing:                    0
undocumented:                          0
remaining runtime-ahead:               1

selected: LuminaryLabs-Publish/TheOpenAbove
previous repo-local documentation head: aac119fd0b793ea4a86edee7167f87d4d740275b
reviewed runtime head: d0677937043224bb295bd3b270c336aed0e2a2b1
ahead by: 26 commits
changed files: 19
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Runtime-ahead change set

```txt
semantic composition
  -> Journey, Ballooning, Sky, Land, Navigation, Image Capture, Experience
  -> Meadow Lift scene owns composition
  -> main.js becomes a thin bootstrap
  -> workstream ownership declared

sightseeing
  -> camera mode and wheel zoom
  -> shutter requests
  -> landform-derived Snap Points and search regions
  -> geometric recognition and 0-100 score
  -> capture records and completion set
  -> map regions, completion markers and reference card
  -> Air Mail retired from active Meadow Lift composition

wind and flight
  -> immediate steering command within ±15 degrees of sampled flow
  -> actual velocity still converges through balloon dynamics
  -> local 3,200-particle field follows player and sampled flow

proof
  -> smoke suite aligned with semantic composition
  -> semantic-domain composition test added
```

## Complete interaction loop

```txt
boot
  -> main creates Meadow Lift scene
  -> Sky domain created
  -> Nexus Engine telemetry runtime installs Core World, Features, Weather and Layered Weather
  -> Land binds Core World providers
  -> Experience creates Three.js visual world and renderer
  -> Sky mounts airstream and local wind particles
  -> Ballooning loads balloon and creates simulation
  -> Navigation mounts parchment map
  -> Image Capture derives Snap Points from landforms
  -> Journey owns RAF progression

flight input
  -> Space/W/Up controls burner
  -> S/Down/Shift controls vent
  -> A/D/Left/Right commands immediate wind-relative steering
  -> C toggles camera mode
  -> wheel changes capture zoom
  -> P/Enter requests shutter
  -> M opens map

flight frame
  -> Ballooning samples flow, resolves steering, integrates flight and updates balloon
  -> Sky updates airstream visuals and wind particles
  -> Experience updates balloon presentation, camera and visual world
  -> Image Capture evaluates a pending shutter geometrically
  -> capture metadata may update player message
  -> Nexus Engine ticks
  -> Experience renders clouds, world, balloon and post-processing

map frame
  -> Journey suppresses update while map is open
  -> render continues with dt zero
  -> independent map RAF redraws generated world, routes, Snap Points and completion
  -> generic reference card remains visible

capture result today
  -> metadata record only
  -> no renderer pixels
  -> no frame/camera/world/weather digest
  -> no immutable image artifact
  -> no actual-photo journal projection
```

## Domains in use

| Domain | Ownership and services |
|---|---|
| Journey | session status, region, map-open policy, frame/elapsed counters, RAF start/stop, failure containment and aggregate snapshot |
| Ballooning | balloon model lifecycle, controls, buoyancy, venting, airstream sampling, wind-relative steering, terrain contact, pose and state snapshot |
| Sky | airstream domain, route sampling, weather readback, local wind-particle lifecycle and snapshot |
| Land | world configuration, world features/foundation, terrain/world anchors, generation and terrain snapshot |
| Navigation | parchment map lifecycle, generated-world map cache, routes, Snap Points, reference cards and map state |
| Image Capture | camera mode, zoom, shutter request, landform recognition, score, capture metadata, completion and disposal |
| Experience | renderer, scene, camera, visual world, camera rig, balloon presentation, update/render and visual snapshot |
| Core World family | foundation definitions, composition, sampling, cells, features, landforms and atmosphere features |
| Weather family | base weather state and renderer-neutral layered weather |
| Presentation | Three.js, clouds, terrain, flora, water, balloon, HDR, grading, dynamic resolution and map Canvas2D |
| Validation/deploy | tiered Node checks, Vite build, provider checkout, revision stamping and Pages publication |
| Proposed photo authority | exact-frame admission, artifact encoding, digest, storage, score convergence, journal projection and proof |

## Main source-backed finding

`createImageCaptureDomain` receives the renderer, but uses it only to register and remove the wheel listener. `evaluate()` reads camera direction and player state, computes a geometric score and appends a metadata record. It does not read the canvas, capture a render target, encode bytes or create an artifact identity.

The Meadow Lift scene calls `imageCapture.update(state)` after visual/camera update but before `engine.tick(dt)` and `experience.render(...)`. The accepted record therefore has no exact presented-frame identity. The map journal draws a generated reference illustration and completion stamp rather than captured pixels.

```txt
semantic capture metadata: present
camera mode and zoom: present
landmark recognition: present
score and rating: present
Snap Point completion: present
map completion projection: present

rendered pixel source: absent
accepted capture frame: absent
camera matrix receipt: absent
world/weather revision binding: absent
photo bytes and digest: absent
artifact persistence and retirement: absent
actual-photo journal projection: absent
PhotoCaptureResult: absent
FirstPhotoArtifactAck: absent
FirstJournalPhotoFrameAck: absent
```

This is a frame/artifact convergence gap. It does not prove that the geometric score is wrong.

## Required authority

`open-above-sightseeing-photo-frame-artifact-authority-domain`

```txt
PhotoCaptureCommand
  -> bind request, route, session, frame, camera, world, weather and renderer revisions
  -> reject stale, duplicate, map-suspended or retired work

PhotoFrameAdmissionCommand
  -> freeze one post-update capture descriptor
  -> render or identify one exact color source
  -> publish PhotoFrameAdmissionResult

PhotoArtifactCommand
  -> encode immutable bytes
  -> compute digest, dimensions, MIME and byte length
  -> persist or expose through an owned lifecycle
  -> publish PhotoArtifactResult

PhotoRecognitionCommand
  -> score against the same accepted frame/camera descriptor
  -> publish PhotoRecognitionResult

PhotoJournalProjectionCommand
  -> bind actual artifact to completion and map journal
  -> publish FirstPhotoArtifactAck
  -> publish FirstJournalPhotoFrameAck
```

## Complete kit and offered-service inventory

### Active semantic scene and new wind surfaces: 10

| Kit/domain | Offered services |
|---|---|
| `open-above-journey-domain` | session/region state, map pause policy, RAF progression, error containment, snapshots and disposal |
| `open-above-ballooning-domain` | balloon loading/mounting, simulation composition, update, model readiness, state/snapshot and disposal |
| `open-above-sky-domain` | airstream composition, weather binding/readback, wind-particle mount/update/snapshot and disposal |
| `open-above-land-domain` | Core World binding, world anchors, visual binding, generation/terrain snapshot and height sampling |
| `open-above-navigation-domain` | map mount, open/close, world refresh, Snap Point projection, snapshot and disposal |
| `open-above-image-capture-domain` | camera mode, zoom, shutter admission, recognition, score, capture metadata, completion and disposal |
| `open-above-experience-domain` | visual domain composition, camera rig, balloon presentation, update/render, snapshots and disposal |
| `open-above-meadow-lift-scene` | semantic-domain composition, boot ordering, update/render ordering, GameHost projection and disposal |
| `open-above-wind-relative-steering-kit` | flow-relative direction, speed, heading, turn offset and target horizontal velocity resolution |
| `open-above-wind-particle-field-kit` | deterministic point allocation, player-centered placement, flow advection, wrapping, opacity, snapshot fields and disposal |

### Active runtime and airstream kits: 9

| Kit | Offered services |
|---|---|
| `open-above-balloon-simulation-kit` | key consumption, burner/vent, buoyancy, steering, airstream force, terrain contact, integration, pose, snapshot and disposal |
| `open-above-balloon-telemetry-kit` | Nexus Engine resources/events, Core World/Weather composition, feature registration, ticking and public readback |
| `open-above-airstream-domain` | route, field, force, visual and diagnostics composition, update, sampling, snapshot and disposal |
| `open-above-airstream-route-kit` | route identity, control points, colors, destinations and descriptors |
| `open-above-airstream-sampler-kit` | route and ambient field sampling |
| `open-above-airstream-field-kit` | spatial wind-field evaluation and contributor blending |
| `open-above-airstream-balloon-force-kit` | flow normalization, state contribution and balloon-force application |
| `open-above-airstream-visual-kit` | route visualization and scene updates |
| `open-above-airstream-debug-kit` | route/field diagnostics and readback |

### Inactive Air Mail migration surfaces: 6

| Kit | Retained service/history |
|---|---|
| `open-above-mail-delivery-domain` | historical Air Mail composition, update, reset, snapshot and disposal; not mounted by Meadow Lift |
| `open-above-mail-parcel-kit` | historical parcel identity, state, message and reset |
| `open-above-mail-route-kit` | historical parcel route and town descriptors |
| `open-above-delivery-volume-kit` | historical geometric delivery eligibility |
| `open-above-delivery-progress-kit` | historical target tracking and completion settlement |
| `open-above-mail-town-kit` | historical town meshes, anchors, animation and delivery metadata |

### Balloon object and presentation kits: 15

| Kit | Offered services |
|---|---|
| `open-above-hot-air-balloon-object-kit` | asynchronous composition, readiness, persistent-resource metadata and animation |
| `open-above-balloon-envelope-profile-kit` | envelope proportions and profile sampling |
| `open-above-balloon-envelope-panel-kit` | envelope panel geometry |
| `open-above-balloon-mouth-kit` | mouth geometry and fit |
| `open-above-balloon-streamer-fit-kit` | streamer placement and fit |
| `open-above-balloon-fabric-seam-kit` | fabric-seam presentation |
| `open-above-hot-air-balloon-basket-kit` | basket geometry |
| `open-above-hot-air-balloon-rigging-kit` | rope and rigging layout |
| `open-above-hot-air-balloon-burner-kit` | burner geometry and presentation |
| `open-above-rope-kit` | segmented rope construction and dynamic geometry updates |
| `open-above-balloon-presentation-domain` | presentation composition and accepted-state updates |
| `open-above-envelope-fabric-material-kit` | envelope material descriptors and GPU state |
| `open-above-basket-material-kit` | basket material descriptors and GPU state |
| `open-above-balloon-camera-rig-kit` | wheel zoom, camera modes, transitions and listener disposal |
| `open-above-clipping-fade-kit` | near-camera clipping fade |

### Visual world and environment kits: 34

| Kit | Offered services |
|---|---|
| `open-above-visual-domain` | renderer, scene, camera, generated world, weather adapter, update, render, resize, state and disposal |
| `open-above-world-generation-kit` | deterministic staged generation, work budgets, snapshots and subscriptions |
| `open-above-world-feature-foundation-kit` | generated-world/Core World bridge |
| `open-above-quality-tier-kit` | device quality detection and tier descriptors |
| `open-above-dynamic-resolution-kit` | effective DPR, frame sampling, scale transitions and resize |
| `open-above-physical-sky-kit` | sky shader and solar update |
| `open-above-sun-light-kit` | sun direction, color, shadows and world position |
| `open-above-aerial-perspective-kit` | fog, altitude clearing, cloud-density response and sun warmth |
| `open-above-cloud-weather-map-kit` | Weather/Layered Weather advancement, layer aggregation and projection |
| `open-above-volumetric-cloud-kit` | five-layer raymarch, uniforms, budgets, target, composite and disposal |
| `open-above-cloud-lod-kit` | render scale, view/light samples, distance and jitter policy |
| `open-above-cloud-lighting-kit` | cloud sun and sky-fill lighting |
| `open-above-terrain-surface-kit` | terrain geometry/material, queries, streaming update and disposal |
| `open-above-terrain-streaming-contract-kit` | terrain streaming contract |
| `open-above-terrain-chunk-streaming-kit` | active terrain-chunk lifecycle |
| `open-above-terrain-horizon-streaming-kit` | horizon-ring lifecycle |
| `open-above-vegetation-cluster-kit` | vegetation generation, refresh, update and disposal |
| `open-above-grass-world-seed-kit` | deterministic grass seed |
| `open-above-grass-biome-density-kit` | biome density evaluation |
| `open-above-grass-exclusion-mask-kit` | route and object exclusions |
| `open-above-grass-patch-density-kit` | patch distribution |
| `open-above-grass-texture-atlas-kit` | procedural grass atlas generation |
| `open-above-grass-chunk-placement-kit` | grass chunk placement |
| `open-above-grass-lod-kit` | grass LOD policy |
| `open-above-grass-compute-culling-kit` | culling and capacity policy |
| `open-above-grass-field-domain` | grass composition, update, refresh, state and disposal |
| `open-above-flower-chunk-placement-kit` | flower placement |
| `open-above-flower-texture-atlas-kit` | procedural flower atlas generation |
| `open-above-flower-field-domain` | flower composition, update, refresh, state and disposal |
| `open-above-water-surface-kit` | water geometry, material, lighting and update |
| `open-above-distant-landmark-kit` | landmark geometry and disposal |
| `open-above-hdr-composer-kit` | half-float targets, depth textures, passes, resize, render and disposal |
| `open-above-color-grade-kit` | HDR grading and exposure response |
| `open-above-lens-response-kit` | sun-facing lens response |

### UI, tooling and proof kits: 10

| Kit | Offered services |
|---|---|
| `open-above-parchment-map-overlay-kit` | generated world map, routes, Snap Points, reference card, player projection, open/close RAF and disposal |
| `open-above-headless-editor-environment` | deterministic environment setup and editor validation support |
| `open-above-static-smoke-test-kit` | source and composition smoke assertions |
| `open-above-airstream-mail-test-kit` | retained airstream/Air Mail historical assertions |
| `open-above-world-flora-test-kit` | terrain/flora source contract assertions |
| `open-above-world-feature-foundation-test-kit` | foundation and feature integration assertions |
| `open-above-world-domain-composition-test-kit` | Core World composition assertions |
| `open-above-layered-weather-integration-test-kit` | five-layer weather integration assertions |
| `open-above-tiered-validation-runner-kit` | subprocess orchestration and GitHub severity annotations |
| `open-above-semantic-domain-composition-test-kit` | semantic folder, scene-composition and retired Air Mail source assertions |

### Runtime-implied browser/host/deploy adapters: 13

| Adapter | Offered services |
|---|---|
| `open-above-route-shell-kit` | HTML route and canvas ownership |
| `open-above-importmap-kit` | Three.js/Nexus Engine module resolution |
| `open-above-runtime-composer-kit` | browser boot and scene creation |
| `open-above-keyboard-input-kit` | burner, vent, steering, map, camera and shutter key evidence |
| `open-above-wheel-zoom-input-kit` | camera and capture zoom input |
| `open-above-parchment-map-shell-kit` | map DOM/canvas surface |
| `open-above-error-panel-kit` | fatal error projection |
| `open-above-gamehost-legacy-readback-kit` | browser diagnostic object and domain readback |
| `open-above-vite-nexusengine-checkout-alias-kit` | checked-out provider aliasing |
| `open-above-nexusengine-revision-stamp-kit` | provider revision embedding |
| `open-above-campaign-source-kit` | world, weather and feature configuration |
| `open-above-raf-clock-adapter-kit` | browser wall-time to Journey frame progression |
| `open-above-pages-deploy-kit` | static artifact publication |

### Nexus Engine provider surfaces: 30

| Provider surface | Offered services |
|---|---|
| `n-world-domain` | parent world composition and public surface |
| `world-builder-runtime-kit` | world builder runtime contract |
| `n-world-foundation-domain` | resolved elevation/material/normal/collision foundation |
| `foundation-definition-kit` | foundation descriptors |
| `foundation-composition-kit` | contribution composition |
| `foundation-sampling-kit` | resolved world sampling |
| `foundation-cell-resolution-kit` | cell-level foundation resolution |
| `n-world-feature-domain` | feature registry/lifecycle/query/composition parent |
| `feature-registry-kit` | feature registration and identity |
| `feature-lifecycle-kit` | feature activation and retirement |
| `feature-query-kit` | bounds and semantic queries |
| `feature-composition-kit` | feature contribution composition |
| `n-world-landform-feature-domain` | landform feature family |
| `mountain-feature-kit` | mountain contributions |
| `canyon-feature-kit` | canyon contributions |
| `cliff-feature-kit` | cliff contributions |
| `plateau-feature-kit` | plateau contributions |
| `n-world-atmosphere-feature-domain` | atmosphere feature family |
| `cloud-layer-feature-kit` | cloud-layer descriptors |
| `cloud-bank-feature-kit` | cloud-bank descriptors |
| `fog-bank-feature-kit` | fog-bank descriptors |
| `storm-cell-feature-kit` | storm-cell descriptors |
| `wind-corridor-feature-kit` | directional wind corridor descriptors |
| `thermal-column-feature-kit` | thermal lift descriptors |
| `downdraft-zone-feature-kit` | downdraft descriptors |
| `turbulence-zone-feature-kit` | turbulence descriptors |
| `precipitation-feature-kit` | precipitation descriptors |
| `visibility-zone-feature-kit` | visibility descriptors |
| `n-weather-domain` | renderer-neutral weather state and advancement |
| `n-layered-weather-domain` | semantic layered weather state, sampling and snapshots |

## Census

```txt
active local source-backed surfaces: 78
runtime-implied adapters: 13
Nexus Engine provider surfaces: 30
active named surfaces: 121
inactive Air Mail migration surfaces: 6
planned photo authority surfaces: 20
```

## Validation boundary

Documentation changed only. No runtime JavaScript, test, package, workflow or deployment behavior was changed. No browser photo fixture, build, artifact download or Pages smoke was executed. No photo artifact, score/frame convergence or production-readiness claim is made.