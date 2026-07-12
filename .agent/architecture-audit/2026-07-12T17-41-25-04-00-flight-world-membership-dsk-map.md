# Architecture Audit: Flight World-Membership DSK Map

**Generated:** `2026-07-12T17-41-25-04-00`

## Summary

World membership exists as world-generation semantics, but it is not the parent of movement admission. A dedicated flight authority must coordinate the simulation proposal with the world surface and every downstream consumer.

## Plan ledger

**Goal:** define the smallest DSK boundary that owns a balloon crossing from proposed motion through committed visible evidence.

- [x] Keep world generation authoritative for surface geometry and membership sampling.
- [x] Keep balloon simulation authoritative for forces and candidate motion.
- [x] Add a coordinating parent domain for movement admission and boundary policy.
- [x] Keep terrain, vegetation, flora, mail, map and rendering as consumers.
- [x] Define typed zero-mutation rejection and stale-result behavior.
- [ ] Implement and validate the authority.

## Current ownership

```txt
world-generation-kit
  owns bounded-disk descriptor and sampling semantics

balloon-simulation-kit
  owns mutable flight state and direct position integration

main host
  sequences simulation and consumers

terrain/flora/map/render
  consume the resulting position independently
```

## Missing parent

```txt
open-above-flight-world-membership-authority-domain
```

## DSK composition

```txt
identity:
  open-above-flight-command-id-kit
  open-above-flight-frame-id-kit
  open-above-world-surface-revision-kit
  open-above-flight-state-revision-kit

proposal and admission:
  open-above-flight-position-proposal-kit
  open-above-world-membership-sample-kit
  open-above-flight-boundary-band-kit
  open-above-flight-boundary-policy-kit
  open-above-flight-edge-return-force-kit
  open-above-flight-outside-rejection-kit

commit and consumers:
  open-above-flight-boundary-result-kit
  open-above-flight-world-consumer-receipt-kit
  open-above-flight-world-frame-commit-kit
  open-above-stale-flight-frame-rejection-kit

observation and proof:
  open-above-flight-boundary-observation-kit
  open-above-flight-boundary-journal-kit
  open-above-flight-boundary-visible-frame-ack-kit
```

## Authority flow

```txt
FlightFrameCommand
  -> validate runtime session, frame sequence and predecessor flight revision
  -> bind the current WorldSurfaceRevision
  -> construct a detached position/velocity proposal
  -> sample start and proposed positions against bounded-disk membership
  -> detect center, edge-band, outside and swept high-speed crossings
  -> apply one authored Accept, SoftReturn, Clamp, Reject or Terminal policy
  -> construct one immutable FlightBoundaryResult
  -> atomically commit flight state and world-consumer frame evidence
  -> reject stale frame results
  -> publish bounded observations and journal entry
  -> acknowledge the first terrain/flora/map/HDR frame citing the committed result
```

## Domain boundary

The world service answers where a point or swept segment lies. The flight authority decides what that classification means for movement. Individual render or gameplay consumers must not invent their own clamp, fallback or continuation behavior.
