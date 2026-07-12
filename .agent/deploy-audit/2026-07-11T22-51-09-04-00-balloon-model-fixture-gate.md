# Deploy Audit: Balloon Model Fixture Gate

**Timestamp:** `2026-07-11T22-51-09-04-00`

## Plan ledger

**Goal:** make model-profile parity, initial-setup loading and resource retirement executable deployment gates.

- [x] Review current package scripts and smoke checks.
- [x] Identify new balloon files and behaviors not executed by tests.
- [x] Define pure, browser and Pages fixtures.
- [ ] Implement and run the gates.

## Existing gate

```txt
npm run check
  -> node tests/smoke.mjs
npm run build
  -> npm run check
  -> vite build
```

The smoke test uses source-pattern assertions. It does not execute the new profile sampler, custom model composition, initial-setup load, cancellation, replacement, resource disposal or first-visible-frame correlation.

## Required pure fixtures

```txt
fixture:balloon-profile-schema
fixture:balloon-profile-canonicalization
fixture:balloon-profile-fingerprint
fixture:balloon-custom-envelope-parity
fixture:balloon-attachment-parity
fixture:balloon-finite-geometry
fixture:balloon-resource-inventory
```

## Required browser fixtures

```txt
fixture:balloon-initial-setup-load
fixture:balloon-load-cancellation
fixture:balloon-stale-load-rejection
fixture:balloon-replacement-retirement
fixture:balloon-rope-buffer-persistence
fixture:balloon-first-visible-frame
fixture:pages-balloon-model-parity
```

## Completion gate

Do not claim level-setup loading or persistent-resource correctness until the production route uses the load authority and a browser fixture proves one committed model, one resource inventory and one visible-frame acknowledgement.
