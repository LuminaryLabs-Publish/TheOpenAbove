# Render Audit — GameHost Source Manifest Readback

**Timestamp:** `2026-07-09T03-29-29-04-00`

## Visual surface

`TheOpenAbove` has a browser visual surface built by `src/main.js` with Three.js CDN.

The rendered frame includes:

```txt
terrain plane with vertex colors
lake discs
procedural trees
procedural cloud puffs
wind ribbons
hot-air-balloon object-kit assembly
sun, hemisphere light, fog
camera blend from third person to basket view
HUD telemetry overlay
```

## Current render loop

```txt
update(dt)
  -> balloon.position / rotation
  -> animateHotAirBalloon(balloon, performance.now(), state.burner)
  -> wind ribbon drift
  -> draw(dt)
  -> camera position and look target blend
  -> setFirstPersonVisibility(balloon, blend)
  -> renderer.render(scene, camera)
  -> updateHud()
```

## Current readback

```txt
window.GameHost.getState()
  -> nexusEngine: engine.openAbove.getState()
  -> local: snapshot()
```

Existing readback has route telemetry, but it does not report source manifest state.

## Missing readback

```txt
source.currentProduct
source.currentRoute
source.objectType
source.controls
source.cameraMode
source.sourceManifest.consumerCount
source.sourceFingerprint
source.sourceSnapshot
source.acceptanceRows[]
source.centralLedgerStatus
source.fixtureStatus
```

## Source manifest render contract

The next implementation should add source diagnostics without changing the render path.

```txt
current render frame
  -> unchanged renderer.render(scene, camera)
  -> unchanged HUD copy unless source copy is intentionally updated
  -> unchanged local snapshot shape
  -> unchanged nexusEngine snapshot shape
  -> additive source readback through GameHost
```

## Acceptance rows

```txt
existing_local_snapshot_shape_preserved
existing_nexus_snapshot_shape_preserved
gamehost_reports_balloon_source_snapshot
browser_consumer_reads_source_projection
source_manifest_lists_all_runtime_consumers
source_manifest_lists_central_ledger_consumer
central_ledger_matches_repo_local_latest_tracker
```

## Deferred render work

```txt
Do not split terrain renderer yet.
Do not split cloud renderer yet.
Do not split camera controller yet.
Do not tune balloon, rope fade, ride bob, burner vibration, lighting, or fog in this pass.
```
