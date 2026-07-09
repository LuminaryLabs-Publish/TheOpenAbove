# Route Source Audit — Central Ledger Source Fixture Catch-up

**Timestamp:** `2026-07-08T22-19-38-04-00`

## Why this audit exists

Repo-local `.agent` state had advanced beyond the central `LuminaryLabs-Dev/LuminaryLabs` ledger state.

This pass keeps the local and central ledgers aligned while preserving the same implementation ledge: source fixture acceptance and browser consumer readback.

## Product route mismatch

```txt
index.html:
  Balloon Drift route and hot-air-balloon canvas.

src/main.js:
  Balloon Drift runtime with burner, vent, wind, altitude, camera, HUD, Nexus telemetry, and GameHost state.

README.md:
  older free-flight copy with carving, gliding, diving, boosting, thermals, wind gates, and sky-perch return.

package.json:
  older free-flight description.

src/data/campaign.config.js:
  legacy FLIGHT fields for pitch/roll/yaw/boost/thermal behavior.
```

## Required source modules

```txt
src/source/open-above-product.js
src/source/balloon-drift.config.js
src/source/altitude-bands.js
src/source/route-descriptors.js
src/source/wind-lane-hints.js
src/source/source-manifest.js
src/source/source-fingerprint.js
src/source/source-snapshot.js
src/source/source-acceptance.js
src/source/gamehost-source-readback.js
scripts/open-above-source-fixture.mjs
```

## Acceptance ledger shape

```txt
SourceAcceptanceRow {
  id,
  status,
  reason,
  sourceFiles,
  runtimeMarkers,
  expected,
  actual,
  notes
}

SourceAcceptanceLedger {
  status,
  rows,
  productFingerprint,
  runtimeFingerprint,
  fixtureStatus
}
```

## Consumer splice rule

Only add source readback.

Do not change existing gameplay constants, renderer setup, balloon visuals, HUD text, local snapshot keys, Nexus telemetry keys, or the public route while implementing this ledge.
