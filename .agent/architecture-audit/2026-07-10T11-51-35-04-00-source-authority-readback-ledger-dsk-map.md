# Architecture audit: Source authority readback ledger DSK map

Timestamp: `2026-07-10T11-51-35-04-00`

## Current DSK map

```txt
Route shell
  -> index.html
  -> Three.js 0.165.0 importmap
  -> canvas / HUD / error panel

Runtime composer
  -> src/main.js
  -> NexusEngine CDN
  -> CAMPAIGN/WORLD
  -> visual domain
  -> balloon object
  -> simulation
  -> camera rig
  -> presentation
  -> telemetry
  -> HUD
  -> GameHost

Visual DSK cluster
  -> visual-domain
  -> quality-tier
  -> dynamic-resolution
  -> sky/sun/aerial/clouds/terrain/grass/water/landmarks/composer/lens

Gameplay DSK cluster
  -> balloon-simulation-kit
  -> hot-air-balloon-object-kit
  -> balloon-presentation-domain
  -> balloon-camera-rig-kit

Validation DSK cluster
  -> tests/smoke.mjs
  -> tools/headless-editor-environment.mjs
  -> package scripts

Missing proof cluster
  -> source authority ledger
  -> source fingerprint
  -> source snapshot
  -> source acceptance ledger
  -> source consumer ledger
  -> input result ledger
  -> GameHost source readback
  -> headless source fixture
```

## Source of truth split

```txt
Current live source of truth:
  src/main.js
  package.json description/scripts
  index.html route shell
  src/data/campaign.config.js WORLD/current route fields
  runtime/visual/source files imported by main.js

Legacy-compatible source still present:
  CAMPAIGN region language around carving/thermals/gates/perch
  FLIGHT constants
  WORLD start speed/gates/thermals/perch fields

Current readback source:
  window.GameHost.getState().local
  window.GameHost.getState().nexusEngine

Missing readback source:
  window.GameHost.getState().source
```

## Required source rows

```txt
product_copy_current
readme_copy_legacy_compatible
package_description_current
html_route_current
main_runtime_current
campaign_world_current
campaign_flight_legacy_compatible
simulation_consumer_current
visual_consumer_current
camera_consumer_current
presentation_consumer_current
telemetry_consumer_current
hud_consumer_current
gamehost_source_missing
headless_source_fixture_missing
```

## Architectural rule

Add source proof additively.

Do not delete legacy campaign or README fields until a compatibility kit records which fields are still consumed, ignored, legacy-compatible, or deferred.
