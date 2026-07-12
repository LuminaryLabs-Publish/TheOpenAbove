# Balloon Geometry Audit: Profile, Assembly, Loading and Resource Contract

**Timestamp:** `2026-07-11T22-51-09-04-00`

## Plan ledger

**Goal:** preserve the new high-fidelity balloon while making every geometry consumer and attachment point agree on one admitted model description.

- [x] Review envelope profile and sampling.
- [x] Review continuous shell and color pattern.
- [x] Review fitted seams and profile-aware mouth.
- [x] Review basket, burner frame, twin burners, cables and ropes.
- [x] Review root assembly, model loading and animation.
- [ ] Add canonical model admission and parity fixtures.

## Improvements confirmed

```txt
continuous envelope shell
shared spline-based envelope sampler
derived shell normals
integrated color pattern
profile-fitted load tapes
profile-aware mouth radius
tapered basket
burner frame and twin burners
persistent dynamic rope buffers
envelope and gondola animation pivots
```

## Remaining contract gaps

```txt
defaultHotAirBalloonProfile is not a versioned descriptor
nested profiles are mutable ambient objects
panel profile is the implicit shape source
basket, frame, burner and rope coordinates remain independent constants
cross-component attachment validation is absent
load helper is not production startup authority
model build is not staged or cancellable
resource inventory and disposal are absent
```

## Consumer parity matrix

| Consumer | Shared envelope profile | Independent coordinates | Admission receipt |
|---|---:|---:|---:|
| Envelope shell | Yes | Gore/step settings | No |
| Load tapes | Yes | Seam width/offset | No |
| Mouth/skirt | Yes | Ring/skirt settings | No |
| Basket | No | Full gondola profile | No |
| Burner frame | No | Full frame profile | No |
| Load cables | No | Anchor/basket coordinates | No |
| Camera focus | No | Fixed basket focus offset | No |

## Required proof

```txt
custom envelope dimensions keep shell, seams and mouth coincident
custom basket dimensions update rigging and camera attachment coherently
all default and custom profiles produce finite geometry
root resource inventory matches scene traversal
cancelled model load leaks no resources
replacement retires predecessor after frame release
first visible frame cites the committed model fingerprint
```
