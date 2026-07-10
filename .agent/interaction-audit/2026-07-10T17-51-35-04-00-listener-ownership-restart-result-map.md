# Interaction Audit: Listener Ownership and Restart Results

**Timestamp:** `2026-07-10T17-51-35-04-00`

## Global listeners installed

```txt
balloon simulation:
  keydown
  keyup
  blur

camera rig:
  wheel

visual domain:
  resize
```

Each kit captures its handler in a closure and exposes a local `dispose()` path where implemented. The route composer does not retain or invoke a root disposal sequence.

## Duplicate-listener risk

Calling `createGame()` more than once installs another copy of every listener. Results become difficult to observe because some duplicate handlers mutate separate hidden session state while all remain attached to the same global window.

Potential outcomes:

```txt
one wheel event changes more than one camera rig
one key event updates more than one simulation key set
one resize event resizes more than one renderer/composer
old hidden sessions continue consuming input
new GameHost references only the newest session
```

## Missing interaction results

The current handlers return no normalized result row. There is no proof of:

```txt
listener installed
listener already installed
input accepted
input ignored because session stopped
listener removed
listener missing during removal
listener removal failed
input routed to current session
input rejected as stale-session input
```

## Required listener ownership record

```txt
listenerId
sessionId
ownerKit
target
type
options
installedAt
removedAt
status
```

## Required input result record

```txt
inputId
sessionId
listenerId
kind
code/delta
status
reason
observedLifecycleState
frameIdConsumedBy
```

## Restart contract

```txt
before restart:
  active session owns exactly 5 global listeners

during stop:
  input events are rejected or ignored with explicit reason

after dispose:
  old session owns 0 global listeners

after restart:
  new session owns exactly 5 global listeners
  old listener IDs never consume new input
```

## GameHost additions

```txt
GameHost.lifecycle.getState()
GameHost.lifecycle.getListenerLedger()
GameHost.lifecycle.stop(reason)
GameHost.lifecycle.dispose(reason)
GameHost.lifecycle.restart(options)
```

These should be additive and JSON-safe. Existing live-object fields should remain for compatibility.

## Main finding

Input behavior is currently correct only under the assumption that the route is created once and never torn down. Listener ownership must be promoted from private kit closures into session-level proof so restart and repeated mounting cannot create hidden input consumers.
