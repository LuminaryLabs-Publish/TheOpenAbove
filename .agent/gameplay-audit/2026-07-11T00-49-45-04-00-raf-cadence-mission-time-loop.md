# Gameplay Audit: RAF Cadence and Mission-Time Loop

**Timestamp:** `2026-07-11T00-49-45-04-00`

## Declared mission

```txt
Meadow Lift
3 thermals
5 gates
return to perch
300-second limit
restart
Cloud Basin unlock
```

## Current gameplay time

`state.elapsed` is incremented by clamped RAF-derived `dt`:

```txt
elapsed += min(1/30, min(80ms, rawFrameMs) / 1000)
```

Consequences:

```txt
20 Hz rendering advances mission time at about two-thirds real time
a 250ms stall advances mission time by only 33.3ms
hidden-tab duration can advance mission time by only one 33.3ms step on resume
input timing changes with render cadence
future objective-contact sampling changes with render cadence
```

## Required policy

```txt
mission time = fixed simulation tick count * fixedDt
hidden tab = explicit suspended session unless product design chooses a wall-clock deadline
render time = presentation only
wall time = diagnostics, not implicit physics mutation
```

## Required proof

```txt
same timed burner/vent sequence at 20/30/60/120 Hz
  -> same position, velocity, elapsed, distance and fingerprint

same mission command/contact sequence
  -> same progress and timeout/completion result
```
