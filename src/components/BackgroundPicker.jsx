import { useEffect, useState } from "react";
import { BACKGROUND_PRESETS, hexToHsv, hexToRgb, hsvToHex, rgbToHex } from "../engine/background";

export default function BackgroundPicker({ color, opacity, onChange, disabled }) {
  const [hsv, setHsv] = useState(() => hexToHsv(color));
  const [hexInput, setHexInput] = useState(color.slice(1).toUpperCase());
  const [hexError, setHexError] = useState("");
  const [mode, setMode] = useState("hex");

  useEffect(() => {
    setHexInput(color.slice(1).toUpperCase());
    setHexError("");
    setHsv((current) => {
      const next = hexToHsv(color);
      return { ...next, hue: next.saturation ? next.hue : current.hue };
    });
  }, [color]);

  function updateHsv(patch) {
    const next = { ...hsv, ...patch };
    setHsv(next);
    onChange({ backgroundColor: hsvToHex(next.hue, next.saturation, next.value) });
  }

  function updatePlane(event) {
    const bounds = event.currentTarget.getBoundingClientRect();
    updateHsv({
      saturation: Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width)),
      value: 1 - Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height)),
    });
  }

  function commitHex() {
    const next = hexInput.replace(/^#/, "");
    if (!/^[0-9a-f]{6}$/i.test(next)) {
      setHexError("Enter six hex digits, for example 0066FF.");
      return;
    }
    setHexError("");
    onChange({ backgroundColor: `#${next.toLowerCase()}` });
  }

  const rgb = hexToRgb(color);
  return (
    <fieldset className="background-picker" disabled={disabled}>
      <legend>Background</legend>
      <div
        className="background-picker__plane"
        style={{ backgroundColor: `hsl(${hsv.hue} 100% 50%)` }}
        onPointerDown={(event) => {
          if (disabled) return;
          event.currentTarget.setPointerCapture(event.pointerId);
          updatePlane(event);
        }}
        onPointerMove={(event) => {
          if (!disabled && event.currentTarget.hasPointerCapture(event.pointerId)) updatePlane(event);
        }}
        aria-hidden="true"
      >
        <span className="background-picker__cursor" style={{ left: `clamp(0.4375rem, ${hsv.saturation * 100}%, calc(100% - 0.4375rem))`, top: `clamp(0.4375rem, ${(1 - hsv.value) * 100}%, calc(100% - 0.4375rem))` }} />
      </div>
      <label className="background-picker__range">
        <span>Hue</span>
        <input aria-label="Background hue" className="background-picker__hue" type="range" min="0" max="359" value={Math.round(hsv.hue)} onChange={(event) => updateHsv({ hue: Number(event.target.value) })} />
      </label>
      <label className="background-picker__range">
        <span>Saturation</span>
        <input aria-label="Background saturation" type="range" min="0" max="100" value={Math.round(hsv.saturation * 100)} onChange={(event) => updateHsv({ saturation: Number(event.target.value) / 100 })} />
      </label>
      <label className="background-picker__range">
        <span>Brightness</span>
        <input aria-label="Background brightness" type="range" min="0" max="100" value={Math.round(hsv.value * 100)} onChange={(event) => updateHsv({ value: Number(event.target.value) / 100 })} />
      </label>
      <label className="background-picker__range">
        <span>Opacity</span>
        <input aria-label="Background opacity" className="background-picker__alpha" style={{ "--picker-color": color }} type="range" min="0" max="100" value={opacity} onChange={(event) => onChange({ backgroundOpacity: Number(event.target.value) })} />
      </label>
      <div className="background-picker__values">
        <select aria-label="Background colour format" value={mode} onChange={(event) => setMode(event.target.value)}>
          <option value="hex">HEX</option>
          <option value="rgb">RGB</option>
        </select>
        {mode === "hex" ? (
          <input aria-label="Background hex" aria-invalid={Boolean(hexError)} aria-describedby={hexError ? "background-hex-error" : undefined} value={hexInput} onChange={(event) => setHexInput(event.target.value)} onBlur={commitHex} onKeyDown={(event) => { if (event.key === "Enter") commitHex(); }} />
        ) : (
          rgb.map((channel, index) => (
            <input key={index} aria-label={`Background ${["red", "green", "blue"][index]}`} type="number" min="0" max="255" value={channel} onChange={(event) => {
              if (event.target.value === "") return;
              const next = [...rgb];
              next[index] = Math.max(0, Math.min(255, Number(event.target.value)));
              onChange({ backgroundColor: rgbToHex(...next) });
            }} />
          ))
        )}
        <label className="background-picker__opacity-value">
          <input aria-label="Background opacity percent" type="number" min="0" max="100" value={opacity} onChange={(event) => {
            if (event.target.value !== "") onChange({ backgroundOpacity: Math.max(0, Math.min(100, Number(event.target.value))) });
          }} />
          <span>%</span>
        </label>
      </div>
      {hexError ? <p id="background-hex-error" role="alert">{hexError}</p> : null}
      <div className="background-picker__swatches">
        {BACKGROUND_PRESETS.map((preset) => (
          <button key={preset.color} type="button" aria-label={`${preset.label} background`} aria-pressed={color === preset.color} style={{ backgroundColor: preset.color }} onClick={() => { setHexError(""); onChange({ backgroundColor: preset.color }); }} />
        ))}
      </div>
    </fieldset>
  );
}
