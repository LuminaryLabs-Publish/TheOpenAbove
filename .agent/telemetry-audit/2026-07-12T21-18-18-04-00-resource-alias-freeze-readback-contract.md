# Telemetry Resource Alias, Freeze and Readback Contract

**Timestamp:** `2026-07-12T21-18-18-04-00`

## Contract purpose

Prevent telemetry resources, public readbacks and journal evidence from sharing uncontrolled writable references.

## Current source state

```txt
resource storage: direct reference
resource getter: direct reference
journal resource value: direct reference
complete/visual projection alias: present
public GameHost resource exposure: present
snapshot identity: absent
content fingerprint: absent
freeze or clone policy: absent
```

## Allowed sharing policy

Cross-resource structural sharing is allowed only when the shared node is immutable for its complete lifetime. Writable sharing is prohibited.

```txt
allowed
  Object.freeze(sharedVisual)
  complete.visual === sharedVisual
  visualResource === sharedVisual

allowed
  complete.visual is detached copy A
  visualResource is detached copy B

prohibited
  complete.visual === visualResource
  object remains writable through any public path
```

## Commit contract

```txt
candidate state: private and writable
normalized state: detached from providers
validated state: no unsupported prototypes or cyclic values
committed state: immutable or protected by clone-on-read
public state: revisioned immutable envelope
journal state: detached metadata plus fingerprint
```

## Public readback envelope

```txt
{
  snapshotId,
  frameId,
  runtimeSessionId,
  sourceRevisions,
  contentFingerprint,
  visibleFrameStatus,
  data
}
```

`data` must be deeply immutable or a detached clone. Consumers must never receive the object stored in the mutable engine resource map unless that object is deeply immutable.

## Journal contract

Resource journals should not depend on later object identity. Store:

```txt
resource name
commit sequence
snapshot ID
predecessor snapshot ID
content fingerprint
bounded scalar observations
terminal result
```

Full payload retention, when required for proof, must use a detached immutable value.

## Mutation handling

```txt
mutation of frozen readback
  -> rejected by language/runtime semantics
  -> engine state unchanged

mutation of detached readback clone
  -> caller-local change only
  -> engine state unchanged

mutation detected before commit
  -> candidate rejected
  -> predecessor preserved
```

## Required fixtures

```txt
complete-visual-alias-is-immutable
GameHost-readback-cannot-mutate-resource
engine-getter-cannot-mutate-resource
journal-value-does-not-drift
predecessor-readback-retains-identity
successor-commit-replaces-resources-atomically
failed-normalization-preserves-predecessor
first-visible-frame-cites-snapshot
```
