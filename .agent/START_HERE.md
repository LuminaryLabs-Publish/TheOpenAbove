# TheOpenAbove Agent Start

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Last aligned:** `2026-07-09T19-21-19-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `TheOpenAbove`.

Read this folder before changing implementation code.

## Current selection result

The current public `LuminaryLabs-Publish` organization repo list was compared against the tracked/documented repo ledger in `LuminaryLabs-Dev/LuminaryLabs` and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, central-ledger absent, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`TheOpenAbove` was selected as the oldest eligible documented-selection fallback among the current public non-Cavalry Publish repos.

This pass refreshes repo-local and central tracking to `2026-07-09T19-21-19-04-00` and keeps the next source-authority ledge focused on a fixture-readable Balloon Drift source readback layer.

## Publish repos checked

```txt
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/TheOpenAbove         selected / oldest eligible documented fallback
```

## Current product read

`TheOpenAbove` is a standalone Vite / Three.js hot-air-balloon drift route using NexusEngine main through CDN telemetry.

The live browser route is Balloon Drift.

The durable source mismatch remains:

```txt
README.md: still describes older free-flight carving/gliding/diving/boosting
package.json: still describes standalone free-flight exploration
src/data/campaign.config.js: still carries thermalTarget, gateTarget, returnRadius, perch, start speed, and FLIGHT fields
index.html: current hot-air-balloon route title/description
src/main.js: actual burner/vent/wind/altitude/basket-camera Balloon Drift runtime
src/hot-air-balloon-object-kit.js: active visual object kit and sub-kit metadata
tests/smoke.mjs: current hot-air-balloon route and object-kit checks
```

## Current interaction loop

```txt
open index.html
  -> canvas and HUD mount
  -> src/main.js imports Three.js CDN, NexusEngine main CDN, CAMPAIGN, WORLD, and hot-air-balloon object kit
  -> terrain, lakes, trees, clouds, wind ribbons, and balloon visual object are created
  -> Space / W / ArrowUp maps to burner lift
  -> S / ArrowDown / Shift maps to vent descent
  -> wheel mutates camera zoom and near-basket blend
  -> update(dt) integrates burner, vent, wind angle, wind speed, buoyancy, damping, ceiling softness, velocity, position, altitude, and distance
  -> animateHotAirBalloon updates burner and rigging sub-kits
  -> Nexus telemetry kit publishes balloon resource and tick event
  -> draw(dt) resolves third-person/basket camera, first-person visibility, rope fade, ride bob, sway, and burner vibration
  -> Three.js renders the frame
  -> HUD writes route status and telemetry
  -> window.GameHost.getState() exposes local and Nexus balloon telemetry
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-09T19-21-19-04-00-source-ledger-central-refresh-dsk-map.md
.agent/render-audit/2026-07-09T19-21-19-04-00-gamehost-source-readback-fixture.md
.agent/gameplay-audit/2026-07-09T19-21-19-04-00-balloon-drift-runtime-source-loop.md
.agent/route-source-audit/2026-07-09T19-21-19-04-00-product-runtime-parity-readback-contract.md
.agent/deploy-audit/2026-07-09T19-21-19-04-00-source-fixture-check-build-gate.md
.agent/trackers/2026-07-09T19-21-19-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T19-21-19-04-00.md
.agent/kit-registry.json
```

## Source files to inspect next

```txt
README.md
package.json
index.html
src/main.js
src/data/campaign.config.js
src/hot-air-balloon-object-kit.js
tests/smoke.mjs
```

## Source files to add next

```txt
src/source/open-above-product.js
src/source/balloon-drift.config.js
src/source/legacy-flight-compatibility.js
src/source/altitude-bands.js
src/source/route-descriptors.js
src/source/wind-lane-hints.js
src/source/source-consumer-manifest.js
src/source/source-fingerprint.js
src/source/source-snapshot.js
src/source/source-acceptance.js
src/source/source-consumer-ledger.js
src/source/gamehost-source-readback.js
scripts/open-above-source-fixture.mjs
```

## Next safe ledge

```txt
TheOpenAbove Source Ledger Central Refresh + Browser Consumer Fixture Gate
```

## Operating rules

```txt
Only push to main.
Do not create branches.
Do not work on TheCavalryOfRome.
Keep scheduled repo breakdowns moving; do not pause the loop.
```
