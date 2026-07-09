# TheOpenAbove Agent Start

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Last aligned:** `2026-07-09T03-20-01-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `TheOpenAbove`.

Read this folder before changing implementation code.

## Current selection result

The accessible `LuminaryLabs-Publish` repository list was compared against the tracked/documented repo ledger in `LuminaryLabs-Dev/LuminaryLabs` and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, central-ledger absent, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`TheOpenAbove` was selected as the oldest eligible tracked fallback. The central ledger still pointed at `2026-07-09T00-40-20-04-00`, older than the other checked non-excluded repo alignments.

## Publish repos checked

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central alignment 2026-07-09T01-09-24-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central alignment 2026-07-09T02-50-39-04-00
LuminaryLabs-Publish/TheOpenAbove         selected / oldest eligible central alignment 2026-07-09T00-40-20-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central alignment 2026-07-09T01-28-10-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central alignment 2026-07-09T03-00-46-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central alignment 2026-07-09T02-05-52-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central alignment 2026-07-09T00-50-00-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central alignment 2026-07-09T02-31-41-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central alignment 2026-07-09T02-11-07-04-00
```

## Current product read

`TheOpenAbove` is a standalone Vite / Three.js hot-air-balloon drift route using NexusEngine main through CDN telemetry.

The active route is:

```txt
index.html
  -> canvas#game, #hud, #error
  -> src/main.js
  -> Three.js CDN
  -> NexusEngine main CDN
  -> src/data/campaign.config.js
  -> src/hot-air-balloon-object-kit.js
  -> inline terrain / lake / tree / cloud / wind-ribbon generation
  -> inline balloon drift / camera / HUD / GameHost loop
```

The durable source mismatch remains:

```txt
README.md: free-flight, carving, gliding, diving, boosting, thermals, gates, sky perch
package.json: standalone free-flight exploration
src/data/campaign.config.js: legacy FLIGHT config and thermal/gate/perch route copy
index.html: current hot-air-balloon route title/description
src/main.js: actual burner/vent/wind/altitude/basket-camera Balloon Drift runtime
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

## Target proof loop

```txt
README/package/campaign/runtime markers
  -> OPEN_ABOVE_PRODUCT
  -> BALLOON_DRIFT_CONFIG
  -> ALTITUDE_BANDS
  -> ROUTE_OBJECTS
  -> WIND_LANE_HINTS
  -> SOURCE_MANIFEST
  -> SourceFingerprint
  -> SourceSnapshot
  -> SourceAcceptanceResult[]
  -> SourceAcceptanceLedger
  -> SourceReadbackLedgerSplice
  -> BrowserConsumerFixtureRow[]
  -> GameHostSourceReadback
  -> window.GameHost.getState().source
  -> DOM-free source fixture
  -> npm run check fixture gate
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-09T03-20-01-04-00-source-authority-ledger-freeze-dsk-map.md
.agent/render-audit/2026-07-09T03-20-01-04-00-gamehost-source-projection-readback.md
.agent/gameplay-audit/2026-07-09T03-20-01-04-00-balloon-drift-source-consumer-loop.md
.agent/route-source-audit/2026-07-09T03-20-01-04-00-product-config-parity-contract.md
.agent/deploy-audit/2026-07-09T03-20-01-04-00-source-fixture-check-gate.md
.agent/trackers/2026-07-09T03-20-01-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T03-20-01-04-00.md
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
.github/workflows/deploy-pages.yml
```

## Source files to add next

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
src/source/source-readback-ledger.js
src/source/gamehost-source-readback.js
scripts/open-above-source-fixture.mjs
```
