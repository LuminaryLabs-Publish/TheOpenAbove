# TheOpenAbove Agent Start

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Last aligned:** `2026-07-08T17-31-22-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `TheOpenAbove`.

Read this folder before changing implementation code.

## Current selection result

The full accessible `LuminaryLabs-Publish` repository list was compared against tracked repo-ledger state in `LuminaryLabs-Dev/LuminaryLabs`.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`TheOpenAbove` was selected because repo-local state had advanced beyond the central ledger and the unresolved seam is still source authority: the visible route is hot-air-balloon drift, while README/package/campaign source still carry older free-flight product language and `src/main.js` owns live balloon drift constants inline.

## Publish repos checked

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent observed
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent observed
LuminaryLabs-Publish/AetherVale          tracked / root .agent observed
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent observed
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent observed
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent observed
LuminaryLabs-Publish/TheOpenAbove        selected / central ledger catch-up + source manifest gate
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent observed
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent observed
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
.agent/architecture-audit/2026-07-08T17-31-22-04-00-source-manifest-consumer-cutover-dsk-map.md
.agent/render-audit/2026-07-08T17-31-22-04-00-gamehost-source-fixture-readback.md
.agent/gameplay-audit/2026-07-08T17-31-22-04-00-balloon-drift-config-replay-loop.md
.agent/route-source-audit/2026-07-08T17-31-22-04-00-source-manifest-consumer-splice-acceptance.md
.agent/deploy-audit/2026-07-08T17-31-22-04-00-fixture-check-integration.md
.agent/trackers/2026-07-08T17-31-22-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T17-31-22-04-00.md
.agent/kit-registry.json
```

Earlier handoff remains relevant:

```txt
.agent/architecture-audit/2026-07-08T17-21-32-04-00-product-config-fixture-row-dsk-map.md
.agent/render-audit/2026-07-08T17-21-32-04-00-gamehost-source-diagnostics-contract.md
.agent/gameplay-audit/2026-07-08T17-21-32-04-00-balloon-route-acceptance-loop.md
.agent/route-source-audit/2026-07-08T17-21-32-04-00-fixture-row-implementation-contract.md
.agent/deploy-audit/2026-07-08T17-21-32-04-00-static-publish-build-contract.md
.agent/trackers/2026-07-08T17-21-32-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T17-21-32-04-00.md
```

## Source files to inspect next

```txt
README.md
package.json
index.html
src/main.js
src/data/campaign.config.js
src/hot-air-balloon-object-kit.js
src/balloon-envelope-panel-kit.js
src/balloon-mouth-kit.js
src/balloon-streamer-fit-kit.js
src/balloon-fabric-seam-kit.js
src/hot-air-balloon-basket-kit.js
src/hot-air-balloon-rigging-kit.js
src/hot-air-balloon-burner-kit.js
src/rope-kit.js
tests/smoke.mjs
```

## Main rule

Keep the visible hot-air-balloon route stable.

Do not restore the older free-flight/bird controller unless there is an explicit product decision to do that.

Do not extract renderer/world/camera domains before source authority is fixture-proven.

Keep `FLIGHT` as compatibility-only until a fixture proves the live route no longer depends on it.

## Current next safe ledge

```txt
TheOpenAbove Source Manifest Consumer Splice + Fixture Check Gate
```

Stop that ledge when source modules, source manifest, fixture rows, `src/main.js` source readback, and `npm run check` integration prove README/package/campaign/runtime/GameHost parity while preserving existing `.local` and `.nexusEngine` state shapes.
