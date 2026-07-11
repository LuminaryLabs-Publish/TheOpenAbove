# Validation: TheOpenAbove

**Last aligned:** `2026-07-10T23-20-41-04-00`

## Scope

Documentation-only repository breakdown and audit refresh. Runtime source, package scripts, dependencies, route behavior, rendering behavior, and deployment configuration were not changed.

## Validation performed

```txt
full accessible LuminaryLabs-Publish inventory reviewed: yes
central ledger timestamps compared: yes
all nine eligible repositories confirmed tracked: yes
all nine eligible repositories confirmed with root .agent state: yes
TheCavalryOfRome excluded: yes
selected only TheOpenAbove: yes
AGENTS.md and README product loop read: yes
campaign/world source read: yes
main route composition read: yes
simulation and telemetry paths read: yes
visual composition and render path read: yes
smoke and package command coverage read: yes
runtime source changed: no
package scripts changed: no
dependencies changed: no
branch created: no
pull request created: no
push target: main
```

## Existing commands

```txt
npm run check
npm run build
npm run headless:status
npm run headless:inspect
npm run headless:renderer
npm run headless:check
npm run headless:build
```

## Missing required commands

```txt
npm run fixture:runtime-admission
npm run fixture:runtime-lifecycle
npm run fixture:meadow-lift-route
```

## Commands and runtime checks

```txt
npm install: not run
npm run check: not run
npm run build: not run
npm run headless:status: not run
npm run headless:inspect: not run
npm run headless:renderer: not run
npm run headless:check: not run
npm run headless:build: not run
browser smoke: not run
Pages smoke: not run
runtime-admission fixture: unavailable
runtime-lifecycle fixture: unavailable
Meadow Lift route fixture: unavailable
```

## Existing coverage

`tests/smoke.mjs` checks required local files and source-text patterns for visual composition, deterministic grass, terrain, water, postprocessing, and headless command names. It does not execute the browser module graph, run the documented mission loop, generate thermals/gates/perch objectives, evaluate completion or timeout, admit restart, or verify Cloud Basin unlock.

## Missing campaign proof

```txt
campaign/world source validation and fingerprint
configured objective counts equal generated objective counts
same seed produces identical objective IDs and transforms
thermal and gate contacts are accepted once
return is rejected until prerequisite progress is complete
valid perch return commits completion once
time limit commits failure once
restart clears mission progress and creates a new generation
Cloud Basin unlock follows exactly one completion result
render/HUD/GameHost rows correlate with the same mission frame
same command sequence produces identical final mission fingerprint
```

## Required validation order

```txt
1. node runtime-admission fixture
2. node runtime-lifecycle/import-purity fixture
3. node Meadow Lift deterministic route fixture
4. npm run check
5. npm run headless:inspect
6. npm run headless:check
7. npm run build
8. browser smoke
9. Pages smoke
```

## Current conclusion

Source inspection proves that the authored Meadow Lift objectives are not executed by the active Balloon Drift route. Runtime success, lifecycle safety, mission completion, failure, restart, unlock, and end-to-end product-loop correctness are not claimed because the required fixtures do not exist and no browser/runtime commands were executed.

## Push state

```txt
repo-local docs pushed to main: yes
central ledger updated: yes
central internal change log added: yes
```
