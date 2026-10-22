import { Select, SelectItem, TextInput, Tile } from "@carbon/react";
import { EXPORT_FORMAT_OPTIONS } from "../engine/constants";

export default function CanvasStage({
  stageRef,
  state,
  metrics,
  onFormatChange,
  onCustomWidthChange,
  onCustomHeightChange,
  disabled,
}) {
  const showCustomDimensions = state.format === "custom";

  return (
    <Tile className="app-panel app-panel--stage">
      <div className="stage-header stage-header--canvas">
        <div className="stage-header__size-control">
          <Select
            id="canvas-format-select"
            labelText="Canvas size"
            value={state.format}
            onChange={(event) => onFormatChange(event.target.value)}
            disabled={disabled}
          >
            {EXPORT_FORMAT_OPTIONS.map((format) => (
              <SelectItem key={format.value} value={format.value} text={format.label} />
            ))}
          </Select>
          {showCustomDimensions ? (
            <div className="canvas-size-grid">
              <TextInput
                id="canvas-custom-width"
                labelText="Width (px)"
                value={String(state.customWidth)}
                onChange={(event) => onCustomWidthChange(event.target.value)}
                disabled={disabled}
              />
              <TextInput
                id="canvas-custom-height"
                labelText="Height (px)"
                value={String(state.customHeight)}
                onChange={(event) => onCustomHeightChange(event.target.value)}
                disabled={disabled}
              />
            </div>
          ) : null}
          <p className="stage-header__size-readout">{metrics.baseWidth}x{metrics.baseHeight}px</p>
        </div>
      </div>
      <div className="canvas-stage-frame">
        <div ref={stageRef} className="canvas-stage-frame__mount" aria-label="Graphic Design Gestalt Engine canvas" />
      </div>
    </Tile>
  );
}