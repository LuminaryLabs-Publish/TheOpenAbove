# TheOpenAbove Agent Start

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Last aligned:** `2026-07-08T10-10-34-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `TheOpenAbove`.

Read this folder before changing implementation code.

## Current selection result

The full accessible `LuminaryLabs-Publish` repository list was compared against tracked repo-ledger state in `LuminaryLabs-Dev/LuminaryLabs`.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, undocumented, or missing sampled root `.agent/START_HERE.md` state.

`TheOpenAbove` was selected as the oldest eligible fallback follow-up because its last sampled alignment was older than the other checked eligible roots and the live hot-air-balloon drift route still needs a product/source acceptance wire map before source edits.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

## Publish repos checked

```txt
LuminaryLabs-Publish/HorrorCorridor      ledgered with root .agent
LuminaryLabs-Publish/AetherVale          ledgered with root .agent
LuminaryLabs-Publish/TheOpenAbove        selected fallback: product source acceptance wire map
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      ledgered with root .agent
LuminaryLabs-Publish/PrehistoricRush     ledgered with root .agent
LuminaryLabs-Publish/ZombieOrchard       ledgered with root .agent
LuminaryLabs-Publish/IntoTheMeadow       ledgered with root .agent
LuminaryLabs-Publish/MyCozyIsland        ledgered with root .agent
LuminaryLabs-Publish/TheUnmappedHouse    ledgered with root .agent
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
.agent/architecture-audit/2026-07-08T10-10-34-04-00-balloon-source-authority-dsk-map.md
.agent/render-audit/2026-07-08T10-10-34-04-00-render-diagnostics-readback-contract.md
.agent/gameplay-audit/2026-07-08T10-10-34-04-00-balloon-route-authority-loop.md
.agent/route-source-audit/2026-07-08T10-10-34-04-00-product-source-acceptance-wire-map.md
.agent/trackers/2026-07-08T10-10-34-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T10-10-34-04-00.md
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

## Current next safe ledge

```txt
TheOpenAbove Product Source Acceptance Wire Map
```

Stop that ledge when the next coder has exact file targets, exported object names, acceptance records, reason codes, GameHost projection keys, and fixture rows for product/source parity without needing to infer them from `src/main.js`.