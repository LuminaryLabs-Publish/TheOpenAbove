# Route Source Audit — Source Readback Ledger Splice Contract

**Timestamp:** `2026-07-09T00-40-20-04-00`

## Problem

The browser route is Balloon Drift, but durable source files still encode older free-flight mission language.

```txt
README.md -> free-flight exploration / thermals / gates / sky perch
package.json -> standalone free-flight exploration
src/data/campaign.config.js -> FLIGHT config and thermal/gate/perch goals
src/main.js -> burner/vent hot-air-balloon drift route
```

## Source readback ledger contract

The next implementation should create one ledger that can be consumed by DOM-free fixtures and browser diagnostics.

```txt
SourceReadbackLedger = {
  routeId,
  currentProductMode,
  manifest,
  fingerprint,
  snapshot,
  acceptanceRows,
  browserConsumerRows,
  legacyCompatibilityRows
}
```

## Required acceptance states

```txt
pass:
  live runtime identifies hot-air-balloon object
  object kit exposes open-above-hot-air-balloon-object-kit
  telemetry kit exposes open-above-balloon-telemetry-kit
  smoke test checks current balloon route markers
  GameHost local/nexus snapshot shape remains compatible

warn:
  README still says free-flight
  package description still says free-flight
  campaign config still names thermal/gate/perch goals
  FLIGHT remains compatibility-only

fail:
  browser consumer cannot read source ledger
  fixture cannot run without DOM/canvas/WebGL
  source fingerprint is unstable
  source snapshot omits runtime defaults
```

## Source module contract

```txt
open-above-product.js:
  owns current public route copy and legacy copy status

balloon-drift.config.js:
  owns burner, vent, wind, buoyancy, altitude, camera, and snapshot defaults

source-manifest.js:
  lists README/package/campaign/runtime/object-kit/smoke/gamehost consumers

source-fingerprint.js:
  returns deterministic fingerprint over product/config/runtime markers

source-snapshot.js:
  returns current route, controls, object type, telemetry kit, and visual kit metadata

source-acceptance.js:
  turns mismatch states into stable rows

source-readback-ledger.js:
  combines manifest, fingerprint, snapshot, and acceptance rows

gamehost-source-readback.js:
  projects additive browser-facing readback without mutating local or Nexus snapshot fields
```

## Stop condition

The ledge is complete when the source fixture can prove the current Balloon Drift route and the browser can expose the same ledger through `window.GameHost.getState().source`.
