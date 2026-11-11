import p5 from "p5";
import { DEFAULT_MACHINE_STATE, GESTALT_CONTROL_SECTIONS, createDefaultGestaltControls } from "../src/engine/constants.js";
import { COLOUR_PRESET_OPTIONS } from "../src/engine/colourPresets.js";
import { normalizeMachineState, renderCompositionToTarget } from "../src/engine/gestaltRuntime.js";

export async function runGestaltRenderAudit() {
  const width = 320;
  const height = 180;
  const failures = [];
  let checks = 0;
  let sketch;
  let surface;
  await new Promise((resolve) => {
    sketch = new p5((instance) => {
      instance.setup = () => {
        instance.createCanvas(width, height);
        instance.pixelDensity(1);
        const canvas = document.createElement("canvas");
        canvas.getContext("2d", { willReadFrequently: true });
        surface = instance.createGraphics(width, height, instance.P2D, canvas);
        surface.pixelDensity(1);
        instance.noLoop();
        setTimeout(resolve, 0);
      };
    });
  });

  const check = (condition, label) => {
    checks += 1;
    if (!condition) failures.push(label);
  };
  const stateFor = (element, principle, mode) => {
    const gestaltControls = createDefaultGestaltControls();
    gestaltControls.elements[element].active = true;
    if (principle) {
      gestaltControls.principles[principle].active = true;
      if (mode) gestaltControls.principles[principle].mode = mode;
    }
    return normalizeMachineState({
      ...DEFAULT_MACHINE_STATE,
      seed: 42,
      element,
      principle: principle ?? "balance",
      gestaltControls,
    });
  };
  const render = (state) => {
    renderCompositionToTarget(sketch, surface, state, width, height);
    const pixels = surface.drawingContext.getImageData(0, 0, width, height).data;
    let hash = 2166136261;
    for (let index = 0; index < pixels.length; index += 4) {
      for (let channel = 0; channel < 3; channel += 1) {
        hash = Math.imul(hash ^ pixels[index + channel], 16777619);
      }
    }
    return { hash: hash >>> 0, pixels };
  };
  const different = (left, right, label) => check(render(left).hash !== render(right).hash, label);
  const principles = GESTALT_CONTROL_SECTIONS.principles.map((item) => item.key);

  try {
    const blank = normalizeMachineState(DEFAULT_MACHINE_STATE);
    const blankHash = render(blank).hash;
    for (const element of GESTALT_CONTROL_SECTIONS.elements) {
      const base = stateFor(element.key);
      const first = render(base);
      check(first.hash !== blankHash, `${element.key}: renders independently`);
      const repeated = render(base);
      check(repeated.hash === first.hash, `${element.key}: deterministic (${first.hash}, ${repeated.hash})`);

      if (element.key !== "colour") {
        for (const key of ["thickness", "scale", "angle"]) {
          const changed = structuredClone(base);
          changed.gestaltControls.elements[element.key][key] = key === "angle" ? 90 : 100;
          different(base, changed, `${element.key}: ${key}`);
        }
      }

      if (element.modeOptions) {
        const reference = structuredClone(base);
        reference.gestaltControls.elements[element.key].mode = element.modeOptions[1].value;
        const changed = structuredClone(reference);
        changed.gestaltControls.elements[element.key].mode = element.modeOptions[2].value;
        different(reference, changed, `${element.key}: modes`);
      }

      for (const principle of principles) {
        const active = stateFor(element.key, principle);
        different(base, active, `${element.key} + ${principle}`);
        for (const key of ["thickness", "scale", "angle"]) {
          const changed = structuredClone(active);
          changed.gestaltControls.principles[principle][key] = key === "angle" ? 90 : 100;
          different(active, changed, `${element.key} + ${principle}: ${key}`);
        }
      }

      for (const [principle, reference, alternatives] of [
        ["balance", "symmetrical", ["asymmetrical", "radial"]],
        ["rhythm", "regular", ["irregular"]],
      ]) {
        for (const mode of alternatives) {
          different(stateFor(element.key, principle, reference), stateFor(element.key, principle, mode), `${element.key} + ${principle}: ${mode}`);
        }
      }

      const balanced = stateFor(element.key, "balance");
      for (const principle of principles.filter((key) => key !== "balance")) {
        const combined = structuredClone(balanced);
        combined.gestaltControls.principles[principle].active = true;
        different(balanced, combined, `${element.key}: additional ${principle}`);
        const adjusted = structuredClone(combined);
        adjusted.gestaltControls.principles[principle].scale = 100;
        different(combined, adjusted, `${element.key}: additional ${principle} scale`);
      }

      for (const palette of ["mono", "corporateFunk"]) {
        const symmetric = stateFor(element.key, "balance", "symmetrical");
        symmetric.gestaltControls.elements.colour.active = true;
        symmetric.colourPreset = palette;
        const { pixels } = render(symmetric);
        let difference = 0;
        for (let y = 0; y < height; y += 1) {
          for (let x = 0; x < width / 2; x += 1) {
            for (let channel = 0; channel < 3; channel += 1) {
              difference += Math.abs(pixels[(y * width + x) * 4 + channel] - pixels[(y * width + width - 1 - x) * 4 + channel]);
            }
          }
        }
        check(difference === 0, `${element.key}: symmetrical balance with ${palette}`);
      }
    }

    const mono = stateFor("colour");
    const colourful = { ...mono, colourPreset: "corporateFunk" };
    different(mono, colourful, "colour: palette");
    const paletteHashes = COLOUR_PRESET_OPTIONS.map((option) => render({ ...mono, colourPreset: option.value }).hash);
    check(new Set(paletteHashes).size === COLOUR_PRESET_OPTIONS.length, "colour: all palettes are distinct");
    different(mono, { ...mono, colourBrightness: 80 }, "colour: monochrome brightness");
    for (const [key, value] of [["colourHue", 90], ["colourSaturation", 20], ["colourBrightness", 60]]) {
      different(colourful, { ...colourful, [key]: value }, `colour: ${key}`);
    }

    const space = { ...stateFor("space", "balance", "symmetrical"), backgroundColor: "#e13aa4", backgroundOpacity: 0 };
    const transparentSpace = render(space).pixels;
    const center = (Math.floor(height / 2) * width + Math.floor(width / 2)) * 4;
    check(transparentSpace[center + 3] === 0, "space: aperture remains transparent");
    const opaqueSpace = render({ ...space, backgroundOpacity: 100 }).pixels;
    check(opaqueSpace[center] === 225 && opaqueSpace[center + 1] === 58 && opaqueSpace[center + 2] === 164, "space: aperture shows the chosen background");

    const combined = stateFor("line", "balance", "symmetrical");
    combined.gestaltControls.elements.shape.active = true;
    combined.gestaltControls.principles.rhythm.active = true;
    const withoutShape = structuredClone(combined);
    withoutShape.gestaltControls.elements.shape.active = false;
    const withoutRhythm = structuredClone(combined);
    withoutRhythm.gestaltControls.principles.rhythm.active = false;
    different(combined, withoutShape, "multiple elements and principles: shape contributes");
    different(combined, withoutRhythm, "multiple elements and principles: rhythm contributes");
    const transparentColour = {
      ...stateFor("shape", "balance", "symmetrical"),
      backgroundColor: "#e13aa4",
      backgroundOpacity: 0,
      colourPreset: "corporateFunk",
    };
    transparentColour.gestaltControls.elements.colour.active = true;
    const transparentPixels = render(transparentColour).pixels;
    check(transparentPixels.some((value, index) => index % 4 === 3 && value === 0), "coloured symmetry: transparent background preserved");
  } finally {
    p5.Element.prototype.remove.call(surface);
    surface.canvas.width = 0;
    surface.canvas.height = 0;
    sketch.remove();
  }

  return { checks, failures };
}
