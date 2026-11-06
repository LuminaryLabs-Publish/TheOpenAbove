# The Open Above — Active Product and Repository Boundaries

## Current experience

The Open Above is a **parasailor in a vast mountain airspace**. Preserve the canopy, visible harnessed rider, terrain-aware glide dynamics and readable angled wind streams. Do not reintroduce aircraft thrust, rigid wing racing, arcade boost or a hard gate course.

## Active source

- `src/main.js`: isolated boot and user-visible error fallback.
- `src/parasail/parasail-flight-sim.js`: renderer-neutral terrain and atmospheric flight state.
- `src/parasail/parasail-app.js`: Three.js scene, canopy, rigging, world, wind indicators and HUD.
- `index.html`: visible controls, readable flight data, pause and retry.

The old sky-racing and balloon modules remain intact as legacy source but are not called by the active page.

## Acceptance

- First usable frame without terrain-worker startup blocking.
- Visible pilot attached to fabric canopy by suspension lines.
- Wind indicators aligned to sampled wind, with upward angles in ridge-lift areas.
- Distinct valleys and mountain ridges, with long view distance.
- Time-based flight with controllable steering/flare and no direct vertical thrust.
- Deterministic unit tests plus actual Chromium WebGL gameplay smoke.
- Main pushes gated by existing deployment workflow; do not add deploy workflows.

Any design or rendering modification requires source-pinned tests, and a successful Web deployment must not be misrepresented as headset validation.
