# Validation: TheOpenAbove

**Last aligned:** `2026-07-11T22-51-09-04-00`

## Scope

Documentation-only audit of the nine balloon-model source commits after the prior repo audit: shared envelope profile, unified shell, integrated pattern, fitted load tapes, mouth, basket, burner frame, twin burners, load cables and retained rope geometry.

## Plan ledger

**Goal:** distinguish source-backed model improvements from executable proof of profile parity, staged loading, resource ownership and visible-frame readiness.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove`.
- [x] Review root guidance and all post-audit balloon source commits.
- [x] Read the active root object, profile, shell, seams, mouth, basket, rigging, burner, rope, main route and smoke checks.
- [x] Confirm the new model improvements.
- [x] Confirm production startup still performs direct synchronous construction.
- [x] Confirm root resource inventory and disposal are absent.
- [x] Define pure, browser and Pages fixtures.
- [x] Change no runtime source, dependency, script or workflow.
- [x] Create no branch or pull request.

## Source-backed behavior

```txt
shared envelope sampler exists
continuous shell and derived normals exist
load tapes and mouth consume the panel envelope profile
tapered basket and twin burner assembly exist
rope geometry is retained and updated in place
root model sets modelReady and persistentGpuResources
load helper yields once and then builds synchronously
main route still calls buildHotAirBalloon directly
root model has no resource inventory or dispose service
```

## Existing proof surface

`npm run check` executes source-pattern checks. It does not execute:

```txt
profile schema or fingerprint
custom envelope/gondola parity
attachment validation
initial-setup load authority
cancellation or stale rejection
resource inventory and retirement
replacement
first-visible-frame model correlation
Pages model parity
```

## Required pure fixtures

```txt
fixture:balloon-profile-schema
fixture:balloon-profile-canonicalization
fixture:balloon-profile-fingerprint
fixture:balloon-custom-envelope-parity
fixture:balloon-custom-gondola-parity
fixture:balloon-attachment-validation
fixture:balloon-finite-geometry
fixture:balloon-resource-inventory
```

## Required browser fixtures

```txt
fixture:balloon-initial-setup-load
fixture:balloon-load-cancellation
fixture:balloon-stale-load-rejection
fixture:balloon-replacement-retirement
fixture:balloon-double-dispose
fixture:balloon-rope-update-after-retirement
fixture:balloon-first-visible-frame
fixture:pages-balloon-model-parity
```

## Commands not run

```txt
npm install
npm run check
npm run headless:check
npm run build
browser smoke
Pages smoke
```

The connector environment provides repository source and write access, not a checked-out browser runtime. No command execution is claimed.

## Change-state validation

```txt
runtime JavaScript changed: no
package scripts changed: no
dependencies changed: no
gameplay changed: no
render behavior changed: no
deployment workflow changed: no
branch created: no
pull request created: no
.agent documentation changed: yes
```

## Completion boundary

Do not claim initial-level model loading or persistent-resource correctness until production startup consumes the load authority and custom-profile, cancellation, retirement and first-visible-frame fixtures all pass.
