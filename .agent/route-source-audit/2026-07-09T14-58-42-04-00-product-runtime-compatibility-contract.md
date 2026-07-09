# Route Source Audit — Product Runtime Compatibility Contract

**Timestamp:** `2026-07-09T14-58-42-04-00`

## Contract problem

The live route and durable docs disagree.

```txt
Current route/product:
  The Open Above: Balloon Drift
  cozy hot air balloon wind-drift experience
  burner / vent / wheel basket-view controls

Legacy source surfaces:
  README free-flight carving/gliding/diving/boosting
  package description free-flight exploration
  campaign config thermal/gate/perch objectives
  FLIGHT constants for bird/free-flight behavior
```

## Required source compatibility contract

```txt
OpenAboveProductRecord:
  declares Balloon Drift as current visible route

BalloonDriftConfigRecord:
  owns burner, vent, wind, buoyancy, altitude, camera, and HUD defaults now inline in src/main.js

LegacyFlightCompatibilityRecord:
  marks FLIGHT and older objective fields as compatibility-only until removed or migrated

SourceConsumerManifest:
  names README, package, index, campaign config, runtime, object kit, smoke, GameHost, repo-local .agent, and central ledger as consumers

SourceConsumerLedger:
  binds source snapshot, fingerprint, acceptance rows, and consumer ownership
```

## Non-negotiable next behavior

```txt
Do not remove legacy fields until compatibility status is explicit.
Do not change visible Balloon Drift behavior.
Do not rewrite README/package without fixture rows that prove the new copy matches runtime controls.
```
