import p5 from "p5";
import { DEFAULT_GESTALT_CONTROLS, DEFAULT_MACHINE_STATE, EXPORT_FORMAT_OPTIONS, PROCESS_OPTIONS, getActiveGestaltItems, getActiveRenderableElementItems } from "./constants";
import { buildExportFilename } from "./exportNaming";
import { getExportMetrics } from "./exportSizing";
import { buildDeterministicBatchSeeds, hashStringToSeed } from "./seededRandom";
import { getBackgroundProof, normalizeBackground } from "./background";
import { DEFAULT_COLOUR_STATE, buildColourPalette, normalizeColourState } from "./colourPresets";

const VIEW_MODES = {
  main: "main",
};

const FORMAT_PRESETS = EXPORT_FORMAT_OPTIONS.reduce((accumulator, option) => {
  if (option.hotkey) {
    accumulator[option.value] = {
      key: option.hotkey,
      width: option.width,
      height: option.height,
      label: option.label,
    };
  }
  return accumulator;
}, {});

const PROOF_MODES = {
  white: {
    key: "white",
    label: "White",
    background: "#f7f5ef",
    lines: ["#17191c", "#444c52", "#6f777c"],
    accent: "#0f1113",
  },
  black: {
    key: "black",
    label: "Black",
    background: "#050607",
    lines: ["#f1ece2", "#bfc8ce", "#7f95a2"],
    accent: "#fff8ec",
  },
};

const PROCESS_MODES = PROCESS_OPTIONS.reduce((accumulator, option) => {
  accumulator[option.value] = {
    key: option.value,
    label: option.label,
    filenameSlug: option.filenameSlug,
  };
  return accumulator;
}, {});

const GESTALT_ELEMENTS = {
  line: { key: "line", label: "Line", slug: "line" },
  space: { key: "space", label: "Space", slug: "space" },
  shape: { key: "shape", label: "Shape", slug: "shape" },
  form: { key: "form", label: "Form", slug: "form" },
  colour: { key: "colour", label: "Colour", slug: "colour" },
  texture: { key: "texture", label: "Texture", slug: "texture" },
  value: { key: "value", label: "Value", slug: "value" },
  typography: { key: "typography", label: "Typography", slug: "typography" },
};

const GESTALT_PRINCIPLES = {
  unityHarmony: { key: "unityHarmony", label: "Unity/Harmony", slug: "unity-harmony" },
  variety: { key: "variety", label: "Variety", slug: "variety" },
  balance: { key: "balance", label: "Balance", slug: "balance" },
  gradations: { key: "gradations", label: "Gradations", slug: "gradations" },
  emphasis: { key: "emphasis", label: "Emphasis", slug: "emphasis" },
  rhythm: { key: "rhythm", label: "Rhythm", slug: "rhythm" },
  movement: { key: "movement", label: "Movement", slug: "movement" },
  pattern: { key: "pattern", label: "Pattern", slug: "pattern" },
  proportion: { key: "proportion", label: "Proportion", slug: "proportion" },
};

const NEUTRAL_PRINCIPLE = { key: "neutral", label: "Neutral", slug: "neutral" };

const RENDER_PRESET = {
  palette: {
    background: "#111315",
    lines: ["#c9c1b5", "#959089", "#5e676c"],
    accent: "#ece6dc",
  },
  atmosphereCount: 4,
  atmosphereAlpha: 10,
  rowCount: 48,
  stepsPerLine: 180,
  flowNoiseScale: 0.0012,
  amplitudeFactor: 0.024,
  strokeWeightMin: 1.0,
  strokeWeightMax: 1.35,
  strongLineAlpha: 52,
  softLineAlpha: 34,
  contourCount: 8,
  contourNoiseScale: 0.001,
  contourAccentAlpha: 42,
  contourLineAlpha: 22,
  contourWeightStart: 0.8,
  contourWeightEnd: 1.15,
  contourCenterMin: 0.36,
  contourCenterMax: 0.64,
  contourStretchMin: 0.92,
  contourStretchMax: 1.08,
};

function normalizeSeed(seed) {
  const parsedSeed = Number.parseInt(String(seed), 10);
  if (!Number.isSafeInteger(parsedSeed) || parsedSeed < 1) {
    throw new Error("Seed must be a positive integer.");
  }

  return parsedSeed;
}

function normalizeControlValue(value, { min = 0, max = 100, fallback = 0 } = {}) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return fallback;
  }

  return Math.min(max, Math.max(min, Math.round(numericValue)));
}

function normalizeHierarchyState(state = {}) {
  return {
    sizeHierarchy: normalizeControlValue(state.sizeHierarchy, { fallback: DEFAULT_MACHINE_STATE.sizeHierarchy }),
    contrastHierarchy: normalizeControlValue(state.contrastHierarchy, { fallback: DEFAULT_MACHINE_STATE.contrastHierarchy }),
    alignmentMode: ["grid", "thirds", "golden"].includes(state.alignmentMode) ? state.alignmentMode : DEFAULT_MACHINE_STATE.alignmentMode,
    alignmentHierarchy: normalizeControlValue(state.alignmentHierarchy, { fallback: DEFAULT_MACHINE_STATE.alignmentHierarchy }),
    proximityHierarchy: normalizeControlValue(state.proximityHierarchy, { fallback: DEFAULT_MACHINE_STATE.proximityHierarchy }),
  };
}

function normalizeGestaltControls(gestaltControls = {}) {
  return {
    elements: Object.entries(DEFAULT_GESTALT_CONTROLS.elements).reduce((accumulator, [key, defaults]) => {
      const nextValues = gestaltControls?.elements?.[key] ?? {};
      accumulator[key] = {
        active: Boolean(nextValues.active),
        thickness: normalizeControlValue(nextValues.thickness, { fallback: defaults.thickness }),
        scale: normalizeControlValue(nextValues.scale, { fallback: defaults.scale }),
        angle: normalizeControlValue(nextValues.angle, { min: -180, max: 180, fallback: defaults.angle }),
        mode: typeof nextValues.mode === "string" && nextValues.mode ? nextValues.mode : defaults.mode,
      };
      return accumulator;
    }, {}),
    principles: Object.entries(DEFAULT_GESTALT_CONTROLS.principles).reduce((accumulator, [key, defaults]) => {
      const nextValues = gestaltControls?.principles?.[key] ?? {};
      accumulator[key] = {
        active: Boolean(nextValues.active),
        thickness: normalizeControlValue(nextValues.thickness, { fallback: defaults.thickness }),
        scale: normalizeControlValue(nextValues.scale, { fallback: defaults.scale }),
        angle: normalizeControlValue(nextValues.angle, { min: -180, max: 180, fallback: defaults.angle }),
        mode: typeof nextValues.mode === "string" && nextValues.mode ? nextValues.mode : defaults.mode,
      };
      return accumulator;
    }, {}),
  };
}

function normalizeState(state = {}) {
  const mergedState = { ...DEFAULT_MACHINE_STATE, ...state };
  const exportMetrics = getExportMetrics(mergedState);
  const gestaltControls = normalizeGestaltControls(mergedState.gestaltControls);
  const hasActiveElements = getActiveRenderableElementItems(gestaltControls).length > 0;
  const background = normalizeBackground(state);

  return {
    element: GESTALT_ELEMENTS[mergedState.element] ? mergedState.element : DEFAULT_MACHINE_STATE.element,
    principle: GESTALT_PRINCIPLES[mergedState.principle] ? mergedState.principle : DEFAULT_MACHINE_STATE.principle,
    chaos: Math.min(100, Math.max(0, Math.round(Number(mergedState.chaos) || 0))),
    ...background,
    ...normalizeHierarchyState(mergedState),
    proof: getBackgroundProof(background.backgroundColor),
    ...normalizeColourState(mergedState),
    process: PROCESS_MODES[mergedState.process] ? mergedState.process : DEFAULT_MACHINE_STATE.process,
    processIntensity: Math.min(100, Math.max(0, Math.round(Number(mergedState.processIntensity) || 0))),
    processScale: Math.min(100, Math.max(0, Math.round(Number(mergedState.processScale) || 0))),
    seed: normalizeSeed(mergedState.seed),
    activated: hasActiveElements,
    format: exportMetrics.format,
    scale: exportMetrics.scale,
    dpi: exportMetrics.dpi,
    dpiMode: mergedState.dpiMode === "custom" ? "custom" : DEFAULT_MACHINE_STATE.dpiMode,
    customDpi: exportMetrics.customDpi,
    customWidth: exportMetrics.customWidth,
    customHeight: exportMetrics.customHeight,
    baseWidth: exportMetrics.baseWidth,
    baseHeight: exportMetrics.baseHeight,
    exportWidth: exportMetrics.finalWidth,
    exportHeight: exportMetrics.finalHeight,
    width: exportMetrics.previewWidth,
    height: exportMetrics.previewHeight,
    viewMode: VIEW_MODES.main,
    gestaltControls,
  };
}

function getCurrentProofMode(state) {
  return PROOF_MODES[state.proof];
}

function getCurrentProcessMode(state) {
  return PROCESS_MODES[state.process];
}

function getCurrentElement(state) {
  return GESTALT_ELEMENTS[state.element];
}

function getCurrentPrinciple(state) {
  return GESTALT_PRINCIPLES[state.principle];
}

function getActiveElementDefinitions(state) {
  return getActiveRenderableElementItems(state.gestaltControls).map((item) => GESTALT_ELEMENTS[item.key]);
}

function getActivePrincipleDefinitions(state) {
  return getActiveGestaltItems(state.gestaltControls, "principles").map((item) => GESTALT_PRINCIPLES[item.key]);
}

function shouldRenderElement(state, elementKey) {
  return Boolean(state.gestaltControls?.elements?.[elementKey]?.active);
}

function isColourElementActive(state) {
  return Boolean(state.gestaltControls?.elements?.colour?.active);
}

function getEffectiveColourState(state) {
  return isColourElementActive(state)
    ? normalizeColourState(state)
    : DEFAULT_COLOUR_STATE;
}

function getCurrentGestaltControls(state, elementKey = state.element) {
  const activePrinciples = getActiveGestaltItems(state.gestaltControls, "principles");
  const principleValues = activePrinciples.length > 0
    ? activePrinciples.map((item) => state.gestaltControls.principles[item.key])
    : [DEFAULT_GESTALT_CONTROLS.principles[state.principle] ?? { active: false, thickness: 50, scale: 50, angle: 0 }];

  const averagedPrincipleValues = principleValues.reduce((accumulator, item, index) => {
    accumulator.thickness += item.thickness;
    accumulator.scale += item.scale;
    accumulator.angle += item.angle;
    accumulator.active = accumulator.active || item.active;

    if (index === principleValues.length - 1) {
      accumulator.thickness /= principleValues.length;
      accumulator.scale /= principleValues.length;
      accumulator.angle /= principleValues.length;
    }

    return accumulator;
  }, { active: false, thickness: 0, scale: 0, angle: 0 });

  return {
    element: state.gestaltControls?.elements?.[elementKey] ?? DEFAULT_GESTALT_CONTROLS.elements[elementKey],
    principle: averagedPrincipleValues,
  };
}

function lerpRange(min, max, amount) {
  return min + (max - min) * amount;
}

function normalizeSliderAmount(value) {
  return Math.min(1, Math.max(0, Number(value) / 100));
}

function getHierarchyAmount(state, key, fallback = 50) {
  return normalizeSliderAmount(state?.[key] ?? fallback);
}

function mapThickness(value) {
  return lerpRange(0.1, 4, normalizeSliderAmount(value));
}

function mapLineThickness(value) {
  return lerpRange(0.05, 10, normalizeSliderAmount(value));
}

function mapLineStrokeWeight(renderWidth, thicknessFactor) {
  const baseWeight = renderWidth / 3840;
  return lerpRange(0.15 * baseWeight, 200 * baseWeight, Math.min(1, Math.max(0, (thicknessFactor - 0.05) / (10 - 0.05))));
}

function mapScale(value) {
  return lerpRange(0.25, 4, normalizeSliderAmount(value));
}

function mapAngle(value) {
  return Number(value) * 2 * (Math.PI / 180);
}

function getPrimaryPrinciple(state) {
  const activePrinciples = getActivePrincipleDefinitions(state);

  if (activePrinciples.length === 0) {
    return NEUTRAL_PRINCIPLE;
  }

  return activePrinciples.find((item) => item.key === state.principle) ?? activePrinciples[0];
}

function getGestaltModifiers(state, elementKey) {
  const controls = getCurrentGestaltControls(state, elementKey);
  const elementThicknessFactor = mapThickness(controls.element.thickness);
  const principleThicknessFactor = mapThickness(controls.principle.thickness);
  const lineElementThicknessFactor = mapLineThickness(controls.element.thickness);
  const linePrincipleThicknessFactor = mapLineThickness(controls.principle.thickness);
  const elementScaleFactor = mapScale(controls.element.scale);
  const principleScaleFactor = mapScale(controls.principle.scale);
  const elementAngleOffset = mapAngle(controls.element.angle);
  const principleAngleOffset = mapAngle(controls.principle.angle);

  return {
    element: controls.element,
    principle: controls.principle,
    elementThicknessFactor,
    principleThicknessFactor,
    lineElementThicknessFactor,
    linePrincipleThicknessFactor,
    elementScaleFactor,
    principleScaleFactor,
    thicknessFactor: (elementThicknessFactor + principleThicknessFactor) / 2,
    lineThicknessFactor: (lineElementThicknessFactor + linePrincipleThicknessFactor) / 2,
    scaleFactor: (elementScaleFactor + principleScaleFactor) / 2,
    angleOffset: (elementAngleOffset + principleAngleOffset) / 2,
  };
}

function getBalanceMode(state) {
  return state.gestaltControls?.principles?.balance?.mode ?? ["symmetrical", "asymmetrical", "radial"][state.seed % 3];
}

function getRhythmMode(state) {
  return state.gestaltControls?.principles?.rhythm?.mode ?? (state.seed % 2 === 0 ? "regular" : "irregular");
}

function getElementMode(state, elementKey, fallback = "mixed") {
  return state.gestaltControls?.elements?.[elementKey]?.mode ?? fallback;
}

function getHierarchyStrength(principle, progress) {
  const sizeBias = arguments[2] ? lerpRange(0.72, 1.9, getHierarchyAmount(arguments[2], "sizeHierarchy")) : 1;
  switch (principle.key) {
    case GESTALT_PRINCIPLES.emphasis.key:
      return (progress === 0 ? 1.8 : 0.72 + (1 - progress) * 0.25) * sizeBias;
    case GESTALT_PRINCIPLES.proportion.key:
      return (progress < 0.382 ? 0.82 : progress < 0.618 ? 1.1 : 1.35) * sizeBias;
    case GESTALT_PRINCIPLES.gradations.key:
      return (0.72 + progress * 0.9) * sizeBias;
    case GESTALT_PRINCIPLES.unityHarmony.key:
      return 0.95 * sizeBias;
    default:
      return (0.88 + (1 - progress) * 0.4) * sizeBias;
  }
}

function getContrastAlphaMultiplier(state) {
  return lerpRange(0.5, 2.35, getHierarchyAmount(state, "contrastHierarchy"));
}

function getAlignmentGuides(mode, length) {
  switch (mode) {
    case "thirds":
      return [1 / 6, 1 / 3, 0.5, 2 / 3, 5 / 6].map((fraction) => length * fraction);
    case "golden":
      return [0.146, 0.382, 0.618, 0.854].map((fraction) => length * fraction);
    default:
      return Array.from({ length: 9 }, (_, index) => (length / 8) * index);
  }
}

function snapToNearestGuide(value, guides) {
  return guides.reduce((nearest, current) => (Math.abs(current - value) < Math.abs(nearest - value) ? current : nearest), guides[0]);
}

function applyAlignmentDiscipline(p, point, renderWidth, renderHeight, state) {
  const amount = p.pow(getHierarchyAmount(state, "alignmentHierarchy"), 1.15);
  if (amount <= 0) {
    return point;
  }

  const guideMode = state.alignmentMode ?? DEFAULT_MACHINE_STATE.alignmentMode;
  const horizontalGuides = getAlignmentGuides(guideMode, renderWidth);
  const verticalGuides = getAlignmentGuides(guideMode, renderHeight);
  const snappedX = snapToNearestGuide(point.x, horizontalGuides);
  const snappedY = snapToNearestGuide(point.y, verticalGuides);

  return {
    x: p.lerp(point.x, snappedX, 0.08 + amount * 0.92),
    y: p.lerp(point.y, snappedY, 0.08 + amount * 0.92),
  };
}

function applyProximityDiscipline(p, point, focusX, focusY, progress, state) {
  const amount = getHierarchyAmount(state, "proximityHierarchy");
  const localAmount = amount * (0.2 + (1 - progress) * 0.45);
  return {
    x: p.lerp(point.x, focusX, localAmount),
    y: p.lerp(point.y, focusY, localAmount),
  };
}

function drawOrganicShape(target, p, x, y, size, rotation, tone, strokeTone) {
  target.push();
  target.translate(x, y);
  target.rotate(rotation);
  target.fill(tone);
  target.stroke(strokeTone);
  target.beginShape();
  for (let vertexIndex = 0; vertexIndex < 10; vertexIndex += 1) {
    const angle = (vertexIndex / 10) * p.TWO_PI;
    const radius = size * (0.38 + 0.18 * Math.sin(angle * 3.1) + 0.12 * Math.cos(angle * 2.3));
    target.curveVertex(Math.cos(angle) * radius, Math.sin(angle) * radius * (0.8 + 0.3 * Math.sin(angle * 2)));
  }
  for (let vertexIndex = 0; vertexIndex < 3; vertexIndex += 1) {
    const angle = (vertexIndex / 10) * p.TWO_PI;
    const radius = size * (0.38 + 0.18 * Math.sin(angle * 3.1) + 0.12 * Math.cos(angle * 2.3));
    target.curveVertex(Math.cos(angle) * radius, Math.sin(angle) * radius * (0.8 + 0.3 * Math.sin(angle * 2)));
  }
  target.endShape();
  target.pop();
}

function drawGeometricShape(target, p, x, y, size, rotation, tone, strokeTone) {
  target.push();
  target.translate(x, y);
  target.rotate(rotation);
  target.fill(tone);
  target.stroke(strokeTone);
  if ((Math.round(size) % 2) === 0) {
    target.rect(-size * 0.5, -size * 0.38, size, size * 0.76, size * 0.12);
  } else {
    target.beginShape();
    target.vertex(0, -size * 0.56);
    target.vertex(size * 0.5, -size * 0.08);
    target.vertex(size * 0.22, size * 0.54);
    target.vertex(-size * 0.4, size * 0.42);
    target.vertex(-size * 0.54, -size * 0.18);
    target.endShape(p.CLOSE);
  }
  target.pop();
}

function applyProofModeToPalette(state) {
  const proofMode = getCurrentProofMode(state);
  return buildColourPalette({ ...state, ...getEffectiveColourState(state) }, {
    background: proofMode.background,
    lines: [...proofMode.lines],
    accent: proofMode.accent,
  });
}

function initializeRenderPreset(state) {
  return {
    ...RENDER_PRESET,
    palette: applyProofModeToPalette(state),
  };
}

function renderBaseCompositionToTarget(p, target, renderState, renderWidth, renderHeight, renderPalette, artPreset) {
  target.clear();
  if (!renderState.transparentArtwork) target.background(renderPalette.background);

  if (renderState.activated) {
    renderGestaltMachine(p, target, renderPalette, renderWidth, renderHeight, renderState, artPreset);
  }
}

function createProcessSeed(renderState, suffix) {
  return hashStringToSeed(`${renderState.seed}:${renderState.element}:${renderState.principle}:${renderState.chaos}:${renderState.proof}:${renderState.process}:${renderState.processIntensity}:${renderState.processScale}:${suffix}`);
}

function getProcessIntensity(renderState) {
  return renderState.process === PROCESS_MODES.clean.key ? 0 : renderState.processIntensity / 100;
}

function getProcessScale(renderState) {
  return renderState.process === PROCESS_MODES.clean.key ? 0.5 : renderState.processScale / 100;
}

function drawSourceImageWithAlpha(target, source, alpha, width, height) {
  target.push();
  target.drawingContext.globalAlpha = alpha;
  target.image(source, 0, 0, width, height);
  target.pop();
}

function buildPixelSampler(graphics, renderState) {
  graphics.loadPixels();
  const density = typeof graphics.pixelDensity === "function" ? graphics.pixelDensity() : 1;
  const rowWidth = graphics.width * density;
  const { pixels } = graphics;

  return (x, y) => {
    const sampleX = Math.max(0, Math.min(graphics.width - 1, Math.floor(x)));
    const sampleY = Math.max(0, Math.min(graphics.height - 1, Math.floor(y)));
    const pixelX = Math.floor(sampleX * density);
    const pixelY = Math.floor(sampleY * density);
    const index = 4 * (pixelY * rowWidth + pixelX);
    const r = pixels[index] ?? 0;
    const g = pixels[index + 1] ?? 0;
    const b = pixels[index + 2] ?? 0;
    const a = pixels[index + 3] ?? 255;
    const ground = renderState.proof === "white" ? 1 : 0;
    const luminance = ((r * 0.299 + g * 0.587 + b * 0.114) / 255) * (a / 255) + ground * (1 - a / 255);
    return { r, g, b, a, luminance };
  };
}

function getInkAmount(renderState, luminance) {
  return renderState.proof === PROOF_MODES.white.key ? 1 - luminance : luminance;
}

function getProcessInkColor(p, renderPalette, renderState, emphasis = 0) {
  const lineTone = renderState.proof === PROOF_MODES.white.key ? renderPalette.lines[0] : renderPalette.accent;
  const accentTone = renderState.proof === PROOF_MODES.white.key ? renderPalette.accent : renderPalette.lines[0];
  return p.lerpColor(p.color(lineTone), p.color(accentTone), p.constrain(emphasis, 0, 1));
}

function applyHalftoneProcess(p, target, source, renderState, renderPalette, renderWidth, renderHeight) {
  const chaos = renderState.chaos / 100;
  const intensity = getProcessIntensity(renderState);
  const processScale = getProcessScale(renderState);
  const minDimension = p.min(renderWidth, renderHeight);
  const spacing = p.max(4, Math.round(minDimension * p.lerp(0.0035, 0.016, processScale) * (1 - chaos * 0.08)));
  const sampler = buildPixelSampler(source, renderState);

  drawSourceImageWithAlpha(target, source, 0.2 + intensity * 0.34, renderWidth, renderHeight);
  target.push();
  target.noStroke();

  for (let y = spacing * 0.5; y < renderHeight; y += spacing) {
    for (let x = spacing * 0.5; x < renderWidth; x += spacing) {
      const { luminance } = sampler(x, y);
      const inkAmount = getInkAmount(renderState, luminance);
      if (inkAmount < 0.06) {
        continue;
      }

      const dotColor = getProcessInkColor(p, renderPalette, renderState, inkAmount);
      dotColor.setAlpha(30 + intensity * 120 + inkAmount * 70);
      target.fill(dotColor);
      target.circle(x, y, spacing * (0.08 + intensity * 0.12 + inkAmount * (0.48 + processScale * 0.65 + chaos * 0.12)));
    }
  }

  target.pop();
}

function applyDiffusionDitherProcess(p, target, source, renderState, renderPalette, renderWidth, renderHeight) {
  const chaos = renderState.chaos / 100;
  const intensity = getProcessIntensity(renderState);
  const processScale = getProcessScale(renderState);
  const minDimension = p.min(renderWidth, renderHeight);
  const cellSize = p.max(3, Math.round(minDimension * p.lerp(0.0028, 0.013, processScale) * (1 + chaos * 0.06)));
  const columns = Math.ceil(renderWidth / cellSize);
  const rows = Math.ceil(renderHeight / cellSize);
  const sampler = buildPixelSampler(source, renderState);
  const errorField = Array.from({ length: rows }, () => new Array(columns).fill(0));

  drawSourceImageWithAlpha(target, source, 0.14 + intensity * 0.22, renderWidth, renderHeight);
  target.push();
  target.noStroke();

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const centerX = p.min(renderWidth - 1, column * cellSize + cellSize * 0.5);
      const centerY = p.min(renderHeight - 1, row * cellSize + cellSize * 0.5);
      const { luminance } = sampler(centerX, centerY);
      const inkValue = p.constrain(getInkAmount(renderState, luminance) + errorField[row][column], 0, 1);
      const threshold = 0.62 - intensity * 0.3 + ((column + row) % 2) * 0.03;
      const outputValue = inkValue >= threshold ? 1 : 0;
      const error = inkValue - outputValue;

      if (column + 1 < columns) {
        errorField[row][column + 1] += error * (7 / 16);
      }
      if (row + 1 < rows) {
        if (column > 0) {
          errorField[row + 1][column - 1] += error * (3 / 16);
        }
        errorField[row + 1][column] += error * (5 / 16);
        if (column + 1 < columns) {
          errorField[row + 1][column + 1] += error * (1 / 16);
        }
      }

      if (outputValue > 0) {
        const inkColor = getProcessInkColor(p, renderPalette, renderState, inkValue);
        inkColor.setAlpha(40 + intensity * 120 + inkValue * 55);
        target.fill(inkColor);
        target.rect(column * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  }

  target.pop();
}

function applyCoarseBitmapProcess(p, target, source, renderState, renderPalette, renderWidth, renderHeight) {
  const chaos = renderState.chaos / 100;
  const intensity = getProcessIntensity(renderState);
  const processScale = getProcessScale(renderState);
  const minDimension = p.min(renderWidth, renderHeight);
  const cellSize = p.max(6, Math.round(minDimension * p.lerp(0.006, 0.028, processScale) * (1 + chaos * 0.08)));
  const sampler = buildPixelSampler(source, renderState);

  drawSourceImageWithAlpha(target, source, 0.14 + intensity * 0.18, renderWidth, renderHeight);
  target.push();
  target.noStroke();

  for (let y = 0; y < renderHeight; y += cellSize) {
    for (let x = 0; x < renderWidth; x += cellSize) {
      const { luminance } = sampler(x + cellSize * 0.5, y + cellSize * 0.5);
      const inkAmount = getInkAmount(renderState, luminance);
      if (inkAmount < 0.18 - intensity * 0.1) {
        continue;
      }

      const blockColor = getProcessInkColor(p, renderPalette, renderState, inkAmount);
      blockColor.setAlpha(40 + intensity * 135 + inkAmount * 60);
      const quantizedScale = inkAmount > 0.75 ? 1 : inkAmount > 0.45 ? 0.72 : 0.44;
      const blockWidth = cellSize * quantizedScale;
      const blockHeight = cellSize * (quantizedScale + ((x / p.max(1, renderWidth)) % 2 === 0 ? 0 : 0.08));
      target.fill(blockColor);
      target.rect(x, y, blockWidth, blockHeight);
    }
  }

  target.pop();
}

function applyPhototypeSliceProcess(p, target, source, renderState, renderPalette, renderWidth, renderHeight) {
  const intensity = getProcessIntensity(renderState);
  const processScale = getProcessScale(renderState);
  const processSeed = createProcessSeed(renderState, "phototype-slice");
  p.randomSeed(processSeed);
  p.noiseSeed(processSeed);

  drawSourceImageWithAlpha(target, source, 0.82, renderWidth, renderHeight);
  target.push();
  target.noStroke();

  const sliceCount = Math.round(3 + intensity * 13);
  const horizontal = p.random() > 0.45;
  const bandThickness = p.max(8, (horizontal ? renderHeight : renderWidth) * p.lerp(0.018, 0.14, processScale));
  const maxOffset = (horizontal ? renderWidth : renderHeight) * (0.015 + processScale * 0.12) * (0.35 + intensity * 0.9);

  for (let index = 0; index < sliceCount; index += 1) {
    const position = p.random(horizontal ? renderHeight : renderWidth);
    const thickness = bandThickness * p.random(0.55, 1.35);
    const offset = p.random(-maxOffset, maxOffset);
    const stretch = 1 + p.random(-0.06, 0.22 + processScale * 0.45);

    if (horizontal) {
      const sy = p.constrain(position, 0, renderHeight - thickness);
      const dy = p.constrain(sy + offset * 0.14, 0, renderHeight - thickness * stretch);
      target.image(source, offset, dy, renderWidth * p.random(0.94, 1.04), thickness * stretch, 0, sy, renderWidth, thickness);
      if (index % 2 === 0) {
        target.image(source, offset * -0.4, dy + thickness * 0.16, renderWidth, thickness * 0.28, 0, sy + thickness * 0.3, renderWidth, thickness * 0.2);
      }
    } else {
      const sx = p.constrain(position, 0, renderWidth - thickness);
      const dx = p.constrain(sx + offset * 0.14, 0, renderWidth - thickness * stretch);
      target.image(source, dx, offset, thickness * stretch, renderHeight * p.random(0.94, 1.04), sx, 0, thickness, renderHeight);
      if (index % 2 === 0) {
        target.image(source, dx + thickness * 0.18, offset * -0.4, thickness * 0.22, renderHeight, sx + thickness * 0.28, 0, thickness * 0.14, renderHeight);
      }
    }
  }

  const knockoutColor = p.color(renderPalette.background);
  knockoutColor.setAlpha(35 + intensity * 45);
  target.fill(knockoutColor);
  if (renderState.transparentArtwork) target.drawingContext.globalCompositeOperation = "destination-out";
  for (let index = 0; index < Math.round(2 + intensity * 6); index += 1) {
    if (horizontal) {
      const bandY = p.random(renderHeight);
      const bandHeight = bandThickness * p.random(0.08, 0.24);
      target.rect(0, bandY, renderWidth, bandHeight);
    } else {
      const bandX = p.random(renderWidth);
      const bandWidth = bandThickness * p.random(0.08, 0.24);
      target.rect(bandX, 0, bandWidth, renderHeight);
    }
  }

  target.pop();
}

function drawTintedOffsetImage(p, target, source, renderWidth, renderHeight, colorValue, alpha, offsetX, offsetY, compositeMode) {
  const tintColor = p.color(colorValue);
  target.push();
  target.drawingContext.globalCompositeOperation = compositeMode;
  target.tint(p.red(tintColor), p.green(tintColor), p.blue(tintColor), alpha);
  target.image(source, offsetX, offsetY, renderWidth, renderHeight);
  target.noTint();
  target.pop();
}

function applyScanlineScreenProcess(p, target, source, renderState, renderPalette, renderWidth, renderHeight) {
  const intensity = getProcessIntensity(renderState);
  const processScale = getProcessScale(renderState);
  const processSeed = createProcessSeed(renderState, "scanline-screen");
  p.randomSeed(processSeed);
  p.noiseSeed(processSeed);

  drawSourceImageWithAlpha(target, source, 0.7 + intensity * 0.18, renderWidth, renderHeight);

  const minDimension = p.min(renderWidth, renderHeight);
  const horizontalSpacing = p.max(3, Math.round(minDimension * p.lerp(0.0018, 0.012, processScale)));
  const verticalSpacing = p.max(horizontalSpacing + 2, Math.round(horizontalSpacing * (1.55 + processScale * 0.65)));
  const horizontalWeight = p.max(1, horizontalSpacing * (0.12 + intensity * 0.28));
  const verticalWeight = p.max(1, horizontalWeight * 0.72);
  const horizontalTone = getProcessInkColor(p, renderPalette, renderState, 0.55);
  const verticalTone = getProcessInkColor(p, renderPalette, renderState, 0.85);

  target.push();
  target.noFill();
  target.stroke(horizontalTone);
  target.strokeWeight(horizontalWeight);
  for (let y = 0; y < renderHeight; y += horizontalSpacing) {
    target.drawingContext.globalAlpha = 0.1 + intensity * (0.18 + ((y / p.max(1, renderHeight)) % 0.15));
    target.line(0, y, renderWidth, y + p.random(-horizontalWeight, horizontalWeight));
  }

  target.stroke(verticalTone);
  target.strokeWeight(verticalWeight);
  for (let x = 0; x < renderWidth; x += verticalSpacing) {
    target.drawingContext.globalAlpha = 0.04 + intensity * 0.1;
    target.line(x, 0, x + p.random(-verticalWeight * 2, verticalWeight * 2), renderHeight);
  }
  target.pop();
}

function applyTornMaskProcess(p, target, source, renderState, renderPalette, renderWidth, renderHeight) {
  const intensity = getProcessIntensity(renderState);
  const processScale = getProcessScale(renderState);
  const processSeed = createProcessSeed(renderState, "torn-mask");
  p.randomSeed(processSeed);
  p.noiseSeed(processSeed);

  drawSourceImageWithAlpha(target, source, 0.86, renderWidth, renderHeight);

  const ruptureCount = Math.round(2 + intensity * 8);
  const baseSize = p.min(renderWidth, renderHeight) * p.lerp(0.08, 0.34, processScale);
  const knockoutColor = p.color(renderPalette.background);
  knockoutColor.setAlpha(228);
  const edgeColor = getProcessInkColor(p, renderPalette, renderState, 0.65);
  edgeColor.setAlpha(85 + intensity * 95);

  for (let index = 0; index < ruptureCount; index += 1) {
    const centerX = p.random(renderWidth);
    const centerY = p.random(renderHeight);
    const radius = baseSize * p.random(0.55, 1.45);
    const points = Math.round(4 + p.random(2, 5));

    target.push();
    target.noStroke();
    target.fill(knockoutColor);
    if (renderState.transparentArtwork) target.drawingContext.globalCompositeOperation = "destination-out";
    target.beginShape();
    for (let point = 0; point < points; point += 1) {
      const angle = (p.TWO_PI / points) * point + p.random(-0.42, 0.42);
      const pointRadius = radius * p.random(0.42, 1.12);
      target.vertex(centerX + p.cos(angle) * pointRadius, centerY + p.sin(angle) * pointRadius);
    }
    target.endShape(p.CLOSE);
    target.pop();

    target.push();
    target.noFill();
    target.stroke(edgeColor);
    target.strokeWeight(p.max(2, radius * 0.025));
    target.beginShape();
    for (let point = 0; point < points; point += 1) {
      const angle = (p.TWO_PI / points) * point + p.random(-0.35, 0.35);
      const pointRadius = radius * p.random(0.38, 1.08);
      target.vertex(centerX + p.cos(angle) * pointRadius, centerY + p.sin(angle) * pointRadius);
    }
    target.endShape(p.CLOSE);
    target.pop();
  }
}

function applyChromaticOffsetProcess(p, target, source, renderState, renderPalette, renderWidth, renderHeight) {
  const intensity = getProcessIntensity(renderState);
  const processScale = getProcessScale(renderState);
  const processSeed = createProcessSeed(renderState, "chromatic-offset");
  p.randomSeed(processSeed);
  p.noiseSeed(processSeed);

  drawSourceImageWithAlpha(target, source, 0.9, renderWidth, renderHeight);

  const offsetAmount = p.max(1.5, p.min(renderWidth, renderHeight) * (0.0015 + processScale * 0.0065));
  const alpha = 28 + intensity * 90;
  const chroma = renderPalette.chroma;
  const paletteA = chroma ? renderPalette.accent : renderState.proof === PROOF_MODES.white.key ? "#d43f30" : "#ff7a6c";
  const paletteB = chroma ? chroma.find((tone) => tone !== paletteA) ?? chroma[0] : renderState.proof === PROOF_MODES.white.key ? "#0096a6" : "#7de6ff";
  const paletteC = chroma ? chroma.find((tone) => tone !== paletteA && tone !== paletteB) ?? renderPalette.lines[1] : renderState.proof === PROOF_MODES.white.key ? renderPalette.lines[1] : "#f6ecda";

  drawTintedOffsetImage(p, target, source, renderWidth, renderHeight, paletteA, alpha, -offsetAmount, offsetAmount * 0.35, "source-over");
  drawTintedOffsetImage(p, target, source, renderWidth, renderHeight, paletteB, alpha * 0.92, offsetAmount, -offsetAmount * 0.25, "source-over");
  drawTintedOffsetImage(p, target, source, renderWidth, renderHeight, paletteC, alpha * 0.55, offsetAmount * 0.22, offsetAmount * 0.22, renderState.proof === PROOF_MODES.white.key ? "multiply" : "lighter");
}

function applyStepQuantizeProcess(p, target, source, renderState, renderPalette, renderWidth, renderHeight) {
  const intensity = getProcessIntensity(renderState);
  const processScale = getProcessScale(renderState);
  const sampler = buildPixelSampler(source, renderState);
  const minDimension = p.min(renderWidth, renderHeight);
  const cellSize = p.max(4, Math.round(minDimension * p.lerp(0.0035, 0.02, processScale)));
  const levels = Math.max(2, Math.round(p.lerp(7, 3, intensity)));

  drawSourceImageWithAlpha(target, source, 0.16 + intensity * 0.18, renderWidth, renderHeight);
  target.push();
  target.noStroke();

  for (let y = 0; y < renderHeight; y += cellSize) {
    for (let x = 0; x < renderWidth; x += cellSize) {
      const { luminance } = sampler(x + cellSize * 0.5, y + cellSize * 0.5);
      const inkAmount = getInkAmount(renderState, luminance);
      const quantized = Math.round(inkAmount * (levels - 1)) / (levels - 1);
      if (quantized < 0.04) {
        continue;
      }

      const tone = getProcessInkColor(p, renderPalette, renderState, quantized);
      tone.setAlpha(30 + intensity * 120 + quantized * 55);
      target.fill(tone);
      target.rect(x, y, cellSize, cellSize);
    }
  }

  target.pop();
}

function applyProcessToTarget(p, target, source, renderState, renderPalette, renderWidth, renderHeight) {
  const processMode = getCurrentProcessMode(renderState);

  switch (processMode.key) {
    case PROCESS_MODES.halftone.key:
      applyHalftoneProcess(p, target, source, renderState, renderPalette, renderWidth, renderHeight);
      return;
    case PROCESS_MODES.diffusionDither.key:
      applyDiffusionDitherProcess(p, target, source, renderState, renderPalette, renderWidth, renderHeight);
      return;
    case PROCESS_MODES.coarseBitmap.key:
      applyCoarseBitmapProcess(p, target, source, renderState, renderPalette, renderWidth, renderHeight);
      return;
    case PROCESS_MODES.phototypeSlice.key:
      applyPhototypeSliceProcess(p, target, source, renderState, renderPalette, renderWidth, renderHeight);
      return;
    case PROCESS_MODES.scanlineScreen.key:
      applyScanlineScreenProcess(p, target, source, renderState, renderPalette, renderWidth, renderHeight);
      return;
    case PROCESS_MODES.tornMask.key:
      applyTornMaskProcess(p, target, source, renderState, renderPalette, renderWidth, renderHeight);
      return;
    case PROCESS_MODES.chromaticOffset.key:
      applyChromaticOffsetProcess(p, target, source, renderState, renderPalette, renderWidth, renderHeight);
      return;
    case PROCESS_MODES.stepQuantize.key:
      applyStepQuantizeProcess(p, target, source, renderState, renderPalette, renderWidth, renderHeight);
      return;
    default:
      target.image(source, 0, 0, renderWidth, renderHeight);
  }
}

function renderCompositionToTarget(p, target, renderState, renderWidth, renderHeight) {
  const { backgroundColor, backgroundOpacity } = normalizeBackground(renderState);
  const legacyGround = PROOF_MODES[renderState.proof].background;
  if (backgroundColor === legacyGround && backgroundOpacity === 100) {
    renderArtworkToTarget(p, target, renderState, renderWidth, renderHeight);
    return;
  }

  const artwork = p.createGraphics(renderWidth, renderHeight);
  artwork.pixelDensity(1);
  artwork.noSmooth();
  try {
    renderArtworkToTarget(p, artwork, { ...renderState, transparentArtwork: true }, renderWidth, renderHeight);
    target.clear();
    const background = p.color(backgroundColor);
    background.setAlpha(backgroundOpacity * 255 / 100);
    target.background(background);
    target.image(artwork, 0, 0, renderWidth, renderHeight);
  } finally {
    releaseGraphics(artwork);
  }
}

function releaseGraphics(graphics) {
  // p5.Graphics.remove() delegates to a broken Renderer2D.remove() in this p5 version.
  p5.Element.prototype.remove.call(graphics);
  graphics.canvas.width = 0;
  graphics.canvas.height = 0;
}

function renderArtworkToTarget(p, target, renderState, renderWidth, renderHeight) {
  p.randomSeed(renderState.seed);
  p.noiseSeed(renderState.seed);
  const artPreset = initializeRenderPreset(renderState);
  const renderPalette = artPreset.palette;

  if (renderState.process === PROCESS_MODES.clean.key || (renderState.transparentArtwork && !renderState.activated)) {
    renderBaseCompositionToTarget(p, target, renderState, renderWidth, renderHeight, renderPalette, artPreset);
  } else {
    const processSource = p.createGraphics(renderWidth, renderHeight);
    processSource.pixelDensity(1);
    processSource.noSmooth();
    try {
      renderBaseCompositionToTarget(p, processSource, renderState, renderWidth, renderHeight, renderPalette, artPreset);
      target.clear();
      if (!renderState.transparentArtwork) target.background(renderPalette.background);
      applyProcessToTarget(p, target, processSource, renderState, renderPalette, renderWidth, renderHeight);
    } finally {
      releaseGraphics(processSource);
    }
  }

}

function downloadCanvasAsPng(canvas, filename) {
  return new Promise((resolve, reject) => {
    if (!canvas || typeof canvas.toBlob !== "function") {
      reject(new Error("Export surface is unavailable."));
      return;
    }

    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("PNG export failed in the browser."));
        return;
      }

      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = filename;
      link.href = objectUrl;
      link.click();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
      resolve(filename);
    }, "image/png");
  });
}

function scaleInkAlpha(renderPalette, alpha) {
  return Math.min(255, alpha * (renderPalette.alphaScale ?? 1));
}

function renderGestaltMachine(p, target, renderPalette, renderWidth, renderHeight, renderState, artPreset) {
  if (!renderPalette.finish) {
    drawGestaltElements(p, target, renderPalette, renderWidth, renderHeight, renderState, artPreset);
    return;
  }

  const layer = p.createGraphics(renderWidth, renderHeight);
  layer.pixelDensity(1);
  try {
    layer.clear();
    drawGestaltElements(p, layer, renderPalette, renderWidth, renderHeight, renderState, artPreset);
    applyColourFinish(p, layer, renderPalette.finish, renderWidth, renderHeight);
    target.image(layer, 0, 0, renderWidth, renderHeight);
  } finally {
    releaseGraphics(layer);
  }
}

// Paints the preset's signature colour treatment only where artwork already exists.
function applyColourFinish(p, layer, finish, width, height) {
  const context = layer.drawingContext;
  const { colours } = finish;
  context.save();
  context.globalCompositeOperation = "source-atop";
  context.globalAlpha = finish.alpha;

  if (finish.type === "gradient") {
    const radians = (finish.angle * Math.PI) / 180;
    const half = (Math.abs(Math.cos(radians)) * width + Math.abs(Math.sin(radians)) * height) / 2;
    const dx = Math.cos(radians) * half;
    const dy = Math.sin(radians) * half;
    const gradient = context.createLinearGradient(width / 2 - dx, height / 2 - dy, width / 2 + dx, height / 2 + dy);
    colours.forEach((colour, index) => gradient.addColorStop(index / Math.max(1, colours.length - 1), colour));
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
  } else if (finish.type === "stripes") {
    const stripe = Math.max(6, Math.min(width, height) * 0.035);
    const span = width + height;
    context.translate(width / 2, height / 2);
    context.rotate((finish.angle * Math.PI) / 180);
    for (let offset = -span, index = 0; offset < span; offset += stripe, index += 1) {
      context.fillStyle = colours[index % colours.length];
      context.fillRect(offset, -span, stripe, span * 2);
    }
  } else if (finish.type === "bars") {
    const count = colours.length * 2;
    const barWidth = width / count;
    for (let index = 0; index < count; index += 1) {
      context.fillStyle = colours[Math.floor(p.random(colours.length))];
      context.fillRect(index * barWidth, 0, barWidth + 1, height);
    }
  } else if (finish.type === "grid") {
    const columns = width >= height ? 6 : 4;
    const rows = Math.max(2, Math.round(columns * height / width));
    const cellWidth = width / columns;
    const cellHeight = height / rows;
    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        context.fillStyle = colours[Math.floor(p.random(colours.length))];
        context.fillRect(column * cellWidth, row * cellHeight, cellWidth + 1, cellHeight + 1);
      }
    }
  } else if (finish.type === "band") {
    context.fillStyle = colours[0];
    context.fillRect(0, 0, width, height);
    context.globalAlpha = 1;
    const bandHeight = height * p.random(0.08, 0.18);
    const bandTop = height * p.random(0.15, 0.75) - bandHeight / 2;
    context.fillStyle = colours[1];
    context.fillRect(0, bandTop, width, bandHeight);
    context.fillStyle = colours[2];
    context.fillRect(width * p.random(0.1, 0.7), 0, width * 0.025, height);
  }

  context.restore();
}

function drawGestaltElements(p, target, renderPalette, renderWidth, renderHeight, renderState, artPreset) {
  const activeElements = getActiveElementDefinitions(renderState);

  if (activeElements.length === 0) {
    return;
  }

  const principle = getPrimaryPrinciple(renderState);
  const chaos = renderState.chaos / 100;
  const marginX = renderWidth * 0.08;
  const marginY = renderHeight * 0.09;
  const focusX = getPrincipleFocusX(p, principle, renderWidth, renderState);
  const focusY = getPrincipleFocusY(p, principle, renderHeight, renderState);

  activeElements.forEach((element) => {
    const modifiers = getGestaltModifiers(renderState, element.key);

    switch (element.key) {
      case GESTALT_ELEMENTS.line.key:
        drawGestaltLines(p, target, renderPalette, renderWidth, renderHeight, artPreset, principle, chaos, focusX, focusY, renderState, modifiers);
        break;
      case GESTALT_ELEMENTS.space.key:
        drawGestaltSpace(p, target, renderPalette, renderWidth, renderHeight, principle, chaos, marginX, marginY, focusX, focusY, renderState, modifiers);
        break;
      case GESTALT_ELEMENTS.shape.key:
        drawGestaltShapes(p, target, renderPalette, renderWidth, renderHeight, principle, chaos, marginX, marginY, focusX, focusY, renderState, modifiers);
        break;
      case GESTALT_ELEMENTS.form.key:
        drawGestaltForms(p, target, renderPalette, renderWidth, renderHeight, principle, chaos, focusX, focusY, modifiers);
        break;
      case GESTALT_ELEMENTS.texture.key:
        drawGestaltTexture(p, target, renderPalette, renderWidth, renderHeight, principle, chaos, marginX, marginY, renderState, modifiers);
        break;
      case GESTALT_ELEMENTS.value.key:
        drawGestaltValue(p, target, renderPalette, renderWidth, renderHeight, principle, chaos, marginX, marginY, renderState, modifiers);
        break;
      case GESTALT_ELEMENTS.typography.key:
        drawGestaltTypography(p, target, renderPalette, renderWidth, renderHeight, principle, chaos, marginX, marginY, focusX, focusY, renderState, modifiers);
        break;
      default:
        break;
    }
  });
}

function drawGestaltLines(p, target, renderPalette, renderWidth, renderHeight, artPreset, principle, chaos, focusX, focusY, renderState, modifiers) {
  target.noFill();
  const lineCount = Math.round((18 + chaos * 48) * (0.75 + modifiers.principleScaleFactor * 0.18));
  const stepCount = 22;
  const systemScale = modifiers.elementScaleFactor;
  const cosAngle = Math.cos(modifiers.angleOffset * 1.35);
  const sinAngle = Math.sin(modifiers.angleOffset * 1.35);
  const strokeBase = mapLineStrokeWeight(renderWidth, modifiers.lineThicknessFactor);
  const strokeJitter = p.max(0.02, strokeBase * (0.02 + chaos * 0.03));

  for (let lineIndex = 0; lineIndex < lineCount; lineIndex += 1) {
    const tone = p.color(lineIndex % 6 === 0 ? renderPalette.accent : renderPalette.lines[lineIndex % renderPalette.lines.length]);
    tone.setAlpha(scaleInkAlpha(renderPalette, (70 + chaos * 70) * getContrastAlphaMultiplier(renderState)));
    const lineMode = getElementMode(renderState, GESTALT_ELEMENTS.line.key, "mixed");
    const impliedLine = lineMode === "implied"
      ? true
      : lineMode === "actual"
        ? false
        : principle.key === GESTALT_PRINCIPLES.variety.key || principle.key === GESTALT_PRINCIPLES.movement.key || lineIndex % 4 === 0;
    const points = [];

    for (let step = 0; step < stepCount; step += 1) {
      const progress = step / (stepCount - 1);
      const anchor = getPrincipleAxisPoint(p, principle, progress, lineIndex / lineCount, renderWidth, renderHeight, focusX, focusY);
      const offset = p.map(p.noise(lineIndex * 0.18, progress * 2.6, renderState.seed * 0.0001), 0, 1, -1, 1) * renderHeight * ((0.012 + chaos * 0.1) * modifiers.elementScaleFactor);
      const localX = (anchor.x - focusX) * systemScale;
      const localY = (anchor.y - focusY) * systemScale;
      const rotatedX = localX * cosAngle - localY * sinAngle;
      const rotatedY = localX * sinAngle + localY * cosAngle;
      points.push({ x: focusX + rotatedX + cosAngle * offset * 0.3, y: focusY + rotatedY + offset + sinAngle * offset * 0.3 });
    }

    if (impliedLine) {
      target.noStroke();
      const dotTone = p.color(tone);
      dotTone.setAlpha(scaleInkAlpha(renderPalette, 78 + chaos * 60));
      target.fill(dotTone);
      const dotSize = p.max(1.2, strokeBase * 0.22);
      points.forEach((point, index) => {
        if (index % 2 === 0 || principle.key === GESTALT_PRINCIPLES.movement.key) {
          target.circle(point.x, point.y, dotSize * (index % 3 === 0 ? 1.35 : 0.9));
        }
      });
    } else {
      target.noFill();
      target.stroke(tone);
      target.strokeWeight(p.max(0.08, strokeBase + p.random() * strokeJitter));
      target.beginShape();
      points.forEach((point) => target.curveVertex(point.x, point.y));
      target.endShape();
    }
  }
}

function drawGestaltSpace(p, target, renderPalette, renderWidth, renderHeight, principle, chaos, marginX, marginY, focusX, focusY, renderState, modifiers) {
  const frameTone = p.color(renderPalette.lines[1]);
  frameTone.setAlpha(scaleInkAlpha(renderPalette, 90));
  const voidTone = p.color(renderPalette.background);
  voidTone.setAlpha(210);
  const edgeWeight = p.max(0.8, renderWidth * 0.0008 * modifiers.thicknessFactor);

  target.noFill();
  target.stroke(frameTone);
  target.strokeWeight(edgeWeight);
  target.rect(marginX, marginY, renderWidth - marginX * 2, renderHeight - marginY * 2, 24);

  for (let planeIndex = 0; planeIndex < 3; planeIndex += 1) {
    const planeTone = p.color(planeIndex === 1 ? renderPalette.accent : renderPalette.lines[planeIndex % renderPalette.lines.length]);
    planeTone.setAlpha(scaleInkAlpha(renderPalette, (24 + planeIndex * 18 + chaos * 30) * getContrastAlphaMultiplier(renderState)));
    const planeWidth = renderWidth * (0.24 + planeIndex * 0.08) * modifiers.scaleFactor;
    const planeHeight = renderHeight * (0.18 + planeIndex * 0.05) * modifiers.scaleFactor;
    const planeX = p.lerp(marginX * 1.1, focusX - planeWidth * 0.5, 0.45 + planeIndex * 0.18);
    const planeY = p.lerp(marginY * 1.2, focusY - planeHeight * 0.35, 0.38 + planeIndex * 0.16);
    target.noStroke();
    target.fill(planeTone);
    target.rect(planeX, planeY, planeWidth, planeHeight, 18);
  }

  const voidWidth = renderWidth * ((0.14 + (principle.key === GESTALT_PRINCIPLES.emphasis.key ? 0.16 : 0.06) + chaos * 0.06) * modifiers.scaleFactor);
  const voidHeight = renderHeight * ((0.18 + chaos * 0.08) * modifiers.scaleFactor);
  const voidX = p.constrain(focusX - voidWidth * 0.5, marginX * 1.2, renderWidth - marginX * 1.2 - voidWidth);
  const voidY = p.constrain(focusY - voidHeight * 0.5, marginY * 1.2, renderHeight - marginY * 1.2 - voidHeight);

  target.noStroke();
  const bands = getSpaceBands(p, principle);
  bands.forEach((band, index) => {
    const bandTone = p.color(index === bands.length - 1 && principle.key === GESTALT_PRINCIPLES.emphasis.key ? renderPalette.accent : renderPalette.lines[index % renderPalette.lines.length]);
    bandTone.setAlpha(scaleInkAlpha(renderPalette, 24 + chaos * 32 + modifiers.thicknessFactor * 24));
    target.fill(bandTone);
    const bandHeight = renderHeight * band.height * modifiers.thicknessFactor;
    const y = p.lerp(marginY * 1.3, renderHeight - marginY * 1.7, band.y);
    const inset = (renderWidth - marginX * 2.3) * band.inset;
    target.rect(marginX * 1.15 + inset, y, renderWidth - marginX * 2.3 - inset * 2, bandHeight, 999);
  });

  target.fill(voidTone);
  target.stroke(frameTone);
  target.strokeWeight(edgeWeight);
  target.rect(voidX, voidY, voidWidth, voidHeight, 22);

  target.noStroke();
  target.fill(voidTone);
  target.circle(voidX + voidWidth * 0.28, voidY + voidHeight * 0.36, p.min(voidWidth, voidHeight) * 0.22);
  target.circle(voidX + voidWidth * 0.7, voidY + voidHeight * 0.62, p.min(voidWidth, voidHeight) * 0.18);
}

function getSpaceBands(p, principle) {
  const make = (count, fn) => Array.from({ length: count }, (_, index) => fn(index / p.max(1, count - 1), index));
  switch (principle.key) {
    case GESTALT_PRINCIPLES.unityHarmony.key:
      return make(6, (t) => ({ y: t, height: 0.022, inset: 0.08 }));
    case GESTALT_PRINCIPLES.variety.key:
      return make(7, () => ({ y: p.random(), height: p.random(0.008, 0.06), inset: p.random(0, 0.3) }));
    case GESTALT_PRINCIPLES.balance.key:
      return make(5, (t) => ({ y: t, height: 0.016 + (1 - Math.abs(t - 0.5) * 2) * 0.03, inset: Math.abs(t - 0.5) * 0.4 }));
    case GESTALT_PRINCIPLES.gradations.key:
      return make(8, (t) => ({ y: t, height: 0.006 + t * 0.05, inset: 0 }));
    case GESTALT_PRINCIPLES.emphasis.key:
      return [...make(4, (t) => ({ y: t, height: 0.01, inset: 0.2 })), { y: 0.42, height: 0.1, inset: 0 }];
    case GESTALT_PRINCIPLES.rhythm.key:
      return make(9, (t, index) => ({ y: t, height: index % 3 === 0 ? 0.04 : 0.012, inset: 0.05 }));
    case GESTALT_PRINCIPLES.movement.key:
      return make(6, (t) => ({ y: t, height: 0.02, inset: t * 0.4 }));
    case GESTALT_PRINCIPLES.pattern.key:
      return make(12, (t) => ({ y: t, height: 0.014, inset: 0 }));
    case GESTALT_PRINCIPLES.proportion.key:
      return [0, 0.236, 0.382, 0.618, 1].map((y, index) => ({ y, height: 0.012 + index * 0.01, inset: 0 }));
    default:
      return make(4, (t, index) => ({ y: t, height: 0.018 + index * 0.008, inset: 0 }));
  }
}

function drawGestaltShapes(p, target, renderPalette, renderWidth, renderHeight, principle, chaos, marginX, marginY, focusX, focusY, renderState, modifiers) {
  const strokeTone = p.color(renderPalette.background);
  strokeTone.setAlpha(scaleInkAlpha(renderPalette, 64 + modifiers.elementThicknessFactor * 18));
  target.stroke(strokeTone);
  target.strokeWeight(p.max(0.5, modifiers.thicknessFactor * 1.4));
  const count = Math.round(8 + chaos * 18);
  const shapeMode = getElementMode(renderState, GESTALT_ELEMENTS.shape.key, "mixed");

  for (let index = 0; index < count; index += 1) {
    const maxSize = (0.1 + chaos * 0.1) * modifiers.elementScaleFactor;
    const progress = index / p.max(1, count - 1);
    const sizeFactor = principle.key === GESTALT_PRINCIPLES.unityHarmony.key
      ? 0.07 * modifiers.elementScaleFactor
      : principle.key === GESTALT_PRINCIPLES.gradations.key
        ? p.lerp(0.02, maxSize * 1.3, progress)
        : principle.key === GESTALT_PRINCIPLES.variety.key
          ? p.random(0.015, maxSize * 1.6)
          : p.random(0.03, maxSize);
    const size = p.min(renderWidth, renderHeight) * sizeFactor * getHierarchyStrength(principle, progress, renderState);
    const tone = p.color(index % 4 === 0 ? renderPalette.accent : renderPalette.lines[index % renderPalette.lines.length]);
    tone.setAlpha(scaleInkAlpha(renderPalette, (85 + chaos * 75 + (progress === 0 && principle.key === GESTALT_PRINCIPLES.emphasis.key ? 60 : 0)) * getContrastAlphaMultiplier(renderState)));
    const anchor = getPrinciplePlacement(p, principle, index, count, renderWidth, renderHeight, marginX, marginY, focusX, focusY, renderState);
    const rotation = p.random(-0.4, 0.4) + chaos * 0.8 + modifiers.angleOffset * 1.5;
    const useOrganic = shapeMode === "organic"
      ? true
      : shapeMode === "geometric"
        ? false
        : principle.key === GESTALT_PRINCIPLES.unityHarmony.key || principle.key === GESTALT_PRINCIPLES.movement.key || ((index + renderState.seed) % 2 === 0);

    if (useOrganic) {
      drawOrganicShape(target, p, anchor.x, anchor.y, size, rotation, tone, strokeTone);
    } else {
      drawGeometricShape(target, p, anchor.x, anchor.y, size, rotation, tone, strokeTone);
    }
  }
}

function drawGestaltForms(p, target, renderPalette, renderWidth, renderHeight, principle, chaos, focusX, focusY, modifiers, renderState) {
  const count = Math.round(5 + chaos * 10);
  for (let index = 0; index < count; index += 1) {
    const depth = index / p.max(1, count - 1);
    const hierarchy = getHierarchyStrength(principle, depth, renderState);
    const baseWidth = renderWidth * (0.06 + depth * 0.1 + chaos * 0.04) * modifiers.elementScaleFactor * hierarchy;
    const baseHeight = renderHeight * (0.04 + depth * 0.08 + chaos * 0.03) * modifiers.elementScaleFactor * hierarchy;
    const x = p.lerp(focusX, p.random(renderWidth * 0.18, renderWidth * 0.82), 0.35 + depth * 0.5);
    const y = p.lerp(focusY, p.random(renderHeight * 0.18, renderHeight * 0.82), 0.35 + depth * 0.5);
    const shadowTone = p.color(renderPalette.background);
    shadowTone.setAlpha(58 + depth * 30);
    const formTone = p.color(index % 2 === 0 ? renderPalette.accent : renderPalette.lines[index % renderPalette.lines.length]);
    formTone.setAlpha(scaleInkAlpha(renderPalette, 70 + depth * 90));
    const highlightTone = p.color(index % 2 === 0 ? renderPalette.lines[0] : renderPalette.accent);
    highlightTone.setAlpha(scaleInkAlpha(renderPalette, 40 + depth * 65));

    target.push();
    target.translate(x, y);
    target.rotate(getPrincipleRotation(p, principle, depth, chaos, renderState) + modifiers.angleOffset * 1.1);
    target.noStroke();
    target.fill(shadowTone);
    target.rect(-baseWidth * 0.45 + renderWidth * 0.008 * modifiers.thicknessFactor, -baseHeight * 0.45 + renderWidth * 0.008 * modifiers.thicknessFactor, baseWidth, baseHeight, 20);
    target.fill(formTone);
    target.rect(-baseWidth * 0.45, -baseHeight * 0.45, baseWidth, baseHeight, 20);
    target.fill(highlightTone);
    target.quad(
      -baseWidth * 0.45,
      -baseHeight * 0.45,
      baseWidth * 0.1,
      -baseHeight * 0.45,
      -baseWidth * 0.08,
      baseHeight * 0.1,
      -baseWidth * 0.45,
      baseHeight * 0.18
    );
    target.pop();
  }
}

function drawGestaltTexture(p, target, renderPalette, renderWidth, renderHeight, principle, chaos, marginX, marginY, renderState, modifiers) {
  const columns = p.max(4, Math.round((14 + chaos * 28) / (0.55 + modifiers.elementScaleFactor * 0.45)));
  const rows = p.max(4, Math.round((10 + chaos * 22) / (0.55 + modifiers.elementScaleFactor * 0.42)));
  const cellWidth = (renderWidth - marginX * 2) / columns;
  const cellHeight = (renderHeight - marginY * 2) / rows;
  const centerX = renderWidth * 0.5;
  const centerY = renderHeight * 0.5;
  const cosAngle = Math.cos(modifiers.angleOffset);
  const sinAngle = Math.sin(modifiers.angleOffset);
  const textureMode = getElementMode(renderState, GESTALT_ELEMENTS.texture.key, "mixed");

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const progress = getTextureProgress(p, principle, column, row, columns, rows);
      const tone = p.color(progress > 0.72 ? renderPalette.accent : renderPalette.lines[(row + column) % renderPalette.lines.length]);
      tone.setAlpha(scaleInkAlpha(renderPalette, (26 + progress * 128) * getContrastAlphaMultiplier(renderState)));
      const baseX = marginX + column * cellWidth + cellWidth * 0.5;
      const baseY = marginY + row * cellHeight + cellHeight * 0.5;
      const localX = baseX - centerX;
      const localY = baseY - centerY;
      const rotatedX = centerX + localX * cosAngle - localY * sinAngle;
      const rotatedY = centerY + localX * sinAngle + localY * cosAngle;
      const radius = p.min(cellWidth, cellHeight) * (0.1 + progress * (0.45 + chaos * 0.18)) * modifiers.thicknessFactor;
      const useActualTexture = textureMode === "actual"
        ? true
        : textureMode === "implied"
          ? false
          : (row + column) % 3 !== 0;

      if (!useActualTexture) {
        target.noStroke();
        target.fill(tone);
        target.circle(rotatedX, rotatedY, radius);
      } else {
        target.noFill();
        target.stroke(tone);
        target.strokeWeight(p.max(0.5, radius * 0.12));
        target.line(rotatedX - radius * 0.4, rotatedY - radius * 0.4, rotatedX + radius * 0.4, rotatedY + radius * 0.4);
        target.line(rotatedX + radius * 0.3, rotatedY - radius * 0.35, rotatedX - radius * 0.3, rotatedY + radius * 0.35);
      }
    }
  }
}

function drawGestaltValue(p, target, renderPalette, renderWidth, renderHeight, principle, chaos, marginX, marginY, renderState, modifiers) {
  const bandCount = p.max(3, Math.round((7 + chaos * 10) / (0.55 + modifiers.elementScaleFactor * 0.4)));
  const isHorizontal = principle.key === GESTALT_PRINCIPLES.balance.key || principle.key === GESTALT_PRINCIPLES.gradations.key;
  const bandSpan = isHorizontal ? (renderHeight - marginY * 2) / bandCount : (renderWidth - marginX * 2) / bandCount;

  target.noStroke();
  for (let index = 0; index < bandCount; index += 1) {
    const progress = index / p.max(1, bandCount - 1);
    const tone = p.lerpColor(
      p.color(renderPalette.background),
      p.color(index % 4 === 0 ? renderPalette.accent : renderPalette.lines[index % renderPalette.lines.length]),
      0.2 + getValueAlpha(principle, progress) * 0.8
    );
    tone.setAlpha(scaleInkAlpha(renderPalette, (28 + getValueAlpha(principle, progress) * (170 + chaos * 60 + modifiers.thicknessFactor * 70)) * getContrastAlphaMultiplier(renderState)));
    target.fill(tone);

    if (isHorizontal) {
      target.rect(marginX, marginY + index * bandSpan, renderWidth - marginX * 2, bandSpan * (0.45 + chaos * 0.12) * modifiers.thicknessFactor, 12);
    } else {
      target.rect(marginX + index * bandSpan, marginY, bandSpan * (0.45 + chaos * 0.12) * modifiers.thicknessFactor, renderHeight - marginY * 2, 12);
    }
  }
}

function drawGestaltTypography(p, target, renderPalette, renderWidth, renderHeight, principle, chaos, marginX, marginY, focusX, focusY, renderState, modifiers) {
  const columnWidth = (renderWidth - marginX * 2) / 12;
  const ruleTone = p.color(renderPalette.lines[1]);
  ruleTone.setAlpha(scaleInkAlpha(renderPalette, 88));
  const blockTone = p.color(renderPalette.accent);
  blockTone.setAlpha(scaleInkAlpha(renderPalette, (110 + chaos * 70) * getContrastAlphaMultiplier(renderState)));

  target.stroke(ruleTone);
  target.strokeWeight(p.max(0.7, renderWidth * 0.0005 * modifiers.thicknessFactor));
  for (let column = 0; column <= 12; column += 1) {
    const x = marginX + column * columnWidth;
    target.line(x, marginY, x, renderHeight - marginY);
  }

  target.noStroke();
  target.fill(blockTone);
  const headlineWidth = (principle.key === GESTALT_PRINCIPLES.emphasis.key ? columnWidth * 4.8 : principle.key === GESTALT_PRINCIPLES.proportion.key ? columnWidth * 4 : columnWidth * 3.2) * modifiers.elementScaleFactor;
  const headlineX = p.constrain(focusX - headlineWidth * 0.5, marginX, renderWidth - marginX - headlineWidth);
  const headlineY = p.constrain(focusY - renderHeight * 0.11, marginY * 1.2, renderHeight * 0.62);
  target.push();
  target.translate(headlineX + headlineWidth * 0.5, headlineY + renderHeight * 0.06 * modifiers.thicknessFactor);
  target.rotate(modifiers.angleOffset * 0.7);
  target.rect(-headlineWidth * 0.5, -renderHeight * 0.06 * modifiers.thicknessFactor, headlineWidth, renderHeight * 0.12 * modifiers.thicknessFactor, 16);
  target.pop();

  const textRows = p.max(3, Math.round((5 + chaos * 7) / (0.7 + modifiers.elementScaleFactor * 0.18)));
  for (let index = 0; index < textRows; index += 1) {
    const widthFactor = (0.16 + ((index + 1) % 5) * 0.07 + p.random() * 0.08) * p.min(1.8, modifiers.elementScaleFactor);
    const rowWidth = (renderWidth - marginX * 2) * p.min(widthFactor, 0.88);
    const rowX = principle.key === GESTALT_PRINCIPLES.balance.key || principle.key === GESTALT_PRINCIPLES.unityHarmony.key
      ? renderWidth * 0.5 - rowWidth * 0.5
      : principle.key === GESTALT_PRINCIPLES.proportion.key
        ? marginX + columnWidth * (index % 2 === 0 ? 2 : 5)
        : p.lerp(marginX, renderWidth - marginX - rowWidth, p.noise(index * 0.24, chaos));
    const rowY = headlineY + renderHeight * 0.16 + index * renderHeight * 0.048;
    const rowTone = p.color(renderPalette.lines[index % renderPalette.lines.length]);
    rowTone.setAlpha(scaleInkAlpha(renderPalette, 58 + chaos * 55));
    target.fill(rowTone);
    target.push();
    target.translate(rowX + rowWidth * 0.5, rowY + renderHeight * 0.008 * modifiers.thicknessFactor);
    target.rotate(modifiers.angleOffset * 0.45);
    target.rect(-rowWidth * 0.5, -renderHeight * 0.008 * modifiers.thicknessFactor, rowWidth, renderHeight * 0.016 * modifiers.thicknessFactor, 999);
    target.pop();
  }
}

function getPrincipleFocusX(p, principle, renderWidth, renderState) {
  switch (principle.key) {
    case GESTALT_PRINCIPLES.balance.key:
    case GESTALT_PRINCIPLES.unityHarmony.key:
      return renderWidth * 0.5;
    case GESTALT_PRINCIPLES.emphasis.key:
      return renderWidth * 0.68;
    case GESTALT_PRINCIPLES.movement.key:
      return renderWidth * 0.62;
    case GESTALT_PRINCIPLES.proportion.key:
      return renderWidth * 0.618;
    case GESTALT_PRINCIPLES.variety.key:
      return renderWidth * 0.26;
    case GESTALT_PRINCIPLES.gradations.key:
      return renderWidth * 0.76;
    case GESTALT_PRINCIPLES.rhythm.key:
      return renderWidth * 0.42;
    case GESTALT_PRINCIPLES.pattern.key:
      return renderWidth * 0.36;
    default:
      return renderWidth * p.lerp(0.32, 0.72, p.noise(renderWidth * 0.0004, renderState.chaos * 0.02));
  }
}

function getPrincipleFocusY(p, principle, renderHeight, renderState) {
  switch (principle.key) {
    case GESTALT_PRINCIPLES.balance.key:
    case GESTALT_PRINCIPLES.pattern.key:
      return renderHeight * 0.5;
    case GESTALT_PRINCIPLES.emphasis.key:
      return renderHeight * 0.38;
    case GESTALT_PRINCIPLES.movement.key:
      return renderHeight * 0.44;
    case GESTALT_PRINCIPLES.proportion.key:
      return renderHeight * 0.382;
    case GESTALT_PRINCIPLES.unityHarmony.key:
      return renderHeight * 0.5;
    case GESTALT_PRINCIPLES.variety.key:
      return renderHeight * 0.68;
    case GESTALT_PRINCIPLES.gradations.key:
      return renderHeight * 0.7;
    case GESTALT_PRINCIPLES.rhythm.key:
      return renderHeight * 0.58;
    default:
      return renderHeight * p.lerp(0.3, 0.7, p.noise(renderHeight * 0.0006, renderState.chaos * 0.03));
  }
}

function getPrincipleAxisPoint(p, principle, progress, band, renderWidth, renderHeight, focusX, focusY) {
  switch (principle.key) {
    case GESTALT_PRINCIPLES.balance.key:
      return { x: renderWidth * (0.12 + progress * 0.76), y: p.lerp(renderHeight * 0.24, renderHeight * 0.76, band) };
    case GESTALT_PRINCIPLES.gradations.key:
      return { x: renderWidth * (0.14 + progress * 0.72), y: renderHeight * (0.18 + progress * 0.56 + band * 0.14) };
    case GESTALT_PRINCIPLES.movement.key:
      return { x: renderWidth * (0.08 + progress * 0.84), y: renderHeight * (0.16 + progress * 0.52 + band * 0.22) };
    case GESTALT_PRINCIPLES.pattern.key:
      return { x: renderWidth * (0.12 + progress * 0.76), y: renderHeight * (0.18 + ((band * 8) % 1) * 0.64) };
    case GESTALT_PRINCIPLES.emphasis.key:
      return { x: p.lerp(renderWidth * 0.16, focusX, progress), y: p.lerp(renderHeight * (0.18 + band * 0.5), focusY, 0.35) };
    case GESTALT_PRINCIPLES.unityHarmony.key:
      return { x: renderWidth * (0.2 + progress * 0.6), y: renderHeight * (0.34 + band * 0.32) };
    case GESTALT_PRINCIPLES.variety.key:
      return { x: renderWidth * (0.08 + progress * (0.5 + p.noise(band * 9.1) * 0.42)), y: renderHeight * (0.12 + p.noise(band * 6.7, progress * 1.4) * 0.76) };
    case GESTALT_PRINCIPLES.rhythm.key:
      return { x: renderWidth * (0.1 + progress * 0.8), y: renderHeight * (0.22 + band * 0.56 + Math.sin(progress * Math.PI * 6) * 0.07) };
    case GESTALT_PRINCIPLES.proportion.key:
      return { x: renderWidth * (0.12 + progress * 0.506), y: renderHeight * (0.14 + band * 0.618 * 0.72) };
    default:
      return { x: renderWidth * (0.12 + progress * 0.76), y: renderHeight * (0.18 + band * 0.64) };
  }
}

function getPrinciplePlacement(p, principle, index, count, renderWidth, renderHeight, marginX, marginY, focusX, focusY, renderState) {
  const progress = index / p.max(1, count - 1);
  let point;

  switch (principle.key) {
    case GESTALT_PRINCIPLES.unityHarmony.key: {
      const columns = p.ceil(p.sqrt(count));
      const cell = p.min(renderWidth, renderHeight) * 0.09;
      const rows = p.ceil(count / columns);
      point = {
        x: renderWidth * 0.5 + ((index % columns) - (columns - 1) / 2) * cell,
        y: renderHeight * 0.5 + (p.floor(index / columns) - (rows - 1) / 2) * cell,
      };
      break;
    }
    case GESTALT_PRINCIPLES.variety.key:
      point = {
        x: p.random(marginX, renderWidth - marginX),
        y: p.random(marginY, renderHeight - marginY),
      };
      break;
    case GESTALT_PRINCIPLES.gradations.key:
      point = {
        x: p.lerp(marginX * 1.4, renderWidth - marginX * 1.4, progress),
        y: p.lerp(renderHeight - marginY * 1.4, marginY * 1.4, progress * progress),
      };
      break;
    case GESTALT_PRINCIPLES.balance.key:
      switch (getBalanceMode(renderState)) {
        case "symmetrical":
          point = {
            x: renderWidth * (index % 2 === 0 ? 0.34 : 0.66),
            y: p.lerp(marginY * 1.3, renderHeight - marginY * 1.3, progress),
          };
          break;
        case "radial": {
          const angle = progress * p.TWO_PI;
          const radius = p.min(renderWidth, renderHeight) * 0.24;
          point = {
            x: renderWidth * 0.5 + Math.cos(angle) * radius,
            y: renderHeight * 0.5 + Math.sin(angle) * radius,
          };
          break;
        }
        default:
          point = {
            x: renderWidth * (index % 2 === 0 ? 0.3 : 0.7) + p.random(-renderWidth * 0.09, renderWidth * 0.09),
            y: p.lerp(marginY * 1.3, renderHeight - marginY * 1.3, progress),
          };
          break;
      }
      break;
    case GESTALT_PRINCIPLES.rhythm.key:
      point = {
        x: p.lerp(marginX * 1.3, renderWidth - marginX * 1.3, progress),
        y: getRhythmMode(renderState) === "regular"
          ? renderHeight * (0.48 + p.sin(progress * p.TWO_PI * 2) * 0.08)
          : renderHeight * (0.48 + p.sin(progress * p.TWO_PI * 2.8) * 0.16 + p.noise(index * 0.31) * renderHeight * 0.08 - renderHeight * 0.04),
      };
      break;
    case GESTALT_PRINCIPLES.movement.key:
      point = {
        x: p.lerp(marginX * 1.2, renderWidth - marginX * 1.2, progress),
        y: p.lerp(marginY * 1.2, renderHeight - marginY * 1.2, progress) + p.random(-renderHeight * 0.08, renderHeight * 0.08),
      };
      break;
    case GESTALT_PRINCIPLES.pattern.key:
      point = {
        x: marginX + ((index % 4) + 0.5) * ((renderWidth - marginX * 2) / 4),
        y: marginY + (p.floor(index / 4) + 0.5) * ((renderHeight - marginY * 2) / p.ceil(count / 4)),
      };
      break;
    case GESTALT_PRINCIPLES.emphasis.key:
      point = {
        x: index === 0 ? focusX : p.lerp(focusX, p.random(marginX, renderWidth - marginX), 0.58 + progress * 0.28),
        y: index === 0 ? focusY : p.lerp(focusY, p.random(marginY, renderHeight - marginY), 0.58 + progress * 0.28),
      };
      break;
    case GESTALT_PRINCIPLES.proportion.key:
      point = {
        x: marginX + (renderWidth - marginX * 2) * (0.382 + (progress - 0.5) * 0.34),
        y: marginY + (renderHeight - marginY * 2) * (0.618 - (progress - 0.5) * 0.28),
      };
      break;
    default:
      point = {
        x: p.lerp(marginX * 1.2, renderWidth - marginX * 1.2, progress),
        y: p.lerp(marginY * 1.3, renderHeight - marginY * 1.3, p.noise(index * 0.31, renderState.seed * 0.0002)),
      };
      break;
  }

  return applyAlignmentDiscipline(
    p,
    applyProximityDiscipline(p, point, focusX, focusY, progress, renderState),
    renderWidth,
    renderHeight,
    renderState
  );
}

function getPrincipleRotation(p, principle, progress, chaos, renderState = { seed: 1 }) {
  switch (principle.key) {
    case GESTALT_PRINCIPLES.balance.key:
      return getBalanceMode(renderState) === "radial" ? progress * p.TWO_PI * 0.25 : p.random(-0.08, 0.08) + chaos * 0.12;
    case GESTALT_PRINCIPLES.unityHarmony.key:
      return chaos * 0.04;
    case GESTALT_PRINCIPLES.movement.key:
      return -0.42 + progress * 0.84 + chaos * 0.18;
    case GESTALT_PRINCIPLES.variety.key:
      return p.random(-0.7, 0.7) * (0.7 + chaos * 0.4);
    case GESTALT_PRINCIPLES.gradations.key:
      return -0.6 + progress * 1.2;
    case GESTALT_PRINCIPLES.rhythm.key:
      return getRhythmMode(renderState) === "regular"
        ? (Math.round(progress * 8) % 2 === 0 ? 0.22 : -0.22) + chaos * 0.08
        : (Math.round(progress * 8) % 2 === 0 ? 0.45 : -0.3) + chaos * 0.16;
    case GESTALT_PRINCIPLES.pattern.key:
      return chaos * 0.05;
    case GESTALT_PRINCIPLES.proportion.key:
      return 0.618 * progress - 0.3;
    default:
      return p.random(-0.28, 0.28) + chaos * 0.22;
  }
}

function getTextureProgress(p, principle, column, row, columns, rows) {
  const x = column / p.max(1, columns - 1);
  const y = row / p.max(1, rows - 1);

  switch (principle.key) {
    case GESTALT_PRINCIPLES.gradations.key:
      return (x + y) * 0.5;
    case GESTALT_PRINCIPLES.balance.key:
      return 1 - p.abs(x - 0.5) * 1.8;
    case GESTALT_PRINCIPLES.pattern.key:
      return ((column + row) % 4) / 4;
    case GESTALT_PRINCIPLES.rhythm.key:
      return (p.sin(x * p.TWO_PI * 4) + 1) * 0.5;
    case GESTALT_PRINCIPLES.emphasis.key:
      return 1 - p.constrain(p.dist(x, y, 0.68, 0.38) / 0.9, 0, 1);
    case GESTALT_PRINCIPLES.unityHarmony.key:
      return 0.55;
    case GESTALT_PRINCIPLES.variety.key:
      return p.random();
    case GESTALT_PRINCIPLES.movement.key:
      return (p.sin((x * 0.7 + y * 0.3) * p.TWO_PI * 1.5 - y * 2) + 1) * 0.5;
    case GESTALT_PRINCIPLES.proportion.key:
      return (x < 0.618 ? 0.35 : 0.85) * (y < 0.382 ? 0.6 : 1);
    default:
      return p.noise(column * 0.18, row * 0.18);
  }
}

function getValueAlpha(principle, progress) {
  switch (principle.key) {
    case GESTALT_PRINCIPLES.gradations.key:
      return progress;
    case GESTALT_PRINCIPLES.balance.key:
      return 1 - Math.abs(progress - 0.5) * 2;
    case GESTALT_PRINCIPLES.emphasis.key:
      return progress > 0.66 ? 1 : progress * 0.6;
    case GESTALT_PRINCIPLES.unityHarmony.key:
      return 0.6;
    case GESTALT_PRINCIPLES.variety.key:
      return 0.15 + Math.abs(Math.sin(progress * 91.7)) * 0.85;
    case GESTALT_PRINCIPLES.rhythm.key:
      return (Math.sin(progress * Math.PI * 6) + 1) * 0.5;
    case GESTALT_PRINCIPLES.movement.key:
      return progress * progress;
    case GESTALT_PRINCIPLES.pattern.key:
      return Math.round(progress * 12) % 2 === 0 ? 0.9 : 0.2;
    case GESTALT_PRINCIPLES.proportion.key:
      return progress < 0.382 ? 0.25 : progress < 0.618 ? 0.6 : 1;
    default:
      return 0.35 + progress * 0.65;
  }
}

function buildCompositionSummary(state) {
  const activeElements = getActiveRenderableElementItems(state.gestaltControls);
  const activePrinciples = getActiveGestaltItems(state.gestaltControls, "principles");

  if (activeElements.length === 0) {
    return "Blank canvas";
  }

  const elementLabel = activeElements.length <= 2
    ? activeElements.map((item) => GESTALT_ELEMENTS[item.key].label).join(" + ")
    : `${activeElements.length} Elements`;

  if (activePrinciples.length === 0) {
    return `${elementLabel} active`;
  }

  const principleLabel = activePrinciples.length <= 2
    ? activePrinciples.map((item) => GESTALT_PRINCIPLES[item.key].label).join(" + ")
    : `${activePrinciples.length} Principles`;

  return `${elementLabel} × ${principleLabel} active`;
}

export function createGestaltEngine(containerElement, options = {}) {
  if (!containerElement) {
    throw new Error("A container element is required to mount the Gestalt engine.");
  }

  let currentState = normalizeState(options.initialState);
  let sketchInstance = null;
  let canvasElement = null;
  let readyResolver;

  const ready = new Promise((resolve) => {
    readyResolver = resolve;
  });

  const sketch = (p) => {
    p.setup = () => {
      const canvas = p.createCanvas(currentState.width, currentState.height);
      canvas.parent(containerElement);
      p.pixelDensity(2);
      p.noLoop();
      canvasElement = canvas.elt;
      readyResolver(currentState);
      p.redraw();
    };

    p.draw = () => {
      renderCompositionToTarget(p, p, currentState, currentState.width, currentState.height);
    };
  };

  sketchInstance = new p5(sketch);

  function resizeIfNeeded(nextState) {
    if (!sketchInstance || !canvasElement) {
      return;
    }

    if (sketchInstance.width !== nextState.width || sketchInstance.height !== nextState.height) {
      sketchInstance.resizeCanvas(nextState.width, nextState.height);
      sketchInstance.pixelDensity(2);
    }
  }

  function updateGestaltEngine(nextState) {
    currentState = normalizeState(nextState);
    resizeIfNeeded(currentState);
    sketchInstance.redraw();
    return currentState;
  }

  function renderGestaltComposition(nextState = currentState) {
    return updateGestaltEngine(nextState);
  }

  // Blank canvases would give 12 identical blanks, so each candidate gets a seeded element/principle mix.
  function buildRandomComposition(state, seed) {
    let value = seed >>> 0;
    const next = () => {
      value = (Math.imul(value, 1664525) + 1013904223) >>> 0;
      return value / 4294967296;
    };
    const randomInt = (min, max) => Math.round(min + next() * (max - min));
    const pickOne = (items) => items[Math.floor(next() * items.length)];
    const pick = (items, count) => {
      const pool = [...items];
      const result = [];
      while (pool.length > 0 && result.length < count) {
        result.push(pool.splice(Math.floor(next() * pool.length), 1)[0]);
      }
      return result;
    };
    const elementControlModes = {
      line: ["mixed", "actual", "implied"],
      shape: ["mixed", "organic", "geometric"],
      texture: ["mixed", "implied", "actual"],
    };
    const principleControlModes = {
      balance: ["symmetrical", "asymmetrical", "radial"],
      rhythm: ["regular", "irregular"],
    };
    const backgrounds = [
      { backgroundColor: "#f7f5ef", backgroundOpacity: 100, proof: "white" },
      { backgroundColor: "#050607", backgroundOpacity: 100, proof: "black" },
      { backgroundColor: "#efe8d6", backgroundOpacity: 100, proof: "white" },
      { backgroundColor: "#111315", backgroundOpacity: 100, proof: "black" },
      { backgroundColor: "#d9d2c3", backgroundOpacity: 100, proof: "white" },
    ];
    const archetypes = [
      {
        key: "grid-systems",
        elements: ["line", "shape", "typography", "space", "value"],
        elementCount: [2, 4],
        principles: ["balance", "proportion", "unityHarmony", "pattern"],
        principleCount: [1, 2],
        process: ["clean", "stepQuantize", "scanlineScreen"],
        colourPreset: ["mono", "corporateFunk", "totalTotal"],
        alignmentMode: ["grid", "thirds"],
        hierarchy: { size: [25, 60], contrast: [35, 70], alignment: [70, 100], proximity: [30, 65] },
        chaos: [12, 38],
        processIntensity: [20, 55],
        processScale: [20, 55],
        thickness: [24, 58],
        scale: [34, 76],
        angle: [-12, 18],
      },
      {
        key: "deconstructed-editorial",
        elements: ["line", "shape", "texture", "typography", "space", "form"],
        elementCount: [3, 5],
        principles: ["variety", "movement", "rhythm", "emphasis"],
        principleCount: [1, 3],
        process: ["phototypeSlice", "chromaticOffset", "tornMask", "diffusionDither"],
        colourPreset: ["graphicPunk", "nakameguro", "californiaNewWave"],
        alignmentMode: ["thirds", "golden"],
        hierarchy: { size: [55, 100], contrast: [65, 100], alignment: [12, 55], proximity: [48, 90] },
        chaos: [62, 100],
        processIntensity: [45, 95],
        processScale: [45, 88],
        thickness: [48, 100],
        scale: [45, 92],
        angle: [-135, 135],
      },
      {
        key: "signal-poster",
        elements: ["shape", "form", "colour", "value", "typography"],
        elementCount: [2, 4],
        principles: ["emphasis", "balance", "proportion", "movement"],
        principleCount: [1, 2],
        process: ["clean", "halftone", "chromaticOffset"],
        colourPreset: ["corporateFunk", "waldi", "totalTotal"],
        alignmentMode: ["grid", "golden"],
        hierarchy: { size: [55, 95], contrast: [55, 95], alignment: [40, 92], proximity: [35, 72] },
        chaos: [24, 68],
        processIntensity: [20, 72],
        processScale: [24, 74],
        thickness: [35, 86],
        scale: [42, 88],
        angle: [-48, 48],
      },
      {
        key: "new-wave-layering",
        elements: ["shape", "colour", "texture", "typography", "line"],
        elementCount: [3, 5],
        principles: ["rhythm", "variety", "movement", "pattern"],
        principleCount: [1, 2],
        process: ["clean", "scanlineScreen", "chromaticOffset", "stepQuantize"],
        colourPreset: ["californiaNewWave", "nakameguro", "waldi"],
        alignmentMode: ["thirds", "golden", "grid"],
        hierarchy: { size: [45, 88], contrast: [48, 95], alignment: [20, 74], proximity: [40, 82] },
        chaos: [40, 86],
        processIntensity: [28, 80],
        processScale: [24, 76],
        thickness: [32, 78],
        scale: [50, 96],
        angle: [-90, 90],
      },
      {
        key: "wayfinding-logic",
        elements: ["shape", "typography", "line", "colour", "space"],
        elementCount: [2, 4],
        principles: ["balance", "unityHarmony", "proportion", "pattern"],
        principleCount: [1, 2],
        process: ["clean", "stepQuantize"],
        colourPreset: ["mono", "corporateFunk", "waldi"],
        alignmentMode: ["grid", "golden"],
        hierarchy: { size: [28, 64], contrast: [38, 76], alignment: [68, 100], proximity: [28, 62] },
        chaos: [8, 34],
        processIntensity: [18, 50],
        processScale: [18, 54],
        thickness: [18, 54],
        scale: [30, 72],
        angle: [-18, 18],
      },
    ];
    const archetype = pickOne(archetypes);
    const elementCount = randomInt(archetype.elementCount[0], archetype.elementCount[1]);
    const principleCount = randomInt(archetype.principleCount[0], archetype.principleCount[1]);
    const elementKeys = pick(archetype.elements, elementCount);
    const principleKeys = pick(archetype.principles, principleCount);
    const primaryElement = elementKeys[0] ?? GESTALT_ELEMENTS.shape.key;
    const primaryPrinciple = principleKeys[0] ?? GESTALT_PRINCIPLES.emphasis.key;
    const background = pickOne(backgrounds);
    const colourPreset = pickOne(archetype.colourPreset);
    const colourActive = colourPreset !== "mono" && (elementKeys.includes(GESTALT_ELEMENTS.colour.key) || next() > 0.45);
    const toggle = (section, keys) => Object.fromEntries(Object.entries(state.gestaltControls[section]).map(([key, controls]) => {
      const active = keys.includes(key);
      const modeChoices = section === "elements" ? elementControlModes[key] : principleControlModes[key];
      return [key, {
        ...controls,
        active,
        thickness: active ? randomInt(archetype.thickness[0], archetype.thickness[1]) : controls.thickness,
        scale: active ? randomInt(archetype.scale[0], archetype.scale[1]) : controls.scale,
        angle: active ? randomInt(archetype.angle[0], archetype.angle[1]) : controls.angle,
        mode: modeChoices ? pickOne(modeChoices) : controls.mode,
      }];
    }));

    return {
      element: primaryElement,
      principle: primaryPrinciple,
      chaos: randomInt(archetype.chaos[0], archetype.chaos[1]),
      proof: background.proof,
      backgroundColor: background.backgroundColor,
      backgroundOpacity: background.backgroundOpacity,
      colourPreset,
      colourHue: colourPreset === "mono" ? 0 : randomInt(-40, 40),
      colourSaturation: colourPreset === "mono" ? 100 : randomInt(92, 155),
      colourBrightness: colourPreset === "mono" ? 0 : randomInt(-12, 18),
      process: pickOne(archetype.process),
      processIntensity: randomInt(archetype.processIntensity[0], archetype.processIntensity[1]),
      processScale: randomInt(archetype.processScale[0], archetype.processScale[1]),
      sizeHierarchy: randomInt(archetype.hierarchy.size[0], archetype.hierarchy.size[1]),
      contrastHierarchy: randomInt(archetype.hierarchy.contrast[0], archetype.hierarchy.contrast[1]),
      alignmentMode: pickOne(archetype.alignmentMode),
      alignmentHierarchy: randomInt(archetype.hierarchy.alignment[0], archetype.hierarchy.alignment[1]),
      proximityHierarchy: randomInt(archetype.hierarchy.proximity[0], archetype.hierarchy.proximity[1]),
      gestaltControls: {
        ...state.gestaltControls,
        elements: toggle("elements", colourActive ? [...new Set([...elementKeys, GESTALT_ELEMENTS.colour.key])] : elementKeys),
        principles: toggle("principles", principleKeys),
      },
    };
  }

  function loadSeed(seed, baseState = currentState) {
    return normalizeState({ ...baseState, seed });
  }

  function randomizeSeed(baseState = currentState) {
    const normalizedBaseState = normalizeState(baseState);
    const nextSeed = Math.floor(Math.random() * 999999999) + 1;

    return normalizeState({
      ...normalizedBaseState,
      ...buildRandomComposition(normalizedBaseState, nextSeed),
      seed: nextSeed,
      activated: true,
    });
  }

  function generateBatchCandidates(state, count = 12) {
    const nextState = normalizeState({ ...state, activated: true });
    const seeds = buildDeterministicBatchSeeds(nextState, count);
    const isBlank = getActiveRenderableElementItems(nextState.gestaltControls).length === 0;
    const candidates = seeds.map((seed) => {
      const candidateState = normalizeState({
        ...nextState,
        ...(isBlank ? buildRandomComposition(nextState, seed) : {}),
        seed,
        activated: true,
      });
      const aspectRatio = nextState.width / nextState.height;
      const longSide = 520;
      const thumbnailWidth = aspectRatio >= 1 ? longSide : Math.round(longSide * aspectRatio);
      const thumbnailHeight = aspectRatio >= 1 ? Math.round(longSide / aspectRatio) : longSide;
      const thumbnail = sketchInstance.createGraphics(thumbnailWidth, thumbnailHeight);
      thumbnail.pixelDensity(1);
      renderCompositionToTarget(sketchInstance, thumbnail, candidateState, thumbnailWidth, thumbnailHeight);
      const imageUrl = (thumbnail.elt || thumbnail.canvas).toDataURL("image/png");
      releaseGraphics(thumbnail);

      return {
        seed,
        imageUrl,
        element: candidateState.element,
        principle: candidateState.principle,
        process: candidateState.process,
        processIntensity: candidateState.processIntensity,
        processScale: candidateState.processScale,
        chaos: candidateState.chaos,
        proof: candidateState.proof,
        backgroundColor: candidateState.backgroundColor,
        backgroundOpacity: candidateState.backgroundOpacity,
        colourPreset: candidateState.colourPreset,
        colourHue: candidateState.colourHue,
        colourSaturation: candidateState.colourSaturation,
        colourBrightness: candidateState.colourBrightness,
        gestaltControls: candidateState.gestaltControls,
        compositionSummary: buildCompositionSummary(candidateState),
        elementLabel: getCurrentElement(candidateState).label,
        principleLabel: getCurrentPrinciple(candidateState).label,
        processLabel: getCurrentProcessMode(candidateState).label,
      };
    });

    return { seeds, candidates };
  }

  async function exportPng(state = currentState) {
    const nextState = normalizeState(state);
    const exportSurface = sketchInstance.createGraphics(nextState.exportWidth, nextState.exportHeight);
    exportSurface.pixelDensity(1);
    exportSurface.noSmooth();
    try {
      renderCompositionToTarget(sketchInstance, exportSurface, nextState, nextState.exportWidth, nextState.exportHeight);
      const filename = buildExportFilename(nextState, { includeExtension: true });
      await downloadCanvasAsPng(exportSurface.canvas || exportSurface.elt, filename);
      return filename;
    } finally {
      releaseGraphics(exportSurface);
    }
  }

  function destroy() {
    sketchInstance?.remove();
    sketchInstance = null;
    canvasElement = null;
  }

  return {
    ready,
    getState: () => currentState,
    updateGestaltEngine,
    renderGestaltComposition,
    generateBatchCandidates,
    loadSeed,
    randomizeSeed,
    exportPng,
    destroy,
  };
}

export { normalizeState as normalizeMachineState };