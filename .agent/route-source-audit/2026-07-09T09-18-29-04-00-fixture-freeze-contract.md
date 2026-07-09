# Route Source Audit — Fixture Freeze Contract

**Timestamp:** `2026-07-09T09-18-29-04-00`

## Summary

The visible route is Balloon Drift. The source contract must freeze that route before any runtime extraction, route expansion, or copy cleanup.

## Source consumers to bind

```txt
README.md
package.json
index.html
src/data/campaign.config.js
src/main.js
src/hot-air-balloon-object-kit.js
tests/smoke.mjs
window.GameHost.getState()
.agent/START_HERE.md
.agent/kit-registry.json
LuminaryLabs-Dev/LuminaryLabs repo-ledger entry
LuminaryLabs-Dev/LuminaryLabs internal change-log entry
```

## Contract records

```txt
OpenAboveProductRecord:
  routeId
  productName
  routeName
  visibleDescription
  canonicalControls
  objectType

BalloonDriftConfigRecord:
  burnerDefaults
  ventDefaults
  windDefaults
  buoyancyDefaults
  altitudeDefaults
  cameraDefaults
  HUDDefaults

LegacyFlightCompatibilityRecord:
  legacyFields
  compatibilityReason
  removalBlocker
  currentRouteAuthority

SourceConsumerManifest:
  consumers[]
  owner
  expectedMarker
  currentStatus

SourceFingerprint:
  readmeMarker
  packageMarker
  campaignMarker
  runtimeMarker
  objectKitMarker
  smokeMarker

SourceSnapshot:
  route
  product
  objectKit
  controls
  camera
  telemetry
  sourceStatus

SourceAcceptanceLedger:
  rows[]
  acceptedCount
  mismatchCount
  compatibilityCount
```

## Fixture freeze rule

A future implementation can edit README/package/campaign/source modules only after the DOM-free fixture can report each consumer row and classify each mismatch as accepted, rejected, or compatibility-only.
