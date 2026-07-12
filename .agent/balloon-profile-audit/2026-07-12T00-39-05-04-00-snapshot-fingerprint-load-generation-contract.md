# Balloon Profile Audit: Snapshot, Fingerprint and Load Generation Contract

Timestamp: `2026-07-12T00-39-05-04-00`

## Goal

Define the canonical data contract for deterministic procedural balloon construction.

## Canonical profile scope

```txt
root scale and visual offset
envelope panel geometry and palette
integrated pattern cadence and accent palette
envelope shape/profile points
mouth geometry/material policy
seam/load-tape policy
basket geometry and controls
rigging frame, anchors and rope policy
burner geometry, flame and light policy
```

## Canonicalization rules

```txt
clone all objects and arrays
normalize finite numbers and documented bounds
normalize color values to one representation
sort profile points by t and reject duplicate/invalid topology
fill explicit defaults before fingerprinting
remove functions, THREE objects and host references
serialize with stable key ordering
hash schema version plus canonical payload
freeze the complete admitted object graph
```

## Load generation rules

```txt
allocate generation before yielding
bind generation to runtime session and mission epoch
build detached from live scene
cancel or supersede predecessor generation explicitly
reject results whose session, epoch or generation no longer matches
commit model, profile receipt and resource inventory atomically
```

## Fingerprint invariants

```txt
same canonical data -> same fingerprint
semantically equivalent input ordering -> same fingerprint
geometry/pattern/attachment change -> different fingerprint
fingerprint includes all values consumed by builders
receipt fingerprint equals frame fingerprint
```

## Public exposure rule

Canonical defaults and admitted profiles are immutable data snapshots. Public diagnostics may expose clone-safe observations but never the mutable source object used by construction.

## Corrected source truth

The current integrated pattern metadata is already handed to the shell builder. It must be included in canonicalization and fingerprinting rather than added as a new assembly connection.

## Completion gate

The contract is not complete until mutation-race, alias-isolation, overlapping-generation, fingerprint-stability and first-visible-frame fixtures pass.