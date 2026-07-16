# Next Steps: TheOpenAbove Validation Finding Severity and Release Gate

**Last aligned:** `2026-07-16T13-39-49-04-00`  
**Status:** `validation-finding-severity-release-gate-authority-audited`

## Summary

Keep the seven-suite runner and annotations, but remove release severity inference from generic assertion text. Failed findings should block unless they resolve to explicit, active drift or waiver records.

## Intent

Create one fail-closed validation authority from suite execution through Vite artifact and deployed-frame evidence.

## What needs to happen

### Gate 1: Suite and finding identity

- [ ] Register every required suite with ID, purpose, owner, version and required release tier.
- [ ] Give every expected assertion a stable finding ID.
- [ ] Emit structured JSON results in addition to human-readable output.
- [ ] Record source location and evidence digest.

### Gate 2: Severity policy

- [ ] Classify findings as informational, expected drift, blocking invariant, infrastructure failure or unknown.
- [ ] Make unknown and infrastructure failures blocking.
- [ ] Remove direct severity decisions from the broad assertion regex.
- [ ] Allow regex only as evidence parsing support.

### Gate 3: Drift and waiver admission

- [ ] Add an explicit expected-drift registry.
- [ ] Require owner, rationale, scope, introduction date and expiry.
- [ ] Add immutable, narrow release waivers with compensating evidence.
- [ ] Reject expired, superseded, scope-mismatched or evidence-mismatched records.

### Gate 4: Build and release result

- [ ] Publish `ValidationSuiteResult` for every required suite.
- [ ] Publish one `ReleaseValidationResult` for the exact source and provider revisions.
- [ ] Require the accepted result before Vite build admission.
- [ ] Embed result ID and digest in the artifact.
- [ ] Record the artifact/result pair in Pages deployment provenance.

### Gate 5: First-frame proof

- [ ] Expose release validation identity through GameHost diagnostics.
- [ ] Require browser startup to match source, provider, artifact and validation revisions.
- [ ] Publish `FirstValidatedReleaseFrameAck` after the first stable frame.

### Gate 6: Fixture matrix

- [ ] Prove a passing suite remains informational.
- [ ] Prove an unknown assertion blocks.
- [ ] Prove an active expected drift remains non-blocking and visible.
- [ ] Prove an expired drift blocks.
- [ ] Mutate weather layer count/floors and confirm blocking.
- [ ] Mutate route protection and confirm blocking.
- [ ] Remove a required runtime file and confirm blocking.
- [ ] Trigger syntax/import/process failures and confirm infrastructure blocking.
- [ ] Run `npm run check` and `npm run build`.
- [ ] Compare source, artifact and deployed Pages identities.

## Recommended file cut

```txt
src/validation/
  validation-finding-severity-release-gate-authority-domain.mjs
  validation-suite-registry-kit.mjs
  validation-finding-schema-kit.mjs
  assertion-severity-classifier-kit.mjs
  expected-contract-drift-registry-kit.mjs
  validation-waiver-kit.mjs
  validation-suite-result-kit.mjs
  release-validation-result-kit.mjs
  build-validation-gate-kit.mjs
  artifact-validation-binding-kit.mjs
  pages-validation-binding-kit.mjs

tests/
  validation-policy-fixture.mjs
  validation-false-warning-regression.mjs
```

## Compatibility constraints

Preserve all seven existing suites, GitHub annotations, Vite build, Pages deployment, Nexus Engine provider checkout, layered weather implementation, balloon gameplay, world generation and visual output.

## Retained next steps

Weather-clock ownership, map/pause policy and matching weather-frame proof remain the immediately preceding unresolved audit family. Other retained lifecycle, renderer, audio, input, world and deployment gaps remain open.

## Do not claim

Do not claim safe warning classification, release-gate correctness, artifact parity, Pages parity or production readiness until the fixture matrix passes.