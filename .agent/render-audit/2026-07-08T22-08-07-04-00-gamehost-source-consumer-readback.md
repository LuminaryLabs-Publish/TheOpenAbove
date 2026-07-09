# Render Audit — GameHost Source Consumer Readback

**Timestamp:** `2026-07-08T22-08-07-04-00`

## Current render surface

`TheOpenAbove` renders through `src/main.js` with Three.js CDN, a single canvas, inline scene construction, inline camera blending, inline HUD writes, and a hot-air-balloon object kit.

## Existing render path

```txt
createGame()
  -> create THREE.Scene
  -> create PerspectiveCamera
  -> create WebGLRenderer(canvas)
  -> makeTerrain(scene)
  -> makeLakes(scene)
  -> makeTrees(scene)
  -> makeClouds(scene)
  -> makeWindRibbons(scene)
  -> buildHotAirBalloon()
  -> update(dt)
  -> draw(dt)
  -> renderer.render(scene, camera)
  -> updateHud()
  -> window.GameHost.getState()
```

## Render authority currently inline

```txt
renderer pixel ratio
shadow map enablement
tone mapping
tone mapping exposure
sun and hemisphere light values
terrain mesh sizing and segmentation
terrain vertex colors
lake disc descriptors
tree scatter descriptors
cloud scatter descriptors
wind ribbon line descriptors
balloon object position and rotation
third-person camera placement
first-person basket placement
first-person visibility fade
HUD HTML
```

## Current readback gap

`window.GameHost.getState()` currently exposes:

```txt
nexusEngine
local
```

It does not yet expose:

```txt
source.product
source.driftConfig
source.sourceManifest
source.sourceFingerprint
source.sourceSnapshot
source.acceptanceLedger
source.altitudeBands
source.routeObjects
source.windLaneHints
source.fixtureStatus
source.browserConsumerReadback
```

## Next render-safe addition

Add `window.GameHost.getState().source` as a read-only, additive diagnostics projection. It should not move renderer ownership yet.

Target shape:

```txt
window.GameHost.getState()
  -> nexusEngine    existing shape preserved
  -> local          existing shape preserved
  -> source         new additive source diagnostics
```

## Browser consumer fixture target

```txt
browser_consumer_reads_source_product
browser_consumer_reads_drift_config
browser_consumer_reads_source_manifest
browser_consumer_reads_source_fingerprint
browser_consumer_reads_source_snapshot
browser_consumer_reads_acceptance_ledger
browser_consumer_reads_existing_local_shape
browser_consumer_reads_existing_nexus_shape
browser_consumer_does_not_require_renderer_extraction
```

## What not to change in the next implementation

```txt
Do not replace WebGLRenderer.
Do not alter camera constants.
Do not alter terrain/lake/tree/cloud/wind-ribbon visuals.
Do not replace the hot-air-balloon object kit.
Do not move HUD rendering into a new renderer service yet.
Do not remove the existing GameHost local/nexusEngine fields.
```

## Main finding

The visual route is already coherent enough for the next pass. The missing render-side proof is not fidelity; it is consumer readback: browser and fixture code need to prove that the route source agrees with the visible Balloon Drift runtime without changing the rendered frame.
