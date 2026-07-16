# Validation: TheOpenAbove Finding Severity and Release Gate

**Last aligned:** `2026-07-16T13-39-49-04-00`

## Scope

Documentation-only reconciliation of the full Publish comparison, the two-commit tiered-validation change set, complete interaction/domain/kit/service inventory, assertion severity ownership and required build/deployment proof.

## Summary

Source inspection confirms that `npm run check` launches seven suites through a tiered runner and that `npm run build` requires that check. It also confirms that any non-zero output matching a broad assertion signature is recorded as a warning, while warnings do not make the check fail.

## Intent

Separate verified runner behavior from unimplemented structured severity, drift admission, release aggregation and artifact-bound proof.

## Checklist

- [x] Enumerate all 11 accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and root `.agent` states.
- [x] Identify two runtime-ahead repositories.
- [x] Select TheOpenAbove by the oldest unmatched priority timestamp.
- [x] Compare `9c4a0f42..985fc85b`.
- [x] Inspect `package.json` and `tests/run-tiered-checks.mjs`.
- [x] Inspect representative weather, route and smoke assertions.
- [x] Add and route the timestamped audit family.
- [ ] Execute validation-policy, build, artifact and Pages fixtures.

## Confirmed by inspection

```txt
reviewed pre-audit repository head: 985fc85b5a3a723ab869eaa0c7344850d63130ca
previous central repo-local head: 9c4a0f421484f8e68cb93e491fe0af849422312a
runtime ahead by: 2 commits
changed files: 2
check command uses tiered runner: yes
build depends on check: yes
suite count: 7
subprocess result capture: yes
GitHub notice/warning/error annotations: yes
assertion-shaped non-zero result becomes warning: yes
warnings remain non-blocking: yes
non-assertion errors block: yes
structured finding identity: no
expected-drift registry: no
waiver owner/expiry: no
ReleaseValidationResult: no
artifact/Pages validation binding: no
FirstValidatedReleaseFrameAck: no
```

## Source inspection performed

```txt
LuminaryLabs-Publish organization inventory
LuminaryLabs-Dev/LuminaryLabs Publish ledgers
TheOpenAbove central ledger and root .agent state
compare 9c4a0f42..985fc85b
package.json
tests/run-tiered-checks.mjs
tests/smoke.mjs
tests/layered-weather-integration.mjs
tests/world-route-protection.mjs
prior complete kit/service tracker
```

## What source inspection proves

```txt
the runner orchestrates seven independent Node suites
suite exit status and text are converted into annotations
a broad exception/output regex decides warning treatment
warning-only runs complete without a blocking exit code
npm run build relies on that result
real product invariants are expressed as Node assertions
no typed result identifies accepted drift versus failed invariants
```

## What is not proven

```txt
that a current suite is failing
that an invalid artifact was built or deployed
that any specific warning is unsafe
npm run check success at the final documentation head
Vite build success
artifact or Pages parity
production readiness
```

## Required fixtures

```txt
passing suite -> accepted informational result
known drift + active record -> accepted-with-explicit-drift
unknown assertion -> blocked
expired drift -> blocked
weather layer mutation -> blocked
route-protection mutation -> blocked
required-file mutation -> blocked
syntax/import/process failure -> blocked infrastructure
result identity bound to Vite artifact
artifact/result identity bound to Pages
FirstValidatedReleaseFrameAck
```

## Change scope

```txt
documentation changed: yes
runtime JavaScript changed by audit: no
tests or package scripts changed by audit: no
weather/world/gameplay/rendering changed by audit: no
workflow or deployment changed by audit: no
branch created: no
pull request created: no

npm run check: not run
npm run build: not run
policy mutation fixtures: not run
artifact downloaded: no
Pages origin fetched: no
```

## Claims intentionally withheld

No claim is made for safe warning classification, structured severity correctness, fail-closed release admission, artifact parity, Pages parity or production readiness.