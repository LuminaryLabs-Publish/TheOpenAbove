# TheOpenAbove Project Breakdown

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Timestamp:** `2026-07-10T21-31-01-04-00`

## Plan ledger

### Goal

Document the active Balloon Drift route, every domain and kit service, and the import-time compatibility loop that creates an unowned animation-frame chain before defining the smallest safe proof gate.

### Checklist

- [x] Compared the ten accessible `LuminaryLabs-Publish` repositories with the central ledger.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirmed all nine eligible repositories are tracked and have root `.agent` state.
- [x] Selected only `LuminaryLabs-Publish/TheOpenAbove` through the oldest eligible documented-selection rule.
- [x] Read the route composer, simulation, camera, visual domain, balloon object kit and smoke test.
- [x] Identified the interaction loop.
- [x] Cataloged domains, kits and services.
- [x] Identified the import-time compatibility RAF and incomplete teardown boundary.
- [x] Added architecture, render, gameplay, interaction, lifecycle and deploy audits.
- [x] Changed documentation only.
- [x] Created no branch or pull request.

## Selection

The accessible Publish inventory contains `AetherVale`, `HorrorCorridor`, `IntoTheMeadow`, `MyCozyIsland`, `PhantomCommand`, `PrehistoricRush`, `TheCavalryOfRome`, `TheOpenAbove`, `TheUnmappedHouse` and `ZombieOrchard`. All nine eligible non-Cavalry repositories were tracked. `TheOpenAbove` had the oldest eligible central review timestamp at `2026-07-10T19-58-34-04-00` when selection began.

## Interaction loop

```txt
browser links static ESM graph
  -> hot-air-balloon-object-kit evaluates
       -> schedules attachWhenReady RAF at import time
  -> main createGame constructs visual, balloon, simulation, camera, presentation and telemetry
  -> GameHost is published
  -> compatibility attach loop observes GameHost
       -> finds no legacy wing/tail vehicle in the active direct-balloon route
       -> starts a perpetual compatibility tick anyway
  -> main route RAF advances simulation, camera, environment, telemetry, render and HUD
```

## Domains in use

```txt
browser shell and Vite publishing
static ESM and CDN dependency resolution
campaign/world source configuration
balloon drift simulation
keyboard, blur and wheel input
procedural balloon object and presentation
camera follow, basket view, clipping fade and zoom
quality tier and dynamic resolution
physical sky, sun, aerial perspective, weather and volumetric clouds
terrain surface and streamed chunks
vegetation, deterministic grass, water and landmarks
HDR composition, neutral grading and lens response
Nexus telemetry
HUD and GameHost readback
import-time compatibility installation
animation-frame scheduling and lifecycle
partial listener/resource disposal
static smoke and headless command routing
```

## Kits and services

```txt
open-above-route-shell-kit
  canvas, HUD, error panel and route boot
open-above-runtime-composer-kit
  construct active runtime and publish GameHost
open-above-balloon-simulation-kit
  input, wind, buoyancy, clearance, movement, snapshot and listener disposal
open-above-hot-air-balloon-object-kit
  balloon construction, animation, legacy vehicle installation and import-time attach loop
open-above-balloon-camera-rig-kit
  follow/basket camera, zoom, clipping and wheel disposal
open-above-balloon-presentation-domain
  procedural envelope/basket presentation animation
open-above-visual-domain
  scene, renderer, environment, update, render, resize and partial disposal
open-above-quality-tier-kit / open-above-dynamic-resolution-kit
  hardware classification, render scale and frame-cost sampling
open-above-physical-sky-kit / sun-light-kit / aerial-perspective-kit
  sky, lighting and atmospheric projection
open-above-cloud-weather-map-kit / volumetric-cloud-kit
  weather field and volumetric cloud projection
open-above-terrain-surface-kit / terrain-chunk-streaming-kit
  terrain height, surface and streamed chunks
open-above-vegetation-cluster-kit
  vegetation placement
open-above-grass-world-seed-kit / biome-density-kit / exclusion-mask-kit
  deterministic grass source policy
open-above-grass-chunk-placement-kit / lod-kit / compute-culling-kit / grass-field-domain
  grass generation, LOD, culling, instancing, animation, state and disposal
open-above-water-surface-kit / distant-landmark-kit
  water and horizon landmarks
open-above-hdr-composer-kit / neutral-color-grade-kit / lens-response-kit
  composition, grading and lens response
open-above-balloon-telemetry-kit
  Nexus resource/event publication and readback
open-above-static-smoke-test-kit / headless-editor-environment
  local source assertions and command routing
```

Inactive source-backed kit: `open-above-grass-detail-kit`.

## Main finding

`src/hot-air-balloon-object-kit.js` schedules `attachWhenReady` as a module side effect. The active route imports that module for `buildHotAirBalloon`, so the side effect always runs. After `GameHost` exists, it attempts a legacy wing/tail vehicle installation, but the active route directly adds a balloon and has no such vehicle. The compatibility code still starts a recursive `tick()` RAF, repeatedly performs the failed lookup and has no cancellation, generation fence, status row or disposer.

The main route separately owns its real render RAF. `createGame()` discards that frame request ID and never composes `simulation.dispose()`, `cameraRig.dispose()` or `visual.dispose()`. Importing one reusable object kit therefore creates hidden process authority outside the route owner.

## Ordered safe ledges

```txt
1. TheOpenAbove Immutable Runtime Admission + Boot Capability Fixture Gate
2. TheOpenAbove Import-Pure Balloon Object Kit + Frame Ownership Fixture Gate
3. TheOpenAbove Runtime Session Lifecycle + Ordered Disposal/Reboot Fixture Gate
```

Runtime admission remains first because reproducible source identity is required before lifecycle proof. The compatibility-loop cut should be included in the same boot/session ownership implementation rather than treated as visual work.

## Validation

Documentation only. Runtime source, package scripts, dependencies, route output and deployment configuration were unchanged. The existing smoke test does not assert import purity, RAF count, legacy installer admission or teardown.