# Gameplay Audit: Declared Mission, Endless Drift Loop

**Timestamp:** `2026-07-10T23-20-41-04-00`

## Product loop declared by repository docs

```txt
start above the canopy
  -> catch three thermals
  -> clear five wind gates
  -> return to the sky perch
  -> complete Meadow Lift
  -> unlock Cloud Basin

failure/recovery:
  -> exceed mission limit or fail route
  -> restart with R
```

## Gameplay loop actually executed

```txt
start at [0, 105, 0]
  -> read burner/vent key state
  -> calculate procedural wind
  -> update buoyancy and vertical velocity
  -> drift horizontally
  -> clamp against terrain clearance
  -> accumulate distance
  -> repeat forever
```

## Source/runtime mismatch

The campaign source defines objective targets and a time limit. The world source defines objective counts and perch coordinates. The active simulation accepts only `terrainHeight` and `startPosition`; it does not receive the campaign region, objective targets, world objective counts, perch, or unlock graph.

The simulation snapshot always reports:

```txt
status: drifting
objectType: hot-air-balloon
elapsed
altitude
burner
vent
windSpeed
distance
position
velocity
wind
message
```

It has no mission-specific state.

## Missing gameplay authority

```txt
mission start/admission
objective entity generation
thermal contact evaluation
ordered or unordered gate policy
gate contact evaluation
return readiness
perch return evaluation
timeout/failure evaluation
completion transaction
region unlock transaction
restart transaction
terminal result retention
```

## Required phase model

```txt
ready
  -> active
  -> returning
  -> completed

active/returning
  -> failed

completed/failed
  -> restarting
  -> ready
```

Every transition needs a typed result with reason, before/after phase, command/contact IDs, frame, generation, and state fingerprint.

## Determinism requirements

```txt
seeded objective transforms
stable objective IDs
fixed mission-step input batches
idempotent contact admission
bounded progress/result journals
canonical state fingerprint
same seed + same commands = same terminal result
restart creates a clean generation
```

## Current user-visible consequence

The route looks and moves like a balloon experience, but it cannot complete the first milestone described by the repository. The player cannot catch a counted thermal, clear a counted gate, return to a recognized perch, fail, restart, or unlock the next region.

## Next safe ledge

```txt
TheOpenAbove Meadow Lift Objective Authority
+ Deterministic Route Fixture Gate
```
