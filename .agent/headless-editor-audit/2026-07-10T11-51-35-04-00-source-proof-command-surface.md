# Headless editor audit: source proof command surface

Timestamp: `2026-07-10T11-51-35-04-00`

## Current headless surface

```txt
project.inspect
renderer.validate
project.check
project.build
runtime.getState
```

## Current limitation

The headless surface is useful, but it still validates renderer/build contracts through static source inspection and npm scripts.

It does not yet expose source authority rows.

## Required next headless rows

```txt
project.source.inspect
project.source.fixture
runtime.getState.source
renderer.validate.sourceConsumers
project.check.sourceFixtureOutput
```

## Rule

Do not add new render work before headless source proof can explain which current source rows are consumed by runtime, smoke, headless, HUD, telemetry, and GameHost.
