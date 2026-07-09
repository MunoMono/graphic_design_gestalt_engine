import { PROCESS_OPTIONS } from "./constants";
import { getExportFormatDefinition, getExportMetrics } from "./exportSizing";

const PROCESS_FILENAME_SEGMENTS = PROCESS_OPTIONS.reduce((accumulator, option) => {
  accumulator[option.value] = option.filenameSlug;
  return accumulator;
}, {});

export function buildExportFilename(state, options = {}) {
  const { includeExtension = false } = options;
  const formatDefinition = getExportFormatDefinition(state.format);
  const exportMetrics = getExportMetrics(state);
  const processSegment = state.process && state.process !== "clean"
    ? `-${PROCESS_FILENAME_SEGMENTS[state.process] ?? state.process}-intensity-${state.processIntensity}-scale-${state.processScale}`
    : "";
  const typeProofSegment = state.typeProof ? "-type-proof" : "";
  const baseName = `rca-biennale-${state.element}-${state.principle}-chaos-${state.chaos}-${state.proof}${processSegment}${typeProofSegment}-${formatDefinition.filenameSlug}-${exportMetrics.scale}x-seed-${state.seed}-${exportMetrics.finalWidth}x${exportMetrics.finalHeight}`;
  return includeExtension ? `${baseName}.png` : baseName;
}