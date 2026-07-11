# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-11T14-50-59-04-00`

## Primary ordered gaps

```txt
1. immutable runtime admission
2. import-pure balloon module and compatibility admission
3. root session/frame/listener/resource ownership
4. ordered teardown and full-runtime restart proof
5. fixed-step clock visibility and sequenced input authority
6. product manifest selected mode and supersession authority
7. product acceptance and public/runtime parity
8. versioned Air Mail route and parcel source
9. correct-current delivery admission and route proof
10. complete mission reset transaction and mission epoch
11. committed simulation/render/HUD/telemetry/GameHost correlation
12. terrain surface and horizon revision authority
13. bounded near+horizon terrain generation
```

## Committed observation gaps

```txt
telemetry snapshots before visual.render
renderer drawCalls and triangles update after telemetry publication
dynamic resolution samples after telemetry publication
HUD projects after telemetry publication
no simulationTickId to browser RAF mapping
no renderFrameId
no deliveryResultId
no render submission result
no HUD acknowledgement
no telemetry publication barrier
no required-consumer acknowledgement set
no state or frame fingerprint
no bounded committed-frame journal
```

## External readback gaps

```txt
GameHost exposes scene renderer camera balloon visual simulation airstream mail and cameraRig
external callers can retain mutable subsystem references
getState returns no session mission tick frame or observation revision
Nexus telemetry and local snapshot are not correlated by a shared receipt
old readback callers cannot be fenced after reset or restart
headless tools cannot prove they observed a committed visible frame
```

## Delivery-to-frame gap

```txt
mail.update can commit parcel delivery
state.message is changed immediately
telemetry publishes the new parcel state before rendering
HUD updates after rendering
no receipt proves which visible frame first showed delivery
no exactly-once consumer acknowledgement exists
```

## Render-state gap

```txt
visual.update mutates current planning state
visual.render submits the frame
resolution.sample may change future scale
drawCalls and triangles are assigned after submission
telemetry captured earlier values
no distinction between planned effective submitted and observed quality
```

## Retained product acceptance gaps

```txt
README and AGENTS still describe Meadow Lift bird flight
runtime is Air Mail hot-air-balloon delivery
R restart is documented but has no consumer
no product/acceptance fingerprint or deployed parity evidence
```

## Retained lifecycle and restart gaps

```txt
root RAF id is not retained
full-runtime restart and mission reset are not distinct
mail.reset clears parcel fields only
simulation airstream camera and presentation expose no composed reset
no mission epoch or stale-caller fence
```

## Required fixture gaps

```txt
fixture:observation-order
fixture:delivery-visible-frame
fixture:render-stat-frame
fixture:effective-quality-frame
fixture:hud-telemetry-parity
fixture:consumer-ack-barrier
fixture:stale-frame-ack
fixture:cross-epoch-frame-ack
fixture:gamehost-detachment
fixture:headless-committed-observation
fixture:browser-committed-observation
fixture:pages-committed-observation
```

## Required guarantees

```txt
one committed observation identifies one runtime session mission epoch tick and frame
delivery state becomes externally committed with the visible frame that represents it
renderer and quality statistics are labeled by the frame they describe
HUD telemetry GameHost and headless observations share one revision and fingerprint
mutable subsystem objects are never the public observation contract
stale partial and cross-epoch acknowledgements cannot commit a frame
evidence is bounded detached and JSON-safe
```
