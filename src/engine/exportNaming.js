import { getActiveGestaltItems, PROCESS_OPTIONS } from "./constants";
import { getExportFormatDefinition, getExportMetrics } from "./exportSizing";
import { getBackgroundFilenameSegment } from "./background";
import { COLOUR_PRESETS, isDefaultColourState, normalizeColourState } from "./colourPresets";

const PROCESS_FILENAME_SEGMENTS = PROCESS_OPTIONS.reduce((accumulator, option) => {
  accumulator[option.value] = option.filenameSlug;
  return accumulator;
}, {});

export function buildExportFilename(state, options = {}) {
  const { includeExtension = false } = options;
  const formatDefinition = getExportFormatDefinition(state.format);
  const exportMetrics = getExportMetrics(state);
  const activeElements = getActiveGestaltItems(state.gestaltControls, "elements");
  const activePrinciples = getActiveGestaltItems(state.gestaltControls, "principles");
  const buildCountLabel = (count, singular, plural) => `${count}-${count === 1 ? singular : plural}`;
  const subjectSegment = activeElements.length === 0
    ? "blank"
    : activeElements.length > 2 || activePrinciples.length > 2
      ? [
        buildCountLabel(activeElements.length, "element", "elements"),
        activePrinciples.length > 0 ? buildCountLabel(activePrinciples.length, "principle", "principles") : null,
      ].filter(Boolean).join("-")
      : [
        ...activeElements.map((item) => item.key),
        ...activePrinciples.map((item) => item.key),
      ].join("-");
  const processSegment = state.process && state.process !== "clean"
    ? `-${PROCESS_FILENAME_SEGMENTS[state.process] ?? state.process}-intensity-${state.processIntensity}-scale-${state.processScale}`
    : "";
  const colour = normalizeColourState(state);
  const colourSegment = isDefaultColourState(colour)
    ? ""
    : `-${COLOUR_PRESETS[colour.colourPreset].filenameSlug}${colour.colourHue || colour.colourSaturation !== 100 || colour.colourBrightness ? `-hue-${colour.colourHue}-sat-${colour.colourSaturation}-bri-${colour.colourBrightness}` : ""}`;
  const typeProofSegment = state.typeProof ? "-type-proof" : "";
  const baseName = `rca-biennale-${subjectSegment}-${getBackgroundFilenameSegment(state)}${colourSegment}${processSegment}${typeProofSegment}-${formatDefinition.filenameSlug}-${exportMetrics.scale}x-seed-${state.seed}-${exportMetrics.finalWidth}x${exportMetrics.finalHeight}`;
  return includeExtension ? `${baseName}.png` : baseName;
}