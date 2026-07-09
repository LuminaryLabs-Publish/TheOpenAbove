# Project Breakdown — TheOpenAbove

**Timestamp:** `2026-07-09T00-30-24-04-00`

## Goal

Break down `LuminaryLabs-Publish/TheOpenAbove`, refresh repo-local `.agent` docs, and record the central ledger update in `LuminaryLabs-Dev/LuminaryLabs`.

## Checklist

- [x] Compared accessible `LuminaryLabs-Publish` repositories against central tracking.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo: `LuminaryLabs-Publish/TheOpenAbove`.
- [x] Identified the interaction loop.
- [x] Identified domains in use.
- [x] Identified services offered by current and needed kits.
- [x] Identified implemented, inline candidate, and next-cut kits.
- [x] Updated root `.agent` docs.
- [x] Added timestamped architecture audit.
- [x] Added timestamped render audit.
- [x] Added timestamped gameplay audit.
- [x] Added timestamped route-source audit.
- [x] Added timestamped deploy audit.
- [x] Added timestamped turn-ledger entry.
- [x] Updated `kit-registry.json`.
- [x] Prepared central ledger/change-log update.
- [ ] Runtime source was not changed.
- [ ] Local npm/build/browser validation was not run.

## Selection decision

```txt
LuminaryLabs-Publish/TheOpenAbove
```

No checked non-Cavalry Publish repo was new, central-ledger absent, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`TheOpenAbove` was selected because it had the oldest eligible sampled alignment among the checked non-excluded repos.

## Publish repository comparison

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / sampled alignment 2026-07-08T22-51-43-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / sampled alignment 2026-07-09T00-00-41-04-00
LuminaryLabs-Publish/TheOpenAbove         selected / oldest eligible sampled alignment 2026-07-08T22-19-38-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / sampled alignment 2026-07-08T22-58-02-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / sampled alignment 2026-07-09T00-09-22-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / sampled alignment 2026-07-08T23-40-55-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / sampled alignment 2026-07-08T22-38-17-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / sampled alignment 2026-07-09T00-20-08-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / sampled alignment 2026-07-08T23-19-33-04-00
```

## Product read

`TheOpenAbove` is currently a Vite / Three.js hot-air-balloon drift route with NexusEngine CDN telemetry.

The live browser route is Balloon Drift, but durable copy/config source still describes the older free-flight game.

## Interaction loop

```txt
open index.html
  -> canvas#game, #hud, and #error mount
  -> src/main.js imports Three.js CDN, NexusEngine main CDN, CAMPAIGN, WORLD, and hot-air-balloon object kit
  -> terrain, lakes, trees, clouds, wind ribbons, and balloon visual object are created
  -> keyboard input maps Space / W / ArrowUp to burner lift
  -> keyboard input maps S / ArrowDown / Shift to vent descent
  -> wheel input changes camera zoom and near-basket blend
  -> update(dt) integrates burner, vent, wind, buoyancy, altitude safety, velocity, position, and drift distance
  -> animateHotAirBalloon updates burner and rigging sub-kits
  -> Nexus telemetry kit publishes balloon snapshot/resource and balloon tick event
  -> draw(dt) resolves third-person/basket camera and first-person visibility
  -> Three.js renders scene/camera
  -> HUD writes altitude, wind, distance, heat, camera mode, and Nexus marker
  -> window.GameHost.getState() exposes local and Nexus balloon telemetry
```

## Domains in use

```txt
host:
  static-page-host, vite-static-publish-host, third-party-cdn-runtime, browser-window-event-host, window-gamehost-debug

render:
  three-render-host, terrain-mesh-domain, lake-disc-domain, tree-scatter-domain, cloud-scatter-domain, wind-ribbon-domain, sky-fog-lighting-domain

balloon object:
  hot-air-balloon-object-domain, envelope-panel-domain, mouth-domain, streamer-fit-domain, fabric-seam-domain, basket-domain, rigging-domain, burner-domain, rope-domain

simulation:
  balloon-input-domain, burner-vent-intent-domain, wind-field-domain, buoyancy-domain, altitude-safety-domain, ceiling-softness-domain, terrain-clearance-domain, drift-distance-domain

camera / HUD:
  basket-follow-camera-domain, first-person-blend-domain, first-person-visibility-domain, rope-fade-domain, ride-motion-domain, burner-vibration-domain, hud-telemetry-domain

source authority next:
  product-copy-domain, package-description-domain, campaign-current-route-domain, legacy-flight-compatibility-domain, balloon-drift-config-domain, source-manifest-domain, source-fingerprint-domain, source-snapshot-domain, source-acceptance-domain, gamehost-source-readback-domain, dom-free-source-fixture-domain, browser-consumer-readback-domain
```

## Services that kits offer

```txt
current services:
  define balloon telemetry resource, emit balloon tick event, expose engine.openAbove.getState, build procedural hot-air-balloon object, build envelope panels, build mouth, fit streamers, build seams, build basket/interior, build rigging/ropes, build burner, animate burner, animate rigging, expose object-kit global

inline runtime services:
  mount canvas/HUD/error panel, seed random, sample terrain height, sample moisture, resolve terrain color, create renderer/camera/scene, build terrain/lakes/trees/clouds/wind ribbons, install input handlers, smooth burner/vent, sample wind, integrate velocity/position/altitude/distance, compute basket camera, blend first-person view, fade ropes, render frame, write HUD, expose GameHost

needed next services:
  load product source, load drift config, load altitude bands, load route descriptors, load wind lane hints, create source manifest, create source fingerprint, create source snapshot, create acceptance results, create acceptance ledger, create GameHost source readback, splice source readback additively into main runtime, run DOM-free source fixture, run browser consumer readback row, wire source fixture into npm check
```

## Kits identified

```txt
implemented:
  open-above-balloon-telemetry-kit
  open-above-hot-air-balloon-object-kit
  open-above-balloon-envelope-panel-kit
  open-above-balloon-mouth-kit
  open-above-balloon-streamer-fit-kit
  open-above-balloon-fabric-seam-kit
  open-above-hot-air-balloon-basket-kit
  open-above-hot-air-balloon-rigging-kit
  open-above-hot-air-balloon-burner-kit
  open-above-rope-kit

inline / candidate:
  open-above-runtime-host-kit
  open-above-vite-static-publish-kit
  open-above-three-render-host-kit
  open-above-campaign-config-kit
  open-above-legacy-flight-compatibility-kit
  open-above-balloon-input-map-kit
  open-above-balloon-state-kit
  open-above-balloon-drift-physics-kit
  open-above-burner-vent-intent-kit
  open-above-wind-field-kit
  open-above-altitude-safety-kit
  open-above-ceiling-softness-kit
  open-above-terrain-sampler-kit
  open-above-world-generation-kit
  open-above-lake-generation-kit
  open-above-tree-scatter-kit
  open-above-cloud-scatter-kit
  open-above-wind-ribbon-render-kit
  open-above-basket-follow-camera-kit
  open-above-camera-zoom-blend-kit
  open-above-first-person-visibility-kit
  open-above-hud-telemetry-kit
  open-above-gamehost-debug-kit

next-cut:
  open-above-product-copy-authority-kit
  open-above-readme-route-copy-parity-kit
  open-above-package-description-parity-kit
  open-above-campaign-current-route-authority-kit
  open-above-balloon-drift-config-kit
  open-above-source-manifest-kit
  open-above-balloon-source-fingerprint-kit
  open-above-balloon-source-snapshot-kit
  open-above-source-acceptance-result-kit
  open-above-source-acceptance-ledger-kit
  open-above-gamehost-source-readback-kit
  open-above-source-module-consumer-splice-kit
  open-above-runtime-constant-parity-kit
  open-above-altitude-band-contract-kit
  open-above-route-object-config-kit
  open-above-wind-lane-hint-kit
  open-above-dom-free-source-fixture-kit
  open-above-browser-consumer-readback-kit
  open-above-deploy-build-contract-kit
```

## Main finding

The next implementation should not tune the renderer, physics, camera, or world. The live route already behaves as Balloon Drift.

The blocker is source authority: README/package/campaign/config, runtime constants, GameHost source readback, browser consumer fixture rows, and `npm run check` are not yet aligned around the current balloon route.

## Files updated in this repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-09T00-30-24-04-00-source-module-consumer-splice-dsk-map.md
.agent/render-audit/2026-07-09T00-30-24-04-00-gamehost-source-consumer-readback-map.md
.agent/gameplay-audit/2026-07-09T00-30-24-04-00-balloon-drift-config-authority-loop.md
.agent/route-source-audit/2026-07-09T00-30-24-04-00-browser-consumer-fixture-matrix.md
.agent/deploy-audit/2026-07-09T00-30-24-04-00-source-fixture-check-gate.md
.agent/trackers/2026-07-09T00-30-24-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T00-30-24-04-00.md
```

## Next safe ledge

```txt
TheOpenAbove Source Module Consumer Splice + Browser Readback Fixture Gate
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
local npm install: no
local npm run check: no
local npm run build: no
browser smoke: no
pushed to main: yes
```
