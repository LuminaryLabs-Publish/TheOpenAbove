# START HERE: TheOpenAbove Device-Control Action Coverage

**Last aligned:** `2026-07-15T16-58-19-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Reviewed pre-audit repository head:** `86d3847e89a148671dca8487a9afbbb0a1e04951`  
**Reviewed runtime source revision:** `1417c80309218c7c61def3b2f09a977eaab8b953`  
**Status:** `device-control-action-coverage-authority-audited`

## Summary

The active route provides balloon flight through keyboard state, camera zoom through wheel input, and map control through `M` and `Escape`. The gameplay canvas disables native touch behavior but no active pointer, touch, gamepad, or on-screen producer supplies equivalent actions, so touch-only users cannot intentionally operate the flight, map, or camera loop.

## Plan ledger

**Goal:** admit complete, device-neutral control profiles and route all producers through one semantic flight-action state while preserving the existing balloon simulation, camera, map, rendering, and deployment architecture.

- [x] Compare all 11 Publish repositories with the central ledger.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm ten eligible ledgers, root `.agent` states, and synchronized heads.
- [x] Select only TheOpenAbove by the oldest synchronized rule.
- [x] Inspect the complete interaction loop, domains, all kits, adapters, providers, and services.
- [x] Preserve all 101 active named surfaces.
- [x] Add the `2026-07-15T16-58-19-04-00` tracker and device-control audit family.
- [ ] Implement and prove keyboard/mouse, keyboard-only, touch-only, gamepad, hybrid, cancellation, visible-control, build, artifact, and Pages coverage.

## Read this pass first

```txt
.agent/trackers/2026-07-15T16-58-19-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-15T16-58-19-04-00.md
.agent/architecture-audit/2026-07-15T16-58-19-04-00-device-control-action-coverage-dsk-map.md
.agent/render-audit/2026-07-15T16-58-19-04-00-device-control-surface-visible-frame-gap.md
.agent/gameplay-audit/2026-07-15T16-58-19-04-00-touch-only-passive-flight-loop.md
.agent/interaction-audit/2026-07-15T16-58-19-04-00-device-action-command-result-map.md
.agent/device-control-audit/2026-07-15T16-58-19-04-00-keyboard-wheel-touch-gamepad-coverage-contract.md
.agent/deploy-audit/2026-07-15T16-58-19-04-00-device-control-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-15T16-58-19-04-00-oldest-selection-device-control-reconciliation.md
```

## Source-backed state

```txt
keyboard burner vent steering producer: present
wheel camera zoom producer: present
keyboard map toggle and close producer: present
pointer or touch flight producer: absent
gamepad flight producer: absent
on-screen flight map or zoom controls: absent
complete control-profile admission: absent
hybrid duplicate suppression: absent
FirstDeviceControlSurfaceFrameAck: absent
FirstDeviceActionEffectFrameAck: absent
```

## Required parent domain

```txt
open-above-device-control-action-coverage-authority-domain
```

## Next safe ledge

Introduce immutable device capability, action-map, control-profile, and producer-generation descriptors. Prepare visible controls before admitting profiles that require them, normalize all producers into one `FlightActionState`, cancel held actions at lifecycle boundaries, and publish control-surface and action-effect frame acknowledgements.

## Do not claim

Do not claim touch playability, gamepad support, keyboard-only zoom coverage, hybrid-input safety, visible control correctness, action-effect convergence, artifact parity, deployed parity, or production readiness until the browser fixture matrix passes.
