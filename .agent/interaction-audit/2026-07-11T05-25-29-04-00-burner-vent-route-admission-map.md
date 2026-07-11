# Interaction Audit: Burner, Vent and Route Admission Map

**Timestamp:** `2026-07-11T05-25-29-04-00`

## Goal

Map browser actions to simulation and mission effects, then define the command boundary needed for deterministic route choice and reset.

## Current admission map

```txt
keydown Space / W / ArrowUp
  -> add code to private Set
  -> next RAF polls burnerPressed
  -> burner lerps toward 1
  -> vertical velocity rises
  -> altitude changes route influence

keydown S / ArrowDown / Shift
  -> add code to private Set
  -> next RAF polls ventPressed
  -> vent lerps toward 1
  -> vertical velocity falls
  -> altitude changes route influence

keyup
  -> remove code from Set

blur
  -> clear Set

wheel
  -> mutate camera zoom immediately

R
  -> no active behavior
```

## Current result shape

Input handlers return no command envelope, admission result or target tick. Route entry is inferred later from sampled physical state. `mail.reset()` exists but is not reachable from the browser interaction loop.

## Required commands

```txt
BurnerPressed
BurnerReleased
VentPressed
VentReleased
ResetMailRun
```

Each command should contain:

```txt
commandId
sessionId
missionEpoch
inputSequence
capturedAt
requestedTick
source
```

## Required admission results

```txt
accepted
rejected
no-op
```

With reasons such as:

```txt
session-not-running
stale-epoch
already-held
already-released
mission-terminal
reset-already-pending
invalid-sequence
```

## Required interaction chain

```txt
browser event
  -> normalized command
  -> fixed-step queue
  -> admission result
  -> committed input state
  -> simulation tick
  -> airstream sample
  -> route traversal row
  -> mission observation
```

## Proof gate

The same ordered command sequence must produce the same burner/vent state, altitude samples, route traversal rows and delivery result at 20, 30, 60 and 120 Hz render schedules. `R` must create a new mission epoch and clear held input, traversal evidence and delivery state.