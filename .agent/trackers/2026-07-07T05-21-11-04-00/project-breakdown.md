# TheOpenAbove Project Breakdown

**Run timestamp:** `2026-07-07T05:21:11-04:00`  
**Repo:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch target:** `main`  
**Central tracker repo:** `LuminaryLabs-Dev/LuminaryLabs`  
**Status:** follow-up breakdown, mission-config cutover planning

## Selection

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`LuminaryLabs-Publish/TheOpenAbove` was selected for this run because the current central ledger rotation most recently returned to `AetherVale`, making `TheOpenAbove` the next oldest eligible publish repo in the observed order:

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

`TheOpenAbove` is a standalone Vite/Three.js publish repo. Public README text still frames the product as bird/free-flight exploration, but the live app is now a hot-air-balloon drift runtime.

Current implemented runtime:

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

The strongest repo-local kit boundary is now the hot-air-balloon object family. The weakest boundary is still `src/main.js`, which owns runtime host, world generation, input, drift physics, camera, HUD, telemetry installation, and diagnostics in one file.

## Interaction loop

### Current implemented loop

```txt
load page
  -> create scene, camera, renderer, lights, fog, and frame loop
  -> generate valley terrain, lakes, trees, clouds, and wind ribbons
  -> spawn the procedural hot-air-balloon object at altitude
  -> hold Space / W / ArrowUp to increase burner heat
  -> hold S / ArrowDown / Shift to vent downward
  -> sample time-varying wind vector
  -> blend balloon velocity toward wind plus vertical velocity
  -> integrate balloon position
  -> clamp above terrain clearance floor
  -> animate burner, rigging, ropes, and balloon sway
  -> follow basket-relative camera focus
  -> render HUD altitude, wind, burner state, and drift distance
  -> publish balloon snapshot through Nexus Engine
  -> expose local and Nexus state through GameHost
```

### Target product loop

```txt
start Meadow Lift
  -> read visible wind-lane and altitude-band hints
  -> use burner and vent to enter a useful altitude band
  -> drift through three buoyancy gates
  -> maintain safe clearance over terrain
  -> return toward a landing / perch zone
  -> complete meadow-lift route contract
  -> write meadow-lift-complete
  -> unlock cloud-basin
  -> expose completion and unlock state through GameHost
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
  - mounts canvas and HUD
  - creates renderer, scene, lights, fog, and animation loop
  - handles resize and fatal error display

nexus-telemetry
  - defines BalloonSnapshot resource
  - defines BalloonTicked event
  - publishes current balloon state every engine tick
  - exposes engine.openAbove.getState()

gamehost-debug
  - exposes engine, NexusEngine, scene, renderer, camera, and balloon
  - exposes local and Nexus state through getState()

static-smoke-validation
  - validates required files
  - validates balloon runtime markers
  - validates visual kit markers
  - blocks regression to old bird markers
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
region-unlock-progression
```

Services:

```txt
balloon-vehicle-state
  - stores position, velocity, wind, vertical velocity, burner, vent, altitude, elapsed time, drift distance, and message

balloon-input-map
  - maps keyboard state into burner intent, vent intent, and zoom intent

balloon-drift-physics
  - computes buoyancy from burner and vent state
  - applies vertical damping and soft ceiling force
  - blends horizontal velocity toward sampled wind
  - integrates position over fixed dt cap

altitude-safety
  - samples terrain floor
  - clamps balloon above clearance
  - computes altitude above terrain

wind-field
  - samples wind angle and wind speed over time
  - emits wind vector and wind-ribbon offset

terrain-sampler
  - computes terrain height
  - computes moisture
  - computes terrain vertex color

campaign-config
  - stores campaign id, regions, world seed, world tuning, and legacy FLIGHT tuning
  - needs BALLOON_DRIFT migration

meadow-lift-objective
  - should spawn buoyancy gates
  - should track altitude-band entry
  - should detect gate pass-through
  - should detect landing zone completion

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
  - builds triangulated envelope gore panels
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
  - older sphere/box envelope builder still present
  - currently kept for compatibility/smoke coverage, not used by the composite object kit

hot-air-balloon-basket
  - builds basket body and trim rails

hot-air-balloon-rigging
  - defines rope anchor points
  - builds basket-to-envelope rope rigging
  - animates rope sway

hot-air-balloon-burner
  - builds burner frame, flame cone, and glow light
  - animates flame pulse and glow

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
  - renders title, message, burner/heat label, altitude, wind speed, and drift distance
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
open-above-runtime-host-kit
open-above-balloon-input-map-kit
open-above-balloon-drift-physics-domain-kit
open-above-wind-field-domain-kit
open-above-altitude-safety-domain-kit
open-above-terrain-sampler-domain-kit
open-above-world-generation-domain-kit
open-above-basket-follow-camera-kit
open-above-hud-telemetry-kit
open-above-gamehost-debug-kit
open-above-meadow-lift-balloon-objective-kit
open-above-region-unlock-progression-kit
open-above-balloon-behavior-smoke-kit
open-above-balloon-drift-config-kit
```

## Key findings

- The live app is coherent as a balloon drift slice.
- The repo still has stale bird/free-flight framing in README and `src/data/campaign.config.js`.
- `src/main.js` is the main architectural bottleneck because it owns nearly every runtime service.
- The object-kit family is already strong and should remain source-owned in this repo.
- The newer object composition uses triangulated panels, open mouth, fitted streamers, fabric seams, dark striped tube ropes, basket, rigging, and burner.
- The legacy `open-above-hot-air-balloon-envelope-kit` still exists but is no longer the active envelope path.
- Static smoke coverage is good for marker regression, but behavior-level smoke is still missing.
- The next practical product milestone is mission content, not another visual pass.

## Next build slice

**Build target:** `TheOpenAbove Balloon Drift Config + Mission Cutover`

```txt
1. Update README / docs / config language to say balloon drift is the active product direction.
2. Add BALLOON_DRIFT config next to or in place of legacy FLIGHT config.
3. Extract main.js into runtime-host, input, wind, terrain, drift physics, altitude safety, camera, HUD, telemetry, and GameHost modules.
4. Keep the hot-air-balloon object kit family renderer-facing and source-owned.
5. Add buoyancy gates and altitude bands as route objects.
6. Add a landing/perch zone and route completion state.
7. Add local progression state: meadow-lift-complete and cloud-basin-unlocked.
8. Thread mission status into HUD and GameHost.getState().
9. Add behavior smoke tests for burner lift, vent descent, wind drift, terrain clamp, gate completion, and unlock.
```

## Minimum implementation order

```txt
config first
  -> BALLOON_DRIFT constants
  -> mission state object
  -> objective route objects
  -> GameHost mission snapshot
  -> static smoke update
  -> behavior smoke harness
  -> service extraction
```

## Acceptance checks for next code pass

```txt
npm run check passes
npm run build passes
GameHost.getState().local.objectType === "hot-air-balloon"
GameHost.getState().local.mission exists
burner input increases altitude trend
vent input decreases vertical velocity trend
balloon never drops below terrain clearance
three gates can be completed deterministically
completion writes meadow-lift-complete
completion unlocks cloud-basin
```

## Notes for central tracker

Update `LuminaryLabs-Dev/LuminaryLabs` with:

```txt
repo-ledger/LuminaryLabs-Publish/TheOpenAbove.md
internal-change-log/2026-07-07T05-21-11-04-00-the-open-above-config-mission-breakdown.md
```
