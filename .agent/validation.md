# Validation: TheOpenAbove

**Last aligned:** `2026-07-10T14-50-38-04-00`

## Scope

Documentation-only project breakdown and audit refresh.

## Validation performed

```txt
full accessible Publish repository inventory reviewed: yes
central ledger timestamps compared: yes
selected repository root .agent state read: yes
active route composer read: yes
campaign/world source read: yes
simulation kit read: yes
camera rig read: yes
package command surface read: yes
headless editor environment read: yes
runtime source changed: no
package scripts changed: no
dependencies changed: no
branch created: no
pull request created: no
npm install: not run
npm run check: not run
npm run build: not run
npm run headless:status: not run
npm run headless:inspect: not run
npm run headless:renderer: not run
npm run headless:check: not run
npm run headless:build: not run
browser smoke: not run
GPU/WebGL validation: not run
DOM-free source/input/frame fixture: not run because it does not exist yet
repo-local docs pushed to main: yes
central ledger update: pending at time of this repo-local record
```

## Available package commands

```txt
npm start
npm run dev
npm run check
npm run build
npm run headless:status
npm run headless:inspect
npm run headless:renderer
npm run headless:check
npm run headless:build
```

## Existing coverage

`npm run check` currently runs `node tests/smoke.mjs`. The smoke and headless paths cover required route files, import/runtime contracts, framebuffer depth targets, neutral exposure and grade, disabled cinematic passes, streamed terrain, soft cloud shadows, explicit water fog, npm check, and Vite build routing.

## Missing coverage

```txt
canonical route source manifest
source fingerprint stability
legacy campaign/FLIGHT classification
keyboard input results
wheel input results
input sequence ranges
shared frame IDs
simulation/camera/visual consumer rows
telemetry publication rows
render consumption rows
HUD projection rows
bounded GameHost proof readback
DOM-free fixture parity
browser-versus-fixture readback shape
```

## Required future validation order

```txt
1. node scripts/open-above-source-frame-fixture.mjs
2. npm run check
3. npm run headless:inspect
4. npm run headless:check
5. npm run build
6. browser smoke
7. compare GameHost proof readback with fixture result
8. verify Pages deployment without route changes
```

## Current conclusion

The documentation is updated, but runtime correctness for the proposed proof domain is unverified because no runtime implementation was added. Do not claim source/input/frame correlation until the fixture exists and passes.

## Next safe ledge

```txt
TheOpenAbove Source Input Frame Correlation Ledger + GameHost Headless Fixture Gate
```