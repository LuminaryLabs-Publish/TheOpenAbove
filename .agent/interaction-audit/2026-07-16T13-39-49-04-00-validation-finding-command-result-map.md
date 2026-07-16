# Interaction Audit: Validation Finding Command and Result Map

**Timestamp:** `2026-07-16T13-39-49-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

## Summary

Validation currently communicates through subprocess status, free-form output and GitHub annotations. There is no stable command/result envelope joining suite identity, findings, policy, waivers, release revision and terminal build eligibility.

## Intent

Turn validation evidence into deterministic commands and typed results rather than inferring release meaning from console text.

## Current interaction

```txt
runner -> spawn suite -> read stdout/stderr/status
runner -> regex output -> INFO/WARNING/ERROR
runner -> emit GitHub annotation
runner -> set process exit code
```

## Required commands

### ValidationSuiteCommand

```txt
commandId
releaseRevision
policyRevision
suiteId
suiteVersion
purpose
requiredTier
attempt
issuedAt
```

### ValidationFindingAdmissionCommand

```txt
commandId
suiteResultId
findingId
findingClass
sourceLocation
evidenceDigest
expectedPolicyRevision
```

### ValidationWaiverAdmissionCommand

```txt
waiverId
findingId
releaseScope
owner
rationale
issuedAt
expiresAt
supersedes
```

### ReleaseValidationCommand

```txt
commandId
releaseRevision
requiredSuiteIds
expectedPolicyRevision
artifactTarget
pagesTarget
```

## Required results

```txt
ValidationSuiteResult
  -> passed | failed | infrastructure-failed
  -> exact findings
  -> process evidence digest

ValidationFindingResult
  -> informational
  -> expected-contract-drift
  -> blocking-invariant-failure
  -> infrastructure-failure
  -> unknown-blocking

ValidationWaiverResult
  -> accepted | rejected | expired | superseded | scope-mismatch

ReleaseValidationResult
  -> accepted | accepted-with-explicit-drift | blocked
  -> exact suite, finding and waiver identities
  -> source, provider and artifact revisions

FirstValidatedReleaseFrameAck
  -> release validation ID
  -> artifact ID
  -> provider revision
  -> first stable frame identity
```

## Rejection rules

```txt
unknown suite -> block
unknown failed finding -> block
finding ID reused with different evidence -> block
expired waiver -> block
waiver scope mismatch -> block
missing required suite -> block
stale policy revision -> block
annotation-only warning without result -> block
```

## Checklist

- [x] Map the existing console interaction.
- [x] Define command and result envelopes.
- [x] Define stale, unknown and waiver rejection rules.
- [ ] Implement machine-readable result emission.
- [ ] Make annotations a projection of accepted results only.
- [ ] Bind release and first-frame receipts.