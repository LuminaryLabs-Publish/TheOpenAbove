# Architecture Audit: Source Result Readback Ledger DSK Map

Timestamp: `2026-07-10T13-21-23-04-00`

## Runtime composition

```txt
route shell
  -> Three importmap
  -> NexusEngine CDN adapter
  -> main route composer
  -> campaign/world config
  -> visual domain
  -> hot-air-balloon object
  -> balloon simulation
  -> camera rig
  -> presentation domain
  -> telemetry engine
  -> HUD projection
  -> legacy GameHost readback
  -> smoke and headless editor checks
```

## Current source authority issue

The source of truth is split across product copy, campaign config, `src/main.js`, simulation/camera/visual modules, smoke tests, and headless editor checks.

The route runs as Balloon Drift, but legacy free-flight fields remain in campaign config. That is fine only if they are explicitly classified as legacy-compatible or deferred rows.

## DSK/domain map

```txt
open-above-product-copy-authority-kit
open-above-readme-route-copy-parity-kit
open-above-campaign-current-route-authority-kit
open-above-legacy-flight-compatibility-kit
open-above-balloon-drift-config-kit
open-above-source-result-authority-ledger-kit
open-above-source-consumer-manifest-kit
open-above-source-fingerprint-kit
open-above-source-snapshot-kit
open-above-source-acceptance-ledger-kit
open-above-source-consumer-ledger-kit
open-above-input-result-ledger-kit
open-above-gamehost-source-readback-kit
open-above-headless-source-fixture-kit
open-above-browser-source-fixture-kit
```

## Missing proof questions

```txt
which source rows define the current product route?
which legacy campaign rows are still accepted?
which rows are ignored, deferred, or compatibility-only?
which runtime consumers use each source family?
which input events are accepted, clamped, rejected, or no-change?
which source snapshot is visible through GameHost?
which source rows are visible through headless project.check?
```

## Next safe ledge

```txt
TheOpenAbove Source Result Readback Ledger Refresh + GameHost Headless Fixture Gate
```
