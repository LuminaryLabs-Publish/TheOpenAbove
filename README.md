# The Open Above — Ride the Wind

The active Web experience is a **parasailing flight game**. A human pilot hangs beneath a ram-air canopy and navigates nine broad lift corridors over a mountainous landscape. The focus is on wind-reading, suspension movement and terrain-driven gliding rather than an aircraft or rocket racer.

Playable site: https://luminarylabs-publish.github.io/TheOpenAbove/

## Active runtime

- `src/main.js` dynamically imports `src/parasail/parasail-app.js` with an explicit startup-error fallback.
- `src/parasail/parasail-flight-sim.js` defines wind sampling, ridge uplift, terrain, sink rate, brake-line steering, and flight corridor contracts.
- `src/parasail/parasail-app.js` owns the canopy and harnessed pilot, suspension lines, mountain mesh, distant silhouettes, angled wind streaks, camera and controls.

The earlier balloon experiment and sky racer remain in the repository for preservation; neither is on the current first-frame path. NexusEngine stays pinned for the legacy domain and portable build proof.

## Controls

- A / D or Left / Right: left/right brake lines.
- W / S or Up / Down: modest pitch control.
- Space or Shift: symmetric flare / brake.
- P: pause or resume.
- R: restart.
- Touch controls appear on narrow displays.

The wing is **unpowered**. Rising thermals and terrain-driven ridge lift provide altitude; W does not magically make the player climb. Nine forgiving wind corridors provide an optional navigation route. The world offers expansive free gliding and a soft ground-contact limit.

## Visual approach

- Approximately 17.8 km by 27 km primary procedural landscape.
- Mountain-scale variation, valleys, steep ridges and rocky higher elevations.
- Three additional far-horizon silhouette layers.
- 47 km camera far plane and substantially reduced atmospheric fog.
- 300 animated, wind-aligned instances with upward-sloping strokes near ridge lift.
- Fabric-colored ram-air canopy, visible pilot and rigging.

This is a procedural Web 3D prototype; physical realism, consistent high-end performance and exact hardware behavior still require further testing.

## Build and validate

```bash
npm ci --ignore-scripts --no-audit --no-fund
npm run check
npm run build
npx playwright install --with-deps chromium
node tools/browser-sky-racing.mjs
```

The Chromium smoke test verifies the actual Vite production preview, startup, pitch and steering, downwind motion, long draw distance and exposed wind data.

## Deployment

The existing `.github/workflows/deploy-pages.yml` automatically validates and publishes main. Do not introduce another Pages workflow. The separate Validate Main workflow uses the same browser gate.

## Cloud combos and retained speed

Cloud pockets, rather than a fixed gate course, are the primary gameplay interaction.
Enter a distinct cloud with the canopy open or after a controlled dive to register a
**cloud skim**, **lift rider**, or **dive recovery**. Each distinct pocket extends the
combo, increases score, and adds to the persistent velocity bank.

The velocity bank does not decay with elapsed time, when crossing another cloud, or
when steering. The active flight simulation retains the greater of its previous
horizontal speed and the current target speed unless the pilot deliberately flares.
Holding Space to collapse the canopy primarily changes vertical descent and does
not erase the velocity bank. Starting a new run explicitly resets the bank.

The active service boundary is `src/domains/parasailing/cloud-combo/`:
renderer-neutral zone descriptors, event attribution, and a monotonic momentum Kit.
`src/visual/cloud-combo/` owns the visible Three.js cloud clusters. The old
path rings remain in preserved source but are not part of the active gameplay loop.

## TOA-014 — Dive-to-lift slingshot (reworked)

This is a deliberate maneuver, not an automatic bonus from releasing Space. Hold
**Space** long enough to collapse the canopy and build actual downward speed and
fall distance; release Space and hold **W** to pull back into **rising wind**.
A successful recovery now converts measured dive energy and local updraft into a
variable retained forward-speed bonus and a brief, visible upward climb. There is
no reward in still/downward wind, for a shallow dive, or without W pull-back.
Repeated frames of one recovery cannot award multiple bonuses. The original
fixed +8 m/s reward was superseded after player feedback; cloud combo scoring
and all equipment-upgrade proposals are unchanged.
