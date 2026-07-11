# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-11T05-25-29-04-00`

## Status

```txt
status: air-mail-route-authority-and-horizon-consumption-planned
runtime source changed by this pass: no
recent runtime commit reconciled: yes
branch: main
root .agent state: refreshed
central ledger sync: complete
central change log: complete
```

## Selection and runtime reconciliation

All ten accessible `LuminaryLabs-Publish` repositories were reviewed. `TheCavalryOfRome` was excluded. All nine eligible repositories were centrally tracked with root `.agent` state.

`TheOpenAbove` was selected because current `main` contains an undocumented product change:

```txt
a67cc952995727a3ddb29e61ed66a72f338a58fd
feat: add air-mail airstream routes and horizon terrain
```

The commit changes the active game from open-ended Balloon Drift toward an executable altitude-routing mail loop.

## Interaction loop

```txt
static ESM resolution
  -> construct visual domain
  -> construct near and horizon terrain
  -> construct balloon object and simulation
  -> construct three airstream routes, field, visuals and diagnostics
  -> construct one mail route, parcel, three towns and delivery visuals
  -> keydown/keyup/blur mutate private burner/vent key state
  -> wheel changes camera zoom
  -> RAF computes capped variable dt
  -> simulation samples the airstream field at the current balloon position
  -> airstream force replaces wind and advances balloon movement
  -> mail progress records influential route and samples destination volume
  -> delivery may commit
  -> route/town/balloon/camera/environment state updates
  -> Nexus telemetry snapshots the pre-render state
  -> HDR render and dynamic-resolution sample execute
  -> HUD projects hard-coded Brookhaven wording
  -> next RAF repeats
```

## Active product loop

```txt
carry parcel-001 for Brookhaven
  -> observe three visible currents
  -> burner climbs toward a higher current
  -> vent descends toward a lower current
  -> enter and remain near a route centerline
  -> horizontal velocity follows the sampled route
  -> approach Brookhaven
  -> enter its delivery radius and altitude tolerance
  -> parcel becomes delivered
```

There is no direct horizontal steering. Altitude is the routing control.

## Domains in use

```txt
browser shell and Vite publishing
static ESM and CDN source admission
legacy Meadow Lift campaign source
new air-mail route source
keyboard, blur and wheel input
variable-dt RAF cadence
balloon buoyancy, venting and terrain clearance
airstream route validation and immutable route data
nearest-segment route sampling
airstream overlap blending and ambient wind
airstream-to-balloon force adaptation
airstream state, visualization and optional debug projection
mail parcel state
mail route and town data
delivery-volume geometry
delivery progress and one-shot completion
mail town and destination-marker rendering
camera follow, basket mode, clipping and zoom
quality tier and dynamic resolution
physical sky, sun, aerial perspective, weather and volumetric clouds
near terrain chunk streaming
far-horizon terrain streaming
world-space terrain color fields
vegetation, deterministic grass, water and landmarks
HDR composition, color grading and lens response
Nexus telemetry, HUD and GameHost projection
partial lifecycle and disposal
source smoke, pure airstream/mail tests and headless routing
Pages deployment
```

## Services offered

- Route source: validates stable route IDs, points, radius, speed, lift, turbulence, destination and color.
- Route sampler: finds the nearest 3D route segment, computes influence, capture state, tangent, velocity and contributors.
- Field service: evaluates all routes and blends the dominant routed velocity with altitude-sensitive ambient wind.
- Balloon-force adapter: normalizes a field sample and writes wind plus airstream state into the balloon simulation.
- Airstream domain: composes field, visible route ribbons/wisps, optional debug state, snapshots and disposal.
- Parcel service: constructs and resets parcel state.
- Mail route service: supplies three towns, one default parcel and the declared correct current.
- Delivery volume: computes ground-relative destination center, horizontal distance, altitude delta and inside/outside state.
- Delivery progress: records selected route, updates parcel messaging and emits a one-shot `mail-delivered` object.
- Mail town rendering: builds town houses, mail markers, delivery rings, destination pulse and disposal.
- Mail domain: composes route, parcel, towns, visuals, progress, snapshot, reset and disposal.
- Simulation: polls burner/vent state, samples flow, applies buoyancy, advances movement, enforces terrain clearance and snapshots.
- Terrain: streams near chunks and a coarse far-horizon annulus from the same height/color/material source.
- Rendering: presents route ribbons, town markers, balloon, terrain, atmosphere, grass, water and HDR output.
- Readback: projects simulation, airstream, mail, terrain-count and visual summaries through telemetry/HUD/GameHost.
- Validation: executes pure field/mail assertions plus source-shape smoke checks through `npm run check`.

## Active source-backed kits

### Runtime and gameplay composition

```txt
open-above-balloon-simulation-kit
open-above-balloon-telemetry-kit
open-above-airstream-domain
open-above-airstream-route-kit
open-above-airstream-sampler-kit
open-above-airstream-field-kit
open-above-airstream-balloon-force-kit
open-above-airstream-visual-kit
open-above-airstream-debug-kit
open-above-mail-delivery-domain
open-above-mail-parcel-kit
open-above-mail-route-kit
open-above-delivery-volume-kit
open-above-delivery-progress-kit
open-above-mail-town-kit
```

### Balloon object and presentation

```txt
open-above-hot-air-balloon-object-kit
open-above-balloon-envelope-panel-kit
open-above-balloon-mouth-kit
open-above-balloon-streamer-fit-kit
open-above-balloon-fabric-seam-kit
open-above-hot-air-balloon-basket-kit
open-above-hot-air-balloon-rigging-kit
open-above-hot-air-balloon-burner-kit
open-above-rope-kit
open-above-balloon-presentation-domain
open-above-envelope-fabric-material-kit
open-above-basket-material-kit
open-above-balloon-camera-rig-kit
open-above-clipping-fade-kit
```

### Visual environment

```txt
open-above-visual-domain
open-above-quality-tier-kit
open-above-dynamic-resolution-kit
open-above-physical-sky-kit
open-above-sun-light-kit
open-above-aerial-perspective-kit
open-above-cloud-weather-map-kit
open-above-volumetric-cloud-kit
open-above-cloud-lod-kit
open-above-cloud-lighting-kit
open-above-terrain-surface-kit
open-above-terrain-chunk-streaming-kit
open-above-terrain-horizon-streaming-kit
open-above-vegetation-cluster-kit
open-above-grass-world-seed-kit
open-above-grass-biome-density-kit
open-above-grass-exclusion-mask-kit
open-above-grass-chunk-placement-kit
open-above-grass-lod-kit
open-above-grass-compute-culling-kit
open-above-grass-field-domain
open-above-water-surface-kit
open-above-distant-landmark-kit
open-above-hdr-composer-kit
open-above-color-grade-kit
open-above-lens-response-kit
```

### Tooling and proof

```txt
open-above-headless-editor-environment
open-above-static-smoke-test-kit
open-above-airstream-mail-test-kit
```

## Runtime-implied adapters

```txt
open-above-route-shell-kit
open-above-importmap-kit
open-above-runtime-composer-kit
open-above-keyboard-input-kit
open-above-wheel-zoom-input-kit
open-above-hud-projection-kit
open-above-error-panel-kit
open-above-gamehost-legacy-readback-kit
open-above-nexusengine-cdn-adapter-kit
open-above-campaign-source-kit
open-above-raf-clock-adapter-kit
open-above-pages-deploy-kit
```

## Source-backed inactive or legacy surfaces

```txt
open-above-hot-air-balloon-envelope-kit
open-above-grass-detail-kit
open-above-bloom-kit
open-above-god-ray-kit
open-above-auto-exposure-kit
open-above-bird-camera-kit
open-above-bird-posture-kit
open-above-bird-dive-domain-kit
open-above-bird-flight-frame-kit
open-above-bird-flight-input-kit
open-above-bird-flight-physics-kit
```

These files remain source-backed but are not part of the active Air Mail composition.

## New runtime workload

The far-horizon streamer adds a second synchronous terrain membership and geometry-build path.

At high quality, source constants imply an initial camera-centered set of approximately:

```txt
near terrain chunks: 37
near terrain vertices: 60,597
horizon terrain chunks: 136
horizon terrain vertices: 7,624
combined terrain vertices: 68,221
minimum height evaluations for height+slope: 341,105
```

This is a source-derived census, not a browser timing result.

## Main findings

1. `correctAirstreamId` is stored by the mail domain but is not consumed by delivery admission.
2. Delivery commits solely from destination-volume membership, so arriving through the wrong current or ambient drift still succeeds.
3. `selectedAirstreamId` is mutable last-seen state, not a durable route traversal proof.
4. No route-entry/exit ledger, minimum dwell, segment progression, current-retention, wrong-route rejection or delivery receipt exists.
5. The old `CAMPAIGN` region remains `meadow-lift`; Air Mail has a second unversioned source of product truth.
6. Browser `R` restart remains unwired even though `mail.reset()` exists and repository instructions require restart.
7. HUD text hard-codes Brookhaven instead of projecting the active route/parcel/town data.
8. Simulation and turbulent flow use variable RAF elapsed time, so mission trajectories are not cadence-invariant.
9. Telemetry runs before render and cannot correlate delivery with a committed rendered frame.
10. Horizon terrain adds 136 coarse chunks at the initial origin estimate and shares the existing synchronous rebuild path without a build budget or result journal.
11. The pure tests are useful but do not test wrong-current delivery rejection, browser reset, same-command cadence parity, route progression, renderer consumption or GameHost detachment.

## Ordered safe ledges

```txt
1. Immutable Runtime Admission + Boot Capability Fixture Gate
2. Import-Pure Balloon Object Kit + Frame Ownership Fixture Gate
3. Runtime Session Lifecycle + Ordered Disposal/Reboot Fixture Gate
4. Fixed-Step Simulation Clock + Visibility/Input Parity Fixture Gate
5. Air-Mail Route Authority + Correct-Current Delivery Fixture Gate
6. Terrain Surface/Horizon Authority + Continuity/Work-Budget Fixture Gate
```

Documentation only. This pass changed no runtime source, dependency, script, route behavior, renderer behavior or deployment configuration.