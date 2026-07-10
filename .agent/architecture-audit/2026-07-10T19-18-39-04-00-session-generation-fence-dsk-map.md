# Architecture Audit: Session Generation Fence DSK Map

**Timestamp:** `2026-07-10T19-18-39-04-00`

## Runtime authority map

```txt
route shell
  -> runtime composition
       -> visual domain
       -> balloon object
       -> simulation kit
       -> camera rig kit
       -> presentation domain
       -> telemetry engine
       -> recursive frame loop
       -> HUD projection
       -> GameHost publication
```

The route composer is the only place that sees every owner, but it returns nothing and retains no teardown or generation state.

## Domains in use

```txt
browser shell and Vite static publish
Three.js and NexusEngine CDN adapters
campaign/world/legacy-flight source configuration
keyboard and wheel input
burner, vent, wind, buoyancy, damping, ceiling, terrain-clearance, altitude and distance simulation
hot-air-balloon object and presentation
camera follow, basket-view blend and clipping fade
quality-tier and dynamic-resolution policy
physical sky, sun, aerial perspective and cloud weather
volumetric clouds
terrain surface and chunk streaming
vegetation clusters
world-seeded grass density, exclusion, placement, LOD, culling and instancing
water and distant landmarks
HDR composition, color grade and lens response
Nexus telemetry
HUD and GameHost projection
partial resource disposal
static smoke and headless contracts
```

## Source-backed kits

```txt
open-above-balloon-simulation-kit
open-above-balloon-telemetry-kit
open-above-hot-air-balloon-object-kit
open-above-balloon-camera-rig-kit
open-above-clipping-fade-kit
open-above-balloon-presentation-domain
open-above-visual-domain
open-above-quality-tier-kit
open-above-dynamic-resolution-kit
open-above-physical-sky-kit
open-above-sun-light-kit
open-above-aerial-perspective-kit
open-above-cloud-weather-map-kit
open-above-volumetric-cloud-kit
open-above-terrain-surface-kit
open-above-terrain-chunk-streaming-kit
open-above-vegetation-cluster-kit
open-above-grass-world-seed-kit
open-above-grass-biome-density-kit
open-above-grass-exclusion-mask-kit
open-above-grass-chunk-placement-kit
open-above-grass-lod-kit
open-above-grass-compute-culling-kit
open-above-grass-field-domain
open-above-water-surface-kit
open-above-distant-landmark-kit
open-above-hdr-composer-kit
open-above-neutral-color-grade-kit
open-above-lens-response-kit
open-above-headless-editor-environment
open-above-static-smoke-test-kit
```

Inactive source-backed kit:

```txt
open-above-grass-detail-kit
```

## Runtime-implied adapters

```txt
open-above-route-shell-kit
open-above-importmap-kit
open-above-runtime-composer-kit
open-above-keyboard-input-kit
open-above-wheel-zoom-input-kit
open-above-hud-projection-kit
open-above-error-panel-kit
open-above-gamehost-legacy-readback-kit
open-above-nexusengine-cdn-adapter-kit
```

## Services offered

```txt
route mount, imports, HUD and fatal-error projection
campaign/world configuration
keyboard burner and vent capture
wheel zoom capture
wind/buoyancy/damping/clearance simulation
balloon construction, transforms and animation
camera follow, basket view, FOV and clipping fade
sky, lighting, atmosphere, clouds, terrain, vegetation, water, landmarks and grass
quality detection, adaptive scale, render submission and renderer statistics
HDR/postprocess/lens response
telemetry publication
HUD and GameHost readback
partial listener and resource disposal
static source-contract smoke and headless command routing
```

## Missing ownership kits

```txt
open-above-runtime-session-authority-kit
open-above-session-generation-fence-kit
open-above-animation-frame-ownership-kit
open-above-listener-ownership-ledger-kit
open-above-resource-ownership-ledger-kit
open-above-startup-transaction-kit
open-above-partial-start-rollback-kit
open-above-terminal-gamehost-projection-kit
open-above-lifecycle-fixture-kit
```

## Required contract

Every callback must capture `{sessionId, generation}` and reject work unless it matches the active session. Stop must invalidate the generation before cancelling frames or removing listeners. Disposal must publish a terminal immutable GameHost snapshot and classify all former live handles as disposed, retained, unsupported, or stale.
