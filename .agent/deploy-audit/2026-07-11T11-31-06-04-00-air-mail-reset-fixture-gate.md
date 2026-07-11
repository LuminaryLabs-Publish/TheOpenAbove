# Air Mail Reset Fixture Gate

**Timestamp:** `2026-07-11T11-31-06-04-00`

## Existing checks

`npm run check` currently validates source presence and selected implementation patterns. It does not execute browser restart behavior, mission epochs, held-input retirement, stale-proof rejection or first-frame correlation.

## Required pure fixtures

```txt
fixture:air-mail-reset-pure
fixture:air-mail-reset-held-input
fixture:air-mail-reset-stale-proof
fixture:air-mail-reset-repeat
fixture:air-mail-reset-rollback
```

## Required host and browser fixtures

```txt
fixture:air-mail-reset-host
fixture:air-mail-reset-keyboard
fixture:air-mail-reset-inside-destination
fixture:air-mail-reset-first-frame
fixture:air-mail-reset-render-failure
```

## Assertions

```txt
one reset command creates one new mission epoch
all mission-owned subsystem fingerprints change together
held burner and vent input are neutral after reset
predecessor route and delivery proof cannot be reused
reset inside Brookhaven does not immediately redeliver
repeat command is idempotent
a stale epoch rejects without mutation
GameHost, headless, HUD, telemetry and canvas agree on epoch
first post-reset simulation tick and frame are recorded
```

## Validation sequence

```txt
npm run fixture:air-mail-reset-pure
npm run fixture:air-mail-reset-host
npm run fixture:air-mail-reset-browser
npm run check
npm run headless:check
npm run build
browser smoke
Pages smoke
```

No runtime reset-safety claim is valid until these fixtures exist and pass.