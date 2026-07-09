import { Tag, Tile } from "@carbon/react";

export default function StatusBar({ state, error }) {
  return (
    <Tile className="app-panel app-panel--status">
      <div className="status-bar">
        <div>
          <p className="panel-eyebrow">Current matrix</p>
          <strong>{state.matrixSummary}</strong>
        </div>
        <div className="status-bar__tags">
          <Tag type={state.activated ? "green" : "gray"}>{state.activated ? "Composition view" : "Blank view"}</Tag>
          <Tag type="cool-gray">Seed {state.seed}</Tag>
          <Tag type={state.process === "Clean" ? "gray" : "purple"}>{state.process}</Tag>
          {state.process !== "Clean" ? <Tag type="purple">I {state.processIntensity} / S {state.processScale}</Tag> : null}
          <Tag type="cool-gray">{state.exportWidth}x{state.exportHeight}</Tag>
          {error ? <Tag type="red">{error}</Tag> : null}
        </div>
      </div>
    </Tile>
  );
}