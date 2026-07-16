# Current Audit: TheOpenAbove Validation Finding Severity and Release Gate

**Last aligned:** `2026-07-16T13-39-49-04-00`  
**Status:** `validation-finding-severity-release-gate-authority-audited`  
**Previous central repo-local head:** `9c4a0f421484f8e68cb93e491fe0af849422312a`  
**Reviewed pre-audit repository head:** `985fc85b5a3a723ab869eaa0c7344850d63130ca`

## Summary

The new tiered runner executes seven suites and emits INFO, WARNING or ERROR annotations. Any non-zero suite output matching a broad assertion signature becomes a warning, and warnings do not block the build. The current policy cannot prove whether the failed assertion is harmless contract drift or a real product invariant failure.

## Intent

Make validation severity a typed authority and bind accepted results to the source, provider, Vite artifact, Pages deployment and first stable rendered frame.

## What needs to happen

```txt
ValidationSuiteCommand
  -> run one registered suite
  -> publish structured findings

ValidationFindingAdmissionCommand
  -> resolve stable finding identity
  -> classify impact
  -> apply explicit active drift/waiver policy
  -> fail closed on unknowns

ReleaseValidationCommand
  -> aggregate required suites
  -> publish accepted, accepted-with-explicit-drift or blocked
  -> bind accepted result to artifact and Pages release
```

## Checklist

- [x] Compare the full Publish inventory and central coverage.
- [x] Select one priority repository only.
- [x] Inspect package and runner changes.
- [x] Inspect representative weather, route and static assertions.
- [x] Preserve all product domains and 116 active surfaces.
- [x] Define the validation authority and proof boundary.
- [ ] Implement typed findings, drift records and waivers.
- [ ] Execute policy mutation, build and deployment fixtures.

## Interaction loops

```txt
product:
  input -> flight/Air Mail/airstream/weather/world updates -> engine tick -> HDR/map render

validation:
  npm run check -> seven suites -> regex severity inference -> annotations -> process result

release:
  successful check -> Vite build -> artifact -> Pages
```

## Domains in use

```txt
balloon, Air Mail, airstream and telemetry
Core World, Weather, Layered Weather and atmosphere features
world generation, terrain, flora, water and map
Three.js, clouds, HDR, grading and camera
Node suite execution and process evidence
finding severity, drift and waiver policy
build/artifact/Pages admission and first-frame proof
repo-local and central audit tracking
```

## Current finding

```txt
registered suite list: present
subprocess isolation: present
GitHub annotations: present
warning aggregation: present
build depends on check: present

suite-specific severity policy: absent
stable finding IDs: absent
expected-drift registry: absent
waiver owner and expiry: absent
unknown assertion fail-closed rule: absent
ReleaseValidationResult: absent
artifact/Pages validation binding: absent
FirstValidatedReleaseFrameAck: absent
```

## Required parent domain

`open-above-validation-finding-severity-release-gate-authority-domain`

## Boundary

Documentation only. The runner, suites, build and deployment were not modified or executed by this audit.