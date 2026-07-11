# Gameplay Audit: Successful and Failed Boot RAF Loop

**Timestamp:** `2026-07-11T19-28-28-04-00`

## Successful startup path

```txt
module import schedules compatibility wait RAF
createGame builds Air Mail runtime
window.GameHost is published
active Air Mail RAF is scheduled
compatibility wait resolves
legacy target lookup returns no current-product target
compatibility tick RAF starts anyway
```

The player sees the normal Air Mail loop, but a second frame chain continues traversing the scene. It is not visible in gameplay state, HUD, telemetry or GameHost snapshots.

## Failed startup path

```txt
module import schedules compatibility wait RAF
createGame throws before window.GameHost publication
showFatal displays error text
compatibility wait sees no GameHost
compatibility wait schedules itself again
```

The error surface therefore does not represent a quiescent failed runtime. Browser work continues even though the game never entered a committed running state.

## Gameplay consequences

```txt
failure does not stop all recurring work
retry can accumulate predecessor wait loops
compatibility work has no mission or runtime epoch
legacy target appearance can cause delayed scene mutation
current snapshots cannot report the hidden loop
```

## Required lifecycle rule

A boot attempt must own every callback created during its generation. Failure must cancel all callbacks before publishing the terminal failure result. Optional compatibility work must be admitted only after the current runtime is committed and must be retired with that same session.