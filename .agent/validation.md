# Validation: TheOpenAbove

**Last aligned:** `2026-07-11T09-21-50-04-00`

## Scope

Documentation-only audit of the active product-source boundary. This pass inspected repository rules, public documentation, package metadata, legacy campaign data, runtime composition, balloon controls, Air Mail route/domain code and existing smoke coverage. It changed no runtime source or deployment configuration.

## Plan ledger

**Goal:** separate source-backed product identity findings from executable proof and record exactly what is and is not validated.

- [x] Review the complete Publish inventory.
- [x] Compare all eligible repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove`.
- [x] Read `AGENTS.md`, `README.md` and `package.json`.
- [x] Read `src/data/campaign.config.js`.
- [x] Read `src/main.js` and the active runtime composition.
- [x] Read balloon simulation input and snapshot behavior.
- [x] Read Air Mail route and domain source.
- [x] Read current smoke assertions.
- [x] Trace mixed mode, objective, control and projection identity.
- [x] Identify all domains, services and kits.
- [x] Define source authority and fixture requirements.
- [x] Change no runtime source, dependency, package script or workflow.
- [x] Create no branch or pull request.
- [x] Push documentation directly to `main`.

## Validation performed

```txt
full Publish inventory reviewed: yes
eligible repositories compared with central ledger: yes
TheCavalryOfRome excluded: yes
selected only TheOpenAbove: yes
AGENTS.md read: yes
README.md read: yes
package.json read: yes
legacy campaign source read: yes
main composition read: yes
balloon input contract read: yes
Air Mail route/domain read: yes
smoke test read: yes
active domains cataloged: yes
active, implied and inactive kits cataloged: yes
kit-family services cataloged: yes
runtime source changed: no
branch created: no
pull request created: no
push target: main
```

## Source-backed findings

The current source establishes:

```txt
README and AGENTS describe Meadow Lift thermals, gates and perch completion
README documents pitch, bank, boost and R restart controls
campaign.config.js declares meadow-lift and cloud-basin
main.js imports legacy CAMPAIGN/WORLD and independently creates Air Mail
snapshot region is meadow-lift while simulation status is mail-flight
mail route declares meadow-mail-run, parcel-001 and Brookhaven
HUD and simulation strings hard-code Brookhaven
runtime controls are burner and vent, not pitch/bank/boost
A/D and R have no active runtime behavior
Shift vent and wheel zoom are active but missing from README controls
no selected mode, supersession result or source fingerprint exists
```

## Existing proof

`npm run check` currently proves:

```txt
required source files exist
main composes visual, airstream and mail domains
balloon simulation contains airstream integration and Brookhaven messaging
airstream/mail pure tests execute
graphical system source patterns exist
headless environment exposes expected routes
```

It does not prove product-mode selection, supersession, control parity, HUD source projection, public documentation parity or committed product-frame identity.

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

## Missing fixture commands

```txt
npm run fixture:product-manifest
npm run fixture:mode-supersession
npm run fixture:control-contract
npm run fixture:hud-source-parity
npm run fixture:documentation-parity
npm run fixture:product-frame-identity
```

## Required fixture evidence

```txt
exactly one product mode is admitted
Air Mail supersession or coexistence with Meadow Lift is explicit
legacy objectives are inactive when Air Mail is selected
runtime controls match public control projections
HUD destination and instructions come from source data
runtime, telemetry, GameHost and headless status share one source fingerprint
same source manifest creates the same initial fingerprint
conflicting sources reject before runtime construction
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
.agent documentation changed: yes
central ledger changed: yes
central internal change log added: yes
```

## Push state

```txt
repo-local docs pushed to main: yes
central ledger updated: yes
central internal change log added: yes
```
