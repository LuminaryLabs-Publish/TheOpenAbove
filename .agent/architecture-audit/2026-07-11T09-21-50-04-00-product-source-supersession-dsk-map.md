# Architecture Audit: Product Source Supersession DSK Map

**Timestamp:** `2026-07-11T09-21-50-04-00`

## Goal

Define one parent domain that owns the selected product mode and projects one consistent identity into runtime construction, commands, HUD, snapshots, tests and documentation.

## Current split

```txt
legacy campaign source
  -> the-open-above / meadow-lift / cloud-basin
  -> thermals, wind gates, return perch, time limit
  -> bird/free-flight world and controls

active Air Mail source
  -> meadow-mail-run
  -> parcel-001
  -> Brookhaven
  -> meadow-to-brookhaven
  -> balloon burner/vent routing

runtime composition
  -> imports both
  -> uses WORLD for visuals
  -> uses CAMPAIGN only for legacy region label
  -> independently creates default Air Mail route
```

## Missing parent domain

```txt
open-above-product-source-authority-domain
```

### Proposed composition

```txt
open-above-product-manifest-kit
open-above-mode-supersession-kit
open-above-runtime-source-selection-kit
open-above-control-contract-kit
open-above-objective-source-adapter-kit
open-above-product-identity-fingerprint-kit
open-above-source-admission-result-kit
open-above-hud-content-projection-kit
open-above-documentation-projection-kit
open-above-headless-source-observation-kit
open-above-source-parity-fixture-kit
```

## Required source contract

```txt
productId
productVersion
modeId
modeVersion
modeKind
supersedesModeIds
migrationPolicy
runtimeModuleGraphFingerprint
worldSourceRevision
objectiveSourceRevision
controlContractRevision
routeSourceRevision
initialStateFingerprint
publicCopyRevision
```

## Required admission flow

```txt
load product manifest
  -> validate mode and supersession graph
  -> resolve one active mode
  -> validate required source modules and capabilities
  -> validate controls against runtime command adapters
  -> validate HUD/documentation projection inputs
  -> create immutable source identity
  -> return accepted or rejected admission result
  -> construct runtime only from accepted source
```

## Domain map

### Product identity domain

Owns product, version, selected mode, supersession graph and source fingerprints.

### Objective domain

Owns one objective model. Meadow Lift objectives cannot remain implicitly active when Air Mail is selected.

### Control domain

Owns canonical command names, default bindings and supported aliases. Public controls and runtime adapters must project from this contract.

### Runtime composition domain

Owns which gameplay, visual and presentation kits are admitted for the selected mode.

### Projection domain

Owns HUD, GameHost, telemetry, headless status and public documentation data from the same accepted source.

## Invariants

```txt
one runtime session has exactly one selected mode
legacy mode data cannot label an Air Mail session unless explicitly migrated
HUD copy contains no destination literals outside source projections
README/AGENTS control tables match the accepted control contract
snapshot productId/modeId/objectiveId/routeId belong to one manifest revision
source identity is immutable for the session
```

## Implementation order

```txt
manifest schema
  -> supersession policy
  -> source selector
  -> control contract
  -> objective adapter
  -> immutable source identity
  -> runtime admission result
  -> HUD/GameHost/headless projections
  -> generated documentation projection
  -> parity fixtures
```
