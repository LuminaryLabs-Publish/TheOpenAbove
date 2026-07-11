# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-11T03-01-38-04-00`

## Primary ordered gaps

```txt
1. immutable runtime admission
2. import-pure balloon module and compatibility admission
3. root session/frame/listener/resource ownership
4. ordered teardown and restart proof
5. fixed-step clock and visibility authority
6. sequenced input-to-tick admission
7. terrain-surface descriptor and revision authority
8. LOD-invariant slope and normal continuity
9. bounded chunk generation and rebuild evidence
10. Meadow Lift objective authority
11. deterministic mission/render/GameHost proof
```

## Newly reconciled terrain change

```txt
random 64x64 terrain color texture removed
random normal texture removed
texture repeat settings removed
normal-map perturbation removed
Frutiger Aero palette added
large, medium and local world-space color fields added
source smoke updated to assert the new implementation shape
```

## Terrain-surface authority gaps

```txt
no versioned terrain surface descriptor
no palette or algorithm revision
no terrain surface fingerprint
no detached color-sample rows
no active chunk/LOD observation rows
no numeric proof that shared world coordinates produce equal colors across LODs
no terrain build-duration or vertex-work result
```

## LOD and seam gaps

```txt
slope sampleStep equals chunkSize / LOD segments
slope and rock blending therefore vary with LOD sampling radius
chunk normals are computed independently
mixed-resolution edges have no welded-normal or seam policy
LOD replacement is immediate rather than committed after continuity validation
no height/color/normal edge fixture exists
```

## Main-thread rebuild gaps

```txt
camera chunk-center change triggers synchronous rebuild
new and replacement chunk geometries are built in the RAF path
high-quality initial radius-three set can contain 37 chunks and 60,597 vertices
height is sampled five times per vertex for height and slope
terrainColor allocates and blends one THREE.Color per vertex
no queue, generation budget, prewarm, cache or Worker path exists
no build time, deferred work or dropped-frame result exists
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
camera movement implicitly triggers chunk rebuilds without an admission/result row
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
no terrainSurfaceRevision or terrain fingerprint exists
no active LOD map, chunk-build journal or seam result exists
no objective descriptors or consumption rows exist
telemetry frame is not a declared simulation tick
GameHost exposes live objects, not detached clock/input/terrain/mission proof
```

## Validation gaps

```txt
source-text smoke only
no runtime-admission fixture
no lifecycle/import-purity fixture
no 20/30/60/120 Hz parity fixture
no stall, overrun or visibility fixture
no input-sequence target-tick fixture
no terrain numeric color fixture
no LOD seam and normal continuity fixture
no chunk rebuild budget fixture
no mission route fixture
```

## Required guarantees

```txt
render cadence cannot change authoritative simulation results
visibility and overrun behavior are explicit
input transitions are admitted once at declared ticks
terrain color sampling is deterministic and versioned
shared world coordinates produce LOD-invariant authoritative surface values
chunk generation cannot consume an unbounded render frame
render/HUD/GameHost consume one committed terrain observation
mission time derives from committed ticks
proof is bounded, detached and JSON-safe
```