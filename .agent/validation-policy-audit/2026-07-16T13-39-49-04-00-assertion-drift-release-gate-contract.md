# Validation Policy Audit: Assertion Drift Release Gate Contract

**Timestamp:** `2026-07-16T13-39-49-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

## Summary

`AssertionError` describes how a suite failed, not whether the failure is safe to ship. Release severity must come from an explicit finding policy rather than a generic output signature.

## Intent

Keep known stale assertions non-blocking only when they have stable identity, review ownership, bounded scope and expiry.

## Current policy

```txt
exit 0 -> INFO
non-zero + broad assertion regex -> WARNING
other non-zero -> ERROR
warnings -> do not block
errors -> block
```

## Required severity model

```txt
informational
  -> suite passed or emitted non-failing diagnostics

expected-contract-drift
  -> stable finding ID
  -> explicit drift registry entry
  -> owner and rationale
  -> affected releases/suites
  -> expiry or removal condition
  -> non-blocking only within scope

blocking-invariant-failure
  -> product contract or required fixture failed
  -> always blocks without an admitted waiver

infrastructure-failure
  -> process, dependency, filesystem, environment or runner failed
  -> blocks because product evidence is unavailable

unknown
  -> no valid classifier result
  -> blocks by default
```

## Drift admission contract

```txt
ExpectedContractDriftRecord
  id
  suiteId
  findingId
  expectedEvidencePattern
  owner
  rationale
  introducedAt
  expiresAt
  releaseScope
  replacementAssertionPlan
```

A warning is valid only when the failed finding exactly resolves to an active record. Regex matching may help parse evidence, but cannot decide severity.

## Waiver contract

```txt
ValidationWaiver
  id
  findingId
  owner
  approvedBy
  releaseScope
  rationale
  issuedAt
  expiresAt
  compensatingEvidence
```

Waivers must be immutable, narrow, visible in release output and unable to downgrade infrastructure or unknown failures.

## Required fixture matrix

| Row | Expected result |
|---|---|
| passing suite | informational / accepted |
| known stale source assertion with active drift record | accepted-with-explicit-drift |
| same assertion after drift expiry | blocked |
| assertion with unknown finding ID | blocked |
| five-layer count assertion failure | blocked |
| route-protection assertion failure | blocked |
| required-file assertion failure | blocked |
| syntax/import/process failure | blocked infrastructure |
| changed evidence under reused finding ID | blocked identity mismatch |
| waiver outside release scope | blocked |

## Checklist

- [x] Define severity semantics.
- [x] Define drift and waiver records.
- [x] Define fail-closed defaults.
- [x] Define fixture matrix.
- [ ] Implement stable finding IDs in suites.
- [ ] Remove severity inference from raw exception class.
- [ ] Publish accepted results into build and deployment provenance.