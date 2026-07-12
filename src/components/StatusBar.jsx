import { Tag, Tile } from "@carbon/react";

export default function StatusBar({ state, error }) {
  return (
    <Tile className="app-panel app-panel--status">
      <div className="status-bar">
        <div>
          <p className="panel-eyebrow">Current construction</p>
          <strong>{state.matrixSummary}</strong>
        </div>
        <div className="status-bar__tags">
          <Tag type={state.activated ? "green" : "gray"}>{state.activated ? "Composition view" : "Blank canvas"}</Tag>
          {state.activeElementCount > 0 ? <Tag type="blue">{state.activeElementCount} element{state.activeElementCount === 1 ? "" : "s"}</Tag> : null}
          {state.activePrincipleCount > 0 ? <Tag type="purple">{state.activePrincipleCount} principle{state.activePrincipleCount === 1 ? "" : "s"}</Tag> : null}
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