# Architecture Audit: Validation Finding Severity DSK Map

**Timestamp:** `2026-07-16T13-39-49-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

## Summary

The product has a new validation orchestration surface but no domain-level contract that decides which failed assertions are expected drift and which are release-blocking invariants.

## Intent

Separate subprocess execution, finding classification, waiver admission, build eligibility and release evidence into explicit semantic owners.

## Current architecture

```txt
package.json
  -> npm run check
  -> tests/run-tiered-checks.mjs
       -> spawn seven independent suites
       -> infer INFO/WARNING/ERROR from exit status and output regex
       -> emit GitHub annotations
       -> return zero when only warnings exist
  -> npm run build
       -> Vite artifact
       -> Pages deployment path
```

## Current domains

```txt
product simulation and gameplay
Core World, Weather and Layered Weather
Three.js and HDR presentation
Node test-suite execution
GitHub annotation projection
Vite build admission
Pages artifact publication
repo-local and central audit tracking
```

## Ownership gap

```txt
subprocess execution owner: tiered runner
finding severity owner: implicit regex
expected drift owner: absent
blocking invariant owner: absent
waiver owner: absent
unknown-failure policy: absent
build eligibility result owner: absent
artifact validation identity owner: absent
deployed validation identity owner: absent
```

## Required parent domain

`open-above-validation-finding-severity-release-gate-authority-domain`

## DSK breakdown

```txt
open-above-validation-finding-severity-release-gate-authority-domain
├─ validation-suite-registry-kit
│  ├─ suite ID
│  ├─ purpose
│  ├─ owner
│  ├─ required release tier
│  └─ expected result schema
├─ validation-finding-schema-kit
│  ├─ stable finding ID
│  ├─ assertion or infrastructure class
│  ├─ evidence digest
│  └─ source location
├─ assertion-severity-classifier-kit
│  ├─ informational
│  ├─ expected-contract-drift
│  ├─ blocking-invariant-failure
│  ├─ infrastructure-failure
│  └─ unknown
├─ expected-contract-drift-registry-kit
│  ├─ explicit drift ID
│  ├─ affected suite/finding
│  ├─ owner
│  ├─ rationale
│  └─ expiry
├─ validation-waiver-kit
│  ├─ admission
│  ├─ scope
│  ├─ expiry
│  ├─ supersession
│  └─ audit receipt
├─ validation-suite-command/result kits
│  ├─ command identity
│  ├─ process evidence
│  ├─ structured findings
│  └─ terminal result
├─ release-validation-command/result kits
│  ├─ aggregate required suites
│  ├─ fail closed on unknowns
│  ├─ apply valid waivers
│  └─ publish release eligibility
├─ build-validation-gate-kit
├─ artifact-validation-binding-kit
├─ pages-validation-binding-kit
└─ first-validated-release-frame-ack-kit
```

## Required rule

A non-zero result is blocking unless a stable finding ID resolves to an explicit non-expired expected-drift record or waiver. Output text alone cannot downgrade severity.

## Checklist

- [x] Map current subprocess and build path.
- [x] Identify implicit severity ownership.
- [x] Separate proposed domain responsibilities.
- [x] Preserve the seven existing suites.
- [ ] Implement structured result emission.
- [ ] Bind accepted validation to artifact and Pages provenance.