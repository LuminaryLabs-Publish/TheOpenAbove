# Interaction Audit: Host Clock Command and Result Map

**Timestamp:** `2026-07-15T12-02-38-04-00`

## Summary

The browser callback currently mutates every time-dependent domain directly. It does not produce a command identity, admitted interval, step-batch result, suspension result, overload receipt, or visible-frame acknowledgement.

## Plan ledger

**Goal:** replace direct callback mutation with one typed host-clock command/result boundary while preserving existing keyboard, map, simulation, world, and rendering services.

- [x] Map current input and map-state dependencies.
- [x] Map every time-dependent consumer in execution order.
- [x] Define accepted and rejected command outcomes.
- [ ] Implement deduplication, suspension, overload, and first-frame proof.

## Current interaction map

```txt
requestAnimationFrame callback
  -> read performance timestamp
  -> derive clipped frameMs and dt
  -> read mapOverlay.isOpen()
  -> directly call simulation.update
  -> directly call mail.update
  -> directly call airstream.update
  -> directly mutate balloon and presentation
  -> directly call cameraRig.update
  -> directly call visual.update
  -> directly call engine.tick
  -> directly call visual.render
```

## Required command

```txt
HostClockFrameCommand
  commandId
  hostClockGeneration
  runtimeGeneration
  rafGeneration
  previousTimestamp
  callbackTimestamp
  simulationLeaseRevision
  mapRevision
  inputRevision
  expectedSimulationRevision
```

## Required outcomes

```txt
accepted-active
accepted-suspended
accepted-resumed
accepted-overload-with-residual
rejected-non-monotonic
rejected-stale-generation
rejected-duplicate-command
rejected-retired-runtime
rejected-conflicting-lease
```

## Required result

```txt
HostClockFrameResult
  commandId
  admittedInterval
  fixedStep
  stepCount
  residualTime
  discardedTime
  overloadReason
  simulationRevisionBefore
  simulationRevisionAfter
  inputRevision
  mapRevision
  perDomainReceipts
  interpolationAlpha
  renderRevision
```

## Frame acknowledgement

`FirstClockAlignedFrameAck` must identify the accepted host-clock generation, final simulation revision, rendered revision, interpolation alpha, and presentation timestamp.

## Validation boundary

No command/result implementation, duplicate fixture, non-monotonic fixture, map-suspension fixture, overload fixture, or visible-frame test exists.