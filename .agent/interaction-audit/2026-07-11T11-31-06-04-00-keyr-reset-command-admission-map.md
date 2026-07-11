# KeyR Reset Command Admission Map

**Timestamp:** `2026-07-11T11-31-06-04-00`

## Current binding map

```txt
Space / W / ArrowUp  -> burner held state
S / ArrowDown / Shift -> vent held state
blur                  -> clear held state
wheel                 -> camera zoom
KeyR                  -> no consumer
GameHost               -> raw mail and simulation objects
headless environment   -> no mission reset capability
```

## Required unified command route

```txt
keyboard KeyR
GameHost.invoke("mission.reset")
headless mission.reset
  -> one reset command adapter
  -> command ID and expected mission epoch
  -> lifecycle and duplicate admission
  -> fixed-tick reset queue
  -> atomic reset transaction
  -> typed reset result
```

## Admission outcomes

```txt
accepted
rejected: session mismatch
rejected: epoch mismatch
rejected: runtime stopped
rejected: reset already in progress
duplicate: command already committed
failed: subsystem staging or commit failed
```

## Required guarantees

```txt
keyboard and tool callers receive equivalent nested results
KeyR does not mutate state directly inside the DOM callback
held burner/vent state retires before the new epoch begins
stale commands cannot affect a successor mission
unknown or malformed reset requests do not throw through the host
```
