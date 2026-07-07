# The Open Above Agent Notes

This folder stores repo-local agent findings for `LuminaryLabs-Publish/TheOpenAbove`.

## Latest tracker

```txt
.agent/trackers/2026-07-07T08-51-15-04-00/project-breakdown.md
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
.agent/trackers/2026-07-07T08-51-15-04-00/project-breakdown.md
```

## Current repo read

`TheOpenAbove` is currently a standalone Vite/Three.js publish repo for a cozy hot-air-balloon wind-drift experience. The live runtime uses burner/vent input, procedural valley terrain, lakes, trees, clouds, wind ribbons, a basket-follow camera, a hot-air-balloon object family, a Nexus Engine telemetry DSK, and `window.GameHost.getState()`.

The browser runtime is already balloon-first, but `README.md`, `package.json`, and `src/data/campaign.config.js` still preserve old bird/free-flight language: carving, gliding, diving, boosting, thermals, wind gates, pitch/bank controls, and legacy `FLIGHT` tuning. Treat balloon drift as canonical unless a future product decision intentionally restores the bird controller.

This pass refines the next build into **Balloon Drift Canonical Config + Mission Snapshot**. The needed first product loop is explicit route and snapshot authority: canonical `BALLOON_DRIFT`, route object descriptors, altitude bands, wind-lane hints, three buoyancy gates, meadow-perch landing, mission state, progression unlocks, and behavior smoke fixtures.

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
open-above-route-object-config-kit
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
open-above-mission-snapshot-contract-kit
open-above-basket-follow-camera-kit
open-above-hud-mission-telemetry-kit
open-above-gamehost-debug-kit
open-above-scripted-route-smoke-kit
open-above-balloon-behavior-smoke-kit
open-above-static-marker-smoke-kit
```

## Immediate next product direction

Commit to `TheOpenAbove Balloon Drift Canonical Config + Mission Snapshot Cutover`:

```txt
preserve current balloon drift visuals and controls
  -> update README controls and milestone language to burner / vent / drift
  -> update package description from free-flight to balloon drift
  -> add BALLOON_DRIFT to src/data/campaign.config.js
  -> keep FLIGHT only as legacy compatibility or remove after smoke parity
  -> define routeObjects for buoyancy-gate-01, buoyancy-gate-02, buoyancy-gate-03, and meadow-perch-landing
  -> define altitudeBand descriptors and windLaneHint descriptors
  -> add pure mission-state service fed by balloon state and route objects
  -> add progression service for meadow-lift-complete and cloud-basin-unlocked
  -> extend snapshot() with mission, progression, and routeObjects
  -> extend HUD with current gate / landing / unlock status
  -> add scripted smoke for deterministic route completion
  -> extract host/input/wind/terrain/drift/camera/HUD modules after state contract parity
```

## Next acceptance target

```txt
npm run check passes
npm run build passes
README and package describe balloon drift consistently
BALLOON_DRIFT is canonical and FLIGHT is legacy-only or removed behind compatibility tests
routeObjects include buoyancy-gate-01, buoyancy-gate-02, buoyancy-gate-03, and meadow-perch-landing
GameHost.getState().local.mission exists
GameHost.getState().local.progression.cloudBasinUnlocked exists
GameHost.getState().local.routeObjects exposes gate and landing status
HUD shows mission status without adding more than one extra line
behavior smoke proves three gate completions and landing unlock
```
