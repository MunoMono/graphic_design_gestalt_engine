import { Slider } from "@carbon/react";

const CONTROL_DEFINITIONS = [
  { key: "thickness", label: "Thickness", min: 0, max: 100, step: 1 },
  { key: "scale", label: "Scale", min: 0, max: 100, step: 1 },
  { key: "angle", label: "Angle", min: -180, max: 180, step: 1 },
];

export default function GestaltSliderGroup({ prefix, values, onChange, disabled }) {
  return (
    <div className="gestalt-slider-group">
      <p className="panel-eyebrow">Thickness controls visual weight. Scale controls size, spread, and extent. Angle controls direction and rotation.</p>
      {CONTROL_DEFINITIONS.map((control) => (
        <Slider
          key={control.key}
          id={`${prefix}-${control.key}`}
          labelText={control.label}
          min={control.min}
          max={control.max}
          step={control.step}
          value={values[control.key]}
          hideTextInput={false}
          disabled={disabled}
          onChange={({ value }) => onChange({ [control.key]: Number(value) })}
        />
      ))}
    </div>
  );
}