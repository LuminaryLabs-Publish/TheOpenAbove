# TheOpenAbove Agent Start

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Last aligned:** `2026-07-09T09-36-24-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `TheOpenAbove`.

Read this folder before changing implementation code.

## Current selection result

The accessible `LuminaryLabs-Publish` organization repo list was compared against the tracked/documented repo ledger in `LuminaryLabs-Dev/LuminaryLabs` and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, central-ledger absent, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`TheOpenAbove` was selected because repo-local `.agent` state had advanced to `2026-07-09T09-29-24-04-00` while the central ledger still pointed at `2026-07-09T09-18-29-04-00` at read time. This pass creates a fresh `2026-07-09T09-36-24-04-00` tracker/audit set and syncs central tracking to the same target.

## Publish repos checked

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest observed 2026-07-09T06-28-53-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest observed 2026-07-09T07-05-52-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest observed 2026-07-09T08-50-00-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest observed 2026-07-09T07-41-29-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest observed 2026-07-09T08-02-33-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest observed 2026-07-09T08-29-38-04-00
LuminaryLabs-Publish/TheOpenAbove         selected / repo-local newer than central ledger
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest observed 2026-07-09T07-19-41-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest observed 2026-07-09T09-10-50-04-00
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
README.md: still describes free-flight carving/gliding/diving/boosting
package.json: describes standalone free-flight exploration
src/data/campaign.config.js: carries thermalTarget, gateTarget, returnRadius, perch, start speed, and FLIGHT fields
index.html: current hot-air-balloon route title/description
src/main.js: actual burner/vent/wind/altitude/basket-camera Balloon Drift runtime
src/hot-air-balloon-object-kit.js: active visual object kit and sub-kit metadata
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
README/package/campaign/runtime/object-kit markers
  -> OpenAboveProductRecord
  -> BalloonDriftConfigRecord
  -> LegacyFlightCompatibilityRecord
  -> SourceConsumerManifest
  -> SourceConsumerRecord[]
  -> SourceFingerprint
  -> SourceSnapshot
  -> SourceAcceptanceResult[]
  -> SourceAcceptanceLedger
  -> SourceConsumerLedger
  -> SourceReadbackProjection
  -> GameHostSourceReadback
  -> window.GameHost.getState().source
  -> DOM-free source fixture
  -> npm run check fixture gate
  -> central ledger parity row
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-09T09-36-24-04-00-source-readback-ledger-parity-dsk-map.md
.agent/render-audit/2026-07-09T09-36-24-04-00-gamehost-source-consumer-readback.md
.agent/gameplay-audit/2026-07-09T09-36-24-04-00-balloon-drift-source-authority-loop.md
.agent/route-source-audit/2026-07-09T09-36-24-04-00-source-fixture-central-ledger-contract.md
.agent/deploy-audit/2026-07-09T09-36-24-04-00-source-fixture-check-wire-map.md
.agent/trackers/2026-07-09T09-36-24-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T09-36-24-04-00.md
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

## Main rule

Do not add new gameplay, route progression, terrain extraction, renderer extraction, camera retuning, or balloon visual changes before the current Balloon Drift source authority is fixture-readable and central tracking points at the same source ledger as repo-local `.agent`.