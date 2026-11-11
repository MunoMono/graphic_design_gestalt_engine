import { Button, TextInput } from "@carbon/react";

export default function SeedControls({ value, onChange, onLoad, onRegenerate, onGenerateBatch, disabled }) {
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
        <Button kind="primary" size="lg" onClick={onRegenerate} disabled={disabled}>
          New seed
        </Button>
        <Button kind="secondary" size="lg" onClick={onLoad} disabled={disabled}>
          Load seed
        </Button>
        <Button kind="secondary" size="lg" onClick={onGenerateBatch} disabled={disabled}>
          Generate batch
        </Button>
      </div>
    </div>
  );
}