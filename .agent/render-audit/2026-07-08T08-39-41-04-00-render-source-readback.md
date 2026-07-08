# Render Source Readback — TheOpenAbove

**Timestamp:** `2026-07-08T08:39:41-04:00`

## Render surface

The current render surface is a full-screen Three.js canvas mounted from `index.html` through `src/main.js`.

The visual is coherent, but the renderer is not yet descriptor-driven. It still owns terrain, lakes, trees, clouds, wind ribbons, camera, HUD, and GameHost projection in the same runtime file that owns simulation state.

## Current render loop

```txt
createGame()
  -> create Scene / PerspectiveCamera / WebGLRenderer
  -> set pixel ratio, shadow map, tone mapping, fog, lights
  -> makeTerrain(scene)
  -> makeLakes(scene)
  -> makeTrees(scene)
  -> makeClouds(scene)
  -> makeWindRibbons(scene)
  -> buildHotAirBalloon()
  -> requestAnimationFrame(frame)
  -> update(dt)
  -> engine.tick(dt)
  -> draw(dt)
  -> updateHud()
```

## Render domains

```txt
three-render-host
scene-lighting
fog-atmosphere
tone-mapping
procedural-terrain-render
lake-disc-render
tree-scatter-render
cloud-puff-render
wind-ribbon-line-render
hot-air-balloon-object-render
balloon-envelope-render
balloon-rigging-render
balloon-basket-render
balloon-burner-render
basket-follow-camera
near-basket-camera-blend
first-person-visibility-gate
hud-html-render
```

## Camera read

```txt
wheel input mutates camera.userData.zoom
zoom resolves target first-person blend
basketFocus = position + side offset + wind forward offset + lower basket offset
thirdPersonPos = basketFocus - windForward * zoom + side * zoom factor + vertical lift
firstPersonPos = position + side offset + windForward offset + basket-height offset
camera.position lerps to blended position
camera.lookAt(blended target)
setFirstPersonVisibility hides envelope/rigging near basket view
```

## Current renderer gaps

```txt
No RenderFrame descriptor exists.
No WorldRenderPlan descriptor exists.
No camera request/result record exists.
HUD text is not projected from a mission snapshot.
Terrain/lake/tree/cloud/wind-ribbon descriptors are not serializable yet.
Camera blend is not fixture-readable outside the browser.
Render status is not present in GameHost diagnostics beyond the local snapshot cameraZoom / firstPersonBlend fields.
```

## Do not extract yet

Do not split the renderer first. Renderer extraction would lock in the current source authority drift.

The next implementation should first make these source facts canonical:

```txt
current product = hot-air-balloon drift
current controls = burner / vent / wheel camera blend
current config = BALLOON_DRIFT, not legacy FLIGHT
current route source = product copy + campaign copy + runtime config + GameHost source snapshot
```

## Renderer-safe next step

After product/config parity passes, add a small renderer diagnostic projection:

```txt
RenderSourceReadback
  buildId
  rendererKind
  objectType
  cameraMode
  cameraZoom
  firstPersonBlend
  terrainProfileId
  windRibbonProfileId
  hudProductTitle
  sourceFingerprint
```

Keep it additive and read-only.
