# AGENTS.md

This repository is the standalone publishing repo for **The Open Above**.

## Prime directive

Build the game as a playable product, not as a loose experiment dump.

Repeat before each change:

```txt
Preserve the flight feel.
Keep renderer code presentation-only.
Move game rules toward explicit modules.
Document every new objective, region, and progression rule.
Validate before claiming success.
```

## Current scope

The first slice is **Meadow Lift**.

The route should prove:

```txt
free flight
thermals
wind gates
return-to-perch completion
restart/failure state
small HUD only
GameHost debug state
```

## Repo rules

- Keep `index.html` as the thin host.
- Keep gameplay in `src/` modules.
- Keep content in `src/data/`.
- Keep large design decisions in `docs/`.
- Keep UI minimal: one full-screen canvas, one small HUD, visible errors only.
- Do not hide gameplay rules inside draw-only code.
- Do not add large dashboards or persistent debug panels.

## Validation

Run:

```bash
npm run check
npm run build
```

Manual smoke:

```txt
Open game.
Fly for 60 seconds.
Catch at least one thermal.
Clear at least one gate.
Press R and confirm restart.
Confirm GameHost.getState() works.
```
