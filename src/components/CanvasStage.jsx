import { Tag, Tile } from "@carbon/react";

export default function CanvasStage({ stageRef, ready, viewLabel, activated }) {
  return (
    <Tile className="app-panel app-panel--stage">
      <div className="stage-header">
        <div>
          <p className="panel-eyebrow">Live composition workspace</p>
          <h2>Canvas</h2>
        </div>
        <div className="stage-header__tags">
          <Tag type={activated ? "green" : "gray"}>{activated ? "Active" : "Blank"}</Tag>
          <Tag type="cool-gray">{viewLabel}</Tag>
          <Tag type={ready ? "blue" : "warm-gray"}>{ready ? "Ready" : "Loading"}</Tag>
        </div>
      </div>
      <div className="canvas-stage-frame">
        <div ref={stageRef} className="canvas-stage-frame__mount" aria-label="Graphic Design Gestalt Engine canvas" />
      </div>
    </Tile>
  );
}