# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-12T02-29-50-04-00`

## Primary ordered gaps

```txt
1. immutable runtime admission
2. import purity and single frame owner
3. balloon profile snapshot, schema, admission and fingerprint
4. balloon model assembly, load generation and resource ownership
5. runtime session/listener/resource ownership
6. fixed-step clock and sequenced input
7. product source and acceptance parity
8. Air Mail route and delivery authority
9. mission reset transaction and epoch
10. committed observation correlation
11. public host owner quarantine and capability authority
12. terrain source, LOD and atomic replacement
13. grass spatial identity and backend truth
14. world-surface consumer parity
15. balloon steering input/result authority
16. simulation/root/part/camera steering coherence
17. steering reset neutralization and visible-frame proof
```

## Public host capability gaps

```txt
window.GameHost exports live engine and library objects
window.GameHost exports raw scene, renderer, camera and balloon objects
window.GameHost exports visual, simulation, airstream, mail, camera and presentation owners
public owner references remain valid across future reset/lifecycle boundaries
public callers can invoke update, render, reset and dispose methods directly
public callers can mutate simulation, parcel, route, camera and presentation state
no capability descriptors
no command envelope or command ID
no session, mission or frame revision fences
no finite-value validation for public mutation
no duplicate or stale command rejection
no typed public command result
no bounded public command journal
no immutable committed read model
no state fingerprint shared by host, telemetry, HUD and visible frame
no capability revocation on failure, reset, stop or disposal
```

## Concrete bypass gaps

```txt
simulation.update can advance state outside host clock
mail.update/reset and parcel mutation can bypass mission authority
airstream sample/update can diverge from simulation airstream state
cameraRig.state accepts direct non-finite writes
visual.render and renderer access can submit uncommitted frames
visual/simulation/mail/airstream/camera dispose can partially retire an active runtime
scene and balloon objects can be mutated without command admission
```

## Observation gaps

```txt
getState independently samples Nexus telemetry and local owners
no shared simulationTickId
no renderFrameId
no missionEpoch
no camera or visual revision
no state fingerprint
no command-result to frame acknowledgement
readback contains no proof of the visible frame consumed
```

## Retained balloon profile gaps

```txt
root default profile is mutable
nested root-profile references are aliased
public balloon kit exposes the root profile
loader does not clone before async yield
no complete schema, canonicalization or deep validation
no profile ID/revision/fingerprint
no load generation or stale-load rejection
no model/profile aggregate receipt
no first visible profile-frame proof
```

## Retained reset and lifecycle gaps

```txt
no root runtime session owns all callbacks/listeners/resources
no transaction resets held input, mission, profile/model, steering, camera and presentation together
no mission epoch fences predecessor owner references
no neutral convergence or first replacement-frame receipt
```

## Required host fixtures

```txt
fixture:host-public-key-surface
fixture:host-owner-handle-absence
fixture:host-read-model-detachment
fixture:host-read-model-deep-immutability
fixture:host-non-finite-command-rejection
fixture:host-out-of-band-tick-unavailable
fixture:host-mail-bypass-unavailable
fixture:host-direct-render-unavailable
fixture:host-stale-session-command
fixture:host-stale-mission-command
fixture:host-stale-frame-command
fixture:host-duplicate-command
fixture:host-command-result-frame-ack
fixture:host-capability-revocation
fixture:pages-host-contract-parity
```

Do not treat `GameHost.getState()`, a successful telemetry tick, a rendered canvas, or the absence of an immediate error as proof of public-host isolation or frame coherence.