# Render Audit — GameHost Source Readback Contract

**Timestamp:** `2026-07-08T22-19-38-04-00`

## Current render surface

```txt
src/main.js
  -> creates Three.js scene / camera / WebGLRenderer
  -> builds terrain, lakes, trees, clouds, wind ribbons
  -> builds hot-air-balloon visual object
  -> update(dt) mutates balloon position and wind-ribbon position
  -> draw(dt) resolves camera and first-person blend
  -> renderer.render(scene, camera)
  -> updateHud() writes DOM HUD text
  -> window.GameHost.getState() returns local and nexusEngine telemetry
```

## Current source-backed readback

```txt
window.GameHost.getState().local
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

window.GameHost.getState().nexusEngine
  mirrors openAbove.balloonSnapshot from Nexus telemetry kit
```

## Missing source readback

```txt
window.GameHost.getState().source is absent.
No source fingerprint is exposed.
No product/source snapshot is exposed.
No config parity report is exposed.
No route object projection is exposed.
No altitude band projection is exposed.
No wind lane hint projection is exposed.
No acceptance ledger is exposed.
No browser consumer readback result is exposed.
```

## Required additive readback shape

```txt
source: {
  product,
  driftConfig,
  sourceManifest,
  sourceFingerprint,
  sourceSnapshot,
  acceptanceLedger,
  routeObjects,
  altitudeBands,
  currentAltitudeBand,
  windLaneHints,
  browserConsumerReadback,
  fixtureStatus
}
```

## Render guardrail

The next implementation should not move renderer ownership.

It should only add source readback alongside the existing `local` and `nexusEngine` fields and prove those legacy shapes stay unchanged.

## Browser readback rows

```txt
browser_consumer_reads_source_projection
existing_local_snapshot_shape_preserved
existing_nexus_snapshot_shape_preserved
gamehost_reports_balloon_source_snapshot
source_snapshot_reports_visual_object_kit
```
