# Project Breakdown: The Open Above

**Run timestamp:** `2026-07-07T04:08:29-04:00`

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

`LuminaryLabs-Publish/TheCavalryOfRome` was excluded by standing rule.

`LuminaryLabs-Publish/TheOpenAbove` was selected because the central `LuminaryLabs-Dev/LuminaryLabs` ledger showed it as the oldest eligible canonical Publish repo entry in the current tracked set. The previous pass identified the balloon-drift direction and recommended a product-direction cleanup plus formal kit extraction. This pass materializes that recommendation as a repo-local `.agent/kit-registry.json` and a sharper follow-up plan.

## Current repo read

`TheOpenAbove` is still publicly described in `README.md` and design docs as a bird/free-flight exploration game about carving, gliding, diving, boosting, thermals, and wind gates. The live runtime, however, is now a hot-air-balloon drift slice.

Current implemented runtime shape:

```txt
index.html
  -> browser canvas and HUD for The Open Above: Balloon Drift

src/main.js
  -> imports Three.js and NexusEngine
  -> imports campaign/world config
  -> imports hot-air-balloon object kit
  -> builds procedural terrain, lakes, trees, clouds, and wind ribbons
  -> owns monolithic balloon state, wind, input, drift physics, camera, HUD, and GameHost
  -> defines open-above-balloon-telemetry-kit inside the runtime
  -> exposes window.GameHost.getState()

src/hot-air-balloon-object-kit.js
  -> composes envelope, basket, rigging, burner, and rope kits
  -> exposes build, animate, and install services

src/data/campaign.config.js
  -> keeps campaign, region, world, and stale bird-flight FLIGHT tuning

tests/smoke.mjs
  -> static contract for required files, balloon markers, camera focus, Nexus telemetry, and absence of old bird markers
```

The correct product direction should now be treated as: **cozy balloon traversal / wind-reading exploration**, unless future work explicitly reverts the runtime back to a bird controller.

## Interaction loop

### Current implemented loop

```txt
load page
  -> initialize Three.js scene and renderer
  -> create procedural valley terrain, lakes, tree scatter, cloudfield, and wind ribbons
  -> spawn procedural hot-air balloon at valley altitude
  -> drift with a time-varying wind vector
  -> hold Space, W, or ArrowUp to increase burner lift
  -> hold S, ArrowDown, or Shift to vent and descend
  -> clamp above terrain floor for safety
  -> follow basket-relative camera focus with scroll zoom
  -> display HUD telemetry for altitude, wind, drift distance, and burner state
  -> publish balloon snapshot through Nexus Engine telemetry kit
  -> expose local and Nexus state through GameHost
```

### Intended product loop after cleanup

```txt
start Meadow Lift as balloon pilot
  -> read visible wind lanes and altitude bands
  -> use burner and vent to enter the correct air layer
  -> pass through 3 buoyancy gates
  -> drift across valley landmarks without terrain contact
  -> find the return or landing zone
  -> complete the route contract
  -> record meadow-lift-complete
  -> unlock Cloud Basin
```

### Mismatch to resolve

The stale bird/free-flight language is still useful as inspiration for traversal, but it should not be the active implementation contract unless the code is reverted. The fastest path is to rename the milestone from bird `Meadow Lift` to balloon `Meadow Lift: Drift Route`, replace stale `FLIGHT` tuning with `BALLOON_DRIFT`, and formalize balloon mission objectives.

## Domains in use

| Domain | Current implementation | Notes |
|---|---|---|
| Runtime host | `index.html`, `src/main.js` | Browser/Vite app shell. |
| Nexus telemetry | `open-above-balloon-telemetry-kit` in `src/main.js` | Runtime DSK publishes snapshot resources and tick events. |
| Balloon vehicle state | `state.position`, `state.velocity`, `state.wind`, `state.verticalVelocity`, `state.burner`, `state.vent`, `state.altitude` | Monolithic inside `createGame()`. |
| Input map | Key set in `src/main.js` | Maps burner and vent controls. Needs extraction. |
| Balloon drift physics | Buoyancy, vertical damping, ceiling softness, wind velocity lerp, ground clamp | Core domain candidate. |
| Wind field | Time-varying wind angle and wind speed | Needs deterministic seed/state contract and route authoring. |
| Terrain sampler | `terrainHeight`, `moistureAt`, `terrainColor` | Should move out of renderer host. |
| World generation | terrain mesh, lakes, trees, clouds, wind ribbons | Visual generation and sampler should be separated. |
| Campaign config | `CAMPAIGN`, `WORLD`, `FLIGHT` | Region data exists, but `FLIGHT` is stale bird tuning. |
| Balloon visual object | hot-air-balloon object kit and sub-kits | Strong existing object-kit boundary. |
| Camera follow | basket focus, wind-relative offset, scroll zoom | Should become a basket-follow camera kit. |
| HUD diagnostics | HUD innerHTML | Should be a small telemetry presenter. |
| GameHost debug | `window.GameHost` | Strong automation surface, needs contract file. |
| Static validation | `tests/smoke.mjs` | Static smoke is good, behavior smoke is missing. |

## Services that current kits offer

| Kit / module | Services offered |
|---|---|
| `open-above-balloon-telemetry-kit` | Defines `openAbove.balloonSnapshot`, emits `openAbove.balloonTicked`, publishes altitude/wind/burner telemetry, exposes `engine.openAbove.getState()`. |
| `open-above-hot-air-balloon-object-kit` | Builds the composite balloon object, stores part references, animates burner/rigging, installs into an older vehicle host when available, exposes global kit helpers. |
| `open-above-hot-air-balloon-envelope-kit` | Builds the envelope mesh, gore stripes, skirt ring, and envelope profile. |
| `open-above-hot-air-balloon-basket-kit` | Builds basket body, trim rails, and basket profile. |
| `open-above-hot-air-balloon-rigging-kit` | Builds rigging ropes between envelope anchors and basket anchors, stores connection metadata, animates rope sway. |
| `open-above-hot-air-balloon-burner-kit` | Builds burner frame, flame cone, glow light, and animates flame/glow pulse. |
| `open-above-rope-kit` | Builds and updates sagging soft rope line geometry with segment, sag, sway, and phase controls. |
| `tests/smoke.mjs` | Validates required files, balloon runtime markers, Nexus telemetry markers, visual kit IDs, camera focus markers, and old bird marker removal. |

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
open-above-balloon-input-map-kit
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
open-above-meadow-lift-balloon-objective-kit
open-above-region-unlock-progression-kit
open-above-hud-telemetry-kit
open-above-gamehost-debug-kit
open-above-balloon-behavior-smoke-kit
```

## Architecture strengths

- The live runtime already has a coherent vehicle fantasy: burner lift, vent descent, wind drift, altitude, and terrain safety.
- The balloon object is composed bottom-up from smaller visual kits.
- The existing telemetry kit proves the repo can use Nexus Engine Realtime Core without a large rewrite.
- `GameHost.getState()` gives automation a stable read surface.
- The smoke test already guards against regressing to old bird runtime names.
- The world has enough terrain, water, tree, cloud, and wind-ribbon primitives to support a first mission.

## Architecture gaps

- `src/main.js` is still a monolith that owns too many domains.
- Public docs and config still say bird/free-flight while the runtime says balloon drift.
- `CAMPAIGN.regions[0].objectives` is thermal/gate-oriented and not implemented by the current balloon loop.
- `FLIGHT` tuning is stale and should be replaced or moved behind a legacy marker.
- There are no route objects, altitude bands, wind lanes, buoyancy gates, landing zones, or completion records yet.
- Static smoke tests do not simulate burner/vent/wind/mission behavior.
- Visual generation and physics/sampling logic are coupled inside the render host.

## Recommended next work

### Best next vertical slice

```txt
TheOpenAbove Balloon Drift Mission Cutover
```

Build a mission loop without disrupting the existing visual runtime:

```txt
boot scene
  -> load BALLOON_DRIFT config
  -> install input, drift physics, wind field, terrain sampler, objective, camera, HUD, telemetry, and GameHost kits
  -> spawn three buoyancy gates along a wind-lane path
  -> detect altitude-band entry and gate pass-through
  -> detect return / landing zone
  -> write meadow-lift-complete and cloud-basin-unlocked to local state
  -> expose mission status through GameHost
  -> add behavior smoke for burner lift, vent descent, wind drift, ground clamp, gate completion, and unlock
```

### Implementation checklist

- [ ] Commit to balloon drift as the current product direction in README and docs.
- [ ] Rename or replace `FLIGHT` with `BALLOON_DRIFT` in `src/data/campaign.config.js`.
- [ ] Add a `mission` block to the Meadow Lift region with buoyancy gates, altitude bands, landing zone, and completion state.
- [ ] Extract input mapping into `open-above-balloon-input-map-kit`.
- [ ] Extract buoyancy/wind/ground-clamp math into `open-above-balloon-drift-physics-domain-kit` and `open-above-altitude-safety-domain-kit`.
- [ ] Extract wind angle/speed into `open-above-wind-field-domain-kit`.
- [ ] Extract `terrainHeight` and `moistureAt` into `open-above-terrain-sampler-domain-kit`.
- [ ] Extract water, tree, cloud, and wind-ribbon creation into visual kits.
- [ ] Add `open-above-meadow-lift-balloon-objective-kit` for route progress and completion.
- [ ] Add `open-above-region-unlock-progression-kit` for Cloud Basin unlock state.
- [ ] Keep the existing hot-air-balloon object kit and sub-kits as renderer-facing visual kits.
- [ ] Add behavior-level smoke tests and preserve current static smoke tests.

## New tracker artifact from this pass

This pass adds `.agent/kit-registry.json`, which records explicit kits, candidate extraction kits, provided services, required consumers, blockers, and the recommended mission cutover.

## Validation notes

No local build was run during this connector-based documentation pass. Inspection was grounded in repository files including `README.md`, `package.json`, `src/main.js`, `src/data/campaign.config.js`, hot-air-balloon visual kits, `src/rope-kit.js`, `tests/smoke.mjs`, prior `.agent` docs, and current central ledger state.

## Push scope

This run updates only internal documentation and agent tracking:

```txt
.agent/trackers/2026-07-07T04-08-29-04-00/project-breakdown.md
.agent/kit-registry.json
.agent/README.md
```

The central mirror is updated in `LuminaryLabs-Dev/LuminaryLabs` under `repo-ledger` and `internal-change-log`.
