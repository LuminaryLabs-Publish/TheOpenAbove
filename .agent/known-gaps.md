# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-11T11-31-06-04-00`

## Primary ordered gaps

```txt
1. immutable runtime admission
2. import-pure balloon module and compatibility admission
3. root session/frame/listener/resource ownership
4. ordered teardown and full-runtime restart proof
5. fixed-step clock, visibility and sequenced input authority
6. product manifest, selected mode and supersession authority
7. canonical control contract and public/runtime parity
8. versioned Air Mail route and parcel source
9. correct-current delivery admission and route proof
10. complete mission reset transaction and mission epoch
11. committed simulation/render/telemetry/GameHost correlation
12. terrain surface and horizon revision authority
13. bounded near+horizon terrain generation
```

## Mission restart gaps

```txt
KeyR has no consumer
no typed ResetMission command
no runtimeSessionId or missionEpoch
no mission phase transition to restarting
no resetTransactionId or duplicate handling
no canonical initial mission snapshot
private held-key Set has no reset adapter
balloon simulation has no reset service
airstream domain has no reset service
camera rig has no reset service
presentation and visual reset policy absent
telemetry has no reset receipt or epoch projection
mail.reset clears parcel fields only
pre-reset route and delivery proof are not epoch-bound
no post-reset delivery lockout
no first post-reset simulation tick receipt
no first post-reset render receipt
```

## Immediate state-divergence risk

```txt
balloon inside Brookhaven
  -> mail.reset()
  -> parcel delivered=false
  -> balloon position unchanged
  -> next mail.update samples same destination volume
  -> parcel delivered=true again
```

The current API can therefore report a reset parcel without a reset mission, then immediately reverse that parcel state.

## Input gaps

```txt
documented R restart is ignored
burner and vent are private held-key state
no input command sequence
no expected mission epoch on input
no queued-command retirement
no held-input acknowledgement after reset
```

## Simulation gaps

```txt
startPosition is not retained as a canonical reset snapshot
initial velocity, wind, burner, vent, message and airstream state are not reusable through reset
elapsed and distance cannot be reset through a public service
reset result and failure policy absent
```

## Mail and airstream gaps

```txt
parcel reset is in-place and unversioned
correct-current proof is not enforced
selected current is mutable last-seen state
airstream active route and last sample survive parcel reset
no route-proof revision or stale-proof rejection
no reset-specific delivery admission phase
```

## Camera, presentation and render gaps

```txt
camera zoom, first-person blend, mode, target and position survive parcel reset
balloon presentation animation continues from predecessor elapsed time
visual quality and dynamic-resolution state have no declared reset policy
telemetry snapshots before visual.render
no shared missionEpoch/simulationTickId/renderFrameId
no first post-reset canvas acknowledgement
```

## Product identity gaps

```txt
README and AGENTS describe Meadow Lift free-flight
campaign.config.js still selects meadow-lift and Cloud Basin
active runtime is Air Mail hot-air-balloon routing
no selectedMode or modeVersion
no supersession or migration policy
runtime snapshot combines mail-flight with meadow-lift
HUD and simulation copy hard-code Brookhaven
```

Restart must bind to the accepted product and mission manifest rather than hard-coded legacy or Air Mail strings.

## Lifecycle gaps

```txt
root RAF id is not retained
createGame returns no session owner
mail, airstream, camera, simulation and visual disposal are not composed
full-runtime restart and mission reset are not distinct
GameHost exposes mutable subsystem objects
old callers cannot be fenced after a successor mission starts
```

## Terrain gaps

```txt
near and horizon streamers rebuild independently
no shared terrain source revision
no seam preflight
no frame work budget or cancellation
no typed build result or bounded chunk-build journal
```

## Required fixture gaps

```txt
fixture:air-mail-reset-pure
fixture:air-mail-reset-host
fixture:air-mail-reset-keyboard
fixture:air-mail-reset-held-input
fixture:air-mail-reset-inside-destination
fixture:air-mail-reset-stale-proof
fixture:air-mail-reset-repeat
fixture:air-mail-reset-rollback
fixture:air-mail-reset-first-frame
fixture:air-mail-reset-render-failure
```

## Required guarantees

```txt
one accepted reset creates exactly one new mission epoch
all mission-owned subsystem state commits atomically
held and queued predecessor input is retired
predecessor route and delivery proof cannot be reused
reset inside Brookhaven cannot immediately redeliver
repeat and stale reset requests are typed and side-effect free
HUD, telemetry, GameHost and canvas agree on the new epoch
the first post-reset simulation tick and render frame are observable
all journals are bounded, detached and JSON-safe
```
