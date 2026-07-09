import { Button, InlineNotification, Select, SelectItem, Tag, TextInput, Tile } from "@carbon/react";
import { EXPORT_DPI_OPTIONS, EXPORT_FORMAT_OPTIONS, EXPORT_SCALE_OPTIONS, PROCESS_OPTIONS } from "../engine/constants";
import { formatPhysicalSize, getDpiSelectValue, getScaleSelectValue } from "../engine/exportSizing";

const PROCESS_LABELS = PROCESS_OPTIONS.reduce((accumulator, option) => {
  accumulator[option.value] = option.label;
  return accumulator;
}, {});

export default function ExportPanel({
  filename,
  state,
  metrics,
  onFormatChange,
  onScaleChange,
  onDpiChange,
  onCustomDpiChange,
  onCustomWidthChange,
  onCustomHeightChange,
  onExport,
  disabled,
}) {
  const processLabel = PROCESS_LABELS[state.process] ?? state.process;
  const dpiSelectValue = getDpiSelectValue(state.dpi, state.dpiMode);
  const scaleSelectValue = getScaleSelectValue(state.scale);
  const showCustomDimensions = state.format === "custom";
  const showCustomDpi = dpiSelectValue === "custom";

  return (
    <Tile className="app-panel app-panel--export">
      <div className="panel-heading">
        <p className="panel-eyebrow">Technical output inspector</p>
        <h2>Export</h2>
      </div>

      <div className="panel-stack panel-stack--tight">
        <Select id="export-format-select" labelText="Format" value={state.format} onChange={(event) => onFormatChange(event.target.value)} disabled={disabled}>
          {EXPORT_FORMAT_OPTIONS.map((format) => (
            <SelectItem key={format.value} value={format.value} text={format.label} />
          ))}
        </Select>

        <div className="export-grid export-grid--two-up">
          <Select id="export-scale-select" labelText="Scale" value={scaleSelectValue} onChange={(event) => onScaleChange(event.target.value)} disabled={disabled}>
            {EXPORT_SCALE_OPTIONS.map((scaleOption) => (
              <SelectItem key={scaleOption.value} value={`${scaleOption.value}x`} text={scaleOption.label} />
            ))}
          </Select>

          <Select id="export-dpi-select" labelText="DPI" value={dpiSelectValue} onChange={(event) => onDpiChange(event.target.value)} disabled={disabled}>
            {EXPORT_DPI_OPTIONS.map((dpiOption) => (
              <SelectItem key={dpiOption.value} value={String(dpiOption.value)} text={dpiOption.label} />
            ))}
          </Select>
        </div>

        {showCustomDimensions ? (
          <div className="export-grid export-grid--two-up">
            <TextInput
              id="custom-export-width"
              labelText="Custom width (px)"
              value={String(state.customWidth)}
              onChange={(event) => onCustomWidthChange(event.target.value)}
              disabled={disabled}
            />
            <TextInput
              id="custom-export-height"
              labelText="Custom height (px)"
              value={String(state.customHeight)}
              onChange={(event) => onCustomHeightChange(event.target.value)}
              disabled={disabled}
            />
          </div>
        ) : null}

        {showCustomDpi ? (
          <TextInput
            id="custom-export-dpi"
            labelText="Custom DPI"
            value={String(state.customDpi)}
            onChange={(event) => onCustomDpiChange(event.target.value)}
            disabled={disabled}
          />
        ) : null}

        <div className="export-readout">
          <div className="export-readout__row">
            <span>Format</span>
            <strong>{metrics.formatLabel}</strong>
          </div>
          <div className="export-readout__row">
            <span>Base canvas size</span>
            <strong>{metrics.baseWidth}x{metrics.baseHeight}px</strong>
          </div>
          <div className="export-readout__row">
            <span>Export scale</span>
            <strong>{metrics.scaleLabel}</strong>
          </div>
          <div className="export-readout__row">
            <span>Final pixel dimensions</span>
            <strong>{metrics.finalWidth}x{metrics.finalHeight}px</strong>
          </div>
          <div className="export-readout__row">
            <span>DPI</span>
            <strong>{metrics.dpi}</strong>
          </div>
          <div className="export-readout__row export-readout__row--wrap">
            <span>Approximate physical size</span>
            <strong>{formatPhysicalSize(metrics)}</strong>
          </div>
        </div>

        {metrics.isLargeExport ? (
          <InlineNotification
            kind="warning"
            lowContrast
            hideCloseButton
            title="Large export may take time or fail in the browser."
            subtitle="Consider 150dpi or a lower scale."
          />
        ) : null}

        <div className="filename-preview">
          <span className="filename-preview__label">Current filename</span>
          <code>{filename}</code>
        </div>

        <div className="export-summary-tags">
          <Tag type="cool-gray">{metrics.finalWidth}x{metrics.finalHeight}</Tag>
          <Tag type="cool-gray">{metrics.scaleLabel}</Tag>
          <Tag type="cool-gray">{metrics.dpi}dpi</Tag>
          <Tag type="blue">{state.proof}</Tag>
          <Tag type={state.process === "clean" ? "gray" : "purple"}>{processLabel}</Tag>
          {state.process !== "clean" ? <Tag type="purple">I {state.processIntensity} / S {state.processScale}</Tag> : null}
          <Tag type={state.typeProof ? "green" : "gray"}>{state.typeProof ? `Type ${state.typeLayout}` : "Type Off"}</Tag>
        </div>

        <Button kind="primary" onClick={onExport} disabled={disabled}>
          Export PNG
        </Button>
      </div>
    </Tile>
  );
}