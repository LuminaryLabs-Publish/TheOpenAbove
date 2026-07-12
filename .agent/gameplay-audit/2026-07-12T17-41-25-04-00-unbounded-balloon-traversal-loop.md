# Gameplay Audit: Unbounded Balloon Traversal Loop

**Generated:** `2026-07-12T17-41-25-04-00`

## Summary

The authored world is bounded, but horizontal movement is not. Continuous wind and steering can carry the balloon beyond the world radius without an authored gameplay outcome.

## Plan ledger

**Goal:** replace accidental off-world continuation with an explicit, deterministic gameplay policy.

- [x] Confirm direct horizontal position integration.
- [x] Confirm no radius or membership check in the simulation update.
- [x] Confirm only terrain floor and altitude ceiling responses exist.
- [x] Enumerate edge and high-speed crossing cases.
- [ ] Author and implement one boundary policy.

## Reachable loop

```txt
wind/airstream supplies horizontal velocity
  -> simulation integrates position
  -> distance continues increasing
  -> no edge-band warning or return force
  -> no outside rejection or terminal transition
  -> world consumers continue from the outside position
```

## Failure classes

```txt
slow drift beyond radius
high-speed step tunnels across the edge blend
map marker leaves meaningful world projection
mail/airstream logic evaluates an outside position
terrain and flora stream around a position outside authored membership
reset/restart preserves no boundary reason or receipt
```

## Required gameplay result

```txt
AcceptedInside
AcceptedEdge
SoftReturnApplied
ClampedToBoundary
RejectedOutside
TerminalOutside
Failed
Stale
```

The chosen policy must be configuration-backed and deterministic rather than hidden in camera, terrain or map code.
