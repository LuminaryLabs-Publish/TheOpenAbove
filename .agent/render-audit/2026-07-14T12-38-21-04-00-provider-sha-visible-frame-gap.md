# Render Audit: Provider SHA to Visible Frame Gap

## Goal

Prove that the NexusEngine revision reported by the browser is the provider whose bytes produced the admitted Air Mail frame.

## Current path

```txt
workflow computes .nexus-engine HEAD
  -> Vite embeds the SHA string
  -> Vite aliases @nexus-engine to the checkout entry
  -> browser publishes GameHost.nexusEngineSha
  -> renderer produces frames
```

## Gap

The path is structurally aligned, but no evidence object binds:

```txt
product revision
provider revision
provider entry content hash
bundle content hash
GameHost identity snapshot
renderer generation
frame ID
captured image or pixel evidence
```

`GameHost.nexusEngineSha` is a compile-time label. A browser fixture does not assert it, compare it to a manifest, or acknowledge a frame produced after Core World composition.

## Required proof

```txt
BuildIdentityManifest
  productSha
  providerSha
  providerEntrySha256
  bundleFileHashes
  buildPolicyRevision

FirstBuildIdentityFrameAck
  manifestId
  gameHostIdentityFingerprint
  rendererGeneration
  frameId
  worldGenerationRevision
  airMailRevision
  imageHash
```

## Do not claim

Do not claim browser/provider identity, deployed-frame identity, bundle provenance or visual parity from the presence of `GameHost.nexusEngineSha` alone.