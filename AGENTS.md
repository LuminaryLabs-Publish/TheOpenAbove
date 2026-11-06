# The Open Above — Agent Guidance

## Current product

The active product is **The Open Above: Sky Racing**, a lightweight Three.js aerial racing application. Start from `src/main.js` and the `src/racing/` modules, not the preserved Meadow Lift balloon scene.

## Primary outcomes

- Load a visible, usable flight scene quickly.
- Keep a complete playable twelve-gate race.
- Preserve stable controls, speed feedback, checkpoints, penalty, retry, and local best time.
- Maintain a cinematic atmosphere without unnecessary loading prerequisites.
- Never declare success from source-only tests; validate the actual production preview with Playwright.

## Architecture

- `src/racing/flight-sim.js`: pure motion and checkpoint logic, deterministic and unit testable.
- `src/racing/sky-racing-app.js`: Three.js scene, user input, presentation and race orchestration.
- `index.html`: HUD, menu, loading failure state and mobile controls.
- `src/main.js`: fast, isolated boot with explicit fallback error.

The old balloon, NexusEngine and world-generation modules are retained for future restoration and compatibility, but must not block the active sky-racer first frame. Do not delete them without an explicit migration plan.

## Validation

Run `npm run check`, `npm run build`, and `node tools/browser-sky-racing.mjs` with Playwright Chromium installed. The deployment workflow must gate publication on those checks.

Avoid copying engine code, adding duplicate deployment workflows, or overstating browser/hardware validation.
