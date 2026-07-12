# Architecture Audit: Balloon Model Assembly Authority DSK Map

**Timestamp:** `2026-07-11T22-51-09-04-00`

## Plan ledger

**Goal:** define the domain boundary that owns balloon profile admission, assembly, loading, scene commit, resource retirement and frame provenance.

- [x] Map current model producers and consumers.
- [x] Identify existing owner boundaries.
- [x] Define the missing parent authority.
- [x] Define planned kits and invariants.
- [ ] Implement the domain.

## Current composition

```txt
hot-air-balloon-object-kit
  -> panel profile acts as envelope-shape input
  -> envelope-profile-kit samples shape
  -> envelope-panel-kit creates shell and crown
  -> streamer-fit-kit supplies color pattern
  -> fabric-seam-kit creates profile-fitted load tapes
  -> mouth-kit clamps mouth to profile radius
  -> basket-kit builds independent gondola geometry
  -> rigging-kit builds independent frame and anchors
  -> burner-kit builds twin burners
  -> rope-kit owns persistent dynamic geometry
```

## Missing authority

```txt
no root descriptor identity or schema
no canonical profile revision or fingerprint
no semantic cross-component admission
no detached build-plan result
no load cancellation or rollback
no complete geometry/material/resource inventory
no terminal disposal contract
no scene-commit revision
no model-to-frame acknowledgement
```

## Parent domain

```txt
open-above-balloon-model-assembly-authority-domain
```

## Planned DSKs

```txt
open-above-balloon-model-assembly-authority-domain
open-above-balloon-model-descriptor-kit
open-above-balloon-model-schema-kit
open-above-balloon-model-id-kit
open-above-balloon-model-version-kit
open-above-balloon-profile-canonicalization-kit
open-above-balloon-profile-admission-kit
open-above-balloon-profile-deep-freeze-kit
open-above-balloon-profile-fingerprint-kit
open-above-balloon-attachment-contract-kit
open-above-balloon-build-plan-kit
open-above-balloon-load-command-kit
open-above-balloon-load-cancellation-kit
open-above-balloon-resource-lease-kit
open-above-balloon-resource-inventory-kit
open-above-balloon-ready-commit-kit
open-above-balloon-load-result-kit
open-above-balloon-disposal-result-kit
open-above-balloon-model-observation-kit
open-above-balloon-frame-ack-kit
open-above-balloon-custom-profile-parity-fixture-kit
open-above-balloon-initial-setup-load-fixture-kit
open-above-balloon-resource-retirement-fixture-kit
open-above-browser-balloon-frame-smoke-kit
```

## Invariants

```txt
one admitted profile revision drives all model consumers
all attachment points are finite, compatible and derived from admitted inputs
model loading commits atomically or leaves the predecessor authoritative
cancelled or stale loads mutate no live scene
every geometry, material and texture has one lease owner
modelReady is derived from a committed result, never a Boolean hint
the first visible frame cites modelId, profileFingerprint and resourceFingerprint
disposal is idempotent and retires every owned resource exactly once
```
