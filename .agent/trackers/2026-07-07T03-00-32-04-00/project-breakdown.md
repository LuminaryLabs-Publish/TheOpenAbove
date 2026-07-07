# Project Breakdown: The Open Above

**Run timestamp:** `2026-07-07T03:00:32-04:00`

**Repo:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch target:** `main`

## Selection reason

Accessible `LuminaryLabs-Publish` repos observed during this pass:

```txt
LuminaryLabs-Publish/HorrorCorridor
LuminaryLabs-Publish/AetherVale
LuminaryLabs-Publish/TheOpenAbove
LuminaryLabs-Publish/TheCavalryOfRome
LuminaryLabs-Publish/PhantomCommand
LuminaryLabs-Publish/PrehistoricRush
LuminaryLabs-Publish/ZombieOrchard
LuminaryLabs-Publish/IntoTheMeadow
```

`TheCavalryOfRome` is excluded by instruction. Existing central logs already showed breakdown coverage for `HorrorCorridor`, `AetherVale`, and `ZombieOrchard`. `TheOpenAbove` was selected as the next eligible Publish repo in the observed organization order that did not yet have this breakdown coverage.

## Current repo read

The README describes `The Open Above` as a free-flight exploration game about carving, gliding, diving, boosting, and discovering a living sky-world, with the first milestone named `Meadow Lift`.

The current live page and runtime have shifted from that bird-flight framing into a cozy hot-air-balloon drift slice:

```txt
index.html
  -> canvas host and HUD for The Open Above: Balloon Drift

src/main.js
  -> Three.js scene
  -> procedural terrain, lakes, trees, clouds, wind ribbons
  -> hot-air-balloon object
  -> burner / vent / wind drift simulation
  -> camera follow around basket focus
  -> Nexus Engine telemetry kit
  -> GameHost debug surface

src/data/campaign.config.js
  -> campaign, region, world, and older flight tuning data

src/hot-air-balloon-*.js
  -> object, envelope, basket, rigging, burner visual kits

src/rope-kit.js
  -> soft rope line kit

tests/smoke.mjs
  -> static smoke coverage for required files and balloon runtime markers
```

## Interaction loop

### Current implemented loop

```txt
load page
  -> initialize Three.js scene
  -> spawn balloon above procedural valley
  -> drift with changing wind
  -> hold Space / W / ArrowUp for burner lift
  -> hold S / ArrowDown / Shift for vent descent
  -> avoid terrain by altitude floor clamp
  -> observe altitude, wind speed, burner state, drift distance in HUD
  -> scroll camera zoom
  -> expose telemetry through Nexus Engine GameHost
```

### Intended product loop from docs

```txt
launch from perch
  -> read sky route
  -> carve through wind gates
  -> catch thermals
  -> return to high perch
  -> unlock next region
  -> repeat with harder weather / geography
```

### Current gap

The repo now has a working balloon-drift toy loop, but the docs and config still describe a bird-flight loop. The next product pass should either restore bird flight or formally rename the design direction to balloon drift and rebuild the mission loop around wind reading, burner timing, altitude control, landing/perch docking, weather windows, and route contracts.

## Domains in use

| Domain | Current implementation | Notes |
|---|---|---|
| Runtime host | `index.html`, `src/main.js`, `window.GameHost` | Browser/Vite host with debug surface. |
| Nexus telemetry | `open-above-balloon-telemetry-kit` inside `src/main.js` | Publishes balloon snapshot resource and tick event. |
| Vehicle state | `state.position`, `state.velocity`, `state.wind`, `state.burner`, `state.vent`, `state.altitude` | Monolithic inside `createGame()`. |
| Balloon drift physics | Burner, vent, buoyancy, wind lerp, altitude clamp | Needs extraction into domain kit. |
| Wind field | Time-varying angle/speed and wind ribbons | Needs deterministic service boundary. |
| Terrain/world generation | `terrainHeight`, `moistureAt`, terrain color, lakes, trees, clouds | Currently procedural functions inside renderer module. |
| Campaign/region config | `CAMPAIGN`, `WORLD`, `FLIGHT` | Good data boundary, but `FLIGHT` is stale bird-flight tuning. |
| Visual object kit | Balloon object, envelope, basket, rigging, burner, rope | Strongest existing kit boundary. |
| Camera | Basket focus, wind-relative follow, scroll zoom | Needs camera-follow kit. |
| HUD / diagnostics | HUD innerHTML and GameHost state | Needs telemetry/status presentation boundary. |
| QA smoke | `tests/smoke.mjs` | Good static guard; needs behavior-level tests. |

## Services the current kits offer

| Kit / module | Services offered |
|---|---|
| `open-above-balloon-telemetry-kit` | Defines a `BalloonSnapshot` resource, emits `BalloonTicked`, publishes altitude/wind/burner telemetry, exposes `engine.openAbove.getState()`. |
| `open-above-hot-air-balloon-object-kit` | Composes the balloon from envelope, basket, rigging, burner, and rope sub-kits; exposes build/animate/install services; preserves compatibility with older vehicle attachment assumptions. |
| `open-above-hot-air-balloon-envelope-kit` | Builds the balloon envelope, gore stripes, and throat/skirt visual. |
| `open-above-hot-air-balloon-basket-kit` | Builds basket body and trim geometry. |
| `open-above-hot-air-balloon-rigging-kit` | Builds rope anchors between envelope and basket; animates rigging sway through the rope kit. |
| `open-above-hot-air-balloon-burner-kit` | Builds burner, flame, glow light; animates burner pulse. |
| `open-above-rope-kit` | Builds/update soft sagging rope line segments between two points. |
| `tests/smoke.mjs` | Validates required files and key runtime markers for the balloon drift conversion. |

## Full kit inventory

### Current explicit kits

```txt
open-above-balloon-telemetry-kit
open-above-hot-air-balloon-object-kit
open-above-hot-air-balloon-envelope-kit
open-above-hot-air-balloon-basket-kit
open-above-hot-air-balloon-rigging-kit
open-above-hot-air-balloon-burner-kit
open-above-rope-kit
```

### Candidate domain kits to extract next

```txt
open-above-balloon-drift-physics-domain-kit
open-above-wind-field-domain-kit
open-above-altitude-safety-domain-kit
open-above-terrain-sampler-domain-kit
open-above-world-generation-domain-kit
open-above-waterbody-visual-kit
open-above-tree-scatter-visual-kit
open-above-cloudfield-visual-kit
open-above-wind-ribbon-visual-kit
open-above-basket-follow-camera-kit
open-above-balloon-input-map-kit
open-above-meadow-lift-objective-kit
open-above-region-unlock-progression-kit
open-above-save-state-kit
open-above-hud-telemetry-kit
open-above-gamehost-debug-kit
open-above-balloon-smoke-test-kit
```

## Architecture strengths

- The playable slice is small and understandable.
- The balloon visual kit is already modular enough to become reusable across other scenes.
- The runtime already connects to Nexus Engine through a telemetry domain-service-kit.
- The `GameHost` contract gives review/automation a simple read surface.
- Static smoke tests already protect the balloon conversion from regressing into old bird-specific markers.

## Architecture gaps

- `src/main.js` owns too many domains: terrain, wind, physics, input, camera, HUD, renderer, and engine wiring.
- `docs/GAME_DESIGN.md`, `docs/TECHNICAL_ARCHITECTURE.md`, and `docs/ROADMAP.md` still describe bird flight, while the live runtime is balloon drift.
- `CAMPAIGN.regions[0].objectives` still uses thermal/gate objectives that are not implemented in the balloon loop.
- `FLIGHT` config is bird-flight tuning and is not consumed by the current balloon runtime.
- The wind field has no authored route objects, hazards, goals, weather states, or progression records.
- The camera and HUD are embedded directly in the render loop.
- Existing tests are useful static checks, but they do not simulate burner/vent/wind behavior or assert state transitions.

## Recommended next work

### Best next vertical slice

```txt
Balloon Drift Mission Slice:
  wind lanes + altitude bands + 3 buoyancy gates + return/landing zone + completion record
```

This fits the current runtime better than forcing the old bird-flight loop back into the code.

### Implementation checklist

- [ ] Decide product identity: keep balloon drift or restore bird flight.
- [ ] If balloon drift wins, update README and docs to remove stale bird/carve/dive language.
- [ ] Rename `FLIGHT` config to `BALLOON_DRIFT` or create a separate balloon config block.
- [ ] Extract drift math into `src/domains/balloon-drift/balloon-drift-domain-kit.js`.
- [ ] Extract wind angle/speed into `src/domains/wind-field/wind-field-domain-kit.js`.
- [ ] Extract terrain/moisture functions into `src/domains/world/terrain-sampler-domain-kit.js`.
- [ ] Add route objects: buoyancy gates, safe altitude lanes, return landing zone.
- [ ] Add mission objective resolution for drift distance, altitude windows, and return zone.
- [ ] Add local progression record for `meadow-lift-complete` and `cloud-basin-unlocked`.
- [ ] Add deterministic smoke tests for burner lift, vent descent, wind drift, ground clamp, and mission completion.
- [ ] Keep visual kits separate from physics/domain state.

## Suggested domain architecture

```txt
src/domains/
  runtime-host/
    gamehost-debug-kit.js
  balloon-drift/
    balloon-drift-domain-kit.js
    balloon-input-map-kit.js
    altitude-safety-domain-kit.js
  wind-field/
    wind-field-domain-kit.js
    wind-lane-route-kit.js
  meadow-lift/
    meadow-lift-objective-kit.js
    region-unlock-progression-kit.js
  world/
    terrain-sampler-domain-kit.js
    world-generation-domain-kit.js
  camera/
    basket-follow-camera-kit.js
  hud/
    hud-telemetry-kit.js

src/visual-kits/
  hot-air-balloon-object-kit.js
  hot-air-balloon-envelope-kit.js
  hot-air-balloon-basket-kit.js
  hot-air-balloon-rigging-kit.js
  hot-air-balloon-burner-kit.js
  rope-kit.js
  cloudfield-visual-kit.js
  wind-ribbon-visual-kit.js
  tree-scatter-visual-kit.js
```

## Validation notes

No local build was run during this connector-based documentation pass. Inspection was grounded in repository files including `README.md`, `index.html`, `package.json`, `src/main.js`, campaign config, hot-air-balloon visual kit files, rope kit, smoke test, and current docs.

## Push scope

This run added only documentation under root `.agent` for `LuminaryLabs-Publish/TheOpenAbove` and a mirrored central ledger/change-log in `LuminaryLabs-Dev/LuminaryLabs`.
