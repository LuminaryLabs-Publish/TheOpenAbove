# TheOpenAbove Agent Start

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Last aligned:** `2026-07-09T09-18-29-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `TheOpenAbove`.

Read this folder before changing implementation code.

## Current selection result

The accessible `LuminaryLabs-Publish` repository list was compared against the tracked/documented repo ledger in `LuminaryLabs-Dev/LuminaryLabs` and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, central-ledger absent, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`TheOpenAbove` was selected as the oldest eligible documented fallback after recent same-day catch-up passes. The source consumer ledger remains the safest ledge because the visible route is Balloon Drift while package/campaign/readme source language still carries older free-flight assumptions.

## Publish repos checked

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / not selected
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / not selected
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / not selected
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / not selected
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / not selected
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / not selected
LuminaryLabs-Publish/TheOpenAbove         selected / oldest eligible central alignment before this pass
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / not selected
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / recently aligned
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
README.md: still expected to contain older free-flight route language until source authority is corrected
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
.agent/architecture-audit/2026-07-09T09-18-29-04-00-source-consumer-ledger-fixture-freeze-dsk-map.md
.agent/render-audit/2026-07-09T09-18-29-04-00-gamehost-source-readback-freeze.md
.agent/gameplay-audit/2026-07-09T09-18-29-04-00-balloon-drift-source-consumer-loop.md
.agent/route-source-audit/2026-07-09T09-18-29-04-00-fixture-freeze-contract.md
.agent/deploy-audit/2026-07-09T09-18-29-04-00-check-build-source-fixture-map.md
.agent/trackers/2026-07-09T09-18-29-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T09-18-29-04-00.md
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
src/source/source-consumer-manifest.js
src/source/source-fingerprint.js
src/source/source-snapshot.js
src/source/source-acceptance.js
src/source/source-consumer-ledger.js
src/source/gamehost-source-readback.js
scripts/open-above-source-fixture.mjs
```

## Main rule

Keep the current static route, balloon visual object, `window.GameHost.getState().local`, `window.GameHost.getState().nexusEngine`, camera readability, HUD readability, burner/vent physics, and NexusEngine CDN telemetry stable.

Do not extract terrain, renderer, camera, HUD, or physics until the source consumer ledger fixture proves product copy, package metadata, campaign config, runtime constants, object-kit metadata, GameHost projection, and central ledger sync.

## Current next safe ledge

```txt
TheOpenAbove Source Consumer Ledger Fixture Freeze + GameHost Source Readback Gate
```
