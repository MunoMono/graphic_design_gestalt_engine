import { Button, TextInput } from "@carbon/react";

export default function SeedControls({ value, onChange, onLoad, onRegenerate, disabled }) {
  return (
    <div className="panel-stack panel-stack--tight">
      <TextInput
        id="seed-input"
        labelText="Seed"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Paste seed"
      />
      <div className="panel-actions panel-actions--split">
        <Button kind="secondary" onClick={onLoad} disabled={disabled}>
          Load Seed
        </Button>
        <Button kind="ghost" onClick={onRegenerate} disabled={disabled}>
          New Seed
        </Button>
      </div>
    </div>
  );
}