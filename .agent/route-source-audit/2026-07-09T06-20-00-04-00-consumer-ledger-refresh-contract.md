# Route Source Audit — Consumer Ledger Refresh Contract

**Timestamp:** `2026-07-09T06-20-00-04-00`

## Current source truth split

```txt
README.md:
  old free-flight product language

package.json:
  old standalone free-flight exploration description

src/data/campaign.config.js:
  Meadow Lift / Cloud Basin route copy
  thermalTarget / gateTarget / perch fields
  FLIGHT constants from older flight model

src/main.js:
  current Balloon Drift runtime
  burner / vent / wind / buoyancy / basket camera / HUD / GameHost telemetry

src/hot-air-balloon-object-kit.js:
  current procedural hot-air-balloon visual source
```

## Required contract

The next implementation should add source modules that report consumer ownership before editing existing files.

```txt
SourceConsumerRecord:
  id
  file
  role
  currentStatus
  expectedRoute
  mismatchPolicy
  ownerDomain
  fixtureRequired

SourceConsumerLedger:
  repository
  route
  objectType
  consumers[]
  fingerprints
  acceptanceRows[]
  knownMismatches[]
  nextRepairOrder[]
```

## Required consumers

```txt
readme_product_copy
package_description
campaign_config
legacy_flight_config
main_runtime_defaults
hot_air_balloon_object_kit
smoke_test
window_gamehost_state
agent_start_here
agent_kit_registry
central_repo_ledger
central_internal_change_log
```

## Mismatch policy

```txt
README/package/campaign mismatches are known and should be accepted as tracked gaps until the source fixture exists.
Runtime constants in src/main.js are current route truth until extracted into src/source/balloon-drift.config.js.
Legacy FLIGHT values are compatibility-only until explicitly removed.
GameHost .local and .nexusEngine are stable public readback fields and must not be broken.
GameHost .source is additive only.
```

## Stop condition

```txt
A DOM-free fixture can load the source consumer ledger and prove every source consumer row has an owner, expected route, mismatch status, and repair order.
```
