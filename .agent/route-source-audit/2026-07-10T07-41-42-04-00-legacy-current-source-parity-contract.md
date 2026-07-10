# Route Source Audit: Legacy Current Source Parity Contract

Timestamp: 2026-07-10T07-41-42-04-00
Repo: LuminaryLabs-Publish/TheOpenAbove

## Source authority problem

The repo currently contains three overlapping source stories:

```txt
README.md
  -> free-flight exploration, thermals, gates, perch, pitch/bank/boost controls

src/data/campaign.config.js
  -> CAMPAIGN and WORLD current enough for Meadow Lift
  -> FLIGHT legacy fields still present

src/main.js
  -> actual Balloon Drift runtime composer
  -> hot-air balloon simulation and presentation
  -> GameHost local/nexusEngine readback only
```

## Why this matters

The route should not delete legacy fields yet, because no compatibility ledger exists. The correct next step is to classify source rows as current, legacy-compatible, ignored, or deferred.

## Required contract

```txt
SourceRow
  id
  sourceFile
  sourceKind
  currentStatus
  consumer
  accepted
  reason
  fingerprint
  notes
```

## Required statuses

```txt
current
legacy_compatible
ignored_by_current_route
deferred_product_copy
missing_readback
```

## Required rows

```txt
route_copy_current
readme_copy_legacy_compatible
package_description_current
campaign_world_current
campaign_flight_legacy_compatible
runtime_imports_current
simulation_config_current
visual_domain_config_current
smoke_contract_current
headless_environment_current
gamehost_source_readback_missing
source_fixture_rows_missing
```

## Next safe ledge

```txt
TheOpenAbove Source Readback Ledger Catch-up + Headless Fixture Gate
```
