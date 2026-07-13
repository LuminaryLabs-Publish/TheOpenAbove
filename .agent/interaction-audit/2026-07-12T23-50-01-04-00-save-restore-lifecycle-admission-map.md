# Interaction Audit: Save, Restore and Lifecycle Admission Map

**Timestamp:** `2026-07-12T23-50-01-04-00`

## Current interaction surface

```txt
keyboard -> balloon movement
wheel -> camera zoom
M/Escape -> parchment map
GameHost -> raw owners and readback
page lifecycle -> no persistence command
```

There is no user-facing or host-facing save, restore or new-session command. Browser lifecycle events do not enter a persistence authority.

## Required command map

```txt
SaveSessionCommand
  commandId
  runtimeSessionId
  expectedPersistenceGeneration
  expectedGameplayRevision
  reason: explicit | autosave | pagehide | delivery

RestoreSessionCommand
  commandId
  runtimeSessionId
  requestedGeneration | active
  expectedWorldRevision
  expectedRouteRevision

ResetSessionCommand
  commandId
  runtimeSessionId
  expectedPersistenceGeneration
  reason
```

## Admission rules

- Reject unknown, stale or duplicate command IDs.
- Page-lifecycle saves are bounded and may use a reduced synchronous-safe adapter only when explicitly supported.
- A pagehide request cannot claim success without a verified durable result.
- Restore is blocked until world, route, balloon and mail adapters are ready.
- Input and gameplay ticks are suspended during atomic restore installation.
- A reset revokes retained predecessor commands and updates durable state.
- Multi-tab or duplicate-writer conflicts return a typed result instead of last-writer-wins silence.

## Public host rule

`GameHost` should expose bounded persistence commands and immutable result readback, not direct storage ownership or arbitrary participant mutation.