# Interaction Audit: Flight Boundary Command Admission Map

**Generated:** `2026-07-12T17-41-25-04-00`

## Summary

Keyboard input currently changes a mutable simulation that commits motion before world admission. The interaction boundary needs a sequenced command and a typed result before the successor position is public.

## Plan ledger

**Goal:** map player input through proposal, world admission and atomic commit.

- [x] Identify key ownership and direct simulation mutation.
- [x] Identify missing command/frame/revision identities.
- [x] Define proposal and swept-crossing admission.
- [x] Define zero-mutation rejection and stale-frame handling.
- [ ] Implement command routing and fixtures.

## Current map

```txt
keydown/keyup
  -> held key Set
  -> simulation.update(dt)
  -> mutable state changes
  -> consumers read successor state
```

## Required map

```txt
InputSample + FlightFrameCommand
  -> validate session/frame sequence
  -> derive force and detached motion proposal
  -> sample start/end/swept world membership
  -> apply authored boundary policy
  -> return FlightBoundaryResult
  -> atomically commit accepted successor
  -> publish consumer receipts and visible ack
```

## Admission requirements

```txt
finite dt and finite vectors
current session and predecessor flight revision
current WorldSurfaceRevision
monotonic frame sequence
explicit boundary policy revision
swept crossing classification
zero mutation for Rejected, Failed or Stale
```
