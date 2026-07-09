import { EXPORT_DPI_OPTIONS, EXPORT_FORMAT_OPTIONS, EXPORT_SCALE_OPTIONS } from "./constants";

export const SAFE_EXPORT_MAX_SIDE = 12000;
export const SAFE_EXPORT_MAX_MEGAPIXELS = 100;
export const DEFAULT_EXPORT_DPI = 150;
const PREVIEW_MAX_LONG_SIDE = 3840;
const PREVIEW_MIN_LONG_SIDE = 2160;

const EXPORT_FORMAT_LOOKUP = EXPORT_FORMAT_OPTIONS.reduce((accumulator, option) => {
  accumulator[option.value] = option;
  return accumulator;
}, {});

const DPI_VALUES = new Set(EXPORT_DPI_OPTIONS.filter((option) => option.value !== "custom").map((option) => option.value));
const SCALE_VALUES = new Set(EXPORT_SCALE_OPTIONS.map((option) => option.value));

function sanitizePositiveInteger(value, fallbackValue) {
  const parsedValue = Number.parseInt(String(value), 10);
  if (!Number.isFinite(parsedValue) || parsedValue < 1) {
    return fallbackValue;
  }

  return parsedValue;
}

export function getExportFormatDefinition(formatKey) {
  return EXPORT_FORMAT_LOOKUP[formatKey] ?? EXPORT_FORMAT_LOOKUP.wide;
}

export function getScaleSelectValue(scale) {
  return `${scale}x`;
}

export function getDpiSelectValue(dpi, dpiMode = "preset") {
  if (dpiMode === "custom") {
    return "custom";
  }

  return DPI_VALUES.has(dpi) ? String(dpi) : "custom";
}

export function resolveBaseExportDimensions(state) {
  const formatDefinition = getExportFormatDefinition(state.format);
  const customWidth = sanitizePositiveInteger(state.customWidth, EXPORT_FORMAT_LOOKUP.wide.width);
  const customHeight = sanitizePositiveInteger(state.customHeight, EXPORT_FORMAT_LOOKUP.wide.height);
  const baseWidth = formatDefinition.value === "custom" ? customWidth : formatDefinition.width;
  const baseHeight = formatDefinition.value === "custom" ? customHeight : formatDefinition.height;

  return {
    formatDefinition,
    baseWidth,
    baseHeight,
    customWidth,
    customHeight,
  };
}

export function computePreviewDimensions(baseWidth, baseHeight) {
  const longSide = Math.max(baseWidth, baseHeight);
  const shortSide = Math.min(baseWidth, baseHeight);
  const cappedLongSide = Math.max(PREVIEW_MIN_LONG_SIDE, Math.min(PREVIEW_MAX_LONG_SIDE, longSide));
  const ratio = shortSide / longSide;

  if (baseWidth >= baseHeight) {
    return {
      previewWidth: Math.round(cappedLongSide),
      previewHeight: Math.round(cappedLongSide * ratio),
    };
  }

  return {
    previewWidth: Math.round(cappedLongSide * ratio),
    previewHeight: Math.round(cappedLongSide),
  };
}

export function getExportMetrics(state) {
  const { formatDefinition, baseWidth, baseHeight, customWidth, customHeight } = resolveBaseExportDimensions(state);
  const scale = SCALE_VALUES.has(Number(state.scale)) ? Number(state.scale) : 1;
  const customDpi = sanitizePositiveInteger(state.customDpi, DEFAULT_EXPORT_DPI);
  const dpi = DPI_VALUES.has(Number(state.dpi)) ? Number(state.dpi) : customDpi;
  const finalWidth = Math.round(baseWidth * scale);
  const finalHeight = Math.round(baseHeight * scale);
  const { previewWidth, previewHeight } = computePreviewDimensions(baseWidth, baseHeight);
  const megaPixels = (finalWidth * finalHeight) / 1000000;
  const widthInches = finalWidth / dpi;
  const heightInches = finalHeight / dpi;
  const widthFeet = widthInches / 12;
  const heightFeet = heightInches / 12;
  const isLargeExport = finalWidth > SAFE_EXPORT_MAX_SIDE || finalHeight > SAFE_EXPORT_MAX_SIDE || megaPixels > SAFE_EXPORT_MAX_MEGAPIXELS;

  return {
    format: formatDefinition.value,
    formatLabel: formatDefinition.label,
    formatFilenameSlug: formatDefinition.filenameSlug,
    baseWidth,
    baseHeight,
    customWidth,
    customHeight,
    previewWidth,
    previewHeight,
    scale,
    scaleLabel: `${scale}x`,
    dpi,
    customDpi,
    finalWidth,
    finalHeight,
    megaPixels,
    widthInches,
    heightInches,
    widthFeet,
    heightFeet,
    isLargeExport,
  };
}

export function applyExportMetricsToState(state) {
  const metrics = getExportMetrics(state);

  return {
    ...state,
    format: metrics.format,
    scale: metrics.scale,
    dpi: metrics.dpi,
    customDpi: metrics.customDpi,
    customWidth: metrics.customWidth,
    customHeight: metrics.customHeight,
    baseWidth: metrics.baseWidth,
    baseHeight: metrics.baseHeight,
    exportWidth: metrics.finalWidth,
    exportHeight: metrics.finalHeight,
    width: metrics.previewWidth,
    height: metrics.previewHeight,
  };
}

export function formatPhysicalSize(metrics) {
  const inchesLabel = `${metrics.widthInches.toFixed(1)} x ${metrics.heightInches.toFixed(1)} in`;
  if (metrics.widthInches >= 24 || metrics.heightInches >= 24) {
    return `${inchesLabel} (${metrics.widthFeet.toFixed(1)} x ${metrics.heightFeet.toFixed(1)} ft)`;
  }

  return inchesLabel;
}