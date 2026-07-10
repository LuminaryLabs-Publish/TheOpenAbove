# Architecture Audit: Source Consumer GameHost Readback DSK Map

**Timestamp:** `2026-07-10T01-20-47-04-00`

## DSK read

`TheOpenAbove` is no longer a single browser script in practice. The live route composes dedicated source/runtime kits from `src/main.js`, including visual domain, simulation, telemetry, camera rig, presentation domain, and hot-air-balloon object composition.

The remaining architecture gap is not split-by-file count. The gap is source authority and readback proof across product copy, campaign config, route composition, browser consumption, and `GameHost` diagnostics.

## Active route map

```txt
index.html
  -> importmap: three@0.165.0
  -> script: ./src/main.js
  -> NexusEngine CDN main import
  -> CAMPAIGN/WORLD config
  -> open-above visual domain
  -> hot-air-balloon object kit
  -> balloon simulation kit
  -> balloon camera rig kit
  -> balloon presentation domain
  -> balloon telemetry engine
  -> animation frame loop
  -> HUD projection
  -> window.GameHost.getState()
```

## Domains

```txt
static-browser-shell
vite-static-publish
three-importmap-runtime
nexusengine-cdn-runtime
campaign-config
legacy-flight-config
balloon-drift-route
balloon-drift-simulation
keyboard-input
burner-intent
vent-intent
wind-field
buoyancy-integration
altitude-safety
ground-clearance
balloon-pose-application
hot-air-balloon-object
visual-domain
camera-rig
balloon-presentation
hud-telemetry
gamehost-readback
source-manifest-next
source-fingerprint-next
source-snapshot-next
source-acceptance-ledger-next
browser-consumer-fixture-next
central-ledger-sync
```

## Services by domain

```txt
static-browser-shell: mounts canvas, HUD, error shell, importmap, and module route.
vite-static-publish: serves and builds the browser route.
three-importmap-runtime: provides renderer primitives through Three.js 0.165.0.
nexusengine-cdn-runtime: receives route telemetry through open-above telemetry integration.
campaign-config: provides CAMPAIGN and WORLD constants.
legacy-flight-config: still carries older thermal, gate, perch, and FLIGHT semantics.
balloon-drift-simulation: integrates wind, buoyancy, altitude, distance, velocity, and position.
keyboard-input: tracks burner and vent keys.
hot-air-balloon-object: creates visual balloon subgraphs.
visual-domain: owns scene, renderer, terrain, sky, vegetation, clouds, water, composer, quality, and stats.
camera-rig: resolves wheel zoom, chase/basket blend, clipping, and camera stats.
balloon-presentation: updates fabric, basket, rope, burner light, and presentation state.
hud-telemetry: writes simulation and visual stats to DOM nodes.
gamehost-readback: returns local and nexus snapshots.
source-manifest-next: should declare product copy, campaign, route, runtime, and compatibility sources.
source-fingerprint-next: should hash or version the consumed source records.
source-snapshot-next: should serialize the current source records.
source-acceptance-ledger-next: should mark accepted, legacy-compatible, stale, or rejected source paths.
browser-consumer-fixture-next: should prove the source surface without a browser DOM.
central-ledger-sync: tracks repo-local and central documentation state.
```

## Current kits

```txt
open-above-balloon-simulation-kit
open-above-balloon-telemetry-kit
open-above-visual-domain
open-above-quality-tier-kit
open-above-dynamic-resolution-kit
open-above-physical-sky-kit
open-above-sun-light-kit
open-above-aerial-perspective-kit
open-above-cloud-shadow-kit
open-above-cloud-weather-map-kit
open-above-volumetric-cloud-kit
open-above-terrain-surface-kit
open-above-vegetation-cluster-kit
open-above-grass-detail-kit
open-above-water-surface-kit
open-above-distant-landmark-kit
open-above-hdr-composer-kit
open-above-auto-exposure-kit
open-above-god-ray-kit
open-above-bloom-kit
open-above-color-grade-kit
open-above-lens-response-kit
open-above-balloon-camera-rig-kit
open-above-clipping-fade-kit
open-above-balloon-presentation-domain
open-above-envelope-fabric-material-kit
open-above-basket-material-kit
open-above-rope-material-kit
open-above-burner-illumination-kit
open-above-hot-air-balloon-object-kit
open-above-balloon-envelope-panel-kit
open-above-balloon-mouth-kit
open-above-balloon-streamer-fit-kit
open-above-balloon-fabric-seam-kit
open-above-hot-air-balloon-basket-kit
open-above-hot-air-balloon-rigging-kit
open-above-hot-air-balloon-burner-kit
open-above-rope-kit
```

## Missing next-cut kits

```txt
open-above-product-copy-authority-kit
open-above-readme-route-copy-parity-kit
open-above-campaign-current-route-authority-kit
open-above-legacy-flight-compatibility-kit
open-above-balloon-drift-config-kit
open-above-source-consumer-manifest-kit
open-above-source-fingerprint-kit
open-above-source-snapshot-kit
open-above-source-acceptance-ledger-kit
open-above-source-consumer-ledger-kit
open-above-gamehost-source-readback-kit
open-above-browser-consumer-fixture-kit
```

## Architecture conclusion

Do not start with renderer extraction, visual-domain rewrite, camera retuning, balloon visual changes, simulation constant retuning, or route expansion.

Start with source/readback proof that reconciles product copy, legacy campaign fields, current route composition, `GameHost` diagnostics, and a fixture-readable source consumer ledger.
