# Interaction Audit: Control Contract and Acceptance Parity Map

**Timestamp:** `2026-07-11T13-10-35-04-00`

## Current ingress map

```txt
Space / W / ArrowUp
  -> private keyboard Set
  -> burner target 1

S / ArrowDown / Shift
  -> private keyboard Set
  -> vent target 1

wheel
  -> camera zoom

A / D
  -> documented bank control
  -> no balloon simulation consumer

R
  -> documented restart control
  -> no runtime consumer
```

## Missing command boundary

Controls are not represented by an admitted, versioned command contract. Documentation strings and runtime event listeners can change independently.

## Required command model

```txt
ControlContractEntry
  controlId
  actionId
  supported codes
  phase admission
  expected product/mission revision
  repeat policy
  public label
  manual-smoke step
```

## Required parity result

```txt
accepted
  -> every declared control has one installed adapter
  -> every public runtime adapter has one declared control
  -> documentation and HUD labels match

rejected
  -> missing-runtime-binding
  -> undeclared-runtime-binding
  -> stale-product-revision
  -> unsupported-phase
  -> conflicting-public-label
```

## Fixture matrix

```txt
burner keyboard parity
vent keyboard parity
wheel zoom parity
A/D absent-and-undocumented parity
R absent-and-undocumented until ResetMission exists
blur input retirement
README/AGENTS/HUD label parity
headless control observation parity
```
