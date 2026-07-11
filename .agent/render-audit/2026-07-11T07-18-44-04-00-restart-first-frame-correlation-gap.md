# Render Audit: Restart First-Frame Correlation Gap

**Timestamp:** `2026-07-11T07-18-44-04-00`

## Goal

Define how a successful Air Mail restart becomes visible and provable as one committed first frame rather than a set of independently mutated live objects.

## Current frame order

```txt
simulation.update(dt)
  -> mail.update(...)
  -> airstream.update(...)
  -> apply simulation to balloon mesh
  -> animate balloon and presentation
  -> update camera
  -> update visual domain
  -> publish telemetry
  -> render
  -> update HUD
  -> request next RAF
```

## Current restart visibility problem

The only reset method is `mail.reset()`. It can clear the parcel while all render-driving state remains unchanged:

```txt
balloon transform remains at the old position
camera remains focused on the old position
active route visuals remain highlighted
simulation elapsed continues
terrain streaming center remains unchanged
telemetry has no mission epoch
HUD has no reset transaction identity
GameHost exposes the same mutable object graph
```

If reset occurs while inside Brookhaven, the next `mail.update()` can deliver again before any clean restart frame exists.

## Missing render correlation fields

```txt
runtimeSessionId
missionEpoch
resetCommandId
resetTransactionId
simulationTickId
renderFrameId
stateFingerprint
mailFingerprint
routeFingerprint
cameraFingerprint
visualFingerprint
renderResult
hudProjectionFingerprint
telemetryPublicationId
```

## Required staged frame

```txt
stage reset state
  -> stage balloon transform
  -> stage airstream state
  -> stage parcel and route-proof state
  -> stage camera state
  -> stage visual update
  -> submit render
  -> verify render result
  -> commit firstPostResetFrame
  -> publish HUD, telemetry and GameHost projections
```

## Failure policy

```txt
reset mutation fails before render
  -> do not publish partial new-epoch observations

render fails after reset staging
  -> retain previous committed frame
  -> publish explicit failed restart result
  -> do not claim ready/in-transit phase

projection fails after render
  -> retain committed frame
  -> expose projection failure bound to that frame
```

## Required receipt

```json
{
  "type": "air-mail-restart-receipt",
  "missionEpoch": 2,
  "resetCommandId": "reset-0002",
  "resetTransactionId": "restart-0002",
  "simulationTickId": 1,
  "renderFrameId": 1,
  "stateFingerprint": "...",
  "mailFingerprint": "...",
  "routeFingerprint": "...",
  "cameraFingerprint": "...",
  "renderStatus": "presented",
  "phase": "in-transit"
}
```

## Proof requirements

```txt
first post-reset frame shows the declared start position
parcel is visibly and observably in transit
no town delivery ring is in a completed state
no prior route remains selected
HUD and telemetry report the new mission epoch
GameHost returns a detached observation for the same rendered frame
no old frame is mislabeled with the new epoch
```
