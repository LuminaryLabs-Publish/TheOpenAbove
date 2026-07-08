# TheOpenAbove Agent Start

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Last aligned:** `2026-07-08T11-49-04-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `TheOpenAbove`.

Read this folder before changing implementation code.

## Current selection result

The full accessible `LuminaryLabs-Publish` repository list was compared against tracked repo-ledger state in `LuminaryLabs-Dev/LuminaryLabs`.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, undocumented, or missing sampled root `.agent/START_HERE.md` state.

`TheOpenAbove` was selected as the oldest eligible fallback follow-up because its last observed central ledger update was older than the other checked eligible roots and the live hot-air-balloon drift route still needs source acceptance fixtures before source edits.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

## Publish repos checked

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / latest central review 2026-07-08T11:09:38-04:00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest central update 2026-07-08T10:19:57-04:00
LuminaryLabs-Publish/TheOpenAbove        selected fallback / latest central update 2026-07-08T10:10:34-04:00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / latest central update 2026-07-08T10:58:46-04:00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest central update 2026-07-08T10:39:22-04:00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest central update 2026-07-08T11:19:53-04:00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest central update 2026-07-08T10:48:47-04:00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest central update 2026-07-08T11:40:00-04:00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / latest central review 2026-07-08T11:28:38-04:00
```

## Current product read

`TheOpenAbove` is currently a standalone Vite / Three.js hot-air-balloon drift experience.

The live route is:

```txt
index.html
  -> src/main.js
  -> Three.js CDN
  -> NexusEngine main CDN
  -> src/data/campaign.config.js
  -> src/hot-air-balloon-object-kit.js
  -> inline terrain / wind / balloon drift / camera / HUD loop
```

The durable docs still partially describe the older bird/free-flight product. Treat the current public runtime as canonical unless a future product decision intentionally restores bird/free-flight.

## Current interaction loop

```txt
open app
  -> load canvas and HUD
  -> src/main.js imports Three.js, NexusEngine, CAMPAIGN, WORLD, and hot-air-balloon object kit
  -> terrain, lakes, trees, clouds, wind ribbons, and balloon visual object are created
  -> keyboard input controls burner / vent intent
  -> wheel input changes camera zoom and near-basket blend
  -> inline drift loop samples wind, buoyancy, altitude safety, velocity, distance, balloon animation, and camera
  -> Nexus telemetry kit publishes balloonSnapshot / balloonTicked
  -> Three.js renders the current frame
  -> HUD writes altitude, wind, drift distance, heat, camera mode, and Nexus marker
  -> window.GameHost.getState() exposes local and Nexus balloon telemetry
```

## Target authority loop

```txt
canonical product copy
  -> OPEN_ABOVE_PRODUCT
  -> BALLOON_DRIFT source config
  -> ALTITUDE_BANDS / ROUTE_OBJECTS / WIND_LANE_HINTS
  -> BalloonSourceFingerprint
  -> BalloonSourceSnapshot
  -> SourceAcceptanceResult rows
  -> GameHost source diagnostics
  -> DOM-free source acceptance fixture
  -> later route event result and mission snapshot reducers
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-08T11-49-04-04-00-dsk-domain-breakdown.md
.agent/render-audit/2026-07-08T11-49-04-04-00-gamehost-source-readback.md
.agent/gameplay-audit/2026-07-08T11-49-04-04-00-balloon-source-acceptance-loop.md
.agent/route-source-audit/2026-07-08T11-49-04-04-00-acceptance-fixture-implementation-plan.md
.agent/trackers/2026-07-08T11-49-04-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T11-49-04-04-00.md
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

Do not extract renderer/world/camera systems before the current hot-air-balloon product source is authoritative.

The next implementation should preserve the public route and visual behavior while adding source objects, parity checks, source snapshots, GameHost source diagnostics, and DOM-free acceptance fixtures.

Keep `FLIGHT` as compatibility-only until a fixture proves the live route no longer depends on it.

## Current next safe ledge

```txt
TheOpenAbove Source Acceptance Fixture Implementation Gate
```

Stop that ledge when `README.md`, `package.json`, `src/data/campaign.config.js`, `src/main.js`, `window.GameHost.getState().source`, and a DOM-free fixture all report the same current balloon-drift product source without changing the visible balloon route.
