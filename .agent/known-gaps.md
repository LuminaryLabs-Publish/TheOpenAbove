# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-11T05-25-29-04-00`

## Primary ordered gaps

```txt
1. immutable runtime admission
2. import-pure balloon module and compatibility admission
3. root session/frame/listener/resource ownership
4. ordered teardown and restart proof
5. fixed-step clock, visibility and sequenced input authority
6. versioned Air Mail route and parcel source
7. correct-current delivery admission and causality proof
8. route traversal, delivery and reset result journals
9. committed simulation/render/telemetry/GameHost correlation
10. terrain surface and horizon revision authority
11. bounded near+horizon terrain generation
```

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
route field is deterministic for identical position and elapsed input
simulation elapsed still depends on variable RAF cadence
no simulation tick ID is attached to a sample
no route-entry or route-exit event exists
no dwell-time or segment-progression proof exists
no minimum retained-current policy exists
selected route is inferred from influence >= 0.35 and overwritten by any later route
no wrong-current result exists
no bounded route sample journal exists
```

## Delivery authority gaps

```txt
correctAirstreamId is stored but never checked by updateDeliveryProgress
volume membership alone commits delivery
ambient drift can complete delivery
wrong route can complete delivery
selectedAirstreamId is not included in the delivery event
no accepted/rejected/no-op delivery result contract
no mission phase beyond parcel status
no delivery transaction ID or receipt fingerprint
no next-parcel or route-completion progression
mail.reset exists but browser R is not wired
no terminal/restart epoch exists
```

## Interaction gaps

```txt
keyboard events mutate a private Set directly
burner and vent are polled once per RAF
input transitions have no sequence or target tick
wheel zoom mutates presentation immediately
no typed climb/vent/reset command
no command admission or rejection result
no route-choice intent exists beyond physical altitude
no deterministic command replay exists
```

## Render and readback gaps

```txt
airstream ribbons and wisps have no render-consumption rows
town markers and delivery rings have no source or frame fingerprint
mail completion is committed before render without a committed-frame receipt
telemetry snapshots before visual.render
HUD and telemetry may describe a state not yet presented
GameHost exposes mutable domains, scene, renderer, camera and simulation
no detached route, parcel, delivery, terrain or render journal
no shared simulationTickId/renderFrameId/deliveryTransactionId
```

## Horizon terrain gaps

```txt
new horizon streamer is not represented in the prior terrain audit
near and horizon streamers rebuild independently
both build geometry synchronously in the RAF path
horizon initial source census is about 136 chunks and 7,624 vertices
combined high-quality terrain census is about 68,221 vertices
minimum combined height evaluations are about 341,105
no near/horizon overlap or gap preflight exists
no cross-streamer height/color/normal seam fixture exists
no build queue, frame budget, cancellation or atomic replacement
no horizon chunk-build observation rows
```

## Lifecycle gaps

```txt
root RAF id is not retained
createGame returns no session owner
mail, airstream and visual domains have disposers but root does not compose them
hot-air-balloon object module still starts compatibility RAF work at import time
GameHost replacement and teardown are not authoritative
restart cannot prove old listeners, RAFs, geometry and globals are retired
```

## Validation gaps

```txt
source-shape smoke remains broad but mostly string-based
pure airstream tests cover deterministic samples and overlap blending
pure mail tests cover wrong-town rejection, destination volume and one-shot delivery
no wrong-current-at-correct-town rejection test
no ambient-arrival rejection test
no retained-route traversal test
no route dwell/segment progression test
no browser R reset test
no 20/30/60/120 Hz route parity test
no committed delivery/render/GameHost correlation test
no near+horizon workload or seam fixture
```

## Required guarantees

```txt
one versioned Air Mail manifest owns route, parcel, town and destination identity
correct-current proof is required before delivery completion
wrong-current and ambient arrivals return explicit rejection results
route traversal evidence is bounded, detached and deterministic
reset creates a new mission epoch and retires prior progress
render/HUD/telemetry/GameHost consume one committed mission frame
simulation results do not change with browser refresh cadence
near and horizon terrain share declared continuity and work-budget contracts
all proof is JSON-safe and independent of live Three.js objects
```