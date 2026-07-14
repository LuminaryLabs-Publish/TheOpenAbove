# Architecture Audit: Checked-out Provider Build Identity DSK Map

## Goal

Bind one exact product revision, one accepted NexusEngine revision, one provider entry fingerprint, one bundle artifact and one browser frame.

## Current composition

```txt
GitHub workflow
  -> product checkout at mutable main
  -> NexusEngine checkout at mutable main
  -> revision stamp in VITE_NEXUS_ENGINE_SHA
  -> real-provider Node contract test
  -> Vite @nexus-engine alias to .nexus-engine/src/index.js
  -> GameHost.nexusEngineSha projection
  -> Pages artifact and deployment
```

## Domain map

```txt
n:open-above:provider-build-identity
  source-event-admission
  product-revision-admission
  provider-policy-resolution
  provider-checkout-admission
  provider-entry-fingerprint
  dependency-state-fingerprint
  node-contract-proof
  vite-bundle-proof
  product-build-identity-manifest
  browser-host-identity-admission
  visible-frame-identity-ack
  artifact-rejection-and-retirement
```

## Required DSK family

```txt
open-above-checked-out-provider-build-browser-identity-authority-domain
open-above-workflow-event-identity-kit
open-above-product-revision-admission-kit
open-above-provider-policy-revision-kit
open-above-provider-revision-resolution-kit
open-above-immutable-product-checkout-kit
open-above-immutable-provider-checkout-kit
open-above-provider-entry-byte-fingerprint-kit
open-above-dependency-state-fingerprint-kit
open-above-local-provider-preflight-kit
open-above-real-provider-node-contract-result-kit
open-above-vite-provider-alias-admission-kit
open-above-bundle-provider-fingerprint-kit
open-above-product-build-identity-manifest-kit
open-above-gamehost-build-identity-kit
open-above-browser-build-identity-admission-kit
open-above-renderer-frame-build-identity-kit
open-above-first-build-identity-frame-ack-kit
open-above-build-identity-conflict-kit
open-above-build-candidate-retirement-kit
open-above-provider-build-identity-result-kit
open-above-source-build-pages-identity-parity-kit
open-above-provider-build-fault-injection-kit
```

## Current ownership gaps

```txt
provider branch selection: workflow YAML
provider exact SHA: observed after checkout
provider entry bytes: unowned
local checkout setup: unowned
product event-to-checkout equality: unproved
reported SHA-to-bundle equality: unproved
bundle-to-GameHost identity: projected, not admitted
GameHost-to-visible-frame identity: unproved
```

## Service boundary

Existing gameplay/render kits remain unchanged. This parent domain coordinates only source/provider admission, proof, artifact identity and presentation acknowledgement; it does not absorb Core World, balloon, Air Mail, airstream, terrain, flora or renderer ownership.