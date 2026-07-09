# Project Breakdown — TheOpenAbove

**Timestamp:** `2026-07-09T17-58-53-04-00`

## Selection

`LuminaryLabs-Publish/TheOpenAbove` was selected after checking the current public `LuminaryLabs-Publish` repository list and excluding `TheCavalryOfRome`.

No checked non-Cavalry public repo was new, central-ledger absent, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented. `TheOpenAbove` was the oldest eligible documented fallback in the current public set.

## Interaction loop

```txt
index.html
  -> canvas, HUD, and error panel mount
  -> src/main.js imports Three.js CDN and NexusEngine main CDN
  -> CAMPAIGN/WORLD legacy config and hot-air-balloon object kit load
  -> terrain, lakes, trees, clouds, and wind ribbons are generated inline
  -> buildHotAirBalloon() composes envelope, mouth, streamers, seams, basket, burner, rigging, and rope sub-kits
  -> key handlers map Space/W/ArrowUp to burner lift
  -> key handlers map S/ArrowDown/Shift to vent descent
  -> wheel changes camera zoom and basket-view blend
  -> update(dt) integrates burner, vent, wind, buoyancy, vertical velocity, ceiling softness, ground clamp, position, altitude, and distance
  -> animateHotAirBalloon() updates burner and rigging
  -> Nexus telemetry kit publishes openAbove.balloonSnapshot and openAbove.balloonTicked
  -> draw(dt) resolves third-person/basket camera, first-person visibility, rope fade, ride bob, sway, and burner vibration
  -> renderer.render(scene, camera)
  -> HUD writes Balloon Drift telemetry
  -> window.GameHost.getState() exposes local and Nexus snapshots
```

## Domains in use

```txt
static-browser-shell
vite-static-publish
three-render-host
nexusengine-realtime-telemetry
campaign-config-legacy-source
world-config-legacy-source
flight-config-legacy-source
hot-air-balloon-object
balloon-envelope-panel
balloon-mouth
balloon-streamer-fit
balloon-fabric-seam
basket-object
burner-object
rigging-object
rope-object
terrain-height-sampling
terrain-coloring
moisture-map
lake-placement
tree-scatter
cloud-scatter
wind-ribbon-rendering
balloon-input-map
burner-vent-intent
wind-field
buoyancy-integration
altitude-safety
ceiling-softness
camera-zoom-blend
basket-first-person-camera
first-person-visibility
hud-telemetry
gamehost-debug-state
source-consumer-parity
browser-consumer-fixture
central-ledger-sync
```

## Services offered by kits and runtime domains

```txt
open-above-balloon-telemetry-kit:
  define openAbove.balloonSnapshot resource
  define openAbove.balloonTicked event
  publish current snapshot to NexusEngine world
  install engine.openAbove.getState()

open-above-hot-air-balloon-object-kit:
  compose balloon visual object from sub-kits
  expose object-kit id and subdomain metadata
  build envelope, basket, rigging, and burner assembly
  animate burner and rigging
  keep old vehicle attachment compatibility controls hidden

open-above-rope-kit:
  compute sagging tube points between endpoints
  build tube geometry and stripe markers
  update rope mesh over time for sway

inline runtime services:
  seeded deterministic world generation
  terrain height and color sampling
  moisture map and lake placement
  tree, cloud, and wind-ribbon scatter
  keyboard and wheel input consumption
  burner, vent, wind, buoyancy, and altitude integration
  camera blend, basket view, and first-person visibility
  HUD projection
  local GameHost snapshot readback
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

inline candidate:
  open-above-runtime-host-kit
  open-above-three-render-host-kit
  open-above-terrain-sampler-kit
  open-above-world-generation-kit
  open-above-wind-field-kit
  open-above-burner-vent-intent-kit
  open-above-balloon-drift-physics-kit
  open-above-altitude-safety-kit
  open-above-camera-zoom-blend-kit
  open-above-basket-camera-kit
  open-above-hud-telemetry-kit
  open-above-gamehost-debug-kit

next-cut:
  open-above-product-copy-authority-kit
  open-above-readme-route-copy-parity-kit
  open-above-package-description-parity-kit
  open-above-campaign-current-route-authority-kit
  open-above-legacy-flight-compatibility-kit
  open-above-balloon-drift-config-kit
  open-above-source-consumer-manifest-kit
  open-above-source-consumer-ledger-kit
  open-above-source-readback-projection-kit
  open-above-gamehost-source-readback-kit
  open-above-dom-free-source-fixture-kit
```

## Main finding

Do not start next with renderer extraction, terrain extraction, world-generation extraction, camera tuning, balloon visual retuning, or new route content.

The durable blocker is source/readback authority: `README.md`, `package.json`, and `src/data/campaign.config.js` still describe older free-flight goals, while `index.html`, `src/main.js`, `tests/smoke.mjs`, and the hot-air-balloon object kits define the live Balloon Drift route.

## Next safe ledge

```txt
TheOpenAbove Balloon Drift Source Readback Ledger + Browser Consumer Fixture Gate
```

## Validation

Docs-only pass. Runtime source was not changed. `npm run check`, `npm run build`, and browser validation were not run.
