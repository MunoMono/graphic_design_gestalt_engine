import { Select, SelectItem, Toggle } from "@carbon/react";
import { TYPE_LAYOUT_OPTIONS } from "../engine/constants";

export default function TypeProofControls({ typeProof, typeLayout, onTypeProofChange, onTypeLayoutChange }) {
  return (
    <div className="panel-stack panel-stack--tight">
      <Toggle
        id="type-proof-toggle"
        labelText="Type Proof"
        labelA="Off"
        labelB="On"
        toggled={typeProof}
        onToggle={onTypeProofChange}
      />
      <Select id="type-layout-select" labelText="Type Layout" value={typeLayout} onChange={(event) => onTypeLayoutChange(event.target.value)}>
        {TYPE_LAYOUT_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value} text={option.label} />
        ))}
      </Select>
    </div>
  );
}