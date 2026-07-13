# Proof System Audit: Public Facade, Source, Build and Pages Contract

**Timestamp:** `2026-07-13T18-59-14-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

## Summary

The latest repair is an appropriate local test fix, but it shows why proof layers need explicit roles. Internal source checks should diagnose repository shape. The public facade should define API. Behavioral fixtures should prove semantics. Build and Pages fixtures should prove artifact parity.

## Plan ledger

**Goal:** assign each proof layer one bounded responsibility and combine them into one reproducible terminal result.

- [x] Inspect current proof layers.
- [x] Identify overlap and missing evidence.
- [x] Define canonical and diagnostic roles.
- [x] Define proof fingerprint inputs.
- [ ] Implement source/build/deployed execution.

## Proof layers

### Structural diagnostics

```txt
required files exist
expected source modules are present
forbidden legacy markers are absent
internal dependency graph is explainable
```

Structural diagnostics must not define API compatibility.

### Public API proof

```txt
import world-generation-kit.js
read WorldGenerationPublicContractManifest
verify public constants, phases, IDs and factory
compare manifest revision and fingerprint
```

### Behavioral proof

```txt
determinism
fallback and staged lifecycle
height/moisture/temperature/fertility sampling
biome/flora/map behavior
route/town/lake protection
atomic replacement, reset and disposal
```

### Integration proof

```txt
pinned Core World feature/foundation
terrain and horizon consumers
vegetation, grass and flowers
map and collision-height consumers
Air Mail compatibility
```

### Artifact proof

```txt
Vite production artifact revision
built public manifest and behavior
GitHub Pages artifact identity
deployed public manifest and selected behavior
```

### Visible proof

```txt
frame cites contract, base, foundation and consumer revisions
terrain/map/collision readback agrees
FirstContractRevisionFrameAck is published
```

## Fingerprint inputs

```txt
public export names
constant values
generation phases
descriptor schema
sampling semantics version
staged lifecycle version
required consumer set
repository and artifact revisions
```

## Current gap statement

Commit `b30ff05719d659c42fbad5cbbde6b8fd72848229` updates a structural source path. It does not alter runtime behavior and should not require a public contract revision. The absence of a manifest prevents the test system from expressing that distinction directly.
