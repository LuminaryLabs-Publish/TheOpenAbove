# Route Source Audit: Product Campaign Runtime Parity

**Timestamp:** `2026-07-10T01-20-47-04-00`

## Source authority problem

The live route is Balloon Drift, but route source authority is still distributed across product copy, campaign config, and browser runtime composition.

The next cut should reconcile those sources without changing the visible route.

## Source records observed

```txt
README.md: still carries older free-flight wording and controls.
package.json: now aligns to cinematic hot-air-balloon wind drift and exposes check/build.
src/data/campaign.config.js: still carries legacy thermal, gate, perch, start-speed, and FLIGHT-style fields.
index.html: mounts the current canvas/HUD route and loads src/main.js.
src/main.js: composes the actual Balloon Drift runtime.
window.GameHost.getState(): returns local and Nexus snapshots, but no source block.
```

## Runtime parity target

```txt
product copy
  -> current route label
  -> route mode
  -> controls
  -> compatibility status

campaign config
  -> current WORLD fields
  -> current route fields
  -> accepted legacy fields
  -> ignored or deferred fields

runtime composer
  -> actual modules imported
  -> active simulation config
  -> active visual config
  -> active telemetry config

browser readback
  -> local snapshot
  -> nexus snapshot
  -> source snapshot
  -> source acceptance ledger
```

## Needed files next

```txt
src/source/open-above-product.js
src/source/balloon-drift.config.js
src/source/legacy-flight-compatibility.js
src/source/source-consumer-manifest.js
src/source/source-fingerprint.js
src/source/source-snapshot.js
src/source/source-acceptance.js
src/source/source-consumer-ledger.js
src/source/gamehost-source-readback.js
scripts/open-above-source-fixture.mjs
```

## Acceptance rows needed

```txt
route_copy_current
readme_copy_legacy_compatible
package_description_current
campaign_world_current
campaign_flight_legacy_compatible
runtime_imports_current
simulation_config_current
visual_domain_config_current
gamehost_source_missing_until_splice
fixture_rows_missing_until_script
```

## Source-safe ledge

```txt
TheOpenAbove Source Consumer GameHost Readback Catch-up + Browser Fixture Gate
```

## Do not do next

```txt
Do not rewrite README alone without source rows.
Do not delete legacy campaign fields before compatibility rows exist.
Do not retune simulation constants before source fingerprints exist.
Do not rewrite GameHost legacy fields.
Add .source readback additively.
```
