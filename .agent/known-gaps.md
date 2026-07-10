# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-10T14-50-38-04-00`

## Primary gap

The runtime can expose the latest state but cannot prove causality across source, input, simulation, camera, visual, telemetry, rendering, HUD, and GameHost consumers.

## Current gaps

```txt
src/data/campaign.config.js mixes current Balloon Drift source with legacy thermal/gate/perch/start-speed/FLIGHT fields.
src/main.js is the real composition authority, but no source manifest or fingerprint records that authority.
keyboard handlers mutate a hidden Set without accepted, released, repeated, unsupported, cleared, or no-change rows.
wheel handling mutates zoom without accepted, clamped, zero-delta, or no-change rows.
frames have no monotonic frame ID shared across simulation, camera, visual, telemetry, render, and HUD.
simulation snapshots have no source fingerprint or consumed input sequence range.
camera state has no source fingerprint, wheel result ID, or frame ID.
visual state has no correlated simulation/camera snapshot IDs.
telemetry tick has no publication result row.
render submission has no render-consumption row.
HUD projection has no consumer row.
GameHost exposes latest aggregate state only and has no bounded proof journals.
headless runtime.getState returns static inspection results rather than deterministic runtime proof.
no reusable DOM-free source/input/frame fixture exists.
npm run check does not execute source/input/frame correlation assertions.
```

## Required proof rows

```txt
source manifest row
source fingerprint row
legacy compatibility row
keyboard input result row
wheel input result row
frame correlation row
simulation consumer row
camera consumer row
visual consumer row
telemetry publication row
render consumption row
HUD projection row
GameHost projection row
fixture summary row
```

## Required statuses

```txt
accepted
released
cleared
repeated
unsupported
clamped
no-change
consumed
published
rendered
projected
skipped
rejected
failed
```

## Non-gaps for the next pass

```txt
The Balloon Drift route is functional and visually structured.
Simulation, camera, presentation, visual, telemetry, smoke, and headless boundaries already exist.
The package description is aligned to the hot-air-balloon experience.
The browser exposes a useful GameHost compatibility surface.
Build already depends on npm run check.
Headless commands already route project inspection, renderer validation, check, build, and state requests.
```

## Do not prioritize next

```txt
renderer replacement
terrain extraction or rewrite
cloud, water, grass, or lighting retuning
camera framing changes
balloon geometry changes
simulation constant changes
new regions or route objectives
legacy field deletion without compatibility rows
new gameplay systems
README-only cleanup
```

## Next safe ledge

```txt
TheOpenAbove Source Input Frame Correlation Ledger + GameHost Headless Fixture Gate
```