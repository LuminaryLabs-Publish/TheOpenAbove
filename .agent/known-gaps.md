# Known Gaps: TheOpenAbove Grass Seed Module Environment and Publication Authority

**Last aligned:** `2026-07-13T21-58-55-04-00`  
**Status:** `grass-seed-module-environment-publication-authority-audited`

## Summary

The latest guard fixes imports when `window` is absent. Browser imports still perform an uncommanded global write, and no contract proves that source, build and deployed modules remain import-pure or that any explicitly installed compatibility facade is owned and retired safely.

## Plan ledger

**Goal:** keep remaining gaps dependency ordered and tied to executable environment, lifecycle and visible-frame evidence.

- [ ] Pure reusable seed module.
- [ ] Seed API manifest and algorithm revision.
- [ ] Explicit compatibility publication command.
- [ ] Target inspection and collision policy.
- [ ] Publication identity and host-generation ownership.
- [ ] Idempotent installation result.
- [ ] Owned retirement result.
- [ ] Node, browser and worker import-purity fixtures.
- [ ] Source/build/Pages module parity.
- [ ] Seed consumer revision receipts.
- [ ] First matching visible frame acknowledgement.

## Identity gaps

```txt
GrassSeedPublicApiManifest: absent
GrassSeedAlgorithmRevision: absent
CompatibilityPublicationCommand: absent
CompatibilityPublicationId: absent
CompatibilityPublicationResult: absent
CompatibilityRetirementResult: absent
CompatibilityOwnerGeneration: absent
ModuleEnvironmentProofResult: absent
SeedConsumerAdoptionResult: absent
FirstSeedRevisionFrameAck: absent
```

## Import-purity gaps

```txt
browser import mutates window
module does not declare the mutation as a host capability
world-generation imports inherit the visual module side effect
no worker import proof
no synthetic-window zero-mutation proof
no browser zero-mutation proof
```

## Compatibility publication gaps

```txt
no explicit installation API
no API version on global facade
no immutable facade
no namespace inspection
no collision rejection
no same-revision idempotence
no stale-generation rejection
no hot-reload replacement policy
no ownership marker
no safe disposal
```

## Consumer gaps

```txt
world generation seed algorithm revision: absent
grass consumer revision: absent
flower consumer revision: absent
map consumer revision: absent
save and telemetry seed revision: absent
mixed-revision rejection: absent
```

## Test gaps

```txt
tests/grass-field.mjs creates globalThis.window
global mutation is not asserted
explicit installation is not exercised
collision and disposal are not exercised
worker environment is not exercised
built artifact import is not probed
Pages artifact import is not probed
first visible seed revision frame is not exercised
```

## Validation gaps

```txt
npm run check during this audit: not run
npm run build during this audit: not run
headless:world during this audit: not run
browser import-purity fixture: absent
worker import fixture: absent
compatibility lifecycle fixture: absent
source/build/Pages parity fixture: absent
visible consumer fixture: absent
```

## Dependency order

```txt
pure seed ESM
  -> API manifest and revision
  -> explicit compatibility adapter
  -> target/collision policy
  -> installation and retirement results
  -> environment fixtures
  -> source/build/Pages parity
  -> consumer revision correlation
  -> visible-frame acknowledgement
```

## Retained gaps

The prior world-generation public-contract proof gaps remain open and compatible with this audit. The seed API manifest should become one dependency of the broader world-generation public contract rather than a competing authority.

## Do not claim

Do not claim that the environment guard provides import purity, explicit compatibility ownership, collision safety, cleanup, deployed parity or visible seed-consumer convergence.