# TheOpenAbove Agent Start

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Last aligned:** `2026-07-08T20-01-23-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `TheOpenAbove`.

Read this folder before changing implementation code.

## Current selection result

The full accessible `LuminaryLabs-Publish` repository list was compared against tracked repo-ledger state in `LuminaryLabs-Dev/LuminaryLabs`.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`TheOpenAbove` was selected as the current fallback because its previous central/root alignment was older than the other sampled non-excluded repos and the unresolved source-authority seam is still user-visible: the runtime is hot-air-balloon Balloon Drift, while README/package/campaign source still describe an older free-flight route.

## Publish repos checked

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / sampled alignment 2026-07-08T18-09-21-04-00
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / sampled alignment 2026-07-08T18-19-43-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / sampled alignment 2026-07-08T18-58-10-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / sampled alignment 2026-07-08T19-21-15-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / sampled alignment 2026-07-08T18-51-55-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / sampled alignment 2026-07-08T19-40-00-04-00
LuminaryLabs-Publish/TheOpenAbove        selected / source authority fallback / previous alignment 2026-07-08T17-31-22-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / sampled alignment 2026-07-08T18-41-41-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / sampled alignment 2026-07-08T19-30-31-04-00
```

## Current product read

`TheOpenAbove` is currently a standalone Vite / Three.js hot-air-balloon drift experience.

The live route is:

```txt
index.html
  -> ./src/main.js
  -> Three.js CDN
  -> NexusEngine main CDN
  -> CAMPAIGN / WORLD from src/data/campaign.config.js
  -> hot-air-balloon object kit family
  -> inline terrain / drift / camera / HUD / GameHost loop
```

The route title/meta/HUD are already hot-air-balloon Balloon Drift. Durable README/package/campaign source still partially describes the older free-flight bird/glider product.

## Current interaction loop

```txt
open index.html
  -> canvas#game and HUD mount
  -> src/main.js imports Three.js CDN, NexusEngine main CDN, CAMPAIGN, WORLD, and hot-air-balloon object kit
  -> procedural terrain, lakes, trees, clouds, wind ribbons, and balloon visual object are built
  -> keyboard state maps Space/W/ArrowUp to burner and S/ArrowDown/Shift to vent
  -> wheel input changes camera zoom and first-person basket blend
  -> update(dt) integrates burner, vent, wind, buoyancy, altitude safety, velocity, position, and distance
  -> animateHotAirBalloon updates burner and rigging sub-kits
  -> Nexus telemetry kit publishes balloon snapshot/resource and balloon tick event
  -> draw(dt) resolves third-person/basket camera and first-person visibility
  -> Three.js renders scene/camera
  -> HUD projects altitude, wind, distance, heat, camera mode, and Nexus marker
  -> window.GameHost.getState() returns local and Nexus balloon telemetry
```

## Target authority loop

```txt
canonical README/package/campaign copy
  -> OPEN_ABOVE_PRODUCT
  -> BALLOON_DRIFT config mirrored from current inline constants
  -> ALTITUDE_BANDS / ROUTE_OBJECTS / WIND_LANE_HINTS
  -> SOURCE_MANIFEST
  -> BalloonSourceFingerprint
  -> BalloonSourceSnapshot
  -> SourceAcceptanceResult rows
  -> SourceAcceptanceLedger
  -> GameHost source diagnostics
  -> DOM-free source fixture
  -> source manifest consumer splice
  -> fixture check integration
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-08T20-01-23-04-00-balloon-source-authority-dsk-breakdown.md
.agent/render-audit/2026-07-08T20-01-23-04-00-gamehost-source-readback-consumer-map.md
.agent/gameplay-audit/2026-07-08T20-01-23-04-00-runtime-constant-parity-loop.md
.agent/route-source-audit/2026-07-08T20-01-23-04-00-source-acceptance-row-map.md
.agent/deploy-audit/2026-07-08T20-01-23-04-00-check-build-source-fixture-gate.md
.agent/trackers/2026-07-08T20-01-23-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T20-01-23-04-00.md
.agent/kit-registry.json
```

Previous handoff remains relevant:

```txt
.agent/architecture-audit/2026-07-08T17-31-22-04-00-source-manifest-consumer-cutover-dsk-map.md
.agent/render-audit/2026-07-08T17-31-22-04-00-gamehost-source-fixture-readback.md
.agent/gameplay-audit/2026-07-08T17-31-22-04-00-balloon-drift-config-replay-loop.md
.agent/route-source-audit/2026-07-08T17-31-22-04-00-source-manifest-consumer-splice-acceptance.md
.agent/deploy-audit/2026-07-08T17-31-22-04-00-fixture-check-integration.md
.agent/trackers/2026-07-08T17-31-22-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T17-31-22-04-00.md
```
