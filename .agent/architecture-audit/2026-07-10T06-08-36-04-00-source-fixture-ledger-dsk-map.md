# Architecture Audit: Source Fixture Ledger DSK Map

**Timestamp:** `2026-07-10T06-08-36-04-00`

## Current architecture

```txt
static browser shell
  -> Vite module route
  -> Three.js importmap
  -> NexusEngine CDN telemetry
  -> campaign/world config
  -> Balloon Drift runtime source
  -> visual-domain service graph
  -> hot-air-balloon object graph
  -> simulation loop
  -> camera rig
  -> presentation domain
  -> HUD projection
  -> GameHost legacy readback
  -> headless editor static contract environment
```

## DSK/domain breakdown

```txt
route domain:
  static-browser-shell
  vite-static-publish
  three-importmap-runtime
  nexusengine-cdn-runtime

source domain:
  campaign-config
  legacy-flight-config
  world-config
  readme-copy-legacy
  package-description-current
  main-route-composer

simulation domain:
  balloon-drift-simulation
  browser-keyboard-input
  burner-intent
  vent-intent
  wind-field
  buoyancy-integration
  altitude-safety
  ground-clearance
  balloon-pose-application

object domain:
  hot-air-balloon-object
  balloon-envelope-panel
  balloon-mouth
  balloon-streamer-fit
  balloon-fabric-seam
  hot-air-balloon-basket
  hot-air-balloon-rigging
  hot-air-balloon-burner
  rope-object

visual domain:
  visual-domain
  quality-tier
  dynamic-resolution
  physical-sky
  sun-light
  aerial-perspective
  cloud-weather-map
  volumetric-clouds
  streamed-terrain-surface
  terrain-chunk-streaming
  vegetation-clusters
  grass-detail
  water-surfaces
  distant-landmarks
  hdr-composer
  neutral-color-grade
  lens-response

camera/presentation domain:
  camera-rig
  basket-view-camera
  clipping-fade
  balloon-presentation
  fabric-material
  basket-material
  rope-material
  burner-illumination

readback domain:
  hud-telemetry
  gamehost-readback
  nexusengine-telemetry
  smoke-test-contract
  headless-renderer-contract

next source-proof domain:
  source-manifest
  source-fingerprint
  source-snapshot
  source-acceptance-ledger
  source-consumer-ledger
  gamehost-source-readback
  headless-source-fixture
  browser-consumer-fixture
  central-ledger-readback
```

## Current service map

```txt
src/main.js:
  composes all live route services and owns GameHost shape.

src/runtime/balloon-simulation-kit.js:
  owns input listeners, simulation mutation, pose application, snapshot, and dispose.

src/visual/visual-domain.js:
  owns renderer, quality, scene graph service composition, update, render, resize, and dispose.

tools/headless-editor-environment.mjs:
  owns static renderer/build contract checks.

tests/smoke.mjs:
  owns static route, renderer, terrain, lighting, water, and headless-hook assertions.
```

## Architecture gap

The architecture is not missing more visual decomposition first.

It is missing a source-proof layer that can answer:

```txt
what route source was accepted?
which legacy fields are still compatible but not authoritative?
which runtime files consumed the source?
what source fingerprint did GameHost expose?
what source rows did the headless fixture prove?
```

## Next safe ledge

```txt
TheOpenAbove Source Fixture Ledger Refresh + GameHost Headless Gate
```
