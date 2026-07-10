# Headless Editor Audit: Source/Frame Fixture Command Surface

**Timestamp:** `2026-07-10T14-50-38-04-00`

## Current capabilities

```txt
project.inspect
renderer.validate
project.check
project.build
runtime.getState
```

The environment is useful but currently static. `inspectProject()` reads source files and applies regular-expression checks for framebuffer, lighting, terrain streaming, shader, and water contracts. `project.check` and `project.build` invoke npm scripts.

## Missing capabilities

```txt
source.inspect
source.validate
runtime.fixture
runtime.getProofState
```

## Recommended command surface

### `source.inspect`

Return the canonical manifest, fingerprints, compatibility classifications, and required consumer list without browser or GPU dependencies.

### `source.validate`

Validate required source rows, unique IDs, stable fingerprints, JSON serialization, and current/legacy classifications.

### `runtime.fixture`

Run deterministic normalized keyboard, wheel, simulation, camera, telemetry, render-consumer, HUD-consumer, and GameHost-projection rows with mock consumers.

### `runtime.getProofState`

Return the fixture's bounded source/input/frame journals using the same serialization shape expected from browser GameHost readback.

## Fixture matrix

```txt
burner key accepted and released
vent key accepted and released
repeated key classified
blur clears active input
wheel zoom accepted
wheel zoom clamped
zero wheel delta no-change
simulation frame consumes expected sequence range
camera frame consumes expected wheel result
telemetry publication references frame ID
render consumer references simulation and camera IDs
HUD consumer references the same frame
GameHost projection remains JSON-safe
bounded journal eviction is deterministic
invalid source or missing consumer fails non-zero
```

## Package integration

```txt
npm run check
  -> source/frame fixture
  -> existing smoke test

npm run headless:check
  -> project.check
  -> same source/frame fixture result included in command output
```

The fixture should be a normal Node module callable both directly and by the headless editor. Do not duplicate fixture logic in the editor environment.

## Main finding

The headless editor already provides a reliable command router. It needs a deterministic runtime-proof caller, not additional regex-only checks.

## Next safe ledge

```txt
TheOpenAbove Source Input Frame Correlation Ledger + GameHost Headless Fixture Gate
```