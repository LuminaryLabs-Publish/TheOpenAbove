# TheOpenAbove Agent Start

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Last aligned:** `2026-07-08T15-09-42-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `TheOpenAbove`.

Read this folder before changing implementation code.

## Current selection result

The accessible `LuminaryLabs-Publish` repo list was compared against tracked repo-ledger state in `LuminaryLabs-Dev/LuminaryLabs`.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`TheOpenAbove` was selected as the oldest observed eligible fallback follow-up. Its central ledger was older than the other current non-Cavalry repo-local follow-ups, and the public route still has a high-value source-authority mismatch.

## Publish repos checked

```txt
LuminaryLabs-Publish/AetherVale          tracked / root .agent observed / central update observed after TheOpenAbove
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent observed / central update observed after TheOpenAbove
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent observed / central update observed after TheOpenAbove
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent observed / central update observed after TheOpenAbove
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent observed / central update observed after TheOpenAbove
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent observed / central update observed after TheOpenAbove
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/TheOpenAbove        selected follow-up: source fixture implementation queue
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent observed / central update observed after TheOpenAbove
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent observed / central update observed after TheOpenAbove
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

The route title/meta/HUD are already hot-air-balloon Balloon Drift, while durable README/package/campaign source still partially describes the older free-flight bird/glider product. Treat the current public balloon runtime as canonical unless a future product decision intentionally restores free-flight.

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
canonical README/package/campaign copy
  -> OPEN_ABOVE_PRODUCT
  -> BALLOON_DRIFT config mirrored from current inline constants
  -> BalloonSourceFingerprint
  -> BalloonSourceSnapshot
  -> SourceAcceptanceResult rows
  -> SourceAcceptanceLedger
  -> GameHost source diagnostics
  -> route descriptors / altitude bands / wind lane hints
  -> DOM-free source fixture
  -> later route event result and mission snapshot reducers
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-08T15-09-42-04-00-balloon-source-fixture-implementation-queue.md
.agent/render-audit/2026-07-08T15-09-42-04-00-gamehost-source-diagnostics-readback.md
.agent/gameplay-audit/2026-07-08T15-09-42-04-00-balloon-route-result-boundary.md
.agent/route-source-audit/2026-07-08T15-09-42-04-00-source-fixture-implementation-queue.md
.agent/trackers/2026-07-08T15-09-42-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T15-09-42-04-00.md
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
TheOpenAbove Balloon Source Fixture Implementation Queue + GameHost Source Diagnostics
```

Stop that ledge when `README.md`, `package.json`, `src/data/campaign.config.js`, `src/main.js`, `window.GameHost.getState().source`, and a DOM-free fixture all report the same current balloon-drift product source without changing the visible balloon route.