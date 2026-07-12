# Validation: TheOpenAbove

**Last aligned:** `2026-07-12T00-39-05-04-00`

## Scope

Documentation-only audit of balloon profile ownership, async model loading, pattern handoff, model commit and visible-frame provenance through source revision `6b2753b63263c9238952d387214bc7ff91afe83e`.

## Plan ledger

**Goal:** distinguish source-backed construction behavior from executable proof that one immutable profile snapshot produced the installed and rendered balloon.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove` as the oldest eligible documented repository.
- [x] Review root guidance and retained audit state.
- [x] Read startup host, balloon object, envelope profile, shell, pattern and smoke paths.
- [x] Confirm the root default and several nested defaults remain mutable.
- [x] Confirm the public kit global aliases the root default profile.
- [x] Confirm the loader yields before building from the live object.
- [x] Confirm current pattern metadata is passed into shell construction.
- [x] Confirm readback lacks profile identity/fingerprint/frame provenance.
- [x] Reconcile the active source-backed kit count to 59.
- [x] Define pure, browser and Pages fixture requirements.
- [x] Change no runtime source, dependency, script or workflow.
- [x] Create no branch or pull request.

## Source-backed behavior

```txt
envelope shape default is deeply frozen
root balloon default is not frozen
root default contains direct subprofile references
panel and streamer palette arrays are mutable
window exposes the root default profile
loadHotAirBalloonModel yields before build
buildEnvelopeAssembly passes pattern metadata into buildEnvelopePanels
model readback exposes ready/load/resource booleans
```

## Source-backed gaps

```txt
no admission-time deep clone
no complete schema/version
no nested validation/canonicalization
no deep-frozen admitted snapshot
no profile ID/revision/fingerprint
no load command/load generation
no stale or cancelled load rejection
no aggregate model/profile commit receipt
no first visible profile-frame receipt
```

## Existing proof surface

`npm run check` executes `node tests/smoke.mjs`; `npm run build` runs that check before Vite build. Existing checks cover source presence, profile sampling, shell markers, model-load markers, steering source patterns, terrain source patterns and selected pure tests. They do not execute:

```txt
public-profile alias isolation
mutation during the one-frame load yield
schema rejection
canonical fingerprint stability
concurrent or stale load generations
atomic model/profile scene commit
GameHost profile receipt
first visible profile-frame correlation
Pages model/profile parity
```

## Required pure fixtures

```txt
fixture:balloon-profile-schema
fixture:balloon-profile-canonicalization
fixture:balloon-profile-deep-freeze
fixture:balloon-default-alias-isolation
fixture:balloon-profile-fingerprint-stability
fixture:balloon-pattern-included-in-fingerprint
fixture:balloon-invalid-profile-rejection
```

## Required async/browser fixtures

```txt
fixture:balloon-profile-mutation-during-yield
fixture:balloon-overlapping-load-generations
fixture:balloon-stale-load-rejection
fixture:balloon-model-profile-commit-receipt
fixture:balloon-first-visible-profile-frame
fixture:balloon-restart-profile-retirement
fixture:pages-model-profile-parity
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

The connector environment provided repository source and write access, not a checked-out browser runtime. No command execution is claimed.

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

Do not claim deterministic model identity or profile-to-frame provenance until the profile is cloned and admitted before yielding, stale load generations are rejected, the model/profile receipt is committed atomically, and browser/Pages fixtures prove the first visible frame carries the same fingerprint.