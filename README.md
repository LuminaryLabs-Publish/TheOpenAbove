# The Open Above — Sky Racing

A cinematic 12-gate aerial racing game, built with Three.js and Vite.

## Play

Open the [GitHub Pages game](https://luminarylabs-publish.github.io/TheOpenAbove/), select **Start Flight**, and chase the luminous gates through the mountains.

Controls:
- **W / S** or **Up / Down**: climb / descend
- **A / D** or **Left / Right**: steer
- **Space**: boost (regenerates)
- **Shift**: brake
- **P**: pause / resume
- **R**: restart
- On touch screens, use the on-screen flight controls.

The sky circuit includes 12 checkpoints, time penalties for missed gates, race timing and locally saved personal bests. The menu and HUD are intended to be readable without an external guide.

## Fast-start architecture

The live entry point is `src/main.js`, which dynamically loads `src/racing/sky-racing-app.js`. The active course uses `src/racing/flight-sim.js` for testable, deterministic glider control and checkpoint rules.

The first rendered frame is **not** gated on worker-based world generation or NexusEngine startup. A failed renderer displays a retryable error rather than a permanent loader.

The earlier Meadow Lift balloon exploration source, NexusEngine domains, and associated tests are retained as a separate legacy foundation; they are **not** the currently launched racing game. This is intentional to preserve the earlier technical experiments without allowing them to block the playable racer.

## Develop and verify

```bash
npm ci --ignore-scripts --no-audit --no-fund
npm run check
npm run build
npx playwright install --with-deps chromium
node tools/browser-sky-racing.mjs
npm run dev
```

The normal check verifies flight simulations, checkpoint interactions, startup source contracts, and preserved legacy modules. The browser smoke launches the actual Vite production preview, verifies the startup panel is dismissed, starts a race, exercises climb, steering and boost, and saves a screenshot.

## Publishing

Pushes to `main` execute validation and the existing `.github/workflows/deploy-pages.yml`. Pages deployment requires the browser smoke test to pass. No additional deployment workflow is needed.

## NexusEngine boundary

NexusEngine is pinned in the dependency lockfile for preserved shared-domain and portable-kernel validation. The new sky-racing runtime is intentionally self-contained for reliable startup. XR target packaging and hardware testing are separate from the Web game.
