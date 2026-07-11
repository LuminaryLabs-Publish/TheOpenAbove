# Project Breakdown: TheOpenAbove

**Timestamp:** `2026-07-11T09-21-50-04-00`

## Plan ledger

**Goal:** reconcile the product's declared Meadow Lift identity with the executable Air Mail balloon runtime so one versioned source owns mode, objective, controls, HUD copy, snapshots, tests and public documentation.

- [x] Enumerate all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare all nine eligible repositories with `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Confirm no eligible repository is new, ledger-missing or root-`.agent`-missing.
- [x] Select only `TheOpenAbove` as the oldest eligible central-ledger entry.
- [x] Read `AGENTS.md`, `README.md`, `package.json`, `src/data/campaign.config.js`, `src/main.js`, the balloon simulation, mail route/domain and smoke tests.
- [x] Trace the active interaction loop.
- [x] Identify all active, implied, inactive and proposed domains.
- [x] Catalog all source-backed kits and kit-family services.
- [x] Identify the Meadow Lift, balloon drift and Air Mail source split.
- [x] Identify control-contract drift between documentation and runtime.
- [x] Define a product-source supersession authority boundary and fixture gate.
- [x] Add timestamped architecture, render, gameplay, interaction, source-authority and deploy audits.
- [x] Refresh required root `.agent` files.
- [x] Push documentation only to `main`.
- [x] Synchronize the central ledger and internal change log.
- [ ] Runtime implementation and executable source-parity fixtures remain future work.

## Inventory comparison

```txt
TheOpenAbove         2026-07-11T07-18-44-04-00 selected
HorrorCorridor       2026-07-11T07-30-40-04-00
PhantomCommand       2026-07-11T07-38-25-04-00
ZombieOrchard        2026-07-11T07-59-08-04-00
TheUnmappedHouse     2026-07-11T08-11-14-04-00
AetherVale           2026-07-11T08-18-31-04-00
IntoTheMeadow        2026-07-11T08-45-58-04-00
PrehistoricRush      2026-07-11T08-48-04-04-00
MyCozyIsland         2026-07-11T09-19-18-04-00
TheCavalryOfRome     excluded
```

## Interaction loop

```txt
browser boot
  -> import Three.js and NexusEngine from mutable CDN coordinates
  -> load legacy CAMPAIGN/WORLD source
  -> independently construct Air Mail route, towns and parcel
  -> construct visual, airstream, balloon, camera and telemetry domains
  -> key Set polls burner and vent controls
  -> variable-dt RAF advances balloon and flow
  -> destination-volume membership may deliver the parcel
  -> telemetry snapshots before render
  -> HDR render and hard-coded HUD projection
  -> mutable GameHost exposes the live graph
```

## Principal finding

The repository has three competing product identities:

```txt
README and AGENTS.md: Meadow Lift free-flight, thermals, gates, perch and bird-style controls
campaign.config.js: meadow-lift and cloud-basin objective/world descriptors
active runtime: hot-air-balloon Air Mail route to Brookhaven
```

`src/main.js` reports the legacy `meadow-lift` region while the simulation reports `mail-flight`. The HUD and simulation strings hard-code Brookhaven instead of projecting from the route source. `README.md` documents A/D banking, Space boost and R restart; the runtime ignores A/D and R, uses Space/W/Up for burner and S/Down/Shift for vent.

## Next safe ledge

```txt
TheOpenAbove Product Source Supersession Authority
+ Mode, Controls, HUD and Documentation Parity Fixture Gate
```
