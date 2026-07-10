# Project Breakdown: TheOpenAbove

**Timestamp:** `2026-07-10T17-51-35-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

## Plan ledger

### Goal

Audit one eligible Publish repository, identify its complete interaction loop, domains, services, and kits, then document the next implementation-safe boundary without changing runtime behavior.

### Checklist

- [x] Read the complete accessible `LuminaryLabs-Publish` installation inventory.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare eligible repositories with `LuminaryLabs-Dev/LuminaryLabs/repo-ledger/LuminaryLabs-Publish/`.
- [x] Check recent repo-local `.agent` activity where ledger timestamps could lag.
- [x] Select only one repository.
- [x] Read the active route composer, simulation, camera, visual, render-quality, package, and current `.agent` state.
- [x] Identify the interaction loop.
- [x] Identify domains, services, active kits, inactive kits, runtime adapters, and next-cut kits.
- [x] Add timestamped architecture, render, gameplay, interaction, lifecycle, deploy, tracker, and turn-ledger records.
- [x] Refresh required root `.agent` files.
- [x] Preserve runtime source and package behavior.
- [x] Push directly to `main` without creating a branch or pull request.

## Selection comparison

The accessible Publish installation contains ten repositories. All nine eligible non-Cavalry repositories are tracked and have root `.agent` state. `TheOpenAbove` was the oldest eligible documented state and the only Publish project changed in this pass.

```txt
TheOpenAbove       selected / prior aligned 2026-07-10T16-20-09-04-00
PrehistoricRush    tracked  / later activity 2026-07-10T16-37-25-04-00
AetherVale         tracked  / later activity 2026-07-10T16-40-44-04-00 or newer repo-local state
IntoTheMeadow      tracked  / later activity 2026-07-10T16-51-37-04-00 or newer repo-local state
HorrorCorridor     tracked  / later activity 2026-07-10T17-00-54-04-00 or newer repo-local state
PhantomCommand     tracked  / later activity 2026-07-10T17-08-36-04-00
ZombieOrchard      tracked  / later activity 2026-07-10T17-18-47-04-00
TheUnmappedHouse   tracked  / later activity 2026-07-10T17-29-23-04-00
MyCozyIsland       tracked  / later activity 2026-07-10T17-38-35-04-00
TheCavalryOfRome   excluded by rule
```

## Active interaction loop

```txt
route boot
  -> resolve Three.js and NexusEngine CDN modules
  -> create visual domain
  -> create balloon object
  -> create simulation and install keyboard listeners
  -> create camera rig and install wheel listener
  -> create presentation and telemetry
  -> seed initial camera/visual/telemetry state
  -> start requestAnimationFrame recursion
       -> simulation
       -> balloon transform and animation
       -> camera
       -> visual update
       -> telemetry tick
       -> render and adaptive-resolution sample
       -> HUD
  -> expose live runtime through window.GameHost
```

There is no symmetric session end loop. `createGame()` does not return an owner, the animation-frame handle is not retained, `GameHost` has no stop/dispose/restart API, and the existing `simulation.dispose()`, `cameraRig.dispose()`, and `visual.dispose()` methods are never called by the route composer.

## Domains in use

```txt
browser shell and Vite publish
Three.js CDN runtime
NexusEngine CDN telemetry runtime
campaign/world source
runtime composition
keyboard burner/vent input
wheel zoom input
balloon simulation
balloon object and presentation
camera follow/basket-view/clipping fade
visual scene and render policy
sky/sun/aerial/cloud weather/volumetric clouds
terrain/vegetation/grass/water/landmarks
HDR composer/color grade/lens response
dynamic resolution and frame-cost sampling
HUD and fatal-error projection
GameHost live-object readback
static smoke and headless editor routing
resource ownership and disposal
planned runtime-session lifecycle authority
planned frame-phase authority
central documentation sync
```

## Services offered

```txt
route mount and fatal-error display
campaign/world configuration
keyboard and wheel capture
wind/buoyancy/vent/damping/terrain-clearance simulation
balloon construction, transform, and animation
camera follow, basket transition, zoom, FOV, and clipping fade
scene/environment construction and per-frame updates
grass deterministic placement, LOD, culling, rebuild, animation, and state
render submission, dynamic scaling, resize, and renderer statistics
Nexus telemetry publication
HUD and GameHost projection
partial listener/resource disposal at kit level
static smoke checks and headless npm routing
```

## Kits

### Active source-backed

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

### Source-backed but inactive

```txt
open-above-grass-detail-kit
```

### Runtime-implied adapters

```txt
open-above-route-shell-kit
open-above-runtime-composer-kit
open-above-keyboard-input-kit
open-above-wheel-zoom-input-kit
open-above-hud-projection-kit
open-above-error-panel-kit
open-above-gamehost-legacy-readback-kit
open-above-nexusengine-cdn-adapter-kit
```

### Next-cut lifecycle proof kits

```txt
open-above-runtime-session-authority-kit
open-above-runtime-lifecycle-state-kit
open-above-animation-frame-ownership-kit
open-above-listener-ownership-ledger-kit
open-above-resource-disposal-ledger-kit
open-above-session-result-journal-kit
open-above-gamehost-lifecycle-proof-kit
open-above-lifecycle-restart-fixture-kit
```

## Main finding

The route has start authority but no stop authority. Kit-level disposal methods exist, yet no root session owner coordinates them. Re-running `createGame()` or recreating the route in a test/HMR context can create multiple animation loops and duplicate global listeners. Fatal startup after partial construction has no rollback path. Visual teardown is partial and does not explicitly dispose the renderer or every constructed visual subsystem.

## Next safe ledge

```txt
TheOpenAbove Runtime Session Lifecycle Authority + Dispose/Reboot Fixture Gate
```

This lifecycle boundary should be implemented before adding further runtime proof journals or route re-entry behavior. The previously documented frame-phase authority remains a companion requirement and should consume the lifecycle-owned session/frame identity.
