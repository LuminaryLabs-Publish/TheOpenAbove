# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-11T09-21-50-04-00`

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

## Product identity gaps

```txt
README and AGENTS describe Meadow Lift free-flight
campaign.config.js still selects meadow-lift and Cloud Basin
active runtime is Air Mail hot-air-balloon routing
no selectedMode or modeVersion
no supersession, migration or coexistence policy
no product/source manifest fingerprint
runtime snapshot combines mail-flight with meadow-lift
package description describes generic wind drift, not the active mission
no save/replay compatibility boundary for mode changes
```

## Control contract gaps

```txt
README documents pitch, bank, boost and R restart
runtime uses burner and vent altitude control
A/D/Left/Right are documented but ignored
R is documented but ignored
Shift vent is active but undocumented
wheel zoom is active but absent from README controls
private key Set has no typed command model
no binding observation, revision or parity fixture
```

## Projection gaps

```txt
HUD hard-codes Brookhaven and meadow current
simulation message hard-codes Brookhaven
route source already owns destinationTownId and correctAirstreamId
telemetry and GameHost expose no product/source fingerprint
headless status cannot prove selected mode
public documentation is manually maintained outside source authority
```

## Air Mail source gaps

```txt
active route exists in an unversioned module
no route schema version
no route/parcel/town manifest fingerprint
no explicit relation to legacy CAMPAIGN
correctAirstreamId is stored but not enforced
no mission phase or typed completion result
no next-parcel or progression policy
```

## Airstream authority gaps

```txt
route field depends on variable RAF elapsed
no simulation tick ID is attached to samples
no route-entry or route-exit event
no dwell-time or segment-progression proof
selected route is mutable last-seen state
no wrong-current result
no bounded route sample journal
no airstream reset generation
```

## Restart authority gaps

```txt
KeyR has no consumer
no typed ResetMission command
no runtimeSessionId or missionEpoch
mail.reset clears parcel fields only
balloon simulation and airstream domain have no reset method
held input, movement, elapsed, camera and telemetry survive
reset inside Brookhaven can immediately redeliver
no first post-reset tick/render receipt
```

## Render and readback gaps

```txt
telemetry snapshots before visual.render
HUD and telemetry may describe state not yet presented
GameHost exposes mutable domains, scene, renderer, camera and simulation
no shared productSourceFingerprint/missionEpoch/simulationTickId/renderFrameId
no committed product-frame observation
no detached bounded route, parcel, reset, terrain or render journals
```

## Horizon terrain gaps

```txt
near and horizon streamers rebuild independently
both build geometry synchronously in the RAF path
no shared terrain source revision
no cross-streamer seam preflight
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
mission reset and full-runtime restart are not distinguished
```

## Validation gaps

```txt
no product manifest fixture
no mode supersession fixture
no control binding parity fixture
no HUD source parity fixture
no README/AGENTS parity fixture
no runtime/headless source identity fixture
no wrong-current delivery fixture
no full mission reset fixture
no multi-refresh-rate route parity fixture
no near+horizon workload or seam fixture
```

## Required guarantees

```txt
one runtime session selects exactly one versioned product mode
legacy Meadow Lift source is explicitly archived, migrated or selectable
controls are generated from one canonical contract
HUD and public copy project from accepted source data
runtime, telemetry, GameHost and headless tools share one source fingerprint
correct-current proof is required before delivery
restart creates a new mission epoch
render/HUD/telemetry/GameHost consume one committed mission frame
near and horizon terrain share continuity and work-budget contracts
all proof is bounded, detached and JSON-safe
```
