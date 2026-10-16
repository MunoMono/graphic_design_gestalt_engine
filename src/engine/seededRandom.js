import { isDefaultColourState } from "./colourPresets.js";
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
  const colourActive = Boolean(machineState.gestaltControls?.elements?.colour?.active);
  const seedSource = JSON.stringify({
    element: machineState.element,
    principle: machineState.principle,
    chaos: machineState.chaos,
    proof: machineState.proof,
    ...((machineState.backgroundColor && !["#f7f5ef", "#050607"].includes(machineState.backgroundColor)) || machineState.backgroundOpacity < 100
      ? { backgroundColor: machineState.backgroundColor, backgroundOpacity: machineState.backgroundOpacity }
      : {}),
    ...(colourActive && !isDefaultColourState(machineState)
      ? { colourPreset: machineState.colourPreset, colourHue: machineState.colourHue, colourSaturation: machineState.colourSaturation, colourBrightness: machineState.colourBrightness }
      : {}),
    process: machineState.process,
    processIntensity: machineState.processIntensity,
    processScale: machineState.processScale,
    sizeHierarchy: machineState.sizeHierarchy,
    contrastHierarchy: machineState.contrastHierarchy,
    alignmentMode: machineState.alignmentMode,
    alignmentHierarchy: machineState.alignmentHierarchy,
    proximityHierarchy: machineState.proximityHierarchy,
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