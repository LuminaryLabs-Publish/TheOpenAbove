# Interaction Audit: Input Generation Rejection Map

**Timestamp:** `2026-07-10T19-18-39-04-00`

## Input owners

```txt
simulation
  -> keydown
  -> keyup
  -> blur
camera rig
  -> wheel
visual domain
  -> resize
```

## Current behavior

Listeners are installed directly on the global event target during construction. Simulation, camera, and visual kits each know how to remove their own listeners, but no root registry records installation order, owner, session, or removal result.

## Required listener row

```txt
sessionId
generation
listenerId
ownerKit
eventType
installedAtSequence
removedAtSequence
status
reason
```

## Generation rule

Each callback must capture the owning generation and immediately reject when it is no longer active. Listener removal remains mandatory, but the generation check closes the race between stop and callback delivery.

## Required results

```txt
accepted
stale-session
already-removed
owner-disposed
unsupported
failed
```

## Restart proof

A held burner key, wheel event, resize event, or blur event from an old session must not mutate a replacement session. The fixture must prove listener counts return to zero before the next session installs its listeners.
