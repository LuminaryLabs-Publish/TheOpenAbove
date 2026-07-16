# Known Gaps: TheOpenAbove Validation Finding Severity and Release Gate

**Last aligned:** `2026-07-16T13-39-49-04-00`  
**Status:** `validation-finding-severity-release-gate-authority-audited`

## Summary

The tiered runner improves diagnostic visibility, but it treats generic assertion-shaped failures as non-blocking without explicit product-impact classification. Release eligibility is therefore not bound to stable finding, drift, waiver or artifact identities.

## Intent

Keep the current warning mechanism visibly provisional until failed assertions are classified by a typed, fail-closed policy.

## What needs to happen

### Identity gaps

```txt
stable suite registry: absent
suite purpose/version identity: absent
stable finding IDs: absent
finding evidence digest: absent
policy revision identity: absent
```

### Severity gaps

```txt
assertion exception class used as severity signal: present
suite-specific severity rules: absent
blocking product-invariant class: absent
infrastructure-failure class: implicit only
unknown failure class: absent
unknown non-zero fail-closed rule: absent
```

### Drift and waiver gaps

```txt
expected-drift registry: absent
drift owner and rationale: absent
drift scope and expiry: absent
replacement assertion plan: absent
validation waiver record: absent
waiver approval and compensating evidence: absent
```

### Build and deployment gaps

```txt
machine-readable ValidationSuiteResult: absent
ReleaseValidationResult: absent
build requires accepted result identity: absent
artifact embeds validation digest: absent
Pages deployment binds validation identity: absent
browser exposes matching validation identity: absent
FirstValidatedReleaseFrameAck: absent
```

### Proof gaps

```txt
unknown assertion blocking fixture: absent
approved drift fixture: absent
expired drift fixture: absent
weather invariant mutation fixture: absent
route-protection mutation fixture: absent
required-file mutation fixture: absent
syntax/import/process failure fixture: absent
artifact and Pages identity fixture: absent
```

## Current risk boundary

The runner can report an assertion warning and return success. This does not prove an invalid release exists; it proves that build eligibility currently lacks enough semantic evidence to distinguish accepted drift from failed invariants.

## Retained product gaps

Weather simulation-clock ownership, explicit map/pause policy, weather-frame convergence, page lifecycle, WebGL recovery, audio, controls, fixed-step pacing, HDR/depth coherence, cloud composite proof, delivery eligibility, provider/build identity, route retirement, terrain/flora proof, Air Mail history and persistence remain unresolved.

## Do not claim

Do not claim safe warning classification, fail-closed validation, accepted drift governance, release provenance, artifact parity, Pages parity or production readiness until the authority and fixtures are implemented.