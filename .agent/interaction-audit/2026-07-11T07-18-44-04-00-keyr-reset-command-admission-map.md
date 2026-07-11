# Interaction Audit: KeyR Reset Command Admission Map

**Timestamp:** `2026-07-11T07-18-44-04-00`

## Goal

Replace the absent browser restart path with one typed, sequenced reset command admitted at a fixed simulation boundary.

## Current input path

```txt
window keydown
  -> balloon simulation private Set.add(event.code)

window keyup
  -> Set.delete(event.code)

window blur
  -> Set.clear()

simulation.update(dt)
  -> poll Space/W/ArrowUp for burner
  -> poll S/ArrowDown/Shift for vent
```

`KeyR` is added to the Set on keydown and removed on keyup, but no runtime code consumes it. Repository instructions require `R` restart, so the documented control is not executable.

## Current admission weaknesses

```txt
no typed input command
no command sequence
no target tick
no runtime session ID
no mission epoch
no duplicate keydown suppression contract
no phase preflight
no accepted/rejected/no-op result
no key retirement on reset
no deterministic replay surface
```

## Required browser adapter

```txt
keydown KeyR
  -> prevent repeated physical-key auto-repeat from creating duplicate commands
  -> create ResetMission command
  -> attach runtimeSessionId and missionEpoch
  -> attach commandId and observed render frame
  -> enqueue for next fixed simulation tick
```

## Required command envelope

```json
{
  "type": "ResetMission",
  "commandId": "cmd-reset-0002",
  "runtimeSessionId": "session-0001",
  "missionEpoch": 1,
  "targetTickId": 481,
  "source": "keyboard",
  "code": "KeyR",
  "reason": "player-request"
}
```

## Admission matrix

```txt
active in-transit mission + current epoch -> accepted
active delivered mission + current epoch -> accepted
restarting phase + duplicate command -> no-op or rejected by declared policy
stale mission epoch -> rejected
stale runtime session -> rejected
missing command ID -> rejected
unsupported phase -> rejected
repeat keydown for same physical press -> no-op
reset after root session disposed -> rejected
```

## Result contract

```json
{
  "type": "ResetMissionResult",
  "commandId": "cmd-reset-0002",
  "status": "accepted",
  "previousMissionEpoch": 1,
  "missionEpoch": 2,
  "resetTransactionId": "restart-0002",
  "committedAtTickId": 481,
  "reason": "player-request"
}
```

## Interaction invariants

```txt
one physical press produces at most one accepted reset
reset is never executed directly from the DOM callback
reset commits only at a simulation boundary
held burner/vent state is retired before the new epoch
commands from the old epoch cannot execute after reset
GameHost and headless fixtures use the same command adapter
```
