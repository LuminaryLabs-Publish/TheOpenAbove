# Interaction Audit: Input, Command, Objective Result Map

**Timestamp:** `2026-07-10T23-20-41-04-00`

## Current input path

```txt
keydown / keyup
  -> private Set of event.code values
  -> simulation.update polls Set
       -> burnerPressed
       -> ventPressed
       -> direct state interpolation

wheel
  -> camera rig zoom mutation
```

The input path has no typed command boundary. Browser callbacks and frame polling cannot currently produce accepted, rejected, ignored, duplicate, or failed interaction results.

## Documented but absent input

```txt
R -> restart mission
```

No active listener, command, reducer, result, telemetry row, or GameHost method owns restart.

## Missing command model

Recommended commands:

```txt
SetBurner
SetVent
RestartMission
StartMission
```

Recommended objective contact candidates:

```txt
EnterThermal
ExitThermal
CrossWindGate
EnterPerchZone
ExitPerchZone
```

Objective contacts should be generated from physical overlap and admitted by mission authority. Browser input should not directly award objective progress.

## Required result envelope

```js
{
  commandId,
  sequence,
  frameId,
  generation,
  type,
  status: "accepted" | "rejected" | "ignored" | "duplicate" | "failed",
  reason,
  beforeFingerprint,
  afterFingerprint,
  effects
}
```

## Objective-contact result requirements

```txt
stable contact ID
stable objective ID
mission generation
entry/exit/crossing phase
accepted/rejected/duplicate status
progress before/after
mission phase before/after
source and state fingerprints
```

## Current observation gap

HUD and GameHost expose aggregate live state only. They cannot answer:

```txt
which input was consumed
which command was admitted
which objective was contacted
why progress changed or did not change
whether restart succeeded
which mission generation owns the current state
```

## Required interaction flow

```txt
browser adapter
  -> input sample rows
  -> fixed-step command batch
  -> physical simulation
  -> contact candidates
  -> objective authority admission
  -> command/contact/progress/transition results
  -> committed mission observation
  -> HUD / telemetry / GameHost / render projection
```

## Next safe ledge

```txt
TheOpenAbove Meadow Lift Objective Authority
+ Deterministic Route Fixture Gate
```
