# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-11T00-49-45-04-00`

## Primary ordered gaps

```txt
1. immutable runtime admission
2. import-pure balloon module and compatibility admission
3. root session/frame/listener/resource ownership
4. ordered teardown and restart proof
5. fixed-step clock and visibility authority
6. sequenced input-to-tick admission
7. Meadow Lift objective authority
8. deterministic mission/render/GameHost proof
```

## Time-authority gaps

```txt
one RAF callback equals one simulation update
frameMs is capped at 80ms and dt is capped again at 1/30
slow-frame and hidden-tab time is silently discarded
no fixed-step accumulator or simulation tick ID exists
no maxSubsteps, backlog, overrun or dropped-time result exists
no visibilitychange policy exists
render frame, simulation tick and telemetry frame are conflated
mission elapsed would inherit browser cadence and visibility behavior
```

## Interaction gaps

```txt
keyboard events mutate a private Set directly
input samples have no sequence, target tick or result
burner and vent are polled once per RAF
wheel zoom mutates presentation state immediately
no deterministic command queue exists
no restart result exists
```

## Campaign gaps

```txt
CAMPAIGN declares 3 thermals, 5 gates, return radius and 300-second limit
WORLD declares objective counts and perch coordinates
the active route reads only the first region ID
no objective entities, progress reducer, mission phase, terminal result, restart or unlock transaction exists
```

## Render and readback gaps

```txt
render cadence drives simulation cadence
no renderFrameId/simulationTickId correlation exists
no interpolation alpha exists
no objective descriptors or consumption rows exist
telemetry frame is not a declared simulation tick
GameHost exposes live objects, not detached clock/input/mission proof
```

## Validation gaps

```txt
source-text smoke only
no runtime-admission fixture
no lifecycle/import-purity fixture
no 20/30/60/120 Hz parity fixture
no stall, overrun or visibility fixture
no input-sequence target-tick fixture
no mission route fixture
```

## Required guarantees

```txt
render cadence cannot change authoritative simulation results
visibility and overrun behavior are explicit
input transitions are admitted once at declared ticks
mission time derives from committed ticks
render/HUD/GameHost consume one committed observation
proof is bounded, detached and JSON-safe
```
