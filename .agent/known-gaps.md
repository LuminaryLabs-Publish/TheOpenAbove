# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-11T13-10-35-04-00`

## Primary ordered gaps

```txt
1. immutable runtime admission
2. import-pure balloon module and compatibility admission
3. root session/frame/listener/resource ownership
4. ordered teardown and full-runtime restart proof
5. fixed-step clock, visibility and sequenced input authority
6. product manifest, selected mode and supersession authority
7. product acceptance contract and public/runtime parity
8. versioned Air Mail route and parcel source
9. correct-current delivery admission and route proof
10. complete mission reset transaction and mission epoch
11. committed simulation/render/telemetry/GameHost correlation
12. terrain surface and horizon revision authority
13. bounded near+horizon terrain generation
```

## Product acceptance gaps

```txt
README describes bird free-flight instead of Air Mail balloon flight
AGENTS defines Meadow Lift as the current slice
README controls describe pitch, bank and boost
runtime controls are burner, vent and wheel zoom
README and AGENTS claim R restart
runtime has no R consumer
README and AGENTS objectives require thermals, gates and perch return
runtime objective is correct-current parcel delivery to Brookhaven
package description and runtime disagree with README/AGENTS identity
no versioned AcceptanceContract
no control or objective contract fingerprint
no generated README or AGENTS projection
no typed acceptance-parity result
no bounded acceptance evidence journal
```

## Automated-proof gap

```txt
npm run check
  -> verifies required files exist
  -> verifies selected source patterns
  -> runs pure airstream/mail checks
  -> does not open the browser
  -> does not execute public controls
  -> does not execute README or AGENTS objectives
  -> does not inspect HUD/help copy
  -> does not prove restart availability
  -> does not compare deployed Pages behavior
```

A stale public contract can therefore coexist with a green source-pattern smoke.

## Control mismatch

```txt
README W/S/A/D/Space meaning:
  W/S pitch
  A/D bank
  Space boost

runtime meaning:
  Space / W / ArrowUp -> burner
  S / ArrowDown / Shift -> vent
  wheel -> camera zoom
  A / D -> no balloon steering binding
  R -> no mission restart binding
```

## Objective mismatch

```txt
README / AGENTS:
  catch three thermals
  clear five wind gates
  return to sky perch
  unlock Cloud Basin

runtime:
  find visible meadow current
  enter the Brookhaven route
  carry parcel-001
  enter the Brookhaven delivery volume
```

## Product identity gaps

```txt
campaign.config.js still identifies meadow-lift and Cloud Basin
runtime snapshot combines mail-flight with meadow-lift region identity
HUD hard-codes Air Mail and Brookhaven copy
README and AGENTS retain legacy bird product copy
no selectedMode, modeVersion or supersession proof
no product, controls, objectives or acceptance fingerprint
no projection revision shared by runtime and docs
```

## Mission restart gaps

```txt
KeyR has no consumer
no typed ResetMission command
no runtimeSessionId or missionEpoch
mail.reset clears parcel fields only
balloon simulation, airstream and camera expose no reset service
no post-reset delivery lockout
no first post-reset simulation/render receipt
```

## Lifecycle gaps

```txt
root RAF id is not retained
createGame returns no session owner
mail, airstream, camera, simulation and visual disposal are not composed
full-runtime restart and mission reset are not distinct
GameHost exposes mutable subsystem objects
old callers cannot be fenced after a successor mission starts
```

## Render and projection gaps

```txt
HUD copy is independently hard-coded
README and AGENTS copy is independently maintained
no shared product/acceptance revision reaches HUD or canvas proof
telemetry snapshots before visual.render
no visible-frame acknowledgement for the accepted contract
no proof that the deployed canvas corresponds to the documented mode
```

## Required fixture gaps

```txt
fixture:product-manifest
fixture:acceptance-contract
fixture:control-parity
fixture:objective-parity
fixture:hud-docs-agent-parity
fixture:acceptance-evidence
fixture:browser-acceptance
fixture:pages-acceptance
fixture:air-mail-route
fixture:air-mail-reset-keyboard
fixture:air-mail-reset-inside-destination
```

## Required guarantees

```txt
one accepted product source defines one selected mode
all control labels correspond to installed runtime bindings
all objective labels correspond to executable gameplay rules
restart is advertised only when a ResetMission consumer exists
README, AGENTS, HUD, telemetry and headless tools share one revision
source, browser and Pages acceptance results share one fingerprint
mismatched or stale projections fail with typed results
all evidence is bounded, detached and JSON-safe
```
