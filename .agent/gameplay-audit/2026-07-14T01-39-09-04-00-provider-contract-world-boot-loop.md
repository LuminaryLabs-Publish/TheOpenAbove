# Gameplay Audit: Provider Contract World-Boot Loop

**Timestamp:** `2026-07-14T01-39-09-04-00`  
**Runtime revision:** `09bb6b95549d9480dfc2caa4517575ab4009ba98`

## Summary

The provider pin is upstream of every playable system. Correct capability forwarding is required before authored mountains, terrain sampling, balloon flight, airstream routing, Air Mail, map projection, and telemetry can share the intended Core World APIs.

## Plan ledger

**Goal:** make provider-contract acceptance an explicit prerequisite for the playable world instead of an implicit side effect of module import and engine construction.

- [x] Trace startup into world generation and flight.
- [x] Identify gameplay dependencies on World Features and Foundation.
- [x] Record failure and partial-adoption risks.
- [x] Define gameplay admission requirements.
- [ ] Add real-provider startup and recovery fixtures.

## Playable interaction loop

```txt
boot accepted
  -> authored landforms register
  -> world foundation compiles terrain contributions
  -> staged world generation advances
  -> terrain and flora stream around the balloon
  -> player controls burner and movement
  -> airstream samples alter drift and lift
  -> mail volumes evaluate parcel delivery
  -> camera and balloon presentation update
  -> telemetry publishes simulation and visual snapshots
  -> map can pause simulation while render continues
```

## Provider-contract dependency

```txt
n:world
  -> owns parent world capability
n:world:foundation
  -> resolves feature contributions for terrain consumers
n:world:features
  -> registers and compiles authored semantic landforms
n:world:features:landform
  -> supplies mountain, canyon, cliff and plateau feature handlers
open-above telemetry
  -> requires n:world:features
```

If `domainPath`, `requires`, `provides`, or `install` are dropped, the engine may expose incomplete metadata, fail dependency admission, omit legacy aliases, or diverge from the product's expected API ownership.

## Current failure behavior

```txt
failure before createGame completion
  -> promise rejects
  -> error panel displays text
  -> no retry command
  -> no partial-engine disposal receipt
  -> no feature-registration rollback
  -> no typed terminal state
```

## Gameplay admission rule

```txt
flight and mail systems may initialize only after:
  provider revision accepted
  real domain contracts inspected
  unique capability ownership proven
  World Features and Foundation APIs probed
  complete authored feature set accepted
  visual bootstrap candidate prepared
```

## Required result

```txt
PlayableWorldAdmissionResult {
  status
  providerRevision
  providerContractFingerprint
  compositionRevision
  featureRegistryRevision
  foundationRevision
  worldGenerationRevision
  flightReady
  mailReady
  mapReady
  telemetryReady
  issues[]
}
```

## Validation boundary

No gameplay, terrain, flight, Air Mail, map, or telemetry runtime was executed in this audit. The interaction loop is source-traced only.