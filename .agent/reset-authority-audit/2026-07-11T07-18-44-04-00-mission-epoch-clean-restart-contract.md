# Reset Authority Audit: Mission Epoch Clean Restart Contract

**Timestamp:** `2026-07-11T07-18-44-04-00`

## Goal

Define the canonical Air Mail restart result so every subsystem crosses from one mission generation to the next atomically.

## Authority boundary

A restart is a mission transaction, not a parcel helper call.

```txt
runtime session
  owns lifetime and resource admission

fixed-step clock
  owns command order and tick boundaries

Air Mail mission domain
  owns phase, mission epoch, route proof, parcel and delivery

restart transaction
  coordinates all participants and commits one successor mission
```

## Participants

```txt
input adapter
simulation
balloon object projection
airstream domain
mail domain
route-proof ledger
camera rig
balloon presentation
visual domain
telemetry
HUD
GameHost
headless fixture adapter
```

## Pre-reset observation

The transaction must capture a detached row containing:

```txt
runtimeSessionId
missionEpoch
phase
simulationTickId
renderFrameId
position and velocity
elapsed and distance
held and queued input ranges
active/selected route
route-proof range
parcel status and delivery receipt
camera mode and zoom
state and render fingerprints
```

## Reset stages

```txt
1. admit ResetMission
2. freeze gameplay command admission
3. create resetTransactionId
4. enter restarting phase
5. increment missionEpoch
6. retire prior-epoch input and pending results
7. restore deterministic simulation initial state
8. restore deterministic airstream initial observation
9. clear parcel, route proof and delivery state
10. restore camera/presentation initial state
11. stage telemetry/HUD/GameHost projections
12. execute first fixed tick
13. submit first render
14. commit RestartReceipt
15. re-open gameplay command admission
```

## Canonical reset result

```json
{
  "type": "ResetMissionResult",
  "status": "accepted",
  "runtimeSessionId": "session-0001",
  "resetTransactionId": "restart-0002",
  "commandId": "cmd-reset-0002",
  "previousMissionEpoch": 1,
  "missionEpoch": 2,
  "retiredInputSequence": [90, 94],
  "retiredRouteProofSequence": [14, 21],
  "stateFingerprintBefore": "...",
  "stateFingerprintAfter": "...",
  "firstSimulationTickId": 1,
  "firstRenderFrameId": 1,
  "phase": "in-transit"
}
```

## Failure policy

```txt
preflight rejection
  -> no mutation
  -> rejected result

failure before epoch commit
  -> retain prior committed mission
  -> failed result

failure after epoch commit but before first frame
  -> remain in explicit failed/restarting state
  -> do not admit gameplay commands
  -> expose repair/retry result

projection-only failure
  -> retain committed mission and frame
  -> report bounded projection failure
```

## Stale-state policy

```txt
old command epoch -> rejected
old route proof epoch -> rejected
old delivery receipt epoch -> read-only history, never active authority
old render frame epoch -> never relabeled
old GameHost object references -> detached or invalidated by session generation
```

## Bounded journals

```txt
resetCommandJournal
resetResultJournal
missionEpochJournal
retiredInputJournal
routeProofJournal
deliveryResultJournal
committedFrameJournal
```

Each journal must be bounded, detached, JSON-safe and ordered by stable sequence.

## Required guarantees

```txt
no immediate redelivery after restart
no retained current selection after restart
no held input leaks into first post-reset tick
no old route proof can satisfy new delivery
same initial manifest + same reset command -> same successor fingerprint
HUD, telemetry, renderer and GameHost identify the same new mission epoch
```
