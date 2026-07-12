# Interaction Audit: Steering Input Command and Result Map

Timestamp: `2026-07-11T22-58-50-04-00`

## Summary

Steering is currently an ambient keyboard side effect. The product needs a small sequenced input envelope and typed result so blur, pause, restart, stale events and duplicate delivery cannot silently alter trim or visible response.

## Current map

```txt
keydown/keyup
  -> Set.add/delete(event.code)
  -> no command envelope
  -> no lifecycle admission
  -> no sequence result

frame sample
  -> read left/right booleans
  -> derive steeringInput
  -> mutate trim and acceleration
  -> no typed result

blur
  -> keys.clear()
  -> no retirement result
```

## Required command

```txt
SteeringInputSample {
  inputSampleId
  runtimeSessionId
  missionEpoch
  inputSequence
  observedSimulationTickId
  left
  right
  source
  capturedAt
}
```

## Required result

```txt
SteeringInputResult {
  inputSampleId
  inputSequence
  simulationTickId
  status
  rejectionReason
  steeringInput
  trimBefore
  trimAfter
  steeringResultId
  policyId
  policyVersion
}
```

## Admission rules

```txt
reject wrong runtime session
reject wrong mission epoch
reject stale sequence
return cached result for duplicate sequence
reject input while stopped or terminal
retire held input on blur, pause, reset and disposal
admit at most one effective sample per fixed simulation tick
```

## Consumer map

```txt
SteeringInputResult
  -> simulation integration
  -> balloon root transform
  -> envelope/gondola presentation
  -> camera response
  -> HUD projection
  -> telemetry/GameHost readback
  -> visible-frame receipt
```

## Required evidence

```txt
accepted input
rejected stale input
duplicate idempotency
blur retirement
restart retirement
consumer acknowledgement parity
first visible steering-frame receipt
```
