# Deploy Audit: Observation Frame Correlation Fixture Gate

**Timestamp:** `2026-07-11T14-50-59-04-00`

## Summary

Current checks validate files and source patterns but do not execute the browser frame ordering or prove that deployed telemetry and HUD describe one visible frame.

## Plan ledger

**Goal:** block release claims about telemetry/GameHost fidelity until pure, host, browser and Pages fixtures share one observation fingerprint.

- [x] Identify current package commands.
- [x] Identify untested frame-order behavior.
- [x] Define pure fixture layer.
- [x] Define browser fixture layer.
- [x] Define deployed Pages fixture layer.

## Required pure fixtures

```txt
fixture:observation-envelope
fixture:ack-admission
fixture:commit-barrier
fixture:stale-ack
fixture:cross-epoch-ack
fixture:observation-fingerprint
fixture:detached-read-model
```

## Required host fixtures

```txt
fixture:telemetry-after-render
fixture:delivery-visible-frame
fixture:render-stat-frame
fixture:effective-quality-frame
fixture:hud-telemetry-parity
fixture:gamehost-detachment
```

## Required browser assertions

```txt
committed observation revision increases once per accepted frame
delivery result and Delivered HUD appear in the same observation
renderer diagnostics report the acknowledged render frame
GameHost returns immutable detached snapshots
no partial observation is exposed during RAF execution
```

## Required Pages assertions

```txt
deployed build reports the expected product fingerprint
deployed committed observation schema matches source build
deployed canvas HUD telemetry and GameHost share one observation fingerprint
```

## Gate order

```txt
npm run check
npm run headless:check
npm run build
pure observation fixtures
host frame-correlation fixtures
browser committed-observation smoke
Pages committed-observation smoke
```

No executable fixture was run during this documentation-only pass.
