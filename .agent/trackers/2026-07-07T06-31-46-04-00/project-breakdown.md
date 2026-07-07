# TheOpenAbove Project Breakdown

**Run timestamp:** `2026-07-07T06:31:46-04:00`  
**Repo:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch target:** `main`  
**Central tracker repo:** `LuminaryLabs-Dev/LuminaryLabs`  
**Status:** follow-up breakdown, config parity and objective-state cutover planning

## Selection

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`LuminaryLabs-Publish/TheOpenAbove` was selected because the central tracker most recently updated `AetherVale` at `2026-07-07T06-20-17-04-00`, while `TheOpenAbove` still pointed at `2026-07-07T05:21:11-04:00`. That makes `TheOpenAbove` the oldest eligible repo in the current tracked rotation.

Observed accessible publish repos for this pass:

```txt
HorrorCorridor
AetherVale
TheOpenAbove
TheCavalryOfRome       excluded
PhantomCommand
PrehistoricRush
ZombieOrchard
IntoTheMeadow
```

## Current read

`TheOpenAbove` is a standalone Vite/Three.js publish repo. The browser host is already titled and described as `The Open Above: Balloon Drift`, but `README.md`, package description text, and `src/data/campaign.config.js` still contain free-flight / bird-flight product language.

Current runtime path:

```txt
index.html
  -> src/main.js
  -> Three.js renderer
  -> Nexus Engine telemetry DSK
  -> procedural terrain / lakes / trees / clouds / wind ribbons
  -> hot-air-balloon visual object kit
  -> burner / vent / wind drift simulation
  -> basket-relative camera
  -> HUD telemetry
  -> window.GameHost.getState()
```

The strongest repo-local boundary remains the hot-air-balloon object-kit family. The weakest boundary is still `src/main.js`, because it owns host setup, world generation, input, drift physics, altitude safety, camera follow, HUD, telemetry installation, and GameHost diagnostics.

## Interaction loop

### Current implemented loop

```txt
load page
  -> mount canvas and HUD
  -> initialize Three.js scene, camera, renderer, lights, fog, and frame loop
  -> build terrain, lakes, trees, clouds, and wind ribbons
  -> spawn the procedural hot-air-balloon object
  -> hold Space / W / ArrowUp to increase burner heat
  -> hold S / ArrowDown / Shift to vent downward
  -> sample time-varying wind angle and speed
  -> integrate buoyancy, damping, wind velocity, position, and altitude
  -> clamp balloon above terrain clearance
  -> animate burner, rigging, ropes, and object sway
  -> follow basket-relative camera focus
  -> render HUD altitude, wind, burner state, and drift distance
  -> publish balloon snapshot through Nexus Engine
  -> expose local and Nexus state through GameHost
```

### Target product loop

```txt
start Meadow Lift as a balloon pilot
  -> read wind-lane and altitude-band hints
  -> use burner / vent to enter the correct air layer
  -> drift through three buoyancy gates
  -> maintain safe clearance over terrain
  -> return to landing / perch zone
  -> complete meadow-lift route contract
  -> write meadow-lift-complete
  -> unlock cloud-basin
  -> expose mission and progression through HUD and GameHost
```

## Domains in use

### Runtime and host domains

```txt
runtime-host
nexus-telemetry
gamehost-debug
static-smoke-validation
```

Services:

```txt
runtime-host
  - owns canvas/HUD lookup
  - creates scene, camera, renderer, lights, fog, and frame loop
  - handles resize and fatal error display
  - owns the app bootstrap boundary

nexus-telemetry
  - defines BalloonSnapshot resource
  - defines BalloonTicked event
  - publishes current balloon state every engine tick
  - exposes engine.openAbove.getState()

gamehost-debug
  - exposes engine, NexusEngine, scene, renderer, camera, and balloon
  - exposes local and Nexus state through getState()
  - needs mission/progression/diagnostic surfaces

static-smoke-validation
  - validates required files
  - validates balloon runtime markers
  - validates visual kit markers
  - blocks regression to old bird markers
  - needs behavior-level simulation tests
```

### Simulation and gameplay domains

```txt
balloon-vehicle-state
balloon-input-map
balloon-drift-physics
altitude-safety
wind-field
terrain-sampler
campaign-config
meadow-lift-objective
route-object-state
region-unlock-progression
```

Services:

```txt
balloon-vehicle-state
  - stores position, velocity, wind, vertical velocity, burner, vent, altitude, elapsed, distance, and message

balloon-input-map
  - captures key state
  - derives burner intent
  - derives vent intent
  - derives zoom intent

balloon-drift-physics
  - computes buoyancy from burner and vent
  - applies vertical damping and soft ceiling force
  - blends horizontal velocity toward sampled wind
  - integrates position with capped dt

altitude-safety
  - samples terrain floor
  - clamps balloon above terrain clearance
  - computes altitude above terrain

wind-field
  - samples wind angle and speed over elapsed time
  - emits wind vector
  - offsets wind-ribbon visual group

terrain-sampler
  - computes terrain height
  - computes moisture
  - computes terrain vertex color

campaign-config
  - stores campaign id, regions, world seed, world tuning, and legacy FLIGHT tuning
  - needs BALLOON_DRIFT source of truth

meadow-lift-objective
  - should define route contract
  - should spawn and track three buoyancy gates
  - should track altitude-band entry
  - should detect landing zone completion

route-object-state
  - should track gate IDs, positions, radius, altitude band, completion state, and visual status

region-unlock-progression
  - should record meadow-lift-complete
  - should unlock cloud-basin
  - should snapshot progression state
```

### Rendering and object domains

```txt
world-generation
balloon-visual-object
balloon-envelope-panels
balloon-mouth
balloon-streamer-fit
balloon-fabric-seams
hot-air-balloon-envelope-legacy
hot-air-balloon-basket
hot-air-balloon-rigging
hot-air-balloon-burner
rope-utility
camera-follow
hud-telemetry
```

Services:

```txt
world-generation
  - builds terrain mesh
  - builds lakes
  - scatters trees
  - builds cloud groups
  - builds wind ribbons

balloon-visual-object
  - composes panels, mouth, fitted streamers, seams, basket, rigging, burner, and rope parts
  - stores part references in userData
  - animates burner and rigging sub-kits
  - exposes compatibility install into a legacy vehicle host

balloon-envelope-panels
  - builds triangulated gore panels
  - assigns alternating fabric colors

balloon-mouth
  - builds open bottom mouth ring
  - builds inner shadow disk
  - builds fabric mouth skirt

balloon-streamer-fit
  - builds surface-fitted decorative side panels
  - follows balloon curvature with slight surface offset

balloon-fabric-seams
  - builds vertical rib/seam lines around the envelope

hot-air-balloon-envelope-legacy
  - older sphere/box envelope builder still exists
  - should stay documented as legacy unless intentionally reconnected

hot-air-balloon-basket
  - builds basket body and trim rails

hot-air-balloon-rigging
  - defines rope anchor points
  - builds basket-to-envelope rope rigging
  - animates rope sway

hot-air-balloon-burner
  - builds burner frame, flame cone, and glow light
  - animates flame pulse and glow
  - should consume live burner intensity later

rope-utility
  - builds tube rope geometry
  - adds subtle grey stripe meshes
  - updates sag and sway over time

camera-follow
  - computes basket focus from wind direction
  - computes wind-relative camera offset
  - applies scroll zoom
  - looks at basket focus

hud-telemetry
  - renders title, message, heat label, altitude, wind speed, and drift distance
  - needs mission and unlock status
```

## Kits identified

### Current explicit kits

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

### Candidate extraction kits

```txt
open-above-balloon-drift-config-kit
open-above-runtime-host-kit
open-above-balloon-input-map-kit
open-above-balloon-state-kit
open-above-balloon-drift-physics-domain-kit
open-above-wind-field-domain-kit
open-above-altitude-safety-domain-kit
open-above-terrain-sampler-domain-kit
open-above-world-generation-domain-kit
open-above-route-object-kit
open-above-meadow-lift-balloon-objective-kit
open-above-region-unlock-progression-kit
open-above-basket-follow-camera-kit
open-above-hud-telemetry-kit
open-above-gamehost-debug-kit
open-above-balloon-behavior-smoke-kit
```

## Key findings

- The runtime is coherent as a balloon drift toy, and the host page already labels it correctly.
- Product docs/config are still split between old bird/free-flight language and the live balloon runtime.
- `src/main.js` should not receive more gameplay features until mission state is split into services or clear modules.
- The first real gameplay gap is objective state: no gates, altitude bands, landing zone, completion flag, or Cloud Basin unlock.
- The visual balloon object family is good enough to keep as a renderer-facing kit boundary.
- Static smoke is protecting markers, but it cannot yet validate actual behavior.

## Next build slice

**Build target:** `TheOpenAbove Balloon Drift Config Parity + Objective State Cutover`

```txt
1. Update README/package/docs/config language so balloon drift is the active product direction.
2. Add BALLOON_DRIFT config and mark FLIGHT as legacy only.
3. Add route objects for three buoyancy gates, altitude bands, wind-lane hints, and landing zone.
4. Add mission state into local snapshot and GameHost.getState().local.mission.
5. Add progression state for meadow-lift-complete and cloud-basin-unlocked.
6. Thread objective status into HUD.
7. Split input, wind, terrain, drift physics, altitude safety, camera, HUD, telemetry, and GameHost into source-level kit modules.
8. Add behavior smoke tests for burner lift, vent descent, wind drift, terrain clamp, gate completion, route completion, and unlock.
```

## Minimum implementation order

```txt
config parity first
  -> BALLOON_DRIFT constants
  -> mission state object
  -> route object definitions
  -> local snapshot mission field
  -> HUD mission status
  -> GameHost mission/progression field
  -> static smoke assertions
  -> behavior smoke harness
  -> source service extraction
```

## Acceptance checks for next code pass

```txt
npm run check passes
npm run build passes
README and config both describe balloon drift, not bird free-flight
GameHost.getState().local.objectType === "hot-air-balloon"
GameHost.getState().local.mission exists
GameHost.getState().local.progression.cloudBasinUnlocked exists
burner input increases altitude trend
vent input lowers vertical velocity trend
balloon never drops below terrain clearance
three buoyancy gates can be completed deterministically
completion writes meadow-lift-complete
completion unlocks cloud-basin
```

## Notes for central tracker

Update `LuminaryLabs-Dev/LuminaryLabs` with:

```txt
repo-ledger/LuminaryLabs-Publish/TheOpenAbove.md
internal-change-log/2026-07-07T06-31-46-04-00-the-open-above-config-parity-objective-breakdown.md
```

No product runtime code was changed in this pass. This is a documentation, tracker, and registry update only.
