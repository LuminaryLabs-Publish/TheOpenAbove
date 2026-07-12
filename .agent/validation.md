# Validation: TheOpenAbove

**Last aligned:** `2026-07-12T04-00-32-04-00`

## Scope

Documentation-only audit of post-start frame failure handling through repository revision `a36bd0958c66b26f9be38085486271f11a623576`.

## Plan ledger

**Goal:** distinguish source-backed evidence of a silent partial-frame freeze from executable proof that failures are contained, visible, terminally observed and restart-safe.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove` as the oldest eligible repository.
- [x] Read `AGENTS.md`, current `.agent` state and `src/main.js`.
- [x] Confirm `boot()` catches only startup construction failure.
- [x] Trace all ordered RAF stages and successor scheduling.
- [x] Confirm no frame-stage result or failure boundary exists.
- [x] Confirm successful prefixes can mutate live owners before failure.
- [x] Confirm render and HUD can end on different revisions.
- [x] Preserve the active 59-kit inventory and service map.
- [x] Define static, pure, browser and Pages proof requirements.
- [x] Change no runtime source, dependency, script or workflow.
- [x] Create no branch or pull request.

## Source-backed behavior

```txt
boot awaits createGame inside try/catch
showFatal is called only from boot catch
recursive frame callback runs after createGame returns
frame executes simulation, mail, airstream, balloon, presentation, camera, visual, telemetry, render and HUD in sequence
next requestAnimationFrame is scheduled only at the end
no frame-level catch or typed stage result exists
```

## Source-backed gaps

```txt
no frame identity
no stage identity or canonical stage schema
no immutable frame input
no typed stage result
no failure identity or classification
no completed-stage mutation journal
no single failure admission
no later-stage mutation fence
no last-known-good frame pointer
no canvas/HUD/readback correlation after failure
no failed-session mutation quarantine
no capability revocation
no ordered disposal result
no terminal failure observation
no cold-restart admission
```

## Required static fixtures

```txt
fixture:frame-boundary-present
fixture:frame-stage-schema-present
fixture:frame-successor-from-commit-only
fixture:frame-runtime-failure-projection-present
fixture:frame-last-known-good-state-present
fixture:frame-capability-revocation-present
```

## Required pure fixtures

```txt
fixture:frame-stage-order
fixture:frame-single-failure-admission
fixture:frame-no-later-stage-result
fixture:frame-last-good-advance-on-full-commit
fixture:frame-failure-classification
fixture:frame-restart-predecessor-rejection
```

## Required browser fixtures

Inject a deterministic error at:

```txt
simulation
mail
airstream
balloon transform/model animation
balloon presentation
camera
visual update
telemetry
render
HUD
```

For every injected failure assert:

```txt
one failure ID and correct failed stage
zero later-stage mutation
zero successor RAF callbacks
failed frame absent from committed observation
last-known-good canvas, HUD and readback agree
public mutation capability revoked
bounded error surface visible
disposal result published
cold restart uses a new session and mission epoch
```

## Required Pages smoke

```txt
load deployed route
wait for first committed frame
activate bounded test-only fault injection
fail one state stage and one rendering stage
verify terminal failure projection
verify frame counter no longer advances
verify public capabilities are revoked
verify last-known-good observation remains readable
verify replacement session first-frame acknowledgement after restart
```

## Commands not run

```txt
npm install
npm run check
npm run headless:check
npm run build
browser fault-injection matrix
Pages fault-injection smoke
```

The connector environment provided repository source and write access, not a checked-out browser runtime. No command execution is claimed.

## Change-state validation

```txt
runtime JavaScript changed: no
package scripts changed: no
dependencies changed: no
gameplay changed: no
render behavior changed: no
deployment workflow changed: no
branch created: no
pull request created: no
.agent documentation changed: yes
```

## Completion boundary

Do not claim runtime failure recovery until every frame stage can be fault-injected and the browser proves one terminal result, no later-stage mutation, no successor callback, coherent last-known-good output, complete capability revocation, ordered disposal and clean replacement-session startup.