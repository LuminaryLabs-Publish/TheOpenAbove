# Lifecycle Audit: Runtime Session Teardown and Reboot Contract

**Timestamp:** `2026-07-10T17-51-35-04-00`

## Problem statement

The route composes a complete runtime but does not expose a complete runtime lifecycle.

```txt
boot: implemented
run: implemented
fatal display: implemented
stop: absent
dispose: absent at composition root
rollback: absent
restart: absent
lifecycle readback: absent
```

## Current ownership evidence

```txt
simulation.dispose() removes keydown, keyup, and blur listeners
cameraRig.dispose() removes the wheel listener
visual.dispose() removes resize and disposes grass, terrain, and composer
composer.dispose() disposes depth textures, target, and composer
```

None of these paths are called by `src/main.js`.

## Required session authority

A runtime session should own:

```txt
session ID
lifecycle state
creation timestamp
current/next frame request ID
simulation owner
camera owner
presentation owner
visual owner
telemetry owner
HUD owner
GameHost projection owner
listener ledger
resource ledger
transition journal
fatal error
```

## Startup transaction

```txt
allocate sessionId
mark starting
construct components in ordered steps
register each disposer immediately after successful construction
install listeners through owned registration
publish GameHost only after minimum session contract is valid
start first frame
mark running
```

If any step throws:

```txt
mark failed
cancel any queued frame
run registered disposers in reverse order
record every rollback result
publish fatal lifecycle snapshot
show fatal panel
```

## Stop versus dispose

### Stop

```txt
cancel frame recursion
reject new frame work
retain state and resources for inspection or resume
leave listener policy explicit
```

### Dispose

```txt
stop if needed
remove listeners
dispose telemetry/presentation/visual resources
clear scene and host references
publish terminal immutable result
```

## Idempotency rules

```txt
stop(running) -> stopped
stop(stopped) -> already-stopped
stop(disposed) -> rejected/disposed

dispose(running) -> stop then disposed
dispose(stopped) -> disposed
dispose(disposed) -> already-disposed

restart(running) -> dispose old then create new
restart(failed) -> dispose rollback remainder then create new
```

## Required statuses

```txt
created
starting
running
stopping
stopped
disposing
disposed
restarting
failed
already-running
already-stopped
already-disposed
rejected
partial-failure
```

## Required proof guarantees

```txt
only one session owns the canvas at a time
only one recursive frame chain is active
all session listeners are removable
all registered resources reach a terminal teardown result
old session state cannot mutate after stop/dispose
GameHost never points to a disposed live-object graph without terminal status
restart creates a new sessionId
transition journal remains bounded and JSON-safe
```

## Browser lifecycle integration

Recommended additive hooks:

```txt
pagehide -> dispose or stop according to persisted-session policy
beforeunload -> best-effort stop without asynchronous dependency
visibilitychange -> optional pause policy, not implicit until specified
HMR dispose -> hard session disposal in development
```

## Main finding

The repo has enough local teardown primitives to build a lifecycle authority without rewriting gameplay or rendering. The missing work is composition, ordering, result normalization, and deterministic proof.
