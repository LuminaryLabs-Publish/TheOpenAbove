# TheOpenAbove Agent Start

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Last aligned:** `2026-07-08T03:21:22-04:00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `TheOpenAbove`.

Read this folder before changing implementation code.

## Selection reason

The full current `LuminaryLabs-Publish` repo list was compared against the tracked repo ledger in `LuminaryLabs-Dev/LuminaryLabs`.

All accessible Publish repos were represented in the central ledger, and `LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`TheOpenAbove` was selected because the central ledger referenced `.agent` tracker paths for this repo, but the actual publish repo was missing root `.agent/START_HERE.md` when checked during this run.

## Current product read

`TheOpenAbove` is currently a Vite / Three.js hot-air-balloon drift game.

The public route is:

```txt
index.html
  -> src/main.js
```

The runtime imports Three.js and NexusEngine from CDN, builds procedural terrain/lakes/trees/clouds/wind ribbons, creates a hot-air-balloon object family, integrates burner/vent/wind drift inline, publishes Nexus telemetry, updates a HUD, and exposes `window.GameHost` state.

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/domain-service-breakdown.md
.agent/render-audit/balloon-render-surface-audit.md
.agent/gameplay-audit/balloon-drift-loop-audit.md
.agent/trackers/2026-07-08T03-21-22-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T03-21-22-04-00.md
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
.github/workflows/deploy.yml
```

## Main rule

Treat the hot-air-balloon drift runtime as canonical unless a future product decision intentionally restores the earlier bird/free-flight controller.

Do not let README copy, legacy `FLIGHT` constants, renderer code, DOM/HUD code, or ad hoc inline motion constants become the permanent source of product or gameplay authority.

## Current next safe ledge

Build the **Product Copy Authority + Balloon Drift Config Fixture Gate**.

Keep the public route, balloon visuals, burner/vent controls, basket-follow camera, Nexus telemetry kit, and GameHost shape stable while moving canonical balloon drift config, altitude bands, route objects, source fingerprints, route event results, and DOM-free route replay fixtures into source-backed authority.
