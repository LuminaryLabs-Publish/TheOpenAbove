# Architecture Audit: Source, Input, and Frame Correlation DSK Map

**Timestamp:** `2026-07-10T14-50-38-04-00`

## Architectural read

The active Balloon Drift route is already decomposed into useful source-backed kits, but the composition boundary in `src/main.js` is still the only place that knows the exact execution order across simulation, camera, visual updates, telemetry, rendering, HUD, and GameHost readback.

```txt
route source
  -> runtime composer
  -> input state
  -> simulation state
  -> object transform
  -> presentation state
  -> camera state
  -> visual state
  -> telemetry publication
  -> render submission
  -> HUD projection
  -> aggregate GameHost snapshot
```

Each stage is independently understandable. No durable record correlates them.

## Current DSK/domain ownership

| Domain | Current owner | Services | Boundary condition |
|---|---|---|---|
| route composition | `src/main.js` | instantiate, sequence, expose GameHost | owns cross-domain order inline |
| campaign/world source | `src/data/campaign.config.js` | product, regions, world, legacy flight constants | current and legacy fields are mixed |
| keyboard input | `balloon-simulation-kit.js` | keydown, keyup, blur, burner/vent intent | hidden `Set`, no result rows |
| balloon simulation | `balloon-simulation-kit.js` | wind, buoyancy, damping, ceiling, terrain clearance, distance | snapshot has values but no frame/source/input IDs |
| wheel input | `balloon-camera-rig-kit.js` | wheel direction, clamped zoom | mutation has no accepted/clamped/no-change result |
| camera | `balloon-camera-rig-kit.js` | follow, basket blend, pose, FOV, clipping | state has no frame/input correlation |
| visual domain | `visual-domain.js` and subordinate kits | environment update, quality, render stats | latest aggregate state only |
| telemetry | `balloon-telemetry-kit.js` | publish current local snapshot to NexusEngine | no publication row tied to frame ID |
| render | visual domain | submit composer frame and stats | no consumption row or source fingerprint |
| HUD | `src/main.js` | project current runtime copy | no projection row or correlation ID |
| browser readback | `window.GameHost` | expose runtime objects and latest snapshots | no source/frame journal |
| headless validation | `tools/headless-editor-environment.mjs` | static inspection, npm check/build | does not execute deterministic runtime proof |

## Required parent domain

Create one composed proof domain rather than scattering ad hoc debug arrays:

```txt
open-above-runtime-proof-domain
```

It should own only JSON-safe proof, not runtime behavior.

### Required subdomains

```txt
source-authority-domain
input-result-domain
frame-correlation-domain
simulation-consumer-domain
camera-consumer-domain
visual-consumer-domain
telemetry-consumer-domain
render-consumer-domain
hud-consumer-domain
gamehost-readback-domain
fixture-domain
```

## Proposed contracts

### Source row

```js
{
  sourceId,
  sourceVersion,
  fingerprint,
  status,
  reason
}
```

### Input result row

```js
{
  inputId,
  sequence,
  device,
  code,
  phase,
  requestedValue,
  resolvedValue,
  status,
  reason
}
```

### Frame correlation row

```js
{
  frameId,
  elapsed,
  dt,
  sourceFingerprint,
  inputSequenceRange,
  simulationSnapshotId,
  cameraSnapshotId,
  visualSnapshotId,
  telemetryRowId,
  renderRowId,
  hudRowId
}
```

### Consumer row

```js
{
  frameId,
  consumerId,
  sourceIds,
  inputIds,
  snapshotId,
  status,
  reason
}
```

## Compatibility rules

```txt
Do not rename or remove GameHost.local.
Do not rename or remove GameHost.nexusEngine.
Do not alter simulation constants during the proof pass.
Do not alter camera behavior during the proof pass.
Do not change render order or visual output.
Do not delete legacy FLIGHT/campaign fields before compatibility rows exist.
Keep proof rows bounded and JSON-safe.
Keep the parent proof domain disposable and fixture-callable without a browser.
```

## Main architectural gap

The system can show current state but cannot explain causality. A diagnostic consumer cannot answer which input result, source fingerprint, simulation update, camera update, visual update, telemetry tick, render submission, and HUD projection belong to the same frame.

## Next safe ledge

```txt
TheOpenAbove Source Input Frame Correlation Ledger + GameHost Headless Fixture Gate
```