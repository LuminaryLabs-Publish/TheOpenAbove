import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  CLOUD_SPLAT_LOD_TIERS,
  createCloudBankField,
  selectCloudSplatLod,
  sampleCloudBankSplat
} from "../src/domains/sky/cloud-form/cloud-bank-field-kit.js";

const layers = [
  { id: "fog", kind: "ground-fog", base: 8, top: 150, coverage: 0.07, density: 0.1 },
  { id: "low", kind: "low-cloud", base: 180, top: 520, coverage: 0.14, density: 0.24 },
  { id: "mid", kind: "mid-cloud", base: 650, top: 1350, coverage: 0.18, density: 0.32 },
  { id: "high", kind: "high-cloud", base: 1700, top: 2500, coverage: 0.1, density: 0.16 }
];
const options = { layers, worldSurface: { center: { x: 0, z: 0 }, radius: 10000 }, seed: "fixture" };
const first = createCloudBankField(options);
const second = createCloudBankField(options);

assert.equal(CLOUD_SPLAT_LOD_TIERS.length, 5, "clouds expose five distance-selected Gaussian tiers");
assert.deepEqual(first.snapshot(), second.snapshot(), "cloud field metadata is deterministic");
assert.deepEqual(first.banks[0], second.banks[0], "cloud bank placement is deterministic");
assert.deepEqual(sampleCloudBankSplat(first.banks[0], 7, CLOUD_SPLAT_LOD_TIERS[0]), sampleCloudBankSplat(second.banks[0], 7, CLOUD_SPLAT_LOD_TIERS[0]), "splat placement is deterministic");
assert.equal(selectCloudSplatLod(100)?.id, "gaussian-ultra");
assert.equal(selectCloudSplatLod(500)?.id, "gaussian-high");
assert.equal(selectCloudSplatLod(1000)?.id, "gaussian-medium");
assert.equal(selectCloudSplatLod(2000)?.id, "gaussian-low");
assert.equal(selectCloudSplatLod(4000)?.id, "gaussian-minimum");
assert.equal(selectCloudSplatLod(5000), null);
assert.ok(first.banks.every((bank) => ["ground-fog", "low-cloud", "mid-cloud"].includes(bank.kind)), "high clouds remain on the distant volumetric renderer");

const renderer = readFileSync("src/visual/atmosphere/gaussian-cloud-render-adapter.js", "utf8");
assert.match(renderer, /InstancedBufferGeometry/);
assert.match(renderer, /CustomBlending/);
assert.match(renderer, /smoothstep\(18\.0, 140\.0, vDistance\)/);
assert.match(renderer, /candidates\.sort\(\(left, right\) => right\.distanceSquared - left\.distanceSquared\)/);

const visual = readFileSync("src/visual/visual-domain.js", "utf8");
assert.match(visual, /createGaussianCloudRenderer/);
assert.match(visual, /ground-fog", "low-cloud", "mid-cloud/);
assert.match(visual, /cloudSplats\.update/);

console.log("Gaussian cloud bank LOD integration passed.");
