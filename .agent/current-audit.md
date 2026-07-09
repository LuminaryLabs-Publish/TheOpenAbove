# Current Audit — TheOpenAbove

**Timestamp:** `2026-07-09T00-30-24-04-00`

## Summary

`TheOpenAbove` is a hot-air-balloon drift route whose browser runtime is clearer than its durable source authority.

The live app already exposes burner/vent input, balloon drift physics, basket camera blend, HUD telemetry, NexusEngine telemetry, and `window.GameHost.getState()`, but README/package/campaign source still describes the older free-flight route and no source readback fixture proves product/config/runtime parity.

This pass keeps the next cut narrow: source module consumer splice, GameHost `.source` readback, DOM-free fixture rows, and `npm run check` integration before renderer extraction, route progression, world expansion, or reusable kit promotion.

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
open app
  -> read Balloon Drift HUD
  -> hold Space / W / ArrowUp for burner lift
  -> hold S / ArrowDown / Shift for vent descent
  -> procedural wind drifts the balloon
  -> wheel changes camera zoom and near-basket blend
  -> runtime updates altitude, wind, distance, heat, camera mode, Nexus telemetry, and GameHost state
```

## Repo-list / ledger comparison

```txt
checked LuminaryLabs-Publish repos:
  AetherVale
  HorrorCorridor
  IntoTheMeadow
  MyCozyIsland
  PhantomCommand
  PrehistoricRush
  TheCavalryOfRome
  TheOpenAbove
  TheUnmappedHouse
  ZombieOrchard

central ledger / root-agent check:
  non-Cavalry repos are represented in repo-ledger/LuminaryLabs-Publish/
  sampled root .agent/START_HERE.md state exists for checked non-Cavalry repos
  TheCavalryOfRome remains excluded

selection:
  TheOpenAbove selected as the oldest eligible current sampled alignment among checked non-excluded repos
```

## Evidence snapshot

```txt
README.md:
  still says free-flight exploration, carving, gliding, diving, boosting, thermals, wind gates, and sky-perch return.

package.json:
  still says standalone free-flight exploration.

src/data/campaign.config.js:
  exports CAMPAIGN/WORLD plus legacy FLIGHT values for pitch, roll, yaw, boost, thermals, gates, perch, and terrain clearance.

src/main.js:
  imports CAMPAIGN and WORLD, seeds `${WORLD.seed}-balloon-drift`, builds balloon objects, and owns burner, vent, wind, buoyancy, altitude, camera, HUD, and GameHost snapshots inline.

src/hot-air-balloon-object-kit.js:
  composes envelope, mouth, streamers, seams, basket, rigging, burner, and rope sub-kits into the live balloon visual object.

tests/smoke.mjs:
  validates route markers, basket experience markers, object-kit markers, rope/rigging/envelope markers, and Vite base, but not source readback or product/config/runtime parity.
```

## Domains in use

```txt
runtime / host:
  static-page-host, vite-static-publish-host, third-party-cdn-runtime, three-render-host, nexus-engine-cdn-runtime, nexus-telemetry-kit, window-gamehost-debug, source-consumer-readback

object / visual:
  hot-air-balloon-object, balloon-envelope-panel, balloon-mouth, balloon-streamer-fit, balloon-fabric-seam, balloon-basket, balloon-rigging, balloon-burner, rope-geometry

world / render:
  procedural-terrain, terrain-height-sampler, moisture-field, terrain-color-resolver, lake-generation, tree-scatter, cloud-scatter, wind-ribbon-rendering

input / movement:
  balloon-input-map, burner-vent-intent, balloon-vehicle-state, balloon-drift-physics, wind-field, altitude-safety, ceiling-softness, camera-zoom-blend

camera / HUD:
  basket-follow-camera, first-person-visibility-gate, rope-fade, ride-bob, ride-sway, burner-vibration, hud-telemetry

source authority:
  campaign-config, legacy-flight-compatibility, product-copy-authority, package-description-parity, readme-route-copy-parity, campaign-current-route-authority, balloon-drift-config-authority, source-manifest-authority, source-fingerprint, source-snapshot, source-acceptance-ledger, runtime-constant-parity, altitude-band-contract, route-object-descriptor, wind-lane-hint, browser-consumer-fixture, build-script-fixture-gate
```

## Services in use

```txt
current:
  mount-canvas, mount-hud, mount-error-panel, show-fatal-runtime-error, seed-random, sample-terrain-height, sample-moisture, resolve-terrain-color, create-scene, create-camera, create-renderer, install-resize-handler, install-keyboard-input-handler, install-wheel-zoom-handler, build-terrain-geometry, build-lake-discs, scatter-trees, build-cloud-groups, build-wind-ribbon-lines, build-hot-air-balloon, animate-hot-air-balloon, smooth-burner-value, smooth-vent-value, sample-wind-angle, sample-wind-speed, write-wind-vector, compute-buoyancy, compute-altitude-damping, compute-ceiling-softness, integrate-vertical-velocity, blend-velocity-toward-wind, integrate-position, clamp-above-terrain-clearance, compute-altitude, accumulate-horizontal-distance, compute-basket-focus, compute-third-person-camera-position, compute-first-person-camera-position, blend-camera-mode, set-first-person-visibility, render-frame, write-hud-html, define-balloon-telemetry-resource, emit-balloon-ticked-event, expose-window-gamehost

needed next:
  load-open-above-product, load-balloon-drift-config, load-altitude-bands, load-route-descriptors, load-wind-lane-hints, load-source-manifest, create-source-fingerprint, create-source-snapshot, run-source-acceptance-row, append-source-acceptance-ledger-entry, create-gamehost-source-readback, splice-source-records-into-main-runtime, preserve-existing-gamehost-local-and-nexus-shapes, run-dom-free-source-fixture, run-browser-consumer-readback-row, wire-source-fixture-into-check
```

## Kits identified

Implemented / source-backed:

```txt
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
```

Inline / candidate:

```txt
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
```

Needed next:

```txt
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

The next implementation should not be a renderer rewrite, camera retune, world expansion, or mission progression pass.

The highest-value next cut is an additive source module consumer splice. It should source-own the Balloon Drift product/config, prove README/package/campaign/runtime agreement, expose `window.GameHost.getState().source`, and add a DOM-free fixture plus browser consumer readback rows while preserving the current `local` and `nexusEngine` host shapes.

## New audit surfaces added

```txt
.agent/architecture-audit/2026-07-09T00-30-24-04-00-source-module-consumer-splice-dsk-map.md
.agent/render-audit/2026-07-09T00-30-24-04-00-gamehost-source-consumer-readback-map.md
.agent/gameplay-audit/2026-07-09T00-30-24-04-00-balloon-drift-config-authority-loop.md
.agent/route-source-audit/2026-07-09T00-30-24-04-00-browser-consumer-fixture-matrix.md
.agent/deploy-audit/2026-07-09T00-30-24-04-00-source-fixture-check-gate.md
```

## Next safe ledge

```txt
TheOpenAbove Source Module Consumer Splice + Browser Readback Fixture Gate
```
