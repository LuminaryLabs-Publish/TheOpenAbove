# Route Source Audit: Product Campaign Headless Parity

**Timestamp:** `2026-07-10T02-38-56-04-00`

## Current route source

The active route is Balloon Drift.

Source facts:

```txt
index.html title: The Open Above: Balloon Drift
package description: Cinematic hot air balloon wind-drift experience powered by Nexus Engine Realtime Core.
src/main.js imports createBalloonSimulation
src/main.js imports createBalloonTelemetryEngine
src/main.js imports createVisualDomain
src/main.js imports buildHotAirBalloon
src/main.js exposes window.GameHost.getState()
```

## Legacy/compatibility source

`src/data/campaign.config.js` still includes older free-flight fields:

```txt
regions[0].description: carve through ancient canopy / thermal / sky perch language
objectives.thermalTarget
objectives.gateTarget
objectives.returnRadius
WORLD.gateCount
WORLD.thermalCount
WORLD.perch
WORLD.start.speed
FLIGHT min/cruise/max speed and flight forces
```

These may still be useful as compatibility or future route data, but they are not yet classified by a source ledger.

## Headless parity gap

`tools/headless-editor-environment.mjs` is currently renderer/build oriented.

It should be extended or paired with a source fixture so that headless checks prove product/campaign/runtime parity.

Required rows:

```txt
product_route_current: balloon-drift
package_description_current: true
index_title_current: true
campaign_current_region: meadow-lift
campaign_legacy_fields_classified: true
world_legacy_fields_classified: true
flight_legacy_fields_classified: true
runtime_imports_balloon_simulation: true
runtime_imports_visual_domain: true
runtime_imports_telemetry: true
gamehost_source_block_expected: true
```

## Guardrail

Do not remove legacy fields just to make the source look clean.

First classify them, then preserve or retire them with ledger rows.
