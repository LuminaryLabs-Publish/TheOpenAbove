# Lifecycle Audit: Session Generation and Terminal GameHost Contract

**Timestamp:** `2026-07-10T19-18-39-04-00`

## Required lifecycle state

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
```

## Required identity

```txt
sessionId: monotonic runtime identity
generation: invalidation token for callbacks and commands
frameId: monotonic within one session
operationSequence: total order for lifecycle rows
```

## Startup transaction

```txt
allocate identity
  -> mark starting
  -> construct component
  -> register listener/resource/disposer immediately
  -> publish provisional proof only
  -> queue first owned frame
  -> publish GameHost active snapshot
  -> mark running
```

Any construction error must invalidate the generation first, then roll back registered owners in reverse order.

## Stop and dispose

```txt
invalidate generation
  -> block commands and callbacks
  -> cancel retained frame request
  -> remove listeners
  -> dispose owners in reverse construction order
  -> classify every resource terminally
  -> freeze final snapshots
  -> replace GameHost live projection with terminal projection
```

## GameHost terminal shape

```txt
GameHost.lifecycle.getState()
GameHost.lifecycle.stop()
GameHost.lifecycle.dispose()
GameHost.lifecycle.restart()
GameHost.lifecycle.getJournal()
GameHost.lifecycle.getTerminalSnapshot()
```

Existing fields remain additive while active. After disposal, old live objects must not remain authoritative; terminal proof must report whether each reference is cleared, retained for inspection, unsupported, or stale.

## Invariants

```txt
one active session per canvas
one generation accepted at a time
one recursive frame chain per session
stale callbacks never mutate current state
stop and dispose are idempotent
all listeners and resources reach terminal rows
restart uses a new sessionId
the old GameHost projection cannot command the new session
journals are bounded and JSON-safe
```
