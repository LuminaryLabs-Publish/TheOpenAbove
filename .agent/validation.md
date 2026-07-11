# Validation: TheOpenAbove

**Last aligned:** `2026-07-11T13-10-35-04-00`

## Scope

Documentation-only audit of the product acceptance boundary. This pass inspected repository instructions, public copy, package scripts, current runtime composition, balloon input, HUD copy, smoke assertions, headless scripts and deployment assumptions.

## Plan ledger

**Goal:** separate source-backed product/acceptance mismatches from executable proof and define the exact fixture gate required before claiming README, AGENTS, HUD and runtime parity.

- [x] Review the complete Publish inventory.
- [x] Compare all eligible repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove`.
- [x] Read `AGENTS.md`, `README.md`, `package.json` and current `.agent` state.
- [x] Read `src/main.js` and `src/runtime/balloon-simulation-kit.js`.
- [x] Read `tests/smoke.mjs` and identify its proof boundary.
- [x] Identify the interaction loop, domains, kits and services.
- [x] Define product, controls, objectives, docs, HUD and evidence parity fixtures.
- [x] Change no runtime source, dependency, package script or workflow.
- [x] Create no branch or pull request.

## Source inspection completed

```txt
active runtime product: Air Mail hot-air-balloon mission
active destination: Brookhaven
burner bindings: Space / W / ArrowUp
vent bindings: S / ArrowDown / Shift
camera zoom: wheel
R restart consumer: no
README product: Meadow Lift bird free-flight
README controls: pitch / bank / boost / R
AGENTS manual smoke: thermal / gate / perch / R
source smoke checks documentation parity: no
source smoke opens browser: no
source smoke checks deployed Pages: no
```

## Source-backed failure case

```txt
read README or AGENTS
  -> attempt A/D bank or pitch-style flight
  -> runtime exposes no equivalent steering binding
  -> attempt three thermals / five gates / perch completion
  -> active Air Mail runtime exposes different objective graph
  -> press R
  -> no runtime consumer
  -> run npm run check
  -> source-pattern smoke can still pass
```

This follows directly from the checked-in public guidance, runtime bindings and smoke assertions. It was not executed as a browser fixture in this documentation pass.

## Existing proof

`npm run check` currently proves required files and selected implementation patterns. It does not prove:

```txt
selected product identity
mode supersession
runtime/public control parity
runtime/public objective parity
HUD/documentation parity
restart availability parity
manual smoke executability
browser acceptance completion
deployed Pages acceptance
product/acceptance fingerprint agreement
```

## Required pure fixtures

```txt
fixture:product-manifest
fixture:acceptance-contract
fixture:control-parity
fixture:objective-parity
fixture:documentation-projection
fixture:agent-guidance-projection
fixture:hud-contract-projection
fixture:acceptance-fingerprint
fixture:acceptance-evidence
```

## Required host/browser fixtures

```txt
fixture:runtime-binding-observation
fixture:browser-acceptance
fixture:browser-control-contract
fixture:browser-objective-contract
fixture:browser-restart-availability
fixture:headless-acceptance-parity
fixture:pages-acceptance
```

## Required assertions

```txt
one admitted product manifest selects Air Mail
legacy Meadow Lift is archived, migrated or explicitly selectable
all declared controls have installed runtime consumers
all installed public controls are declared
all objectives map to executable domain rules
restart is documented only when ResetMission is installed
README, AGENTS, HUD, telemetry and headless observations share one revision
browser and Pages evidence share the admitted product/acceptance fingerprint
stale or partial projections fail with typed results
```

## Commands not run

```txt
npm install
npm run check
npm run build
headless commands
browser smoke
Pages smoke
```

The connector environment provided repository source and write access, not a checked-out browser/GPU runtime. No command execution is claimed.

## Change-state validation

```txt
runtime JavaScript changed: no
package scripts changed: no
dependencies changed: no
route behavior changed: no
gameplay behavior changed: no
render behavior changed: no
deployment workflow changed: no
branch created: no
pull request created: no
.agent documentation changed: yes
```

## Completion boundary

Do not claim that repository guidance or public controls match the product because `npm run check` passes. Completion requires one admitted product/acceptance contract, generated projections, runtime binding observations, browser objective proof and deployed Pages evidence with a shared fingerprint.
