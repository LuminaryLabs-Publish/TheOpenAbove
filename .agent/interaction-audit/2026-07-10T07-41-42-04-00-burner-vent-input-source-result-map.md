# Interaction Audit: Burner Vent Input Source Result Map

Timestamp: 2026-07-10T07-41-42-04-00
Repo: LuminaryLabs-Publish/TheOpenAbove

## Current interaction surface

The active route uses browser keyboard input through the balloon simulation kit. User intent feeds burner and vent state, then wind and buoyancy produce balloon drift.

## Current documented mismatch

README still describes pitch, bank, and boost controls from the older free-flight concept. The live route presents a hot-air-balloon drift loop with burner/vent and scroll camera zoom.

## Gap

There is no source acceptance ledger that explains which input concepts are current versus legacy-compatible. There is also no `GameHost.getState().source` block to expose that classification.

## Required source/input rows

```txt
input_burner_current
input_vent_current
input_scroll_zoom_current
input_pitch_legacy_compatible
input_bank_legacy_compatible
input_boost_legacy_compatible
input_restart_deferred
hud_controls_current
readme_controls_legacy_compatible
```

## Required result vocabulary

```txt
current
legacy_compatible
ignored_by_current_route
deferred
missing_readback
```

## Main finding

Do not retune balloon controls next. First add source/result rows that make the live controls and legacy controls explicit.

## Next safe ledge

```txt
TheOpenAbove Source Readback Ledger Catch-up + Headless Fixture Gate
```
