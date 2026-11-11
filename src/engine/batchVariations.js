import { ALIGNMENT_MODE_OPTIONS, GESTALT_CONTROL_SECTIONS, PROCESS_OPTIONS } from "./constants.js";
import { COLOUR_PRESET_OPTIONS } from "./colourPresets.js";
import { createSeededRandom } from "./seededRandom.js";

const VARIATION_MULTIPLIER = 5;

export function buildActiveBatchVariation(state, seed) {
  const random = createSeededRandom(seed);
  const pick = (items) => items[Math.floor(random() * items.length)];
  const vary = (value, step, min, max) => {
    const delta = Math.round((random() * 2 - 1) * step * VARIATION_MULTIPLIER);
    return Math.max(min, Math.min(max, value + delta));
  };
  const varyControls = (controls, definition) => ({
    ...controls,
    thickness: vary(controls.thickness, 10, 0, 100),
    scale: vary(controls.scale, 10, 0, 100),
    angle: vary(controls.angle, 18, -180, 180),
    mode: definition.modeOptions ? pick(definition.modeOptions).value : controls.mode,
  });
  const elements = Object.fromEntries(GESTALT_CONTROL_SECTIONS.elements.map((definition) => {
    const controls = state.gestaltControls.elements[definition.key];
    return [definition.key, controls.active ? varyControls(controls, definition) : { ...controls }];
  }));
  const principlePool = [...GESTALT_CONTROL_SECTIONS.principles];
  const principleCount = 1 + Math.floor(random() * 3);
  const selectedPrinciples = [];
  while (selectedPrinciples.length < principleCount) {
    selectedPrinciples.push(principlePool.splice(Math.floor(random() * principlePool.length), 1)[0].key);
  }
  const principles = Object.fromEntries(GESTALT_CONTROL_SECTIONS.principles.map((definition) => {
    const controls = state.gestaltControls.principles[definition.key];
    const active = selectedPrinciples.includes(definition.key);
    return [definition.key, active ? { ...varyControls(controls, definition), active } : { ...controls, active }];
  }));
  const colourActive = elements.colour.active;

  return {
    ...state,
    seed,
    principle: selectedPrinciples[0],
    chaos: vary(state.chaos, 10, 0, 100),
    process: pick(PROCESS_OPTIONS).value,
    processIntensity: vary(state.processIntensity, 10, 0, 100),
    processScale: vary(state.processScale, 10, 0, 100),
    sizeHierarchy: vary(state.sizeHierarchy, 10, 0, 100),
    contrastHierarchy: vary(state.contrastHierarchy, 10, 0, 100),
    alignmentMode: pick(ALIGNMENT_MODE_OPTIONS).value,
    alignmentHierarchy: vary(state.alignmentHierarchy, 10, 0, 100),
    proximityHierarchy: vary(state.proximityHierarchy, 10, 0, 100),
    ...(colourActive ? {
      colourPreset: pick(COLOUR_PRESET_OPTIONS).value,
      colourHue: vary(state.colourHue, 18, -180, 180),
      colourSaturation: vary(state.colourSaturation, 20, 0, 200),
      colourBrightness: vary(state.colourBrightness, 10, -100, 100),
    } : {}),
    gestaltControls: { elements, principles },
  };
}
