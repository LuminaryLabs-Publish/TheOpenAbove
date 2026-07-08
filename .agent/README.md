# The Open Above Agent Notes

This folder stores repo-local agent findings for `LuminaryLabs-Publish/TheOpenAbove`.

## Latest tracker

```txt
.agent/trackers/2026-07-08T00-21-15-04-00/project-breakdown.md
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
.agent/trackers/2026-07-07T10-01-09-04-00/project-breakdown.md
.agent/trackers/2026-07-07T11-11-26-04-00/project-breakdown.md
.agent/trackers/2026-07-07T12-20-08-04-00/project-breakdown.md
.agent/trackers/2026-07-07T12-38-43-04-00/project-breakdown.md
.agent/trackers/2026-07-07T13-50-54-04-00/project-breakdown.md
.agent/trackers/2026-07-07T15-11-23-04-00/project-breakdown.md
.agent/trackers/2026-07-07T16-21-09-04-00/project-breakdown.md
.agent/trackers/2026-07-07T17-29-51-04-00/project-breakdown.md
.agent/trackers/2026-07-07T18-49-32-04-00/project-breakdown.md
.agent/trackers/2026-07-07T20-10-49-04-00/project-breakdown.md
.agent/trackers/2026-07-07T21-29-47-04-00/project-breakdown.md
.agent/trackers/2026-07-07T22-50-39-04-00/project-breakdown.md
.agent/trackers/2026-07-08T00-21-15-04-00/project-breakdown.md
```

## Current repo read

`TheOpenAbove` is currently a standalone Vite / Three.js publish repo for a cozy hot-air-balloon wind-drift experience.

The active route is:

```txt
index.html
  -> ./src/main.js
```

The live runtime uses burner / vent input, procedural valley terrain, lakes, trees, clouds, wind ribbons, a basket-follow camera, a hot-air-balloon visual object family, a Nexus Engine telemetry DSK, and `window.GameHost.getState()`.

The main blocker remains **product and source authority drift**:

```txt
README.md still describes free-flight exploration, gliding, diving, boosting, thermals, wind gates, pitch/bank controls, and sky perch return.
package.json still describes a standalone free-flight exploration game.
src/data/campaign.config.js exports CAMPAIGN, WORLD, and legacy FLIGHT only.
src/main.js imports CAMPAIGN and WORLD only and owns the actual live balloon drift constants inline.
route objects, altitude bands, mission snapshots, progression snapshots, RouteEventResult envelopes, and DOM-free route replay are not implemented yet.
```

Treat hot-air-balloon drift as canonical unless a future product decision intentionally restores the bird controller.

## Interaction loop

```txt
open app
  -> read balloon drift HUD
  -> hold Space / W / ArrowUp for burner lift
  -> hold S / ArrowDown / Shift for vent descent
  -> drift with procedural wind
  -> scroll to blend camera toward the basket
  -> read altitude, wind, distance, heat, and camera mode telemetry
```

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

## Current inline / candidate kit inventory

```txt
open-above-runtime-host-kit
open-above-vite-static-publish-kit
open-above-three-render-host-kit
open-above-product-copy-authority-kit
open-above-campaign-config-kit
open-above-legacy-flight-compatibility-kit
open-above-balloon-input-map-kit
open-above-balloon-state-kit
open-above-balloon-drift-physics-domain-kit
open-above-wind-field-domain-kit
open-above-altitude-safety-domain-kit
open-above-terrain-sampler-domain-kit
open-above-world-generation-domain-kit
open-above-lake-generation-kit
open-above-tree-scatter-kit
open-above-cloud-scatter-kit
open-above-wind-ribbon-render-kit
open-above-basket-follow-camera-kit
open-above-camera-zoom-blend-kit
open-above-hud-mission-telemetry-kit
open-above-gamehost-debug-kit
open-above-static-marker-smoke-kit
```

## Next cutover kit inventory

```txt
open-above-product-copy-drift-audit-kit
open-above-balloon-drift-config-kit
open-above-balloon-drift-config-smoke-kit
open-above-balloon-source-fingerprint-kit
open-above-balloon-source-snapshot-kit
open-above-altitude-band-contract-kit
open-above-altitude-band-resolver-kit
open-above-wind-lane-hint-config-kit
open-above-route-source-authority-kit
open-above-route-object-config-kit
open-above-route-object-state-kit
open-above-route-object-evaluator-kit
open-above-route-order-policy-kit
open-above-route-event-contract-kit
open-above-route-event-result-envelope-kit
open-above-route-event-acceptance-policy-kit
open-above-route-event-rejection-reason-kit
open-above-route-event-journal-kit
open-above-route-state-reducer-kit
open-above-meadow-lift-mission-state-kit
open-above-meadow-lift-mission-reducer-kit
open-above-mission-snapshot-projector-kit
open-above-region-unlock-progression-kit
open-above-gamehost-route-diagnostics-kit
open-above-hud-route-mission-line-kit
open-above-route-fixture-contract-kit
open-above-route-fixture-harness-kit
open-above-route-fixture-snapshot-kit
open-above-route-replay-parity-kit
open-above-route-event-smoke-kit
open-above-balloon-behavior-smoke-kit
open-above-source-authority-readme-smoke-kit
open-above-product-doc-canonical-smoke-kit
open-above-mission-progression-replay-kit
```

## Immediate next product direction

Commit to:

```txt
TheOpenAbove Product Copy Authority + Balloon Drift Config Fixture Gate
```

Build order:

```txt
preserve the current static route, balloon visuals, burner / vent controls, basket-follow camera, HUD baseline, Nexus telemetry kit, and GameHost shape
  -> update README.md away from free-flight / bird-language toward hot-air-balloon drift language
  -> update package.json description to match the live product
  -> update docs/GAME_DESIGN.md, docs/TECHNICAL_ARCHITECTURE.md, docs/ROADMAP.md, and docs/MIGRATION_FROM_EXPERIMENT.md around balloon drift as canonical
  -> add BALLOON_DRIFT beside legacy FLIGHT in src/data/campaign.config.js
  -> move current inline drift constants from src/main.js into BALLOON_DRIFT with no visible behavior change
  -> keep FLIGHT as compatibility-only until a smoke gate proves no live dependency
  -> add ALTITUDE_BANDS for low-clearance, buoyancy-gate, high-drift, and meadow-landing states
  -> add ROUTE_OBJECTS for three buoyancy gates and meadow landing
  -> add WIND_LANE_HINTS for readable route guidance
  -> expose source fingerprints and source snapshots through GameHost diagnostics
  -> extend smoke so docs/config/runtime markers prove canonical balloon product authority
  -> add a small DOM-free route fixture harness stub
  -> defer full mission reducers and render/world/camera extraction until source authority smoke passes
```

## Next acceptance target

```txt
README/package/docs describe hot-air-balloon drift, burner, vent, route objects, altitude bands, buoyancy gates, meadow landing, and Cloud Basin unlock.
Legacy free-flight/bird wording is removed from active product docs or clearly marked historical.
src/data/campaign.config.js exports BALLOON_DRIFT, ALTITUDE_BANDS, ROUTE_OBJECTS, and WIND_LANE_HINTS.
src/main.js reads live drift constants from BALLOON_DRIFT with no visible behavior change.
window.GameHost.getState().local exposes sourceFingerprint, sourceSnapshot, routeDiagnostics, and routeFixtureStub.
tests/smoke.mjs proves product copy, config authority, drift config markers, active route markers, and no live bird-controller terms.
The current balloon visuals, burner/vent feel, camera, HUD, and Nexus telemetry stay stable.
Full route reducers, mission reducers, progression unlocks, host extraction, render extraction, world extraction, and camera extraction remain out of scope for this next slice.
```