# Interaction Audit: Map Toggle and Input Admission Map

**Timestamp:** `2026-07-12T08-50-32-04-00`

## Summary

`M` and `Escape` are interpreted by the map's global keydown listener, while every keydown and keyup is also observed by the flight simulation. There is no command envelope or input-context authority deciding which domain owns an event.

## Plan ledger

**Goal:** route each browser input through one context-aware admission path and publish a typed result before any owner mutates state.

- [x] Trace current key listeners.
- [x] Identify event duplication and context ambiguity.
- [x] Define map and gameplay input generations.
- [x] Define toggle, focus and rejection results.
- [ ] Implement and test the admission boundary.

## Current admission map

```txt
window keydown
  -> balloon simulation adds event.code to keys Set
  -> parchment map separately checks M/Escape
  -> no ordering contract between owners
  -> no result identifies the accepted consumer

window keyup
  -> balloon simulation removes event.code
  -> map has no keyup policy

window blur
  -> simulation clears all keys
  -> map remains open or closed without a lifecycle result
```

## Missing command envelope

```txt
BrowserInputCommand
  inputId
  runtimeSessionId
  runtimeGeneration
  inputGeneration
  context
  device
  code
  phase
  repeat
  modifiers
  timestamp
  target
```

## Required contexts

```txt
FLIGHT
MAP
FATAL
UNFOCUSED
DISPOSED
```

Only one context may own a command. A map toggle can produce a context transition, but the same physical event must not also become a gameplay command.

## Admission outcomes

```txt
accepted-flight
accepted-map-toggle
accepted-map-navigation
accepted-fatal-surface
rejected-repeat
rejected-stale-session
rejected-stale-input-generation
rejected-wrong-context
rejected-unfocused
rejected-disposed
```

## Required interaction sequence

```txt
M keydown in FLIGHT
  -> admit as map-open command
  -> do not add KeyM to gameplay state
  -> prepare pause/input/focus participants
  -> commit MAP context

W keydown in MAP
  -> reject as gameplay command
  -> optional map command only if explicitly bound

Escape keydown in MAP
  -> admit as map-close command
  -> commit fresh FLIGHT input generation

W keydown after close
  -> admit to new FLIGHT generation
  -> gameplay begins only from this event
```

## Focus contract

```txt
open
  -> retain predecessor focus lease
  -> focus a real map container or close control
  -> expose deterministic keyboard escape

close
  -> revoke map focus lease
  -> restore prior focus when still valid
  -> otherwise focus the game canvas by policy
```

## Required fixtures

```txt
fixture:single-consumer-per-key-event
fixture:M-does-not-enter-flight-key-state
fixture:flight-keys-rejected-in-map-context
fixture:Escape-closes-map-once
fixture:key-repeat-toggle-rejected
fixture:stale-input-generation-rejected
fixture:focus-enter-exit-map
fixture:fatal-context-supersedes-map
```

The current event listeners implement behavior, not authoritative interaction admission.