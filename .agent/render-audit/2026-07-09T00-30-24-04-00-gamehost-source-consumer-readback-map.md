# Render Audit — GameHost Source Consumer Readback Map

**Timestamp:** `2026-07-09T00-30-24-04-00`

## Scope

This audit records the visual/browser consumer seam for the next implementation. The next cut should not alter render appearance; it should add source readback beside the existing runtime.

## Current render surface

```txt
src/main.js
  -> THREE.Scene / PerspectiveCamera / WebGLRenderer
  -> terrain plane with vertex colors
  -> lake circle meshes
  -> trunk/crown tree groups
  -> cloud puff groups
  -> wind ribbon line group
  -> hot-air-balloon object group
  -> directional + hemisphere lighting
  -> fog and sky color
  -> requestAnimationFrame frame loop
```

## Current host readback

```txt
window.GameHost = {
  engine,
  NexusEngine,
  scene,
  renderer,
  camera,
  balloon,
  getState: () => ({
    nexusEngine: engine.openAbove?.getState?.(),
    local: snapshot()
  })
}
```

## Existing snapshot fields

```txt
status
region
objectType
elapsed
altitude
burner
vent
windSpeed
distance
cameraZoom
firstPersonBlend
position
velocity
wind
message
```

## Missing source readback fields

```txt
source.product
source.route
source.driftConfig
source.altitudeBands
source.routeObjects
source.windLaneHints
source.manifest
source.fingerprint
source.snapshot
source.acceptanceLedger
source.browserConsumerReadback
source.fixtureStatus
source.preservedHostShapes
```

## Browser consumer acceptance

The browser consumer row should prove:

```txt
GameHost exists
GameHost.getState is callable
getState().local still has the same current keys
getState().nexusEngine still has the same current telemetry shape
getState().source exists after implementation
getState().source.product.id == the-open-above
getState().source.product.currentRoute == balloon-drift
getState().source.snapshot.objectKit == open-above-hot-air-balloon-object-kit
getState().source.acceptanceLedger rows are visible
getState().source.fixtureStatus can report source fixture state without DOM/WebGL dependency
```

## Do not change during this ledge

```txt
renderer settings
camera FOV / near / far
tone mapping
fog values
terrain size / segment count
lake positions
tree scatter count
cloud scatter count
wind ribbon count
balloon object kit profile
basket camera blend behavior
HUD telemetry wording except source-proof markers if required
```

## Render-safe implementation order

```txt
1. Create source modules with pure objects/functions.
2. Add DOM-free fixture for source modules.
3. Add GameHost source readback helper.
4. Import helper into src/main.js additively.
5. Extend getState() with source without changing local/nexusEngine.
6. Add browser consumer fixture rows.
7. Wire source fixture into npm run check.
```

## Main render finding

The renderer is not the blocker. The visible Balloon Drift route is already coherent enough to preserve. The blocker is that a browser consumer cannot prove that the rendered route, HUD, package metadata, campaign copy, and source config all describe the same current product.
