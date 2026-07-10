# Project Breakdown: TheOpenAbove

**Timestamp:** `2026-07-10T14-50-38-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

## Summary

`TheOpenAbove` remains the oldest eligible documented fallback after comparing the full accessible `LuminaryLabs-Publish` inventory against the central ledger and root `.agent` state. This pass updates documentation only and narrows the next implementation target from generic source readback to a frame-correlated source, input, simulation, camera, render, telemetry, HUD, and GameHost proof chain.

## Plan ledger

### Goal

Document the current Balloon Drift interaction loop, every active domain, every service, and every kit, then define the smallest implementation ledge that can prove how source rows and input results are consumed during a specific runtime frame without changing the visible experience.

### Checklist

- [x] List the complete accessible `LuminaryLabs-Publish` repository inventory.
- [x] Compare every eligible repository against `LuminaryLabs-Dev/LuminaryLabs/repo-ledger`.
- [x] Confirm no new, untracked, or root-`.agent`-missing repository takes priority.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select exactly one repository.
- [x] Read the active route composer, campaign/world config, simulation kit, camera rig, package scripts, headless editor environment, and existing `.agent` state.
- [x] Identify the interaction loop.
- [x] Identify domains, services, and kits.
- [x] Add timestamped architecture, render, gameplay, route-source, interaction, source-authority, telemetry, headless-editor, and deploy audits.
- [x] Refresh root `.agent` navigation and status docs.
- [x] Refresh the machine-readable kit registry.
- [x] Record validation limits honestly.
- [x] Push repo-local findings directly to `main` without a branch or PR.
- [ ] Synchronize the central repo ledger and internal change log.

## Repository selection comparison

```txt
LuminaryLabs-Publish/TheOpenAbove         selected / prior ledger 2026-07-10T13-21-23-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / ledger 2026-07-10T13-30-15-04-00
LuminaryLabs-Publish/AetherVale           tracked / ledger 2026-07-10T13-41-21-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / ledger 2026-07-10T13-50-05-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / ledger 2026-07-10T13-58-16-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / ledger 2026-07-10T14-11-51-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / ledger 2026-07-10T14-21-28-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / ledger 2026-07-10T14-28-47-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / ledger 2026-07-10T14-42-01-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
```

All nine eligible repositories are centrally tracked and have root `.agent` state. `TheOpenAbove` is therefore selected by the oldest documented-selection rule.

## Interaction loop

```txt
index.html
  -> Three.js 0.165.0 and NexusEngine main CDN imports
  -> src/main.js creates visual domain and balloon object
  -> simulation installs keyboard listeners
  -> camera rig installs wheel listener
  -> requestAnimationFrame
       -> simulation.update(dt)
       -> simulation.applyToBalloon(balloon)
       -> animateHotAirBalloon(...)
       -> balloonPresentation.update(...)
       -> cameraRig.update(dt, state)
       -> visual.update({ dt, elapsed, flightState, cameraContext })
       -> Nexus telemetry engine.tick(dt)
       -> visual.render(dt, frameMs)
       -> HUD projection
       -> next animation frame
  -> window.GameHost.getState()
       -> current Nexus snapshot
       -> current local simulation/camera/visual snapshot
  -> headless editor
       -> static file and regex inspection
       -> npm check/build commands
```

## Domains in use

```txt
browser shell and Vite static publishing
Three.js import runtime and NexusEngine CDN adapter
campaign, world, and legacy free-flight configuration
keyboard burner/vent input and wheel zoom input
wind, buoyancy, damping, altitude safety, ground clearance, and drift integration
hot-air-balloon object construction and animation
camera follow, basket-view blend, clipping fade, and projection updates
balloon fabric, basket, rope, and burner presentation
visual domain, renderer, quality tier, dynamic resolution, physical sky, sun, atmosphere, volumetric clouds, streamed terrain, vegetation, grass, water, landmarks, HDR composition, neutral grade, and lens response
HUD and Nexus telemetry projection
legacy GameHost current-state readback
static smoke contracts and Nexus headless editor contracts
planned source authority, input result, frame correlation, consumer attribution, and fixture proof
central ledger synchronization
```

## Services offered by the kits

```txt
route mounting, import resolution, fatal-error display, and HUD mounting
canonical campaign/world constant lookup plus legacy field compatibility
keyboard intent capture and blur reset
wheel zoom capture and bounded zoom mutation
wind and vertical-flight state integration
terrain-relative altitude and collision clearance
balloon transform application and visual animation
camera pose, mode, blend, FOV, clipping, and diagnostic state
renderer/scene/camera creation and environment composition
terrain streaming, vegetation, grass, cloud, water, lighting, and post-process updates
balloon material and rig presentation updates
NexusEngine telemetry publication
local JSON-safe simulation/camera/visual snapshots
static renderer/build inspection and npm command execution
planned source fingerprints, source snapshots, acceptance rows, consumer rows, input rows, frame rows, correlation IDs, GameHost projection, and DOM-free fixtures
```

## Kits

### Implemented source-backed kits

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
open-above-grass-detail-kit
open-above-water-surface-kit
open-above-distant-landmark-kit
open-above-hdr-composer-kit
open-above-neutral-color-grade-kit
open-above-lens-response-kit
open-above-headless-editor-environment
open-above-static-smoke-test-kit
```

### Runtime-implied kits

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

### Next-cut proof kits

```txt
open-above-product-source-authority-kit
open-above-balloon-drift-config-kit
open-above-legacy-flight-compatibility-kit
open-above-source-manifest-kit
open-above-source-fingerprint-kit
open-above-source-snapshot-kit
open-above-source-acceptance-ledger-kit
open-above-source-consumer-ledger-kit
open-above-input-result-ledger-kit
open-above-frame-correlation-ledger-kit
open-above-render-consumption-row-kit
open-above-telemetry-consumption-row-kit
open-above-hud-consumption-row-kit
open-above-gamehost-source-frame-readback-kit
open-above-headless-source-frame-fixture-kit
open-above-browser-source-frame-fixture-kit
```

## Main finding

The route already has usable runtime boundaries. The missing contract is temporal attribution.

Keyboard and wheel listeners mutate hidden state. `src/main.js` then performs simulation, camera, visual, telemetry, render, and HUD work in a fixed sequence, but no shared frame ID or input correlation ID proves which source and input rows produced a given local snapshot. `GameHost.getState()` exposes only the latest aggregate state, while the headless editor performs static source inspection rather than executing a deterministic source/input/frame fixture.

## Next safe ledge

```txt
TheOpenAbove Source Input Frame Correlation Ledger + GameHost Headless Fixture Gate
```

## Validation

Documentation only. Runtime source, dependencies, package scripts, route behavior, and deployment configuration were not changed. No branch or PR was created. Existing npm, headless, browser, and GPU checks were not run. The proposed source/input/frame fixture does not exist yet.