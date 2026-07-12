# Render Audit: Off-World Flight Visible-Frame Gap

**Generated:** `2026-07-12T17-41-25-04-00`

## Summary

The rendered frame can present terrain, grass, flowers, mail and map projections derived from a balloon position that has never been admitted against the bounded world. No render receipt identifies whether the position was inside, in the edge band or outside.

## Plan ledger

**Goal:** require every world-facing visible frame to cite the same committed flight-boundary result.

- [x] Trace flight integration before camera and visual updates.
- [x] Confirm the host renders after accepting the unclassified position.
- [x] Confirm telemetry exposes position but no boundary result.
- [x] Define consumer receipts and a first-visible-frame acknowledgement.
- [ ] Add executable source/build/Pages proof.

## Current frame

```txt
simulation.update(dt)
  -> state.position += velocity * dt
  -> camera update
  -> terrain/grass/flowers update
  -> visual.render()
```

## Gap

```txt
world surface revision: not cited by the flight frame
membership class: absent
edge crossing evidence: absent
boundary policy/result: absent
consumer receipt set: absent
visible-frame acknowledgement: absent
```

## Required render contract

```txt
FlightBoundaryResult
  -> camera receipt
  -> terrain receipt
  -> vegetation/flora receipt
  -> map receipt
  -> HDR render receipt
  -> FlightBoundaryVisibleFrameAck
```

A visible frame is complete only when required world consumers cite the committed flight frame, world surface revision and boundary result.
