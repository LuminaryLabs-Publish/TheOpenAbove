# Architecture Audit: Source GameHost Readback Ledger DSK Map

**Timestamp:** `2026-07-10T08-59-04-04-00`

## Current DSK/domain map

```txt
static-browser-shell
  -> index.html
  -> importmap three@0.165.0
  -> canvas/HUD/error DOM

runtime-route-domain
  -> src/main.js
  -> CAMPAIGN/WORLD import
  -> createGame()

visual-domain
  -> createVisualDomain
  -> terrain, vegetation, grass, water, sky, clouds, sun, composer, quality, renderer

object-domain
  -> buildHotAirBalloon
  -> envelope, mouth, streamers, seams, basket, rigging, burner, ropes

simulation-domain
  -> createBalloonSimulation
  -> key listeners, burner, vent, wind, buoyancy, altitude, velocity, distance

camera-domain
  -> createBalloonCameraRig
  -> scroll zoom, follow, basket blend, clipping diagnostics

presentation-domain
  -> createBalloonPresentationDomain
  -> envelope, basket, rope, burner animation

telemetry-domain
  -> createBalloonTelemetryEngine
  -> NexusEngine snapshot publishing

headless-editor-domain
  -> tools/headless-editor-environment.mjs
  -> project.inspect, renderer.validate, project.check, project.build, runtime.getState

proof-next-domain
  -> source manifest
  -> source fingerprint
  -> source snapshot
  -> source acceptance ledger
  -> source consumer ledger
  -> GameHost .source readback
  -> DOM-free source fixture
```

## Source authority gap

The current runtime source of truth is `src/main.js`, but source authority is split across:

```txt
README.md: older free-flight product copy and controls
src/data/campaign.config.js: current WORLD plus legacy FLIGHT/campaign objective fields
src/main.js: current Balloon Drift route composer
tests/smoke.mjs: renderer/source-file contract checks
tools/headless-editor-environment.mjs: static renderer/build checks
window.GameHost.getState(): local and Nexus snapshots only
```

## Architecture call

Keep the route stable. Add the proof layer as source rows and additive `GameHost.source` readback before any visual, terrain, camera, or route-content work.
