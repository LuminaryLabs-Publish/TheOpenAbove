# TheOpenAbove Agent Start

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Last aligned:** `2026-07-08T22-08-07-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `TheOpenAbove`.

Read this folder before changing implementation code.

## Current selection result

The full accessible `LuminaryLabs-Publish` repository list was compared against tracked repo-ledger state in `LuminaryLabs-Dev/LuminaryLabs` and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`TheOpenAbove` was selected as the oldest eligible sampled fallback. Its previous sampled root alignment was `2026-07-08T20-10-32-04-00`, older than the other checked non-excluded repos, and the visible Balloon Drift runtime still lacks source fixture acceptance and browser consumer readback proof.

## Publish repos checked

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / latest sampled alignment 2026-07-08T20-38-28-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest sampled alignment 2026-07-08T21-31-35-04-00
LuminaryLabs-Publish/TheOpenAbove        selected / oldest sampled alignment 2026-07-08T20-10-32-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / latest sampled alignment 2026-07-08T20-52-00-04-00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest sampled alignment 2026-07-08T21-40-45-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest sampled alignment 2026-07-08T21-18-39-04-00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest sampled alignment 2026-07-08T20-21-59-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest sampled alignment 2026-07-08T21-58-34-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / latest sampled alignment 2026-07-08T21-00-12-04-00
```

## Current product read

`TheOpenAbove` is currently a standalone Vite / Three.js hot-air-balloon drift experience.

The durable source still partly describes the older free-flight route:

```txt
README.md: carving, gliding, diving, boosting, thermals, wind gates, sky perch
package.json: standalone free-flight exploration
src/data/campaign.config.js: FLIGHT, thermals, gates, perch, pitch, roll, yaw, boost
src/main.js: actual Balloon Drift runtime with burner, vent, wind, altitude, basket camera, HUD, and GameHost telemetry
```

## Current route

```txt
index.html
  -> src/main.js
  -> Three.js CDN
  -> NexusEngine main CDN
  -> src/data/campaign.config.js
  -> src/hot-air-balloon-object-kit.js
  -> inline terrain / lake / tree / cloud / wind-ribbon generation
  -> inline balloon drift / camera / HUD / GameHost loop
```

## Current interaction loop

```txt
open index.html
  -> canvas#game and HUD mount
  -> src/main.js imports Three.js CDN, NexusEngine main CDN, CAMPAIGN, WORLD, and hot-air-balloon object kit
  -> terrain, lakes, trees, clouds, wind ribbons, and balloon visual object are created
  -> keyboard input maps Space / W / ArrowUp to burner lift
  -> keyboard input maps S / ArrowDown / Shift to vent descent
  -> wheel input changes camera zoom and near-basket blend
  -> update(dt) integrates burner, vent, wind, buoyancy, altitude safety, velocity, position, and drift distance
  -> animateHotAirBalloon updates burner and balloon sub-kits
  -> Nexus telemetry kit publishes balloon snapshot/resource and balloon tick event
  -> draw(dt) resolves third-person/basket camera and first-person visibility
  -> Three.js renders scene/camera
  -> HUD writes altitude, wind, distance, heat, camera mode, and Nexus marker
  -> window.GameHost.getState() exposes local and Nexus balloon telemetry
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-08T22-08-07-04-00-source-fixture-acceptance-dsk-map.md
.agent/render-audit/2026-07-08T22-08-07-04-00-gamehost-source-consumer-readback.md
.agent/gameplay-audit/2026-07-08T22-08-07-04-00-balloon-route-source-authority-loop.md
.agent/route-source-audit/2026-07-08T22-08-07-04-00-fixture-acceptance-consumer-wire-map.md
.agent/deploy-audit/2026-07-08T22-08-07-04-00-check-script-fixture-gate.md
.agent/trackers/2026-07-08T22-08-07-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T22-08-07-04-00.md
.agent/kit-registry.json
```

## Source files to inspect before implementation

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
src/source/gamehost-source-readback.js
scripts/open-above-source-fixture.mjs
```

## Main rule

Keep `index.html -> src/main.js`, balloon visuals, burner/vent controls, basket camera behavior, HUD, Nexus telemetry, existing `window.GameHost.getState().local`, and existing `window.GameHost.getState().nexusEngine` stable.

Do not extract renderer/world/camera systems, add new regions, tune physics constants, or promote reusable kits before source fixture acceptance and browser consumer readback are implemented.

## Current next safe ledge

```txt
TheOpenAbove Source Fixture Acceptance + Browser Consumer Readback Gate
```

Stop that ledge when fixture rows prove README, package metadata, campaign copy, `BALLOON_DRIFT`, `SOURCE_MANIFEST`, altitude bands, route objects, wind lane hints, source fingerprint, source snapshot, acceptance ledger, GameHost source readback, existing local/nexus shapes, and `npm run check` integration without requiring DOM, canvas, WebGL, Three.js renderer boot, or Nexus runtime boot.