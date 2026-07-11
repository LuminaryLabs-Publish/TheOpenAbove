# Render Audit: Airstream, Town and Horizon Consumption Gap

**Timestamp:** `2026-07-11T05-25-29-04-00`

## Goal

Document how the new route, town and horizon descriptors reach Three.js and what proof is missing between gameplay state and presented pixels.

## Current render path

```txt
airstream route points
  -> CatmullRom curves
  -> three tube ribbons per route
  -> animated point wisps

town data
  -> ten houses per town
  -> mail marker
  -> pulsing delivery ring

terrain source
  -> near chunk streamer
  -> horizon annulus streamer
  -> shared material and world-space color field

RAF
  -> simulation/mail/airstream update
  -> visual update
  -> telemetry tick
  -> HDR composer render
  -> dynamic-resolution sample
  -> HUD update
```

## Main gaps

1. Route ribbons and wisps have no route-source revision or consumption result.
2. Town groups and delivery rings have no parcel, route, mission-epoch or frame identity.
3. Mail completion can commit before the frame presenting arrival is submitted.
4. Telemetry executes before `visual.render()`, while renderer statistics update afterward.
5. HUD is updated after render and hard-codes Brookhaven labels, so HUD, telemetry and scene can project different phases of one RAF.
6. GameHost exposes live scene, renderer, simulation, airstream and mail objects instead of one immutable committed observation.
7. Near and horizon terrain use independent membership maps and synchronous rebuilds without one atomic render-consumption result.

## Required committed frame row

```txt
renderFrameId
simulationTickId
missionEpoch
routeSourceRevision
mailSourceRevision
parcelId
activeRouteId
routeProofRange
deliveryTransactionId
deliveryResult
nearTerrainRevision
horizonTerrainRevision
activeNearChunkCount
activeHorizonChunkCount
drawCalls
triangles
renderScale
submitted
presentedOrBestAvailableResult
```

## Required renderer services

```txt
consume immutable airstream visual descriptors
consume immutable town/delivery descriptors
consume one committed mission observation
return route/town/terrain consumption rows
retain previous committed frame on render failure
publish bounded detached observations to HUD, telemetry and GameHost
```

## Fixture gate

```txt
same committed mission frame reaches scene, HUD, telemetry and GameHost
delivery receipt references the frame that presents destination arrival
wrong-current rejection is visible without mutating delivered state
route and town source revisions match their rendered descriptors
near and horizon terrain consumption identifies one shared surface revision
```