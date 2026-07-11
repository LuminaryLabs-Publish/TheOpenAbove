# Deploy Audit: Product Source Parity Fixture Gate

**Timestamp:** `2026-07-11T09-21-50-04-00`

## Goal

Prevent a build from publishing when runtime mode, source data, controls, HUD copy, GameHost readback and public documentation disagree.

## Existing checks

`npm run check` currently proves required files and source patterns exist, then executes pure airstream/mail assertions. It does not validate product-mode selection or public/runtime parity.

## Required fixture commands

```txt
npm run fixture:product-manifest
npm run fixture:mode-supersession
npm run fixture:control-contract
npm run fixture:hud-source-parity
npm run fixture:documentation-parity
npm run fixture:product-frame-identity
```

## Required assertions

```txt
exactly one mode is active
Air Mail explicitly supersedes or coexists with Meadow Lift
runtime region/mode/mission IDs belong to one manifest
HUD destination and route text project from source data
README and AGENTS control tables match the runtime control contract
A/D and R cannot be documented as active unless runtime commands exist
GameHost, telemetry and the committed frame expose the same source fingerprint
headless and browser construction select the same source
```

## Build order

```txt
manifest schema fixture
  -> supersession fixture
  -> control binding fixture
  -> HUD/public copy fixture
  -> runtime/headless source parity
  -> existing airstream/mail tests
  -> existing source smoke
  -> Vite build
  -> browser smoke
  -> Pages smoke
```

## Failure policy

Any product identity or control mismatch must fail before artifact upload. The build must not reduce the result to a warning because incorrect public controls and mixed save/session identities are product-breaking defects.

## Current state

```txt
fixture commands implemented: no
runtime source changed by this audit: no
workflow changed by this audit: no
browser execution performed: no
Pages execution performed: no
```
