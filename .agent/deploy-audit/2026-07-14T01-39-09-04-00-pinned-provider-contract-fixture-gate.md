# Deploy Audit: Pinned Provider Contract Fixture Gate

**Timestamp:** `2026-07-14T01-39-09-04-00`  
**Runtime revision:** `09bb6b95549d9480dfc2caa4517575ab4009ba98`

## Summary

The production source now imports Nexus Engine revision `ea973811...`, but the repository's executable check still uses a fake provider. Source, build, and Pages surfaces therefore do not prove that the pinned CDN module exposes the repaired Core capability contract.

## Plan ledger

**Goal:** require the same provider-contract fingerprint and world-frame result across source, production build, and deployed Pages.

- [x] Inspect package check/build wiring.
- [x] Inspect the fake-provider composition smoke.
- [x] Identify missing source/build/Pages fixtures.
- [x] Define the fixture matrix and promotion gate.
- [ ] Execute the matrix.

## Existing proof

```txt
npm run check
  -> static smoke
  -> world feature/foundation smoke
  -> fake-provider world-domain-composition smoke
  -> terrain and overlay smokes

npm run build
  -> npm run check
  -> vite build
```

The fake-provider smoke verifies product call order, `childDomains:false`, one registration, and missing-API rejection. It does not import the pinned provider or execute DSK validation and installation.

## Required fixture matrix

| Surface | Required evidence |
|---|---|
| Node real-provider | Import immutable provider, inspect real kit metadata/tokens/install behavior, compose and retire candidate |
| Source browser | Load source route, capture provider revision and contract fingerprint, reach first matching frame |
| Production build | Build, serve exact output, repeat contract and frame assertions |
| GitHub Pages | Load deployed URL, verify immutable provider URL, contract readback, world feature and first frame |
| Failure | Missing export, wrong path, unsatisfied dependency, duplicate provider, alias failure, feature conflict, frame timeout |

## Required artifacts

```txt
provider-manifest.json
provider-contract-fingerprint.json
world-domain-composition-result.json
feature-set-registration-result.json
first-provider-contract-world-frame.json
browser-console.json
source-build-pages-parity.json
```

## Promotion gate

A provider pin is accepted only when:

```txt
source provider revision == build provider revision == Pages provider revision
source contract fingerprint == build fingerprint == Pages fingerprint
all mandatory capability owners are unique
all install aliases are correct
feature-set fingerprint matches
first visible frame cites the accepted revisions
all predecessor resources retire after a failed candidate
```

## Current validation state

```txt
combined commit statuses: none
npm run check: not run
npm run build: not run
headless world check: not run
Node real-provider fixture: unavailable
source browser fixture: not run
build browser fixture: not run
Pages fixture: not run
local clone attempt: blocked by DNS resolution failure in the execution environment
```

No deployment-parity or production-readiness claim is made.