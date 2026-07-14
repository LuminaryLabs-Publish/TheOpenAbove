# Current Audit: TheOpenAbove Pinned Provider Capability Contract Forwarding

**Last aligned:** `2026-07-14T01-39-09-04-00`  
**Status:** `pinned-provider-capability-contract-forwarding-authority-audited`  
**Runtime revision reviewed:** `09bb6b95549d9480dfc2caa4517575ab4009ba98`  
**Nexus Engine provider:** `ea973811342fe3ba2a35bb018323d987d3fec4b5`

## Summary

Commit `09bb6b95549d9480dfc2caa4517575ab4009ba98` updates the immutable Nexus Engine import to the revision that repairs `createCoreCapabilityKit()` contract forwarding. The provider now preserves domain paths, parent hierarchy, API paths, visibility, dependency tokens, provided tokens, and custom install hooks when creating Core DSKs.

The product still proves composition with a fake provider. It does not execute the pinned module or inspect real kit metadata, generated tokens, dependency resolution, API addressability, install aliases, token ownership, feature-set registration, visual adoption, or first-frame provenance.

## Plan ledger

**Goal:** turn the provider pin into an executable compatibility result that gates Core World composition and the playable world.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude TheCavalryOfRome.
- [x] Select only TheOpenAbove as the sole runtime-ahead repository.
- [x] Inspect the one changed product file and exact upstream commit.
- [x] Inspect the Core capability wrapper, DSK constructor, World Features domain, product boot, test, and package wiring.
- [x] Preserve all 100 active surfaces and services.
- [x] Define the parent authority, result map, and fixture gate.
- [x] Change documentation only.
- [ ] Implement and execute the authority.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9
root .agent states: 9
new eligible repositories: 0
ledger-missing eligible repositories: 0
root-agent-missing eligible repositories: 0
runtime-ahead repositories: 1
selected: LuminaryLabs-Publish/TheOpenAbove
prior documentation head: c06f9a7df59a605ac22619dbefef831d412d619a
reviewed runtime head: 09bb6b95549d9480dfc2caa4517575ab4009ba98
reconciled commits: 1
changed files: src/main.js
```

## Complete interaction loop

```txt
main.js imports immutable Nexus Engine ea973811...
  -> createBalloonTelemetryEngine
  -> define telemetry resources/event/system
  -> compose Core World with childDomains:false
  -> compose World Foundation
  -> compose World Features
  -> compose Landform Features
  -> compose Balloon Telemetry
  -> repaired provider preserves domain hierarchy, requires/provides and install hooks
  -> engine installs canonical engine.n APIs and domain addressability
  -> World Features install publishes engine.worldFeatures alias
  -> product validates engine.n.worldFeatures.registerFeature
  -> authored landforms register
  -> visual domain receives World Features and Foundation APIs
  -> world, terrain, flora, balloon, airstream, mail, camera and presentation initialize
  -> initial update and engine tick
  -> canvas leaves aria-busy
  -> RAF updates flight, world, rendering and telemetry

failure
  -> import, contract, composition, feature, model or visual error throws
  -> boot catches and projects fatal text
  -> no typed provider result, retry, rollback or cleanup receipt

proof
  -> npm run check includes fake-provider composition smoke
  -> fake factories and engine namespace bypass the repaired provider code
```

## Domains in use

```txt
browser ESM, DOM, canvas, error panel, GameHost and RAF
immutable provider identity and capability contract forwarding
Nexus resources, events, systems, runtime kits and DSK construction
Core World root and child policy
World Foundation, World Features and Landform Features
product landform descriptors and foundation bridge
staged world generation, terrain, vegetation, grass and flowers
balloon simulation, telemetry, airstream and Air Mail
balloon object, camera and presentation
map, sky, clouds, water, HDR and lens
provider manifest, contract fingerprint and token ownership
feature registration, visual admission and visible-frame proof
headless, source, build, browser and Pages validation
```

## Kit and service census

```txt
local source-backed kits:          71
runtime-implied adapters:          12
pinned Core World surfaces:        17
current documented active total:  100
inactive or retired legacy:        12
planned provider-contract surfaces: 23
```

The complete kit-by-kit service inventory is recorded in `.agent/trackers/2026-07-14T01-39-09-04-00/project-breakdown.md`.

## Source-backed findings

### The provider pin is correctly targeted

The only product change selects the exact upstream revision whose only change forwards Core capability contract fields into the DSK constructor.

### The repair restores real DSK semantics

`defineDomainServiceKit()` uses these fields for canonical path validation, generated capability tokens, dependency admission, API visibility, overwrite rejection, addressability, and custom post-install behavior.

### World Features depends on the repaired fields

The domain declares `n:world:features`, parent `n:world`, dependency `n:world`, and a custom alias install. TheOpenAbove consumes `engine.n.worldFeatures` and passes it into its visual foundation bridge.

### The current product test cannot regress this bug

The fake test returns plain kit objects and a handcrafted `engine.n.worldFeatures`. It never runs `createCoreCapabilityKit()` or `defineDomainServiceKit()` from the pinned provider.

### Provider identity is static but not observable

The SHA is embedded in an import URL. No runtime result or GameHost readback exposes the provider revision and contract fingerprint.

### Feature and frame adoption remain uncorrelated

Features register sequentially, and rendered frames do not carry provider, composition, registry, foundation, or world-generation revisions.

## Required parent domain

```txt
open-above-pinned-provider-capability-contract-admission-authority-domain
```

## Required transaction

```txt
PinnedProviderCapabilityAdmissionCommand
  -> bind immutable provider revision and host generation
  -> validate exports
  -> instantiate and inspect real Core World domain contracts
  -> verify paths, hierarchy, visibility, requires, provides and install hooks
  -> validate unique token ownership and API addressability
  -> compose a disposable candidate engine
  -> prove canonical and legacy aliases
  -> register and fingerprint the complete feature set
  -> publish ProviderCapabilityContractResult
  -> bind visual bootstrap to accepted revisions
  -> publish FirstProviderContractWorldFrameAck
```

## Validation boundary

Documentation only. The latest product and upstream commits, provider wrapper, DSK constructor, World Features domain, product boot, fake test, package wiring, and empty combined status were inspected. A local clone could not start because the execution environment could not resolve `github.com`. No check, build, headless, browser, or Pages fixture was executed.