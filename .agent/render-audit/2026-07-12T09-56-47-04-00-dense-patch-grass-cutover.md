# Dense Patch Grass Cutover

## Previous state

The grass domain requested up to 8,000 three-plane instances per near chunk and synthesized one narrow blade mask per card. The result spent geometry on isolated marks that became dark grain from the balloon camera.

## Current state

The active high-tier neighborhood has one explicit 2,500-clump budget. Each clump owns two crossed cards and selects one of eight procedural alpha-atlas tiles containing 20–50 overlapping blades.

Placement is owned by a seeded density service combining:

```txt
55% macro fBm at 0.004 world frequency
35% patch fBm at 0.018 world frequency
10% detail noise at 0.07 world frequency
smoothstep 0.32–0.72
power remap 1.6
20–35 dense centers
15–25 clearing centers
biome, height and vegetation influence
```

The terrain, moisture, slope, road, central zone and tree positions remain authoritative placement inputs. The grass domain remains presentation-only and does not affect collision, flight, objectives or progression.

## Proof boundary

Node fixtures and the production build pass. A rendered public Pages smoke remains required before claiming deployed visual parity because the local cloud-browser route was not admitted.
