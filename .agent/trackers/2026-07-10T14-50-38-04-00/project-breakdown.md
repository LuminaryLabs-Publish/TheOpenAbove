# Project Breakdown: TheOpenAbove

**Timestamp:** `2026-07-10T14-50-38-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

## Summary

`TheOpenAbove` was the oldest eligible documented fallback after the complete accessible `LuminaryLabs-Publish` inventory was compared against central ledger timestamps and root `.agent` state. This documentation-only pass narrows the next implementation target to a frame-correlated source, input, simulation, camera, visual, telemetry, render, HUD, and GameHost proof chain.

## Plan ledger

### Goal

Document the current Balloon Drift interaction loop, every active domain, every service, and every kit, then define the smallest proof-focused implementation ledge without changing visible behavior.

### Checklist

- [x] List the complete accessible Publish inventory.
- [x] Compare all eligible repositories against the central repo ledger.
- [x] Confirm no new, untracked, or root-`.agent`-missing repository takes priority.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select exactly one repository.
- [x] Read the active route, config, simulation, camera, package, headless, and existing audit state.
- [x] Identify the interaction loop.
- [x] Identify all domains, services, and kits.
- [x] Add timestamped architecture, render, gameplay, route-source, interaction, source-authority, telemetry, headless-editor, and deploy audits.
- [x] Refresh root `.agent` navigation, status, validation, and kit registry files.
- [x] Push repo-local findings directly to `main` without a branch or PR.
- [x] Synchronize `LuminaryLabs-Dev/LuminaryLabs` repo ledger and internal change log.

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

All nine eligible repositories were centrally tracked and had root `.agent` state.

## Interaction loop

```txt
index.html
  -> Three.js 0.165.0 and NexusEngine main CDN
  -> src/main.js creates visual, balloon, simulation, camera, presentation, and telemetry systems
  -> keyboard events mutate burner/vent key state
  -> wheel events mutate camera zoom
  -> animation frame
       -> simulation update
       -> balloon transform and animation
       -> presentation update
       -> camera update
       -> visual update
       -> Nexus telemetry tick
       -> render submission
       -> HUD projection
  -> GameHost latest local/Nexus readback
  -> headless static inspection and npm command routing
```

## Domains

```txt
browser and Vite shell
Three.js and NexusEngine CDN adapters
campaign, world, and legacy free-flight source
keyboard and wheel input
wind, buoyancy, damping, ceiling, terrain-clearance, altitude, velocity, and distance simulation
hot-air-balloon object and presentation
camera follow, basket-view blend, projection, and clipping
visual renderer and quality policy
sky, sun, atmosphere, volumetric clouds, streamed terrain, vegetation, grass, water, and landmarks
HDR composition, neutral grade, and lens response
Nexus telemetry and HUD projection
legacy GameHost readback
static smoke and headless validation
planned source authority, input result, frame correlation, consumer attribution, GameHost proof, and fixture domains
central ledger synchronization
```

## Services

```txt
route mounting and import resolution
fatal-error and HUD projection
campaign/world constant lookup and legacy compatibility classification
keyboard intent and blur reset
wheel zoom and clamping
balloon drift simulation and terrain-relative safety
balloon construction, transforms, and animation
camera pose, blend, FOV, clipping, and diagnostics
environment creation and frame updates
quality, render scale, render statistics, and draw submission
Nexus telemetry publication
latest local/Nexus snapshots
static renderer/build inspection and npm command execution
planned source fingerprints, input results, frame IDs, consumer rows, bounded journals, GameHost proof, and deterministic fixtures
```

## Kits

### Implemented or runtime-implied

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
open-above-simulation-consumer-row-kit
open-above-camera-consumer-row-kit
open-above-visual-consumer-row-kit
open-above-telemetry-consumer-row-kit
open-above-render-consumer-row-kit
open-above-hud-consumer-row-kit
open-above-gamehost-source-frame-readback-kit
open-above-headless-source-frame-fixture-kit
open-above-browser-source-frame-fixture-kit
```

## Main finding

The runtime boundaries are useful, but the system cannot explain causality. Keyboard and wheel listeners produce no normalized outcomes. `src/main.js` performs all runtime consumers in a fixed order, but no shared frame ID, source fingerprint, or consumed input sequence range connects them. GameHost exposes latest aggregate state only, and the headless editor performs static inspection rather than deterministic source/input/frame proof.

## Next safe ledge

```txt
TheOpenAbove Source Input Frame Correlation Ledger + GameHost Headless Fixture Gate
```

## Validation

Documentation only. Runtime source, dependencies, package scripts, route behavior, and deployment configuration did not change. No branch or PR was created. Existing npm, headless, browser, GPU, and deployment checks were not run. Repo-local and central documentation were pushed directly to `main`.