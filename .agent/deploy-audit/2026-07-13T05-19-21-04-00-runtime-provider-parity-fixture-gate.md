# Deploy Audit: Runtime Provider Parity Fixture Gate

**Timestamp:** `2026-07-13T05-19-21-04-00`

## Summary

The Pages workflow checks out NexusEngine `main` for headless proof, while the browser source imports NexusEngine `@main` from jsDelivr. There is no immutable revision shared by the checkout, built artifact, deployed page and later browser session.

## Current deployment path

```txt
checkout TheOpenAbove main
checkout NexusEngine main into .nexus-engine
run headless status, inspect, renderer, check and build
run Vite production build
upload dist
publish Pages
browser resolves CDN NexusEngine @main at page load
```

## Missing deployment evidence

```txt
provider manifest included in artifact
exact NexusEngine commit shared by headless and browser
Three.js content fingerprint
NexusEngine content fingerprint
built-artifact provider URL inspection
provider API-contract fixture
offline/provider-failure visible shell fixture
Pages provider receipt
source/build/Pages provider parity result
```

## Required gate

```txt
resolve immutable provider manifest
  -> checkout exact NexusEngine commit
  -> validate headless against that commit
  -> build browser artifact against the same identity
  -> inspect dist for exact provider references
  -> deploy
  -> load Pages
  -> read provider-set receipt
  -> compare manifest, build and runtime identities
  -> acknowledge first provider-backed frame
```

## Required CI fixtures

```txt
manifest-schema-valid
no-mutable-production-provider-ref
headless-browser-engine-revision-equal
provider-fingerprint-stable
required-exports-present
provider-independent-error-shell-works
built-artifact-provider-reference-exact
Pages-provider-receipt-matches-manifest
first-visible-frame-cites-provider-generation
```

## Validation boundary

The workflow was inspected only. No Actions run, build, dist inspection or Pages smoke was executed.