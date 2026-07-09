# Render Audit: GameHost Source Readback Fixture

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Timestamp:** `2026-07-09T19-21-19-04-00`

## Render surface

The repo has a visual/render surface. `src/main.js` owns the Three.js renderer, scene, fog, lights, camera, terrain, lakes, trees, clouds, wind ribbons, balloon object placement, camera blend, first-person visibility, and HUD projection.

## Current render loop

```txt
createGame()
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
```

## Render readback gaps

```txt
No source ledger explains which route/product source the renderer is consuming.
No `GameHost.getState().source` exists.
No fixture-readable record ties current object type to hot-air-balloon object-kit metadata.
No render-facing proof marks README/package/campaign free-flight fields as stale or compatibility-only.
HUD and camera readback exist only through local snapshot fields, not source ownership rows.
```

## Preserve

```txt
current terrain, lakes, trees, clouds, wind ribbons
current hot-air-balloon object kit composition
current basket camera and rope fade
current local and Nexus GameHost shapes
```

## Next render ledge

Add additive source readback rows consumed by GameHost and a DOM-free fixture. The visible render surface should not change in this ledge.