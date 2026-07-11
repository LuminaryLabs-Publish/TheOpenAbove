# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-11T07-18-44-04-00`

## Primary ordered gaps

```txt
1. immutable runtime admission
2. import-pure balloon module and compatibility admission
3. root session/frame/listener/resource ownership
4. ordered teardown and full-runtime restart proof
5. fixed-step clock, visibility and sequenced input authority
6. versioned Air Mail route and parcel source
7. correct-current delivery admission and route proof
8. complete mission reset transaction and mission epoch
9. committed simulation/render/telemetry/GameHost correlation
10. terrain surface and horizon revision authority
11. bounded near+horizon terrain generation
```

## Restart authority gaps

```txt
KeyR is never consumed
no typed ResetMission command
no command sequence or target tick
no runtimeSessionId or missionEpoch
no restarting phase
no reset admission/rejection result
mail.reset clears parcel fields only
balloon simulation has no reset method
private held-key Set survives parcel reset
position, velocity, wind and vertical velocity survive
burner, vent, elapsed and distance survive
simulation airstream sample survives
airstream-domain active route and last sample survive
camera zoom/mode/smoothing survive
telemetry and GameHost have no reset transaction identity
no firstPostResetTickId or firstPostResetRenderFrameId
no stale command, route-proof or delivery-receipt rejection
```

## Immediate-redelivery gap

```txt
deliver at Brookhaven
  -> call GameHost.mail.reset()
  -> balloon remains inside delivery volume
  -> next RAF calls mail.update()
  -> volume membership remains true
  -> parcel can deliver again immediately
```

The current one-shot delivery guard is parcel-local and is cleared by the parcel reset.

## Air Mail source gaps

```txt
legacy CAMPAIGN still identifies meadow-lift
active Air Mail route exists in a separate unversioned module
no route schema version
no route/parcel/town manifest fingerprint
no campaign-to-mail migration or supersession declaration
HUD hard-codes Brookhaven instead of using route data
package description and AGENTS.md still describe the previous slice
```

## Airstream authority gaps

```txt
route field is deterministic only for identical position and elapsed input
simulation elapsed depends on variable RAF cadence
no simulation tick ID is attached to a sample
no route-entry or route-exit event
no dwell-time or segment-progression proof
no minimum retained-current policy
selected route is overwritten by any later route with influence >= 0.35
no wrong-current result
no bounded route sample journal
no airstream reset generation
```

## Delivery authority gaps

```txt
correctAirstreamId is stored but not checked
volume membership alone commits delivery
ambient drift can complete delivery
wrong route can complete delivery
selectedAirstreamId is not included in delivery event
no accepted/rejected/no-op delivery result
no delivery transaction ID or receipt fingerprint
no next-parcel or route-completion progression
no mission epoch or stale-proof checks
```

## Interaction gaps

```txt
keyboard events mutate a private Set directly
burner and vent are polled once per RAF
input transitions have no sequence or target tick
wheel zoom mutates presentation immediately
no typed climb, vent or reset command
no command admission or rejection result
no deterministic command replay
no held-input retirement during restart
```

## Render and readback gaps

```txt
airstream and town visuals have no render-consumption rows
mail completion and reset are not tied to committed frames
telemetry snapshots before visual.render
HUD and telemetry may describe state not yet presented
GameHost exposes mutable domains, scene, renderer, camera and simulation
no detached route, parcel, reset, terrain or render journal
no shared missionEpoch/simulationTickId/renderFrameId/resetTransactionId
no first post-reset frame receipt
```

## Horizon terrain gaps

```txt
near and horizon streamers rebuild independently
both build geometry synchronously in the RAF path
horizon initial source census is about 136 chunks and 7,624 vertices
combined high-quality terrain census is about 68,221 vertices
minimum combined height evaluations are about 341,105
no near/horizon overlap or gap preflight
no cross-streamer height/color/normal seam fixture
no build queue, frame budget, cancellation or atomic replacement
no horizon chunk-build observation rows
```

## Lifecycle gaps

```txt
root RAF id is not retained
createGame returns no session owner
mail, airstream and visual disposers are not composed by root
balloon object module starts compatibility RAF work at import time
GameHost replacement and teardown are not authoritative
full-runtime restart cannot prove old listeners, RAFs, geometry and globals are retired
mission reset and full-runtime restart are not distinguished by contracts
```

## Validation gaps

```txt
pure mail reset test checks parcel fields only
no host KeyR reset test
no reset-inside-Brookhaven regression test
no held-burner or held-vent reset test
no stale command/route-proof rejection test
no repeated-reset policy test
no first post-reset tick/frame correlation test
no wrong-current-at-correct-town rejection test
no ambient-arrival rejection test
no multi-refresh-rate route parity test
no near+horizon workload or seam fixture
```

## Required guarantees

```txt
one versioned Air Mail manifest owns mission identity
correct-current proof is required before delivery
restart creates a new mission epoch
all prior input, route proof and delivery authority are retired
balloon, airstream, mail and camera reset atomically
reset inside a destination volume cannot redeliver immediately
first post-reset simulation and rendered frame are correlated
render/HUD/telemetry/GameHost consume one committed mission frame
near and horizon terrain share continuity and work-budget contracts
all proof is bounded, detached and JSON-safe
```
