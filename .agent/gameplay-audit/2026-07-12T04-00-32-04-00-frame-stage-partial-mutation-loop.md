# Gameplay Audit: Frame-Stage Partial Mutation Loop

**Timestamp:** `2026-07-12T04:00:32-04:00`

## Interaction loop

```txt
player input and current frame time
  -> simulation mutates flight state
  -> mail may commit delivery
  -> airstream mutates visual/debug state
  -> balloon root mutates
  -> model and part presentation mutate
  -> camera mutates
  -> environment and quality state mutate
  -> telemetry mutates
  -> render submits
  -> HUD mutates
```

## Main gameplay defect

This sequence has no atomic frame result. An exception after any successful prefix leaves that prefix committed in live owners even though the player may never see a matching frame.

### Delivery example

```txt
mail.update commits parcel.delivered = true
later visual.render throws

result:
  delivery state is terminally committed
  GameHost can observe delivered = true
  canvas still shows the previous flight frame
  HUD still shows the previous mail state
  no future frame reconciles the views
```

### Steering example

```txt
simulation.update consumes steering and advances position
balloon/camera stage throws

result:
  flight state advanced
  visible balloon and camera remain previous
  no typed failure or rollback indicates whether input was consumed
```

## Missing gameplay authority

```txt
frame input sequence
frame attempt ID
stage result sequence
mutation journal
commit/rollback policy per subsystem
failure classification
terminal failure result
input-consumption receipt
mission-event visibility receipt
```

## Required policy

```txt
simulation and mission transitions may prepare candidate results
committed observation advances only after all required visible stages succeed
failed-frame inputs and mission events receive explicit terminal disposition
no retry replays an already committed delivery or input accidentally
restart allocates a new runtime and mission epoch
```

## Required fixtures

```txt
simulation-stage failure
mail-stage failure before delivery
mail-stage failure after candidate delivery
balloon-presentation failure
camera failure
visual-update failure
render failure after delivery
HUD failure after render
restart after every injected failure
```

Documentation only. Gameplay behavior was not changed.