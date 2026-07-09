export function hashStringToSeed(value) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

export function createSeededRandom(seed) {
  let current = seed >>> 0;

  return () => {
    current += 0x6d2b79f5;
    let value = Math.imul(current ^ (current >>> 15), 1 | current);
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildDeterministicBatchSeeds(machineState, count) {
  const seedSource = JSON.stringify({
    element: machineState.element,
    principle: machineState.principle,
    chaos: machineState.chaos,
    proof: machineState.proof,
    process: machineState.process,
    processIntensity: machineState.processIntensity,
    processScale: machineState.processScale,
    typeProof: machineState.typeProof,
    typeLayout: machineState.typeLayout,
    seed: machineState.seed,
    format: machineState.format,
    customWidth: machineState.customWidth,
    customHeight: machineState.customHeight,
  });
  const random = createSeededRandom(hashStringToSeed(seedSource));
  const seeds = new Set();

  while (seeds.size < count) {
    seeds.add(Math.floor(random() * 999999999) + 1);
  }

  return Array.from(seeds);
}