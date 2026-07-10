# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-10T14-50-38-04-00`

## Plan ledger

### Goal

Add deterministic, bounded, JSON-safe source/input/frame proof around the existing Balloon Drift route without changing visible behavior or removing compatibility fields.

### Full checklist

- [ ] Add canonical product and Balloon Drift route source modules.
- [ ] Classify current, optional, legacy-compatible, ignored, deferred, and missing source fields.
- [ ] Generate one stable source manifest, fingerprint, and serializable snapshot.
- [ ] Add normalized keyboard input result rows.
- [ ] Add normalized wheel input result rows.
- [ ] Add monotonic input sequence numbers and frame IDs.
- [ ] Record the input sequence range consumed by each simulation frame.
- [ ] Record simulation, camera, visual, telemetry, render, and HUD consumer rows.
- [ ] Add a bounded parent frame-correlation journal.
- [ ] Add additive `GameHost.source` and `GameHost.runtimeProof` readback.
- [ ] Preserve existing `GameHost.local` and `GameHost.nexusEngine` fields.
- [ ] Add a deterministic DOM-free source/input/frame fixture.
- [ ] Add headless `source.inspect`, `source.validate`, `runtime.fixture`, and `runtime.getProofState` capabilities.
- [ ] Make `npm run check` execute the fixture before the existing smoke test.
- [ ] Make headless `project.check` report the same fixture result.
- [ ] Run `npm run check`.
- [ ] Run `npm run headless:check`.
- [ ] Run `npm run build` after checks pass.
- [ ] Run browser smoke and compare browser GameHost readback against fixture shape.
- [ ] Update repo-local and central ledgers after implementation.

## Recommended files

```txt
src/source/open-above-product.js
src/source/balloon-drift.config.js
src/source/legacy-flight-compatibility.js
src/proof/source-manifest.js
src/proof/source-fingerprint.js
src/proof/source-snapshot.js
src/proof/source-acceptance-ledger.js
src/proof/source-consumer-ledger.js
src/proof/input-result-ledger.js
src/proof/frame-correlation-ledger.js
src/proof/runtime-consumer-ledger.js
src/proof/gamehost-proof-readback.js
scripts/open-above-source-frame-fixture.mjs
```

## Required frame flow

```txt
begin frame
  -> allocate frameId
  -> capture sourceFingerprint
  -> capture pending input sequence range
  -> simulation update and snapshot row
  -> balloon transform/presentation consumer rows
  -> camera update and snapshot row
  -> visual update row
  -> telemetry publication row
  -> render consumption row
  -> HUD projection row
  -> commit frame correlation row
  -> expose bounded readback
```

## Fixture must prove

```txt
canonical source loads without DOM
legacy campaign/FLIGHT fields are classified
fingerprints are stable
all rows are JSON-safe
IDs and sequences are monotonic
keyboard accepted/released/repeated/blur-clear cases are explicit
wheel accepted/clamped/no-change cases are explicit
simulation consumes the expected input range
camera references the expected wheel result
telemetry, render, and HUD reference the same frame
consumer skips and failures produce rows
journal eviction is deterministic
GameHost compatibility fields remain present
fixture fails non-zero on contract violations
```

## Avoid until proof exists

```txt
renderer or terrain rewrites
visual quality retuning
camera behavior changes
balloon visual changes
simulation constant changes
route expansion
legacy campaign deletion
new gameplay systems
```

## Done when

```txt
npm run check includes and passes the source/input/frame fixture
npm run headless:check reports the same proof result
npm run build passes after the proof gate
GameHost exposes bounded additive proof readback
browser and fixture readback shapes agree
central ledger points to the implementation timestamp
```

## Next safe ledge

```txt
TheOpenAbove Source Input Frame Correlation Ledger + GameHost Headless Fixture Gate
```