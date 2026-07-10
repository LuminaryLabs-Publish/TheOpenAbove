# Interaction Audit: Burner / Vent Source Result Map

Timestamp: 2026-07-10T10-29-57-04-00
Repo: LuminaryLabs-Publish/TheOpenAbove

## Current interaction path

```txt
keyboard listeners
  -> burner intent
  -> vent intent
  -> simulation update
  -> balloon pose
  -> camera rig
  -> HUD message
  -> GameHost local snapshot
```

## Gap

Keyboard intent is live and useful, but the source/readback layer does not yet classify which interaction rows are current route behavior versus older free-flight concepts.

## Required interaction rows

```txt
keyboard_input_current
burner_intent_current
vent_intent_current
boost_legacy_compatible
pitch_bank_legacy_compatible
camera_zoom_current
hud_status_current
gamehost_interaction_source_missing
```

## Next proof target

Add source acceptance and consumer rows that can be asserted without browser rendering. The DOM-free fixture should prove burner and vent source rows exist before changing simulation constants or controls.

## Not next

- control redesign
- camera retune
- boost mechanic reintroduction
- simulation constant retune
