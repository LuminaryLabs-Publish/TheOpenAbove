# Architecture Audit: Runtime Module Provider Admission DSK

**Timestamp:** `2026-07-13T05-19-21-04-00`

## Summary

The browser provider graph is currently an implementation detail of static ESM imports rather than an admitted domain result. The required parent authority must own provider identity, compatibility, provider-set generation, terminal results and browser/headless parity before any gameplay or rendering owner is created.

## Current composition

```txt
index.html
  -> import-map adapter
  -> src/main.js
     -> direct Three.js CDN provider
     -> mutable NexusEngine @main CDN provider
     -> runtime composer
        -> visual/world
        -> balloon/airstream/mail
        -> telemetry
        -> GameHost

Pages build
  -> checkout app main
  -> checkout NexusEngine main separately
  -> headless validation
  -> Vite build
  -> deployed browser resolves CDN providers later
```

## Missing parent domain

```txt
open-above-runtime-module-provider-admission-authority-domain
```

## Required bounded subdomains

```txt
provider manifest
  immutable provider IDs, exact source revisions, expected fingerprints and required exports

provider resolution
  source selection, fetch/import attempt identity, timeout and retry policy

provider verification
  integrity/fingerprint, MIME/module shape, export and API-contract checks

provider-set admission
  expected predecessor, atomic provider-set generation and typed terminal result

provider parity
  browser, headless, build and Pages revision comparison

provider projection
  telemetry, GameHost, failure UI and first-visible-frame receipts
```

## Required command/result contract

```txt
AdmitRuntimeProvidersCommand {
  commandId,
  runtimeSessionId,
  expectedProviderGeneration,
  manifestId,
  manifestRevision
}

RuntimeProviderAdmissionResult {
  commandId,
  status: accepted | rejected | fallback-selected,
  providerGeneration,
  providers[],
  compatibilityResults[],
  parityResult,
  failure,
  committedAt
}
```

## DSK rules

```txt
no mutable branch name is an accepted production identity
no provider is exposed before the provider set commits
no gameplay owner starts from a partially admitted provider set
no failure UI depends on a provider whose failure it reports
no headless/browser parity claim lacks exact revision evidence
no first visible frame lacks provider-generation provenance
```

## Planned kits

```txt
open-above-runtime-module-provider-admission-authority-domain
open-above-runtime-provider-manifest-kit
open-above-provider-source-identity-kit
open-above-provider-resolution-command-kit
open-above-provider-fetch-adapter-kit
open-above-provider-content-fingerprint-kit
open-above-provider-integrity-verification-kit
open-above-provider-api-contract-kit
open-above-provider-version-compatibility-kit
open-above-provider-set-generation-kit
open-above-provider-admission-result-kit
open-above-provider-failure-projection-kit
open-above-browser-headless-provider-parity-kit
open-above-provider-telemetry-receipt-kit
open-above-first-provider-frame-ack-kit
open-above-provider-fixture-gate-kit
```

## Non-claim

This audit defines an architectural boundary only. No provider loader, manifest, integrity check, compatibility probe or fallback was implemented.