# Interaction Audit: Map-Open Frame Admission

## Summary

`M` and `Escape` currently mutate map visibility directly. There is no command identity, expected transition generation, scheduler lease, terminal result or first-frame acknowledgement.

## Current interaction

```txt
keydown M
  -> preventDefault
  -> setOpen(!open)
  -> toggle CSS and aria-hidden
  -> cancel stored map RAF handle
  -> resize and schedule map RAF when opening

keydown Escape while open
  -> preventDefault
  -> setOpen(false)
  -> hide overlay and cancel stored map RAF handle
```

## Missing admission

```txt
MapVisibilityCommandId
expected MapTransitionGeneration
Opening / Open / Closing / Closed / Failed state
accepted flight/mail frame envelope
map scheduler lease
stale callback rejection
projection result
first matching visible frame acknowledgement
focus transfer and restoration receipt
terminal disposal result
```

## Required command flow

```txt
SetMapVisibilityCommand
  -> validate runtime session and expected transition generation
  -> reject stale, duplicate, retired or unavailable commands
  -> allocate successor transition generation
  -> bind one immutable state envelope
  -> prepare and commit map projection
  -> expose overlay only with accepted projection policy
  -> publish MapVisibilityResult
  -> acknowledge the first matching visible map frame
  -> retire predecessor callbacks and focus ownership exactly once
```

## Consumer obligations

The main host, map overlay, keyboard adapter, focus adapter, Canvas2D renderer, telemetry and GameHost readback must consume the same transition result rather than inferring success from local booleans or DOM classes.