# Current Audit: TheOpenAbove Checked-out Provider Build Identity

**Last aligned:** `2026-07-14T12-38-21-04-00`  
**Status:** `checked-out-provider-build-browser-identity-authority-audited`  
**Reviewed pre-audit head:** `0d9ea6f6f977b63d09f22f8ae36107bfccd81811`

## Summary

The latest four commits replace the pinned CDN NexusEngine import with a Vite alias to the workflow checkout, stamp the checkout SHA, expose it through `GameHost`, and replace the fake-provider composition test with a real checked-out-provider contract test. Test and build source now converge, but exact provider admission and browser-frame identity remain unproved.

## Plan ledger

**Goal:** promote same-checkout convergence into immutable, byte-bound, browser-acknowledged build identity.

- [x] Compare the full Publish inventory with central tracking.
- [x] Exclude TheCavalryOfRome.
- [x] Select only TheOpenAbove as the sole current-head mismatch.
- [x] Inspect all four commits and changed files.
- [x] Preserve all gameplay/render domains and update the census to 101 active surfaces.
- [x] Define the provider-build identity parent domain and fixture gates.
- [x] Change documentation only.
- [ ] Implement and execute provider identity admission.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible non-Cavalry repositories: 10
central ledger entries: 10
root .agent states: 10
new or ledger missing: 0
root-agent missing: 0
runtime ahead: 1
selected: LuminaryLabs-Publish/TheOpenAbove
```

## Complete interaction loop

```txt
workflow
  -> checkout product main
  -> checkout NexusEngine main into .nexus-engine
  -> record provider checkout HEAD
  -> run headless and real-provider Node contract checks
  -> Vite aliases @nexus-engine to the same checkout
  -> embed provider SHA string
  -> build, upload and deploy

browser
  -> boot bundled provider and Core World
  -> create balloon, world, airstream, Air Mail, map and renderer
  -> publish GameHost.nexusEngineSha
  -> tick and render
```

## Domains in use

```txt
workflow/event and source checkout
product/provider revision admission
provider entry and dependency fingerprints
Node contract validation
Vite alias, define and bundle admission
artifact and Pages deployment
browser GameHost and renderer-frame identity
Core World, foundation, features and landforms
balloon, airstream and Air Mail gameplay
terrain, flora, atmosphere and HDR presentation
map, input, lifecycle and audit governance
```

## Kit and service census

```txt
local source-backed kits:           71
runtime-implied adapters:           13
Core World surfaces:                17
active documented total:           101
inactive or retired legacy:         13
planned identity authority family:  23
```

The complete kit-by-kit inventory and service map are in the timestamped tracker and `.agent/kit-registry.json`.

## Source-backed findings

### Same-checkout test/build convergence now exists

`tests/world-domain-composition.mjs` imports the real provider from `.nexus-engine/src/index.js`. Vite resolves `@nexus-engine` to the same path.

### The real-provider test is stronger but not a browser test

It validates World Features, World Foundation, the authored `northern-wall`, a compiled-cell contribution, elevation sampling and `engine.tick(0)`. It does not create DOM, WebGL, `GameHost` or a visible frame.

### Provider selection remains mutable

The workflow checks out NexusEngine using `ref: main`. The recorded SHA accurately describes that checkout, but it is observed after mutable selection rather than resolved by an immutable provider policy.

### Product selection remains mutable

The product checkout also uses `ref: main`, so a queued or rerun workflow is not explicitly bound to the event commit.

### Local setup and identity remain ambiguous

Vite and the test require `.nexus-engine`; no checked-in setup/preflight owns that directory. Without `VITE_NEXUS_ENGINE_SHA`, builds expose `local-main`, which is not a unique release identity.

### SHA projection is not byte-bound

No manifest records the provider entry hash, bundle hashes or product revision. No browser fixture compares `GameHost.nexusEngineSha` to accepted artifact evidence or a renderer frame.

### Dependency reproducibility remains open

The workflow runs `npm install`, and no package lock was found.

## Required parent domain

```txt
open-above-checked-out-provider-build-browser-identity-authority-domain
```

## Required transaction

```txt
ProviderBuildIdentityCommand
  -> bind workflow event and exact product revision
  -> resolve provider policy to an exact NexusEngine revision
  -> checkout both immutable revisions
  -> hash provider entry and dependency state
  -> execute real-provider Node contract proof
  -> execute Vite bundle proof from the same checkout
  -> write ProductBuildIdentityManifest into dist
  -> admit matching GameHost identity
  -> acknowledge one matching visible frame
  -> publish ProviderBuildIdentityResult
```

## Validation boundary

Documentation only. Source, diffs and the empty combined-status surface were inspected. No workflow run, local setup, install, test, build, browser, artifact or Pages proof was executed.