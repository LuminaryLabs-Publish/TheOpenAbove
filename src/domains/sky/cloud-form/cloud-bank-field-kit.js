export const CLOUD_BANK_FIELD_KIT_ID = "open-above-cloud-bank-field-kit";

export const CLOUD_SPLAT_LOD_TIERS = Object.freeze([
  Object.freeze({ id: "gaussian-ultra", maxDistance: 260, splatsPerBank: 160, sizeMultiplier: 0.56, opacityMultiplier: 0.42 }),
  Object.freeze({ id: "gaussian-high", maxDistance: 620, splatsPerBank: 48, sizeMultiplier: 0.82, opacityMultiplier: 0.5 }),
  Object.freeze({ id: "gaussian-medium", maxDistance: 1300, splatsPerBank: 18, sizeMultiplier: 1.18, opacityMultiplier: 0.58 }),
  Object.freeze({ id: "gaussian-low", maxDistance: 2500, splatsPerBank: 8, sizeMultiplier: 1.62, opacityMultiplier: 0.64 }),
  Object.freeze({ id: "gaussian-minimum", maxDistance: 4200, splatsPerBank: 3, sizeMultiplier: 2.28, opacityMultiplier: 0.7 })
]);

const TAU = Math.PI * 2;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const SUPPORTED_KINDS = new Set(["ground-fog", "low-cloud", "mid-cloud"]);

function hash(seed, index) {
  let value = (Number(seed) + Math.imul(index + 1, 0x9e3779b1)) | 0;
  value = Math.imul(value ^ value >>> 16, 0x85ebca6b);
  value = Math.imul(value ^ value >>> 13, 0xc2b2ae35);
  return ((value ^ value >>> 16) >>> 0) / 4294967295;
}

function seedFrom(value) {
  const text = String(value ?? "open-above-clouds");
  let seed = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    seed ^= text.charCodeAt(index);
    seed = Math.imul(seed, 16777619);
  }
  return seed >>> 0;
}

function bankCount(kind, layer = {}) {
  if (Number.isFinite(layer.profile?.bankCount)) return Math.max(1, Math.floor(layer.profile.bankCount));
  if (kind === "ground-fog") return 220;
  if (kind === "low-cloud") return 180;
  return 110;
}

function bankScale(kind, layerHeight, random) {
  if (kind === "ground-fog") {
    return {
      x: 150 + random * 180,
      y: Math.max(18, layerHeight * (0.14 + random * 0.12)),
      z: 110 + random * 170,
      splat: 32 + random * 24
    };
  }
  if (kind === "low-cloud") {
    return {
      x: 125 + random * 190,
      y: Math.max(36, layerHeight * (0.18 + random * 0.15)),
      z: 105 + random * 175,
      splat: 28 + random * 26
    };
  }
  return {
    x: 190 + random * 270,
    y: Math.max(50, layerHeight * (0.16 + random * 0.13)),
    z: 160 + random * 250,
    splat: 40 + random * 34
  };
}

function createBanks(layers, worldSurface, seed) {
  const center = worldSurface?.center ?? { x: 0, z: 0 };
  const worldRadius = Math.max(600, Number(worldSurface?.radius) || 10000);
  const usableRadius = worldRadius * 0.84;
  const banks = [];

  for (const layer of layers) {
    const kind = String(layer.kind ?? "");
    if (!SUPPORTED_KINDS.has(kind)) continue;
    const count = bankCount(kind, layer);
    const base = Number(layer.base ?? 0);
    const top = Math.max(base + 1, Number(layer.top ?? base + 1));
    const layerHeight = top - base;
    const layerSeed = seedFrom(`${seed}:${layer.id ?? kind}`);

    for (let index = 0; index < count; index += 1) {
      const radial = Math.sqrt((index + 0.12) / count);
      const angle = index * GOLDEN_ANGLE + hash(layerSeed, index * 7) * TAU;
      const jitter = (hash(layerSeed, index * 7 + 1) - 0.5) * worldRadius * 0.035;
      const radius = Math.max(80, radial * usableRadius + jitter);
      const random = hash(layerSeed, index * 7 + 2);
      const scale = bankScale(kind, layerHeight, random);
      const altitudeBias = kind === "ground-fog" ? 0.12 : kind === "low-cloud" ? 0.18 : 0.28;
      const altitudeRange = kind === "ground-fog" ? 0.28 : kind === "low-cloud" ? 0.32 : 0.38;
      const y = base + layerHeight * (altitudeBias + hash(layerSeed, index * 7 + 3) * altitudeRange);
      const tint = kind === "ground-fog"
        ? [0.83, 0.88, 0.9]
        : kind === "low-cloud"
          ? [0.93, 0.95, 0.98]
          : [0.9, 0.93, 0.98];

      banks.push(Object.freeze({
        id: `${layer.id ?? kind}-bank-${index}`,
        layerId: layer.id ?? kind,
        kind,
        seed: (layerSeed + index * 977) >>> 0,
        center: Object.freeze({
          x: Number(center.x ?? 0) + Math.cos(angle) * radius,
          y,
          z: Number(center.z ?? 0) + Math.sin(angle) * radius
        }),
        radius: Object.freeze({ x: scale.x, y: scale.y, z: scale.z }),
        splatRadius: scale.splat,
        density: Number(layer.density ?? 0.2),
        coverage: Number(layer.coverage ?? 0.15),
        priority: Number(layer.priority ?? 0),
        tint: Object.freeze(tint),
        drift: Object.freeze({
          x: (hash(layerSeed, index * 7 + 4) - 0.5) * 7,
          z: (hash(layerSeed, index * 7 + 5) - 0.5) * 7,
          phase: hash(layerSeed, index * 7 + 6) * TAU
        })
      }));
    }
  }

  return Object.freeze(banks);
}

export function selectCloudSplatLod(distance) {
  const value = Math.max(0, Number(distance) || 0);
  return CLOUD_SPLAT_LOD_TIERS.find((tier) => value <= tier.maxDistance) ?? null;
}

export function sampleCloudBankSplat(bank, index, tier = CLOUD_SPLAT_LOD_TIERS[0]) {
  const seed = Number(bank?.seed ?? 1);
  const h0 = hash(seed, index * 11);
  const h1 = hash(seed, index * 11 + 1);
  const h2 = hash(seed, index * 11 + 2);
  const h3 = hash(seed, index * 11 + 3);
  const h4 = hash(seed, index * 11 + 4);
  const h5 = hash(seed, index * 11 + 5);
  const h6 = hash(seed, index * 11 + 6);
  const h7 = hash(seed, index * 11 + 7);
  const theta = h0 * TAU;
  const radial = Math.pow(h1, 0.58);
  const vertical = h2 * 2 - 1;
  const fog = bank?.kind === "ground-fog";
  const radius = bank?.radius ?? { x: 1, y: 1, z: 1 };
  const size = Math.max(1, Number(bank?.splatRadius ?? 20)) * Number(tier?.sizeMultiplier ?? 1) * (0.66 + h3 * 0.86);

  return Object.freeze({
    offset: Object.freeze({
      x: Math.cos(theta) * radial * Number(radius.x ?? 1) * (0.72 + h4 * 0.28),
      y: vertical * Number(radius.y ?? 1) * (fog ? 0.58 : 0.82) + (fog ? -Math.abs(vertical) * Number(radius.y ?? 1) * 0.14 : h5 * Number(radius.y ?? 1) * 0.16),
      z: Math.sin(theta) * radial * Number(radius.z ?? 1) * (0.72 + h5 * 0.28)
    }),
    scale: Object.freeze({
      x: size * (fog ? 1.55 + h6 * 0.65 : 1 + h6 * 0.52),
      y: size * (fog ? 0.34 + h7 * 0.2 : 0.7 + h7 * 0.46)
    }),
    angle: h4 * TAU,
    shade: 0.28 + h6 * 0.62,
    opacity: Number(tier?.opacityMultiplier ?? 1) * (0.7 + h7 * 0.3)
  });
}

export function createCloudBankField({ layers = [], worldSurface = null, seed = "open-above-clouds" } = {}) {
  const banks = createBanks(layers, worldSurface, seed);
  const maximumDistance = CLOUD_SPLAT_LOD_TIERS[CLOUD_SPLAT_LOD_TIERS.length - 1].maxDistance;

  function query(position = { x: 0, y: 0, z: 0 }, maxDistance = maximumDistance) {
    const distanceLimit = Math.max(0, Number(maxDistance) || maximumDistance);
    const distanceLimitSq = distanceLimit * distanceLimit;
    return banks.filter((bank) => {
      const dx = bank.center.x - Number(position.x ?? 0);
      const dy = bank.center.y - Number(position.y ?? 0);
      const dz = bank.center.z - Number(position.z ?? 0);
      return dx * dx + dy * dy + dz * dz <= distanceLimitSq;
    });
  }

  return Object.freeze({
    id: CLOUD_BANK_FIELD_KIT_ID,
    banks,
    tiers: CLOUD_SPLAT_LOD_TIERS,
    maximumDistance,
    query,
    selectLod: selectCloudSplatLod,
    sampleSplat: sampleCloudBankSplat,
    snapshot: () => Object.freeze({
      bankCount: banks.length,
      kinds: Object.freeze([...new Set(banks.map((bank) => bank.kind))]),
      tiers: CLOUD_SPLAT_LOD_TIERS
    })
  });
}

if (typeof window !== "undefined") {
  window.OpenAboveCloudBankFieldKit = {
    id: CLOUD_BANK_FIELD_KIT_ID,
    CLOUD_SPLAT_LOD_TIERS,
    createCloudBankField,
    selectCloudSplatLod,
    sampleCloudBankSplat
  };
}
