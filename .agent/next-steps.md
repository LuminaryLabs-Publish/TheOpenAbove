# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-10T19-58-34-04-00`

## Plan ledger

### Goal

Make runtime boot reproducible by declaring immutable remote sources, validating the APIs consumed by the route, returning one typed admission result, and proving failure behavior before a runtime session is allocated.

### Checklist

- [ ] Add a versioned runtime source manifest.
- [ ] Replace the NexusEngine `@main` URL with an immutable commit SHA or release tag.
- [ ] Keep Three.js pinned to an exact version.
- [ ] Reject mutable required sources in production manifests.
- [ ] Define required and optional NexusEngine telemetry capabilities.
- [ ] Define the Three.js capabilities consumed by active visual kits.
- [ ] Add typed source, capability, admission, and boot-result contracts.
- [ ] Add a local bootstrap entry that can project loading and dependency failures.
- [ ] Resolve declared modules before runtime construction.
- [ ] Record requested and resolved source coordinates.
- [ ] Run capability preflight before listener, renderer, or frame creation.
- [ ] Classify accepted, degraded, rejected, unavailable, incompatible, and construction-failed results.
- [ ] Allocate no runtime session for rejected admission.
- [ ] Pass accepted modules into the runtime composer.
- [ ] Hand the accepted result to the planned session-generation authority.
- [ ] Register disposers as construction proceeds and roll back partial startup in reverse order.
- [ ] Add deterministic manifest and source fingerprints.
- [ ] Add bounded JSON-safe source, capability, boot, and failure journals.
- [ ] Add `GameHost.source` and `GameHost.boot` readback additively.
- [ ] Preserve existing active GameHost fields.
- [ ] Add a DOM-light runtime-admission fixture.
- [ ] Prove exact-version Three.js acceptance.
- [ ] Prove immutable NexusEngine acceptance.
- [ ] Prove mutable NexusEngine branch rejection under production policy.
- [ ] Prove missing required capability rejection.
- [ ] Prove optional degradation only when explicitly allowed.
- [ ] Prove rejected admission installs no listeners, frames, or session.
- [ ] Prove construction failure returns one rollback result.
- [ ] Prove fingerprint determinism and browser/fixture proof parity.
- [ ] Add `fixture:runtime-admission` to package scripts.
- [ ] Run the fixture before the existing smoke suite.
- [ ] Expose the summary through headless `project.check`.
- [ ] Run `npm run check`, `npm run headless:check`, and `npm run build`.
- [ ] Run browser and Pages admission smokes.
- [ ] Then implement the existing session-generation and terminal GameHost lifecycle plan.

## Recommended files

```txt
src/bootstrap/open-above-bootstrap.js
src/runtime-admission/runtime-source-manifest.js
src/runtime-admission/immutable-module-locator.js
src/runtime-admission/module-admission.js
src/runtime-admission/runtime-capability-preflight.js
src/runtime-admission/source-fingerprint.js
src/runtime-admission/boot-transaction.js
src/runtime-admission/boot-result-journal.js
src/runtime-admission/gamehost-source-proof.js
scripts/open-above-runtime-admission-fixture.mjs
```

## Required order

```txt
local bootstrap
  -> source manifest
  -> immutable-coordinate policy
  -> module resolution
  -> capability preflight
  -> admission result
  -> accepted boot transaction or rejected terminal proof
  -> sessionId/generation handoff
```

## Fixture rows

```txt
valid pinned sources accepted
mutable required source rejected
required source unavailable
required capability missing
optional capability degraded by policy
rejected boot owns zero listeners and frames
accepted boot creates one session handoff
construction failure produces rollback result
fingerprint deterministic
headless and browser proof shapes match
```

## Avoid until proof exists

```txt
renderer replacement
terrain, cloud, water, grass, lighting or postprocess rewrite
camera or simulation retuning
balloon visual changes
new route content
session lifecycle work that still depends on a mutable NexusEngine source
```

## Next safe ledge

```txt
TheOpenAbove Immutable Runtime Admission + Boot Capability Fixture Gate
```