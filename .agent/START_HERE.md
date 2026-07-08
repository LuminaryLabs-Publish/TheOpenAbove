# TheOpenAbove Agent Start

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Last aligned:** `2026-07-08T07:10:12-04:00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `TheOpenAbove`.

Read this folder before changing implementation code.

## Current selection result

The full accessible `LuminaryLabs-Publish` repo list was compared against tracked repo-ledger state in `LuminaryLabs-Dev/LuminaryLabs`.

No checked non-excluded Publish repo was found that was fully new, central-ledger absent, or missing root `.agent/START_HERE.md` state.

`TheOpenAbove` was selected as the current fallback follow-up target because the previous pass identified the correct product/source drift, and this pass narrows the next implementation into a concrete balloon drift config acceptance ledger.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

## Publish repos checked

```txt
LuminaryLabs-Publish/AetherVale          ledgered with root .agent
LuminaryLabs-Publish/HorrorCorridor      ledgered with root .agent
LuminaryLabs-Publish/IntoTheMeadow       ledgered with root .agent
LuminaryLabs-Publish/MyCozyIsland        ledgered with root .agent
LuminaryLabs-Publish/PhantomCommand      ledgered with root .agent
LuminaryLabs-Publish/PrehistoricRush     ledgered with root .agent
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/TheOpenAbove        selected follow-up: balloon config acceptance ledger
LuminaryLabs-Publish/TheUnmappedHouse    ledgered with root .agent
LuminaryLabs-Publish/ZombieOrchard       ledgered with root .agent
```

## Current product read

`TheOpenAbove` is currently a Vite / Three.js hot-air-balloon drift game.

The active page route is:

```txt
index.html
  -> src/main.js
```

The live runtime imports Three.js and NexusEngine from CDNs, builds procedural terrain, lakes, trees, clouds, wind ribbons, a hot-air-balloon object family, integrates burner, vent, wind, vertical velocity, altitude safety, camera blend, HUD, Nexus telemetry, and `window.GameHost` state inline.

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/domain-service-breakdown.md
.agent/render-audit/balloon-render-surface-audit.md
.agent/gameplay-audit/balloon-drift-loop-audit.md
.agent/route-source-audit/balloon-source-authority-gap.md
.agent/product-copy-audit/balloon-product-source-fixture-matrix.md
.agent/route-source-audit/balloon-drift-config-acceptance-ledger.md
.agent/trackers/2026-07-08T07-10-12-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T07-10-12-04-00.md
.agent/kit-registry.json
```

Prior breakdowns:

```txt
.agent/trackers/2026-07-08T03-21-22-04-00/project-breakdown.md
.agent/trackers/2026-07-08T04-31-06-04-00/project-breakdown.md
.agent/trackers/2026-07-08T05-48-28-04-00/project-breakdown.md
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
.github/workflows/deploy.yml
```

## Main rule

Treat the hot-air-balloon drift runtime as canonical unless a future product decision intentionally restores the earlier bird/free-flight controller.

Do not let README copy, package copy, legacy `FLIGHT`, DOM/HUD text, renderer frame state, or inline `src/main.js` drift constants become permanent product authority.

## Current next safe ledge

```txt
TheOpenAbove Balloon Drift Config Acceptance Ledger
```

Keep the public route, balloon visuals, burner and vent controls, basket-follow camera, Nexus telemetry kit, and GameHost baseline stable while proving product-copy/config/runtime parity through source-backed snapshots and DOM-free fixture records.
