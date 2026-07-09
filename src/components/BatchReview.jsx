import { Tag, Tile } from "@carbon/react";

export default function BatchReview({ candidates, state, onCandidateSelect, loading }) {
  return (
    <Tile className="app-panel app-panel--batch">
      <div className="panel-heading panel-heading--row">
        <div>
          <p className="panel-eyebrow">Deterministic candidate comparison</p>
          <h2>Batch review</h2>
        </div>
        <Tag type="cool-gray">{state.matrixSummary}</Tag>
      </div>

      {loading ? <p className="panel-note">Generating deterministic candidate previews...</p> : null}
      {!loading && candidates.length === 0 ? <p className="panel-note">Generate a batch to see reproducible candidate seeds for the current machine state.</p> : null}

      <div className="candidate-grid">
        {candidates.map((candidate) => (
          <button key={candidate.seed} type="button" className="candidate-card" onClick={() => onCandidateSelect(candidate.seed)}>
            <img src={candidate.imageUrl} alt={`Seed ${candidate.seed}`} className="candidate-card__image" />
            <div className="candidate-card__meta">
              <strong>Seed {candidate.seed}</strong>
              <span>{candidate.elementLabel} x {candidate.principleLabel} x {candidate.processLabel}{candidate.processLabel !== "Clean" ? ` x I${candidate.processIntensity} x S${candidate.processScale}` : ""}</span>
            </div>
          </button>
        ))}
      </div>
    </Tile>
  );
}