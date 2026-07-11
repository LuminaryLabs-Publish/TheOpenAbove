# Validation: TheOpenAbove

**Last aligned:** `2026-07-11T05-25-29-04-00`

## Scope

Documentation-only reconciliation of runtime commit `a67cc952995727a3ddb29e61ed66a72f338a58fd`, which added the active Air Mail route, airstream domain, mail-delivery domain, town visuals, far-horizon terrain, and pure airstream/mail tests.

## Plan ledger

**Goal:** distinguish source inspection from executable proof and record exactly what the current test surface does and does not establish.

- [x] Review the full Publish inventory and central ledger timestamps.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove`.
- [x] Read the new runtime commit and active integration path.
- [x] Read airstream route, sampler, field, force, visual and domain sources.
- [x] Read mail route, parcel, volume, progress, town and domain sources.
- [x] Read balloon simulation, main loop, telemetry, terrain surface and horizon streamer.
- [x] Read `tests/airstream-mail.mjs`, `tests/smoke.mjs` and `package.json`.
- [x] Derive the near+horizon source workload census.
- [x] Change no runtime source, package script, dependency or deployment configuration.
- [x] Create no branch or pull request.
- [x] Push documentation directly to `main`.

## Validation performed

```txt
full Publish inventory reviewed: yes
central ledger timestamps compared: yes
nine eligible repositories tracked with root .agent: yes
TheCavalryOfRome excluded: yes
selected only TheOpenAbove: yes
new Air Mail commit reviewed: yes
main composition read: yes
balloon simulation and force integration read: yes
airstream domain and all six component kits read: yes
mail delivery domain and all component kits read: yes
near and horizon terrain composition read: yes
pure airstream/mail tests read: yes
source smoke read: yes
package scripts read: yes
runtime source changed by this pass: no
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

`npm run check` imports `tests/airstream-mail.mjs` from the smoke suite.

## Existing pure proof

The pure test currently proves:

```txt
identical route position and elapsed inputs produce identical field samples
a route centerline has high influence
far-away positions return ambient flow
three starting altitudes select three distinct routes
the Brookhaven route velocity points generally toward its destination
overlapping routes produce finite blended velocity
airstream force writes the selected route into balloon state
wrong-town position does not complete the Brookhaven parcel
Brookhaven volume membership completes delivery once
parcel reset clears delivered status
```

## Existing source-shape proof

The smoke suite currently checks:

```txt
new airstream and mail files exist
main composes the airstream and mail domains
simulation consumes the airstream sampler
mail progress and town visuals are referenced
near and horizon terrain are composed
legacy random terrain textures remain absent
grass remains deterministic and streamed
postprocess remains neutral
headless environment exposes validation/check/build routes
```

## Source-derived workload census

At the origin with high-quality constants:

```txt
near terrain chunks: 37
near terrain vertices: 60,597
horizon terrain chunks: 136
horizon segments: 36 chunks at 10, 32 chunks at 6, 68 chunks at 4
horizon terrain vertices: 7,624
combined terrain vertices: 68,221
minimum height evaluations for height and four slope samples: 341,105
```

This is a source-derived initial-set census, not a measured duration or frame-budget result.

## Missing commands

```txt
npm run fixture:runtime-admission
npm run fixture:import-purity
npm run fixture:runtime-lifecycle
npm run fixture:clock-route-parity
npm run fixture:air-mail-route
npm run fixture:air-mail-wrong-current
npm run fixture:air-mail-reset
npm run fixture:air-mail-frame-correlation
npm run fixture:terrain-near-horizon-seams
npm run fixture:terrain-work-budget
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

The connector environment provided repository source and commit inspection, not a checked-out browser/GPU runtime.

## Missing causal proof

```txt
correctAirstreamId is not enforced by delivery progress
no test rejects arrival through the Sunvale or Cloudmere route
no test rejects ambient arrival at Brookhaven
no route-entry, dwell, segment or exit journal is tested
no browser R reset is tested
no variable-refresh parity is tested
no telemetry/render/GameHost delivery-frame correlation is tested
no near/horizon seam or measured build-budget test exists
```

## Required proof

```txt
correct-current traversal is necessary and sufficient for delivery
wrong-current and ambient arrivals return explicit rejection results
same command schedule produces the same route and delivery fingerprint at multiple render rates
reset creates a clean mission epoch
one delivery transaction correlates simulation, mail, renderer, HUD, telemetry and GameHost
near and horizon terrain satisfy shared continuity and work-budget policies
all exported proof rows are bounded, detached and JSON-safe
```

## Push state

```txt
repo-local docs pushed to main: yes
central ledger updated: yes
central internal change log added: yes
```