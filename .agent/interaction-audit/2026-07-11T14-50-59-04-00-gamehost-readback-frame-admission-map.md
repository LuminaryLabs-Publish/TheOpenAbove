# Interaction Audit: GameHost Readback Frame Admission Map

**Timestamp:** `2026-07-11T14-50-59-04-00`

## Summary

`window.GameHost` exposes live renderer, camera, scene, simulation, airstream, mail and visual objects. External consumers can read or mutate state between simulation, telemetry, render and HUD steps.

## Plan ledger

**Goal:** replace raw subsystem exposure with capability-scoped detached observations labeled by session, mission, tick and frame identity.

- [x] Inventory current GameHost fields.
- [x] Identify mutable references.
- [x] Identify missing admission and fencing.
- [x] Define detached read-model capabilities.
- [x] Define stale caller behavior.

## Current public surface

```txt
engine
NexusEngine
THREE
scene
renderer
camera
balloon
visual
simulation
airstream
mail
cameraRig
getState
```

## Risks

```txt
external mutation bypasses domain admission
caller can retain old subsystem references after reset/restart
read occurs at arbitrary point inside a browser frame
getState has no observation revision
Nexus and local snapshots have no shared commit receipt
headless automation cannot distinguish current mutable from committed visible state
```

## Required public capabilities

```txt
observation.getLatestCommitted
observation.getByRevision
observation.getFrameJournal
mission.getIdentity
runtime.getIdentity
renderer.getCommittedDiagnostics
```

Every result must be detached, bounded and JSON-safe. Mutation capabilities should be separate, sequenced commands rather than returned object references.
