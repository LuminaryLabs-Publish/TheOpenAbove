# Render Audit: Objective Volume Render Consumption Gap

**Timestamp:** `2026-07-10T23-20-41-04-00`

## Current render loop

```txt
visual.update
  -> weather
  -> sun / sky / clouds / aerial perspective
  -> terrain / grass / water
  -> lens and HDR composer state

visual.render
  -> composer.render
  -> adaptive-resolution sample
  -> renderer call/triangle statistics
```

The visual domain renders environment and balloon presentation only. It receives physical flight state and camera context, but no mission observation or objective descriptor set.

## Missing objective render surfaces

```txt
thermal volume descriptors
wind-gate descriptors
perch return-zone descriptor
completed/active/locked objective states
return-ready state
mission phase
remaining time
completion/failure result
unlock projection
```

## Current proof limitation

The renderer exposes aggregate draw calls and triangles. It does not record:

```txt
mission frame ID
mission source fingerprint
objective descriptor IDs received
objective descriptor IDs consumed
visible/culled objective IDs
thermal/gate/perch draw counts
mission-phase presentation state
HUD projection correlation
```

Adding meshes directly to `visual-domain.js` would make the renderer an objective-rule owner. That would recreate the same authority problem in a different layer.

## Required render contract

The campaign domain should emit renderer-neutral rows:

```js
{
  frameId,
  missionId,
  missionFingerprint,
  objectives: [
    { id, type, transform, status, visible, styleToken }
  ],
  phase,
  returnReady,
  remainingSeconds
}
```

The visual adapter should return a detached consumption row:

```js
{
  frameId,
  missionFingerprint,
  receivedObjectiveIds,
  renderedObjectiveIds,
  culledObjectiveIds,
  unsupportedObjectiveIds,
  drawCalls,
  triangles
}
```

## Required guarantees

```txt
renderer never changes objective progress
renderer never commits completion/failure/unlock
objective IDs are stable across simulation and render projections
one render row references one committed mission observation
HUD and GameHost reference the same mission frame
missing or unsupported objective descriptors are explicit
```

## Validation gap

`tests/smoke.mjs` verifies visual source patterns but never constructs or submits mission objective descriptors. A deterministic route fixture should prove descriptor generation before a browser smoke proves visual consumption.

## Next safe ledge

```txt
TheOpenAbove Meadow Lift Objective Authority
+ Deterministic Route Fixture Gate
```
