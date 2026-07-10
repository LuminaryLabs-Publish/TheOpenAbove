# Route Source Audit: Legacy Current Source Parity Contract

**Timestamp:** `2026-07-10T08-59-04-04-00`

## Current route source split

```txt
README.md
  -> legacy free-flight pitch/bank/boost copy

package.json
  -> current cinematic hot-air-balloon wind-drift description

src/data/campaign.config.js
  -> CAMPAIGN/WORLD current-ish route fields
  -> FLIGHT legacy free-flight fields

src/main.js
  -> current Balloon Drift composer
```

## Required parity contract

The next implementation should classify fields rather than delete them.

Expected row classes:

```txt
current
legacy-compatible
ignored
deferred
missing
consumer-required
```

## Required source rows

```txt
route_copy_current
readme_copy_legacy_compatible
package_description_current
campaign_regions_legacy_compatible
campaign_world_current
campaign_flight_legacy_compatible
runtime_imports_current
simulation_start_current
visual_domain_config_current
telemetry_consumer_current
hud_consumer_current
gamehost_source_missing
fixture_missing
```

## Contract

Do not delete README or campaign legacy concepts until the source acceptance ledger can explain every legacy field and every current consumer.
