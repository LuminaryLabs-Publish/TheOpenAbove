# Architecture Audit — DSK Domain Breakdown

**Timestamp:** `2026-07-08T11-49-04-04-00`

## Summary

`TheOpenAbove` is a coherent balloon drift route, but its authority is split across stale product copy, legacy campaign/flight config, inline runtime constants, HUD projection, and GameHost snapshots.

The next architecture slice should make product/source state canonical before extracting renderer, world, physics, or camera systems.

## Current route graph

```txt
index.html
  -> src/main.js
    -> Three.js CDN
    -> NexusEngine CDN
    -> src/data/campaign.config.js
    -> src/hot-air-balloon-object-kit.js
      -> balloon-envelope-panel-kit
      -> balloon-mouth-kit
      -> balloon-streamer-fit-kit
      -> balloon-fabric-seam-kit
      -> hot-air-balloon-basket-kit
      -> hot-air-balloon-rigging-kit
      -> hot-air-balloon-burner-kit
      -> rope-kit
```

## Current interaction loop

```txt
mount browser route
  -> initialize procedural world and balloon object
  -> keyboard input maps to burner and vent intent
  -> wheel input maps to camera zoom / first-person blend
  -> inline update computes wind, buoyancy, ceiling softness, ground clearance, velocity, altitude, and distance
  -> Nexus telemetry kit publishes balloon snapshot
  -> render loop draws scene and writes HUD
  -> GameHost exposes local/nexus balloon snapshots
```

## Domain map

### Host and route domains

```txt
static-page-host
vite-static-publish-host
runtime-host
third-party-cdn-runtime
nexus-engine-cdn-runtime
window-gamehost-debug
```

### Product/source authority domains

```txt
product-copy-authority
readme-route-copy-parity
package-description-parity
campaign-config
legacy-flight-compatibility
balloon-drift-config-authority
source-fingerprint
source-snapshot
source-acceptance-ledger
source-acceptance-fixture
```

### Balloon route domains

```txt
balloon-input-map
burner-vent-intent
balloon-vehicle-state
balloon-drift-physics
wind-field
altitude-safety
altitude-band-contract
altitude-band-resolver
route-object-descriptor
route-object-evaluator
wind-lane-hint
route-event-result-envelope
route-fixture-harness
mission-snapshot-projector
region-unlock-progression
```

### Render/world domains

```txt
three-render-host
terrain-sampler
world-generation
lake-generation
tree-scatter
cloud-scatter
wind-ribbon-rendering
basket-follow-camera
camera-zoom-blend
first-person-visibility-gate
hud-telemetry
```

### Visual object domains

```txt
hot-air-balloon-object
balloon-envelope-panel
balloon-mouth
balloon-streamer-fit
balloon-fabric-seam
balloon-basket
balloon-rigging
balloon-burner
rope-geometry
```

## Service map

### Already implemented or source-backed

```txt
createBalloonEngine
openAboveBalloonTelemetrySystem
world.setResource(BalloonSnapshot)
world.emit(BalloonTicked)
engine.openAbove.getState
buildHotAirBalloon
animateHotAirBalloon
buildEnvelopePanels
buildBalloonMouth
buildFittedStreamers
buildFabricSeams
buildBasket
buildRigging
animateRigging
buildBurner
animateBurner
installHotAirBalloonVisual
window.OpenAboveHotAirBalloonObjectKit
```

### Inline in `src/main.js`

```txt
seed-random
sample-terrain-height
sample-moisture
resolve-terrain-color
makeTerrain
makeLakes
makeTrees
makeClouds
makeWindRibbons
sample-wind-angle
sample-wind-speed
smooth-burner-value
smooth-vent-value
compute-buoyancy
compute-altitude-damping
compute-ceiling-softness
integrate-vertical-velocity
blend-velocity-toward-wind
clamp-above-terrain-clearance
accumulate-horizontal-distance
compute-basket-focus
compute-third-person-camera-position
compute-first-person-camera-position
blend-camera-mode
set-first-person-visibility
write-hud-html
window.GameHost.getState
```

### Needed before renderer extraction

```txt
loadOpenAboveProduct
loadBalloonDriftConfig
createBalloonSourceFingerprint
createBalloonSourceSnapshot
createSourceAcceptanceResult
createSourceAcceptanceLedger
projectGameHostSourceReadback
resolveAltitudeBand
projectRouteObjects
projectWindLaneHints
runSourceAcceptanceFixture
runDomFreeRouteFixture
```

## Kit inventory

### Implemented / source-backed kits

```txt
open-above-balloon-telemetry-kit
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

### Inline / candidate kits

```txt
open-above-runtime-host-kit
open-above-vite-static-publish-kit
open-above-three-render-host-kit
open-above-campaign-config-kit
open-above-legacy-flight-compatibility-kit
open-above-balloon-input-map-kit
open-above-balloon-state-kit
open-above-balloon-drift-physics-kit
open-above-burner-vent-intent-kit
open-above-wind-field-kit
open-above-altitude-safety-kit
open-above-terrain-sampler-kit
open-above-world-generation-kit
open-above-lake-generation-kit
open-above-tree-scatter-kit
open-above-cloud-scatter-kit
open-above-wind-ribbon-render-kit
open-above-basket-follow-camera-kit
open-above-camera-zoom-blend-kit
open-above-hud-telemetry-kit
open-above-gamehost-debug-kit
```

### Next-cut kits

```txt
open-above-product-copy-authority-kit
open-above-readme-route-copy-parity-kit
open-above-package-description-parity-kit
open-above-balloon-drift-config-kit
open-above-balloon-source-fingerprint-kit
open-above-balloon-source-snapshot-kit
open-above-source-acceptance-result-kit
open-above-source-acceptance-ledger-kit
open-above-gamehost-source-readback-kit
open-above-source-acceptance-fixture-kit
open-above-altitude-band-contract-kit
open-above-altitude-band-resolver-kit
open-above-route-object-config-kit
open-above-route-object-evaluator-kit
open-above-wind-lane-hint-kit
open-above-route-fixture-harness-kit
open-above-mission-snapshot-projector-kit
```

## Implementation boundary

Do not remove `FLIGHT` yet.

Do not extract terrain/world/camera first.

First add source objects and fixtures beside current behavior:

```txt
OPEN_ABOVE_PRODUCT
BALLOON_DRIFT
ALTITUDE_BANDS
ROUTE_OBJECTS
WIND_LANE_HINTS
BalloonSourceFingerprint
BalloonSourceSnapshot
SourceAcceptanceResult
SourceAcceptanceLedger
GameHostSourceReadback
```

## Next safe ledge

```txt
TheOpenAbove Source Acceptance Fixture Implementation Gate
```
