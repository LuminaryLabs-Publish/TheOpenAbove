# The Open Above Agent Notes

This folder stores repo-local agent findings for `LuminaryLabs-Publish/TheOpenAbove`.

## Latest tracker

```txt
.agent/trackers/2026-07-07T07-38-47-04-00/project-breakdown.md
```

## Latest kit registry

```txt
.agent/kit-registry.json
```

## Tracker history

```txt
.agent/trackers/2026-07-07T03-00-32-04-00/project-breakdown.md
.agent/trackers/2026-07-07T04-08-29-04-00/project-breakdown.md
.agent/trackers/2026-07-07T05-21-11-04-00/project-breakdown.md
.agent/trackers/2026-07-07T06-31-46-04-00/project-breakdown.md
.agent/trackers/2026-07-07T07-38-47-04-00/project-breakdown.md
```

## Current repo read

`TheOpenAbove` is currently a standalone Vite/Three.js publish repo for a cozy hot-air-balloon wind-drift experience. The live runtime uses burner/vent input, procedural valley terrain, lakes, trees, clouds, wind ribbons, a basket-follow camera, a hot-air-balloon object family, a Nexus Engine telemetry DSK, and `window.GameHost.getState()`.

The browser host already labels the product as `The Open Above: Balloon Drift`, but the public README, package description, and `src/data/campaign.config.js` still contain older bird/free-flight language and legacy `FLIGHT` tuning. Treat balloon drift as the active runtime direction unless a future code pass intentionally restores the bird controller.

This pass refines the next build from broad config parity into a mission state service cutover. The first needed product loop is now explicit route state: buoyancy gates, altitude bands, landing/perch conditions, mission completion, Cloud Basin unlock, and behavior smoke fixtures.

## Active agent rules

- Work on only one publish repo per run.
- Do not work on `LuminaryLabs-Publish/TheCavalryOfRome`.
- Keep findings in root `.agent`.
- Create a timestamped tracker entry for each run.
- Push directly to `main` when the workflow permits it.
- Mirror the central tracking note into `LuminaryLabs-Dev/LuminaryLabs`.

## Current explicit kit inventory

```txt
open-above-balloon-telemetry-kit
open-above-hot-air-balloon-object-kit
open-above-balloon-envelope-panel-kit
open-above-balloon-mouth-kit
open-above-balloon-streamer-fit-kit
open-above-balloon-fabric-seam-kit
open-above-hot-air-balloon-envelope-kit
open-above-hot-air-balloon-basket-kit
open-above-hot-air-balloon-rigging-kit
open-above-hot-air-balloon-burner-kit
open-above-rope-kit
```

## Current candidate kit inventory

```txt
open-above-balloon-drift-config-kit
open-above-runtime-host-kit
open-above-three-render-host-kit
open-above-balloon-input-map-kit
open-above-balloon-state-kit
open-above-balloon-drift-physics-domain-kit
open-above-wind-field-domain-kit
open-above-altitude-safety-domain-kit
open-above-terrain-sampler-domain-kit
open-above-world-generation-domain-kit
open-above-route-object-kit
open-above-meadow-lift-mission-state-kit
open-above-region-unlock-progression-kit
open-above-basket-follow-camera-kit
open-above-hud-mission-telemetry-kit
open-above-gamehost-debug-kit
open-above-scripted-route-smoke-kit
open-above-balloon-behavior-smoke-kit
```

## Immediate next product direction

Commit to `TheOpenAbove Mission State Service + Behavior Smoke Cutover`:

```txt
preserve current balloon drift visuals and controls
  -> update README/package/config language around balloon drift
  -> add BALLOON_DRIFT config beside legacy FLIGHT
  -> define three buoyancy gate route objects
  -> define altitude bands and wind-lane hint descriptors
  -> define landing/perch zone conditions
  -> add pure mission state service
  -> add progression service for meadow-lift-complete and cloud-basin-unlocked
  -> expose mission/progression/routeObjects in GameHost.getState().local
  -> surface mission status in HUD
  -> add pure scripted route smoke fixture
  -> keep static smoke coverage
  -> extract host/input/wind/terrain/drift/camera/HUD only after behavior state is stable
```

## Next acceptance target

```txt
npm run check passes
npm run build passes
README and config describe balloon drift consistently
BALLOON_DRIFT is canonical and FLIGHT is legacy-only
GameHost.getState().local.mission exists
GameHost.getState().local.progression.cloudBasinUnlocked exists
three buoyancy gates can be completed through a deterministic fixture
landing/perch completion writes meadow-lift-complete
cloud-basin unlock is visible in local state
```
